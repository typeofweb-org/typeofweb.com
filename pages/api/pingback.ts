import { withSentry } from '@sentry/nextjs';

import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';

const faultToMessage = {
  '-32601': 'Requested method not found.',
  '0': 'Error.',
  '16': 'The source does not exist.',
  '17': 'The source does not contain a link to the target.',
  '32': 'The specified target does not exist.',
  '33': 'The specified target cannot be used as a target.',
  '48': 'The pingback has already been registered.',
  '49': 'Access denied.',
};

enum PingbackErrors {
  METHOD_NOT_FOUND = '-32601',
  GENERAL_ERROR = '0',
  SOURCE_DOES_NOT_EXIST = '16',
  NO_LINK_TO_TARGET = '17',
  TARGET_DOES_NOT_EXIST = '32',
  TARGET_CANNOT_BE_USED = '33',
  ALREADY_REGISTERED = '48',
  ACCESS_DENIED = '49',
}

class PingbackError extends Error {
  constructor(public readonly code: keyof typeof faultToMessage) {
    super();
    // eslint-disable-next-line functional/no-this-expression -- class
    this.message = faultToMessage[code];
  }
}

const notImplemented: boolean = true;
const PingbackApiRouter: NextApiHandler = (req, res) => {
  if (notImplemented) {
    return res.status(501).end();
  }

  if (!req.body) {
    return res.status(400).end();
  }

  process.nextTick(() => {
    handlePingback(req, res)
      .then(() => {
        const xml = `
<?xml version="1.0"?>
<methodResponse>
  <params><param>
    <value><string>Pingback successful.</string></value>
  </param></params>
</methodResponse>
`.trim();

        res.statusCode = 200;
        res.setHeader('Content-Length', Buffer.byteLength(xml));
        res.end(xml);
      })
      .catch((err) => {
        if (err instanceof PingbackError) {
          const xml = `
<?xml version="1.0"?>
<methodResponse>
  <fault><value><struct>
    <member>
      <name>faultCode</name>
      <value><int>${err.code}</int></value>
    </member>
    <member>
      <name>faultString</name>
      <value><string>${err.message}</string></value>
    </member>
  </struct></value></fault>
</methodResponse>
`.trim();

          res.statusCode = 400;
          res.setHeader('Content-Length', Buffer.byteLength(xml));
          res.end(xml);
        } else {
          res.statusCode = 500;
          res.end();
        }
      });
  });
};

// finds xmlrpc parameters
const param = new RegExp(
  '<param>\\s*<value>\\s*(?:<string>\\s*)?' +
    '(?:<!\\[CDATA\\[)?([^<>]+?)(?:\\]\\]>)?' +
    '(?:\\s*</string>)?\\s*</value>\\s*</param>',
  'gi',
);

async function handlePingback(req: NextApiRequest, res: NextApiResponse) {
  const $recorded = new Set<string>();
  const $attempted = new Set<string>();
  const body = req.body;
  const type = req.headers['content-type']?.split(';')[0]?.trim();

  // the xml-rpc spec says to use text/xml,
  // but then again, that was from a long time ago
  res.setHeader('Content-Type', 'application/xml; charset=utf-8');

  // make sure the request is a pingback
  if (!type || !body || typeof body !== 'string' || type?.slice(-3) !== 'xml') {
    throw new PingbackError(PingbackErrors.GENERAL_ERROR);
  }

  // <methodName/>
  if (!body.includes('pingback.ping')) {
    throw new PingbackError(PingbackErrors.METHOD_NOT_FOUND);
  }

  // look for the uri's with a regex
  const [source, target] = [...body.matchAll(param)]
    .map(([_, $1]) => $1?.replace(/&amp;/gi, '&').trim())
    .filter((x): x is string => !!x)
    .slice(0, 2)
    .map((url) => new URL(url));

  // make sure the URIs are there
  if (!source || !target) {
    throw new PingbackError(PingbackErrors.SOURCE_DOES_NOT_EXIST);
  }

  // make sure they're not the same
  if (source.host === target.host) {
    throw new PingbackError(PingbackErrors.TARGET_CANNOT_BE_USED);
  }

  // check to make sure the uri's are valid urls
  if (!source.host) {
    throw new PingbackError(PingbackErrors.SOURCE_DOES_NOT_EXIST);
  }

  // the target id will either be in the path or query string
  if (!target.host || (!target.pathname && !target.search)) {
    throw new PingbackError(PingbackErrors.TARGET_CANNOT_BE_USED);
  }

  // make sure there is a potential post id
  if (target.pathname && target.pathname.length < 2 && (!target.search || !target.search.length)) {
    throw new PingbackError(PingbackErrors.TARGET_CANNOT_BE_USED);
  }

  // make sure it hasnt been recorded
  if ($recorded.has(source.href)) {
    throw new PingbackError(PingbackErrors.ALREADY_REGISTERED);
  }

  // make sure people arent spamming the server
  if ($attempted.has(source.href)) {
    // use 49 for access denied, because
    // it wasnt necessarily registered/recorded
    throw new PingbackError(PingbackErrors.ACCESS_DENIED);
  }

  $attempted.add(source.href);

  const fetchRes = await fetch(source.toString());
  const fetchResponse = await fetchRes.text();
  if (!fetchResponse) {
    throw new PingbackError(PingbackErrors.SOURCE_DOES_NOT_EXIST);
  }

  // get the title of the page
  let [, title] = /<title>([^<]+)<\/title>/i.exec(fetchResponse) ?? [];
  if (title) {
    title = title.trim();
  }
  if (source.hostname && (!title || title.length > 150)) {
    title = source.hostname;
  }

  // make sure the link to the target uri actually
  // exists on the page and grab an excerpt
  if (!fetchResponse.includes(target.href)) {
    throw new PingbackError(PingbackErrors.NO_LINK_TO_TARGET);
  }

  // replace the link with placeholder tags to
  // mark its position, then remove all markup
  const sanitizedResponse = fetchResponse
    .replace(/##/g, '')
    .replace(RegExp(`<a[^>]+${target.href.replace(/([.?+()])/g, '\\$1')}[^>]+>([\\s\\S]+?)</a>`, 'gi'), '##$1##')
    .replace(/<[^>]+>|&[^\s]+;/g, '');

  // find the link again and grab 10 words on each side of it
  const [, ...matches] = /((?:[^\s]+\s+){0,10})##([\s\S]+?)##((?:\s+[^\s]+){0,10})/.exec(sanitizedResponse) ?? [];

  if (!matches.length) {
    throw new PingbackError(PingbackErrors.NO_LINK_TO_TARGET);
  }

  // put the excerpt together, make sure
  // its not more than 300 characters long
  const excerpt = matches.join(' ').replace(/\s+/g, ' ').substring(0, 300).trim();

  $recorded.add(source.href);

  // @todo save in a db?
  console.log({ title, excerpt });

  return;
}

export default withSentry(PingbackApiRouter);

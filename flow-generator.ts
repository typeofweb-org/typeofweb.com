/* eslint-disable @typescript-eslint/consistent-type-assertions -- ok */
/* eslint-disable functional/no-loop-statement -- ok */
import Fs from 'fs/promises';
import Path from 'path';

import Parse from 'csv-parse';

async function run() {
  const csv = await Fs.readFile(Path.resolve('flow.csv'), 'utf8');
  const result = Parse(csv);

  const counter: Record<string, Record<string, number>> = {};

  const pages = [
    'errata',
    'michal-miszczyszyn-uses',
    'polityka-prywatnosci',
    'polski-frontend-discord',
    'regulamin',
    'wspolpraca',
    'o-mnie',
    'znajdz-prace-zdalna-tymi-serwisami',
  ].map((p) => `/${p}/`);
  const isValidKey = (key: string) =>
    !key.includes('/tag/') && !key.startsWith('/subscribe/') && key !== '/' && !pages.includes(key);

  for await (const row of result) {
    const [from, to, exit, c] = row as readonly [string, string, string, string];
    const count = parseInt(c, 10);

    if (isValidKey(from)) {
      counter[from] = counter[from] || {};
      if (isValidKey(to)) {
        counter[from][to] = (counter[from][to] || 0) + count;
      }
      if (isValidKey(exit)) {
        counter[from][exit] = (counter[from][exit] || 0) + count;
      }
    }

    if (isValidKey(to)) {
      counter[to] = counter[to] || {};
      if (isValidKey(from)) {
        counter[to][from] = (counter[to][from] || 0) + count;
      }
      if (isValidKey(exit)) {
        counter[to][exit] = (counter[to][exit] || 0) + count;
      }
    }

    if (isValidKey(exit)) {
      counter[exit] = counter[from] || {};
      if (isValidKey(from)) {
        counter[exit][from] = (counter[exit][from] || 0) + count;
      }
      if (isValidKey(to)) {
        counter[exit][to] = (counter[exit][to] || 0) + count;
      }
    }
  }
  const sortedResult = Object.fromEntries(
    Object.entries(counter).map(([from, to]) => {
      return [
        from,
        Object.fromEntries(
          Object.entries(to)
            .sort(([, c1], [, c2]) => c2 - c1)
            .map(([to, count]) => {
              return [to, count];
            }),
        ),
      ];
    }),
  );

  await Fs.writeFile(Path.resolve('flow.json'), JSON.stringify(sortedResult, null, 2), 'utf-8');
}

void run();

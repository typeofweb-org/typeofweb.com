export function identifyUser() {
  const f = getFingerprint();
  const w = window;
  const d = w.dataLayer || (w.dataLayer = []);
  d.push({
    algoliaUserToken: f,
  });
  d.push({
    algoliaIndexName: 'typeofweb_prod',
  });
}

function getFingerprint() {
  const w = window;
  const f = w.localStorage.getItem('typeofweb_s') || generate();
  w.localStorage.setItem('typeofweb_s', f);
  return f;
}

function generate() {
  const {
    availHeight: ah,
    availWidth: aw,
    colorDepth: cd,
    height: h,
    pixelDepth: pd,
    width: w,
    orientation: { type: ot },
  } = window.screen;

  const screen = JSON.stringify({
    ah,
    aw,
    cd,
    h,
    pd,
    w,
    ot,
  });

  const fingerprint = Object.entries({
    userAgent: navigator.userAgent,
    languages: navigator.languages.join(','),
    screen,
  })
    .map(([key, value]) => `${key}:${value}`)
    .sort()
    .join(';')
    .replace(/\s/g, '');

  return btoa(fingerprint);
}

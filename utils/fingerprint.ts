export function getFingerprint() {
  const w = window;
  const f = w.localStorage.getItem('typeofweb_s') || generate();
  w.localStorage.setItem('typeofweb_s', f);
  return f;
}

function generate() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (char) => {
    const random = (Math.random() * 16) | 0;
    const value = char === 'x' ? random : (random & 0b0011) | 0b1000;
    return value.toString(16);
  });
}

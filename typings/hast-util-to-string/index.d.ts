declare module 'hast-util-to-string' {
  declare const toString: (node: import('unist').Node) => string;
  export = toString;
}

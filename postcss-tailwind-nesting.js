const nesting = require('tailwindcss/nesting/plugin');

module.exports = (opts) => {
  return {
    postcssPlugin: 'tailwindcss/nesting',
    Once(root, { result }) {
      return nesting(opts.loader)(root, result);
    },
  };
};

module.exports.postcss = true;

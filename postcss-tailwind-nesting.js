// const nesting = require('tailwindcss/nesting/plugin');
const { nesting } = require('tailwindcss/lib/postcss-plugins/nesting/plugin.js');

module.exports = (opts) => {
  return {
    postcssPlugin: 'tailwindcss/nesting',
    Once(root, { result }) {
      return nesting(opts.loader)(root, result);
    },
  };
};

module.exports.postcss = true;

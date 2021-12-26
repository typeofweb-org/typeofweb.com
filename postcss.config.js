module.exports = {
  plugins: {
    'postcss-import': {},
    './postcss-tailwind-nesting.js': { loader: 'postcss-nesting' },
    tailwindcss: {},
    autoprefixer: {},
  },
};

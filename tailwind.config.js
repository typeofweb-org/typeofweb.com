const plugin = require('tailwindcss/plugin');

/**
 * @type {import('tailwindcss/tailwind-config').TailwindConfig}
 */
module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  mode: 'jit',
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: ['Fira Sans', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },
    colors: {
      white: '#FFFFFF',
      transparent: 'transparent',
      green: {
        100: '#CCFFE2',
        200: '#9DF0C1',
        300: '#5AE295',
        400: '#38DC7F',
        500: '#5CB784',
        600: '#34B26A',
        700: '#1CA056',
        800: '#0B8942',
        900: '#00662C',
      },

      blue: {
        100: '#B5CDFF',
        200: '#80A2FE',
        300: '#255FFE',
        400: '#2C3CE8',
        500: '#341BDB',
        600: '#301FA3',
        700: '#200CA1',
        800: '#0F0070',
        900: '#130A52',
      },

      pink: {
        100: '#FED7EF',
        200: '#FBADE3',
        300: '#FF70D4',
        400: '#F551B5',
        500: '#E12899',
        600: '#C60A7D',
        700: '#AB0369',
        800: '#850051',
        900: '#4E0431',
      },

      gray: {
        100: '#FAFAFA',
        200: '#F0F0F0',
        300: '#BABABA',
        400: '#A1A1A1',
        500: '#8A8A8A',
        600: '#6E6E6E',
        700: '#545454',
        800: '#3B3B3B',
        900: '#222222',
      },
    },
    textIndent: (theme) => ({
      sm: '2rem',
    }),
  },

  variants: {
    // all the following default to ['responsive']
    textIndent: ['responsive'],
  },
  plugins: [
    require('tailwindcss-text-indent')(),
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    plugin(function ({ config, addUtilities, addVariant, e, theme }) {
      // text-stroke
      addUtilities({
        '.text-stroke': {
          '-webkit-text-stroke': `1px ${theme('colors.gray.500')}`,
          '-webkit-text-fill-color': `${theme('colors.gray.100')}`,
        },
        '.text-tiny': {
          'font-size': '0.625rem',
          'line-height': '0.8125rem',
        },
      });

      // counters
      // Copyright (c) 2020 Konstantin Komelin
      const counterName = Math.random().toString(32).slice(3);

      addUtilities({
        '.counter-reset': {
          'counter-reset': counterName,
        },
        '.counter-increment': {
          'counter-increment': `${counterName} 1`,
        },
        '.counter-decrement': {
          'counter-increment': `${counterName} -1`,
        },
      });

      addUtilities(
        {
          '.counter-result': {
            content: `counter(${counterName})`,
          },
        },
        config('variants.counter', ['after', 'before']),
      );

      addVariant('before', ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => {
          return `.${e(`before${separator}${className}`)}::before`;
        });
      });
      addVariant('after', ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => {
          return `.${e(`after${separator}${className}`)}::after`;
        });
      });
    }),
  ],
};

const plugin = require('tailwindcss/plugin');

/**
 * @type {import('tailwindcss/tailwind-config').TailwindConfig}
 */
module.exports = {
  corePlugins: {
    preflight: false,
  },
  purge: {
    content: [
      './pages/**/*.{js,ts,jsx,tsx}',
      './components/**/*.{js,ts,jsx,tsx}',
      './hooks/**/*.{js,ts,jsx,tsx}',
      './public/**/*.{js,ts,jsx,tsx}',
      './images/**/*.{js,ts,jsx,tsx}',
      './utils/**/*.{js,ts,jsx,tsx}',
      './*.{js,ts,jsx,tsx}',
    ],
    options: { keyframes: true, fontFace: true, variables: true },
  },
  mode: 'jit',
  darkMode: 'media',
  theme: {
    fontFamily: {
      sans: ['Fira Sans', 'typeofweb-fallback-sans', 'Arial', 'Helvetica', 'sans-serif'],
      serif: ['Merriweather', 'typeofweb-fallback-serif', 'Times New Roman', 'Times', 'serif'],
      mono: [
        'Fira Mono',
        'typeofweb-fallback-mono',
        'Courier New',
        'Courier',
        'Consolas',
        'Menlo',
        'Liberation Mono',
        'ui-monospace',
        'SFMono-Regular',
        'monospace',
      ],
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
    extend: {
      keyframes: {
        appear: {
          '0%': {
            opacity: 0,
          },
          '50%': {
            opacity: 0,
          },
          '100%': {
            opacity: 1,
          },
        },
      },
      animation: {
        appear: 'appear 2s',
      },
    },
  },

  plugins: [
    require('@tailwindcss/forms'),
    // require('@tailwindcss/typography'),
    plugin(function ({ config, addUtilities, addVariant, e, postcss, theme }) {
      {
        addUtilities({
          '.w-fit': {
            width: 'fit-content',
          },
          '.word-break-break-word': {
            'word-break': 'break-word',
          },
          '.text-stroke': {
            '-webkit-text-stroke': `1px ${theme('colors.gray.500')}`,
            '-webkit-text-fill-color': `${theme('colors.gray.100')}`,
          },
          '.indent-0': {
            'text-indent': '0',
          },
          '.text-tiny': {
            'font-size': '0.625rem',
            'line-height': '0.8125rem',
          },
          '.no-touch-highlight': {
            '-webkit-tap-highlight-color': 'transparent',
            '-webkit-touch-callout': 'none',
            '-webkit-user-select': 'none',
            '-khtml-user-select': 'none',
            '-moz-user-select': 'none',
            '-ms-user-select': 'none',
            'user-select': 'none',
          },
          '.transcluent-white': {
            /**
             * Co = Ca*alpha + Cb*(1-alpha)
             * green: #73b588
             * blue: #301cd2
             * pink: #cf3c96
             *
             * dark:
             * green: #375841
             * blue: #342a84
             * pink: #7d3261
             *
             * light:
             * green: #e6f1ea
             * blue: #dddaf4
             * pink: #f3ddec
             */
            'backdrop-filter': 'blur(25px)',
            'background-color': 'rgba(255, 255, 255, 0.825)',
          },
          '.transcluent-black': {
            'backdrop-filter': 'blur(25px)',
            'background-color': 'rgba(0, 0, 0, 0.36)',
          },
          '.content-visibility': {
            'content-visibility': 'auto',
          },
        });
      }

      {
        // ios variant
        addVariant('ios', ({ container, separator }) => {
          const supportsRule = postcss.atRule({ name: 'supports', params: '(-webkit-touch-callout: none)' });
          supportsRule.append(container.nodes);
          container.append(supportsRule);
          supportsRule.walkRules((rule) => {
            rule.selector = `.${e(`ios${separator}${rule.selector.slice(1)}`)}`;
          });
        });
      }

      {
        // counters
        // Copyright (c) 2020 Konstantin Komelin
        const counterName = 'c' + Math.random().toString(32).slice(3);
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
        addUtilities({
          '.counter-result': {
            content: `counter(${counterName})`,
          },
        });
      }
    }),
  ],
};

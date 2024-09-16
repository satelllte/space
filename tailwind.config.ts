import type {Config} from 'tailwindcss';
import plugin from 'tailwindcss/plugin';

const config: Config = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    colors: {
      'gray-1': 'var(--color-gray-1)',
      'gray-2': 'var(--color-gray-2)',
      'gray-3': 'var(--color-gray-3)',
      'gray-4': 'var(--color-gray-4)',
      'gray-5': 'var(--color-gray-5)',
      'gray-6': 'var(--color-gray-6)',
      'gray-7': 'var(--color-gray-7)',
      'gray-8': 'var(--color-gray-8)',
      'gray-9': 'var(--color-gray-9)',
      'gray-10': 'var(--color-gray-10)',
      'gray-11': 'var(--color-gray-11)',
      'gray-12': 'var(--color-gray-12)',
    },
    extend: {},
  },
  plugins: [
    plugin(({addBase}) => {
      addBase({
        // Credit: https://github.com/radix-ui/colors
        ':root': {
          '--color-gray-1': '#fcfcfc',
          '--color-gray-2': '#f9f9f9',
          '--color-gray-3': '#f0f0f0',
          '--color-gray-4': '#e8e8e8',
          '--color-gray-5': '#e0e0e0',
          '--color-gray-6': '#d9d9d9',
          '--color-gray-7': '#cecece',
          '--color-gray-8': '#bbbbbb',
          '--color-gray-9': '#8d8d8d',
          '--color-gray-10': '#838383',
          '--color-gray-11': '#646464',
          '--color-gray-12': '#202020',

          '&.dark': {
            '--color-gray-1': '#111111',
            '--color-gray-2': '#191919',
            '--color-gray-3': '#222222',
            '--color-gray-4': '#2a2a2a',
            '--color-gray-5': '#313131',
            '--color-gray-6': '#3a3a3a',
            '--color-gray-7': '#484848',
            '--color-gray-8': '#606060',
            '--color-gray-9': '#6e6e6e',
            '--color-gray-10': '#7b7b7b',
            '--color-gray-11': '#b4b4b4',
            '--color-gray-12': '#eeeeee',
          },
        },
        '@supports (color: color(display-p3 1 1 1))': {
          ':root': {
            '--color-gray1': 'color(display-p3 0.988 0.988 0.988)',
            '--color-gray2': 'color(display-p3 0.975 0.975 0.975)',
            '--color-gray3': 'color(display-p3 0.939 0.939 0.939)',
            '--color-gray4': 'color(display-p3 0.908 0.908 0.908)',
            '--color-gray5': 'color(display-p3 0.88 0.88 0.88)',
            '--color-gray6': 'color(display-p3 0.849 0.849 0.849)',
            '--color-gray7': 'color(display-p3 0.807 0.807 0.807)',
            '--color-gray8': 'color(display-p3 0.732 0.732 0.732)',
            '--color-gray9': 'color(display-p3 0.553 0.553 0.553)',
            '--color-gray10': 'color(display-p3 0.512 0.512 0.512)',
            '--color-gray11': 'color(display-p3 0.392 0.392 0.392)',
            '--color-gray12': 'color(display-p3 0.125 0.125 0.125)',

            '&.dark': {
              '--color-gray-1': 'color(display-p3 0.067 0.067 0.067)',
              '--color-gray-2': 'color(display-p3 0.098 0.098 0.098)',
              '--color-gray-3': 'color(display-p3 0.135 0.135 0.135)',
              '--color-gray-4': 'color(display-p3 0.163 0.163 0.163)',
              '--color-gray-5': 'color(display-p3 0.192 0.192 0.192)',
              '--color-gray-6': 'color(display-p3 0.228 0.228 0.228)',
              '--color-gray-7': 'color(display-p3 0.283 0.283 0.283)',
              '--color-gray-8': 'color(display-p3 0.375 0.375 0.375)',
              '--color-gray-9': 'color(display-p3 0.431 0.431 0.431)',
              '--color-gray-10': 'color(display-p3 0.484 0.484 0.484)',
              '--color-gray-11': 'color(display-p3 0.706 0.706 0.706)',
              '--color-gray-12': 'color(display-p3 0.933 0.933 0.933)',
            },
          },
        },
      });
    }),
  ],
};

export default config;

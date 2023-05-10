/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      black: '#000',
      current: 'currentColor',
      transparent: 'transparent',

      // Brand/Almost Blk
      'almost-blk': '#25262B',
      //Brand/Off White
      'off-white': '#FAF9F6',

      primary: {
        50: '#6cc9da',
        100: '#5ac2d5',
        DEFAULT: '#48BCD1',
        300: '#40a9bc',
        400: '#3996a7',
        500: '#328392',
      },
      secondary: {
        50: '#71d7cf',
        100: '#5fd2c9',
        DEFAULT: '#4ecdc4',
        300: '#46b8b0',
        400: '#3ea49c',
        500: '#368f89',
      },
      tertiary: {
        50: '#e6d0d6',
        100: '#ddc0c8',
        DEFAULT: '#d4afb9',
        300: '#cb9eaa',
        400: '#c28e9c',
        500: '#b97d8d',
      },
      grey: {
        50: '#F8F9FA',
        100: '#E9ECEF',
        200: '#CED4DA',
        DEFAULT: '#ADB5BD',
        400: '#53575B',
        500: '#474A4D',
        600: '#333333',
      },

      medium: '#6e6969',
      light: '#f8f4f4',
      dark: '#0c0c0c',
      grey: '#DEE2E6',
      lightgrey: '#F0F0F0',
      onyx: '#353935',

      // Yellow highlighter
      highlight: '#FFFFE0',

      // Brand/White
      white: '#FFF',

      // Tertiary/Error
      error: {
        50: '#fff4f5',
        100: '#fee9ea',
        200: '#fdc8cb',
        300: '#fba7ab',
        400: '#f8646c',
        DEFAULT: '#F5222D',
        600: '#dd1f29',
        700: '#b81a22',
        800: '#93141b',
        900: '#781116',
      },
      // Tertiary/Info
      info: {
        50: '#f3f7fb',
        100: '#e6eef8',
        200: '#c1d6ed',
        300: '#9cbde3',
        400: '#528bcd',
        DEFAULT: '#0859B8',
        600: '#0750a6',
        700: '#06438a',
        800: '#05356e',
        900: '#042c5a',
      },
      // Tertiary/Success
      success: {
        50: '#f4faf7',
        100: '#e9f5ee',
        200: '#c9e5d5',
        300: '#a8d5bb',
        400: '#66b689',
        DEFAULT: '#259756',
        600: '#21884d',
        700: '#1c7141',
        800: '#165b34',
        900: '#124a2a',
      },
      // Tertiary/Warning
      warning: {
        50: '#fdfaf3',
        100: '#fcf5e7',
        200: '#f6e5c3',
        300: '#f1d59f',
        400: '#e7b656',
        DEFAULT: '#DC970E',
        600: '#c6880d',
        700: '#a5710b',
        800: '#845b08',
        900: '#6c4a07',
      },

      // The gray used for the disabled input
      disabled: '#F3F5F5',
    },
    fontSize: {
      '3xs': '8px',
      '2xs': '10px',
      xs: '12px',
      sm: '14px',
      base: '16px',
      lg: '18px',
      xl: '22px',
      '2xl': '26px',
      '3xl': '32px',
      '4xl': '36px',
      '5xl': '42px',
      '6xl': '50px',
    },
    extend: {
      fontFamily: {
        sans: [
          'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif',
          ...defaultTheme.fontFamily.sans,
        ],
      },
      spacing: {
        4.5: '1.125rem',
        5.5: '1.375rem',
        6.5: '1.625rem',
      },
    },
  },
  plugins: [],
};

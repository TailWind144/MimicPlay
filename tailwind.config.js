/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundSize: {
        '130%': '130%',
        '140%': '140%',
      },
      gridTemplateColumns: {
        normal: 'repeat(auto-fill, minmax(320px, 1fr))',
        small: 'repeat(auto-fill, minmax(260px, 1fr))',
      },
    },
  },
  plugins: [import('@headlessui/tailwindcss')],
}

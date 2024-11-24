/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'reply-color': '#403f92',
        'plus-minus-color': '#c7c7e5',
        'likes-bg-color': '#f5f6f9',
      },
    },
  },
  plugins: [],
};

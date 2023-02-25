/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          250: "#5b69c2",
          500: "#3c49a1",
        },
        secondary: {
          250: "#db5773",
          500: "#d63c5e",
        },
      },
    },
  },
  plugins: [],
};

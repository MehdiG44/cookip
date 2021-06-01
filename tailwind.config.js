module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      title: ['"Amatic SC"', "cursive"],
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};

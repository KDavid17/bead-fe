/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  important: true,
  theme: {
    extend: {
      minHeight: {
        "main": "calc(100% - 64px)"
      },
      maxWidth: {
        "full-hd": "1920px"
      }
    },
  },
  plugins: [],
}

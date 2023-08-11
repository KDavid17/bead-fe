/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  important: true,
  theme: {
    extend: {
      gridTemplateRows: {
        "min-content": "min-content",
      },
      height: {
        "eateries-clamp": "clamp(650px, 650px, 100%)",
        "dashboard-clamp": "clamp(50%, 100%, 640px)",
      },
      width: {
        "heading-clamp": "clamp(50%, 100%, 200px)",
        "card-clamp": "clamp(33%, 100%, 256px)",
      },
      minHeight: {
        "main": "calc(100% - 64px)",
      },
      maxWidth: {
        "full-hd": "1920px",
        "1/2": "50%",
      },
      backgroundColor: {
        "accent": "#b89d79",
        "secondary": "#363636",
      },
      fontFamily: {
        "math": "math",
      },
      textColor: {
        "accent": "#b89d79",
        "secondary": "#363636",
      }
    },
  },
  plugins: [],
}

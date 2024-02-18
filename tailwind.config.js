/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "rgb(var(--background) / <alpha-value>)",
        primary: "rgb(var(--primary) / <alpha-value>)",
        secondary: "rgb(var(--secondary) / <alpha-value>)",
        white: "#f5f5f5",
        glass: "rgba(0,0,0, .5)",
        gradientStart: "rgb(var(--gradient-start) / <alpha-value>)",
        gradientStop: "rgb(var(--gradient-stop) / <alpha-value>)",
        notfound: "rgba(var(--not-found) / var(--alpha-value))",
      },
      boxShadow: {
        sm: "0 0 3px .4px #000",
      },
      screens: {
        xs: "650px",
        sm: "720px",
        md: "876px",
        lg: "1150px",
        xl: "1300px",
      },
    },
  },
  plugins: [require("daisyui")],

  daisyui: {
    themes: false, // false: only light + dark | true: all themes | array: specific themes like this ["light", "dark", "cupcake"]
    base: false, // applies background color and foreground color for root element by default
    styled: true, // include daisyUI colors and design decisions for all components
    utils: true, // adds responsive and modifier utility classes
    prefix: "", // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
    logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
    themeRoot: ":root", // The element that receives theme color CSS variables
  },
};

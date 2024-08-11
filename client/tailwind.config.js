/** @type {import('tailwindcss').Config} */
const flowbite = require("flowbite-react/tailwind");

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/lib/esm/**/*.js",
    flowbite.content(),
  ],
  theme: {
    extend: {
      dark: "0F0E0E",
    },
  },
  plugins: [flowbite.plugin()],
};

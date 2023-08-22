/* eslint-disable @typescript-eslint/no-var-requires */

/** @type {import('tailwindcss').Config} */
module.exports = {
  // Aug 20 2023 -> Preflights tailwind supposed to conflict with antd5 but aren't: https://github.com/ant-design/ant-design/issues/38794 - Keep in case it comes back. Potentially hard to debug
  // corePlugins: {
  //   preflight: false,
  // },
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
};

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // You can extend Tailwind's color palette here if needed
        // Example:
        // 'brand-blue': '#007bff',
      },
      fontFamily: {
        // Add Inter if you plan to self-host or import it specifically
        // sans: ['Inter', ...defaultTheme.fontFamily.sans],
      }
    },
  },
  plugins: [
    // require('@tailwindcss/typography'), // If you want to use the prose classes for markdown styling
  ],
}
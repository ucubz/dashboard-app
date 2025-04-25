/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2D76E2",         // Tombol biru
        background: "#E6F0FA",      // Background halaman
        card: "#FFFFFF",            // Warna form
        textMain: "#333333",        // Warna teks
        danger: "#E53E3E",          // Error message
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      borderRadius: {
        xl: "1rem",
        lg: "0.5rem",
      },
      boxShadow: {
        card: "0 4px 16px rgba(0, 0, 0, 0.08)",
      },
    },
  },
  plugins: [],
}

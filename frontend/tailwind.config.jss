/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2D76E2",         // Biru tombol login
        background: "#E6F0FA",      // Background halaman
        card: "#FFFFFF",            // Warna kotak form
        textMain: "#333333",        // Judul & label
        danger: "#E53E3E",          // Untuk error message
      },
      fontFamily: {
        sans: ["'Inter'", "sans-serif"], // Ganti ke font default yang clean (atau sesuaikan dengan Figma kalau pakai font lain)
      },
      borderRadius: {
        xl: "1rem",          // Untuk card
        lg: "0.5rem",        // Untuk input
      },
      boxShadow: {
        card: "0 4px 16px rgba(0, 0, 0, 0.08)", // Shadow form
      },
    },
  },
  plugins: [],
}

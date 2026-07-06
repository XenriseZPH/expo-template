/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        // eGovPH brand palette (https://e.gov.ph)
        brand: {
          DEFAULT: "#0040e7", // royal blue — primary
          dark: "#0035c4",
          darker: "#0047ab",
          light: "#e0e9ff",
          tint: "#f0f4ff", // pale blue surface / secondary
        },
        // Philippine flag accents
        accent: {
          DEFAULT: "#fcd116", // flag yellow
          dark: "#fac51e",
        },
        ph: {
          red: "#ce1126", // flag red — destructive
          blue: "#0040e7",
          yellow: "#fcd116",
        },
        navy: "#1a1a2e", // foreground on light
        ink: {
          DEFAULT: "#1a1a2e",
          soft: "#334155",
          muted: "#64748b",
        },
      },
      fontFamily: {
        sans: ["Lexend_400Regular"],
        medium: ["Lexend_500Medium"],
        semibold: ["Lexend_600SemiBold"],
        bold: ["Lexend_700Bold"],
      },
    },
  },
  plugins: [],
}

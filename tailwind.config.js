/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        roboto: ["'Roboto Condensed'", "sans-serif"], // Correct
        oswald: ["'Oswald'", "sans-serif"], // Correct
        grotesk: ["'Space Grotesk'", "sans-serif"], // Add single quotes
        pridi: ["'Pridi'", "serif"], // Add single quotes
        lavish: ["'Lavishly Yours'", "cursive"], // Correct
      },
      colors: {
        Orangepeel: "#FF9900", // Custom orange color
      },
      keyframes: {
        scroll: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        bgPulse: {
          "0%": { backgroundColor: "#FFA500" }, // Orange Peel
          "50%": { backgroundColor: "#FF8C00" }, // Darker Orange
          "100%": { backgroundColor: "#FFA500" },
        },
      },
      animation: {
        'scroll': 'scroll 20s linear infinite',
        'bgPulse': "bgPulse 3s infinite ease-in-out",
        'spin-slow': 'spin 10s linear infinite',
      },
    },
  },
  plugins: [],
};

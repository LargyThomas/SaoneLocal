export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        "soft-linen": "#EAECE2",
        "golden-glow": "#E8D630",
        green: "#0F710A",
        "coffee-beans": "#241105",
        "vanilla-custard": "#EFE5B6",
        "forest-green": "#398236",
        "brand-green": "#17730B",
        "muted-olive": "#92B274",
        "black-forest": "#1C3A13",
        inferno: "#A30B00",
        "brown-bark": "#77502C",
        mustard: "#FED766",
      },
      borderRadius: {
        button: "5px",
        card: "10px",
        photo: "14px",
      },
      fontFamily: {
        display: ['"Sigmar One"', "cursive"],
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

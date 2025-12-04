// Centralized color theme for Kalanjay (based on logo palette)
export const THEME_COLORS = {
  primaryBrown: "#8A4F27",   // Main brand color (text + outlines)
  peach: "#F2B288",          // Butterfly peach wing
  lightBlue: "#8ECADF",      // Butterfly blue wing
  gold: "#C78A49",           // Stars + accents
  cream: "#F7EFE7",          // Background
};

// Tailwind-ready brand palette using the primary brown
export const BRAND_COLORS = {
  50: "#F3E8E2",
  100: "#E9D4C6",
  200: "#D5A98F",
  300: "#C18E6B",
  400: "#A96B40",
  500: "#8A4F27", // Primary
  600: "#70401F",
  700: "#573218",
  800: "#3F2411",
  900: "#28170B",
  DEFAULT: "#8A4F27",
};

// Neutral palette inspired by the cream background + warm brown tones
export const NEUTRAL_COLORS = {
  50: "#F7EFE7",   // cream
  100: "#F0E7DC",
  200: "#E2D5C5",
  300: "#CFBFA9",
  400: "#B7A38A",
  500: "#9C896F",
  600: "#7F6D56",
  700: "#615441",
  800: "#42392C",
  900: "#26211A",
};

export default {
  theme: THEME_COLORS,
  brand: BRAND_COLORS,
  neutral: NEUTRAL_COLORS,
};

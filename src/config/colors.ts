
export const colors = {
  // Primary colors from logo
  primary: {
    DEFAULT: "#ea384c", // Red from logo
    foreground: "hsl(0 0% 100%)" // White text on red
  },
  secondary: {
    DEFAULT: "#8E9196", // Grey from logo
    foreground: "hsl(0 0% 100%)"
  },
  // Background and surface colors
  background: {
    light: "220 5% 96%", // Light grey background
    dark: "240 10% 3.9%" // Dark mode background
  },
  foreground: {
    light: "220 10% 30%", // Dark text for light mode
    dark: "0 0% 98%" // Light text for dark mode
  },
  // UI colors
  muted: {
    DEFAULT: "#F1F1F1", // Light grey
    foreground: "hsl(var(--muted-foreground))"
  },
  destructive: {
    DEFAULT: "hsl(var(--destructive))",
    foreground: "hsl(var(--destructive-foreground))"
  }
} as const;

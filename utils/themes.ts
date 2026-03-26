export type ThemeType = "cyberpunk" | "glassmorphism" | "brutalist";

export interface ThemeConfig {
  id: ThemeType;
  name: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
    card: string;
    border: string;
  };
  styles: {
    borderRadius: string;
    borderWidth: string;
    boxShadow: string;
    blur?: string;
    fontFamily: string;
  };
}

export const themes: Record<ThemeType, ThemeConfig> = {
  cyberpunk: {
    id: "cyberpunk",
    name: "Cyberpunk 2077",
    colors: {
      primary: "#f3f406", // Neon Yellow
      secondary: "#ff003c", // Cyber Red
      accent: "#00f0ff", // Cyan Glow
      background: "#0a0a0a",
      text: "#ffffff",
      card: "rgba(20, 20, 20, 0.8)",
      border: "#f3f406",
    },
    styles: {
      borderRadius: "0px",
      borderWidth: "2px",
      boxShadow: "0 0 10px #f3f406, 0 0 20px rgba(243, 244, 6, 0.2)",
      fontFamily: "monospace",
    },
  },
  glassmorphism: {
    id: "glassmorphism",
    name: "Frosted Glass",
    colors: {
      primary: "#6366f1", // Indigo
      secondary: "#ec4899", // Pink
      accent: "#ffffff",
      background: "linear-gradient(135deg, #a5b4fc 0%, #fbcfe8 100%)",
      text: "#1e293b",
      card: "rgba(255, 255, 255, 0.4)",
      border: "rgba(255, 255, 255, 0.5)",
    },
    styles: {
      borderRadius: "24px",
      borderWidth: "1px",
      boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.07)",
      blur: "backdrop-blur-md",
      fontFamily: "Inter, sans-serif",
    },
  },
  brutalist: {
    id: "brutalist",
    name: "Neo-Brutalist",
    colors: {
      primary: "#ff90e8", // Bold Pink
      secondary: "#232129", // Near Black
      accent: "#0500ff", // Electric Blue
      background: "#ffffff",
      text: "#000000",
      card: "#ff90e8",
      border: "#000000",
    },
    styles: {
      borderRadius: "0px",
      borderWidth: "4px",
      boxShadow: "8px 8px 0px 0px #000000",
      fontFamily: "system-ui, sans-serif",
    },
  },
};

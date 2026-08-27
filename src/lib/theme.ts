export type ThemeMode = "dark" | "light";

export const THEME_STORAGE_KEY = "portfolio-theme";
export const THEME_CHANGE_EVENT = "portfolio-theme-change";

export function normalizeTheme(value: unknown): ThemeMode {
  return value === "light" ? "light" : "dark";
}

export function getScenePalette(theme: ThemeMode) {
  return {
    background: "#08090b",
    surface: "#121417",
    surfaceStrong: "#0e1013",
    selectedSurface: "#2b1b10",
    text: "#f3f2ee",
    textMuted: "#b8bbc0",
    accent: "#d98a4b",
    accentSoft: "#f0b184",
    jade: "#7fdcc0",
    violet: "#a599e9",
    shadow: "#000000",
  };
}

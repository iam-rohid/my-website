import create from "zustand";

export enum ColorScheme {
  Auto = "auto",
  Light = "light",
  Dark = "dark",
}

export interface UseColorSchemeState {
  colorScheme: ColorScheme;
  setColorScheme: (scheme: ColorScheme) => void;
  toggleColorScheme: () => void;
  isDark: () => boolean;
}

export const isPrefersColorSchemeDark = () => {
  if (!window) return false;
  return (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  );
};

export const useColorScheme = create<UseColorSchemeState>((set, get) => ({
  colorScheme: ColorScheme.Auto,
  isDark: () => {
    switch (get().colorScheme) {
      case ColorScheme.Auto:
        return isPrefersColorSchemeDark();
      case ColorScheme.Light:
        return false;
      case ColorScheme.Dark:
        return true;
    }
  },
  setColorScheme: (scheme) => {
    set((state) => ({
      ...state,
      colorScheme: scheme,
    }));
  },
  toggleColorScheme: () => {
    set((state) => ({
      ...state,
      colorScheme:
        state.colorScheme === ColorScheme.Auto
          ? ColorScheme.Light
          : state.colorScheme === ColorScheme.Light
          ? ColorScheme.Dark
          : ColorScheme.Auto,
    }));
  },
}));

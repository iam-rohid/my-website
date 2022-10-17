import { FC, useEffect, useState } from "react";
import "@src/styles/globals.css";
import type { CustomAppProps } from "@src/types/next";
import {
  ColorScheme,
  isPrefersColorSchemeDark,
  useColorScheme,
} from "@src/stores/useColorScheme";

const MyApp: FC<CustomAppProps> = ({ Component, pageProps }) => {
  const colorScheme = useColorScheme((state) => state.colorScheme);
  const setColorScheme = useColorScheme((state) => state.setColorScheme);
  const isDark = useColorScheme((state) => state.isDark);
  const getLayout = Component.getLayout || ((page) => page);
  const [colorShemeAdded, setColorShemeAdded] = useState(false);

  useEffect(() => {
    if (!window) return;
    if (!colorShemeAdded) {
      const cs = localStorage.getItem("color-scheme");
      setColorScheme(cs as any);
      setColorShemeAdded(true);
    } else {
      localStorage.setItem("color-scheme", colorScheme);
    }
    document.documentElement.classList.toggle("dark", isDark());

    const prefersColorScheme = window.matchMedia(
      "(prefers-color-scheme: dark)"
    );

    const onPrefersColorSchemeChange = () => {
      document.documentElement.classList.toggle("dark", isDark());
    };

    if (colorScheme === ColorScheme.Auto) {
      prefersColorScheme.addEventListener("change", onPrefersColorSchemeChange);
    }

    return () => {
      prefersColorScheme.removeEventListener(
        "change",
        onPrefersColorSchemeChange
      );
    };
  }, [colorScheme, isDark, setColorScheme, colorShemeAdded]);
  return <>{getLayout(<Component {...pageProps} />)}</>;
};

export default MyApp;

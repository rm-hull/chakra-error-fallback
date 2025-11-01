"use client";

import { ThemeProvider, useTheme } from "next-themes";
import type { ThemeProviderProps } from "next-themes";

export interface ColorModeProviderProps extends ThemeProviderProps {}

export function ColorModeProvider(props: ColorModeProviderProps) {
  return (
    <ThemeProvider attribute="class" disableTransitionOnChange {...props} />
  );
}

export type ColorMode = "light" | "dark";

export interface UseColorModeReturn {
  colorMode: ColorMode;
}

export function useColorMode(): UseColorModeReturn {
  const { resolvedTheme, forcedTheme } = useTheme();
  const colorMode = forcedTheme || resolvedTheme;
  return {
    colorMode: colorMode as ColorMode,
  };
}

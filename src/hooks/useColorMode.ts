"use client";

import { useTheme } from "next-themes";

export interface UseColorModeReturn {
  colorMode: ColorMode;
}

export type ColorMode = "light" | "dark";

export function useColorMode(): UseColorModeReturn {
  const { resolvedTheme, forcedTheme } = useTheme();
  const colorMode = forcedTheme || resolvedTheme;
  return {
    colorMode: colorMode as ColorMode,
  };
}
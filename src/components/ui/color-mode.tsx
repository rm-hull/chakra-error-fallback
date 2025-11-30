"use client";

import { ThemeProvider } from "next-themes";
import type { ThemeProviderProps } from "next-themes";
// import { useColorMode } from "../../hooks/useColorMode"; // Removed this line

export function ColorModeProvider(props: ThemeProviderProps) {
  return (
    <ThemeProvider attribute="class" disableTransitionOnChange {...props} />
  );
}


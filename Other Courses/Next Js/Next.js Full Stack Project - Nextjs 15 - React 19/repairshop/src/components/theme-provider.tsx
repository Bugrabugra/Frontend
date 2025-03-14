"use client";

import { ThemeProviderProps } from "next-themes/dist/types";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider({
  children,
  ...props
}: Readonly<ThemeProviderProps>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}

// app/providers.jsx
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export function NextThemeProviders({ children }) {
  return <NextUIProvider>{children}</NextUIProvider>;
}

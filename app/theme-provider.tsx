"use client";
import React from "react";
import { ThemeProvider } from "next-themes";

export default function Theme({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      defaultTheme="light"
      enableSystem={false}
      attribute="class"
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  );
}

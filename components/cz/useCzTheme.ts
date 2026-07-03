"use client";

import { useEffect, useState } from "react";

export type CzTheme = "light" | "dark";

// One data-cz-theme attribute drives every token; choice persists in
// localStorage key `cz-theme` (design handoff spec).
export function useCzTheme() {
  const [theme, setTheme] = useState<CzTheme>("light");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("cz-theme");
      if (saved === "light" || saved === "dark") setTheme(saved);
    } catch {
      /* private mode */
    }
  }, []);

  function toggleTheme() {
    setTheme((current) => {
      const next: CzTheme = current === "light" ? "dark" : "light";
      try {
        localStorage.setItem("cz-theme", next);
      } catch {
        /* private mode */
      }
      return next;
    });
  }

  return { theme, toggleTheme };
}

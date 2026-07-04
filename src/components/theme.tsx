"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";
type Ctx = { theme: Theme; toggle: () => void };

const ThemeContext = createContext<Ctx>({ theme: "light", toggle: () => {} });

/** Runs before hydration to set the theme attribute and avoid a flash. */
export const themeInitScript = `(function(){try{var t=localStorage.getItem('cz-theme');if(t!=='light'&&t!=='dark'){t='light';}document.documentElement.setAttribute('data-cz-theme',t);}catch(e){document.documentElement.setAttribute('data-cz-theme','light');}})();`;

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const current = (document.documentElement.getAttribute("data-cz-theme") as Theme) || "light";
    setTheme(current);
  }, []);

  const toggle = useCallback(() => {
    setTheme((prev) => {
      const next: Theme = prev === "light" ? "dark" : "light";
      document.documentElement.setAttribute("data-cz-theme", next);
      try { localStorage.setItem("cz-theme", next); } catch {}
      return next;
    });
  }, []);

  return <ThemeContext.Provider value={{ theme, toggle }}>{children}</ThemeContext.Provider>;
}

export const useTheme = () => useContext(ThemeContext);

export function ThemeToggle() {
  const { theme, toggle } = useTheme();
  return (
    <button
      onClick={toggle}
      aria-label="Toggle color mode"
      className="cz-mono"
      style={{
        fontSize: 12, border: "var(--cz-ghost-border)", borderRadius: 99,
        padding: "7px 15px", background: "transparent", color: "var(--cz-fg)",
        cursor: "pointer", transition: "background-color .3s ease",
      }}
    >
      {theme === "light" ? "◐" : "◑"} {theme}
    </button>
  );
}

"use client";

import dynamic from "next/dynamic";
import type { Lang } from "@/lib/problems";
import { useTheme } from "@/components/theme";

const Monaco = dynamic(() => import("@monaco-editor/react").then((m) => m.default), {
  ssr: false,
  loading: () => (
    <div className="cz-mono" style={{ padding: 20, fontSize: 13, color: "var(--cz-faint)" }}>
      Loading editor…
    </div>
  ),
});

const MONACO_LANG: Record<Lang, string> = { python: "python", c: "c", cpp: "cpp", java: "java" };

export function CodeEditor({
  language,
  value,
  onChange,
  height = 360,
}: {
  language: Lang;
  value: string;
  onChange: (v: string) => void;
  height?: number;
}) {
  const { theme } = useTheme();
  return (
    <Monaco
      height={height}
      language={MONACO_LANG[language]}
      theme={theme === "dark" ? "vs-dark" : "light"}
      value={value}
      onChange={(v) => onChange(v ?? "")}
      options={{
        fontFamily: "var(--font-ibm-plex-mono), monospace",
        fontSize: 13.5,
        minimap: { enabled: false },
        scrollBeyondLastLine: false,
        tabSize: 4,
        automaticLayout: true,
        padding: { top: 14, bottom: 14 },
        lineNumbersMinChars: 3,
      }}
    />
  );
}

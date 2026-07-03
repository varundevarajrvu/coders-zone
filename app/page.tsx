import type { Metadata } from "next";
import { Landing } from "@/components/landing/Landing";
import { czFontClass } from "@/lib/fonts";

export const metadata: Metadata = {
  title: "Coder's Zone — Answers you can defend, not just submit",
  description:
    "Try the problem first, then get code that's been run against real tests — in C, C++, Java and Python, explained line by line.",
};

export default function Home() {
  return <Landing fontClass={czFontClass} />;
}

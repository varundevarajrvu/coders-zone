"use client";

import Link from "next/link";
import { useState } from "react";
import { ThemeToggle } from "@/components/theme";
import { useAuth } from "@/components/auth";
import { SignInDialog } from "@/components/sign-in-dialog";

const LINKS = [
  { label: "Practice", href: "/practice" },
  { label: "Solver", href: "/practice" },
  { label: "Roadmaps", href: "/#loop" },
  { label: "About", href: "/#about" },
];

export function Nav() {
  const { user, enabled, signOut } = useAuth();
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <nav
      style={{
        position: "sticky", top: 0, zIndex: 50, backdropFilter: "blur(14px)",
        background: "var(--cz-nav-bg)", borderBottom: "1px solid var(--cz-line)",
        transition: "background-color .5s ease",
      }}
    >
      <div
        className="cz-container"
        style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, flexWrap: "wrap", paddingTop: 14, paddingBottom: 14 }}
      >
        <Link href="/" style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
          <span className="cz-mono" style={{ fontWeight: 600, fontSize: 15, letterSpacing: ".08em" }}>CODER&apos;S&nbsp;ZONE</span>
          <span className="cz-mono" style={{ fontWeight: 400, fontSize: 10, color: "var(--cz-faint)", letterSpacing: ".14em" }}>BETA</span>
        </Link>

        <div className="cz-nav-links" style={{ display: "flex", gap: 28, fontSize: 13.5, fontWeight: 500, color: "var(--cz-soft)" }}>
          {LINKS.map((l) => (
            <Link key={l.label} href={l.href} style={{ cursor: "pointer" }}>{l.label}</Link>
          ))}
        </div>

        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <ThemeToggle />
          {user ? (
            <>
              <span className="cz-mono" style={{ fontSize: 11, color: "var(--cz-faint)", maxWidth: 160, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {user.email}
              </span>
              <button className="cz-btn-ghost" style={{ fontSize: 12, padding: "7px 14px" }} onClick={() => signOut()}>Sign out</button>
            </>
          ) : (
            <button
              className="cz-btn"
              style={{ fontSize: 13, padding: "9px 18px" }}
              onClick={() => setDialogOpen(true)}
            >
              {enabled ? "Sign in with college email" : "Sign in"}
            </button>
          )}
        </div>
      </div>

      {dialogOpen && <SignInDialog onClose={() => setDialogOpen(false)} />}

      <style>{`@media (max-width: 760px){ .cz-nav-links{ display:none !important; } }`}</style>
    </nav>
  );
}

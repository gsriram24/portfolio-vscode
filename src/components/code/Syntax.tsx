import { type ReactNode } from "react";

// One-line syntax helpers per the handoff (homepages4.jsx:53-61).
// Each maps to a CSS variable already defined in globals.css and
// already overridden per [data-theme] block — no per-theme work needed.

export const K   = ({ children }: { children: ReactNode }) => <span style={{ color: "var(--color-keyword)"  }}>{children}</span>;
export const S   = ({ children }: { children: ReactNode }) => <span style={{ color: "var(--color-string)"   }}>{children}</span>;
export const T   = ({ children }: { children: ReactNode }) => <span style={{ color: "var(--color-type)"     }}>{children}</span>;
export const Fn  = ({ children }: { children: ReactNode }) => <span style={{ color: "var(--color-func)"     }}>{children}</span>;
export const V   = ({ children }: { children: ReactNode }) => <span style={{ color: "var(--color-variable)" }}>{children}</span>;
export const A   = ({ children }: { children: ReactNode }) => <span style={{ color: "var(--color-attr)"     }}>{children}</span>;
export const P   = ({ children }: { children: ReactNode }) => <span style={{ color: "var(--color-punct)"    }}>{children}</span>;
export const Num = ({ children }: { children: ReactNode }) => <span style={{ color: "var(--color-number)"   }}>{children}</span>;
export const C   = ({ children }: { children: ReactNode }) => <span style={{ color: "var(--color-comment)", fontStyle: "italic" }}>{children}</span>;
export const J   = ({ children }: { children: ReactNode }) => <span style={{ color: "var(--color-jsdoc)",   fontStyle: "italic" }}>{children}</span>;

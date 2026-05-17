"use client";

import { Hint } from "./Hint";

export function ThemeHint() {
  const isMac = typeof navigator !== "undefined" && /Mac/i.test(navigator.platform);
  const mod = isMac ? "⌘" : "Ctrl";
  return (
    <Hint
      id="hint-stack"
      text={`Try ${mod} ⇧ Y to switch between 6 colour themes including light mode.`}
      kbd={[mod, "⇧", "Y"]}
    />
  );
}

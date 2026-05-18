"use client";

import { useEffect } from "react";
import { toast } from "sonner";
import { HintToast } from "@/components/overlays/HintToast";
import { hasSeenHint, markHintSeen } from "./hints";

export function useHint(
  id: string,
  text: string,
  kbd?: string[],
  duration = 6000,
  mobileText?: string,
  delay = 0,
) {
  useEffect(() => {
    if (hasSeenHint(id)) return;

    const fire = () => {
      markHintSeen(id);
      const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
      const isMac =
        !isMobile &&
        typeof navigator !== "undefined" &&
        /Mac/i.test(navigator.platform);
      const finalText = isMobile && mobileText ? mobileText : text;
      const finalKbd = isMobile
        ? undefined
        : kbd?.map((k) => (k === "Ctrl" && isMac ? "⌘" : k));
      toast.custom(
        (toastId) => <HintToast toastId={toastId} text={finalText} kbd={finalKbd} />,
        { duration },
      );
    };

    if (delay > 0) {
      const timer = setTimeout(fire, delay);
      return () => clearTimeout(timer);
    }
    fire();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

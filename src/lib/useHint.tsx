"use client";

import { useEffect } from "react";
import { toast } from "sonner";
import { HintToast } from "@/components/overlays/HintToast";
import { hasSeenHint, markHintSeen } from "./hints";

export function useHint(id: string, text: string, kbd?: string[], duration = 6000) {
  useEffect(() => {
    if (hasSeenHint(id)) return;
    markHintSeen(id);
    toast.custom(
      (toastId) => <HintToast toastId={toastId} text={text} kbd={kbd} />,
      { duration }
    );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

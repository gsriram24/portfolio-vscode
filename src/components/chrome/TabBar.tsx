"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useEffect, useCallback, useState } from "react";
import { useChromeStore } from "@/lib/store";
import { EXT_COLORS, type FileExt } from "@/data/files";
import { pathFor } from "@/lib/routes";
import { ViewModeToggle } from "./ViewModeToggle";

function TabItem({
  id,
  active,
  onClose,
}: {
  id: string;
  active: boolean;
  onClose: (id: string) => void;
}) {
  const fileName = id.split("/").pop() ?? id;
  const ext = fileName.split(".").pop() ?? "";
  const dotColor = EXT_COLORS[ext as FileExt] ?? "var(--color-dim)";

  return (
    <div
      data-active={active || undefined}
      onMouseDown={(e) => {
        if (e.button === 1) {
          e.preventDefault();
          onClose(id);
        }
      }}
      className={`flex items-center gap-1.5 xl:gap-2 px-3 xl:px-3.5 h-full font-code text-[12px] xl:text-[12.5px] border-r border-border shrink-0 whitespace-nowrap select-none border-t ${
        active ? "bg-bg text-fg-hi border-t-accent" : "bg-transparent text-dim border-t-transparent"
      }`}
    >
      <Link
        href={pathFor(id)}
        className="flex items-center gap-1.5 xl:gap-2 cursor-pointer bg-transparent text-inherit no-underline"
      >
        <span className="text-[10px] xl:text-meta" style={{ color: dotColor }}>●</span>
        {fileName}
      </Link>
      <button
        onClick={() => onClose(id)}
        className="flex items-center justify-center cursor-pointer bg-transparent text-muted text-code xl:text-sm leading-none"
        title={`Close ${fileName}`}
      >
        ×
      </button>
    </div>
  );
}

export function TabBar() {
  const tabs = useChromeStore((s) => s.tabs);
  const activeTab = useChromeStore((s) => s.activeTab);
  const recentTabs = useChromeStore((s) => s.recentTabs);
  const closeTab = useChromeStore((s) => s.closeTab);
  const router = useRouter();

  const scrollRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{ startX: number; startScrollLeft: number } | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Recompute thumb width + position
  const updateThumb = useCallback(() => {
    const c = scrollRef.current;
    const t = thumbRef.current;
    if (!c || !t) return;
    const ratio = c.clientWidth / c.scrollWidth;
    if (ratio >= 1) { t.style.display = "none"; return; }
    t.style.display = "block";
    t.style.width = `${ratio * 100}%`;
    t.style.left = `${(c.scrollLeft / c.scrollWidth) * 100}%`;
  }, []);

  useEffect(() => {
    const c = scrollRef.current;
    if (!c) return;
    updateThumb();
    c.addEventListener("scroll", updateThumb);
    window.addEventListener("resize", updateThumb);
    return () => {
      c.removeEventListener("scroll", updateThumb);
      window.removeEventListener("resize", updateThumb);
    };
  }, [updateThumb, tabs]);

  // Auto-scroll active tab into view
  useEffect(() => {
    const c = scrollRef.current;
    if (!c) return;
    const el = c.querySelector<HTMLElement>("[data-active]");
    if (!el) return;
    if (el.offsetLeft < c.scrollLeft) {
      c.scrollLeft = el.offsetLeft;
    } else if (el.offsetLeft + el.offsetWidth > c.scrollLeft + c.clientWidth) {
      c.scrollLeft = el.offsetLeft + el.offsetWidth - c.clientWidth;
    }
  }, [activeTab]);

  // Wheel → horizontal scroll
  const handleWheel = useCallback((e: WheelEvent) => {
    e.preventDefault();
    if (scrollRef.current) scrollRef.current.scrollLeft += e.deltaY !== 0 ? e.deltaY : e.deltaX;
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => el.removeEventListener("wheel", handleWheel);
  }, [handleWheel]);

  // Thumb drag
  const onThumbPointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    const c = scrollRef.current;
    if (!c) return;
    dragRef.current = { startX: e.clientX, startScrollLeft: c.scrollLeft };
    e.currentTarget.setPointerCapture(e.pointerId);
    setIsDragging(true);
  }, []);

  const onThumbPointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragRef.current) return;
    const c = scrollRef.current;
    if (!c) return;
    const dx = e.clientX - dragRef.current.startX;
    c.scrollLeft = dragRef.current.startScrollLeft + dx * (c.scrollWidth / c.clientWidth);
  }, []);

  const onThumbPointerUp = useCallback(() => {
    dragRef.current = null;
    setIsDragging(false);
  }, []);

  const handleClose = (id: string) => {
    if (id === activeTab) {
      const remaining = tabs.filter((t) => t !== id);
      const next =
        [...recentTabs].reverse().find((t) => t !== id && remaining.includes(t)) ??
        remaining[0] ??
        "Sriram.tsx";
      router.push(pathFor(next));
    }
    closeTab(id);
  };

  return (
    <div className="h-8.5 bg-bg-elev border-b border-border flex items-stretch shrink-0">
      {/* Tab strip + custom scrollbar wrapper */}
      <div className="relative flex-1 min-w-0 overflow-hidden group/tabs">
        {/* Scrollable tabs — native scrollbar fully hidden */}
        <div
          ref={scrollRef}
          className="flex h-full overflow-x-scroll scrollbar-none! items-stretch"
        >
          {tabs.map((id) => (
            <TabItem key={id} id={id} active={id === activeTab} onClose={handleClose} />
          ))}
        </div>

        {/* Custom floating scrollbar — shown on hover or while dragging */}
        <div
          className={`absolute bottom-0 left-0 right-0 h-[3px] pointer-events-none transition-opacity duration-150 ${
            isDragging ? "opacity-100" : "opacity-0 group-hover/tabs:opacity-100"
          }`}
        >
          <div
            ref={thumbRef}
            className="absolute top-0 h-full bg-[rgba(121,121,121,0.4)] hover:bg-[rgba(121,121,121,0.7)] pointer-events-auto cursor-default transition-colors duration-100"
            onPointerDown={onThumbPointerDown}
            onPointerMove={onThumbPointerMove}
            onPointerUp={onThumbPointerUp}
          />
        </div>
      </div>

      {/* View mode toggle — tablet only */}
      <div className="hidden md:flex xl:hidden items-center px-2 border-l border-border shrink-0">
        <ViewModeToggle size="tablet" twoWay />
      </div>
    </div>
  );
}

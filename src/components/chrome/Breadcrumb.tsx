// Design: padding 4px 16px · gap 6px · › separator in #3E3E42 · bg editor.
// Font: tablet 11px (text-meta), desktop 11.5px.
export function Breadcrumb({ path }: { path: string }) {
  const parts = path.split("/");

  return (
    <div
      className="h-6 bg-bg border-b border-border flex items-center gap-1.5 px-4 font-code text-meta xl:text-[11.5px] shrink-0 overflow-hidden"
    >
      {parts.map((part, i) => (
        <span key={`${i}-${part}`} className="flex items-center gap-1.5">
          {i > 0 && <span className="text-muted">›</span>}
          <span
            className={i === parts.length - 1 ? "text-fg whitespace-nowrap" : "text-dim whitespace-nowrap"}
          >
            {part}
          </span>
        </span>
      ))}
    </div>
  );
}

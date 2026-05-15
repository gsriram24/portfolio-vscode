import { ChevronRight } from "lucide-react";

export function Breadcrumb({ path }: { path: string }) {
  const parts = path.split("/");

  return (
    <div className="h-6 bg-bg-elev border-b border-border flex items-center px-3 font-code text-meta shrink-0 overflow-hidden gap-0.5">
      {parts.map((part, i) => (
        <span key={`${i}-${part}`} className="flex items-center gap-0.5">
          {i > 0 && <ChevronRight size={11} className="text-muted" />}
          <span className={i === parts.length - 1 ? "text-fg whitespace-nowrap" : "text-dim whitespace-nowrap"}>
            {part}
          </span>
        </span>
      ))}
    </div>
  );
}

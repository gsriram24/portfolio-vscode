import type { ProjectType } from "@/data/types";

const TYPE_META: Partial<Record<ProjectType, { label: string; color: string; bg: string; border: string }>> = {
  client: { label: "Client",      color: "text-func",   bg: "bg-func/10",   border: "border-func/20"   },
  oss:    { label: "Open Source", color: "text-number", bg: "bg-number/10", border: "border-number/20" },
};

export function TypeBadge({ type }: { type: ProjectType }) {
  const meta = TYPE_META[type];
  if (!meta) return null;
  return (
    <span className={`font-code text-meta ${meta.color} ${meta.bg} border ${meta.border} px-2 py-0.5 rounded-[3px] shrink-0`}>
      {meta.label}
    </span>
  );
}

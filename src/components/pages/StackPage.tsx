import type { StackCategory } from "@/data/types";
import { STACK } from "@/data/stack";

export function StackPage() {
  const totalTech = STACK.reduce((sum, cat) => sum + cat.items.length, 0);

  return (
    <div className="flex flex-col gap-5 md:gap-6">
      {/* Header */}
      <div className="flex items-baseline justify-between gap-4">
        <h1 className="font-ui text-h2 font-bold text-fg-hi m-0 tracking-tight leading-none">
          stack.ts
        </h1>
        <span className="font-code text-meta text-dim shrink-0">
          {STACK.length} categories · {totalTech} technologies
        </span>
      </div>

      {/* Grid — 1 col mobile, 2 col tablet, 3 col desktop */}
      <div className="grid grid-cols-1 lg :grid-cols-2 xl:grid-cols-3 gap-3">
        {STACK.map((cat) => (
          <StackBlock key={cat.id} cat={cat} />
        ))}
      </div>
    </div>
  );
}

function StackBlock({ cat }: { cat: StackCategory }) {
  return (
    <div className="flex flex-col gap-2 lg:gap-2.5 py-3.5 px-4 lg:py-4.5 lg:px-5 bg-side border border-border rounded-sm">
      {/* Category heading */}
      <div className="flex items-center gap-2">
        <span className="w-1.75 h-1.75 rounded-full shrink-0" style={{ background: cat.color }} />
        <span className="font-ui text-ui lg:text-body font-semibold text-fg-hi">{cat.label}</span>
      </div>

      {/* Note */}
      <div className="font-code text-meta text-dim">{cat.note}</div>

      {/* Skill chips */}
      <div className="flex flex-wrap gap-1.25 lg:gap-1.5">
        {cat.items.map((name) => (
          <SkillChip key={name} name={name} color={cat.color} />
        ))}
      </div>
    </div>
  );
}

function SkillChip({ name, color }: { name: string; color: string }) {
  return (
    <span className="inline-flex items-center gap-1.25 px-2.25 py-0.75 bg-white/4 border border-border rounded-[3px] font-ui text-code text-fg shrink-0">
      <span className="w-1.25 h-1.25 rounded-full shrink-0" style={{ background: color }} />
      {name}
    </span>
  );
}

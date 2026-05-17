import Link from "next/link";
import type { ProjectEntry } from "@/data/types";
import { listingProjects, pathForProject } from "@/lib/projects";

const TYPE_LABELS: Record<string, string> = {
  oss: "Open Source",
  client: "Client",
  personal: "Personal",
};

export function ProjectsGrid() {
  const projects = listingProjects();

  return (
    <div className="flex flex-col gap-9 md:gap-12">
      {/* Header */}
      <header className="flex flex-col gap-2.5">
        <div className="font-code text-meta text-dim tracking-[0.06em]">projects/index.ts</div>
        <h1 className="font-ui text-h1 font-bold text-fg-hi m-0 tracking-tight leading-[1.05]">
          Projects
        </h1>
        <p className="font-ui text-body text-dim m-0 mt-1">
          {projects.length} projects — open source, client &amp; personal work
        </p>
      </header>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {projects.map((p) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
      </div>
    </div>
  );
}

function ProjectCard({ project: p }: { project: ProjectEntry }) {
  return (
    <Link
      href={pathForProject(p)}
      prefetch={false}
      className="flex flex-col gap-3 p-4 md:px-4.5 bg-side border border-border rounded-sm no-underline transition-colors duration-(--duration-fast) ease-vscode hover:border-accent hover:bg-side-hi"
    >
      {/* Filename + type */}
      <div className="flex items-center justify-between gap-2">
        <span className="font-code text-meta text-func">● {p.slug}.tsx</span>
        <span className="font-code text-meta text-dim shrink-0">
          {TYPE_LABELS[p.type] ?? p.type}
        </span>
      </div>

      {/* Title */}
      <div className="font-ui text-ui font-semibold text-fg-hi leading-snug">{p.title}</div>

      {/* Summary */}
      <div className="font-ui text-ui leading-[1.6] text-dim">{p.summary}</div>

      {/* Tags + duration */}
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-auto pt-1">
        {p.tags?.map((tag) => (
          <span key={tag} className="font-code text-meta text-type">
            {tag}
          </span>
        ))}
        {p.duration && (
          <span className="font-code text-meta text-dim">{p.duration}</span>
        )}
      </div>
    </Link>
  );
}

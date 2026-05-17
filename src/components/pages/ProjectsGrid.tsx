import Link from "next/link";
import { ExternalLink } from "lucide-react";
import type { ProjectEntry } from "@/data/types";
import { listingProjects, pathForProject } from "@/lib/projects";
import { OpenSearchButton } from "@/components/chrome/OpenSearchButton";
import { TypeBadge } from "./TypeBadge";

export function ProjectsGrid() {
  const projects = listingProjects();

  return (
    <div className="flex flex-col gap-5 md:gap-6">
      {/* Header */}
      <div className="flex items-baseline justify-between gap-4">
        <h1 className="font-ui text-h2 font-bold text-fg-hi m-0 tracking-tight leading-none">
          projects/
        </h1>
        <span className="font-code text-meta text-dim shrink-0">
          {projects.length} projects <OpenSearchButton />
        </span>
      </div>

      {/* Grid — 1 col mobile, 2 col tablet, 3 col desktop */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {projects.map((p) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
      </div>
    </div>
  );
}

function ProjectCard({ project: p }: { project: ProjectEntry }) {
  return (
    <div className="relative flex flex-col gap-2 px-4 py-3.75 bg-side border border-border rounded-sm transition-[border-color,background] duration-(--duration-fast) ease-vscode hover:border-accent hover:bg-side-hi">
      {/* Stretched card link — sits behind everything */}
      <Link
        href={pathForProject(p)}
        prefetch={false}
        className="absolute inset-0 rounded-sm"
        aria-label={p.title}
      />

      {/* Filename + type badge + featured badge */}
      <div className="flex items-center gap-1.5 flex-wrap">
        <span className="font-code text-meta text-func flex-1 min-w-0 truncate">
          ● {p.slug}.tsx
        </span>
        <TypeBadge type={p.type} />
        {p.featured && (
          <span className="font-code text-meta text-dim bg-muted px-1.5 py-0.5 rounded-xs shrink-0">
            ★ featured
          </span>
        )}
      </div>

      {/* Title */}
      <div className="font-ui text-ui font-semibold text-fg-hi leading-[1.3]">{p.title}</div>

      {/* Summary */}
      <div className="font-ui text-code text-fg leading-[1.6] flex-1">{p.summary}</div>

      {/* Tag chips */}
      {!!p.tags?.length && (
        <div className="flex gap-1 flex-wrap">
          {p.tags.map((t) => (
            <span key={t} className="font-code text-meta text-dim bg-muted px-1.75 py-0.5 rounded-xs">
              {t}
            </span>
          ))}
        </div>
      )}

      {/* Stack */}
      {!!p.stack?.length && (
        <div className="font-code text-meta text-dim">{p.stack.slice(0, 4).join(" · ")}</div>
      )}

      {/* Links — relative z-10 so they sit above the stretched card link */}
      {!!p.links?.length && (
        <div className="relative z-10 flex gap-4 mt-0.5 flex-wrap">
          {p.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-1 font-code text-meta tracking-normal no-underline hover:opacity-80 transition-opacity duration-(--duration-fast) leading-none py-2 ${link.primary ? "text-accent" : "text-dim"}`}
            >
              <ExternalLink size={10} strokeWidth={2} aria-hidden />
              {link.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

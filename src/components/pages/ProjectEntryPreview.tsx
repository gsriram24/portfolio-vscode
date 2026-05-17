import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { ProjectEntry } from "@/data/types";
import { ImagesGallery } from "./ImagesGallery";
import { TypeBadge } from "./TypeBadge";
import { Breadcrumb } from "./Breadcrumb";

export function ProjectEntryPreview({ project }: { project: ProjectEntry }) {
  const isWorkProduct = project.type === "work-product";
  const parentHref = isWorkProduct ? `/experience/${project.company}` : "/projects";
  const parentLabel = isWorkProduct ? "experience" : "projects";
  const scope = project.tags?.join(" · ");

  return (
    <div className="flex flex-col gap-6 md:gap-8">
      {/* Back breadcrumb */}
      <Breadcrumb
        href={parentHref}
        segments={
          isWorkProduct
            ? [parentLabel, project.company!, `${project.slug}.tsx`]
            : [parentLabel, `${project.slug}.tsx`]
        }
      />

      {/* Header — badge chip + duration + scope, then h1 */}
      <header>
        <div className="flex items-center gap-2.5 flex-wrap mb-2.5">
          <TypeBadge type={project.type} />
          {project.duration && (
            <span className="font-code text-meta text-dim">{project.duration}</span>
          )}
          {scope && <span className="font-code text-meta text-dim">· {scope}</span>}
        </div>
        <h1 className="font-ui text-h1 font-bold text-fg-hi m-0 tracking-tight leading-[1.1]">
          {project.title}
        </h1>
      </header>

      {/* Impact stats — BEFORE description */}
      {!!project.impact?.length && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5">
          {project.impact.map((m) => (
            <div
              key={m.label}
              className="flex flex-col px-4 md:px-5 py-3.5 md:py-4 bg-side border border-border rounded-sm"
            >
              <span className="font-ui text-h2 font-bold text-fg-hi tracking-tight leading-none mb-1">
                {m.value}
              </span>
              <span className="font-code text-meta text-dim">{m.label}</span>
            </div>
          ))}
        </div>
      )}

      {/* Description */}
      <p className="font-ui text-body leading-[1.7] text-fg m-0 max-w-[72ch]">
        {project.description}
      </p>

      {/* Highlights */}
      {!!project.highlights?.length && (
        <section>
          <SectionLabel>Highlights</SectionLabel>
          <div className="flex flex-col gap-2">
            {project.highlights.map((h, i) => (
              <div key={i} className="flex items-baseline gap-2.5 text-ui text-fg">
                <span className="text-[9px] text-comment shrink-0">●</span>
                <span className="font-ui text-ui leading-[1.65]">{h}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Stack */}
      {!!project.stack?.length && (
        <section>
          <SectionLabel>Stack</SectionLabel>
          <div className="flex flex-wrap gap-1.5">
            {project.stack.map((s) => (
              <span
                key={s}
                className="font-code text-meta text-type bg-bg-elev border border-border rounded-[3px] px-2.5 py-0.75"
              >
                {s}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Links — primary (filled, func color) + secondary (ghost) */}
      {!!project.links?.length && (
        <div className="flex flex-wrap gap-2">
          {project.links.map((link) =>
            link.primary ? (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-ui text-ui font-semibold bg-func text-bg px-5 py-2 rounded-sm no-underline hover:opacity-90 transition-opacity duration-(--duration-fast) ease-vscode"
              >
                {link.label}
                <ArrowRight size={13} strokeWidth={2.25} aria-hidden />
              </a>
            ) : (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-ui text-ui text-fg border border-muted px-5 py-2 rounded-sm no-underline hover:border-fg transition-colors duration-(--duration-fast) ease-vscode"
              >
                {link.label}
                <ArrowUpRight size={13} strokeWidth={2.25} aria-hidden />
              </a>
            ),
          )}
        </div>
      )}

      {/* Images gallery — hero + thumbnail strip */}
      {!!project.images?.length && (
        <section>
          <SectionLabel>
            Screenshots · {project.images.length} image{project.images.length !== 1 ? "s" : ""}
          </SectionLabel>
          <ImagesGallery images={project.images} title={project.title} />
        </section>
      )}

      {/* Testimonial */}
      {!!project.testimonial && (
        <section>
          <div className="bg-side border-l-[3px] border-comment rounded-r-sm px-4 md:px-5 py-3.5 md:py-4">
            <p className="font-ui text-body leading-[1.65] text-fg italic m-0 mb-2.5">
              &ldquo;{project.testimonial.quote}&rdquo;
            </p>
            <div className="font-code text-meta text-dim">
              — {project.testimonial.author} · {project.testimonial.role}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="font-code text-meta text-accent uppercase tracking-[0.08em] mb-2.5">
      {children}
    </div>
  );
}

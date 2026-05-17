import Link from "next/link";
import { ArrowRight, ArrowUp } from "lucide-react";
import type { Company } from "@/data/types";
import { projectsOfCompany, pathForProject } from "@/lib/projects";
import { Breadcrumb } from "./Breadcrumb";

// CompanyEntry preview — renders one Company record.
// Per handoff company-entry.jsx CompanyEntryPreview (lines 259-374):
//   back-breadcrumb → header (duration + name + description) → roles timeline
//   → stack chips → inline projects → awards? → responsibilities?
// All conditional sections are conditional on data presence.

export function CompanyEntryPreview({ company }: { company: Company }) {
  const projects = projectsOfCompany(company.slug);
  const hasAwards = !!company.awards?.length;
  const hasResponsibilities = !!company.responsibilities?.length;

  return (
    <div className="flex flex-col gap-6 md:gap-8">
      {/* Back breadcrumb */}
      <Breadcrumb href="/" segments={["experience", `${company.slug}/index.ts`]} />

      {/* Header */}
      <header className="flex flex-col gap-2.5">
        <div className="font-code text-meta text-dim tracking-[0.06em]">{company.duration}</div>
        <h1 className="font-ui text-h1 font-bold text-fg-hi m-0 tracking-tight leading-[1.05]">
          {company.companyName}
        </h1>
        <p className="font-ui text-body leading-[1.7] text-fg m-0 max-w-[96ch] mt-3">
          {company.description}
        </p>
      </header>

      {/* Roles */}
      <section>
        <SectionLabel>Roles</SectionLabel>
        <RoleTimeline roles={company.roles} />
      </section>

      {/* Stack */}
      <section>
        <SectionLabel>Stack</SectionLabel>
        <div className="flex flex-wrap gap-1.5">
          {company.stack.map((s) => (
            <span
              key={s}
              className="font-code text-meta text-type bg-bg-elev border border-border rounded-[3px] px-2.5 py-0.75"
            >
              {s}
            </span>
          ))}
        </div>
      </section>

      {/* Projects (inline) */}
      {projects.length > 0 && (
        <section>
          <SectionLabel>Projects</SectionLabel>
          <div className="flex flex-col gap-2.5">
            {projects.map((p) => (
              <ProjectInlineBlock key={p.slug} project={p} />
            ))}
          </div>
        </section>
      )}

      {/* Awards */}
      {hasAwards && (
        <section>
          <SectionLabel>Awards</SectionLabel>
          <div className="flex flex-col">
            {company.awards!.map((a, i) => (
              <div
                key={i}
                className="flex items-start gap-3 py-3 border-b border-border last:border-b-0"
              >
                <span className="text-number text-meta mt-1 shrink-0">✦</span>
                <div>
                  <div className="font-ui text-ui font-semibold text-fg-hi mb-1">{a.title}</div>
                  <div className="font-code text-meta text-dim mb-1.5">{a.date}</div>
                  <p className="font-ui text-ui leading-[1.6] text-fg m-0">{a.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Other responsibilities */}
      {hasResponsibilities && (
        <section>
          <SectionLabel>Other responsibilities</SectionLabel>
          <div className="flex flex-col gap-4">
            {company.responsibilities!.map((r, i) => (
              <div key={i}>
                <div className="font-ui text-ui font-semibold text-fg-hi mb-1">{r.title}</div>
                <div className="font-code text-meta text-dim mb-1.5">{r.duration}</div>
                <p className="font-ui text-ui leading-[1.65] text-fg m-0">{r.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function ProjectInlineBlock({
  project: p,
}: {
  project: ReturnType<typeof projectsOfCompany>[number];
}) {
  const linkable = p.hasDetailPage !== false;
  const body = (
    <div className="flex items-start gap-3">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1.5 flex-wrap">
          <span className="font-code text-meta text-func">● {p.slug}.tsx</span>
          {p.duration && <span className="font-code text-meta text-dim">{p.duration}</span>}
        </div>
        <div className="font-ui text-ui font-semibold text-fg-hi mb-1">{p.title}</div>
        <div className="font-ui text-ui leading-[1.6] text-dim">{p.summary}</div>
      </div>
      {linkable && (
        <ArrowRight
          size={14}
          strokeWidth={2.25}
          aria-hidden
          className="text-accent shrink-0 mt-1"
        />
      )}
    </div>
  );

  const cls =
    "block p-4 md:px-4.5 bg-side border border-border rounded-sm no-underline transition-colors duration-(--duration-fast) ease-vscode" +
    (linkable ? " hover:border-accent hover:bg-side-hi" : "");

  return linkable ? (
    <Link href={pathForProject(p)} prefetch={false} className={cls}>
      {body}
    </Link>
  ) : (
    <div className={cls}>{body}</div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="font-code text-meta text-accent uppercase tracking-[0.08em] mb-3">
      {children}
    </div>
  );
}

function RoleTimeline({ roles }: { roles: Company["roles"] }) {
  return (
    <div className="flex flex-col">
      {roles.map((role, i) => {
        const isLast = i === roles.length - 1;
        return (
          <div key={i} className="flex items-stretch gap-4">
            {/* Left gutter: dot + connecting line. The dot is positioned at
                top:6px so it aligns with the first text baseline of the
                role title. The line fills the remaining vertical space. */}
            <div className="relative w-2 shrink-0">
              <span
                className={`absolute top-1.5 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full border ${
                  i === 0
                    ? "bg-accent border-accent"
                    : "bg-bg border-dim"
                }`}
              />
              {!isLast && (
                <span className="absolute top-4.5 bottom-0 left-1/2 -translate-x-1/2 w-px bg-border" />
              )}
            </div>

            {/* Role content + optional promotion marker above the next role */}
            <div className={`flex-1 ${isLast ? "" : "pb-5"}`}>
              {i > 0 && role.promoted && (
                <div className="mb-3 -mt-1">
                  <span className="inline-flex items-center gap-1.5 font-code text-meta text-shipping border border-shipping bg-[rgba(106,153,85,0.08)] tracking-[0.06em] px-2 py-0.5 rounded-[3px]">
                    <ArrowUp size={10} strokeWidth={2.25} aria-hidden />
                    promoted
                  </span>
                </div>
              )}
              <div
                className={`font-ui text-ui font-semibold mb-1 ${
                  i === 0 ? "text-fg-hi" : "text-fg"
                }`}
              >
                {role.title}
              </div>
              <div
                className={`font-code text-meta text-dim ${
                  role.description ? "mb-2" : ""
                }`}
              >
                {role.duration}
              </div>
              {role.description && (
                <p className="font-ui text-ui leading-[1.65] text-fg m-0 max-w-[96ch]">
                  {role.description}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

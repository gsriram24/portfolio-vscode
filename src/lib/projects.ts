import { PROJECTS } from "@/data/projects";
import type { ProjectEntry } from "@/data/types";

// Helpers over the unified PROJECTS array. Centralising these so call sites
// (sidebar tree builder, homepage hero grid, route generation, page templates)
// don't replicate filter logic.

export function findProject(slug: string): ProjectEntry | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}

// Work-products built at a specific company (used by CompanyEntry's
// inline projects section + sidebar's experience/<co>/ folder).
export function projectsOfCompany(companySlug: string): ProjectEntry[] {
  return PROJECTS.filter(
    (p) => p.type === "work-product" && p.company === companySlug,
  );
}

// Projects shown on /projects listing — everything except work-products
// (work-products belong to a company, not the standalone grid).
export function listingProjects(): ProjectEntry[] {
  return PROJECTS.filter((p) => p.type !== "work-product");
}

// Homepage hero grid.
export function featuredProjects(): ProjectEntry[] {
  return PROJECTS.filter((p) => p.featured);
}

// Project route — work-products live under their company, others under /projects.
export function pathForProject(p: ProjectEntry): string {
  return p.type === "work-product"
    ? `/experience/${p.company}/${p.slug}`
    : `/projects/${p.slug}`;
}

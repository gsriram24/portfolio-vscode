// Phase 5 — Data Layer types.
//
// All content models for the portfolio live here. UI components (Phase 6)
// read these structures; nothing in this file knows about presentation.
//
// Architecture: unified PROJECTS array (Option A — see plan doc). Every
// project (work-product, client, oss, personal) shares the same
// ProjectEntry shape. `type` + `company` drive routing and listing.

export type ProjectType = "work-product" | "client" | "oss" | "personal";

export interface ProjectMetric {
  value: string;
  label: string;
}

export interface ProjectLink {
  label: string;
  href: string;
  primary?: boolean;
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
}

export interface ProjectEntry {
  slug: string;
  title: string;
  type: ProjectType;
  company?: string;            // required iff type === "work-product"; slug of parent Company
  duration?: string;           // "Dec 2025 – present"
  tags?: string[];             // freeform display strings ("Frontend", "Animation"); render header as duration + tags joined; chips on grid card
  featured?: boolean;          // appears on homepage hero grid
  hasDetailPage?: boolean;     // default true. Set false when content is too thin to warrant a /detail page — CompanyEntry then renders the project inline (no → arrow, no link).
  summary: string;             // 1-2 sentences (Company inline blocks + listing cards)
  meta?: string;               // short punchy stat ("34,900+ schemas · AI-driven") — homepage featured card only
  description: string;         // long form prose (newlines allowed)
  highlights?: string[];
  impact?: ProjectMetric[];
  images?: string[];
  testimonial?: Testimonial;
  stack?: string[];
  links?: ProjectLink[];
}

export interface CompanyRole {
  title: string;
  duration: string;
  promoted?: boolean;          // true on the second-or-later role inserts ↑ marker
  description?: string;
}

export interface CompanyAward {
  title: string;
  date: string;
  description: string;
}

export interface CompanyResponsibility {
  title: string;
  duration: string;
  description: string;
}

export interface Company {
  slug: string;
  companyName: string;
  duration: string;
  description: string;
  roles: CompanyRole[];        // newest first
  stack: string[];
  projectSlugs: string[];      // refs PROJECTS where type==="work-product" && company===this.slug
  awards?: CompanyAward[];
  responsibilities?: CompanyResponsibility[];
}

export interface TalkLink {
  label: string;
  href: string;
}

export interface TalkEntry {
  slug: string;
  event: string;
  title: string;
  date: Date;                  // status (upcoming/past) derived at render time
  location: string;
  description?: string;
  photo?: string;
  links?: TalkLink[];          // meetup page, slides URL, recording URL, etc. — all rendered as a flat link list (no embeds)
}

export interface StackCategory {
  id: string;
  label: string;
  note?: string;
  color: string;               // CSS var ref ("var(--color-type)") — drives heading dot + skill chip dots per design's STACK rendering
  items: string[];
}

export interface ContactInfo {
  email: string;
  github: string;
  linkedin: string;
  npm: string;
  whatsapp: string;
}

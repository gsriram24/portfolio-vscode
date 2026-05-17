import Link from "next/link";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { Fragment } from "react";

interface BreadcrumbProps {
  href: string;
  segments: string[];
}

export function Breadcrumb({ href, segments }: BreadcrumbProps) {
  return (
    <Link
      href={href}
      prefetch={false}
      className="inline-flex items-center gap-1.5 font-code text-code text-dim no-underline transition-colors duration-(--duration-fast) ease-vscode hover:text-accent w-fit"
    >
      <ArrowLeft size={12} strokeWidth={2.25} aria-hidden className="text-accent" />
      {segments.map((seg, i) => (
        <Fragment key={i}>
          {i > 0 && <ChevronRight size={11} strokeWidth={2.25} aria-hidden className="text-muted" />}
          <span className={i === segments.length - 1 ? "text-fg" : ""}>{seg}</span>
        </Fragment>
      ))}
    </Link>
  );
}

"use client";

import { useState } from "react";
import {
  ArrowRight,
  Mail,
  GitFork,
  Globe,
  Package,
  MessageCircle,
  Copy,
  Check,
  ExternalLink,
} from "lucide-react";
import { toast } from "sonner";
import { CONTACT } from "@/data/contact";

const LINKS = [
  {
    icon: Mail,
    label: "email",
    display: CONTACT.email,
    href: `mailto:${CONTACT.email}`,
    action: "copy",
    color: "var(--color-accent)",
  },
  {
    icon: GitFork,
    label: "github",
    display: CONTACT.github.replace("https://", ""),
    href: CONTACT.github,
    action: "open",
    color: "var(--color-func)",
  },
  {
    icon: Globe,
    label: "linkedin",
    display: CONTACT.linkedin.replace("https://", ""),
    href: CONTACT.linkedin,
    action: "open",
    color: "var(--color-type)",
  },
  {
    icon: Package,
    label: "npm",
    display: CONTACT.npm.replace("https://", ""),
    href: CONTACT.npm,
    action: "open",
    color: "var(--color-number)",
  },
  {
    icon: MessageCircle,
    label: "whatsapp",
    display: "+91-876-241-2275",
    href: CONTACT.whatsapp,
    action: "open",
    color: "var(--color-shipping)",
  },
];

export function ContactPage() {
  const [copied, setCopied] = useState(false);
  const [fields, setFields] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);

  const handleCopy = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fields),
      });
      setSending(false);
      if (res.ok) {
        setFields({ name: "", email: "", message: "" });
        toast.success("Message sent", {
          description: "I'll reply within 48h",
          className: "!bg-bg-elev !border-border !border-l-[3px] !border-l-shipping !text-fg-hi !font-ui",
        });
      } else {
        toast.error("Something went wrong", {
          description: "Try again or email gsriram2403@gmail.com",
          className: "!bg-bg-elev !border-border !border-l-[3px] !border-l-error !text-fg-hi !font-ui",
        });
      }
    } catch {
      setSending(false);
      toast.error("Something went wrong", {
        description: "Try again or email gsriram2403@gmail.com",
        className: "!bg-bg-elev !border-border !border-l-[3px] !border-l-error !text-fg-hi !font-ui",
      });
    }
  };

  return (
    <div className="flex flex-col xl:flex-row gap-6 xl:gap-8 py-0">
      {/* Left — direct links */}
      <div className="w-full xl:w-2/5 shrink-0 flex flex-col">
        <h1 className="font-ui text-h2 font-bold text-fg-hi m-0 tracking-tight leading-none mb-1">
          contact.ts
        </h1>

        {/* Link rows */}
        <div className="flex flex-col">
          {LINKS.map((l) => (
            <div key={l.label} className="flex items-center gap-3 py-2.5 border-b border-border">
              <l.icon
                size={14}
                strokeWidth={1.75}
                className="shrink-0"
                style={{ color: l.color }}
              />
              <div className="flex-1 min-w-0">
                <div className="font-code text-meta text-dim mb-0.5">{l.label}</div>
                <div className="font-code text-code text-fg truncate">{l.display}</div>
              </div>
              {l.action === "copy" ? (
                <button
                  onClick={() => handleCopy(l.display)}
                  className="inline-flex items-center gap-1 font-code text-meta text-accent shrink-0 bg-transparent border-0 p-0 cursor-pointer hover:opacity-80 transition-opacity duration-(--duration-fast)"
                >
                  {copied ? (
                    <Check size={11} strokeWidth={2.25} />
                  ) : (
                    <Copy size={11} strokeWidth={1.75} />
                  )}
                  {copied ? "copied" : "copy"}
                </button>
              ) : (
                <a
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-code text-meta text-accent shrink-0 no-underline hover:opacity-80 transition-opacity duration-(--duration-fast)"
                >
                  <ExternalLink size={11} strokeWidth={1.75} />
                  open
                </a>
              )}
            </div>
          ))}
        </div>

        {/* Availability badge */}
        <div className="mt-5 flex items-center gap-2 py-2.5 px-3.5 bg-side border border-border rounded-[3px]">
          <span className="w-1.75 h-1.75 rounded-full bg-shipping shrink-0 animate-[hl-pulse_2.4s_ease-in-out_infinite]" />
          <div>
            <div className="font-ui text-code font-semibold text-fg-hi">
              Available for opportunities
            </div>
            <div className="font-code text-meta text-dim mt-0.5">
              Senior IC · Bengaluru / remote
            </div>
          </div>
        </div>
      </div>

      {/* Right — message form */}
      <div className="flex-1 flex flex-col">
        {/* Form header */}
        <div className="flex items-center px-3.5 py-2.5 bg-bg-elev border border-border border-b-0 rounded-t-sm">
          <span className="font-code text-meta text-accent uppercase tracking-[0.06em]">
            sendMessage()
          </span>
          <span className="font-code text-meta text-dim ml-auto">POST → {CONTACT.email}</span>
        </div>

        {/* Form body */}
        <form
          onSubmit={handleSubmit}
          className="flex-1 flex flex-col gap-3.5 p-5 bg-side border border-border rounded-b-sm"
        >
          {/* Name + email row */}
          <div className="flex gap-3">
            <FormField
              label="name"
              placeholder="Your name"
              value={fields.name}
              onChange={(v) => setFields((f) => ({ ...f, name: v }))}
            />
            <FormField
              label="email"
              type="email"
              placeholder="your@email.com"
              value={fields.email}
              onChange={(v) => setFields((f) => ({ ...f, email: v }))}
            />
          </div>

          {/* Message */}
          <FormField
            label="message"
            placeholder="What's on your mind?"
            value={fields.message}
            onChange={(v) => setFields((f) => ({ ...f, message: v }))}
            rows={6}
          />

          {/* Submit row */}
          <div className="flex items-center gap-3 mt-1">
            <button
              type="submit"
              disabled={sending}
              className="inline-flex items-center gap-1.5 font-ui text-ui font-semibold bg-accent text-white px-5.5 py-2.5 rounded-sm border-0 cursor-pointer tracking-[-0.01em] hover:opacity-90 transition-opacity duration-(--duration-fast) disabled:opacity-60"
            >
              {sending ? "Sending…" : "Send message"}
              {!sending && <ArrowRight size={13} strokeWidth={2.25} aria-hidden />}
            </button>
            <span className="font-code text-meta text-dim">
              or <span className="text-accent">⌘↵</span> to submit
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}

function FormField({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  rows,
}: {
  label: string;
  type?: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  rows?: number;
}) {
  return (
    <div className="flex flex-col gap-1.25 flex-1">
      <div className="font-code text-meta text-dim tracking-[0.05em]">
        <span className="text-attr">{label}</span>
        <span className="text-type">: string</span>
      </div>
      {rows ? (
        <textarea
          rows={rows}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="bg-bg border border-muted rounded-[3px] py-2 px-2.5 font-ui text-ui text-fg outline-none resize-none w-full placeholder:text-dim hover:border-dim focus:border-accent transition-colors duration-(--duration-fast)"
        />
      ) : (
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="bg-bg border border-muted rounded-[3px] py-2 px-2.5 font-ui text-ui text-fg outline-none w-full placeholder:text-dim hover:border-dim focus:border-accent transition-colors duration-(--duration-fast)"
        />
      )}
    </div>
  );
}

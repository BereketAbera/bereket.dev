/**
 * How a piece of work can be verified. Kept explicit so the site never blurs
 * shipped employer work with things built to demonstrate a capability.
 */
export type EvidenceKind =
  | 'employer' // shipped in production at an employer; code is private
  | 'product' // my own product, live in production
  | 'showcase' // built in public to demonstrate a capability
  | 'client' // delivered for a client

export interface ExternalLink {
  label: string
  href: string
  kind: 'live' | 'repo' | 'demo' | 'store' | 'docs' | 'public-page'
}

export interface Work {
  slug: string
  /** Short title for lists: the engineering challenge, not the employer feature. */
  title: string
  /** Where it happened, in a line: the original product and feature. */
  context: string
  /** Case-study page title (the h1 and the social card). */
  headline: string
  /** Short <title>; " · Bereket Abera" is appended. About 45 characters. */
  metaTitle: string
  /** Meta, og and twitter description: 160 characters at most. */
  metaDescription: string
  /** One sentence: what changed because of this work. */
  outcome: string
  org: string
  evidence: EvidenceKind
  /** Short role for the work table. */
  role: string
  roleDetail: string
  period: string
  /** Compact years for the work table, e.g. "2024–26". */
  years: string
  team: string
  stack: string[]
  links: ExternalLink[]
  themes: string[]
}

/** Something a reader can open: a case study (by slug) or a URL / home-page anchor. */
export interface EvidenceRef {
  label: string
  work?: string
  href?: string
}

/** One of the five ways I work, each backed by something inspectable. */
export interface Approach {
  id: string
  title: string
  summary: string
  /** Concrete examples, one sentence each. */
  examples: string[]
  evidence: EvidenceRef[]
}

/** A capability group. Groups are listed most prominent first. */
export interface Capability {
  id: string
  title: string
  summary: string
  /** Specific things I have done, one line each. */
  points: string[]
  /** Tools I have used for this, most-used first. Never tools I have only read about. */
  tools: string[]
  /** Every capability must point at something a reader can inspect. */
  evidence: EvidenceRef[]
}

export interface Role {
  org: string
  title: string
  start: string
  /** null = current role; undefined = end date not on record (rendered as "From <start>"). */
  end?: string | null
  location: string
  summary: string
  highlights: string[]
  /** Slugs of case studies that came out of this role. */
  work?: string[]
}

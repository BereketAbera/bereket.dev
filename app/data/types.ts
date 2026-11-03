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
  /** The parts of the system the work touched, in plain words, e.g. "Web app", ".NET API". */
  spans: string[]
  links: ExternalLink[]
  themes: string[]
}

/** Something a reader can open: a case study (by slug) or a URL / home-page anchor. */
export interface EvidenceRef {
  label: string
  work?: string
  href?: string
}

/** One stage of taking a product from brief to production, backed by something inspectable. */
export interface Stage {
  id: string
  title: string
  /** The responsibility I take on at this stage. */
  summary: string
  /** Concrete examples, one sentence each. */
  proof: string[]
  /** A real tradeoff made at this stage, in one sentence. Optional. */
  decision?: string
  evidence: EvidenceRef[]
}

/**
 * One layer of the platform I work in. `platform` is company-wide context;
 * `mine` is my part, worded so the verbs carry the ownership: built, added,
 * ship through, know how it works.
 */
export interface PlatformLayer {
  id: string
  layer: string
  platform: string
  mine: string
}

/** A capability group. Groups are listed most prominent first. */
export interface Capability {
  id: string
  title: string
  /** Short label for the résumé's skills column, e.g. "Backend & data". */
  short: string
  summary: string
  /** Specific things I have done, one line each. */
  points: string[]
  /** Tools I have shipped with, most-used first. Never tools I have only read about. */
  tools: string[]
  /**
   * Platform technology I know how to work with but have not owned: how it works
   * and how my platform uses it. Kept apart from `tools` on purpose.
   */
  workingKnowledge?: string[]
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

/**
 * How a piece of work can be verified. Kept explicit so the site never blurs
 * employer work, personal projects and work still in development.
 */
export type EvidenceKind =
  | 'employer' // done at an employer; the code is private
  | 'project' // my own project, deployed and public
  | 'product' // my own product, still in development

export interface ExternalLink {
  label: string
  href: string
  kind: 'live' | 'repo' | 'demo' | 'store' | 'docs' | 'package' | 'public-page'
}

/** Where a screenshot came from. The site always says, so a local preview can't pass for the live product. */
export type ShotSource = 'live' | 'local' | 'monitoring'

export interface Shot {
  /** Path under /img/projects without the width suffix, e.g. "frameflow/studio". */
  file: string
  /** Pixel size of the largest file. */
  width: number
  height: number
  /** Available widths, smallest first. Defaults to 960 and 1600. */
  widths?: number[]
  alt: string
  caption: string
  source: ShotSource
  /** Shown on the frame: a hostname, or what the image is. */
  host: string
  /** Rendered as a phone rather than a desktop window. */
  phone?: boolean
}

/** A technology, and what it made possible. Used instead of a bare stack list. */
export interface TechNote {
  tech: string
  enabled: string
}

/** Who the underlying software came from, when it wasn't me. */
export interface Foundation {
  name: string
  href: string
  license: string
  note: string
}

/** How much space a project earns on the home page. */
export type ProjectWeight = 'lead' | 'feature' | 'compact' | 'listed'

export interface Work {
  slug: string
  /** Name used in lists and on the card. */
  title: string
  /** One plain line under the name: what kind of thing it is. */
  kicker: string
  /** Case-study page title (the h1 and the social card). */
  headline: string
  /** Short <title>; " · Bereket Abera" is appended. About 45 characters. */
  metaTitle: string
  /** Meta, og and twitter description: 160 characters at most. */
  metaDescription: string
  /** What it does and who it serves: understandable in seconds. */
  summary: string
  /** What is mine, in exact verbs. */
  myPart: string
  /** The one line a hiring manager should remember from this project. */
  demonstrates: string
  /** Set when the underlying software is someone else's. */
  foundation?: Foundation
  evidence: EvidenceKind
  /** Plain status: "Live", "In development". */
  status: string
  statusNote?: string
  period: string
  /** Compact years for lists, e.g. "2026". */
  years: string
  /** Technologies explained through what they enabled. */
  built: TechNote[]
  links: ExternalLink[]
  shots: Shot[]
  weight: ProjectWeight
  /** Whether /work/<slug> exists. Case studies are only written where the evidence earns one. */
  caseStudy: boolean
}

/** Something a reader can open: a case study (by slug) or a URL / home-page anchor. */
export interface EvidenceRef {
  label: string
  work?: string
  href?: string
}

/** One thing you can hand me, with how deep it goes and where to check it. */
export interface Capability {
  id: string
  title: string
  summary: string
  /** Honest depth, in words: where this comes from and how far it goes. */
  depth: string
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
  /** Slug of the case study that came out of this role, if any. */
  work?: string
}

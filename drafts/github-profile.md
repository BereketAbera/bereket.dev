# GitHub profile draft

Status: draft for your review. Nothing here has been applied to GitHub. Apply this only after the updated site is live on bereket.dev: until then the /work links return 404.

## Profile fields

| Field | Proposed value |
|---|---|
| Name | Bereket Abera |
| Bio (under 160 characters) | Senior software engineer. Frontend depth in Vue, Nuxt and TypeScript, full-stack when the feature needs it. Open to senior roles and contract work. |
| Website | https://bereket.dev |
| Company | Acelab |
| Location | Addis Ababa, Ethiopia |
| Hireable | Yes |

"Senior software engineer" is how you describe yourself, not a title you hold. Your title at Acelab stays Senior Frontend Engineer.

## Profile README

The profile README needs a public repository named BereketAbera/BereketAbera. It does not exist yet.

```markdown
# Bereket Abera

I build complex product interfaces and carry them through to production. Eight-plus years on the web, deepest in Vue and Nuxt.

At [Acelab](https://bereket.dev/work/acelab) I work on a large Vue and Nuxt product for architects and manufacturers, and since June 2026 on the .NET endpoints and SQL behind my features.

## Personal projects

The project pages on bereket.dev say what is mine and what came from elsewhere.

- [Rillmark](https://bereket.dev/work/rillmark): a React component library on npm, with 26 of its 48 components importing Radix primitives, and three visual presets.
- [Frameflow](https://bereket.dev/work/frameflow): a video processing pipeline, from upload to private adaptive stream.
- [Wayline](https://bereket.dev/work/wayline): a self-hosted deployment of Plane, the open-source project tracker, on Kubernetes with GitOps, CI/CD, secrets, monitoring and backups around it.
- [Awushi Cloudgarden](https://bereket.dev/#projects): a small 3D browser game that teaches DevOps through simulated lessons.

## Contact

Open to senior roles and contract work, remote from Addis Ababa (UTC+3).

[bereket.dev](https://bereket.dev) | [LinkedIn](https://www.linkedin.com/in/bereket-abera-629380180/) | bereket5042@gmail.com
```

## Repositories to pin

Pinning is done by hand on GitHub. Recommended order:

1. rillmark
2. frameflow
3. plane-platform (the Wayline deployment)
4. awushi-cloudgarden
5. bereket.dev
6. d3-react-implementation or jimla-client, from your earlier public work

Hold pins 1 to 4 until you have settled the open questions about these repositories, which are in the private handoff notes.

## Repository descriptions to correct

The current descriptions claim more than the projects support, for example "AI video publishing platform" and "Independent ... with original tokens". Suggested replacements:

| Repository | Suggested description |
|---|---|
| rillmark | React 19 component library on npm with 48 components, Radix primitives and three visual presets. |
| frameflow | Video processing pipeline: direct uploads, Hatchet workflows, FFmpeg encodes and HLS playback. |
| plane-platform | A customized, self-hosted deployment of Plane Community Edition with GitOps, secrets, monitoring and backups. |
| awushi-cloudgarden | A small 3D browser game that teaches DevOps through simulated lessons. |

Descriptions are not enough on their own. The same claims sit in each README and docs folder, and on the live Rillmark docs and llms.txt. Decide on these together, because each edit is a public commit, and changing the package text needs a new npm release. Nothing here should be pushed until you choose to.

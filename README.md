# qianchenweb

Personal site of Han Shao — Computer Engineering at the University of Waterloo, focused on security engineering.

The site is a single-page React app with a three.js particle system that morphs between models as you scroll.

## Stack

- React + TypeScript, built with Vite
- three.js particle system, framer-motion for transitions
- Hosted on AWS Amplify, deployed from `main`

## Security pipeline

Every pull request into `main` must pass three required checks (enforced by a branch ruleset; no direct pushes):

| Check | What it does |
|---|---|
| `build-logic` | `npm ci` from the lockfile, lint, build, and `npm audit --omit=dev --audit-level=high` (fails on high/critical advisories in production dependencies) |
| `secret-scan` | gitleaks over the full commit history of the PR |
| `sast` | Semgrep static analysis (JavaScript, TypeScript and React rulesets) |

Workflow hardening: least-privilege `GITHUB_TOKEN` (read-only), third-party actions pinned to full commit SHAs, and the Semgrep image pinned by digest. Each gate was verified with a deliberate failing pull request before being relied on.

Response headers (`customHttp.yml`, served by Amplify/CloudFront): HSTS, an enforced same-origin Content-Security-Policy, `X-Content-Type-Options: nosniff`, `Referrer-Policy`, anti-framing (`frame-ancestors 'none'` / `X-Frame-Options`) and a restrictive `Permissions-Policy`.

## Run locally

```bash
npm ci
npm run dev      # dev server
npm run build    # type-check and production build
npm run lint
```

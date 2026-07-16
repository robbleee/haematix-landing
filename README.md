# haem.io Website

The public haem.io website, product explainer, and interactive demonstration
surface. It brings together the main marketing pages, technical documentation,
classification and treatment-explorer demos, clinical-trial information, and
investor material.

## Main areas

- Product and architecture overview
- AML/MDS classification and evidence demonstrations
- AML treatment explorer and supporting algorithm documentation
- Clinical-trial and global-access pages
- Validation, compliance, and technical documentation
- Conference, investor, and data-room experiences

Demonstrations are informational and must not be used as a substitute for
clinical judgement, local policy, or review of the underlying source material.

## Technology

- Next.js 15 and React 18
- CSS Modules
- Server-side routes for backend integration, email, and selected utilities
- Local `@haemio/flowdiagram` package

## Local development

Requirements: Node.js 18 or newer and npm.

```bash
git clone https://github.com/Haem-io/haemio-landing-page.git
cd haemio-landing-page
npm ci
npm run dev
```

Open `http://localhost:3000`.

Create `.env.local` only when a feature needs external services. Common
server-side settings include `HAEM_API_BASE_URL`, `HAEM_API_KEY`,
`HAEM_API_BEARER_TOKEN`, `RESEND_API_KEY`, and `GOOGLE_MAPS_API_KEY`. Never
commit credentials, and never place a secret in a `NEXT_PUBLIC_*` variable.

## Verification

```bash
npm run build
npm run test:coats
```

The larger COATS browser suite can be run with:

```bash
npm run test:coats:large
```

## Structure

```text
src/app/                 Next.js routes and server endpoints
src/components/          Shared page, product, and demo components
src/data/                Versioned site and explorer data
src/lib/                 Classifier and explorer support code
packages/flowdiagram/    Local flow-diagram package
scripts/                 Verification and content utilities
```

## License

Copyright HAEMIO LTD. All rights reserved. No permission to redistribute or
reuse this repository is granted unless a separate written agreement says
otherwise.

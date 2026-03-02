# SEO Operations Runbook

This runbook tracks baseline performance and the biweekly iteration cycle for `haem.io` and `haemio` discovery.

## 1) Baseline Setup (Week 1)

Create a single reporting sheet with these columns:

- Date
- Query
- Bucket (`branded`, `product_intent`, `disease_intent`)
- Landing page
- Impressions
- Clicks
- CTR
- Average position

Use Google Search Console Performance report and GA4 landing-page engagement metrics for the same date range.

## 2) Priority Query Buckets

### Branded

- `haem.io`
- `haemio`
- `haem io`

### Product Intent

- `haematology diagnosis tool`
- `blood cancer diagnostic platform`
- `hematology diagnostic software`

### Disease Intent

- `leukemia diagnostic tool`
- `aml classifier`
- `mds diagnosis tool`
- `who 2022 aml classification`
- `icc 2022 aml classification`

## 3) 8-12 Week Targets

- Non-branded impressions: `+30%` to `+50%`
- Priority-term average position: `+1` to `+2` places
- Branded CTR and rank: stable or improved

## 4) Biweekly Iteration Cadence

Every 2 weeks:

1. Export last 14 days query data from Search Console.
2. Filter terms with average position between `8` and `25`.
3. Prioritize terms with high impressions and weak CTR.
4. Update the most relevant page:
   - title and meta description for intent match
   - one new section or FAQ block to answer the exact query intent
   - internal links from homepage, classifier, and articles
5. Re-check impact in the next cycle and keep or revert.

## 5) Guardrails

- Keep `Haem.io` as the primary visible brand.
- Use `Haemio` as a secondary variant in natural contexts.
- Do not claim support for leukemia subtypes that are not production-ready.

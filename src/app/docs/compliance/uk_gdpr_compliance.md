# UK GDPR Compliance Overview

**Last updated:** 7 July 2026  
**Version:** 2.0

This page summarises Haemio Ltd's current UK GDPR posture. It is not a substitute for a deployment-specific DPIA, customer data processing agreement, or legal advice.

## Current Position

Haem.io is currently positioned as deterministic clinical decision support. The live EU API is configured for deterministic parsing/classification and does not have OpenAI or Gemini credentials configured.

The public website is not intended for identifiable patient data. Customer deployments may be hosted, managed, or on-premise. On-premise deployments are expected to be governed by the customer's local information governance, clinical safety, and security arrangements.

## Roles

| Context | Typical Role |
| --- | --- |
| Website, enquiries, analytics, business records | Haemio Ltd is controller |
| Hosted customer deployment operated by Haemio Ltd | Customer is usually controller; Haemio Ltd is usually processor |
| On-premise deployment operated by customer without Haemio Ltd access | Customer is controller; Haemio Ltd may not process patient data |
| Support access to customer data | Role and instructions should be documented in the customer agreement/DPA |

## Key Controls

- EU-region hosted API and database for the current live API.
- Landing functions configured for Vercel London (`lhr1`).
- Deterministic classifier mode enabled on the live EU API.
- OpenAI and Gemini keys removed from the live EU API.
- Production debug/test endpoints disabled.
- Protected API endpoints require authentication or API key.
- CORS restricted to expected production origins.
- Audit logging available where enabled.
- Encryption in transit and provider-supported encryption at rest.
- Public website instructions not to submit identifiable patient data.

## Documents

- [Privacy Notice](/privacy-policy)
- [Data Processing Addendum](/data-processing-addendum)
- [Subprocessors](/subprocessors)
- [Data Retention Policy](/data-retention)
- [Clinical Safety and Intended Use](/clinical-safety)
- [Cookie Notice](/cookie-notice)

## Remaining Deployment Requirements

Before production clinical use with patient data, the customer and Haemio Ltd should ensure:

- a signed customer agreement and DPA where Haemio Ltd acts as processor;
- a customer DPIA covering the deployment and clinical workflow;
- a clinical safety case and local approval where required;
- user training and local operating procedures;
- documented retention settings;
- incident reporting and support processes;
- confirmation of subprocessors and data locations;
- deletion of any old rollback data that is no longer needed.

## Contact

Questions can be sent to [robert.lee@haem.io](mailto:robert.lee@haem.io).

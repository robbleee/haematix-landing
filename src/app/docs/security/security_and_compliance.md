# Security and Compliance

**Last updated:** 7 July 2026  
**Version:** 2.0

This page summarises security controls used by Haemio Ltd for the public website and hosted Haem.io services. Specific customer deployments may have additional controls or customer-managed responsibilities.

## Hosting and Regions

- The live hosted API and database are deployed in Heroku's EU region.
- The public landing site is hosted on Vercel.
- Landing serverless functions are configured for Vercel London (`lhr1`).
- On-premise deployments may be hosted entirely in the customer's environment.

## Access Controls

- Protected API endpoints require authentication or API key.
- Production debug/test endpoints are disabled.
- CORS is restricted to expected production origins.
- Administrative access is limited to authorised operators.
- Customers are responsible for local identity/access controls in on-premise deployments unless Haemio Ltd expressly manages them.

## Encryption

- HTTPS/TLS is used for data in transit.
- Databases and infrastructure use provider-supported encryption at rest.
- Secrets are held in hosting-provider environment configuration rather than source code.

## Audit and Monitoring

- Classification audit logging is available where enabled.
- Security, access, and operational logs may be retained for accountability and incident investigation.
- Logs should not intentionally contain direct patient identifiers.

## Deterministic Processing

The live EU API is configured for deterministic parsing/classification and does not have OpenAI or Gemini credentials configured.

## Backups and Resilience

Hosted services rely on provider-managed infrastructure controls, backups, and operational resilience. Backup availability and retention depend on the selected hosting plan and customer agreement.

## Customer Responsibilities

Customers are responsible for:

- ensuring users are trained and authorised;
- completing any required DPIA and clinical safety approval;
- configuring local access controls and retention settings;
- avoiding submission of identifiable patient data to public website tools;
- operating on-premise infrastructure securely where applicable;
- notifying Haemio Ltd of suspected incidents affecting the service.

## Reporting Security Issues

Report security concerns to [robert.lee@haem.io](mailto:robert.lee@haem.io).

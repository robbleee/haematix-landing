# Privacy Notice

**Last updated:** 7 July 2026  
**Version:** 2.0

This notice explains how Haemio Ltd handles personal data when you visit our website, contact us, use our public tools, or use a hosted or on-premise Haem.io deployment.

This notice is intended for healthcare professionals, researchers, institutional customers, website visitors, and other business contacts. Haem.io is not intended for direct patient use.

## 1. Who We Are

**Controller for website and business contact data:** Haemio Ltd  
**Company number:** 16528517  
**Registered office:** 73 Meliden Road, Prestatyn, Wales, LL19 8RH  
**Contact:** [robert.lee@haem.io](mailto:robert.lee@haem.io)

For customer clinical deployments, our role depends on the deployment model:

| Scenario | Typical Role |
| --- | --- |
| Website, marketing, enquiries, investor/contact forms, analytics | Haemio Ltd acts as controller |
| Hosted customer deployment operated by Haemio Ltd for a hospital, clinic, research group, or other customer | The customer is usually controller and Haemio Ltd is usually processor |
| On-premise customer deployment operated by the customer without Haemio Ltd access to live data | The customer is usually controller; Haemio Ltd may not process patient data unless support access is granted |
| Product development, security, account administration, and business records | Haemio Ltd acts as controller |

This notice does not replace a customer-specific data processing agreement or deployment-specific DPIA.

## 2. What Haem.io Does

Haem.io provides deterministic clinical decision support tools for haematology and myeloid disease classification. The production direction is deterministic, rules-based classification aligned to published clinical criteria. We are not currently using OpenAI or Gemini in the live EU API.

Haem.io is intended to support, not replace, professional clinical judgement.

## 3. Personal Data We Collect

### Website and Business Contact Data

We may collect:

- name, role, organisation, and work email address if you contact us;
- email content and correspondence history;
- investor, partnership, pilot, or procurement information you choose to provide;
- technical information such as IP address, browser type, device information, referral URL, and approximate location derived from network information;
- analytics events collected through Vercel Analytics if you accept analytics;
- cookie consent preference stored in your browser.

### Account and Hosted Deployment Data

For hosted deployments, we may process:

- account identifiers such as name, work email, organisation, and role;
- authentication, session, and access-control data;
- audit logs, including timestamps, user/account identifiers, feature use, and security events;
- clinical case metadata or classification outputs if enabled for that deployment;
- support tickets and diagnostic information shared with us.

### Clinical Data

The public website and public tools are not intended for identifiable patient data. Users should not upload or paste names, NHS numbers, dates of birth, addresses, or other direct patient identifiers into public website tools.

In customer deployments, especially on-premise deployments, customers may process patient or clinical data under their own governance arrangements. Where Haemio Ltd has access to clinical data as part of a hosted service or support activity, we treat it as health data and, where applicable, special category personal data.

We do not intentionally collect patient names or identifiers on the public website. If a user accidentally includes identifiers in a report or free text, those identifiers may be processed as part of the submitted content and should be reported to us promptly so we can help delete or remediate the data where technically possible.

## 4. Purposes and Legal Bases

| Purpose | Example Data | Legal Basis |
| --- | --- | --- |
| Responding to enquiries | name, email, organisation, message | legitimate interests; taking steps before a contract |
| Managing customer relationships | business contact records, procurement correspondence | contract; legitimate interests |
| Providing hosted services | account, access, audit, configuration data | contract; legitimate interests |
| Security and abuse prevention | IP address, logs, access events | legitimate interests; legal obligation where applicable |
| Website analytics and improvement | Vercel Analytics events, technical data | consent |
| Clinical decision support in customer deployments | clinical case data, classification outputs | customer determines Article 6 basis; Article 9 condition usually relates to healthcare provision, public interest in health, or research depending on the customer context |
| Legal, regulatory, and audit recordkeeping | contracts, audit logs, correspondence | legal obligation; legitimate interests |

Where Haemio Ltd acts as processor, we process personal data only on the documented instructions of the customer controller, except where law requires otherwise.

## 5. Special Category Data

Health, genetic, and pathology information may be special category data under UK GDPR.

The public website is not intended to receive identifiable special category patient data. For clinical deployments, the customer controller is responsible for confirming the relevant lawful basis and special category condition, completing any required DPIA, and ensuring users have appropriate authority to process patient data.

## 6. Deterministic Classifier and No AI Provider Processing

The live EU API is configured for deterministic classification. OpenAI and Gemini API keys have been removed from the live EU API environment.

Historical documentation may refer to AI-assisted extraction or review. Those references do not describe the current live EU API configuration unless a specific customer deployment separately enables such functionality under its own agreement.

## 7. Cookies and Analytics

The website uses:

- essential browser storage for cookie banner preference;
- Vercel Analytics to understand site usage and performance after you accept analytics;
- cookies or local storage needed for basic site operation.

We do not currently use Google Analytics, Facebook/Meta pixel, Hotjar, or PostHog on the landing site.

See our [Cookie Notice](/cookie-notice) for more information.

## 8. Subprocessors and Hosting

Current public/hosted infrastructure includes Heroku/Salesforce for the EU API, Postgres, and Redis; Vercel for the landing site and serverless functions; GoDaddy for DNS; GitHub for source control; and Resend if email delivery is used.

See our [Subprocessors](/subprocessors) page.

## 9. International Transfers

We aim to host the main hosted API and database in UK/EU-region infrastructure where practical. Current production API and database infrastructure is in Heroku's EU region, and landing functions are configured for Vercel London (`lhr1`).

Some vendors are global organisations and may provide support, security, routing, or account administration from outside the UK/EEA. Where required, we rely on appropriate contractual safeguards, such as UK International Data Transfer Addendum, EU Standard Contractual Clauses, or vendor data processing terms.

On-premise deployments may avoid transfer of customer clinical data to Haemio Ltd or cloud processors if operated entirely by the customer.

## 10. Retention

We keep personal data only for as long as necessary for the relevant purpose.

| Data Category | Typical Retention |
| --- | --- |
| Website analytics | according to Vercel Analytics retention and our configuration |
| Cookie consent preference | until cleared by the user or expired by browser storage |
| Business correspondence | up to 6 years after last meaningful contact |
| Customer contracts and commercial records | up to 6 years after the end of the customer relationship |
| Hosted account records | for the life of the account, then normally deleted or anonymised within 90 days unless required for legal/audit purposes |
| Security and audit logs | normally up to 6 years where needed for clinical, security, contractual, or regulatory auditability |
| Public website accidental clinical submissions | deleted as soon as reasonably practicable after discovery |
| Customer clinical records in hosted deployments | as agreed with the customer controller, with 6 years as a default audit-retention position where classification audit records are enabled |

See our [Data Retention Policy](/data-retention).

## 11. Security

We use technical and organisational measures designed to protect personal data, including:

- HTTPS/TLS in transit;
- encryption at rest where supported by our hosting and database providers;
- access controls and separation of production systems;
- API key or authenticated access for protected endpoints;
- audit logging where enabled;
- least-privilege operational access;
- provider-managed backup, monitoring, and infrastructure security controls;
- configuration hardening for production, including disabling debug/test endpoints.

No system is perfectly secure. Users and customers must also ensure appropriate local governance, user access controls, and de-identification practices.

## 12. Your Rights

Depending on the context and applicable law, you may have rights to:

- access your personal data;
- correct inaccurate personal data;
- request deletion;
- restrict processing;
- object to processing;
- receive a copy of certain data in a portable format;
- complain to the UK Information Commissioner's Office.

To exercise your rights, contact [robert.lee@haem.io](mailto:robert.lee@haem.io).

If your request relates to data processed in a customer deployment, we may need to refer the request to the relevant customer controller.

## 13. ICO

You can contact the UK Information Commissioner's Office at [https://ico.org.uk](https://ico.org.uk). We would appreciate the opportunity to address your concern first.

## 14. Changes

We may update this notice as the product, deployment model, or legal requirements evolve. The latest version will be published on this page.

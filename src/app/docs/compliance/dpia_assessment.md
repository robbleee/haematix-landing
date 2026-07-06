# Data Protection Impact Assessment

**Haemio Ltd**  
**Version:** 2.0  
**Last updated:** July 2026  
**Contact:** robert.lee@haem.io

This DPIA summary covers the Haemio clinical decision support platform and related website services. It is intended as a working compliance document and should be reviewed before each material product, hosting, or processing change.

## 1. Processing Summary

Haemio provides clinical decision support tooling for haematology workflows. The platform is intended for healthcare professionals and healthcare organisations, not for direct patient use.

Current public and hosted services are designed so users should not upload identifiable patient information to the main public website. Customer on-premises deployments may process identifiable clinical information inside the customer's own controlled environment.

The live EU API uses deterministic classification logic. Haemio does not currently use OpenAI or Gemini in the live EU API.

## 2. Roles

Haemio acts as controller for its own business operations, website operation, enquiries, contact records, security logs, and commercial records.

For hosted customer services, Haemio may act as processor where it processes personal data on documented customer instructions.

For on-premises customer deployments, the customer will normally act as controller and operate the deployment in its own environment. Haemio's role will depend on the support, maintenance, and access arrangements agreed with that customer.

## 3. Data Categories

Potential data categories include:

- Business contact details.
- Website usage and analytics data.
- Authentication, access, and audit logs where hosted services are used.
- Clinical text or report content where a user submits it.
- Health or genetic information where clinical content includes it.

Users are instructed not to upload identifiable patient information to the public website. If names or other identifiers are accidentally included in a submitted report, they are treated as personal data and handled under this DPIA, the privacy notice, and the incident response procedure.

## 4. Lawful Basis

Likely lawful bases include:

- Legitimate interests for website operation, security, product improvement, and business communications.
- Contract for customer account administration and service delivery.
- Legal obligation for records Haemio must retain.

Where special category health or genetic data is processed in a customer context, the customer is responsible for confirming the applicable Article 9 condition unless the contract states otherwise. Haemio's public website is not intended for direct patient uploads or routine storage of identifiable clinical data.

## 5. Necessity and Proportionality

Haemio applies data minimisation by:

- Avoiding direct patient use of the public website.
- Asking users not to include identifiable information in public site submissions.
- Using deterministic classification logic for the live EU API.
- Limiting production access to authorised personnel.
- Applying retention periods based on legal, contractual, clinical safety, and security needs.

## 6. Key Risks and Controls

| Risk | Control |
| --- | --- |
| Accidental upload of identifiable patient information to the public site | User-facing notices, minimisation, deletion or isolation where discovered, incident review if appropriate |
| Unauthorised access to hosted systems | Access controls, secret management, audit logging, least privilege, provider security controls |
| Clinical misuse or over-reliance | Clinical safety notice, decision support wording, clinician-in-the-loop requirement, not a medical device wording |
| International transfer risk | EU/UK hosting preference, subprocessor review, contractual safeguards where services transfer data internationally |
| Excess retention | Retention policy, deletion workflows, account and record review |
| Subprocessor failure | Subprocessor list, vendor review, contractual terms, incident notification process |

## 7. Hosting and Transfers

The public website is deployed on Vercel with London function region configuration. The hosted API and database have been migrated to Heroku EU infrastructure. Some providers may still process support, billing, security, or operational data outside the UK/EEA under their own transfer mechanisms.

On-premises deployments should be hosted by the customer in the customer's chosen environment.

## 8. Residual Risk

The main residual risks are accidental clinical identifier submission, third-party provider dependency, and the evolving regulatory position for clinical decision support tools.

Overall residual risk is assessed as medium because health and genetic information may be present in customer use cases, even though the public site is not intended to store identifiable patient data.

## 9. Review Triggers

This DPIA should be reviewed when:

- Haemio adds or removes a material subprocessor.
- Hosting region or provider changes.
- AI or external model processing is reintroduced.
- Identifiable clinical data becomes part of a hosted production workflow.
- The product's medical device regulatory status changes.
- A serious security or data protection incident occurs.

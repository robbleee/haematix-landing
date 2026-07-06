# Data Processing Addendum

**Last updated:** 7 July 2026  
**Version:** 1.0

This Data Processing Addendum ("DPA") sets out the baseline data protection terms that apply when Haemio Ltd processes personal data on behalf of a customer.

This DPA is intended to be incorporated into a customer agreement, order form, statement of work, or other written agreement. If there is a conflict between this DPA and a signed customer agreement, the signed customer agreement takes precedence unless it says otherwise.

## 1. Parties

**Processor:** Haemio Ltd, company number 16528517, registered office 73 Meliden Road, Prestatyn, Wales, LL19 8RH.  
**Customer / Controller:** the organisation that enters into an agreement with Haemio Ltd for use of Haem.io.

Contact for data protection matters: [robert.lee@haem.io](mailto:robert.lee@haem.io).

## 2. Roles

For hosted customer deployments where Haemio Ltd operates the service for the customer, the customer will usually act as controller and Haemio Ltd will usually act as processor.

For on-premise deployments operated by the customer without Haemio Ltd access to live data, Haemio Ltd may not process customer personal data. If Haemio Ltd receives access for support, maintenance, incident response, or managed services, this DPA applies to that processing unless a separate agreement applies.

Haemio Ltd acts as controller for its own business operations, website analytics, marketing, procurement, and account administration.

## 3. Subject Matter and Duration

The processing covers the provision, support, maintenance, security, and improvement of Haem.io clinical decision support software and related services.

Processing continues for the term of the customer agreement and any post-termination period needed for deletion, return, audit, legal claims, or transition support.

## 4. Nature and Purpose of Processing

Haemio Ltd may process personal data to:

- provide access to the Haem.io software;
- authenticate users and manage permissions;
- run deterministic clinical classification and related decision support workflows;
- generate audit logs and classification records where enabled;
- host, back up, secure, monitor, and maintain the service;
- provide customer support;
- investigate incidents, abuse, errors, or security events;
- comply with documented customer instructions and applicable law.

## 5. Categories of Data

Depending on the deployment and configuration, personal data may include:

- professional user details such as name, work email, organisation, role, and access permissions;
- login, session, security, audit, and usage metadata;
- clinical case data, pathology information, genetic findings, laboratory values, morphology information, and classification outputs;
- uploaded documents or free text if enabled by the deployment;
- support communications and diagnostic information.

The public website is not intended for identifiable patient data.

## 6. Categories of Data Subjects

Data subjects may include:

- customer staff, clinicians, researchers, administrators, and authorised users;
- patients whose clinical data is processed by a customer deployment;
- business contacts and support requesters.

## 7. Special Category Data

Customer deployments may process health, genetic, and pathology data. The customer is responsible for identifying the applicable Article 6 lawful basis and Article 9 special category condition under UK GDPR or equivalent law.

Haemio Ltd will process special category data only as required to provide the agreed service and only on documented instructions unless law requires otherwise.

## 8. Customer Instructions

Haemio Ltd will process customer personal data only on documented instructions from the customer, including instructions in the customer agreement, this DPA, product configuration, support requests, and documented deployment settings.

If Haemio Ltd believes an instruction infringes applicable data protection law, it will notify the customer where legally permitted.

## 9. Confidentiality

Haemio Ltd will ensure that persons authorised to process customer personal data are subject to confidentiality obligations, whether contractual, statutory, or professional.

## 10. Security Measures

Haemio Ltd will implement appropriate technical and organisational measures, taking into account the nature of the data, deployment model, risk, and state of the art. Measures may include:

- encryption in transit using HTTPS/TLS;
- encryption at rest where supported by hosting, database, and storage providers;
- access controls and least-privilege administrative access;
- authentication and API-key controls for protected endpoints;
- audit logging and security logging where enabled;
- configuration hardening, including disabling debug/test endpoints in production;
- provider-managed infrastructure monitoring, patching, backup, and physical security controls;
- separation of production and development environments where practical;
- incident response processes;
- deletion or return procedures at termination.

On-premise security responsibilities are shared according to the customer agreement and deployment model. The customer is responsible for local network, endpoint, identity, backup, and hosting controls unless Haemio Ltd expressly manages them.

## 11. Subprocessors

Haemio Ltd may use subprocessors listed on the [Subprocessors](/subprocessors) page or otherwise notified to the customer.

Haemio Ltd will ensure subprocessors are bound by written data protection obligations that provide appropriate protection for customer personal data.

Customers may object to a new subprocessor on reasonable data protection grounds. If the objection cannot be resolved, the parties will discuss alternatives, which may include disabling affected functionality or terminating the affected service.

## 12. International Transfers

Haemio Ltd will use appropriate safeguards for restricted transfers of personal data where required, such as the UK International Data Transfer Addendum, EU Standard Contractual Clauses, adequacy regulations, or equivalent lawful transfer mechanisms.

Where customer data is processed entirely in an on-premise deployment without Haemio Ltd support access, international transfers by Haemio Ltd may not occur.

## 13. Data Subject Requests

Haemio Ltd will assist the customer, taking into account the nature of processing, with requests from data subjects exercising their data protection rights.

Where Haemio Ltd receives a request directly that relates to customer-controlled data, Haemio Ltd will refer the request to the customer unless legally prohibited.

## 14. Personal Data Breaches

Haemio Ltd will notify the customer without undue delay after becoming aware of a personal data breach affecting customer personal data.

The notification will include available information reasonably required for the customer to assess notification obligations, including the nature of the incident, categories of data affected, likely consequences, and measures taken or proposed.

The customer remains responsible for notifying regulators or data subjects unless the parties agree otherwise.

## 15. Assistance and DPIAs

Haemio Ltd will provide reasonable assistance with:

- security of processing;
- breach assessment;
- DPIAs and prior consultation where required;
- audit and compliance evidence relevant to the service.

This assistance may be subject to reasonable scope, confidentiality, security, and cost controls.

## 16. Deletion or Return

At the end of the service, Haemio Ltd will delete or return customer personal data according to the customer agreement and documented customer instructions, unless law requires retention.

Backup, audit, and security logs may remain for a limited period under normal retention cycles, protected from ordinary operational use.

## 17. Audit

Haemio Ltd will make available information reasonably necessary to demonstrate compliance with this DPA. Audits must be reasonable, proportionate, confidential, and not compromise security or other customers.

Where possible, evidence may be provided through policies, architecture summaries, security descriptions, subprocessors information, and provider documentation.

## 18. Liability and Precedence

Liability is governed by the customer agreement. This DPA does not expand liability unless expressly agreed in writing.

## 19. Appendices

### Appendix A - Processing Summary

| Item | Description |
| --- | --- |
| Subject matter | Haem.io clinical decision support software and related services |
| Duration | Term of the customer agreement plus deletion/return period |
| Nature | Hosting, deterministic classification, audit logging, support, security, maintenance |
| Purpose | Provide, secure, support, and maintain Haem.io |
| Data subjects | Customer users, staff, clinicians, researchers, patients in customer deployments |
| Data categories | Account data, audit logs, clinical case data, documents where enabled, support data |
| Special categories | Health, genetic, pathology, and clinical data where processed |

### Appendix B - Baseline Security Measures

See section 10 and the [Security & Compliance](/compliance/security) page.

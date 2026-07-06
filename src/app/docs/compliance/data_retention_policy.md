# Data Retention Policy

**Last updated:** 7 July 2026  
**Version:** 1.0

This policy explains how long Haemio Ltd normally keeps personal data.

Retention periods may vary for specific customer deployments, especially on-premise deployments or deployments governed by a customer agreement, clinical governance policy, research protocol, or legal requirement.

## 1. Principles

We apply the following principles:

- keep personal data only for as long as needed;
- minimise identifiable patient data on public systems;
- retain audit records where needed for clinical safety, security, contractual, or legal accountability;
- delete or anonymise data when retention is no longer justified;
- allow customer-specific retention settings where appropriate.

## 2. Default Retention Schedule

| Data Category | Default Retention | Notes |
| --- | --- | --- |
| Public website analytics | According to Vercel Analytics retention and configuration | Used to understand site performance and usage |
| Cookie consent preference | Until cleared by the user or browser storage expires | Stored locally in the user's browser |
| Business enquiries and correspondence | Up to 6 years after last meaningful contact | Supports legal, contractual, and relationship management needs |
| Customer contracts and procurement records | Up to 6 years after the end of the customer relationship | May be longer where law requires |
| User account records in hosted deployments | Account lifetime, then normally deleted or anonymised within 90 days | Subject to contractual/customer instructions |
| Authentication and access logs | Up to 6 years where needed for security and auditability | Shorter periods may apply for routine operational logs |
| Classification audit logs | Up to 6 years by default where audit logging is enabled | Supports clinical safety review and accountability |
| Uploaded documents in hosted deployments | Customer-configurable; default should be the shortest practical period | For public website tools, identifiable documents should not be uploaded |
| Support tickets | Up to 6 years after closure | Patient identifiers should not be included in support tickets unless necessary and authorised |
| Incident and breach records | At least 6 years | Supports regulatory accountability |
| Backups | According to provider backup lifecycle | Backups are protected from ordinary operational use and expire through backup rotation |

## 3. Public Website Submissions

The public website is not intended for identifiable patient data. If we discover that identifiable patient information has been submitted to a public website route, we will delete it as soon as reasonably practicable, subject to any security, incident, or legal obligations.

## 4. Customer Deployments

Hosted customer deployments may use customer-specific retention settings. On-premise deployments are usually controlled by the customer, and the customer determines local retention in line with its own legal, clinical, research, and records-management obligations.

Where no customer-specific setting is agreed, we use 6 years as the default retention period for audit records that may be needed for clinical safety, security, legal, or contractual accountability.

## 5. Deletion Requests

Requests for deletion can be sent to [robert.lee@haem.io](mailto:robert.lee@haem.io).

If a request relates to a customer deployment where the customer is controller, we may need to refer the request to that customer.

## 6. Review

This policy will be reviewed at least annually or when the product, deployment model, law, or subprocessors materially change.

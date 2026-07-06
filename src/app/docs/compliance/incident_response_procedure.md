# Incident Response Procedure

**Haemio Ltd**  
**Version:** 2.0  
**Last updated:** July 2026  
**Contact:** robert.lee@haem.io

This procedure explains how Haemio Ltd identifies, investigates, contains, and reports security incidents and personal data breaches.

## 1. Scope

This procedure applies to:

- The Haemio public website and hosted services.
- Administrative systems used to operate Haemio.
- Personal data processed by Haemio as controller.
- Personal data processed by Haemio as processor for customers, where hosted services are used.
- Security events reported by subprocessors such as Heroku/Salesforce, Vercel, GitHub, GoDaddy, Resend, or Google Maps where those services are enabled.

Customer on-premises deployments are usually operated in the customer's own environment. For those deployments, the customer is normally responsible for local incident detection, containment, infrastructure logs, and regulatory notification, unless a separate support agreement says otherwise.

## 2. Incident Categories

### Low

Examples:

- Failed login attempts within expected thresholds.
- Temporary service availability issues with no personal data risk.
- Non-sensitive configuration or operational errors.

Target response: within 1 business day.

### Medium

Examples:

- Suspected unauthorised access to account, contact, or usage data.
- Security vulnerability that may expose personal data.
- Subprocessor security notice that may affect Haemio data.
- Accidental disclosure of low-volume personal data.

Target response: within 4 hours where practicable.

### High

Examples:

- Confirmed unauthorised access to personal data.
- Exposure of health, genetic, or identifiable clinical information.
- Loss of credentials, database compromise, malware, or suspected exfiltration.
- Incident likely to create a high risk to individuals.

Target response: immediate triage.

## 3. Roles and Contacts

Primary incident contact:

- Haemio Ltd
- Email: robert.lee@haem.io
- Registered office: 73 Meliden Road, Prestatyn, Wales, LL19 8RH

External reporting:

- Information Commissioner's Office: https://ico.org.uk/
- ICO breach reporting guidance: https://ico.org.uk/for-organisations/report-a-breach/

## 4. Response Process

### 4.1 Triage

As soon as an incident is suspected, Haemio will:

- Record the date and time of discovery.
- Identify affected systems, accounts, data categories, and subprocessors.
- Decide whether personal data is involved.
- Decide whether the incident is ongoing.
- Assign an initial severity.

### 4.2 Containment

Depending on the incident, containment may include:

- Revoking credentials, API keys, sessions, or access tokens.
- Restricting access to affected systems.
- Rotating secrets.
- Disabling affected integrations.
- Preserving logs and evidence.
- Notifying relevant subprocessors or customers.

### 4.3 Investigation

Haemio will investigate:

- What happened.
- When it happened.
- Which systems and data were affected.
- Whether data was accessed, altered, lost, or disclosed.
- Whether the incident remains active.
- What remedial steps are required.

### 4.4 Risk Assessment

Haemio will assess the risk to individuals by considering:

- Whether health, genetic, clinical, contact, account, or authentication data is involved.
- Volume of affected records.
- Identifiability of the data.
- Potential harm to individuals.
- Whether the data was encrypted, pseudonymised, or otherwise protected.
- Whether the recipient is trusted or bound by confidentiality.

## 5. Notification

Where Haemio is controller and a personal data breach is likely to result in a risk to individuals' rights and freedoms, Haemio will notify the ICO without undue delay and, where feasible, within 72 hours of becoming aware of the breach.

Where a breach is likely to result in a high risk to individuals, Haemio will notify affected individuals without undue delay, unless an exception under UK GDPR applies.

Where Haemio is processor for a customer, Haemio will notify the customer without undue delay after becoming aware of a personal data breach affecting that customer's personal data. The customer is responsible for controller notifications unless agreed otherwise.

## 6. Incident Record

Haemio will keep an incident record covering:

- Date and time discovered.
- Reporter.
- Systems affected.
- Data categories affected.
- Number or estimated number of individuals affected.
- Severity and risk assessment.
- Containment actions.
- Notifications made.
- Remediation actions.
- Closure date.

Incident records are retained in line with Haemio's retention policy, normally for 6 years where they relate to security, legal, contractual, or regulatory obligations.

## 7. Review

After medium and high incidents, Haemio will review root cause, update controls where needed, and record lessons learned.

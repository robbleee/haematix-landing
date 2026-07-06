# Archived Healthcare Encryption Implementation Notes

**Status:** archived  
**Last updated:** July 2026

This document is retained only as a historical implementation note.

It should not be treated as the current Haemio Ltd security, UK GDPR, HIPAA, or production deployment position. Current security claims are intentionally narrower and are maintained in `security/security_and_compliance.md`.

Current baseline security position:

- HTTPS/TLS is used for data in transit.
- Hosting providers supply encryption at rest for managed databases and infrastructure services.
- Secrets are stored in hosting-provider environment configuration rather than source code.
- Audit and operational logs may be retained for accountability and incident investigation.
- Access to production systems is limited to authorised operators.

Customer deployments may include additional encryption, logging, identity, backup, or clinical safety controls depending on the agreed architecture. On-premises deployments are normally operated in the customer's own environment.

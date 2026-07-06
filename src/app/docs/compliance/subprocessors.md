# Subprocessors

**Last updated:** 7 July 2026  
**Version:** 1.0

This page lists the third-party service providers that may process personal data for Haemio Ltd.

The exact subprocessors for a customer deployment may vary depending on whether the deployment is public website only, hosted, managed, or on-premise.

## Current Subprocessors and Service Providers

| Provider | Purpose | Typical Data | Location / Notes |
| --- | --- | --- | --- |
| Heroku / Salesforce | Hosted EU API, application runtime, Postgres database, Redis cache | account data, audit logs, clinical data in hosted deployments | API/database currently deployed in Heroku EU region |
| Vercel | Landing site hosting, serverless landing functions, analytics | website visitor data, landing API route metadata | landing functions configured for London (`lhr1`); Vercel is a global provider |
| GoDaddy | DNS management for `haem.io` | domain and DNS administration data | domain/DNS provider |
| GitHub | Source-code hosting, issue/repository administration | developer account data, repository metadata; not intended for patient data | code repository provider |
| Resend | Email delivery if enabled | email addresses, email content, delivery metadata | used only where email features are configured |
| Google Maps Platform | Map/location display if enabled on the landing site | map requests, technical request metadata | used only where map features are loaded |

## Not Currently Used in the Live EU API

The live EU API is configured for deterministic classification and does not currently have OpenAI or Gemini credentials configured.

OpenAI and Gemini are therefore not listed as active subprocessors for the current live EU API. If a future customer deployment enables AI-assisted functionality, the relevant provider will need to be assessed, contracted, and listed for that deployment.

## On-Premise Deployments

For on-premise deployments operated by the customer, subprocessors may be reduced or eliminated for clinical data flows. The customer is responsible for its local hosting, network, identity, backup, monitoring, and security providers unless Haemio Ltd expressly manages those services.

## Changes to Subprocessors

We will update this page when material subprocessors change. For customer contracts, notice and objection rights may be set out in the applicable Data Processing Addendum or customer agreement.

## Contact

Questions about subprocessors can be sent to [robert.lee@haem.io](mailto:robert.lee@haem.io).

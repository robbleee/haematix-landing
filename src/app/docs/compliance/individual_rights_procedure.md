# Individual Rights Procedure
**Haem.io Blood Cancer Classification System - GDPR Compliance**

---

**Document Information**
- **Document Type**: Individual Rights Procedure
- **Version**: 1.0
- **Created**: December 2024
- **Last Updated**: December 2024
- **Next Review**: June 2025
- **Owner**: Data Controller (Robert Lee)
- **Classification**: CONFIDENTIAL

---

## 1. Overview

This document establishes procedures for handling data subject requests under UK GDPR Articles 15-22, ensuring compliance with individual rights while maintaining system security and operational efficiency.

### 1.1 Scope
This procedure covers all requests from healthcare professionals who use the Haem.io system regarding their personal data rights under UK GDPR.

### 1.2 Principles
- **Respond promptly**: All requests acknowledged within 3 working days
- **Free of charge**: No fees for standard requests (exceptions noted)
- **User-friendly**: Clear, plain language communications
- **Secure verification**: Proper identity verification before data disclosure

---

## 2. Individual Rights Summary

| Right | Article | Description | Response Time | Fee |
|-------|---------|-------------|---------------|-----|
| **Access** | 15 | Copy of personal data | 30 days | Free (first request/year) |
| **Rectification** | 16 | Correct inaccurate data | 30 days | Free |
| **Erasure** | 17 | Delete personal data | 30 days | Free |
| **Restrict Processing** | 18 | Limit how data is used | 30 days | Free |
| **Data Portability** | 20 | Receive data in structured format | 30 days | Free |
| **Object** | 21 | Object to processing | 30 days | Free |
| **Automated Decision-Making** | 22 | N/A - Logic-based processing | N/A | N/A |

---

## 3. Request Handling Process

### 3.1 Valid Request Channels

**Primary Contact:**
- **Email**: robbielee543@gmail.com
- **Subject Line**: "GDPR Request - [Type of Request]"

**Alternative Channels:**
- **User Account**: Account deletion available through system interface
- **Post**: 73 Meliden Road, Prestatyn, LL19 8RH, UK
- **Phone**: 07399676299 (for initial queries only - formal requests must be in writing)

### 3.2 Request Receipt & Acknowledgment

#### 3.2.1 Initial Response Template (Within 3 Days)
```
Subject: GDPR Request Acknowledgment - Reference [REF-YYYY-MM-DD-XXX]

Dear [Name],

Thank you for your data protection request received on [date].

REQUEST DETAILS:
- Type: [Access/Rectification/Erasure/etc.]
- Reference: [REF-YYYY-MM-DD-XXX]
- Received via: [Email/Post/Account]

NEXT STEPS:
We will respond to your request within 30 calendar days (by [date]).

If we need additional information to verify your identity or clarify your request, we will contact you promptly.

If we need to extend the response period due to complexity, we will notify you within the initial 30-day period with reasons for the delay.

CONTACT:
If you have questions about your request, please contact us at robbielee543@gmail.com quoting reference [REF-YYYY-MM-DD-XXX].

Best regards,
Robert Lee
Data Controller
Haem.io Blood Cancer Classification System
```

### 3.3 Identity Verification

#### 3.3.1 Verification Requirements
**For account holders:**
- Username and email address verification
- Security questions (if available)
- Account-specific information

**For non-account holders or high-sensitivity requests:**
- Government-issued photo ID
- Proof of address (if address data involved)
- Additional verification questions

#### 3.3.2 Verification Failure
If identity cannot be verified:
```
We cannot process your request as we were unable to verify your identity.

To proceed, please provide:
[List specific verification requirements]

This is to protect your personal data from unauthorized access.
```

---

## 4. Specific Right Procedures

### 4.1 Right of Access (Article 15)

#### 4.1.1 What We Provide
**Account Data Export (JSON format):**
```json
{
  "user_profile": {
    "username": "[username]",
    "email": "[email]",
    "first_name": "[first_name]",
    "last_name": "[last_name]",
    "institution": "[institution]",
    "specialty": "[specialty]",
    "role": "[role]",
    "created_at": "[date]",
    "last_login": "[date]",
    "login_count": "[number]"
  },
  "preferences": {
    "hide_example_report": "[boolean]",
    "other_settings": "[values]"
  },
  "processing_information": {
    "legal_basis": "Legitimate interest for healthcare research",
    "retention_period": "Until account deletion requested",
    "third_party_processors": ["OpenAI (anonymized clinical data only)", "Heroku (hosting)"],
    "your_rights": ["Access", "Rectification", "Erasure", "Restrict", "Portability", "Object"]
  }
}
```

#### 4.1.2 What We Cannot Provide
- **Clinical data**: Not stored in our system (processed in real-time only)
- **Other users' data**: Only your own personal data
- **System logs**: May contain personal data of multiple users

#### 4.1.3 Access Request Response Template
```
Subject: GDPR Access Request Response - Reference [REF-YYYY-MM-DD-XXX]

Dear [Name],

Please find attached your personal data export as requested.

WHAT'S INCLUDED:
- Your user account information
- Account preferences and settings
- Information about how we process your data

WHAT'S NOT INCLUDED:
- Clinical data: We do not store clinical reports you process through our system
- System logs: These may contain data from multiple users
- Other users' information: We can only provide your personal data

TECHNICAL INFORMATION:
- Data format: JSON (machine-readable)
- Export date: [date]
- Data current as of: [date]

If you need clarification about any information provided or believe something is missing, please contact us.

Best regards,
Robert Lee
Data Controller
```

### 4.2 Right to Rectification (Article 16)

#### 4.2.1 What Can Be Corrected
- Name, email address, institution details
- Account preferences
- Any factually incorrect personal information

#### 4.2.2 How to Request
```
To correct your information, please specify:
1. What information is incorrect
2. What the correct information should be
3. Evidence supporting the correction (if required)

Example:
"My institution is listed as 'Hospital A' but should be 'Hospital B'. 
I have attached my employment verification."
```

#### 4.2.3 Rectification Response Template
```
Subject: Data Rectification Complete - Reference [REF-YYYY-MM-DD-XXX]

Dear [Name],

We have updated your personal data as requested.

CHANGES MADE:
- [Field]: Changed from "[old value]" to "[new value]"
- [Field]: Updated on [date]

The changes are now live in our system. You can verify these changes by logging into your account.

If you notice any issues with the updates, please contact us immediately.

Best regards,
Robert Lee
Data Controller
```

### 4.3 Right to Erasure (Article 17)

#### 4.3.1 Account Deletion Process
**Available Methods:**
1. **Self-Service**: Use "Delete My Account" button in user account settings
2. **Email Request**: Send formal deletion request to robbielee543@gmail.com

#### 4.3.2 What Gets Deleted
- ✅ User account and profile information
- ✅ Login credentials and authentication data
- ✅ User preferences and settings
- ✅ Classification session metadata
- ✅ Feedback and analytics data
- ✅ All related personal data

#### 4.3.3 What Cannot Be Deleted
- **Anonymized audit logs**: Required for legal compliance (7 years)
- **Aggregated analytics**: No personal identification possible
- **Legal obligations**: Data required by law

#### 4.3.4 Erasure Confirmation Template
```
Subject: Account Deletion Confirmation - Reference [REF-YYYY-MM-DD-XXX]

Dear [Name],

Your account deletion request has been completed.

WHAT HAS BEEN DELETED:
- Your user account and profile
- All personal information
- Login credentials
- Usage preferences
- Session history
- Feedback data

WHAT REMAINS:
- Anonymized audit logs (legal requirement - 7 years)
- Aggregated system statistics (no personal identification)

Your personal data has been permanently removed from our active systems. This action cannot be undone.

Thank you for using Haem.io. If you wish to use our services again in the future, you will need to create a new account.

Best regards,
Robert Lee
Data Controller
```

### 4.4 Right to Restrict Processing (Article 18)

#### 4.4.1 When Restriction Applies
- Account accuracy is contested
- Processing is unlawful but user doesn't want deletion
- Data no longer needed but user needs it for legal claims
- User has objected to processing (pending verification)

#### 4.4.2 How Restriction Works
- **Account deactivation**: User cannot log in
- **Data preservation**: Account data maintained but not actively processed
- **Limited processing**: Only storage, legal claims, or user consent

#### 4.4.3 Restriction Confirmation Template
```
Subject: Processing Restriction Applied - Reference [REF-YYYY-MM-DD-XXX]

Dear [Name],

We have restricted the processing of your personal data as requested.

RESTRICTION DETAILS:
- Reason: [Contest accuracy/Unlawful processing/Legal claims/Objection]
- Applied date: [date]
- Scope: [What processing has been restricted]

WHAT THIS MEANS:
- Your account has been deactivated
- Your data is stored but not actively processed
- We will only process your data for storage, legal claims, or with your consent

DURATION:
This restriction will remain in place until [condition/date].

To lift this restriction, please contact us at robbielee543@gmail.com.

Best regards,
Robert Lee
Data Controller
```

### 4.5 Right to Data Portability (Article 20)

#### 4.5.1 Portable Data
**What's included:**
- User profile information
- Account preferences
- Usage statistics (personal only)

**Format**: Structured JSON file

#### 4.5.2 Portability Response Template
```
Subject: Data Portability Export - Reference [REF-YYYY-MM-DD-XXX]

Dear [Name],

Please find attached your personal data in a portable format.

EXPORT DETAILS:
- Format: JSON (machine-readable)
- Compatible with: Most data processing systems
- Export date: [date]
- Data coverage: [date range]

TECHNICAL NOTES:
- The file is structured for easy import into other systems
- Field descriptions are included in the export
- If you need the data in a different format, please let us know

This export contains only data you provided to us or that we generated based on your usage. It does not include clinical data as this is not stored in our system.

Best regards,
Robert Lee
Data Controller
```

### 4.6 Right to Object (Article 21)

#### 4.6.1 Objection Grounds
- **Legitimate interests**: You object to processing based on our legitimate interests
- **Direct marketing**: Not applicable (we don't do direct marketing)
- **Research purposes**: Object to processing for research

#### 4.6.2 Objection Assessment
We will stop processing unless we can demonstrate:
- Compelling legitimate grounds that override your interests
- Processing is necessary for legal claims

#### 4.6.3 Objection Response Template
```
Subject: Objection to Processing Response - Reference [REF-YYYY-MM-DD-XXX]

Dear [Name],

We have reviewed your objection to the processing of your personal data.

DECISION: [Objection upheld / Objection overridden]

REASONING:
[If upheld]: We will stop processing your personal data for [specified purposes].
[If overridden]: We have compelling legitimate grounds that override your interests because [detailed explanation].

NEXT STEPS:
[If upheld]: Your account will be [deleted/restricted] within 30 days.
[If overridden]: Processing will continue under our legitimate interests.

If you disagree with this decision, you have the right to complain to the ICO at ico.org.uk.

Best regards,
Robert Lee
Data Controller
```

---

## 5. Special Circumstances

### 5.1 Complex or Excessive Requests

#### 5.1.1 When We May Charge Fees
- **Repeated requests**: Multiple access requests within 12 months
- **Manifestly unfounded**: Clearly intended to cause disruption
- **Excessive**: Disproportionate effort required

#### 5.1.2 Fee Structure
- **Additional access requests**: £10 per request (after first free request per year)
- **Complex data compilation**: £25 per hour (maximum £100)
- **Excessive copy requests**: £0.10 per page

#### 5.1.3 Fee Notification Template
```
Subject: GDPR Request Fee Assessment - Reference [REF-YYYY-MM-DD-XXX]

Dear [Name],

We have reviewed your request and determined that a reasonable fee applies.

FEE DETAILS:
- Amount: £[amount]
- Reason: [Repeated/Unfounded/Excessive]
- Justification: [Detailed explanation]

PAYMENT INFORMATION:
[Payment details if fee applies]

ALTERNATIVES:
- You may withdraw your request at any time
- You may narrow the scope of your request to avoid fees
- You may complain to the ICO if you believe the fee is unjustified

Please confirm if you wish to proceed with the request and pay the fee.

Best regards,
Robert Lee
Data Controller
```

### 5.2 Request Extensions

#### 5.2.1 When Extensions Apply
- **Complex requests**: Requiring significant technical work
- **Multiple data subjects**: Affecting other individuals' privacy
- **High volume**: Large amounts of data to review

#### 5.2.2 Extension Notification (Before 30 days)
```
Subject: Request Extension Notification - Reference [REF-YYYY-MM-DD-XXX]

Dear [Name],

We need to extend the response time for your request due to its complexity.

EXTENSION DETAILS:
- Original deadline: [date]
- New deadline: [date] (additional 60 days maximum)
- Reason: [Detailed explanation]

We will continue working on your request and provide updates if needed.

Best regards,
Robert Lee
Data Controller
```

### 5.3 Request Refusal

#### 5.3.1 Grounds for Refusal
- **Identity not verified**: Cannot confirm requester identity
- **Rights of others**: Would violate others' privacy
- **Manifestly unfounded**: Clearly inappropriate or abusive
- **Legal obligations**: Conflicts with legal requirements

#### 5.3.2 Refusal Notification Template
```
Subject: Request Decision - Reference [REF-YYYY-MM-DD-XXX]

Dear [Name],

We cannot fulfill your request for the following reason(s):

REFUSAL REASON:
[Detailed explanation with legal basis]

YOUR RIGHTS:
You have the right to:
- Request we reconsider this decision
- Complain to the ICO (ico.org.uk)
- Seek judicial remedy through the courts

CONTACT INFORMATION:
ICO: 0303 123 1113 / casework@ico.org.uk

If you believe we have made an error, please provide additional information that may change our decision.

Best regards,
Robert Lee
Data Controller
```

---

## 6. Documentation & Record Keeping

### 6.1 Request Register
Maintain a record of all requests:

| Reference | Date | Type | Requester | Status | Response Date | Outcome |
|-----------|------|------|-----------|--------|---------------|---------|
| REF-2024-12-01-001 | | | | | | |

### 6.2 Response Templates
- Keep templates updated with current legal requirements
- Personalize each response appropriately
- Include all required information under GDPR

### 6.3 Audit Trail
For each request, maintain:
- **Original request**: Email/letter received
- **Identity verification**: Documentation provided
- **Processing notes**: Steps taken, decisions made
- **Response sent**: Copy of final response
- **Follow-up**: Any subsequent communications

---

## 7. Training & Awareness

### 7.1 Personal Training (Data Controller)
- **Annual GDPR update training**: Legal changes, best practices
- **Customer service skills**: Handling difficult requests
- **Technical training**: Data extraction, system capabilities

### 7.2 Procedure Updates
- **Legal changes**: Update procedures when GDPR guidance changes
- **System changes**: Update when technical capabilities change
- **Lessons learned**: Improve based on request handling experience

---

## 8. Escalation & Complaints

### 8.1 Internal Escalation
**When to escalate:**
- Complex legal questions
- High-profile or sensitive requests
- Potential legal action
- ICO inquiries

**Escalation contacts:**
- Legal advisor: [if available]
- DPO: [external consultant]

### 8.2 ICO Complaints
**Information to provide to users:**
- **ICO contact**: 0303 123 1113
- **Online**: ico.org.uk/make-a-complaint
- **Post**: Information Commissioner's Office, Wycliffe House, Water Lane, Wilmslow, Cheshire SK9 5AF

### 8.3 Complaint Response
If ICO contacts us about a complaint:
- Respond within timeframe specified (usually 28 days)
- Provide all relevant documentation
- Explain our decision-making process
- Cooperate fully with investigation

---

## 9. Key Performance Indicators

### 9.1 Response Metrics
- **Acknowledgment time**: Target <3 working days
- **Response time**: Target <30 calendar days
- **Completion rate**: Target >95%
- **User satisfaction**: Measure through follow-up

### 9.2 Quality Metrics
- **Accuracy**: Correct data provided
- **Completeness**: All relevant data included
- **Clarity**: User understands response
- **Compliance**: Meets GDPR requirements

---

**Document Approval**
- **Approved By**: Data Controller (Robert Lee)
- **Date**: December 2024
- **Next Review**: June 2025
- **Version**: 1.0 
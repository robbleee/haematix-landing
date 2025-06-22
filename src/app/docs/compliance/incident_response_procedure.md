# Incident Response Procedure
**Haem.io Blood Cancer Classification System - GDPR Compliance**

---

**Document Information**
- **Document Type**: Incident Response Procedure
- **Version**: 1.0
- **Created**: December 2024
- **Last Updated**: December 2024
- **Next Review**: June 2025
- **Owner**: Data Controller (Robert Lee)
- **Classification**: CONFIDENTIAL

---

## 1. Purpose & Scope

### 1.1 Purpose
This document establishes procedures for identifying, responding to, and managing data protection incidents in compliance with UK GDPR requirements, specifically the 72-hour breach notification rule.

### 1.2 Scope
This procedure covers all potential data protection incidents involving:
- User account data (stored in PostgreSQL)
- Clinical data processing (real-time only)
- System security breaches
- Third-party processor incidents (OpenAI, Heroku)
- Unauthorized access attempts

### 1.3 Key Definitions
- **Personal Data Breach**: Breach of security leading to accidental or unlawful destruction, loss, alteration, unauthorized disclosure of, or access to personal data
- **High Risk Breach**: Breach likely to result in high risk to individuals' rights and freedoms
- **ICO**: Information Commissioner's Office (UK data protection regulator)

---

## 2. Incident Classification

### 2.1 Severity Levels

#### Level 1: LOW RISK
- **Examples**: 
  - Minor system availability issues
  - Failed login attempts within normal parameters
  - Non-sensitive system errors
- **Response Time**: 24 hours
- **ICO Notification**: Not required
- **User Notification**: Not required

#### Level 2: MEDIUM RISK  
- **Examples**:
  - Unauthorized access to user account data
  - System vulnerabilities discovered
  - Third-party processor security issues
  - Accidental data disclosure to wrong user
- **Response Time**: 4 hours
- **ICO Notification**: Within 72 hours
- **User Notification**: Assess case-by-case

#### Level 3: HIGH RISK
- **Examples**:
  - Database breach with user data exposure
  - Clinical data accessed by unauthorized parties
  - Ransomware or malware infection
  - System compromise with potential data exfiltration
- **Response Time**: Immediate (1 hour)
- **ICO Notification**: Within 72 hours
- **User Notification**: Without undue delay

---

## 3. Contacts & Responsibilities

### 3.1 Primary Contacts (Solo Operation)
- **Data Controller**: Robert Lee, Haem.io Ltd
  - Email: robbielee543@gmail.com
  - Phone: 07399676299
  - Address: 73 Meliden Road, Prestatyn, LL19 8RH, UK

### 3.2 External Contacts
- **ICO**: 0303 123 1113 / casework@ico.org.uk
- **ICO Online Reporting**: https://ico.org.uk/make-a-complaint/
- **Heroku Support**: Via dashboard / support.heroku.com
- **OpenAI Support**: help.openai.com

---

## 4. Incident Response Process

### 4.1 Phase 1: Detection & Assessment (0-1 Hour)

#### 4.1.1 Initial Assessment Checklist
- [ ] **Incident confirmed?** (Yes/No)
- [ ] **Personal data involved?** (Yes/No/Unknown)
- [ ] **How many data subjects affected?** (Number/Unknown)
- [ ] **What type of data?** (Account data/Clinical data/Both)
- [ ] **Ongoing incident?** (Yes/No)
- [ ] **Cause identified?** (Technical/Human error/Malicious)
- [ ] **Containment possible?** (Yes/No/Partial)

#### 4.1.2 Severity Classification Matrix
| Data Type | Affected Users | Severity |
|-----------|----------------|----------|
| Clinical data | Any | HIGH |
| User passwords | Any | HIGH |
| User profiles | >100 | HIGH |
| User profiles | 10-100 | MEDIUM |
| User profiles | <10 | MEDIUM |
| System data only | Any | LOW |

### 4.2 Phase 2: Containment & Investigation (1-4 Hours)

#### 4.2.1 Immediate Containment Actions
- [ ] **Isolate affected systems** (if possible without data loss)
- [ ] **Preserve evidence** (logs, screenshots, forensic data)
- [ ] **Stop ongoing data processing** (if breach is active)
- [ ] **Secure backup systems** (prevent secondary breaches)
- [ ] **Document all actions taken** (time, action, outcome)

#### 4.2.2 Evidence Collection
- [ ] **System logs** (authentication, access, errors)
- [ ] **Database logs** (queries, modifications, exports)
- [ ] **User activity logs** (session data, login patterns)
- [ ] **Third-party notifications** (OpenAI, Heroku alerts)
- [ ] **Screenshots** (error messages, system status)

### 4.3 Phase 3: ICO Notification (Within 72 Hours)

#### 4.3.1 ICO Notification Decision Tree
```
Is personal data involved? 
├─ No → Document incident, no ICO notification required
└─ Yes → Is there risk to individuals' rights and freedoms?
    ├─ No → Document incident, consider ICO notification
    └─ Yes → MANDATORY ICO notification within 72 hours
```

#### 4.3.2 ICO Notification Template
```
Subject: Personal Data Breach Notification - Haem.io Blood Cancer Classification System

Data Controller: Robert Lee, Haem.io
Address: 73 Meliden Road, Prestatyn, LL19 8RH, UK
Email: robbielee543@gmail.com
Phone: 07399676299

1. BREACH DETAILS
- Date/Time of breach: [Date/Time]
- Date/Time discovered: [Date/Time]
- Breach type: [Confidentiality/Integrity/Availability]
- Cause: [Technical failure/Human error/Malicious attack/Unknown]

2. DATA SUBJECTS AFFECTED
- Category: Healthcare professionals using blood cancer classification system
- Number affected: [Number or estimate]
- Geographic location: [UK/International]

3. PERSONAL DATA CATEGORIES
- [ ] User account data (names, emails, institutions)
- [ ] Authentication data (usernames, password hashes)
- [ ] Usage data (login times, preferences)
- [ ] Clinical data (genetic/pathology reports) - if applicable

4. LIKELY CONSEQUENCES
- Risk level: [Low/Medium/High]
- Potential harms: [Identity theft/Professional harm/etc.]
- Justification: [Detailed risk assessment]

5. MEASURES TAKEN
- Containment: [Actions taken to stop breach]
- Investigation: [Steps taken to understand scope]
- Remediation: [Actions to prevent recurrence]
- User notification: [If applicable]

Submitted by: Robert Lee
Date: 22/06/2025
```

### 4.4 Phase 4: User Notification (If High Risk)

#### 4.4.1 User Notification Template
```
Subject: Important Security Notice - Haem.io Account

Dear [User Name],

We are writing to inform you of a security incident that may have affected your account on the Haem.io Blood Cancer Classification System.

WHAT HAPPENED:
[Brief, clear description of the incident]

WHAT INFORMATION WAS INVOLVED:
[Specific data types affected for this user]

WHAT WE ARE DOING:
[Actions taken to address the incident and prevent recurrence]

WHAT YOU CAN DO:
[Specific actions the user should take, if any]
- Change your password immediately
- Monitor your account for unusual activity
- Contact us if you notice anything suspicious

CONTACT INFORMATION:
If you have questions, please contact us at:
Email: robbielee543@gmail.com
Phone: 07399676299

We sincerely apologize for this incident and any inconvenience.

Yours sincerely,
Robert Lee
Data Controller, Haem.io
```

---

## 5. Documentation Requirements

### 5.1 Incident Register
Maintain a record of ALL incidents (even if not reportable):

| Date | Type | Severity | Description | Actions Taken | Outcome | ICO Notified |
|------|------|----------|-------------|---------------|---------|--------------|
| | | | | | | |

### 5.2 Incident Report Template
For each incident, document:
- **Incident ID**: [Unique identifier: INC-YYYY-MM-DD-XXX]
- **Date/Time**: [When incident occurred and was discovered]
- **Description**: [What happened]
- **Impact Assessment**: [Risk level and affected parties]
- **Response Actions**: [Steps taken to address incident]
- **Lessons Learned**: [What could be improved]
- **Follow-up Actions**: [Ongoing remediation steps]

---

## 6. Testing & Training

### 6.1 Quarterly Testing Schedule
- **Q1**: Desktop exercise (hypothetical breach scenario)
- **Q2**: Technical response test (system containment)
- **Q3**: Communication test (notification procedures)
- **Q4**: Full incident simulation (end-to-end)

### 6.2 Testing Scenarios
**Scenario 1: Database Breach**
- PostgreSQL database unauthorized access
- User account data potentially compromised
- Test ICO notification and user communication

**Scenario 2: Third-Party Incident**
- OpenAI reports potential data exposure
- Assess impact on clinical data processing
- Coordinate response with external provider

**Scenario 3: System Compromise**
- Malware infection or ransomware
- System encrypted and potential data loss
- Test backup restoration and communication

---

## 7. Continuous Improvement

### 7.1 Post-Incident Review
Within 30 days of incident closure:
- Root cause analysis
- Response effectiveness assessment
- Procedure improvement recommendations
- Update incident response procedures

### 7.2 Annual Review
- Update contact information
- Review severity classifications
- Update response procedures
- Test communication templates

### 7.3 Key Metrics
Track and monitor:
- Number of incidents by type/severity
- Response time performance
- ICO notification compliance
- User satisfaction with incident handling

---

## 8. Legal Requirements

### 8.1 UK GDPR Requirements
- **Article 33**: ICO notification within 72 hours
- **Article 34**: High-risk breach notification to individuals
- **Recital 87**: Risk assessment for individual notification

### 8.2 Healthcare Considerations
- **NHS Data Security Standards**: Enhanced incident reporting
- **Clinical safety**: Patient safety impact assessment
- **Professional bodies**: Notification if clinical impact

---

**Document Approval**
- **Approved By**: Data Controller (Robert Lee, Haem.io)
- **Date**: June 2025
- **Next Review**: June 2026
- **Version**: 1.0 
# Legal Basis Assessment
**Haem.io Blood Cancer Classification System - GDPR Compliance**

---

**Document Information**
- **Document Type**: Legal Basis Assessment
- **Version**: 1.0
- **Created**: December 2024
- **Last Updated**: December 2024
- **Next Review**: December 2025
- **Owner**: Data Controller (Robert Lee)
- **Classification**: CONFIDENTIAL

---

## 1. Executive Summary

This document establishes the legal basis for processing personal data within the Haem.io Blood Cancer Classification System under UK GDPR. The system processes two distinct categories of data:

1. **User Account Data** (stored): Healthcare professional information
2. **Clinical Data** (processed only): Genetic and pathology reports for classification

**Primary Legal Basis**: Legitimate Interest (Article 6(1)(f)) and Public Interest in Healthcare (Article 9(2)(j))

---

## 2. Legal Framework Overview

### 2.1 UK GDPR Requirements

#### 2.1.1 Regular Personal Data (Article 6)
At least one of the following must apply:
- (a) **Consent**: Clear, specific, informed agreement
- (b) **Contract**: Necessary for contract performance
- (c) **Legal Obligation**: Required by law
- (d) **Vital Interests**: Protect life/fundamental interests
- (e) **Public Task**: Official authority or public interest
- (f) **Legitimate Interests**: Necessary for legitimate purposes

#### 2.1.2 Special Category Data (Article 9)
Additional condition required for health/genetic data:
- (a) **Explicit consent**: Specific consent for health data
- (h) **Healthcare**: Healthcare provision/management
- (i) **Public Health**: Public health interest
- (j) **Research**: Healthcare research in public interest

### 2.2 Healthcare-Specific Legislation
- **Data Protection Act 2018**: UK implementation of GDPR
- **NHS Digital Standards**: Healthcare data protection guidance
- **Medical Device Regulation**: If applicable to classification tools

---

## 3. Processing Activities Analysis

### 3.1 User Account Data Processing

#### 3.1.1 Data Categories
| Data Type | Examples | Necessity | Sensitivity |
|-----------|----------|-----------|-------------|
| **Identity** | Name, email, username | Essential | Medium |
| **Professional** | Institution, specialty, role | Essential | Low |
| **Authentication** | Password hash, login history | Essential | High |
| **Preferences** | Interface settings, preferences | Beneficial | Low |
| **Analytics** | Usage patterns, performance data | Beneficial | Low |

#### 3.1.2 Legal Basis: Legitimate Interest (Article 6(1)(f))

**Our Legitimate Interest:**
- Providing secure access to healthcare decision support tools
- Maintaining system security and integrity
- Improving clinical classification algorithms
- Supporting healthcare research and development

**Necessity Test:**
- ✅ **Necessary**: Account data is essential for system access and security
- ✅ **Proportionate**: Minimal data collected for specific purposes
- ✅ **Less intrusive means**: No alternative method available for secure access

**Balancing Test:**
- **Our interests**: Providing secure, effective healthcare tools
- **User interests**: Professional development, clinical decision support
- **Data subject interests**: Privacy, data security, professional confidentiality
- **Impact on data subjects**: Low risk - professional data only, strong security

**Conclusion**: Legitimate interest is appropriate and proportionate.

#### 3.1.3 Legitimate Interest Assessment (LIA)

**Purpose**: Secure provision of blood cancer classification tools to healthcare professionals

**Benefits**:
- **To us**: Sustainable service provision, security maintenance, quality improvement
- **To users**: Access to evidence-based classification tools, professional development
- **To society**: Improved healthcare outcomes, advanced medical research

**Necessity**:
- **Is processing necessary?** Yes - cannot provide secure service without user accounts
- **Could we achieve purpose another way?** No - anonymous access would compromise security and audit requirements
- **Is data proportionate?** Yes - only collect data necessary for service provision

**Impact on individuals**:
- **Type of data**: Professional information (non-intimate)
- **Sensitivity**: Low to medium (professional context)
- **Amount of data**: Minimal - only essential information
- **Likelihood of harm**: Low - strong security measures in place
- **Severity of harm**: Low - professional data disclosure minimal impact

**Balancing outcome**: 
✅ **Proceed** - Our legitimate interests do not override individual rights and freedoms

### 3.2 Clinical Data Processing

#### 3.2.1 Data Categories
| Data Type | Examples | Processing | Storage |
|-----------|----------|------------|---------|
| **Genetic Data** | Mutations, chromosomal changes | ✅ Real-time | ❌ Not stored |
| **Health Data** | Pathology results, cell counts | ✅ Real-time | ❌ Not stored |
| **Clinical Reports** | Full text reports | ✅ Text extraction | ❌ Not stored |
| **Patient Identifiers** | Names, dates, IDs | ✅ Anonymization | ❌ Not stored |

#### 3.2.2 Legal Basis: Article 9(2)(j) - Public Interest Healthcare Research

**Public Interest Justification:**
- **Healthcare Research**: Advancing knowledge in haematologic malignancies
- **Clinical Decision Support**: Assisting healthcare professionals with evidence-based classifications
- **Quality Improvement**: Enhancing diagnostic accuracy and consistency
- **Educational Value**: Training healthcare professionals in modern classification systems

**Safeguards in Place:**
- ✅ **No data storage**: Clinical data processed in real-time only
- ✅ **Anonymization**: Microsoft Presidio removes patient identifiers
- ✅ **Professional access only**: Limited to qualified healthcare professionals
- ✅ **Audit logging**: Comprehensive tracking of all processing activities
- ✅ **Encryption**: Enterprise-grade security for data in transit

**EU/UK Guidance Compliance:**
- **Article 89 GDPR**: Research safeguards implemented
- **ICO Research Code**: Appropriate safeguards for health research
- **MRC Guidelines**: Medical research data protection standards

#### 3.2.3 Alternative Legal Bases Considered

**Article 9(2)(a) - Explicit Consent:**
- ❌ **Rejected**: Impractical for real-time clinical workflow
- ❌ **Rejected**: Complex consent management for multiple patients
- ❌ **Rejected**: Risk of consent withdrawal disrupting clinical care

**Article 9(2)(h) - Healthcare Provision:**
- ⚠️ **Considered**: Could apply but more restrictive than public interest
- ❌ **Rejected**: Our system assists rather than directly provides care
- ❌ **Rejected**: May limit research and improvement activities

**Article 9(2)(i) - Public Health:**
- ⚠️ **Considered**: Could apply for population health monitoring
- ❌ **Rejected**: Our focus is individual case classification, not population surveillance

---

## 4. Risk Assessment & Safeguards

### 4.1 Privacy Risks

#### 4.1.1 User Account Data
| Risk | Impact | Likelihood | Mitigation |
|------|--------|------------|------------|
| **Unauthorized access** | Medium | Low | Multi-factor authentication, encryption |
| **Data breach** | Medium | Low | AES-256 encryption, secure hosting |
| **Identity theft** | Low | Very Low | Professional data only, limited exposure |
| **Professional harm** | Low | Low | Strong access controls, audit logging |

#### 4.1.2 Clinical Data
| Risk | Impact | Likelihood | Mitigation |
|------|--------|------------|------------|
| **Patient re-identification** | High | Very Low | Microsoft Presidio anonymization, no storage |
| **Clinical data exposure** | High | Very Low | Real-time processing only, no persistence |
| **Diagnostic errors** | Medium | Low | Logic-based algorithms, human oversight required |
| **Unauthorized processing** | Medium | Very Low | Healthcare professional verification only |

### 4.2 Technical Safeguards

#### 4.2.1 Security Measures
- **Encryption**: AES-256-CBC for data at rest and in transit
- **Access Controls**: Role-based authentication, multi-factor where possible
- **Anonymization**: Microsoft Presidio enterprise-grade PII detection (95%+ accuracy)
- **Audit Logging**: Comprehensive tracking of all data processing activities
- **Session Management**: Automatic clinical data deletion on session end

#### 4.2.2 Operational Safeguards
- **Professional Verification**: Users must be qualified healthcare professionals
- **Usage Limitations**: System designed for educational and research purposes
- **Human Oversight**: Clear disclaimers requiring human review of classifications
- **Quality Controls**: Regular validation of classification algorithms

### 4.3 Legal Safeguards

#### 4.3.1 Contractual Protections
- **Terms of Service**: Clear usage limitations and responsibilities
- **Data Processing Agreements**: With third-party processors (OpenAI, Heroku)
- **Professional Standards**: Adherence to medical professional guidelines
- **Indemnification**: Appropriate liability and insurance coverage

#### 4.3.2 Regulatory Compliance
- **UK GDPR**: Full compliance with data protection requirements
- **Medical Device Regulations**: If classification system requires registration
- **Professional Body Standards**: Compliance with medical association guidelines
- **International Standards**: Adherence to ISO 27001 security standards where applicable

---

## 5. Lawful Basis Documentation

### 5.1 User Account Processing Record

**Processing Activity**: User Account Management  
**Legal Basis**: Article 6(1)(f) - Legitimate Interests  
**Legitimate Interest**: Secure provision of healthcare classification tools  
**Necessity**: Essential for system access and security  
**Balancing Test**: Completed - interests do not override individual rights  
**Safeguards**: Encryption, access controls, audit logging  
**Retention**: Until account deletion requested  
**Individual Rights**: Access, rectification, erasure, restriction, portability, objection

### 5.2 Clinical Data Processing Record

**Processing Activity**: Clinical Data Classification  
**Legal Basis**: Article 9(2)(j) - Public Interest Healthcare Research  
**Public Interest**: Advancing haematologic malignancy classification  
**Safeguards**: No storage, anonymization, professional access only  
**Necessity**: Essential for classification algorithm operation  
**Proportionality**: Minimal processing, real-time only  
**Retention**: No retention - processed in real-time only  
**Individual Rights**: Limited due to anonymization and no storage

---

## 6. Third-Party Processor Assessment

### 6.1 OpenAI (ChatGPT API)

#### 6.1.1 Processing Details
- **Purpose**: Text extraction from clinical reports
- **Data Sent**: Anonymized clinical text (PII removed via Presidio)
- **Data Received**: Structured data extraction results
- **Location**: United States (with EU adequacy considerations)
- **Retention**: As per OpenAI's data retention policy

#### 6.1.2 Legal Basis
- **Primary**: Article 9(2)(j) - Public Interest Healthcare Research
- **Data Minimization**: Only anonymized text sent
- **Necessity**: Essential for automated text extraction
- **International Transfer**: Adequacy decision considerations + anonymization

#### 6.1.3 Safeguards
- ✅ **Data Processing Agreement**: Signed with OpenAI
- ✅ **Anonymization**: Microsoft Presidio removes PII before sending
- ✅ **Usage Restrictions**: API usage complies with healthcare data requirements
- ✅ **Monitoring**: Regular review of data sent to ensure anonymization effectiveness

### 6.2 Heroku (Salesforce)

#### 6.2.1 Processing Details
- **Purpose**: Cloud hosting and infrastructure
- **Data Stored**: User account data, system logs
- **Data Processed**: User authentication, system operations
- **Location**: European Union (Ireland region)
- **Retention**: As per system retention policies

#### 6.2.2 Legal Basis
- **Primary**: Article 6(1)(f) - Legitimate Interests (system operation)
- **Data Minimization**: Only necessary data for hosting
- **Necessity**: Essential for system availability and performance
- **International Transfer**: Not applicable (EU hosting)

#### 6.2.3 Safeguards
- ✅ **Data Processing Agreement**: Included in Heroku terms
- ✅ **Encryption**: AES-256 encryption at rest and in transit
- ✅ **Access Controls**: Strict access controls to hosting environment
- ✅ **Compliance**: Heroku SOC 2 Type II certified

---

## 7. Individual Rights Impact

### 7.1 Rights Applicability

#### 7.1.1 User Account Data
| Right | Applicable | Implementation |
|-------|------------|----------------|
| **Information** | ✅ Yes | Privacy notice, system documentation |
| **Access** | ✅ Yes | JSON export of account data |
| **Rectification** | ✅ Yes | Profile update functionality |
| **Erasure** | ✅ Yes | Account deletion button implemented |
| **Restriction** | ✅ Yes | Account deactivation capability |
| **Portability** | ✅ Yes | JSON export format |
| **Object** | ✅ Yes | Account deletion process |

#### 7.1.2 Clinical Data
| Right | Applicable | Implementation |
|-------|------------|----------------|
| **Information** | ✅ Yes | Clear explanation of real-time processing |
| **Access** | ❌ No | No data stored to access |
| **Rectification** | ❌ No | No data stored to correct |
| **Erasure** | ✅ N/A | Data automatically deleted |
| **Restriction** | ✅ Yes | User can stop session anytime |
| **Portability** | ❌ No | No data stored to port |
| **Object** | ✅ Yes | User can stop processing anytime |

### 7.2 Rights Limitations

#### 7.2.1 Legitimate Limitations
- **System Security**: Cannot provide access that would compromise security
- **Other Individuals**: Cannot disclose data that would affect others' privacy
- **Legal Obligations**: Must retain data required by law (audit logs)
- **Technical Impossibility**: Cannot provide what is not stored (clinical data)

#### 7.2.2 Balancing Considerations
- **Individual Rights**: Maximum feasible rights implementation
- **System Integrity**: Maintain security and operational capability
- **Other Users**: Protect other users' rights and privacy
- **Public Interest**: Maintain healthcare research and improvement capabilities

---

## 8. Compliance Monitoring

### 8.1 Regular Reviews

#### 8.1.1 Legal Basis Review Schedule
- **Quarterly**: Technical safeguards effectiveness
- **Bi-annually**: Balancing test reassessment
- **Annually**: Full legal basis review and update
- **Triggered**: When processing activities change

#### 8.1.2 Key Performance Indicators
- **Rights Requests**: Response time and completion rate
- **Anonymization Effectiveness**: Presidio detection accuracy
- **Security Incidents**: Frequency and severity
- **User Satisfaction**: Feedback on privacy and data handling

### 8.2 Change Management

#### 8.2.1 When to Update Legal Basis
- **New data categories**: Additional data types processed
- **Purpose expansion**: New uses for existing data
- **Technical changes**: Significant system modifications
- **Legal changes**: Updates to GDPR guidance or healthcare regulations

#### 8.2.2 Update Process
1. **Impact Assessment**: Evaluate changes to processing
2. **Legal Review**: Confirm continued appropriateness of legal basis
3. **Safeguards Update**: Implement additional protections if needed
4. **Documentation Update**: Revise this document and privacy notices
5. **User Communication**: Inform users of significant changes

---

## 9. Legal Opinions & Justifications

### 9.1 Legitimate Interest Detailed Analysis

#### 9.1.1 The Three-Part Test

**Part 1: Legitimate Interest Test**
- **Question**: Do we have a legitimate interest?
- **Answer**: Yes - providing secure healthcare decision support tools
- **Justification**: Healthcare improvement and professional education are recognized legitimate interests

**Part 2: Necessity Test**
- **Question**: Is processing necessary for that interest?
- **Answer**: Yes - cannot provide secure, personalized service without user accounts
- **Justification**: No alternative method available for secure access and audit requirements

**Part 3: Balancing Test**
- **Question**: Do individual interests override our legitimate interests?
- **Answer**: No - appropriate safeguards protect individual rights
- **Justification**: Professional context, minimal data, strong security, clear purpose

#### 9.1.2 ICO Guidance Compliance
- **Professional Context**: Users are healthcare professionals acting in professional capacity
- **Clear Purpose**: Specific, well-defined purpose for data processing
- **Proportionate Processing**: Minimal data collection and processing
- **Adequate Safeguards**: Enterprise-grade security and access controls
- **Individual Control**: Account deletion and preference management available

### 9.2 Public Interest Healthcare Research

#### 9.2.1 Research Characteristics
- **Healthcare Focus**: Specific to haematologic malignancy classification
- **Evidence-Based**: Uses established clinical guidelines (WHO, ELN, ICC)
- **Educational Value**: Improves healthcare professional knowledge
- **Quality Improvement**: Enhances diagnostic consistency and accuracy
- **No Commercial Purpose**: Research aims, not commercial exploitation

#### 9.2.2 Article 89 Safeguards
- **Data Minimization**: No storage of clinical data
- **Purpose Limitation**: Specific healthcare research purposes only
- **Anonymization**: Enterprise-grade PII removal before processing
- **Access Controls**: Limited to qualified healthcare professionals
- **Technical Measures**: Encryption, audit logging, secure processing

---

## 10. Conclusion & Recommendations

### 10.1 Legal Basis Summary

**Primary Legal Bases Established:**
- ✅ **User Account Data**: Article 6(1)(f) Legitimate Interests
- ✅ **Clinical Data**: Article 9(2)(j) Public Interest Healthcare Research

**Compliance Status:**
- ✅ **UK GDPR**: Fully compliant with all requirements
- ✅ **Individual Rights**: Appropriate implementation
- ✅ **Safeguards**: Comprehensive technical and organizational measures
- ✅ **Documentation**: Complete legal basis documentation

### 10.2 Ongoing Obligations

#### 10.2.1 Immediate Actions
- ✅ **Monitor effectiveness**: Quarterly safeguards review
- ✅ **Document decisions**: Maintain records of legal basis assessments
- ✅ **Train personnel**: Ensure understanding of legal obligations
- ✅ **Update documentation**: Keep legal basis current with system changes

#### 10.2.2 Long-term Commitments
- **Annual review**: Full legal basis reassessment
- **Change management**: Update when processing activities change
- **Regulatory monitoring**: Track changes in GDPR guidance
- **Best practice adoption**: Implement emerging privacy-enhancing technologies

### 10.3 Risk Assessment Conclusion

**Overall Risk Level**: LOW
- **User Account Data**: Low risk due to professional context and strong safeguards
- **Clinical Data**: Very low risk due to no storage and anonymization
- **Third-Party Processing**: Low risk due to anonymization and appropriate safeguards

**Recommendation**: Processing may continue under established legal bases with regular monitoring and review.

---

**Document Approval**
- **Legal Basis Assessment Completed By**: Data Controller (Robert Lee)
- **Legal Review**: Completed by Robert Lee (Data Controller)
- **DPO Consultation**: Completed by Robert Lee (Data Protection Officer)
- **Approved Date**: December 2024
- **Next Review**: December 2025
- **Version**: 1.0

**Distribution**
- Data Controller: Robert Lee
- Data Protection Officer: Robert Lee
- Legal Advisor: Robert Lee (self-managed)
- Technical Team: Robert Lee (founder/developer)

---

## Appendices

### Appendix A: Legal Basis Decision Tree
[Flowchart for determining appropriate legal basis]

### Appendix B: Balancing Test Worksheet
[Detailed balancing test calculations and considerations]

### Appendix C: Third-Party Processor Agreements
[Summary of data processing agreements with OpenAI and Heroku]

### Appendix D: Individual Rights Implementation Matrix
[Detailed breakdown of how each right is implemented]

### Appendix E: Regulatory Guidance References
[Links to relevant ICO, NHS, and other regulatory guidance documents] 
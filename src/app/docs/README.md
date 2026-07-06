# Documentation Organization
**Haem.io Blood Cancer Classification System**

This directory contains all documentation for the Haem.io system, organized into logical categories for easy navigation and maintenance.

---

## 📁 Folder Structure

### 🔒 **compliance/** - GDPR & Legal Compliance
Complete GDPR compliance documentation and procedures:

- **`dpia_assessment.md`** - Data Protection Impact Assessment (DPIA)
- **`incident_response_procedure.md`** - 72-hour breach notification procedures
- **`individual_rights_procedure.md`** - Data subject rights handling (Access, Erasure, etc.)
- **`legal_basis_assessment.md`** - Legal justification for data processing
- **`privacy_notice.md`** - User privacy notice and data protection information
- **`uk_gdpr_compliance.md`** - UK GDPR compliance overview and requirements

### 🛡️ **security/** - Security Documentation
Current security documentation and archived implementation notes:

- **`security_and_compliance.md`** - Overall security architecture and compliance measures
- **`healthcare_encryption_implementation.md`** - Archived historical implementation note
- **`presidio_installation_guide.md`** - Archived historical implementation note

### ⚙️ **technical/** - Technical Documentation
System architecture and technical specifications:

- **`technical_architecture.md`** - System architecture and component overview
- **`api_reference.md`** - API documentation and endpoints
- **`classification_algorithms.md`** - Blood cancer classification algorithm details
- **`data_formats.md`** - Data input/output formats and structures

### 👥 **user-guides/** - User Documentation
End-user documentation and guides:

- **`user_manual.md`** - Complete user manual for healthcare professionals
- **`app_functionality.md`** - Application features and functionality overview

### 🔧 **development/** - Developer Documentation
Development guides and integration documentation:

- **`developer_guide.md`** - Development setup, deployment, and contribution guide
- **`treatment_parser_integration.md`** - Treatment recommendation parser integration

### 🏥 **clinical/** - Clinical Features
Clinical functionality and healthcare-specific features:

- **`clinical_trial_matching_system.md`** - Clinical trial matching functionality

### 📄 **legal/** - Legal Documentation
Reserved for additional legal documents (currently empty).

---

## 📋 **Quick Reference**

### **For Healthcare Professionals:**
- Start with: `user-guides/user_manual.md`
- App features: `user-guides/app_functionality.md`
- Privacy information: `compliance/privacy_notice.md`

### **For Administrators:**
- GDPR compliance: `compliance/uk_gdpr_compliance.md`
- Security setup: `security/security_and_compliance.md`
- Incident response: `compliance/incident_response_procedure.md`

### **For Developers:**
- Setup guide: `development/developer_guide.md`
- Architecture: `technical/technical_architecture.md`
- API reference: `technical/api_reference.md`

### **For Compliance Officers:**
- DPIA: `compliance/dpia_assessment.md`
- Legal basis: `compliance/legal_basis_assessment.md`
- Individual rights: `compliance/individual_rights_procedure.md`

---

## 🎯 **Documentation Status**

### ✅ **Complete & Current**
- GDPR compliance documentation
- Security and compliance overview
- User manuals and guides
- Technical architecture documentation

### 🔄 **Regularly Updated**
- API reference (as system evolves)
- User manual (with new features)
- Compliance documentation (annual reviews)

### 📅 **Review Schedule**
- **Compliance docs**: Quarterly review
- **Technical docs**: Updated with releases
- **User docs**: Updated with UI changes
- **Security docs**: Annual security review

---

## 🔍 **Finding Documents**

### **By Audience:**
```
Healthcare Users → user-guides/
System Admins → security/ + compliance/
Developers → development/ + technical/
Legal/Compliance → compliance/ + legal/
Clinical Staff → clinical/ + user-guides/
```

### **By Topic:**
```
GDPR → compliance/
Security → security/
APIs → technical/
Setup → development/
Usage → user-guides/
```

---

## 📝 **Document Maintenance**

### **Document Owners:**
- **Compliance**: Robert Lee (Data Controller)
- **Security**: Robert Lee (Technical Lead)
- **User Guides**: Robert Lee (Product Owner)
- **Technical**: Robert Lee (Development Lead)
- **Clinical**: Robert Lee & Clinical Advisors

### **Update Triggers:**
- System updates or new features
- Regulatory changes (GDPR, healthcare)
- Security incidents or improvements
- User feedback and support requests

### **Version Control:**
All documents include:
- Version number
- Last updated date
- Next review date
- Document owner

---

## 🔗 **External References**

### **Regulatory:**
- [ICO GDPR Guidance](https://ico.org.uk/for-organisations/guide-to-data-protection/)
- [NHS Digital Standards](https://digital.nhs.uk/data-and-information)
- [UK GDPR Legislation](https://www.gov.uk/data-protection)

### **Technical:**
- [Heroku Security](https://devcenter.heroku.com/articles/security)
- [Vercel Security](https://vercel.com/security)

---

## 📞 **Support & Questions**

For questions about specific documentation:

- **Compliance/Legal**: robert.lee@haem.io
- **Technical Issues**: robert.lee@haem.io
- **User Guide Questions**: robert.lee@haem.io
- **Clinical Queries**: robert.lee@haem.io

---

**Last Updated**: July 2026  
**Next Organization Review**: January 2027  
**Maintained By**: Haemio Ltd

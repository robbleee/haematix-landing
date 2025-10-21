'use client';

import { useState } from 'react';
import styles from './dataroom.module.css';

const NDAContent = () => (
  <div className={styles.ndaFormatted}>
    <div className={styles.ndaHeader}>
      <h3>Non-Disclosure Agreement</h3>
      <p className={styles.ndaDate}>This agreement is dated 21 October 2025</p>
      <p className={styles.ndaTo}>To: Investor/Partner</p>
    </div>

    <section className={styles.ndaSection}>
      <h4>PURPOSE</h4>
      <p>
        Further to our early discussions regarding the Project, we confirm that we are happy to continue these discussions and to disclose further information and documents related to the Project, as defined below, provided that we, that is Haemio Ltd and the recipient (each a "Party", together "Parties") agree to keep the Project and all information and documents disclosed or discussed in relation to the Project confidential at all times in accordance with the terms of this letter (the "Agreement").
      </p>
    </section>

    <section className={styles.ndaSection}>
      <h4>DEFINITIONS</h4>
      <p>In this Agreement you will see certain references. The meaning of those references is set out here:</p>
      
      <div className={styles.definition}>
        <p><strong>"Confidential Information"</strong> is any and all information of any kind whatsoever and includes but is not limited to:</p>
        <ul>
          <li>any information of a confidential nature including trade secrets and commercially sensitive information relating directly or indirectly to the Project;</li>
          <li>personal data about the founders, directors, employees and contractors of each Party; performance information about each Party's business (operational, technical and financial); product development information (algorithms, databases, designs, plans, roadmaps, technology, prototypes and any intellectual property); strategy and operational information (reports, plans, targets, customers, financial and performance metrics, suppliers and advisors),</li>
        </ul>
        <p>and in each case includes analyses, compilations, summaries, forecasts, studies or other documents (whether in written or electronic form) and all information and material prepared or generated from such information in either human or machine readable form and whether stored electronically or otherwise.</p>
      </div>

      <div className={styles.definition}>
        <p><strong>"Discloser"</strong> means the Party sharing or disclosing Confidential Information to the other Party.</p>
      </div>

      <div className={styles.definition}>
        <p><strong>"Project"</strong> means: Haem.io AI diagnostic platform</p>
      </div>

      <div className={styles.definition}>
        <p><strong>"Recipient"</strong> means the Party receiving Confidential Information from the Discloser.</p>
      </div>

      <div className={styles.definition}>
        <p><strong>"Representatives"</strong> means the employees, officers, agents, consultants, advisors or subcontractors of each Party.</p>
      </div>
    </section>

    <section className={styles.ndaSection}>
      <h4>UNDERTAKINGS OF CONFIDENTIALITY</h4>
      <ol>
        <li>Following the signing of this Agreement and throughout the duration of this Agreement, the Recipient will keep the Confidential Information provided directly or indirectly by the Discloser to the Recipient before, on or after the signing of this Agreement, secret and will not, without the prior written consent of the Discloser, share or use any Confidential Information in whole or in part with any third party, directly or indirectly, except for the exclusive purpose of evaluating the Project and carrying out the Project should both Parties agree to go ahead.</li>
        <li>The Recipient will take all steps necessary to protect the Confidential Information and keep it stored securely.</li>
        <li>The Recipient may disclose the Confidential Information to its Representatives who have a specific need to know the Confidential Information for the Project, provided that:
          <ol type="a">
            <li>they are bound by obligations of confidentiality to the Recipient; and</li>
            <li>the Recipient will monitor the Representatives' compliance with the confidentiality obligations, notify the Discloser of any breach thereof immediately upon the discovery of the breach, and enforce the confidentiality obligations against the Representatives without delay.</li>
          </ol>
        </li>
        <li>The Recipient agrees that it will be liable for the actions or omissions of the Representatives in relation to the Confidential Information as if they were the actions or omissions of the Recipient.</li>
      </ol>
    </section>

    <section className={styles.ndaSection}>
      <h4>EXCLUSIONS</h4>
      <p>For the avoidance of doubt, Confidential Information does not include any information which:</p>
      <ol type="a">
        <li>the Recipient can adequately prove was already in their lawful possession and at their free disposal before it was disclosed by the Discloser;</li>
        <li>was disclosed to the Recipient by a third party who (or which) by such disclosure did not breach any obligation of confidentiality (whether contractual or otherwise) to the Discloser;</li>
        <li>was independently developed by the Recipient (with no reference to any information disclosed to it by the Discloser, whether before or after the date of this Agreement);</li>
        <li>is in, or comes into, the public domain, except as a result of a breach by the Recipient or any Representative of any obligation of confidentiality (whether contractual or otherwise),</li>
      </ol>
      <p>and in each case only to the extent that the Recipient provides evidence that such information falls within one of paragraphs (a) to (d) above to the reasonable satisfaction of the Discloser.</p>
      <p>The Recipient may disclose Confidential Information if required to do so by law, or by any regulatory or governmental authority of competent jurisdiction, or by any court of competent jurisdiction. The Recipient will give the Discloser as much notice of the disclosure as possible and take into account any reasonable requests of the Discloser in relation to the timing and content of the disclosure where they are able to do so.</p>
    </section>

    <section className={styles.ndaSection}>
      <h4>DURATION</h4>
      <p>
        This Agreement will come into full force from the date it is duly signed by both Parties, and will govern the Parties' rights and obligations relating to its subject matter with effect from the date when any Confidential Information was first shared by either Party with the other, and the Parties will continue to be bound to keep the Confidential Information secret in accordance with the terms of this Agreement for a period of 5 years or until released by the Discloser formally in writing, whichever occurs earlier.
      </p>
    </section>

    <section className={styles.ndaSection}>
      <h4>RETURN OF RELEVANT INFORMATION</h4>
      <p>
        If negotiations in connection with the Project are unsuccessful, or upon request from the Discloser at any time, the Recipient will immediately return, erase or destroy all Confidential Information in its possession together with any derivative works which are based on or which may contain Confidential Information.
      </p>
    </section>

    <section className={styles.ndaSection}>
      <h4>NOTICES</h4>
      <p>Any notice or other communication given to a Party under or in connection with this Agreement will be in writing and will be delivered by hand or sent by email to the other Party's email address as notified from time to time.</p>
      <p>Any notice or communication will be deemed to have been received:</p>
      <ul>
        <li>if delivered personally, at the time of delivery;</li>
        <li>if sent by email, 1 hour after the time sent unless the sender received an automated message that the email has not been delivered.</li>
      </ul>
      <p>This clause does not apply to the service of any proceedings or other documents in any legal action or, where applicable, any arbitration or other method of dispute resolution.</p>
    </section>

    <section className={styles.ndaSection}>
      <h4>GENERAL</h4>
      <ul>
        <li>Nothing in this Agreement constitutes any warranty or representation in respect of the Confidential Information or matters contained in it. Confidential Information is provided on an "as is" basis.</li>
        <li>Without prejudice to any other rights and remedies either Party may have, both Parties agree that the Confidential Information is valuable and that damages may not be an adequate remedy for any breach of the terms set out in this Agreement. Accordingly, both Parties agree that either Party will be entitled without proof of special damage to the remedies of an injunction and other equitable relief for any actual or threatened breach by any Party to this Agreement.</li>
        <li>The validity, construction and performance of this Agreement will be governed by and construed in accordance with the laws of England and Wales and each Party will submit to the exclusive jurisdiction of the courts of England and Wales.</li>
        <li>This Agreement contains the entire agreement between the Parties and supersedes and extinguishes all previous drafts, agreements, arrangements and understandings between the Parties with respect to its subject matter.</li>
      </ul>
    </section>

    <div className={styles.ndaFooter}>
      <p><strong>Haemio Ltd</strong></p>
      <p>Company Number 16528517</p>
      <p>73 Meliden Road, Prestatyn, LL19 8RH, United Kingdom</p>
    </div>
  </div>
);

export default function DataRoom() {
  const [passwordEntered, setPasswordEntered] = useState('');
  const [isPasswordCorrect, setIsPasswordCorrect] = useState(false);
  const [ndaAccepted, setNdaAccepted] = useState(false);
  const [showNda, setShowNda] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [ndaCheckboxChecked, setNdaCheckboxChecked] = useState(false);
  const [showAccessRequest, setShowAccessRequest] = useState(false);
  const [requestEmail, setRequestEmail] = useState('');
  const [requestName, setRequestName] = useState('');
  const [requestMessage, setRequestMessage] = useState('');
  const [isSubmittingRequest, setIsSubmittingRequest] = useState(false);
  const [requestSuccess, setRequestSuccess] = useState(false);
  const [requestError, setRequestError] = useState('');

  // Simple password - in production this should be more secure with server-side validation
  const CORRECT_PASSWORD = 'Haemio!2025$DataRoom';

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (passwordEntered === CORRECT_PASSWORD) {
      setIsPasswordCorrect(true);
      setShowNda(true);
      setPasswordError('');
    } else {
      setPasswordError('Incorrect password. Please try again.');
    }
  };

  const handleNdaAccept = () => {
    setNdaAccepted(true);
  };

  const handleDownloadPitch = () => {
    // Create a link and trigger download
    const link = document.createElement('a');
    link.href = '/Haem.io-pitch.pdf';
    link.download = 'Haemio-Investor-Pitch.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleAccessRequest = async (e, accessLevel = 'basic') => {
    e.preventDefault();
    setIsSubmittingRequest(true);
    setRequestError('');

    try {
      const response = await fetch('/api/request-access', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: requestName,
          email: requestEmail,
          message: requestMessage,
          accessLevel: accessLevel,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setRequestSuccess(true);
        setRequestName('');
        setRequestEmail('');
        setRequestMessage('');
      } else {
        setRequestError(data.error || 'Failed to submit request. Please try again.');
      }
    } catch (error) {
      setRequestError('Failed to submit request. Please try emailing robert.lee@haem.io directly.');
    } finally {
      setIsSubmittingRequest(false);
    }
  };

  return (
    <div className={styles.dataRoomContainer}>
      <a href="/" className={styles.backButton}>
        ← Back to Home
      </a>

      <div className={styles.dataRoomContent}>
        {!isPasswordCorrect ? (
          // Password Entry Screen or Request Access Screen
          <div className={styles.passwordScreen}>
            <div className={styles.logoSection}>
              <h1 className={styles.logo}>Haem.io</h1>
              <p className={styles.tagline}>Investor Data Room</p>
            </div>

            {!showAccessRequest ? (
              // Password Entry Form
              <>
                <div className={styles.passwordCard}>
                  <h2>Secure Access Required</h2>
                  <p>Please enter the password to access confidential materials</p>
                  
                  <form onSubmit={handlePasswordSubmit} className={styles.passwordForm}>
                    <input
                      type="password"
                      value={passwordEntered}
                      onChange={(e) => setPasswordEntered(e.target.value)}
                      placeholder="Enter password"
                      className={styles.passwordInput}
                      autoFocus
                    />
                    {passwordError && (
                      <div className={styles.errorMessage}>{passwordError}</div>
                    )}
                    <button type="submit" className={styles.submitButton}>
                      Access Data Room
                    </button>
                  </form>
                </div>

                <div className={styles.helpText}>
                  <p>Don't have access?</p>
                  <button 
                    onClick={() => setShowAccessRequest(true)}
                    className={styles.requestAccessButton}
                  >
                    Request Access
                  </button>
                </div>
              </>
            ) : (
              // Request Access Form
              <div className={styles.accessRequestCard}>
                {!requestSuccess ? (
                  <>
                    <h3>Request Data Room Access</h3>
                    <p>Fill out the form below and we'll get back to you shortly.</p>
                    
                    <form onSubmit={(e) => handleAccessRequest(e, 'basic')} className={styles.accessRequestForm}>
                      <div className={styles.formGroup}>
                        <label htmlFor="requestName">Full Name *</label>
                        <input
                          type="text"
                          id="requestName"
                          value={requestName}
                          onChange={(e) => setRequestName(e.target.value)}
                          required
                          className={styles.formInput}
                          placeholder="John Smith"
                          autoFocus
                        />
                      </div>

                      <div className={styles.formGroup}>
                        <label htmlFor="requestEmail">Email Address *</label>
                        <input
                          type="email"
                          id="requestEmail"
                          value={requestEmail}
                          onChange={(e) => setRequestEmail(e.target.value)}
                          required
                          className={styles.formInput}
                          placeholder="john@example.com"
                        />
                      </div>

                      <div className={styles.formGroup}>
                        <label htmlFor="requestMessage">Message (Optional)</label>
                        <textarea
                          id="requestMessage"
                          value={requestMessage}
                          onChange={(e) => setRequestMessage(e.target.value)}
                          className={styles.formTextarea}
                          placeholder="Tell us a bit about yourself and why you're interested..."
                          rows="4"
                        />
                      </div>

                      {requestError && (
                        <div className={styles.errorMessage}>{requestError}</div>
                      )}

                      <div className={styles.formButtons}>
                        <button 
                          type="button"
                          onClick={() => setShowAccessRequest(false)}
                          className={styles.backButtonForm}
                        >
                          ← Back to Login
                        </button>
                        <button 
                          type="submit" 
                          className={styles.submitButton}
                          disabled={isSubmittingRequest}
                        >
                          {isSubmittingRequest ? 'Submitting...' : 'Submit Request'}
                        </button>
                      </div>
                    </form>
                  </>
                ) : (
                  <div className={styles.successMessage}>
                    <div className={styles.successIcon}>✓</div>
                    <h3>Request Submitted!</h3>
                    <p>Thank you for your interest. We'll review your request and get back to you at {requestEmail} shortly.</p>
                    <button 
                      onClick={() => {
                        setRequestSuccess(false);
                        setShowAccessRequest(false);
                      }}
                      className={styles.closeButton}
                    >
                      Back to Login
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        ) : !ndaAccepted ? (
          // NDA Acceptance Screen
          <div className={styles.ndaScreen}>
            <div className={styles.ndaCard}>
              <h2>Non-Disclosure Agreement</h2>
              <p className={styles.ndaIntro}>
                Before accessing confidential materials, please read and accept the Non-Disclosure Agreement below.
              </p>

              <div className={styles.ndaTextContainer}>
                <NDAContent />
              </div>

              <div className={styles.ndaActions}>
                <label className={styles.checkboxLabel}>
                  <input 
                    type="checkbox" 
                    checked={ndaCheckboxChecked}
                    onChange={(e) => setNdaCheckboxChecked(e.target.checked)}
                    className={styles.checkbox}
                  />
                  <span>I have read and agree to the terms of this Non-Disclosure Agreement</span>
                </label>

                <button 
                  onClick={handleNdaAccept}
                  className={styles.acceptButton}
                  disabled={!ndaCheckboxChecked}
                >
                  Accept and Continue
                </button>
              </div>
            </div>
          </div>
        ) : (
          // Document Access Screen
          <div className={styles.documentsScreen}>
            <div className={styles.documentsCard}>
              <div className={styles.accessLevelBadge}>Basic Access</div>
              <h1>Haem.io Investor Data Room</h1>
              <p className={styles.welcomeText}>
                Welcome to the Haemio investor data room. You have successfully authenticated and accepted the NDA. You currently have <strong>basic access</strong> to our investor pitch deck. Request full access below for additional materials including financial projections and clinical validation data.
              </p>

              <div className={styles.documentCard}>
                <div className={styles.documentIcon}>📄</div>
                <h3>Investor Pitch Deck</h3>
                <p>Complete investor presentation including market analysis, product overview, and financial projections.</p>
                <button 
                  onClick={handleDownloadPitch}
                  className={styles.downloadButton}
                >
                  Download PDF
                </button>
              </div>


              <div className={styles.teamSection}>
                <h2>The Founding Team</h2>
                <p className={styles.teamIntro}>World-class expertise in AI, clinical haematology, and healthcare technology.</p>
                
                <div className={styles.teamGrid}>
                  <div className={styles.teamMemberCard}>
                    <div className={styles.teamMemberPhoto}>
                      <img src="/profile-pics/robbie.png" alt="Robert Lee" />
                    </div>
                    <h3>Robert Lee</h3>
                    <h4>CEO & Co-Founder</h4>
                    <p>
                      Robert is the architect of Haem.io's core technology and leads the company's strategy. His mission is deeply personal, born from his experience as a Burkitt's Lymphoma survivor diagnosed at 19, which instilled in him the critical importance of rapid, accurate diagnostics. After graduating from the University of Manchester with a BSc in Computer Science, Robert worked in FinTech at the London Stock Exchange Group and FlexTrade, specialising in building and testing high-stakes algorithmic trading platforms.
                    </p>
                    <p>
                      He applied the rigour of this environment to healthcare, developing a novel hybrid AI framework that combines AI-driven data extraction with a deterministic logic engine. He brought this concept to his uncle, Dr. John Burthem, and together with Dr. Luke Carter-Brzezinski, they co-developed the platform. As the sole author of the core codebase, Robert leads all technical development and fundraising efforts, driven by his personal commitment to improving the diagnostic journey for cancer patients.
                    </p>
                  </div>

                  <div className={styles.teamMemberCard}>
                    <div className={styles.teamMemberPhoto}>
                      <img src="/profile-pics/danny.png" alt="Dr. Daniel Clarke" />
                    </div>
                    <h3>Dr. Daniel Clarke</h3>
                    <h4>CTO & Co-Founder</h4>
                    <p>
                      Dr. Clarke leads the technical architecture and data science strategy for Haem.io. He holds both a Master's degree and a PhD in Physics from the University of Manchester, where his research at CERN focused on analysing complex data from large-scale international experiments.
                    </p>
                    <p>
                      Following his PhD, Dr. Clarke joined the UK Civil Service as a statistician, where he applied AI and data science to support high-stakes government decision-making. He has extensive experience in building scalable, production-ready solutions on cloud platforms to extract actionable insights from complex datasets. A long-time friend of Robert, he was a key early contributor to the development of Haem.io's LLM and data extraction strategy, bringing a first-principles approach to building secure and robust systems.
                    </p>
                  </div>

                  <div className={styles.teamMemberCard}>
                    <div className={styles.teamMemberPhoto}>
                      <img src="/profile-pics/john.png" alt="Dr. John Burthem" />
                    </div>
                    <h3>Dr. John Burthem</h3>
                    <h4>Co-CMO & Co-Founder</h4>
                    <p>
                      Dr. Burthem is a Fellow of the Royal College of Pathologists (UK) and a Fellow of the Royal College of Physicians (UK), bringing decades of clinical leadership as a senior NHS consultant at Manchester Foundation Trust (MFT). He leads the Regional Diagnostic Service for Haematological Malignancies in Manchester, one of the UK's foremost specialist centres.
                    </p>
                    <p>
                      With over 50 peer-reviewed publications, he is a nationally recognised expert in the field. Dr. Burthem has extensive experience in managing large research projects and IT-based commercial partnerships, including work with UK NEQAS, where he leads the digital Special Advisory Group. As a co-inventor of Haem.io's clinical logic, his deep domain expertise and extensive national network are foundational to the company's credibility and go-to-market strategy.
                    </p>
                  </div>

                  <div className={styles.teamMemberCard}>
                    <div className={styles.teamMemberPhoto}>
                      <img src="/profile-pics/luke.png" alt="Dr. Luke Carter-Brzezinski" />
                    </div>
                    <h3>Dr. Luke Carter-Brzezinski</h3>
                    <h4>Co-CMO & Co-Founder</h4>
                    <p>
                      Dr. Carter-Brzezinski is a Consultant Haematologist at MFT's Regional Diagnostic Service and a Fellow of the Royal College of Pathologists. His experience spans a Diagnostic Fellowship in Haematology at Manchester and clinical roles across the UK, giving him a deep, practical understanding of the day-to-day challenges of patient care and diagnostics.
                    </p>
                    <p>
                      Dr. Carter-Brzezinski provides the critical link between Haem.io's technology and the end-user clinician. His active clinical practice ensures the platform is built to solve real-world workflow problems. He has leveraged his national and international roles within the British Society of Haematology to lead the initial presentations of Haem.io to the UK's key opinion leaders, successfully establishing strong relationships with collaborators, industry partners, and funding bodies.
                    </p>
                  </div>
                </div>
              </div>

              <div className={styles.fullAccessSection}>
                <div className={styles.fullAccessCard}>
                  <h3>Need Full Data Room Access?</h3>
                  <p>Request access to additional materials including financial projections, clinical validation data, and more.</p>
                  <button 
                    onClick={() => setShowAccessRequest(true)}
                    className={styles.fullAccessButton}
                  >
                    Request Full Data Room Access
                  </button>
                </div>
              </div>

              <div className={styles.contactSection}>
                <p>Questions? Contact us at <a href="mailto:robert.lee@haem.io">robert.lee@haem.io</a></p>
              </div>
            </div>
          </div>
        )}

        {/* Full Access Request Modal */}
        {isPasswordCorrect && ndaAccepted && showAccessRequest && (
          <div className={styles.modalOverlay} onClick={() => setShowAccessRequest(false)}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
              <button 
                className={styles.modalClose}
                onClick={() => setShowAccessRequest(false)}
              >
                ×
              </button>
              
              {!requestSuccess ? (
                <>
                  <h2>Request Full Data Room Access</h2>
                  <p>Please provide your details and we'll get back to you with expanded access.</p>
                  
                  <form onSubmit={(e) => handleAccessRequest(e, 'full')} className={styles.accessRequestForm}>
                    <div className={styles.formGroup}>
                      <label htmlFor="requestNameModal">Full Name *</label>
                      <input
                        type="text"
                        id="requestNameModal"
                        value={requestName}
                        onChange={(e) => setRequestName(e.target.value)}
                        required
                        className={styles.formInput}
                        placeholder="John Smith"
                        autoFocus
                      />
                    </div>

                    <div className={styles.formGroup}>
                      <label htmlFor="requestEmailModal">Email Address *</label>
                      <input
                        type="email"
                        id="requestEmailModal"
                        value={requestEmail}
                        onChange={(e) => setRequestEmail(e.target.value)}
                        required
                        className={styles.formInput}
                        placeholder="john@example.com"
                      />
                    </div>

                    <div className={styles.formGroup}>
                      <label htmlFor="requestMessageModal">Message (Optional)</label>
                      <textarea
                        id="requestMessageModal"
                        value={requestMessage}
                        onChange={(e) => setRequestMessage(e.target.value)}
                        className={styles.formTextarea}
                        placeholder="Tell us what additional materials you're interested in..."
                        rows="4"
                      />
                    </div>

                    {requestError && (
                      <div className={styles.errorMessage}>{requestError}</div>
                    )}

                    <button 
                      type="submit" 
                      className={styles.submitButton}
                      disabled={isSubmittingRequest}
                    >
                      {isSubmittingRequest ? 'Submitting...' : 'Submit Request'}
                    </button>
                  </form>
                </>
              ) : (
                <div className={styles.successMessage}>
                  <div className={styles.successIcon}>✓</div>
                  <h3>Request Submitted!</h3>
                  <p>Thank you! We'll review your request and get back to you at {requestEmail} shortly with full access details.</p>
                  <button 
                    onClick={() => {
                      setRequestSuccess(false);
                      setShowAccessRequest(false);
                      setRequestName('');
                      setRequestEmail('');
                      setRequestMessage('');
                    }}
                    className={styles.closeButton}
                  >
                    Close
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


'use client';

import { useState, useEffect } from 'react';
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
  const VIP_PASSWORD = 'Haemio!VIP$Direct2025';  // Skips NDA

  // Restore authentication state from sessionStorage on mount
  useEffect(() => {
    const storedPasswordCorrect = sessionStorage.getItem('dataroom_password_correct');
    const storedNdaAccepted = sessionStorage.getItem('dataroom_nda_accepted');
    
    if (storedPasswordCorrect === 'true') {
      setIsPasswordCorrect(true);
    }
    if (storedNdaAccepted === 'true') {
      setNdaAccepted(true);
    }
  }, []);

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    console.log('Password entered:', passwordEntered);
    console.log('VIP password:', VIP_PASSWORD);
    console.log('Match:', passwordEntered === VIP_PASSWORD);
    
    if (passwordEntered === VIP_PASSWORD) {
      // VIP password - skip NDA entirely
      console.log('VIP password matched - skipping NDA');
      setIsPasswordCorrect(true);
      setNdaAccepted(true);
      setPasswordError('');
      // Persist both authentication states to sessionStorage
      sessionStorage.setItem('dataroom_password_correct', 'true');
      sessionStorage.setItem('dataroom_nda_accepted', 'true');
    } else if (passwordEntered === CORRECT_PASSWORD) {
      console.log('Regular password matched - showing NDA');
      setIsPasswordCorrect(true);
      setShowNda(true);
      setPasswordError('');
      // Persist password authentication to sessionStorage
      sessionStorage.setItem('dataroom_password_correct', 'true');
    } else {
      console.log('Password incorrect');
      setPasswordError('Incorrect password. Please try again.');
    }
  };

  const handleNdaAccept = () => {
    setNdaAccepted(true);
    // Persist NDA acceptance to sessionStorage
    sessionStorage.setItem('dataroom_nda_accepted', 'true');
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
              <button 
                onClick={async () => {
                  try {
                    const response = await fetch('/api/download-all-pdfs');
                    const blob = await response.blob();
                    const url = window.URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = 'Haemio-DataRoom-Documents.zip';
                    document.body.appendChild(a);
                    a.click();
                    window.URL.revokeObjectURL(url);
                    document.body.removeChild(a);
                  } catch (error) {
                    console.error('Error downloading ZIP:', error);
                  }
                }}
                className={styles.downloadAllButtonTopRight}
                title="Download all documents as ZIP"
              >
                ⬇ Download All
              </button>
              <div className={styles.pageHeader}>
                <h1 className={styles.mainTitle}>
                  <span className={styles.brandName}>Haem.io</span> Investor Data Room
                </h1>
                <p className={styles.subtitle}>Intelligent Diagnostics for Precision Haematology</p>
              </div>

              <div className={styles.teamCallout}>
                <div className={styles.teamCalloutContent}>
                  <div className={styles.teamPhotos}>
                    <img src="/profile-pics/robbie.png" alt="Team" />
                    <img src="/profile-pics/danny.png" alt="Team" />
                    <img src="/profile-pics/john.png" alt="Team" />
                    <img src="/profile-pics/luke.png" alt="Team" />
                  </div>
                  <div className={styles.teamCalloutText}>
                    <h3>Meet the Founding Team</h3>
                    <p>Expertise in AI, clinical haematology, and healthcare technology</p>
                    <a href="/data-room/team" className={styles.teamButton}>
                      View Team Profiles →
                    </a>
                  </div>
                </div>
              </div>

              <div className={styles.sectionHeader}>
                <h2>Core Materials</h2>
                <p>Essential investment documents and market validation</p>
              </div>

              <div className={styles.documentsGrid}>
                <div className={styles.documentCard}>
                  <div className={styles.documentIcon}>▭</div>
                  <h3>Investor Pitch Deck</h3>
                  <p>Complete investor presentation including market analysis, product overview, and financial projections.</p>
                  <div className={styles.documentActions}>
                    <a 
                      href="/data-room/pitch"
                      className={styles.viewButtonPrimary}
                    >
                      View Interactive Pitch
                    </a>
                    <a 
                      href="/Haem.io-pitch.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.viewButtonSecondary}
                    >
                      View PDF
                    </a>
                  </div>
                </div>

                <div className={styles.documentCard}>
                  <div className={styles.documentIcon}>◉</div>
                  <h3>Investment Summary</h3>
                  <p>One-page overview of the investment opportunity, use of funds, and key milestones.</p>
                  <a 
                    href="/investment-summary.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.viewButtonSecondary}
                  >
                    View PDF
                  </a>
                </div>

                <div className={styles.documentCard}>
                  <div className={styles.documentIcon}>£</div>
                  <h3>Use of Funds</h3>
                  <p>Detailed allocation of £750k seed investment across team, regulatory, pilots, and operations with 18-month timeline and milestone breakdown.</p>
                  <a 
                    href="/use-of-funds.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.viewButtonSecondary}
                  >
                    View PDF
                  </a>
                </div>

                <div className={styles.documentCard}>
                  <div className={styles.documentIcon}>≡</div>
                  <h3>Financial Projections & Cash Flow</h3>
                  <p>Detailed quarterly cash flow analysis, burn rate projections, revenue timeline with specific dates, and 5-year financial roadmap.</p>
                  <a 
                    href="/Haemio-Financial-Projections.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.viewButtonSecondary}
                  >
                    View PDF
                  </a>
                </div>

                <div className={styles.documentCard}>
                  <div className={styles.documentIcon}>↗</div>
                  <h3>Traction & Market Opportunity</h3>
                  <p>Detailed overview of our clinical partnerships, £7M grant LOI, NHS pilot programmes, and market validation.</p>
                  <a 
                    href="/traction-and-market-opportunity.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.viewButtonSecondary}
                  >
                    View PDF
                  </a>
                </div>

                <div className={styles.documentCard}>
                  <div className={styles.documentIcon}>✓</div>
                  <h3>Regulatory Strategy & Pathway</h3>
                  <p>Clear pathway to UKCA/CE marking as a Class IIa medical device, including MHRA engagement strategy.</p>
                  <a 
                    href="/regulatory-strategy-and-pathway.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.viewButtonSecondary}
                  >
                    View PDF
                  </a>
                </div>

                <div className={styles.documentCard}>
                  <div className={styles.documentIcon}>👥</div>
                  <h3>PPIE Strategy</h3>
                  <p>Patient and Public Involvement strategy outlining our approach to engaging patients, public, and charities in research design and delivery.</p>
                  <a 
                    href="/ppie-strategy.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.viewButtonSecondary}
                  >
                    View PDF
                  </a>
                </div>

                <div className={styles.documentCard}>
                  <div className={styles.documentIcon}>▶</div>
                  <h3>Live Platform Demo</h3>
                  <p>Interactive demonstration of our MVP platform. Try sample patient reports or use your own anonymized data to see instant AI-powered diagnosis.</p>
                  <div className={styles.documentActions}>
                    <a 
                      href="/data-room/demo"
                      className={styles.viewButtonPrimary}
                    >
                      Try Live Demo
                    </a>
                  </div>
                </div>
              </div>

              <div className={styles.sectionHeader}>
                <h2>Letters of Support & Intent</h2>
                <p>Clinical endorsements from leading NHS consultants and research networks</p>
              </div>

              <div className={styles.lettersGrid}>
                <div className={styles.letterCard}>
                  <h4>Prof. Charles Craddock</h4>
                  <p className={styles.letterAffiliation}>Chair, UK AML Research Network</p>
                  <a 
                    href="/Charles-craddock-LOI.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.letterViewButtonPrimary}
                  >
                    View Letter
                  </a>
                </div>

                <div className={styles.letterCard}>
                  <h4>Dr. John Chadwick</h4>
                  <p className={styles.letterAffiliation}>The Christie NHS Foundation Trust</p>
                  <a 
                    href="/John-chadwick-LOS-christie.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.letterViewButtonPrimary}
                  >
                    View Letter
                  </a>
                </div>

                <div className={styles.letterCard}>
                  <h4>Dr. Tom Coats</h4>
                  <p className={styles.letterAffiliation}>Royal Devon NHS Trust</p>
                  <a 
                    href="/Tom-coates-LOS-royal-devon.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.letterViewButtonPrimary}
                  >
                    View Letter
                  </a>
                </div>

                <div className={styles.letterCard}>
                  <h4>Dr. Cahalin</h4>
                  <p className={styles.letterAffiliation}>Blackpool Teaching Hospitals</p>
                  <a 
                    href="/cahalin-LOS-blackpool.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.letterViewButtonPrimary}
                  >
                    View Letter
                  </a>
                </div>
              </div>

              <div className={styles.lastUpdatedSection}>
                <p className={styles.lastUpdatedText}>
                  <strong>Last Updated:</strong> November 8, 2025
                </p>
                <p className={styles.lastUpdatedNote}>
                  This data room is regularly updated with the latest materials. Documents reflect current company status, financial projections, and clinical partnerships.
                </p>
              </div>

              <div className={styles.contactSection}>
                <p>Questions? Contact me at <a href="mailto:robert.lee@haem.io">robert.lee@haem.io</a></p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


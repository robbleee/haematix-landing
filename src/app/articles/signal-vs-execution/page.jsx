import styles from './article.module.css';
import Link from 'next/link';
import Image from 'next/image';
import ArchitectureFlowchart from '../../../components/ArchitectureFlowchart';

export const metadata = {
  title: 'The Architecture of Certainty | Haem.io',
  description: 'What Clinical AI can learn from Algorithmic Trading.',
};

export default function SignalVsExecutionPage() {
  return (
    <div className={styles.articleContainer}>
      <Link href="/articles" className={styles.backButton}>
        ← Back to Articles
      </Link>

      <div className={styles.articleContent}>
        <article className={styles.articleCard}>

          {/* Header */}
          <header className={styles.header}>
            <h1 className={styles.title}>
              The Architecture of Certainty
            </h1>
            <p className={styles.subtitle}>
              What Clinical AI can learn from Algorithmic Trading.
            </p>
            
            {/* Author & Date */}
            <div className={styles.authorSection}>
              <div className={styles.authorInfo}>
                <Image 
                  src="/profile-pics/robbie.png" 
                  alt="Robert Lee" 
                  width={40} 
                  height={40}
                  className={styles.authorPhoto}
                />
                <div className={styles.authorName}>Robert Lee</div>
              </div>
              <div className={styles.publishDate}>
                November 24, 2025
              </div>
            </div>
          </header>

          {/* Article Body */}
          <div className={styles.body}>
            <p style={{ marginBottom: '1.5rem' }}>
              In the rush to adopt Artificial Intelligence in healthcare, the industry is currently fixated on <strong>Generative AI</strong>. The promise of Large Language Models (LLMs) that can "read" patient notes and suggest diagnoses is alluring.
            </p>

            <p style={{ marginBottom: '1.5rem' }}>
              But in the high-stakes world of financial technology, we learned a hard lesson decades ago: <strong>Probability is excellent for discovery, but it is dangerous for execution.</strong>
            </p>

            <p style={{ marginBottom: '2.5rem' }}>
              In modern algorithmic trading, there is a fundamental architectural distinction between finding a signal and executing a trade. It is a distinction that Clinical AI must adopt if it hopes to move from "experimental tool" to "standard of care."
            </p>

            {/* Signal vs. Execution Section */}
            <h2>
              Signal vs. Execution
            </h2>

            <p style={{ marginBottom: '1.5rem' }}>
              In advanced financial systems, we rarely allow a Machine Learning model to execute orders blindly. ML is probabilistic—it deals in "likelihoods." It is fantastic at scanning millions of data points to find a pattern (the Signal) within the noise.
            </p>

            <p style={{ marginBottom: '1.5rem' }}>
              However, we do not let a probabilistic model control the bank account directly. If the model "hallucinates" a trend, capital is lost.
            </p>

            <p style={{ marginBottom: '1.5rem' }}>
              Instead, that Signal is passed to a <strong>Deterministic Logic Layer</strong>. This is a rigid, rule-based engine that checks the signal against strict risk parameters and compliance protocols.
            </p>

            <ul className={styles.signalExecutionList}>
              <li>
                <strong>The Signal</strong> asks: "Is there an opportunity?" <em>(Probabilistic)</em>
              </li>
              <li>
                <strong>The Execution</strong> asks: "Does this meet the rules?" <em>(Deterministic)</em>
              </li>
            </ul>

            {/* Black Box Problem Section */}
            <h2>
              The "Black Box" Problem in Medicine
            </h2>

            <p style={{ marginBottom: '1.5rem' }}>
              Currently, many diagnostic AI tools attempt to use Neural Networks for the entire process. They feed patient data in and ask the "Black Box" to predict a diagnosis.
            </p>

            <p>
              In complex fields like Haematology—where a diagnosis requires the synthesis of genetics, flow cytometry, and molecular data—this is risky. A diagnosis is not a prediction; it is a classification based on strict international criteria (such as WHO or ICC guidelines).
            </p>

            <p style={{ marginBottom: '2.5rem' }}>
              If we apply the <strong>Financial Architecture</strong> to medicine, we get a safer, more robust model:
            </p>

            {/* Architecture Flowchart */}
            <ArchitectureFlowchart />

            {/* Detailed Breakdown */}
            <div style={{ marginTop: '2rem' }}>
              <h3 style={{ fontSize: '1.35rem', fontWeight: '700', marginBottom: '1.5rem', color: '#1a202c' }}>
                How it works:
              </h3>
              <ul style={{ 
                listStyle: 'none', 
                padding: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: '1.5rem'
              }}>
                <li style={{ 
                  paddingLeft: '2rem',
                  position: 'relative',
                  lineHeight: '1.7'
                }}>
                  <span style={{ 
                    position: 'absolute', 
                    left: 0, 
                    color: 'var(--primary-color)',
                    fontWeight: '700',
                    fontSize: '1.2rem'
                  }}>→</span>
                  <strong>Ingest:</strong> AI reads messy, unstructured lab reports from disparate sources. It identifies the "Signal"—parameters like <em>NPM1</em> mutation status or <em>CD34+</em> blast percentage—but makes no clinical decisions.
                </li>
                <li style={{ 
                  paddingLeft: '2rem',
                  position: 'relative',
                  lineHeight: '1.7'
                }}>
                  <span style={{ 
                    position: 'absolute', 
                    left: 0, 
                    color: 'var(--primary-color)',
                    fontWeight: '700',
                    fontSize: '1.2rem'
                  }}>→</span>
                  <strong>Verify:</strong> Extracted data is fed into a Logic Engine. This layer does not "guess." It strictly applies the codified rules of clinical guidelines (WHO/ICC). Transparent. Auditable. A "glass box" rather than a black box.
                </li>
                <li style={{ 
                  paddingLeft: '2rem',
                  position: 'relative',
                  lineHeight: '1.7'
                }}>
                  <span style={{ 
                    position: 'absolute', 
                    left: 0, 
                    color: 'var(--primary-color)',
                    fontWeight: '700',
                    fontSize: '1.2rem'
                  }}>→</span>
                  <strong>Audit:</strong> Just as a trader oversees an algorithm, the Clinician remains the final arbiter. The system presents the derived logic and prompts the human only for missing context (e.g., clinical history).
                </li>
              </ul>
            </div>

            {/* Certainty Section */}
            <h2>
              Certainty is the Product
            </h2>

            <p style={{ marginBottom: '1.5rem' }}>
              In both finance and medicine, an audit trail is a legal requirement. But in medicine, the stakes are not capital—they are lives.
            </p>

            <p style={{ marginBottom: '1.5rem' }}>
              By separating <strong>Signal</strong> (AI) from <strong>Execution</strong> (Logic), we can build diagnostic systems that harness the speed of automation without sacrificing the safety of strict adherence to medical guidelines.
            </p>

            <p style={{ marginBottom: '2.5rem', fontWeight: '600', fontSize: '1.15rem' }}>
              We are building this architecture at <span className="text-gradient">Haem.io</span>.
            </p>
          </div>

        </article>
      </div>
    </div>
  );
}


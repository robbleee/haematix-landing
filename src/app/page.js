import Image from "next/image";
import Link from "next/link";
import FlowDiagram from "../components/FlowDiagram";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* Header */}
      <header className="bg-primary text-white">
        <div className="container mx-auto py-6 px-6 sm:px-8 flex justify-between items-center">
          <div className="flex items-center gap-3">
        <Image
              src="/hemlogo.svg" 
              alt="Hematological Classification Platform Logo" 
              width={40} 
              height={40} 
          priority
            />
            <h1 className="text-2xl font-bold tracking-tight">HemClassify</h1>
          </div>
          <nav>
            <ul className="flex gap-6">
              <li><a href="#overview" className="hover:underline">Overview</a></li>
              <li><a href="#features" className="hover:underline">Features</a></li>
              <li><a href="#workflow" className="hover:underline">Workflow</a></li>
              <li><a href="#benefits" className="hover:underline">Benefits</a></li>
              <li><a href="#roadmap" className="hover:underline">Roadmap</a></li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-secondary-bg to-white py-16 sm:py-24 relative">
        <div className="absolute inset-0 opacity-10">
          <Image
            src="/blood-pattern.svg"
            alt="Cell pattern background"
            fill
            style={{ objectFit: 'cover' }}
          />
        </div>
        <div className="container mx-auto px-6 sm:px-8 relative z-10">
          {/* Hero content - centered */}
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-heading mb-6">
              Advanced Hematological Diagnostic Platform
            </h2>
            <h3 className="text-xl sm:text-2xl text-gray-700 mb-8">
              Precision Classification for AML, MDS, and Future CHIP Integration
            </h3>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="#contact" 
                className="bg-primary hover:bg-primary-dark text-white py-3 px-6 rounded-md font-medium transition-colors text-center"
              >
                Request Demo
        </a>
        <a
                href="#overview" 
                className="bg-white hover:bg-gray-100 text-primary border border-primary py-3 px-6 rounded-md font-medium transition-colors text-center"
              >
                Learn More
              </a>
            </div>
          </div>
          
          {/* Flow diagram - below hero content */}
          <div className="w-full mt-8">
            <FlowDiagram />
          </div>
        </div>
      </section>
      
      {/* Overview Section */}
      <section id="overview" className="py-16 bg-white">
        <div className="container mx-auto px-6 sm:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-heading">What We Do</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 border border-gray-200">
              <div className="w-12 h-12 bg-secondary-bg rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="var(--primary)" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-heading">Unified Classification System</h3>
              <p className="text-gray-600 mb-4">
                Integrate WHO 2022 and ICC 2022 guidelines into a unified, hierarchical classification system for hematological disorders.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 border border-gray-200">
              <div className="w-12 h-12 bg-secondary-bg rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="var(--primary)" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714a2.25 2.25 0 0 1-.659 1.591L9.5 14.5m0-9.248v-.055a6.375 6.375 0 0 1-2.992-1.643L6.5 3.75m0 0-2 2m6-2-2 2m2-2v.055m0 0a6.375 6.375 0 0 0 2.992-1.643L13.5 3.75m0 0 2 2m-6-2 2 2" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-heading">AI-Driven Data Extraction</h3>
              <p className="text-gray-600 mb-4">
                Employ AI-driven Natural Language Processing (NLP) to extract clinical data efficiently and accurately from patient records and lab reports.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 border border-gray-200">
              <div className="w-12 h-12 bg-secondary-bg rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="var(--primary)" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5m.75-9 3-3 2.148 2.148A12.061 12.061 0 0 1 16.5 7.605" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-heading">Actionable Classifications</h3>
              <p className="text-gray-600 mb-4">
                Offer clear and actionable classifications for Acute Myeloid Leukemia (AML), Myelodysplastic Syndrome (MDS), and upcoming Clonal Hematopoiesis of Indeterminate Potential (CHIP).
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Key Features Section */}
      <section id="features" className="py-16 bg-secondary-bg">
        <div className="container mx-auto px-6 sm:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-heading">Key Features</h2>
          
          {/* Feature 1: Dual Pathway Logic */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold mb-6 text-heading text-center">Dual Pathway Logic</h3>
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <FlowDiagram />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
                <div className="flex items-start gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="var(--primary)" className="w-5 h-5 mt-0.5 flex-shrink-0">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                  </svg>
                  <span>WHO 2022 and ICC 2022 parallel classification</span>
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
                <div className="flex items-start gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="var(--primary)" className="w-5 h-5 mt-0.5 flex-shrink-0">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                  </svg>
                  <span>Step-by-step, prioritized logic ensuring accurate and stable diagnoses</span>
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
                <div className="flex items-start gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="var(--primary)" className="w-5 h-5 mt-0.5 flex-shrink-0">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                  </svg>
                  <span>Hierarchical resolution of classification conflicts</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Feature 2: AI-Enhanced Data Extraction */}
          <div className="mb-16 flex flex-col md:flex-row-reverse items-center gap-8">
            <div className="md:w-1/2">
              <h3 className="text-2xl font-bold mb-4 text-heading">AI-Enhanced Data Extraction</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="var(--primary)" className="w-5 h-5 mt-0.5 flex-shrink-0">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                  </svg>
                  <span>Automated clinical data parsing with NLP for precision and efficiency</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="var(--primary)" className="w-5 h-5 mt-0.5 flex-shrink-0">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                  </svg>
                  <span>Extraction of cytogenetic, morphological, and molecular data points</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="var(--primary)" className="w-5 h-5 mt-0.5 flex-shrink-0">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                  </svg>
                  <span>Continuous learning system improves extraction accuracy over time</span>
                </li>
              </ul>
            </div>
            <div className="md:w-1/2 bg-white p-6 rounded-lg shadow-md">
              <div className="font-mono text-sm p-4 bg-gray-100 rounded mb-4 text-gray-800">
                <div className="text-primary font-bold mb-2"># NLP Data Extraction Example</div>
                <div>Patient: <span className="text-primary">JD123456</span></div>
                <div>Report Type: <span className="text-primary">Bone Marrow Biopsy</span></div>
                <div className="mt-2">Extracted Data:</div>
                <div>- Blasts: <span className="text-primary">22%</span></div>
                <div>- Cytogenetics: <span className="text-primary">t(8;21)</span></div>
                <div>- Mutations: <span className="text-primary">RUNX1-RUNX1T1, ASXL1</span></div>
              </div>
              <div className="flex justify-center">
                <div className="w-full max-w-xs bg-primary text-white rounded-md py-2 text-center">
                  Classification: AML with t(8;21)
                </div>
              </div>
            </div>
          </div>
          
          {/* Feature 3: Risk Stratification Integration */}
          <div className="mb-16 flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2">
              <h3 className="text-2xl font-bold mb-4 text-heading">Risk Stratification Integration</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="var(--primary)" className="w-5 h-5 mt-0.5 flex-shrink-0">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                  </svg>
                  <span>Generate actionable risk scores using recognized standards (IPSS, ELN)</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="var(--primary)" className="w-5 h-5 mt-0.5 flex-shrink-0">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                  </svg>
                  <span>Automated calculation of survival probabilities and treatment implications</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="var(--primary)" className="w-5 h-5 mt-0.5 flex-shrink-0">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                  </svg>
                  <span>Visualization of risk factors and their contribution to overall risk</span>
                </li>
              </ul>
            </div>
            <div className="md:w-1/2">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="mb-4">
                  <div className="font-semibold mb-1">ELN 2022 Risk Classification: <span className="text-primary">Adverse</span></div>
                  <div className="h-4 w-full bg-gray-200 rounded-full">
                    <div className="h-4 bg-red-500 rounded-full" style={{ width: '75%' }}></div>
                  </div>
                </div>
                <div className="mb-4">
                  <div className="font-semibold mb-1">2-Year Survival Probability: <span className="text-primary">35%</span></div>
                  <div className="h-4 w-full bg-gray-200 rounded-full">
                    <div className="h-4 bg-primary rounded-full" style={{ width: '35%' }}></div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="p-3 border border-gray-200 rounded text-center">
                    <div className="font-semibold">Risk Factors</div>
                    <div className="text-sm text-gray-600">Complex Karyotype</div>
                    <div className="text-sm text-gray-600">TP53 Mutation</div>
                  </div>
                  <div className="p-3 border border-gray-200 rounded text-center">
                    <div className="font-semibold">Clinical Implications</div>
                    <div className="text-sm text-gray-600">Consider clinical trials</div>
                    <div className="text-sm text-gray-600">Early HCT evaluation</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Feature 4: Future-Ready Framework */}
          <div className="flex flex-col md:flex-row-reverse items-center gap-8">
            <div className="md:w-1/2">
              <h3 className="text-2xl font-bold mb-4 text-heading">Future-Ready Framework</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="var(--primary)" className="w-5 h-5 mt-0.5 flex-shrink-0">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                  </svg>
                  <span>Modular architecture designed to integrate new clinical criteria seamlessly</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="var(--primary)" className="w-5 h-5 mt-0.5 flex-shrink-0">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                  </svg>
                  <span>Upcoming integration of CHIP classification and risk stratification</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="var(--primary)" className="w-5 h-5 mt-0.5 flex-shrink-0">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                  </svg>
                  <span>Regular updates to incorporate evolving guideline changes</span>
                </li>
              </ul>
            </div>
            <div className="md:w-1/2">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="text-center mb-4">
                  <h4 className="font-semibold text-lg mb-2">Platform Roadmap</h4>
                  <p className="text-sm text-gray-600">Expanding classification capabilities</p>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="w-1/4 text-right pr-4 font-medium">2023</div>
                    <div className="w-3/4 pl-4 py-2 bg-primary text-white rounded-md">
                      AML + MDS Classification
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-1/4 text-right pr-4 font-medium">2024</div>
                    <div className="w-3/4 pl-4 py-2 bg-primary bg-opacity-70 text-white rounded-md">
                      CHIP Integration
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-1/4 text-right pr-4 font-medium">2025</div>
                    <div className="w-3/4 pl-4 py-2 bg-gray-300 text-gray-600 rounded-md">
                      MPN Expansion
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-1/4 text-right pr-4 font-medium">2026+</div>
                    <div className="w-3/4 pl-4 py-2 bg-gray-300 text-gray-600 rounded-md">
                      Full Myeloid Spectrum
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section id="tools" className="py-16 bg-white">
        <div className="container mx-auto px-6 sm:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Our Diagnostic Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Tool 1 */}
            <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 border border-gray-200">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#ef4444" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">CBC Interpreter</h3>
              <p className="text-gray-600 mb-4">
                Comprehensive analysis of Complete Blood Count reports with automated detection of abnormalities.
              </p>
              <a href="#" className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center">
                Launch Tool 
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 ml-1">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </a>
            </div>

            {/* Tool 2 */}
            <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 border border-gray-200">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#3b82f6" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0 0 20.25 18V6A2.25 2.25 0 0 0 18 3.75H6A2.25 2.25 0 0 0 3.75 6v12A2.25 2.25 0 0 0 6 20.25Z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Anemia Classifier</h3>
              <p className="text-gray-600 mb-4">
                Differential diagnosis tool for various anemia types based on red cell indices and peripheral smear findings.
              </p>
              <a href="#" className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center">
                Launch Tool 
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 ml-1">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </a>
            </div>

            {/* Tool 3 */}
            <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 border border-gray-200">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#8b5cf6" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714a2.25 2.25 0 0 1-.659 1.591L9.5 14.5m0-9.248v-.055a6.375 6.375 0 0 1-2.992-1.643L6.5 3.75m0 0-2 2m6-2-2 2m2-2v.055m0 0a6.375 6.375 0 0 0 2.992-1.643L13.5 3.75m0 0 2 2m-6-2 2 2" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Coagulation Analyzer</h3>
              <p className="text-gray-600 mb-4">
                Analysis and interpretation of coagulation tests with recommendations for further investigation.
              </p>
              <a href="#" className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center">
                Launch Tool 
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 ml-1">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 bg-gray-50">
        <div className="container mx-auto px-6 sm:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">About Our Platform</h2>
            <p className="text-lg text-gray-700 mb-8">
              HemDiagnose is a suite of evidence-based diagnostic support tools designed by hematologists for healthcare professionals. Our tools leverage clinical algorithms and the latest research to help clinicians make more accurate diagnoses and treatment decisions.
            </p>
            <p className="text-lg text-gray-700">
              All recommendations provided by our tools are supported by current clinical practice guidelines and peer-reviewed literature. These tools are meant to supplement, not replace, clinical judgment.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-gray-50">
        <div className="container mx-auto px-6 sm:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Get In Touch</h2>
          <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow">
            <form>
              <div className="mb-6">
                <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Name</label>
                <input 
                  type="text" 
                  id="name" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Your name"
                />
              </div>
              <div className="mb-6">
                <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="you@example.com"
                />
              </div>
              <div className="mb-6">
                <label htmlFor="message" className="block text-gray-700 font-medium mb-2">Message</label>
                <textarea 
                  id="message" 
                  rows="4" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="How can we help you?"
                ></textarea>
              </div>
              <button 
                type="submit" 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md font-medium transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Workflow Visualization Section */}
      <section id="workflow" className="py-16 bg-white">
        <div className="container mx-auto px-6 sm:px-8">
          <h2 className="text-3xl font-bold text-center mb-6 text-heading">Workflow Visualization</h2>
          <p className="text-lg text-center text-gray-600 max-w-3xl mx-auto mb-12">
            Our integrated workflow ensures accurate and consistent classifications while maximizing efficiency
          </p>
          
          {/* Full-width Flowchart Image */}
          <div className="w-full mb-10">
          <Image
              src="/Flowchart.png" 
              alt="Hematological Classification Workflow" 
              width={1920} 
              height={600}
              className="w-full rounded-lg shadow-md"
              priority
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mt-12">
            <div className="bg-white p-5 rounded-lg shadow-md border border-gray-200 text-center">
              <div className="w-10 h-10 bg-primary bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-primary font-bold">1</span>
              </div>
              <h3 className="font-semibold mb-2">Clinical Data Ingestion</h3>
              <p className="text-sm text-gray-600">Structured and unstructured clinical data input</p>
            </div>
            
            <div className="bg-white p-5 rounded-lg shadow-md border border-gray-200 text-center">
              <div className="w-10 h-10 bg-primary bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-primary font-bold">2</span>
              </div>
              <h3 className="font-semibold mb-2">NLP Data Extraction</h3>
              <p className="text-sm text-gray-600">AI-powered extraction of relevant diagnostic criteria</p>
            </div>
            
            <div className="bg-white p-5 rounded-lg shadow-md border border-gray-200 text-center">
              <div className="w-10 h-10 bg-primary bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-primary font-bold">3</span>
              </div>
              <h3 className="font-semibold mb-2">Classification Pathways</h3>
              <p className="text-sm text-gray-600">Parallel WHO and ICC classification processing</p>
            </div>
            
            <div className="bg-white p-5 rounded-lg shadow-md border border-gray-200 text-center">
              <div className="w-10 h-10 bg-primary bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-primary font-bold">4</span>
              </div>
              <h3 className="font-semibold mb-2">Risk Stratification</h3>
              <p className="text-sm text-gray-600">Automated calculation of prognostic indices</p>
            </div>
            
            <div className="bg-white p-5 rounded-lg shadow-md border border-gray-200 text-center">
              <div className="w-10 h-10 bg-primary bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-primary font-bold">5</span>
              </div>
              <h3 className="font-semibold mb-2">Clinical Output</h3>
              <p className="text-sm text-gray-600">Clear diagnostic report with actionable insights</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Benefits Section */}
      <section id="benefits" className="py-16 bg-secondary-bg">
        <div className="container mx-auto px-6 sm:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-heading">Benefits</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="w-14 h-14 bg-primary bg-opacity-10 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="var(--primary)" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-heading">Accuracy</h3>
              <p className="text-gray-600 mb-4">
                Clinically validated logic aligned with WHO and ICC standards for consistent, precise classifications.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="var(--primary)" className="w-5 h-5 mt-0.5 flex-shrink-0">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                  </svg>
                  <span className="text-gray-600">Reduces human error and interpretation variability</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="var(--primary)" className="w-5 h-5 mt-0.5 flex-shrink-0">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                  </svg>
                  <span className="text-gray-600">Maintains classification consistency across institutions</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="w-14 h-14 bg-primary bg-opacity-10 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="var(--primary)" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-heading">Efficiency</h3>
              <p className="text-gray-600 mb-4">
                AI-driven automation to save time and reduce manual errors in the diagnostic process.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="var(--primary)" className="w-5 h-5 mt-0.5 flex-shrink-0">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                  </svg>
                  <span className="text-gray-600">Reduces classification time from hours to minutes</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="var(--primary)" className="w-5 h-5 mt-0.5 flex-shrink-0">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                  </svg>
                  <span className="text-gray-600">Streamlines data collection and analysis process</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="w-14 h-14 bg-primary bg-opacity-10 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="var(--primary)" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-heading">Scalability</h3>
              <p className="text-gray-600 mb-4">
                Modular, adaptable system easily updated with emerging clinical guidelines.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="var(--primary)" className="w-5 h-5 mt-0.5 flex-shrink-0">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                  </svg>
                  <span className="text-gray-600">Extensible to new disease entities and classifications</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="var(--primary)" className="w-5 h-5 mt-0.5 flex-shrink-0">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                  </svg>
                  <span className="text-gray-600">Adapts to institutional classification preferences</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Roadmap Section */}
      <section id="roadmap" className="py-16 bg-white">
        <div className="container mx-auto px-6 sm:px-8">
          <h2 className="text-3xl font-bold text-center mb-6 text-heading">Next Steps & Roadmap</h2>
          <p className="text-lg text-center text-gray-600 max-w-3xl mx-auto mb-12">
            Our development trajectory focuses on expanding classification coverage while enhancing integration capabilities
          </p>
          
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute h-full w-1 bg-primary bg-opacity-20 left-1/2 transform -translate-x-1/2"></div>
              
              {/* Current milestone */}
              <div className="relative mb-12">
                <div className="flex items-center justify-center mb-4">
                  <div className="z-10 w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                    Now
                  </div>
                </div>
                <div className="bg-primary text-white p-6 rounded-lg max-w-xl mx-auto">
                  <h3 className="font-bold text-xl mb-2">AML & MDS Classification</h3>
                  <ul className="space-y-1 text-sm">
                    <li className="flex items-start gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-5 h-5 mt-0.5 flex-shrink-0">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                      </svg>
                      <span>Complete WHO 2022 and ICC 2022 integration</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-5 h-5 mt-0.5 flex-shrink-0">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                      </svg>
                      <span>Initial NLP extraction capability</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-5 h-5 mt-0.5 flex-shrink-0">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                      </svg>
                      <span>ELN and IPSS risk stratification</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              {/* Q3-Q4 2024 milestone */}
              <div className="relative mb-12">
                <div className="flex items-center justify-center mb-4">
                  <div className="z-10 w-12 h-12 bg-secondary-bg border-2 border-primary text-primary rounded-full flex items-center justify-center font-bold">
                    Q4 24
                  </div>
                </div>
                <div className="bg-white border border-primary p-6 rounded-lg max-w-xl mx-auto">
                  <h3 className="font-bold text-xl mb-2 text-primary">CHIP Classification Integration</h3>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li className="flex items-start gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="var(--primary)" className="w-5 h-5 mt-0.5 flex-shrink-0">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                      </svg>
                      <span>Development and validation of CHIP classification logic</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="var(--primary)" className="w-5 h-5 mt-0.5 flex-shrink-0">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                      </svg>
                      <span>Enhanced NLP capabilities for variant detection</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="var(--primary)" className="w-5 h-5 mt-0.5 flex-shrink-0">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                      </svg>
                      <span>CHIP-specific risk stratification models</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              {/* 2025 milestone */}
              <div className="relative">
                <div className="flex items-center justify-center mb-4">
                  <div className="z-10 w-12 h-12 bg-gray-200 text-gray-600 rounded-full flex items-center justify-center font-bold">
                    2025
                  </div>
                </div>
                <div className="bg-white border border-gray-300 p-6 rounded-lg max-w-xl mx-auto text-gray-500">
                  <h3 className="font-bold text-xl mb-2">Python Integration & API Development</h3>
                  <ul className="space-y-1 text-sm">
                    <li className="flex items-start gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mt-0.5 flex-shrink-0">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                      </svg>
                      <span>Python package for seamless clinical integration</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mt-0.5 flex-shrink-0">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                      </svg>
                      <span>RESTful API for EHR system connectivity</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mt-0.5 flex-shrink-0">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                      </svg>
                      <span>Expanded coverage for full myeloid spectrum</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to Action Section */}
      <section id="contact" className="py-16 bg-secondary-bg">
        <div className="container mx-auto px-6 sm:px-8">
          <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md border border-gray-200">
            <div className="flex flex-col md:flex-row gap-12">
              <div className="md:w-1/2">
                <h2 className="text-3xl font-bold mb-6 text-heading">Ready to Get Started?</h2>
                <p className="text-gray-600 mb-6">
                  Experience how our classification platform can transform diagnostic accuracy and efficiency in your practice.
                </p>
                <div className="space-y-4">
                  <a 
                    href="#" 
                    className="block bg-primary hover:bg-primary-dark text-white py-3 px-6 rounded-md font-medium transition-colors text-center"
                  >
                    Schedule a Demonstration
        </a>
        <a
                    href="#" 
                    className="block bg-white hover:bg-gray-100 text-primary border border-primary py-3 px-6 rounded-md font-medium transition-colors text-center"
                  >
                    Download Methodology Whitepaper
                  </a>
                </div>
              </div>
              <div className="md:w-1/2">
                <h3 className="text-xl font-semibold mb-4 text-heading">Contact Us</h3>
                <form>
                  <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Name</label>
                    <input 
                      type="text" 
                      id="name" 
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Your name"
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email</label>
                    <input 
                      type="email" 
                      id="email" 
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="you@example.com"
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="organization" className="block text-gray-700 font-medium mb-2">Organization</label>
                    <input 
                      type="text" 
                      id="organization" 
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Your institution or company"
                    />
                  </div>
                  <div className="mb-6">
                    <label htmlFor="message" className="block text-gray-700 font-medium mb-2">Message</label>
                    <textarea 
                      id="message" 
                      rows="3" 
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Tell us about your specific needs"
                    ></textarea>
                  </div>
                  <button 
                    type="submit" 
                    className="w-full bg-primary hover:bg-primary-dark text-white py-2 px-4 rounded-md font-medium transition-colors"
                  >
                    Submit Inquiry
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-6 sm:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Image
                  src="/hemlogo.svg" 
                  alt="HemClassify Logo" 
                  width={24} 
                  height={24} 
                  className="invert"
                />
                HemClassify
              </h3>
              <p className="text-gray-300 mb-4">
                Advanced hematological classification platform integrating WHO 2022 and ICC 2022 guidelines.
              </p>
              <div className="flex gap-4">
                <a href="#" className="text-gray-300 hover:text-white">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0 0 22 5.92a8.19 8.19 0 0 1-2.357.646 4.118 4.118 0 0 0 1.804-2.27 8.224 8.224 0 0 1-2.605.996 4.107 4.107 0 0 0-6.993 3.743 11.65 11.65 0 0 1-8.457-4.287 4.106 4.106 0 0 0 1.27 5.477A4.072 4.072 0 0 1 2.8 9.713v.052a4.105 4.105 0 0 0 3.292 4.022 4.095 4.095 0 0 1-1.853.07 4.108 4.108 0 0 0 3.834 2.85A8.233 8.233 0 0 1 2 18.407a11.616 11.616 0 0 0 6.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-gray-300 hover:text-white">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-white">Home</a></li>
                <li><a href="#overview" className="text-gray-300 hover:text-white">Overview</a></li>
                <li><a href="#features" className="text-gray-300 hover:text-white">Features</a></li>
                <li><a href="#workflow" className="text-gray-300 hover:text-white">Workflow</a></li>
                <li><a href="#benefits" className="text-gray-300 hover:text-white">Benefits</a></li>
                <li><a href="#roadmap" className="text-gray-300 hover:text-white">Roadmap</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mt-0.5 flex-shrink-0">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 0-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                  </svg>
                  <span>info@hemclassify.com</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mt-0.5 flex-shrink-0">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                  </svg>
                  <span>+1 (555) 123-4567</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mt-0.5 flex-shrink-0">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                  </svg>
                  <span>123 Innovation Drive<br />Suite 456<br />Boston, MA 02115</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-12 pt-6 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} HemClassify. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

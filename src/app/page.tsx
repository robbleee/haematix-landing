'use client';

import { ArrowRight, Shield, Zap, Users, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import BetaSignupModal from '@/components/BetaSignupModal';

export default function Home() {
  const [isBetaModalOpen, setIsBetaModalOpen] = useState(false);
  
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Header */}
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md border-b border-gray-100 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gradient">Haem.io</h1>
            </div>
            <div className="flex items-center">
              <button 
                onClick={() => setIsBetaModalOpen(true)}
                className="bg-teal-600 text-white px-6 py-2 rounded-full hover:bg-teal-700 transition-colors"
              >
                Join Beta
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-24 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="fade-in-up">
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Blood Cancer
                <span className="text-gradient block">Classification</span>
                & Risk Assessment
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                <span className="inline-block bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium mb-4">Currently in Beta Testing</span>
                <br />
                AI-powered platform for accurate AML and MDS diagnosis using WHO 2022 and ICC 2022 criteria. 
                Provides risk stratification, treatment guidance, and clinical trial matching for haematologists.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => setIsBetaModalOpen(true)}
                  className="bg-teal-600 text-white px-8 py-4 rounded-full hover:bg-teal-700 transition-all transform hover:scale-105 flex items-center justify-center gap-2 font-semibold"
                >
                  Join Beta Testing
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="relative fade-in-up">
              <div className="bg-gradient-to-br from-teal-100 to-teal-50 rounded-2xl p-8 shadow-2xl">
                <div className="bg-white rounded-xl p-6 mb-4">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium text-gray-600">Analysis Complete</span>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">AML Classification</span>
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">ELN 2022 Risk Score</span>
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Treatment Guidance</span>
                      <span className="text-orange-600 font-semibold">Beta Testing</span>
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-gray-600 text-sm">WHO 2022 & ICC 2022 Compliant • Beta Version</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why <span className="text-gradient">Haem.io</span> for Blood Cancer Care?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Streamline AML and MDS diagnosis with automated classification, risk assessment, 
              and evidence-based treatment recommendations for better patient outcomes.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center mb-6">
                <Zap className="w-6 h-6 text-teal-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Automated Classification</h3>
              <p className="text-gray-600 leading-relaxed">
                Process complex pathology reports, genetics, and flow cytometry data to provide 
                accurate AML and MDS classification in minutes, not hours.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center mb-6">
                <Shield className="w-6 h-6 text-teal-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Risk Stratification</h3>
              <p className="text-gray-600 leading-relaxed">
                ELN 2022 risk assessment for AML and IPSS-M/IPSS-R scoring for MDS, 
                with specialized TP53 risk evaluation and survival predictions.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center mb-6">
                <Users className="w-6 h-6 text-teal-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Treatment Guidance</h3>
              <p className="text-gray-600 leading-relaxed">
                Evidence-based treatment recommendations, clinical trial matching, 
                and MRD monitoring guidance tailored to patient genetics and risk factors.
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* CTA Section */}
      <section className="py-24 bg-gray-900">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Blood Cancer Care?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join haematologists and haematopathologists testing our AI-powered AML and MDS classification platform. 
            Help us refine the future of blood cancer diagnosis.
          </p>
          <button 
            onClick={() => setIsBetaModalOpen(true)}
            className="bg-teal-600 text-white px-10 py-4 rounded-full hover:bg-teal-700 transition-all transform hover:scale-105 text-lg font-semibold"
          >
            Apply for Beta Access
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gradient mb-4">Haem.io</h3>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              AI-powered blood cancer classification for AML and MDS. WHO 2022 and ICC 2022 compliant. Currently in beta testing.
            </p>
            <div className="border-t border-gray-200 pt-8">
              <p className="text-gray-500">&copy; 2024 Haem.io. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>

      <BetaSignupModal 
        isOpen={isBetaModalOpen} 
        onClose={() => setIsBetaModalOpen(false)} 
      />
    </div>
  );
}

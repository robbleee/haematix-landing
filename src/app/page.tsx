import { ArrowRight, Shield, Zap, Users, CheckCircle, Star } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Header */}
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md border-b border-gray-100 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gradient">Haem.io</h1>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-teal-600 transition-colors">Features</a>
              <a href="#about" className="text-gray-600 hover:text-teal-600 transition-colors">About</a>
              <a href="#contact" className="text-gray-600 hover:text-teal-600 transition-colors">Contact</a>
              <button className="bg-teal-600 text-white px-6 py-2 rounded-full hover:bg-teal-700 transition-colors">
                Join Beta
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="fade-in-up">
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Advanced
                <span className="text-gradient block">Haematology</span>
                Diagnostics
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                <span className="inline-block bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium mb-4">Currently in Beta Testing</span>
                <br />
                AI-powered diagnostic system for precise classification of haematologic disorders 
                according to WHO 2022 and ICC 2022 guidelines, enabling more accurate treatment decisions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-teal-600 text-white px-8 py-4 rounded-full hover:bg-teal-700 transition-all transform hover:scale-105 flex items-center justify-center gap-2 font-semibold">
                  Join Beta Testing
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button className="border-2 border-teal-600 text-teal-600 px-8 py-4 rounded-full hover:bg-teal-50 transition-colors font-semibold">
                  Learn More
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
                      <span className="text-gray-700">WHO 2022 Classification</span>
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">ICC 2022 Guidelines</span>
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Status</span>
                      <span className="text-orange-600 font-semibold">Beta Testing</span>
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-gray-600 text-sm">Powered by Advanced AI • Beta Version</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose <span className="text-gradient">Haem.io</span>?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our cutting-edge platform combines the latest medical guidelines with AI technology 
              to deliver unparalleled diagnostic accuracy.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center mb-6">
                <Zap className="w-6 h-6 text-teal-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Lightning Fast</h3>
              <p className="text-gray-600 leading-relaxed">
                Our AI-powered system is designed to process complex haematological data rapidly. 
                Currently in beta testing to optimize speed and accuracy.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center mb-6">
                <Shield className="w-6 h-6 text-teal-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Clinically Validated</h3>
              <p className="text-gray-600 leading-relaxed">
                Built on WHO 2022 and ICC 2022 guidelines, ensuring your diagnoses meet 
                the highest international standards.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center mb-6">
                <Users className="w-6 h-6 text-teal-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Expert Approved</h3>
              <p className="text-gray-600 leading-relaxed">
                Developed in collaboration with leading haematologists and validated 
                by medical experts worldwide.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-teal-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-12 text-center text-white">
            <div>
              <div className="text-4xl font-bold mb-2">Beta</div>
              <div className="text-teal-100">Testing Phase</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">50+</div>
              <div className="text-teal-100">Medical Centers</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">24/7</div>
              <div className="text-teal-100">Development</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Join Our Beta Testing Program?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Help us shape the future of haematological diagnostics. Join leading medical institutions in our beta testing program.
          </p>
          <button className="bg-teal-600 text-white px-10 py-4 rounded-full hover:bg-teal-700 transition-all transform hover:scale-105 text-lg font-semibold">
            Apply for Beta Access
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold text-gradient mb-4">Haem.io</h3>
              <p className="text-gray-600">
                Advanced haematology diagnostics powered by AI and validated by medical experts.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Product</h4>
              <ul className="space-y-2 text-gray-600">
                <li><a href="#" className="hover:text-teal-600 transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-teal-600 transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-teal-600 transition-colors">Documentation</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Company</h4>
              <ul className="space-y-2 text-gray-600">
                <li><a href="#" className="hover:text-teal-600 transition-colors">About</a></li>
                <li><a href="#" className="hover:text-teal-600 transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-teal-600 transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Support</h4>
              <ul className="space-y-2 text-gray-600">
                <li><a href="#" className="hover:text-teal-600 transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-teal-600 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-teal-600 transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-200 mt-8 pt-8 text-center text-gray-600">
            <p>&copy; 2024 Haem.io. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

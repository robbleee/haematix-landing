'use client';

import { useState } from 'react';
import { X } from 'lucide-react';

interface BetaSignupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BetaSignupModal({ isOpen, onClose }: BetaSignupModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    institution: '',
    role: '',
    experience: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/beta-signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          institution: '',
          role: '',
          experience: '',
          message: ''
        });
        // Close modal after 2 seconds
        setTimeout(() => {
          onClose();
          setSubmitStatus('idle');
        }, 2000);
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center rounded-t-2xl">
          <h2 className="text-2xl font-bold text-gray-900">Join Beta Testing</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {submitStatus === 'success' && (
            <div className="mb-6 p-4 bg-green-100 border border-green-300 rounded-lg">
              <p className="text-green-800 font-medium">✅ Application submitted successfully!</p>
              <p className="text-green-700 text-sm mt-1">We&apos;ll review your application and get back to you soon.</p>
            </div>
          )}

          {submitStatus === 'error' && (
            <div className="mb-6 p-4 bg-red-100 border border-red-300 rounded-lg">
              <p className="text-red-800 font-medium">❌ Error submitting application</p>
              <p className="text-red-700 text-sm mt-1">Please try again or contact support.</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="Dr. John Smith"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="john.smith@hospital.nhs.uk"
                />
              </div>
            </div>

            <div>
              <label htmlFor="institution" className="block text-sm font-medium text-gray-700 mb-2">
                Institution/Hospital *
              </label>
              <input
                type="text"
                id="institution"
                name="institution"
                required
                value={formData.institution}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                placeholder="NHS Foundation Trust / University Hospital"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">
                  Professional Role *
                </label>
                <select
                  id="role"
                  name="role"
                  required
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                >
                  <option value="">Select your role</option>
                  <option value="Consultant Haematologist">Consultant Haematologist</option>
                  <option value="Haematopathologist">Haematopathologist</option>
                  <option value="SpR/Registrar">SpR/Registrar</option>
                  <option value="Biomedical Scientist">Biomedical Scientist</option>
                  <option value="Laboratory Manager">Laboratory Manager</option>
                  <option value="Clinical Fellow">Clinical Fellow</option>
                  <option value="Research Fellow">Research Fellow</option>
                  <option value="Other Clinical Role">Other Clinical Role</option>
                </select>
              </div>

              <div>
                <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-2">
                  Experience with AML/MDS
                </label>
                <select
                  id="experience"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                >
                  <option value="">Select experience level</option>
                  <option value="<1 year">Less than 1 year</option>
                  <option value="1-3 years">1-3 years</option>
                  <option value="3-5 years">3-5 years</option>
                  <option value="5-10 years">5-10 years</option>
                  <option value="10+ years">10+ years</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                Additional Information (Optional)
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                placeholder="Tell us about your interest in Haem.io, specific use cases, or any questions..."
              />
            </div>

            <div className="bg-teal-50 p-4 rounded-lg">
              <p className="text-sm text-teal-800">
                <strong>What happens next?</strong> We&apos;ll review your application and send you beta access details within 48 hours. 
                The beta version includes AML/MDS classification, risk assessment, and treatment guidance features.
              </p>
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-full hover:bg-gray-50 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 px-6 py-3 bg-teal-600 text-white rounded-full hover:bg-teal-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Submitting...' : 'Apply for Beta Access'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
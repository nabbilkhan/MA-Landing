'use client';

import { useState } from 'react';

export default function PrivacyRequestPage() {
  const [formData, setFormData] = useState({
    requestType: '',
    fullName: '',
    email: '',
    phone: '',
    description: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // In production, this would send to an API endpoint that logs the request
      // and sends an email to privacy@mentoragile.com
      console.log('Privacy request submitted:', formData);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // For now, we'll just show success message
      // TODO: Implement actual API endpoint at /api/privacy-request
      setSubmitted(true);
    } catch (err) {
      setError('Failed to submit request. Please try again or email privacy@mentoragile.com directly.');
      console.error('Privacy request error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-2xl w-full">
          <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-8 text-center">
            <div className="mb-6">
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Request Received!
            </h2>
            <p className="text-gray-700 mb-6">
              Thank you for submitting your privacy request. We have received your {formData.requestType.toLowerCase()} request and will process it within <strong>30 days</strong>.
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-700">
                <strong>What happens next:</strong>
              </p>
              <ul className="text-sm text-gray-700 mt-2 space-y-1 text-left">
                <li>• We'll verify your identity using the information provided</li>
                <li>• Our privacy team will process your request</li>
                <li>• You'll receive a confirmation email at <strong>{formData.email}</strong></li>
                <li>• Processing typically takes 7-14 business days</li>
              </ul>
            </div>
            <p className="text-sm text-gray-600 mb-6">
              If you have questions, contact us at <a href="mailto:privacy@mentoragile.com" className="text-blue-600 hover:text-blue-700">privacy@mentoragile.com</a>
            </p>
            <div className="flex gap-4 justify-center">
              <a
                href="/legal/privacy"
                className="text-blue-600 hover:text-blue-700 hover:underline"
              >
                Privacy Policy
              </a>
              <a
                href="/"
                className="text-blue-600 hover:text-blue-700 hover:underline"
              >
                Back to Home
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900">
            Privacy Request Form
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Submit a request to access, delete, correct, or opt-out of data processing
          </p>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">

          {/* Introduction */}
          <div className="mb-8">
            <p className="text-gray-700 mb-4">
              Use this form to exercise your privacy rights under California CPRA, EU GDPR, and other applicable laws.
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-gray-700">
                <strong>Processing time:</strong> We will respond to your request within <strong>30 days</strong> of verification.
              </p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Request Type */}
            <div>
              <label htmlFor="requestType" className="block text-sm font-medium text-gray-900 mb-2">
                Request Type <span className="text-red-600">*</span>
              </label>
              <select
                id="requestType"
                name="requestType"
                required
                value={formData.requestType}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">-- Select a request type --</option>
                <option value="Access my data">Access my data (CPRA/GDPR)</option>
                <option value="Delete my data">Delete my data (CPRA/GDPR/Meta Lead Ads)</option>
                <option value="Correct my data">Correct inaccurate data (CPRA/GDPR)</option>
                <option value="Opt-out of marketing">Opt-out of marketing / Do not sell or share</option>
                <option value="Data portability">Data portability (GDPR)</option>
                <option value="Other">Other privacy request</option>
              </select>
              {formData.requestType === 'Delete my data' && (
                <p className="mt-2 text-sm text-gray-600">
                  Note: Certain data may be retained for legal compliance (e.g., WIOA/ETPL records for 7 years).
                </p>
              )}
            </div>

            {/* Full Name */}
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-900 mb-2">
                Full Name <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                required
                value={formData.fullName}
                onChange={handleChange}
                placeholder="John Doe"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-900 mb-2">
                Email Address <span className="text-red-600">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="john.doe@example.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <p className="mt-2 text-sm text-gray-600">
                We'll send confirmation and updates to this address.
              </p>
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-900 mb-2">
                Phone Number (Optional)
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+1 (555) 123-4567"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <p className="mt-2 text-sm text-gray-600">
                Include if you submitted a Lead Ad with your phone number.
              </p>
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-900 mb-2">
                Additional Information <span className="text-red-600">*</span>
              </label>
              <textarea
                id="description"
                name="description"
                required
                rows={5}
                value={formData.description}
                onChange={handleChange}
                placeholder="Please provide details that will help us locate your data, such as:&#10;- When you submitted your information&#10;- Which Facebook/Instagram ad or form you filled out&#10;- Program or service you inquired about&#10;- Any other relevant details"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <div className="flex gap-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {loading ? 'Submitting...' : 'Submit Request'}
              </button>
              <a
                href="/"
                className="px-6 py-3 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-colors text-center"
              >
                Cancel
              </a>
            </div>

            {/* Alternative Contact */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <p className="text-sm text-gray-700 mb-2">
                <strong>Prefer to email?</strong>
              </p>
              <p className="text-sm text-gray-700">
                You can also send your privacy request to <a href="mailto:privacy@mentoragile.com" className="text-blue-600 hover:text-blue-700">privacy@mentoragile.com</a> with the subject line matching your request type.
              </p>
            </div>

          </form>

        </div>

        {/* Quick Links */}
        <div className="mt-8 flex flex-wrap gap-4 justify-center text-sm">
          <a href="/legal/privacy" className="text-blue-600 hover:text-blue-700 hover:underline">
            Privacy Policy
          </a>
          <a href="/legal/data-deletion" className="text-blue-600 hover:text-blue-700 hover:underline">
            Data Deletion Instructions
          </a>
          <a href="/legal/terms" className="text-blue-600 hover:text-blue-700 hover:underline">
            Terms of Service
          </a>
          <a href="/" className="text-blue-600 hover:text-blue-700 hover:underline">
            Back to Home
          </a>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-4xl mx-auto px-4 py-6 text-center text-sm text-gray-600">
          <p>&copy; 2025 Mentor Agile. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

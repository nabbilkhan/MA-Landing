import { Metadata } from 'next';

export const metadata = {
  title: 'Data Deletion Instructions | Mentor Agile Command Center',
  description: 'Instructions for requesting deletion of your personal data from Mentor Agile Command Center, including Meta Lead Ads data.',
};

export default function DataDeletionPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900">
            Data Deletion Instructions
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            How to request deletion of your personal data
          </p>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">

          {/* Introduction */}
          <div className="mb-8">
            <p className="text-gray-700 text-lg mb-4">
              We respect your right to have your personal data deleted. This page explains how to request deletion of your data from our systems.
            </p>
            <p className="text-gray-700">
              <strong>Contact:</strong> <a href="mailto:privacy@mentoragile.com" className="text-blue-600 hover:text-blue-700">privacy@mentoragile.com</a> | +1 630-521-3351<br />
              <strong>Address:</strong> 2200 S Main St, Lombard, IL 60148, United States
            </p>
          </div>

          {/* Methods Section */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">How to Request Deletion</h2>

            {/* Method 1: Self-Service */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center">
                <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 text-sm font-bold">1</span>
                Self-Service Request Form (Recommended)
              </h3>
              <p className="text-gray-700 mb-4">
                Use our online privacy request form to submit your deletion request:
              </p>
              <a
                href="/privacy-request"
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Submit Privacy Request →
              </a>
              <p className="text-gray-600 text-sm mt-4">
                Select <strong>"Delete my data"</strong> from the request type dropdown and provide the email or phone number you used when submitting your information.
              </p>
            </div>

            {/* Method 2: Email */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center">
                <span className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 text-sm font-bold">2</span>
                Email Request
              </h3>
              <p className="text-gray-700 mb-4">
                Send an email to our privacy team:
              </p>
              <div className="bg-white rounded-md p-4 border border-green-300">
                <p className="text-gray-700 mb-2">
                  <strong>To:</strong> <a href="mailto:privacy@mentoragile.com" className="text-blue-600 hover:text-blue-700">privacy@mentoragile.com</a>
                </p>
                <p className="text-gray-700 mb-2">
                  <strong>Subject:</strong> Data Deletion Request
                </p>
                <p className="text-gray-700">
                  <strong>Include in your email:</strong>
                </p>
                <ul className="list-disc pl-6 text-gray-700 mt-2 space-y-1">
                  <li>Your full name</li>
                  <li>Email address or phone number you used</li>
                  <li>Description of where you submitted your data (e.g., "Facebook Lead Ad for [Program Name]")</li>
                  <li>Any additional information that helps us locate your data</li>
                </ul>
              </div>
            </div>

            {/* Method 3: Meta-Initiated */}
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center">
                <span className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 text-sm font-bold">3</span>
                Meta-Initiated Deletion (Automatic)
              </h3>
              <p className="text-gray-700 mb-4">
                If you submitted a Facebook or Instagram Lead Ad form, you can also request deletion directly through Meta:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Visit your <a href="https://www.facebook.com/settings?tab=your_facebook_information" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700">Facebook Settings</a></li>
                <li>Go to <strong>"Your Facebook Information"</strong> → <strong>"Access Your Information"</strong></li>
                <li>Find <strong>"Apps and Websites"</strong> and locate <strong>"Mentor Agile Hub"</strong></li>
                <li>Select <strong>"Remove"</strong> or <strong>"Request Deletion"</strong></li>
              </ul>
              <p className="text-gray-600 text-sm mt-4">
                Our app automatically receives and processes deletion requests from Meta's Graph API through our Data Deletion Callback endpoint.
              </p>
            </div>
          </section>

          {/* What Gets Deleted */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">What Gets Deleted</h2>
            <p className="text-gray-700 mb-4">
              When you request deletion, we will remove or de-identify:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li><strong>Contact information:</strong> Name, email, phone number</li>
              <li><strong>Lead form submissions:</strong> All data submitted through Facebook/Instagram Lead Ads</li>
              <li><strong>Application data:</strong> Program applications, inquiries, and related communications</li>
              <li><strong>Marketing analytics:</strong> Conversion events and attribution data linked to your identifiers</li>
            </ul>
          </section>

          {/* Retention Exceptions */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Retention Exceptions</h2>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <p className="text-gray-700 mb-3">
                <strong>Important:</strong> We may retain certain data when required by law or legitimate business needs:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li><strong>WIOA/ETPL records:</strong> If you enrolled in a WIOA-funded program, we must retain records for <strong>7 years</strong> for compliance and audit purposes.</li>
                <li><strong>Financial records:</strong> Tuition payments and invoices retained for accounting and tax compliance.</li>
                <li><strong>Legal/audit needs:</strong> Data required for pending disputes, investigations, or legal obligations.</li>
              </ul>
              <p className="text-gray-700 mt-4">
                In these cases, we will de-identify your data to the maximum extent possible while maintaining compliance.
              </p>
            </div>
          </section>

          {/* Processing Time */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Processing Time</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <p className="font-semibold text-gray-900 mb-2">Standard Requests</p>
                <p className="text-gray-700 text-sm">We will process your deletion request within <strong>30 days</strong> of verification.</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <p className="font-semibold text-gray-900 mb-2">Meta-Initiated Requests</p>
                <p className="text-gray-700 text-sm">Automatic deletion requests from Meta are processed within <strong>48 hours</strong>.</p>
              </div>
            </div>
          </section>

          {/* Verification */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Identity Verification</h2>
            <p className="text-gray-700">
              To protect your privacy, we may need to verify your identity before processing deletion requests. We may ask you to:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2 mt-3">
              <li>Respond from the email address you used when submitting your data</li>
              <li>Provide additional identifying information (last 4 digits of phone, submission date, etc.)</li>
              <li>Confirm details about your interaction with our services</li>
            </ul>
          </section>

          {/* Confirmation */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Deletion Confirmation</h2>
            <p className="text-gray-700">
              Once your data has been deleted, we will send a confirmation email to the address on file. If you don't receive confirmation within the processing timeframe, please contact us at <a href="mailto:privacy@mentoragile.com" className="text-blue-600 hover:text-blue-700">privacy@mentoragile.com</a>.
            </p>
          </section>

          {/* Other Privacy Rights */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Other Privacy Rights</h2>
            <p className="text-gray-700 mb-4">
              In addition to deletion, you may also request:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <p className="font-semibold text-gray-900 mb-2">Access Your Data</p>
                <p className="text-gray-700 text-sm">Request a copy of the personal data we hold about you.</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <p className="font-semibold text-gray-900 mb-2">Correct Your Data</p>
                <p className="text-gray-700 text-sm">Update inaccurate or incomplete information.</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <p className="font-semibold text-gray-900 mb-2">Opt-Out of Marketing</p>
                <p className="text-gray-700 text-sm">Stop receiving marketing communications or limit ad targeting.</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <p className="font-semibold text-gray-900 mb-2">Data Portability</p>
                <p className="text-gray-700 text-sm">Receive your data in a structured, machine-readable format.</p>
              </div>
            </div>
            <p className="text-gray-700 mt-4">
              To exercise any of these rights, visit <a href="/privacy-request" className="text-blue-600 hover:text-blue-700">/privacy-request</a> or email <a href="mailto:privacy@mentoragile.com" className="text-blue-600 hover:text-blue-700">privacy@mentoragile.com</a>.
            </p>
          </section>

          {/* Contact Section */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Questions or Concerns?</h2>
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <p className="text-gray-700 font-semibold">Mentor Agile – Privacy Team</p>
              <p className="text-gray-700">2200 S Main St, Lombard, IL 60148, USA</p>
              <p className="text-gray-700 mt-2">
                <a href="mailto:privacy@mentoragile.com" className="text-blue-600 hover:text-blue-700">privacy@mentoragile.com</a><br />
                +1 630-521-3351
              </p>
              <p className="text-gray-600 text-sm mt-4">
                Our privacy team is available Monday-Friday, 9 AM - 5 PM CST.
              </p>
            </div>
          </section>

        </div>

        {/* Quick Links */}
        <div className="mt-8 flex flex-wrap gap-4 justify-center text-sm">
          <a href="/privacy-request" className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
            Submit Privacy Request
          </a>
          <a href="/legal/privacy" className="text-blue-600 hover:text-blue-700 hover:underline">
            Privacy Policy
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

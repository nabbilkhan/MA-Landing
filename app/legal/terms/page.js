import { Metadata } from 'next';

export const metadata = {
  title: 'Terms of Service | Mentor Agile Command Center',
  description: 'Terms of Service for Mentor Agile Command Center Meta App integration, governing use of Lead Ads, Marketing API, and Conversions API features.',
};

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900">
            Terms of Service
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Mentor Agile Command Center – Meta App
          </p>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 prose prose-gray max-w-none">

          <p className="text-sm text-gray-600 mb-8">
            <strong>Effective date:</strong> October 15, 2025<br />
            <strong>Contact:</strong> <a href="mailto:legal@mentoragile.com" className="text-blue-600 hover:text-blue-700">legal@mentoragile.com</a> | +1 630-521-3351<br />
            <strong>Address:</strong> 2200 S Main St, Lombard, IL 60148, United States
          </p>

          <p className="text-gray-700 mb-8">
            These Terms govern your use of the Mentor Agile Command Center, our APIs, and the <strong>Meta App</strong> integration that connects your Facebook/Instagram assets to the Command Center.
          </p>

          {/* Agreement to Terms */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Agreement to Terms</h2>
            <p className="text-gray-700">
              By accessing or using the Command Center or connecting your Meta assets, you agree to these Terms and to our <a href="/legal/privacy" className="text-blue-600 hover:text-blue-700">Privacy Policy</a>.
            </p>
          </section>

          {/* Eligibility & Account Responsibilities */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Eligibility & Account Responsibilities</h2>
            <p className="text-gray-700">
              You must be authorized to manage the relevant ad accounts, pages, pixels, and business assets. You are responsible for safeguarding credentials, access tokens, and any system user keys issued to your business.
            </p>
          </section>

          {/* Permitted Use */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Permitted Use</h2>
            <p className="text-gray-700 mb-4">You may use the Command Center to:</p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Ingest leads from <strong>Lead Ads</strong> via webhooks/Graph API;</li>
              <li>Pull Ads <strong>Insights</strong> for reporting/attribution; and</li>
              <li>Send server-to-server events via <strong>Conversions API</strong> to measure outcomes and optimize campaigns.</li>
            </ul>
            <p className="text-gray-700 mt-4">
              You will use these features in compliance with <strong>Meta's Developer Policies</strong>, <strong>Lead Ads Terms</strong>, and <strong>Business Tools Terms</strong> (including limits on how Business Tool Data may be used).
            </p>
          </section>

          {/* Data Handling & Deletion */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Data Handling & Deletion</h2>
            <p className="text-gray-700">
              You must comply with our <a href="/legal/privacy" className="text-blue-600 hover:text-blue-700">Privacy Policy</a> and with applicable law when processing personal information. If we receive a <strong>Meta Data Deletion</strong> request (via Graph callback) or a user request directly, we will delete or de-identify the relevant data except where retention is required by law (e.g., WIOA/ETPL records).
            </p>
          </section>

          {/* Security */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Security</h2>
            <p className="text-gray-700">
              You agree to implement reasonable security controls and not to disable or bypass integrity checks (e.g., signature verification on webhook payloads). We validate Meta webhooks using <strong>X-Hub-Signature-256</strong> (HMAC-SHA256).
            </p>
          </section>

          {/* Prohibited Conduct */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Prohibited Conduct</h2>
            <p className="text-gray-700 mb-4">You may not:</p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Use the services to violate any law or third-party rights;</li>
              <li>Resell, lease, or provide the integration as a service to others without our written consent;</li>
              <li>Scrape, reverse engineer, or interfere with rate limits or access controls;</li>
              <li>Use Lead Ads data for purposes not disclosed in your lead form or privacy policy, or share/sell such data in violation of Meta's Lead Ads Terms.</li>
            </ul>
          </section>

          {/* Processors and Third-Party Services */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Processors and Third-Party Services</h2>
            <p className="text-gray-700">
              We use vetted service providers (hosting, CRM, accounting, LMS, communication). Your use of those services may be subject to their terms. We remain responsible for our processors' performance as required by law.
            </p>
          </section>

          {/* Intellectual Property */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Intellectual Property</h2>
            <p className="text-gray-700">
              We own the Command Center software, UI, and content. You own your data and your campaign assets. You grant us a non-exclusive license to process your data to provide the services.
            </p>
          </section>

          {/* Disclaimers */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Disclaimers</h2>
            <p className="text-gray-700">
              Services are provided <strong>"as is"</strong> and <strong>"as available."</strong> To the fullest extent permitted by law, we disclaim warranties of merchantability, fitness for a particular purpose, non-infringement, and uninterrupted availability.
            </p>
          </section>

          {/* Limitation of Liability */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Limitation of Liability</h2>
            <p className="text-gray-700">
              To the fullest extent permitted by law, <strong>Mentor Agile</strong> will not be liable for any indirect, incidental, special, consequential, or punitive damages; or for lost profits, revenues, data, or goodwill. Our aggregate liability for all claims related to the services will not exceed the amounts you paid to us for the services in the <strong>3 months</strong> preceding the event giving rise to liability.
            </p>
          </section>

          {/* Indemnification */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Indemnification</h2>
            <p className="text-gray-700">
              You will defend and indemnify Mentor Agile against claims arising from (a) your misuse of the services; (b) your violation of these Terms or applicable law; or (c) your infringement or violation of third-party rights.
            </p>
          </section>

          {/* Suspension & Termination */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Suspension & Termination</h2>
            <p className="text-gray-700">
              We may suspend or terminate access for violations of these Terms, suspected fraud or abuse, security risks, or to comply with law or platform rules.
            </p>
          </section>

          {/* Governing Law & Venue */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">13. Governing Law & Venue</h2>
            <p className="text-gray-700">
              These Terms are governed by the laws of the State of <strong>Illinois</strong>, without regard to conflict-of-laws principles. Venue lies exclusively in state or federal courts located in Cook or DuPage County, Illinois.
            </p>
          </section>

          {/* Changes to Terms */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">14. Changes to Terms</h2>
            <p className="text-gray-700">
              We may update these Terms. Material changes will be communicated in-app or by email. Continued use constitutes acceptance.
            </p>
          </section>

          {/* Contact */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">15. Contact</h2>
            <div className="bg-gray-50 p-4 rounded-md">
              <p className="text-gray-700 font-semibold">Mentor Agile – Legal</p>
              <p className="text-gray-700">2200 S Main St, Lombard, IL 60148, USA</p>
              <p className="text-gray-700">
                <a href="mailto:legal@mentoragile.com" className="text-blue-600 hover:text-blue-700">legal@mentoragile.com</a> | +1 630-521-3351
              </p>
            </div>
          </section>

        </div>

        {/* Quick Links */}
        <div className="mt-8 flex flex-wrap gap-4 justify-center text-sm">
          <a href="/legal/privacy" className="text-blue-600 hover:text-blue-700 hover:underline">
            Privacy Policy
          </a>
          <a href="/legal/data-deletion" className="text-blue-600 hover:text-blue-700 hover:underline">
            Data Deletion Instructions
          </a>
          <a href="/privacy-request" className="text-blue-600 hover:text-blue-700 hover:underline">
            Submit Privacy Request
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

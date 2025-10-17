import { Metadata } from 'next';

export const metadata = {
  title: 'Privacy Policy | Mentor Agile Command Center',
  description: 'Privacy Policy for Mentor Agile Command Center Meta App integration, including Lead Ads, Marketing API, and Conversions API data handling practices.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900">
            Privacy Policy
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
            <strong>Contact:</strong> <a href="mailto:privacy@mentoragile.com" className="text-blue-600 hover:text-blue-700">privacy@mentoragile.com</a> | +1 630-521-3351<br />
            <strong>Address:</strong> 2200 S Main St, Lombard, IL 60148, United States
          </p>

          {/* Scope Section */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Scope</h2>
            <p className="text-gray-700 mb-4">
              This Privacy Policy explains how we collect, use, share, and retain personal information when you use or interact with:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Our <strong>Meta App</strong> that connects your Facebook/Instagram ad accounts and pages to the Command Center;</li>
              <li>Our websites, dashboards, and APIs; and</li>
              <li>Related services (student support, AJC coordination, ETPL compliance, QuickBooks syncing, and LMS integrations).</li>
            </ul>
            <p className="text-gray-700 mt-4">
              We publish this policy to meet Meta's requirement that apps provide a publicly accessible privacy policy describing what data is collected and how it is used. We also provide a <strong>User Data Deletion</strong> path as required during App Review.
            </p>
          </section>

          {/* What We Collect */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. What We Collect</h2>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">A. Information you provide to us</h3>
            <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
              <li>Contact and identity data (name, email, phone), program and cohort preferences, resume/profile details, application forms, and support messages.</li>
              <li>Student Journey data (e.g., AJC assignments, enrollments, progress, credentials, employment verification).</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">B. Information we receive from Meta (Facebook/Instagram)</h3>
            <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
              <li><strong>Lead Ads data</strong> you intentionally submit in lead forms (form fields such as name, email, phone, custom questions) and metadata (lead_id, form_id, page_id, ad_id/adset_id/campaign_id). We obtain this via <strong>Page Webhooks</strong> and Graph API per permissions you authorize.</li>
              <li><strong>Ads performance & spend metrics</strong> from the <strong>Marketing API / Insights</strong> (e.g., spend, impressions, clicks, reach, actions) at account/campaign/adset/ad levels.</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">C. Information we send to Meta</h3>
            <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
              <li><strong>Server-to-server events</strong> via the <strong>Conversions API</strong> (e.g., <em>Lead</em>, <em>CompleteRegistration</em>, <em>Purchase/Tuition</em>, <em>Placement</em>) with required event parameters and <strong>hashed</strong> customer identifiers where applicable (SHA-256 applied to email/phone; never hash IP). We may also include <code>event_id</code> for deduplication with the Pixel.</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">D. Device, cookie, and analytics data</h3>
            <p className="text-gray-700 mb-4">
              We may collect device/browser data, IP address, user-agent, timestamps, and online identifiers (including cookies such as <code>fbp</code>/<code>fbc</code>) for security, analytics, attribution, and audience measurement.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">E. Financial and operational data (program operations)</h3>
            <p className="text-gray-700 mb-4">
              Tuition invoices/payments (via QuickBooks), program progress and outcomes (via LMS), and AJC/WIOA documentation and metrics.
            </p>

            <p className="text-gray-700 italic">
              We do <strong>not</strong> knowingly collect data from children under 13 or target them with advertising.
            </p>
          </section>

          {/* How We Use Data */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. How We Use Data</h2>
            <p className="text-gray-700 mb-4">We use personal information to:</p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Deliver, secure, and improve the Command Center and our services (including dashboards, ETL jobs, and webhooks).</li>
              <li>Process admissions, enrollment, instruction, credentialing, job placement, and compliance reporting (e.g., WIOA, ETPL).</li>
              <li>Ingest <strong>Lead Ads</strong> in real-time and match them to student records; attribute media performance; optimize campaigns; measure ROAS and outcomes through the funnel to <strong>placement</strong>.</li>
              <li>Send server-side events to Meta through <strong>Conversions API</strong> to improve attribution/optimization, using hashing and recommended parameters.</li>
              <li>Communicate with you (service updates, orientation, coaching) and provide support.</li>
            </ul>
            <p className="text-gray-700 mt-4">
              <strong>Legal bases (where applicable):</strong> consent (e.g., marketing form submissions), contract (program delivery), legitimate interests (security, measurement), legal obligations (WIOA/ETPL). GDPR/EEA/UK users have rights described below.
            </p>
          </section>

          {/* How We Share Data */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. How We Share Data</h2>
            <p className="text-gray-700 mb-4">We share data with:</p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li><strong>Processors</strong> that host, process, or support our services (e.g., cloud hosting, CRM, accounting, LMS, email/SMS providers). Our key integrations include <strong>GoHighLevel (CRM)</strong>, <strong>QuickBooks (accounting)</strong>, and <strong>Kajabi (LMS)</strong>.</li>
              <li><strong>Meta</strong> via Business Tools (Pixel/CAPI) and APIs under the <strong>Meta Business Tools Terms</strong> for advertising, matching, measurement, and analytics.</li>
              <li><strong>AJCs and relevant government agencies</strong> to administer WIOA/ETPL programs, funding, and outcome reporting.</li>
            </ul>
            <p className="text-gray-700 mt-4">
              We do <strong>not</strong> sell personal information. For California residents, our use of Meta Business Tools may be considered <strong>"sharing" for cross-context behavioral advertising</strong>; you can opt out (see "Your privacy choices").
            </p>
          </section>

          {/* Privacy Choices and Rights */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Your Privacy Choices and Rights</h2>
            <ul className="list-disc pl-6 text-gray-700 space-y-3">
              <li>
                <strong>Opt-out of cross-context ads:</strong> Use our <strong>"Do Not Sell or Share My Personal Information"</strong> link (site footer) or email <a href="mailto:privacy@mentoragile.com" className="text-blue-600 hover:text-blue-700">privacy@mentoragile.com</a> to limit use of cookies and identifiers for advertising. We honor <strong>Global Privacy Control (GPC)</strong> signals where technically feasible.
              </li>
              <li>
                <strong>Access, delete, correct, or port your data:</strong> Submit a request at <a href="/privacy-request" className="text-blue-600 hover:text-blue-700">/privacy-request</a> or email <a href="mailto:privacy@mentoragile.com" className="text-blue-600 hover:text-blue-700">privacy@mentoragile.com</a>. California/CPRA and EU/UK/GDPR users have rights to access, deletion/erasure, correction, portability, and to object or restrict certain processing.
              </li>
              <li>
                <strong>Lead Ads data deletion:</strong> If you submitted a Facebook/Instagram Lead Ad form and want us to delete your data, submit a request at <a href="/privacy-request" className="text-blue-600 hover:text-blue-700">/privacy-request</a> or follow the <strong>Data Deletion</strong> instructions at <a href="/legal/data-deletion" className="text-blue-600 hover:text-blue-700">/legal/data-deletion</a>. We also implement Meta's <strong>Data Deletion Callback</strong> for Graph-initiated requests.
              </li>
            </ul>
          </section>

          {/* Data Retention */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Data Retention</h2>
            <p className="text-gray-700">
              We retain data as long as necessary for the purposes above and to comply with law and audits. For WIOA/ETPL compliance we maintain certain records for <strong>7 years</strong>. Marketing analytics and event logs are typically retained for shorter operational windows unless required for security, audits, or disputes.
            </p>
          </section>

          {/* Security */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Security</h2>
            <p className="text-gray-700">
              We use administrative, technical, and physical safeguards appropriate to our services and data sensitivity, including TLS in transit, encryption at rest for key stores, role-based access control, logging/monitoring, and webhook signature verification (X-Hub-Signature-256/HMAC-SHA256).
            </p>
          </section>

          {/* International Transfers */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. International Transfers</h2>
            <p className="text-gray-700">
              If you are in the EEA/UK, your data may be processed in the United States. Where required, we use appropriate safeguards (e.g., SCCs) consistent with EU/UK guidance.
            </p>
          </section>

          {/* Lead Ads & Meta Business Tools */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Lead Ads & Meta Business Tools Disclosures</h2>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>We use <strong>Lead Ads</strong> and must have a privacy policy link in each lead form; your submissions go to us, not to Meta.</li>
              <li>We use <strong>Meta Business Tools</strong> (e.g., Pixel/CAPI). Meta may receive <strong>Business Tool Data</strong> to provide advertising, matching, measurement, and analytics services to us. See Meta's <strong>Business Tools Terms</strong> for details.</li>
              <li>For <strong>Conversions API</strong>, we follow Meta's guidance to hash customer identifiers server-side and to include required/optional event parameters.</li>
            </ul>
          </section>

          {/* Contact Us */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Contact Us</h2>
            <div className="bg-gray-50 p-4 rounded-md">
              <p className="text-gray-700 font-semibold">Mentor Agile – Privacy</p>
              <p className="text-gray-700">2200 S Main St, Lombard, IL 60148, USA</p>
              <p className="text-gray-700">
                <a href="mailto:privacy@mentoragile.com" className="text-blue-600 hover:text-blue-700">privacy@mentoragile.com</a> | +1 630-521-3351
              </p>
            </div>
          </section>

          {/* Changes to Policy */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Changes to This Policy</h2>
            <p className="text-gray-700">
              We will update this page when practices change. Material changes will be announced in-app or by email prior to the new effective date.
            </p>
          </section>

          {/* How to Request Deletion */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">11. How to Request Deletion (Meta Requirement)</h2>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li><strong>Self-service:</strong> Visit <a href="/privacy-request" className="text-blue-600 hover:text-blue-700">/privacy-request</a> and select <strong>Delete my data</strong>.</li>
              <li><strong>Email:</strong> Send a request to <a href="mailto:privacy@mentoragile.com" className="text-blue-600 hover:text-blue-700">privacy@mentoragile.com</a> with the subject "Data Deletion Request" and the email/phone you used.</li>
              <li><strong>Meta-initiated:</strong> Our app exposes a <strong>Data Deletion Callback URL</strong> in the Meta App Dashboard to process Graph deletion requests automatically. See <a href="/legal/data-deletion" className="text-blue-600 hover:text-blue-700">/legal/data-deletion</a> for details.</li>
            </ul>
          </section>

        </div>

        {/* Quick Links */}
        <div className="mt-8 flex flex-wrap gap-4 justify-center text-sm">
          <a href="/legal/terms" className="text-blue-600 hover:text-blue-700 hover:underline">
            Terms of Service
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

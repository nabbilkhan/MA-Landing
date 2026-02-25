import Image from 'next/image';
import Link from 'next/link';
import {
  BookOpen,
  Download,
  ExternalLink,
  FileText,
  ShieldCheck,
  ArrowRight,
} from 'lucide-react';
import NavigationHeader from '../course-landing/components/NavigationHeader';
import SocialFooter from '../course-landing/components/SocialFooter';

const CATALOG_PDF_URL = '/catalog/ibhe-catalog.pdf';
const DISCLOSURE_IMAGE_URL = '/catalog/last-page-image-2.png';
const DISCLOSURE_PAGE_URL = `${CATALOG_PDF_URL}#page=16`;

export default function StudentCatalogPage() {
  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <NavigationHeader />

      <section className="relative px-6 pt-28 pb-16 md:pt-36 md:pb-20">
        <div className="absolute inset-0 bg-gradient-to-br from-gold-500/10 via-black to-gold-600/5" />
        <div className="relative max-w-7xl mx-auto space-y-10">
          <div className="max-w-4xl mx-auto text-center space-y-5">
            <div className="w-20 h-20 bg-gold-500/20 rounded-full flex items-center justify-center mx-auto">
              <BookOpen className="w-10 h-10 text-gold-400" />
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black bg-gradient-to-r from-gold-300 via-gold-500 to-gold-300 bg-clip-text text-transparent">
              Student Catalog
            </h1>
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
              View the official Mentor Agile IBHE catalog in one place, with the required
              disclosure page highlighted for quick access.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3 max-w-5xl mx-auto">
            <a
              href={CATALOG_PDF_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between rounded-2xl border border-gold-500/30 bg-gold-500/10 px-5 py-4 hover:bg-gold-500/20 transition-colors"
            >
              <span className="flex items-center gap-2 font-semibold">
                <ExternalLink className="w-4 h-4" />
                Open Full Catalog
              </span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href={CATALOG_PDF_URL}
              download
              className="flex items-center justify-between rounded-2xl border border-gold-500/30 bg-gold-500/10 px-5 py-4 hover:bg-gold-500/20 transition-colors"
            >
              <span className="flex items-center gap-2 font-semibold">
                <Download className="w-4 h-4" />
                Download PDF
              </span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <Link
              href="/institutional-disclosure"
              className="flex items-center justify-between rounded-2xl border border-gold-500/30 bg-gold-500/10 px-5 py-4 hover:bg-gold-500/20 transition-colors"
            >
              <span className="flex items-center gap-2 font-semibold">
                <ShieldCheck className="w-4 h-4" />
                View Disclosure
              </span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="px-6 pb-10">
        <div className="max-w-7xl mx-auto rounded-3xl border border-gold-500/20 bg-gradient-to-br from-gold-500/10 to-gold-600/5 p-4 md:p-8 shadow-2xl">
          <div className="mb-4 md:mb-6 flex items-center gap-3 text-gold-300">
            <FileText className="w-5 h-5" />
            <h2 className="text-xl md:text-2xl font-bold">IBHE Catalog Viewer</h2>
          </div>
          <div className="overflow-hidden rounded-2xl border border-gold-500/20 bg-black/70">
            <iframe
              title="Mentor Agile IBHE student catalog"
              src={`${CATALOG_PDF_URL}#toolbar=1&navpanes=0`}
              className="w-full h-[75vh] min-h-[700px]"
            />
          </div>
          <p className="mt-4 text-sm text-gray-400">
            If the inline viewer does not load on your device, use <a href={CATALOG_PDF_URL} target="_blank" rel="noopener noreferrer" className="text-gold-400 hover:text-gold-300 underline underline-offset-2">Open Full Catalog</a>.
          </p>
        </div>
      </section>

      <section className="px-6 pb-20">
        <div className="max-w-7xl mx-auto rounded-3xl border border-gold-500/20 bg-gradient-to-br from-gold-500/10 to-gold-600/5 p-6 md:p-10 shadow-2xl space-y-6">
          <div className="space-y-3">
            <h2 className="text-2xl md:text-3xl font-black text-gold-400">
              Institutional Disclosure (Catalog Page 16)
            </h2>
            <p className="text-gray-300 leading-relaxed">
              The disclosure document included on the final page of the IBHE catalog is shown
              below for fast access.
            </p>
          </div>

          <div className="max-w-3xl mx-auto overflow-hidden rounded-2xl border border-gold-500/30 bg-black/70">
            <Image
              src={DISCLOSURE_IMAGE_URL}
              alt="Institutional disclosure from the final page of Mentor Agile's IBHE catalog"
              width={882}
              height={1127}
              className="w-full h-auto"
              priority
            />
          </div>

          <div className="flex flex-wrap gap-3">
            <a
              href={DISCLOSURE_PAGE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gold-500 text-black font-semibold hover:bg-gold-400 transition-colors"
            >
              Open PDF to Page 16
              <ExternalLink className="w-4 h-4" />
            </a>
            <Link
              href="/institutional-disclosure"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-gold-500/40 text-gold-300 hover:bg-gold-500/10 transition-colors"
            >
              Open Dedicated Disclosure Page
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <SocialFooter />
    </div>
  );
}

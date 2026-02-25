import Image from 'next/image';
import Link from 'next/link';
import { ShieldCheck, ExternalLink, Download, BookOpen } from 'lucide-react';
import NavigationHeader from '../course-landing/components/NavigationHeader';
import SocialFooter from '../course-landing/components/SocialFooter';

const CATALOG_PDF_URL = '/catalog/ibhe-catalog.pdf';
const DISCLOSURE_IMAGE_URL = '/catalog/last-page-image-2.png';
const DISCLOSURE_PAGE_URL = `${CATALOG_PDF_URL}#page=16`;

export default function InstitutionalDisclosurePage() {
  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <NavigationHeader />

      <section className="relative px-6 pt-28 pb-16 md:pt-36 md:pb-20">
        <div className="absolute inset-0 bg-gradient-to-br from-gold-500/10 via-black to-gold-600/5" />
        <div className="relative max-w-6xl mx-auto text-center space-y-5">
          <div className="w-20 h-20 bg-gold-500/20 rounded-full flex items-center justify-center mx-auto">
            <ShieldCheck className="w-10 h-10 text-gold-400" />
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black bg-gradient-to-r from-gold-300 via-gold-500 to-gold-300 bg-clip-text text-transparent">
            Institutional Disclosure
          </h1>
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-4xl mx-auto">
            This is the official disclosure document included on the final page of the Mentor Agile
            IBHE catalog.
          </p>

          <div className="flex flex-wrap justify-center gap-3 pt-3">
            <a
              href={DISCLOSURE_PAGE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gold-500 text-black font-semibold hover:bg-gold-400 transition-colors"
            >
              Open Page 16 in PDF
              <ExternalLink className="w-4 h-4" />
            </a>
            <a
              href={CATALOG_PDF_URL}
              download
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-gold-500/40 text-gold-300 hover:bg-gold-500/10 transition-colors"
            >
              Download Full Catalog
              <Download className="w-4 h-4" />
            </a>
            <Link
              href="/student-catalog"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-gold-500/40 text-gold-300 hover:bg-gold-500/10 transition-colors"
            >
              Back to Student Catalog
              <BookOpen className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="px-6 pb-20">
        <div className="max-w-4xl mx-auto rounded-3xl border border-gold-500/20 bg-gradient-to-br from-gold-500/10 to-gold-600/5 p-4 md:p-8 shadow-2xl space-y-5">
          <h2 className="text-xl md:text-2xl font-bold text-gold-300">Disclosure Document</h2>
          <p className="text-gray-300 text-sm md:text-base">
            Preview of page 16 from the official catalog.
          </p>

          <div className="overflow-hidden rounded-2xl border border-gold-500/30 bg-black/70">
            <Image
              src={DISCLOSURE_IMAGE_URL}
              alt="Institutional disclosure page from Mentor Agile's IBHE catalog"
              width={882}
              height={1127}
              className="w-full h-auto"
              priority
            />
          </div>

          <p className="text-sm text-gray-400">
            Need the complete document context? View the full <a href={CATALOG_PDF_URL} target="_blank" rel="noopener noreferrer" className="text-gold-400 hover:text-gold-300 underline underline-offset-2">Student Catalog PDF</a>.
          </p>
        </div>
      </section>

      <SocialFooter />
    </div>
  );
}

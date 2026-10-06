import Link from 'next/link';
import NavigationHeader from '../course-landing/components/NavigationHeader';
import SocialFooter from '../course-landing/components/SocialFooter';
import CatalogContent from '../components/CatalogContent';
import catalog from '../../content/catalog/catalog.json';

export const metadata = {
  title: 'Product Owner Student Catalog 2026–2027 | Mentor Agile',
  description: 'Read the Product Owner / Product Manager curriculum, enrollment policies, certification requirements, and reported program outcomes.',
};
const PDF = '/catalog/product-owner-catalog-2026-2027.pdf';
export default function StudentCatalogPage() {
  return <div className="min-h-screen bg-black text-white overflow-x-hidden">
    <NavigationHeader />
    <main className="max-w-6xl mx-auto px-5 md:px-8 pt-32 pb-20 space-y-12">
      <header className="max-w-4xl space-y-5">
        <p className="text-gold-300 font-semibold uppercase tracking-widest">2026–2027 · Revised {catalog.revision}</p>
        <h1 className="text-4xl md:text-6xl font-black text-white">Product Owner<br /><span className="text-gold-400">Student Catalog</span></h1>
        <p className="text-lg text-gray-300">The Product Owner / Product Manager program: 12 weeks of online learning, practical assignments, and career preparation.</p>
        {catalog.status === 'draft' && <p className="border border-amber-400 p-4 text-amber-200">Review draft — tuition and refund terms await school confirmation.</p>}
        <div className="flex flex-wrap gap-3">
          <a href={PDF} target="_blank" rel="noopener noreferrer" className="rounded-xl bg-gold-500 text-black font-bold px-5 py-3">Open catalog PDF</a>
          <a href={PDF} download className="rounded-xl border border-gold-400 text-gold-200 font-semibold px-5 py-3">Download PDF</a>
          <Link href="/institutional-disclosure" className="rounded-xl border border-gold-400 text-gold-200 font-semibold px-5 py-3">View program disclosures</Link>
        </div>
        <p className="text-sm text-gray-400">Read the complete text below, or use the PDF. The online version includes accessible tables and section links.</p>
      </header>
      <CatalogContent />
      <details className="border border-gold-500/20 rounded-2xl p-5">
        <summary className="cursor-pointer text-gold-300 font-semibold">Preview the PDF</summary>
        <iframe loading="lazy" src={PDF} title="Mentor Agile Product Owner student catalog 2026–2027" className="w-full h-[75vh] mt-5 rounded-xl" />
        <p className="mt-3 text-sm text-gray-400">If the viewer does not load, use the Open catalog PDF link above.</p>
      </details>
    </main>
    <SocialFooter />
  </div>;
}

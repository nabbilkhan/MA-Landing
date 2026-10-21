import Link from 'next/link';
import NavigationHeader from '../course-landing/components/NavigationHeader';
import SocialFooter from '../course-landing/components/SocialFooter';
import CatalogContent from '../components/CatalogContent';
import catalog from '../../content/catalog/catalog.json';

export const metadata = {
  title: 'Product Owner Student Catalog 2026–2027 | Mentor Agile',
  description: 'Read the Product Owner / Product Manager curriculum, enrollment policies, certification requirements, and reported program outcomes.',
};
export default function StudentCatalogPage() {
  return <div className="min-h-screen bg-black text-white overflow-x-hidden">
    <NavigationHeader />
    <main className="max-w-6xl mx-auto px-5 md:px-8 pt-32 pb-20 space-y-12">
      <header className="max-w-4xl space-y-5">
        <p className="text-gold-300 font-semibold uppercase tracking-widest">2026–2027 · Revised {catalog.revision}</p>
        <h1 className="text-4xl md:text-6xl font-black text-white">Product Owner<br /><span className="text-gold-400">Student Catalog</span></h1>
        <p className="text-lg text-gray-300">The Product Owner / Product Manager program: 12 weeks of online learning, practical assignments, and career preparation.</p>
        <p className="rounded-xl border border-gold-400 bg-gold-500/10 p-4 text-gold-100">Illinois students: the Illinois catalog, cancellation and refund terms, and IBHE approval information are at <a href="https://il.mentoragile.com/" className="underline underline-offset-4 font-semibold">il.mentoragile.com</a>.</p>
        <div className="flex flex-wrap gap-3">
          <Link href="/institutional-disclosure" className="rounded-xl border border-gold-400 text-gold-200 font-semibold px-5 py-3">View program disclosures</Link>
        </div>
        <p className="text-sm text-gray-400">Read the complete text below. The online version includes accessible tables and section links.</p>
      </header>
      <CatalogContent />
    </main>
    <SocialFooter />
  </div>;
}

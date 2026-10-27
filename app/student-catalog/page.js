import Link from 'next/link';
import NavigationHeader from '../course-landing/components/NavigationHeader';
import SocialFooter from '../course-landing/components/SocialFooter';
import CatalogContent from '../components/CatalogContent';
import catalog from '../../content/catalog/catalog.json';
import programCatalog from '../../content/catalog/ibhe-r2.json';

export const metadata = {
  title: 'Product Owner Student Catalog 2026–2027 | Mentor Agile',
  description: 'Read the Product Owner / Product Manager curriculum, enrollment policies, certification requirements, and reported program outcomes.',
};
export default function StudentCatalogPage() {
  const program = programCatalog.programs.find(item => item.slug === 'product-owner-product-manager');
  return <div className="min-h-screen bg-black text-white overflow-x-hidden">
    <NavigationHeader />
    <main className="max-w-6xl mx-auto px-5 md:px-8 pt-32 pb-20 space-y-12">
      <aside className="rounded-2xl border border-gold-400/40 bg-gold-500/10 p-5 text-gray-200">
        <p className="font-semibold text-gold-200">Updated catalogs for all three programs</p>
        <p className="mt-2">For current program tuition, fees, calendars, policies, and downloadable catalogs, visit the <Link href="/academic-catalog/" className="text-gold-200 underline underline-offset-4">Academic Catalog</Link>, including the <Link href="/programs/product-owner-product-manager/" className="text-gold-200 underline underline-offset-4">updated Product Owner/Product Manager catalog</Link>.</p>
      </aside>
      <header className="max-w-4xl space-y-5">
        <p className="text-gold-300 font-semibold uppercase tracking-widest">2026–2027 · Revised {catalog.revision}</p>
        <h1 className="text-4xl md:text-6xl font-black text-white">Product Owner<br /><span className="text-gold-400">Student Catalog</span></h1>
        <p className="text-lg text-gray-300">The Product Owner / Product Manager program: 12 weeks of online learning, practical assignments, and career preparation.</p>
        <p className="text-gray-300">{program.note}</p>
        {catalog.status === 'draft' && <p className="border border-amber-400 p-4 text-amber-200">Review draft — tuition and refund terms await school confirmation.</p>}
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

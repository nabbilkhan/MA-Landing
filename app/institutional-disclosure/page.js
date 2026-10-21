import Link from 'next/link';
import NavigationHeader from '../course-landing/components/NavigationHeader';
import SocialFooter from '../course-landing/components/SocialFooter';
import ProgramPerformance from '../components/ProgramPerformance';
import StagingBanner from '../components/StagingBanner';
import { RetailQaDisclosureRow } from '../academic-catalog/RetailQaDraft';
import programs from '../../content/catalog/programs-round2.json';

export const metadata = {
  title: 'Program Performance & Institutional Disclosures | Mentor Agile',
  description: 'Reported Product Owner program outcomes by reporting period, explanatory notes, and historical institutional disclosure.',
};
export default function InstitutionalDisclosurePage() {
  return <div className="min-h-screen bg-black text-white overflow-x-hidden">
    <NavigationHeader />
    <StagingBanner />
    <main className="max-w-6xl mx-auto px-5 md:px-8 pt-32 pb-20 space-y-10">
      <header className="space-y-5 max-w-4xl">
        <p className="uppercase tracking-widest font-semibold text-gold-300">All programs</p>
        <h1 className="text-4xl md:text-6xl font-black">Program Disclosures</h1>
        <p className="text-lg text-gray-300">Read the reported outcomes with their reporting periods and definitions. Current program-performance measures and historical institutional data are shown separately.</p>
        <div className="flex flex-wrap gap-3">
          <Link href="/student-catalog" className="rounded-xl bg-gold-500 text-black font-semibold px-5 py-3">Read the student catalog</Link>
          <a href="/catalog/product-owner-catalog-2026-2027.pdf" download className="rounded-xl border border-gold-400 text-gold-200 px-5 py-3">Download catalog PDF</a>
        </div>
      </header>
      <section className="rounded-2xl border border-gold-500/20 p-5 md:p-8 space-y-4">
        <h2 className="text-2xl md:text-3xl font-bold text-gold-300">Institutional disclosures by program</h2>
        <div className="overflow-x-auto rounded-xl border border-gold-500/30">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="bg-gold-500/15 text-gold-200"><tr><th scope="col" className="p-3">Program</th><th scope="col" className="p-3">Reporting period</th><th scope="col" className="p-3">Disclosure</th></tr></thead>
            <tbody>
              <tr className="border-t border-white/10"><th scope="row" className="p-3 font-normal text-gray-100">{programs.programs.po.name}</th><td className="p-3">PY2025 (Jul 1, 2025–Jun 30, 2026) and PY2024</td><td className="p-3">80 students, 68 exits, 85% reported rates for PY2025; 3 students for PY2024. Details below.</td></tr>
              <tr className="border-t border-white/10"><th scope="row" className="p-3 font-normal text-gray-100">{programs.programs.pharm.name}</th><td className="p-3">Since approval (Apr 1, 2026)</td><td className="p-3">[NEEDS: counts, or &quot;no students enrolled as of [date]&quot;]</td></tr>
              <RetailQaDisclosureRow />
            </tbody>
          </table>
        </div>
        <p className="text-sm text-gray-300">{programs.disclosureNote}</p>
      </section>
      <div className="rounded-2xl border border-gold-500/20 p-5 md:p-8"><ProgramPerformance /></div>
      <section className="rounded-2xl border border-gold-500/20 p-5 md:p-8 space-y-4">
        <h2 className="text-2xl font-bold text-gold-300">Historical institutional disclosure</h2>
        <p className="text-gray-300">The July 1, 2023–June 30, 2024 institutional disclosure is a historical record. Its zero counts must not be used to describe later reporting periods.</p>
        <Link href="/student-catalog/#historical" className="inline-block text-gold-200 underline underline-offset-4">Read the historical table and reporting limitations</Link>
        <p className="text-gray-300">The supplied current performance table does not contain every category required for a current IBHE institutional disclosure. Additional figures have not been estimated. Contact <a href="mailto:info@mentoragile.com" className="text-gold-200 underline">info@mentoragile.com</a> for additional reporting information.</p>
      </section>
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-gold-300">Complaints</h2>
        <p className="text-gray-200">COMPLAINTS AGAINST THIS SCHOOL MAY BE REGISTERED WITH THE BOARD OF HIGHER EDUCATION.</p>
        <p className="text-gray-300">Illinois Board of Higher Education · 1 N. Old State Capitol Plaza, Suite 333, Springfield, IL 62701 · (217) 782-2551.</p>
        <p><Link href="/complaint-policy" className="text-gold-200 underline">School complaint process</Link> · <a href="https://complaints.ibhe.org/" className="text-gold-200 underline">IBHE complaint system</a></p>
      </section>
    </main>
    <SocialFooter />
  </div>;
}

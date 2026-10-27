import Link from 'next/link';
import catalog from '../../content/catalog/ibhe-r2.json';
import { CatalogLayout, CatalogSection, CatalogDownload, ProgramFacts, InstitutionalCalendar, TuitionAndFees, CancellationAndRefundPolicy, InstitutionalStatements, TransferOfCredits, ComplaintInformation, InstitutionContact, catalogLinkClass } from '../components/AcademicCatalog';

export const metadata = {
  title: 'Institutional Disclosures | All Three Programs | Mentor Agile',
  description: 'Tuition, fees, program length, institutional calendars, refund policies, approval, accreditation, transferability, and complaint contacts for all three Mentor Agile programs.',
  openGraph: { title: 'Institutional Disclosures | Mentor Agile', description: 'Tuition, fees, calendars, refund policies, and institutional disclosures for all three Mentor Agile programs.', url: '/institutional-disclosure/' },
  alternates: { canonical: '/institutional-disclosure/' },
};

export default function InstitutionalDisclosurePage() {
  return <CatalogLayout>
    <header className="max-w-4xl space-y-5">
      <p className="uppercase tracking-widest font-semibold text-gold-300">Mentor Agile · All three programs</p>
      <h1 className="text-4xl md:text-6xl font-black">Institutional Disclosures</h1>
      <p className="text-lg text-gray-300">Review program costs, calendars, cancellation and refund terms, institutional statements, and complaint information before enrolling.</p>
      <Link href="/academic-catalog/" className={catalogLinkClass}>Browse all academic catalogs</Link>
    </header>
    <nav aria-label="Program disclosures" className="rounded-2xl border border-gold-500/20 p-5 md:p-8">
      <ul className="space-y-3">{catalog.programs.map(program => <li key={program.slug}><a href={`#${program.slug}`} className={catalogLinkClass}>{program.name}</a></li>)}</ul>
    </nav>
    {catalog.programs.map(program => <CatalogSection key={program.slug} id={program.slug} title={program.name}>
      <ProgramFacts program={program} />
      <p>{program.codes}</p>
      <div className="flex flex-wrap items-center gap-5">
        <CatalogDownload program={program} />
        <Link href={`/programs/${program.slug}/`} className={catalogLinkClass}>Read the full program catalog</Link>
      </div>
      <div className="space-y-4 border-t border-white/10 pt-6"><h3 className="text-xl font-bold text-gold-200">Tuition, fees and other expenses</h3><TuitionAndFees program={program} /></div>
      <div className="space-y-4 border-t border-white/10 pt-6"><h3 className="text-xl font-bold text-gold-200">Institutional calendar</h3><InstitutionalCalendar program={program} /></div>
      <div className="space-y-4 border-t border-white/10 pt-6"><h3 className="text-xl font-bold text-gold-200">Cancellation and refund policy</h3><CancellationAndRefundPolicy /></div>
      <div className="space-y-4 border-t border-white/10 pt-6"><h3 className="text-xl font-bold text-gold-200">Accreditation, approval and transferability</h3><InstitutionalStatements /><TransferOfCredits /></div>
      <div className="space-y-4 border-t border-white/10 pt-6"><h3 className="text-xl font-bold text-gold-200">Complaints</h3><ComplaintInformation /></div>
    </CatalogSection>)}
    <CatalogSection id="contact" title="Contact Mentor Agile"><InstitutionContact /></CatalogSection>
  </CatalogLayout>;
}

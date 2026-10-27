import Link from 'next/link';
import catalog from '../../content/catalog/ibhe-r2.json';
import { CatalogLayout, CatalogSection, CatalogDownload, CancellationAndRefundPolicy, InstitutionalStatements, InstitutionContact, catalogLinkClass } from '../components/AcademicCatalog';

export const metadata = {
  title: 'Academic Catalog | All Three Programs | Mentor Agile',
  description: 'Program descriptions, tuition, fees, academic calendars, policies, and downloadable catalogs for Product Owner, Pharmacy Technician & EKG Technician, and Retail Software QA.',
  openGraph: { title: 'Academic Catalog | Mentor Agile', description: 'Tuition, curriculum, policies, and downloadable catalogs for all three Mentor Agile programs.', url: '/academic-catalog/' },
  alternates: { canonical: '/academic-catalog/' },
};

export default function AcademicCatalogPage() {
  return <CatalogLayout>
    <header className="max-w-4xl space-y-5">
      <p className="uppercase tracking-widest font-semibold text-gold-300">Mentor Agile · Student information</p>
      <h1 className="text-4xl md:text-6xl font-black">Academic Catalog</h1>
      <p className="text-lg text-gray-300">Explore all three programs. Each program page includes its curriculum, admissions requirements, institutional calendar, tuition, fees, refund policy, and certification information.</p>
      <Link href="/institutional-disclosure/" className={catalogLinkClass}>Read institutional disclosures for all programs</Link>
    </header>
    <div className="grid lg:grid-cols-3 gap-6">
      {catalog.programs.map(program => <section key={program.slug} aria-labelledby={`${program.slug}-title`} className="flex flex-col rounded-2xl border border-gold-500/25 bg-gray-950 p-6 space-y-5">
        <h2 id={`${program.slug}-title`} className="text-2xl font-bold text-gold-200">{program.name}</h2>
        <dl className="space-y-4 text-gray-200">
          <div><dt className="text-sm text-gray-400">Program length</dt><dd>{program.length}</dd></div>
          <div><dt className="text-sm text-gray-400">Instruction</dt><dd>{program.instruction}</dd></div>
          <div><dt className="text-sm text-gray-400">Tuition</dt><dd className="text-3xl font-bold text-white">{program.tuition}</dd></div>
        </dl>
        <div className="!mt-auto pt-5 space-y-5">
          <Link href={`/programs/${program.slug}/`} className={`block ${catalogLinkClass}`}>View program and policies<span className="sr-only">: {program.name}</span></Link>
          <CatalogDownload program={program} />
        </div>
      </section>)}
    </div>
    <CatalogSection id="fees" title="Fees and other charges"><p>{catalog.fees}</p></CatalogSection>
    <CatalogSection id="refunds" title="Cancellation and refund policy"><CancellationAndRefundPolicy /></CatalogSection>
    <CatalogSection id="institutional-statements" title="Accreditation, approval and transferability"><InstitutionalStatements /></CatalogSection>
    <CatalogSection id="contact" title="Contact Mentor Agile"><InstitutionContact /></CatalogSection>
  </CatalogLayout>;
}

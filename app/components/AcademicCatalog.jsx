import Link from 'next/link';
import NavigationHeader from '../course-landing/components/NavigationHeader';
import SocialFooter from '../course-landing/components/SocialFooter';
import catalog from '../../content/catalog/ibhe-r2.json';

export const catalogLinkClass = 'text-gold-200 underline underline-offset-4 hover:text-white';

export function CatalogLayout({ children }) {
  return <div className="min-h-screen bg-black text-white">
    <NavigationHeader />
    <main className="max-w-6xl mx-auto px-5 md:px-8 pt-20 md:pt-32 pb-20 space-y-10 leading-relaxed">
      {children}
    </main>
    <SocialFooter />
  </div>;
}

export function CatalogSection({ id, title, children }) {
  return <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-28 rounded-2xl border border-gold-500/20 bg-gray-950 p-5 md:p-8 space-y-5">
    <h2 id={`${id}-title`} className="text-2xl md:text-3xl font-bold text-gold-300">{title}</h2>
    <div className="space-y-4 text-gray-200">{children}</div>
  </section>;
}

export function CatalogDownload({ program }) {
  return <a href={program.pdf} download className="inline-block rounded-xl bg-gold-400 px-5 py-3 font-semibold text-black hover:bg-gold-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-300">
    Download catalog (PDF)<span className="sr-only">: {program.name}</span>
  </a>;
}

export function InstitutionalStatements() {
  return <div className="space-y-4 text-gray-200">
    {catalog.statements.map(statement => <p key={statement}>{statement}</p>)}
  </div>;
}

export function ProgramFacts({ program }) {
  return <dl className="grid sm:grid-cols-3 gap-4">
    {[
      ['Tuition', program.tuition],
      ['Program length', program.length],
      ['Instruction', program.instruction],
    ].map(([label, value]) => <div key={label} className="rounded-xl border border-gold-500/20 bg-gold-500/5 p-5">
      <dt className="text-sm text-gray-300">{label}</dt>
      <dd className="mt-1 text-xl font-bold text-gold-200">{value}</dd>
    </div>)}
  </dl>;
}

export function InstitutionalCalendar({ program }) {
  return <div className="space-y-4">
    <p>Mentor Agile offers four intakes annually. The catalog publishes the following institutional cohort start and end dates. The instructional length for {program.name} is {program.length}.</p>
    <table className="w-full text-left text-sm">
      <caption className="sr-only">Institutional calendar for {program.name}</caption>
      <thead><tr>{['Cohort', 'Start date', 'End date'].map(label => <th key={label} scope="col" className="p-3 bg-gold-500/15 text-gold-200">{label}</th>)}</tr></thead>
      <tbody>{catalog.calendar.map(([cohort, start, end]) => <tr key={cohort} className="border-t border-white/10">
        <th scope="row" className="p-3 font-medium">{cohort}</th><td className="p-3">{start}</td><td className="p-3">{end}</td>
      </tr>)}</tbody>
    </table>
    <p>Each cohort follows the same curriculum and provides continuous engagement through live sessions, project work, and mentorship.</p>
  </div>;
}

export function TuitionAndFees({ program }) {
  return <div className="space-y-4">
    <p><strong className="text-white">Tuition: {program.tuition}.</strong> {program.tuitionIncludes}</p>
    <h3 className="text-xl font-semibold text-gold-200">Fees and other charges / expenses</h3>
    <p>{catalog.fees}</p>
    <h3 className="text-xl font-semibold text-gold-200">Tuition reduction</h3>
    <p>Tuition reductions are based on measurable, documented factors:</p>
    <ul className="list-disc pl-6 space-y-2">{catalog.tuitionReduction.map(item => <li key={item}>{item}</li>)}</ul>
  </div>;
}

export function CancellationAndRefundPolicy() {
  return <div className="space-y-4">
    <p>{catalog.refundIntroduction}</p>
    <ol className="list-decimal pl-6 space-y-4">
      {catalog.refundPolicy.map(item => <li key={item.title}>
        <strong className="text-white">{item.title}: </strong>{item.text}
        {item.items && <ul className="list-disc pl-6 mt-2 space-y-2">{item.items.map(text => <li key={text}>{text}</li>)}</ul>}
      </li>)}
    </ol>
    <p><a href="mailto:admissions@mentoragile.com" className={catalogLinkClass}>Email Admissions with a written refund request</a>.</p>
  </div>;
}

export function TransferOfCredits() {
  return <div className="space-y-4">
    <p>Mentor Agile is a professional school, not a degree-granting institution. Its professional certifications do not transfer as academic credits to traditional degree programs.</p>
    <p>Mentor Agile does not have formal articulation agreements or credit transfer arrangements with other academic institutions.</p>
  </div>;
}

export function ComplaintInformation() {
  return <div className="space-y-4">
    <p>Students are encouraged to resolve issues informally with their instructor or program coordinator. If an issue remains unresolved, submit a written complaint to the Mentor Agile administration. Formal grievances will be reviewed within 10 business days, with a response outlining the resolution.</p>
    <p>Students with unresolved concerns after the school grievance process may escalate their complaint to the Illinois Board of Higher Education (IBHE).</p>
    <p>COMPLAINTS AGAINST THIS SCHOOL MAY BE REGISTERED WITH THE BOARD OF HIGHER EDUCATION.</p>
    <address className="not-italic">
      Illinois Board of Higher Education<br />
      1 N. Old State Capitol Plaza, Suite 333, Springfield, IL 62701<br />
      <a href="tel:+12177822551" className={catalogLinkClass}>(217) 782-2551</a><br />
      <a href="https://www.ibhe.org" className={catalogLinkClass}>www.ibhe.org</a>
    </address>
    <p><Link href="/complaint-policy/" className={catalogLinkClass}>School complaint process</Link> · <a href="https://complaints.ibhe.org/" className={catalogLinkClass}>IBHE complaint system</a></p>
  </div>;
}

export function InstitutionContact() {
  return <address className="not-italic space-y-2 text-gray-200">
    <p>Mentor Agile · Admissions and Support Office</p>
    <p>2200 S Main St, Lombard, IL 60148</p>
    <p><a href="mailto:info@mentoragile.com" className={catalogLinkClass}>info@mentoragile.com</a> · <a href="tel:+16305213351" className={catalogLinkClass}>+1 630-521-3351</a></p>
    <p>Refund requests: <a href="mailto:admissions@mentoragile.com" className={catalogLinkClass}>admissions@mentoragile.com</a></p>
  </address>;
}

export function ProgramCatalogPage({ program }) {
  const contents = [
    ['description', 'Program description'], ['objectives', 'Program objectives'],
    ['structure', 'Length and weekly structure'], ['admissions', 'Admissions requirements'],
    ['calendar', 'Institutional calendar'], ['tuition', 'Tuition, fees and other expenses'],
    ['refunds', 'Cancellation and refund policy'], ['completion', 'Grading and completion'],
    ['certifications', 'Certification exams'], ['approval', 'Accreditation, approval and transfer of credits'],
    ['complaints', 'Complaints'], ['contact', 'Contact'],
  ];
  return <CatalogLayout>
    <header className="space-y-6">
      <nav aria-label="Catalog navigation" className="flex flex-wrap gap-x-6 gap-y-3 text-sm">
        <Link href="/academic-catalog/" className={catalogLinkClass}>Academic Catalog</Link>
        <Link href="/institutional-disclosure/" className={catalogLinkClass}>Institutional Disclosures</Link>
      </nav>
      <p className="uppercase tracking-widest font-semibold text-gold-300">Program catalog</p>
      <h1 className="max-w-4xl text-3xl sm:text-4xl md:text-5xl font-black leading-tight">{program.name}</h1>
      {program.note && <p className="text-gray-300">{program.note}</p>}
      <ProgramFacts program={program} />
      <p className="text-gray-300">{program.codes}</p>
      {program.implementationDate && <p className="text-gray-300">Date of implementation: {program.implementationDate}.</p>}
      <CatalogDownload program={program} />
    </header>
    <nav aria-label="Program catalog contents" className="rounded-2xl border border-gold-500/20 p-5 md:p-8">
      <h2 className="text-xl font-bold text-gold-300 mb-4">In this catalog</h2>
      <ul className="grid md:grid-cols-2 gap-3">{contents.map(([id, label]) => <li key={id}><a href={`#${id}`} className={catalogLinkClass}>{label}</a></li>)}</ul>
    </nav>
    <CatalogSection id="description" title="Program description">
      {program.description.map(text => <p key={text}>{text}</p>)}
    </CatalogSection>
    <CatalogSection id="objectives" title="Program objectives">
      <p>By the end of the course, students will:</p>
      <ol className="list-decimal pl-6 space-y-3">{program.objectives.map(text => <li key={text}>{text}</li>)}</ol>
    </CatalogSection>
    <CatalogSection id="structure" title="Program length and weekly structure">
      <p>{program.length} · {program.instruction}</p>
      {program.weeks.map(week => <div key={week.title} className="border-l-2 border-gold-500/40 pl-5 space-y-2">
        <h3 className="text-xl font-semibold text-gold-200">{week.title}</h3>
        <p>{week.text}</p>
        {week.details && <ul className="list-disc pl-6 space-y-2">{week.details.map(text => <li key={text}>{text}</li>)}</ul>}
      </div>)}
    </CatalogSection>
    <CatalogSection id="admissions" title="Admissions requirements">
      <ul className="list-disc pl-6 space-y-3">{catalog.admissions.map(text => <li key={text}>{text}</li>)}</ul>
      <p>Applicants must commit to {program.length} of live sessions, group projects, and self-paced learning modules.</p>
    </CatalogSection>
    <CatalogSection id="calendar" title="Institutional calendar"><InstitutionalCalendar program={program} /></CatalogSection>
    <CatalogSection id="tuition" title="Tuition and fees"><TuitionAndFees program={program} /></CatalogSection>
    <CatalogSection id="refunds" title="Cancellation and refund policy"><CancellationAndRefundPolicy /></CatalogSection>
    <CatalogSection id="completion" title="Grading and completion requirements">
      <p>To pass the course and receive a certificate of completion, students must meet all of these requirements:</p>
      <ul className="list-disc pl-6 space-y-3">{catalog.completion.map(text => <li key={text}>{text}</li>)}</ul>
    </CatalogSection>
    <CatalogSection id="certifications" title="Professional certifications and exam information">
      <ul className="list-disc pl-6 space-y-3">{program.certifications.map(text => <li key={text}>{text}</li>)}</ul>
      {program.examProcess.map(text => <p key={text}>{text}</p>)}
    </CatalogSection>
    <CatalogSection id="approval" title="Accreditation, approval and transfer of credits">
      <InstitutionalStatements />
      <TransferOfCredits />
    </CatalogSection>
    <CatalogSection id="complaints" title="Grievance and complaint information"><ComplaintInformation /></CatalogSection>
    <CatalogSection id="contact" title="Contact Mentor Agile"><InstitutionContact /></CatalogSection>
    <div className="flex flex-wrap items-center gap-6">
      <CatalogDownload program={program} />
      <Link href="/academic-catalog/" className={catalogLinkClass}>All academic catalogs</Link>
      <Link href="/institutional-disclosure/" className={catalogLinkClass}>Institutional Disclosures</Link>
    </div>
  </CatalogLayout>;
}

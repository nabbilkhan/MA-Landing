import NavigationHeader from '../course-landing/components/NavigationHeader';
import SocialFooter from '../course-landing/components/SocialFooter';
import StagingBanner from '../components/StagingBanner';
import data from '../../content/catalog/programs-round2.json';
import { ProgramSection } from './ProgramSection';
import RetailQaDraft, { RetailQaRow, RetailQaDisclosureRow } from './RetailQaDraft';

export const metadata = {
  title: 'Academic Catalog 2026–2027 | Mentor Agile',
  description: 'Mentor Agile academic catalog: program descriptions, objectives, lengths, calendars, tuition and fees, cancellation and refund policy, and institutional disclosures.',
  robots: { index: false, follow: false },
};

const box = 'border-l-4 border-gold-400 bg-gold-500/10 p-4 font-bold text-white';
const cell = 'p-3 align-top';

export default function AcademicCatalogPage() {
  const { institution: inst, statements: s, programs, refund } = data;
  return <div className="min-h-screen bg-black text-white overflow-x-hidden">
    <NavigationHeader />
    <StagingBanner />
    <main className="max-w-6xl mx-auto px-5 md:px-8 pt-24 pb-20 space-y-10">
      <header className="space-y-4 max-w-4xl">
        <p className="uppercase tracking-widest font-semibold text-gold-300">2026–2027</p>
        <h1 className="text-4xl md:text-6xl font-black">Mentor Agile <span className="text-gold-400">Academic Catalog</span></h1>
        <p className="text-gray-300">{inst.name} · {inst.address} · {inst.phone} · {inst.email} · {inst.web}</p>
      </header>

      <section id="approval" className="rounded-2xl border border-gold-500/20 p-5 md:p-8 space-y-4">
        <h2 className="text-2xl md:text-3xl font-bold text-gold-300">Approval, Accreditation and Transferability</h2>
        <p className={box}>{s.approval}</p>
        <p className={box}>{s.accreditation}</p>
        <p className={box}>{s.transferability}</p>
        <p className="text-gray-300">IBHE approval is authorization to operate. It is not institutional accreditation. Mentor Agile has no articulation or credit-transfer agreements with other institutions.</p>
        <p className="text-gray-300">COMPLAINTS AGAINST THIS SCHOOL MAY BE REGISTERED WITH THE BOARD OF HIGHER EDUCATION. Illinois Board of Higher Education, Division of Private Business and Vocational Schools, 1 N. Old State Capitol Plaza, Suite 333, Springfield, IL 62701 · (217) 782-2551 · <a className="text-gold-200 underline" href="https://complaints.ibhe.org/">https://complaints.ibhe.org/</a></p>
      </section>

      <section id="programs" className="rounded-2xl border border-gold-500/20 p-5 md:p-8 space-y-4">
        <h2 className="text-2xl md:text-3xl font-bold text-gold-300">Programs offered</h2>
        <div className="overflow-x-auto rounded-xl border border-gold-500/30">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="bg-gold-500/15 text-gold-200"><tr>{['Program', 'Status', 'CIP', 'SOC', 'Clock hours', 'Length', 'Modality'].map(h => <th key={h} scope="col" className={cell}>{h}</th>)}</tr></thead>
            <tbody>
              {[programs.po, programs.pharm].map(p => <tr key={p.name} className="border-t border-white/10"><th scope="row" className={`${cell} font-normal text-gray-100`}>{p.name}</th><td className={cell}>{p.status}</td><td className={cell}>{p.cip}</td><td className={cell}>{p.soc}</td><td className={cell}>{p.clockHours}</td><td className={cell}>{p.length}</td><td className={cell}>{p.modality}</td></tr>)}
              <RetailQaRow />
            </tbody>
          </table>
        </div>
      </section>

      <ProgramSection id="product-owner" number={1} p={programs.po} />
      <ProgramSection id="pharmacy-ekg" number={2} p={programs.pharm} />
      <RetailQaDraft />

      <section id="refund" className="rounded-2xl border border-gold-500/20 p-5 md:p-8 space-y-4">
        <h2 className="text-2xl md:text-3xl font-bold text-gold-300">Cancellation and Refund Policy (all programs)</h2>
        <div className="overflow-x-auto rounded-xl border border-gold-500/30">
          <table className="w-full min-w-[480px] text-left text-sm">
            <thead className="bg-gold-500/15 text-gold-200"><tr><th scope="col" className={cell}>When the student cancels or withdraws</th><th scope="col" className={cell}>Refund</th></tr></thead>
            <tbody>{refund.rows.map(([w, r]) => <tr key={w} className="border-t border-white/10"><th scope="row" className={`${cell} font-normal text-gray-200`}>{w}</th><td className={cell}>{r}</td></tr>)}</tbody>
          </table>
        </div>
        <ul className="list-disc pl-5 space-y-2 text-gray-300">{refund.notes.map(n => <li key={n}>{n}</li>)}</ul>
      </section>

      <section id="disclosures" className="rounded-2xl border border-gold-500/20 p-5 md:p-8 space-y-4">
        <h2 className="text-2xl md:text-3xl font-bold text-gold-300">Institutional Disclosures (all programs)</h2>
        <div className="overflow-x-auto rounded-xl border border-gold-500/30">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="bg-gold-500/15 text-gold-200"><tr>{['Program', 'Reporting period', 'Disclosure'].map(h => <th key={h} scope="col" className={cell}>{h}</th>)}</tr></thead>
            <tbody>
              <tr className="border-t border-white/10"><th scope="row" className={`${cell} font-normal text-gray-100`}>{programs.po.name}</th><td className={cell}>PY2025 (Jul 1, 2025–Jun 30, 2026) and PY2024</td><td className={cell}>As posted at <a className="text-gold-200 underline" href="/institutional-disclosure/">mentoragile.com/institutional-disclosure</a> (80 students, 68 exits, 85% reported rates for PY2025; 3 students for PY2024)</td></tr>
              <tr className="border-t border-white/10"><th scope="row" className={`${cell} font-normal text-gray-100`}>{programs.pharm.name}</th><td className={cell}>Since approval (Apr 1, 2026)</td><td className={cell}>[NEEDS: counts, or &quot;no students enrolled as of [date]&quot;]</td></tr>
              <RetailQaDisclosureRow />
            </tbody>
          </table>
        </div>
        <p className="text-gray-300">{data.disclosureNote}</p>
      </section>
    </main>
    <SocialFooter />
  </div>;
}

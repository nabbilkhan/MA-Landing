import data from '../../content/catalog/programs-round2.json';

const cell = 'p-3 md:p-4 align-top';

export default function ProgramFacts({ programKey, className = '' }) {
  const p = data.programs[programKey];
  if (!p) return null;
  return (
    <section id="tuition-and-fees" aria-labelledby={`facts-${programKey}`} className={`relative z-10 px-6 py-20 ${className}`}>
      <div className="max-w-5xl mx-auto space-y-8 text-left">
        <div className="space-y-3">
          <p className="uppercase tracking-widest text-sm font-semibold text-gold-300">Program description, tuition and fees</p>
          <h2 id={`facts-${programKey}`} className="text-3xl md:text-4xl font-black text-white">{p.name}</h2>
          <p className="text-gray-300 text-lg leading-relaxed">{p.description}</p>
          <p className="text-gray-400 text-sm">{p.status} · {p.clockHours} clock hours · {p.length} · {p.modality}</p>
        </div>
        <div className="overflow-x-auto rounded-xl border border-gold-500/30">
          <table className="w-full min-w-[480px] text-left text-sm md:text-base">
            <caption className="sr-only">Tuition and fees: {p.name}</caption>
            <thead className="bg-gold-500/15 text-gold-200"><tr><th scope="col" className={cell}>Charge</th><th scope="col" className={cell}>Amount</th></tr></thead>
            <tbody>{p.fees.map(([label, amount]) => (
              <tr key={label} className="border-t border-white/10"><th scope="row" className={`${cell} font-normal text-gray-200`}>{label}</th><td className={`${cell} text-white`}>{amount}</td></tr>
            ))}</tbody>
          </table>
        </div>
        <div className="space-y-2 text-sm text-gray-300">
          <p><span className="font-semibold text-gold-200">Cancellation and refunds:</span> {data.refund.rows.map(([w, r]) => `${w}: ${r}`).join(' · ')}. See the catalog for the full policy.</p>
          <p>{data.statements.approval}</p>
          <p>{data.statements.accreditation}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <a href="/academic-catalog/" className="rounded-xl bg-gold-500 text-black font-semibold px-5 py-3">Read the academic catalog</a>
          <a href="/institutional-disclosure/" className="rounded-xl border border-gold-400 text-gold-200 font-semibold px-5 py-3">View institutional disclosures</a>
        </div>
      </div>
    </section>
  );
}

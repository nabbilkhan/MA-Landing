const cell = 'p-3 align-top';

export function ProgramSection({ id, number, p, notice, calendarCaption = 'Institutional calendar (cohort start and end dates)' }) {
  return (
    <section id={id} className="rounded-2xl border border-gold-500/20 p-5 md:p-8 space-y-5">
      <h2 className="text-2xl md:text-3xl font-bold text-gold-300">Program {number}: {p.name}</h2>
      {notice && <p className="border border-amber-400 p-3 text-amber-200">{notice}</p>}
      <p className="text-gray-400 text-sm">{p.clockHours} clock hours · {p.length} · {p.modality} · CIP {p.cip} · SOC {p.soc}</p>
      <div><h3 className="font-bold text-white mb-2">Description</h3><p className="text-gray-300">{p.description}</p></div>
      <div><h3 className="font-bold text-white mb-2">Objectives</h3><ul className="list-disc pl-5 space-y-1 text-gray-300">{p.objectives.map(o => <li key={o}>{o}</li>)}</ul></div>
      {p.sequence && <div><h3 className="font-bold text-white mb-2">Sequence</h3><p className="text-gray-300">{p.sequence}</p></div>}
      <div><h3 className="font-bold text-white mb-2">Admission requirements</h3><p className="text-gray-300">{p.admission}</p></div>
      <div>
        <h3 className="font-bold text-white mb-2">{calendarCaption}</h3>
        <div className="overflow-x-auto rounded-xl border border-gold-500/30">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="bg-gold-500/15 text-gold-200"><tr>{['Cohort', 'Start date', 'End date', 'Live session days and times (CT)', 'Holidays / no-class dates'].map(h => <th key={h} scope="col" className={cell}>{h}</th>)}</tr></thead>
            <tbody>{p.calendar.map((row, i) => <tr key={i} className="border-t border-white/10">{row.map((c, j) => <td key={j} className={`${cell} text-gray-200`}>{c}</td>)}</tr>)}</tbody>
          </table>
        </div>
      </div>
      <div>
        <h3 className="font-bold text-white mb-2">Tuition, fees and all other charges</h3>
        <div className="overflow-x-auto rounded-xl border border-gold-500/30">
          <table className="w-full min-w-[480px] text-left text-sm">
            <thead className="bg-gold-500/15 text-gold-200"><tr><th scope="col" className={cell}>Charge</th><th scope="col" className={cell}>Amount</th></tr></thead>
            <tbody>{p.fees.map(([l, a]) => <tr key={l} className="border-t border-white/10"><th scope="row" className={`${cell} font-normal text-gray-200`}>{l}</th><td className={`${cell} text-white`}>{a}</td></tr>)}</tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

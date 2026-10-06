import performance from '../../content/catalog/performance.json';

export default function ProgramPerformance() {
  return (
    <section aria-labelledby="performance-heading" className="space-y-6">
      <div>
        <h2 id="performance-heading" className="text-2xl md:text-3xl font-bold text-gold-300">Reported program performance</h2>
        <p className="mt-3 text-gray-300">{performance.program}. Reporting periods and measures are shown as supplied in the 2026–2027 catalog.</p>
      </div>
      <div className="overflow-x-auto rounded-xl border border-gold-500/30" role="region" aria-label="Program performance table" tabIndex={0}>
        <table className="w-full min-w-[580px] text-left text-sm">
          <caption className="sr-only">Program performance for July 2025–June 2026 and July 2024–June 2025</caption>
          <thead className="bg-gold-500/15 text-gold-200">
            <tr><th scope="col" className="p-4">Measure</th>{performance.periods.map(period => <th key={period.label} scope="col" className="p-4">{period.label}<span className="block mt-1 font-normal text-xs">{period.dates}</span></th>)}</tr>
          </thead>
          <tbody>{performance.rows.map(row => <tr key={row.label} className="border-t border-white/10"><th scope="row" className="p-4 font-normal text-gray-200">{row.label}</th>{row.values.map((value, index) => <td key={index} className="p-4 text-white">{value}</td>)}</tr>)}</tbody>
        </table>
      </div>
      <ul className="space-y-3 text-sm text-gray-300 list-disc pl-5">{performance.notes.map(note => <li key={note}>{note}</li>)}</ul>
      <p className="text-sm text-gray-400">Source: {performance.source}.</p>
    </section>
  );
}

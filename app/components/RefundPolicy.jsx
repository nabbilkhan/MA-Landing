import financial from '../../content/catalog/financial.json';

export default function RefundPolicy() {
  return <div className="space-y-4 text-gray-300 mb-6">
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <caption className="sr-only">Product Owner public VIP tuition refund schedule</caption>
        <thead><tr><th scope="col" className="p-3 bg-gold-500/15 text-gold-200">Withdrawal timing</th><th scope="col" className="p-3 bg-gold-500/15 text-gold-200">Tuition refund</th></tr></thead>
        <tbody>{financial.refundRows.map(([timing, refund]) => <tr key={timing} className="border-t border-white/10"><th scope="row" className="p-3 font-normal">{timing}</th><td className="p-3">{refund}</td></tr>)}</tbody>
      </table>
    </div>
    {financial.refundNotes.map(note => <p key={note} className="leading-relaxed">{note}</p>)}
    <p><a href="/student-catalog/#refunds" className="text-gold-300 underline underline-offset-4">Read the complete catalog tuition terms</a>.</p>
  </div>;
}

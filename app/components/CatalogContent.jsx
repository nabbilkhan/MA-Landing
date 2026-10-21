import catalog from '../../content/catalog/catalog.json';
import ProgramPerformance from './ProgramPerformance';

// Main-site view omits pricing: tuition and refund sections, and any block that states charges.
const PRICE_RX = /\$\s?\d|\btuition\b|\bcosts?\b|\bpric(e|es|ing)\b|payment[\s-]plans?|install?ments?|per[\s-]credit|\bfees?\b|charges/i;
const HIDDEN_SECTIONS = new Set(['tuition', 'refunds']);
const clean = block => {
  if (block.type === 'list') { const items = block.items.filter(i => !PRICE_RX.test(i)); return items.length ? { ...block, items } : null; }
  if (block.type === 'table') { const rows = block.rows.filter(r => !r.some(c => PRICE_RX.test(String(c)))); return rows.length && !block.head.some(h => PRICE_RX.test(h)) ? { ...block, rows } : null; }
  return PRICE_RX.test(block.text || '') ? null : block;
};
const sections = catalog.sections.filter(s => !HIDDEN_SECTIONS.has(s.id)).map(s => ({ ...s, blocks: (s.blocks || []).map(clean).filter(Boolean) })).filter(s => !PRICE_RX.test(s.title));

function Block({ block }) {
  if (block.type === 'h') return <h3 className="text-xl font-bold text-gold-200 mt-7">{block.text}</h3>;
  if (block.type === 'list') return <ul className="list-disc pl-6 space-y-2 text-gray-200">{block.items.map(item => <li key={item}>{item}</li>)}</ul>;
  if (block.type === 'note') return <p className="p-5 rounded-xl border border-gold-500/30 bg-gold-500/10 text-gray-100 leading-relaxed">{block.text}</p>;
  if (block.type === 'table') return <div className="overflow-x-auto" role="region" aria-label="Catalog table" tabIndex={0}><table className="w-full min-w-[480px] text-left text-sm"><thead><tr>{block.head.map(h => <th scope="col" key={h} className="p-3 bg-gold-500/15 text-gold-200">{h}</th>)}</tr></thead><tbody>{block.rows.map((row, index) => <tr key={index} className="border-t border-white/10">{row.map((cell, i) => i === 0 ? <th scope="row" key={i} className="p-3 text-gray-100 font-medium">{cell}</th> : <td key={i} className="p-3 text-gray-200">{cell}</td>)}</tr>)}</tbody></table></div>;
  return <p className="text-gray-200 leading-relaxed whitespace-pre-line">{block.text}</p>;
}

export default function CatalogContent() {
  return <div className="space-y-8">
    <nav aria-label="Catalog contents" className="rounded-2xl border border-gold-500/20 p-6">
      <h2 className="text-2xl font-bold text-gold-300 mb-4">Read the catalog online</h2>
      <ol className="grid md:grid-cols-2 gap-x-8 gap-y-3 list-decimal pl-5">{sections.map(s => <li key={s.id}><a className="text-gold-200 underline underline-offset-4" href={`#${s.id}`}>{s.title}</a></li>)}</ol>
    </nav>
    {sections.map(section => <section key={section.id} id={section.id} className="scroll-mt-28 rounded-2xl border border-gold-500/20 bg-gray-950 p-6 md:p-9 space-y-4" aria-labelledby={section.id === 'performance' ? 'performance-heading' : `${section.id}-title`}>
      {section.id === 'performance' ? <ProgramPerformance /> : <><h2 id={`${section.id}-title`} className="text-2xl md:text-3xl font-bold text-gold-300">{section.title}</h2><p className="text-gray-400">{section.subtitle}</p>{section.blocks.map((block, index) => <Block key={index} block={block} />)}</>}
    </section>)}
  </div>;
}

// Retail QA is NOT IBHE-approved (NPS10872 pending). Only rendered on staging builds
// with NEXT_PUBLIC_IBHE_STAGING_RETAIL_QA=1. Never link publicly.
import draft from '../../content/catalog/retailqa-draft.json';
import { ProgramSection } from './ProgramSection';

export const SHOW_RETAIL_QA = process.env.NEXT_PUBLIC_IBHE_STAGING_RETAIL_QA === '1';

export function RetailQaRow() {
  if (!SHOW_RETAIL_QA) return null;
  const p = draft.program;
  return <tr className="border-t border-white/10 bg-amber-500/10"><th scope="row" className="p-3 font-normal text-gray-100">{p.name}</th><td className="p-3 font-bold text-amber-200">{p.status}</td><td className="p-3">{p.cip}</td><td className="p-3">{p.soc}</td><td className="p-3">{p.clockHours}</td><td className="p-3">{p.length}</td><td className="p-3">{p.modality}</td></tr>;
}

export function RetailQaDisclosureRow() {
  if (!SHOW_RETAIL_QA) return null;
  const p = draft.program;
  return <tr className="border-t border-white/10 bg-amber-500/10"><th scope="row" className="p-3 font-normal text-gray-100">{p.shortName} (proposed)</th><td className="p-3">n/a</td><td className="p-3">{p.disclosure}</td></tr>;
}

export default function RetailQaDraft() {
  if (!SHOW_RETAIL_QA) return null;
  const p = draft.program;
  return (
    <div className="border-2 border-dashed border-amber-400 rounded-2xl p-1">
      <p className="text-amber-200 font-bold px-5 pt-4">PRIVATE STAGING ONLY. Proposed program, not approved. This section is excluded from production builds.</p>
      <ProgramSection id="retail-qa" number={3} p={{ ...p, name: `${p.name} (PROPOSED, pending IBHE approval)` }} notice={p.notice} calendarCaption="Proposed calendar (subject to IBHE approval)" />
    </div>
  );
}

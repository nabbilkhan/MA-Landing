import Link from 'next/link';

export default function AcademicLinks({ className = 'text-gold-200' }) {
  return <nav aria-label="Academic resources" className={`flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm ${className}`}>
    <Link href="/academic-catalog/" className="underline underline-offset-4">Academic Catalog</Link>
    <Link href="/institutional-disclosure/" className="underline underline-offset-4">Disclosures</Link>
  </nav>;
}

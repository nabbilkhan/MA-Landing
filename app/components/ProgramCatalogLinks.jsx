import Link from 'next/link';

export default function ProgramCatalogLinks({ healthcare = false }) {
  return <section aria-label="Academic program information" className="relative z-10 mx-auto max-w-6xl px-5 py-10 text-gray-200">
    <div className="rounded-2xl border border-gold-500/30 bg-gray-950 p-6 space-y-4">
      <h2 className="text-2xl font-bold text-gold-300">Program catalogs and enrollment policies</h2>
      <p>Read the curriculum, calendar, and policies for your program. Illinois students: <a href="https://il.mentoragile.com/" className="text-gold-200 underline underline-offset-4">il.mentoragile.com</a>.</p>
      <div className="flex flex-wrap gap-x-6 gap-y-3">
        {healthcare ? <Link href="/programs/pharmacy-technician-ekg/" className="text-gold-200 underline underline-offset-4">Pharmacy Technician &amp; EKG Technician catalog</Link> : <>
          <Link href="/programs/product-owner-product-manager/" className="text-gold-200 underline underline-offset-4">Product Owner/Product Manager catalog</Link>
          <Link href="/programs/retail-software-qa/" className="text-gold-200 underline underline-offset-4">Retail Software QA catalog</Link>
        </>}
        <Link href="/academic-catalog/" className="text-gold-200 underline underline-offset-4">All academic catalogs</Link>
      </div>
    </div>
  </section>;
}

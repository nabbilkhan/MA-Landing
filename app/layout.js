import './globals.css'

export const metadata = {
  metadataBase: new URL('https://mentoragile.com'),
  title: 'Mentor Agile - Transform Your Career in 12 Weeks',
  description: 'IBHE Approved Product Owner training with AI certifications. No coding required. Practical projects and career preparation.',
  keywords: 'Product Owner, CSPO, AI certifications, career transformation, WIOA approved, Illinois training',
  openGraph: {
    title: 'Mentor Agile - Transform Your Career in 12 Weeks',
    description: 'IBHE Approved Product Owner training with AI certifications',
    url: 'https://mentoragile.com',
    siteName: 'Mentor Agile',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
}

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Mentor Agile',
  legalName: 'Khan Holdings LLC',
  url: 'https://mentoragile.com',
  description: 'Mentor Agile is a DBA of Khan Holdings LLC',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        {children}
      </body>
    </html>
  )
}
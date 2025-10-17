import './globals.css'

export const metadata = {
  title: 'Mentor Agile - Transform Your Career in 12 Weeks',
  description: 'IBHE Approved Product Owner training with AI certifications. No coding required. Career transformation guaranteed.',
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

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}
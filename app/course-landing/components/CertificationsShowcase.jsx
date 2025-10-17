'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const certifications = [
  {
    id: 'scrum-alliance',
    name: 'Scrum Alliance',
    description: 'Certified Scrum Training Partner',
    icon: '🎯',
    color: 'from-blue-500 to-cyan-500',
    badge: 'CSM • CSPO • CSD',
    logo: '/images/logos/scrum-alliance.png',
    href: 'https://www.scrumalliance.org/get-certified/product-owner-track/certified-scrum-product-owner',
    logoWidth: 200,
    logoHeight: 200,
    logoBg: 'bg-white' // White background for Scrum Alliance logo
  },
  {
    id: 'comptia',
    name: 'CompTIA',
    description: 'Authorized Training Partner',
    icon: '💻',
    color: 'from-red-500 to-orange-500',
    badge: 'A+ • Network+ • Security+',
    logo: '/images/logos/comptia-partner.webp',
    href: 'https://www.comptia.org/en-us/certifications/#ai',
    logoWidth: 200,
    logoHeight: 200,
    logoBg: 'bg-transparent' // Transparent background for CompTIA
  },
  {
    id: 'ibhe',
    name: 'IBHE Certified',
    description: 'Illinois Board of Higher Education',
    icon: '🏛️',
    color: 'from-gold-500 to-amber-500',
    badge: 'State Approved Provider',
    logo: '/images/logos/ibhe.png',
    href: 'https://www.ibhe.org/pbvsAppProgs.aspx?id=1374',
    logoWidth: 200,
    logoHeight: 200,
    logoBg: 'bg-white' // White background for IBHE logo
  }
]

export default function CertificationsShowcase() {
  return (
    <section className="relative py-20 sm:py-28 overflow-hidden">
      {/* Glassmorphic Background */}
      <div className="absolute inset-0 bg-gray-900/10 backdrop-blur-md"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(218,165,32,0.1),transparent_70%)]"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center mb-16 space-y-4" data-aos="fade-up">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight">
            Industry-Recognized
            <span className="block mt-2 bg-gradient-to-r from-gold-400 via-gold-500 to-amber-500 bg-clip-text text-transparent">
              Certifications
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto">
            Training programs approved and certified by leading industry organizations
          </p>
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {certifications.map((cert, index) => (
            <CertificationCard key={cert.id} cert={cert} index={index} />
          ))}
        </div>

        {/* Trust Statement */}
        <div className="mt-16 text-center" data-aos="fade-up" data-aos-delay="400">
          <div className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-gray-800/80 to-gray-700/80 backdrop-blur-sm border border-gray-600/30 shadow-2xl">
            <div className="flex -space-x-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold text-sm border-2 border-gray-900">
                <span>🎯</span>
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center text-white font-bold text-sm border-2 border-gray-900">
                <span>💻</span>
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold-500 to-amber-500 flex items-center justify-center text-white font-bold text-sm border-2 border-gray-900">
                <span>🏛️</span>
              </div>
            </div>
            <span className="text-base sm:text-lg font-bold text-white">
              Trusted by 1000+ Students Nationwide
            </span>
          </div>
        </div>

      </div>
    </section>
  )
}

function CertificationCard({ cert, index }) {
  const cardRef = useRef(null)

  return (
    <div
      ref={cardRef}
      className="group relative"
      data-aos="fade-up"
      data-aos-delay={index * 100}
    >
      {/* 3D Card Container */}
      <div className="relative h-full transform transition-all duration-500 hover:-translate-y-2" style={{ perspective: '1000px' }}>

        {/* Card Background with Neumorphic Effect */}
        <div className="relative h-full p-8 rounded-3xl bg-gradient-to-br from-gray-800/20 to-gray-900/30 border border-gray-700/50 shadow-2xl overflow-hidden backdrop-blur-lg">

          {/* Gradient Glow Effect */}
          <div className={`absolute inset-0 bg-gradient-to-br ${cert.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500`}></div>

          {/* Top Color Bar */}
          <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${cert.color}`}></div>

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center text-center space-y-6 h-full">

            {/* Logo Container */}
            <div className={`relative w-48 h-48 rounded-2xl ${cert.logoBg} p-6 flex items-center justify-center shadow-2xl transform transition-transform duration-500 group-hover:scale-110`}>
              <Image
                src={cert.logo}
                alt={`${cert.name} certification logo`}
                width={cert.logoWidth}
                height={cert.logoHeight}
                className="object-contain"
                priority
              />
            </div>

            {/* Certification Name */}
            <div className="space-y-2">
              <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                {cert.name}
              </h3>
              <p className="text-sm sm:text-base text-gray-200 font-semibold">
                {cert.description}
              </p>
            </div>

            {/* Badge */}
            <div className={`px-4 py-2 rounded-full bg-gradient-to-r ${cert.color} bg-opacity-10 border border-gray-600/30`}>
              <span className="text-xs sm:text-sm font-bold text-gray-300">
                {cert.badge}
              </span>
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent"></div>

            {/* Features List */}
            <ul className="space-y-2 text-left w-full">
              <li className="flex items-center gap-2 text-sm text-gray-300">
                <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Industry-recognized credentials</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-300">
                <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Expert-led training programs</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-300">
                <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Career advancement support</span>
              </li>
            </ul>

            {/* Hover CTA */}
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 pt-4 w-full">
              <Link
                href={cert.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`block w-full px-6 py-3 rounded-xl bg-gradient-to-r ${cert.color} font-bold text-white text-center shadow-lg transform transition-transform duration-300 hover:scale-105 active:scale-95`}
              >
                Learn More
              </Link>
            </div>

          </div>

          {/* Corner Accent */}
          <div className="absolute bottom-0 right-0 w-32 h-32 opacity-10">
            <div className={`absolute inset-0 bg-gradient-to-tl ${cert.color} rounded-tl-full`}></div>
          </div>

        </div>

        {/* Shadow Layer for 3D Effect */}
        <div className="absolute inset-0 -z-10 rounded-3xl bg-gradient-to-br from-gray-700 to-gray-900 blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500 transform translate-y-4"></div>

      </div>
    </div>
  )
}

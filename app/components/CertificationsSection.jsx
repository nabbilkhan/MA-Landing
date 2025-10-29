'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Award, CheckCircle2, Star, Sparkles, Bot, Brain } from 'lucide-react'
import Image from 'next/image'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const certifications = [
  {
    name: 'Scrum Alliance CSPO®',
    provider: 'Scrum Alliance',
    logo: '/images/logos/scrum-alliance.png',
    icon: Award,
    description: 'Industry-leading Product Owner certification recognized globally',
    features: [
      'Official CSPO® certification preparation',
      'Live training with certified instructors',
      'Globally recognized credential',
      'Lifetime Scrum Alliance membership'
    ],
    isPrimary: true,
    color: 'gold'
  },
  {
    name: 'AI Product Management',
    provider: 'Mentor Agile',
    icon: Brain,
    description: 'Master AI tools and strategies for modern Product Owners',
    features: [
      'AI-powered product development',
      'Automation and efficiency tools',
      'ChatGPT & AI prompting for PMs',
      'Data-driven decision making'
    ],
    isPrimary: false,
    color: 'purple',
    badge: 'AI Certified'
  },
  {
    name: 'AI Essentials for Leaders',
    provider: 'Mentor Agile',
    icon: Sparkles,
    description: 'Leverage cutting-edge AI to 10x your productivity and impact',
    features: [
      'AI strategy and implementation',
      'Leading AI-powered teams',
      'Ethical AI frameworks',
      'Future-ready leadership skills'
    ],
    isPrimary: false,
    color: 'blue',
    badge: 'AI Ready'
  }
]

export default function CertificationsSection({ compact = false }) {
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const cardsRef = useRef([])

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      // Animate header
      gsap.from(headerRef.current, {
        scrollTrigger: {
          trigger: headerRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
      })

      // Animate certification cards with stagger
      cardsRef.current.forEach((card, index) => {
        if (card) {
          gsap.from(card, {
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            },
            y: 80,
            opacity: 0,
            scale: 0.9,
            duration: 0.7,
            delay: index * 0.2,
            ease: 'back.out(1.4)'
          })
        }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="certifications"
      className="relative py-16 md:py-24 overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-black to-gray-900"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gold-500/10 via-transparent to-transparent"></div>

      {/* Animated Grid Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(212, 175, 55, 0.1) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(212, 175, 55, 0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}
        ></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div ref={headerRef} className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 bg-gold-500/10 border border-gold-500/30 rounded-full px-4 py-2 mb-6">
            <Award className="w-4 h-4 text-gold-400" />
            <span className="text-sm font-bold text-gold-400 uppercase tracking-wider">
              Industry Certifications
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 md:mb-6">
            Earn Recognized
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-gold-400 via-gold-300 to-gold-500">
              Certifications
            </span>
          </h2>

          <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Get certified with industry-recognized credentials that validate your
            expertise and accelerate your career growth.
          </p>
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {certifications.map((cert, index) => {
            const Icon = cert.icon
            const isPrimary = cert.isPrimary

            return (
              <div
                key={index}
                ref={(el) => (cardsRef.current[index] = el)}
                className={`relative backdrop-blur-xl rounded-3xl p-6 md:p-8 transition-all duration-500 hover:scale-105 group cursor-pointer ${
                  isPrimary
                    ? 'bg-gradient-to-br from-gold-500/20 to-gold-600/10 border-4 border-gold-500/60 hover:border-gold-400 shadow-2xl'
                    : 'bg-gradient-to-br from-gray-800/50 to-gray-900/50 border-2 border-gray-700/50 hover:border-gold-500/50'
                }`}
              >
                {/* Primary Badge */}
                {isPrimary && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-gold-500 to-gold-600 text-black px-6 py-2 rounded-full font-black text-sm shadow-lg flex items-center gap-2">
                    <Star className="w-4 h-4" />
                    PRIMARY CERTIFICATION
                  </div>
                )}

                {/* AI Badge */}
                {cert.badge && (
                  <div className="absolute -top-3 -right-3 bg-gradient-to-r from-purple-500 to-blue-600 text-white px-4 py-1.5 rounded-full font-bold text-xs shadow-lg flex items-center gap-1">
                    <Bot className="w-3 h-3" />
                    {cert.badge}
                  </div>
                )}

                {/* Glow Effect */}
                <div
                  className={`absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
                    isPrimary
                      ? 'bg-gradient-to-br from-gold-500/20 to-gold-600/10'
                      : 'bg-gradient-to-br from-gold-500/10 to-gold-600/5'
                  }`}
                ></div>

                <div className="relative">
                  {/* Icon or Logo */}
                  <div className="mb-6">
                    {cert.logo ? (
                      <div className="relative w-20 h-20 mx-auto mb-4">
                        <div className="absolute inset-0 bg-white rounded-xl"></div>
                        <div className="relative w-full h-full p-2">
                          <Image
                            src={cert.logo}
                            alt={cert.provider}
                            fill
                            className="object-contain p-2"
                          />
                        </div>
                      </div>
                    ) : (
                      <div
                        className={`w-20 h-20 mx-auto rounded-xl flex items-center justify-center mb-4 ${
                          isPrimary
                            ? 'bg-gradient-to-br from-gold-500 to-gold-600'
                            : 'bg-gradient-to-br from-purple-500 to-blue-600'
                        }`}
                      >
                        <Icon className="w-10 h-10 text-white" />
                      </div>
                    )}
                  </div>

                  {/* Provider */}
                  <p
                    className={`text-sm font-bold uppercase tracking-wider mb-2 text-center ${
                      isPrimary ? 'text-gold-400' : 'text-gray-400'
                    }`}
                  >
                    {cert.provider}
                  </p>

                  {/* Certification Name */}
                  <h3
                    className={`text-2xl font-black mb-4 text-center ${
                      isPrimary
                        ? 'text-gold-300'
                        : 'text-white group-hover:text-gold-400 transition-colors duration-300'
                    }`}
                  >
                    {cert.name}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-gray-400 text-center mb-6 leading-relaxed">
                    {cert.description}
                  </p>

                  {/* Features List */}
                  <ul className="space-y-3">
                    {cert.features.map((feature, fIndex) => (
                      <li key={fIndex} className="flex items-start gap-3">
                        <CheckCircle2
                          className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                            isPrimary ? 'text-gold-400' : 'text-gray-400 group-hover:text-gold-400'
                          } transition-colors duration-300`}
                        />
                        <span className="text-sm text-gray-300 leading-snug">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bottom Shine */}
                <div
                  className={`absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
                    isPrimary
                      ? 'via-gold-400'
                      : 'via-gold-500/50'
                  }`}
                ></div>
              </div>
            )
          })}
        </div>

        {/* Bottom Note */}
        {!compact && (
          <div className="mt-12 md:mt-16 max-w-3xl mx-auto">
            <div className="backdrop-blur-xl bg-gold-500/10 border border-gold-500/30 rounded-2xl p-6 md:p-8 text-center">
              <Award className="w-10 h-10 text-gold-400 mx-auto mb-4" />
              <p className="text-lg text-gray-300 leading-relaxed">
                <span className="font-bold text-gold-400">CSPO® certification</span> is
                included with the VIP program, plus guidance and prep for
                industry-recognized Product Owner credentials.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

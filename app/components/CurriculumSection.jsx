'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  BookOpen,
  Users,
  Target,
  Rocket,
  FileText,
  BarChart3,
  Calendar,
  MessageSquare,
  Sparkles,
  Clock,
  Smartphone,
  Award
} from 'lucide-react'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const curriculumModules = [
  {
    icon: BookOpen,
    title: 'Agile Principles',
    description: 'Master the foundational values and mindset that drive successful Agile teams',
    week: 'Week 1'
  },
  {
    icon: Users,
    title: 'Agile Ceremonies & Artifacts',
    description: 'Learn Sprint Planning, Daily Standups, Retrospectives, and key Agile artifacts',
    week: 'Week 2-3'
  },
  {
    icon: Target,
    title: 'Discovery & Validation',
    description: 'Identify customer needs, validate ideas, and build products people actually want',
    week: 'Week 4'
  },
  {
    icon: Rocket,
    title: 'MVP Development',
    description: 'Ship faster with Minimum Viable Products and iterative development strategies',
    week: 'Week 5'
  },
  {
    icon: FileText,
    title: 'User Stories, Requirements, & Technical Communication',
    description: 'Write clear user stories and communicate effectively with engineering teams',
    week: 'Week 6-7'
  },
  {
    icon: BarChart3,
    title: 'Product Backlog Management & Analytics',
    description: 'Prioritize features, manage your backlog, and make data-driven decisions',
    week: 'Week 8'
  },
  {
    icon: Calendar,
    title: 'Release Planning & Strategy',
    description: 'Plan releases, coordinate launches, and deliver value incrementally',
    week: 'Week 9-10'
  },
  {
    icon: MessageSquare,
    title: 'Stakeholder Management & Tech-Savvy Leadership',
    description: 'Navigate complex stakeholder relationships and lead with technical credibility',
    week: 'Week 11'
  },
  {
    icon: Sparkles,
    title: 'AI Essentials',
    description: 'Leverage AI tools and automation to 10x your productivity as a Product Owner',
    week: 'Week 12'
  }
]

const features = [
  {
    icon: Clock,
    title: 'Built for Busy Professionals',
    description: 'Study at your pace. Rewatch anytime. Mobile-friendly.',
    highlight: true
  },
  {
    icon: Award,
    title: 'Certification Support',
    description: 'Guidance and prep for industry-recognized Product Owner credentials.',
    highlight: true
  }
]

export default function CurriculumSection({ compact = false }) {
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const modulesRef = useRef([])
  const featuresRef = useRef([])
  const [isMounted, setIsMounted] = useState(false)

  // Client-side only rendering to avoid hydration errors
  useEffect(() => {
    setIsMounted(true)
  }, [])

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

      // Animate modules with stagger
      modulesRef.current.forEach((module, index) => {
        if (module) {
          gsap.from(module, {
            scrollTrigger: {
              trigger: module,
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            },
            y: 60,
            opacity: 0,
            duration: 0.6,
            delay: index * 0.1,
            ease: 'power3.out'
          })
        }
      })

      // Animate features
      featuresRef.current.forEach((feature, index) => {
        if (feature) {
          gsap.from(feature, {
            scrollTrigger: {
              trigger: feature,
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            },
            scale: 0.9,
            opacity: 0,
            duration: 0.6,
            delay: index * 0.15,
            ease: 'back.out(1.7)'
          })
        }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="curriculum"
      className="relative py-16 md:py-24 overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gold-500/5 via-transparent to-transparent"></div>

      {/* Floating Particles - Client-side only to avoid hydration errors */}
      {isMounted && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-gold-400/30 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${5 + Math.random() * 10}s`
              }}
            ></div>
          ))}
        </div>
      )}

      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div ref={headerRef} className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 bg-gold-500/10 border border-gold-500/30 rounded-full px-4 py-2 mb-6">
            <BookOpen className="w-4 h-4 text-gold-400" />
            <span className="text-sm font-bold text-gold-400 uppercase tracking-wider">
              12-Week Curriculum
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 md:mb-6">
            Complete Product Owner
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-gold-400 via-gold-300 to-gold-500">
              Training Program
            </span>
          </h2>

          <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Master every aspect of Product Ownership through bite-sized videos,
            hands-on worksheets, and real-world case studies.
          </p>
        </div>

        {/* Curriculum Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-16">
          {curriculumModules.map((module, index) => {
            const Icon = module.icon
            return (
              <div
                key={index}
                ref={(el) => (modulesRef.current[index] = el)}
                className="group relative backdrop-blur-xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gold-500/20 rounded-2xl p-6 md:p-8 hover:border-gold-500/50 transition-all duration-500 hover:scale-105 cursor-pointer"
              >
                {/* Week Badge */}
                <div className="absolute -top-3 -right-3 bg-gradient-to-r from-gold-500 to-gold-600 text-black px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                  {module.week}
                </div>

                {/* Glow Effect on Hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-gold-500/0 to-gold-500/0 group-hover:from-gold-500/10 group-hover:to-gold-600/5 rounded-2xl transition-all duration-500"></div>

                <div className="relative">
                  {/* Icon */}
                  <div className="w-14 h-14 bg-gradient-to-br from-gold-500/20 to-gold-600/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-7 h-7 text-gold-400" />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-gold-400 transition-colors duration-300">
                    {module.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-gray-400 leading-relaxed">
                    {module.description}
                  </p>
                </div>

                {/* Bottom Shine */}
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            )
          })}
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={index}
                ref={(el) => (featuresRef.current[index] = el)}
                className="relative backdrop-blur-xl bg-gradient-to-br from-gold-500/10 to-gold-600/5 border-2 border-gold-500/40 rounded-2xl p-6 md:p-8 hover:border-gold-400 transition-all duration-500 group cursor-pointer"
              >
                {/* Animated Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-gold-500/5 via-transparent to-gold-600/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="relative flex items-start gap-4">
                  {/* Icon */}
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-gold-500 to-gold-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <Icon className="w-6 h-6 text-black" />
                  </div>

                  <div className="flex-1">
                    {/* Title */}
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-gold-300 transition-colors duration-300">
                      {feature.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm md:text-base text-gray-300 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>

                {/* Corner Accent */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-gold-500/20 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            )
          })}
        </div>

        {/* Bottom Tagline */}
        {!compact && (
          <div className="text-center mt-12 md:mt-16">
            <p className="text-lg md:text-xl text-gold-300 font-semibold">
              On-demand access • Bite-sized videos • Hands-on worksheets • Mobile-friendly
            </p>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
            opacity: 0.3;
          }
          50% {
            transform: translateY(-20px);
            opacity: 0.6;
          }
        }

        .animate-float {
          animation: float ease-in-out infinite;
        }
      `}</style>
    </section>
  )
}

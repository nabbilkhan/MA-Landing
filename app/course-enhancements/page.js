'use client'

import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SocialFooter from '../course-landing/components/SocialFooter'
import {
  Sparkles,
  BookOpen,
  FileText,
  CheckSquare,
  ClipboardList,
  Map,
  Brain,
  Target,
  Shield,
  Lock,
  Award,
  Users,
  Building2,
  Clock,
  TrendingUp,
  Zap,
  Layers,
  Play,
  BarChart3,
  Trophy,
  Smartphone,
  Server,
  GraduationCap,
  CheckCircle2,
  ArrowRight,
  Star,
  Quote
} from 'lucide-react'


// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

// Transformation metrics data
const transformationMetrics = [
  { label: 'Video Lessons', before: 34, after: 42, suffix: '', highlight: '+8 AI Lessons' },
  { label: 'Modules', before: 6, after: 7, suffix: '', highlight: '+AI Essentials' },
  { label: 'Video Content', before: 4, after: 6, suffix: ' hrs', highlight: '+50%' },
  { label: 'Supplemental Docs', before: 0, after: 160, suffix: '+', highlight: 'NEW!' },
  { label: 'Learning Assets Increase', before: null, after: 500, suffix: '%+', highlight: 'PARADIGM SHIFT' },
]

// Document types data
const documentTypes = [
  {
    title: 'Quick Reference Cards',
    count: 42,
    purpose: 'Instant recall during real work',
    icon: FileText,
    color: 'from-gold-500 to-amber-500'
  },
  {
    title: 'Comprehensive Guides',
    count: '38+',
    purpose: 'Deep-dive mastery content',
    icon: BookOpen,
    color: 'from-blue-500 to-cyan-500'
  },
  {
    title: 'Templates & Worksheets',
    count: 42,
    purpose: 'Immediate practical application',
    icon: ClipboardList,
    color: 'from-emerald-500 to-green-500'
  },
  {
    title: 'Checklists',
    count: 42,
    purpose: 'Process verification & QA',
    icon: CheckSquare,
    color: 'from-purple-500 to-violet-500'
  },
  {
    title: 'Module READMEs',
    count: 7,
    purpose: 'Navigation & learning path guidance',
    icon: Map,
    color: 'from-pink-500 to-rose-500'
  },
]

// Module data
const modules = [
  { num: 1, title: 'Agile Principles', lessons: 6, docs: '24+', frameworks: 'Agile Manifesto, Digital Transformation', icon: Target },
  { num: 2, title: 'Ceremonies & Artifacts', lessons: 4, docs: '16+', frameworks: 'Scrum Framework, Sprint Mechanics', icon: Users },
  { num: 3, title: 'Discovery & Validation', lessons: 6, docs: '24+', frameworks: 'Opportunity Solution Trees, Experimentation', icon: Sparkles },
  { num: 4, title: 'MVP Development', lessons: 7, docs: '28+', frameworks: 'Lean Startup, Impact Mapping, Prototyping', icon: Zap },
  { num: 5, title: 'User Stories', lessons: 6, docs: '24+', frameworks: 'INVEST, Personas, MoSCoW Prioritization', icon: FileText },
  { num: 6, title: 'Backlog Management', lessons: 5, docs: '19+', frameworks: 'Story Mapping, Epic Decomposition', icon: Layers },
  { num: 7, title: 'AI Essentials', lessons: 8, docs: '27', frameworks: 'CORE, TRUST, AI Advantage Playbook', icon: Brain, highlight: true },
]

// Module 7 lessons
const module7Lessons = [
  { id: '7-0', title: 'Orientation & AI Readiness', desc: 'Setting expectations, readiness assessment' },
  { id: '7-1', title: 'AI Literacy Fundamentals', desc: 'Clear definitions, AI types, use case identification' },
  { id: '7-2', title: 'How Generative AI Works', desc: 'Tokens, context windows, hallucination mechanics' },
  { id: '7-3', title: 'Prompting Foundations', desc: 'CORE Framework - professional prompt engineering', highlight: 'CORE' },
  { id: '7-4', title: 'Verification & Trust', desc: 'TRUST Framework - systematic fact-checking', highlight: 'TRUST' },
  { id: '7-5', title: 'Privacy & Data Controls', desc: 'Safe data handling, redaction patterns' },
  { id: '7-6', title: 'Security & Responsible Use', desc: 'Prompt injection defense, ethical AI use' },
  { id: '7-7', title: 'Capstone Project', desc: 'Personal AI Advantage Playbook', highlight: 'CAPSTONE' },
]

// The Four Rules
const fourRules = [
  { num: 1, title: 'AI DRAFTS; YOU DECIDE', desc: "You're responsible for what you submit" },
  { num: 2, title: 'NO SENSITIVE DATA', desc: 'Never paste PII/confidential info' },
  { num: 3, title: 'VERIFICATION IS MANDATORY', desc: 'Check facts before using' },
  { num: 4, title: 'BE TRANSPARENT WHEN REQUIRED', desc: 'Disclose AI assistance per policy' },
]

// LMS Features
const lmsFeatures = [
  { title: 'H5P Interactive Content', impact: '3x engagement vs. passive video', icon: Play },
  { title: 'Real-Time Progress Tracking', impact: 'Clear path to completion', icon: BarChart3 },
  { title: 'Adaptive Learning Paths', impact: 'Optimal learning sequence', icon: Target },
  { title: 'Points & Achievements', impact: 'Sustained motivation', icon: Trophy },
  { title: 'Mobile-Responsive', impact: 'Flexible study schedule', icon: Smartphone },
  { title: 'API-First Architecture', impact: 'Enterprise integration ready', icon: Server },
]

// Animated counter component
function AnimatedCounter({ target, duration = 2000, suffix = '', prefix = '' }) {
  const [count, setCount] = useState(0)
  const countRef = useRef(null)
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true)
          let start = 0
          const end = parseInt(target)
          const increment = end / (duration / 16)
          const timer = setInterval(() => {
            start += increment
            if (start >= end) {
              setCount(end)
              clearInterval(timer)
            } else {
              setCount(Math.floor(start))
            }
          }, 16)
        }
      },
      { threshold: 0.5 }
    )

    if (countRef.current) {
      observer.observe(countRef.current)
    }

    return () => observer.disconnect()
  }, [target, duration, hasAnimated])

  return (
    <span ref={countRef}>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  )
}

export default function CourseEnhancementsPage() {
  const [isMounted, setIsMounted] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const heroRef = useRef(null)
  const metricsRef = useRef(null)
  const module7Ref = useRef(null)
  const docsRef = useRef(null)

  useEffect(() => {
    setIsMounted(true)
    const timer = setTimeout(() => setIsLoading(false), 600)
    return () => clearTimeout(timer)
  }, [])

  // GSAP Animations
  useEffect(() => {
    if (!isMounted || isLoading) return

    const ctx = gsap.context(() => {
      // Hero entrance timeline
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      tl.fromTo('.hero-bg',
        { opacity: 0 },
        { opacity: 1, duration: 0.8 }
      )
      .fromTo('.hero-badge',
        { opacity: 0, y: 20, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6 },
        '-=0.4'
      )
      .fromTo('.hero-title',
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8 },
        '-=0.3'
      )
      .fromTo('.hero-subtitle',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6 },
        '-=0.4'
      )
      .fromTo('.hero-cta',
        { opacity: 0, y: 20, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.5 },
        '-=0.3'
      )

      // Metrics section
      gsap.fromTo('.metric-card',
        { opacity: 0, y: 60, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: metricsRef.current,
            start: 'top 80%',
          },
        }
      )

      // Module 7 section
      gsap.fromTo('.module7-content',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: module7Ref.current,
            start: 'top 75%',
          },
        }
      )

      // Lesson cards stagger
      gsap.fromTo('.lesson-card',
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.lessons-grid',
            start: 'top 80%',
          },
        }
      )

      // Document type cards
      gsap.fromTo('.doc-card',
        { opacity: 0, y: 40, rotateX: -10 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.6,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: docsRef.current,
            start: 'top 80%',
          },
        }
      )

      // Module architecture cards
      gsap.fromTo('.module-card',
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          stagger: 0.08,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: '.modules-grid',
            start: 'top 80%',
          },
        }
      )

      // LMS features
      gsap.fromTo('.lms-card',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          scrollTrigger: {
            trigger: '.lms-grid',
            start: 'top 80%',
          },
        }
      )

      // Framework sections
      gsap.fromTo('.framework-section',
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.2,
          scrollTrigger: {
            trigger: '.frameworks-container',
            start: 'top 75%',
          },
        }
      )

    })

    return () => ctx.revert()
  }, [isMounted, isLoading])

  if (!isMounted) return null

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Loading Screen */}
      {isLoading && (
        <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-gold-500/30 border-t-gold-500 rounded-full animate-spin mb-4" />
            <p className="text-gold-400 font-semibold">Loading Enhancements...</p>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 1: HERO - "A Paradigm Shift"
      ═══════════════════════════════════════════════════════════════════ */}
      <section ref={heroRef} className="relative min-h-screen overflow-hidden">
        {/* Background layers */}
        <div className="hero-bg absolute inset-0" style={{ zIndex: -30 }}>
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(135deg, #0B2D5C 0%, #1a1a2e 40%, #16213e 70%, #0f0f23 100%)',
            }}
          />
        </div>

        {/* Animated particles background (lightweight alternative to HexCoins) */}
        <div className="absolute inset-0" style={{ zIndex: -20 }}>
          <div className="absolute inset-0 overflow-hidden">
            {/* Floating gold particles - using fixed positions to avoid hydration mismatch */}
            {[
              { left: '10%', top: '20%', delay: '0s', duration: '6s' },
              { left: '25%', top: '60%', delay: '1s', duration: '7s' },
              { left: '40%', top: '30%', delay: '2s', duration: '8s' },
              { left: '55%', top: '70%', delay: '0.5s', duration: '6.5s' },
              { left: '70%', top: '15%', delay: '1.5s', duration: '7.5s' },
              { left: '85%', top: '45%', delay: '2.5s', duration: '5.5s' },
              { left: '15%', top: '80%', delay: '3s', duration: '8.5s' },
              { left: '30%', top: '10%', delay: '0.8s', duration: '6.2s' },
              { left: '60%', top: '50%', delay: '1.8s', duration: '7.2s' },
              { left: '80%', top: '75%', delay: '2.2s', duration: '5.8s' },
              { left: '5%', top: '40%', delay: '3.5s', duration: '9s' },
              { left: '45%', top: '85%', delay: '0.3s', duration: '6.8s' },
              { left: '75%', top: '25%', delay: '1.2s', duration: '7.8s' },
              { left: '90%', top: '60%', delay: '2.8s', duration: '5.2s' },
              { left: '20%', top: '35%', delay: '4s', duration: '8.2s' },
            ].map((particle, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 rounded-full bg-gold-500/30 animate-float"
                style={{
                  left: particle.left,
                  top: particle.top,
                  animationDelay: particle.delay,
                  animationDuration: particle.duration,
                }}
              />
            ))}
          </div>
        </div>

        {/* Overlays */}
        <div className="absolute inset-0 bg-black/40 pointer-events-none" style={{ zIndex: -10 }} />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(212, 175, 55, 0.1) 0%, transparent 60%)',
            zIndex: -5,
          }}
        />

        {/* Content */}
        <div className="container mx-auto px-6 lg:px-16 pt-24 md:pt-32 lg:pt-40 pb-20 relative z-10">
          {/* Tensor Solutions Badge */}
          <div className="hero-badge inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-gold-500/20 to-amber-500/20 border border-gold-500/40 mb-8">
            <Sparkles className="w-4 h-4 text-gold-400" />
            <span className="text-sm font-bold text-gold-400 uppercase tracking-wider">
              Powered by Tensor Solutions LMS
            </span>
          </div>

          {/* Main Headline */}
          <h1
            className="hero-title text-white mb-6"
            style={{
              fontSize: 'clamp(36px, 5.5vw, 80px)',
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
            }}
          >
            <span className="block">A Paradigm Shift in</span>
            <span className="block bg-gradient-to-r from-gold-400 via-amber-300 to-gold-500 bg-clip-text text-transparent">
              Product Management Education
            </span>
          </h1>

          {/* Subtitle */}
          <p className="hero-subtitle text-gray-200 text-lg md:text-xl lg:text-2xl max-w-3xl mb-8">
            The Product Owner Academy has been transformed from a quality video course into the{' '}
            <span className="text-gold-400 font-bold">most comprehensive Product Management + AI program available</span>.
            With <span className="text-gold-400 font-bold">160+ supplemental documents</span>,
            <span className="text-gold-400 font-bold"> 7 modules</span>, and proprietary{' '}
            <span className="text-gold-400 font-bold">CORE + TRUST frameworks</span>.
          </p>

          {/* Key Stats Row */}
          <div className="hero-cta flex flex-wrap gap-6 mb-12">
            <div className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-gold-500/10 border border-gold-500/30">
              <div className="text-4xl md:text-5xl font-black text-gold-400">
                <AnimatedCounter target={500} suffix="%+" />
              </div>
              <div className="text-sm text-gold-300/80 font-semibold leading-tight">
                Learning Assets<br/>Increase
              </div>
            </div>
            <div className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30">
              <div className="text-4xl md:text-5xl font-black text-emerald-400">
                <AnimatedCounter target={160} suffix="+" />
              </div>
              <div className="text-sm text-emerald-300/80 font-semibold leading-tight">
                Supplemental<br/>Documents
              </div>
            </div>
            <div className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-purple-500/10 border border-purple-500/30">
              <div className="text-4xl md:text-5xl font-black text-purple-400">
                7
              </div>
              <div className="text-sm text-purple-300/80 font-semibold leading-tight">
                Comprehensive<br/>Modules
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="flex flex-wrap gap-4">
            <Link href="/tech" className="hero-primary-btn inline-flex items-center gap-2">
              Explore the Program
              <ArrowRight className="w-5 h-5" />
            </Link>
            <button
              onClick={() => {
                const metricsSection = document.querySelector('#transformation-metrics')
                metricsSection?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="hero-secondary-btn inline-flex items-center gap-2"
            >
              See the Transformation
            </button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50">
          <span className="text-xs uppercase tracking-[0.2em]">Scroll to explore</span>
          <div className="w-px h-10 bg-gradient-to-b from-gold-400/60 to-transparent animate-pulse" />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 2: TRANSFORMATION METRICS DASHBOARD
      ═══════════════════════════════════════════════════════════════════ */}
      <section id="transformation-metrics" ref={metricsRef} className="py-20 md:py-32 px-4 relative">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900/50 to-black" />

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold-500/10 border border-gold-500/30 mb-6">
              <TrendingUp className="w-4 h-4 text-gold-400" />
              <span className="text-sm font-bold text-gold-400 uppercase tracking-wider">
                The Transformation
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-white mb-4">
              Before vs <span className="bg-gradient-to-r from-gold-400 to-amber-400 bg-clip-text text-transparent">After</span>
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              A comprehensive comparison showing the dramatic enhancement of our program
            </p>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {transformationMetrics.map((metric, index) => (
              <div
                key={index}
                className="metric-card relative p-6 rounded-2xl overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.08) 100%)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255,255,255,0.1)',
                }}
              >
                {/* Top accent */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-gold-500 to-amber-500" />

                {/* Highlight badge */}
                {metric.highlight && (
                  <div className="absolute top-4 right-4">
                    <span className="px-2 py-1 text-xs font-bold rounded-full bg-gold-500/20 text-gold-400 border border-gold-500/30">
                      {metric.highlight}
                    </span>
                  </div>
                )}

                <h3 className="text-gray-400 text-sm font-semibold uppercase tracking-wider mb-4">
                  {metric.label}
                </h3>

                <div className="flex items-end gap-4">
                  {/* Before */}
                  {metric.before !== null && (
                    <div className="flex-1">
                      <div className="text-gray-500 text-xs uppercase mb-1">Before</div>
                      <div className="text-2xl font-bold text-gray-500 line-through opacity-60">
                        {metric.before}{metric.suffix}
                      </div>
                    </div>
                  )}

                  {/* Arrow */}
                  {metric.before !== null && (
                    <ArrowRight className="w-6 h-6 text-gold-500 flex-shrink-0 mb-2" />
                  )}

                  {/* After */}
                  <div className="flex-1">
                    <div className="text-gold-400 text-xs uppercase mb-1">After</div>
                    <div className="text-4xl md:text-5xl font-black text-gold-400">
                      <AnimatedCounter target={metric.after} suffix={metric.suffix} duration={1500} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Statement */}
          <div className="mt-12 text-center">
            <div
              className="inline-block px-8 py-4 rounded-2xl"
              style={{
                background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.1) 0%, rgba(212, 175, 55, 0.2) 100%)',
                border: '2px solid rgba(212, 175, 55, 0.3)',
              }}
            >
              <p className="text-xl md:text-2xl font-bold text-white">
                <span className="text-gold-400">Future-Readiness Score:</span> UNMATCHED IN INDUSTRY
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 3: MODULE 7 - THE CROWN JEWEL
      ═══════════════════════════════════════════════════════════════════ */}
      <section ref={module7Ref} className="py-20 md:py-32 px-4 relative overflow-hidden">
        {/* Premium gold gradient background */}
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at top center, rgba(212, 175, 55, 0.15) 0%, transparent 50%), linear-gradient(to bottom, #0f0f23 0%, #1a1a2e 50%, #0f0f23 100%)',
          }}
        />

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Crown Jewel Badge */}
          <div className="module7-content text-center mb-12">
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-gold-500/20 to-amber-500/20 border-2 border-gold-500/50 mb-6">
              <Award className="w-5 h-5 text-gold-400" />
              <span className="text-base font-black text-gold-400 uppercase tracking-wider">
                The Crown Jewel
              </span>
              <Award className="w-5 h-5 text-gold-400" />
            </div>

            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-white mb-4">
              Module 7: <span className="bg-gradient-to-r from-gold-400 via-amber-300 to-gold-500 bg-clip-text text-transparent">AI Essentials</span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-2">
              for Product Managers
            </p>
            <p className="text-lg text-gold-400 font-semibold italic max-w-2xl mx-auto">
              "The only PM curriculum that makes you AI-competent, not just AI-aware."
            </p>

            {/* Module 7 Stats */}
            <div className="flex flex-wrap justify-center gap-6 mt-8">
              <div className="px-6 py-3 rounded-xl bg-gray-800/50 border border-gray-700">
                <span className="text-2xl font-black text-gold-400">8</span>
                <span className="text-gray-400 ml-2">Lessons</span>
              </div>
              <div className="px-6 py-3 rounded-xl bg-gray-800/50 border border-gray-700">
                <span className="text-2xl font-black text-gold-400">27</span>
                <span className="text-gray-400 ml-2">Documents</span>
              </div>
              <div className="px-6 py-3 rounded-xl bg-gray-800/50 border border-gray-700">
                <span className="text-2xl font-black text-gold-400">2</span>
                <span className="text-gray-400 ml-2">Proprietary Frameworks</span>
              </div>
              <div className="px-6 py-3 rounded-xl bg-gray-800/50 border border-gray-700">
                <span className="text-2xl font-black text-gold-400">1</span>
                <span className="text-gray-400 ml-2">Capstone Project</span>
              </div>
            </div>
          </div>

          {/* Lessons Grid */}
          <div className="lessons-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
            {module7Lessons.map((lesson, index) => (
              <div
                key={index}
                className={`lesson-card relative p-5 rounded-xl transition-all duration-300 hover:scale-105 ${
                  lesson.highlight
                    ? 'bg-gradient-to-br from-gold-500/20 to-amber-500/10 border-2 border-gold-500/50'
                    : 'bg-gray-800/50 border border-gray-700/50 hover:border-gold-500/30'
                }`}
              >
                {lesson.highlight && (
                  <div className="absolute -top-2 -right-2 px-2 py-0.5 text-xs font-black rounded-full bg-gold-500 text-black">
                    {lesson.highlight}
                  </div>
                )}
                <div className="text-gold-400 text-sm font-bold mb-2">{lesson.id}</div>
                <h4 className="text-white font-bold mb-2">{lesson.title}</h4>
                <p className="text-gray-400 text-sm">{lesson.desc}</p>
              </div>
            ))}
          </div>

          {/* Frameworks Section */}
          <div className="frameworks-container grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {/* CORE Framework */}
            <div
              className="framework-section p-8 rounded-3xl"
              style={{
                background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.1) 0%, rgba(20, 20, 40, 0.8) 100%)',
                border: '2px solid rgba(212, 175, 55, 0.3)',
              }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gold-500 to-amber-600 flex items-center justify-center">
                  <Target className="w-6 h-6 text-black" />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-white">CORE Framework</h3>
                  <p className="text-gold-400 text-sm">Professional Prompt Engineering</p>
                </div>
              </div>

              <div className="space-y-4">
                {[
                  { letter: 'C', title: 'Clear Goal', desc: 'What you want produced' },
                  { letter: 'O', title: 'Output Format', desc: 'Structure you need' },
                  { letter: 'R', title: 'Relevant Context', desc: 'Background, audience, constraints' },
                  { letter: 'E', title: 'Expectations', desc: 'Quality bar and guardrails' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-gold-500/20 border border-gold-500/40 flex items-center justify-center flex-shrink-0">
                      <span className="text-gold-400 font-black">{item.letter}</span>
                    </div>
                    <div>
                      <h4 className="text-white font-bold">{item.title}</h4>
                      <p className="text-gray-400 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-gold-500/20">
                <p className="text-gold-400 font-semibold text-center">
                  <Sparkles className="w-4 h-4 inline mr-2" />
                  Result: Consistent, high-quality AI outputs every time
                </p>
              </div>
            </div>

            {/* TRUST Framework */}
            <div
              className="framework-section p-8 rounded-3xl"
              style={{
                background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, rgba(20, 20, 40, 0.8) 100%)',
                border: '2px solid rgba(34, 197, 94, 0.3)',
              }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center">
                  <Shield className="w-6 h-6 text-black" />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-white">TRUST Framework</h3>
                  <p className="text-emerald-400 text-sm">Systematic AI Verification</p>
                </div>
              </div>

              <div className="space-y-4">
                {[
                  { letter: 'T', title: 'TAG', desc: 'Claims that need verification' },
                  { letter: 'R', title: 'REQUEST', desc: 'Sources from the AI' },
                  { letter: 'U', title: 'UNPACK', desc: 'Assumptions being made' },
                  { letter: 'S', title: 'SECOND-SOURCE', desc: 'Check critical facts' },
                  { letter: 'T', title: 'TIGHTEN', desc: 'Output for accuracy' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center flex-shrink-0">
                      <span className="text-emerald-400 font-black">{item.letter}</span>
                    </div>
                    <div>
                      <h4 className="text-white font-bold">{item.title}</h4>
                      <p className="text-gray-400 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-emerald-500/20">
                <p className="text-emerald-400 font-semibold text-center">
                  <CheckCircle2 className="w-4 h-4 inline mr-2" />
                  Result: Confidence in every AI-assisted deliverable
                </p>
              </div>
            </div>
          </div>

          {/* The Four Rules */}
          <div className="mb-16">
            <h3 className="text-2xl md:text-3xl font-black text-white text-center mb-8">
              The Four Rules of <span className="text-gold-400">Professional AI Use</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {fourRules.map((rule, index) => (
                <div
                  key={index}
                  className="p-5 rounded-xl bg-gray-800/50 border border-gray-700/50 hover:border-gold-500/30 transition-all"
                >
                  <div className="w-10 h-10 rounded-full bg-gold-500/20 border border-gold-500/40 flex items-center justify-center mb-4">
                    <span className="text-gold-400 font-black">{rule.num}</span>
                  </div>
                  <h4 className="text-white font-bold text-sm mb-2">{rule.title}</h4>
                  <p className="text-gray-400 text-sm">{rule.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* AI Advantage Playbook */}
          <div
            className="p-8 rounded-3xl text-center"
            style={{
              background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.1) 0%, rgba(20, 20, 40, 0.8) 100%)',
              border: '2px solid rgba(168, 85, 247, 0.3)',
            }}
          >
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center mx-auto mb-6">
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl md:text-3xl font-black text-white mb-2">
              The AI Advantage Playbook
            </h3>
            <p className="text-purple-400 font-semibold mb-4">Career-Defining Capstone Project</p>
            <p className="text-gray-300 max-w-2xl mx-auto mb-6">
              A personalized system you build and carry into your career containing your AI Fit Assessment,
              Personal Prompt Library, Verification Protocol, Privacy Playbook, and Security Commitment.
            </p>
            <p className="text-purple-400 font-bold text-lg">
              This isn't homework. It's a career asset.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 4: DOCUMENT TYPES SHOWCASE
      ═══════════════════════════════════════════════════════════════════ */}
      <section ref={docsRef} className="py-20 md:py-32 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/30 to-transparent" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/30 mb-6">
              <FileText className="w-4 h-4 text-blue-400" />
              <span className="text-sm font-bold text-blue-400 uppercase tracking-wider">
                160+ Documents
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-white mb-4">
              Comprehensive <span className="text-blue-400">Resource Library</span>
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Five categories of meticulously crafted supplemental materials for every learning style
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {documentTypes.map((doc, index) => {
              const Icon = doc.icon
              return (
                <div
                  key={index}
                  className="doc-card group relative p-6 rounded-2xl bg-gray-800/30 border border-gray-700/50 hover:border-gray-600 transition-all duration-300 overflow-hidden"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  {/* Top gradient bar */}
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${doc.color}`} />

                  {/* Icon */}
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${doc.color} flex items-center justify-center mb-4 transform transition-transform duration-300 group-hover:scale-110`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>

                  {/* Count */}
                  <div className="text-4xl font-black text-white mb-2">{doc.count}</div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-white mb-2">{doc.title}</h3>

                  {/* Purpose */}
                  <p className="text-gray-400">{doc.purpose}</p>

                  {/* Hover glow */}
                  <div className={`absolute -bottom-10 -right-10 w-32 h-32 rounded-full bg-gradient-to-br ${doc.color} opacity-0 group-hover:opacity-20 blur-3xl transition-opacity duration-500`} />
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 5: 7-MODULE ARCHITECTURE
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-32 px-4 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/30 mb-6">
              <Layers className="w-4 h-4 text-purple-400" />
              <span className="text-sm font-bold text-purple-400 uppercase tracking-wider">
                Complete Curriculum
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-white mb-4">
              Seven Comprehensive <span className="text-purple-400">Modules</span>
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              A complete learning journey from Agile foundations to AI mastery
            </p>
          </div>

          <div className="modules-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {modules.map((mod, index) => {
              const Icon = mod.icon
              return (
                <div
                  key={index}
                  className={`module-card relative p-5 rounded-xl transition-all duration-300 hover:scale-105 ${
                    mod.highlight
                      ? 'bg-gradient-to-br from-gold-500/20 to-amber-500/10 border-2 border-gold-500/50 lg:col-span-2 xl:col-span-1'
                      : 'bg-gray-800/50 border border-gray-700/50 hover:border-gray-600'
                  }`}
                >
                  {/* Module number badge */}
                  <div className={`absolute -top-3 -right-3 w-10 h-10 rounded-full flex items-center justify-center font-black text-sm ${
                    mod.highlight
                      ? 'bg-gradient-to-br from-gold-500 to-amber-600 text-black'
                      : 'bg-gray-700 text-white'
                  }`}>
                    {mod.num}
                  </div>

                  {mod.highlight && (
                    <div className="absolute top-3 left-3">
                      <span className="px-2 py-0.5 text-xs font-black rounded-full bg-gold-500 text-black animate-pulse">
                        CROWN JEWEL
                      </span>
                    </div>
                  )}

                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                    mod.highlight
                      ? 'bg-gradient-to-br from-gold-500 to-amber-600'
                      : 'bg-gray-700'
                  }`}>
                    <Icon className={`w-6 h-6 ${mod.highlight ? 'text-black' : 'text-white'}`} />
                  </div>

                  <h3 className={`text-lg font-bold mb-2 ${mod.highlight ? 'text-gold-400' : 'text-white'}`}>
                    {mod.title}
                  </h3>

                  <div className="flex gap-4 mb-3 text-sm">
                    <span className={mod.highlight ? 'text-gold-300' : 'text-gray-400'}>
                      <strong className={mod.highlight ? 'text-gold-400' : 'text-white'}>{mod.lessons}</strong> lessons
                    </span>
                    <span className={mod.highlight ? 'text-gold-300' : 'text-gray-400'}>
                      <strong className={mod.highlight ? 'text-gold-400' : 'text-white'}>{mod.docs}</strong> docs
                    </span>
                  </div>

                  <p className={`text-xs ${mod.highlight ? 'text-gold-300/80' : 'text-gray-500'}`}>
                    {mod.frameworks}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 6: LMS ARCHITECTURE SHOWCASE
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-32 px-4 relative">
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at bottom center, rgba(14, 165, 233, 0.1) 0%, transparent 50%)',
          }}
        />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 mb-6">
              <Server className="w-4 h-4 text-cyan-400" />
              <span className="text-sm font-bold text-cyan-400 uppercase tracking-wider">
                Enterprise-Grade Platform
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-white mb-4">
              Sophisticated <span className="text-cyan-400">LMS Architecture</span>
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Beyond traditional online learning — an active, measurable learning journey
            </p>
          </div>

          {/* Three Tier Visualization */}
          <div className="mb-12 p-8 rounded-3xl bg-gray-900/50 border border-gray-700/50">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Interactive Learning Layer */}
              <div className="p-6 rounded-2xl bg-gradient-to-b from-blue-500/10 to-transparent border border-blue-500/30">
                <h4 className="text-blue-400 font-bold text-sm uppercase tracking-wider mb-4">
                  Interactive Learning Layer
                </h4>
                <div className="flex flex-wrap gap-2">
                  {['H5P Content', 'Video Lessons', 'Quiz Engine', 'Progress Tracking', 'Flashcard Decks'].map((item, i) => (
                    <span key={i} className="px-3 py-1 text-xs rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Progress & Analytics Layer */}
              <div className="p-6 rounded-2xl bg-gradient-to-b from-emerald-500/10 to-transparent border border-emerald-500/30">
                <h4 className="text-emerald-400 font-bold text-sm uppercase tracking-wider mb-4">
                  Progress & Analytics Layer
                </h4>
                <div className="flex flex-wrap gap-2">
                  {['Lesson Progress', 'Module Progress', 'Overall Completion', 'Certification Path'].map((item, i) => (
                    <span key={i} className="px-3 py-1 text-xs rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Engagement & Retention Layer */}
              <div className="p-6 rounded-2xl bg-gradient-to-b from-purple-500/10 to-transparent border border-purple-500/30">
                <h4 className="text-purple-400 font-bold text-sm uppercase tracking-wider mb-4">
                  Engagement & Retention Layer
                </h4>
                <div className="flex flex-wrap gap-2">
                  {['Gamification', 'Points System', 'Achievement Badges', 'Completion Certs'].map((item, i) => (
                    <span key={i} className="px-3 py-1 text-xs rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="lms-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {lmsFeatures.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div
                  key={index}
                  className="lms-card p-5 rounded-xl bg-gray-800/30 border border-gray-700/50 hover:border-cyan-500/30 transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-cyan-400" />
                    </div>
                    <div>
                      <h4 className="text-white font-bold mb-1">{feature.title}</h4>
                      <p className="text-cyan-400 text-sm">{feature.impact}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 7: VALUE PROPOSITION SPLIT VIEW
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-32 px-4 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-4">
              Exceptional <span className="text-gold-400">Value</span>
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Whether you're an individual professional or an organization, the ROI is clear
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Individual Value */}
            <div
              className="p-8 rounded-3xl"
              style={{
                background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.1) 0%, rgba(20, 20, 40, 0.8) 100%)',
                border: '2px solid rgba(212, 175, 55, 0.3)',
              }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gold-500 to-amber-600 flex items-center justify-center">
                  <Users className="w-6 h-6 text-black" />
                </div>
                <h3 className="text-2xl font-black text-white">For Individuals</h3>
              </div>

              <ul className="space-y-4 mb-8">
                {[
                  '160+ documents you\'d otherwise need to create yourself',
                  '$15,000+ estimated value in training, templates, and frameworks',
                  '300+ hours saved vs. building from scratch',
                  'Complete AI competency training (worth $2,000+ separately)',
                  'Two proprietary frameworks (CORE + TRUST) for career-long use',
                  'Personal AI Advantage Playbook as career asset',
                  'Future-proofed skills that compound over time',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-300">
                    <CheckCircle2 className="w-5 h-5 text-gold-400 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-6 border-t border-gold-500/20">
                <div className="text-center">
                  <div className="text-3xl font-black text-gold-400 mb-1">$15,000+</div>
                  <div className="text-gold-300/80 text-sm">Estimated Total Value</div>
                </div>
              </div>
            </div>

            {/* Organization Value */}
            <div
              className="p-8 rounded-3xl"
              style={{
                background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, rgba(20, 20, 40, 0.8) 100%)',
                border: '2px solid rgba(34, 197, 94, 0.3)',
              }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-black" />
                </div>
                <h3 className="text-2xl font-black text-white">For Organizations</h3>
              </div>

              <ul className="space-y-4 mb-8">
                {[
                  'Standardized PM + AI practices across all teams',
                  'Consistent AI usage policies reduce enterprise risk',
                  '50%+ faster onboarding for new PMs',
                  'Quality assurance through checklist culture',
                  'LMS analytics for compliance and progress tracking',
                  'Scalable training program that grows with the organization',
                  'Future-ready workforce as AI transforms product work',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-300">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-6 border-t border-emerald-500/20 grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-black text-emerald-400 mb-1">100x</div>
                  <div className="text-emerald-300/80 text-xs">ROI from prevented AI security incidents</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-black text-emerald-400 mb-1">20-40%</div>
                  <div className="text-emerald-300/80 text-xs">Productivity gain per PM</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 8: FINAL CTA + TENSOR SOLUTIONS CREDIT
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-32 px-4 relative">
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(212, 175, 55, 0.15) 0%, transparent 50%)',
          }}
        />

        <div className="max-w-4xl mx-auto relative z-10 text-center">
          {/* Quote */}
          <div className="mb-12">
            <Quote className="w-12 h-12 text-gold-500/30 mx-auto mb-6" />
            <blockquote className="text-xl md:text-2xl lg:text-3xl text-white font-medium italic mb-6">
              "In a world where AI is transforming every aspect of product work, the question isn't whether to learn AI—it's whether you'll learn it systematically or stumble through it randomly."
            </blockquote>
            <p className="text-gold-400 font-bold">— Mentor Agile Academy</p>
          </div>

          {/* CTA */}
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-6">
              Ready to Transform Your Career?
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/tech" className="hero-primary-btn inline-flex items-center gap-2">
                Start Your Journey
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="/contact" className="hero-secondary-btn inline-flex items-center gap-2">
                Contact Us
              </Link>
            </div>
          </div>

          {/* Tensor Solutions Credit */}
          <div
            className="inline-block px-8 py-6 rounded-2xl"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.08) 100%)',
              border: '1px solid rgba(255,255,255,0.1)',
            }}
          >
            <div className="flex items-center justify-center gap-3 mb-2">
              <Sparkles className="w-5 h-5 text-gold-400" />
              <span className="text-gray-400 text-sm uppercase tracking-wider">Powered By</span>
              <Sparkles className="w-5 h-5 text-gold-400" />
            </div>
            <h3 className="text-2xl font-black text-white mb-1">Tensor Solutions</h3>
            <p className="text-gray-400 text-sm">Enterprise Learning Management System</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <SocialFooter />
    </div>
  )
}

'use client'

import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import * as THREE from 'three'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import GlassmorphicLogo from './course-landing/components/GlassmorphicLogo'
import SocialFooter from './course-landing/components/SocialFooter'
import IndustryCard3D from './components/IndustryCard3D'
import HolographicBadge from './components/HolographicBadge'
import SalaryInfoPopup from './course-landing/components/SalaryInfoPopup'
import JobsAvailablePopup from './course-landing/components/JobsAvailablePopup'

// Dynamically import HexCoins for code splitting
const HexCoins = dynamic(() => import('./components/HexCoins'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[300px] flex items-center justify-center">
      <div className="w-16 h-16 rounded-full border-4 border-gold-500/30 border-t-gold-500 animate-spin" />
    </div>
  ),
})

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

// Industry data
const industries = [
  {
    title: 'Tech Product Owner / Manager',
    description: 'Product Management & AI certifications for the tech industry',
    icon: '💻',
    href: '/tech',
    theme: 'gold',
    features: ['12-Week Intensive Program', 'CSPO Certification', 'AI Essentials Training', 'Portfolio Project'],
    stats: { 'Starting Salary': '$88K', 'Up To': '$356K' },
    hasAIBadge: true,
  },
  {
    title: 'Pharmacy & EKG Technician',
    description: 'Pharmacy Tech & EKG certifications with AI integration',
    icon: '🏥',
    href: '/healthcare',
    theme: 'medical',
    features: ['4-Week Fast Track', 'CPhT Certification', 'EKG Tech Certification', 'VR Clinical Training'],
    stats: { Certifications: '2', Duration: '4 Weeks' },
    hasAIBadge: true,
    hasVRBadge: true,
    comingSoon: true,
  },
  {
    title: 'Advanced CDL',
    description: 'Supply Chain Management with AI-powered analytics',
    icon: '🚛',
    href: '/logistics',
    theme: 'logistics',
    features: ['Supply Chain AI', 'Predictive Analytics', 'Automation Training', 'Industry Certification'],
    stats: { Demand: 'High', Growth: '25%' },
    hasAIBadge: true,
    hasVRBadge: true,
    comingSoon: true,
  },
]

// Certification logos - Order: IBHE → PTCB → CompTIA → Scrum Alliance
const certifications = [
  {
    name: 'IBHE',
    fullName: 'Illinois Board of Higher Education',
    logo: '/images/logos/ibhe.png',
    bg: 'bg-white'
  },
  {
    name: 'PTCB',
    fullName: 'PTCB Certified',
    logo: '/images/logos/ptcb-certified.png',
    bg: 'bg-white'
  },
  {
    name: 'CompTIA',
    fullName: 'CompTIA Authorized',
    logo: '/images/logos/comptia-partner.webp',
    bg: 'bg-transparent'
  },
  {
    name: 'Scrum Alliance',
    fullName: 'Scrum Alliance Certified',
    logo: '/images/logos/scrum-alliance.png',
    bg: 'bg-white'
  },
]

export default function AIInstituteLanding() {
  const canvasRef = useRef(null)
  const cardsRef = useRef(null)
  const [isMounted, setIsMounted] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [jobsCount, setJobsCount] = useState(0)
  const [showSalaryPopup, setShowSalaryPopup] = useState(false)
  const [showJobsPopup, setShowJobsPopup] = useState(false)
  const [showPillNav, setShowPillNav] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    const timer = setTimeout(() => setIsLoading(false), 800)
    return () => clearTimeout(timer)
  }, [])

  // Track scroll to show/hide pill navigation
  useEffect(() => {
    const handleScroll = () => {
      // Show pill nav after scrolling 300px
      setShowPillNav(window.scrollY > 300)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Animate jobs counter - initial roll up, then continuous random ticking
  useEffect(() => {
    if (isLoading) return

    const MIN_VALUE = 886000
    const MAX_VALUE = 887000

    // Random starting target within range
    const targetValue = Math.floor(Math.random() * 1001) + MIN_VALUE
    const duration = 4000 // 4 seconds for initial animation
    const startTime = Date.now()
    let currentValue = 0
    let tickingInterval = null

    // Initial roll-up animation
    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)

      // Easing function for smooth deceleration
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      currentValue = Math.floor(easeOutQuart * targetValue)

      setJobsCount(currentValue)

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        // Initial animation complete - start continuous ticking
        startTicking(currentValue)
      }
    }

    // Continuous random ticking up and down
    const startTicking = (startValue) => {
      let value = startValue

      tickingInterval = setInterval(() => {
        // Random change: -50 to +50
        const change = Math.floor(Math.random() * 101) - 50
        value = value + change

        // Clamp between min and max
        value = Math.max(MIN_VALUE, Math.min(MAX_VALUE, value))

        setJobsCount(value)
      }, 800) // Tick every 800ms
    }

    requestAnimationFrame(animate)

    // Cleanup
    return () => {
      if (tickingInterval) {
        clearInterval(tickingInterval)
      }
    }
  }, [isLoading])

  // Three.js Multi-colored Background
  useEffect(() => {
    if (!canvasRef.current || !isMounted) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
    })

    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    // Multi-colored geometric shapes
    const shapes = []
    const geometries = [
      new THREE.IcosahedronGeometry(1, 1),
      new THREE.OctahedronGeometry(1, 0),
      new THREE.TorusGeometry(0.8, 0.3, 16, 100),
      new THREE.TetrahedronGeometry(1, 0),
    ]

    // Colors: Gold, Medical Blue, Logistics Green
    const allColors = [
      0xd4af37, 0xffd700, 0xb8860b, // Gold
      0x0ea5e9, 0x38bdf8, 0x0284c7, // Medical Blue
      0x22c55e, 0x4ade80, 0x16a34a, // Logistics Green
    ]

    // Create 18 geometric shapes (6 per color theme)
    for (let i = 0; i < 18; i++) {
      const geometry = geometries[i % geometries.length]
      const color = allColors[i % allColors.length]

      const material = new THREE.MeshPhongMaterial({
        color: color,
        wireframe: true,
        emissive: color,
        emissiveIntensity: 0.3,
        transparent: true,
        opacity: 0.5,
      })

      const mesh = new THREE.Mesh(geometry, material)
      mesh.position.x = (Math.random() - 0.5) * 25
      mesh.position.y = (Math.random() - 0.5) * 25
      mesh.position.z = (Math.random() - 0.5) * 25
      mesh.rotation.x = Math.random() * Math.PI
      mesh.rotation.y = Math.random() * Math.PI

      scene.add(mesh)
      shapes.push({
        mesh,
        rotationSpeed: {
          x: 0.0003 + Math.random() * 0.0008,
          y: 0.0003 + Math.random() * 0.0008,
          z: 0.0003 + Math.random() * 0.0008,
        },
        originalPosition: mesh.position.clone(),
        pulseSpeed: 0.4 + Math.random() * 0.4,
        pulseOffset: Math.random() * Math.PI * 2,
      })
    }

    // Multi-colored particle field
    const particlesGeometry = new THREE.BufferGeometry()
    const particleCount = 400
    const positions = new Float32Array(particleCount * 3)
    const colors = new Float32Array(particleCount * 3)

    const particleColors = [
      [0.83, 0.69, 0.22], // Gold
      [0.05, 0.65, 0.91], // Blue
      [0.13, 0.77, 0.37], // Green
    ]

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 60
      positions[i * 3 + 1] = (Math.random() - 0.5) * 60
      positions[i * 3 + 2] = (Math.random() - 0.5) * 60

      const colorIndex = i % 3
      colors[i * 3] = particleColors[colorIndex][0]
      colors[i * 3 + 1] = particleColors[colorIndex][1]
      colors[i * 3 + 2] = particleColors[colorIndex][2]
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.08,
      transparent: true,
      opacity: 0.7,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
    })

    const particles = new THREE.Points(particlesGeometry, particlesMaterial)
    scene.add(particles)

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    scene.add(ambientLight)

    const pointLight1 = new THREE.PointLight(0xd4af37, 1.2)
    pointLight1.position.set(5, 5, 5)
    scene.add(pointLight1)

    const pointLight2 = new THREE.PointLight(0x0ea5e9, 1)
    pointLight2.position.set(-5, -5, 5)
    scene.add(pointLight2)

    const pointLight3 = new THREE.PointLight(0x22c55e, 1)
    pointLight3.position.set(0, 5, -5)
    scene.add(pointLight3)

    camera.position.z = 12

    // Mouse tracking
    let mouseX = 0
    let mouseY = 0
    let targetX = 0
    let targetY = 0

    const handleMouseMove = (event) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1
    }
    window.addEventListener('mousemove', handleMouseMove)

    // Animation loop
    let animationFrameId
    const clock = new THREE.Clock()

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate)
      const elapsedTime = clock.getElapsedTime()

      // Smooth camera movement
      targetX += (mouseX * 0.4 - targetX) * 0.015
      targetY += (mouseY * 0.4 - targetY) * 0.015
      camera.position.x = targetX
      camera.position.y = targetY

      // Animate shapes
      shapes.forEach((shape, i) => {
        shape.mesh.rotation.x += shape.rotationSpeed.x
        shape.mesh.rotation.y += shape.rotationSpeed.y
        shape.mesh.rotation.z += shape.rotationSpeed.z

        const pulseFactor = Math.sin(elapsedTime * shape.pulseSpeed + shape.pulseOffset) * 0.5 + 0.5
        shape.mesh.material.emissiveIntensity = 0.2 + pulseFactor * 0.25

        shape.mesh.position.y = shape.originalPosition.y + Math.sin(elapsedTime * 0.25 + i) * 0.4
      })

      // Rotate particles
      particles.rotation.y = elapsedTime * 0.03
      particles.rotation.x = elapsedTime * 0.02

      renderer.render(scene, camera)
    }
    animate()

    // Resize handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(animationFrameId)
      shapes.forEach((shape) => {
        shape.mesh.geometry.dispose()
        shape.mesh.material.dispose()
      })
      particlesGeometry.dispose()
      particlesMaterial.dispose()
      renderer.dispose()
    }
  }, [isMounted])

  // GSAP Animations - Tensor-style staggered entrance sequence
  useEffect(() => {
    if (!isMounted || isLoading) return

    const ctx = gsap.context(() => {
      // Master timeline for orchestrated hero entrance
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      // 1. Background fades in first
      tl.fromTo('.hero-background',
        { opacity: 0 },
        { opacity: 1, duration: 0.8 }
      )

      // 2. HexCoins container fades in (as background)
      tl.fromTo('.hexcoins-container',
        { opacity: 0, scale: 1.1 },
        { opacity: 1, scale: 1, duration: 1.2, ease: 'power2.out' },
        '-=0.6'
      )

      // 3. Logo slides in from left with scale
      tl.fromTo('.hero-logo',
        { opacity: 0, x: -30, scale: 0.9 },
        { opacity: 1, x: 0, scale: 1, duration: 0.6 },
        '-=0.8'
      )

      // 4. Headline lines reveal with dramatic stagger
      tl.fromTo('.hero-line',
        { opacity: 0, y: 60, skewY: 2 },
        { opacity: 1, y: 0, skewY: 0, duration: 0.9, stagger: 0.15, ease: 'power3.out' },
        '-=0.4'
      )

      // 5. Subtitle fades in from below
      tl.fromTo('.hero-subtitle',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8 },
        '-=0.5'
      )

      // 6. CTA buttons pop in with scale
      tl.fromTo('.hero-cta',
        { opacity: 0, y: 25, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.7 },
        '-=0.4'
      )

      // 7. Stats cards slide in
      tl.fromTo('.hero-stats',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 },
        '-=0.3'
      )

      // 8. Bottom UI elements slide up (scroll indicator + pill nav)
      tl.fromTo('.scroll-indicator',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5 },
        '-=0.3'
      )
      // Note: pill-navigation visibility is controlled by scroll state, not GSAP

      // Scroll-based parallax for hero title
      gsap.to('.hero-title', {
        y: -50,
        opacity: 0.3,
        scrollTrigger: {
          trigger: '.hero-title',
          start: 'top 40%',
          end: 'top -20%',
          scrub: 1.5,
        },
      })

      // Cards staggered entrance (scroll triggered)
      gsap.fromTo(
        '.industry-card',
        { opacity: 0, y: 100, rotateX: -15, transformOrigin: 'center top' },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.9,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 80%',
          },
        }
      )

      // Credentials section entrance
      gsap.fromTo(
        '.credentials-section',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.credentials-section',
            start: 'top 90%',
          },
        }
      )

      // Credential items staggered entrance
      gsap.fromTo(
        '.credential-item',
        { opacity: 0, y: 30, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.credentials-section',
            start: 'top 85%',
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
            <p className="text-gold-400 font-semibold">Loading...</p>
          </div>
        </div>
      )}

      {/* Three.js Canvas */}
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }} />

      {/* Gradient Overlays */}
      <div className="fixed inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/80 pointer-events-none" style={{ zIndex: 1 }} />
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.08),transparent_60%)] pointer-events-none" style={{ zIndex: 1 }} />

      {/* Main Content */}
      <div className="relative" style={{ zIndex: 10 }}>
        {/* ═══════════════════════════════════════════════════════════════════
            HERO SECTION - Tensor-Style Left-Aligned Layout
            HexCoins as full-screen background, content overlays left side
        ═══════════════════════════════════════════════════════════════════ */}
        <section className="relative min-h-screen overflow-hidden">

          {/* BACKGROUND LAYER 1: Base gradient */}
          <div
            className="hero-background absolute inset-0"
            style={{
              background: 'linear-gradient(135deg, #0B2D5C 0%, #1a1a2e 40%, #16213e 70%, #0f0f23 100%)',
              zIndex: -30,
            }}
          />

          {/* BACKGROUND LAYER 2: Full-screen 3D HexCoins */}
          <div className="hexcoins-container absolute inset-0" style={{ zIndex: -20 }}>
            <HexCoins className="w-full h-full" />
          </div>

          {/* BACKGROUND LAYER 3: Dark overlay to push coins back */}
          <div className="absolute inset-0 bg-black/25 pointer-events-none" style={{ zIndex: -10 }} />

          {/* BACKGROUND LAYER 4: Gold glow at bottom */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(to bottom, transparent 50%, rgba(255, 176, 1, 0.08) 100%)',
              zIndex: -5,
            }}
          />

          {/* LEFT-ALIGNED Content Container */}
          <div className="container mx-auto px-6 lg:px-16 pt-20 md:pt-28 lg:pt-32 pb-32 relative z-10">

            {/* Logo - Left aligned */}
            <div className="hero-logo mb-6 md:mb-8">
              <div className="transform scale-[0.7] md:scale-[0.85] lg:scale-100 origin-left">
                <GlassmorphicLogo theme="gold" />
              </div>
            </div>

            {/* MASSIVE Headline - Left aligned with Tensor-style sizing */}
            <h1
              className="hero-title text-white mb-6"
              style={{
                fontSize: 'clamp(40px, 6vw, 90px)',
                fontWeight: 700,
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
              }}
            >
              <span className="hero-line block">The Premier</span>
              <span className="hero-line block bg-gradient-to-r from-gold-400 via-amber-300 to-gold-500 bg-clip-text text-transparent">
                AI Institute
              </span>
            </h1>

            {/* Subtitle with accent color */}
            <p className="hero-subtitle text-gray-200 text-lg md:text-xl lg:text-2xl max-w-2xl mb-8">
              Transform your career with cutting-edge AI training for{' '}
              <span className="text-gold-400 font-semibold">Tech, Healthcare, and Logistics</span>
            </p>

            {/* CTA Button with 3D depth */}
            <div className="hero-cta flex flex-col sm:flex-row gap-4 mb-10">
              <button
                onClick={() => {
                  const cardsSection = document.querySelector('#industry-cards');
                  cardsSection?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="hero-primary-btn inline-flex items-center justify-center"
              >
                View Programs
              </button>
            </div>

            {/* Job & Salary Stats */}
            <div className="hero-stats flex flex-wrap gap-6 md:gap-10 items-center">
              {/* Total Jobs Available - Large Pulsing Green */}
              <button
                onClick={() => setShowJobsPopup(true)}
                className="group flex items-center gap-4 px-6 py-4 rounded-2xl bg-green-500/10 hover:bg-green-500/20 border-2 border-green-500/40 hover:border-green-400 transition-all cursor-pointer animate-pulse-green"
                style={{
                  boxShadow: '0 0 30px rgba(34, 197, 94, 0.3), 0 0 60px rgba(34, 197, 94, 0.1)',
                }}
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center text-2xl shadow-lg shadow-green-500/30">
                  💼
                </div>
                <div className="text-left">
                  <div className="text-4xl md:text-5xl font-black text-green-400 tabular-nums tracking-tight">
                    +{jobsCount.toLocaleString()}
                  </div>
                  <div className="text-sm md:text-base text-green-300/80 font-semibold flex items-center gap-2">
                      Total Jobs Available
                      {/* Pulsing Green Orb */}
                      <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500 shadow-lg shadow-green-500/50"></span>
                      </span>
                    </div>
                </div>
                <span className="ml-3 text-green-400 text-xl opacity-0 group-hover:opacity-100 transition-opacity">→</span>
              </button>

              {/* Salary Range - Large */}
              <button
                onClick={() => setShowSalaryPopup(true)}
                className="group flex items-center gap-4 px-6 py-4 rounded-2xl bg-gold-500/10 hover:bg-gold-500/20 border-2 border-gold-500/40 hover:border-gold-400 transition-all cursor-pointer"
                style={{
                  boxShadow: '0 0 30px rgba(251, 191, 36, 0.2), 0 0 60px rgba(251, 191, 36, 0.1)',
                }}
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-gold-400 to-amber-600 flex items-center justify-center text-2xl shadow-lg shadow-gold-500/30">
                  💰
                </div>
                <div className="text-left">
                  <div className="text-4xl md:text-5xl font-black text-gold-400 tabular-nums tracking-tight">
                    $88K - $356K
                  </div>
                  <div className="text-sm md:text-base text-gold-300/80 font-semibold">Salary Range</div>
                </div>
                <span className="ml-3 text-gold-400 text-xl opacity-0 group-hover:opacity-100 transition-opacity">→</span>
              </button>
            </div>
          </div>

          {/* FIXED BOTTOM: Scroll Indicator - Left */}
          <div className="scroll-indicator fixed bottom-8 md:bottom-10 left-6 lg:left-16 hidden lg:flex flex-col items-center gap-2 text-white/50 z-20">
            <span className="text-[10px] uppercase tracking-[0.2em] font-medium">Scroll</span>
            <div className="w-px h-10 bg-gradient-to-b from-white/40 to-transparent" />
          </div>

          {/* FIXED BOTTOM: Industry Pill Navigation - Center (shows on scroll) */}
          <div
            className={`pill-navigation fixed bottom-8 md:bottom-10 left-1/2 -translate-x-1/2 z-20 transition-all duration-300 ${
              showPillNav ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
            }`}
          >
            <div
              className="flex gap-1 md:gap-2 px-3 md:px-4 py-2 md:py-2.5 rounded-full border border-white/15"
              style={{
                background: 'rgba(11, 45, 92, 0.25)',
                backdropFilter: 'blur(16px) saturate(180%)',
                WebkitBackdropFilter: 'blur(16px) saturate(180%)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
              }}
            >
              <Link
                href="/tech"
                className="pill-btn px-4 md:px-5 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-semibold text-white/70 hover:text-gold-400 hover:bg-gold-500/15 border border-transparent hover:border-gold-500/30 transition-all"
              >
                Tech
              </Link>
              <Link
                href="/healthcare"
                className="pill-btn px-4 md:px-5 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-semibold text-white/70 hover:text-medical-400 hover:bg-medical-500/15 border border-transparent hover:border-medical-500/30 transition-all"
              >
                Healthcare
              </Link>
              <Link
                href="/logistics"
                className="pill-btn px-4 md:px-5 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-semibold text-white/70 hover:text-logistics-400 hover:bg-logistics-500/15 border border-transparent hover:border-logistics-500/30 transition-all"
              >
                Logistics
              </Link>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            CREDENTIALS RIBBON - Premium Trust Badges
        ═══════════════════════════════════════════════════════════════════ */}
        <section className="credentials-section py-12 md:py-16 px-4">
          <div className="max-w-6xl mx-auto">

            {/* Section Header */}
            <div className="text-center mb-8">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 text-sm font-bold uppercase tracking-wider">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Officially Certified
              </span>
            </div>

            {/* Credentials Ribbon */}
            <div
              className="relative rounded-2xl p-6 md:p-8"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.08) 100%)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.1)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.1)',
              }}
            >
              {/* Gold accent line at top */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-1 bg-gradient-to-r from-transparent via-gold-500 to-transparent rounded-full" />

              {/* Certifications Grid - Holographic Badges */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
                {certifications.map((cert, index) => (
                  <HolographicBadge
                    key={index}
                    logo={cert.logo}
                    name={cert.name}
                    fullName={cert.fullName}
                    bg={cert.bg}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Industry Cards Section */}
        <section id="industry-cards" ref={cardsRef} className="py-16 sm:py-24 px-4 sm:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-800/50 border border-gray-700/50 mb-6">
                <span className="text-sm font-bold text-gray-300 uppercase tracking-wider">
                  Choose Your Industry
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4">
                AI-Powered Training
                <span className="block mt-2 bg-gradient-to-r from-gold-400 via-medical-400 to-logistics-400 bg-clip-text text-transparent">
                  For Every Industry
                </span>
              </h2>
              <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                Select your path and transform your career with cutting-edge AI skills
              </p>
            </div>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
              {industries.map((industry, index) => (
                <div key={index} className="industry-card">
                  <IndustryCard3D {...industry} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Trust Statement Banner */}
        <section className="trust-section py-8 md:py-12 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-3 px-6 md:px-8 py-3 md:py-4 rounded-full bg-gradient-to-r from-gray-800/80 to-gray-900/80 backdrop-blur-sm border border-gray-700/50 shadow-2xl">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-gold-500 to-amber-500 flex items-center justify-center text-sm md:text-lg border-2 border-gray-900">
                  🚀
                </div>
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-cyan-400 to-cyan-600 flex items-center justify-center text-sm md:text-lg border-2 border-gray-900">
                  🏥
                </div>
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-sm md:text-lg border-2 border-gray-900">
                  📦
                </div>
              </div>
              <span className="text-sm md:text-base lg:text-lg font-bold text-white">
                State-Approved & Industry-Recognized Programs
              </span>
            </div>
          </div>
        </section>

        {/* Footer */}
        <SocialFooter />
      </div>

      {/* Salary Info Popup */}
      <SalaryInfoPopup
        isOpen={showSalaryPopup}
        onClose={() => setShowSalaryPopup(false)}
      />

      {/* Jobs Available Popup */}
      <JobsAvailablePopup
        isOpen={showJobsPopup}
        onClose={() => setShowJobsPopup(false)}
      />
    </div>
  )
}

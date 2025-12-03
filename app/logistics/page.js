'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import GlassmorphicLogo from '../course-landing/components/GlassmorphicLogo'
import SocialFooter from '../course-landing/components/SocialFooter'

export default function LogisticsLandingPage() {
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const canvasRef = useRef(null)

  useEffect(() => {
    setIsMounted(true)

    // Particle animation
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    let animationId

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const particles = []
    const particleCount = 50

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 3 + 1,
        opacity: Math.random() * 0.5 + 0.2,
      })
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((p) => {
        p.x += p.vx
        p.y += p.vy

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(34, 197, 94, ${p.opacity})`
        ctx.fill()
      })

      // Draw connections
      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach((p2) => {
          const dx = p1.x - p2.x
          const dy = p1.y - p2.y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < 150) {
            ctx.beginPath()
            ctx.moveTo(p1.x, p1.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.strokeStyle = `rgba(34, 197, 94, ${0.1 * (1 - dist / 150)})`
            ctx.stroke()
          }
        })
      })

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animationId)
    }
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (email) {
      setIsSubmitted(true)
      setEmail('')
    }
  }

  if (!isMounted) return null

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      {/* Particle Canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: 0 }}
      />

      {/* Gradient Overlays */}
      <div className="fixed inset-0 bg-gradient-to-b from-logistics-900/20 via-transparent to-black/80 pointer-events-none" />
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,rgba(34,197,94,0.15),transparent_50%)] pointer-events-none" />

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="w-full py-6 px-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-logistics-400 transition-colors duration-300"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            <span className="font-semibold">Back to Home</span>
          </Link>
        </header>

        {/* Hero Section */}
        <main className="flex-1 flex items-center justify-center px-4 sm:px-8 py-12">
          <div className="max-w-4xl mx-auto text-center">
            {/* Logo */}
            <div className="mb-12">
              <GlassmorphicLogo theme="logistics" />
            </div>

            {/* Coming Soon Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-logistics-500/10 border border-logistics-500/30 mb-8">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-logistics-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-logistics-500"></span>
              </span>
              <span className="text-sm font-bold text-logistics-400 uppercase tracking-wider">
                Coming Soon
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black mb-6">
              <span className="text-white">AI in</span>
              <span className="block mt-2 bg-gradient-to-r from-logistics-400 via-logistics-300 to-logistics-500 bg-clip-text text-transparent">
                Logistics
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl sm:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
              Supply Chain Management Training with AI Integration. Transform your career in the logistics industry.
            </p>

            {/* Feature Preview */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12 max-w-3xl mx-auto">
              {[
                { icon: '📦', label: 'Supply Chain AI' },
                { icon: '🚚', label: 'Logistics Automation' },
                { icon: '📊', label: 'Predictive Analytics' },
              ].map((item, index) => (
                <div
                  key={index}
                  className="px-6 py-4 rounded-2xl bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 hover:border-logistics-500/30 transition-colors duration-300"
                >
                  <span className="text-3xl mb-2 block">{item.icon}</span>
                  <span className="text-sm font-semibold text-gray-300">{item.label}</span>
                </div>
              ))}
            </div>

            {/* Email Signup Card */}
            <div className="max-w-xl mx-auto">
              <div className="relative p-8 rounded-3xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl border border-gray-700/50 shadow-2xl">
                {/* Glow Effect */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-logistics-500/10 to-transparent opacity-50" />

                <div className="relative z-10">
                  {!isSubmitted ? (
                    <>
                      <h2 className="text-2xl font-bold text-white mb-2">
                        Be the First to Know
                      </h2>
                      <p className="text-gray-400 mb-6">
                        Get notified when our logistics program launches.
                      </p>

                      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Enter your email"
                          required
                          className="flex-1 px-6 py-4 bg-gray-900/80 rounded-xl border border-gray-700/50 focus:border-logistics-500/50 focus:outline-none focus:ring-2 focus:ring-logistics-500/20 text-white placeholder-gray-500 transition-all duration-300"
                        />
                        <button
                          type="submit"
                          className="px-8 py-4 bg-gradient-to-r from-logistics-500 to-logistics-600 rounded-xl font-bold text-white shadow-lg hover:shadow-logistics-500/25 transform transition-all duration-300 hover:scale-105 active:scale-95"
                        >
                          Notify Me
                        </button>
                      </form>
                    </>
                  ) : (
                    <div className="py-4">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-logistics-500/20 flex items-center justify-center">
                        <svg
                          className="w-8 h-8 text-logistics-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <h2 className="text-2xl font-bold text-white mb-2">
                        You're on the List!
                      </h2>
                      <p className="text-gray-400">
                        We'll notify you as soon as the logistics program launches.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Explore Other Programs */}
            <div className="mt-12">
              <p className="text-gray-500 mb-4">In the meantime, explore our other programs:</p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/tech"
                  className="px-6 py-3 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 font-semibold hover:bg-gold-500/20 transition-all duration-300"
                >
                  AI in Tech
                </Link>
                <Link
                  href="/healthcare"
                  className="px-6 py-3 rounded-full bg-medical-500/10 border border-medical-500/30 text-medical-400 font-semibold hover:bg-medical-500/20 transition-all duration-300"
                >
                  AI in Healthcare
                </Link>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <SocialFooter />
      </div>
    </div>
  )
}

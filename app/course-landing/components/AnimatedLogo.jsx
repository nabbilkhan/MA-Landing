'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'

export default function AnimatedLogo({ className = '', size = 'large', enableEffects = true }) {
  const logoRef = useRef(null)
  const containerRef = useRef(null)
  const blobRef = useRef(null)
  const [isMounted, setIsMounted] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => {
      const mobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) || window.innerWidth < 768
      setIsMobile(mobile)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    setIsMounted(true)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Magnetic hover effect (Desktop only)
  useEffect(() => {
    if (!enableEffects || isMobile || !logoRef.current) return

    const logo = logoRef.current

    const handleMouseMove = (e) => {
      const rect = logo.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      const distance = Math.sqrt(
        Math.pow(e.clientX - centerX, 2) +
        Math.pow(e.clientY - centerY, 2)
      )

      const radius = 200 // Magnetic field radius

      if (distance < radius) {
        const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX)
        const strength = (radius - distance) / radius
        const maxPull = 15
        const x = Math.cos(angle) * strength * maxPull
        const y = Math.sin(angle) * strength * maxPull

        gsap.to(logo, {
          x: x,
          y: y,
          duration: 0.4,
          ease: 'power2.out'
        })

        // Subtle rotation based on position
        const rotateAmount = (x / maxPull) * 3
        gsap.to(logo, {
          rotateZ: rotateAmount,
          duration: 0.4,
          ease: 'power2.out'
        })
      } else {
        gsap.to(logo, {
          x: 0,
          y: 0,
          rotateZ: 0,
          duration: 0.4,
          ease: 'power2.out'
        })
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [enableEffects, isMobile])

  // Entrance animation
  useEffect(() => {
    if (!isMounted || !logoRef.current) return

    gsap.fromTo(logoRef.current,
      {
        opacity: 0,
        scale: 0.8,
        y: -30
      },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 1.2,
        ease: 'elastic.out(1, 0.6)',
        delay: 0.5
      }
    )

    // Particle burst effect
    if (enableEffects && containerRef.current) {
      const particles = []
      for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div')
        particle.className = 'logo-particle'
        containerRef.current.appendChild(particle)
        particles.push(particle)

        const angle = (Math.PI * 2 * i) / 20
        const distance = 50 + Math.random() * 100

        gsap.fromTo(particle,
          {
            x: 0,
            y: 0,
            opacity: 1,
            scale: 0
          },
          {
            x: Math.cos(angle) * distance,
            y: Math.sin(angle) * distance,
            opacity: 0,
            scale: 1,
            duration: 1.5,
            ease: 'power2.out',
            delay: 0.5,
            onComplete: () => {
              particle.remove()
            }
          }
        )
      }
    }
  }, [isMounted, enableEffects])

  // Blob morphing animation
  useEffect(() => {
    if (!enableEffects || !blobRef.current) return

    const animate = () => {
      gsap.to(blobRef.current, {
        attr: {
          d: 'M30,-35.5C38.7,-29.3,45.5,-20.3,47.9,-10.4C50.3,-0.5,48.4,10.3,43.4,19.2C38.4,28.1,30.3,35.1,21,37.8C11.7,40.5,1.2,38.9,-8.7,35.4C-18.6,31.9,-27.9,26.5,-34.6,18.7C-41.3,10.9,-45.4,0.7,-44.2,-9.6C-43,-20,-36.5,-30.5,-27.8,-36.4C-19.1,-42.3,-8.2,-43.6,1.4,-45.3C11,-47,21.3,-41.7,30,-35.5Z'
        },
        duration: 4,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true
      })
    }

    animate()
  }, [enableEffects])

  if (!isMounted) return null

  // Size variants
  const sizeClasses = {
    small: 'w-24 h-24 sm:w-32 sm:h-32',
    medium: 'w-32 h-32 sm:w-40 sm:h-40',
    large: 'w-40 h-40 sm:w-56 sm:h-56 md:w-64 md:h-64'
  }

  return (
    <div
      ref={containerRef}
      className={`relative ${className}`}
      style={{ perspective: '1000px' }}
    >
      {/* SVG Filters for Effects */}
      <svg className="absolute w-0 h-0">
        <defs>
          {/* Liquid Morphing Filter */}
          <filter id="liquid-morph">
            <feTurbulence type="fractalNoise" baseFrequency="0.01" numOctaves="3" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="10" xChannelSelector="R" yChannelSelector="G" />
            <feGaussianBlur stdDeviation="2" />
          </filter>

          {/* Glow Filter */}
          <filter id="glow-filter">
            <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>

          {/* Chromatic Aberration */}
          <filter id="chromatic">
            <feOffset in="SourceGraphic" dx="2" dy="0" result="r"/>
            <feOffset in="SourceGraphic" dx="-2" dy="0" result="b"/>
            <feBlend in="r" in2="SourceGraphic" mode="screen" result="rb"/>
            <feBlend in="b" in2="rb" mode="screen"/>
          </filter>
        </defs>
      </svg>

      {/* Liquid Blob Background */}
      {enableEffects && (
        <div className="absolute inset-0 flex items-center justify-center opacity-40 blur-2xl">
          <svg
            viewBox="0 0 200 200"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full"
          >
            <defs>
              <linearGradient id="blob-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#FFD700" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#B8860B" stopOpacity="0.8" />
              </linearGradient>
            </defs>
            <path
              ref={blobRef}
              d="M30,-35.5C38.7,-29.3,45.5,-20.3,47.9,-10.4C50.3,-0.5,48.4,10.3,43.4,19.2C38.4,28.1,30.3,35.1,21,37.8C11.7,40.5,1.2,38.9,-8.7,35.4C-18.6,31.9,-27.9,26.5,-34.6,18.7C-41.3,10.9,-45.4,0.7,-44.2,-9.6C-43,-20,-36.5,-30.5,-27.8,-36.4C-19.1,-42.3,-8.2,-43.6,1.4,-45.3C11,-47,21.3,-41.7,30,-35.5Z"
              transform="translate(100 100)"
              fill="url(#blob-gradient)"
              className="logo-blob"
            />
          </svg>
        </div>
      )}

      {/* Logo Container with Effects */}
      <div
        ref={logoRef}
        className={`relative ${sizeClasses[size]} group`}
        style={{
          transformStyle: 'preserve-3d',
          willChange: 'transform'
        }}
      >
        {/* Glow Rings */}
        {enableEffects && (
          <>
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-gold-500/20 to-gold-600/20 animate-pulse blur-xl"></div>
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-gold-500/10 to-gold-600/10 animate-ping" style={{ animationDuration: '3s' }}></div>
          </>
        )}

        {/* Main Logo Image */}
        <div className={`relative w-full h-full ${enableEffects ? 'logo-chromatic' : ''}`}>
          <Image
            src="/images/logos/mentor-agile-gold.png"
            alt="Mentor Agile"
            fill
            className="object-contain drop-shadow-2xl"
            style={{
              filter: enableEffects ? 'url(#glow-filter) drop-shadow(0 0 20px rgba(212, 175, 55, 0.6))' : 'none'
            }}
            priority
          />
        </div>

        {/* Floating Particles Around Logo */}
        {enableEffects && !isMobile && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 rounded-full bg-gold-400"
                style={{
                  top: '50%',
                  left: '50%',
                  animation: `orbit-${i % 4} ${6 + i}s linear infinite`,
                  animationDelay: `${i * 0.5}s`,
                  opacity: 0.4 + (i % 3) * 0.2
                }}
              />
            ))}
          </div>
        )}
      </div>

      <style jsx>{`
        .logo-particle {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 6px;
          height: 6px;
          background: radial-gradient(circle, #FFD700, #D4AF37);
          border-radius: 50%;
          pointer-events: none;
          box-shadow: 0 0 10px #FFD700;
        }

        .logo-chromatic:hover {
          filter: url(#chromatic);
          transition: filter 0.3s ease;
        }

        @keyframes orbit-0 {
          0% {
            transform: rotate(0deg) translateX(60px) rotate(0deg);
          }
          100% {
            transform: rotate(360deg) translateX(60px) rotate(-360deg);
          }
        }

        @keyframes orbit-1 {
          0% {
            transform: rotate(0deg) translateX(80px) rotate(0deg);
          }
          100% {
            transform: rotate(360deg) translateX(80px) rotate(-360deg);
          }
        }

        @keyframes orbit-2 {
          0% {
            transform: rotate(0deg) translateX(100px) rotate(0deg);
          }
          100% {
            transform: rotate(360deg) translateX(100px) rotate(-360deg);
          }
        }

        @keyframes orbit-3 {
          0% {
            transform: rotate(0deg) translateX(70px) rotate(0deg);
          }
          100% {
            transform: rotate(360deg) translateX(70px) rotate(-360deg);
          }
        }

        .logo-blob {
          transition: transform 0.3s ease;
        }

        .group:hover .logo-blob {
          transform: translate(100px, 100px) scale(1.1);
        }
      `}</style>
    </div>
  )
}

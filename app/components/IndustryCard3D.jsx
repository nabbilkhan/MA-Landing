'use client'

import { useRef, useState, useEffect } from 'react'
import Link from 'next/link'

// Theme color configurations
const themeColors = {
  gold: {
    gradient: 'from-gold-500 to-amber-500',
    glowColor: 'rgba(212, 175, 55, 0.4)',
    borderColor: 'border-gold-500/30',
    hoverBorder: 'hover:border-gold-400/60',
    textColor: 'text-gold-400',
    bgGlow: 'rgba(212, 175, 55, 0.15)',
    iconBg: 'from-gold-500 to-amber-600',
    buttonGradient: 'from-gold-500 to-amber-500',
  },
  medical: {
    gradient: 'from-medical-400 to-medical-600',
    glowColor: 'rgba(14, 165, 233, 0.4)',
    borderColor: 'border-medical-500/30',
    hoverBorder: 'hover:border-medical-400/60',
    textColor: 'text-medical-400',
    bgGlow: 'rgba(14, 165, 233, 0.15)',
    iconBg: 'from-medical-400 to-medical-600',
    buttonGradient: 'from-medical-400 to-medical-600',
  },
  logistics: {
    gradient: 'from-logistics-400 to-logistics-600',
    glowColor: 'rgba(34, 197, 94, 0.4)',
    borderColor: 'border-logistics-500/30',
    hoverBorder: 'hover:border-logistics-400/60',
    textColor: 'text-logistics-400',
    bgGlow: 'rgba(34, 197, 94, 0.15)',
    iconBg: 'from-logistics-400 to-logistics-600',
    buttonGradient: 'from-logistics-400 to-logistics-600',
  },
}

export default function IndustryCard3D({
  title,
  description,
  icon,
  href,
  theme = 'gold',
  features = [],
  stats = null,
  hasAIBadge = false,
  hasVRBadge = false,
  comingSoon = false,
}) {
  const cardRef = useRef(null)
  const [isMobile, setIsMobile] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const colors = themeColors[theme] || themeColors.gold

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || /iPhone|iPad|iPod|Android/i.test(navigator.userAgent))
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Mouse move tilt effect
  const handleMouseMove = (e) => {
    if (isMobile || !cardRef.current) return

    const card = cardRef.current
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const rotateX = (y - centerY) / 15
    const rotateY = (centerX - x) / 15

    card.style.transform = `
      perspective(1000px)
      rotateX(${-rotateX}deg)
      rotateY(${rotateY}deg)
      translateZ(20px)
      scale(1.02)
    `
  }

  const handleMouseLeave = () => {
    if (cardRef.current) {
      cardRef.current.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0) scale(1)'
    }
    setIsHovered(false)
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  return (
    <Link href={href} className="block group">
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={handleMouseEnter}
        className="relative h-full transition-all duration-500 ease-out"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Card Background with Glassmorphism */}
        <div
          className={`relative h-full p-8 rounded-3xl bg-gradient-to-br from-gray-800/30 to-gray-900/50 border ${colors.borderColor} ${colors.hoverBorder} shadow-2xl overflow-hidden backdrop-blur-xl transition-all duration-500`}
        >
          {/* Animated Gradient Glow */}
          <div
            className={`absolute inset-0 bg-gradient-to-br ${colors.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
          />

          {/* Top Accent Bar */}
          <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${colors.gradient}`} />

          {/* Coming Soon Badge - Top Right Corner */}
          {comingSoon && (
            <div className="absolute top-4 right-4 z-30">
              <div className="relative group/badge">
                {/* Soft glow behind */}
                <div
                  className="absolute inset-0 rounded-full blur-md opacity-80 animate-pulse-slow"
                  style={{
                    background: 'radial-gradient(circle, rgba(168, 85, 247, 0.6) 0%, transparent 70%)',
                    transform: 'scale(1.5)',
                  }}
                />
                {/* Main Badge */}
                <div
                  className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-full animate-badge-float"
                  style={{
                    background: 'linear-gradient(145deg, #C084FC 0%, #A855F7 30%, #9333EA 60%, #7E22CE 100%)',
                    boxShadow: `
                      0 2px 4px rgba(0,0,0,0.3),
                      0 4px 8px rgba(0,0,0,0.2),
                      inset 0 2px 4px rgba(255,255,255,0.6),
                      inset 0 -2px 4px rgba(0,0,0,0.1),
                      0 0 20px rgba(168, 85, 247, 0.4)
                    `,
                    border: '1px solid rgba(255, 255, 255, 0.4)',
                  }}
                >
                  {/* Clock icon */}
                  <svg className="w-4 h-4 text-purple-100" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                  <span className="text-white font-black text-xs tracking-wider uppercase" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>Coming Soon</span>
                </div>
              </div>
            </div>
          )}

          {/* Badges Container - Top Left Corner - Vertical Stack */}
          {(hasAIBadge || hasVRBadge) && (
            <div className="absolute top-4 left-4 z-30 flex flex-col gap-2">
              {/* AI Badge - Premium Gold Chip */}
              {hasAIBadge && (
                <div className="relative group/badge">
                  {/* Soft glow behind */}
                  <div
                    className="absolute inset-0 rounded-full blur-md opacity-80 animate-pulse-slow"
                    style={{
                      background: 'radial-gradient(circle, rgba(255, 215, 0, 0.6) 0%, transparent 70%)',
                      transform: 'scale(1.5)',
                    }}
                  />
                  {/* Main Badge */}
                  <div
                    className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-full animate-badge-float"
                    style={{
                      background: 'linear-gradient(145deg, #FFE066 0%, #FFD700 30%, #FFC000 60%, #E6A800 100%)',
                      boxShadow: `
                        0 2px 4px rgba(0,0,0,0.3),
                        0 4px 8px rgba(0,0,0,0.2),
                        inset 0 2px 4px rgba(255,255,255,0.6),
                        inset 0 -2px 4px rgba(0,0,0,0.1),
                        0 0 20px rgba(255, 215, 0, 0.4)
                      `,
                      border: '1px solid rgba(255, 255, 255, 0.4)',
                    }}
                  >
                    {/* AI Brain icon - Font Awesome */}
                    <svg className="w-4 h-4 text-amber-900" viewBox="0 0 512 512" fill="currentColor">
                      <path d="M184 0C214.9 0 240 25.07 240 56V456C240 486.9 214.9 512 184 512C155.1 512 131.3 490.1 128.3 461.9C123.1 463.3 117.6 464 112 464C76.65 464 48 435.3 48 400C48 392.6 49.27 385.4 51.59 378.8C21.43 367.4 0 338.2 0 304C0 272.1 18.71 244.5 45.77 231.7C37.15 220.8 32 206.1 32 192C32 161.3 53.59 135.7 82.41 129.4C80.84 123.9 80 118 80 112C80 82.06 100.6 56.92 128.3 49.93C131.3 21.86 155.1 0 184 0zM383.7 49.93C411.4 56.92 432 82.06 432 112C432 118 431.2 123.9 429.6 129.4C458.4 135.7 480 161.3 480 192C480 206.1 474.9 220.8 466.2 231.7C493.3 244.5 512 272.1 512 304C512 338.2 490.6 367.4 460.4 378.8C462.7 385.4 464 392.6 464 400C464 435.3 435.3 464 400 464C394.4 464 388.9 463.3 383.7 461.9C380.7 490.1 356.9 512 328 512C297.1 512 272 486.9 272 456V56C272 25.07 297.1 0 328 0C356.9 0 380.7 21.86 383.7 49.93z"/>
                    </svg>
                    <span className="text-amber-900 font-black text-xs tracking-wider uppercase" style={{ textShadow: '0 1px 0 rgba(255,255,255,0.5)' }}>AI</span>
                  </div>
                </div>
              )}

              {/* VR Badge - Premium Emerald Chip */}
              {hasVRBadge && (
                <div className="relative group/badge">
                  {/* Soft glow behind */}
                  <div
                    className="absolute inset-0 rounded-full blur-md opacity-80 animate-pulse-slow"
                    style={{
                      background: 'radial-gradient(circle, rgba(16, 185, 129, 0.6) 0%, transparent 70%)',
                      transform: 'scale(1.5)',
                      animationDelay: '0.5s',
                    }}
                  />
                  {/* Main Badge */}
                  <div
                    className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-full animate-badge-float"
                    style={{
                      background: 'linear-gradient(145deg, #6EE7B7 0%, #34D399 30%, #10B981 60%, #059669 100%)',
                      boxShadow: `
                        0 2px 4px rgba(0,0,0,0.3),
                        0 4px 8px rgba(0,0,0,0.2),
                        inset 0 2px 4px rgba(255,255,255,0.6),
                        inset 0 -2px 4px rgba(0,0,0,0.1),
                        0 0 20px rgba(16, 185, 129, 0.4)
                      `,
                      border: '1px solid rgba(255, 255, 255, 0.4)',
                      animationDelay: '0.3s',
                    }}
                  >
                    {/* VR Headset icon - Font Awesome */}
                    <svg className="w-4 h-4 text-emerald-900" viewBox="0 0 640 512" fill="currentColor">
                      <path d="M576 64H64c-35.2 0-64 28.8-64 64v256c0 35.2 28.8 64 64 64l128.3 .0001c25.18 0 48.03-14.77 58.37-37.73l27.76-61.65c7.875-17.5 24-28.63 41.63-28.63s33.75 11.13 41.63 28.63l27.75 61.63c10.35 22.98 33.2 37.75 58.4 37.75L576 448c35.2 0 64-28.8 64-64v-256C640 92.8 611.2 64 576 64zM160 304c-35.38 0-64-28.63-64-64s28.62-63.1 64-63.1s64 28.62 64 63.1S195.4 304 160 304zM480 304c-35.38 0-64-28.63-64-64s28.62-63.1 64-63.1s64 28.62 64 63.1S515.4 304 480 304z"/>
                    </svg>
                    <span className="text-emerald-900 font-black text-xs tracking-wider uppercase" style={{ textShadow: '0 1px 0 rgba(255,255,255,0.5)' }}>VR</span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Floating Glow Orb */}
          <div
            className="absolute -top-20 -right-20 w-40 h-40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-3xl"
            style={{ background: colors.bgGlow }}
          />

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center text-center h-full min-h-[420px]">
            {/* Icon Container */}
            <div className="relative">
              <div
                className={`relative w-24 h-24 rounded-2xl bg-gradient-to-br ${colors.iconBg} flex items-center justify-center shadow-2xl transform transition-all duration-500 group-hover:scale-110 group-hover:-translate-y-2`}
              >
                <span className="text-5xl">{icon}</span>

                {/* Icon Glow */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-60 transition-opacity duration-500 blur-xl"
                  style={{ background: colors.glowColor }}
                />
              </div>
            </div>

            {/* Title */}
            <h3
              className={`mt-8 text-2xl sm:text-3xl font-black text-white tracking-tight group-hover:${colors.textColor} transition-colors duration-300`}
            >
              {title}
            </h3>

            {/* Description */}
            <p className="mt-3 text-base text-gray-300 leading-relaxed">{description}</p>

            {/* Features List */}
            {features.length > 0 && (
              <ul className="mt-6 space-y-3 text-left w-full flex-grow">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-3 text-sm text-gray-300">
                    <div
                      className={`w-5 h-5 rounded-full bg-gradient-to-r ${colors.gradient} flex items-center justify-center flex-shrink-0`}
                    >
                      <svg
                        className="w-3 h-3 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            )}

            {/* Stats Badge */}
            {stats && (
              <div className="mt-6 flex justify-center gap-6">
                {Object.entries(stats).map(([key, value]) => (
                  <div key={key} className="text-center">
                    <div className={`text-2xl font-black ${colors.textColor}`}>{value}</div>
                    <div className="text-xs text-gray-400 uppercase tracking-wider">{key}</div>
                  </div>
                ))}
              </div>
            )}

            {/* CTA Button */}
            <div className="mt-auto pt-6 w-full">
              <div
                className={`w-full px-6 py-4 rounded-xl bg-gradient-to-r ${colors.buttonGradient} font-bold text-white text-center shadow-lg transform transition-all duration-300 group-hover:shadow-2xl group-hover:scale-105`}
              >
                Explore Program
                <span className="inline-block ml-2 transform transition-transform duration-300 group-hover:translate-x-1">
                  &rarr;
                </span>
              </div>
            </div>
          </div>

          {/* Corner Accent */}
          <div className="absolute bottom-0 right-0 w-40 h-40 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
            <div className={`absolute inset-0 bg-gradient-to-tl ${colors.gradient} rounded-tl-full`} />
          </div>

          {/* Shimmer Effect */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none overflow-hidden rounded-3xl">
            <div
              className="absolute -top-1/2 -left-1/2 w-full h-full"
              style={{
                background: `linear-gradient(120deg, transparent 40%, ${colors.glowColor} 50%, transparent 60%)`,
                animation: isHovered ? 'shimmer 2s ease-in-out infinite' : 'none',
              }}
            />
          </div>
        </div>

        {/* Shadow Layer for 3D Depth */}
        <div
          className="absolute inset-0 -z-10 rounded-3xl bg-black/50 blur-2xl opacity-0 group-hover:opacity-70 transition-all duration-500 transform translate-y-6 scale-95"
        />

        <style jsx>{`
          @keyframes shimmer {
            0% {
              transform: translateX(-100%) translateY(-100%) rotate(30deg);
            }
            100% {
              transform: translateX(100%) translateY(100%) rotate(30deg);
            }
          }
        `}</style>
      </div>
    </Link>
  )
}

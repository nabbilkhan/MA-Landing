'use client'

import { useRef, useState, useCallback } from 'react'
import Image from 'next/image'

/**
 * HolographicBadge - Pokemon Card CSS inspired holographic effect
 * Based on https://github.com/simeydotme/pokemon-cards-css
 */
export default function HolographicBadge({ logo, name, fullName, bg = 'bg-white' }) {
  const cardRef = useRef(null)
  const [isHovered, setIsHovered] = useState(false)
  const [pointer, setPointer] = useState({ x: 50, y: 50 })
  const [rotation, setRotation] = useState({ x: 0, y: 0 })

  // Calculate pointer position and rotation on mouse move
  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    // Calculate percentages
    const percentX = Math.max(0, Math.min(100, (x / rect.width) * 100))
    const percentY = Math.max(0, Math.min(100, (y / rect.height) * 100))

    // Calculate rotation based on center
    const centerX = percentX - 50
    const centerY = percentY - 50
    const rotateX = centerY / 5
    const rotateY = -centerX / 5

    setPointer({ x: percentX, y: percentY })
    setRotation({ x: rotateX, y: rotateY })
  }, [])

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    setPointer({ x: 50, y: 50 })
    setRotation({ x: 0, y: 0 })
  }

  // Calculate distance from center (0 to 1)
  const pointerFromCenter = Math.min(
    1,
    Math.sqrt(
      Math.pow((pointer.y - 50) / 50, 2) + Math.pow((pointer.x - 50) / 50, 2)
    )
  )

  return (
    <div className="credential-item flex flex-col items-center text-center group">
      {/* Holographic Card Container */}
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="relative cursor-pointer"
        style={{
          perspective: '1000px',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Card with 3D transform */}
        <div
          className={`relative w-28 h-28 md:w-36 md:h-36 rounded-2xl ${bg} overflow-hidden transition-transform duration-200 ease-out`}
          style={{
            transform: isHovered
              ? `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale(1.05)`
              : 'rotateX(0deg) rotateY(0deg) scale(1)',
            boxShadow: isHovered
              ? `0 20px 40px rgba(0,0,0,0.4), 0 0 30px rgba(255,215,0,0.3)`
              : '0 8px 24px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.5)',
          }}
        >
          {/* Logo Image */}
          <div className="absolute inset-0 flex items-center justify-center p-4 z-10">
            <Image
              src={logo}
              alt={name}
              width={120}
              height={120}
              className="object-contain"
            />
          </div>

          {/* Holographic Shine Layer */}
          <div
            className="absolute inset-0 z-20 pointer-events-none transition-opacity duration-300"
            style={{
              opacity: isHovered ? 1 : 0,
              background: `
                linear-gradient(
                  115deg,
                  transparent 20%,
                  rgba(255, 219, 112, 0.4) 36%,
                  rgba(255, 196, 112, 0.4) 43%,
                  rgba(255, 180, 112, 0.4) 50%,
                  rgba(148, 187, 233, 0.4) 57%,
                  rgba(170, 148, 233, 0.4) 64%,
                  rgba(233, 148, 212, 0.4) 71%,
                  transparent 80%
                )
              `,
              backgroundPosition: `${pointer.x}% ${pointer.y}%`,
              backgroundSize: '300% 300%',
              mixBlendMode: 'overlay',
            }}
          />

          {/* Rainbow Gradient Overlay */}
          <div
            className="absolute inset-0 z-20 pointer-events-none transition-opacity duration-300"
            style={{
              opacity: isHovered ? 0.7 : 0,
              background: `
                repeating-linear-gradient(
                  ${45 + (pointer.x - 50) * 0.5}deg,
                  hsla(53, 80%, 65%, 0.3) 0%,
                  hsla(93, 70%, 55%, 0.3) 8%,
                  hsla(176, 70%, 55%, 0.3) 16%,
                  hsla(228, 75%, 60%, 0.3) 24%,
                  hsla(283, 75%, 60%, 0.3) 32%,
                  hsla(326, 75%, 55%, 0.3) 40%,
                  hsla(53, 80%, 65%, 0.3) 48%
                )
              `,
              backgroundSize: '200% 200%',
              backgroundPosition: `${pointer.x * 2}% ${pointer.y * 2}%`,
              mixBlendMode: 'color-dodge',
              filter: `brightness(${1 + pointerFromCenter * 0.3}) saturate(1.2)`,
            }}
          />

          {/* Glare/Spotlight Effect */}
          <div
            className="absolute inset-0 z-30 pointer-events-none transition-opacity duration-300"
            style={{
              opacity: isHovered ? 0.6 + pointerFromCenter * 0.4 : 0,
              background: `
                radial-gradient(
                  farthest-corner circle at ${pointer.x}% ${pointer.y}%,
                  rgba(255, 255, 255, 0.8) 0%,
                  rgba(255, 255, 255, 0.4) 20%,
                  transparent 60%
                )
              `,
              mixBlendMode: 'overlay',
            }}
          />

          {/* Sparkle/Glitter Effect */}
          <div
            className="absolute inset-0 z-20 pointer-events-none transition-opacity duration-300"
            style={{
              opacity: isHovered ? 0.4 : 0,
              backgroundImage: `
                radial-gradient(circle at 20% 30%, rgba(255,255,255,0.8) 1px, transparent 1px),
                radial-gradient(circle at 70% 60%, rgba(255,255,255,0.8) 1px, transparent 1px),
                radial-gradient(circle at 40% 80%, rgba(255,255,255,0.8) 1px, transparent 1px),
                radial-gradient(circle at 80% 20%, rgba(255,255,255,0.8) 1px, transparent 1px),
                radial-gradient(circle at 50% 50%, rgba(255,255,255,0.8) 1px, transparent 1px)
              `,
              backgroundSize: '100% 100%',
              mixBlendMode: 'overlay',
              animation: isHovered ? 'sparkle 2s ease-in-out infinite' : 'none',
            }}
          />

          {/* Border Glow */}
          <div
            className="absolute inset-0 rounded-2xl z-0 pointer-events-none transition-opacity duration-300"
            style={{
              opacity: isHovered ? 1 : 0,
              boxShadow: `
                inset 0 0 20px rgba(255, 215, 0, 0.3),
                inset 0 0 40px rgba(255, 215, 0, 0.1)
              `,
            }}
          />
        </div>

        {/* Shadow beneath card */}
        <div
          className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3/4 h-4 rounded-full transition-all duration-300"
          style={{
            background: 'rgba(0,0,0,0.3)',
            filter: 'blur(8px)',
            transform: isHovered
              ? `translateX(-50%) translateY(${rotation.x * 0.5}px) scale(1.1)`
              : 'translateX(-50%) scale(0.9)',
            opacity: isHovered ? 0.6 : 0.3,
          }}
        />
      </div>

      {/* Certification Name */}
      <span className="mt-4 text-sm md:text-base font-semibold text-white/90 transition-all duration-300 group-hover:text-gold-400">
        {fullName}
      </span>

      {/* Inline Keyframes for Sparkle */}
      <style jsx>{`
        @keyframes sparkle {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 0.6;
            transform: scale(1.02);
          }
        }
      `}</style>
    </div>
  )
}

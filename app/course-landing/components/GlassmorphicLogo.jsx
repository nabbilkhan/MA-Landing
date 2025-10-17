'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

export default function GlassmorphicLogo({
  logoPath = '/images/logos/mentor-agile-gold.png',
  className = ''
}) {
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

  if (!isMounted) return null

  return (
    <div className={`glassmorphic-logo-wrapper ${className}`}>
      {/* Glassmorphic Container with Liquid Glass Effect */}
      <div className="glassmorphic-logo-container">
        {/* Animated Glow Background */}
        <div className="glow-orb glow-orb-1"></div>
        <div className="glow-orb glow-orb-2"></div>
        <div className="glow-orb glow-orb-3"></div>

        {/* Glass Panel */}
        <div className="glass-panel">
          {/* Liquid Shimmer Overlay */}
          <div className="liquid-shimmer"></div>

          {/* Logo Image */}
          <div className="logo-image-wrapper">
            <Image
              src={logoPath}
              alt="Mentor Agile"
              width={isMobile ? 300 : 500}
              height={isMobile ? 69 : 114}
              className="logo-image"
              priority
            />
          </div>
        </div>
      </div>

      <style jsx>{`
        /* Wrapper */
        .glassmorphic-logo-wrapper {
          position: relative;
          width: 100%;
          max-width: ${isMobile ? '320px' : '600px'};
          margin: 0 auto;
          padding: 20px;
        }

        /* Main Container */
        .glassmorphic-logo-container {
          position: relative;
          width: 100%;
          animation: float 6s ease-in-out infinite;
        }

        /* Animated Glow Orbs (Background) */
        .glow-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(60px);
          opacity: 0.4;
          animation: pulse-glow 4s ease-in-out infinite;
          pointer-events: none;
        }

        .glow-orb-1 {
          width: 200px;
          height: 200px;
          background: radial-gradient(circle, #FFD700 0%, #D4AF37 50%, transparent 70%);
          top: -50px;
          left: -50px;
          animation-delay: 0s;
        }

        .glow-orb-2 {
          width: 150px;
          height: 150px;
          background: radial-gradient(circle, #B8860B 0%, #996515 50%, transparent 70%);
          bottom: -30px;
          right: -30px;
          animation-delay: 1.5s;
        }

        .glow-orb-3 {
          width: 180px;
          height: 180px;
          background: radial-gradient(circle, #D4AF37 0%, #FFD700 50%, transparent 70%);
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          animation-delay: 3s;
        }

        /* Glass Panel - Apple Liquid Glass Effect */
        .glass-panel {
          position: relative;
          padding: ${isMobile ? '30px 20px' : '40px 30px'};
          background: rgba(212, 175, 55, 0.08);
          backdrop-filter: blur(20px) saturate(180%);
          -webkit-backdrop-filter: blur(20px) saturate(180%);
          border-radius: 30px;
          border: 1px solid rgba(255, 255, 255, 0.25);
          box-shadow:
            0 8px 32px rgba(212, 175, 55, 0.3),
            0 16px 64px rgba(0, 0, 0, 0.2),
            inset 0 1px 0 rgba(255, 255, 255, 0.3),
            inset 0 -1px 0 rgba(0, 0, 0, 0.1);
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .glass-panel:hover {
          transform: scale(1.05);
          background: rgba(212, 175, 55, 0.12);
          border-color: rgba(255, 215, 0, 0.4);
          box-shadow:
            0 12px 48px rgba(212, 175, 55, 0.5),
            0 24px 96px rgba(255, 215, 0, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.4);
        }

        /* Fallback for browsers without backdrop-filter */
        @supports not (backdrop-filter: blur(20px)) {
          .glass-panel {
            background: rgba(26, 22, 18, 0.85);
          }
        }

        /* Liquid Shimmer Sweep Animation */
        .liquid-shimmer {
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: linear-gradient(
            120deg,
            transparent 0%,
            transparent 40%,
            rgba(255, 255, 255, 0.3) 50%,
            rgba(255, 215, 0, 0.2) 55%,
            transparent 60%,
            transparent 100%
          );
          animation: liquid-sweep 8s ease-in-out infinite;
          pointer-events: none;
        }

        /* Logo Image Wrapper */
        .logo-image-wrapper {
          position: relative;
          z-index: 1;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .logo-image {
          width: 100%;
          height: auto;
          object-fit: contain;
          filter: drop-shadow(0 4px 12px rgba(212, 175, 55, 0.4));
          transition: filter 0.4s ease;
        }

        .glass-panel:hover .logo-image {
          filter: drop-shadow(0 8px 24px rgba(255, 215, 0, 0.6));
        }

        /* Animations */
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-15px);
          }
        }

        @keyframes pulse-glow {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 0.6;
            transform: scale(1.1);
          }
        }

        @keyframes liquid-sweep {
          0% {
            transform: translateX(-100%) translateY(-100%) rotate(30deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateX(100%) translateY(100%) rotate(30deg);
            opacity: 0;
          }
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
          .glassmorphic-logo-wrapper {
            padding: 15px;
          }

          .glass-panel {
            border-radius: 20px;
          }

          .glow-orb {
            filter: blur(40px);
          }
        }

        /* Entrance Animation */
        .glassmorphic-logo-container {
          animation: float 6s ease-in-out infinite, fade-in 0.8s ease-out;
        }

        @keyframes fade-in {
          0% {
            opacity: 0;
            transform: translateY(-20px) scale(0.95);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </div>
  )
}

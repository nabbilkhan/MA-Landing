'use client'

import { useState, useEffect } from 'react'

export default function IBHEBanner({ onCTAClick }) {
  const [isVisible, setIsVisible] = useState(true)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    // Check if banner was previously dismissed
    const dismissed = localStorage.getItem('ibheBannerDismissed')
    if (dismissed === 'true') {
      setIsVisible(false)
    }
  }, [])

  const handleDismiss = () => {
    setIsVisible(false)
    localStorage.setItem('ibheBannerDismissed', 'true')
  }

  const handleCTA = () => {
    // Trigger the path selection modal
    if (onCTAClick) {
      onCTAClick();
    }
  }

  // Don't render on server or if dismissed
  if (!isMounted || !isVisible) {
    return null
  }

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] animate-slide-down" style={{ pointerEvents: 'auto' }}>
      {/* Glassmorphic Banner */}
      <div className="relative overflow-hidden backdrop-blur-md bg-gradient-to-r from-gold-500/95 via-amber-500/95 to-gold-600/95 border-b border-gold-400/30 shadow-2xl">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.3),transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
        </div>

        {/* Content Container */}
        <div className="relative max-w-[1920px] mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">

            {/* Left: Icon + Message */}
            <div className="flex items-center gap-3 sm:gap-4 flex-1 text-center sm:text-left">
              {/* IBHE Seal Icon */}
              <div className="hidden sm:flex items-center justify-center w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 shadow-lg">
                <span className="text-2xl">🏛️</span>
              </div>

              {/* Message */}
              <div className="flex flex-col sm:flex-row items-center sm:items-center gap-1 sm:gap-2">
                <span className="flex items-center gap-2 text-base sm:text-lg font-black text-white drop-shadow-sm">
                  <span className="text-xl sm:hidden">🏛️</span>
                  <span className="uppercase tracking-wide">IBHE Approved</span>
                </span>
                <span className="hidden sm:block text-white font-bold">•</span>
                <span className="text-sm sm:text-base font-bold text-white">
                  Illinois Board of Higher Education Certified Training Provider
                </span>
              </div>
            </div>

            {/* Right: Limited Seats Badge + CTA Button + Close */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Limited Seats Open Badge */}
              <div className="hidden sm:inline-flex items-center gap-2 px-3 py-2 bg-gray-900/60 backdrop-blur-sm rounded-full border border-white/20">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-gradient-to-r from-green-400 to-green-500"></span>
                </span>
                <span className="text-xs font-bold text-white">Limited Seats Open</span>
              </div>

              {/* CTA Button */}
              <button
                onClick={handleCTA}
                className="banner-cta-3d-button relative min-h-[44px] px-5 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-full font-black text-sm sm:text-base text-white cursor-pointer select-none"
                style={{ touchAction: 'manipulation' }}
              >
                <span className="relative z-10 flex items-center gap-2 drop-shadow-sm">
                  <span>Change Your Career!</span>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </button>

              {/* Close Button */}
              <button
                onClick={handleDismiss}
                className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-900/20 hover:bg-gray-900/40 backdrop-blur-sm transition-all duration-300 hover:scale-110 active:scale-90"
                aria-label="Dismiss banner"
              >
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

          </div>
        </div>

        {/* Bottom Glow Effect */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>
      </div>

      <style jsx>{`
        /* Ultra-Tactile 3D Banner CTA Button with 8 Depth Layers - Reliable Clicks */
        .banner-cta-3d-button {
          /* 8 shadow layers for maximum 3D depth (dark theme) */
          box-shadow:
            0 1px 0 0 rgba(75, 85, 99, 0.9),        /* Layer 1: Top highlight */
            0 2px 0 0 rgba(55, 65, 81, 1),          /* Layer 2: Upper edge */
            0 3px 0 0 rgba(55, 65, 81, 0.95),       /* Layer 3 */
            0 4px 0 0 rgba(31, 41, 55, 0.9),        /* Layer 4: Mid */
            0 6px 0 0 rgba(31, 41, 55, 0.85),       /* Layer 5 */
            0 8px 0 0 rgba(17, 24, 39, 0.8),        /* Layer 6 */
            0 10px 0 0 rgba(0, 0, 0, 0.7),          /* Layer 7: Lower depth */
            0 12px 20px rgba(0, 0, 0, 0.4),         /* Layer 8: Base shadow */
            0 0 30px rgba(255, 255, 255, 0.1);      /* Subtle glow */

          transform: translateY(0px);
          transition: all 0.12s cubic-bezier(0.4, 0, 0.2, 1);
          will-change: transform, box-shadow;

          /* Text styling for depth */
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        }

        /* Hover State - Lift the button */
        .banner-cta-3d-button:hover {
          transform: translateY(-4px);
          box-shadow:
            0 1px 0 0 rgba(75, 85, 99, 1),
            0 3px 0 0 rgba(55, 65, 81, 1),
            0 5px 0 0 rgba(55, 65, 81, 0.95),
            0 7px 0 0 rgba(31, 41, 55, 0.95),
            0 10px 0 0 rgba(31, 41, 55, 0.9),
            0 13px 0 0 rgba(17, 24, 39, 0.85),
            0 16px 0 0 rgba(0, 0, 0, 0.75),
            0 18px 30px rgba(0, 0, 0, 0.5),
            0 0 40px rgba(255, 255, 255, 0.15),
            0 0 60px rgba(212, 175, 55, 0.25);
        }

        /* Active/Click State - Deep press-down with sunken inset */
        .banner-cta-3d-button:active {
          transform: translateY(8px);  /* Deep press-down */
          box-shadow:
            inset 0 3px 6px rgba(0, 0, 0, 0.5),    /* Sunken inset top */
            inset 0 2px 4px rgba(0, 0, 0, 0.6),    /* Sunken inset mid */
            0 1px 2px rgba(0, 0, 0, 0.2),          /* Minimal outer shadow */
            0 0 15px rgba(255, 255, 255, 0.1);     /* Subtle glow */
          transition: all 0.08s cubic-bezier(0.4, 0, 0.6, 1);
        }

        /* Subtle pulse animation for attention */
        @keyframes banner-pulse {
          0%, 100% {
            filter: brightness(1);
          }
          50% {
            filter: brightness(1.1);
          }
        }

        .banner-cta-3d-button {
          animation: banner-pulse 3s ease-in-out infinite;
        }

        /* Focus state for accessibility */
        .banner-cta-3d-button:focus-visible {
          outline: 3px solid rgba(212, 175, 55, 0.6);
          outline-offset: 2px;
        }
      `}</style>
    </div>
  )
}

'use client'

import { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function NavigationHeader({ onCTAClick }) {
  const [isVisible, setIsVisible] = useState(false)
  const headerRef = useRef(null)
  const [isMounted, setIsMounted] = useState(false)

  // Smooth scroll function
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const offset = 80 // Account for header height
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Show/hide header based on scroll
  useEffect(() => {
    if (!isMounted) return

    const handleScroll = () => {
      const scrollPosition = window.scrollY
      // Show header after scrolling down 300px
      if (scrollPosition > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isMounted])

  // Animate header entrance
  useEffect(() => {
    if (!headerRef.current) return

    if (isVisible) {
      gsap.to(headerRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.5,
        ease: 'power3.out'
      })
    } else {
      gsap.to(headerRef.current, {
        y: -100,
        opacity: 0,
        duration: 0.3,
        ease: 'power3.in'
      })
    }
  }, [isVisible])

  if (!isMounted) return null

  return (
    <header
      ref={headerRef}
      className="fixed top-0 left-0 right-0 z-[90] opacity-0"
      style={{ transform: 'translateY(-100px)', pointerEvents: 'auto' }}
    >
      {/* Glassmorphic Background */}
      <div className="relative backdrop-blur-xl bg-black/80 border-b border-gold-500/20 shadow-2xl">
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-gold-500/5 via-transparent to-gold-500/5 pointer-events-none"></div>

        {/* Animated shine effect */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute top-0 left-[-100%] w-[200%] h-full bg-gradient-to-r from-transparent via-gold-500/10 to-transparent"
            style={{
              animation: 'shine 8s ease-in-out infinite'
            }}
          ></div>
        </div>

        {/* Content Container */}
        <div className="relative max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">

            {/* Logo + Brand Name */}
            <div className="flex items-center gap-3 sm:gap-4 group">
              {/* Logo */}
              <div className="relative w-10 h-10 sm:w-12 sm:h-12 transition-transform duration-300 group-hover:scale-110">
                <Image
                  src="/images/logos/mentor-agile-gold.png"
                  alt="Mentor Agile"
                  fill
                  className="object-contain drop-shadow-lg"
                  style={{
                    filter: 'drop-shadow(0 0 10px rgba(212, 175, 55, 0.5))'
                  }}
                />
              </div>

              {/* Brand Name */}
              <div className="flex flex-col">
                <span className="text-base sm:text-lg font-black text-white tracking-tight">
                  Mentor Agile
                </span>
                <span className="hidden sm:block text-xs font-medium text-gold-400">
                  Product Management Training
                </span>
              </div>
            </div>

            {/* Navigation Links - Hidden on mobile, shown on desktop */}
            <nav className="hidden md:flex items-center gap-6 lg:gap-8">
              <button
                onClick={() => scrollToSection('certifications')}
                className="text-sm font-semibold text-gray-300 hover:text-gold-400 transition-colors duration-300 relative group/link"
              >
                Certifications
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold-400 group-hover/link:w-full transition-all duration-300"></span>
              </button>
              <button
                onClick={() => scrollToSection('modules')}
                className="text-sm font-semibold text-gray-300 hover:text-gold-400 transition-colors duration-300 relative group/link"
              >
                Curriculum
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold-400 group-hover/link:w-full transition-all duration-300"></span>
              </button>
              <button
                onClick={() => scrollToSection('testimonials')}
                className="text-sm font-semibold text-gray-300 hover:text-gold-400 transition-colors duration-300 relative group/link"
              >
                Testimonials
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold-400 group-hover/link:w-full transition-all duration-300"></span>
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="text-sm font-semibold text-gray-300 hover:text-gold-400 transition-colors duration-300 relative group/link"
              >
                Contact
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold-400 group-hover/link:w-full transition-all duration-300"></span>
              </button>
            </nav>

            {/* CTA Button - Beautiful 3D with Reliable Clicks */}
            <button
              onClick={onCTAClick}
              className="reserve-seat-3d-button relative min-h-[44px] px-5 sm:px-7 py-2.5 sm:py-3 bg-gradient-to-br from-gold-500 via-gold-600 to-gold-700 rounded-full font-black text-sm sm:text-base text-white cursor-pointer select-none"
              style={{ touchAction: 'manipulation' }}
            >
              <span className="relative z-10 drop-shadow-sm">Reserve Your Seat</span>
            </button>

          </div>
        </div>

        {/* Bottom border glow */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/50 to-transparent"></div>
      </div>

      <style jsx>{`
        @keyframes shine {
          0% {
            left: -100%;
          }
          50% {
            left: 100%;
          }
          100% {
            left: 100%;
          }
        }

        /* Ultra-Tactile 3D Button with 8 Depth Layers - Reliable Clicks */
        .reserve-seat-3d-button {
          /* 8 shadow layers for maximum 3D depth */
          box-shadow:
            0 1px 0 0 rgba(255, 215, 0, 0.9),        /* Layer 1: Top highlight */
            0 2px 0 0 rgba(212, 175, 55, 1),         /* Layer 2: Upper edge */
            0 3px 0 0 rgba(212, 175, 55, 0.95),      /* Layer 3 */
            0 4px 0 0 rgba(184, 134, 11, 0.9),       /* Layer 4: Mid */
            0 6px 0 0 rgba(184, 134, 11, 0.85),      /* Layer 5 */
            0 8px 0 0 rgba(139, 101, 8, 0.8),        /* Layer 6 */
            0 10px 0 0 rgba(101, 74, 6, 0.7),        /* Layer 7: Lower depth */
            0 12px 20px rgba(0, 0, 0, 0.4),          /* Layer 8: Base shadow */
            0 0 30px rgba(212, 175, 55, 0.35);       /* Glow effect */

          transform: translateY(0px);
          transition: all 0.12s cubic-bezier(0.4, 0, 0.2, 1);
          will-change: transform, box-shadow;

          /* Text styling for depth */
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        }

        /* Hover State - Lift the button */
        .reserve-seat-3d-button:hover {
          transform: translateY(-4px);
          box-shadow:
            0 1px 0 0 rgba(255, 215, 0, 1),
            0 3px 0 0 rgba(212, 175, 55, 1),
            0 5px 0 0 rgba(212, 175, 55, 0.95),
            0 7px 0 0 rgba(184, 134, 11, 0.95),
            0 10px 0 0 rgba(184, 134, 11, 0.9),
            0 13px 0 0 rgba(139, 101, 8, 0.85),
            0 16px 0 0 rgba(101, 74, 6, 0.75),
            0 18px 30px rgba(0, 0, 0, 0.5),
            0 0 40px rgba(212, 175, 55, 0.5),
            0 0 60px rgba(255, 215, 0, 0.3);
        }

        /* Active/Click State - Deep press-down with sunken inset */
        .reserve-seat-3d-button:active {
          transform: translateY(8px);  /* Deep press-down */
          box-shadow:
            inset 0 3px 6px rgba(0, 0, 0, 0.4),    /* Sunken inset top */
            inset 0 2px 4px rgba(0, 0, 0, 0.5),    /* Sunken inset mid */
            0 1px 2px rgba(0, 0, 0, 0.2),          /* Minimal outer shadow */
            0 0 15px rgba(212, 175, 55, 0.4);      /* Subtle glow */
          transition: all 0.08s cubic-bezier(0.4, 0, 0.6, 1);
        }

        /* Subtle pulse animation for attention */
        @keyframes subtle-glow-pulse {
          0%, 100% {
            filter: brightness(1);
          }
          50% {
            filter: brightness(1.08);
          }
        }

        .reserve-seat-3d-button {
          animation: subtle-glow-pulse 3s ease-in-out infinite;
        }

        /* Focus state for accessibility */
        .reserve-seat-3d-button:focus-visible {
          outline: 3px solid rgba(212, 175, 55, 0.6);
          outline-offset: 2px;
        }
      `}</style>
    </header>
  )
}

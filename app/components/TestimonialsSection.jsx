'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Quote, Star } from 'lucide-react'
import Image from 'next/image'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const testimonials = [
  {
    id: 1,
    name: 'Heian Alrouhsan',
    role: 'Product Owner (FinTech)',
    company: 'US Bank',
    photo: 'https://kajabi-storefronts-production.kajabi-cdn.com/kajabi-storefronts-production/file-uploads/themes/2156289409/settings_images/700fcb8-8f6d-d37-c30-b6176714c38_1_1_.png',
    quote: 'When I was finishing my degree at Lewis University, I felt excited about the future but also nervous. I knew a degree alone might not be enough to stand out in today\'s competitive job market. That\'s when I found Mentor Agile. Taking their Product Owner/Manager course before graduating was the best decision I ever made.',
    rating: 5,
    program: 'Product Owner/Manager',
    outcome: 'US Bank Position'
  },
  {
    id: 2,
    name: 'Umair Hussain',
    role: 'Sr. Business Analyst (FinTech)',
    company: 'Northern Trust',
    photo: 'https://kajabi-storefronts-production.kajabi-cdn.com/kajabi-storefronts-production/file-uploads/themes/2156289409/settings_images/30bb726-e1-127c-025b-72cdde07ae3e_2.png',
    quote: 'I never thought I\'d be someone who could earn six figures. For so long, I doubted myself, my abilities, and whether I\'d ever have the kind of career that could truly transform my life. But then I found Mentor Agile, and everything changed.',
    rating: 5,
    program: 'Business Analyst',
    outcome: 'Six-Figure Salary'
  },
  {
    id: 3,
    name: 'Michael H Khan',
    role: 'Product Manager (Healthcare)',
    company: 'Lifeline Biosciences',
    photo: 'https://kajabi-storefronts-production.kajabi-cdn.com/kajabi-storefronts-production/file-uploads/themes/2156289409/settings_images/66ddec-02a-0adf-3c72-a7bc53ed1b36_3.png',
    quote: 'When I left the Marines, I didn\'t know what to do next. The military gave me discipline and leadership skills, but I had no idea how to turn those into a career. I felt stuck and unsure about my future. That\'s when I found Mentor Agile, and it completely changed my life.',
    rating: 5,
    program: 'Product Manager',
    outcome: 'Career Transition'
  }
]

export default function TestimonialsSection({ compact = false }) {
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const cardsRef = useRef([])

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

      // Animate testimonial cards with stagger
      cardsRef.current.forEach((card, index) => {
        if (card) {
          gsap.from(card, {
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            },
            y: 80,
            opacity: 0,
            scale: 0.95,
            duration: 0.7,
            delay: index * 0.15,
            ease: 'power3.out'
          })
        }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="relative py-16 md:py-24 overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-gold-500/5 via-transparent to-transparent"></div>

      {/* Decorative Blur Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl opacity-50"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl opacity-50"></div>

      <div className="relative max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div ref={headerRef} className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 bg-gold-500/10 border border-gold-500/30 rounded-full px-4 py-2 mb-6">
            <Star className="w-4 h-4 text-gold-400 fill-gold-400" />
            <span className="text-sm font-bold text-gold-400 uppercase tracking-wider">
              Student Success Stories
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 md:mb-6">
            Hear From Our
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-gold-400 via-gold-300 to-gold-500">
              Successful Alumni
            </span>
          </h2>

          <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Real stories from real students who transformed their careers with Mentor Agile
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              ref={(el) => (cardsRef.current[index] = el)}
              className="relative backdrop-blur-xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 rounded-2xl p-6 md:p-8 hover:border-gold-500/50 transition-all duration-500 hover:scale-105 group"
            >
              {/* Quote Icon */}
              <div className="absolute top-6 right-6 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
                <Quote className="w-16 h-16 text-gold-400" />
              </div>

              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-gold-500/0 to-gold-500/0 group-hover:from-gold-500/5 group-hover:to-gold-600/5 rounded-2xl transition-all duration-500"></div>

              <div className="relative space-y-6">
                {/* Rating Stars */}
                <div className="flex gap-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-gold-500 fill-gold-500"
                    />
                  ))}
                </div>

                {/* Quote Text */}
                <blockquote className="text-base text-gray-300 leading-relaxed line-clamp-6 group-hover:text-gray-200 transition-colors duration-300">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>

                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent"></div>

                {/* Author Info */}
                <div className="flex items-center gap-4">
                  {/* Avatar */}
                  <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-gray-700 group-hover:border-gold-500/50 transition-colors duration-300 flex-shrink-0">
                    <img
                      src={testimonial.photo}
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Text Info */}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-white text-base truncate group-hover:text-gold-400 transition-colors duration-300">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-gray-400 truncate">
                      {testimonial.role}
                    </p>
                    <p className="text-sm text-gold-400 font-semibold truncate">
                      {testimonial.company}
                    </p>
                  </div>
                </div>

                {/* Badges */}
                <div className="flex flex-wrap gap-2 pt-2">
                  <div className="px-3 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/30">
                    <span className="text-xs font-bold text-gold-400">
                      {testimonial.program}
                    </span>
                  </div>
                  <div className="px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/30">
                    <span className="text-xs font-bold text-green-400">
                      ✓ {testimonial.outcome}
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom Shine */}
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
          ))}
        </div>

        {/* Bottom CTA (Optional) */}
        {!compact && (
          <div className="text-center mt-12 md:mt-16">
            <p className="text-lg text-gray-300 mb-4">
              Join hundreds of successful alumni who transformed their careers
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-gold-400 fill-gold-400" />
                <span>4.9/5 Average Rating</span>
              </div>
              <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
              <div>500+ Students Trained</div>
              <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
              <div>95% Job Placement Rate</div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

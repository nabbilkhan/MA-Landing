'use client'

import { useState, useEffect, useRef } from 'react'

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
    outcome: 'US Bank Position',
    videoUrl: null
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
    outcome: 'Six-Figure Salary',
    videoUrl: null
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
    outcome: 'Career Transition',
    videoUrl: null
  }
]

export default function TestimonialsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const intervalRef = useRef(null)

  // Auto-rotation logic
  useEffect(() => {
    if (isAutoPlaying && !isPaused) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
      }, 5000) // Change every 5 seconds

      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current)
        }
      }
    }
  }, [isAutoPlaying, isPaused])

  const goToSlide = (index) => {
    setCurrentIndex(index)
    setIsAutoPlaying(false) // Pause auto-play when user manually navigates
  }

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    )
    setIsAutoPlaying(false)
  }

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
    setIsAutoPlaying(false)
  }

  const currentTestimonial = testimonials[currentIndex]

  return (
    <section className="relative py-20 sm:py-28 overflow-hidden">
      {/* Glassmorphic Background */}
      <div className="absolute inset-0 bg-gray-900/10 backdrop-blur-md"></div>
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center mb-16 space-y-4" data-aos="fade-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold-500/10 border border-gold-500/30 mb-4">
            <span className="text-2xl">⭐</span>
            <span className="text-sm sm:text-base font-bold text-gold-400 uppercase tracking-wide">Student Success Stories</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight">
            Hear From Our
            <span className="block mt-2 text-white drop-shadow-[0_2px_8px_rgba(212,175,55,0.5)]">
              Successful Alumni
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto">
            Real stories from real students who transformed their careers with Mentor Agile
          </p>
        </div>

        {/* Carousel Container */}
        <div
          className="relative max-w-5xl mx-auto"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >

          {/* Main Testimonial Card */}
          <div className="relative">
            {/* Card */}
            <div className="relative p-8 sm:p-12 lg:p-16 rounded-3xl bg-gradient-to-br from-gray-800/20 to-gray-900/30 border border-gray-700/50 shadow-2xl overflow-hidden backdrop-blur-lg">

              {/* Quote Icon */}
              <div className="absolute top-8 right-8 text-8xl text-gold-500/10 font-serif">"</div>

              {/* Content */}
              <div className="relative z-10 space-y-8">

                {/* Rating Stars */}
                <div className="flex gap-1">
                  {[...Array(currentTestimonial.rating)].map((_, i) => (
                    <svg key={i} className="w-6 h-6 text-gold-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-xl sm:text-2xl lg:text-3xl font-medium text-gray-100 leading-relaxed">
                  {currentTestimonial.quote}
                </blockquote>

                {/* Author Info */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pt-6 border-t border-gray-700">

                  {/* Avatar + Info */}
                  <div className="flex items-center gap-4">
                    {/* Avatar */}
                    <div className="w-16 h-16 rounded-full shadow-lg border-2 border-gray-700 overflow-hidden">
                      <img
                        src={currentTestimonial.photo}
                        alt={currentTestimonial.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Text Info */}
                    <div>
                      <div className="font-bold text-lg text-white">{currentTestimonial.name}</div>
                      <div className="text-sm text-gray-200">{currentTestimonial.role}</div>
                      <div className="text-sm text-gold-400 font-semibold">{currentTestimonial.company}</div>
                    </div>
                  </div>

                  {/* Program + Outcome Badges */}
                  <div className="flex flex-wrap gap-3">
                    <div className="px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/30">
                      <span className="text-xs sm:text-sm font-bold text-blue-300">{currentTestimonial.program}</span>
                    </div>
                    <div className="px-4 py-2 rounded-full bg-green-500/10 border border-green-500/30">
                      <span className="text-xs sm:text-sm font-bold text-green-300">✓ {currentTestimonial.outcome}</span>
                    </div>
                  </div>

                </div>

              </div>

            </div>

            {/* Navigation Arrows */}
            <button
              onClick={goToPrevious}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 sm:-translate-x-6 w-12 h-12 rounded-full bg-gray-800/90 backdrop-blur-sm border border-gray-700 flex items-center justify-center text-white hover:bg-gray-700 transition-all duration-300 hover:scale-110 active:scale-90 shadow-xl"
              aria-label="Previous testimonial"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={goToNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 sm:translate-x-6 w-12 h-12 rounded-full bg-gray-800/90 backdrop-blur-sm border border-gray-700 flex items-center justify-center text-white hover:bg-gray-700 transition-all duration-300 hover:scale-110 active:scale-90 shadow-xl"
              aria-label="Next testimonial"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

          </div>

          {/* Dots Navigation */}
          <div className="flex items-center justify-center gap-3 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`transition-all duration-300 rounded-full ${
                  index === currentIndex
                    ? 'w-12 h-3 bg-gradient-to-r from-gold-500 to-amber-500'
                    : 'w-3 h-3 bg-gray-600 hover:bg-gray-500'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>

          {/* Auto-play Toggle */}
          <div className="flex justify-center mt-6">
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-800/50 backdrop-blur-sm border border-gray-700 text-sm font-semibold text-gray-300 hover:text-white hover:bg-gray-700/50 transition-all duration-300"
            >
              {isAutoPlaying ? (
                <>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <span>Pause</span>
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                  <span>Auto-play</span>
                </>
              )}
            </button>
          </div>

        </div>

      </div>
    </section>
  )
}

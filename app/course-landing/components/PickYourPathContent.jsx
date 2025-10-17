'use client';

import { motion } from 'framer-motion';

export default function PickYourPathContent() {
  const handleVIPClick = () => {
    window.open('https://courses.mentoragile.com/12-week-po-course', '_blank');
  };

  const handleOnDemandClick = () => {
    window.open('https://courses.mentoragile.com/offers/4HqAbvUj/checkout', '_blank');
  };

  return (
    <>
      {/* Title */}
      <div className="text-center mb-8 sm:mb-12">
        <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-2">
          Pick Your Path
        </h2>
      </div>

      {/* Options Grid */}
      <div className="grid md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 max-w-5xl mx-auto">

        {/* VIP Program Option */}
        <motion.div
          whileHover={{ scale: 1.01, y: -4 }}
          className="relative group overflow-hidden rounded-3xl border-4 border-blue-500 bg-white shadow-xl transition-all duration-300 hover:shadow-2xl hover:border-blue-600"
        >
          {/* BEST OUTCOMES Badge */}
          <div className="absolute top-4 sm:top-6 left-1/2 transform -translate-x-1/2 z-20">
            <div className="px-4 sm:px-6 py-1.5 sm:py-2 bg-blue-600 rounded-full shadow-lg">
              <span className="text-xs sm:text-sm font-black uppercase tracking-wider text-white">
                BEST OUTCOMES
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-4 sm:p-6 md:p-8 pt-12 sm:pt-16">
            {/* Title */}
            <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-gray-900 mb-2">
              VIP Program — Live + Pre-Recorded
            </h3>

            {/* Price */}
            <div className="mb-4 sm:mb-6">
              <span className="text-4xl sm:text-5xl md:text-6xl font-black text-blue-600">$6,000</span>
              <span className="text-base sm:text-lg text-gray-600 ml-2">/ 12 weeks</span>
            </div>

            {/* Features */}
            <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
              <div className="flex items-start gap-2 sm:gap-3">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-sm sm:text-base text-gray-700">Weekly live cohort sessions + full pre-recorded library</span>
              </div>
              <div className="flex items-start gap-2 sm:gap-3">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-sm sm:text-base text-gray-700">CSPO + 2 AI certifications guidance</span>
              </div>
              <div className="flex items-start gap-2 sm:gap-3">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-sm sm:text-base text-gray-700">Career assets: backlogs, user stories, artifacts & portfolio</span>
              </div>
              <div className="flex items-start gap-2 sm:gap-3">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-sm sm:text-base text-gray-700">Coach feedback & private community</span>
              </div>
              <div className="flex items-start gap-2 sm:gap-3">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-sm sm:text-base text-gray-700">No coding required — built for beginners</span>
              </div>
            </div>

            {/* CTA Button */}
            <button
              onClick={handleVIPClick}
              className="w-full min-h-[56px] px-6 sm:px-8 py-3 sm:py-4 bg-blue-600 hover:bg-blue-700 rounded-full font-black text-base sm:text-lg text-white shadow-lg transform transition-all duration-300 hover:scale-105 active:scale-95"
            >
              Book Your Free Consultation →
            </button>

            {/* Subtitle */}
            <p className="text-center text-xs sm:text-sm text-gray-500 mt-3 sm:mt-4">
              We'll confirm fit and lock your seat
            </p>
          </div>
        </motion.div>

        {/* On Demand Option */}
        <motion.div
          whileHover={{ scale: 1.01, y: -4 }}
          className="relative group overflow-hidden rounded-3xl border-2 border-gray-300 bg-gray-50 shadow-lg transition-all duration-300 hover:shadow-xl hover:border-gray-400"
        >
          {/* Content */}
          <div className="p-4 sm:p-6 md:p-8">
            {/* Title */}
            <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-gray-900 mb-2 mt-6 sm:mt-8">
              On Demand
            </h3>

            {/* Price */}
            <div className="mb-4 sm:mb-6">
              <span className="text-4xl sm:text-5xl md:text-6xl font-black text-blue-600">$800</span>
              <span className="text-base sm:text-lg text-gray-600 ml-2">/ Start today</span>
            </div>

            {/* Features */}
            <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
              <div className="flex items-start gap-2 sm:gap-3">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-sm sm:text-base text-gray-700">Complete video curriculum and templates</span>
              </div>
              <div className="flex items-start gap-2 sm:gap-3">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-sm sm:text-base text-gray-700">Assignments on your own schedule</span>
              </div>
              <div className="flex items-start gap-2 sm:gap-3">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-sm sm:text-base text-gray-700">Instant checkout and immediate access</span>
              </div>
            </div>

            {/* CTA Button */}
            <button
              onClick={handleOnDemandClick}
              className="w-full min-h-[56px] px-6 sm:px-8 py-3 sm:py-4 bg-blue-600 hover:bg-blue-700 rounded-full font-black text-base sm:text-lg text-white shadow-lg transform transition-all duration-300 hover:scale-105 active:scale-95"
            >
              Enroll Now →
            </button>

            {/* Subtitle */}
            <p className="text-center text-xs sm:text-sm text-gray-500 mt-3 sm:mt-4">
              Goes straight to checkout
            </p>
          </div>
        </motion.div>

      </div>

      {/* Bottom Notice */}
      <div className="mt-6 sm:mt-8 max-w-5xl mx-auto">
        <div className="flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-3 sm:py-4 bg-amber-50 border-l-4 border-amber-500 rounded-lg">
          <span className="text-xl sm:text-2xl flex-shrink-0">⏰</span>
          <p className="text-xs sm:text-sm md:text-base text-amber-900 font-semibold">
            Next cohort starts soon. Seats limited to keep sessions hands-on. First-come, first-served.
          </p>
        </div>
      </div>
    </>
  );
}

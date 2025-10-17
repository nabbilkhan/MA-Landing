'use client';

import { motion } from 'framer-motion';

export default function PathSelectionContent({ onSelectBlackFriday, onSelectStateFunded }) {
  return (
    <>
      {/* Title */}
      <div className="text-center mb-12">
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-4">
          <span className="text-gradient-gold">Choose Your Path</span>
        </h2>
        <p className="text-lg sm:text-xl text-gray-300">
          Select the option that best fits your career goals
        </p>
      </div>

      {/* Options Grid */}
      <div className="grid md:grid-cols-2 gap-6 lg:gap-8">

        {/* Black Friday Deal Option */}
        <motion.button
          whileHover={{ scale: 1.02, y: -4 }}
          whileTap={{ scale: 0.98 }}
          onClick={onSelectBlackFriday}
          className="group relative overflow-hidden rounded-2xl border-2 border-red-500/50 hover:border-red-500 bg-gradient-to-br from-red-600/20 via-orange-600/20 to-amber-600/20 backdrop-blur-sm p-8 transition-all duration-300 hover:shadow-2xl hover:shadow-red-500/30"
        >
          {/* Glow effect on hover */}
          <div className="absolute inset-0 bg-gradient-to-br from-red-500/0 via-orange-500/0 to-amber-500/0 group-hover:from-red-500/10 group-hover:via-orange-500/10 group-hover:to-amber-500/10 transition-all duration-300"></div>

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center text-center">
            {/* Icon */}
            <div className="mb-6 text-6xl animate-pulse">
              🔥
            </div>

            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-600 to-orange-600 rounded-full mb-4">
              <span className="text-xs font-black uppercase tracking-wider text-white">Limited Time</span>
            </div>

            {/* Title */}
            <h3 className="text-2xl sm:text-3xl font-black text-white mb-3">
              Black Friday Deal
            </h3>

            {/* Description */}
            <p className="text-base text-gray-200 mb-6">
              Special pricing for our premium training programs. Choose between VIP live sessions or on-demand learning.
            </p>

            {/* Features */}
            <div className="space-y-2 mb-6 w-full text-left">
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <svg className="w-5 h-5 text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Exclusive discounted rates</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <svg className="w-5 h-5 text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>3 industry certifications included</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <svg className="w-5 h-5 text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Immediate enrollment</span>
              </div>
            </div>

            {/* CTA */}
            <div className="inline-flex items-center gap-2 text-base font-bold text-white">
              <span>See Options</span>
              <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </div>
          </div>

          {/* Animated border glow */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute inset-[-2px] bg-gradient-to-r from-red-500 via-orange-500 to-amber-500 rounded-2xl blur-sm"></div>
          </div>
        </motion.button>

        {/* State Funded Option */}
        <motion.button
          whileHover={{ scale: 1.02, y: -4 }}
          whileTap={{ scale: 0.98 }}
          onClick={onSelectStateFunded}
          className="group relative overflow-hidden rounded-2xl border-2 border-blue-500/50 hover:border-blue-500 bg-gradient-to-br from-blue-600/20 via-indigo-600/20 to-purple-600/20 backdrop-blur-sm p-8 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/30"
        >
          {/* Glow effect on hover */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-indigo-500/0 to-purple-500/0 group-hover:from-blue-500/10 group-hover:via-indigo-500/10 group-hover:to-purple-500/10 transition-all duration-300"></div>

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center text-center">
            {/* Icon */}
            <div className="mb-6 text-6xl">
              🏛️
            </div>

            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mb-4">
              <span className="text-xs font-black uppercase tracking-wider text-white">If Eligible</span>
            </div>

            {/* Title */}
            <h3 className="text-2xl sm:text-3xl font-black text-white mb-3">
              State Funded
            </h3>

            {/* Description */}
            <p className="text-base text-gray-200 mb-6">
              Government-funded training program for eligible participants. Get certified at no cost to you.
            </p>

            {/* Features */}
            <div className="space-y-2 mb-6 w-full text-left">
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <svg className="w-5 h-5 text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>SNAP Recipients</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <svg className="w-5 h-5 text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Medicaid Recipients</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <svg className="w-5 h-5 text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Currently Unemployed</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <svg className="w-5 h-5 text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Veteran or Spouse of Veteran</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <svg className="w-5 h-5 text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Under 24 Years Old</span>
              </div>
            </div>

            {/* CTA */}
            <div className="inline-flex items-center gap-2 text-base font-bold text-white">
              <span>Check Eligibility</span>
              <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </div>
          </div>

          {/* Animated border glow */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute inset-[-2px] bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-2xl blur-sm"></div>
          </div>
        </motion.button>

      </div>

      <style jsx>{`
        .text-gradient-gold {
          display: inline-block;
          background: linear-gradient(135deg, #D4AF37 0%, #FFD700 25%, #D4AF37 50%, #FFD700 75%, #B8860B 100%);
          background-size: 200% 200%;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: gradient-flow 8s ease infinite;
        }

        @keyframes gradient-flow {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
      `}</style>
    </>
  );
}

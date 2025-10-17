'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Script from 'next/script';

export default function StateFundedContent() {
  const [selectedState, setSelectedState] = useState(null); // null | 'illinois' | 'wamola' | 'other'
  const [scriptLoaded, setScriptLoaded] = useState(false);

  const handleBackToSelection = () => {
    setSelectedState(null);
  };

  const getStateTitle = () => {
    switch (selectedState) {
      case 'illinois':
        return 'Illinois State-Funded Program';
      case 'wamola':
        return 'State-Funded Program';
      case 'other':
        return 'Check Your Eligibility';
      default:
        return '';
    }
  };

  const getStateSubtitle = () => {
    switch (selectedState) {
      case 'illinois':
        return 'Complete the form below to schedule your consultation';
      case 'wamola':
        return 'Complete the form below to schedule your consultation';
      case 'other':
        return 'Fill out the form to see if state funding is available in your area';
      default:
        return '';
    }
  };

  return (
    <>
      {/* Load form embed script when iframe view is shown */}
      {selectedState && (
        <Script
          src="https://link.msgsndr.com/js/form_embed.js"
          strategy="afterInteractive"
          onLoad={() => setScriptLoaded(true)}
        />
      )}

      {/* Back Button (shown in iframe view) - Mobile Optimized */}
      {selectedState && (
        <button
          onClick={handleBackToSelection}
          className="absolute top-3 left-3 sm:top-4 sm:left-4 z-20 min-h-[44px] px-4 sm:px-6 py-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center gap-2 transition-all duration-300 hover:scale-105"
          aria-label="Back to state selection"
        >
          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="text-white font-semibold hidden sm:inline">Back to States</span>
          <span className="text-white font-semibold sm:hidden">Back</span>
        </button>
      )}

      <AnimatePresence mode="wait">
        {/* State Selection View */}
        {!selectedState && (
          <motion.div
            key="selection"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Title */}
            <div className="text-center mb-12">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-4">
                <span className="text-gradient-gold">Select Your State</span>
              </h2>
              <p className="text-lg sm:text-xl text-gray-300">
                Choose your state to see available state-funded programs
              </p>
            </div>

            {/* Options Grid */}
            <div className="grid md:grid-cols-3 gap-6 lg:gap-8">

              {/* Option 1: Illinois */}
              <motion.button
                whileHover={{ scale: 1.02, y: -4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedState('illinois')}
                className="group relative overflow-hidden rounded-2xl border-2 border-blue-500/50 hover:border-blue-500 bg-gradient-to-br from-blue-600/20 via-blue-700/20 to-indigo-800/20 backdrop-blur-sm p-8 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/30"
              >
                {/* Glow effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-blue-600/0 to-indigo-600/0 group-hover:from-blue-500/10 group-hover:via-blue-600/10 group-hover:to-indigo-600/10 transition-all duration-300"></div>

                {/* Content */}
                <div className="relative z-10 flex flex-col items-center text-center">
                  {/* Icon */}
                  <div className="mb-6 text-6xl">
                    🏛️
                  </div>

                  {/* Badge */}
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full mb-4">
                    <span className="text-xs font-black uppercase tracking-wider text-white">Illinois Residents</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl sm:text-3xl font-black text-white mb-3">
                    Illinois
                  </h3>

                  {/* Description */}
                  <p className="text-base text-gray-200 mb-6">
                    State-funded training available for all Illinois residents statewide.
                  </p>

                  {/* Features */}
                  <div className="space-y-2 mb-6 w-full text-left">
                    <div className="flex items-center gap-2 text-sm text-gray-300">
                      <svg className="w-5 h-5 text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>State-funded training</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-300">
                      <svg className="w-5 h-5 text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>No cost to eligible participants</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-300">
                      <svg className="w-5 h-5 text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Available statewide</span>
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="inline-flex items-center gap-2 text-base font-bold text-white">
                    <span>Apply Now</span>
                    <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>
                </div>

                {/* Animated border glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute inset-[-2px] bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-600 rounded-2xl blur-sm"></div>
                </div>
              </motion.button>

              {/* Option 2: Washington, Missouri, Louisiana */}
              <motion.button
                whileHover={{ scale: 1.02, y: -4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedState('wamola')}
                className="group relative overflow-hidden rounded-2xl border-2 border-purple-500/50 hover:border-purple-500 bg-gradient-to-br from-purple-600/20 via-indigo-600/20 to-violet-700/20 backdrop-blur-sm p-8 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/30"
              >
                {/* Glow effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 via-indigo-500/0 to-violet-500/0 group-hover:from-purple-500/10 group-hover:via-indigo-500/10 group-hover:to-violet-500/10 transition-all duration-300"></div>

                {/* Content */}
                <div className="relative z-10 flex flex-col items-center text-center">
                  {/* Icon */}
                  <div className="mb-6 text-6xl">
                    🌎
                  </div>

                  {/* Badge */}
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full mb-4">
                    <span className="text-xs font-black uppercase tracking-wider text-white">WA • MO • LA</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl sm:text-3xl font-black text-white mb-3">
                    Washington, Missouri & Louisiana
                  </h3>

                  {/* Description */}
                  <p className="text-base text-gray-200 mb-6">
                    For residents of Washington, Missouri, or Louisiana.
                  </p>

                  {/* Features */}
                  <div className="space-y-2 mb-6 w-full text-left">
                    <div className="flex items-center gap-2 text-sm text-gray-300">
                      <svg className="w-5 h-5 text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>State-funded training</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-300">
                      <svg className="w-5 h-5 text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Available in these 3 states</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-300">
                      <svg className="w-5 h-5 text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Regional partnerships</span>
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="inline-flex items-center gap-2 text-base font-bold text-white">
                    <span>Apply Now</span>
                    <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>
                </div>

                {/* Animated border glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute inset-[-2px] bg-gradient-to-r from-purple-500 via-indigo-500 to-violet-500 rounded-2xl blur-sm"></div>
                </div>
              </motion.button>

              {/* Option 3: Other States */}
              <motion.button
                whileHover={{ scale: 1.02, y: -4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedState('other')}
                className="group relative overflow-hidden rounded-2xl border-2 border-slate-500/50 hover:border-slate-500 bg-gradient-to-br from-slate-600/20 via-gray-700/20 to-slate-800/20 backdrop-blur-sm p-8 transition-all duration-300 hover:shadow-2xl hover:shadow-slate-500/30"
              >
                {/* Glow effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-500/0 via-gray-500/0 to-slate-600/0 group-hover:from-slate-500/10 group-hover:via-gray-500/10 group-hover:to-slate-600/10 transition-all duration-300"></div>

                {/* Content */}
                <div className="relative z-10 flex flex-col items-center text-center">
                  {/* Icon */}
                  <div className="mb-6 text-6xl">
                    📍
                  </div>

                  {/* Badge */}
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-slate-600 to-gray-700 rounded-full mb-4">
                    <span className="text-xs font-black uppercase tracking-wider text-white">All Other States</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl sm:text-3xl font-black text-white mb-3">
                    Other States
                  </h3>

                  {/* Description */}
                  <p className="text-base text-gray-200 mb-6">
                    For residents of states other than IL, WA, MO, or LA.
                  </p>

                  {/* Features */}
                  <div className="space-y-2 mb-6 w-full text-left">
                    <div className="flex items-center gap-2 text-sm text-gray-300">
                      <svg className="w-5 h-5 text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Check eligibility</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-300">
                      <svg className="w-5 h-5 text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Custom programs</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-300">
                      <svg className="w-5 h-5 text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Expanding soon</span>
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="inline-flex items-center gap-2 text-base font-bold text-white">
                    <span>Schedule Consultation</span>
                    <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>
                </div>

                {/* Animated border glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute inset-[-2px] bg-gradient-to-r from-slate-500 via-gray-500 to-slate-600 rounded-2xl blur-sm"></div>
                </div>
              </motion.button>

            </div>
          </motion.div>
        )}

        {/* Iframe View */}
        {selectedState && (
          <motion.div
            key="iframe"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Header */}
            <div className="text-center mb-8">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-3">
                <span className="text-gradient-gold">{getStateTitle()}</span>
              </h2>
              <p className="text-base sm:text-lg text-gray-300">
                {getStateSubtitle()}
              </p>
            </div>

            {/* Iframe Container - Mobile Responsive */}
            <div className="w-full bg-white/5 rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
              {/* Illinois Booking Widget */}
              {selectedState === 'illinois' && (
                <div className="w-full" style={{ minHeight: '500px', maxHeight: '70vh' }}>
                  <iframe
                    src="https://api.leadconnectorhq.com/widget/booking/CuMrrXD4mcPUtaDmVIPS"
                    style={{ width: '100%', border: 'none', overflow: 'auto', minHeight: '500px', height: '600px', maxHeight: '70vh' }}
                    scrolling="yes"
                    id="CuMrrXD4mcPUtaDmVIPS_1760457240099"
                    title="Illinois State-Funded Program Booking"
                  />
                </div>
              )}

              {/* WA/MO/LA Booking Widget */}
              {selectedState === 'wamola' && (
                <div className="w-full" style={{ minHeight: '500px', maxHeight: '70vh' }}>
                  <iframe
                    src="https://api.leadconnectorhq.com/widget/booking/IGSyomfTJpLaLapo2U7H"
                    style={{ width: '100%', border: 'none', overflow: 'auto', minHeight: '500px', height: '600px', maxHeight: '70vh' }}
                    scrolling="yes"
                    id="IGSyomfTJpLaLapo2U7H_1760457184767"
                    title="State-Funded Program Booking"
                  />
                </div>
              )}

              {/* Other States Form Widget */}
              {selectedState === 'other' && (
                <div className="w-full" style={{ minHeight: '500px', maxHeight: '70vh' }}>
                  <iframe
                    src="https://api.leadconnectorhq.com/widget/form/9GKlf6bCljmux0fueHot"
                    style={{ width: '100%', height: '714px', maxHeight: '70vh', border: 'none', borderRadius: '5px', overflow: 'auto' }}
                    id="inline-9GKlf6bCljmux0fueHot"
                    data-layout='{"id":"INLINE"}'
                    data-trigger-type="alwaysShow"
                    data-trigger-value=""
                    data-activation-type="alwaysActivated"
                    data-activation-value=""
                    data-deactivation-type="neverDeactivate"
                    data-deactivation-value=""
                    data-form-name="WIOA Intrest - Other State"
                    data-height="714"
                    data-layout-iframe-id="inline-9GKlf6bCljmux0fueHot"
                    data-form-id="9GKlf6bCljmux0fueHot"
                    title="WIOA Interest - Other State"
                  />
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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

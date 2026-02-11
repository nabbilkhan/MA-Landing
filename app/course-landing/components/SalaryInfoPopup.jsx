'use client';

import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { isProgramVisible } from '../../config/siteConfig';

export default function SalaryInfoPopup({ isOpen, onClose }) {
  const popupContentRef = useRef(null);

  // Prevent body scroll when popup is open (works with Lenis)
  useEffect(() => {
    if (!isOpen) return;

    // Lock body scroll
    const scrollY = window.scrollY;
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = '0';
    document.body.style.right = '0';
    document.body.style.overflow = 'hidden';

    // Block wheel events outside popup content
    const handleWheel = (e) => {
      const popupContent = popupContentRef.current;
      if (popupContent && popupContent.contains(e.target)) {
        return;
      }
      e.preventDefault();
      e.stopPropagation();
    };

    // Block touch move outside popup content
    const handleTouchMove = (e) => {
      const popupContent = popupContentRef.current;
      if (popupContent && popupContent.contains(e.target)) {
        return;
      }
      e.preventDefault();
    };

    document.addEventListener('wheel', handleWheel, { passive: false });
    document.addEventListener('touchmove', handleTouchMove, { passive: false });

    // Cleanup
    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.style.overflow = '';
      window.scrollTo(0, scrollY);
      document.removeEventListener('wheel', handleWheel);
      document.removeEventListener('touchmove', handleTouchMove);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const disciplines = [
    { name: 'BA / PO / PM', openings: '281K', midCareer: '$130K', maxCeiling: '$516K', program: 'tech' },
    { name: 'Pharmacy Tech', openings: '49K', midCareer: '$50K', maxCeiling: '$100K', program: 'healthcare' },
    { name: 'EKG Tech', openings: '4K', midCareer: '$80K', maxCeiling: '$95K', program: 'healthcare' },
    { name: 'CDL (All Forms)', openings: '550K', midCareer: '$70K', maxCeiling: '$300K', program: 'logistics' },
  ].filter(d => isProgramVisible(d.program));

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          ref={popupContentRef}
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-3xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Background with gradient border */}
          <div className="absolute inset-0 bg-gradient-to-br from-gold-500/30 via-gold-600/20 to-gold-700/30 rounded-3xl blur-sm" />

          {/* Content Container */}
          <div className="relative bg-gradient-to-br from-gray-900 via-black to-gray-900 rounded-3xl border border-gold-500/30 p-6 sm:p-8">
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all duration-300 hover:scale-110"
              aria-label="Close"
            >
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Header */}
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-gold-500/20 to-gold-600/20 mb-4">
                <span className="text-3xl">💰</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white mb-2">
                Expected <span className="text-gradient-gold">Salary</span>
              </h3>
              <p className="text-gray-400 text-sm">
                Market-weighted analysis across career paths
              </p>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-gradient-to-br from-green-500/10 to-green-600/10 rounded-2xl p-4 border border-green-500/20 text-center">
                <div className="text-3xl font-black text-green-400 mb-1">$130K</div>
                <div className="text-xs text-gray-400 uppercase tracking-wider">Mid-Career Avg</div>
              </div>
              <div className="bg-gradient-to-br from-gold-500/10 to-gold-600/10 rounded-2xl p-4 border border-gold-500/20 text-center">
                <div className="text-3xl font-black text-gold-400 mb-1">$516K</div>
                <div className="text-xs text-gray-400 uppercase tracking-wider">Top Earners</div>
              </div>
            </div>

            {/* Explanation */}
            <div className="bg-white/5 rounded-2xl p-4 mb-6 border border-white/10">
              <p className="text-gray-300 text-sm leading-relaxed">
                These figures reflect <span className="text-gold-400 font-semibold">salary data</span> for
                Business Analyst, Product Owner, and Product Manager careers (281K total annual openings).
              </p>
            </div>

            {/* Breakdown Table */}
            <div className="mb-6">
              <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">Breakdown by Field</h4>
              <div className="space-y-2">
                {disciplines.map((d, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between bg-white/5 rounded-xl px-4 py-3 border border-white/5 hover:border-gold-500/30 transition-colors"
                  >
                    <div className="flex-1">
                      <div className="text-white font-semibold text-sm">{d.name}</div>
                      <div className="text-gray-500 text-xs">{d.openings} openings/yr</div>
                    </div>
                    <div className="text-right">
                      <div className="text-green-400 font-bold text-sm">{d.midCareer}</div>
                      <div className="text-gray-500 text-xs">Top: {d.maxCeiling}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer Note */}
            <div className="text-center">
              <p className="text-gray-500 text-xs">
                Source: U.S. Bureau of Labor Statistics & industry data
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>

      <style jsx>{`
        .text-gradient-gold {
          background: linear-gradient(135deg, #D4AF37 0%, #FFD700 50%, #B8860B 100%);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .text-gold-400 { color: #D4AF37; }
        .text-gold-500 { color: #B8860B; }
        .from-gold-500\/10 { --tw-gradient-from: rgba(184, 134, 11, 0.1); }
        .to-gold-600\/10 { --tw-gradient-to: rgba(153, 101, 21, 0.1); }
        .from-gold-500\/20 { --tw-gradient-from: rgba(184, 134, 11, 0.2); }
        .to-gold-600\/20 { --tw-gradient-to: rgba(153, 101, 21, 0.2); }
        .from-gold-500\/30 { --tw-gradient-from: rgba(184, 134, 11, 0.3); }
        .via-gold-600\/20 { --tw-gradient-via: rgba(153, 101, 21, 0.2); }
        .to-gold-700\/30 { --tw-gradient-to: rgba(120, 80, 15, 0.3); }
        .border-gold-500\/20 { border-color: rgba(184, 134, 11, 0.2); }
        .border-gold-500\/30 { border-color: rgba(184, 134, 11, 0.3); }
      `}</style>
    </AnimatePresence>
  );
}

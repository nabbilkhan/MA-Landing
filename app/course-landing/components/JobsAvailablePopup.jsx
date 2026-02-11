'use client';

import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { isProgramVisible } from '../../config/siteConfig';

export default function JobsAvailablePopup({ isOpen, onClose }) {
  const popupContentRef = useRef(null);

  // Prevent body scroll when popup is open (works with Lenis)
  useEffect(() => {
    if (!isOpen) return;

    const scrollY = window.scrollY;
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = '0';
    document.body.style.right = '0';
    document.body.style.overflow = 'hidden';

    const handleWheel = (e) => {
      const popupContent = popupContentRef.current;
      if (popupContent && popupContent.contains(e.target)) {
        return;
      }
      e.preventDefault();
      e.stopPropagation();
    };

    const handleTouchMove = (e) => {
      const popupContent = popupContentRef.current;
      if (popupContent && popupContent.contains(e.target)) {
        return;
      }
      e.preventDefault();
    };

    document.addEventListener('wheel', handleWheel, { passive: false });
    document.addEventListener('touchmove', handleTouchMove, { passive: false });

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

  const allJobCategories = [
    {
      name: 'BA / PO / PM',
      openings: '281K',
      openingsNum: 281000,
      icon: '💻',
      color: 'from-blue-500 to-indigo-600',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/30',
      textColor: 'text-blue-400',
      description: 'Business Analyst, Product Owner, Product Manager',
      program: 'tech',
    },
    {
      name: 'CDL Driving',
      openings: '550K',
      openingsNum: 550000,
      icon: '🚛',
      color: 'from-green-500 to-emerald-600',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500/30',
      textColor: 'text-green-400',
      description: 'Heavy trucks, light trucks, bus, delivery',
      program: 'logistics',
    },
    {
      name: 'Healthcare Tech',
      openings: '53K',
      openingsNum: 53000,
      icon: '🏥',
      color: 'from-purple-500 to-pink-600',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/30',
      textColor: 'text-purple-400',
      description: 'Pharmacy Tech (49K) + EKG Tech (4K)',
      program: 'healthcare',
    },
  ];

  const jobCategories = allJobCategories.filter(c => isProgramVisible(c.program));
  const totalOpenings = jobCategories.reduce((sum, c) => sum + c.openingsNum, 0);
  const jobCategoriesWithPercentage = jobCategories.map(c => ({
    ...c,
    percentage: Math.round((c.openingsNum / totalOpenings) * 100),
  }));
  const totalDisplay = totalOpenings >= 1000 ? `~${Math.round(totalOpenings / 1000)}K` : totalOpenings.toLocaleString();

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
          className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Animated gradient border */}
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/40 via-blue-500/30 to-purple-500/40 rounded-3xl blur-sm animate-pulse" />

          {/* Content Container */}
          <div className="relative bg-gradient-to-br from-gray-900 via-black to-gray-900 rounded-3xl border border-green-500/30 p-6 sm:p-8">
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:rotate-90"
              aria-label="Close"
            >
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Header */}
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', delay: 0.1 }}
                className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-green-500/20 to-green-600/20 mb-4 relative"
              >
                <span className="text-4xl">📊</span>
                <span className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center animate-ping" />
                <span className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-xs font-bold">!</span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h3 className="text-3xl sm:text-4xl font-black text-white mb-2">
                  <span className="text-green-400 animate-pulse">{totalDisplay}</span>
                </h3>
                <p className="text-xl sm:text-2xl font-bold text-white mb-1">
                  Job Openings Per Year
                </p>
                <p className="text-gray-400 text-sm">
                  {jobCategories.length === 1 ? `In ${jobCategories[0].name} careers in the U.S.` : 'Across all career paths we train for in the U.S.'}
                </p>
              </motion.div>
            </div>

            {/* Visual breakdown */}
            <div className="mb-6">
              <div className="flex h-4 rounded-full overflow-hidden mb-3">
                {jobCategoriesWithPercentage.map((cat, i) => (
                  <motion.div
                    key={i}
                    initial={{ width: 0 }}
                    animate={{ width: `${cat.percentage}%` }}
                    transition={{ delay: 0.3 + i * 0.1, duration: 0.8, ease: 'easeOut' }}
                    className={`bg-gradient-to-r ${cat.color} first:rounded-l-full last:rounded-r-full`}
                    title={`${cat.name}: ${cat.openings}`}
                  />
                ))}
              </div>
            </div>

            {/* Job Categories Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              {jobCategoriesWithPercentage.map((cat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  className={`${cat.bgColor} rounded-2xl p-4 border ${cat.borderColor} hover:scale-[1.02] transition-transform cursor-default`}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">{cat.icon}</span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="text-white font-bold text-sm">{cat.name}</h4>
                        <span className={`${cat.textColor} font-black text-lg`}>{cat.openings}</span>
                      </div>
                      <p className="text-gray-500 text-xs mt-1">{cat.description}</p>
                      <div className="mt-2 h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${cat.percentage}%` }}
                          transition={{ delay: 0.6 + i * 0.1, duration: 0.6 }}
                          className={`h-full bg-gradient-to-r ${cat.color} rounded-full`}
                        />
                      </div>
                      <p className="text-gray-600 text-xs mt-1">{cat.percentage}% of total</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Key Insights */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="bg-gradient-to-r from-green-500/10 via-blue-500/10 to-purple-500/10 rounded-2xl p-4 border border-white/10 mb-6"
            >
              <h4 className="text-white font-bold text-sm mb-3 flex items-center gap-2">
                <span>💡</span> Key Insights
              </h4>
              <ul className="space-y-2 text-sm">
                {isProgramVisible('logistics') && (
                  <li className="flex items-start gap-2 text-gray-300">
                    <span className="text-green-400 mt-0.5">✓</span>
                    <span><span className="text-green-400 font-semibold">CDL + Trucking</span> dominates demand with over half of all openings</span>
                  </li>
                )}
                {isProgramVisible('tech') && (
                  <li className="flex items-start gap-2 text-gray-300">
                    <span className="text-blue-400 mt-0.5">✓</span>
                    <span><span className="text-blue-400 font-semibold">BA/PO/PM roles</span> offer ~280K openings/year - huge white-collar market</span>
                  </li>
                )}
                {isProgramVisible('healthcare') && (
                  <li className="flex items-start gap-2 text-gray-300">
                    <span className="text-purple-400 mt-0.5">✓</span>
                    <span><span className="text-purple-400 font-semibold">Healthcare tech</span> (Pharmacy + EKG) provides steady medical career paths</span>
                  </li>
                )}
              </ul>
            </motion.div>

            {/* Data Note */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="bg-white/5 rounded-xl p-3 border border-white/5"
            >
              <p className="text-gray-500 text-xs text-center">
                <span className="font-semibold text-gray-400">Data Source:</span> U.S. Bureau of Labor Statistics,
                Average Annual Openings (growth + replacements), 2024-2034 projections
              </p>
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 }}
              className="mt-6 text-center"
            >
              <p className="text-gray-400 text-sm mb-3">Ready to enter one of these high-demand fields?</p>
              <button
                onClick={onClose}
                className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-full hover:scale-105 transition-transform shadow-lg shadow-green-500/25"
              >
                Explore Our Programs
              </button>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PickYourPathContent from './PickYourPathContent';

export default function PickYourPathModal({ isOpen, onClose }) {
  // Close on ESC key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Prevent body scroll when modal is open and disable Lenis
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Disable Lenis smooth scroll when modal is open
      if (window.lenis) {
        window.lenis.stop();
      }
    } else {
      document.body.style.overflow = 'unset';
      // Re-enable Lenis when modal closes
      if (window.lenis) {
        window.lenis.start();
      }
    }
    return () => {
      document.body.style.overflow = 'unset';
      if (window.lenis) {
        window.lenis.start();
      }
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[260] flex items-center justify-center p-4 sm:p-6 bg-black/95 backdrop-blur-md"
          onClick={onClose}
          style={{ pointerEvents: 'none' }}
        >
          {/* Modal Content */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="relative w-full max-w-6xl my-4 sm:my-8 max-h-[95vh] sm:max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
            style={{ pointerEvents: 'auto' }}
          >
            {/* Close Button - Mobile Optimized (inside modal) */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 min-w-[44px] min-h-[44px] w-11 h-11 rounded-full bg-black/50 hover:bg-black/70 backdrop-blur-sm flex items-center justify-center transition-all duration-300 hover:scale-110"
              aria-label="Close modal"
            >
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Glassmorphic Container */}
            <div className="relative rounded-3xl border border-gold-500/30 shadow-2xl bg-white flex-1 flex flex-col min-h-0">

              {/* Content - Scrollable on mobile */}
              <div
                className="relative z-10 p-6 sm:p-8 lg:p-12 overflow-y-auto flex-1 rounded-3xl"
                style={{
                  overscrollBehavior: 'contain',
                  touchAction: 'pan-y',
                  WebkitOverflowScrolling: 'touch'
                }}
              >
                <PickYourPathContent />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

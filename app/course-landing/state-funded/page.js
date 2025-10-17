'use client';

import { useRouter } from 'next/navigation';
import StateFundedContent from '../components/StateFundedContent';

export default function StateFundedPage() {
  const router = useRouter();

  const handleBackToPathSelection = () => {
    router.push('/course-landing/path-selection');
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Background with gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-gray-900/95 via-black/95 to-gray-900/95"></div>

      {/* Animated gold particles effect */}
      <div className="fixed inset-0 opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(212,175,55,0.2),transparent_70%)]"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Back Button - Mobile Optimized (top-left) */}
        <div className="p-4 sm:p-6">
          <button
            onClick={handleBackToPathSelection}
            className="min-h-[44px] min-w-[44px] px-4 sm:px-6 py-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center gap-2 transition-all duration-300 hover:scale-105"
            aria-label="Back to path selection"
          >
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="text-white font-semibold hidden sm:inline">Back to Options</span>
            <span className="text-white font-semibold sm:hidden">Back</span>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 p-6 sm:p-8 lg:p-12 relative">
          <div className="w-full max-w-6xl mx-auto">
            <StateFundedContent />
          </div>
        </div>
      </div>
    </div>
  );
}

'use client';

import { useRouter } from 'next/navigation';
import PickYourPathContent from '../components/PickYourPathContent';

export default function PickYourPathPage() {
  const router = useRouter();

  const handleBackToHome = () => {
    router.push('/course-landing');
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 overflow-x-hidden">
      {/* Content Container */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Back Button - Mobile Optimized (top-left) */}
        <div className="p-4 sm:p-6">
          <button
            onClick={handleBackToHome}
            className="min-h-[44px] min-w-[44px] px-4 sm:px-6 py-2 rounded-full bg-black/10 hover:bg-black/20 backdrop-blur-sm flex items-center gap-2 transition-all duration-300 hover:scale-105"
            aria-label="Back to home"
          >
            <svg className="w-5 h-5 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="text-gray-900 font-semibold hidden sm:inline">Back to Home</span>
            <span className="text-gray-900 font-semibold sm:hidden">Back</span>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 p-6 sm:p-8 lg:p-12">
          <PickYourPathContent />
        </div>
      </div>
    </div>
  );
}

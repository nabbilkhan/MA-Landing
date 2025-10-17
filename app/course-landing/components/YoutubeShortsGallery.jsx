'use client'

import { useState } from 'react'

// Real YouTube Shorts videos from Mentor Agile
const shortsVideos = [
  {
    id: 1,
    videoId: '4WIYtFccSsk',
    title: 'Jumpstart Your IT Career - Success Stories',
    thumbnail: 'https://img.youtube.com/vi/4WIYtFccSsk/maxresdefault.jpg',
    duration: '0:60',
    views: '12K'
  },
  {
    id: 2,
    videoId: 'Da4WyUQ0TiY',
    title: 'Why Medical IT Jobs Are Your Best Career Move',
    thumbnail: 'https://img.youtube.com/vi/Da4WyUQ0TiY/maxresdefault.jpg',
    duration: '0:60',
    views: '8.5K'
  },
  {
    id: 3,
    videoId: 'UtqfeUmXEzs',
    title: 'Why No One Wants 5 Day Office Jobs Anymore',
    thumbnail: 'https://img.youtube.com/vi/UtqfeUmXEzs/maxresdefault.jpg',
    duration: '0:60',
    views: '15K'
  },
  {
    id: 4,
    videoId: 'Ee-Ax8IdkrQ',
    title: 'Our Vocational School is Now Accredited!',
    thumbnail: 'https://img.youtube.com/vi/Ee-Ax8IdkrQ/maxresdefault.jpg',
    duration: '0:60',
    views: '9.2K'
  }
]

export default function YoutubeShortsGallery() {
  const [selectedVideo, setSelectedVideo] = useState(null)

  const openVideo = (video) => {
    setSelectedVideo(video)
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden'
  }

  const closeVideo = () => {
    setSelectedVideo(null)
    // Restore body scroll
    document.body.style.overflow = 'auto'
  }

  return (
    <>
      <section className="relative py-20 sm:py-28 overflow-hidden">
        {/* Glassmorphic Background */}
        <div className="absolute inset-0 bg-gray-900/10 backdrop-blur-md"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(218,165,32,0.08),transparent_70%)]"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Section Header */}
          <div className="text-center mb-16 space-y-4" data-aos="fade-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/30 mb-4">
              <span className="text-2xl">📱</span>
              <span className="text-sm sm:text-base font-bold text-red-400 uppercase tracking-wide">YouTube Shorts</span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight">
              Quick Career Tips
              <span className="block mt-2 bg-gradient-to-r from-red-500 via-orange-500 to-gold-500 bg-clip-text text-transparent">
                In 60 Seconds
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto">
              Bite-sized insights, success stories, and career advice from our community
            </p>
          </div>

          {/* Video Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {shortsVideos.map((video, index) => (
              <VideoCard key={video.id} video={video} index={index} onClick={() => openVideo(video)} />
            ))}
          </div>

          {/* CTA */}
          <div className="text-center mt-12" data-aos="fade-up" data-aos-delay="400">
            <a
              href="https://www.youtube.com/@mentoragile"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 font-bold text-white shadow-2xl transform transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
              <span>Subscribe on YouTube</span>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>

        </div>
      </section>

      {/* Video Modal */}
      {selectedVideo && (
        <VideoModal video={selectedVideo} onClose={closeVideo} />
      )}
    </>
  )
}

function VideoCard({ video, index, onClick }) {
  return (
    <div
      className="group relative cursor-pointer"
      data-aos="fade-up"
      data-aos-delay={index * 100}
      onClick={onClick}
    >
      {/* Vertical Video Container (9:16 aspect ratio) */}
      <div className="relative w-full rounded-2xl overflow-hidden bg-gray-900 shadow-2xl transform transition-all duration-500 hover:scale-105 hover:-translate-y-2" style={{ aspectRatio: '9/16' }}>

        {/* YouTube Thumbnail */}
        <img
          src={video.thumbnail}
          alt={video.title}
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />

        {/* Play Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/60 transition-all duration-300">
          <div className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center shadow-2xl transform transition-all duration-300 group-hover:scale-125 group-hover:bg-red-700">
            <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </div>
        </div>

        {/* Duration Badge */}
        <div className="absolute bottom-3 right-3 px-2 py-1 rounded-lg bg-black/80 backdrop-blur-sm text-xs font-bold text-white">
          {video.duration}
        </div>

        {/* Views Badge */}
        <div className="absolute top-3 left-3 px-2 py-1 rounded-lg bg-black/80 backdrop-blur-sm text-xs font-bold text-white flex items-center gap-1">
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
            <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
          </svg>
          <span>{video.views}</span>
        </div>

      </div>

      {/* Video Title */}
      <div className="mt-3 px-2">
        <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-gold-400 transition-colors line-clamp-2">
          {video.title}
        </h3>
      </div>

    </div>
  )
}

function VideoModal({ video, onClose }) {
  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/95 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      {/* Modal Content */}
      <div
        className="relative w-full max-w-md animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center transition-all duration-300 hover:scale-110"
          aria-label="Close video"
        >
          <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Video Container (9:16 aspect ratio) */}
        <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl border border-gray-700" style={{ aspectRatio: '9/16' }}>
          <iframe
            src={`https://www.youtube.com/embed/${video.videoId}?autoplay=1&rel=0&modestbranding=1`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
          />
        </div>

        {/* Video Info */}
        <div className="mt-4 text-center">
          <h3 className="text-lg font-bold text-white">{video.title}</h3>
          <div className="flex items-center justify-center gap-4 mt-2 text-sm text-gray-200">
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
              </svg>
              {video.views} views
            </span>
            <span>•</span>
            <span>{video.duration}</span>
          </div>
        </div>

      </div>
    </div>
  )
}

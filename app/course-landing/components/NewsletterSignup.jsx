'use client'

import { useState } from 'react'

export default function NewsletterSignup() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle') // idle, loading, success, error
  const [message, setMessage] = useState('')

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validate email
    if (!email) {
      setStatus('error')
      setMessage('Please enter your email address')
      return
    }

    if (!validateEmail(email)) {
      setStatus('error')
      setMessage('Please enter a valid email address')
      return
    }

    setStatus('loading')

    try {
      // TODO: Replace with actual API endpoint
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      })

      if (response.ok) {
        setStatus('success')
        setMessage('Successfully subscribed! Check your inbox for confirmation.')
        setEmail('')

        // Reset after 5 seconds
        setTimeout(() => {
          setStatus('idle')
          setMessage('')
        }, 5000)
      } else {
        const data = await response.json()
        setStatus('error')
        setMessage(data.message || 'Subscription failed. Please try again.')
      }
    } catch (error) {
      console.error('Newsletter subscription error:', error)
      setStatus('error')
      setMessage('Network error. Please try again later.')
    }
  }

  return (
    <section className="relative py-20 sm:py-28 overflow-hidden">
      {/* Glassmorphic Background */}
      <div className="absolute inset-0 bg-gray-900/10 backdrop-blur-md"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(218,165,32,0.08),transparent_60%)]"></div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Neumorphic Card Container */}
        <div className="relative p-8 sm:p-12 lg:p-16 rounded-3xl bg-gradient-to-br from-gray-800/20 to-gray-900/30 backdrop-blur-lg border border-gray-700/50 shadow-2xl" data-aos="fade-up">

          {/* Decorative Elements */}
          <div className="absolute top-0 left-0 w-32 h-32 bg-gold-500/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

          {/* Content */}
          <div className="relative z-10 space-y-8">

            {/* Icon */}
            <div className="flex justify-center">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-gold-500 to-amber-500 flex items-center justify-center shadow-2xl">
                <span className="text-4xl">📬</span>
              </div>
            </div>

            {/* Header */}
            <div className="text-center space-y-3">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
                Stay Updated
              </h2>
              <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto">
                Get the latest career insights, course updates, and exclusive offers delivered to your inbox
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-4">

              {/* Email Input Container */}
              <div className="relative">
                <div className="relative flex flex-col sm:flex-row gap-3 p-2 rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 shadow-inner">

                  {/* Email Input */}
                  <div className="relative flex-1">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value)
                        // Clear error when user starts typing
                        if (status === 'error') {
                          setStatus('idle')
                          setMessage('')
                        }
                      }}
                      placeholder="Enter your email address"
                      className="w-full pl-12 pr-4 py-4 bg-gray-800/50 rounded-xl text-white placeholder-gray-300 border border-gray-700/50 focus:border-gold-500/50 focus:ring-2 focus:ring-gold-500/20 focus:outline-none transition-all duration-300 text-base"
                      disabled={status === 'loading'}
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="relative min-h-[56px] px-8 py-4 bg-gradient-to-r from-gold-500 to-amber-600 hover:from-gold-600 hover:to-amber-700 rounded-xl font-bold text-base text-gray-900 shadow-xl transform transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 overflow-hidden group"
                  >
                    {status === 'loading' ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Subscribing...</span>
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <span>Subscribe</span>
                        <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </span>
                    )}
                  </button>

                </div>

                {/* Status Message */}
                {message && (
                  <div
                    className={`mt-3 px-4 py-3 rounded-xl flex items-start gap-3 animate-slide-down ${
                      status === 'success'
                        ? 'bg-green-500/10 border border-green-500/30 text-green-400'
                        : 'bg-red-500/10 border border-red-500/30 text-red-400'
                    }`}
                  >
                    {status === 'success' ? (
                      <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    )}
                    <span className="text-sm font-semibold">{message}</span>
                  </div>
                )}

              </div>

              {/* Privacy Note */}
              <p className="text-xs text-gray-300 text-center">
                We respect your privacy. Unsubscribe at any time.{' '}
                <a href="/privacy" className="text-gold-400 hover:text-gold-300 underline">
                  Privacy Policy
                </a>
              </p>

            </form>

            {/* Benefits */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8 border-t border-gray-700/50">
              <div className="flex items-center gap-3 text-sm">
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                  <span className="text-xl">📚</span>
                </div>
                <div>
                  <div className="font-bold text-white">Course Updates</div>
                  <div className="text-gray-300 text-xs">New programs & schedules</div>
                </div>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="w-10 h-10 rounded-lg bg-gold-500/10 flex items-center justify-center">
                  <span className="text-xl">💡</span>
                </div>
                <div>
                  <div className="font-bold text-white">Career Tips</div>
                  <div className="text-gray-300 text-xs">Expert advice weekly</div>
                </div>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                  <span className="text-xl">🎁</span>
                </div>
                <div>
                  <div className="font-bold text-white">Exclusive Offers</div>
                  <div className="text-gray-300 text-xs">Subscriber-only deals</div>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  )
}

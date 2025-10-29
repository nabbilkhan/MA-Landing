'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import NavigationHeader from '../course-landing/components/NavigationHeader';
import SocialFooter from '../course-landing/components/SocialFooter';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle,
  Linkedin,
  Twitter,
  Facebook,
  Instagram,
  Youtube,
  Clock,
  Globe,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function ContactPage() {
  const heroRef = useRef(null);
  const formRef = useRef(null);
  const infoRef = useRef(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    course: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Null check to prevent errors on initial mount
    if (!heroRef.current) return;

    // Hero animation
    const heroAnimation = gsap.from(heroRef.current.children, {
      opacity: 0,
      y: 50,
      duration: 1,
      stagger: 0.2,
      ease: 'power3.out',
    });

    // Store ScrollTrigger instances for cleanup
    const scrollTriggers = [];

    // Form animation
    if (formRef.current) {
      const formAnim = gsap.from(formRef.current, {
        scrollTrigger: {
          trigger: formRef.current,
          start: 'top 80%',
        },
        opacity: 0,
        x: -50,
        duration: 1,
        ease: 'power3.out',
      });
      if (formAnim.scrollTrigger) scrollTriggers.push(formAnim.scrollTrigger);
    }

    // Info cards animation
    if (infoRef.current) {
      const cards = infoRef.current.querySelectorAll('.info-card');
      const cardsAnim = gsap.from(cards, {
        scrollTrigger: {
          trigger: infoRef.current,
          start: 'top 80%',
        },
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
      });
      if (cardsAnim.scrollTrigger) scrollTriggers.push(cardsAnim.scrollTrigger);
    }

    // Cleanup function to kill animations on unmount
    return () => {
      heroAnimation?.kill();
      scrollTriggers.forEach(st => st?.kill());
    };
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitted(true);
    setIsSubmitting(false);

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        course: '',
        message: '',
      });
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <NavigationHeader />

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-[70vh] flex items-center justify-center px-6 py-24 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-gold-500/10 via-black to-gold-600/5"></div>

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 bg-gradient-to-r from-gold-300 via-gold-500 to-gold-300 bg-clip-text text-transparent">
            Get in Touch
          </h1>
          <p className="text-xl md:text-2xl lg:text-3xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Questions about VIP or On-Demand programs? Need help choosing the right path? Ready to start your journey to a $85K+ career?
            We're here to help you every step of the way.
          </p>
        </div>
      </section>

      {/* Contact Form & Info Section */}
      <section className="relative py-24 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div ref={formRef} className="backdrop-blur-xl bg-gradient-to-br from-gold-500/10 to-gold-600/5 border border-gold-500/20 rounded-3xl p-8 md:p-12 shadow-2xl">
            <h2 className="text-3xl md:text-4xl font-black mb-6 text-gold-400">Send Us a Message</h2>
            <p className="text-gray-300 mb-8">
              Fill out the form below and our team will get back to you within 24 hours.
            </p>

            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-300 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-black/50 border border-gold-500/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all"
                    placeholder="John Doe"
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-300 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-black/50 border border-gold-500/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all"
                    placeholder="john@example.com"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-gray-300 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-black/50 border border-gold-500/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>

                {/* Company */}
                <div>
                  <label htmlFor="company" className="block text-sm font-semibold text-gray-300 mb-2">
                    Company Name
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-black/50 border border-gold-500/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all"
                    placeholder="Your Company"
                  />
                </div>

                {/* Course Interest */}
                <div>
                  <label htmlFor="course" className="block text-sm font-semibold text-gray-300 mb-2">
                    Course of Interest
                  </label>
                  <select
                    id="course"
                    name="course"
                    value={formData.course}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-black/50 border border-gold-500/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all"
                  >
                    <option value="">Select an option</option>
                    <option value="VIP Program - $6,000">VIP Program - Live + Pre-Recorded - $6,000</option>
                    <option value="On-Demand - $800">On-Demand Program - Self-Paced - $800</option>
                    <option value="Enterprise Training">Enterprise Training</option>
                    <option value="General Inquiry">General Inquiry</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-300 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 bg-black/50 border border-gold-500/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all resize-none"
                    placeholder="Tell us about your training needs..."
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-8 py-4 bg-gradient-to-r from-gold-500 to-gold-600 text-black font-bold text-lg rounded-xl shadow-2xl hover:shadow-gold-500/50 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <CheckCircle className="w-20 h-20 text-gold-400 mb-6" />
                <h3 className="text-2xl font-bold text-gold-400 mb-3">Message Sent!</h3>
                <p className="text-gray-300">
                  Thank you for reaching out. We'll get back to you within 24 hours.
                </p>
              </div>
            )}
          </div>

          {/* Contact Information */}
          <div ref={infoRef} className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-black mb-8 text-gold-400">Contact Information</h2>

            {/* Address Card */}
            <div className="info-card backdrop-blur-xl bg-gradient-to-br from-gold-500/10 to-gold-600/5 border border-gold-500/20 rounded-2xl p-6 hover:scale-105 transition-transform duration-300">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gold-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-gold-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-gold-400">Office Location</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Chicago, IL
                  </p>
                </div>
              </div>
            </div>

            {/* Email Card */}
            <div className="info-card backdrop-blur-xl bg-gradient-to-br from-gold-500/10 to-gold-600/5 border border-gold-500/20 rounded-2xl p-6 hover:scale-105 transition-transform duration-300">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gold-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-gold-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-gold-400">Email Us</h3>
                  <p className="text-gray-300 mb-2">All Inquiries:</p>
                  <a
                    href="mailto:info@mentoragile.com"
                    className="text-gold-300 hover:text-gold-400 transition-colors text-lg font-semibold"
                  >
                    info@mentoragile.com
                  </a>
                </div>
              </div>
            </div>

            {/* Business Hours Card */}
            <div className="info-card backdrop-blur-xl bg-gradient-to-br from-gold-500/10 to-gold-600/5 border border-gold-500/20 rounded-2xl p-6 hover:scale-105 transition-transform duration-300">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gold-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-gold-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-gold-400">Business Hours</h3>
                  <p className="text-gray-300">
                    Monday - Friday: 9:00 AM - 6:00 PM (CST)
                    <br />
                    Saturday: 10:00 AM - 2:00 PM (CST)
                    <br />
                    Sunday: Closed
                  </p>
                </div>
              </div>
            </div>

            {/* Global Presence Card */}
            <div className="info-card backdrop-blur-xl bg-gradient-to-br from-gold-500/10 to-gold-600/5 border border-gold-500/20 rounded-2xl p-6 hover:scale-105 transition-transform duration-300">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gold-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Globe className="w-6 h-6 text-gold-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-gold-400">Global Reach</h3>
                  <p className="text-gray-300">
                    We deliver training in 150+ countries with instructors available across all time
                    zones. Virtual and in-person options available.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Media Section */}
      <section className="relative py-24 px-6 bg-gradient-to-b from-black via-gold-950/5 to-black">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-black mb-8 text-gold-400">Connect With Us</h2>
          <p className="text-xl text-gray-300 mb-12">
            Follow us on social media for Agile tips, success stories, and course updates.
          </p>

          <div className="flex flex-wrap justify-center gap-6">
            <a
              href="https://linkedin.com/company/mentoragile"
              target="_blank"
              rel="noopener noreferrer"
              className="w-16 h-16 bg-gradient-to-br from-gold-500/20 to-gold-600/10 border border-gold-500/30 rounded-xl flex items-center justify-center hover:bg-gradient-to-br hover:from-gold-500/40 hover:to-gold-600/20 hover:scale-110 transition-all duration-300"
            >
              <Linkedin className="w-8 h-8 text-gold-400" />
            </a>
            <a
              href="https://twitter.com/mentoragile"
              target="_blank"
              rel="noopener noreferrer"
              className="w-16 h-16 bg-gradient-to-br from-gold-500/20 to-gold-600/10 border border-gold-500/30 rounded-xl flex items-center justify-center hover:bg-gradient-to-br hover:from-gold-500/40 hover:to-gold-600/20 hover:scale-110 transition-all duration-300"
            >
              <Twitter className="w-8 h-8 text-gold-400" />
            </a>
            <a
              href="https://facebook.com/mentoragile"
              target="_blank"
              rel="noopener noreferrer"
              className="w-16 h-16 bg-gradient-to-br from-gold-500/20 to-gold-600/10 border border-gold-500/30 rounded-xl flex items-center justify-center hover:bg-gradient-to-br hover:from-gold-500/40 hover:to-gold-600/20 hover:scale-110 transition-all duration-300"
            >
              <Facebook className="w-8 h-8 text-gold-400" />
            </a>
            <a
              href="https://instagram.com/mentoragile"
              target="_blank"
              rel="noopener noreferrer"
              className="w-16 h-16 bg-gradient-to-br from-gold-500/20 to-gold-600/10 border border-gold-500/30 rounded-xl flex items-center justify-center hover:bg-gradient-to-br hover:from-gold-500/40 hover:to-gold-600/20 hover:scale-110 transition-all duration-300"
            >
              <Instagram className="w-8 h-8 text-gold-400" />
            </a>
            <a
              href="https://youtube.com/@mentoragile"
              target="_blank"
              rel="noopener noreferrer"
              className="w-16 h-16 bg-gradient-to-br from-gold-500/20 to-gold-600/10 border border-gold-500/30 rounded-xl flex items-center justify-center hover:bg-gradient-to-br hover:from-gold-500/40 hover:to-gold-600/20 hover:scale-110 transition-all duration-300"
            >
              <Youtube className="w-8 h-8 text-gold-400" />
            </a>
          </div>
        </div>
      </section>

      <SocialFooter />
    </div>
  );
}

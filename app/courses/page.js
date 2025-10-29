'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import NavigationHeader from '../course-landing/components/NavigationHeader';
import SocialFooter from '../course-landing/components/SocialFooter';
import CurriculumSection from '../components/CurriculumSection';
import CertificationsSection from '../components/CertificationsSection';
import TestimonialsSection from '../components/TestimonialsSection';
import {
  BookOpen,
  Award,
  Clock,
  Users,
  CheckCircle,
  Star,
  TrendingUp,
  Target,
  Globe,
  Video,
  Sparkles,
  Briefcase,
  DollarSign,
  Shield,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function CoursesPage() {
  const heroRef = useRef(null);
  const courseRef = useRef(null);
  const modulesRef = useRef(null);
  const benefitsRef = useRef(null);

  const modules = [
    '12-week on-demand curriculum (videos + worksheets)',
    'Scrum Alliance CSPO® Certification',
    'Agile Fundamentals',
    'Discovery & Validation',
    'Roadmapping',
    'User Stories, Requirements & Technical Communication',
    'Delivery: Working Agreements & Backlog',
    'Stakeholder Management & Team Dynamics Leadership',
    'AI Essentials',
    'Portfolio Capstone Project',
    'Lifetime Course Access + Community (Slack)',
  ];

  const targetRoles = [
    { title: 'Product Owner', icon: Target },
    { title: 'Associate PM', icon: Briefcase },
    { title: 'Agile Business Analyst', icon: TrendingUp },
    { title: 'Product Ops', icon: Globe },
  ];

  const benefits = [
    {
      icon: Clock,
      title: '12 Week Program',
      description: 'Complete curriculum designed to transform you from beginner to job-ready in just 12 weeks',
    },
    {
      icon: Award,
      title: 'CSPO® Certified',
      description: 'Earn your Scrum Alliance Certified Scrum Product Owner certification',
    },
    {
      icon: Sparkles,
      title: 'AI-Powered',
      description: 'Learn modern AI tools and essentials to stay ahead in the product management field',
    },
    {
      icon: Users,
      title: 'No Coding Required',
      description: 'Perfect for career switchers with no technical or programming background needed',
    },
    {
      icon: Briefcase,
      title: 'Portfolio Project',
      description: 'Build a real-world capstone project to showcase in interviews and land your first role',
    },
    {
      icon: Shield,
      title: 'Lifetime Access',
      description: 'Get lifetime access to all course materials and future updates',
    },
  ];

  useEffect(() => {
    // Hero animation
    gsap.from(heroRef.current.children, {
      opacity: 0,
      y: 50,
      duration: 1,
      stagger: 0.2,
      ease: 'power3.out',
    });

    // Course card animation
    if (courseRef.current) {
      gsap.from(courseRef.current, {
        scrollTrigger: {
          trigger: courseRef.current,
          start: 'top 80%',
        },
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power3.out',
      });
    }

    // Modules animation
    if (modulesRef.current) {
      const moduleItems = modulesRef.current.querySelectorAll('.module-item');
      gsap.from(moduleItems, {
        scrollTrigger: {
          trigger: modulesRef.current,
          start: 'top 80%',
        },
        opacity: 0,
        x: -30,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out',
      });
    }

    // Benefits animation
    if (benefitsRef.current) {
      const benefitCards = benefitsRef.current.querySelectorAll('.benefit-card');
      gsap.from(benefitCards, {
        scrollTrigger: {
          trigger: benefitsRef.current,
          start: 'top 80%',
        },
        opacity: 0,
        scale: 0.9,
        duration: 0.8,
        stagger: 0.15,
        ease: 'back.out(1.7)',
      });
    }
  }, []);

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <NavigationHeader />

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center px-6 py-24 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-gold-500/10 via-black to-gold-600/5"></div>

        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 bg-gradient-to-r from-gold-300 via-gold-500 to-gold-300 bg-clip-text text-transparent">
            Two Paths to Product Owner Success
          </h1>
          <p className="text-xl md:text-2xl lg:text-3xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
            Choose the learning path that fits your goals: Live cohort with personalized coaching or
            self-paced on-demand. Both paths lead to the same destination.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 md:gap-12 mb-12">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-black text-gold-400 mb-2">500+</div>
              <div className="text-gray-400">Graduates</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-black text-gold-400 mb-2">4.9★</div>
              <div className="text-gray-400">Rating</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-black text-gold-400 mb-2">$85K+</div>
              <div className="text-gray-400">Avg Salary</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-black text-gold-400 mb-2">12</div>
              <div className="text-gray-400">Weeks</div>
            </div>
          </div>

        </div>
      </section>

      {/* Target Roles Section */}
      <section className="relative py-16 px-6 bg-gradient-to-b from-black via-gold-950/5 to-black">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black mb-8 text-center text-gold-400">
            Perfect For These Roles
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {targetRoles.map((role, idx) => {
              const Icon = role.icon;
              return (
                <div
                  key={idx}
                  className="backdrop-blur-xl bg-gradient-to-br from-gold-500/10 to-gold-600/5 border border-gold-500/20 rounded-2xl p-6 text-center hover:scale-105 transition-transform duration-300"
                >
                  <Icon className="w-8 h-8 text-gold-400 mx-auto mb-3" />
                  <p className="text-gray-200 font-semibold text-sm">{role.title}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pick Your Path - Dual Program Comparison */}
      <section ref={courseRef} className="relative py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black mb-4 text-center bg-gradient-to-r from-gold-300 to-gold-500 bg-clip-text text-transparent">
            Pick Your Path
          </h2>
          <p className="text-xl text-gray-400 mb-16 text-center max-w-3xl mx-auto">
            Both programs include CSPO® certification and lead to $85K+ Product Owner roles. Choose the format that works best for you.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {/* VIP Program Card */}
            <div className="relative backdrop-blur-xl bg-gradient-to-br from-gold-500/20 to-gold-600/10 border-4 border-gold-500/70 rounded-3xl p-8 md:p-10 shadow-2xl hover:scale-105 transition-transform duration-300">
              {/* Best Outcomes Badge */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-gold-500 to-gold-600 text-black px-6 py-2 rounded-full font-bold text-sm">
                BEST OUTCOMES
              </div>

              <div className="mt-4">
                <h3 className="text-2xl md:text-3xl font-black mb-2 text-white text-center">
                  VIP Program — Live + Pre-Recorded
                </h3>

                {/* Pricing */}
                <div className="text-center mb-8">
                  <div className="text-5xl md:text-6xl font-black text-gold-400 mb-1">$6,000</div>
                  <div className="text-gray-400 text-lg">/ 12 weeks</div>
                </div>

                {/* Features */}
                <div className="space-y-4 mb-8">
                  <div className="flex items-start gap-3 bg-gold-500/10 p-3 rounded-xl border border-gold-500/20">
                    <CheckCircle className="w-5 h-5 text-gold-400 flex-shrink-0 mt-1" />
                    <span className="text-gray-200">Weekly live cohort sessions + full pre-recorded library</span>
                  </div>
                  <div className="flex items-start gap-3 bg-gold-500/10 p-3 rounded-xl border border-gold-500/20">
                    <CheckCircle className="w-5 h-5 text-gold-400 flex-shrink-0 mt-1" />
                    <span className="text-gray-200">CSPO + 2 AI certifications guidance</span>
                  </div>
                  <div className="flex items-start gap-3 bg-gold-500/10 p-3 rounded-xl border border-gold-500/20">
                    <CheckCircle className="w-5 h-5 text-gold-400 flex-shrink-0 mt-1" />
                    <span className="text-gray-200">Career assets: backlogs, user stories, artifacts & portfolio</span>
                  </div>
                  <div className="flex items-start gap-3 bg-gold-500/10 p-3 rounded-xl border border-gold-500/20">
                    <CheckCircle className="w-5 h-5 text-gold-400 flex-shrink-0 mt-1" />
                    <span className="text-gray-200">Coach feedback & private community</span>
                  </div>
                  <div className="flex items-start gap-3 bg-gold-500/10 p-3 rounded-xl border border-gold-500/20">
                    <CheckCircle className="w-5 h-5 text-gold-400 flex-shrink-0 mt-1" />
                    <span className="text-gray-200">No coding required — built for beginners</span>
                  </div>
                </div>

                {/* CTA */}
                <a
                  href="https://courses.mentoragile.com/12-week-po-course"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full px-8 py-5 bg-gradient-to-r from-gold-500 to-gold-600 text-black font-bold text-lg rounded-xl hover:shadow-lg hover:shadow-gold-500/50 transition-all duration-300 text-center mb-3"
                >
                  Book Your Free Consultation →
                </a>
                <p className="text-center text-gray-400 text-sm">We'll confirm fit and lock your seat</p>
              </div>
            </div>

            {/* On-Demand Program Card */}
            <div className="relative backdrop-blur-xl bg-gray-50/5 border-2 border-gray-500/30 rounded-3xl p-8 md:p-10 shadow-xl hover:scale-105 transition-transform duration-300">
              <div className="mt-8">
                <h3 className="text-2xl md:text-3xl font-black mb-2 text-white text-center">
                  On Demand
                </h3>

                {/* Pricing */}
                <div className="text-center mb-8">
                  <div className="text-5xl md:text-6xl font-black text-gold-400 mb-1">$800</div>
                  <div className="text-gray-400 text-lg">/ Start today</div>
                </div>

                {/* What's Included */}
                <div className="mb-8">
                  <h4 className="text-lg font-bold mb-4 text-gold-300 text-center">Complete Curriculum Includes:</h4>
                  <div ref={modulesRef} className="space-y-2">
                    {modules.map((module, idx) => (
                      <div key={idx} className="module-item flex items-start gap-3">
                        <CheckCircle className="w-4 h-4 text-gold-400 flex-shrink-0 mt-1" />
                        <span className="text-gray-300 text-sm">{module}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <a
                  href="https://courses.mentoragile.com/offers/4HqAbvUj/checkout"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full px-8 py-5 bg-gradient-to-r from-gold-500 to-gold-600 text-black font-bold text-lg rounded-xl hover:shadow-lg hover:shadow-gold-500/50 transition-all duration-300 text-center"
                >
                  Enroll Now →
                </a>
                <p className="text-center text-gray-500 text-sm mt-3">Instant access • Lifetime updates</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Benefits Grid */}
      <section ref={benefitsRef} className="relative py-24 px-6 bg-gradient-to-b from-black via-gold-950/5 to-black">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black mb-16 text-center bg-gradient-to-r from-gold-300 to-gold-500 bg-clip-text text-transparent">
            Why Choose This Program?
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, idx) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={idx}
                  className="benefit-card backdrop-blur-xl bg-gradient-to-br from-gold-500/10 to-gold-600/5 border border-gold-500/20 rounded-2xl p-8 hover:scale-105 transition-transform duration-300"
                >
                  <div className="w-16 h-16 bg-gold-500/20 rounded-full flex items-center justify-center mb-6">
                    <Icon className="w-8 h-8 text-gold-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gold-400">{benefit.title}</h3>
                  <p className="text-gray-300 leading-relaxed">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Learning Journey */}
      <section className="relative py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black mb-12 text-center bg-gradient-to-r from-gold-300 to-gold-500 bg-clip-text text-transparent">
            Your 12-Week Journey
          </h2>

          <div className="backdrop-blur-xl bg-gradient-to-br from-gold-500/10 to-gold-600/5 border border-gold-500/20 rounded-3xl p-8 md:p-12">
            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-gold-500/20 rounded-full flex items-center justify-center">
                  <span className="text-gold-400 font-bold text-xl">1</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2 text-gold-400">Foundations (Weeks 1-3)</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Master Agile fundamentals, Scrum framework, and Product Owner role essentials. Earn your
                    CSPO® certification from Scrum Alliance.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-gold-500/20 rounded-full flex items-center justify-center">
                  <span className="text-gold-400 font-bold text-xl">2</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2 text-gold-400">Core Skills (Weeks 4-8)</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Learn customer discovery, roadmapping, backlog management, user stories, and stakeholder
                    communication. Master modern AI tools for product management.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-gold-500/20 rounded-full flex items-center justify-center">
                  <span className="text-gold-400 font-bold text-xl">3</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2 text-gold-400">Portfolio Project (Weeks 9-12)</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Build a real-world capstone project that demonstrates your skills. Create a portfolio piece
                    that will impress hiring managers and land you interviews.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-gold-500/20 rounded-full flex items-center justify-center">
                  <CheckCircle className="text-gold-400 w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2 text-gold-400">Job Ready!</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Graduate with CSPO® certification, AI skills, a portfolio project, and the confidence to
                    apply for $85K+ Product Owner roles.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Curriculum Section */}
      <CurriculumSection />

      {/* Certifications Section */}
      <CertificationsSection />

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Final CTA */}
      <section className="relative py-24 px-6 bg-gradient-to-b from-black via-gold-950/5 to-black">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-8 bg-gradient-to-r from-gold-300 to-gold-500 bg-clip-text text-transparent">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
            Join 500+ graduates who landed Product Owner roles earning $85K+ salaries.
          </p>
          <p className="text-lg text-gray-400 mb-12">
            ✓ CSPO® certification &nbsp;•&nbsp; ✓ Lifetime access &nbsp;•&nbsp; ✓ No coding required
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a
              href="https://courses.mentoragile.com/12-week-po-course"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-12 py-6 bg-blue-600 text-white font-bold text-xl rounded-2xl shadow-2xl hover:shadow-blue-500/50 hover:scale-105 transition-all duration-300"
            >
              VIP Program - $6,000
            </a>
            <a
              href="https://courses.mentoragile.com/offers/4HqAbvUj/checkout"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-12 py-6 bg-gradient-to-r from-gold-500 to-gold-600 text-black font-bold text-xl rounded-2xl shadow-2xl hover:shadow-gold-500/50 hover:scale-105 transition-all duration-300"
            >
              On-Demand - $800
            </a>
          </div>
          <p className="text-gray-500 mt-6">
            Have questions? <a href="/contact" className="text-gold-400 hover:text-gold-300 underline">Contact us</a>
          </p>
        </div>
      </section>

      <SocialFooter />
    </div>
  );
}

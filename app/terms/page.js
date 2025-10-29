'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import NavigationHeader from '../course-landing/components/NavigationHeader';
import SocialFooter from '../course-landing/components/SocialFooter';
import {
  FileText,
  Scale,
  Users,
  CreditCard,
  AlertCircle,
  ShieldCheck,
  BookOpen,
  Mail,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function TermsPage() {
  const heroRef = useRef(null);
  const contentRef = useRef(null);
  const [activeSection, setActiveSection] = useState('');

  const sections = [
    { id: 'acceptance', title: 'Acceptance of Terms', icon: Scale },
    { id: 'services', title: 'Our Services', icon: BookOpen },
    { id: 'user-accounts', title: 'User Accounts', icon: Users },
    { id: 'payment', title: 'Payment & Refunds', icon: CreditCard },
    { id: 'intellectual-property', title: 'Intellectual Property', icon: ShieldCheck },
    { id: 'liability', title: 'Limitation of Liability', icon: AlertCircle },
    { id: 'termination', title: 'Termination', icon: FileText },
    { id: 'contact', title: 'Contact Us', icon: Mail },
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

    // Content sections animation
    if (contentRef.current) {
      const contentSections = contentRef.current.querySelectorAll('.content-section');
      contentSections.forEach((section) => {
        gsap.from(section, {
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
          },
          opacity: 0,
          y: 30,
          duration: 0.8,
          ease: 'power3.out',
        });
      });
    }

    // Active section tracking
    const handleScroll = () => {
      const sections = document.querySelectorAll('.content-section');
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 150 && rect.bottom >= 150) {
          setActiveSection(section.id);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <NavigationHeader />

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-[60vh] flex items-center justify-center px-6 py-24 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-gold-500/10 via-black to-gold-600/5"></div>

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <div className="w-20 h-20 bg-gold-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Scale className="w-10 h-10 text-gold-400" />
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 bg-gradient-to-r from-gold-300 via-gold-500 to-gold-300 bg-clip-text text-transparent">
            Terms of Service
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-6 max-w-3xl mx-auto leading-relaxed">
            Please read these terms carefully before using our services. By accessing or using Mentor
            Agile, you agree to be bound by these terms.
          </p>
          <p className="text-sm text-gray-400">Last Updated: January 1, 2025</p>
        </div>
      </section>

      {/* Main Content */}
      <section className="relative py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sticky Table of Contents */}
            <aside className="lg:col-span-1">
              <div className="sticky top-24 backdrop-blur-xl bg-gradient-to-br from-gold-500/10 to-gold-600/5 border border-gold-500/20 rounded-2xl p-6 shadow-xl">
                <h2 className="text-xl font-bold mb-4 text-gold-400">Table of Contents</h2>
                <nav className="space-y-2">
                  {sections.map((section) => {
                    const Icon = section.icon;
                    return (
                      <button
                        key={section.id}
                        onClick={() => scrollToSection(section.id)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-300 ${
                          activeSection === section.id
                            ? 'bg-gold-500/20 text-gold-400 font-semibold'
                            : 'text-gray-300 hover:bg-gold-500/10 hover:text-gold-400'
                        }`}
                      >
                        <Icon className="w-4 h-4 flex-shrink-0" />
                        <span className="text-sm">{section.title}</span>
                      </button>
                    );
                  })}
                </nav>
              </div>
            </aside>

            {/* Content */}
            <div ref={contentRef} className="lg:col-span-3 space-y-8">
              {/* Acceptance of Terms */}
              <div id="acceptance" className="content-section backdrop-blur-xl bg-gradient-to-br from-gold-500/10 to-gold-600/5 border border-gold-500/20 rounded-3xl p-8 md:p-10 shadow-2xl">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gold-500/20 rounded-xl flex items-center justify-center">
                    <Scale className="w-6 h-6 text-gold-400" />
                  </div>
                  <h2 className="text-3xl font-black text-gold-400">Acceptance of Terms</h2>
                </div>
                <div className="prose prose-invert max-w-none">
                  <p className="text-gray-300 leading-relaxed mb-4">
                    Welcome to Mentor Agile. These Terms of Service ("Terms") govern your access to and
                    use of Mentor Agile's website, training programs, courses, and related services
                    (collectively, the "Services").
                  </p>
                  <p className="text-gray-300 leading-relaxed mb-4">
                    By accessing or using our Services, you agree to be bound by these Terms and our
                    Privacy Policy. If you do not agree to these Terms, you may not access or use our
                    Services.
                  </p>
                  <p className="text-gray-300 leading-relaxed">
                    We reserve the right to modify these Terms at any time. We will notify you of any
                    changes by posting the new Terms on this page and updating the "Last Updated" date.
                    Your continued use of the Services after such changes constitutes your acceptance of
                    the new Terms.
                  </p>
                </div>
              </div>

              {/* Our Services */}
              <div id="services" className="content-section backdrop-blur-xl bg-gradient-to-br from-gold-500/10 to-gold-600/5 border border-gold-500/20 rounded-3xl p-8 md:p-10 shadow-2xl">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gold-500/20 rounded-xl flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-gold-400" />
                  </div>
                  <h2 className="text-3xl font-black text-gold-400">Our Services</h2>
                </div>
                <div className="prose prose-invert max-w-none">
                  <p className="text-gray-300 leading-relaxed mb-4">
                    Mentor Agile provides the "Become a Job-Ready Product Owner" program in two formats:
                    a premium VIP program with live coaching ($6,000) and a flexible On-Demand option ($800).
                    Both are comprehensive 12-week trainings designed to transform beginners into certified Product Owners.
                  </p>

                  <h3 className="text-xl font-bold text-gold-300 mb-4 mt-6">VIP Program — Live + Pre-Recorded ($6,000)</h3>
                  <ul className="space-y-3 text-gray-300 mb-6">
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-gold-400 rounded-full mt-2 flex-shrink-0"></span>
                      <span>Weekly live cohort sessions with expert instructors</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-gold-400 rounded-full mt-2 flex-shrink-0"></span>
                      <span>Full access to pre-recorded curriculum library</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-gold-400 rounded-full mt-2 flex-shrink-0"></span>
                      <span>CSPO® + 2 AI certifications guidance and support</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-gold-400 rounded-full mt-2 flex-shrink-0"></span>
                      <span>Career assets development: backlogs, user stories, artifacts & portfolio</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-gold-400 rounded-full mt-2 flex-shrink-0"></span>
                      <span>Personalized coach feedback and private community access</span>
                    </li>
                  </ul>

                  <h3 className="text-xl font-bold text-gold-300 mb-4 mt-6">On-Demand Program ($800)</h3>
                  <ul className="space-y-3 text-gray-300 mb-6">
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-gold-400 rounded-full mt-2 flex-shrink-0"></span>
                      <span>12-week self-paced Product Owner curriculum (video lessons and worksheets)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-gold-400 rounded-full mt-2 flex-shrink-0"></span>
                      <span>Scrum Alliance Certified Scrum Product Owner (CSPO®) certification guidance</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-gold-400 rounded-full mt-2 flex-shrink-0"></span>
                      <span>AI Essentials training for modern product management</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-gold-400 rounded-full mt-2 flex-shrink-0"></span>
                      <span>Portfolio Capstone Project to showcase your skills to employers</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-gold-400 rounded-full mt-2 flex-shrink-0"></span>
                      <span>Lifetime access to all course materials and updates</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-gold-400 rounded-full mt-2 flex-shrink-0"></span>
                      <span>Community access via Slack for networking and support</span>
                    </li>
                  </ul>

                  <h3 className="text-xl font-bold text-gold-300 mb-4 mt-6">Enterprise Training</h3>
                  <ul className="space-y-3 text-gray-300">
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-gold-400 rounded-full mt-2 flex-shrink-0"></span>
                      <span>Custom team training packages available (contact for pricing)</span>
                    </li>
                  </ul>
                  <p className="text-gray-300 leading-relaxed mt-6">
                    We reserve the right to modify, suspend, or discontinue any aspect of our Services at
                    any time, with or without notice. We will not be liable to you or any third party for
                    any modification, suspension, or discontinuation of the Services.
                  </p>
                </div>
              </div>

              {/* User Accounts */}
              <div id="user-accounts" className="content-section backdrop-blur-xl bg-gradient-to-br from-gold-500/10 to-gold-600/5 border border-gold-500/20 rounded-3xl p-8 md:p-10 shadow-2xl">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gold-500/20 rounded-xl flex items-center justify-center">
                    <Users className="w-6 h-6 text-gold-400" />
                  </div>
                  <h2 className="text-3xl font-black text-gold-400">User Accounts and Responsibilities</h2>
                </div>
                <div className="prose prose-invert max-w-none">
                  <p className="text-gray-300 leading-relaxed mb-4">
                    To access certain features of our Services, you may be required to create an account.
                    When creating an account, you agree to:
                  </p>
                  <ul className="space-y-3 text-gray-300">
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-gold-400 rounded-full mt-2 flex-shrink-0"></span>
                      <span>Provide accurate, current, and complete information</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-gold-400 rounded-full mt-2 flex-shrink-0"></span>
                      <span>Maintain and promptly update your account information</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-gold-400 rounded-full mt-2 flex-shrink-0"></span>
                      <span>Maintain the security of your password and account</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-gold-400 rounded-full mt-2 flex-shrink-0"></span>
                      <span>Accept all responsibility for activities under your account</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-gold-400 rounded-full mt-2 flex-shrink-0"></span>
                      <span>
                        Notify us immediately of any unauthorized use of your account or security breach
                      </span>
                    </li>
                  </ul>
                  <p className="text-gray-300 leading-relaxed mt-6">
                    You may not use another person's account without permission. We reserve the right to
                    refuse service, terminate accounts, or remove content at our sole discretion.
                  </p>
                  <div className="bg-gold-500/10 border border-gold-500/30 rounded-xl p-6 mt-6">
                    <p className="text-gold-300 font-semibold mb-2">Account Usage Restrictions:</p>
                    <p className="text-gray-300">
                      You may not use our Services for any illegal or unauthorized purpose. You must not
                      violate any laws in your jurisdiction (including but not limited to copyright laws).
                      You may not share course materials or recordings with unauthorized third parties.
                    </p>
                  </div>
                </div>
              </div>

              {/* Payment & Refunds */}
              <div id="payment" className="content-section backdrop-blur-xl bg-gradient-to-br from-gold-500/10 to-gold-600/5 border border-gold-500/20 rounded-3xl p-8 md:p-10 shadow-2xl">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gold-500/20 rounded-xl flex items-center justify-center">
                    <CreditCard className="w-6 h-6 text-gold-400" />
                  </div>
                  <h2 className="text-3xl font-black text-gold-400">Payment Terms and Refund Policy</h2>
                </div>
                <div className="prose prose-invert max-w-none">
                  <h3 className="text-xl font-bold text-gold-300 mb-4">Payment Terms</h3>
                  <ul className="space-y-3 text-gray-300 mb-6">
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-gold-400 rounded-full mt-2 flex-shrink-0"></span>
                      <span>
                        <strong className="text-gold-300">VIP Program:</strong> $6,000 for 12 weeks of live coaching plus pre-recorded curriculum. Contact us to book a free consultation.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-gold-400 rounded-full mt-2 flex-shrink-0"></span>
                      <span>
                        <strong className="text-gold-300">On-Demand Program:</strong> $800 for lifetime access to self-paced curriculum
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-gold-400 rounded-full mt-2 flex-shrink-0"></span>
                      <span>
                        We accept credit cards, Google Pay, Affirm, and Klarna for flexible payment options
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-gold-400 rounded-full mt-2 flex-shrink-0"></span>
                      <span>
                        All prices are in US Dollars and include access to course materials, CSPO® certification guidance, and community access
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-gold-400 rounded-full mt-2 flex-shrink-0"></span>
                      <span>Enterprise training packages available - contact us for custom pricing</span>
                    </li>
                  </ul>

                  <h3 className="text-xl font-bold text-gold-300 mb-4 mt-8">Refund Policy</h3>
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    All sales are final. Due to the digital nature of our programs and immediate access to course materials,
                    we do not offer refunds once enrollment is complete and access has been granted.
                  </p>

                  <div className="bg-gold-500/10 border border-gold-500/30 rounded-xl p-6 mt-6">
                    <p className="text-gold-300 font-semibold mb-2">CSPO® Certification:</p>
                    <p className="text-gray-300">
                      The Scrum Alliance CSPO® certification exam and membership is included in your program fee.
                      Certification policies are governed by Scrum Alliance terms and conditions.
                    </p>
                  </div>
                </div>
              </div>

              {/* Intellectual Property */}
              <div id="intellectual-property" className="content-section backdrop-blur-xl bg-gradient-to-br from-gold-500/10 to-gold-600/5 border border-gold-500/20 rounded-3xl p-8 md:p-10 shadow-2xl">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gold-500/20 rounded-xl flex items-center justify-center">
                    <ShieldCheck className="w-6 h-6 text-gold-400" />
                  </div>
                  <h2 className="text-3xl font-black text-gold-400">Intellectual Property Rights</h2>
                </div>
                <div className="prose prose-invert max-w-none">
                  <p className="text-gray-300 leading-relaxed mb-4">
                    The Services and all content, features, and functionality (including but not limited
                    to information, software, text, displays, images, video, audio, course materials,
                    recordings, and the design, selection, and arrangement thereof) are owned by Mentor
                    Agile, its licensors, or other providers of such material and are protected by United
                    States and international copyright, trademark, patent, trade secret, and other
                    intellectual property laws.
                  </p>

                  <h3 className="text-xl font-bold text-gold-300 mb-4 mt-6">Limited License</h3>
                  <p className="text-gray-300 leading-relaxed mb-4">
                    We grant you a limited, non-exclusive, non-transferable, revocable license to:
                  </p>
                  <ul className="space-y-3 text-gray-300 mb-6">
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-gold-400 rounded-full mt-2 flex-shrink-0"></span>
                      <span>Access and use the Services for your personal, non-commercial use</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-gold-400 rounded-full mt-2 flex-shrink-0"></span>
                      <span>
                        Download course materials provided to you for your personal study and reference
                      </span>
                    </li>
                  </ul>

                  <h3 className="text-xl font-bold text-gold-300 mb-4 mt-6">Restrictions</h3>
                  <p className="text-gray-300 leading-relaxed mb-4">You may not:</p>
                  <ul className="space-y-3 text-gray-300">
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-gold-400 rounded-full mt-2 flex-shrink-0"></span>
                      <span>
                        Reproduce, distribute, modify, or create derivative works from our materials
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-gold-400 rounded-full mt-2 flex-shrink-0"></span>
                      <span>Share course recordings or materials with unauthorized third parties</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-gold-400 rounded-full mt-2 flex-shrink-0"></span>
                      <span>Use our materials for commercial purposes or training others</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-gold-400 rounded-full mt-2 flex-shrink-0"></span>
                      <span>Remove copyright or proprietary notices from materials</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-gold-400 rounded-full mt-2 flex-shrink-0"></span>
                      <span>
                        Reverse engineer, decompile, or disassemble any software or technology used in our
                        Services
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Limitation of Liability */}
              <div id="liability" className="content-section backdrop-blur-xl bg-gradient-to-br from-gold-500/10 to-gold-600/5 border border-gold-500/20 rounded-3xl p-8 md:p-10 shadow-2xl">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gold-500/20 rounded-xl flex items-center justify-center">
                    <AlertCircle className="w-6 h-6 text-gold-400" />
                  </div>
                  <h2 className="text-3xl font-black text-gold-400">Disclaimer and Limitation of Liability</h2>
                </div>
                <div className="prose prose-invert max-w-none">
                  <div className="bg-gold-500/10 border border-gold-500/30 rounded-xl p-6 mb-6">
                    <p className="text-gold-300 font-semibold mb-2 uppercase text-sm tracking-wide">
                      Important Legal Notice
                    </p>
                    <p className="text-gray-300 text-sm">
                      Please read this section carefully as it limits our liability and affects your legal
                      rights.
                    </p>
                  </div>

                  <h3 className="text-xl font-bold text-gold-300 mb-4">Disclaimer of Warranties</h3>
                  <p className="text-gray-300 leading-relaxed mb-4">
                    THE SERVICES ARE PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS WITHOUT WARRANTIES OF
                    ANY KIND, EITHER EXPRESS OR IMPLIED. TO THE FULLEST EXTENT PERMISSIBLE UNDER
                    APPLICABLE LAW, MENTOR AGILE DISCLAIMS ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING
                    BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
                    PURPOSE, AND NON-INFRINGEMENT.
                  </p>

                  <h3 className="text-xl font-bold text-gold-300 mb-4 mt-6">Certification Disclaimer</h3>
                  <p className="text-gray-300 leading-relaxed mb-4">
                    While we maintain high standards and a 98% pass rate, we do not guarantee that you
                    will pass any certification exam. Exam success depends on individual effort, study,
                    participation, and examination performance. Certification exam results are determined
                    solely by the certifying body (Scrum Alliance, Scaled Agile, PMI, etc.), not by Mentor
                    Agile.
                  </p>

                  <h3 className="text-xl font-bold text-gold-300 mb-4 mt-6">Limitation of Liability</h3>
                  <p className="text-gray-300 leading-relaxed mb-4">
                    TO THE MAXIMUM EXTENT PERMITTED BY LAW, IN NO EVENT SHALL MENTOR AGILE, ITS OFFICERS,
                    DIRECTORS, EMPLOYEES, OR AGENTS BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL,
                    CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING WITHOUT LIMITATION DAMAGES FOR LOSS OF
                    PROFITS, GOODWILL, USE, DATA, OR OTHER INTANGIBLE LOSSES ARISING OUT OF OR RELATED TO
                    YOUR USE OF OR INABILITY TO USE THE SERVICES.
                  </p>
                  <p className="text-gray-300 leading-relaxed">
                    OUR TOTAL LIABILITY TO YOU FOR ALL CLAIMS ARISING FROM OR RELATED TO THE SERVICES
                    SHALL NOT EXCEED THE AMOUNT YOU PAID TO US FOR THE SPECIFIC SERVICE GIVING RISE TO THE
                    CLAIM DURING THE 12 MONTHS PRECEDING THE CLAIM.
                  </p>
                </div>
              </div>

              {/* Termination */}
              <div id="termination" className="content-section backdrop-blur-xl bg-gradient-to-br from-gold-500/10 to-gold-600/5 border border-gold-500/20 rounded-3xl p-8 md:p-10 shadow-2xl">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gold-500/20 rounded-xl flex items-center justify-center">
                    <FileText className="w-6 h-6 text-gold-400" />
                  </div>
                  <h2 className="text-3xl font-black text-gold-400">Termination</h2>
                </div>
                <div className="prose prose-invert max-w-none">
                  <p className="text-gray-300 leading-relaxed mb-4">
                    We may terminate or suspend your account and access to the Services immediately,
                    without prior notice or liability, for any reason, including without limitation if you
                    breach these Terms.
                  </p>
                  <p className="text-gray-300 leading-relaxed mb-4">
                    Upon termination, your right to use the Services will immediately cease. If you wish
                    to terminate your account, you may contact us at{' '}
                    <a
                      href="mailto:info@mentoragile.com"
                      className="text-gold-400 hover:text-gold-300"
                    >
                      info@mentoragile.com
                    </a>
                    .
                  </p>
                  <p className="text-gray-300 leading-relaxed">
                    All provisions of these Terms which by their nature should survive termination shall
                    survive termination, including without limitation ownership provisions, warranty
                    disclaimers, indemnity, and limitations of liability.
                  </p>
                </div>
              </div>

              {/* Contact */}
              <div id="contact" className="content-section backdrop-blur-xl bg-gradient-to-br from-gold-500/10 to-gold-600/5 border border-gold-500/20 rounded-3xl p-8 md:p-10 shadow-2xl">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gold-500/20 rounded-xl flex items-center justify-center">
                    <Mail className="w-6 h-6 text-gold-400" />
                  </div>
                  <h2 className="text-3xl font-black text-gold-400">Contact Us About These Terms</h2>
                </div>
                <div className="prose prose-invert max-w-none">
                  <p className="text-gray-300 leading-relaxed mb-4">
                    If you have any questions about these Terms of Service, please contact us:
                  </p>
                  <div className="bg-black/30 rounded-2xl p-6 space-y-3">
                    <p className="text-gray-300">
                      <strong className="text-gold-300">Email:</strong>{' '}
                      <a href="mailto:info@mentoragile.com" className="text-gold-400 hover:text-gold-300">
                        info@mentoragile.com
                      </a>
                    </p>
                    <p className="text-gray-300">
                      <strong className="text-gold-300">Location:</strong> Chicago, IL
                    </p>
                  </div>

                  <div className="bg-gold-500/10 border border-gold-500/30 rounded-xl p-6 mt-6">
                    <p className="text-gold-300 font-semibold mb-2">Governing Law</p>
                    <p className="text-gray-300 text-sm">
                      These Terms shall be governed by and construed in accordance with the laws of the
                      State of California, United States, without regard to its conflict of law
                      provisions. Any disputes arising from these Terms or the Services shall be resolved
                      in the state or federal courts located in San Francisco County, California.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SocialFooter />
    </div>
  );
}

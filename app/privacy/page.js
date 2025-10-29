'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import NavigationHeader from '../course-landing/components/NavigationHeader';
import SocialFooter from '../course-landing/components/SocialFooter';
import { Shield, Lock, Eye, FileText, Database, UserCheck, Bell, Mail } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function PrivacyPage() {
  const heroRef = useRef(null);
  const contentRef = useRef(null);
  const [activeSection, setActiveSection] = useState('');

  const sections = [
    { id: 'introduction', title: 'Introduction', icon: Shield },
    { id: 'information-collection', title: 'Information We Collect', icon: Database },
    { id: 'use-of-information', title: 'How We Use Information', icon: FileText },
    { id: 'data-sharing', title: 'Data Sharing', icon: UserCheck },
    { id: 'data-security', title: 'Data Security', icon: Lock },
    { id: 'your-rights', title: 'Your Rights', icon: Eye },
    { id: 'cookies', title: 'Cookies & Tracking', icon: Bell },
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
            <Shield className="w-10 h-10 text-gold-400" />
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 bg-gradient-to-r from-gold-300 via-gold-500 to-gold-300 bg-clip-text text-transparent">
            Privacy Policy
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-6 max-w-3xl mx-auto leading-relaxed">
            Your privacy is important to us. This policy outlines how we collect, use, and protect
            your personal information.
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
              {/* Introduction */}
              <div id="introduction" className="content-section backdrop-blur-xl bg-gradient-to-br from-gold-500/10 to-gold-600/5 border border-gold-500/20 rounded-3xl p-8 md:p-10 shadow-2xl">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gold-500/20 rounded-xl flex items-center justify-center">
                    <Shield className="w-6 h-6 text-gold-400" />
                  </div>
                  <h2 className="text-3xl font-black text-gold-400">Introduction</h2>
                </div>
                <div className="prose prose-invert max-w-none">
                  <p className="text-gray-300 leading-relaxed mb-4">
                    Welcome to Mentor Agile. We respect your privacy and are committed to protecting your
                    personal data. This privacy policy will inform you about how we look after your
                    personal data when you visit our website, register for our courses, or interact with
                    our services, and tell you about your privacy rights and how the law protects you.
                  </p>
                  <p className="text-gray-300 leading-relaxed">
                    This privacy policy applies to all information collected through our services
                    (including our website, training programs, and any related services) as well as any
                    information collected offline or through other channels.
                  </p>
                </div>
              </div>

              {/* Information Collection */}
              <div id="information-collection" className="content-section backdrop-blur-xl bg-gradient-to-br from-gold-500/10 to-gold-600/5 border border-gold-500/20 rounded-3xl p-8 md:p-10 shadow-2xl">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gold-500/20 rounded-xl flex items-center justify-center">
                    <Database className="w-6 h-6 text-gold-400" />
                  </div>
                  <h2 className="text-3xl font-black text-gold-400">Information We Collect</h2>
                </div>
                <div className="prose prose-invert max-w-none">
                  <p className="text-gray-300 leading-relaxed mb-4">
                    We may collect, use, store, and transfer different kinds of personal data about you:
                  </p>
                  <ul className="space-y-3 text-gray-300">
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-gold-400 rounded-full mt-2 flex-shrink-0"></span>
                      <span>
                        <strong className="text-gold-300">Identity Data:</strong> First name, last name,
                        username, title, and professional credentials.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-gold-400 rounded-full mt-2 flex-shrink-0"></span>
                      <span>
                        <strong className="text-gold-300">Contact Data:</strong> Email address, telephone
                        number, billing address, and delivery address.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-gold-400 rounded-full mt-2 flex-shrink-0"></span>
                      <span>
                        <strong className="text-gold-300">Financial Data:</strong> Payment card details
                        and billing information (processed securely through third-party payment
                        processors).
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-gold-400 rounded-full mt-2 flex-shrink-0"></span>
                      <span>
                        <strong className="text-gold-300">Transaction Data:</strong> Details about
                        payments, courses purchased, and training history.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-gold-400 rounded-full mt-2 flex-shrink-0"></span>
                      <span>
                        <strong className="text-gold-300">Technical Data:</strong> IP address, browser
                        type and version, time zone, operating system, and platform.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-gold-400 rounded-full mt-2 flex-shrink-0"></span>
                      <span>
                        <strong className="text-gold-300">Usage Data:</strong> Information about how you
                        use our website, products, and services.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-gold-400 rounded-full mt-2 flex-shrink-0"></span>
                      <span>
                        <strong className="text-gold-300">Marketing Data:</strong> Your preferences in
                        receiving marketing from us and our third parties.
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Use of Information */}
              <div id="use-of-information" className="content-section backdrop-blur-xl bg-gradient-to-br from-gold-500/10 to-gold-600/5 border border-gold-500/20 rounded-3xl p-8 md:p-10 shadow-2xl">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gold-500/20 rounded-xl flex items-center justify-center">
                    <FileText className="w-6 h-6 text-gold-400" />
                  </div>
                  <h2 className="text-3xl font-black text-gold-400">How We Use Your Information</h2>
                </div>
                <div className="prose prose-invert max-w-none">
                  <p className="text-gray-300 leading-relaxed mb-4">
                    We will only use your personal data when the law allows us to. Most commonly, we will
                    use your personal data in the following circumstances:
                  </p>
                  <ul className="space-y-3 text-gray-300">
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-gold-400 rounded-full mt-2 flex-shrink-0"></span>
                      <span>
                        To register you for training courses and deliver the services you have requested
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-gold-400 rounded-full mt-2 flex-shrink-0"></span>
                      <span>To process and manage your payments and financial transactions</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-gold-400 rounded-full mt-2 flex-shrink-0"></span>
                      <span>
                        To manage our relationship with you, including notifying you about changes to our
                        terms or privacy policy
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-gold-400 rounded-full mt-2 flex-shrink-0"></span>
                      <span>
                        To administer and protect our business and website (including troubleshooting,
                        data analysis, and system testing)
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-gold-400 rounded-full mt-2 flex-shrink-0"></span>
                      <span>
                        To deliver relevant content, course recommendations, and advertisements to you
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-gold-400 rounded-full mt-2 flex-shrink-0"></span>
                      <span>
                        To use data analytics to improve our website, courses, marketing, customer
                        relationships, and experiences
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-gold-400 rounded-full mt-2 flex-shrink-0"></span>
                      <span>
                        To issue certifications and maintain records of your training achievements
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Data Sharing */}
              <div id="data-sharing" className="content-section backdrop-blur-xl bg-gradient-to-br from-gold-500/10 to-gold-600/5 border border-gold-500/20 rounded-3xl p-8 md:p-10 shadow-2xl">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gold-500/20 rounded-xl flex items-center justify-center">
                    <UserCheck className="w-6 h-6 text-gold-400" />
                  </div>
                  <h2 className="text-3xl font-black text-gold-400">Data Sharing and Disclosure</h2>
                </div>
                <div className="prose prose-invert max-w-none">
                  <p className="text-gray-300 leading-relaxed mb-4">
                    We may share your personal data with the following parties:
                  </p>
                  <ul className="space-y-3 text-gray-300">
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-gold-400 rounded-full mt-2 flex-shrink-0"></span>
                      <span>
                        <strong className="text-gold-300">Certification Bodies:</strong> We share
                        necessary information with Scrum Alliance, Scaled Agile, PMI, and other
                        certification organizations to process your certifications.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-gold-400 rounded-full mt-2 flex-shrink-0"></span>
                      <span>
                        <strong className="text-gold-300">Service Providers:</strong> Third-party vendors
                        who provide IT, system administration, payment processing, and marketing services.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-gold-400 rounded-full mt-2 flex-shrink-0"></span>
                      <span>
                        <strong className="text-gold-300">Professional Advisors:</strong> Lawyers,
                        bankers, auditors, and insurers who provide consultancy, banking, legal,
                        insurance, and accounting services.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-gold-400 rounded-full mt-2 flex-shrink-0"></span>
                      <span>
                        <strong className="text-gold-300">Regulatory Authorities:</strong> When required
                        by law or to comply with legal processes.
                      </span>
                    </li>
                  </ul>
                  <p className="text-gray-300 leading-relaxed mt-6">
                    We require all third parties to respect the security of your personal data and to
                    treat it in accordance with the law. We do not allow our third-party service providers
                    to use your personal data for their own purposes.
                  </p>
                </div>
              </div>

              {/* Data Security */}
              <div id="data-security" className="content-section backdrop-blur-xl bg-gradient-to-br from-gold-500/10 to-gold-600/5 border border-gold-500/20 rounded-3xl p-8 md:p-10 shadow-2xl">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gold-500/20 rounded-xl flex items-center justify-center">
                    <Lock className="w-6 h-6 text-gold-400" />
                  </div>
                  <h2 className="text-3xl font-black text-gold-400">Data Security</h2>
                </div>
                <div className="prose prose-invert max-w-none">
                  <p className="text-gray-300 leading-relaxed mb-4">
                    We have put in place appropriate security measures to prevent your personal data from
                    being accidentally lost, used, or accessed in an unauthorized way, altered, or
                    disclosed. These measures include:
                  </p>
                  <ul className="space-y-3 text-gray-300">
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-gold-400 rounded-full mt-2 flex-shrink-0"></span>
                      <span>SSL/TLS encryption for all data transmission</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-gold-400 rounded-full mt-2 flex-shrink-0"></span>
                      <span>Secure servers with regular security audits and updates</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-gold-400 rounded-full mt-2 flex-shrink-0"></span>
                      <span>Limited access to personal data on a need-to-know basis</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-gold-400 rounded-full mt-2 flex-shrink-0"></span>
                      <span>Regular employee training on data protection and security</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-gold-400 rounded-full mt-2 flex-shrink-0"></span>
                      <span>Procedures to deal with any suspected personal data breach</span>
                    </li>
                  </ul>
                  <p className="text-gray-300 leading-relaxed mt-6">
                    We will notify you and any applicable regulator of a breach where we are legally
                    required to do so.
                  </p>
                </div>
              </div>

              {/* Your Rights */}
              <div id="your-rights" className="content-section backdrop-blur-xl bg-gradient-to-br from-gold-500/10 to-gold-600/5 border border-gold-500/20 rounded-3xl p-8 md:p-10 shadow-2xl">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gold-500/20 rounded-xl flex items-center justify-center">
                    <Eye className="w-6 h-6 text-gold-400" />
                  </div>
                  <h2 className="text-3xl font-black text-gold-400">Your Rights</h2>
                </div>
                <div className="prose prose-invert max-w-none">
                  <p className="text-gray-300 leading-relaxed mb-4">
                    Under certain circumstances, you have rights under data protection laws in relation to
                    your personal data:
                  </p>
                  <ul className="space-y-3 text-gray-300">
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-gold-400 rounded-full mt-2 flex-shrink-0"></span>
                      <span>
                        <strong className="text-gold-300">Right to Access:</strong> Request access to your
                        personal data (commonly known as a "data subject access request").
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-gold-400 rounded-full mt-2 flex-shrink-0"></span>
                      <span>
                        <strong className="text-gold-300">Right to Correction:</strong> Request correction
                        of inaccurate or incomplete personal data.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-gold-400 rounded-full mt-2 flex-shrink-0"></span>
                      <span>
                        <strong className="text-gold-300">Right to Erasure:</strong> Request deletion or
                        removal of your personal data in certain circumstances.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-gold-400 rounded-full mt-2 flex-shrink-0"></span>
                      <span>
                        <strong className="text-gold-300">Right to Object:</strong> Object to processing
                        of your personal data for direct marketing purposes.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-gold-400 rounded-full mt-2 flex-shrink-0"></span>
                      <span>
                        <strong className="text-gold-300">Right to Data Portability:</strong> Request
                        transfer of your personal data to you or a third party.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-gold-400 rounded-full mt-2 flex-shrink-0"></span>
                      <span>
                        <strong className="text-gold-300">Right to Withdraw Consent:</strong> Withdraw
                        consent at any time where we are relying on consent to process your personal data.
                      </span>
                    </li>
                  </ul>
                  <p className="text-gray-300 leading-relaxed mt-6">
                    To exercise any of these rights, please contact us at{' '}
                    <a href="mailto:info@mentoragile.com" className="text-gold-400 hover:text-gold-300">
                      info@mentoragile.com
                    </a>
                    .
                  </p>
                </div>
              </div>

              {/* Cookies */}
              <div id="cookies" className="content-section backdrop-blur-xl bg-gradient-to-br from-gold-500/10 to-gold-600/5 border border-gold-500/20 rounded-3xl p-8 md:p-10 shadow-2xl">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gold-500/20 rounded-xl flex items-center justify-center">
                    <Bell className="w-6 h-6 text-gold-400" />
                  </div>
                  <h2 className="text-3xl font-black text-gold-400">Cookies and Tracking Technologies</h2>
                </div>
                <div className="prose prose-invert max-w-none">
                  <p className="text-gray-300 leading-relaxed mb-4">
                    We use cookies and similar tracking technologies to track activity on our website and
                    store certain information. Cookies are files with a small amount of data which may
                    include an anonymous unique identifier.
                  </p>
                  <p className="text-gray-300 leading-relaxed mb-4">
                    <strong className="text-gold-300">Types of cookies we use:</strong>
                  </p>
                  <ul className="space-y-3 text-gray-300">
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-gold-400 rounded-full mt-2 flex-shrink-0"></span>
                      <span>
                        <strong className="text-gold-300">Essential Cookies:</strong> Necessary for the
                        website to function properly.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-gold-400 rounded-full mt-2 flex-shrink-0"></span>
                      <span>
                        <strong className="text-gold-300">Performance Cookies:</strong> Help us understand
                        how visitors interact with our website.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-gold-400 rounded-full mt-2 flex-shrink-0"></span>
                      <span>
                        <strong className="text-gold-300">Functionality Cookies:</strong> Enable enhanced
                        functionality and personalization.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-gold-400 rounded-full mt-2 flex-shrink-0"></span>
                      <span>
                        <strong className="text-gold-300">Targeting Cookies:</strong> Record your visit,
                        pages viewed, and links followed for marketing purposes.
                      </span>
                    </li>
                  </ul>
                  <p className="text-gray-300 leading-relaxed mt-6">
                    You can instruct your browser to refuse all cookies or to indicate when a cookie is
                    being sent. However, if you do not accept cookies, you may not be able to use some
                    portions of our website.
                  </p>
                </div>
              </div>

              {/* Contact */}
              <div id="contact" className="content-section backdrop-blur-xl bg-gradient-to-br from-gold-500/10 to-gold-600/5 border border-gold-500/20 rounded-3xl p-8 md:p-10 shadow-2xl">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gold-500/20 rounded-xl flex items-center justify-center">
                    <Mail className="w-6 h-6 text-gold-400" />
                  </div>
                  <h2 className="text-3xl font-black text-gold-400">Contact Us About Privacy</h2>
                </div>
                <div className="prose prose-invert max-w-none">
                  <p className="text-gray-300 leading-relaxed mb-4">
                    If you have any questions about this Privacy Policy or our privacy practices, please
                    contact us:
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
                  <p className="text-gray-300 leading-relaxed mt-6">
                    We will respond to your inquiry within 30 days of receiving it.
                  </p>
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

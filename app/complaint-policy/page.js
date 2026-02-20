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
  ClipboardList,
  ShieldCheck,
  Ban,
  Archive,
  TrendingUp,
  Landmark,
  BarChart3,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function ComplaintPolicyPage() {
  const heroRef = useRef(null);
  const contentRef = useRef(null);
  const [activeSection, setActiveSection] = useState('');

  const sections = [
    { id: 'introduction', title: 'Introduction', icon: FileText },
    { id: 'scope', title: 'Scope', icon: Users },
    { id: 'definitions', title: 'Definitions', icon: Scale },
    { id: 'procedures', title: 'Procedures', icon: ClipboardList },
    { id: 'confidentiality', title: 'Confidentiality', icon: ShieldCheck },
    { id: 'retaliation', title: 'Retaliation Prohibited', icon: Ban },
    { id: 'record-keeping', title: 'Record Keeping', icon: Archive },
    { id: 'continuous-improvement', title: 'Continuous Improvement', icon: TrendingUp },
    { id: 'external-complaints', title: 'External Complaints (IBHE)', icon: Landmark },
    { id: 'public-reporting', title: 'Public Reporting', icon: BarChart3 },
  ];

  useEffect(() => {
    gsap.from(heroRef.current.children, {
      opacity: 0,
      y: 50,
      duration: 1,
      stagger: 0.2,
      ease: 'power3.out',
    });

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

    const handleScroll = () => {
      const sectionEls = document.querySelectorAll('.content-section');
      sectionEls.forEach((section) => {
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
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
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
            Institution Complaint Policy
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-6 max-w-3xl mx-auto leading-relaxed">
            Mentor Agile&apos;s policy for addressing student complaints. We value your feedback and are committed to resolving concerns promptly and fairly.
          </p>
          <p className="text-sm text-gray-400">Last Updated: February 20, 2026</p>
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

              {/* 1. Introduction */}
              <div id="introduction" className="content-section backdrop-blur-xl bg-gradient-to-br from-gold-500/10 to-gold-600/5 border border-gold-500/20 rounded-3xl p-8 md:p-10 shadow-2xl">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gold-500/20 rounded-xl flex items-center justify-center">
                    <FileText className="w-6 h-6 text-gold-400" />
                  </div>
                  <h2 className="text-3xl font-black text-gold-400">1. Introduction</h2>
                </div>
                <div className="prose prose-invert max-w-none">
                  <p className="text-gray-300 leading-relaxed">
                    Mentor Agile values feedback and treats complaints as opportunities to enhance services and learning experiences.
                  </p>
                </div>
              </div>

              {/* 2. Scope */}
              <div id="scope" className="content-section backdrop-blur-xl bg-gradient-to-br from-gold-500/10 to-gold-600/5 border border-gold-500/20 rounded-3xl p-8 md:p-10 shadow-2xl">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gold-500/20 rounded-xl flex items-center justify-center">
                    <Users className="w-6 h-6 text-gold-400" />
                  </div>
                  <h2 className="text-3xl font-black text-gold-400">2. Scope</h2>
                </div>
                <div className="prose prose-invert max-w-none">
                  <p className="text-gray-300 leading-relaxed">
                    This policy covers all enrolled students and addresses concerns about academic matters, administrative services, faculty, and overall experience.
                  </p>
                </div>
              </div>

              {/* 3. Definitions */}
              <div id="definitions" className="content-section backdrop-blur-xl bg-gradient-to-br from-gold-500/10 to-gold-600/5 border border-gold-500/20 rounded-3xl p-8 md:p-10 shadow-2xl">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gold-500/20 rounded-xl flex items-center justify-center">
                    <Scale className="w-6 h-6 text-gold-400" />
                  </div>
                  <h2 className="text-3xl font-black text-gold-400">3. Definitions</h2>
                </div>
                <div className="prose prose-invert max-w-none space-y-4">
                  <div className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-gold-400 rounded-full mt-2 flex-shrink-0"></span>
                    <p className="text-gray-300 leading-relaxed">
                      <span className="font-semibold text-white">Complaint:</span> A formal expression of dissatisfaction with institutional operations, services, or environment.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-gold-400 rounded-full mt-2 flex-shrink-0"></span>
                    <p className="text-gray-300 leading-relaxed">
                      <span className="font-semibold text-white">Complainant:</span> The student submitting the complaint.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-gold-400 rounded-full mt-2 flex-shrink-0"></span>
                    <p className="text-gray-300 leading-relaxed">
                      <span className="font-semibold text-white">Respondent:</span> The individual or department being complained about.
                    </p>
                  </div>
                </div>
              </div>

              {/* 4. Procedures */}
              <div id="procedures" className="content-section backdrop-blur-xl bg-gradient-to-br from-gold-500/10 to-gold-600/5 border border-gold-500/20 rounded-3xl p-8 md:p-10 shadow-2xl">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gold-500/20 rounded-xl flex items-center justify-center">
                    <ClipboardList className="w-6 h-6 text-gold-400" />
                  </div>
                  <h2 className="text-3xl font-black text-gold-400">4. Procedures for Lodging a Complaint</h2>
                </div>
                <div className="prose prose-invert max-w-none space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-gold-300 mb-3">Informal Resolution</h3>
                    <p className="text-gray-300 leading-relaxed">
                      Students should first attempt to resolve issues directly with the relevant individuals or departments.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-gold-300 mb-4">Formal Complaint Process</h3>
                    <div className="space-y-4">
                      <div className="relative pl-8 border-l-2 border-gold-500/30">
                        <div className="absolute -left-3 top-0 w-6 h-6 bg-gold-500/20 rounded-full flex items-center justify-center text-xs font-bold text-gold-400">1</div>
                        <h4 className="font-semibold text-white mb-1">Submission</h4>
                        <p className="text-gray-300 leading-relaxed">Submit written complaints using official forms available on the website or student portal, including issue details, dates, parties involved, and supporting documents.</p>
                      </div>
                      <div className="relative pl-8 border-l-2 border-gold-500/30">
                        <div className="absolute -left-3 top-0 w-6 h-6 bg-gold-500/20 rounded-full flex items-center justify-center text-xs font-bold text-gold-400">2</div>
                        <h4 className="font-semibold text-white mb-1">Acknowledgment</h4>
                        <p className="text-gray-300 leading-relaxed">The institution acknowledges receipt within <span className="text-gold-400 font-semibold">5 business days</span> with an investigation timeline.</p>
                      </div>
                      <div className="relative pl-8 border-l-2 border-gold-500/30">
                        <div className="absolute -left-3 top-0 w-6 h-6 bg-gold-500/20 rounded-full flex items-center justify-center text-xs font-bold text-gold-400">3</div>
                        <h4 className="font-semibold text-white mb-1">Investigation</h4>
                        <p className="text-gray-300 leading-relaxed">An appointed Complaints Officer reviews documentation impartially and confidentially, conducting interviews and gathering information.</p>
                      </div>
                      <div className="relative pl-8 border-l-2 border-gold-500/30">
                        <div className="absolute -left-3 top-0 w-6 h-6 bg-gold-500/20 rounded-full flex items-center justify-center text-xs font-bold text-gold-400">4</div>
                        <h4 className="font-semibold text-white mb-1">Resolution</h4>
                        <p className="text-gray-300 leading-relaxed">A written decision is provided within <span className="text-gold-400 font-semibold">20 business days</span> including findings and corrective actions.</p>
                      </div>
                      <div className="relative pl-8 border-l-2 border-gold-500/30">
                        <div className="absolute -left-3 top-0 w-6 h-6 bg-gold-500/20 rounded-full flex items-center justify-center text-xs font-bold text-gold-400">5</div>
                        <h4 className="font-semibold text-white mb-1">Appeal</h4>
                        <p className="text-gray-300 leading-relaxed">Dissatisfied complainants may appeal within <span className="text-gold-400 font-semibold">10 business days</span>. The Appeals Committee decides within <span className="text-gold-400 font-semibold">15 business days</span>.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 5. Confidentiality */}
              <div id="confidentiality" className="content-section backdrop-blur-xl bg-gradient-to-br from-gold-500/10 to-gold-600/5 border border-gold-500/20 rounded-3xl p-8 md:p-10 shadow-2xl">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gold-500/20 rounded-xl flex items-center justify-center">
                    <ShieldCheck className="w-6 h-6 text-gold-400" />
                  </div>
                  <h2 className="text-3xl font-black text-gold-400">5. Confidentiality</h2>
                </div>
                <div className="prose prose-invert max-w-none">
                  <p className="text-gray-300 leading-relaxed">
                    Information shared during the complaint process is only disclosed to those directly involved in the resolution. All parties are expected to maintain discretion throughout the process.
                  </p>
                </div>
              </div>

              {/* 6. Retaliation Prohibited */}
              <div id="retaliation" className="content-section backdrop-blur-xl bg-gradient-to-br from-gold-500/10 to-gold-600/5 border border-gold-500/20 rounded-3xl p-8 md:p-10 shadow-2xl">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gold-500/20 rounded-xl flex items-center justify-center">
                    <Ban className="w-6 h-6 text-gold-400" />
                  </div>
                  <h2 className="text-3xl font-black text-gold-400">6. Retaliation Prohibited</h2>
                </div>
                <div className="prose prose-invert max-w-none">
                  <p className="text-gray-300 leading-relaxed">
                    No retaliation shall be taken against any student for filing a complaint. Any violations of this policy are subject to disciplinary action.
                  </p>
                </div>
              </div>

              {/* 7. Record Keeping */}
              <div id="record-keeping" className="content-section backdrop-blur-xl bg-gradient-to-br from-gold-500/10 to-gold-600/5 border border-gold-500/20 rounded-3xl p-8 md:p-10 shadow-2xl">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gold-500/20 rounded-xl flex items-center justify-center">
                    <Archive className="w-6 h-6 text-gold-400" />
                  </div>
                  <h2 className="text-3xl font-black text-gold-400">7. Record Keeping</h2>
                </div>
                <div className="prose prose-invert max-w-none">
                  <p className="text-gray-300 leading-relaxed">
                    All complaint records are retained for a minimum of five years in a secure and confidential manner.
                  </p>
                </div>
              </div>

              {/* 8. Continuous Improvement */}
              <div id="continuous-improvement" className="content-section backdrop-blur-xl bg-gradient-to-br from-gold-500/10 to-gold-600/5 border border-gold-500/20 rounded-3xl p-8 md:p-10 shadow-2xl">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gold-500/20 rounded-xl flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-gold-400" />
                  </div>
                  <h2 className="text-3xl font-black text-gold-400">8. Continuous Improvement</h2>
                </div>
                <div className="prose prose-invert max-w-none">
                  <p className="text-gray-300 leading-relaxed">
                    Mentor Agile regularly reviews complaint trends to inform institutional changes and improve the quality of education and services provided.
                  </p>
                </div>
              </div>

              {/* 9. External Complaints - IBHE */}
              <div id="external-complaints" className="content-section backdrop-blur-xl bg-gradient-to-br from-gold-500/10 to-gold-600/5 border border-gold-500/20 rounded-3xl p-8 md:p-10 shadow-2xl">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gold-500/20 rounded-xl flex items-center justify-center">
                    <Landmark className="w-6 h-6 text-gold-400" />
                  </div>
                  <h2 className="text-3xl font-black text-gold-400">9. External Complaints</h2>
                </div>
                <div className="prose prose-invert max-w-none space-y-4">
                  <p className="text-gray-300 leading-relaxed">
                    If a complaint cannot be resolved through Mentor Agile&apos;s internal process, students may contact the <span className="font-semibold text-white">Illinois Board of Higher Education (IBHE)</span>:
                  </p>
                  <div className="bg-gold-500/10 border border-gold-500/20 rounded-2xl p-6 space-y-2">
                    <p className="font-semibold text-gold-400 text-lg">Illinois Board of Higher Education</p>
                    <p className="text-gray-300">Division of Private Business and Vocational Schools</p>
                    <p className="text-gray-300">1 N. Old State Capitol Plaza, Suite 333</p>
                    <p className="text-gray-300">Springfield, IL 62701</p>
                    <div className="pt-2 space-y-1">
                      <p className="text-gray-300"><span className="text-gray-400">Phone:</span> (217) 782-2551</p>
                      <p className="text-gray-300"><span className="text-gray-400">Fax:</span> (217) 782-8548</p>
                      <p className="text-gray-300"><span className="text-gray-400">Website:</span>{' '}
                        <a href="https://www.ibhe.org" target="_blank" rel="noopener noreferrer" className="text-gold-400 hover:text-gold-300 underline underline-offset-2 transition-colors">www.ibhe.org</a>
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-300 leading-relaxed">
                    Mentor Agile may appeal determinations within 10 business days. Noncompliance may result in cease and desist orders or approval revocation.
                  </p>
                </div>
              </div>

              {/* 10. Public Reporting */}
              <div id="public-reporting" className="content-section backdrop-blur-xl bg-gradient-to-br from-gold-500/10 to-gold-600/5 border border-gold-500/20 rounded-3xl p-8 md:p-10 shadow-2xl">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gold-500/20 rounded-xl flex items-center justify-center">
                    <BarChart3 className="w-6 h-6 text-gold-400" />
                  </div>
                  <h2 className="text-3xl font-black text-gold-400">10. Public Reporting</h2>
                </div>
                <div className="prose prose-invert max-w-none">
                  <p className="text-gray-300 leading-relaxed">
                    The IBHE issues annual public reports on complaints without identifying individual students.
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

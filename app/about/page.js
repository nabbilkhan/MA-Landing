'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import NavigationHeader from '../course-landing/components/NavigationHeader';
import SocialFooter from '../course-landing/components/SocialFooter';
import CurriculumSection from '../components/CurriculumSection';
import CertificationsSection from '../components/CertificationsSection';
import { Users, Target, Award, Heart, Lightbulb, TrendingUp, CheckCircle, Shield } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function AboutPage() {
  const heroRef = useRef(null);
  const storyRef = useRef(null);
  const valuesRef = useRef(null);

  useEffect(() => {
    // Hero animation
    gsap.from(heroRef.current.children, {
      opacity: 0,
      y: 50,
      duration: 1,
      stagger: 0.2,
      ease: 'power3.out',
    });

    // Story section animation
    gsap.from(storyRef.current.children, {
      scrollTrigger: {
        trigger: storyRef.current,
        start: 'top 80%',
      },
      opacity: 0,
      y: 50,
      duration: 1,
      stagger: 0.3,
      ease: 'power3.out',
    });

    // Values cards animation
    if (valuesRef.current) {
      const cards = valuesRef.current.querySelectorAll('.value-card');
      // Set initial visible state
      gsap.set(cards, { opacity: 1, scale: 1 });
      gsap.from(cards, {
        scrollTrigger: {
          trigger: valuesRef.current,
          start: 'top 80%',
        },
        opacity: 0,
        scale: 0.9,
        y: 30,
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
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-gold-500/10 via-black to-gold-600/5 animate-gradient-shift"></div>

        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 bg-gradient-to-r from-gold-300 via-gold-500 to-gold-300 bg-clip-text text-transparent animate-gradient-flow">
            About Mentor Agile
          </h1>
          <p className="text-xl md:text-2xl lg:text-3xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
            Transforming beginners into job-ready Product Owners in just 12 weeks.
            No coding required—just your ambition and our proven system.
          </p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 mt-12">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-black text-gold-400 mb-2">500+</div>
              <div className="text-gray-400 text-sm md:text-base">Graduates</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-black text-gold-400 mb-2">4.9★</div>
              <div className="text-gray-400 text-sm md:text-base">Rating</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-black text-gold-400 mb-2">$85K+</div>
              <div className="text-gray-400 text-sm md:text-base">Avg Salary</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-black text-gold-400 mb-2">12</div>
              <div className="text-gray-400 text-sm md:text-base">Week Program</div>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section ref={storyRef} className="relative py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-12 text-center bg-gradient-to-r from-gold-300 to-gold-500 bg-clip-text text-transparent">
            Our Story
          </h2>

          <div className="backdrop-blur-xl bg-gradient-to-br from-gold-500/10 to-gold-600/5 border border-gold-500/20 rounded-3xl p-8 md:p-12 shadow-2xl">
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-6">
              Mentor Agile was founded with a clear mission: to help everyday professionals break into
              high-paying Product Owner roles—without needing a tech degree or coding skills. We recognized
              that while Product Owners are in high demand, quality training that actually prepares you for
              the job was nearly impossible to find.
            </p>
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-6">
              We offer two learning paths to fit your needs: a premium VIP program with live coaching and
              personalized feedback, or a flexible on-demand option for self-paced learning. Both paths
              include Scrum Alliance CSPO certification, modern AI tools, real-world projects, and portfolio
              development. We don't just teach theory—we transform beginners into job-ready professionals
              who can command $85K+ salaries.
            </p>
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
              Today, over 500 graduates have launched successful Product Owner careers through our program.
              With a 4.9-star rating and 95% job placement rate, we're proud to be the trusted path for
              career changers, business analysts, and aspiring product professionals who want to break into
              this lucrative field.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="relative py-24 px-6 bg-gradient-to-b from-black via-gold-950/5 to-black">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
          {/* Mission */}
          <div className="backdrop-blur-xl bg-gradient-to-br from-gold-500/10 to-gold-600/5 border border-gold-500/20 rounded-3xl p-8 md:p-10 shadow-2xl hover:scale-105 transition-transform duration-500">
            <div className="w-16 h-16 bg-gold-500/20 rounded-2xl flex items-center justify-center mb-6">
              <Target className="w-8 h-8 text-gold-400" />
            </div>
            <h3 className="text-3xl md:text-4xl font-black mb-6 text-gold-400">Our Mission</h3>
            <p className="text-lg text-gray-300 leading-relaxed">
              To transform everyday professionals into job-ready Product Owners—no coding or tech
              background required. We provide the CSPO certification, real-world skills, AI tools, and
              portfolio projects that get you hired in high-paying Product Owner roles within 12 weeks.
            </p>
          </div>

          {/* Vision */}
          <div className="backdrop-blur-xl bg-gradient-to-br from-gold-500/10 to-gold-600/5 border border-gold-500/20 rounded-3xl p-8 md:p-10 shadow-2xl hover:scale-105 transition-transform duration-500">
            <div className="w-16 h-16 bg-gold-500/20 rounded-2xl flex items-center justify-center mb-6">
              <Lightbulb className="w-8 h-8 text-gold-400" />
            </div>
            <h3 className="text-3xl md:text-4xl font-black mb-6 text-gold-400">Our Vision</h3>
            <p className="text-lg text-gray-300 leading-relaxed">
              To be the #1 trusted program for breaking into Product Owner careers, known for delivering
              real results: $85K+ salaries, 95% job placement, and life-changing career transformations.
              We believe anyone with ambition can succeed—and we're here to prove it.
            </p>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section ref={valuesRef} className="relative py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-16 text-center bg-gradient-to-r from-gold-300 to-gold-500 bg-clip-text text-transparent">
            Our Core Values
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Value 1 */}
            <div className="value-card backdrop-blur-xl bg-gradient-to-br from-gold-500/10 to-gold-600/5 border border-gold-500/20 rounded-3xl p-8 shadow-2xl hover:shadow-gold-500/20 hover:scale-105 transition-all duration-500">
              <div className="w-16 h-16 bg-gold-500/20 rounded-2xl flex items-center justify-center mb-6">
                <Award className="w-8 h-8 text-gold-400" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gold-400">Excellence</h3>
              <p className="text-gray-300 leading-relaxed">
                We pursue excellence in everything we do—from curriculum design to instructor quality,
                ensuring our students receive the highest caliber of education.
              </p>
            </div>

            {/* Value 2 */}
            <div className="value-card backdrop-blur-xl bg-gradient-to-br from-gold-500/10 to-gold-600/5 border border-gold-500/20 rounded-3xl p-8 shadow-2xl hover:shadow-gold-500/20 hover:scale-105 transition-all duration-500">
              <div className="w-16 h-16 bg-gold-500/20 rounded-2xl flex items-center justify-center mb-6">
                <Users className="w-8 h-8 text-gold-400" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gold-400">Student-Centric</h3>
              <p className="text-gray-300 leading-relaxed">
                Our students are at the heart of everything we do. We're committed to creating
                personalized learning experiences that meet diverse needs and learning styles.
              </p>
            </div>

            {/* Value 3 */}
            <div className="value-card backdrop-blur-xl bg-gradient-to-br from-gold-500/10 to-gold-600/5 border border-gold-500/20 rounded-3xl p-8 shadow-2xl hover:shadow-gold-500/20 hover:scale-105 transition-all duration-500">
              <div className="w-16 h-16 bg-gold-500/20 rounded-2xl flex items-center justify-center mb-6">
                <Lightbulb className="w-8 h-8 text-gold-400" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gold-400">Innovation</h3>
              <p className="text-gray-300 leading-relaxed">
                We continuously evolve our methods, embracing new technologies and pedagogical
                approaches to deliver cutting-edge education that prepares students for tomorrow.
              </p>
            </div>

            {/* Value 4 */}
            <div className="value-card backdrop-blur-xl bg-gradient-to-br from-gold-500/10 to-gold-600/5 border border-gold-500/20 rounded-3xl p-8 shadow-2xl hover:shadow-gold-500/20 hover:scale-105 transition-all duration-500">
              <div className="w-16 h-16 bg-gold-500/20 rounded-2xl flex items-center justify-center mb-6">
                <Heart className="w-8 h-8 text-gold-400" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gold-400">Integrity</h3>
              <p className="text-gray-300 leading-relaxed">
                We operate with transparency, honesty, and ethical standards in all our interactions,
                building lasting trust with our students and partners.
              </p>
            </div>

            {/* Value 5 */}
            <div className="value-card backdrop-blur-xl bg-gradient-to-br from-gold-500/10 to-gold-600/5 border border-gold-500/20 rounded-3xl p-8 shadow-2xl hover:shadow-gold-500/20 hover:scale-105 transition-all duration-500">
              <div className="w-16 h-16 bg-gold-500/20 rounded-2xl flex items-center justify-center mb-6">
                <TrendingUp className="w-8 h-8 text-gold-400" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gold-400">Continuous Improvement</h3>
              <p className="text-gray-300 leading-relaxed">
                We practice what we teach—constantly seeking feedback, iterating on our offerings,
                and embracing the Agile mindset of continuous learning and adaptation.
              </p>
            </div>

            {/* Value 6 */}
            <div className="value-card backdrop-blur-xl bg-gradient-to-br from-gold-500/10 to-gold-600/5 border border-gold-500/20 rounded-3xl p-8 shadow-2xl hover:shadow-gold-500/20 hover:scale-105 transition-all duration-500">
              <div className="w-16 h-16 bg-gold-500/20 rounded-2xl flex items-center justify-center mb-6">
                <Target className="w-8 h-8 text-gold-400" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gold-400">Results-Driven</h3>
              <p className="text-gray-300 leading-relaxed">
                We measure success by the tangible outcomes our students achieve—career advancement,
                certification success, and organizational transformation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Curriculum Preview */}
      <CurriculumSection compact={true} />

      {/* Certifications Section */}
      <CertificationsSection compact={true} />

      {/* Choose Your Path Section */}
      <section className="relative py-24 px-6 bg-gradient-to-b from-black via-gold-950/5 to-black">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black mb-4 text-center bg-gradient-to-r from-gold-300 to-gold-500 bg-clip-text text-transparent">
            Choose Your Path
          </h2>
          <p className="text-xl text-gray-400 mb-16 text-center max-w-3xl mx-auto">
            Both programs lead to the same destination: a job-ready Product Owner career earning $85K+. Pick the learning format that works for you.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {/* VIP Program Card */}
            <div className="relative backdrop-blur-xl bg-gradient-to-br from-gold-500/20 to-gold-600/10 border-4 border-gold-500/70 rounded-3xl p-8 md:p-10 shadow-2xl hover:scale-105 transition-transform duration-300">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-gold-500 to-gold-600 text-black px-6 py-2 rounded-full font-bold text-sm">
                BEST OUTCOMES
              </div>

              <div className="mt-4">
                <h3 className="text-2xl md:text-3xl font-black mb-2 text-white text-center">
                  VIP Program — Live + Pre-Recorded
                </h3>
                <div className="text-center mb-6">
                  <div className="text-5xl md:text-6xl font-black text-gold-400 mb-1">$6,000</div>
                  <div className="text-gray-400 text-lg">/ 12 weeks</div>
                </div>

                <div className="space-y-3 mb-8">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-gold-400 flex-shrink-0 mt-1" />
                    <span className="text-gray-200 text-sm">Weekly live cohort sessions + full pre-recorded library</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-gold-400 flex-shrink-0 mt-1" />
                    <span className="text-gray-200 text-sm">CSPO + 2 AI certifications guidance</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-gold-400 flex-shrink-0 mt-1" />
                    <span className="text-gray-200 text-sm">Career assets: backlogs, user stories, artifacts & portfolio</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-gold-400 flex-shrink-0 mt-1" />
                    <span className="text-gray-200 text-sm">Coach feedback & private community</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-gold-400 flex-shrink-0 mt-1" />
                    <span className="text-gray-200 text-sm">No coding required — built for beginners</span>
                  </div>
                </div>

                <a
                  href="https://courses.mentoragile.com/12-week-po-course"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full px-8 py-4 bg-gradient-to-r from-gold-500 to-gold-600 text-black font-bold text-lg rounded-xl hover:shadow-lg hover:shadow-gold-500/50 transition-all duration-300 text-center"
                >
                  Book Your Free Consultation →
                </a>
              </div>
            </div>

            {/* On-Demand Program Card */}
            <div className="relative backdrop-blur-xl bg-gray-50/5 border-2 border-gray-500/30 rounded-3xl p-8 md:p-10 shadow-xl hover:scale-105 transition-transform duration-300">
              <div className="mt-8">
                <h3 className="text-2xl md:text-3xl font-black mb-2 text-white text-center">
                  On-Demand Program
                </h3>
                <div className="text-center mb-6">
                  <div className="text-5xl md:text-6xl font-black text-gold-400 mb-1">$800</div>
                  <div className="text-gray-400 text-lg">/ Start today</div>
                </div>

                <div className="space-y-3 mb-8">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-gold-400 flex-shrink-0 mt-1" />
                    <span className="text-gray-300 text-sm">12-week on-demand curriculum (videos + worksheets)</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-gold-400 flex-shrink-0 mt-1" />
                    <span className="text-gray-300 text-sm">Scrum Alliance CSPO® Certification</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-gold-400 flex-shrink-0 mt-1" />
                    <span className="text-gray-300 text-sm">AI Essentials training</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-gold-400 flex-shrink-0 mt-1" />
                    <span className="text-gray-300 text-sm">Portfolio Capstone Project</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-gold-400 flex-shrink-0 mt-1" />
                    <span className="text-gray-300 text-sm">Lifetime Course Access + Community (Slack)</span>
                  </div>
                </div>

                <a
                  href="https://courses.mentoragile.com/offers/4HqAbvUj/checkout"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full px-8 py-4 bg-gradient-to-r from-gold-500 to-gold-600 text-black font-bold text-lg rounded-xl hover:shadow-lg transition-all duration-300 text-center"
                >
                  Enroll Now →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-8 bg-gradient-to-r from-gold-300 to-gold-500 bg-clip-text text-transparent">
            Ready to Become a Product Owner?
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed">
            Join 500+ graduates who transformed their careers and now earn $85K+ as Product Owners—
            all in just 12 weeks, no coding required.
          </p>
          <a
            href="/courses"
            className="inline-block px-12 py-6 bg-gradient-to-r from-gold-500 to-gold-600 text-black font-bold text-lg rounded-2xl shadow-2xl hover:shadow-gold-500/50 hover:scale-105 transition-all duration-300"
          >
            View Program Details
          </a>
        </div>
      </section>

      <SocialFooter />
    </div>
  );
}

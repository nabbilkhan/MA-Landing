'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';
import * as THREE from 'three';
import Lenis from 'lenis';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

// Import components (reusing from course-landing where applicable)
import NavigationHeader from '../course-landing/components/NavigationHeader';
import GlassmorphicLogo from '../course-landing/components/GlassmorphicLogo';
import NewsletterSignup from '../course-landing/components/NewsletterSignup';
import SocialFooter from '../course-landing/components/SocialFooter';
import { isProgramVisible } from '../config/siteConfig';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, TextPlugin);
}

export default function HealthcareLandingPage() {
  const router = useRouter();
  const heroRef = useRef(null);
  const canvasRef = useRef(null);
  const textRef = useRef(null);
  const imageRef = useRef(null);
  const modulesHeadingRef = useRef(null);
  const moduleCardsRef = useRef([]);
  const videoHeadingRef = useRef(null);
  const videoContainerRef = useRef(null);
  const ctaSectionRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [orientation, setOrientation] = useState({ beta: 0, gamma: 0 });
  const [gyroPermission, setGyroPermission] = useState('pending');
  const [showGyroButton, setShowGyroButton] = useState(false);
  const mousePositionRef = useRef({ x: 0, y: 0 });
  const scrambleTimeouts = useRef([]);
  const particleCanvasRef = useRef(null);
  const scrollProgressBarRef = useRef(null);
  const [showVideoModal, setShowVideoModal] = useState(false);

  // Redirect if program is hidden
  useEffect(() => {
    if (!isProgramVisible('healthcare')) {
      router.replace('/');
    }
  }, [router]);

  // Loading Animation
  useEffect(() => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 15;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      }
      setLoadProgress(progress);
    }, 150);

    return () => clearInterval(interval);
  }, []);

  // Mobile Detection
  useEffect(() => {
    const checkMobile = () => {
      const mobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) || window.innerWidth < 768;
      setIsMobile(mobile);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // iOS Detection and Permission Check
  useEffect(() => {
    if (!isMobile) return;

    const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
    const needsPermission = typeof DeviceOrientationEvent !== 'undefined' &&
                           typeof DeviceOrientationEvent.requestPermission === 'function';

    if (needsPermission && isIOS) {
      setShowGyroButton(true);
      setGyroPermission('pending');
    } else {
      setGyroPermission('not-needed');
      setShowGyroButton(false);
    }
  }, [isMobile]);

  // Permission Request Handler (iOS 13+)
  const handleGyroPermission = async () => {
    try {
      if (typeof DeviceOrientationEvent.requestPermission === 'function') {
        const permission = await DeviceOrientationEvent.requestPermission();
        if (permission === 'granted') {
          setGyroPermission('granted');
          setShowGyroButton(false);
        } else {
          setGyroPermission('denied');
        }
      }
    } catch (error) {
      setGyroPermission('denied');
    }
  };

  // Device Orientation Tracking (Mobile Only)
  useEffect(() => {
    if (!isMobile) return;

    const canUseGyro = gyroPermission === 'granted' || gyroPermission === 'not-needed';
    if (!canUseGyro) return;

    const handleOrientation = (event) => {
      const beta = event.beta;
      const gamma = event.gamma;

      if (beta === null || gamma === null) return;

      setOrientation({ beta, gamma });

      const adjustedBeta = beta - 90;
      const clampedBeta = Math.max(-45, Math.min(45, adjustedBeta));
      const newPosition = {
        x: (gamma / 90) * 150,
        y: (clampedBeta / 45) * 150
      };

      setMousePosition(newPosition);
      mousePositionRef.current = newPosition;
    };

    window.addEventListener('deviceorientation', handleOrientation, true);

    return () => {
      window.removeEventListener('deviceorientation', handleOrientation, true);
    };
  }, [isMobile, gyroPermission]);

  // Text Scramble Utility
  const scrambleText = (element, finalText) => {
    const chars = '!<>-_\\/[]{}—=+*^?#________';
    let iteration = 0;
    const interval = setInterval(() => {
      element.textContent = finalText
        .split('')
        .map((char, index) => {
          if (index < iteration) {
            return finalText[index];
          }
          return chars[Math.floor(Math.random() * chars.length)];
        })
        .join('');

      if (iteration >= finalText.length) {
        clearInterval(interval);
      }

      iteration += 1 / 3;
    }, 30);

    return interval;
  };

  // Initialize smooth scroll with GSAP integration and animations
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);

      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = lenis.scroll || 0;
      const progress = Math.min((scrolled / scrollHeight) * 100, 100);

      if (scrollProgressBarRef.current) {
        scrollProgressBarRef.current.style.width = `${progress}%`;
      }
    });

    gsap.ticker.lagSmoothing(0);

    const timeoutId = setTimeout(() => {
      const ctx = gsap.context(() => {
        // Animated Logo entrance
        gsap.fromTo('.hero-logo-container',
          {
            opacity: 0,
            scale: 0.5,
            y: -50,
            rotateZ: -10
          },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            rotateZ: 0,
            duration: 1.8,
            ease: 'elastic.out(1, 0.5)',
            delay: 0.2
          }
        );

        // Hero animations
        gsap.fromTo('.hero-title span',
          {
            y: () => gsap.utils.random(-100, 100),
            x: () => gsap.utils.random(-50, 50),
            opacity: 0,
            rotateX: () => gsap.utils.random(-90, 90),
            rotateZ: () => gsap.utils.random(-20, 20),
            scale: 0.5
          },
          {
            y: 0,
            x: 0,
            opacity: 1,
            rotateX: 0,
            rotateZ: 0,
            scale: 1,
            duration: 1.5,
            stagger: {
              amount: 0.8,
              from: 'random'
            },
            ease: 'elastic.out(1, 0.5)'
          }
        );

        gsap.fromTo('.hero-subtitle',
          { x: -100, opacity: 0 },
          { x: 0, opacity: 1, duration: 1, delay: 0.5, ease: 'power3.out' }
        );

        // Image parallax
        if (imageRef.current) {
          ScrollTrigger.create({
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
            onUpdate: (self) => {
              gsap.to(imageRef.current, {
                y: self.progress * 100,
                ease: 'none',
                duration: 0
              });
            }
          });
        }

        // Stats counter animation
        gsap.utils.toArray('.stat-number').forEach((stat) => {
          const target = parseInt(stat.getAttribute('data-target'));
          ScrollTrigger.create({
            trigger: stat,
            start: 'top 80%',
            onEnter: () => {
              gsap.to(stat, {
                innerHTML: target,
                duration: 2.5,
                ease: 'power2.out',
                snap: { innerHTML: 1 },
                onUpdate: function() {
                  stat.innerHTML = Math.ceil(this.targets()[0].innerHTML);
                }
              });
            },
            once: true
          });
        });

        // Modules section heading
        if (modulesHeadingRef.current) {
          gsap.fromTo(modulesHeadingRef.current,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              scrollTrigger: {
                trigger: modulesHeadingRef.current,
                start: 'top 80%',
                end: 'top 20%',
                toggleActions: 'play none none none',
              }
            }
          );
        }

        // Module cards
        if (moduleCardsRef.current.length > 0) {
          gsap.fromTo(moduleCardsRef.current,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              stagger: 0.2,
              scrollTrigger: {
                trigger: moduleCardsRef.current[0],
                start: 'top 80%',
                end: 'top 20%',
                toggleActions: 'play none none none',
              }
            }
          );
        }

        // Video section heading
        if (videoHeadingRef.current) {
          gsap.fromTo(videoHeadingRef.current,
            { opacity: 0, scale: 0.9 },
            {
              opacity: 1,
              scale: 1,
              duration: 0.8,
              scrollTrigger: {
                trigger: videoHeadingRef.current,
                start: 'top 80%',
                end: 'top 20%',
                toggleActions: 'play none none none',
              }
            }
          );
        }

        // Video container
        if (videoContainerRef.current) {
          gsap.fromTo(videoContainerRef.current,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              scrollTrigger: {
                trigger: videoContainerRef.current,
                start: 'top 80%',
                end: 'top 20%',
                toggleActions: 'play none none none',
              }
            }
          );
        }

        // CTA section
        if (ctaSectionRef.current) {
          gsap.fromTo(ctaSectionRef.current,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              scrollTrigger: {
                trigger: ctaSectionRef.current,
                start: 'top 80%',
                end: 'top 20%',
                toggleActions: 'play none none none',
              }
            }
          );
        }
      });

      ScrollTrigger.refresh();
      setIsLoaded(true);
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      lenis.destroy();
    };
  }, []);

  // Enhanced Three.js background with MEDICAL BLUE particles
  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Create multiple geometric shapes with variety
    const shapes = [];
    const geometries = [
      new THREE.IcosahedronGeometry(1, 1),
      new THREE.OctahedronGeometry(1, 0),
      new THREE.TorusGeometry(0.8, 0.3, 16, 100),
      new THREE.TetrahedronGeometry(1, 0)
    ];

    // Medical blue colors
    const medicalColors = [0x0ea5e9, 0x38bdf8, 0x0284c7, 0x7dd3fc];

    // Create 15 geometric shapes
    for (let i = 0; i < 15; i++) {
      const geometry = geometries[i % geometries.length];
      const color = medicalColors[i % medicalColors.length];

      const material = new THREE.MeshPhongMaterial({
        color: color,
        wireframe: true,
        emissive: color,
        emissiveIntensity: 0.3,
        transparent: true,
        opacity: 0.6
      });

      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.x = (Math.random() - 0.5) * 20;
      mesh.position.y = (Math.random() - 0.5) * 20;
      mesh.position.z = (Math.random() - 0.5) * 20;
      mesh.rotation.x = Math.random() * Math.PI;
      mesh.rotation.y = Math.random() * Math.PI;

      scene.add(mesh);
      shapes.push({
        mesh,
        rotationSpeed: {
          x: 0.0005 + Math.random() * 0.001,
          y: 0.0005 + Math.random() * 0.001,
          z: 0.0005 + Math.random() * 0.001
        },
        originalPosition: mesh.position.clone(),
        pulseSpeed: 0.5 + Math.random() * 0.5,
        pulseOffset: Math.random() * Math.PI * 2
      });
    }

    // Create particle field - Medical Blue
    const particlesGeometry = new THREE.BufferGeometry();
    const particleCount = 500;
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 50;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      color: 0x0ea5e9,
      size: 0.05,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    // Enhanced lighting - Medical Blue
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x0ea5e9, 1.5);
    pointLight1.position.set(5, 5, 5);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x38bdf8, 1);
    pointLight2.position.set(-5, -5, 5);
    scene.add(pointLight2);

    camera.position.z = 10;

    // Mouse tracking for interactive effects
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (event) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    let animationFrameId;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth camera movement based on mouse
      targetX += (mouseX * 0.5 - targetX) * 0.02;
      targetY += (mouseY * 0.5 - targetY) * 0.02;
      camera.position.x = targetX;
      camera.position.y = targetY;

      // Animate shapes with individual characteristics
      shapes.forEach((shape, i) => {
        shape.mesh.rotation.x += shape.rotationSpeed.x;
        shape.mesh.rotation.y += shape.rotationSpeed.y;
        shape.mesh.rotation.z += shape.rotationSpeed.z;

        const pulseFactor = Math.sin(elapsedTime * shape.pulseSpeed + shape.pulseOffset) * 0.5 + 0.5;
        shape.mesh.material.emissiveIntensity = 0.2 + pulseFactor * 0.3;

        shape.mesh.position.y = shape.originalPosition.y + Math.sin(elapsedTime * 0.3 + i) * 0.5;
      });

      particles.rotation.y = elapsedTime * 0.05;
      particles.rotation.x = elapsedTime * 0.03;

      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);

      shapes.forEach(shape => {
        shape.mesh.geometry.dispose();
        shape.mesh.material.dispose();
      });
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  // Mouse tracking for parallax (Desktop only)
  useEffect(() => {
    if (isMobile) return;

    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isMobile]);

  // Floating Particle System - MEDICAL BLUE
  useEffect(() => {
    const canvas = particleCanvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.opacity = Math.random() * 0.5 + 0.3;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
      }

      draw() {
        ctx.fillStyle = `rgba(14, 165, 233, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const particleCount = 100;
    const particles = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    let animationId;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.strokeStyle = `rgba(14, 165, 233, ${0.2 * (1 - distance / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      animationId = requestAnimationFrame(animate);
    };
    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  // ESC key to close video modal
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && showVideoModal) {
        setShowVideoModal(false);
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [showVideoModal]);

  // Healthcare Program Modules - 4 Weeks
  const modules = [
    {
      title: "Pharmacy Fundamentals",
      icon: "💊",
      description: "Master the foundational knowledge of pharmacy operations. Learn pharmaceutical calculations, medication classifications, drug interactions, and the regulatory framework governing pharmacy practice.",
      topics: ["Pharmaceutical Calculations", "Drug Classifications", "Pharmacy Law & Ethics", "Medication Safety"],
      duration: "Week 1"
    },
    {
      title: "Pharmacy Operations",
      icon: "🏥",
      description: "Dive deep into day-to-day pharmacy operations. Master prescription processing, inventory management, insurance billing, and patient consultation techniques used in modern pharmacy settings.",
      topics: ["Prescription Processing", "Inventory Management", "Insurance & Billing", "Patient Communication"],
      duration: "Week 2"
    },
    {
      title: "EKG Technician Track",
      icon: "❤️",
      description: "Learn to perform and interpret electrocardiograms. Understand cardiac anatomy, rhythm recognition, lead placement, and emergency protocols essential for cardiovascular diagnostics.",
      topics: ["Cardiac Anatomy", "EKG Lead Placement", "Rhythm Interpretation", "Emergency Protocols"],
      duration: "Week 3"
    },
    {
      title: "Clinical Integration",
      icon: "🎓",
      description: "Combine your pharmacy and EKG skills in real-world clinical scenarios. Practice with VR simulations, prepare for certification exams, and build your professional portfolio.",
      topics: ["VR Clinical Simulations", "PTCB Exam Prep", "NHA EKG Certification", "Career Placement"],
      duration: "Week 4"
    }
  ];

  // Healthcare Certifications
  const certifications = [
    {
      name: "CPhT",
      fullName: "Certified Pharmacy Technician",
      org: "PTCB",
      description: "Industry-recognized pharmacy technician certification",
      badgeImage: "/images/healthcare/cert-pharm-tech-badge.webp",
      included: true,
      badgeText: "CERT INCLUDED",
      color: "from-medical-500 to-cyan-500",
      glowColor: "medical",
      features: [
        "PTCB nationally recognized credential",
        "Pharmacy law & regulations training",
        "Medication safety & calculations",
        "Career placement assistance"
      ],
      href: "https://www.ptcb.org/"
    },
    {
      name: "EKG Tech",
      fullName: "EKG Technician Certification",
      org: "NHA",
      description: "National certification for electrocardiogram technicians",
      badgeImage: "/images/healthcare/nha-image.jpg",
      included: true,
      badgeText: "PREP INCLUDED",
      color: "from-red-500 to-orange-500",
      glowColor: "red",
      features: [
        "NHA certified EKG technician prep",
        "Cardiac rhythm interpretation",
        "12-lead EKG placement & analysis",
        "Hands-on clinical training"
      ],
      href: "https://www.nhanow.com/"
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Sticky Navigation Header */}
      <NavigationHeader />

      {/* Loading Screen - MENTOR ALLIED */}
      {isLoading && (
        <div className="loading-screen">
          <div className="loading-content">
            <div className="loading-logo">
              <div className="relative w-32 h-32 sm:w-40 sm:h-40 mb-8 animate-pulse-slow">
                <Image
                  src="/images/healthcare/mentor-allied-logo.png"
                  alt="Mentor Allied Loading"
                  fill
                  className="object-contain drop-shadow-2xl"
                  style={{
                    filter: 'drop-shadow(0 0 40px rgba(14, 165, 233, 0.8))'
                  }}
                  priority
                />
                <div className="absolute inset-0 border-4 border-transparent border-t-medical-400 border-r-medical-500 rounded-full animate-spin-slow"></div>
              </div>
            </div>
            <div className="loading-text">
              <span className="loading-letter">M</span>
              <span className="loading-letter">e</span>
              <span className="loading-letter">n</span>
              <span className="loading-letter">t</span>
              <span className="loading-letter">o</span>
              <span className="loading-letter">r</span>
              <span className="loading-letter">&nbsp;</span>
              <span className="loading-letter">A</span>
              <span className="loading-letter">l</span>
              <span className="loading-letter">l</span>
              <span className="loading-letter">i</span>
              <span className="loading-letter">e</span>
              <span className="loading-letter">d</span>
            </div>
            <div className="loading-bar-container">
              <div
                className="loading-bar"
                style={{ width: `${loadProgress}%` }}
              ></div>
            </div>
            <div className="loading-percentage">{Math.floor(loadProgress)}%</div>
          </div>
        </div>
      )}

      {/* Scroll Progress Indicator - Medical Blue */}
      <div className="scroll-progress-container">
        <div
          ref={scrollProgressBarRef}
          className="scroll-progress-bar"
          style={{ width: `${scrollProgress}%` }}
        ></div>
      </div>

      {/* Gyroscope Permission Button (iOS Only) */}
      {showGyroButton && (
        <button
          onClick={handleGyroPermission}
          className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-[10001] px-8 py-4 bg-gradient-to-r from-medical-500 to-medical-600 rounded-full font-bold text-lg text-white shadow-2xl hover:scale-105 transition-all duration-300 animate-bounce"
          style={{
            boxShadow: '0 0 30px rgba(14, 165, 233, 0.6), 0 10px 40px rgba(0, 0, 0, 0.5)'
          }}
        >
          <span className="flex items-center gap-3">
            <span className="text-2xl">📱</span>
            <span>Enable Tilt Controls</span>
          </span>
        </button>
      )}

      {/* Floating Particles Canvas */}
      <canvas
        ref={particleCanvasRef}
        className="fixed inset-0 z-1 pointer-events-none"
        style={{ opacity: 0.6 }}
      />

      {/* Three.js Canvas Background */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 z-0 opacity-40"
        style={{ pointerEvents: 'none' }}
      />

      {/* Geometric Pattern Overlay - Medical Blue */}
      <div className="fixed inset-0 z-1 opacity-25 pointer-events-none">
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: `linear-gradient(45deg, transparent 24%, rgba(14, 165, 233, 0.08) 25%, rgba(14, 165, 233, 0.08) 26%, transparent 27%, transparent 74%, rgba(14, 165, 233, 0.08) 75%, rgba(14, 165, 233, 0.08) 76%, transparent 77%, transparent)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      {/* Hero Section - Split Screen */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center lg:justify-start pt-4 sm:pt-6" style={{ perspective: '1200px', pointerEvents: 'auto' }}>
        <div className="max-w-[1920px] w-full mx-auto flex items-center" style={{ pointerEvents: 'auto' }}>
          {/* Left Side - Content (40%) */}
          <div ref={textRef} className="relative z-20 w-full lg:w-2/5 px-8 lg:px-16 xl:px-24" style={{ pointerEvents: 'auto', transformStyle: 'preserve-3d' }}>
            {/* Glassmorphic Logo - MENTOR ALLIED */}
            <div className="hero-logo-container flex justify-center lg:justify-start mb-6" data-aos="fade-up" style={{ transform: 'translateZ(150px)', pointerEvents: 'none' }}>
              <GlassmorphicLogo
                logoPath="/images/healthcare/mentor-allied-logo.png"
                theme="medical"
              />
            </div>

            {/* Main Headline with Split Text */}
            <h1 className="hero-title text-6xl lg:text-8xl font-black leading-none mb-5">
              {['Launch', 'Your'].map((word, wordIndex) => (
                <span key={wordIndex} className="inline-block" style={{ whiteSpace: 'nowrap' }}>
                  {word.split('').map((char, charIndex) => (
                    <span key={charIndex} className="inline-block">
                      {char}
                    </span>
                  ))}
                  {wordIndex < 1 && '\u00A0'}
                </span>
              ))}
              <br />
              <span className="text-gradient-medical">
                {['Healthcare', 'Career'].map((word, wordIndex) => (
                  <span key={wordIndex} className="inline-block" style={{ whiteSpace: 'nowrap' }}>
                    {word.split('').map((char, charIndex) => (
                      <span key={charIndex} className="inline-block">
                        {char}
                      </span>
                    ))}
                    {wordIndex < 1 && '\u00A0'}
                  </span>
                ))}
              </span>
            </h1>

            {/* Subtitle */}
            <p className="hero-subtitle text-xl lg:text-2xl text-gray-400 font-light mb-6">
              From Beginner to <span className="text-medical-400 font-semibold">Certified Pharmacy & EKG Technician</span> in Just 4 Weeks
            </p>

            {/* Stats - Healthcare specific (matching /tech layout) */}
            <div className="grid grid-cols-3 gap-4 pt-4" style={{ transform: 'translateZ(80px)' }}>
              {/* Avg Salary */}
              <div className="text-center">
                <div className="text-3xl font-bold text-gradient-medical">
                  $<span className="stat-number" data-target="65">65</span>K
                </div>
                <div className="text-sm text-gray-300">Avg Salary</div>
              </div>
              {/* Top Earners */}
              <div className="text-center">
                <div className="text-3xl font-bold text-gradient-medical">
                  $<span className="stat-number" data-target="100">100</span>K
                </div>
                <div className="text-sm text-gray-300">Top Earners</div>
              </div>
              {/* Job Openings - Green Glow */}
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400 animate-pulse-glow-green">
                  <span className="inline-block w-2 h-2 bg-green-400 rounded-full mr-2 animate-ping"></span>
                  <span className="stat-number" data-target="53">53</span>K
                </div>
                <div className="text-sm text-green-300">Job Openings</div>
              </div>
            </div>
          </div>

          {/* Right Side - Hero Image (60%) */}
          <div className="hidden lg:block absolute right-0 top-0 w-3/5 h-full">
            <div ref={imageRef} className="relative w-full h-full">
              <div className="absolute inset-0" style={{
                clipPath: 'polygon(15% 0%, 100% 0%, 100% 100%, 0% 100%)'
              }}>
                <Image
                  src="/images/healthcare/hero-pharmacy.jpg"
                  alt="Healthcare Program Hero"
                  fill
                  className="object-cover object-center"
                  priority
                  onLoad={() => setIsLoaded(true)}
                />
                <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-black/50"></div>
              </div>
              <div className="absolute top-20 right-20 w-32 h-32 border-2 border-medical-500/30 rotate-45" />
              <div className="absolute bottom-20 right-40 w-24 h-24 border-2 border-medical-500/20 rotate-12" />
            </div>
          </div>
        </div>
      </section>

      {/* Healthcare Certifications Showcase */}
      <section id="certifications" className="relative z-10 py-32 px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl lg:text-7xl font-black mb-6">
              <span className="text-gradient-medical">Industry Certifications</span>
            </h2>
            <p className="text-xl text-gray-400">Earn nationally recognized credentials that employers demand</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {certifications.map((cert, index) => (
              <div key={index} className="relative group" style={{ perspective: '1000px' }}>
                {/* 3D Shadow Layer - appears on hover */}
                <div className={`absolute inset-0 -z-10 rounded-3xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500 transform translate-y-4 ${cert.glowColor === 'red' ? 'bg-gradient-to-br from-red-600 to-orange-600' : 'bg-gradient-to-br from-gray-700 to-gray-900'}`}></div>

                {/* Main Card */}
                <div className="relative h-full p-8 pt-12 rounded-3xl bg-gradient-to-br from-gray-800/30 to-gray-900/40 border border-gray-700/50 shadow-2xl overflow-visible backdrop-blur-lg transform transition-all duration-500 hover:-translate-y-2">
                  {/* Top Color Bar */}
                  <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${cert.color} rounded-t-3xl`}></div>

                  {/* Gradient Glow Overlay - appears on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${cert.color} opacity-0 group-hover:opacity-15 transition-opacity duration-500 rounded-3xl pointer-events-none`}></div>

                  {/* Included Badge - Fixed positioning */}
                  {cert.included && (
                    <div className="absolute top-4 right-4 z-20">
                      <div className="relative">
                        <div className="absolute inset-0 bg-green-500 rounded-full blur-md opacity-60 animate-pulse"></div>
                        <div className="relative flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full shadow-lg border border-green-400/30">
                          <svg className="w-4 h-4 text-white flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          <span className="text-xs font-bold text-white tracking-wide whitespace-nowrap">{cert.badgeText || 'INCLUDED'}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Card Content - Centered */}
                  <div className="relative z-10 flex flex-col items-center text-center pt-4 gap-4">
                    {/* Badge Image or Fallback Icon - Even Larger */}
                    <div className="w-56 h-56 mb-2 relative">
                      {cert.badgeImage ? (
                        <div className="w-full h-full rounded-2xl overflow-hidden bg-white p-5 shadow-xl group-hover:scale-110 transition-transform duration-500">
                          <Image
                            src={cert.badgeImage}
                            alt={`${cert.name} Certification Badge`}
                            fill
                            className="object-contain"
                          />
                        </div>
                      ) : (
                        <div className={`w-full h-full rounded-2xl bg-gradient-to-br ${cert.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-2xl`}>
                          <span className="text-5xl font-black text-white">{cert.name.charAt(0)}</span>
                        </div>
                      )}
                    </div>

                    <h3 className="text-2xl font-black text-white mb-1">{cert.name}</h3>
                    <p className={`font-semibold mb-1 ${cert.glowColor === 'red' ? 'text-orange-400' : 'text-medical-400'}`}>{cert.fullName}</p>

                    {/* Organization Badge */}
                    <div className={`px-4 py-1.5 rounded-full bg-gradient-to-r ${cert.glowColor === 'red' ? 'from-red-500/10 to-orange-500/10 border-red-500/30' : 'from-medical-500/10 to-cyan-500/10 border-medical-500/30'} border`}>
                      <span className={`text-sm font-bold ${cert.glowColor === 'red' ? 'text-orange-400' : 'text-medical-400'}`}>{cert.org}</span>
                    </div>

                    {/* Divider */}
                    <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent my-2"></div>

                    {/* Features List */}
                    <ul className="space-y-3 text-left w-full">
                      {cert.features && cert.features.map((feature, fIndex) => (
                        <li key={fIndex} className="flex items-start gap-3 text-sm text-gray-300">
                          <svg className={`w-5 h-5 flex-shrink-0 mt-0.5 ${cert.glowColor === 'red' ? 'text-orange-500' : 'text-green-500'}`} fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Hover CTA Button */}
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 pt-4 w-full">
                      <a
                        href={cert.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`block w-full px-6 py-3 rounded-xl bg-gradient-to-r ${cert.color} font-bold text-white text-center shadow-lg transition-all duration-300 hover:scale-105`}
                      >
                        Learn More
                      </a>
                    </div>

                    {/* Corner Accent */}
                    <div className={`absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl ${cert.color} opacity-20 rounded-tl-full pointer-events-none`}></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Course Modules Section */}
      <section id="modules" className="relative z-10 py-32 px-8 lg:px-16" style={{ perspective: '1000px' }}>
        <div className="max-w-7xl mx-auto" style={{ transformStyle: 'preserve-3d' }}>
          <div
            ref={modulesHeadingRef}
            className="text-center mb-20 gsap-hidden"
          >
            <h2
              className="text-5xl lg:text-7xl font-black mb-6 scramble-heading"
              data-text="Master Healthcare"
              onMouseEnter={(e) => {
                const span = e.currentTarget.querySelector('span');
                if (span) scrambleText(span, 'Master Healthcare');
              }}
            >
              <span className="text-gradient-medical">Master Healthcare</span>
            </h2>
            <p className="text-xl text-gray-400">Four intensive weeks to launch your healthcare career</p>
          </div>

          <div className="grid lg:grid-cols-2 xl:grid-cols-4 gap-8">
            {modules.map((module, index) => (
              <div
                key={index}
                ref={(el) => (moduleCardsRef.current[index] = el)}
                className="group relative gsap-hidden card-3d-container"
                style={{ perspective: '1000px' }}
                onMouseMove={(e) => {
                  if (!isMobile) {
                    const card = e.currentTarget;
                    const rect = card.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    const centerX = rect.width / 2;
                    const centerY = rect.height / 2;
                    const rotateX = (y - centerY) / 15;
                    const rotateY = (centerX - x) / 15;
                    const cardInner = card.querySelector('.card-3d-inner');
                    if (cardInner) {
                      cardInner.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
                    }
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isMobile) {
                    const cardInner = e.currentTarget.querySelector('.card-3d-inner');
                    if (cardInner) {
                      cardInner.style.transform = 'rotateX(0) rotateY(0) translateZ(0)';
                    }
                  }
                }}
              >
                <div className="card-3d-inner neumorphic-card p-8 rounded-3xl h-full flex flex-col" style={{ position: 'relative', overflow: 'hidden' }}>
                  <div className="text-6xl mb-6 text-center" style={{ position: 'relative', zIndex: 1 }}>{module.icon}</div>
                  <h3 className="text-2xl font-black mb-4 text-white text-center" style={{ position: 'relative', zIndex: 1 }}>
                    {module.title}
                  </h3>
                  <p className="text-gray-200 mb-6 text-sm text-center" style={{ position: 'relative', zIndex: 1 }}>
                    {module.description}
                  </p>
                  <div className="space-y-3 mb-auto" style={{ position: 'relative', zIndex: 1 }}>
                    {module.topics.map((topic, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-medical-500"></div>
                        <span className="text-gray-300 text-sm">{topic}</span>
                      </div>
                    ))}
                  </div>
                  <div className="pt-6 mt-6 border-t border-gray-800 text-center" style={{ position: 'relative', zIndex: 1 }}>
                    <span className="text-sm text-gray-300 font-medium">{module.duration}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="relative z-10 py-32 px-8 lg:px-16">
        <div className="max-w-6xl mx-auto">
          <div
            ref={videoHeadingRef}
            className="text-center mb-16 gsap-hidden"
          >
            <h2
              className="text-5xl lg:text-7xl font-black mb-6 scramble-heading"
              data-text="VR Training Experience"
              onMouseEnter={(e) => {
                const span = e.currentTarget.querySelector('span');
                if (span) scrambleText(span, 'VR Training Experience');
              }}
            >
              <span className="text-gradient-medical">VR Training Experience</span>
            </h2>
            <p className="text-xl text-gray-400">Immersive virtual reality simulations for hands-on learning</p>
          </div>

          <div
            ref={videoContainerRef}
            className="relative group gsap-hidden"
          >
            <div className="absolute -inset-4 bg-gradient-to-r from-medical-500/20 to-medical-600/20 rounded-3xl blur-xl opacity-50 group-hover:opacity-75 transition duration-1000"></div>
            <div className="relative glassmorphism rounded-3xl overflow-hidden aspect-video">
              <Image
                src="/images/healthcare/vr-training.jpg"
                alt="VR Healthcare Training"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <button
                  onClick={() => setShowVideoModal(true)}
                  className="w-20 h-20 rounded-full bg-medical-500/80 hover:bg-medical-500 transition-all duration-300 flex items-center justify-center hover:scale-110"
                >
                  <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <div id="contact">
        <NewsletterSignup />
      </div>

      {/* Final CTA */}
      <section className="relative z-10 py-32 px-8 lg:px-16">
        <div
          ref={ctaSectionRef}
          className="max-w-4xl mx-auto text-center gsap-hidden"
        >
          <div className="neumorphic-medical-card p-12 lg:p-16 rounded-3xl">
            <h2 className="text-5xl lg:text-6xl font-black mb-6">
              Ready to <span className="text-gradient-medical">Transform</span>?
            </h2>
            <p className="text-xl text-gray-300 mb-10">
              Start your healthcare career in just 4 weeks. <span className="text-medical-400 font-semibold">Limited seats available!</span>
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button
                onClick={() => router.push('/contact')}
                className="healthcare-3d-button relative min-h-[48px] px-6 py-4 sm:px-8 sm:py-5 md:px-10 md:py-6 bg-gradient-to-br from-medical-500 via-medical-600 to-medical-700 rounded-full font-black text-base sm:text-lg md:text-xl cursor-pointer select-none"
                style={{ touchAction: 'manipulation' }}
              >
                <span className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 text-white drop-shadow-lg">
                  <span className="text-2xl sm:text-3xl">🏥</span>
                  <span className="tracking-wide text-center sm:text-left">
                    <span className="block text-sm sm:text-base md:text-lg font-semibold uppercase tracking-wider">Apply Now</span>
                    <span className="block text-xs sm:text-sm font-black flex items-center justify-center sm:justify-start gap-2 mt-1">
                      <span className="relative flex h-2.5 w-2.5 sm:h-3 sm:w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 sm:h-3 sm:w-3 bg-gradient-to-r from-green-400 to-green-500"></span>
                      </span>
                      <span className="text-green-100">Enrollment Open</span>
                    </span>
                  </span>
                </span>
              </button>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 mt-12">
              <div className="flex flex-col items-center gap-3 group">
                <div className="certification-badge flex flex-col items-center gap-4 px-8 py-6 rounded-2xl hover:scale-105 transition-all duration-300">
                  <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-white p-2">
                    <Image
                      src="/images/healthcare/cert-pharm-tech-badge.webp"
                      alt="PTCB Certification Badge"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div className="text-center">
                    <div className="text-xs font-semibold text-medical-300 mb-1 tracking-wider uppercase">PTCB® Certified</div>
                    <div className="text-base font-black text-white mb-2">Pharmacy Technician</div>
                    <div className="flex items-center justify-center gap-1 text-xs text-green-400">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="font-semibold">Cert Included</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center gap-3 group">
                <div className="certification-badge flex flex-col items-center gap-4 px-8 py-6 rounded-2xl hover:scale-105 transition-all duration-300">
                  <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-white p-2">
                    <Image
                      src="/images/healthcare/nha-image.jpg"
                      alt="NHA Certification Badge"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div className="text-center">
                    <div className="text-xs font-semibold text-medical-300 mb-1 tracking-wider uppercase">NHA® Certified</div>
                    <div className="text-base font-black text-white mb-2">EKG Technician</div>
                    <div className="flex items-center justify-center gap-1 text-xs text-green-400">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="font-semibold">Prep Included</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .hero-logo-container {
          transform-style: preserve-3d;
          will-change: transform, opacity;
        }

        .text-gradient-medical {
          display: inline-block !important;
          background: linear-gradient(135deg, #0ea5e9 0%, #38bdf8 25%, #0ea5e9 50%, #38bdf8 75%, #0284c7 100%);
          background-size: 200% 200%;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: gradient-flow 8s ease infinite;
        }

        .text-gradient-medical span {
          background: linear-gradient(135deg, #0ea5e9 0%, #38bdf8 25%, #0ea5e9 50%, #38bdf8 75%, #0284c7 100%);
          background-size: 200% 200%;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: gradient-flow 8s ease infinite;
        }

        @keyframes gradient-flow {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        .neumorphic-card {
          background: linear-gradient(145deg, #0f0f0f, #1a1a1a);
          box-shadow: 20px 20px 60px #0a0a0a, -20px -20px 60px #1f1f1f, inset 1px 1px 2px rgba(14, 165, 233, 0.1);
        }

        .neumorphic-medical-card {
          background: linear-gradient(145deg, #0a1628, #0f1f3a);
          box-shadow: 20px 20px 60px #050c14, -20px -20px 60px #0f2a4a, inset 2px 2px 5px rgba(14, 165, 233, 0.2);
          border: 1px solid rgba(14, 165, 233, 0.1);
        }

        .glassmorphism {
          background: rgba(14, 22, 36, 0.7);
          backdrop-filter: blur(20px) saturate(180%);
          -webkit-backdrop-filter: blur(20px) saturate(180%);
          border: 1px solid rgba(14, 165, 233, 0.2);
        }

        .gsap-hidden { opacity: 0; }

        .card-3d-container { transform-style: preserve-3d; }

        .card-3d-inner {
          transform-style: preserve-3d;
          transition: transform 0.3s ease-out;
          will-change: transform;
        }

        .card-3d-inner > * { transform: translateZ(30px); }

        .scramble-heading {
          cursor: pointer;
          transition: transform 0.2s ease;
        }

        .scramble-heading:hover { transform: scale(1.02); }

        .scroll-progress-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 4px;
          background: rgba(0, 0, 0, 0.5);
          z-index: 10000;
        }

        .scroll-progress-bar {
          height: 100%;
          background: linear-gradient(90deg, #0ea5e9 0%, #38bdf8 50%, #0284c7 100%);
          box-shadow: 0 0 10px #0ea5e9, 0 0 20px #38bdf8;
        }

        .loading-screen {
          position: fixed;
          inset: 0;
          background: #000;
          z-index: 99999;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: fadeOut 0.5s ease 0s forwards;
        }

        .loading-content { text-align: center; }
        .loading-logo { margin-bottom: 2rem; }

        .loading-text {
          font-size: 1.5rem;
          font-weight: 600;
          margin-bottom: 2rem;
          letter-spacing: 0.3em;
        }

        .loading-letter {
          display: inline-block;
          animation: wave 1.5s ease-in-out infinite;
        }

        .loading-letter:nth-child(1) { animation-delay: 0s; }
        .loading-letter:nth-child(2) { animation-delay: 0.1s; }
        .loading-letter:nth-child(3) { animation-delay: 0.2s; }
        .loading-letter:nth-child(4) { animation-delay: 0.3s; }
        .loading-letter:nth-child(5) { animation-delay: 0.4s; }
        .loading-letter:nth-child(6) { animation-delay: 0.5s; }
        .loading-letter:nth-child(7) { animation-delay: 0.6s; }
        .loading-letter:nth-child(8) { animation-delay: 0.7s; }
        .loading-letter:nth-child(9) { animation-delay: 0.8s; }
        .loading-letter:nth-child(10) { animation-delay: 0.9s; }
        .loading-letter:nth-child(11) { animation-delay: 1.0s; }
        .loading-letter:nth-child(12) { animation-delay: 1.1s; }
        .loading-letter:nth-child(13) { animation-delay: 1.2s; }

        @keyframes wave {
          0%, 100% { transform: translateY(0); color: #0ea5e9; }
          50% { transform: translateY(-10px); color: #38bdf8; }
        }

        .loading-bar-container {
          width: 300px;
          height: 4px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 2px;
          overflow: hidden;
          margin: 0 auto 1rem;
        }

        .loading-bar {
          height: 100%;
          background: linear-gradient(90deg, #0ea5e9 0%, #38bdf8 50%, #0284c7 100%);
          transition: width 0.3s ease;
          box-shadow: 0 0 10px #0ea5e9;
        }

        .loading-percentage {
          font-size: 0.875rem;
          color: #0ea5e9;
          font-weight: 600;
        }

        @keyframes fadeOut {
          to { opacity: 0; pointer-events: none; }
        }

        .animate-pulse-slow {
          animation: pulse-slow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        @keyframes pulse-slow {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.05); }
        }

        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }

        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .border-t-medical-400 { border-top-color: #38bdf8; }
        .border-r-medical-500 { border-right-color: #0ea5e9; }

        .healthcare-3d-button {
          box-shadow: 0 1px 0 0 rgba(56, 189, 248, 0.8), 0 2px 0 0 rgba(14, 165, 233, 0.9), 0 4px 0 0 rgba(2, 132, 199, 0.8), 0 6px 0 0 rgba(3, 105, 161, 0.7), 0 8px 15px rgba(0, 0, 0, 0.3), 0 0 25px rgba(14, 165, 233, 0.35);
          transform: translateY(0px);
          transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
          will-change: transform, box-shadow;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
        }

        .healthcare-3d-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 1px 0 0 rgba(56, 189, 248, 0.9), 0 3px 0 0 rgba(14, 165, 233, 1), 0 5px 0 0 rgba(2, 132, 199, 0.9), 0 7px 0 0 rgba(3, 105, 161, 0.8), 0 10px 20px rgba(0, 0, 0, 0.4), 0 0 35px rgba(14, 165, 233, 0.5), 0 0 60px rgba(56, 189, 248, 0.3);
        }

        .healthcare-3d-button:active {
          transform: translateY(4px);
          box-shadow: 0 0px 0 0 rgba(56, 189, 248, 0.6), 0 1px 0 0 rgba(14, 165, 233, 0.7), 0 2px 0 0 rgba(2, 132, 199, 0.6), 0 3px 5px rgba(0, 0, 0, 0.2), 0 0 15px rgba(14, 165, 233, 0.4);
          transition: all 0.1s cubic-bezier(0.4, 0, 0.6, 1);
        }

        @keyframes medical-pulse {
          0%, 100% { filter: brightness(1); }
          50% { filter: brightness(1.1); }
        }

        .healthcare-3d-button {
          animation: medical-pulse 2.5s ease-in-out infinite;
        }

        .healthcare-3d-button:focus-visible {
          outline: 3px solid rgba(14, 165, 233, 0.6);
          outline-offset: 2px;
        }

        .hero-course-overview-btn {
          box-shadow: 0 1px 0 0 rgba(255, 255, 255, 0.9), 0 2px 0 0 rgba(240, 240, 240, 1), 0 3px 0 0 rgba(230, 230, 230, 0.95), 0 4px 0 0 rgba(200, 200, 200, 0.9), 0 6px 0 0 rgba(180, 180, 180, 0.85), 0 8px 0 0 rgba(150, 150, 150, 0.8), 0 10px 0 0 rgba(120, 120, 120, 0.7), 0 12px 20px rgba(0, 0, 0, 0.4), 0 0 30px rgba(255, 255, 255, 0.6);
          transform: translateY(0px);
          transition: all 0.12s cubic-bezier(0.4, 0, 0.2, 1);
          will-change: transform, box-shadow;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        }

        .hero-course-overview-btn:hover {
          transform: translateY(-4px);
          box-shadow: 0 1px 0 0 rgba(255, 255, 255, 1), 0 3px 0 0 rgba(240, 240, 240, 1), 0 5px 0 0 rgba(230, 230, 230, 0.95), 0 7px 0 0 rgba(200, 200, 200, 0.95), 0 10px 0 0 rgba(180, 180, 180, 0.9), 0 13px 0 0 rgba(150, 150, 150, 0.85), 0 16px 0 0 rgba(120, 120, 120, 0.75), 0 18px 30px rgba(0, 0, 0, 0.5), 0 0 40px rgba(255, 255, 255, 0.8), 0 0 60px rgba(255, 255, 255, 0.5);
        }

        .hero-course-overview-btn:active {
          transform: translateY(8px);
          box-shadow: inset 0 3px 6px rgba(0, 0, 0, 0.4), inset 0 2px 4px rgba(0, 0, 0, 0.5), 0 1px 2px rgba(0, 0, 0, 0.2), 0 0 15px rgba(255, 255, 255, 0.5);
          transition: all 0.08s cubic-bezier(0.4, 0, 0.6, 1);
        }

        .hero-course-overview-btn {
          animation: subtle-glow-pulse 3s ease-in-out infinite;
        }

        .hero-course-overview-btn:focus-visible {
          outline: 3px solid rgba(255, 255, 255, 0.6);
          outline-offset: 2px;
        }

        .hero-reserve-seat-btn {
          box-shadow: 0 1px 0 0 rgba(56, 189, 248, 0.9), 0 2px 0 0 rgba(14, 165, 233, 1), 0 3px 0 0 rgba(14, 165, 233, 0.95), 0 4px 0 0 rgba(2, 132, 199, 0.9), 0 6px 0 0 rgba(2, 132, 199, 0.85), 0 8px 0 0 rgba(3, 105, 161, 0.8), 0 10px 0 0 rgba(7, 89, 133, 0.7), 0 12px 20px rgba(0, 0, 0, 0.4), 0 0 30px rgba(14, 165, 233, 0.35);
          transform: translateY(0px);
          transition: all 0.12s cubic-bezier(0.4, 0, 0.2, 1);
          will-change: transform, box-shadow;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        }

        .hero-reserve-seat-btn:hover {
          transform: translateY(-4px);
          box-shadow: 0 1px 0 0 rgba(56, 189, 248, 1), 0 3px 0 0 rgba(14, 165, 233, 1), 0 5px 0 0 rgba(14, 165, 233, 0.95), 0 7px 0 0 rgba(2, 132, 199, 0.95), 0 10px 0 0 rgba(2, 132, 199, 0.9), 0 13px 0 0 rgba(3, 105, 161, 0.85), 0 16px 0 0 rgba(7, 89, 133, 0.75), 0 18px 30px rgba(0, 0, 0, 0.5), 0 0 40px rgba(14, 165, 233, 1), 0 0 60px rgba(56, 189, 248, 0.8);
        }

        .hero-reserve-seat-btn:active {
          transform: translateY(8px);
          box-shadow: inset 0 3px 6px rgba(0, 0, 0, 0.4), inset 0 2px 4px rgba(0, 0, 0, 0.5), 0 1px 2px rgba(0, 0, 0, 0.2), 0 0 15px rgba(14, 165, 233, 0.4);
          transition: all 0.08s cubic-bezier(0.4, 0, 0.6, 1);
        }

        .hero-reserve-seat-btn {
          animation: reserve-glow-pulse 2s ease-in-out infinite;
        }

        .hero-reserve-seat-btn:focus-visible {
          outline: 3px solid rgba(14, 165, 233, 0.6);
          outline-offset: 2px;
        }

        @keyframes reserve-glow-pulse {
          0%, 100% { filter: brightness(1); }
          50% { filter: brightness(1.08); }
        }

        @keyframes subtle-glow-pulse {
          0%, 100% { filter: brightness(1); }
          50% { filter: brightness(1.08); }
        }

        .certification-badge {
          background: linear-gradient(145deg, #1a1a1a, #0f0f0f);
          border: 2px solid rgba(14, 165, 233, 0.3);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5), 0 4px 16px rgba(14, 165, 233, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.05);
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .certification-badge::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle, rgba(14, 165, 233, 0.05) 0%, transparent 70%);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .certification-badge:hover {
          transform: translateY(-8px) scale(1.02);
          border-color: rgba(14, 165, 233, 0.6);
          box-shadow: 0 16px 48px rgba(0, 0, 0, 0.6), 0 8px 24px rgba(14, 165, 233, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1);
        }

        .certification-badge:hover::before {
          opacity: 1;
        }
      `}</style>

      {/* Video Modal */}
      {showVideoModal && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/95 backdrop-blur-sm animate-fade-in"
          onClick={() => setShowVideoModal(false)}
        >
          <div
            className="relative w-full max-w-4xl animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowVideoModal(false)}
              className="absolute -top-12 right-0 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center transition-all duration-300 hover:scale-110"
              aria-label="Close video"
            >
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl border border-medical-500/30 bg-gradient-to-br from-gray-900 to-black" style={{ aspectRatio: '16/9' }}>
              <Image
                src="/images/healthcare/vr-training.jpg"
                alt="VR Healthcare Training Preview"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center flex-col gap-4">
                <div className="text-6xl">🎓</div>
                <p className="text-xl text-white font-semibold">Program Video Coming Soon</p>
                <p className="text-gray-300">Experience our immersive VR healthcare training</p>
              </div>
            </div>

            <div className="mt-4 text-center">
              <h3 className="text-xl font-bold text-white">Healthcare Training Program</h3>
              <p className="text-gray-300 mt-1">Become a certified Pharmacy & EKG Technician in just 4 weeks</p>
            </div>
          </div>
        </div>
      )}

      {/* Social Media Footer */}
      <SocialFooter />
    </div>
  );
}

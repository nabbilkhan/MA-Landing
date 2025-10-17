'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as THREE from 'three';
import Lenis from 'lenis';
import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function BlackFridayOfferPage() {
  const canvasRef = useRef(null);
  const cursorRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const [orientation, setOrientation] = useState({ beta: 0, gamma: 0 });
  const [gyroPermission, setGyroPermission] = useState('pending');
  const [showGyroButton, setShowGyroButton] = useState(false);
  const [selectedTier, setSelectedTier] = useState('vip'); // 'vip' or 'on-demand'
  const mousePositionRef = useRef({ x: 0, y: 0 });
  const scrollProgressBarRef = useRef(null);
  const particleCanvasRef = useRef(null);

  // Environment variables for booking URLs
  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_VIP_URL || 'https://calendly.com/your-account/vip-consultation';
  const stripeUrl = process.env.NEXT_PUBLIC_STRIPE_ONDEMAND_URL || 'https://buy.stripe.com/test';

  // Helper function to open Calendly popup
  const openCalendly = () => {
    // Check if Calendly widget is loaded
    if (typeof window !== 'undefined' && window.Calendly) {
      window.Calendly.initPopupWidget({ url: calendlyUrl });
    } else {
      // Fallback: open in new tab
      window.open(calendlyUrl, '_blank');
    }
  };

  // Helper function to open Stripe checkout
  const openStripeCheckout = () => {
    window.open(stripeUrl, '_blank');
  };

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

  // Load Calendly widget script
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Check if script already loaded
    if (document.querySelector('script[src*="calendly"]')) return;

    // Load Calendly CSS
    const link = document.createElement('link');
    link.href = 'https://assets.calendly.com/assets/external/widget.css';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    // Load Calendly JS
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup on unmount
      if (link.parentNode) link.parentNode.removeChild(link);
      if (script.parentNode) script.parentNode.removeChild(script);
    };
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
          alert('Gyroscope permission was denied. You can enable it in your browser settings.');
        }
      }
    } catch (error) {
      console.error('Error requesting permission:', error);
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

  // Initialize smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);

      // Update scroll progress bar
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = lenis.scroll || 0;
      const progress = Math.min((scrolled / scrollHeight) * 100, 100);

      if (scrollProgressBarRef.current) {
        scrollProgressBarRef.current.style.width = `${progress}%`;
      }
    });

    gsap.ticker.lagSmoothing(0);

    // GSAP animations
    const timeoutId = setTimeout(() => {
      const ctx = gsap.context(() => {
        gsap.fromTo('.hero-title span',
          {
            y: () => gsap.utils.random(-100, 100),
            x: () => gsap.utils.random(-50, 50),
            opacity: 0,
            rotateX: () => gsap.utils.random(-90, 90),
            scale: 0.5
          },
          {
            y: 0,
            x: 0,
            opacity: 1,
            rotateX: 0,
            scale: 1,
            duration: 1.5,
            stagger: {
              amount: 0.8,
              from: 'random'
            },
            ease: 'elastic.out(1, 0.5)'
          }
        );

        gsap.fromTo('.fade-in-up',
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.2,
            scrollTrigger: {
              trigger: '.fade-in-up',
              start: 'top 80%',
              toggleActions: 'play none none none',
            }
          }
        );
      });

      ScrollTrigger.refresh();
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      lenis.destroy();
    };
  }, []);

  // Three.js background
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

    const shapes = [];
    const geometries = [
      new THREE.IcosahedronGeometry(1, 1),
      new THREE.OctahedronGeometry(1, 0),
      new THREE.TorusGeometry(0.8, 0.3, 16, 100),
    ];

    const goldColors = [0xD4AF37, 0xFFD700, 0xB8860B];

    for (let i = 0; i < 10; i++) {
      const geometry = geometries[i % geometries.length];
      const color = goldColors[i % goldColors.length];

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

      scene.add(mesh);
      shapes.push({
        mesh,
        rotationSpeed: {
          x: 0.0005 + Math.random() * 0.001,
          y: 0.0005 + Math.random() * 0.001,
        },
        originalPosition: mesh.position.clone(),
      });
    }

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0xD4AF37, 1.5);
    pointLight1.position.set(5, 5, 5);
    scene.add(pointLight1);

    camera.position.z = 10;

    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (event) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);

    let animationFrameId;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      targetX += (mouseX * 0.5 - targetX) * 0.02;
      targetY += (mouseY * 0.5 - targetY) * 0.02;
      camera.position.x = targetX;
      camera.position.y = targetY;

      shapes.forEach((shape, i) => {
        shape.mesh.rotation.x += shape.rotationSpeed.x;
        shape.mesh.rotation.y += shape.rotationSpeed.y;
        shape.mesh.position.y = shape.originalPosition.y + Math.sin(elapsedTime * 0.3 + i) * 0.5;
      });

      renderer.render(scene, camera);
    };
    animate();

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

  // Floating Particle System
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

        // Wrap around edges
        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
      }

      draw() {
        ctx.fillStyle = `rgba(212, 175, 55, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Create particles
    const particleCount = 100;
    const particles = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    // Animation loop
    let animationId;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      // Draw connections between nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.strokeStyle = `rgba(212, 175, 55, ${0.2 * (1 - distance / 100)})`;
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

    // Handle resize
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

  // Liquid Cursor with Particle Trail
  useEffect(() => {
    const canvas = cursorRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;
    let prevX = 0;
    let prevY = 0;
    let velocityX = 0;
    let velocityY = 0;
    let isHovering = false;
    let targetRadius = 12;
    let currentRadius = 12;

    // Particle trail system
    const particles = [];
    class Particle {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 3 + 2;
        this.life = 1;
        this.decay = 0.02 + Math.random() * 0.02;
        this.velocityX = (Math.random() - 0.5) * 0.5;
        this.velocityY = (Math.random() - 0.5) * 0.5;
      }

      update() {
        this.life -= this.decay;
        this.x += this.velocityX;
        this.y += this.velocityY;
      }

      draw() {
        if (this.life <= 0) return;

        ctx.save();
        ctx.globalAlpha = this.life * 0.6;
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size);
        gradient.addColorStop(0, '#D4AF37');
        gradient.addColorStop(0.5, '#FFD700');
        gradient.addColorStop(1, 'rgba(212, 175, 55, 0)');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    // Detect interactive elements
    const updateHoverState = () => {
      const buttons = document.querySelectorAll('button, a');
      let hovering = false;

      buttons.forEach((button) => {
        const rect = button.getBoundingClientRect();
        const distance = Math.sqrt(
          Math.pow(mouseX - (rect.left + rect.width / 2), 2) +
          Math.pow(mouseY - (rect.top + rect.height / 2), 2)
        );

        if (distance < Math.max(rect.width, rect.height) * 0.8) {
          hovering = true;
        }
      });

      isHovering = hovering;
      targetRadius = isHovering ? 24 : 12;
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Spring physics for smooth movement
      const springStrength = 0.15;
      const damping = 0.7;

      const dx = mouseX - currentX;
      const dy = mouseY - currentY;

      velocityX += dx * springStrength;
      velocityY += dy * springStrength;

      velocityX *= damping;
      velocityY *= damping;

      currentX += velocityX;
      currentY += velocityY;

      // Smooth radius transition
      currentRadius += (targetRadius - currentRadius) * 0.15;

      // Calculate velocity for morphing
      const speed = Math.sqrt(
        Math.pow(currentX - prevX, 2) + Math.pow(currentY - prevY, 2)
      );

      // Spawn particles based on movement
      if (speed > 0.5 && particles.length < 15) {
        particles.push(new Particle(currentX, currentY));
      }

      // Update and draw particles
      for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].update();
        particles[i].draw();
        if (particles[i].life <= 0) {
          particles.splice(i, 1);
        }
      }

      // Velocity-based morphing
      const stretch = Math.min(speed * 0.3, 8);
      const angle = Math.atan2(velocityY, velocityX);

      // Draw main cursor with morph effect
      ctx.save();
      ctx.translate(currentX, currentY);
      ctx.rotate(angle);

      // Glow effect
      const glowGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, currentRadius * 3);
      glowGradient.addColorStop(0, 'rgba(212, 175, 55, 0.3)');
      glowGradient.addColorStop(0.5, 'rgba(255, 215, 0, 0.15)');
      glowGradient.addColorStop(1, 'rgba(212, 175, 55, 0)');
      ctx.fillStyle = glowGradient;
      ctx.beginPath();
      ctx.ellipse(0, 0, (currentRadius + stretch) * 3, currentRadius * 2.5, 0, 0, Math.PI * 2);
      ctx.fill();

      // Main cursor blob with velocity stretch
      const mainGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, currentRadius + stretch);
      mainGradient.addColorStop(0, '#FFD700');
      mainGradient.addColorStop(0.4, '#D4AF37');
      mainGradient.addColorStop(1, 'rgba(212, 175, 55, 0.4)');
      ctx.fillStyle = mainGradient;
      ctx.beginPath();
      ctx.ellipse(0, 0, currentRadius + stretch, currentRadius - stretch * 0.3, 0, 0, Math.PI * 2);
      ctx.fill();

      // Inner glow
      ctx.globalAlpha = 0.8;
      const innerGlow = ctx.createRadialGradient(0, 0, 0, 0, 0, currentRadius * 0.6);
      innerGlow.addColorStop(0, '#FFD700');
      innerGlow.addColorStop(1, 'rgba(255, 215, 0, 0)');
      ctx.fillStyle = innerGlow;
      ctx.beginPath();
      ctx.arc(0, 0, currentRadius * 0.6, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();

      prevX = currentX;
      prevY = currentY;

      updateHoverState();
      requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    const animationId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  // Program comparison data
  const features = [
    { name: 'Live Cohort Sessions', vip: true, onDemand: false },
    { name: 'Complete On-Demand Library', vip: true, onDemand: true },
    { name: 'CSPO Certification (Included)', vip: true, onDemand: false },
    { name: '2 AI Certifications (Included)', vip: true, onDemand: false },
    { name: 'Certification Roadmap Guidance', vip: true, onDemand: true },
    { name: 'Career Assets & Portfolio Built With You', vip: true, onDemand: false },
    { name: 'Custom Resume Service', vip: true, onDemand: false },
    { name: 'Interview Prep & Mock Interviews', vip: true, onDemand: false },
    { name: 'Virtual Office Hours', vip: true, onDemand: false },
    { name: 'Private Community Access', vip: true, onDemand: true },
    { name: 'Self-Paced Flexibility', vip: false, onDemand: true },
    { name: 'Payment Options Available', vip: true, onDemand: true },
  ];

  const whatYouBuild = [
    { icon: '📋', title: 'Product Backlog', description: 'Prioritized list of features and user stories' },
    { icon: '👥', title: 'User Stories', description: 'Well-crafted stories following best practices' },
    { icon: '🗺️', title: 'Product Roadmap', description: 'Strategic timeline of product evolution' },
    { icon: '🔍', title: 'Discovery Notes', description: 'Research findings and user insights' },
    { icon: '📊', title: 'KPI Dashboard', description: 'Metrics that matter for product success' },
    { icon: '🎯', title: 'Demo Deck', description: 'Professional presentation of your work' },
    { icon: '💼', title: 'Portfolio Case Study', description: 'Complete showcase for job interviews' },
    { icon: '📄', title: 'Resume & LinkedIn', description: 'Optimized for product management roles' },
  ];

  const weeklyBreakdown = [
    {
      weeks: 'Weeks 1-2',
      title: 'Agile Foundations',
      topics: ['Scrum ceremonies', 'User stories & acceptance criteria', 'Sprint planning', 'Retrospectives']
    },
    {
      weeks: 'Weeks 3-5',
      title: 'Product Discovery',
      topics: ['User research & interviews', 'MVP definition', 'A/B testing strategies', 'Market validation']
    },
    {
      weeks: 'Weeks 6-8',
      title: 'Backlog Mastery',
      topics: ['Prioritization frameworks', 'Roadmap creation', 'Stakeholder communication', 'Metrics & KPIs']
    },
    {
      weeks: 'Weeks 9-12',
      title: 'Career Launchpad',
      topics: ['Resume optimization', 'Interview prep', 'Portfolio building', 'Job search strategy']
    },
  ];

  const faqs = [
    {
      question: 'Do I need any prior technical experience?',
      answer: 'No! This program is designed for career-changers. You only need basic computer literacy and English proficiency. No coding required.'
    },
    {
      question: 'What is the time commitment?',
      answer: 'VIP program: 10-15 hours per week including live sessions. On-Demand: Flexible, go at your own pace (recommended 5-10 hours/week).'
    },
    {
      question: 'What certifications are included?',
      answer: 'VIP includes 3 certifications: CSPO (Scrum Alliance), AI for Product Owners, and AI Prompting Essentials. We prepare you and cover exam costs. On-Demand includes certification guidance only.'
    },
    {
      question: 'What is your refund policy?',
      answer: 'Full refund if you cancel before the first live session. 75% refund within week 1; 50% within week 2; no refunds after week 2. See full policy for details.'
    },
    {
      question: 'Can I get funding support?',
      answer: 'If you\'re eligible, American Job Centers (WIOA) can help cover tuition in IL and nearby areas. We work with 10+ centers. Contact us to learn more.'
    },
  ];

  return (
    <div className={`min-h-screen bg-black text-white overflow-x-hidden ${!isMobile ? 'cursor-none' : ''}`}>
      {/* Loading Screen */}
      {isLoading && (
        <div className="loading-screen">
          <div className="loading-content">
            <div className="loading-logo">
              <div className="loading-shape"></div>
            </div>
            <div className="loading-text">
              <span className="loading-letter">L</span>
              <span className="loading-letter">o</span>
              <span className="loading-letter">a</span>
              <span className="loading-letter">d</span>
              <span className="loading-letter">i</span>
              <span className="loading-letter">n</span>
              <span className="loading-letter">g</span>
            </div>
            <div className="loading-bar-container">
              <div className="loading-bar" style={{ width: `${loadProgress}%` }}></div>
            </div>
            <div className="loading-percentage">{Math.floor(loadProgress)}%</div>
          </div>
        </div>
      )}

      {/* Liquid Cursor Canvas (Desktop Only) */}
      {!isMobile && (
        <canvas
          ref={cursorRef}
          className="fixed inset-0 pointer-events-none z-[9999]"
          style={{ width: '100%', height: '100%' }}
        />
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

      {/* Geometric Pattern Overlay */}
      <div className="fixed inset-0 z-1 opacity-20 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(45deg, transparent 24%, rgba(212, 175, 55, 0.08) 25%, rgba(212, 175, 55, 0.08) 26%, transparent 27%, transparent 74%, rgba(212, 175, 55, 0.08) 75%, rgba(212, 175, 55, 0.08) 76%, transparent 77%, transparent)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      {/* Scroll Progress Indicator */}
      <div className="scroll-progress-container">
        <div ref={scrollProgressBarRef} className="scroll-progress-bar"></div>
      </div>

      {/* Gyroscope Permission Button (iOS Only) */}
      {showGyroButton && (
        <button
          onClick={handleGyroPermission}
          className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-[10001] px-8 py-4 bg-gradient-to-r from-gold-500 to-gold-600 neumorphic-gold rounded-full font-bold text-lg text-white shadow-2xl hover:scale-105 transition-all duration-300 animate-bounce"
        >
          <span className="flex items-center gap-3">
            <span className="text-2xl">📱</span>
            <span>Enable Tilt Controls</span>
          </span>
        </button>
      )}

      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center px-8 lg:px-16 py-24">
        <div className="max-w-6xl mx-auto text-center relative z-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-3 px-6 py-3 neumorphic-gold rounded-full mb-8">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-gradient-to-r from-red-400 to-red-500"></span>
            </span>
            <span className="text-sm font-medium text-red-100">🔥 Black Friday Special — Limited Time Only</span>
          </div>

          {/* Headline */}
          <h1 className="hero-title text-5xl lg:text-7xl font-black leading-none mb-6">
            {['Launch', 'Your', 'Product', 'Career'].map((word, wordIndex) => (
              <span key={wordIndex} className="inline-block" style={{ whiteSpace: 'nowrap' }}>
                {word.split('').map((char, charIndex) => (
                  <span key={charIndex} className="inline-block">
                    {char}
                  </span>
                ))}
                {wordIndex < 3 && '\u00A0'}
              </span>
            ))}
            <br />
            <span className="text-gradient-gold">in 8–12 Weeks</span>
          </h1>

          {/* Subhead */}
          <p className="text-xl lg:text-2xl text-gray-improved font-light mb-4">
            Hands-on training, real artifacts, and certification prep—built for career-changers.
          </p>
          <p className="text-lg text-gray-improved mb-12">
            No coding required • Live cohort • Career assets • 3 certifications* • Office hours • Community
          </p>

          {/* Hero CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 lg:gap-6 justify-center items-center mb-8">
            {/* VIP Button - Primary */}
            <button
              onClick={openCalendly}
              className="group relative min-w-[280px] sm:min-w-[320px] px-8 py-6 bg-gradient-to-r from-gold-500 to-gold-600 neumorphic-gold rounded-2xl font-black text-white hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer shadow-2xl"
              style={{
                boxShadow: '0 0 40px rgba(212, 175, 55, 0.7), 0 12px 48px rgba(0, 0, 0, 0.6)'
              }}
            >
              <div className="flex flex-col items-center gap-2">
                <span className="text-2xl">💎</span>
                <span className="text-xl lg:text-2xl tracking-wide">Get FREE Career Guidance</span>
                <span className="text-sm lg:text-base font-semibold text-gold-100 opacity-90">
                  VIP Program: $6,000 <span className="line-through opacity-60">$8,999</span>
                </span>
              </div>
            </button>

            {/* On-Demand Button - Secondary */}
            <button
              onClick={openStripeCheckout}
              className="group relative min-w-[280px] sm:min-w-[320px] px-8 py-6 border-2 border-white/30 neumorphic-dark rounded-2xl font-black text-white hover:bg-white/10 hover:border-white/50 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer shadow-2xl"
              style={{
                boxShadow: '0 0 30px rgba(255, 255, 255, 0.4), 0 12px 48px rgba(0, 0, 0, 0.6)'
              }}
            >
              <div className="flex flex-col items-center gap-2">
                <span className="text-2xl">⚡</span>
                <span className="text-xl lg:text-2xl tracking-wide">Start On-Demand</span>
                <span className="text-sm lg:text-base font-semibold text-gray-improved opacity-90">
                  Self-paced • $800 <span className="line-through opacity-60">$1,299</span>
                </span>
              </div>
            </button>
          </div>

          {/* Scroll Indicator */}
          <div className="flex flex-col items-center gap-2 opacity-70 hover:opacity-100 transition-opacity">
            <p className="text-sm text-gray-improved font-medium">
              ⬇️ Scroll down to compare features & see full details
            </p>
          </div>
        </div>
      </section>

      {/* Pick Your Path - Comparison Cards */}
      <section className="relative z-10 py-20 px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl lg:text-6xl font-black text-center mb-16">
            <span className="text-gradient-gold">Pick Your Path</span>
          </h2>

          <div className="grid lg:grid-cols-2 gap-8 mb-16">
            {/* VIP Card */}
            <motion.div
              className="relative group fade-in-up"
              style={{
                transform: `
                  perspective(1000px)
                  rotateY(${mousePosition.x / 8}deg)
                  rotateX(${-mousePosition.y / 8}deg)
                `,
                transformStyle: 'preserve-3d',
              }}
              transition={{ type: 'spring', stiffness: 150, damping: 20 }}
            >
              {/* Best Outcomes Badge */}
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20 px-6 py-3 bg-gradient-to-r from-gold-500 to-gold-600 rounded-full font-black text-base lg:text-lg text-white shadow-2xl">
                <span className="drop-shadow-lg">⭐ Best Outcomes</span>
              </div>

              <div className="glassmorphism-gold glass-shimmer glass-glow p-10 lg:p-12 rounded-3xl h-full border-2 border-gold-500/40 relative overflow-hidden">
                {/* Glare effect */}
                <motion.div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: `radial-gradient(circle at ${50 + mousePosition.x / 3}% ${50 - mousePosition.y / 3}%, rgba(255, 255, 255, 0.2) 0%, transparent 50%)`,
                    opacity: Math.min(Math.abs(mousePosition.x + mousePosition.y) / 300, 0.3),
                    pointerEvents: 'none',
                    mixBlendMode: 'overlay',
                  }}
                  transition={{ type: 'spring', stiffness: 200, damping: 25 }}
                />

                <div className="relative z-10 flex flex-col h-full">
                  <h3 className="text-3xl lg:text-5xl font-black mb-2 text-white">
                    VIP Program
                  </h3>
                  <p className="text-gold-200 font-semibold mb-8 text-lg">Live + On-Demand (12 weeks)</p>

                  <div className="mb-10">
                    <div className="flex items-baseline gap-3 mb-2">
                      <span className="text-6xl lg:text-7xl font-black text-gradient-gold">$6,000</span>
                      <span className="text-gray-improved line-through text-2xl">$8,999</span>
                    </div>
                    <p className="text-base text-gray-improved">Payment plans available</p>
                  </div>

                  <div className="space-y-5 mb-10">
                    <div className="flex items-start gap-3">
                      <Check className="w-6 h-6 text-gold-300 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-bold text-white text-base">Weekly live cohort sessions</p>
                        <p className="text-sm text-gray-improved">+ complete on-demand library</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Check className="w-6 h-6 text-gold-300 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-bold text-white text-base">3 certifications included</p>
                        <p className="text-sm text-gray-improved">CSPO + AI for POs + AI Prompting</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Check className="w-6 h-6 text-gold-300 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-bold text-white text-base">Career assets built with you</p>
                        <p className="text-sm text-gray-improved">Backlog, stories, portfolio, custom resume</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Check className="w-6 h-6 text-gold-300 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-bold text-white text-base">Interview prep & feedback</p>
                        <p className="text-sm text-gray-improved">Mock interviews + coach support</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Check className="w-6 h-6 text-gold-300 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-bold text-white text-base">Virtual office hours</p>
                        <p className="text-sm text-gray-improved">Never get stuck—get help when you need it</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Check className="w-6 h-6 text-gold-300 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-bold text-white text-base">Private community</p>
                        <p className="text-sm text-gray-improved">Network with peers and alumni</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-auto">
                    <button
                      onClick={openCalendly}
                      className="w-full py-5 bg-gradient-to-r from-gold-500 to-gold-600 neumorphic-gold rounded-full font-black text-xl text-white hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
                      style={{
                        boxShadow: '0 0 30px rgba(212, 175, 55, 0.6), 0 10px 40px rgba(0, 0, 0, 0.5)'
                      }}
                    >
                      Get FREE Career Guidance
                    </button>
                    <p className="text-sm text-center text-gray-improved mt-4">Seat-limited · Confirm fit & lock your spot</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* On-Demand Card */}
            <motion.div
              className="relative group fade-in-up"
              style={{
                transform: `
                  perspective(1000px)
                  rotateY(${mousePosition.x / 8}deg)
                  rotateX(${-mousePosition.y / 8}deg)
                `,
                transformStyle: 'preserve-3d',
              }}
              transition={{ type: 'spring', stiffness: 150, damping: 20 }}
            >
              <div className="glassmorphism glass-glow p-10 lg:p-12 rounded-3xl h-full border border-gray-700 relative overflow-hidden">
                <div className="relative z-10 flex flex-col h-full">
                  <h3 className="text-3xl lg:text-5xl font-black mb-2 text-white">
                    On-Demand
                  </h3>
                  <p className="text-gray-improved font-semibold mb-8 text-lg">Start Today · Self-Paced</p>

                  <div className="mb-10">
                    <div className="flex items-baseline gap-3 mb-2">
                      <span className="text-6xl lg:text-7xl font-black text-white">$800</span>
                      <span className="text-gray-improved line-through text-2xl">$1,299</span>
                    </div>
                    <p className="text-base text-gray-improved">One-time payment</p>
                  </div>

                  <div className="space-y-5 mb-10">
                    <div className="flex items-start gap-3">
                      <Check className="w-6 h-6 text-gray-improved flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-bold text-white text-base">Full video curriculum</p>
                        <p className="text-sm text-gray-improved">Templates + assignments included</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Check className="w-6 h-6 text-gray-improved flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-bold text-white text-base">Certification roadmap</p>
                        <p className="text-sm text-gray-improved">Which certs to prioritize (exam not included)</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Check className="w-6 h-6 text-gray-improved flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-bold text-white text-base">Self-paced flexibility</p>
                        <p className="text-sm text-gray-improved">Go at your own speed, no deadlines</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Check className="w-6 h-6 text-gray-improved flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-bold text-white text-base">Community access</p>
                        <p className="text-sm text-gray-improved">Connect with fellow students</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <X className="w-6 h-6 text-gray-improved flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-gray-improved text-base">No live sessions</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <X className="w-6 h-6 text-gray-improved flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-gray-improved text-base">No personal coaching or office hours</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-auto">
                    <button
                      onClick={openStripeCheckout}
                      className="w-full py-5 border-2 border-white/30 neumorphic-dark rounded-full font-black text-xl text-white hover:bg-white/10 hover:border-white/50 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
                      style={{
                        boxShadow: '0 0 20px rgba(255, 255, 255, 0.3), 0 8px 32px rgba(0, 0, 0, 0.5)'
                      }}
                    >
                      Enroll Now — Instant Access
                    </button>
                    <p className="text-sm text-center text-gray-improved mt-4">Start learning immediately</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Feature Comparison Table */}
          <div className="fade-in-up mt-20">
            <h3 className="text-3xl lg:text-4xl font-black text-center mb-12">
              <span className="text-gradient-gold">Full Feature Comparison</span>
            </h3>
            <div className="glassmorphism-subtle rounded-3xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-700/50">
                      <th className="text-left p-6 lg:p-8 font-bold text-gray-improved text-base">Feature</th>
                      <th className="text-center p-6 lg:p-8 font-bold text-gold-300 bg-gold-500/10 text-base">VIP</th>
                      <th className="text-center p-6 lg:p-8 font-bold text-gray-improved text-base">On-Demand</th>
                    </tr>
                  </thead>
                  <tbody>
                    {features.map((feature, index) => (
                      <tr key={index} className="border-b border-gray-700/30 last:border-0 hover:bg-white/5 transition-colors">
                        <td className="p-6 lg:p-8 text-white font-medium">{feature.name}</td>
                        <td className="p-6 lg:p-8 text-center bg-gold-500/5">
                          {feature.vip ? (
                            <Check className="w-7 h-7 text-gold-300 mx-auto" />
                          ) : (
                            <X className="w-7 h-7 text-gray-600 mx-auto" />
                          )}
                        </td>
                        <td className="p-6 lg:p-8 text-center">
                          {feature.onDemand ? (
                            <Check className="w-7 h-7 text-gray-improved mx-auto" />
                          ) : (
                            <X className="w-7 h-7 text-gray-600 mx-auto" />
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What You'll Actually Build */}
      <section className="relative z-10 py-24 lg:py-32 px-8 lg:px-16 bg-gradient-to-b from-transparent via-gold-500/5 to-transparent">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20 fade-in-up">
            <h2 className="text-4xl lg:text-6xl font-black mb-6">
              <span className="text-gradient-gold">What You'll Actually Build</span>
            </h2>
            <p className="text-xl lg:text-2xl text-gray-improved">Real artifacts employers want to see</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {whatYouBuild.map((item, index) => (
              <div key={index} className="glassmorphism-subtle glass-glow p-8 rounded-2xl fade-in-up text-center hover:scale-105 transition-transform duration-300">
                <div className="text-6xl lg:text-7xl mb-6">{item.icon}</div>
                <h4 className="text-xl font-bold text-white mb-3">{item.title}</h4>
                <p className="text-sm lg:text-base text-gray-improved leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Week-by-Week Breakdown */}
      <section className="relative z-10 py-24 lg:py-32 px-8 lg:px-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20 fade-in-up">
            <h2 className="text-4xl lg:text-6xl font-black mb-6">
              <span className="text-gradient-gold">How It Works</span>
            </h2>
            <p className="text-xl lg:text-2xl text-gray-improved">Your 12-week journey to product mastery</p>
          </div>

          <div className="space-y-8">
            {weeklyBreakdown.map((phase, index) => (
              <div key={index} className="glassmorphism glass-glow p-8 lg:p-10 rounded-2xl fade-in-up hover:scale-[1.02] transition-transform duration-300">
                <div className="flex flex-col md:flex-row md:items-start gap-6 lg:gap-8">
                  <div className="md:w-1/4">
                    <div className="inline-block px-5 py-3 bg-gold-500/15 rounded-full text-gold-300 font-bold mb-3 text-base">
                      {phase.weeks}
                    </div>
                    <h3 className="text-2xl lg:text-3xl font-black text-white">{phase.title}</h3>
                  </div>
                  <div className="md:w-3/4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      {phase.topics.map((topic, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <div className="w-2.5 h-2.5 rounded-full bg-gold-400 flex-shrink-0"></div>
                          <span className="text-gray-improved text-base">{topic}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Risk Reversal Section */}
      <section className="relative z-10 py-20 px-8 lg:px-16">
        <div className="max-w-4xl mx-auto">
          <div className="neumorphic-gold-card p-10 rounded-3xl text-center fade-in-up">
            <h2 className="text-3xl lg:text-4xl font-black mb-6">
              <span className="text-gradient-gold">Enroll with Confidence</span>
            </h2>
            <div className="space-y-4 text-left max-w-2xl mx-auto">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                  <Check className="w-6 h-6 text-green-400" />
                </div>
                <div>
                  <p className="font-bold text-white mb-1">Full Refund</p>
                  <p className="text-gray-improved">Cancel before the first live session</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-yellow-500/20 flex items-center justify-center flex-shrink-0">
                  <span className="font-bold text-yellow-400">75%</span>
                </div>
                <div>
                  <p className="font-bold text-white mb-1">75% Refund</p>
                  <p className="text-gray-improved">Within week 1 of program start</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-orange-500/20 flex items-center justify-center flex-shrink-0">
                  <span className="font-bold text-orange-400">50%</span>
                </div>
                <div>
                  <p className="font-bold text-white mb-1">50% Refund</p>
                  <p className="text-gray-improved">Within week 2 of program start</p>
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-improved mt-8">
              No refunds after week 2. <Link href="/refund-policy" className="text-gold-400 hover:underline">See full policy</Link>
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative z-10 py-24 lg:py-32 px-8 lg:px-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-20 fade-in-up">
            <h2 className="text-4xl lg:text-6xl font-black mb-6">
              <span className="text-gradient-gold">Frequently Asked Questions</span>
            </h2>
          </div>

          <div className="space-y-5">
            {faqs.map((faq, index) => (
              <details key={index} className="glassmorphism-subtle glass-glow p-7 lg:p-8 rounded-2xl fade-in-up group hover:border-gold-500/20 transition-all duration-300">
                <summary className="font-bold text-lg lg:text-xl text-white cursor-pointer list-none flex justify-between items-center gap-4">
                  {faq.question}
                  <span className="text-gold-300 group-open:rotate-180 transition-transform text-2xl flex-shrink-0">▼</span>
                </summary>
                <p className="text-gray-improved mt-5 leading-relaxed text-base lg:text-lg">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative z-10 py-20 lg:py-24 px-8 lg:px-16">
        <div className="max-w-5xl mx-auto text-center">
          <div className="glassmorphism-gold glass-shimmer glass-glow p-12 lg:p-20 rounded-3xl fade-in-up">
            <h2 className="text-4xl lg:text-6xl font-black mb-8">
              Ready to <span className="text-gradient-gold">Transform Your Career</span>?
            </h2>
            <p className="text-xl lg:text-2xl text-gray-improved mb-12">
              Choose your path and start your product management journey today
            </p>
            <div className="flex flex-col sm:flex-row gap-6 lg:gap-8 justify-center">
              <button
                onClick={openCalendly}
                className="px-12 py-6 bg-gradient-to-r from-gold-500 to-gold-600 neumorphic-gold rounded-full font-black text-xl lg:text-2xl text-white hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
                style={{
                  boxShadow: '0 0 30px rgba(212, 175, 55, 0.6), 0 10px 40px rgba(0, 0, 0, 0.5)'
                }}
              >
                Get FREE Career Guidance
              </button>
              <button
                onClick={openStripeCheckout}
                className="px-12 py-6 border-2 border-white/30 neumorphic-dark rounded-full font-black text-xl lg:text-2xl text-white hover:bg-white/10 hover:border-white/50 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
                style={{
                  boxShadow: '0 0 20px rgba(255, 255, 255, 0.3), 0 8px 32px rgba(0, 0, 0, 0.5)'
                }}
              >
                Start On-Demand Now
              </button>
            </div>
            <p className="text-base lg:text-lg text-gray-improved mt-10 font-medium">
              🔥 Black Friday pricing ends soon — Don't miss out
            </p>
          </div>
        </div>
      </section>

      <style jsx>{`
        /* ===== TYPOGRAPHY & READABILITY ===== */
        * {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        body {
          line-height: 1.7;
        }

        h1, h2, h3, h4, h5, h6 {
          letter-spacing: -0.03em;
          line-height: 1.2;
          text-shadow: 0 2px 8px rgba(0, 0, 0, 0.9);
        }

        p, span, div {
          text-shadow: 0 1px 3px rgba(0, 0, 0, 0.8);
        }

        /* ===== GLASSMORPHISM STYLES ===== */
        .glassmorphism {
          background: rgba(15, 15, 15, 0.75);
          backdrop-filter: blur(24px) saturate(180%);
          -webkit-backdrop-filter: blur(24px) saturate(180%);
          border: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow:
            0 8px 32px rgba(0, 0, 0, 0.5),
            inset 0 1px 0 rgba(255, 255, 255, 0.05),
            inset 0 -1px 0 rgba(0, 0, 0, 0.2);
          position: relative;
        }

        .glassmorphism::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: inherit;
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.08) 0%,
            rgba(255, 255, 255, 0.02) 50%,
            transparent 100%
          );
          pointer-events: none;
        }

        .glassmorphism-gold {
          background: rgba(26, 22, 18, 0.80);
          backdrop-filter: blur(24px) saturate(200%);
          -webkit-backdrop-filter: blur(24px) saturate(200%);
          border: 1px solid rgba(212, 175, 55, 0.25);
          box-shadow:
            0 8px 32px rgba(212, 175, 55, 0.15),
            0 16px 64px rgba(0, 0, 0, 0.6),
            inset 0 1px 0 rgba(255, 215, 0, 0.1),
            inset 0 -1px 0 rgba(0, 0, 0, 0.3);
          position: relative;
        }

        .glassmorphism-gold::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: inherit;
          background: linear-gradient(
            135deg,
            rgba(212, 175, 55, 0.12) 0%,
            rgba(255, 215, 0, 0.06) 50%,
            transparent 100%
          );
          pointer-events: none;
        }

        .glassmorphism-gold:hover {
          border-color: rgba(212, 175, 55, 0.4);
          box-shadow:
            0 8px 32px rgba(212, 175, 55, 0.25),
            0 20px 80px rgba(0, 0, 0, 0.7),
            inset 0 1px 0 rgba(255, 215, 0, 0.15);
          transform: translateY(-2px);
          transition: all 0.3s ease;
        }

        .glassmorphism-subtle {
          background: rgba(15, 15, 15, 0.65);
          backdrop-filter: blur(20px) saturate(150%);
          -webkit-backdrop-filter: blur(20px) saturate(150%);
          border: 1px solid rgba(255, 255, 255, 0.05);
          box-shadow:
            0 4px 24px rgba(0, 0, 0, 0.4),
            inset 0 1px 0 rgba(255, 255, 255, 0.03);
        }

        /* Glass Inner Glow Effect */
        .glass-glow::after {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: inherit;
          background: radial-gradient(
            circle at 50% 0%,
            rgba(255, 255, 255, 0.1) 0%,
            transparent 60%
          );
          opacity: 0;
          transition: opacity 0.3s ease;
          pointer-events: none;
        }

        .glass-glow:hover::after {
          opacity: 1;
        }

        /* Glass Shimmer Effect */
        .glass-shimmer {
          overflow: hidden;
        }

        .glass-shimmer::after {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: linear-gradient(
            to bottom right,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.03) 40%,
            rgba(255, 255, 255, 0.08) 50%,
            rgba(255, 255, 255, 0.03) 60%,
            rgba(255, 255, 255, 0) 100%
          );
          transform: translateX(-100%) translateY(-100%) rotate(45deg);
          transition: transform 0.6s ease;
          pointer-events: none;
        }

        .glass-shimmer:hover::after {
          transform: translateX(100%) translateY(100%) rotate(45deg);
        }

        /* ===== LEGACY NEUMORPHIC (KEPT FOR COMPATIBILITY) ===== */
        .neumorphic-card {
          background: rgba(15, 15, 15, 0.75);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.06);
          box-shadow:
            0 8px 32px rgba(0, 0, 0, 0.5),
            inset 1px 1px 2px rgba(212, 175, 55, 0.05);
        }

        .neumorphic-gold {
          background: linear-gradient(145deg, #1a1612, #0f0d0a);
          box-shadow: 8px 8px 16px #0a0907,
                      -8px -8px 16px #1f1b17,
                      inset 1px 1px 2px rgba(212, 175, 55, 0.2);
        }

        .neumorphic-dark {
          background: linear-gradient(145deg, #0a0a0a, #1a1a1a);
          box-shadow: inset 5px 5px 10px #050505,
                      inset -5px -5px 10px #1f1f1f;
        }

        .neumorphic-gold-card {
          background: rgba(26, 22, 18, 0.80);
          backdrop-filter: blur(24px);
          border: 1px solid rgba(212, 175, 55, 0.25);
          box-shadow:
            0 8px 32px rgba(212, 175, 55, 0.15),
            0 16px 64px rgba(0, 0, 0, 0.6),
            inset 2px 2px 5px rgba(212, 175, 55, 0.1);
        }

        /* ===== TEXT GRADIENT ===== */
        .text-gradient-gold {
          display: inline-block !important;
          background: linear-gradient(135deg, #D4AF37 0%, #FFD700 25%, #D4AF37 50%, #FFD700 75%, #B8860B 100%);
          background-size: 200% 200%;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: gradient-flow 8s ease infinite;
          text-shadow: none;
        }

        @keyframes gradient-flow {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        /* ===== COLOR UTILITIES ===== */
        .bg-gold-400 { background-color: #D4AF37; }
        .bg-gold-500 { background-color: #B8860B; }
        .bg-gold-600 { background-color: #996515; }
        .text-gold-200 { color: #F4E4BC; text-shadow: 0 1px 3px rgba(0,0,0,0.8); }
        .text-gold-300 { color: #E6D492; text-shadow: 0 1px 3px rgba(0,0,0,0.8); }
        .text-gold-400 { color: #D4AF37; text-shadow: 0 1px 3px rgba(0,0,0,0.8); }
        .from-gold-500 { --tw-gradient-from: #B8860B; }
        .to-gold-600 { --tw-gradient-to: #996515; }
        .border-gold-500\/40 { border-color: rgba(184, 134, 11, 0.4); }
        .border-gold-500\/50 { border-color: rgba(184, 134, 11, 0.5); }

        /* Better readability for gray text */
        .text-gray-improved {
          color: #d1d5db;
          text-shadow: 0 1px 3px rgba(0,0,0,0.9);
        }

        .text-gray-subtle {
          color: #9ca3af;
          text-shadow: 0 1px 2px rgba(0,0,0,0.8);
        }

        /* ===== SCROLL PROGRESS BAR ===== */
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
          width: 0;
          background: linear-gradient(90deg, #D4AF37 0%, #FFD700 50%, #B8860B 100%);
          box-shadow: 0 0 10px #D4AF37, 0 0 20px #FFD700;
          transition: width 0.1s ease-out;
        }

        /* ===== ANIMATIONS ===== */
        .fade-in-up {
          opacity: 0;
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%) translateY(-100%) rotate(45deg);
          }
          100% {
            transform: translateX(100%) translateY(100%) rotate(45deg);
          }
        }

        /* ===== CURSOR ===== */
        .cursor-none * {
          cursor: none !important;
        }

        /* ===== LOADING SCREEN ===== */
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

        .loading-content {
          text-align: center;
        }

        .loading-shape {
          width: 80px;
          height: 80px;
          border: 3px solid #D4AF37;
          border-radius: 50%;
          border-top-color: transparent;
          animation: spin 1s linear infinite;
          margin: 0 auto;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .loading-text {
          font-size: 1.5rem;
          font-weight: 600;
          margin: 2rem 0;
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

        @keyframes wave {
          0%, 100% {
            transform: translateY(0);
            color: #D4AF37;
          }
          50% {
            transform: translateY(-10px);
            color: #FFD700;
          }
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
          background: linear-gradient(90deg, #D4AF37 0%, #FFD700 50%, #B8860B 100%);
          transition: width 0.3s ease;
          box-shadow: 0 0 10px #D4AF37;
        }

        .loading-percentage {
          font-size: 0.875rem;
          color: #D4AF37;
          font-weight: 600;
        }

        @keyframes fadeOut {
          to {
            opacity: 0;
            pointer-events: none;
          }
        }
      `}</style>
    </div>
  );
}

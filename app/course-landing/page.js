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
import { useRouter, usePathname } from 'next/navigation';

// Import new components
import IBHEBanner from './components/IBHEBanner';
import NavigationHeader from './components/NavigationHeader';
import AnimatedLogo from './components/AnimatedLogo';
import GlassmorphicLogo from './components/GlassmorphicLogo';
import CertificationsShowcase from './components/CertificationsShowcase';
import TestimonialsCarousel from './components/TestimonialsCarousel';
import YoutubeShortsGallery from './components/YoutubeShortsGallery';
import NewsletterSignup from './components/NewsletterSignup';
import SocialFooter from './components/SocialFooter';
import PathSelectionModal from './components/PathSelectionModal';
import PickYourPathModal from './components/PickYourPathModal';
import StateFundedModal from './components/StateFundedModal';
import TechSalaryPopup from './components/TechSalaryPopup';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, TextPlugin);
}

export default function CourseLandingPage() {
  const router = useRouter();
  const pathname = usePathname();
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
  const [gyroPermission, setGyroPermission] = useState('pending'); // 'pending' | 'granted' | 'denied' | 'not-needed'
  const [showGyroButton, setShowGyroButton] = useState(false);
  const mousePositionRef = useRef({ x: 0, y: 0 }); // Fix stale closure issue
  const scrambleTimeouts = useRef([]);
  const particleCanvasRef = useRef(null);
  const scrollProgressBarRef = useRef(null);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [showPathSelectionModal, setShowPathSelectionModal] = useState(false);
  const [showPickYourPathModal, setShowPickYourPathModal] = useState(false);
  const [showStateFundedModal, setShowStateFundedModal] = useState(false);
  const [showSalaryPopup, setShowSalaryPopup] = useState(false);
  const reserveSeatButtonRef = useRef(null);
  const courseOverviewButtonRef = useRef(null);

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

  // No need to manipulate pointer-events - buttons should work naturally
  useEffect(() => {
    // Placeholder for any future initialization
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

    // Check if device needs permission (iOS 13+)
    const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
    const needsPermission = typeof DeviceOrientationEvent !== 'undefined' &&
                           typeof DeviceOrientationEvent.requestPermission === 'function';

    console.log('[Gyro] iOS Device:', isIOS);
    console.log('[Gyro] Needs Permission:', needsPermission);

    if (needsPermission && isIOS) {
      // iOS 13+ requires user-triggered permission
      setShowGyroButton(true);
      setGyroPermission('pending');
      console.log('[Gyro] iOS 13+ detected - permission button will be shown');
    } else {
      // Android or older iOS - no permission needed
      setGyroPermission('not-needed');
      setShowGyroButton(false);
      console.log('[Gyro] Android or older iOS - no permission needed');
    }
  }, [isMobile]);

  // Permission Request Handler (iOS 13+)
  const handleGyroPermission = async () => {
    console.log('[Gyro] Permission button clicked');

    try {
      if (typeof DeviceOrientationEvent.requestPermission === 'function') {
        const permission = await DeviceOrientationEvent.requestPermission();
        console.log('[Gyro] Permission result:', permission);

        if (permission === 'granted') {
          setGyroPermission('granted');
          setShowGyroButton(false);
          console.log('[Gyro] Permission granted - gyroscope enabled');
        } else {
          setGyroPermission('denied');
          console.log('[Gyro] Permission denied');
          alert('Gyroscope permission was denied. You can enable it in your browser settings.');
        }
      }
    } catch (error) {
      console.error('[Gyro] Error requesting permission:', error);
      setGyroPermission('denied');
      alert('Error requesting gyroscope permission: ' + error.message);
    }
  };

  // Device Orientation Tracking (Mobile Only) - With iOS Permission Support
  useEffect(() => {
    if (!isMobile) return;

    // Only start listening if permission is granted or not needed
    const canUseGyro = gyroPermission === 'granted' || gyroPermission === 'not-needed';
    if (!canUseGyro) {
      console.log('[Gyro] Waiting for permission. Current state:', gyroPermission);
      return;
    }

    console.log('[Gyro] Starting device orientation listener');

    const handleOrientation = (event) => {
      const beta = event.beta;   // front-back tilt (-180 to 180)
      const gamma = event.gamma;  // left-right tilt (-90 to 90)

      // Check for null values (sensor not available or not working)
      if (beta === null || gamma === null) {
        console.warn('[Gyro] Received null values from sensor - beta:', beta, 'gamma:', gamma);
        return;
      }

      setOrientation({ beta, gamma });

      // Convert orientation to parallax values with dramatic multiplier
      // IMPORTANT: Calibrate beta so normal phone holding position (90°) = neutral (0°)
      // Beta = 0° when phone is flat on table
      // Beta = 90° when phone is held vertically (normal viewing)
      // By subtracting 90°, we make the normal holding position the neutral point
      const adjustedBeta = beta - 90;  // Offset: 90° becomes 0°, tilt forward > 0°, tilt back < 0°

      // Clamp adjusted beta to reasonable tilt range (-45° to 45° from neutral)
      const clampedBeta = Math.max(-45, Math.min(45, adjustedBeta));
      const newPosition = {
        x: (gamma / 90) * 150,           // gamma: -90 to 90 -> -150 to 150 (ultra dramatic left/right)
        y: (clampedBeta / 45) * 150      // adjusted beta: -45 to 45 -> -150 to 150 (ultra dramatic forward/back)
      };

      // Update both state and ref (ref prevents stale closure)
      setMousePosition(newPosition);
      mousePositionRef.current = newPosition;
    };

    // Add device orientation listener
    window.addEventListener('deviceorientation', handleOrientation, true);
    console.log('[Gyro] Event listener added successfully');

    // Test if events are being fired
    let eventCount = 0;
    const testHandler = () => {
      eventCount++;
      if (eventCount === 1) {
        console.log('[Gyro] ✓ First deviceorientation event received - gyroscope is working!');
      }
    };
    window.addEventListener('deviceorientation', testHandler, true);

    setTimeout(() => {
      if (eventCount === 0) {
        console.error('[Gyro] ⚠ No deviceorientation events received after 3 seconds - gyroscope may not be available');
      }
      window.removeEventListener('deviceorientation', testHandler, true);
    }, 3000);

    return () => {
      window.removeEventListener('deviceorientation', handleOrientation, true);
      console.log('[Gyro] Event listener removed');
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
    console.log('[GSAP] Initializing Lenis and animations...');

    // Step 1: Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    // Step 2: Integrate Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // Step 3: Update scroll progress and Lenis on every animation frame
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);

      // Update scroll progress bar in real-time on every frame
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = lenis.scroll || 0;
      const progress = Math.min((scrolled / scrollHeight) * 100, 100);

      // Direct DOM manipulation for 60fps real-time updates
      if (scrollProgressBarRef.current) {
        scrollProgressBarRef.current.style.width = `${progress}%`;
      }
    });

    gsap.ticker.lagSmoothing(0);

    console.log('[GSAP] Lenis initialized and integrated');

    // Step 4: Wait for DOM to be fully ready, then create animations
    const timeoutId = setTimeout(() => {
      console.log('[GSAP] Creating ScrollTrigger animations...');

      const ctx = gsap.context(() => {
        // Animated Logo - Spectacular entrance with elastic bounce
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

        // Hero animations - Enhanced with random directions
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

        // Stats counter animation - FIXED
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
            once: true // Only animate once
          });
        });

        // Modules section heading
        if (modulesHeadingRef.current) {
          console.log('[GSAP] Creating animation for modules heading');
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
                markers: false,
                onEnter: () => console.log('[GSAP] Modules heading triggered'),
              }
            }
          );
        }

        // Module cards
        if (moduleCardsRef.current.length > 0) {
          console.log('[GSAP] Creating animation for', moduleCardsRef.current.length, 'module cards');
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
                onEnter: () => console.log('[GSAP] Module cards triggered'),
              }
            }
          );
        }

        // Video section heading
        if (videoHeadingRef.current) {
          console.log('[GSAP] Creating animation for video heading');
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
                onEnter: () => console.log('[GSAP] Video heading triggered'),
              }
            }
          );
        }

        // Video container
        if (videoContainerRef.current) {
          console.log('[GSAP] Creating animation for video container');
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
                onEnter: () => console.log('[GSAP] Video container triggered'),
              }
            }
          );
        }

        // CTA section
        if (ctaSectionRef.current) {
          console.log('[GSAP] Creating animation for CTA section');
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
                onEnter: () => console.log('[GSAP] CTA section triggered'),
              }
            }
          );
        }
      });

      // Step 5: Refresh ScrollTrigger to recalculate positions
      ScrollTrigger.refresh();
      console.log('[GSAP] ScrollTrigger refreshed');
      console.log('[GSAP] All animations created successfully');

      setIsLoaded(true);
    }, 100); // Small delay to ensure DOM is ready

    return () => {
      clearTimeout(timeoutId);
      lenis.destroy();
    };
  }, []);

  // Enhanced Three.js background with particles
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
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Limit for performance

    // Create multiple geometric shapes with variety
    const shapes = [];
    const geometries = [
      new THREE.IcosahedronGeometry(1, 1),
      new THREE.OctahedronGeometry(1, 0),
      new THREE.TorusGeometry(0.8, 0.3, 16, 100),
      new THREE.TetrahedronGeometry(1, 0)
    ];

    const goldColors = [0xD4AF37, 0xFFD700, 0xB8860B, 0xCD9C5C];

    // Create 15 geometric shapes
    for (let i = 0; i < 15; i++) {
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

    // Create particle field
    const particlesGeometry = new THREE.BufferGeometry();
    const particleCount = 500;
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 50;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      color: 0xD4AF37,
      size: 0.05,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    // Enhanced lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0xD4AF37, 1.5);
    pointLight1.position.set(5, 5, 5);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xFFD700, 1);
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
        // Rotation
        shape.mesh.rotation.x += shape.rotationSpeed.x;
        shape.mesh.rotation.y += shape.rotationSpeed.y;
        shape.mesh.rotation.z += shape.rotationSpeed.z;

        // Pulsing emissive intensity
        const pulseFactor = Math.sin(elapsedTime * shape.pulseSpeed + shape.pulseOffset) * 0.5 + 0.5;
        shape.mesh.material.emissiveIntensity = 0.2 + pulseFactor * 0.3;

        // Gentle floating motion
        shape.mesh.position.y = shape.originalPosition.y + Math.sin(elapsedTime * 0.3 + i) * 0.5;
      });

      // Rotate particle field slowly
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

      // Cleanup
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
    if (isMobile) return; // Skip on mobile - use device orientation instead

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

  // Modal Handler Functions
  const handleOpenPathSelection = () => {
    if (isMobile) {
      router.push('/course-landing/path-selection');
    } else {
      setShowPathSelectionModal(true);
    }
  };

  const handleClosePathSelection = () => {
    setShowPathSelectionModal(false);
  };

  const handleSelectBlackFriday = () => {
    setShowPathSelectionModal(false);
    setTimeout(() => {
      setShowPickYourPathModal(true);
    }, 300); // Small delay for smooth transition
  };

  const handleSelectStateFunded = () => {
    setShowPathSelectionModal(false);
    setTimeout(() => {
      setShowStateFundedModal(true);
    }, 300); // Small delay for smooth transition
  };

  const handleClosePickYourPath = () => {
    setShowPickYourPathModal(false);
  };

  const handleCloseStateFunded = () => {
    setShowStateFundedModal(false);
  };

  const modules = [
    {
      title: "Agile Foundations 101",
      icon: "🚀",
      description: "In this course, we'll cover all the basics. From the fundamentals of Agile methodologies to the essentials of iterative development and team collaboration, you'll leave this course with a strong foundation in agile allowing you to build your expertise in the later modules.",
      topics: ["Scrum Ceremonies", "User Stories", "Sprint Planning", "Retrospectives"],
      duration: "2 weeks"
    },
    {
      title: "Product Discovery & Validation",
      icon: "🔍",
      description: "This module will enhance your skills in identifying viable product opportunities and validating them with real-world methods. Learn to navigate the complexities of market research and user testing to create amazing products.",
      topics: ["Market Research", "Customer Interviews", "MVP Development", "A/B Testing"],
      duration: "3 weeks"
    },
    {
      title: "Product Backlog Mastery",
      icon: "📊",
      description: "This module will equip you with the skills to analyze and prioritize features effectively, turning your strategic vision into a comprehensive roadmap for success.",
      topics: ["Prioritization Frameworks", "Roadmap Creation", "Stakeholder Communication", "Metrics & KPIs"],
      duration: "3 weeks"
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* IBHE Trust Banner - Sticky at top */}
      <IBHEBanner onCTAClick={handleOpenPathSelection} />

      {/* Back to Home - Shows on /tech page */}
      {(pathname === '/tech' || pathname === '/tech/') && (
        <button
          onClick={() => router.push('/')}
          className="fixed top-16 left-4 z-[100] flex items-center gap-2 px-4 py-2 rounded-full bg-black/60 backdrop-blur-md border border-gold-500/30 text-white hover:bg-black/80 hover:border-gold-500/50 transition-all duration-300 group"
        >
          <svg
            className="w-4 h-4 text-gold-400 group-hover:-translate-x-1 transition-transform duration-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span className="text-sm font-semibold">Home</span>
        </button>
      )}

      {/* Sticky Navigation Header */}
      <NavigationHeader onCTAClick={handleOpenPathSelection} />

      {/* Loading Screen */}
      {isLoading && (
        <div className="loading-screen">
          <div className="loading-content">
            <div className="loading-logo">
              {/* Animated Logo */}
              <div className="relative w-32 h-32 sm:w-40 sm:h-40 mb-8 animate-pulse-slow">
                <Image
                  src="/images/logos/mentor-agile-gold.png"
                  alt="Mentor Agile Loading"
                  fill
                  className="object-contain drop-shadow-2xl"
                  style={{
                    filter: 'drop-shadow(0 0 40px rgba(212, 175, 55, 0.8))'
                  }}
                  priority
                />
                {/* Rotating border */}
                <div className="absolute inset-0 border-4 border-transparent border-t-gold-400 border-r-gold-500 rounded-full animate-spin-slow"></div>
              </div>
            </div>
            <div className="loading-text">
              <span className="loading-letter">M</span>
              <span className="loading-letter">e</span>
              <span className="loading-letter">n</span>
              <span className="loading-letter">t</span>
              <span className="loading-letter">o</span>
              <span className="loading-letter">r</span>
              <span className="loading-letter">\u00A0</span>
              <span className="loading-letter">A</span>
              <span className="loading-letter">g</span>
              <span className="loading-letter">i</span>
              <span className="loading-letter">l</span>
              <span className="loading-letter">e</span>
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

      {/* Scroll Progress Indicator */}
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
          className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-[10001] px-8 py-4 bg-gradient-to-r from-gold-500 to-gold-600 rounded-full font-bold text-lg text-black shadow-2xl hover:scale-105 transition-all duration-300 animate-bounce"
          style={{
            boxShadow: '0 0 30px rgba(212, 175, 55, 0.6), 0 10px 40px rgba(0, 0, 0, 0.5)'
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

      {/* Three.js Canvas Background - Enhanced Visibility */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 z-0 opacity-40"
        style={{ pointerEvents: 'none' }}
      />

      {/* Geometric Pattern Overlay - Enhanced */}
      <div className="fixed inset-0 z-1 opacity-25 pointer-events-none">
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: `linear-gradient(45deg, transparent 24%, rgba(212, 175, 55, 0.08) 25%, rgba(212, 175, 55, 0.08) 26%, transparent 27%, transparent 74%, rgba(212, 175, 55, 0.08) 75%, rgba(212, 175, 55, 0.08) 76%, transparent 77%, transparent)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      {/* Hero Section - Split Screen */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center lg:justify-start pt-4 sm:pt-6" style={{ perspective: '1200px', pointerEvents: 'auto' }}>
        <div className="max-w-[1920px] w-full mx-auto flex items-center" style={{ pointerEvents: 'auto' }}>
          {/* Left Side - Content (40%) */}
          <div ref={textRef} className="relative z-20 w-full lg:w-2/5 px-8 lg:px-16 xl:px-24" style={{ pointerEvents: 'auto', transformStyle: 'preserve-3d' }}>
            {/* Spectacular Glassmorphic Logo with Liquid Glass Effect */}
            <div className="hero-logo-container flex justify-center lg:justify-start mb-6" data-aos="fade-up" style={{ transform: 'translateZ(150px)', pointerEvents: 'none' }}>
              <GlassmorphicLogo
                logoPath="/images/logos/mentor-agile-gold.png"
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
              <span className="text-gradient-gold">
                {['Tech', 'Career'].map((word, wordIndex) => (
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
              From Beginner to <span className="text-gold-400 font-semibold">$130K+ Product Manager</span> in Just 8 Weeks
            </p>

            {/* CTA Buttons - Mobile Optimized with 48px+ touch targets */}
            <div className="flex flex-col sm:flex-row gap-4 mb-5" style={{ position: 'relative', zIndex: 50, pointerEvents: 'auto' }}>
              <button
                onClick={() => setShowVideoModal(true)}
                className="hero-course-overview-btn relative min-h-[48px] px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-br from-gold-500/20 via-gold-600/20 to-gold-700/20 rounded-full font-black text-base sm:text-lg text-white cursor-pointer select-none border-2 border-white"
                style={{ touchAction: 'manipulation' }}
              >
                <span style={{ pointerEvents: 'none' }} className="relative z-10 flex items-center gap-2 drop-shadow-sm">
                  <svg style={{ pointerEvents: 'none' }} className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z"/>
                  </svg>
                  <span style={{ pointerEvents: 'none' }}>Course Overview</span>
                </span>
              </button>
              <button
                onClick={handleOpenPathSelection}
                className="hero-reserve-seat-btn relative min-h-[48px] px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-br from-gold-500 via-gold-600 to-gold-700 rounded-full font-black text-base sm:text-lg text-white cursor-pointer select-none"
                style={{ touchAction: 'manipulation' }}
              >
                <span style={{ pointerEvents: 'none' }} className="relative z-10 drop-shadow-sm">Reserve Your Seat</span>
              </button>
            </div>

            {/* Stats - BA/PO/PM Specific Data - hidden per request
            <div className="grid grid-cols-3 gap-4 pt-4" style={{ transform: 'translateZ(80px)' }}>
              <div
                className="text-center cursor-pointer group hover:scale-105 transition-transform duration-300"
                onClick={() => setShowSalaryPopup(true)}
              >
                <div className="text-3xl font-bold text-gradient-gold group-hover:drop-shadow-[0_0_10px_rgba(212,175,55,0.5)]">
                  $<span className="stat-number" data-target="130">130</span>K
                </div>
                <div className="text-sm text-gray-300 group-hover:text-gold-400 transition-colors flex items-center justify-center gap-1">
                  <span>Avg Salary</span>
                  <svg className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <div
                className="text-center cursor-pointer group hover:scale-105 transition-transform duration-300"
                onClick={() => setShowSalaryPopup(true)}
              >
                <div className="text-3xl font-bold text-gradient-gold group-hover:drop-shadow-[0_0_10px_rgba(212,175,55,0.5)]">
                  $<span className="stat-number" data-target="516">516</span>K
                </div>
                <div className="text-sm text-gray-300 group-hover:text-gold-400 transition-colors flex items-center justify-center gap-1">
                  <span>Top Earners</span>
                  <svg className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400 animate-pulse-glow-green">
                  <span className="inline-block w-2 h-2 bg-green-400 rounded-full mr-2 animate-ping"></span>
                  <span className="stat-number" data-target="281">281</span>K
                </div>
                <div className="text-sm text-green-300">Job Openings</div>
              </div>
            </div>
            */}
          </div>

          {/* Right Side - Hero Image (60%) */}
          <div className="hidden lg:block absolute right-0 top-0 w-3/5 h-full">
            <div ref={imageRef} className="relative w-full h-full">
            {/* Geometric mask shape */}
            <div className="absolute inset-0" style={{
              clipPath: 'polygon(15% 0%, 100% 0%, 100% 100%, 0% 100%)'
            }}>
              <Image
                src="/images/course-hero.png"
                alt="Product Manager Course Hero"
                fill
                className="object-cover object-right"
                priority
                onLoad={() => setIsLoaded(true)}
              />
              {/* Gradient overlay for blend */}
              <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-black/50"></div>
            </div>

            {/* Floating geometric shapes */}
            <div className="absolute top-20 right-20 w-32 h-32 border-2 border-gold-500/30 rotate-45" />
            <div className="absolute bottom-20 right-40 w-24 h-24 border-2 border-gold-500/20 rotate-12" />
            </div>
          </div>
        </div>
      </section>

      {/* Certifications Showcase - Industry Recognition */}
      <div id="certifications">
        <CertificationsShowcase />
      </div>

      {/* Course Modules Section with Neumorphism */}
      <section id="modules" className="relative z-10 py-32 px-8 lg:px-16" style={{ perspective: '1000px' }}>
        <div className="max-w-7xl mx-auto" style={{ transformStyle: 'preserve-3d' }}>
          <div
            ref={modulesHeadingRef}
            className="text-center mb-20 gsap-hidden"
          >
            <h2
              className="text-5xl lg:text-7xl font-black mb-6 scramble-heading"
              data-text="Master The Craft"
              onMouseEnter={(e) => {
                const span = e.currentTarget.querySelector('span');
                if (span) scrambleText(span, 'Master The Craft');
              }}
            >
              <span className="text-gradient-gold">Master The Craft</span>
            </h2>
            <p className="text-xl text-gray-400">Three intensive modules to transform your career</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {modules.map((module, index) => (
              <div
                key={index}
                ref={(el) => (moduleCardsRef.current[index] = el)}
                className="group relative gsap-hidden card-3d-container"
                style={{
                  perspective: '1000px'
                }}
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

                  {/* Icon */}
                  <div className="text-6xl mb-6 text-center" style={{ position: 'relative', zIndex: 1 }}>{module.icon}</div>

                  {/* Title */}
                  <h3 className="text-2xl font-black mb-4 text-white text-center" style={{ position: 'relative', zIndex: 1 }}>
                    {module.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-200 mb-6 text-sm text-center" style={{ position: 'relative', zIndex: 1 }}>
                    {module.description}
                  </p>

                  {/* Topics */}
                  <div className="space-y-3 mb-auto" style={{ position: 'relative', zIndex: 1 }}>
                    {module.topics.map((topic, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-gold-500"></div>
                        <span className="text-gray-300 text-sm">{topic}</span>
                      </div>
                    ))}
                  </div>

                  {/* Duration */}
                  <div className="pt-6 mt-6 border-t border-gray-800 text-center" style={{ position: 'relative', zIndex: 1 }}>
                    <span className="text-sm text-gray-300 font-medium">
                      Duration: {module.duration}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Carousel - Success Stories */}
      <div id="testimonials">
        <TestimonialsCarousel />
      </div>

      {/* YouTube Shorts Gallery - Quick Tips */}
      <YoutubeShortsGallery />

      {/* Video Section with Glassmorphism */}
      <section className="relative z-10 py-32 px-8 lg:px-16">
        <div className="max-w-6xl mx-auto">
          <div
            ref={videoHeadingRef}
            className="text-center mb-16 gsap-hidden"
          >
            <h2
              className="text-5xl lg:text-7xl font-black mb-6 scramble-heading"
              data-text="See The Experience"
              onMouseEnter={(e) => {
                const span = e.currentTarget.querySelector('span');
                if (span) scrambleText(span, 'See The Experience');
              }}
            >
              <span className="text-gradient-gold">See The Experience</span>
            </h2>
            <p className="text-xl text-gray-400">Get a preview of our comprehensive curriculum</p>
          </div>

          <div
            ref={videoContainerRef}
            className="relative group gsap-hidden"
          >
            <div className="absolute -inset-4 bg-gradient-to-r from-gold-500/20 to-gold-600/20 rounded-3xl blur-xl opacity-50 group-hover:opacity-75 transition duration-1000"></div>
            <div className="relative glassmorphism rounded-3xl overflow-hidden aspect-video" style={{ pointerEvents: 'none' }}>
              <iframe
                src="https://www.youtube.com/embed/KHqrUvU9I1k"
                title="Mentor Agile Product Course Preview"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ pointerEvents: 'auto' }}
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Signup - Stay Connected */}
      <div id="contact">
        <NewsletterSignup />
      </div>

      {/* Final CTA with Neumorphic Design */}
      <section className="relative z-10 py-32 px-8 lg:px-16">
        <div
          ref={ctaSectionRef}
          className="max-w-4xl mx-auto text-center gsap-hidden"
        >
          <div className="neumorphic-gold-card p-12 lg:p-16 rounded-3xl">
            <h2 className="text-5xl lg:text-6xl font-black mb-6">
              Ready to <span className="text-gradient-gold">Transform</span>?
            </h2>
            <p className="text-xl text-gray-300 mb-10">
              Book a call to see if you're a good fit for our next cohort. <span className="text-gold-400 font-semibold">Seats are limited!</span>
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              {/* Mobile-Optimized Black Friday Button - 48px+ touch target, responsive sizing, 3D depth */}
              <button
                onClick={handleOpenPathSelection}
                className="black-friday-3d-button relative min-h-[48px] px-6 py-4 sm:px-8 sm:py-5 md:px-10 md:py-6 bg-gradient-to-br from-red-600 via-orange-600 to-amber-600 rounded-full font-black text-base sm:text-lg md:text-xl cursor-pointer select-none"
                style={{ touchAction: 'manipulation' }}
              >
                <span className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 text-white drop-shadow-lg">
                  <span className="text-2xl sm:text-3xl animate-pulse">🔥</span>
                  <span className="tracking-wide text-center sm:text-left">
                    <span className="block text-sm sm:text-base md:text-lg font-semibold uppercase tracking-wider">Black Friday Special</span>
                    <span className="block text-xs sm:text-sm font-black flex items-center justify-center sm:justify-start gap-2 mt-1">
                      <span className="relative flex h-2.5 w-2.5 sm:h-3 sm:w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 sm:h-3 sm:w-3 bg-gradient-to-r from-green-400 to-green-500"></span>
                      </span>
                      <span className="text-green-100">Limited Seats Open</span>
                    </span>
                  </span>
                </span>
              </button>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 mt-12">
              {/* Scrum Alliance Certification Badge */}
              <div className="flex flex-col items-center gap-3 group">
                <div className="certification-badge flex flex-col items-center gap-4 px-8 py-6 rounded-2xl hover:scale-105 transition-all duration-300">
                  <div className="relative w-20 h-20 flex items-center justify-center bg-white rounded-full p-2">
                    <Image
                      src="/images/logos/scrum-alliance.png"
                      alt="Scrum Alliance"
                      width={80}
                      height={80}
                      className="object-contain"
                    />
                  </div>
                  <div className="text-center">
                    <div className="text-xs font-semibold text-gold-300 mb-1 tracking-wider uppercase">Scrum Alliance® Certified</div>
                    <div className="text-base font-black text-white mb-2">Agile Certification</div>
                    <div className="flex items-center justify-center gap-1 text-xs text-green-400">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="font-semibold">Included with Course</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* CompTIA Certification Badge */}
              <div className="flex flex-col items-center gap-3 group">
                <div className="certification-badge flex flex-col items-center gap-4 px-8 py-6 rounded-2xl hover:scale-105 transition-all duration-300">
                  <div className="relative w-20 h-20 flex items-center justify-center">
                    <Image
                      src="/images/logos/comptia-partner.webp"
                      alt="CompTIA Authorized Partner"
                      width={80}
                      height={80}
                      className="object-contain"
                    />
                  </div>
                  <div className="text-center">
                    <div className="text-xs font-semibold text-gold-300 mb-1 tracking-wider uppercase">CompTIA® Authorized Partner</div>
                    <div className="text-base font-black text-white mb-2">2 AI Certifications</div>
                    <div className="flex items-center justify-center gap-1 text-xs text-green-400">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="font-semibold">Included with Course</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        /* Hero Logo Container */
        .hero-logo-container {
          transform-style: preserve-3d;
          will-change: transform, opacity;
        }

        .text-gradient-gold {
          display: inline-block !important;
          background: linear-gradient(135deg, #D4AF37 0%, #FFD700 25%, #D4AF37 50%, #FFD700 75%, #B8860B 100%);
          background-size: 200% 200%;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: gradient-flow 8s ease infinite;
        }

        .text-gradient-gold span {
          background: linear-gradient(135deg, #D4AF37 0%, #FFD700 25%, #D4AF37 50%, #FFD700 75%, #B8860B 100%);
          background-size: 200% 200%;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: gradient-flow 8s ease infinite;
        }

        @keyframes gradient-flow {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        /* Green Glow Animation for Job Openings */
        @keyframes pulse-glow-green {
          0%, 100% {
            text-shadow: 0 0 10px rgba(74, 222, 128, 0.7), 0 0 20px rgba(74, 222, 128, 0.5), 0 0 30px rgba(74, 222, 128, 0.3);
          }
          50% {
            text-shadow: 0 0 20px rgba(74, 222, 128, 0.9), 0 0 40px rgba(74, 222, 128, 0.7), 0 0 60px rgba(74, 222, 128, 0.5);
          }
        }

        .animate-pulse-glow-green {
          animation: pulse-glow-green 2s ease-in-out infinite;
        }

        .neumorphic-card {
          background: linear-gradient(145deg, #0f0f0f, #1a1a1a);
          box-shadow: 20px 20px 60px #0a0a0a,
                      -20px -20px 60px #1f1f1f,
                      inset 1px 1px 2px rgba(212, 175, 55, 0.1);
        }

        .neumorphic-gold {
          background: linear-gradient(145deg, #1a1612, #0f0d0a);
          box-shadow: 8px 8px 16px #0a0907,
                      -8px -8px 16px #1f1b17,
                      inset 1px 1px 2px rgba(212, 175, 55, 0.2);
        }

        .neumorphic-gold-card {
          background: linear-gradient(145deg, #1a1612, #0f0d0a);
          box-shadow: 20px 20px 60px #0a0907,
                      -20px -20px 60px #1f1b17,
                      inset 2px 2px 5px rgba(212, 175, 55, 0.2);
          border: 1px solid rgba(212, 175, 55, 0.1);
        }

        .neumorphic-dark {
          background: linear-gradient(145deg, #0a0a0a, #1a1a1a);
          box-shadow: inset 5px 5px 10px #050505,
                      inset -5px -5px 10px #1f1f1f;
        }

        .glassmorphism {
          background: rgba(26, 22, 18, 0.7);
          backdrop-filter: blur(20px) saturate(180%);
          -webkit-backdrop-filter: blur(20px) saturate(180%);
          border: 1px solid rgba(212, 175, 55, 0.2);
        }

        .bg-gold-400 { background-color: #D4AF37; }
        .bg-gold-500 { background-color: #B8860B; }
        .bg-gold-600 { background-color: #996515; }
        .text-gold-200 { color: #F4E4BC; }
        .text-gold-300 { color: #E6D492; }
        .text-gold-400 { color: #D4AF37; }
        .text-gold-500 { color: #B8860B; }
        .text-gold-600 { color: #996515; }
        .border-gold-500\/10 { border-color: rgba(184, 134, 11, 0.1); }
        .border-gold-500\/20 { border-color: rgba(184, 134, 11, 0.2); }
        .border-gold-500\/30 { border-color: rgba(184, 134, 11, 0.3); }
        .border-gold-500\/50 { border-color: rgba(184, 134, 11, 0.5); }
        .from-gold-500 { --tw-gradient-from: #B8860B; }
        .to-gold-600 { --tw-gradient-to: #996515; }
        .from-gold-600 { --tw-gradient-from: #996515; }
        .to-gold-500 { --tw-gradient-to: #B8860B; }

        /* Initial hidden state for scroll animations */
        .gsap-hidden {
          opacity: 0;
        }

        /* 3D Card Tilt Effect */
        .card-3d-container {
          transform-style: preserve-3d;
        }

        .card-3d-inner {
          transform-style: preserve-3d;
          transition: transform 0.3s ease-out;
          will-change: transform;
        }

        .card-3d-inner > * {
          transform: translateZ(30px);
        }

        /* Scramble Heading Hover Effect */
        .scramble-heading {
          cursor: pointer;
          transition: transform 0.2s ease;
        }

        .scramble-heading:hover {
          transform: scale(1.02);
        }

        /* Scroll Progress Indicator */
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
          background: linear-gradient(90deg, #D4AF37 0%, #FFD700 50%, #B8860B 100%);
          box-shadow: 0 0 10px #D4AF37, 0 0 20px #FFD700;
        }

        /* Loading Screen */
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

        .loading-logo {
          margin-bottom: 2rem;
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

        /* Loading Logo Animations */
        .animate-pulse-slow {
          animation: pulse-slow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        @keyframes pulse-slow {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.05);
          }
        }

        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }

        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .border-t-gold-400 {
          border-top-color: #D4AF37;
        }

        .border-r-gold-500 {
          border-right-color: #B8860B;
        }

        /* Beautiful 3D Black Friday Button with Reliable Clicks */
        .black-friday-3d-button {
          /* 3D Depth - Layered shadows for realistic elevation (red/orange theme) */
          box-shadow:
            0 1px 0 0 rgba(255, 128, 0, 0.8),        /* Top highlight (orange) */
            0 2px 0 0 rgba(239, 68, 68, 0.9),        /* Upper depth (red) */
            0 4px 0 0 rgba(220, 38, 38, 0.8),        /* Middle depth */
            0 6px 0 0 rgba(180, 25, 25, 0.7),        /* Lower depth */
            0 8px 15px rgba(0, 0, 0, 0.3),           /* Elevation shadow */
            0 0 25px rgba(249, 115, 22, 0.35);       /* Subtle glow */

          transform: translateY(0px);
          transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
          will-change: transform, box-shadow;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
        }

        /* Hover State - Lift the button */
        .black-friday-3d-button:hover {
          transform: translateY(-2px);
          box-shadow:
            0 1px 0 0 rgba(255, 128, 0, 0.9),
            0 3px 0 0 rgba(239, 68, 68, 1),
            0 5px 0 0 rgba(220, 38, 38, 0.9),
            0 7px 0 0 rgba(180, 25, 25, 0.8),
            0 10px 20px rgba(0, 0, 0, 0.4),
            0 0 35px rgba(249, 115, 22, 0.5),
            0 0 60px rgba(239, 68, 68, 0.3);
        }

        /* Active/Click State - Press down with satisfying feedback */
        .black-friday-3d-button:active {
          transform: translateY(4px);
          box-shadow:
            0 0px 0 0 rgba(255, 128, 0, 0.6),
            0 1px 0 0 rgba(239, 68, 68, 0.7),
            0 2px 0 0 rgba(220, 38, 38, 0.6),
            0 3px 5px rgba(0, 0, 0, 0.2),
            0 0 15px rgba(249, 115, 22, 0.4);
          transition: all 0.1s cubic-bezier(0.4, 0, 0.6, 1);
        }

        /* Subtle pulse animation for urgency */
        @keyframes fire-pulse {
          0%, 100% {
            filter: brightness(1);
          }
          50% {
            filter: brightness(1.1);
          }
        }

        .black-friday-3d-button {
          animation: fire-pulse 2.5s ease-in-out infinite;
        }

        /* Focus state for accessibility */
        .black-friday-3d-button:focus-visible {
          outline: 3px solid rgba(249, 115, 22, 0.6);
          outline-offset: 2px;
        }

        /* Active Blink Animation */
        .active-blink {
          animation: active-blink 1.5s ease-in-out infinite;
        }

        @keyframes active-blink {
          0%, 100% {
            opacity: 1;
            box-shadow: 0 0 8px rgba(74, 222, 128, 0.8);
          }
          50% {
            opacity: 0.4;
            box-shadow: 0 0 4px rgba(74, 222, 128, 0.4);
          }
        }

        /* Certification Badge Styling */
        .certification-badge {
          background: linear-gradient(145deg, #1a1a1a, #0f0f0f);
          border: 2px solid rgba(212, 175, 55, 0.3);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5),
                      0 4px 16px rgba(212, 175, 55, 0.1),
                      inset 0 1px 0 rgba(255, 255, 255, 0.05);
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
          background: radial-gradient(circle, rgba(212, 175, 55, 0.05) 0%, transparent 70%);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .certification-badge:hover {
          transform: translateY(-8px) scale(1.02);
          border-color: rgba(212, 175, 55, 0.6);
          box-shadow: 0 16px 48px rgba(0, 0, 0, 0.6),
                      0 8px 24px rgba(212, 175, 55, 0.3),
                      inset 0 1px 0 rgba(255, 255, 255, 0.1);
        }

        .certification-badge:hover::before {
          opacity: 1;
        }

        /* Hero Button - Course Overview with 8 Depth Layers (White Glow) */
        .hero-course-overview-btn {
          /* 8 shadow layers for maximum 3D depth */
          box-shadow:
            0 1px 0 0 rgba(255, 255, 255, 0.9),      /* Layer 1: Top highlight - WHITE */
            0 2px 0 0 rgba(240, 240, 240, 1),        /* Layer 2: Upper edge - LIGHT GRAY */
            0 3px 0 0 rgba(230, 230, 230, 0.95),     /* Layer 3 - LIGHTER GRAY */
            0 4px 0 0 rgba(200, 200, 200, 0.9),      /* Layer 4: Mid - GRAY */
            0 6px 0 0 rgba(180, 180, 180, 0.85),     /* Layer 5 - GRAY */
            0 8px 0 0 rgba(150, 150, 150, 0.8),      /* Layer 6 - DARKER GRAY */
            0 10px 0 0 rgba(120, 120, 120, 0.7),     /* Layer 7: Lower depth - DARKER GRAY */
            0 12px 20px rgba(0, 0, 0, 0.4),          /* Layer 8: Base shadow */
            0 0 30px rgba(255, 255, 255, 0.6);       /* Glow effect - WHITE GLOW */

          transform: translateY(0px);
          transition: all 0.12s cubic-bezier(0.4, 0, 0.2, 1);
          will-change: transform, box-shadow;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        }

        .hero-course-overview-btn:hover {
          transform: translateY(-4px);
          box-shadow:
            0 1px 0 0 rgba(255, 255, 255, 1),
            0 3px 0 0 rgba(240, 240, 240, 1),
            0 5px 0 0 rgba(230, 230, 230, 0.95),
            0 7px 0 0 rgba(200, 200, 200, 0.95),
            0 10px 0 0 rgba(180, 180, 180, 0.9),
            0 13px 0 0 rgba(150, 150, 150, 0.85),
            0 16px 0 0 rgba(120, 120, 120, 0.75),
            0 18px 30px rgba(0, 0, 0, 0.5),
            0 0 40px rgba(255, 255, 255, 0.8),
            0 0 60px rgba(255, 255, 255, 0.5);
        }

        .hero-course-overview-btn:active {
          transform: translateY(8px);
          box-shadow:
            inset 0 3px 6px rgba(0, 0, 0, 0.4),
            inset 0 2px 4px rgba(0, 0, 0, 0.5),
            0 1px 2px rgba(0, 0, 0, 0.2),
            0 0 15px rgba(255, 255, 255, 0.5);
          transition: all 0.08s cubic-bezier(0.4, 0, 0.6, 1);
        }

        .hero-course-overview-btn {
          animation: subtle-glow-pulse 3s ease-in-out infinite;
        }

        .hero-course-overview-btn:focus-visible {
          outline: 3px solid rgba(255, 255, 255, 0.6);
          outline-offset: 2px;
        }

        /* Hero Button - Reserve Your Seat with 8 Depth Layers (GREEN Theme) */
        .hero-reserve-seat-btn {
          /* 8 shadow layers for maximum 3D depth - GREEN */
          box-shadow:
            0 1px 0 0 rgba(34, 197, 94, 0.9),        /* Layer 1: Green-500 highlight */
            0 2px 0 0 rgba(22, 163, 74, 1),          /* Layer 2: Green-600 */
            0 3px 0 0 rgba(22, 163, 74, 0.95),       /* Layer 3: Green-600 */
            0 4px 0 0 rgba(21, 128, 61, 0.9),        /* Layer 4: Green-700 */
            0 6px 0 0 rgba(21, 128, 61, 0.85),       /* Layer 5: Green-700 */
            0 8px 0 0 rgba(20, 83, 45, 0.8),         /* Layer 6: Green-800 */
            0 10px 0 0 rgba(15, 60, 35, 0.7),        /* Layer 7: Dark green */
            0 12px 20px rgba(0, 0, 0, 0.4),          /* Layer 8: Base shadow */
            0 0 30px rgba(22, 163, 74, 0.35);        /* Glow effect - GREEN */

          transform: translateY(0px);
          transition: all 0.12s cubic-bezier(0.4, 0, 0.2, 1);
          will-change: transform, box-shadow;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        }

        .hero-reserve-seat-btn:hover {
          transform: translateY(-4px);
          box-shadow:
            0 1px 0 0 rgba(34, 197, 94, 1),
            0 3px 0 0 rgba(22, 163, 74, 1),
            0 5px 0 0 rgba(22, 163, 74, 0.95),
            0 7px 0 0 rgba(21, 128, 61, 0.95),
            0 10px 0 0 rgba(21, 128, 61, 0.9),
            0 13px 0 0 rgba(20, 83, 45, 0.85),
            0 16px 0 0 rgba(15, 60, 35, 0.75),
            0 18px 30px rgba(0, 0, 0, 0.5),
            0 0 40px rgba(22, 163, 74, 1),      /* Intense green glow - inner */
            0 0 60px rgba(34, 197, 94, 0.8);    /* Bright green glow - outer */
        }

        .hero-reserve-seat-btn:active {
          transform: translateY(8px);
          box-shadow:
            inset 0 3px 6px rgba(0, 0, 0, 0.4),
            inset 0 2px 4px rgba(0, 0, 0, 0.5),
            0 1px 2px rgba(0, 0, 0, 0.2),
            0 0 15px rgba(22, 163, 74, 0.4);
          transition: all 0.08s cubic-bezier(0.4, 0, 0.6, 1);
        }

        .hero-reserve-seat-btn {
          animation: reserve-glow-pulse 2s ease-in-out infinite;
        }

        .hero-reserve-seat-btn:focus-visible {
          outline: 3px solid rgba(22, 163, 74, 0.6);
          outline-offset: 2px;
        }

        /* Pulsing Brightness Animation for Reserve Button - Same as Course Overview */
        @keyframes reserve-glow-pulse {
          0%, 100% {
            filter: brightness(1);
          }
          50% {
            filter: brightness(1.08);
          }
        }

        /* Subtle pulse animation for attention */
        @keyframes subtle-glow-pulse {
          0%, 100% {
            filter: brightness(1);
          }
          50% {
            filter: brightness(1.08);
          }
        }


      `}</style>

      {/* Video Modal */}
      {showVideoModal && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/95 backdrop-blur-sm animate-fade-in"
          onClick={() => setShowVideoModal(false)}
        >
          {/* Modal Content */}
          <div
            className="relative w-full max-w-4xl animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setShowVideoModal(false)}
              className="absolute -top-12 right-0 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center transition-all duration-300 hover:scale-110"
              aria-label="Close video"
            >
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Video Container (16:9 aspect ratio) */}
            <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl border border-gold-500/30 bg-gradient-to-br from-gray-900 to-black" style={{ aspectRatio: '16/9' }}>
              <iframe
                src="https://www.youtube.com/embed/KHqrUvU9I1k?autoplay=1&rel=0&modestbranding=1"
                title="Course Overview - Mentor Agile Product Manager Training"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            </div>

            {/* Video Title */}
            <div className="mt-4 text-center">
              <h3 className="text-xl font-bold text-white">Course Overview</h3>
              <p className="text-gray-300 mt-1">Learn what you'll master in our comprehensive Product Manager training</p>
            </div>
          </div>
        </div>
      )}

      {/* Social Media Footer */}
      <SocialFooter />

      {/* Path Selection Modal */}
      <PathSelectionModal
        isOpen={showPathSelectionModal}
        onClose={handleClosePathSelection}
        onSelectBlackFriday={handleSelectBlackFriday}
        onSelectStateFunded={handleSelectStateFunded}
      />

      {/* Pick Your Path Modal */}
      <PickYourPathModal
        isOpen={showPickYourPathModal}
        onClose={handleClosePickYourPath}
      />

      {/* State Funded Modal */}
      <StateFundedModal
        isOpen={showStateFundedModal}
        onClose={handleCloseStateFunded}
      />

      {/* Tech Salary Popup - BA/PO/PM Specific */}
      <TechSalaryPopup
        isOpen={showSalaryPopup}
        onClose={() => setShowSalaryPopup(false)}
      />
    </div>
  );
}
'use client';

import React, { useState, useEffect, Suspense, lazy } from 'react';
import { BREAKPOINTS, CONFIG } from './constants';

// Lazy load the heavy 3D scene
const HexCoinsScene = lazy(() => import('./HexCoinsScene'));

// Loading placeholder with gold gradient animation
function LoadingPlaceholder() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="relative">
        {/* Animated gold ring */}
        <div
          className="w-24 h-24 rounded-full animate-pulse"
          style={{ border: '4px solid rgba(255, 210, 147, 0.3)' }}
        />
        <div
          className="absolute inset-0 w-24 h-24 rounded-full animate-spin"
          style={{
            borderWidth: '4px',
            borderStyle: 'solid',
            borderColor: `${CONFIG.colors.goldBright} transparent transparent transparent`,
            animationDuration: '1.5s',
          }}
        />
        {/* Center coin icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="w-12 h-12 animate-pulse"
            style={{
              background: `radial-gradient(ellipse at 35% 30%, ${CONFIG.colors.goldBright}90, ${CONFIG.colors.goldBase}00 50%),
                           radial-gradient(ellipse at 50% 50%, ${CONFIG.colors.goldBase}, ${CONFIG.colors.goldMid} 40%, ${CONFIG.colors.goldDark} 80%, ${CONFIG.colors.goldDeep})`,
              borderRadius: '50%',
              boxShadow: `inset 5px -5px 15px ${CONFIG.colors.goldDeep}80, inset -5px 5px 15px ${CONFIG.colors.goldBright}66`,
            }}
          />
        </div>
      </div>
    </div>
  );
}

// Check for reduced motion preference
function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  return prefersReducedMotion;
}

// Mobile detection hook
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < BREAKPOINTS.mobile);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return isMobile;
}

export default function HexCoins({ className = '' }) {
  const [isClient, setIsClient] = useState(false);
  const [hasWebGL, setHasWebGL] = useState(true);
  const isMobile = useIsMobile();
  const prefersReducedMotion = usePrefersReducedMotion();

  // Client-side only rendering
  useEffect(() => {
    setIsClient(true);

    // Check WebGL support
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl2') || canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) {
        setHasWebGL(false);
      }
    } catch (e) {
      setHasWebGL(false);
    }
  }, []);

  // Don't render on server or if WebGL not supported
  if (!isClient || !hasWebGL) {
    return (
      <div className={`relative ${className}`} aria-hidden="true">
        <LoadingPlaceholder />
      </div>
    );
  }

  // Reduced motion fallback - show static gold coins
  if (prefersReducedMotion) {
    return (
      <div className={`relative ${className}`} aria-hidden="true">
        <div className="w-full h-full flex items-center justify-center">
          <div className="flex gap-2">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="w-12 h-12"
                style={{
                  background: `radial-gradient(ellipse at 35% 30%, ${CONFIG.colors.goldBright}90, transparent 50%),
                               radial-gradient(ellipse at 50% 50%, ${CONFIG.colors.goldBase}, ${CONFIG.colors.goldMid} 40%, ${CONFIG.colors.goldDark} 80%, ${CONFIG.colors.goldDeep})`,
                  borderRadius: '50%',
                  transform: `rotate(${i * 15}deg)`,
                  boxShadow: `inset 5px -5px 15px ${CONFIG.colors.goldDeep}80,
                              inset -5px 5px 15px ${CONFIG.colors.goldBright}66,
                              0 10px 30px ${CONFIG.colors.goldBright}4d`,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`} aria-hidden="true">
      <Suspense fallback={<LoadingPlaceholder />}>
        <HexCoinsScene
          isMobile={isMobile}
          enablePostProcessing={!isMobile}
        />
      </Suspense>
    </div>
  );
}

'use client';

import React, { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import gsap from 'gsap';
import * as THREE from 'three';
import { CONFIG, TEXTURE_PATHS } from './constants';

// Single Coin component with exact Tensor geometry
function Coin({ index, progressRef, groupRef }) {
  const meshRef = useRef();

  // Load PBR textures
  const textures = useTexture({
    map: TEXTURE_PATHS.baseColor,
    roughnessMap: TEXTURE_PATHS.roughness,
    metalnessMap: TEXTURE_PATHS.metalness,
    normalMap: TEXTURE_PATHS.normal,
    aoMap: TEXTURE_PATHS.ao,
  });

  // Create hexagonal geometry with exact Tensor implementation
  const geometry = useMemo(() => {
    const geo = new THREE.CylinderGeometry(1, 1, 0.12, 6, 8);
    geo.rotateY(Math.PI / 6); // 30° so point faces up (not flat edge)

    const positions = geo.attributes.position;

    for (let i = 0; i < positions.count; i++) {
      const y = positions.getY(i);
      const x = positions.getX(i);
      const z = positions.getZ(i);

      // Bevel on top/bottom edges
      if (Math.abs(y) > 0.05) {
        const scale = 0.98 - Math.abs(y) * 0.15;
        positions.setX(i, x * scale);
        positions.setZ(i, z * scale);
      }

      // Reeded edge ridges (120 ridges)
      if (Math.abs(y) < 0.06) {
        const angle = Math.atan2(z, x);
        const ridgeOffset = Math.sin(angle * CONFIG.ridgeCount) * CONFIG.ridgeDepth;
        const ridgeScale = 1.0 + ridgeOffset;
        positions.setX(i, x * ridgeScale);
        positions.setZ(i, z * ridgeScale);
      }
    }

    geo.setAttribute('uv2', geo.attributes.uv.clone());
    geo.computeVertexNormals();
    return geo;
  }, []);

  // Create MeshPhysicalMaterial with exact Tensor properties
  const material = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      map: textures.map,
      roughnessMap: textures.roughnessMap,
      metalnessMap: textures.metalnessMap,
      normalMap: textures.normalMap,
      aoMap: textures.aoMap,
      color: new THREE.Color('#FFFFFF'),
      metalness: CONFIG.materials.metalness,
      roughness: 0.12,
      envMapIntensity: 1.1,
      clearcoat: CONFIG.materials.clearcoat,
      clearcoatRoughness: CONFIG.materials.clearcoatRoughness,
      reflectivity: CONFIG.materials.reflectivity,
      ior: CONFIG.materials.ior,
      emissive: new THREE.Color(CONFIG.colors.emissive),
      emissiveIntensity: 0.05,
      side: THREE.FrontSide,
      flatShading: false,
      depthWrite: true,
      depthTest: true,
    });
  }, [textures]);

  // Animation frame update with exact Tensor logic
  useFrame(() => {
    if (!meshRef.current) return;

    const globalProgress = progressRef.current.value;

    // COIN 0 IS ALWAYS STATIONARY at 3:00 position
    if (index === 0) {
      meshRef.current.position.set(CONFIG.clockRadius, 0, 0);
      meshRef.current.rotation.set(Math.PI / 6, 0, Math.PI / 3); // 30°, 0°, 60°
      meshRef.current.scale.set(1, 1, 1);
      meshRef.current.renderOrder = CONFIG.coinCount;
      return;
    }

    // COINS 1-11: Animate with slinky pattern
    const movingIndex = index - 1;
    const totalMovingCoins = 11;

    // Angular offset for even spacing (each coin ~32.7° apart)
    const angleOffset = ((movingIndex + 0.5) * (Math.PI * 2)) / totalMovingCoins;

    let angle = 0;

    // PHASE 1 (0-40%): Spread out from merged position
    if (globalProgress < 0.4) {
      const spreadProgress = globalProgress / 0.4;
      angle = spreadProgress * angleOffset;
    }
    // PHASE 2 (40-100%): Flow counter-clockwise, complete full circle
    else {
      const flowProgress = (globalProgress - 0.4) / 0.6;
      const remainingAngle = Math.PI * 2 - angleOffset;
      angle = angleOffset + flowProgress * remainingAngle;

      // Snap to merged position at end of cycle
      if (angle >= Math.PI * 2 - 0.01) {
        angle = 0;
      }
    }

    // Set position on clock circle
    meshRef.current.position.x = Math.cos(angle) * CONFIG.clockRadius;
    meshRef.current.position.y = Math.sin(angle) * CONFIG.clockRadius;

    // Z-position with layering (later coins render behind)
    const baseLift = (CONFIG.coinCount - index) * CONFIG.rainbow.epsilon;
    meshRef.current.position.z = baseLift;

    // Set rotation to match stationary coin
    meshRef.current.rotation.set(Math.PI / 6, 0, Math.PI / 3);

    // Set renderOrder for explicit control
    meshRef.current.renderOrder = CONFIG.coinCount - index;
  });

  return (
    <mesh
      ref={meshRef}
      geometry={geometry}
      material={material}
      castShadow
      receiveShadow
    />
  );
}

// Main CoinCluster component
export default function CoinCluster({ isMobile = false }) {
  const groupRef = useRef();
  const progressRef = useRef({ value: 0 });
  const tlRef = useRef(null);

  // Setup GSAP animation timeline with exact Tensor timing
  useEffect(() => {
    // Kill existing timeline
    if (tlRef.current) {
      tlRef.current.kill();
    }

    // Create continuous animation timeline
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 0 });

    tl.to(progressRef.current, {
      value: 1.0,
      duration: CONFIG.rainbow.expandDuration, // 6.5 seconds
      ease: 'none', // Linear for smooth continuous flow
    });

    tlRef.current = tl;

    return () => {
      if (tlRef.current) {
        tlRef.current.kill();
      }
    };
  }, []);

  // Apply group rotation
  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.x = (CONFIG.groupRotationX * Math.PI) / 180; // -10°
    }
  });

  // Generate coin indices (0-11 for 12 coins)
  const coinIndices = useMemo(() => {
    return Array.from({ length: CONFIG.coinCount }, (_, i) => i);
  }, []);

  return (
    <group ref={groupRef} scale={CONFIG.groupScale}>
      {coinIndices.map((index) => (
        <Coin
          key={index}
          index={index}
          progressRef={progressRef}
          groupRef={groupRef}
        />
      ))}
    </group>
  );
}

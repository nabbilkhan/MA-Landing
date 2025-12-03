'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { COIN_CONFIG, GOLD_COLORS, BASE_ROTATION } from './constants';

// Create reeded edge geometry for coin rim
function createReededEdgeGeometry(radius, thickness, ridgeCount) {
  const points = [];
  const ridgeDepth = 0.01;

  for (let i = 0; i <= ridgeCount; i++) {
    const t = i / ridgeCount;
    const y = (t - 0.5) * thickness;
    const ridgeOffset = Math.sin(t * ridgeCount * Math.PI * 2) * ridgeDepth;
    points.push(new THREE.Vector2(radius + ridgeOffset, y));
  }

  return new THREE.LatheGeometry(points, 6); // 6 for hexagonal
}

export default function Coin({
  position = [0, 0, 0],
  rotation = [BASE_ROTATION.x, BASE_ROTATION.y, BASE_ROTATION.z],
  scale = 1,
  isAnchor = false,
  animatedPosition = null,
}) {
  const meshRef = useRef();
  const materialRef = useRef();

  // Create hexagonal geometry with beveled edges
  const geometry = useMemo(() => {
    const shape = new THREE.Shape();
    const sides = 6;
    const radius = COIN_CONFIG.radius;

    // Create hexagon shape
    for (let i = 0; i < sides; i++) {
      const angle = (i / sides) * Math.PI * 2 - Math.PI / 2;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      if (i === 0) {
        shape.moveTo(x, y);
      } else {
        shape.lineTo(x, y);
      }
    }
    shape.closePath();

    // Extrude with bevel
    const extrudeSettings = {
      depth: COIN_CONFIG.thickness,
      bevelEnabled: true,
      bevelThickness: COIN_CONFIG.bevelSize,
      bevelSize: COIN_CONFIG.bevelSize,
      bevelSegments: 3,
    };

    const geo = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    geo.center();
    geo.rotateX(Math.PI / 2); // Orient flat

    return geo;
  }, []);

  // Gold PBR material
  const material = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color(GOLD_COLORS.primary),
      metalness: 0.95,
      roughness: 0.15,
      envMapIntensity: 1.5,
    });
  }, []);

  // Subtle shine animation
  useFrame((state) => {
    if (meshRef.current && !isAnchor) {
      // Very subtle breathing effect on non-anchor coins
      const t = state.clock.elapsedTime;
      meshRef.current.material.envMapIntensity = 1.5 + Math.sin(t * 0.5) * 0.2;
    }
  });

  // Use animated position if provided, otherwise static position
  const finalPosition = animatedPosition || position;

  return (
    <mesh
      ref={meshRef}
      position={finalPosition}
      rotation={rotation}
      scale={scale}
      geometry={geometry}
      material={material}
      castShadow
      receiveShadow
    />
  );
}

// Shared geometry and material for performance
export function CoinInstanced({ coins, sharedMaterial }) {
  const meshRef = useRef();

  const geometry = useMemo(() => {
    const shape = new THREE.Shape();
    const sides = 6;
    const radius = COIN_CONFIG.radius;

    for (let i = 0; i < sides; i++) {
      const angle = (i / sides) * Math.PI * 2 - Math.PI / 2;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      if (i === 0) {
        shape.moveTo(x, y);
      } else {
        shape.lineTo(x, y);
      }
    }
    shape.closePath();

    const extrudeSettings = {
      depth: COIN_CONFIG.thickness,
      bevelEnabled: true,
      bevelThickness: COIN_CONFIG.bevelSize,
      bevelSize: COIN_CONFIG.bevelSize,
      bevelSegments: 3,
    };

    const geo = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    geo.center();
    geo.rotateX(Math.PI / 2);

    return geo;
  }, []);

  return (
    <instancedMesh
      ref={meshRef}
      args={[geometry, sharedMaterial, coins.length]}
      castShadow
      receiveShadow
    >
      {coins.map((coin, i) => (
        <group key={i} position={coin.position} rotation={coin.rotation} scale={coin.scale} />
      ))}
    </instancedMesh>
  );
}

'use client';

import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, PerspectiveCamera } from '@react-three/drei';
import { EffectComposer, Bloom, DepthOfField } from '@react-three/postprocessing';
import * as THREE from 'three';
import CoinCluster from './CoinCluster';
import { CONFIG, LIGHTS_CONFIG, POST_PROCESSING } from './constants';

// Exact Tensor lighting setup
function Lighting() {
  return (
    <>
      {/* Ambient light */}
      <ambientLight
        intensity={LIGHTS_CONFIG.ambient.intensity}
        color={LIGHTS_CONFIG.ambient.color}
      />

      {/* Key light with high-resolution shadows */}
      <directionalLight
        position={LIGHTS_CONFIG.key.position}
        intensity={LIGHTS_CONFIG.key.intensity}
        color={LIGHTS_CONFIG.key.color}
        castShadow
        shadow-mapSize={[LIGHTS_CONFIG.key.shadowMapSize, LIGHTS_CONFIG.key.shadowMapSize]}
        shadow-bias={-0.0001}
        shadow-normalBias={0.02}
        shadow-radius={5}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />

      {/* Fill light (cool, from left) */}
      <directionalLight
        position={LIGHTS_CONFIG.fill.position}
        intensity={LIGHTS_CONFIG.fill.intensity}
        color={LIGHTS_CONFIG.fill.color}
      />

      {/* Rim/back light (golden edge definition) */}
      <directionalLight
        position={LIGHTS_CONFIG.rim.position}
        intensity={LIGHTS_CONFIG.rim.intensity}
        color={LIGHTS_CONFIG.rim.color}
      />

      {/* Point lights around the clock circle */}
      {LIGHTS_CONFIG.points.map((light, i) => (
        <pointLight
          key={i}
          position={light.position}
          intensity={light.intensity}
          color={light.color}
          distance={light.distance}
          decay={light.decay}
        />
      ))}
    </>
  );
}

// Post-processing effects with exact Tensor settings
function Effects({ enabled = true, isMobile = false }) {
  if (!enabled || isMobile) return null;

  return (
    <EffectComposer multisampling={8}>
      {/* Bloom for gold glow */}
      <Bloom
        intensity={POST_PROCESSING.bloom.intensity}
        luminanceThreshold={POST_PROCESSING.bloom.luminanceThreshold}
        luminanceSmoothing={POST_PROCESSING.bloom.luminanceSmoothing}
        radius={POST_PROCESSING.bloom.radius}
        mipmapBlur
      />

      {/* Cinematic depth of field */}
      <DepthOfField
        focusDistance={POST_PROCESSING.depthOfField.focusDistance}
        focalLength={POST_PROCESSING.depthOfField.focalLength}
        bokehScale={POST_PROCESSING.depthOfField.bokehScale}
        height={POST_PROCESSING.depthOfField.height}
      />
    </EffectComposer>
  );
}

// Loading fallback
function LoadingFallback() {
  return (
    <mesh>
      <cylinderGeometry args={[1, 1, 0.12, 6]} />
      <meshBasicMaterial color={CONFIG.colors.goldBright} wireframe />
    </mesh>
  );
}

export default function HexCoinsScene({
  isMobile = false,
  enablePostProcessing = true,
}) {
  return (
    <Canvas
      camera={{
        position: [0, 0.8, CONFIG.cameraPositionZ],
        fov: CONFIG.cameraFov,
        near: 0.5,
        far: 50,
      }}
      onCreated={({ camera }) => {
        // Apply exact Tensor camera tilt
        camera.rotation.x = (CONFIG.cameraTiltDegrees * Math.PI) / 180;
      }}
      gl={{
        antialias: true,
        alpha: true,
        depth: true,
        stencil: false,
        logarithmicDepthBuffer: true,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.2,
        outputColorSpace: THREE.SRGBColorSpace,
      }}
      shadows={{
        type: THREE.PCFSoftShadowMap,
        enabled: true,
      }}
      dpr={isMobile ? [1, 1.5] : [1, 2]}
      style={{
        background: 'transparent',
        touchAction: 'none',
      }}
      aria-hidden="true"
    >
      <Suspense fallback={<LoadingFallback />}>
        {/* HDRI Environment for reflections */}
        <Environment
          preset="sunset"
          background={false}
          environmentIntensity={2.5}
          environmentRotation={[0, Math.PI / 4, 0]}
        />

        {/* Lighting */}
        <Lighting />

        {/* Coin cluster */}
        <CoinCluster isMobile={isMobile} />

        {/* Post-processing effects */}
        <Effects enabled={enablePostProcessing} isMobile={isMobile} />
      </Suspense>
    </Canvas>
  );
}

// Exact CONFIG from Tensor Website DiskStack3D.tsx

export const CONFIG = {
  loopSeconds: 10.0,
  coinCount: 12,                    // 1 stationary + 11 moving coins
  clockRadius: 3.5,                 // Radius of clock circle
  stackOrbitDegreesPerLoop: 30,
  coinLocalSpinDegrees: 6,
  breathAmplitude: 0.05,            // Buoyancy effect
  breathSeconds: 4.0,
  ridgeCount: 120,                  // Reeded edge ridges
  ridgeDepth: 0.02,
  cameraFov: 50,
  cameraPositionZ: 8,
  cameraTiltDegrees: -5,
  groupRotationX: -10,
  groupScale: 1.0,
  materials: {
    roughness: 0.08,
    metalness: 1.0,
    envMapIntensity: 2.5,
    clearcoat: 0.2,
    clearcoatRoughness: 0.1,
    ior: 1.35,                      // Gold's IOR
    reflectivity: 1.0
  },
  colors: {
    goldBase: '#FFD293',
    goldBright: '#FFD700',
    goldMid: '#FFC125',
    goldDark: '#CD9B1D',
    goldDeep: '#8B7355',
    emissive: '#FED93D',
    emissiveIntensity: 0.1
  },
  rainbow: {
    expandDuration: 6.5,            // Slinky expand time
    holdExpandedDuration: 2.0,
    collapseDuration: 8.0,          // Slinky collapse time
    holdCollapsedDuration: 1.0,
    staggerDelay: 0.0,              // Synchronized animation
    epsilon: 0.02                   // Z-offset for layering
  }
};

// Texture paths
export const TEXTURE_PATHS = {
  baseColor: '/textures/gold/BaseColor.jpg',
  roughness: '/textures/gold/Roughness.png',
  metalness: '/textures/gold/Metallic.jpg',
  normal: '/textures/gold/NormalGL.png',
  ao: '/textures/gold/AO.jpg',
};

// Lighting configuration
export const LIGHTS_CONFIG = {
  ambient: {
    intensity: 0.5,
    color: '#fff5e6',
  },
  key: {
    position: [5, 5, 5],
    intensity: 2.0,
    color: '#fff5e6',
    shadowMapSize: 8192,
  },
  fill: {
    position: [-3, 2, 3],
    intensity: 0.6,
    color: '#b0c4de',
  },
  rim: {
    position: [0, -2, -4],
    intensity: 1.5,
    color: '#FFD700',
  },
  points: [
    { position: [4, 0, 2], intensity: 1.2, color: '#fff5e6', distance: 12, decay: 2 },
    { position: [-4, 0, 2], intensity: 1.2, color: '#fff5e6', distance: 12, decay: 2 },
    { position: [0, 4, 2], intensity: 1.2, color: '#fff5e6', distance: 12, decay: 2 },
    { position: [0, -4, 2], intensity: 1.2, color: '#fff5e6', distance: 12, decay: 2 },
  ],
};

// Post-processing settings
export const POST_PROCESSING = {
  bloom: {
    intensity: 0.6,
    luminanceThreshold: 0.7,
    luminanceSmoothing: 0.9,
    radius: 0.5,
  },
  depthOfField: {
    focusDistance: 0.015,
    focalLength: 0.06,
    bokehScale: 3,
    height: 720,
  },
};

// Mobile breakpoint
export const BREAKPOINTS = {
  mobile: 768,
};

export default CONFIG;

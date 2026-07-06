"use client";

import { useMemo, useRef } from "react";
import { Sparkles, Stars } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const atmosphereVertexShader = /* glsl */ `
  varying vec3 vNormal;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const atmosphereFragmentShader = /* glsl */ `
  varying vec3 vNormal;
  uniform vec3 glowColor;
  void main() {
    float rim = pow(0.58 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.4);
    gl_FragColor = vec4(glowColor, rim * 1.0);
  }
`;

const skyVertexShader = /* glsl */ `
  varying vec3 vDir;
  void main() {
    vec4 worldPos = modelMatrix * vec4(position, 1.0);
    vDir = normalize(worldPos.xyz);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const skyFragmentShader = /* glsl */ `
  varying vec3 vDir;
  uniform float uTime;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }

  float starField(vec3 dir, float density, float size) {
    vec2 uv = dir.xy / (dir.z + 1.2);
    vec2 p = floor(uv * density);
    vec2 f = fract(uv * density);
    float h = hash(p);
    float star = smoothstep(size, 0.0, length(f - vec2(h, fract(h * 7.13))));
    return star * h;
  }

  void main() {
    vec3 dir = normalize(vDir);

    vec3 deep = vec3(0.004, 0.004, 0.008);
    vec3 col = deep;

    float milky = exp(-pow((dir.y - 0.15) * 2.8, 2.0));
    col += vec3(0.06, 0.04, 0.08) * milky * 0.35;
    col += vec3(0.03, 0.03, 0.05) * milky * 0.25;

    float galaxy2 = exp(-pow((dir.x + 0.55) * 4.0, 2.0) - pow((dir.y - 0.35) * 3.0, 2.0));
    col += vec3(0.08, 0.05, 0.07) * galaxy2 * 0.28;

    float s1 = starField(dir, 180.0, 0.12);
    float s2 = starField(dir, 320.0, 0.08);
    float s3 = starField(dir, 90.0, 0.18);
    float stars = s1 * 0.5 + s2 * 0.35 + s3 * 0.7;

    vec3 starCol = mix(vec3(0.85, 0.88, 0.92), vec3(0.95, 0.9, 0.82), hash(dir.xy * 40.0));
    col += starCol * stars * 0.75;

    float pulse = sin(uTime * 0.4 + hash(dir.xy * 8.0) * 6.28) * 0.5 + 0.5;
    col += starCol * s3 * pulse * 0.08;

    gl_FragColor = vec4(col, 1.0);
  }
`;

const nebulaVertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const nebulaFragmentShader = /* glsl */ `
  varying vec2 vUv;
  uniform float uTime;
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  uniform float uIntensity;

  float noise(vec2 p) {
    return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
  }

  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 4; i++) {
      v += a * noise(p);
      p *= 2.1;
      a *= 0.5;
    }
    return v;
  }

  void main() {
    vec2 uv = vUv - 0.5;
    float t = uTime * 0.04;
    float n = fbm(uv * 3.5 + vec2(t, -t * 0.7));
    float n2 = fbm(uv * 2.2 - vec2(t * 0.5, t * 0.3) + 4.0);
    float dist = length(uv * vec2(1.0, 0.65));
    float shape = smoothstep(0.85, 0.1, dist);
    float alpha = shape * (n * 0.55 + n2 * 0.45) * uIntensity;
    vec3 col = mix(uColorA, uColorB, n2);
    gl_FragColor = vec4(col, alpha);
  }
`;

function FlyCamera({ lowPower }: { lowPower: boolean }) {
  const { camera } = useThree();
  const progress = useRef(0);

  useFrame((state, delta) => {
    const speed = lowPower ? 0.04 : 0.07;
    progress.current = Math.min(progress.current + delta * speed, 1);

    const ease = 1 - Math.pow(1 - progress.current, 3);
    const z = THREE.MathUtils.lerp(9.5, 4.2, ease);
    const t = state.clock.elapsedTime;

    camera.position.set(
      Math.sin(t * 0.14) * 0.22,
      Math.cos(t * 0.11) * 0.1 - 0.05,
      z,
    );
    camera.lookAt(0, -1.8, -6);
    camera.updateProjectionMatrix();
  });

  return null;
}

function CosmicSky() {
  const mat = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: skyVertexShader,
        fragmentShader: skyFragmentShader,
        uniforms: { uTime: { value: 0 } },
        side: THREE.BackSide,
        depthWrite: false,
      }),
    [],
  );

  useFrame((state) => {
    mat.uniforms.uTime.value = state.clock.elapsedTime;
  });

  return (
    <mesh scale={90} material={mat}>
      <sphereGeometry args={[1, 64, 64]} />
    </mesh>
  );
}

function Nebula({
  position,
  rotation,
  scale,
  colorA,
  colorB,
  intensity,
}: {
  position: [number, number, number];
  rotation: [number, number, number];
  scale: [number, number, number];
  colorA: string;
  colorB: string;
  intensity: number;
}) {
  const mat = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: nebulaVertexShader,
        fragmentShader: nebulaFragmentShader,
        uniforms: {
          uTime: { value: 0 },
          uColorA: { value: new THREE.Color(colorA) },
          uColorB: { value: new THREE.Color(colorB) },
          uIntensity: { value: intensity },
        },
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    [colorA, colorB, intensity],
  );

  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    mat.uniforms.uTime.value = state.clock.elapsedTime;
    if (ref.current) ref.current.rotation.z += 0.00015;
  });

  return (
    <mesh ref={ref} position={position} rotation={rotation} scale={scale} material={mat}>
      <planeGeometry args={[1, 1]} />
    </mesh>
  );
}

function NebulaField({ lowPower }: { lowPower: boolean }) {
  if (lowPower) {
    return (
      <Nebula
        position={[-4, 2, -28]}
        rotation={[0, 0.4, 0.2]}
        scale={[22, 14, 1]}
        colorA="#08060e"
        colorB="#141018"
        intensity={0.22}
      />
    );
  }

  return (
    <>
      <Nebula
        position={[-6, 3, -32]}
        rotation={[0, 0.5, 0.15]}
        scale={[28, 18, 1]}
        colorA="#0a0810"
        colorB="#18121f"
        intensity={0.28}
      />
      <Nebula
        position={[7, 1.5, -38]}
        rotation={[0, -0.3, -0.25]}
        scale={[24, 16, 1]}
        colorA="#0c080c"
        colorB="#1a1018"
        intensity={0.2}
      />
      <Nebula
        position={[0, -2, -45]}
        rotation={[0.1, 0, 0]}
        scale={[35, 10, 1]}
        colorA="#050508"
        colorB="#12101a"
        intensity={0.15}
      />
    </>
  );
}

function DistantStars({ count }: { count: number }) {
  const ref = useRef<THREE.Points>(null);

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const palette = [
      new THREE.Color("#ffffff"),
      new THREE.Color("#d4d4d8"),
      new THREE.Color("#e8e0d4"),
      new THREE.Color("#a1a1aa"),
    ];

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      pos[i3] = (Math.random() - 0.5) * 90;
      pos[i3 + 1] = (Math.random() - 0.5) * 55;
      pos[i3 + 2] = -18 - Math.random() * 55;

      const c = palette[Math.floor(Math.random() * palette.length)];
      col[i3] = c.r;
      col[i3 + 1] = c.g;
      col[i3 + 2] = c.b;
    }
    return [pos, col];
  }, [count]);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.z = state.clock.elapsedTime * 0.0015;
      ref.current.position.z = Math.sin(state.clock.elapsedTime * 0.05) * 0.3;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.12}
        vertexColors
        transparent
        opacity={0.92}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function StarField({ lowPower }: { lowPower: boolean }) {
  return (
    <>
      <Stars
        radius={140}
        depth={80}
        count={lowPower ? 1800 : 4000}
        factor={2.2}
        saturation={0.15}
        fade
        speed={lowPower ? 0.35 : 0.55}
      />
      <Stars
        radius={90}
        depth={45}
        count={lowPower ? 1200 : 2800}
        factor={4.5}
        saturation={0}
        fade
        speed={lowPower ? 0.8 : 1.25}
      />
      <Stars
        radius={55}
        depth={30}
        count={lowPower ? 400 : 900}
        factor={6.5}
        saturation={0}
        fade
        speed={lowPower ? 1.2 : 1.8}
      />
      <DistantStars count={lowPower ? 600 : 1400} />
      {!lowPower && (
        <>
          <Sparkles
            count={120}
            scale={[30, 18, 24]}
            size={2.8}
            speed={0.25}
            opacity={0.25}
            color="#a1a1aa"
          />
          <Sparkles
            count={60}
            scale={[18, 10, 14]}
            size={4}
            speed={0.15}
            opacity={0.12}
            color="#71717a"
          />
        </>
      )}
    </>
  );
}

function Planet() {
  const planetRef = useRef<THREE.Mesh>(null);
  const cloudsRef = useRef<THREE.Mesh>(null);
  const atmosphereMat = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: atmosphereVertexShader,
        fragmentShader: atmosphereFragmentShader,
        uniforms: {
          glowColor: { value: new THREE.Color("#a1a1aa") },
        },
        transparent: true,
        blending: THREE.AdditiveBlending,
        side: THREE.BackSide,
        depthWrite: false,
      }),
    [],
  );

  const sunGlowMat = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: atmosphereVertexShader,
        fragmentShader: atmosphereFragmentShader,
        uniforms: {
          glowColor: { value: new THREE.Color("#d4c4a8") },
        },
        transparent: true,
        blending: THREE.AdditiveBlending,
        side: THREE.FrontSide,
        depthWrite: false,
      }),
    [],
  );

  useFrame((_, delta) => {
    if (planetRef.current) planetRef.current.rotation.y += delta * 0.035;
    if (cloudsRef.current) cloudsRef.current.rotation.y -= delta * 0.018;
  });

  return (
    <group position={[0, -3.4, -6.5]}>
      <mesh ref={planetRef}>
        <sphereGeometry args={[2.55, 96, 96]} />
        <meshPhysicalMaterial
          color="#0b2a35"
          emissive="#0a1520"
          emissiveIntensity={0.12}
          roughness={0.92}
          metalness={0.08}
          clearcoat={0.35}
          clearcoatRoughness={0.4}
        />
      </mesh>

      <mesh ref={cloudsRef} scale={1.018}>
        <sphereGeometry args={[2.55, 64, 64]} />
        <meshStandardMaterial
          color="#1a2830"
          transparent
          opacity={0.14}
          depthWrite={false}
        />
      </mesh>

      <mesh scale={1.12} material={atmosphereMat}>
        <sphereGeometry args={[2.55, 72, 72]} />
      </mesh>

      <mesh scale={1.06} material={sunGlowMat}>
        <sphereGeometry args={[2.55, 48, 48]} />
      </mesh>

      <mesh scale={1.28}>
        <sphereGeometry args={[2.55, 48, 48]} />
        <meshBasicMaterial
          color="#3f3f46"
          transparent
          opacity={0.04}
          side={THREE.BackSide}
          depthWrite={false}
        />
      </mesh>

      <mesh scale={1.45}>
        <sphereGeometry args={[2.55, 32, 32]} />
        <meshBasicMaterial
          color="#27272a"
          transparent
          opacity={0.02}
          side={THREE.BackSide}
          depthWrite={false}
        />
      </mesh>

      <pointLight position={[2, 1, 3]} intensity={10} color="#e8e0d4" distance={18} />
    </group>
  );
}

function GalaxyGlow() {
  return (
    <mesh position={[5, 4, -42]} rotation={[0.2, -0.4, 0]}>
      <sphereGeometry args={[3.5, 16, 16]} />
      <meshBasicMaterial
        color="#1c1018"
        transparent
        opacity={0.04}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

export function HeroSpaceScene({ lowPower = false }: { lowPower?: boolean }) {
  return (
    <>
      <color attach="background" args={["#010108"]} />
      <fog attach="fog" args={["#010108", 14, 50]} />

      <CosmicSky />
      <NebulaField lowPower={lowPower} />
      <GalaxyGlow />

      <ambientLight intensity={0.08} />
      <directionalLight position={[6, 4, 3]} intensity={2.2} color="#fff4e6" />
      <directionalLight position={[-4, -1, 2]} intensity={0.2} color="#71717a" />

      <FlyCamera lowPower={lowPower} />
      <StarField lowPower={lowPower} />
      <Planet />
    </>
  );
}

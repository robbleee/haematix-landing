'use client';

import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

// Particle Flow System - Data flowing through the workflow
function FlowingParticles({ count = 150 }) {
  const meshRef = useRef();
  const particlesRef = useRef([]);

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const t = Math.random();
      const phase = Math.random() * Math.PI * 2;
      const radius = 0.5 + Math.random() * 1.5;
      
      temp.push({
        t,
        phase,
        radius,
        speed: 0.001 + Math.random() * 0.002,
        opacity: Math.random() * 0.5 + 0.3,
        scale: 0.02 + Math.random() * 0.03,
      });
    }
    return temp;
  }, [count]);

  useFrame((state, delta) => {
    if (!meshRef.current) return;

    particles.forEach((particle, i) => {
      // Update particle position along the flow path
      particle.t += particle.speed;
      if (particle.t > 1) particle.t = 0;

      // Create flowing path from left to right through center
      const curve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(-6, 0, 0),
        new THREE.Vector3(-3, Math.sin(particle.phase) * 0.5, Math.cos(particle.phase) * 0.5),
        new THREE.Vector3(0, Math.sin(particle.phase + 1) * 0.8, Math.cos(particle.phase + 1) * 0.8),
        new THREE.Vector3(3, Math.sin(particle.phase) * 0.5, Math.cos(particle.phase) * 0.5),
        new THREE.Vector3(6, 0, 0),
      ]);

      const point = curve.getPoint(particle.t);
      
      const dummy = new THREE.Object3D();
      dummy.position.copy(point);
      dummy.scale.set(particle.scale, particle.scale, particle.scale);
      
      // Pulse effect when passing through center (AI processing)
      const centerProximity = Math.abs(particle.t - 0.5) * 2;
      const pulseScale = 1 + (1 - centerProximity) * 0.3;
      dummy.scale.multiplyScalar(pulseScale);
      
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[null, null, count]}>
      <sphereGeometry args={[1, 16, 16]} />
      <meshStandardMaterial
        color="#00e5cc"
        emissive="#00e5cc"
        emissiveIntensity={0.8}
        transparent
        opacity={0.7}
      />
    </instancedMesh>
  );
}

// AI Core - Central processing sphere with neural network patterns
function AICore() {
  const meshRef = useRef();
  const innerRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.1;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15;
    }
    if (innerRef.current) {
      innerRef.current.rotation.x = -state.clock.elapsedTime * 0.12;
      innerRef.current.rotation.y = -state.clock.elapsedTime * 0.08;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Outer wireframe sphere */}
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.2, 1]} />
        <meshBasicMaterial
          color="#009688"
          wireframe
          transparent
          opacity={0.4}
        />
      </mesh>

      {/* Inner glowing core */}
      <mesh ref={innerRef}>
        <icosahedronGeometry args={[0.8, 2]} />
        <meshStandardMaterial
          color="#00bfa5"
          emissive="#00bfa5"
          emissiveIntensity={1.5}
          transparent
          opacity={0.6}
        />
      </mesh>

      {/* Glow effect */}
      <pointLight position={[0, 0, 0]} intensity={2} color="#00e5cc" distance={5} />
    </group>
  );
}

// Human Checkpoint - Pulsing gate showing human-in-the-loop
function HumanCheckpoint() {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      const pulse = Math.sin(state.clock.elapsedTime * 2) * 0.1 + 1;
      meshRef.current.scale.set(pulse, pulse, pulse);
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.5;
    }
  });

  return (
    <group position={[-2, 0, 0]}>
      <mesh ref={meshRef} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1, 0.05, 16, 32]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive="#ffffff"
          emissiveIntensity={0.8}
          transparent
          opacity={0.6}
        />
      </mesh>
      <pointLight position={[0, 0, 0]} intensity={1} color="#ffffff" distance={3} />
    </group>
  );
}

// Connection Lines - Flowing light trails showing information flow
function ConnectionLines() {
  const lineRefs = useRef([]);

  useFrame((state) => {
    lineRefs.current.forEach((line, i) => {
      if (line) {
        const offset = state.clock.elapsedTime * 0.5 + i;
        line.material.opacity = 0.2 + Math.sin(offset) * 0.15;
      }
    });
  });

  const createCurve = (start, end, amplitude = 0.5) => {
    const midPoint = new THREE.Vector3(
      (start.x + end.x) / 2,
      (start.y + end.y) / 2 + amplitude,
      (start.z + end.z) / 2
    );
    return new THREE.QuadraticBezierCurve3(start, midPoint, end);
  };

  const curves = [
    createCurve(new THREE.Vector3(-6, 0, 0), new THREE.Vector3(-2, 0, 0), 0.5),
    createCurve(new THREE.Vector3(-2, 0, 0), new THREE.Vector3(0, 0, 0), 0.3),
    createCurve(new THREE.Vector3(0, 0, 0), new THREE.Vector3(3, 0, 0), 0.4),
    createCurve(new THREE.Vector3(3, 0, 0), new THREE.Vector3(6, 0, 0), 0.2),
  ];

  return (
    <>
      {curves.map((curve, i) => {
        const points = curve.getPoints(50);
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        
        return (
          <line key={i} geometry={geometry}>
            <lineBasicMaterial
              ref={(el) => {
                if (el) lineRefs.current[i] = { material: el };
              }}
              color="#009688"
              transparent
              opacity={0.2}
              linewidth={2}
            />
          </line>
        );
      })}
    </>
  );
}

// Stage Labels - Subtle indicators for each stage
function StageLabels() {
  return (
    <group>
      {/* Data Input label */}
      <group position={[-5, -2, 0]}>
        <mesh>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshBasicMaterial color="#00e5cc" />
        </mesh>
      </group>

      {/* Diagnosis Output label */}
      <group position={[5, -2, 0]}>
        <mesh>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshBasicMaterial color="#4caf50" />
        </mesh>
      </group>
    </group>
  );
}

// Main Hero Animation Component
export default function HeroAnimation() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}>
      <Canvas
        camera={{ position: [0, 0, 10], fov: 50 }}
        style={{ background: 'linear-gradient(135deg, #004d40 0%, #00251a 100%)' }}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={0.5} />
        
        <FlowingParticles count={isMobile ? 75 : 150} />
        <AICore />
        <HumanCheckpoint />
        <ConnectionLines />
        <StageLabels />
      </Canvas>
    </div>
  );
}


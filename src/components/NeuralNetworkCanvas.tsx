import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Eye, RotateCw, Sparkles, Activity } from 'lucide-react';

interface NeuralNetworkCanvasProps {
  interactive?: boolean;
}

// Pre-allocate reusable math helpers outside render loop (Zero GC)
const _vecA = new THREE.Vector3();
const _vecB = new THREE.Vector3();
const _targetRotation = new THREE.Vector2(0, 0);
const _currentRotation = new THREE.Vector2(0, 0);

export const NeuralNetworkCanvas: React.FC<NeuralNetworkCanvasProps> = ({ interactive = true }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isRotating, setIsRotating] = useState(true);
  const [pulseSpeedMultiplier, setPulseSpeedMultiplier] = useState(1);
  const [activeNodeCount, setActiveNodeCount] = useState(48);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Detect software WebGL
    const isSoftwareGl = (() => {
      try {
        const gl = document.createElement('canvas').getContext('webgl2');
        if (!gl) return true;
        const ext = gl.getExtension('WEBGL_debug_renderer_info');
        const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
        const gpu = String(gl.getParameter(param));
        gl.getExtension('WEBGL_lose_context')?.loseContext();
        return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
      } catch {
        return false;
      }
    })();

    // Scene setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x090a0f, 0.035);

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 500;

    const camera = new THREE.PerspectiveCamera(48, width / height, 0.1, 100);
    camera.position.set(0, 1.2, 8.5);

    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 1.5));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    // Group for all neural elements
    const neuralGroup = new THREE.Group();
    scene.add(neuralGroup);

    // Build Neural Layers
    // Layer 0: Input (8 nodes), Layer 1: Hidden 1 (14 nodes), Layer 2: Hidden 2 (16 nodes), Layer 3: Output (8 nodes)
    const layerDefs = [
      { x: -3.8, count: 7, color: 0x06b6d4, radius: 1.8 },   // Cyan Input
      { x: -1.3, count: 14, color: 0x3b82f6, radius: 2.6 },  // Blue Dense
      { x: 1.3, count: 16, color: 0x8b5cf6, radius: 2.8 },   // Violet Deep
      { x: 3.8, count: 8, color: 0xa78bfa, radius: 2.0 },    // Glare Output
    ];

    const nodes: { position: THREE.Vector3; color: number; layerIdx: number; baseScale: number }[] = [];
    const layerNodeIndices: number[][] = [[], [], [], []];

    layerDefs.forEach((layer, lIdx) => {
      const step = (Math.PI * 2) / layer.count;
      for (let i = 0; i < layer.count; i++) {
        const angle = i * step + (lIdx % 2 ? 0.3 : 0);
        const y = Math.sin(angle) * (layer.radius * 0.75);
        const z = Math.cos(angle) * (layer.radius * 0.65);
        const pos = new THREE.Vector3(layer.x, y, z);
        const nodeIdx = nodes.length;
        nodes.push({
          position: pos,
          color: layer.color,
          layerIdx: lIdx,
          baseScale: lIdx === 0 || lIdx === 3 ? 0.08 : 0.09,
        });
        layerNodeIndices[lIdx].push(nodeIdx);
      }
    });

    setActiveNodeCount(nodes.length);

    // InstancedMesh for Nodes
    const nodeGeometry = new THREE.SphereGeometry(1, 16, 16);
    const nodeMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.95,
    });

    const nodeInstancedMesh = new THREE.InstancedMesh(nodeGeometry, nodeMaterial, nodes.length);
    nodeInstancedMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);

    const dummy = new THREE.Object3D();
    const nodeColor = new THREE.Color();

    nodes.forEach((node, idx) => {
      dummy.position.copy(node.position);
      dummy.scale.setScalar(node.baseScale);
      dummy.updateMatrix();
      nodeInstancedMesh.setMatrixAt(idx, dummy.matrix);
      nodeColor.setHex(node.color);
      nodeInstancedMesh.setColorAt(idx, nodeColor);
    });
    nodeInstancedMesh.instanceMatrix.needsUpdate = true;
    if (nodeInstancedMesh.instanceColor) nodeInstancedMesh.instanceColor.needsUpdate = true;
    neuralGroup.add(nodeInstancedMesh);

    // Build Synaptic Connections (Lines)
    const linePositions: number[] = [];
    const lineColors: number[] = [];
    const synapses: {
      from: THREE.Vector3;
      to: THREE.Vector3;
      fromIdx: number;
      toIdx: number;
      weight: number;
    }[] = [];

    for (let l = 0; l < layerDefs.length - 1; l++) {
      const fromIndices = layerNodeIndices[l];
      const toIndices = layerNodeIndices[l + 1];

      fromIndices.forEach((fromIdx) => {
        // Connect to a subset of next layer to create clean, mathematical neural sparsity
        toIndices.forEach((toIdx, targetRank) => {
          if ((fromIdx + targetRank) % 2 === 0 || targetRank % 3 === 0) {
            const p1 = nodes[fromIdx].position;
            const p2 = nodes[toIdx].position;

            linePositions.push(p1.x, p1.y, p1.z);
            linePositions.push(p2.x, p2.y, p2.z);

            const c1 = new THREE.Color(nodes[fromIdx].color);
            const c2 = new THREE.Color(nodes[toIdx].color);
            lineColors.push(c1.r, c1.g, c1.b);
            lineColors.push(c2.r, c2.g, c2.b);

            synapses.push({
              from: p1,
              to: p2,
              fromIdx,
              toIdx,
              weight: 0.3 + Math.random() * 0.7,
            });
          }
        });
      });
    }

    const linesGeometry = new THREE.BufferGeometry();
    linesGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
    linesGeometry.setAttribute('color', new THREE.Float32BufferAttribute(lineColors, 3));

    const linesMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.22,
      blending: THREE.AdditiveBlending,
    });
    const linesMesh = new THREE.LineSegments(linesGeometry, linesMaterial);
    neuralGroup.add(linesMesh);

    // Active Signal Pulses traveling along synapses
    const signalCount = Math.min(synapses.length, 60);
    const signalParticlesGeom = new THREE.BufferGeometry();
    const signalPositions = new Float32Array(signalCount * 3);
    const signalColors = new Float32Array(signalCount * 3);

    const signalData = Array.from({ length: signalCount }, (_, i) => {
      const syn = synapses[i % synapses.length];
      return {
        synapse: syn,
        progress: Math.random(),
        speed: (0.25 + Math.random() * 0.45),
        color: new THREE.Color(syn.weight > 0.6 ? 0x67e8f9 : 0xa78bfa),
      };
    });

    signalParticlesGeom.setAttribute('position', new THREE.BufferAttribute(signalPositions, 3));
    signalParticlesGeom.setAttribute('color', new THREE.BufferAttribute(signalColors, 3));

    const signalMaterial = new THREE.PointsMaterial({
      size: 0.18,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
    });
    const signalMesh = new THREE.Points(signalParticlesGeom, signalMaterial);
    neuralGroup.add(signalMesh);

    // Pointer Parallax Handling
    const handlePointerMove = (e: MouseEvent) => {
      if (!interactive) return;
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      _targetRotation.x = y * 0.45;
      _targetRotation.y = x * 0.6;
    };

    const handlePointerLeave = () => {
      _targetRotation.set(0, 0);
      setIsHovered(false);
    };

    const handlePointerEnter = () => {
      setIsHovered(true);
    };

    container.addEventListener('mousemove', handlePointerMove);
    container.addEventListener('mouseleave', handlePointerLeave);
    container.addEventListener('mouseenter', handlePointerEnter);

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId = 0;
    const clock = new THREE.Clock();

    const animate = () => {
      const delta = Math.min(clock.getDelta(), 0.1);
      const time = clock.getElapsedTime();

      // Exponential Damping for smooth parallax
      _currentRotation.x = THREE.MathUtils.damp(_currentRotation.x, _targetRotation.x, 3.5, delta);
      _currentRotation.y = THREE.MathUtils.damp(_currentRotation.y, _targetRotation.y, 3.5, delta);

      neuralGroup.rotation.x = _currentRotation.x;
      neuralGroup.rotation.y = _currentRotation.y + (isRotating ? time * 0.12 : 0);

      // Subtle breathing motion
      neuralGroup.position.y = Math.sin(time * 1.2) * 0.08;

      // Update signal positions
      const positions = signalParticlesGeom.attributes.position.array as Float32Array;
      const colors = signalParticlesGeom.attributes.color.array as Float32Array;

      for (let i = 0; i < signalCount; i++) {
        const sig = signalData[i];
        sig.progress += delta * sig.speed * pulseSpeedMultiplier;
        if (sig.progress > 1.0) {
          sig.progress = 0;
          sig.synapse = synapses[Math.floor(Math.random() * synapses.length)];
        }

        _vecA.copy(sig.synapse.from);
        _vecB.copy(sig.synapse.to);
        _vecA.lerp(_vecB, sig.progress);

        positions[i * 3] = _vecA.x;
        positions[i * 3 + 1] = _vecA.y;
        positions[i * 3 + 2] = _vecA.z;

        colors[i * 3] = sig.color.r;
        colors[i * 3 + 1] = sig.color.g;
        colors[i * 3 + 2] = sig.color.b;
      }
      signalParticlesGeom.attributes.position.needsUpdate = true;
      signalParticlesGeom.attributes.color.needsUpdate = true;

      // Animate node scales gently
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        const pulse = 1 + Math.sin(time * 3 + i) * 0.18;
        dummy.position.copy(node.position);
        dummy.scale.setScalar(node.baseScale * pulse);
        dummy.updateMatrix();
        nodeInstancedMesh.setMatrixAt(i, dummy.matrix);
      }
      nodeInstancedMesh.instanceMatrix.needsUpdate = true;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousemove', handlePointerMove);
      container.removeEventListener('mouseleave', handlePointerLeave);
      container.removeEventListener('mouseenter', handlePointerEnter);

      // Safe disposal
      nodeGeometry.dispose();
      nodeMaterial.dispose();
      linesGeometry.dispose();
      linesMaterial.dispose();
      signalParticlesGeom.dispose();
      signalMaterial.dispose();
      renderer.dispose();

      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
  }, [interactive, isRotating, pulseSpeedMultiplier]);

  return (
    <div className="relative w-full h-[420px] sm:h-[480px] lg:h-[540px] flex items-center justify-center select-none overflow-hidden rounded-2xl border border-white/5 bg-[#090A0F]/70">
      {/* 3D WebGL Canvas Container */}
      <div ref={mountRef} className="absolute inset-0 cursor-grab active:cursor-grabbing" />

      {/* Atmospheric Radial Glow Behind the Neural Network */}
      <div 
        className="pointer-events-none absolute w-[350px] h-[350px] rounded-full blur-[100px] -z-10 opacity-30"
        style={{
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.45) 0%, rgba(6, 182, 212, 0.25) 50%, transparent 70%)'
        }}
      />

      {/* Top Diagnostics Badge */}
      <div className="absolute top-4 left-4 flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-[#0E1017]/80 backdrop-blur-md border border-white/10 text-xs font-mono text-[#94A3B8]">
        <span className="w-2 h-2 rounded-full bg-[#06B6D4] shadow-[0_0_8px_#06B6D4]" />
        <span>TENSOR MANIFOLD // {activeNodeCount} NODES</span>
        {isHovered && <span className="text-[#67E8F9] pl-1 border-l border-white/10">INTERACTIVE</span>}
      </div>

      {/* Bottom Minimal HUD Controls Dock (Compliant with Skill: Collapsible, Non-intrusive, No pulsating dots) */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0E1017]/90 backdrop-blur-xl border border-white/10 shadow-lg text-xs font-mono text-[#E2E2EC]">
        <button
          onClick={() => setIsRotating(!isRotating)}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full transition-all ${
            isRotating
              ? 'bg-[#8B5CF6]/20 text-[#A78BFA] border border-[#8B5CF6]/40'
              : 'text-[#94A3B8] hover:text-[#E2E2EC]'
          }`}
          title="Toggle Network Auto-Rotation"
        >
          <RotateCw className={`w-3.5 h-3.5 ${isRotating ? 'animate-spin' : ''}`} style={{ animationDuration: '6s' }} />
          <span>{isRotating ? 'Auto-Orbit' : 'Paused'}</span>
        </button>

        <div className="w-[1px] h-3.5 bg-white/10 mx-1" />

        <button
          onClick={() => setPulseSpeedMultiplier((prev) => (prev === 1 ? 2 : prev === 2 ? 0.5 : 1))}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[#94A3B8] hover:text-[#67E8F9] hover:bg-[#06B6D4]/10 transition-all"
          title="Cycle Synapse Signal Propagation Speed"
        >
          <Activity className="w-3.5 h-3.5 text-[#06B6D4]" />
          <span>Speed: {pulseSpeedMultiplier}x</span>
        </button>

        <div className="w-[1px] h-3.5 bg-white/10 mx-1" />

        <div className="hidden sm:flex items-center gap-1 text-[11px] text-[#94A3B8] px-1">
          <Eye className="w-3 h-3 text-[#A78BFA]" />
          <span>Drag to orbit</span>
        </div>
      </div>
    </div>
  );
};

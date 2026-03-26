'use client';

import { useEffect, useRef } from 'react';
import type { BufferAttribute, WebGLRenderer } from 'three';

// ─── Config ──────────────────────────────────────────────────
const SPHERE_RADIUS = 4.8;
const SPAWN_EVERY   = 0.50; // seconds

// ─── Concept labels for nodes ─────────────────────────────────
const CONCEPTS = [
  'Gradient Descent', 'Neural Network', 'Backpropagation', 'Transformer',
  'Attention Layer', 'Vector Space', 'Knowledge Graph', 'Node Embedding',
  'Semantic Search', 'Graph Theory', 'Markov Chain', 'Bayesian Network',
  'Latent Space', 'Diffusion Model', 'Ontology', 'Topology',
  'Eigenvalue', 'Matrix Factor.', 'Cosine Similarity', 'LSTM Cell',
  'Autoencoder', 'Variational AE', 'Contrastive Loss', 'Fine-tuning',
  'Zero-shot', 'Few-shot', 'Prompt Tuning', 'RAG Pipeline',
  'Vector DB', 'Token Embedding', 'Positional Enc.', 'Self-Attention',
  'Feed-forward', 'Layer Norm', 'Dropout', 'Softmax',
  'Cross-entropy', 'KL Divergence', 'RLHF', 'PPO',
  'Chain of Thought', 'Tool Use', 'Memory Module', 'Agent Loop',
  'Graph Neural Net', 'Message Passing', 'Node Class.', 'Link Prediction',
  'Community Detect.', 'Centrality', 'PageRank', 'Spectral Graph',
  'Random Walk', 'Graph Attention', 'Subgraph Mining', 'Clustering Coeff',
];

// ─── GLSL: Nodes ─────────────────────────────────────────────
// All nodes fly from center (0,0,0) to their sphere position.
const NODE_VERT = /* glsl */ `
  uniform float uTime;
  uniform float uNow;
  attribute float aSize;
  attribute vec3  aColor;
  attribute float aBirth;
  varying   vec3  vColor;
  varying   float vReveal;

  void main() {
    float age    = uNow - aBirth;
    float reveal = clamp(age / 0.9, 0.0, 1.0);
    float t      = 1.0 - pow(1.0 - reveal, 3.0); // ease-out cubic

    // Fly from center to sphere target
    vec3 pos = position * t;

    float pulse = 0.94 + 0.06 * sin(uTime * 1.2 + position.x + position.z * 0.6);

    vColor  = aColor;
    vReveal = reveal;

    vec4 mvPos   = modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = aSize * pulse * (280.0 / -mvPos.z);
    gl_Position  = projectionMatrix * mvPos;
  }
`;

const NODE_FRAG = /* glsl */ `
  varying vec3  vColor;
  varying float vReveal;

  void main() {
    if (vReveal < 0.01) discard;

    vec2  uv = gl_PointCoord - 0.5;
    float d  = length(uv);
    if (d > 0.5) discard;

    float disc = 1.0 - smoothstep(0.18, 0.24, d);
    float ring = (1.0 - smoothstep(0.24, 0.44, d)) * smoothstep(0.18, 0.24, d);
    float core = 1.0 - smoothstep(0.0,  0.09, d);

    vec3 col  = mix(vColor, vec3(0.88, 1.0, 1.0), core * 0.45);
    float a   = (disc * 0.90 + ring * 0.15) * vReveal;

    gl_FragColor = vec4(col, a);
  }
`;

// ─── GLSL: Edges ─────────────────────────────────────────────
// Edge positions are sphere targets (static). Edges fade in after
// child node finishes animating (~0.9 s).
const EDGE_VERT = /* glsl */ `
  uniform float uNow;
  attribute float aProgress;
  attribute float aBirth;
  varying   float vProgress;
  varying   float vReveal;

  void main() {
    float age  = uNow - aBirth;
    vReveal    = clamp((age - 0.85) / 0.45, 0.0, 1.0);
    vProgress  = aProgress;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const EDGE_FRAG = /* glsl */ `
  uniform float uTime;
  varying float vProgress;
  varying float vReveal;

  void main() {
    if (vReveal < 0.01) discard;

    float p  = fract(vProgress - uTime * 0.30);
    float en = smoothstep(0.12, 0.0, p);

    vec3 base  = vec3(0.0, 0.50, 0.53);
    vec3 spark = vec3(0.47, 0.94, 0.96);
    vec3 col   = mix(base, spark, en * 0.75);

    float alpha = (0.28 + en * 0.50) * vReveal;
    gl_FragColor = vec4(col, alpha);
  }
`;

// ─── Fibonacci sphere positions ───────────────────────────────
function fibonacciSphere(n: number, r: number): [number, number, number][] {
  const pts: [number, number, number][] = [];
  const phi = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < n; i++) {
    const y     = 1 - (i / Math.max(n - 1, 1)) * 2;
    const rad   = Math.sqrt(1 - y * y);
    const theta = phi * i;
    pts.push([rad * Math.cos(theta) * r, y * r, rad * Math.sin(theta) * r]);
  }
  return pts;
}

// ─── Types ───────────────────────────────────────────────────
interface NodeData {
  id: number;
  x: number; y: number; z: number;
  depth: number;
  childCount: number;
  birthTime: number;
}

interface Props {
  className?: string;
  maxNodes?: number;
}

// ─── Component ───────────────────────────────────────────────
export default function GraphCanvas({ className = '', maxNodes = 50 }: Props) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;

    let rafId    = 0;
    let disposed = false;
    let rendererRef: WebGLRenderer | null = null;

    (async () => {
      const THREE             = await import('three');
      const { OrbitControls } = await import('three/examples/jsm/controls/OrbitControls.js');
      const { CSS2DRenderer, CSS2DObject } = await import('three/examples/jsm/renderers/CSS2DRenderer.js');
      if (disposed) return;

      const targets = fibonacciSphere(maxNodes, SPHERE_RADIUS);

      // ── WebGL Renderer ────────────────────────────────────
      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setClearColor(0x000000, 0);
      renderer.domElement.style.cssText = 'position:absolute;inset:0;width:100%;height:100%';
      el.appendChild(renderer.domElement);
      rendererRef = renderer;

      // ── CSS2D Renderer (labels) ───────────────────────────
      const labelRenderer = new CSS2DRenderer();
      labelRenderer.domElement.style.cssText =
        'position:absolute;inset:0;width:100%;height:100%;pointer-events:none;overflow:hidden';
      el.appendChild(labelRenderer.domElement);

      const scene  = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 200);
      camera.position.z = 15;
      scene.fog = new THREE.FogExp2(0x060a0b, 0.035);

      // ── OrbitControls ─────────────────────────────────────
      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping   = true;
      controls.dampingFactor   = 0.06;
      controls.minDistance     = 5;
      controls.maxDistance     = 35;
      controls.autoRotate      = true;
      controls.autoRotateSpeed = 0.45;

      // ── Resize ────────────────────────────────────────────
      const resize = () => {
        const w = el.clientWidth, h = el.clientHeight;
        if (!w || !h) return;
        renderer.setSize(w, h);
        labelRenderer.setSize(w, h);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
      };
      resize();
      const ro = new ResizeObserver(resize);
      ro.observe(el);

      // ── Node buffers ──────────────────────────────────────
      const nodePos   = new Float32Array(maxNodes * 3);
      const nodeColor = new Float32Array(maxNodes * 3);
      const nodeSize  = new Float32Array(maxNodes);
      const nodeBirth = new Float32Array(maxNodes);

      const nodeGeo = new THREE.BufferGeometry();
      nodeGeo.setAttribute('position', new THREE.BufferAttribute(nodePos,   3));
      nodeGeo.setAttribute('aColor',   new THREE.BufferAttribute(nodeColor, 3));
      nodeGeo.setAttribute('aSize',    new THREE.BufferAttribute(nodeSize,  1));
      nodeGeo.setAttribute('aBirth',   new THREE.BufferAttribute(nodeBirth, 1));
      nodeGeo.setDrawRange(0, 0);

      const nodeMat = new THREE.ShaderMaterial({
        vertexShader:   NODE_VERT,
        fragmentShader: NODE_FRAG,
        uniforms: { uTime: { value: 0 }, uNow: { value: 0 } },
        transparent: true,
        depthWrite:  false,
        blending:    THREE.NormalBlending,
      });
      scene.add(new THREE.Points(nodeGeo, nodeMat));

      // ── Edge buffers ──────────────────────────────────────
      const edgePos      = new Float32Array(maxNodes * 2 * 3);
      const edgeProgress = new Float32Array(maxNodes * 2);
      const edgeBirth    = new Float32Array(maxNodes * 2);

      const edgeGeo = new THREE.BufferGeometry();
      edgeGeo.setAttribute('position',  new THREE.BufferAttribute(edgePos,      3));
      edgeGeo.setAttribute('aProgress', new THREE.BufferAttribute(edgeProgress, 1));
      edgeGeo.setAttribute('aBirth',    new THREE.BufferAttribute(edgeBirth,    1));
      edgeGeo.setDrawRange(0, 0);

      const edgeMat = new THREE.ShaderMaterial({
        vertexShader:   EDGE_VERT,
        fragmentShader: EDGE_FRAG,
        uniforms: { uTime: { value: 0 }, uNow: { value: 0 } },
        transparent: true,
        depthWrite:  false,
        blending:    THREE.AdditiveBlending,
      });
      scene.add(new THREE.LineSegments(edgeGeo, edgeMat));

      // ── Graph state ───────────────────────────────────────
      const nodes: NodeData[] = [];
      const labelObjects: InstanceType<typeof CSS2DObject>[] = [];
      let nodeCount = 0;
      let edgeCount = 0;
      const t0 = performance.now();

      function spawnNode(parentId: number | null, now: number) {
        if (nodeCount >= maxNodes) return;
        const id           = nodeCount;
        const [tx, ty, tz] = targets[id];
        let depth          = 0;

        if (parentId !== null) {
          nodes[parentId].childCount++;
          depth = nodes[parentId].depth + 1;
        }

        nodes.push({ id, x: tx, y: ty, z: tz, depth, childCount: 0, birthTime: now });

        nodePos[id * 3]     = tx;
        nodePos[id * 3 + 1] = ty;
        nodePos[id * 3 + 2] = tz;

        if (depth === 0) {
          nodeColor[id * 3] = 0.47; nodeColor[id * 3 + 1] = 0.94; nodeColor[id * 3 + 2] = 0.96;
          nodeSize[id] = 16;
        } else if (depth === 1) {
          nodeColor[id * 3] = 0.0;  nodeColor[id * 3 + 1] = 0.75; nodeColor[id * 3 + 2] = 0.78;
          nodeSize[id] = 12;
        } else if (depth === 2) {
          nodeColor[id * 3] = 0.0;  nodeColor[id * 3 + 1] = 0.63; nodeColor[id * 3 + 2] = 0.655;
          nodeSize[id] = 10;
        } else {
          nodeColor[id * 3] = 0.0;  nodeColor[id * 3 + 1] = 0.52; nodeColor[id * 3 + 2] = 0.55;
          nodeSize[id] = Math.max(6, 9 - (depth - 2));
        }
        nodeBirth[id] = now;
        nodeCount++;

        nodeGeo.setDrawRange(0, nodeCount);
        nodeGeo.attributes.position.needsUpdate = true;
        (nodeGeo.attributes.aColor as BufferAttribute).needsUpdate = true;
        (nodeGeo.attributes.aSize  as BufferAttribute).needsUpdate = true;
        (nodeGeo.attributes.aBirth as BufferAttribute).needsUpdate = true;

        // ── Label ────────────────────────────────────────────
        const concept = CONCEPTS[id % CONCEPTS.length];
        const div     = document.createElement('div');
        div.textContent = concept;
        div.style.cssText = [
          'color:rgba(120,239,245,0)',        // start invisible, fade in via JS
          'font-family:"JetBrains Mono",ui-monospace,monospace',
          'font-size:8.5px',
          'letter-spacing:0.03em',
          'white-space:nowrap',
          'pointer-events:none',
          'user-select:none',
          'text-shadow:0 0 8px rgba(0,161,167,0.5)',
          'transition:color 0.5s ease',
          'transform:translateX(-50%) translateY(-180%)',
        ].join(';');

        const labelObj = new CSS2DObject(div);
        labelObj.position.set(0, 0, 0); // starts at center, updated each frame
        scene.add(labelObj);
        labelObjects.push(labelObj);

        // Edge to parent
        if (parentId !== null) {
          const p  = nodes[parentId];
          const ei = edgeCount * 2;

          edgePos[ei * 3]         = p.x;
          edgePos[ei * 3 + 1]     = p.y;
          edgePos[ei * 3 + 2]     = p.z;
          edgePos[(ei+1) * 3]     = tx;
          edgePos[(ei+1) * 3 + 1] = ty;
          edgePos[(ei+1) * 3 + 2] = tz;

          edgeProgress[ei]     = 0.0;
          edgeProgress[ei + 1] = 1.0;
          edgeBirth[ei]        = now;
          edgeBirth[ei + 1]    = now;

          edgeCount++;
          edgeGeo.setDrawRange(0, edgeCount * 2);
          (edgeGeo.attributes.position  as BufferAttribute).needsUpdate = true;
          (edgeGeo.attributes.aProgress as BufferAttribute).needsUpdate = true;
          (edgeGeo.attributes.aBirth    as BufferAttribute).needsUpdate = true;
        }
      }

      spawnNode(null, 0);
      let lastSpawn = 0;

      // ── Animate ───────────────────────────────────────────
      function animate() {
        rafId = requestAnimationFrame(animate);
        if (disposed) return;
        const t = (performance.now() - t0) / 1000;

        // Spawn new nodes
        if (t - lastSpawn > SPAWN_EVERY && nodeCount < maxNodes) {
          lastSpawn = t;
          const candidates = nodes.filter(n => n.childCount < 5 && n.depth < 8);
          if (candidates.length > 0) {
            const sorted = [...candidates].sort((a, b) => a.childCount - b.childCount);
            const pool   = sorted.slice(0, Math.max(1, Math.ceil(sorted.length * 0.5)));
            const parent = pool[Math.floor(Math.random() * pool.length)];
            const batch  = Math.min(Math.floor(Math.random() * 2) + 1, maxNodes - nodeCount);
            for (let i = 0; i < batch; i++) spawnNode(parent.id, t);
          }
        }

        // Update label positions to follow animated nodes
        for (let i = 0; i < nodeCount; i++) {
          const n      = nodes[i];
          const age    = t - n.birthTime;
          const reveal = Math.min(age / 0.9, 1.0);
          const eased  = 1 - Math.pow(1 - reveal, 3);

          labelObjects[i].position.set(n.x * eased, n.y * eased, n.z * eased);

          // Fade label in after node settles
          const labelAlpha = Math.max(0, Math.min(1, (age - 1.1) / 0.5));
          (labelObjects[i].element as HTMLDivElement).style.color =
            `rgba(120,239,245,${(labelAlpha * 0.72).toFixed(3)})`;
        }

        nodeMat.uniforms.uTime.value = t;
        nodeMat.uniforms.uNow.value  = t;
        edgeMat.uniforms.uTime.value = t;
        edgeMat.uniforms.uNow.value  = t;

        controls.update();
        renderer.render(scene, camera);
        labelRenderer.render(scene, camera);
      }
      animate();

      return () => {
        ro.disconnect();
        controls.dispose();
        renderer.dispose();
        nodeMat.dispose();
        edgeMat.dispose();
        nodeGeo.dispose();
        edgeGeo.dispose();
        labelObjects.forEach(l => scene.remove(l));
        if (renderer.domElement.parentNode === el)    el.removeChild(renderer.domElement);
        if (labelRenderer.domElement.parentNode === el) el.removeChild(labelRenderer.domElement);
      };
    })().then(cleanup => {
      if (!cleanup) return;
      if (disposed) { cleanup(); return; }
      (el as HTMLDivElement & { _c?: () => void })._c = cleanup;
    });

    return () => {
      disposed = true;
      cancelAnimationFrame(rafId);
      (el as HTMLDivElement & { _c?: () => void })._c?.();
      rendererRef?.dispose();
      el.querySelectorAll('canvas').forEach(c => { if (c.parentNode === el) el.removeChild(c); });
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [maxNodes]);

  return (
    <div
      ref={mountRef}
      className={className}
      style={{ position: 'relative', width: '100%', height: '100%' }}
    />
  );
}

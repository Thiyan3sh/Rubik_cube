import React, { useRef, useEffect, useState, useCallback } from "react";
import * as THREE from "three";

/**********************
 * HOMEPAGE COMPONENT *
 **********************/
const HomePage = ({ onEnterCube }) => {
  const [isLoading, setIsLoading] = useState(false);
  const canvasRef = useRef(null);
  // ... existing code from the user snippet for HomePage remains unchanged ...
  // For brevity the unchanged HomePage code is omitted.
  // ... existing code ...
};

/********************
 * CUBEPAGE COMPONENT
 ********************/
const CubePage = ({ onBackHome }) => {
  /*** Refs ***/
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const cubeGroupRef = useRef(null);
  const animationRef = useRef(null);

  const cubeState = useRef({
    isRotating: false,
    currentAngle: 0,
  });

  /********************
   * STATE MANAGEMENT *
   ********************/
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [moveQueue, setMoveQueue] = useState([]);
  const moveQueueRef = useRef(moveQueue); // keeps the freshest queue for the animation loop

  const [speed, setSpeed] = useState(0.1);
  const [isScrambled, setIsScrambled] = useState(false);
  const [cubeTheme, setCubeTheme] = useState("professional");
  const [lighting, setLighting] = useState("enhanced");
  const [customScramble, setCustomScramble] = useState("");

  /* keep ref in-sync with state */
  useEffect(() => {
    moveQueueRef.current = moveQueue;
  }, [moveQueue]);

  /****************
   * THEME SETUP  *
   ****************/
  const themes = {
    professional: {
      name: "Professional",
      colors: ["#ffffff", "#ffd700", "#00ff00", "#0080ff", "#ff4500", "#dc143c"],
      names: ["White", "Yellow", "Green", "Blue", "Orange", "Red"],
      background: 0x0f172a,
    },
    azure: { // NEW LIGHT BLUE THEME
      name: "Azure Ice",
      colors: ["#e0f7ff", "#b3e5ff", "#80d4ff", "#4dc3ff", "#1ab2ff", "#0099e6"],
      names: ["Ice", "Sky", "Peacock", "Ocean", "Sea", "Deep"],
      background: 0x002b45,
    },
  };

  /*********************
   * CUBE CONSTRUCTION *
   *********************/
  const createEnhancedCube = useCallback(() => {
    if (!cubeGroupRef.current || !sceneRef.current) return;

    // clear old cubelets
    while (cubeGroupRef.current.children.length) {
      const child = cubeGroupRef.current.children.pop();
      child.geometry?.dispose();
      if (Array.isArray(child.material)) child.material.forEach((m) => m.dispose());
    }

    const theme = themes[cubeTheme];
    const size = 0.98;
    const gap = 0.02;

    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        for (let z = -1; z <= 1; z++) {
          if (x === 0 && y === 0 && z === 0) continue;
          const geometry = new THREE.BoxGeometry(size, size, size);
          const materials = Array(6).fill().map(() => new THREE.MeshLambertMaterial({ color: "#2c2c2c" }));

          if (x === 1) materials[0].color.set(theme.colors[5]);
          if (x === -1) materials[1].color.set(theme.colors[4]);
          if (y === 1) materials[2].color.set(theme.colors[0]);
          if (y === -1) materials[3].color.set(theme.colors[1]);
          if (z === 1) materials[4].color.set(theme.colors[2]);
          if (z === -1) materials[5].color.set(theme.colors[3]);

          const cubelet = new THREE.Mesh(geometry, materials);
          cubelet.position.set(x * (size + gap), y * (size + gap), z * (size + gap));
          cubeGroupRef.current.add(cubelet);
        }
      }
    }
  }, [cubeTheme]);

  /********************
   * SCRAMBLE & MOVES *
   ********************/
  const allowedMoves = ["x", "y", "z", "-x", "-y", "-z"];

  const enqueueMoves = (sequence) => {
    setMoveQueue((prev) => [...prev, ...sequence]);
  };

  const handleScramble = () => {
    if (cubeState.current.isRotating) return;
    const length = 20 + Math.floor(Math.random() * 10);
    const sequence = Array.from({ length }, () => allowedMoves[Math.floor(Math.random() * allowedMoves.length)]);
    setIsScrambled(true);
    enqueueMoves(sequence);
  };

  const handleApplyCustomScramble = () => {
    if (cubeState.current.isRotating) return;
    const sequence = customScramble.trim().split(/\s+/).filter((m) => allowedMoves.includes(m));
    if (sequence.length === 0) return;
    setIsScrambled(true);
    enqueueMoves(sequence);
    setCustomScramble("");
  };

  const handleStop = () => {
    cubeState.current.isRotating = false;
    setMoveQueue([]);
  };

  const executeNextMove = () => {
    if (cubeState.current.isRotating) return;
    if (moveQueueRef.current.length === 0) return;

    const current = moveQueueRef.current[0];
    cubeState.current.isRotating = true;
    cubeState.current.currentAngle = 0;

    const speedPerFrame = speed;
    const isReverse = current.startsWith("-");
    const axis = current.replace("-", "");
    const dir = isReverse ? -1 : 1;

    const step = () => {
      if (!cubeGroupRef.current) return;
      if (!cubeState.current.isRotating) return; // may be stopped externally

      if (axis === "x") cubeGroupRef.current.rotation.x += speedPerFrame * dir;
      if (axis === "y") cubeGroupRef.current.rotation.y += speedPerFrame * dir;
      if (axis === "z") cubeGroupRef.current.rotation.z += speedPerFrame * dir;

      cubeState.current.currentAngle += speedPerFrame;
      if (cubeState.current.currentAngle >= Math.PI / 2) {
        cubeState.current.isRotating = false;
        setMoveQueue((prev) => prev.slice(1));
      } else {
        requestAnimationFrame(step);
      }
    };
    requestAnimationFrame(step);
  };

  /****************
   * SCENE SETUP  *
   ****************/
  useEffect(() => {
    if (!mountRef.current) return;
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(12, 8, 12);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    rendererRef.current = renderer;
    mountRef.current.appendChild(renderer.domElement);

    const cubeGroup = new THREE.Group();
    cubeGroupRef.current = cubeGroup;
    scene.add(cubeGroup);

    createEnhancedCube();

    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);

      // auto rotation
      if (!cubeState.current.isRotating && isAutoRotating) {
        cubeGroup.rotation.y += 0.005;
      }
      // take next queued move
      if (!cubeState.current.isRotating && moveQueueRef.current.length) {
        executeNextMove();
      }

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationRef.current);
      renderer.dispose();
    };
  }, [createEnhancedCube, isAutoRotating]);

  /****************
   * UI RENDERING *
   ****************/
  return (
    <div className="w-full h-screen relative bg-gradient-to-br from-slate-900 via-sky-900 to-cyan-900 text-white">
      {/* three.js */}
      <div ref={mountRef} className="absolute inset-0" />

      {/* controls */}
      <div className="absolute top-0 left-0 m-4 p-4 bg-black/50 backdrop-blur-md rounded-xl w-80 max-h-[90vh] overflow-y-auto">
        <h2 className="text-lg font-bold text-cyan-300 mb-4">Cube Controls</h2>
        <button className="w-full mb-2 py-2 bg-cyan-600 rounded-lg" onClick={handleScramble}>
          🎲 Scramble
        </button>
        <div className="flex gap-2 mb-4">
          <input
            className="flex-1 px-2 text-black rounded"
            placeholder="x y z -x ..."
            value={customScramble}
            onChange={(e) => setCustomScramble(e.target.value)}
          />
          <button className="px-3 bg-blue-600 rounded" onClick={handleApplyCustomScramble}>
            Apply
          </button>
        </div>
        <button className="w-full mb-4 py-2 bg-rose-600 rounded-lg" onClick={handleStop}>
          ⏸️ Stop
        </button>

        <label className="block mb-2 text-sm text-cyan-200">Speed ({speed.toFixed(2)})</label>
        <input
          type="range"
          min="0.05"
          max="0.25"
          step="0.01"
          value={speed}
          onChange={(e) => setSpeed(parseFloat(e.target.value))}
          className="w-full mb-4"
        />

        <label className="block mb-2 text-sm text-cyan-200">Theme</label>
        <select className="w-full mb-4 text-black px-2 py-1 rounded" value={cubeTheme} onChange={(e) => setCubeTheme(e.target.value)}>
          {Object.entries(themes).map(([k, v]) => (
            <option key={k} value={k}>
              {v.name}
            </option>
          ))}
        </select>

        <button className="w-full py-2 bg-gray-700 rounded" onClick={onBackHome}>
          ← Home
        </button>
      </div>
    </div>
  );
};

/********
 * APP *
 ********/
export default function App() {
  const [page, setPage] = useState("home");

  return page === "home" ? <HomePage onEnterCube={() => setPage("cube")}/> : <CubePage onBackHome={() => setPage("home")}/>;
}
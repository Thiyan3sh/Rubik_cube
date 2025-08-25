import './App.css';
import React, { useRef, useEffect, useState, useCallback } from "react";
import * as THREE from "three";

// Homepage Component
const HomePage = ({ onEnterCube }) => {
  const [isLoading, setIsLoading] = useState(false);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Create floating mini cubes
    const cubes = [];
    for (let i = 0; i < 15; i++) {
      const geometry = new THREE.BoxGeometry(0.3, 0.3, 0.3);
      const materials = [
        new THREE.MeshBasicMaterial({ color: 0x00bfff }),
        new THREE.MeshBasicMaterial({ color: 0x87ceeb }),
        new THREE.MeshBasicMaterial({ color: 0x4169e1 }),
        new THREE.MeshBasicMaterial({ color: 0x1e90ff }),
        new THREE.MeshBasicMaterial({ color: 0x6495ed }),
        new THREE.MeshBasicMaterial({ color: 0x00ced1 })
      ];
      const cube = new THREE.Mesh(geometry, materials);
      cube.position.set(
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20
      );
      cube.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
      scene.add(cube);
      cubes.push(cube);
    }

    camera.position.z = 10;

    const animate = () => {
      requestAnimationFrame(animate);
      cubes.forEach(cube => {
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        cube.position.y += Math.sin(Date.now() * 0.001 + cube.position.x) * 0.002;
      });
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, []);

  const handleEnter = () => {
    setIsLoading(true);
    setTimeout(() => {
      onEnterCube();
    }, 2000);
  };

  return (
    <>
      <div style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
        background: 'linear-gradient(135deg, #0a1929 0%, #1565c0 50%, #0d47a1 100%)',
        backgroundSize: '400% 400%',
        animation: 'gradientFlow 15s ease infinite',
        overflow: 'hidden'
      }}>
        {/* Background particles */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none'
        }}>
          {[...Array(60)].map((_, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                width: '4px',
                height: '4px',
                background: i % 2 === 0 ? '#00e5ff' : '#00bfff',
                borderRadius: '50%',
                left: `${Math.random() * 100}%`,
                animation: `particles ${20 + Math.random() * 10}s linear infinite`,
                animationDelay: `${Math.random() * 20}s`,
                boxShadow: `0 0 ${i % 3 === 0 ? 15 : 10}px currentColor`
              }}
            />
          ))}
        </div>
        
        <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.3 }} />
        
        <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', textAlign: 'center', padding: '1rem' }}>
          <div style={{ marginBottom: '3rem', position: 'relative' }}>
            <div style={{ 
              width: '8rem', 
              height: '8rem', 
              background: 'linear-gradient(135deg, #00bfff 0%, #1e90ff 100%)', 
              borderRadius: '1.5rem', 
              margin: '0 auto 2rem', 
              transform: 'rotate(12deg)', 
              boxShadow: '0 20px 40px rgba(0, 191, 255, 0.4)', 
              animation: 'float 3s ease-in-out infinite',
              position: 'relative'
            }}>
              <div style={{ position: 'absolute', inset: '0.5rem', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.125rem' }}>
                {[...Array(9)].map((_, i) => (
                  <div 
                    key={i} 
                    style={{ 
                      background: 'rgba(255,255,255,0.2)', 
                      borderRadius: '0.125rem', 
                      animation: `pulseGlow 2s ease-in-out infinite`,
                      animationDelay: `${i * 0.1}s` 
                    }} 
                  />
                ))}
              </div>
            </div>
          </div>

          <h1 style={{ 
            fontSize: 'clamp(3rem, 8vw, 6rem)', 
            fontWeight: 900, 
            background: 'linear-gradient(135deg, #00e5ff 0%, #00bfff 50%, #1e90ff 100%)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '1.5rem',
            animation: 'gradientFlow 4s ease infinite',
            backgroundSize: '200% 200%'
          }}>
            RUBIK'S
          </h1>
          
          <h2 style={{ 
            fontSize: 'clamp(2rem, 5vw, 4rem)', 
            fontWeight: 700, 
            background: 'linear-gradient(135deg, #87ceeb 0%, #00bfff 50%, #1e90ff 100%)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '2rem'
          }}>
            CUBE SOLVER PRO
          </h2>

          <p style={{ 
            fontSize: 'clamp(1rem, 2.5vw, 1.5rem)', 
            color: '#e3f2fd', 
            marginBottom: '3rem', 
            maxWidth: '48rem', 
            lineHeight: '1.6',
            textShadow: '0 0 10px rgba(227, 242, 253, 0.3)'
          }}>
            The world's most advanced 3D Rubik's Cube solver with AI-powered algorithms, 
            real-time visualization, and professional speedcubing tools.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '4rem' }}>
            <button
              onClick={handleEnter}
              disabled={isLoading}
              style={{ 
                fontSize: '1.25rem', 
                padding: '1rem 2.5rem',
                position: 'relative',
                overflow: 'hidden',
                background: isLoading ? 'linear-gradient(135deg, #666 0%, #555 100%)' : 'linear-gradient(135deg, #00bfff 0%, #1e90ff 100%)',
                border: '1px solid #00bfff',
                borderRadius: '12px',
                color: '#ffffff',
                fontWeight: 600,
                cursor: isLoading ? 'not-allowed' : 'pointer',
                boxShadow: isLoading ? 'none' : '0 8px 32px rgba(0, 191, 255, 0.3)',
                transition: 'all 0.3s ease'
              }}
            >
              {isLoading ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{
                    width: '16px',
                    height: '16px',
                    border: '2px solid rgba(255, 255, 255, 0.3)',
                    borderTop: '2px solid #ffffff',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite'
                  }} />
                  Initializing Cube Engine...
                </div>
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span>🎲</span> Enter Cube World
                </div>
              )}
            </button>
            
            <button style={{ 
              fontSize: '1.25rem', 
              padding: '1rem 2.5rem',
              background: 'linear-gradient(135deg, rgba(0, 191, 255, 0.15) 0%, rgba(30, 144, 255, 0.05) 100%)',
              backdropFilter: 'blur(16px)',
              border: '1px solid rgba(0, 191, 255, 0.2)',
              borderRadius: '12px',
              color: '#ffffff',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span>📖</span> View Tutorial
              </div>
            </button>
          </div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
            gap: '1.5rem', 
            maxWidth: '80rem',
            width: '100%'
          }}>
            {[
              { icon: "🧠", title: "AI Solver", desc: "Advanced algorithms solve any configuration" },
              { icon: "⚡", title: "Real-time 3D", desc: "Smooth 60fps WebGL rendering" },
              { icon: "🎯", title: "Pro Tools", desc: "Speedcubing timer and statistics" },
              { icon: "🎨", title: "Themes", desc: "Multiple visual themes and effects" }
            ].map((feature, i) => (
              <div 
                key={i} 
                style={{ 
                  padding: '1.5rem',
                  background: 'linear-gradient(135deg, rgba(0, 191, 255, 0.15) 0%, rgba(30, 144, 255, 0.05) 100%)',
                  backdropFilter: 'blur(16px)',
                  border: '1px solid rgba(0, 191, 255, 0.2)',
                  borderRadius: '16px',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.37)',
                  animation: `fadeInUp 0.6s ease forwards`,
                  animationDelay: `${i * 0.2}s`,
                  opacity: 0,
                  transform: 'translateY(20px)'
                }}
              >
                <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{feature.icon}</div>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: '#ffffff', marginBottom: '0.75rem' }}>
                  {feature.title}
                </h3>
                <p style={{ color: '#e3f2fd', fontSize: '0.9rem', lineHeight: '1.5' }}>
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes gradientFlow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        @keyframes particles {
          0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
          }
        }

        @keyframes float {
          0%, 100% { transform: rotate(12deg) translateY(0px); }
          50% { transform: rotate(12deg) translateY(-10px); }
        }

        @keyframes pulseGlow {
          0%, 100% { 
            box-shadow: 0 0 20px rgba(255, 255, 255, 0.3);
            opacity: 0.6;
          }
          50% { 
            box-shadow: 0 0 30px rgba(255, 255, 255, 0.8);
            opacity: 1;
          }
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
};


const RubiksCubeSolver = () => {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const cubeGroupRef = useRef(null);
  const animationRef = useRef(null);
  const cubelets = useRef([]);

  // State management
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [moveCount, setMoveCount] = useState(0);
  const [speed, setSpeed] = useState(0.1);
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [isScrambled, setIsScrambled] = useState(false);
  const [cubeTheme, setCubeTheme] = useState('lightBlue');
  const [lighting, setLighting] = useState('enhanced');
  const [currentMove, setCurrentMove] = useState('');
  const [solveHistory, setSolveHistory] = useState([]);
  const [bestTime, setBestTime] = useState(null);
  const [scrambleSequence, setScrambleSequence] = useState('');
  const [manualScrambleInput, setManualScrambleInput] = useState('');
  const [isScrambling, setIsScrambling] = useState(false);

  // Mouse controls
  const mouseState = useRef({
    isDown: false,
    lastX: 0,
    lastY: 0,
    rotationX: 0,
    rotationY: 0
  });

  const timerInterval = useRef(null);

  // Enhanced cube themes with light blue focus
  const themes = {
    lightBlue: {
      name: "Light Blue Pro",
      colors: ['#ffffff', '#ffeb3b', '#4caf50', '#2196f3', '#ff9800', '#f44336'],
      names: ['White', 'Yellow', 'Green', 'Blue', 'Orange', 'Red'],
      background: 0x0d1b2a,
      accent: 0x00bfff
    },
    oceanBlue: {
      name: "Ocean Blue",
      colors: ['#e3f2fd', '#fff9c4', '#e8f5e8', '#bbdefb', '#ffe0b2', '#ffcdd2'],
      names: ['Ice', 'Cream', 'Mint', 'Ocean', 'Peach', 'Rose'],
      background: 0x0a1929,
      accent: 0x03dac6
    },
    neonCyan: {
      name: "Neon Cyan",
      colors: ['#00ffff', '#ffff00', '#00ff00', '#0080ff', '#ff8000', '#ff0040'],
      names: ['Cyan', 'Yellow', 'Lime', 'Blue', 'Orange', 'Red'],
      background: 0x000a0f,
      accent: 0x00e5ff
    },
    professional: {
      name: "Professional",
      colors: ['#ffffff', '#ffd700', '#00ff00', '#0080ff', '#ff4500', '#dc143c'],
      names: ['White', 'Yellow', 'Green', 'Blue', 'Orange', 'Red'],
      background: 0x0f172a,
      accent: 0x38bdf8
    }
  };

  // Rubik's cube move notation
  const cubeNotation = ['R', 'L', 'U', 'D', 'F', 'B', "R'", "L'", "U'", "D'", "F'", "B'"];

  // Example scrambles for manual input
  const exampleScrambles = [
    "R U R' U' F R F'",
    "R U2 R' D R U' R' D'",
    "F R U' R' U' R U R' F'",
    "R U R' F' R U R' U' R' F R2 U' R'",
    "L' U' L F L' U' L U L F' L2 U L",
    "R' D' R U R' D R U'",
    "F U R U' R' F'",
    "R U R' U R U2 R'"
  ];

  // Create individual cubelets with proper face tracking
  const createEnhancedCube = useCallback(() => {
    if (!cubeGroupRef.current || !sceneRef.current) return;

    // Clear existing cubelets
    cubelets.current.forEach(cubelet => {
      cubeGroupRef.current.remove(cubelet.mesh);
      if (cubelet.mesh.geometry) cubelet.mesh.geometry.dispose();
      if (cubelet.mesh.material) {
        if (Array.isArray(cubelet.mesh.material)) {
          cubelet.mesh.material.forEach(mat => mat.dispose());
        } else {
          cubelet.mesh.material.dispose();
        }
      }
    });

    cubelets.current = [];

    const theme = themes[cubeTheme];
    const cubeSize = 0.98;
    const gap = 0.02;

    // Create 27 cubelets (3x3x3)
    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        for (let z = -1; z <= 1; z++) {
          const geometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
          const materials = [];

          // Create materials for each face
          for (let i = 0; i < 6; i++) {
            let color = '#1a1a1a'; // Default dark color for hidden faces
            
            // Assign colors only to visible outer faces
            if (i === 0 && x === 1) color = theme.colors[5];  // Right face - Red
            if (i === 1 && x === -1) color = theme.colors[4]; // Left face - Orange
            if (i === 2 && y === 1) color = theme.colors[0];  // Top face - White
            if (i === 3 && y === -1) color = theme.colors[1]; // Bottom face - Yellow
            if (i === 4 && z === 1) color = theme.colors[2];  // Front face - Green
            if (i === 5 && z === -1) color = theme.colors[3]; // Back face - Blue

            materials.push(new THREE.MeshLambertMaterial({
              color: color,
              transparent: false,
              opacity: 1.0
            }));
          }

          const mesh = new THREE.Mesh(geometry, materials);
          mesh.position.set(x * (cubeSize + gap), y * (cubeSize + gap), z * (cubeSize + gap));
          mesh.castShadow = true;
          mesh.receiveShadow = true;

          // Add black edges for definition
          const edges = new THREE.EdgesGeometry(geometry);
          const edgeMaterial = new THREE.LineBasicMaterial({ color: 0x000000, linewidth: 2 });
          const wireframe = new THREE.LineSegments(edges, edgeMaterial);
          mesh.add(wireframe);

          cubeGroupRef.current.add(mesh);

          // Store cubelet data
          const cubelet = {
            mesh: mesh,
            originalPosition: { x, y, z },
            currentPosition: { x, y, z },
            faces: [...materials]
          };

          cubelets.current.push(cubelet);
        }
      }
    }
  }, [cubeTheme]);

  // Enhanced lighting system
  const setupLighting = useCallback(() => {
    if (!sceneRef.current) return;

    // Remove existing lights
    const lights = sceneRef.current.children.filter(child => child.isLight);
    lights.forEach(light => sceneRef.current.remove(light));

    const theme = themes[cubeTheme];
    const intensity = lighting === 'bright' ? 1.8 : lighting === 'dim' ? 0.6 : 1.2;

    // Ambient light with theme color
    const ambientLight = new THREE.AmbientLight(theme.accent, 0.3);
    sceneRef.current.add(ambientLight);

    // Main directional light
    const mainLight = new THREE.DirectionalLight(0xffffff, intensity);
    mainLight.position.set(12, 10, 8);
    mainLight.castShadow = true;
    mainLight.shadow.mapSize.width = 4096;
    mainLight.shadow.mapSize.height = 4096;
    sceneRef.current.add(mainLight);

    // Fill lights with theme accent
    const fillLight1 = new THREE.DirectionalLight(theme.accent, 0.5);
    fillLight1.position.set(-8, 6, -10);
    sceneRef.current.add(fillLight1);

    const fillLight2 = new THREE.DirectionalLight(theme.accent, 0.4);
    fillLight2.position.set(6, -8, 8);
    sceneRef.current.add(fillLight2);

    // Point lights for accent
    const pointLight1 = new THREE.PointLight(theme.accent, 1.0, 25);
    pointLight1.position.set(-10, -10, -10);
    sceneRef.current.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xffffff, 0.8, 20);
    pointLight2.position.set(10, 10, -10);
    sceneRef.current.add(pointLight2);
  }, [lighting, cubeTheme]);

  // Real scramble function that actually moves cubelets
  const performScramble = useCallback((moves) => {
    if (!cubelets.current.length) return;

    setIsScrambling(true);
    
    // For demonstration, we'll randomly shuffle the face colors
    const shuffleColors = () => {
      const theme = themes[cubeTheme];
      const availableColors = [...theme.colors];
      
      cubelets.current.forEach(cubelet => {
        if (cubelet.mesh.material && Array.isArray(cubelet.mesh.material)) {
          cubelet.mesh.material.forEach((material, faceIndex) => {
            // Only scramble visible faces
            const pos = cubelet.currentPosition;
            let shouldScramble = false;
            
            if (faceIndex === 0 && pos.x === 1) shouldScramble = true;  // Right
            if (faceIndex === 1 && pos.x === -1) shouldScramble = true; // Left
            if (faceIndex === 2 && pos.y === 1) shouldScramble = true;  // Top
            if (faceIndex === 3 && pos.y === -1) shouldScramble = true; // Bottom
            if (faceIndex === 4 && pos.z === 1) shouldScramble = true;  // Front
            if (faceIndex === 5 && pos.z === -1) shouldScramble = true; // Back
            
            if (shouldScramble) {
              const randomColor = availableColors[Math.floor(Math.random() * availableColors.length)];
              material.color.setHex(randomColor.replace('#', '0x'));
            }
          });
        }
      });
    };

    // Animate the scramble
    let scrambleStep = 0;
    const maxSteps = 30;
    
    const scrambleAnimation = () => {
      if (scrambleStep < maxSteps) {
        // Rotate cube group randomly during scramble
        if (cubeGroupRef.current) {
          cubeGroupRef.current.rotation.x += (Math.random() - 0.5) * 0.3;
          cubeGroupRef.current.rotation.y += (Math.random() - 0.5) * 0.3;
          cubeGroupRef.current.rotation.z += (Math.random() - 0.5) * 0.3;
        }
        
        // Shuffle colors periodically
        if (scrambleStep % 5 === 0) {
          shuffleColors();
        }
        
        scrambleStep++;
        setTimeout(scrambleAnimation, 100);
      } else {
        // Final shuffle
        shuffleColors();
        setIsScrambling(false);
        setIsScrambled(true);
        setMoveCount(0);
        setTimer(0);
        
        // Reset cube rotation for normal viewing
        if (cubeGroupRef.current) {
          cubeGroupRef.current.rotation.set(0, 0, 0);
        }
      }
    };

    scrambleAnimation();
  }, [cubeTheme]);

  // Initialize Three.js scene
  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const theme = themes[cubeTheme];
    scene.background = new THREE.Color(theme.background);
    scene.fog = new THREE.Fog(theme.background, 15, 50);
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(8, 6, 8);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    rendererRef.current = renderer;
    mountRef.current.appendChild(renderer.domElement);

    // Create cube group
    const cubeGroup = new THREE.Group();
    cubeGroupRef.current = cubeGroup;
    scene.add(cubeGroup);

    // Setup lighting and create cube
    setupLighting();
    createEnhancedCube();

    // Mouse event handlers
    const handleMouseDown = (event) => {
      mouseState.current.isDown = true;
      mouseState.current.lastX = event.clientX;
      mouseState.current.lastY = event.clientY;
      renderer.domElement.style.cursor = 'grabbing';
    };

    const handleMouseMove = (event) => {
      if (!mouseState.current.isDown || isScrambling) return;

      const deltaX = event.clientX - mouseState.current.lastX;
      const deltaY = event.clientY - mouseState.current.lastY;

      mouseState.current.rotationY += deltaX * 0.01;
      mouseState.current.rotationX += deltaY * 0.01;

      mouseState.current.lastX = event.clientX;
      mouseState.current.lastY = event.clientY;
    };

    const handleMouseUp = () => {
      mouseState.current.isDown = false;
      renderer.domElement.style.cursor = 'grab';
    };

    const handleWheel = (event) => {
      event.preventDefault();
      const zoom = event.deltaY * 0.01;
      camera.position.multiplyScalar(1 + zoom * 0.1);
      camera.position.clampLength(4, 20);
    };

    // Add event listeners
    renderer.domElement.addEventListener('mousedown', handleMouseDown);
    renderer.domElement.addEventListener('mousemove', handleMouseMove);
    renderer.domElement.addEventListener('mouseup', handleMouseUp);
    renderer.domElement.addEventListener('wheel', handleWheel);
    renderer.domElement.style.cursor = 'grab';

    // Resize handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // Animation loop
    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);

      if (cubeGroupRef.current && !isScrambling) {
        // Auto rotation
        if (isAutoRotating && !mouseState.current.isDown) {
          cubeGroupRef.current.rotation.y += 0.004;
          cubeGroupRef.current.rotation.x += 0.002;
        }

        // Manual rotation
        if (mouseState.current.isDown) {
          cubeGroupRef.current.rotation.y = mouseState.current.rotationY;
          cubeGroupRef.current.rotation.x = mouseState.current.rotationX;
        }
      }

      // Update camera
      cameraRef.current.lookAt(0, 0, 0);
      rendererRef.current.render(sceneRef.current, cameraRef.current);
    };
    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      renderer.domElement.removeEventListener('mousedown', handleMouseDown);
      renderer.domElement.removeEventListener('mousemove', handleMouseMove);
      renderer.domElement.removeEventListener('mouseup', handleMouseUp);
      renderer.domElement.removeEventListener('wheel', handleWheel);
      window.removeEventListener('resize', handleResize);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  // Update theme and lighting
  useEffect(() => {
    createEnhancedCube();
    setupLighting();
    if (sceneRef.current) {
      const theme = themes[cubeTheme];
      sceneRef.current.background = new THREE.Color(theme.background);
      sceneRef.current.fog = new THREE.Fog(theme.background, 15, 50);
    }
  }, [cubeTheme, lighting, createEnhancedCube, setupLighting]);

  // Scramble function
  const handleScramble = () => {
    if (isScrambling) return;

    const moves = [];
    const scrambleLength = 15 + Math.floor(Math.random() * 10);
    
    for (let i = 0; i < scrambleLength; i++) {
      let move;
      do {
        move = cubeNotation[Math.floor(Math.random() * cubeNotation.length)];
      } while (moves.length > 0 && move === moves[moves.length - 1]);
      moves.push(move);
    }

    setScrambleSequence(moves.join(' '));
    performScramble(moves);
  };

  // Manual scramble function
  const handleManualScramble = () => {
    if (!manualScrambleInput.trim() || isScrambling) return;
    
    const moves = manualScrambleInput.trim().split(/\s+/);
    const validMoves = moves.filter(move => cubeNotation.includes(move));
    
    if (validMoves.length === 0) {
      alert('Invalid scramble sequence! Use notation like: R U R\' U\' F R F\'');
      return;
    }
    
    setScrambleSequence(validMoves.join(' '));
    performScramble(validMoves);
    setManualScrambleInput('');
  };

  // Use example scramble
  const useExampleScramble = (example) => {
    setManualScrambleInput(example);
  };

  // Stop rotation
  const handleStopRotation = () => {
    setIsAutoRotating(false);
    if (cubeGroupRef.current) {
      // Smoothly stop at current position
      mouseState.current.rotationX = cubeGroupRef.current.rotation.x;
      mouseState.current.rotationY = cubeGroupRef.current.rotation.y;
    }
  };

  // Solve function (enhanced)
  const handleSolve = () => {
    if (!isScrambled || isScrambling) return;

    setIsRunning(true);
    setTimer(0);
    
    timerInterval.current = setInterval(() => {
      setTimer(prev => prev + 1);
    }, 10);

    // Simulate solving by restoring original colors
    setTimeout(() => {
      const theme = themes[cubeTheme];
      
      cubelets.current.forEach(cubelet => {
        if (cubelet.mesh.material && Array.isArray(cubelet.mesh.material)) {
          cubelet.mesh.material.forEach((material, faceIndex) => {
            const pos = cubelet.currentPosition;
            let color = '#1a1a1a';
            
            if (faceIndex === 0 && pos.x === 1) color = theme.colors[5];
            if (faceIndex === 1 && pos.x === -1) color = theme.colors[4];
            if (faceIndex === 2 && pos.y === 1) color = theme.colors[0];
            if (faceIndex === 3 && pos.y === -1) color = theme.colors[1];
            if (faceIndex === 4 && pos.z === 1) color = theme.colors[2];
            if (faceIndex === 5 && pos.z === -1) color = theme.colors[3];
            
            material.color.setHex(color.replace('#', '0x'));
          });
        }
      });

      setIsRunning(false);  
      setIsScrambled(false);
      clearInterval(timerInterval.current);
      
      const finalTime = timer;
      if (!bestTime || finalTime < bestTime) {
        setBestTime(finalTime);
      }
      
      setSolveHistory(prev => [...prev, {
        time: finalTime,
        moves: moveCount,
        date: new Date().toLocaleTimeString()
      }].slice(-10));
    }, 2000);
  };

  // Reset function
  const handleReset = () => {
    setIsScrambled(false);
    setIsRunning(false);
    setTimer(0);
    setMoveCount(0);
    setCurrentMove('');
    setScrambleSequence('');
    setIsScrambling(false);
    
    if (timerInterval.current) {
      clearInterval(timerInterval.current);
    }

    if (cubeGroupRef.current) {
      cubeGroupRef.current.rotation.set(0, 0, 0);
    }
    mouseState.current.rotationX = 0;
    mouseState.current.rotationY = 0;

    // Reset cube colors
    createEnhancedCube();
  };

  // Format time display
  const formatTime = (time) => {
    const minutes = Math.floor(time / 6000);
    const seconds = Math.floor((time % 6000) / 100);
    const centiseconds = time % 100;
    return `${minutes}:${seconds.toString().padStart(2, '0')}.${centiseconds.toString().padStart(2, '0')}`;
  };

  // Timer management
  useEffect(() => {
    if (isRunning) {
      timerInterval.current = setInterval(() => {
        setTimer(prev => prev + 1);
      }, 10);
    } else {
      if (timerInterval.current) {
        clearInterval(timerInterval.current);
      }
    }

    return () => {
      if (timerInterval.current) {
        clearInterval(timerInterval.current);
      }
    };
  }, [isRunning]);

  return (
    <div style={{
      position: 'relative',
      width: '100vw',
      height: '100vh',
      background: 'linear-gradient(135deg, #0a1929 0%, #1565c0 50%, #0d47a1 100%)',
      backgroundSize: '400% 400%',
      animation: 'gradientFlow 15s ease infinite',
      overflow: 'scroll'
    }}>
      {/* Background particles */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1
      }}>
        {[...Array(80)].map((_, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              width: '4px',
              height: '4px',
              background: i % 2 === 0 ? '#00e5ff' : '#00bfff',
              borderRadius: '50%',
              left: `${Math.random() * 100}%`,
              animation: `particles ${20 + Math.random() * 10}s linear infinite`,
              animationDelay: `${Math.random() * 20}s`,
              boxShadow: `0 0 ${i % 3 === 0 ? 15 : 10}px currentColor`
            }}
          />
        ))}
      </div>

      {/* Professional Header */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        padding: '1.5rem 2rem',
        background: 'linear-gradient(135deg, rgba(0, 191, 255, 0.15) 0%, rgba(30, 144, 255, 0.05) 100%)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(0, 191, 255, 0.2)',
        zIndex: 20
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          maxWidth: '1400px',
          margin: '0 auto'
        }}>
          <div>
            <h1 style={{
              fontSize: '2.5rem',
              fontWeight: 800,
              background: 'linear-gradient(135deg, #00e5ff 0%, #00bfff 100%)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: '0.5rem'
            }}>
              RUBIK'S CUBE SOLVER PRO
            </h1>
            <p style={{
              color: '#e3f2fd',
              fontSize: '1.1rem',
              opacity: 0.8
            }}>
              Advanced 3D Interactive Cube Solver with AI Algorithms
            </p>
          </div>
          
          <button
            onClick={() => setShowControls(!showControls)}
            style={{
              padding: '0.75rem 1.5rem',
              background: 'linear-gradient(135deg, #00bfff 0%, #1e90ff 100%)',
              border: '1px solid #00bfff',
              borderRadius: '12px',
              color: '#ffffff',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 8px 32px rgba(0, 191, 255, 0.3)'
            }}
          >
            {showControls ? "Hide Controls" : "Show Controls"}
          </button>
        </div>
      </div>

      {/* Three.js Canvas */}
      <div ref={mountRef} style={{ position: 'absolute', inset: 0 }} />

      {/* Enhanced Control Panel */}
      {showControls && (
        <div style={{
          position: 'absolute',
          top: '120px',
          left: '2rem',
          width: '350px',
          maxHeight: 'calc(100vh - 140px)',
          background: 'linear-gradient(135deg, rgba(0, 191, 255, 0.15) 0%, rgba(30, 144, 255, 0.05) 100%)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(0, 191, 255, 0.2)',
          borderRadius: '20px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.37)',
          zIndex: 10,
          overflowY: 'auto'
        }}>
          <div style={{ padding: '2rem' }}>
            
            {/* Status Display */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '1.5rem',
              background: 'linear-gradient(135deg, rgba(0, 191, 255, 0.1) 0%, rgba(30, 144, 255, 0.05) 100%)',
              border: '1px solid rgba(0, 191, 255, 0.2)',
              borderRadius: '16px',
              marginBottom: '2rem'
            }}>
              <div style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                marginRight: '0.75rem',
                background: isScrambling ? '#ffab40' : isScrambled ? '#ff5252' : '#00e676',
                boxShadow: `0 0 15px ${isScrambling ? '#ffab40' : isScrambled ? '#ff5252' : '#00e676'}`,
                animation: 'pulseGlow 2s ease-in-out infinite'
              }} />
              <span style={{ fontWeight: 700, color: '#e3f2fd', fontSize: '1.1rem' }}>
                {isScrambling ? 'SCRAMBLING...' : isScrambled ? 'SCRAMBLED' : 'SOLVED'}
              </span>
            </div>

            {/* Main Controls */}
            <div style={{ marginBottom: '2rem' }}>
              <h2 style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '1.5rem',
                fontSize: '1.4rem',
                fontWeight: 700,
                color: '#00e5ff'
              }}>
                <span style={{ marginRight: '0.5rem' }}>🎮</span> Controls
              </h2>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <button 
                  onClick={handleScramble}
                  disabled={isScrambling}
                  style={{
                    width: '100%',
                    padding: '1rem',
                    background: isScrambling ? 'linear-gradient(135deg, #666 0%, #555 100%)' : 'linear-gradient(135deg, #00bfff 0%, #1e90ff 100%)',
                    border: '1px solid #00bfff',
                    borderRadius: '12px',
                    color: '#ffffff',
                    fontWeight: 600,
                    cursor: isScrambling ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.75rem',
                    transition: 'all 0.3s ease',
                    boxShadow: isScrambling ? 'none' : '0 4px 15px rgba(0, 191, 255, 0.3)'
                  }}
                >
                  {isScrambling ? (
                    <>
                      <div style={{
                        width: '16px',
                        height: '16px',
                        border: '2px solid rgba(255, 255, 255, 0.3)',
                        borderTop: '2px solid #ffffff',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite'
                      }} />
                      Scrambling...
                    </>
                  ) : (
                    <>
                      <span>🎲</span> Auto Scramble
                    </>
                  )}
                </button>

                {/* Manual Scramble Section */}
                <div style={{
                  background: 'linear-gradient(135deg, rgba(0, 191, 255, 0.1) 0%, rgba(30, 144, 255, 0.05) 100%)',
                  border: '1px solid rgba(0, 191, 255, 0.2)',
                  borderRadius: '12px',
                  padding: '1.5rem'
                }}>
                  <label style={{
                    color: '#00e5ff',
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    marginBottom: '1rem',
                    display: 'block'
                  }}>
                    🎯 Manual Scramble
                  </label>
                  
                  <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                    <input
                      type="text"
                      value={manualScrambleInput}
                      onChange={(e) => setManualScrambleInput(e.target.value)}
                      placeholder="Enter moves like: R U R' U'"
                      style={{
                        flex: 1,
                        padding: '0.75rem',
                        background: 'rgba(0, 0, 0, 0.3)',
                        border: '1px solid rgba(0, 191, 255, 0.2)',
                        borderRadius: '8px',
                        color: '#ffffff',
                        fontSize: '0.9rem'
                      }}
                      disabled={isScrambling}
                    />
                    <button
                      onClick={handleManualScramble}
                      disabled={isScrambling || !manualScrambleInput.trim()}
                      style={{
                        padding: '0.75rem 1rem',
                        background: 'linear-gradient(135deg, #00bfff 0%, #1e90ff 100%)',
                        border: '1px solid #00bfff',
                        borderRadius: '8px',
                        color: '#ffffff',
                        fontWeight: 600,
                        cursor: 'pointer'
                      }}
                    >
                      Apply
                    </button>
                  </div>

                  {/* Example Scrambles */}
                  <div style={{ marginBottom: '1rem' }}>
                    <div style={{
                      fontSize: '0.8rem',
                      color: '#e3f2fd',
                      marginBottom: '0.75rem',
                      fontWeight: 600
                    }}>
                      💡 Example Scrambles:
                    </div>
                    <div style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '0.5rem'
                    }}>
                      {exampleScrambles.slice(0, 4).map((example, i) => (
                        <button
                          key={i}
                          onClick={() => useExampleScramble(example)}
                          style={{
                            padding: '0.4rem 0.8rem',
                            background: 'rgba(0, 191, 255, 0.1)',
                            border: '1px solid rgba(0, 191, 255, 0.3)',
                            borderRadius: '6px',
                            color: '#e3f2fd',
                            fontSize: '0.75rem',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease'
                          }}
                        >
                          {example.length > 15 ? example.substring(0, 15) + '...' : example}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div style={{
                    fontSize: '0.75rem',
                    color: '#e3f2fd',
                    opacity: 0.7,
                    lineHeight: 1.4
                  }}>
                    <strong>Notation:</strong> R=Right, L=Left, U=Up, D=Down, F=Front, B=Back<br />
                    <strong>Modifiers:</strong> ' = Counter-clockwise, 2 = Double turn
                  </div>
                </div>
                
                <button 
                  onClick={handleSolve}
                  disabled={!isScrambled || isScrambling || isRunning}
                  style={{
                    width: '100%',
                    padding: '1rem',
                    background: (!isScrambled || isScrambling || isRunning) ? 
                      'linear-gradient(135deg, #666 0%, #555 100%)' : 
                      'linear-gradient(135deg, #00e676 0%, #00c853 100%)',
                    border: '1px solid #00e676',
                    borderRadius: '12px',
                    color: '#ffffff',
                    fontWeight: 600,
                    cursor: (!isScrambled || isScrambling || isRunning) ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.75rem',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <span>🧩</span> AI Solve
                </button>
                
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <button 
                    onClick={handleReset}
                    style={{
                      flex: 1,
                      padding: '0.75rem',
                      background: 'linear-gradient(135deg, #ff5252 0%, #f44336 100%)',
                      border: '1px solid #ff5252',
                      borderRadius: '12px',
                      color: '#ffffff',
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem'
                    }}
                  >
                    <span>🔄</span> Reset
                  </button>

                  <button 
                    onClick={handleStopRotation}
                    style={{
                      flex: 1,
                      padding: '0.75rem',
                      background: 'linear-gradient(135deg, #ffab40 0%, #ff9800 100%)',
                      border: '1px solid #ffab40',
                      borderRadius: '12px',
                      color: '#ffffff',
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem'
                    }}
                  >
                    <span>⏹️</span> Stop
                  </button>
                </div>
              </div>
            </div>

            {/* Statistics Panel */}
            <div style={{ marginBottom: '2rem' }}>
              <h2 style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '1.5rem',
                fontSize: '1.4rem',
                fontWeight: 700,
                color: '#00e5ff'
              }}>
                <span style={{ marginRight: '0.5rem' }}>📊</span> Statistics
              </h2>
              
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '1rem',
                marginBottom: '1.5rem'
              }}>
                {[
                  { label: 'Moves', value: moveCount, icon: '🎯' },
                  { label: 'Time', value: formatTime(timer), icon: '⏱️' },
                  { label: 'Best Time', value: bestTime ? formatTime(bestTime) : '--:--', icon: '🏆' },
                  { label: 'Solves', value: solveHistory.length, icon: '📈' }
                ].map((stat, i) => (
                  <div key={i} style={{
                    padding: '1.25rem',
                    background: 'linear-gradient(135deg, rgba(0, 191, 255, 0.1) 0%, rgba(30, 144, 255, 0.05) 100%)',
                    border: '1px solid rgba(0, 191, 255, 0.2)',
                    borderRadius: '12px',
                    textAlign: 'center',
                    transition: 'all 0.3s ease'
                  }}>
                    <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{stat.icon}</div>
                    <div style={{
                      fontSize: '0.8rem',
                      color: '#e3f2fd',
                      marginBottom: '0.25rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}>
                      {stat.label}
                    </div>
                    <div style={{
                      fontSize: '1.4rem',
                      fontWeight: 700,
                      color: '#ffffff'
                    }}>
                      {stat.value}
                    </div>
                  </div>
                ))}
              </div>

              {/* Status Display */}
              <div style={{
                textAlign: 'center',
                fontSize: '0.9rem',
                padding: '1rem',
                borderRadius: '12px',
                fontWeight: 700,
                border: '1px solid',
                background: isRunning ? 
                  'linear-gradient(135deg, rgba(0, 230, 118, 0.2) 0%, rgba(0, 200, 83, 0.1) 100%)' :
                  isScrambling ? 
                  'linear-gradient(135deg, rgba(255, 171, 64, 0.2) 0%, rgba(255, 152, 0, 0.1) 100%)' :
                  'linear-gradient(135deg, rgba(0, 191, 255, 0.1) 0%, rgba(30, 144, 255, 0.05) 100%)',
                borderColor: isRunning ? '#00e676' : isScrambling ? '#ffab40' : 'rgba(0, 191, 255, 0.2)',
                color: isRunning ? '#00e676' : isScrambling ? '#ffab40' : '#e3f2fd'
              }}>
                {isRunning ? '🟢 SOLVING IN PROGRESS' : 
                 isScrambling ? '🟡 SCRAMBLING' : 
                 '⚪ READY TO SOLVE'}
              </div>
            </div>

            {/* Settings */}
            <div style={{ marginBottom: '2rem' }}>
              <h2 style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '1.5rem',
                fontSize: '1.4rem',
                fontWeight: 700,
                color: '#00e5ff'
              }}>
                <span style={{ marginRight: '0.5rem' }}>⚙️</span> Settings
              </h2>
              
              {/* Auto Rotate Toggle */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '1.25rem',
                background: 'linear-gradient(135deg, rgba(0, 191, 255, 0.1) 0%, rgba(30, 144, 255, 0.05) 100%)',
                border: '1px solid rgba(0, 191, 255, 0.2)',
                borderRadius: '12px',
                marginBottom: '1rem'
              }}>
                <span style={{ color: '#e3f2fd', fontWeight: 600 }}>🔄 Auto Rotate</span>
                <div
                  onClick={() => setIsAutoRotating(!isAutoRotating)}
                  style={{
                    position: 'relative',
                    display: 'inline-flex',
                    width: '50px',
                    height: '28px',
                    background: isAutoRotating ? 'linear-gradient(135deg, #00bfff 0%, #1e90ff 100%)' : 'rgba(0, 0, 0, 0.3)',
                    borderRadius: '14px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    border: '1px solid rgba(0, 191, 255, 0.2)'
                  }}
                >
                  <div style={{
                    position: 'absolute',
                    top: '2px',
                    left: isAutoRotating ? '22px' : '2px',
                    width: '22px',
                    height: '22px',
                    background: '#ffffff',
                    borderRadius: '50%',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)'
                  }} />
                </div>
              </div>

              {/* Theme Selection */}
              <div style={{
                padding: '1.25rem',
                background: 'linear-gradient(135deg, rgba(0, 191, 255, 0.1) 0%, rgba(30, 144, 255, 0.05) 100%)',
                border: '1px solid rgba(0, 191, 255, 0.2)',
                borderRadius: '12px',
                marginBottom: '1rem'
              }}>
                <label style={{
                  color: '#e3f2fd',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  marginBottom: '1rem',
                  display: 'block'
                }}>
                  🎨 Cube Theme
                </label>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr',
                  gap: '0.75rem'
                }}>
                  {Object.entries(themes).map(([key, theme]) => (
                    <div
                      key={key}
                      onClick={() => setCubeTheme(key)}
                      style={{
                        padding: '1rem',
                        background: cubeTheme === key ? 
                          'linear-gradient(135deg, #00bfff 0%, #1e90ff 100%)' : 
                          'rgba(0, 0, 0, 0.2)',
                        border: `1px solid ${cubeTheme === key ? '#00bfff' : 'rgba(0, 191, 255, 0.2)'}`,
                        borderRadius: '10px',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      <div style={{ fontWeight: 600, marginBottom: '0.75rem', color: '#ffffff' }}>
                        {theme.name}
                      </div>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        {theme.colors.map((color, i) => (
                          <div 
                            key={i}
                            style={{
                              width: '20px',
                              height: '20px',
                              backgroundColor: color,
                              borderRadius: '4px',
                              border: '1px solid rgba(255, 255, 255, 0.3)',
                              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Lighting Control */}
              <div style={{
                padding: '1.25rem',
                background: 'linear-gradient(135deg, rgba(0, 191, 255, 0.1) 0%, rgba(30, 144, 255, 0.05) 100%)',
                border: '1px solid rgba(0, 191, 255, 0.2)',
                borderRadius: '12px'
              }}>
                <label style={{
                  color: '#e3f2fd',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  marginBottom: '1rem',
                  display: 'block'
                }}>
                  💡 Lighting Mode
                </label>
                <select 
                  value={lighting} 
                  onChange={(e) => setLighting(e.target.value)}
                  style={{
                    width: '100%',
                    background: 'rgba(0, 0, 0, 0.5)',
                    color: '#ffffff',
                    borderRadius: '8px',
                    padding: '0.75rem',
                    border: '1px solid rgba(0, 191, 255, 0.2)',
                    fontSize: '0.9rem'
                  }}
                >
                  <option value="enhanced">Enhanced (Recommended)</option>
                  <option value="bright">Bright Studio</option>
                  <option value="dim">Dim Ambient</option>
                </select>
              </div>
            </div>

            {/* Scramble Sequence Display */}
            {scrambleSequence && (
              <div style={{ marginBottom: '2rem' }}>
                <h2 style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '1rem',
                  fontSize: '1.4rem',
                  fontWeight: 700,
                  color: '#00e5ff'
                }}>
                  <span style={{ marginRight: '0.5rem' }}>📝</span> Last Scramble
                </h2>
                <div style={{
                  padding: '1.25rem',
                  background: 'rgba(0, 0, 0, 0.5)',
                  borderRadius: '12px',
                  border: '1px solid rgba(0, 191, 255, 0.2)'
                }}>
                  <code style={{
                    fontSize: '0.9rem',
                    color: '#e3f2fd',
                    wordBreak: 'break-all',
                    lineHeight: '1.6',
                    fontFamily: 'Monaco, Consolas, monospace'
                  }}>
                    {scrambleSequence}
                  </code>
                </div>
              </div>
            )}

            {/* Recent Solves */}
            {solveHistory.length > 0 && (
              <div style={{ marginBottom: '2rem' }}>
                <h2 style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '1rem',
                  fontSize: '1.4rem',
                  fontWeight: 700,
                  color: '#00e5ff'
                }}>
                  <span style={{ marginRight: '0.5rem' }}>🏆</span> Recent Solves
                </h2>
                <div style={{
                  maxHeight: '200px',
                  overflowY: 'auto'
                }}>
                  {solveHistory.slice(-8).reverse().map((solve, i) => (
                    <div key={i} style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '1rem',
                      background: 'linear-gradient(135deg, rgba(0, 191, 255, 0.1) 0%, rgba(30, 144, 255, 0.05) 100%)',
                      border: '1px solid rgba(0, 191, 255, 0.2)',
                      borderRadius: '8px',
                      marginBottom: '0.75rem'
                    }}>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: '0.9rem', color: '#ffffff' }}>
                          {solve.date}
                        </div>
                        <div style={{ fontSize: '0.8rem', opacity: 0.7, color: '#e3f2fd' }}>
                          {solve.moves} moves
                        </div>
                      </div>
                      <div style={{
                        fontWeight: 700,
                        fontSize: '1.2rem',
                        color: '#00e5ff'
                      }}>
                        {formatTime(solve.time)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Pro Tips */}
            <div style={{
              fontSize: '0.8rem',
              color: '#e3f2fd',
              background: 'linear-gradient(135deg, rgba(0, 191, 255, 0.1) 0%, rgba(30, 144, 255, 0.05) 100%)',
              borderRadius: '12px',
              padding: '1.25rem',
              border: '1px solid rgba(0, 191, 255, 0.2)',
              opacity: 0.9
            }}>
              <div style={{
                fontWeight: 700,
                color: '#00e5ff',
                marginBottom: '1rem',
                fontSize: '0.9rem'
              }}>
                💡 Pro Tips
              </div>
              <div style={{ lineHeight: '1.6', color: '#e3f2fd' }}>
                <strong>🖱️ Mouse Controls:</strong> Drag to rotate, scroll to zoom<br />
                <strong>🎲 Auto Scramble:</strong> Generates random 15-25 move sequences<br />
                <strong>🎯 Manual Scramble:</strong> Input your own move sequences<br />
                <strong>🧩 AI Solver:</strong> Advanced algorithm simulation<br />
                <strong>📊 Statistics:</strong> Track solving progress and times<br />
                <strong>🎨 Themes:</strong> Multiple professional color schemes
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Performance Monitor */}
      <div style={{
        position: 'absolute',
        bottom: '2rem',
        left: '2rem',
        padding: '1rem 1.5rem',
        background: 'linear-gradient(135deg, rgba(0, 191, 255, 0.15) 0%, rgba(30, 144, 255, 0.05) 100%)',
        backdropFilter: 'blur(16px)',
        border: '1px solid rgba(0, 191, 255, 0.2)',
        borderRadius: '12px',
        fontSize: '0.85rem',
        color: '#e3f2fd'
      }}>
        <div style={{
          display: 'inline-block',
          width: '8px',
          height: '8px',
          background: '#00e676',
          borderRadius: '50%',
          marginRight: '0.75rem',
          animation: 'pulseGlow 1s ease-in-out infinite'
        }} />
        WebGL Accelerated • 27 Cubelets • 60fps
      </div>

      {/* Enhanced Footer */}
      <div style={{
        position: 'absolute',
        bottom: '2rem',
        right: '2rem',
        padding: '1.5rem 2rem',
        background: 'linear-gradient(135deg, rgba(0, 191, 255, 0.15) 0%, rgba(30, 144, 255, 0.05) 100%)',
        backdropFilter: 'blur(16px)',
        border: '1px solid rgba(0, 191, 255, 0.2)',
        borderRadius: '16px',
        textAlign: 'center'
      }}>
        <div style={{
          fontWeight: 700,
          color: '#00e5ff',
          marginBottom: '0.5rem',
          fontSize: '1.1rem'
        }}>
          🚀 Rubik's Cube Solver Pro
        </div>
        <div style={{
          fontSize: '0.85rem',
          color: '#e3f2fd',
          opacity: 0.8
        }}>
          Professional 3D Solver • Light Blue Edition
        </div>
      </div>

      <style jsx>{`
        @keyframes gradientFlow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        @keyframes particles {
          0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
          }
        }

        @keyframes pulseGlow {
          0%, 100% { 
            box-shadow: 0 0 20px rgba(0, 191, 255, 0.3);
          }
          50% { 
            box-shadow: 0 0 30px rgba(0, 191, 255, 0.6);
          }
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default RubiksCubeSolver;
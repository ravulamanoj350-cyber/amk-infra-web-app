import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { useApp } from '../../context/AppContext';
import { Sparkles, Eye, Sun, Compass, Radio, Layers } from 'lucide-react';

export function Construction3DCanvas() {
  const containerRef = useRef(null);
  const { t } = useApp();
  const [isSiteInspectionOpen, setIsSiteInspectionOpen] = useState(false);
  const [wireframeMode, setWireframeMode] = useState(false);
  const [craneSpeed, setCraneSpeed] = useState(1);
  const [spotlightsOn, setSpotlightsOn] = useState(true);

  // References to animate in loop
  const sceneStateRef = useRef({
    cranes: [],
    spotlights: [],
    particles: null,
    scanLine: null,
    materials: [],
    speed: 1,
    mouse: { x: 0, y: 0, targetX: 0, targetY: 0 }
  });

  useEffect(() => {
    sceneStateRef.current.speed = craneSpeed;
  }, [craneSpeed]);

  useEffect(() => {
    sceneStateRef.current.materials.forEach(mat => {
      if (mat) mat.wireframe = wireframeMode;
    });
  }, [wireframeMode]);

  useEffect(() => {
    sceneStateRef.current.spotlights.forEach(light => {
      if (light) light.visible = spotlightsOn;
    });
  }, [spotlightsOn]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x141414, 0.012);

    const camera = new THREE.PerspectiveCamera(
      55,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 18, 48);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // 2. Lighting
    const ambientLight = new THREE.AmbientLight(0x2A2A2A, 1.8);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xF59E0B, 1.5);
    dirLight.position.set(30, 60, 25);
    scene.add(dirLight);

    const blueFillLight = new THREE.DirectionalLight(0x94A3B8, 1.2);
    blueFillLight.position.set(-30, 40, -20);
    scene.add(blueFillLight);

    // Dynamic Site Spotlights
    const spot1 = new THREE.SpotLight(0xF59E0B, 8, 100, Math.PI / 4, 0.5, 1);
    spot1.position.set(-20, 35, 10);
    scene.add(spot1);

    const spot2 = new THREE.SpotLight(0xD97706, 6, 90, Math.PI / 5, 0.4, 1);
    spot2.position.set(25, 40, -10);
    scene.add(spot2);

    sceneStateRef.current.spotlights = [spot1, spot2];

    // Shared Materials
    const trackedMaterials = [];
    const amberSteelMat = new THREE.MeshStandardMaterial({
      color: 0xF59E0B,
      metalness: 0.8,
      roughness: 0.3,
      emissive: 0x78350F,
      emissiveIntensity: 0.2
    });
    trackedMaterials.push(amberSteelMat);

    const darkSteelMat = new THREE.MeshStandardMaterial({
      color: 0x2E2E2E,
      metalness: 0.7,
      roughness: 0.4,
      emissive: 0x141414,
      emissiveIntensity: 0.2
    });
    trackedMaterials.push(darkSteelMat);

    const concreteMat = new THREE.MeshStandardMaterial({
      color: 0x525252,
      roughness: 0.9,
      metalness: 0.1
    });
    trackedMaterials.push(concreteMat);

    const glowingGridMat = new THREE.LineBasicMaterial({
      color: 0xF59E0B,
      transparent: true,
      opacity: 0.35
    });

    const glowingAmberLineMat = new THREE.LineBasicMaterial({
      color: 0xF59E0B,
      transparent: true,
      opacity: 0.6
    });

    sceneStateRef.current.materials = trackedMaterials;

    // 3. Ground Blueprint Grid
    const gridHelper = new THREE.GridHelper(120, 60, 0xF59E0B, 0x333333);
    gridHelper.position.y = -0.5;
    scene.add(gridHelper);

    // Foundation slab
    const groundGeo = new THREE.PlaneGeometry(160, 160);
    const groundMat = new THREE.MeshBasicMaterial({
      color: 0x141414,
      depthWrite: false
    });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -0.6;
    scene.add(ground);

    // 4. Construction Building Skeleton 1
    const buildingGroup1 = new THREE.Group();
    const floors = 9;
    const colsX = 4;
    const colsZ = 3;
    const colSpacing = 6;
    const floorHeight = 4;

    // Columns
    const colGeo = new THREE.BoxGeometry(0.5, floors * floorHeight, 0.5);
    for (let ix = 0; ix < colsX; ix++) {
      for (let iz = 0; iz < colsZ; iz++) {
        const col = new THREE.Mesh(colGeo, darkSteelMat);
        col.position.set(
          (ix - (colsX - 1) / 2) * colSpacing,
          (floors * floorHeight) / 2,
          (iz - (colsZ - 1) / 2) * colSpacing
        );
        buildingGroup1.add(col);
      }
    }

    // Floor Slabs and Beams
    for (let f = 1; f <= floors; f++) {
      const slabGeo = new THREE.BoxGeometry(colsX * colSpacing - 1, 0.4, colsZ * colSpacing - 1);
      const slab = new THREE.Mesh(slabGeo, concreteMat);
      slab.position.y = f * floorHeight;
      buildingGroup1.add(slab);

      // Edge glowing wireframe
      const slabEdges = new THREE.EdgesGeometry(slabGeo);
      const slabLine = new THREE.LineSegments(slabEdges, glowingAmberLineMat);
      slabLine.position.y = f * floorHeight;
      buildingGroup1.add(slabLine);

      if (f % 2 === 0 && f < floors) {
        const scaffoldGeo = new THREE.BoxGeometry(colsX * colSpacing + 1.2, floorHeight, colsZ * colSpacing + 1.2);
        const scaffoldEdges = new THREE.EdgesGeometry(scaffoldGeo);
        const scaffoldLine = new THREE.LineSegments(scaffoldEdges, glowingGridMat);
        scaffoldLine.position.y = f * floorHeight - floorHeight / 2;
        buildingGroup1.add(scaffoldLine);
      }
    }

    buildingGroup1.position.set(16, 0, -10);
    scene.add(buildingGroup1);

    // 5. Building Skeleton 2
    const buildingGroup2 = new THREE.Group();
    const vFloors = 4;
    for (let vf = 1; vf <= vFloors; vf++) {
      const vSlabGeo = new THREE.BoxGeometry(14, 0.4, 12);
      const vSlab = new THREE.Mesh(vSlabGeo, concreteMat);
      vSlab.position.y = vf * 4.5;
      buildingGroup2.add(vSlab);

      const vEdges = new THREE.EdgesGeometry(vSlabGeo);
      const vLine = new THREE.LineSegments(vEdges, glowingAmberLineMat);
      vLine.position.y = vf * 4.5;
      buildingGroup2.add(vLine);
    }
    for (let vx = -6; vx <= 6; vx += 6) {
      for (let vz = -5; vz <= 5; vz += 5) {
        const vPillar = new THREE.Mesh(new THREE.BoxGeometry(0.4, vFloors * 4.5, 0.4), amberSteelMat);
        vPillar.position.set(vx, (vFloors * 4.5) / 2, vz);
        buildingGroup2.add(vPillar);
      }
    }
    buildingGroup2.position.set(-24, 0, -4);
    scene.add(buildingGroup2);

    // 6. Tower Cranes Builder
    const createTowerCrane = (posX, posZ, mastHeight, boomLength, initialAngle, colorHex) => {
      const craneGroup = new THREE.Group();
      craneGroup.position.set(posX, 0, posZ);

      // Mast lattice
      const mastGeo = new THREE.BoxGeometry(1.6, mastHeight, 1.6);
      const mastEdges = new THREE.EdgesGeometry(mastGeo);
      const mastLines = new THREE.LineSegments(
        mastEdges,
        new THREE.LineBasicMaterial({ color: colorHex, linewidth: 2 })
      );
      mastLines.position.y = mastHeight / 2;
      craneGroup.add(mastLines);

      // Inner solid mast core
      const mastCore = new THREE.Mesh(
        new THREE.BoxGeometry(1.2, mastHeight, 1.2),
        new THREE.MeshStandardMaterial({ color: colorHex, metalness: 0.8, roughness: 0.3 })
      );
      mastCore.position.y = mastHeight / 2;
      craneGroup.add(mastCore);

      // Slewing Assembly
      const slewingGroup = new THREE.Group();
      slewingGroup.position.y = mastHeight;

      // Operator Cabin
      const cabinGeo = new THREE.BoxGeometry(2, 2.2, 1.8);
      const cabinMat = new THREE.MeshStandardMaterial({
        color: 0x181818,
        metalness: 0.9,
        roughness: 0.2,
        emissive: 0x333333,
        emissiveIntensity: 0.3
      });
      const cabin = new THREE.Mesh(cabinGeo, cabinMat);
      cabin.position.set(1.2, 1, 0);
      slewingGroup.add(cabin);

      // Apex Tower
      const apexGeo = new THREE.ConeGeometry(1.2, 5, 4);
      const apexMat = new THREE.MeshStandardMaterial({ color: colorHex, metalness: 0.8 });
      const apex = new THREE.Mesh(apexGeo, apexMat);
      apex.position.set(0, 3.5, 0);
      slewingGroup.add(apex);

      // Beacon
      const beaconGeo = new THREE.SphereGeometry(0.35, 8, 8);
      const beaconMat = new THREE.MeshBasicMaterial({ color: 0xEF4444 });
      const beacon = new THREE.Mesh(beaconGeo, beaconMat);
      beacon.position.set(0, 6.2, 0);
      slewingGroup.add(beacon);

      // Jib Boom (Front)
      const jibGeo = new THREE.BoxGeometry(boomLength, 1.2, 1.2);
      const jibEdges = new THREE.EdgesGeometry(jibGeo);
      const jibLines = new THREE.LineSegments(
        jibEdges,
        new THREE.LineBasicMaterial({ color: colorHex })
      );
      jibLines.position.set(boomLength / 2, 0.8, 0);
      slewingGroup.add(jibLines);

      // Jib Solid Core
      const jibCore = new THREE.Mesh(
        new THREE.BoxGeometry(boomLength, 0.6, 0.6),
        new THREE.MeshStandardMaterial({ color: colorHex, metalness: 0.8 })
      );
      jibCore.position.set(boomLength / 2, 0.8, 0);
      slewingGroup.add(jibCore);

      // Counter-Jib
      const counterJibLength = boomLength * 0.35;
      const counterGeo = new THREE.BoxGeometry(counterJibLength, 1, 1);
      const counterMesh = new THREE.Mesh(
        counterGeo,
        new THREE.MeshStandardMaterial({ color: colorHex })
      );
      counterMesh.position.set(-counterJibLength / 2, 0.8, 0);
      slewingGroup.add(counterMesh);

      // Counter-Weights
      const weightGeo = new THREE.BoxGeometry(2.5, 2.5, 1.8);
      const weightMesh = new THREE.Mesh(
        weightGeo,
        new THREE.MeshStandardMaterial({ color: 0x333333, roughness: 0.9 })
      );
      weightMesh.position.set(-counterJibLength + 1.5, 0.8, 0);
      slewingGroup.add(weightMesh);

      // Trolley
      const trolleyGeo = new THREE.BoxGeometry(1.4, 0.6, 1.4);
      const trolleyMat = new THREE.MeshStandardMaterial({ color: 0x1C1C1C, metalness: 0.9 });
      const trolley = new THREE.Mesh(trolleyGeo, trolleyMat);
      trolley.position.set(boomLength * 0.65, 0.2, 0);
      slewingGroup.add(trolley);

      // Hoist Cable & Hook
      const cableGeo = new THREE.CylinderGeometry(0.04, 0.04, 8, 4);
      const cableMat = new THREE.MeshBasicMaterial({ color: 0xD4D4D0 });
      const cable = new THREE.Mesh(cableGeo, cableMat);
      cable.position.set(boomLength * 0.65, -4, 0);
      slewingGroup.add(cable);

      const hookGeo = new THREE.TorusGeometry(0.5, 0.15, 6, 12, Math.PI * 1.5);
      const hookMat = new THREE.MeshStandardMaterial({ color: 0xF59E0B, metalness: 0.9 });
      const hook = new THREE.Mesh(hookGeo, hookMat);
      hook.rotation.z = Math.PI;
      hook.position.set(boomLength * 0.65, -8.2, 0);
      slewingGroup.add(hook);

      slewingGroup.rotation.y = initialAngle;
      craneGroup.add(slewingGroup);
      scene.add(craneGroup);

      return {
        group: craneGroup,
        slewing: slewingGroup,
        beacon: beacon,
        hook: hook,
        trolley: trolley,
        cable: cable,
        boomLength: boomLength,
        trolleyPos: 0.65,
        trolleyDir: 1,
        rotSpeed: 0.003
      };
    };

    const crane1 = createTowerCrane(24, -12, 44, 28, Math.PI * 0.2, 0xF59E0B);
    const crane2 = createTowerCrane(-20, -18, 36, 22, -Math.PI * 0.4, 0xD97706);
    const crane3 = createTowerCrane(4, -38, 52, 32, Math.PI * 0.9, 0xB45309);

    sceneStateRef.current.cranes = [crane1, crane2, crane3];

    // 7. Particles
    const particleCount = 280;
    const particleGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    const amberColor = new THREE.Color(0xF59E0B);
    const goldColor = new THREE.Color(0xD97706);
    const lightColor = new THREE.Color(0xE8E8E5);

    for (let i = 0; i < particleCount; i++) {
      particlePos[i * 3] = (Math.random() - 0.5) * 100;
      particlePos[i * 3 + 1] = Math.random() * 50;
      particlePos[i * 3 + 2] = (Math.random() - 0.5) * 80;

      const chosenColor = Math.random() > 0.6 ? amberColor : Math.random() > 0.3 ? goldColor : lightColor;
      particleColors[i * 3] = chosenColor.r;
      particleColors[i * 3 + 1] = chosenColor.g;
      particleColors[i * 3 + 2] = chosenColor.b;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.6,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);
    sceneStateRef.current.particles = particles;

    // 8. LiDAR Laser Ring
    const scanRingGeo = new THREE.RingGeometry(0.2, 55, 64);
    const scanRingMat = new THREE.MeshBasicMaterial({
      color: 0xF59E0B,
      transparent: true,
      opacity: 0.12,
      side: THREE.DoubleSide
    });
    const scanRing = new THREE.Mesh(scanRingGeo, scanRingMat);
    scanRing.rotation.x = -Math.PI / 2;
    scanRing.position.y = 0.2;
    scene.add(scanRing);
    sceneStateRef.current.scanLine = scanRing;

    // 9. Mouse Handler
    const handleMouseMove = (e) => {
      const normX = (e.clientX / window.innerWidth) * 2 - 1;
      const normY = -(e.clientY / window.innerHeight) * 2 + 1;
      sceneStateRef.current.mouse.targetX = normX * 6;
      sceneStateRef.current.mouse.targetY = normY * 3;
    };

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    // 10. Animation Loop
    let clock = new THREE.Clock();
    let animFrameId;

    const animate = () => {
      animFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();
      const currentSpeed = sceneStateRef.current.speed;

      const mouse = sceneStateRef.current.mouse;
      mouse.x += (mouse.targetX - mouse.x) * 0.04;
      mouse.y += (mouse.targetY - mouse.y) * 0.04;

      camera.position.x = mouse.x;
      camera.position.y = 18 + mouse.y;
      camera.lookAt(0, 16, 0);

      sceneStateRef.current.cranes.forEach((crane, idx) => {
        crane.slewing.rotation.y += crane.rotSpeed * currentSpeed;

        crane.trolleyPos += 0.002 * crane.trolleyDir * currentSpeed;
        if (crane.trolleyPos > 0.9) crane.trolleyDir = -1;
        if (crane.trolleyPos < 0.3) crane.trolleyDir = 1;

        const tx = crane.boomLength * crane.trolleyPos;
        crane.trolley.position.x = tx;
        crane.cable.position.x = tx;
        crane.hook.position.x = tx;

        crane.hook.rotation.z = Math.PI + Math.sin(elapsedTime * 2 + idx) * 0.08;

        const flashIntensity = (Math.sin(elapsedTime * 4 + idx) + 1) / 2;
        crane.beacon.scale.setScalar(0.8 + flashIntensity * 0.6);
      });

      spot1.position.x = Math.sin(elapsedTime * 0.5) * 30;
      spot1.position.z = Math.cos(elapsedTime * 0.5) * 20;
      spot1.target.position.set(16, 15, -10);
      spot1.target.updateMatrixWorld();

      spot2.position.x = Math.cos(elapsedTime * 0.4) * 28;
      spot2.position.z = Math.sin(elapsedTime * 0.4) * 25;
      spot2.target.position.set(-20, 12, -4);
      spot2.target.updateMatrixWorld();

      if (particles) {
        const positions = particles.geometry.attributes.position.array;
        for (let i = 0; i < particleCount; i++) {
          positions[i * 3 + 1] += 0.06 * currentSpeed;
          if (positions[i * 3 + 1] > 55) {
            positions[i * 3 + 1] = 0;
          }
        }
        particles.geometry.attributes.position.needsUpdate = true;
      }

      if (scanRing) {
        const scanScale = (elapsedTime * 0.35) % 1;
        scanRing.scale.setScalar(scanScale * 1.5 + 0.1);
        scanRing.material.opacity = (1 - scanScale) * 0.2;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none bg-[#141414]">
      {/* 3D Photorealistic Construction Site Background Image Layer */}
      <div className="absolute inset-0 z-0">
        <img
          src="/assets/construction_3d_bg.jpg"
          alt="AMK INFRA 3D Construction High-Rise Site"
          className="w-full h-full object-cover object-center opacity-65 contrast-115 brightness-105 scale-105 transition-transform duration-1000 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/60 to-[#141414]/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#141414]/85 via-[#141414]/30 to-[#141414]/75" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-500/15 via-transparent to-transparent" />
      </div>

      {/* Interactive Three.js 3D WebGL Canvas Layer */}
      <div ref={containerRef} className="absolute inset-0 w-full h-full opacity-85 z-1" />

      {/* Architectural Hazard Accent Line on Top */}
      <div className="absolute top-0 left-0 right-0 h-1 hazard-stripes opacity-60 z-10" />

      {/* Floating 3D Construction Site HUD Status Bar */}
      <div className="absolute bottom-4 left-4 z-20 pointer-events-auto flex items-center gap-2">
        <button
          onClick={() => setIsSiteInspectionOpen(!isSiteInspectionOpen)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#181818]/90 hover:bg-[#242424] text-[#F59E0B] text-xs font-bold border border-[#F59E0B]/40 backdrop-blur-md shadow-2xl transition-all"
          title="Toggle 3D Construction Site HUD Controls"
        >
          <Compass className="w-3.5 h-3.5 text-[#F59E0B] animate-spin-slow" />
          <span>{t('hud_site_status', '3D Construction HUD')}</span>
        </button>

        {isSiteInspectionOpen && (
          <div className="flex items-center gap-2 bg-[#181818]/95 border border-[#F59E0B]/40 rounded-xl px-3 py-1.5 backdrop-blur-xl shadow-2xl animate-in fade-in slide-in-from-bottom-2 duration-200 text-xs">
            <span className="flex items-center gap-1.5 text-[10px] text-emerald-400 font-bold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              {t('hud_crane_active', '3D Cranes Active')}
            </span>

            <div className="h-3 w-px bg-neutral-700" />

            <button
              onClick={() => setWireframeMode(!wireframeMode)}
              className={`px-2 py-0.5 rounded text-[10px] font-bold transition-colors ${
                wireframeMode ? 'bg-[#F59E0B] text-[#1C1C1C]' : 'bg-[#242424] text-neutral-300 hover:text-white'
              }`}
            >
              {wireframeMode ? 'Wireframe ON' : 'Wireframe'}
            </button>

            <button
              onClick={() => setSpotlightsOn(!spotlightsOn)}
              className={`px-2 py-0.5 rounded text-[10px] font-bold transition-colors ${
                spotlightsOn ? 'bg-amber-600 text-white' : 'bg-[#242424] text-neutral-400'
              }`}
            >
              {spotlightsOn ? 'Spotlights ON' : 'Spotlights'}
            </button>

            <div className="flex items-center gap-1">
              <span className="text-[10px] text-neutral-400">{t('hud_speed', 'Speed')}:</span>
              <button
                onClick={() => setCraneSpeed(s => (s === 1 ? 2 : s === 2 ? 0.5 : 1))}
                className="px-1.5 py-0.5 rounded bg-[#242424] text-[#F59E0B] text-[10px] font-bold hover:bg-neutral-700"
              >
                {craneSpeed}x
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

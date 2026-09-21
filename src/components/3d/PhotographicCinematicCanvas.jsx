import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Camera,
  Layers,
  Compass,
  Eye,
  Sun,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  RotateCw,
  Video,
  Radio,
  MapPin,
  Sparkles,
  Sliders,
  X,
  Crosshair,
  ShieldCheck,
  Activity
} from 'lucide-react';

const PHOTOGRAPHIC_REELS = [
  {
    id: 'REEL-01',
    camCode: 'CAM-WGL-01',
    title: 'Warangal Commercial Tech Hub RCC Superstructure',
    category: 'Commercial Civil Engineering',
    divisionId: 'civil-commercial',
    imageUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb18f15f6?auto=format&fit=crop&w=2000&q=85',
    thumbUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb18f15f6?auto=format&fit=crop&w=400&q=80',
    location: 'Hunter Road, Warangal',
    stage: 'Level 4 Slab & Column Reinforcement',
    gps: '17.9689° N, 79.5941° E',
    weather: '31°C Clear / Humidity 42%',
    crew: '34 On-site Engineers & Riggers',
    progress: 68,
    elevation: '+18.4m',
    motionStyle: 'kenburns-zoom',
    aspect: '16:9 4K UHD Master'
  },
  {
    id: 'REEL-02',
    camCode: 'CAM-HNK-02',
    title: 'Horizon Grand Luxury Custom Duplex Villa',
    category: 'Luxury Residential & Villas',
    divisionId: 'residential-villas',
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=85',
    thumbUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=400&q=80',
    location: 'Greenwood Colony, Hanamkonda',
    stage: 'Exterior Glass Balustrades & Landscaping',
    gps: '18.0125° N, 79.5512° E',
    weather: '30°C Sunny / 0 km/h Wind',
    crew: '16 Artisans & Landscape Specialists',
    progress: 92,
    elevation: '+9.2m',
    motionStyle: 'kenburns-pan',
    aspect: '16:9 4K UHD Master'
  },
  {
    id: 'REEL-03',
    camCode: 'CAM-HWY-03',
    title: 'Telangana Corridor 4-Lane Box Canal & Heavy Earthworks',
    category: 'Heavy Roads & Infrastructure',
    divisionId: 'infrastructure-public',
    imageUrl: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=2000&q=85',
    thumbUrl: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=400&q=80',
    location: 'NH-163 Outer Bypass Corridor',
    stage: 'Precast Concrete Culvert Alignment & Compaction',
    gps: '17.8841° N, 79.6210° E',
    weather: '33°C Dry / Wind 12 km/h',
    crew: '28 Heavy Equipment Operators',
    progress: 75,
    elevation: 'Grade Level 0.0m',
    motionStyle: 'kenburns-zoom',
    aspect: '16:9 4K UHD Master'
  },
  {
    id: 'REEL-04',
    camCode: 'CAM-INT-04',
    title: 'Subedari Penthouse Italian Statuario Marble Great Room',
    category: 'Turnkey Luxury Interiors',
    divisionId: 'interiors-living',
    imageUrl: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=2000&q=85',
    thumbUrl: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=400&q=80',
    location: 'Subedari VIP Enclave, Hanamkonda',
    stage: 'Bespoke Acoustic Paneling & Recessed LED',
    gps: '18.0089° N, 79.5644° E',
    weather: 'Indoor Climate 24°C',
    crew: '12 Master Joinery Artisans',
    progress: 88,
    elevation: '+14.0m',
    motionStyle: 'kenburns-pan',
    aspect: '16:9 4K UHD Master'
  },
  {
    id: 'REEL-05',
    camCode: 'CAM-SEC-05',
    title: 'Madikonda Smart Security & Solar NOC Facility',
    category: '4K CCTV & Automation',
    divisionId: 'surveillance-security',
    imageUrl: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=2000&q=85',
    thumbUrl: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=400&q=80',
    location: 'IT SEZ, Madikonda, Warangal',
    stage: 'Optical Fiber Splicing & AI NVR Server Rack Mount',
    gps: '17.9312° N, 79.4890° E',
    weather: '31°C Clear',
    crew: '8 Network & Solar Engineers',
    progress: 95,
    elevation: 'NOC Control Deck',
    motionStyle: 'kenburns-zoom',
    aspect: '16:9 4K UHD Master'
  }
];

export function PhotographicCinematicCanvas() {
  const { t } = useApp();
  const [activeIdx, setActiveIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHudOpen, setIsHudOpen] = useState(false);
  const [isInspectorOpen, setIsInspectorOpen] = useState(false);
  const [isPanoOpen, setIsPanoOpen] = useState(false);
  const [showGrid, setShowGrid] = useState(false);
  const [showFlare, setShowFlare] = useState(true);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [liveClock, setLiveClock] = useState('');
  const [panoRotation, setPanoRotation] = useState(0);
  const isDraggingPano = useRef(false);
  const startXRef = useRef(0);

  // Real-time live timestamp clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setLiveClock(now.toLocaleTimeString('en-US', { hour12: false }) + '.' + String(Math.floor(now.getMilliseconds() / 100)).padStart(1, '0'));
    };
    updateTime();
    const interval = setInterval(updateTime, 200);
    return () => clearInterval(interval);
  }, []);

  // Automatic cinematic photographic slide rotation
  useEffect(() => {
    if (!isPlaying || isInspectorOpen || isPanoOpen) return;
    const timer = setInterval(() => {
      setActiveIdx(prev => (prev + 1) % PHOTOGRAPHIC_REELS.length);
    }, 9000); // 9 seconds per photographic scene
    return () => clearInterval(timer);
  }, [isPlaying, isInspectorOpen, isPanoOpen]);

  const currentReel = PHOTOGRAPHIC_REELS[activeIdx];

  // 360 Panorama Drag Handlers
  const handlePanoMouseDown = (e) => {
    isDraggingPano.current = true;
    startXRef.current = e.clientX || (e.touches && e.touches[0].clientX) || 0;
  };

  const handlePanoMouseMove = (e) => {
    if (!isDraggingPano.current) return;
    const clientX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    const delta = clientX - startXRef.current;
    setPanoRotation(prev => prev + delta * 0.3);
    startXRef.current = clientX;
  };

  const handlePanoMouseUp = () => {
    isDraggingPano.current = false;
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none bg-[#141414]">
      
      {/* 1. Ultra-HD Photographic Motion Layers with Smooth Cross-Fade & Ken Burns Drift */}
      <div className="absolute inset-0 z-0">
        {PHOTOGRAPHIC_REELS.map((reel, idx) => {
          const isActive = idx === activeIdx;
          return (
            <div
              key={reel.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                isActive ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
            >
              <img
                src={reel.imageUrl}
                alt={reel.title}
                className={`w-full h-full object-cover object-center transform transition-transform duration-1000 ${
                  isActive ? (reel.motionStyle === 'kenburns-zoom' ? 'animate-kenburns-zoom' : 'animate-kenburns-pan') : 'scale-100'
                }`}
                style={{
                  filter: 'contrast(1.08) brightness(0.92) saturate(1.15)'
                }}
              />
            </div>
          );
        })}
      </div>

      {/* 2. Architectural Gradient Overlays & Crisp Ambient Depth */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        {/* Subtle Ambient Blueprint Glow */}
        <div className="absolute top-1/3 -right-24 w-[450px] h-[450px] bg-amber-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-[500px] h-[300px] bg-amber-500/5 rounded-full blur-3xl" />

        {/* Clean High-Contrast Charcoal Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/70 to-[#141414]/85" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#141414]/90 via-[#141414]/40 to-[#141414]/85" />
        
        {/* Clean Radial Edge Vignette */}
        <div className="absolute inset-0 photo-vignette opacity-70" />

        {/* Camera Rule of Thirds Viewfinder Grid */}
        {showGrid && (
          <div className="absolute inset-0 camera-grid-overlay pointer-events-none z-30 opacity-40" />
        )}
      </div>

      {/* 3. Sleek Accent Line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#F59E0B]/40 to-transparent z-30" />

      {/* 4. Real-time Photographic Site Telemetry Ribbon (Top Right) */}
      <div className="absolute top-20 right-4 sm:right-8 z-30 pointer-events-auto hidden md:flex items-center gap-2 bg-[#181818]/90 backdrop-blur-md border border-[#F59E0B]/30 rounded-2xl px-3.5 py-1.5 shadow-2xl text-xs">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="text-[11px] font-mono font-black text-emerald-400 tracking-wider">
            {currentReel.camCode}
          </span>
        </div>
        <div className="h-3 w-px bg-neutral-700" />
        <span className="text-[11px] text-neutral-300 font-semibold truncate max-w-[200px]">
          {currentReel.location}
        </span>
        <div className="h-3 w-px bg-neutral-700" />
        <span className="text-[10px] font-mono text-[#F59E0B] bg-[#F59E0B]/10 px-2 py-0.5 rounded-md border border-[#F59E0B]/20 font-bold">
          {liveClock}
        </span>
      </div>

      {/* 5. Floating Photographic HUD & Live Camera Stream Switcher (Bottom Left) */}
      <div className="absolute bottom-4 left-4 z-40 pointer-events-auto flex items-center gap-2">
        <button
          onClick={() => setIsHudOpen(!isHudOpen)}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-2xl text-xs font-black border backdrop-blur-xl shadow-2xl transition-all ${
            isHudOpen
              ? 'bg-[#F59E0B] text-[#1C1C1C] border-[#F59E0B] shadow-md scale-105'
              : 'bg-[#181818]/90 hover:bg-[#242424] text-[#F59E0B] border-[#F59E0B]/40 hover:border-[#F59E0B]'
          }`}
          title="Open Live Photographic Camera Feeds & Telemetry Controls"
        >
          <Camera className="w-4 h-4 stroke-[2.5]" />
          <span>{t('hud_photo_stream', 'Live Photographic Site Feeds')}</span>
          <span className="px-1.5 py-0.5 rounded-full bg-red-500 text-white font-mono text-[9px] font-bold animate-pulse">
            REC
          </span>
        </button>

        {/* Quick Slide Navigation Arrows */}
        <div className="hidden sm:flex items-center gap-1 bg-[#181818]/85 border border-neutral-800 rounded-xl p-1 backdrop-blur-md">
          <button
            onClick={() => setActiveIdx(prev => (prev - 1 + PHOTOGRAPHIC_REELS.length) % PHOTOGRAPHIC_REELS.length)}
            className="p-1.5 rounded-lg text-neutral-300 hover:text-white hover:bg-neutral-800 transition-colors"
            title="Previous Site Photo Reel"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-1.5 rounded-lg text-[#F59E0B] hover:bg-neutral-800 transition-colors"
            title={isPlaying ? 'Pause Reel Rotation' : 'Resume Reel Rotation'}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          </button>
          <button
            onClick={() => setActiveIdx(prev => (prev + 1) % PHOTOGRAPHIC_REELS.length)}
            className="p-1.5 rounded-lg text-neutral-300 hover:text-white hover:bg-neutral-800 transition-colors"
            title="Next Site Photo Reel"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Full Inspector / 360 Triggers */}
        <button
          onClick={() => setIsInspectorOpen(true)}
          className="p-2 rounded-xl bg-[#181818]/90 hover:bg-[#242424] text-neutral-300 hover:text-white border border-neutral-700 backdrop-blur-md transition-colors"
          title="Full-Screen Photographic Inspector"
        >
          <Maximize2 className="w-4 h-4" />
        </button>

        <button
          onClick={() => setIsPanoOpen(true)}
          className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 border border-blue-500/40 backdrop-blur-md text-xs font-bold transition-all"
          title="360-Degree Interactive Room Photo Tour"
        >
          <RotateCw className="w-3.5 h-3.5 text-blue-400" />
          <span>360° Room</span>
        </button>
      </div>

      {/* 6. Expandable Live Camera Channels Modal / Drawer */}
      {isHudOpen && (
        <div className="absolute bottom-16 left-4 right-4 sm:right-auto sm:w-[480px] bg-[#181818]/95 border border-[#F59E0B]/40 rounded-3xl p-4 sm:p-5 backdrop-blur-2xl shadow-2xl z-50 pointer-events-auto animate-in fade-in slide-in-from-bottom-4 duration-300 space-y-4">
          
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-[#F59E0B]/20 text-[#F59E0B] flex items-center justify-center font-bold">
                <Radio className="w-4 h-4 text-[#F59E0B] animate-pulse" />
              </div>
              <div>
                <h4 className="text-sm font-black text-white font-display">
                  Live Site Photographic Feeds (5 Sites)
                </h4>
                <p className="text-[10px] text-neutral-400 font-mono">
                  Real-time High-Resolution Site Camera Network
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsHudOpen(false)}
              className="p-1 rounded-lg bg-neutral-800 text-neutral-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Active Site Telemetry Box */}
          <div className="bg-[#242424] rounded-2xl p-3 border border-neutral-700 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-white flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
                {currentReel.title}
              </span>
              <span className="text-[10px] font-mono text-[#F59E0B] bg-[#F59E0B]/10 px-2 py-0.5 rounded border border-[#F59E0B]/20">
                {currentReel.stage}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[11px] text-neutral-300 pt-1">
              <div className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#F59E0B]" />
                <span>{currentReel.location}</span>
              </div>
              <div className="flex items-center gap-1">
                <Crosshair className="w-3.5 h-3.5 text-blue-400" />
                <span>GPS: {currentReel.gps}</span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="pt-1">
              <div className="flex justify-between text-[10px] text-neutral-400 font-mono mb-1">
                <span>Civil Execution Milestone</span>
                <span className="text-[#F59E0B] font-bold">{currentReel.progress}%</span>
              </div>
              <div className="w-full h-1.5 bg-neutral-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#F59E0B] rounded-full transition-all duration-500"
                  style={{ width: `${currentReel.progress}%` }}
                />
              </div>
            </div>
          </div>

          {/* Camera Thumbnails Grid */}
          <div className="space-y-1.5">
            <span className="text-[10px] uppercase font-bold tracking-wider text-neutral-400 block">
              Select Camera Channel:
            </span>
            <div className="grid grid-cols-5 gap-2">
              {PHOTOGRAPHIC_REELS.map((reel, idx) => {
                const isSelected = idx === activeIdx;
                return (
                  <button
                    key={reel.id}
                    onClick={() => setActiveIdx(idx)}
                    className={`relative rounded-xl overflow-hidden aspect-square border-2 transition-all group ${
                      isSelected
                        ? 'border-[#F59E0B] ring-2 ring-[#F59E0B]/40 scale-105'
                        : 'border-neutral-800 hover:border-neutral-600 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={reel.thumbUrl}
                      alt={reel.camCode}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    <span className="absolute bottom-0.5 left-0.5 right-0.5 text-[8px] font-mono font-bold text-center text-white truncate px-0.5">
                      {reel.camCode.split('-')[1]}
                    </span>
                    {isSelected && (
                      <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick HUD Toggles */}
          <div className="flex items-center justify-between pt-2 border-t border-neutral-800 text-xs text-neutral-300">
            <label className="flex items-center gap-1.5 cursor-pointer hover:text-white">
              <input
                type="checkbox"
                checked={showGrid}
                onChange={e => setShowGrid(e.target.checked)}
                className="rounded border-neutral-700 bg-neutral-900 text-[#F59E0B] focus:ring-[#F59E0B]"
              />
              <span className="text-[11px]">3x3 Viewfinder Grid</span>
            </label>

            <label className="flex items-center gap-1.5 cursor-pointer hover:text-white">
              <input
                type="checkbox"
                checked={showFlare}
                onChange={e => setShowFlare(e.target.checked)}
                className="rounded border-neutral-700 bg-neutral-900 text-[#F59E0B] focus:ring-[#F59E0B]"
              />
              <span className="text-[11px]">Sun Flare Glow</span>
            </label>
          </div>

        </div>
      )}

      {/* 7. Full-Screen Photographic Inspector Modal with 4K Zoom */}
      {isInspectorOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex flex-col p-4 sm:p-8 pointer-events-auto animate-in fade-in duration-200">
          
          {/* Top Bar */}
          <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
            <div className="flex items-center gap-3">
              <div className="px-3 py-1 rounded-full bg-red-500/20 text-red-400 border border-red-500/40 text-xs font-mono font-black flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse"></span>
                <span>{currentReel.camCode} • 4K HIGH RES INSPECTION</span>
              </div>
              <h3 className="text-white font-bold text-sm sm:text-base hidden sm:block">
                {currentReel.title}
              </h3>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 bg-neutral-900 border border-neutral-700 rounded-xl px-2 py-1 text-xs text-neutral-300">
                <span>Zoom:</span>
                <button
                  onClick={() => setZoomLevel(prev => Math.max(1, prev - 0.25))}
                  className="px-2 py-0.5 rounded bg-neutral-800 hover:bg-neutral-700 font-bold"
                >
                  -
                </button>
                <span className="font-mono w-10 text-center font-bold text-[#F59E0B]">
                  {Math.round(zoomLevel * 100)}%
                </span>
                <button
                  onClick={() => setZoomLevel(prev => Math.min(2.5, prev + 0.25))}
                  className="px-2 py-0.5 rounded bg-neutral-800 hover:bg-neutral-700 font-bold"
                >
                  +
                </button>
              </div>

              <button
                onClick={() => {
                  setIsInspectorOpen(false);
                  setZoomLevel(1);
                }}
                className="p-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Zoomable Image Container */}
          <div className="flex-1 overflow-auto flex items-center justify-center p-4 relative">
            <div
              className="relative transition-transform duration-300 max-h-[80vh] max-w-full rounded-2xl overflow-hidden shadow-2xl border border-neutral-700"
              style={{ transform: `scale(${zoomLevel})` }}
            >
              <img
                src={currentReel.imageUrl}
                alt={currentReel.title}
                className="max-h-[80vh] w-auto object-contain rounded-2xl"
              />
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-black/75 backdrop-blur-md border border-neutral-700 text-xs text-white flex flex-wrap justify-between items-center gap-2">
                <div>
                  <strong className="block text-[#F59E0B] font-display text-sm">{currentReel.title}</strong>
                  <span className="text-neutral-300">{currentReel.location} • {currentReel.weather}</span>
                </div>
                <div className="text-right font-mono text-[11px] text-neutral-400">
                  <div>GPS: {currentReel.gps}</div>
                  <div className="text-emerald-400">Active Crew: {currentReel.crew}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Thumbnails */}
          <div className="flex items-center justify-center gap-3 pt-3 border-t border-neutral-800 overflow-x-auto pb-1">
            {PHOTOGRAPHIC_REELS.map((reel, idx) => (
              <button
                key={reel.id}
                onClick={() => {
                  setActiveIdx(idx);
                  setZoomLevel(1);
                }}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                  idx === activeIdx
                    ? 'bg-[#F59E0B] text-[#1C1C1C] border-[#F59E0B] shadow-md'
                    : 'bg-neutral-900 text-neutral-300 border-neutral-800 hover:border-neutral-700'
                }`}
              >
                <Camera className="w-3.5 h-3.5" />
                <span>{reel.camCode}</span>
              </button>
            ))}
          </div>

        </div>
      )}

      {/* 8. 360-Degree Interactive Room Photo Tour Modal */}
      {isPanoOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex flex-col p-4 sm:p-8 pointer-events-auto animate-in fade-in duration-200">
          
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
            <div className="flex items-center gap-3">
              <div className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/40 text-xs font-bold flex items-center gap-1.5">
                <RotateCw className="w-3.5 h-3.5 animate-spin-slow" />
                <span>360° INTERACTIVE ARCHITECTURAL PANORAMA</span>
              </div>
              <span className="text-xs text-neutral-400 hidden sm:inline">
                (Click and drag horizontally to look around 360°)
              </span>
            </div>

            <button
              onClick={() => setIsPanoOpen(false)}
              className="p-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Interactive 360 Cylindrical Viewport */}
          <div
            className="flex-1 overflow-hidden relative cursor-grab active:cursor-grabbing flex items-center justify-center"
            onMouseDown={handlePanoMouseDown}
            onMouseMove={handlePanoMouseMove}
            onMouseUp={handlePanoMouseUp}
            onTouchStart={handlePanoMouseDown}
            onTouchMove={handlePanoMouseMove}
            onTouchEnd={handlePanoMouseUp}
          >
            <div
              className="w-full h-full relative overflow-hidden rounded-3xl border border-neutral-800"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=2600&q=90')`,
                backgroundPosition: `${panoRotation}px center`,
                backgroundSize: 'cover',
                transition: isDraggingPano.current ? 'none' : 'background-position 0.2s ease-out'
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-[#141414]/80 via-transparent to-[#141414]/40 pointer-events-none" />
              
              {/* Center Crosshair Compass */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full border border-white/20 flex items-center justify-center pointer-events-none">
                <Crosshair className="w-6 h-6 text-[#F59E0B] opacity-60" />
              </div>

              {/* Panorama Hotspots */}
              <div className="absolute top-1/3 left-1/4 p-3 rounded-2xl bg-black/70 backdrop-blur-md border border-[#F59E0B]/40 text-xs text-white max-w-xs pointer-events-none">
                <span className="font-bold text-[#F59E0B] block">Italian Statuario Marble</span>
                <p className="text-[11px] text-neutral-300">Seamless laser-aligned 1200x2400mm slabs with mirror polishing.</p>
              </div>

              <div className="absolute bottom-8 left-8 p-4 rounded-2xl bg-[#181818]/90 backdrop-blur-md border border-neutral-700 text-xs text-white">
                <span className="font-bold block text-sm">Ramnagar 4BHK Villa - Grand Living Room</span>
                <span className="text-[11px] text-neutral-400">AMK INFRA Turnkey Interior Architecture Wing</span>
              </div>
            </div>
          </div>

          <div className="pt-3 text-center text-xs text-neutral-400">
            Use mouse or finger drag to rotate viewing angle • High Resolution 360° Photogrammetry
          </div>

        </div>
      )}

    </div>
  );
}

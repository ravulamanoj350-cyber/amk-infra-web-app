import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { api } from '../../api';
import {
  Building2,
  MapPin,
  Calendar,
  Layers,
  Search,
  Filter,
  Sliders,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Maximize2,
  X
} from 'lucide-react';

export function PortfolioPage() {
  const { navigateTo } = useApp();
  const [projects, setProjects] = useState([]);
  const [liveCameras, setLiveCameras] = useState([]);
  const [timelapses, setTimelapses] = useState([]);
  const [droneReels, setDroneReels] = useState([]);
  const [viewMode, setViewMode] = useState('projects'); // 'projects', 'live-cameras', 'timelapses', 'drone-reels'
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeProjectModal, setActiveProjectModal] = useState(null);
  const [activeBeforeAfterSlider, setActiveBeforeAfterSlider] = useState(50);
  const [activeTimelapseStep, setActiveTimelapseStep] = useState({});
  const [loading, setLoading] = useState(false);

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'residential', label: 'Custom Villas' },
    { id: 'construction', label: 'Commercial' },
    { id: 'infrastructure', label: 'Infrastructure' },
    { id: 'renovation', label: 'Renovation' },
    { id: 'interior', label: 'Interiors' },
    { id: 'security', label: 'CC Camera' },
    { id: 'electrical', label: 'Electrical' },
    { id: 'painting', label: 'Painting' }
  ];

  useEffect(() => {
    async function loadAllMedia() {
      setLoading(true);
      try {
        const [portfolioRes, camsRes, tlRes, droneRes] = await Promise.all([
          api.getPortfolio(selectedCategory),
          api.getLiveCameras(),
          api.getProjectTimelapses(),
          api.getDroneReels()
        ]);
        if (portfolioRes.success) setProjects(portfolioRes.data);
        if (camsRes.success) setLiveCameras(camsRes.data);
        if (tlRes.success) setTimelapses(tlRes.data);
        if (droneRes.success) setDroneReels(droneRes.data);
      } catch (err) {
        console.error('Error loading portfolio media:', err);
      } finally {
        setLoading(false);
      }
    }
    loadAllMedia();
  }, [selectedCategory]);

  const filteredProjects = projects.filter(p => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      p.title.toLowerCase().includes(q) ||
      p.location.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.categoryLabel.toLowerCase().includes(q)
    );
  });

  return (
    <div className="py-16 bg-[#F5F5F3] text-[#4B4B4B] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white text-[#D97706] text-xs font-bold border border-[#F59E0B]/30 shadow-sm">
            <Layers className="w-3.5 h-3.5 text-[#F59E0B]" />
            <span>Demonstrated Engineering Excellence</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-display font-black tracking-tight text-[#1C1C1C]">
            AMK INFRA{' '}
            <span className="text-[#D97706]">
              Photographic Portfolio
            </span>
          </h1>
          <p className="text-[#4B4B4B] text-xs sm:text-sm max-w-xl mx-auto">
            High-definition photographic proof of landmark civil towers, luxury duplex villas, heavy road corridors, 3D interiors, and 24/7 site cameras across Telangana.
          </p>
        </div>

        {/* View Mode Switcher */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex p-1.5 rounded-2xl bg-white border border-neutral-300 shadow-sm gap-1">
            <button
              onClick={() => setViewMode('projects')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                viewMode === 'projects'
                  ? 'bg-[#F59E0B] text-[#1C1C1C] shadow-sm'
                  : 'text-[#4B4B4B] hover:text-[#1C1C1C] hover:bg-[#F5F5F3]'
              }`}
            >
              🏛️ Landmark Projects ({projects.length})
            </button>
            <button
              onClick={() => setViewMode('live-cameras')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                viewMode === 'live-cameras'
                  ? 'bg-[#F59E0B] text-[#1C1C1C] shadow-sm'
                  : 'text-[#4B4B4B] hover:text-[#1C1C1C] hover:bg-[#F5F5F3]'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
              <span>Live Site Cameras ({liveCameras.length})</span>
            </button>
            <button
              onClick={() => setViewMode('timelapses')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                viewMode === 'timelapses'
                  ? 'bg-[#F59E0B] text-[#1C1C1C] shadow-sm'
                  : 'text-[#4B4B4B] hover:text-[#1C1C1C] hover:bg-[#F5F5F3]'
              }`}
            >
              ⏱️ Construction Timelapses
            </button>
            <button
              onClick={() => setViewMode('drone-reels')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                viewMode === 'drone-reels'
                  ? 'bg-[#F59E0B] text-[#1C1C1C] shadow-sm'
                  : 'text-[#4B4B4B] hover:text-[#1C1C1C] hover:bg-[#F5F5F3]'
              }`}
            >
              🛸 4K Drone Surveys
            </button>
          </div>
        </div>

        {/* Live Site Cameras View Mode */}
        {viewMode === 'live-cameras' && (
          <div className="space-y-6 animate-in fade-in duration-300 mb-12">
            <div className="bg-[#FFFFFF] p-5 rounded-2xl border border-neutral-200 shadow-sm flex flex-col md:flex-row justify-between items-center gap-4">
              <div>
                <h3 className="text-lg font-black text-[#1C1C1C] font-display flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping"></span>
                  Real-time Site Camera Feeds (Telangana Urban Network)
                </h3>
                <p className="text-xs text-[#737373]">Direct streaming snapshots from AMK INFRA active job sites.</p>
              </div>
              <div className="text-xs font-mono text-emerald-700 bg-emerald-50 px-3 py-1 rounded-xl border border-emerald-200 font-bold">
                100% 4K AI Connected
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {liveCameras.map(cam => (
                <div
                  key={cam.id}
                  className="bg-[#FFFFFF] rounded-2xl overflow-hidden border border-neutral-200 hover:border-[#F59E0B] shadow-sm hover:shadow-xl space-y-3 group transition-all"
                >
                  <div className="relative h-60 overflow-hidden">
                    <img
                      src={cam.photo}
                      alt={cam.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1C1C1C]/80 via-transparent to-transparent" />
                    
                    <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#1C1C1C]/80 backdrop-blur-md border border-neutral-700 text-[10px] text-white font-mono font-bold">
                      <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                      <span>{cam.id} • LIVE</span>
                    </div>

                    <div className="absolute top-3 right-3 px-2 py-0.5 rounded-md bg-[#1C1C1C]/80 backdrop-blur-md text-[10px] font-mono text-[#F59E0B]">
                      {cam.weather}
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 text-xs text-white">
                      <strong className="block font-display text-sm">{cam.name}</strong>
                      <span className="text-neutral-300 text-[11px]">{cam.location}</span>
                    </div>
                  </div>

                  <div className="p-5 pt-0 space-y-2.5">
                    <div className="flex justify-between items-center text-xs text-[#4B4B4B]">
                      <span>Execution Stage:</span>
                      <strong className="text-[#D97706] font-mono text-[11px]">{cam.stage}</strong>
                    </div>

                    <div className="flex justify-between items-center text-xs text-[#4B4B4B]">
                      <span>Supervisor:</span>
                      <strong className="text-[#1C1C1C]">{cam.supervisor}</strong>
                    </div>

                    {/* Progress */}
                    <div>
                      <div className="flex justify-between text-[10px] text-[#737373] font-mono mb-1">
                        <span>Milestone Progress</span>
                        <span className="text-[#D97706] font-bold">{cam.progress}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-neutral-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#F59E0B] rounded-full"
                          style={{ width: `${cam.progress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Timelapses View Mode */}
        {viewMode === 'timelapses' && (
          <div className="space-y-8 animate-in fade-in duration-300 mb-12">
            {timelapses.map(tl => {
              const currentStepIdx = activeTimelapseStep[tl.id] || 0;
              const currentStep = tl.steps[currentStepIdx] || tl.steps[0];
              return (
                <div key={tl.id} className="bg-[#FFFFFF] rounded-2xl border border-neutral-200 overflow-hidden shadow-md p-6 space-y-6">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-4 border-b border-neutral-100">
                    <div>
                      <span className="text-xs text-[#D97706] font-mono font-bold uppercase tracking-wider block">Sequential Photo Timelapse</span>
                      <h3 className="text-2xl font-black text-[#1C1C1C] font-display">{tl.projectTitle}</h3>
                      <p className="text-xs text-[#737373]">{tl.location} • Timeline: {tl.totalMonths} Months • Value: {tl.cost}</p>
                    </div>
                    
                    {/* Step Tabs */}
                    <div className="flex flex-wrap gap-1.5">
                      {tl.steps.map((step, sIdx) => (
                        <button
                          key={sIdx}
                          onClick={() => setActiveTimelapseStep(prev => ({ ...prev, [tl.id]: sIdx }))}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                            currentStepIdx === sIdx
                              ? 'bg-[#F59E0B] text-[#1C1C1C] font-black shadow-sm'
                              : 'bg-[#F5F5F3] text-[#4B4B4B] hover:bg-[#E8E8E5]'
                          }`}
                        >
                          Step {sIdx + 1}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                    <div className="lg:col-span-8 rounded-xl overflow-hidden h-72 sm:h-96 relative border border-neutral-200">
                      <img
                        src={currentStep.photo}
                        alt={currentStep.phase}
                        className="w-full h-full object-cover transition-all duration-700"
                      />
                      <div className="absolute top-3 left-3 px-3 py-1 rounded-md bg-[#1C1C1C]/80 backdrop-blur-md border border-neutral-700 text-xs text-[#F59E0B] font-bold">
                        {currentStep.phase}
                      </div>
                    </div>

                    <div className="lg:col-span-4 space-y-4 bg-[#F5F5F3] p-6 rounded-xl border border-neutral-200">
                      <span className="text-xs font-mono text-[#737373] uppercase font-bold">Phase Field Notes:</span>
                      <h4 className="text-lg font-bold text-[#1C1C1C] font-display">{currentStep.phase}</h4>
                      <p className="text-xs sm:text-sm text-[#4B4B4B] leading-relaxed">{currentStep.notes}</p>
                      
                      <div className="pt-2 flex items-center justify-between text-xs text-[#737373]">
                        <span>Step {currentStepIdx + 1} of {tl.steps.length}</span>
                        <button
                          onClick={() => setActiveTimelapseStep(prev => ({
                            ...prev,
                            [tl.id]: (currentStepIdx + 1) % tl.steps.length
                          }))}
                          className="text-[#D97706] font-bold hover:underline"
                        >
                          Next Phase &rarr;
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Drone Reels View Mode */}
        {viewMode === 'drone-reels' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in duration-300 mb-12">
            {droneReels.map(drone => (
              <div key={drone.id} className="bg-[#FFFFFF] rounded-2xl overflow-hidden border border-neutral-200 shadow-md group">
                <div className="h-72 relative overflow-hidden">
                  <img
                    src={drone.photo}
                    alt={drone.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1C1C1C]/80 via-transparent to-transparent" />
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-[#1C1C1C]/80 backdrop-blur-md text-[10px] text-[#F59E0B] font-mono font-bold border border-neutral-700">
                    🛸 {drone.id} • {drone.altitude}
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <h4 className="font-bold text-base">{drone.title}</h4>
                    <span className="text-[11px] text-neutral-300 font-mono">Sensor: {drone.sensor} • GPS: {drone.gps}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Regular Landmark Projects View Mode */}
        {viewMode === 'projects' && (
          <>
            {/* Filter Toolbar & Search Bar */}
            <div className="bg-[#FFFFFF] p-4 sm:p-6 rounded-2xl border border-neutral-200/90 shadow-sm mb-10 space-y-4">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="relative w-full md:w-80">
                  <Search className="absolute left-3.5 top-3 w-4 h-4 text-neutral-400" />
                  <input
                    type="text"
                    placeholder="Search by project, location (e.g. Hanamkonda)..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className="w-full bg-[#F5F5F3] border border-neutral-300 focus:border-[#F59E0B] rounded-xl pl-10 pr-4 py-2.5 text-xs text-[#1C1C1C] outline-none"
                  />
                </div>

                <div className="text-xs text-[#737373] font-semibold self-start md:self-auto">
                  Showing <span className="text-[#D97706] font-bold">{filteredProjects.length}</span> Landmark Projects
                </div>
              </div>

              {/* Category Pills */}
              <div className="flex flex-wrap gap-2 pt-2 border-t border-neutral-100">
                {categories.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                      selectedCategory === cat.id
                        ? 'bg-[#F59E0B] text-[#1C1C1C] shadow-sm'
                        : 'bg-[#F5F5F3] text-[#4B4B4B] hover:bg-[#E8E8E5] hover:text-[#1C1C1C]'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Projects Cards Grid */}
            {loading ? (
              <div className="text-center py-20 text-[#737373] text-sm">
                Loading AMK INFRA projects...
              </div>
            ) : filteredProjects.length === 0 ? (
              <div className="text-center py-20 bg-[#FFFFFF] rounded-2xl border border-neutral-200 p-8 space-y-3 shadow-sm">
                <p className="text-[#737373] text-sm">No projects found matching your search criteria.</p>
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setSearchQuery('');
                  }}
                  className="px-4 py-2 rounded-xl bg-[#F59E0B] text-[#1C1C1C] text-xs font-bold"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProjects.map(project => (
                  <div
                    key={project.id}
                    className="group bg-[#FFFFFF] rounded-2xl overflow-hidden border border-neutral-200 hover:border-[#F59E0B] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl flex flex-col justify-between"
                  >
                    <div>
                      <div
                        onClick={() => {
                          setActiveProjectModal(project);
                          setActiveBeforeAfterSlider(50);
                        }}
                        className="relative h-60 overflow-hidden cursor-pointer"
                      >
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#1C1C1C]/80 via-transparent to-transparent opacity-80" />

                        <div className="absolute top-3 left-3">
                          <span className="px-3 py-1 rounded-md bg-[#1C1C1C]/90 text-[#F59E0B] text-[11px] font-bold border border-neutral-700 shadow-sm backdrop-blur-md">
                            {project.categoryLabel || project.category}
                          </span>
                        </div>


                    {/* Before/After Indicator if available */}
                    {project.hasBeforeAfter && (
                      <div className="absolute top-3 right-3">
                        <span className="px-2.5 py-1 rounded-md bg-[#F59E0B] text-[#1C1C1C] text-[10px] font-black shadow-md flex items-center gap-1">
                          <Sliders className="w-3 h-3" />
                          <span>Before/After</span>
                        </span>
                      </div>
                    )}

                    {/* Bottom stats overlay */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs">
                      <span className="text-white font-semibold flex items-center gap-1 bg-[#1C1C1C]/80 px-2 py-0.5 rounded backdrop-blur-sm">
                        <MapPin className="w-3.5 h-3.5 text-[#F59E0B]" />
                        {project.location}
                      </span>
                      <span className="text-[#F59E0B] font-extrabold bg-[#1C1C1C]/80 px-2.5 py-0.5 rounded backdrop-blur-sm">
                        {project.cost}
                      </span>
                    </div>
                  </div>

                  {/* Project Details */}
                  <div className="p-5 space-y-3">
                    <h3
                      onClick={() => {
                        setActiveProjectModal(project);
                        setActiveBeforeAfterSlider(50);
                      }}
                      className="text-base font-bold text-[#1C1C1C] group-hover:text-[#D97706] transition-colors cursor-pointer line-clamp-1"
                    >
                      {project.title}
                    </h3>
                    
                    <p className="text-xs text-[#4B4B4B] leading-relaxed line-clamp-2">
                      {project.description}
                    </p>

                    <div className="flex items-center justify-between text-xs text-[#737373] pt-2 border-t border-neutral-100">
                      <span>Area: <strong className="text-[#1C1C1C]">{project.area}</strong></span>
                      <span>Handover: <strong className="text-[#1C1C1C]">{project.completionDate}</strong></span>
                    </div>

                    {/* Highlight Tags */}
                    {project.highlights && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {project.highlights.map((h, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 rounded bg-[#F5F5F3] text-[#737373] text-[10px] font-medium border border-neutral-200"
                          >
                            ✓ {h}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer Action Buttons */}
                <div className="p-5 pt-0 grid grid-cols-2 gap-2 mt-2">
                  <button
                    onClick={() => {
                      setActiveProjectModal(project);
                      setActiveBeforeAfterSlider(50);
                    }}
                    className="py-2.5 px-3 rounded-xl bg-[#F5F5F3] hover:bg-[#E8E8E5] text-[#1C1C1C] text-xs font-bold transition-colors text-center border border-neutral-200"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => navigateTo('request', { serviceId: project.category })}
                    className="py-2.5 px-3 rounded-xl bg-[#F59E0B] hover:bg-[#D97706] text-[#1C1C1C] hover:text-white font-extrabold text-xs text-center transition-all flex items-center justify-center gap-1 shadow-sm"
                  >
                    <span>Request Similar</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </>
    )}

      </div>

      {/* Project Lightbox & Details Modal */}
      {activeProjectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in">
          <div className="relative w-full max-w-3xl bg-[#1C1C1C] border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl text-neutral-200 max-h-[92vh] flex flex-col">
            
            {/* Close Button */}
            <button
              onClick={() => setActiveProjectModal(null)}
              className="absolute top-4 right-4 z-30 p-2 rounded-xl bg-black/60 text-white hover:bg-black/90"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Media Area (Before/After slider or full photo) */}
            <div className="relative h-72 sm:h-96 bg-black overflow-hidden flex-shrink-0">
              {activeProjectModal.hasBeforeAfter && activeProjectModal.beforeImage ? (
                <div className="relative w-full h-full select-none">
                  {/* After Image */}
                  <img
                    src={activeProjectModal.image}
                    alt="After completion"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 z-20 px-3 py-1 rounded-md bg-[#1C1C1C]/90 text-white text-xs font-bold shadow-md border border-neutral-700">
                    ✨ Finished Handover
                  </div>

                  {/* Before Image */}
                  <div
                    className="absolute inset-0 overflow-hidden"
                    style={{ width: `${activeBeforeAfterSlider}%` }}
                  >
                    <img
                      src={activeProjectModal.beforeImage}
                      alt="Before construction"
                      className="absolute inset-0 w-full h-full object-cover max-w-none"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <div className="absolute top-4 left-4 z-20 px-3 py-1 rounded-md bg-[#F59E0B] text-[#1C1C1C] text-xs font-black shadow-md">
                      🚧 Excavation / Raw Site
                    </div>
                  </div>

                  {/* Slider bar */}
                  <div
                    className="absolute top-0 bottom-0 w-1 bg-[#F59E0B] z-30 shadow-[0_0_12px_rgba(245,158,11,0.8)]"
                    style={{ left: `${activeBeforeAfterSlider}%` }}
                  >
                    <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#F59E0B] text-[#1C1C1C] flex items-center justify-center font-bold shadow-xl border-2 border-white">
                      <Sliders className="w-4 h-4" />
                    </div>
                  </div>

                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={activeBeforeAfterSlider}
                    onChange={e => setActiveBeforeAfterSlider(Number(e.target.value))}
                    className="absolute inset-0 opacity-0 cursor-ew-resize w-full h-full z-40"
                    aria-label="Comparison Slider"
                  />
                </div>
              ) : (
                <img
                  src={activeProjectModal.image}
                  alt={activeProjectModal.title}
                  className="w-full h-full object-cover"
                />
              )}
            </div>

            {/* Modal Body Info */}
            <div className="p-6 overflow-y-auto space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="px-3 py-1 rounded-md bg-[#F59E0B]/15 text-[#F59E0B] text-xs font-bold border border-[#F59E0B]/30">
                  {activeProjectModal.categoryLabel}
                </span>
                <span className="text-xs text-[#A8A8A2] flex items-center gap-1 font-semibold">
                  <MapPin className="w-4 h-4 text-[#F59E0B]" />
                  {activeProjectModal.location}
                </span>
              </div>

              <h2 className="text-2xl font-bold text-white font-display">
                {activeProjectModal.title}
              </h2>

              <p className="text-xs sm:text-sm text-[#A8A8A2] leading-relaxed">
                {activeProjectModal.description}
              </p>

              {/* Stats Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#242424] p-4 rounded-xl border border-neutral-800 text-center">
                <div>
                  <span className="text-[10px] text-[#737373] block font-semibold">Total Area</span>
                  <strong className="text-white text-xs">{activeProjectModal.area}</strong>
                </div>
                <div>
                  <span className="text-[10px] text-[#737373] block font-semibold">Project Cost</span>
                  <strong className="text-[#F59E0B] text-xs">{activeProjectModal.cost}</strong>
                </div>
                <div>
                  <span className="text-[10px] text-[#737373] block font-semibold">Handover Date</span>
                  <strong className="text-white text-xs">{activeProjectModal.completionDate}</strong>
                </div>
                <div>
                  <span className="text-[10px] text-[#737373] block font-semibold">Client</span>
                  <strong className="text-white text-xs">{activeProjectModal.client}</strong>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 sm:p-6 bg-[#181818] border-t border-neutral-800 flex items-center justify-between">
              <span className="text-xs text-[#A8A8A2]">
                Executed under supervision of <strong className="text-white">A. Charan Patel</strong>
              </span>
              <button
                onClick={() => {
                  const cat = activeProjectModal.category;
                  setActiveProjectModal(null);
                  navigateTo('request', { serviceId: cat });
                }}
                className="px-6 py-2.5 rounded-xl bg-[#F59E0B] hover:bg-[#D97706] text-[#1C1C1C] hover:text-white font-extrabold text-xs shadow-md transition-all"
              >
                Request Similar Project &rarr;
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

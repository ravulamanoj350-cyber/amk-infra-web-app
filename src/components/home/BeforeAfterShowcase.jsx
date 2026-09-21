import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Sparkles, MapPin, ArrowRight, Layers, Sliders } from 'lucide-react';

export function BeforeAfterShowcase() {
  const { navigateTo } = useApp();
  const [sliderPos, setSliderPos] = useState(50); // percentage 0 to 100
  const [activeProjectIdx, setActiveProjectIdx] = useState(0);

  const showcaseProjects = [
    {
      title: "Grand 4BHK Luxury Villa",
      location: "Ramnagar, Hanamkonda",
      category: "Residential Construction",
      beforeImg: "https://images.unsplash.com/photo-1541888946425-d0fbb18f15f6?auto=format&fit=crop&w=1200&q=80",
      afterImg: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
      beforeLabel: "Raw Excavation & RCC Skeleton",
      afterLabel: "Finished Luxury Villa Handover",
      duration: "7 Months",
      cost: "₹68 Lakh"
    },
    {
      title: "30-Year Heritage Home Full Modernization",
      location: "Subedari, Hanamkonda",
      category: "Renovation & Remodeling",
      beforeImg: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80",
      afterImg: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80",
      beforeLabel: "Aged Weathered Concrete Walls",
      afterLabel: "Sleek Open-Concept Contemporary Facade",
      duration: "6 Weeks",
      cost: "₹28 Lakh"
    },
    {
      title: "Commercial Multi-Tier Retail Complex",
      location: "Kazipet Main Road, Warangal",
      category: "Commercial Construction",
      beforeImg: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80",
      afterImg: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
      beforeLabel: "Foundation & Column Piling",
      afterLabel: "Glass Facade Plaza Handover",
      duration: "11 Months",
      cost: "₹2.1 Crore"
    }
  ];

  const curr = showcaseProjects[activeProjectIdx];

  return (
    <section className="py-20 bg-[#F5F5F3] text-[#4B4B4B] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white text-[#D97706] text-xs font-bold border border-[#F59E0B]/30 shadow-sm">
              <Layers className="w-3.5 h-3.5 text-[#F59E0B]" />
              <span>Real Transformations</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-black text-[#1C1C1C]">
              Before & After{' '}
              <span className="text-[#D97706]">Project Showcase</span>
            </h2>
            <p className="text-[#4B4B4B] text-xs sm:text-sm max-w-xl">
              Drag the interactive slider below to witness how AMK INFRA turns raw plots and outdated structures into architectural masterpieces.
            </p>
          </div>

          {/* Project selector tabs */}
          <div className="flex flex-wrap gap-2">
            {showcaseProjects.map((p, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setActiveProjectIdx(idx);
                  setSliderPos(50);
                }}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeProjectIdx === idx
                    ? 'bg-[#F59E0B] text-[#1C1C1C] shadow-sm'
                    : 'bg-white text-[#4B4B4B] border border-neutral-200 hover:bg-[#E8E8E5]'
                }`}
              >
                {p.title.split(' ')[0]} {p.title.split(' ')[1]}
              </button>
            ))}
          </div>
        </div>

        {/* Interactive Comparison Container */}
        <div className="bg-[#FFFFFF] p-4 sm:p-6 rounded-2xl border border-neutral-200/90 shadow-lg">
          
          <div className="relative h-[340px] sm:h-[480px] rounded-xl overflow-hidden select-none">
            {/* After Image (Full width background) */}
            <img
              src={curr.afterImg}
              alt={curr.afterLabel}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute top-4 right-4 z-20 px-3 py-1 rounded-md bg-[#1C1C1C]/90 text-white text-xs font-bold shadow-md backdrop-blur-sm border border-neutral-700">
              ✨ COMPLETED: {curr.afterLabel}
            </div>

            {/* Before Image (Clipped by slider position) */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${sliderPos}%` }}
            >
              <img
                src={curr.beforeImg}
                alt={curr.beforeLabel}
                className="absolute inset-0 w-full h-full object-cover max-w-none"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div className="absolute top-4 left-4 z-20 px-3 py-1 rounded-md bg-[#F59E0B] text-[#1C1C1C] text-xs font-black shadow-md">
                🚧 BEFORE: {curr.beforeLabel}
              </div>
            </div>

            {/* Vertical Divider Line */}
            <div
              className="absolute top-0 bottom-0 w-1 bg-[#F59E0B] z-30 shadow-[0_0_12px_rgba(245,158,11,0.8)]"
              style={{ left: `${sliderPos}%` }}
            >
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-[#F59E0B] text-[#1C1C1C] flex items-center justify-center shadow-xl border-2 border-white cursor-ew-resize">
                <Sliders className="w-5 h-5 stroke-[2.5]" />
              </div>
            </div>

            {/* Invisible Range Input on Top */}
            <input
              type="range"
              min="0"
              max="100"
              value={sliderPos}
              onChange={e => setSliderPos(Number(e.target.value))}
              className="absolute inset-0 opacity-0 cursor-ew-resize w-full h-full z-40"
              aria-label="Before and After Comparison Slider"
            />
          </div>

          {/* Project Details Bar */}
          <div className="mt-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pt-4 border-t border-neutral-100">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-md bg-[#F59E0B]/15 text-[#D97706] text-[11px] font-bold border border-[#F59E0B]/30">
                  {curr.category}
                </span>
                <span className="text-xs text-[#737373] flex items-center gap-1 font-medium">
                  <MapPin className="w-3.5 h-3.5 text-[#F59E0B]" />
                  {curr.location}
                </span>
              </div>
              <h3 className="text-xl font-bold text-[#1C1C1C] mt-1">
                {curr.title}
              </h3>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <span className="text-[10px] text-[#737373] uppercase block font-semibold">Execution Time</span>
                <span className="text-sm font-bold text-[#1C1C1C]">{curr.duration}</span>
              </div>
              <div className="h-8 w-px bg-neutral-200" />
              <div className="text-right">
                <span className="text-[10px] text-[#737373] uppercase block font-semibold">Project Value</span>
                <span className="text-sm font-bold text-[#D97706]">{curr.cost}</span>
              </div>
              <button
                onClick={() => navigateTo('portfolio')}
                className="ml-2 px-4 py-2 rounded-xl bg-[#1C1C1C] hover:bg-[#242424] text-white text-xs font-bold flex items-center gap-1.5 transition-colors shadow-sm"
              >
                <span>Full Gallery</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

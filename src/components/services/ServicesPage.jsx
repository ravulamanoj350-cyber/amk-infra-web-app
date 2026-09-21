import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Building2,
  Home,
  Construction,
  Hammer,
  Zap,
  Camera,
  Sparkles,
  PaintBucket,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Calculator,
  Phone,
  MessageSquare,
  HelpCircle,
  Clock,
  Layers,
  Smartphone,
  ChevronRight
} from 'lucide-react';

const ICON_MAP = {
  Building2,
  Home,
  Construction,
  Hammer,
  Zap,
  Camera,
  Sparkles,
  PaintBucket
};

export function ServicesPage() {
  const {
    services,
    divisions,
    navigateTo,
    openServiceModal,
    setEstimatorModalOpen,
    activeDivisionTab,
    setActiveDivisionTab,
    setMobileMode,
    setSelectedServiceId
  } = useApp();

  const [filterDivision, setFilterDivision] = useState(activeDivisionTab || 'all');

  const filteredServices = filterDivision === 'all'
    ? services
    : services.filter(s => s.divisionId === filterDivision || s.id === filterDivision);

  return (
    <div className="py-16 bg-[#F5F5F3] text-[#4B4B4B] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#F59E0B]/30 text-[#D97706] text-xs font-bold tracking-wide uppercase shadow-sm">
            <Layers className="w-3.5 h-3.5 text-[#F59E0B]" />
            <span>Structured Across 7 Corporate Divisions</span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black tracking-tight text-[#1C1C1C]">
            Engineering Capabilities &{' '}
            <span className="text-[#D97706]">
              Services Portfolio
            </span>
          </h1>
          <p className="text-[#4B4B4B] text-sm sm:text-base leading-relaxed">
            From heavy multi-lane arterial roadways and commercial multi-tier plazas to luxury bespoke villas, 3D modular interiors, and high-tech security grids in Hanamkonda & Warangal.
          </p>

          <div className="pt-2 flex justify-center gap-3">
            <button
              onClick={() => navigateTo('request')}
              className="px-6 py-3 rounded-xl bg-[#F59E0B] hover:bg-[#D97706] text-[#1C1C1C] hover:text-white font-extrabold text-xs sm:text-sm shadow-md transition-all flex items-center gap-2"
            >
              <span>Request Custom Proposal</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </button>
            <button
              onClick={() => setEstimatorModalOpen(true)}
              className="px-6 py-3 rounded-xl bg-white hover:bg-[#E8E8E5] text-[#1C1C1C] font-bold text-xs sm:text-sm border border-neutral-300 shadow-sm transition-colors flex items-center gap-2"
            >
              <Calculator className="w-4 h-4 text-[#F59E0B]" />
              <span>Instant Cost Calculator</span>
            </button>
          </div>
        </div>

        {/* Division Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar scroll-smooth">
          <button
            onClick={() => {
              setFilterDivision('all');
              setActiveDivisionTab('all');
            }}
            className={`flex-shrink-0 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all border ${
              filterDivision === 'all'
                ? 'bg-[#F59E0B] text-[#1C1C1C] border-[#F59E0B] shadow-sm'
                : 'bg-white text-[#4B4B4B] border-neutral-300 hover:bg-[#E8E8E5] hover:text-[#1C1C1C]'
            }`}
          >
            All Services ({services.length})
          </button>

          {(divisions || []).map(div => {
            const isSelected = filterDivision === div.id;
            return (
              <button
                key={div.id}
                onClick={() => {
                  setFilterDivision(div.id);
                  setActiveDivisionTab(div.id);
                }}
                className={`flex-shrink-0 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all border flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-[#F59E0B] text-[#1C1C1C] border-[#F59E0B] shadow-sm'
                    : 'bg-white text-[#4B4B4B] border-neutral-300 hover:bg-[#E8E8E5] hover:text-[#1C1C1C]'
                }`}
              >
                <span>{div.shortName}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
                  isSelected ? 'bg-[#1C1C1C] text-white' : 'bg-[#E8E8E5] text-[#737373]'
                }`}>
                  {div.code}
                </span>
              </button>
            );
          })}
        </div>

        {/* Services List with Division Metadata */}
        <div className="space-y-10">
          {filteredServices.map((service, index) => {
            const Icon = ICON_MAP[service.icon] || Building2;
            const isEven = index % 2 === 0;
            const matchedDivision = (divisions || []).find(d => d.id === service.divisionId);

            return (
              <div
                key={service.id}
                id={service.id}
                className="bg-[#FFFFFF] rounded-2xl border border-neutral-200/90 p-6 sm:p-8 hover:border-[#F59E0B] transition-all shadow-md"
              >
                <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-center ${isEven ? '' : 'lg:flex-row-reverse'}`}>
                  
                  {/* Photo & Badge */}
                  <div className={`lg:col-span-5 relative h-72 rounded-xl overflow-hidden group ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1C1C1C]/80 via-transparent to-transparent" />
                    
                    <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                      <span className="px-3 py-1 rounded-md bg-[#F59E0B] text-[#1C1C1C] font-black text-xs shadow-md">
                        {service.badge}
                      </span>
                      {matchedDivision && (
                        <span className="px-2.5 py-0.5 rounded-md bg-[#1C1C1C]/90 text-white text-[10px] font-mono border border-neutral-700">
                          {matchedDivision.code}
                        </span>
                      )}
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs bg-[#1C1C1C]/90 backdrop-blur-md p-2.5 rounded-lg border border-neutral-700">
                      <div>
                        <span className="text-[10px] text-[#A8A8A2] block font-semibold">Starting Index:</span>
                        <strong className="text-[#F59E0B] font-mono">{service.startingPrice}</strong>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] text-[#A8A8A2] block font-semibold">Standard Duration:</span>
                        <strong className="text-white">{service.duration}</strong>
                      </div>
                    </div>
                  </div>

                  {/* Details Column */}
                  <div className={`lg:col-span-7 space-y-4 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                    
                    {/* Header info */}
                    <div className="space-y-1">
                      {matchedDivision && (
                        <span className="text-xs font-bold text-[#D97706] uppercase tracking-wider block">
                          {matchedDivision.name}
                        </span>
                      )}
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-[#F59E0B]/15 text-[#F59E0B] flex items-center justify-center font-bold">
                          <Icon className="w-5 h-5" />
                        </div>
                        <h3 className="text-xl sm:text-2xl font-bold text-[#1C1C1C]">
                          {service.title}
                        </h3>
                      </div>
                    </div>

                    <p className="text-[#4B4B4B] text-xs sm:text-sm leading-relaxed">
                      {service.shortDesc}
                    </p>

                    {/* Key Specifications */}
                    <div className="space-y-2 pt-1">
                      <span className="text-xs font-bold text-[#1C1C1C] uppercase tracking-wider block">
                        Included Standard Specifications:
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {service.features.map((feat, i) => (
                          <div key={i} className="flex items-start gap-2 text-xs text-[#4B4B4B]">
                            <CheckCircle2 className="w-4 h-4 text-[#F59E0B] flex-shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="pt-3 flex flex-wrap items-center gap-3">
                      <button
                        onClick={() => openServiceModal(service.id)}
                        className="px-4 py-2.5 rounded-xl bg-[#F5F5F3] hover:bg-[#E8E8E5] text-[#1C1C1C] text-xs font-bold border border-neutral-300 transition-colors"
                      >
                        View Full Scope & BOQ
                      </button>

                      <button
                        onClick={() => navigateTo('request', { serviceId: service.id, divisionId: service.divisionId })}
                        className="px-5 py-2.5 rounded-xl bg-[#F59E0B] hover:bg-[#D97706] text-[#1C1C1C] hover:text-white font-bold text-xs shadow-md transition-all flex items-center gap-1.5"
                      >
                        <span>Request Service</span>
                        <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                      </button>

                      <button
                        onClick={() => {
                          setSelectedServiceId(service.id);
                          setMobileMode(true);
                        }}
                        className="px-3 py-2.5 rounded-xl bg-white text-[#4B4B4B] hover:text-[#1C1C1C] text-xs font-semibold flex items-center gap-1.5 border border-neutral-300 shadow-sm"
                        title="View in Mobile Companion App"
                      >
                        <Smartphone className="w-3.5 h-3.5 text-[#F59E0B]" />
                        <span>Mobile View</span>
                      </button>
                    </div>

                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}

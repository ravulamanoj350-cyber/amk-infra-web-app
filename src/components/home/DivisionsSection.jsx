import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Building2,
  Home,
  Construction,
  Sparkles,
  Zap,
  Camera,
  PaintBucket,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Phone,
  MessageSquare,
  Wrench,
  Award,
  Layers,
  ChevronRight,
  HardHat,
  Cpu,
  Eye,
  Sliders
} from 'lucide-react';

const ICON_MAP = {
  Building2,
  Home,
  Construction,
  Sparkles,
  Zap,
  Camera,
  PaintBucket
};

export function DivisionsSection() {
  const { divisions, navigateTo, openServiceModal } = useApp();
  const [selectedDivId, setSelectedDivId] = useState('civil-commercial');

  if (!divisions || divisions.length === 0) return null;

  const activeDivision = divisions.find(d => d.id === selectedDivId) || divisions[0];
  const ActiveIcon = ICON_MAP[activeDivision.icon] || Building2;

  return (
    <section id="corporate-divisions" className="py-20 bg-[#F5F5F3] text-[#4B4B4B] relative overflow-hidden border-t border-neutral-200">
      {/* Subtle Concrete Grid */}
      <div className="absolute inset-0 concrete-grid-subtle opacity-60 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-[#D97706] text-xs font-extrabold tracking-wide uppercase">
              <Layers className="w-3.5 h-3.5 text-[#F59E0B]" />
              <span>Corporate Architecture & Specialized Wings</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black tracking-tight text-[#1C1C1C]">
              7 Specialized Corporate{' '}
              <span className="text-[#F59E0B]">
                Divisions
              </span>
            </h2>
            <p className="text-[#4B4B4B] text-base sm:text-lg max-w-2xl">
              Each division operates under dedicated chief engineers, certified standard operating protocols, and specialized heavy machinery to guarantee uncompromised structural excellence.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigateTo('divisions')}
              className="px-5 py-3 rounded-xl bg-white hover:bg-[#E8E8E5] text-[#1C1C1C] font-bold text-xs sm:text-sm border border-neutral-300 hover:border-[#F59E0B] transition-all flex items-center gap-2 group shadow-sm"
            >
              <span>Explore All Divisions & Specs</span>
              <ArrowRight className="w-4 h-4 text-[#F59E0B] group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Division Selector Pills Bar */}
        <div className="flex items-center gap-2.5 overflow-x-auto pb-4 no-scrollbar scroll-smooth">
          {divisions.map(div => {
            const Icon = ICON_MAP[div.icon] || Building2;
            const isSelected = div.id === activeDivision.id;
            return (
              <button
                key={div.id}
                onClick={() => setSelectedDivId(div.id)}
                className={`flex-shrink-0 flex items-center gap-2.5 px-4 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all duration-300 border ${
                  isSelected
                    ? 'bg-[#F59E0B] text-[#1C1C1C] border-[#D97706] shadow-md scale-[1.02] font-black'
                    : 'bg-white text-[#4B4B4B] border-neutral-200 hover:border-[#F59E0B] hover:text-[#1C1C1C] shadow-sm'
                }`}
              >
                <Icon className={`w-4 h-4 ${isSelected ? 'text-[#1C1C1C] stroke-[2.5]' : 'text-[#F59E0B]'}`} />
                <span>{div.shortName || div.name}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono ${
                  isSelected ? 'bg-[#1C1C1C] text-white' : 'bg-[#E8E8E5] text-[#737373]'
                }`}>
                  {div.code}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Division Feature Card Showcase */}
        <div className="mt-6 bg-white border border-neutral-200 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-lg relative overflow-hidden">
          
          {/* Subtle watermarked division code */}
          <div className="absolute right-6 -bottom-10 text-[110px] font-mono font-black text-neutral-100 pointer-events-none select-none">
            {activeDivision.code}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
            
            {/* Left Info Column */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Badge & Code Header */}
              <div className="flex flex-wrap items-center gap-3">
                <span className="px-3 py-1 rounded-full bg-amber-500/10 text-[#D97706] font-bold text-xs border border-amber-500/30 flex items-center gap-1.5">
                  <ActiveIcon className="w-3.5 h-3.5 text-[#F59E0B]" />
                  {activeDivision.badge}
                </span>
                <span className="text-xs text-[#737373] font-mono font-semibold">
                  Division Code: {activeDivision.code}
                </span>
                <span className="text-xs text-emerald-700 font-bold flex items-center gap-1 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> ISO 9001:2015 Verified
                </span>
              </div>

              {/* Title & Tagline */}
              <div>
                <h3 className="text-2xl sm:text-3xl font-display font-black text-[#1C1C1C]">
                  {activeDivision.name}
                </h3>
                <p className="text-sm sm:text-base text-[#4B4B4B] mt-2 font-medium leading-relaxed">
                  {activeDivision.tagline}
                </p>
              </div>

              {/* Metric Highlights Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-[#F5F5F3] p-3.5 rounded-2xl border border-neutral-200">
                  <span className="text-[11px] text-[#737373] block font-semibold">Completed Sites</span>
                  <span className="text-xl sm:text-2xl font-black text-[#F59E0B] font-display">
                    {activeDivision.stats.completedProjects}
                  </span>
                </div>
                <div className="bg-[#F5F5F3] p-3.5 rounded-2xl border border-neutral-200">
                  <span className="text-[11px] text-[#737373] block font-semibold">Live Ongoing</span>
                  <span className="text-xl sm:text-2xl font-black text-emerald-600 font-display">
                    {activeDivision.stats.ongoingSites} Sites
                  </span>
                </div>
                <div className="bg-[#F5F5F3] p-3.5 rounded-2xl border border-neutral-200">
                  <span className="text-[11px] text-[#737373] block font-semibold">Division Force</span>
                  <span className="text-xl sm:text-2xl font-black text-blue-600 font-display">
                    {activeDivision.stats.engineers}
                  </span>
                </div>
                <div className="bg-[#F5F5F3] p-3.5 rounded-2xl border border-neutral-200">
                  <span className="text-[11px] text-[#737373] block font-semibold">Execution Scale</span>
                  <span className="text-xs sm:text-sm font-black text-[#1C1C1C] font-mono mt-1 block">
                    {activeDivision.stats.sqftConstructed}
                  </span>
                </div>
              </div>

              {/* Core Engineering Capabilities */}
              <div className="space-y-2.5">
                <h4 className="text-xs font-bold text-[#1C1C1C] uppercase tracking-wider flex items-center gap-1.5">
                  <HardHat className="w-4 h-4 text-[#F59E0B]" />
                  Key Engineering Capabilities & Deliverables
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {activeDivision.keyCapabilities.map((cap, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-[#4B4B4B]">
                      <CheckCircle2 className="w-4 h-4 text-[#F59E0B] flex-shrink-0 mt-0.5" />
                      <span>{cap}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Machinery & Fleet Preview */}
              <div className="bg-[#F5F5F3] p-3.5 rounded-2xl border border-neutral-200">
                <span className="text-[11px] font-bold text-[#1C1C1C] uppercase tracking-wider flex items-center gap-1 mb-2">
                  <Wrench className="w-3.5 h-3.5 text-[#F59E0B]" />
                  Dedicated Equipment & Precision Fleet:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {activeDivision.equipmentFleet.map((tool, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg bg-white text-[#1C1C1C] text-xs font-semibold border border-neutral-200 shadow-2xs"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => navigateTo('request', { divisionId: activeDivision.id })}
                  className="px-6 py-3.5 rounded-xl bg-[#F59E0B] hover:bg-[#D97706] text-[#1C1C1C] hover:text-white font-black text-xs sm:text-sm shadow-md transition-all flex items-center gap-2 transform hover:-translate-y-0.5"
                >
                  <span>Request Proposal for {activeDivision.shortName}</span>
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </button>

                <button
                  onClick={() => navigateTo('divisions', { divisionId: activeDivision.id })}
                  className="px-5 py-3.5 rounded-xl bg-[#E8E8E5] hover:bg-[#D6D6D2] text-[#1C1C1C] font-bold text-xs sm:text-sm border border-neutral-300 transition-colors flex items-center gap-2"
                >
                  <Eye className="w-4 h-4 text-[#F59E0B]" />
                  <span>View Technical Specs</span>
                </button>

                <a
                  href={`https://wa.me/919032477292?text=Hello%20AMK%20INFRA%2C%20I%20would%20like%20to%20consult%20regarding%20${encodeURIComponent(activeDivision.name)}.`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm transition-colors flex items-center gap-2 shadow-sm"
                >
                  <MessageSquare className="w-4 h-4 fill-current" />
                  <span>WhatsApp Lead</span>
                </a>
              </div>
            </div>

            {/* Right Visual & Division Director Column */}
            <div className="lg:col-span-5 space-y-4">
              {/* Division Hero Image Banner */}
              <div className="relative rounded-2xl overflow-hidden border border-neutral-200 shadow-md h-64 sm:h-72 group">
                <img
                  src={activeDivision.heroImage}
                  alt={activeDivision.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                
                {/* Rate overlay */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between p-3 rounded-xl bg-black/75 backdrop-blur-md border border-neutral-700 text-xs text-white">
                  <div>
                    <span className="text-[10px] text-neutral-300 block font-semibold">Starting Index Rate</span>
                    <strong className="text-[#F59E0B] font-mono text-sm">{activeDivision.startingPrice}</strong>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-neutral-300 block font-semibold">Standard Schedule</span>
                    <strong className="text-white text-xs">{activeDivision.turnaround}</strong>
                  </div>
                </div>
              </div>

              {/* Division Director Card */}
              <div className="bg-[#F5F5F3] border border-neutral-200 rounded-2xl p-4 flex items-center justify-between gap-4 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-[#F59E0B] text-[#1C1C1C] flex items-center justify-center font-black text-lg shadow-sm flex-shrink-0">
                    {activeDivision.divisionHead.charAt(0)}
                  </div>
                  <div>
                    <span className="text-[10px] text-[#D97706] font-bold uppercase tracking-wider block">
                      Division Lead & Chief Engineer
                    </span>
                    <h5 className="text-[#1C1C1C] font-bold text-sm sm:text-base">
                      {activeDivision.divisionHead}
                    </h5>
                    <p className="text-[11px] text-[#737373]">{activeDivision.headTitle}</p>
                  </div>
                </div>

                <a
                  href="tel:9032477292"
                  className="p-2.5 rounded-xl bg-[#F59E0B] hover:bg-[#D97706] text-[#1C1C1C] hover:text-white transition-colors shadow-sm"
                  title={`Call ${activeDivision.divisionHead}`}
                >
                  <Phone className="w-4 h-4 stroke-[2.5]" />
                </a>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

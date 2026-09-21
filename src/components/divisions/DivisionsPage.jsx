import React, { useState, useEffect } from 'react';
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
  HardHat,
  Calculator,
  Calendar,
  IndianRupee,
  FileText,
  Clock,
  ChevronRight,
  Sparkle
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

export function DivisionsPage() {
  const {
    divisions,
    services,
    portfolio,
    navigateTo,
    openServiceModal,
    setEstimatorModalOpen,
    selectedDivisionId,
    setSelectedDivisionId
  } = useApp();

  const [activeDivId, setActiveDivId] = useState(selectedDivisionId || 'civil-commercial');

  useEffect(() => {
    if (selectedDivisionId) {
      setActiveDivId(selectedDivisionId);
    }
  }, [selectedDivisionId]);

  if (!divisions || divisions.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-white">
        <div className="w-8 h-8 border-4 border-amber-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const currentDivision = divisions.find(d => d.id === activeDivId) || divisions[0];
  const CurrentIcon = ICON_MAP[currentDivision.icon] || Building2;

  // Filter associated services and portfolio
  const associatedServices = (services || []).filter(s => s.divisionId === currentDivision.id || (currentDivision.serviceIds && currentDivision.serviceIds.includes(s.id)));
  const associatedPortfolio = (portfolio || []).filter(p => p.divisionId === currentDivision.id || (currentDivision.serviceIds && currentDivision.serviceIds.includes(p.category)));

  return (
    <div className="min-h-screen bg-[#F5F5F3] text-[#4B4B4B] pb-24">
      
      {/* Header Banner */}
      <section className="relative py-16 bg-[#1C1C1C] text-white border-b border-neutral-800 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1541888946425-d0fbb18f15f6?auto=format&fit=crop&w=2000&q=80"
            alt="AMK Corporate Divisions"
            className="w-full h-full object-cover opacity-15"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1C1C1C] via-[#1C1C1C]/95 to-[#1C1C1C]/80" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#242424] border border-[#F59E0B]/30 text-[#F59E0B] text-xs font-bold tracking-wide uppercase shadow-sm">
              <Layers className="w-3.5 h-3.5" />
              <span>AMK INFRA Enterprise Corporate Structure</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black text-white tracking-tight">
              Specialized Corporate{' '}
              <span className="text-[#F59E0B]">
                Divisions
              </span>
            </h1>

            <p className="text-[#A8A8A2] text-sm sm:text-base leading-relaxed">
              Explore our 7 specialized operating divisions across civil construction, residential architecture, heavy infrastructure, bespoke interiors, smart power grids, 4K electronic surveillance, and advanced surface protection.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <button
                onClick={() => setEstimatorModalOpen(true)}
                className="px-5 py-2.5 rounded-xl bg-[#F59E0B] hover:bg-[#D97706] text-[#1C1C1C] hover:text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-md hover:scale-105 transition-all"
              >
                <Calculator className="w-4 h-4 stroke-[2.5]" />
                <span>Division Cost Calculator</span>
              </button>

              <button
                onClick={() => navigateTo('request')}
                className="px-5 py-2.5 rounded-xl bg-[#242424] hover:bg-[#2e2e2e] text-white font-bold text-xs sm:text-sm border border-neutral-700 transition-colors"
              >
                Request Custom Proposal
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Grid: Division Sidebar & Detailed Technical View */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Division Navigation Sidebar */}
          <div className="lg:col-span-4 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#737373] block px-2">
              Select Corporate Wing ({divisions.length}):
            </span>

            <div className="space-y-2">
              {divisions.map(div => {
                const Icon = ICON_MAP[div.icon] || Building2;
                const isSelected = div.id === currentDivision.id;

                return (
                  <button
                    key={div.id}
                    onClick={() => {
                      setActiveDivId(div.id);
                      setSelectedDivisionId(div.id);
                    }}
                    className={`w-full text-left p-4 rounded-2xl transition-all duration-200 border flex items-center justify-between gap-3 ${
                      isSelected
                        ? 'bg-[#1C1C1C] border-[#F59E0B] shadow-lg text-white ring-1 ring-[#F59E0B]'
                        : 'bg-[#FFFFFF] border-neutral-200 text-[#4B4B4B] hover:bg-[#E8E8E5] hover:text-[#1C1C1C]'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                        isSelected
                          ? 'bg-[#F59E0B] text-[#1C1C1C] font-bold shadow-md'
                          : 'bg-[#F5F5F3] text-[#1C1C1C]'
                      }`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className={`font-bold text-sm truncate ${isSelected ? 'text-white' : 'text-[#1C1C1C]'}`}>{div.shortName || div.name}</span>
                        </div>
                        <span className={`text-[11px] block truncate font-mono ${isSelected ? 'text-[#A8A8A2]' : 'text-[#737373]'}`}>
                          {div.code} • {div.divisionHead}
                        </span>
                      </div>
                    </div>

                    <ChevronRight className={`w-4 h-4 flex-shrink-0 ${isSelected ? 'text-[#F59E0B]' : 'text-[#737373]'}`} />
                  </button>
                );
              })}
            </div>

            {/* Quick Contact Box */}
            <div className="mt-6 bg-[#FFFFFF] border border-neutral-200 rounded-2xl p-4 text-xs space-y-3 shadow-sm">
              <span className="font-bold text-[#1C1C1C] block">Corporate Tenders & Project Enquiries</span>
              <p className="text-[#737373] text-[11px]">
                Direct line to Founder & Managing Director A. Charan Patel for municipal tenders and joint ventures.
              </p>
              <a
                href="tel:9032477292"
                className="w-full py-2.5 rounded-xl bg-[#F59E0B] hover:bg-[#D97706] text-[#1C1C1C] hover:text-white font-bold text-center block transition-colors shadow-sm"
              >
                Call MD: 9032477292
              </a>
            </div>
          </div>

          {/* Right Detailed Division Breakdown */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Division Banner Card */}
            <div className="bg-[#FFFFFF] border border-neutral-200/90 rounded-2xl p-6 sm:p-8 shadow-lg relative overflow-hidden space-y-6">
              
              {/* Top Meta Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-neutral-100">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-md bg-[#F59E0B]/15 text-[#D97706] text-xs font-bold border border-[#F59E0B]/30 flex items-center gap-1.5">
                    <CurrentIcon className="w-3.5 h-3.5" />
                    {currentDivision.badge}
                  </span>
                  <span className="text-xs text-[#737373] font-mono">
                    [{currentDivision.code}]
                  </span>
                </div>

                <div className="flex items-center gap-2 text-xs text-emerald-700 font-bold">
                  <ShieldCheck className="w-4 h-4" />
                  <span>ISO 9001:2015 Registered</span>
                </div>
              </div>

              {/* Title & Tagline */}
              <div>
                <h2 className="text-2xl sm:text-3xl font-display font-black text-[#1C1C1C]">
                  {currentDivision.name}
                </h2>
                <p className="text-sm sm:text-base text-[#4B4B4B] mt-2 leading-relaxed">
                  {currentDivision.tagline}
                </p>
              </div>

              {/* Featured Image */}
              <div className="relative rounded-xl overflow-hidden h-64 sm:h-80 border border-neutral-200 shadow-md">
                <img
                  src={currentDivision.heroImage}
                  alt={currentDivision.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1C1C1C]/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between gap-2 bg-[#1C1C1C]/90 backdrop-blur-md p-3 rounded-lg border border-neutral-700 text-xs">
                  <div>
                    <span className="text-[#A8A8A2] text-[10px] block">Standard Market Index</span>
                    <strong className="text-[#F59E0B] font-mono text-sm">{currentDivision.startingPrice}</strong>
                  </div>
                  <div>
                    <span className="text-[#A8A8A2] text-[10px] block">Average Handover</span>
                    <strong className="text-white text-xs">{currentDivision.turnaround}</strong>
                  </div>
                  <div>
                    <button
                      onClick={() => navigateTo('request', { divisionId: currentDivision.id })}
                      className="px-4 py-2 rounded-lg bg-[#F59E0B] hover:bg-[#D97706] text-[#1C1C1C] hover:text-white font-bold text-xs transition-colors"
                    >
                      Book Free Consultation
                    </button>
                  </div>
                </div>
              </div>

              {/* Division Leadership Card */}
              <div className="bg-[#F5F5F3] border border-neutral-200 rounded-xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-14 h-14 rounded-2xl bg-[#F59E0B] text-[#1C1C1C] flex items-center justify-center font-black text-xl shadow-md flex-shrink-0">
                    {currentDivision.divisionHead.charAt(0)}
                  </div>
                  <div>
                    <span className="text-[10px] text-[#D97706] font-bold uppercase tracking-wider block">
                      Division Lead & Chief Engineer
                    </span>
                    <h4 className="text-[#1C1C1C] font-bold text-base sm:text-lg">
                      {currentDivision.divisionHead}
                    </h4>
                    <p className="text-xs text-[#4B4B4B]">{currentDivision.headTitle}</p>
                    <span className="text-[11px] text-[#737373] font-mono">Email: {currentDivision.headEmail}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <a
                    href="tel:9032477292"
                    className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-[#F59E0B] hover:bg-[#D97706] text-[#1C1C1C] hover:text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Call Lead</span>
                  </a>
                  <a
                    href={`https://wa.me/919032477292?text=Hello%20${encodeURIComponent(currentDivision.divisionHead)}%2C%20I%20am%20inquiring%20about%20${encodeURIComponent(currentDivision.name)}.`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <MessageSquare className="w-3.5 h-3.5 fill-current" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>

              {/* Stats & Operations Scale */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-[#F5F5F3] p-4 rounded-xl border border-neutral-200">
                  <span className="text-xs text-[#737373] block font-semibold">Delivered Units</span>
                  <span className="text-2xl font-black text-[#1C1C1C] font-display">
                    {currentDivision.stats.completedProjects}
                  </span>
                </div>
                <div className="bg-[#F5F5F3] p-4 rounded-xl border border-neutral-200">
                  <span className="text-xs text-[#737373] block font-semibold">Active Sites</span>
                  <span className="text-2xl font-black text-[#D97706] font-display">
                    {currentDivision.stats.ongoingSites} Live
                  </span>
                </div>
                <div className="bg-[#F5F5F3] p-4 rounded-xl border border-neutral-200">
                  <span className="text-xs text-[#737373] block font-semibold">Division Force</span>
                  <span className="text-2xl font-black text-[#1C1C1C] font-display">
                    {currentDivision.stats.engineers}
                  </span>
                </div>
                <div className="bg-[#F5F5F3] p-4 rounded-xl border border-neutral-200">
                  <span className="text-xs text-[#737373] block font-semibold">Total Scale</span>
                  <span className="text-sm font-black text-[#1C1C1C] font-mono mt-1 block">
                    {currentDivision.stats.sqftConstructed}
                  </span>
                </div>
              </div>

              {/* Core Engineering Capabilities */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#1C1C1C] flex items-center gap-2">
                  <HardHat className="w-4 h-4 text-[#F59E0B]" />
                  Division Capabilities & Technical Specifications
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {currentDivision.keyCapabilities.map((cap, i) => (
                    <div key={i} className="flex items-start gap-2.5 bg-[#F5F5F3] p-3 rounded-xl border border-neutral-200 text-xs text-[#4B4B4B]">
                      <CheckCircle2 className="w-4 h-4 text-[#F59E0B] flex-shrink-0 mt-0.5" />
                      <span>{cap}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Machinery & Equipment Fleet */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#1C1C1C] flex items-center gap-2">
                  <Wrench className="w-4 h-4 text-[#F59E0B]" />
                  Heavy Equipment & Precision Machinery Fleet
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {currentDivision.equipmentFleet.map((tool, i) => (
                    <div key={i} className="bg-[#F5F5F3] p-3 rounded-xl border border-neutral-200 text-xs font-semibold text-center text-[#1C1C1C]">
                      {tool}
                    </div>
                  ))}
                </div>
              </div>

              {/* Certifications & Quality Assurances */}
              <div className="bg-[#F5F5F3] p-4 rounded-xl border border-[#F59E0B]/30 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-[#F59E0B]" />
                  <span className="font-bold text-[#1C1C1C]">Certifications & Guarantees:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {currentDivision.certifications.map((cert, i) => (
                    <span key={i} className="px-2.5 py-1 rounded-md bg-white text-[#D97706] font-bold border border-neutral-200 shadow-sm">
                      ✓ {cert}
                    </span>
                  ))}
                </div>
              </div>

            </div>

            {/* Associated Services under this Division */}
            {associatedServices.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-[#1C1C1C] flex items-center gap-2">
                    <FileText className="w-4 h-4 text-[#F59E0B]" />
                    Services Offered under {currentDivision.shortName}
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {associatedServices.map(srv => (
                    <div
                      key={srv.id}
                      className="bg-[#FFFFFF] border border-neutral-200 rounded-2xl p-5 hover:border-[#F59E0B] transition-colors space-y-3 shadow-sm"
                    >
                      <div className="flex items-center justify-between">
                        <span className="px-2.5 py-0.5 rounded-md bg-[#F59E0B]/15 text-[#D97706] text-xs font-bold border border-[#F59E0B]/30">
                          {srv.badge}
                        </span>
                        <span className="text-xs text-[#737373] font-mono font-bold">{srv.startingPrice}</span>
                      </div>

                      <h4 className="font-bold text-[#1C1C1C] text-base">{srv.title}</h4>
                      <p className="text-xs text-[#4B4B4B] line-clamp-2">{srv.shortDesc}</p>

                      <div className="pt-2 flex items-center justify-between">
                        <button
                          onClick={() => openServiceModal(srv.id)}
                          className="text-xs font-bold text-[#D97706] hover:underline"
                        >
                          View Full Scope &rarr;
                        </button>
                        <button
                          onClick={() => navigateTo('request', { serviceId: srv.id, divisionId: currentDivision.id })}
                          className="px-3 py-1.5 rounded-lg bg-[#F59E0B] hover:bg-[#D97706] text-[#1C1C1C] hover:text-white font-bold text-xs transition-colors"
                        >
                          Request Service
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Associated Projects Showcase */}
            {associatedPortfolio.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-[#1C1C1C] flex items-center gap-2">
                  <Layers className="w-4 h-4 text-[#F59E0B]" />
                  Key Projects Delivered by {currentDivision.shortName}
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {associatedPortfolio.map(proj => (
                    <div
                      key={proj.id}
                      className="bg-[#FFFFFF] border border-neutral-200 rounded-2xl overflow-hidden group shadow-sm hover:border-[#F59E0B] transition-all"
                    >
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={proj.image}
                          alt={proj.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-[#1C1C1C]/80 backdrop-blur-md text-[11px] font-bold text-[#F59E0B]">
                          {proj.location}
                        </div>
                      </div>

                      <div className="p-4 space-y-2">
                        <h4 className="font-bold text-[#1C1C1C] text-sm sm:text-base">{proj.title}</h4>
                        <p className="text-xs text-[#4B4B4B] line-clamp-2">{proj.description}</p>
                        <div className="flex items-center justify-between text-xs pt-2 border-t border-neutral-100 font-mono text-[#737373]">
                          <span>Scale: {proj.area}</span>
                          <span className="text-[#D97706] font-bold">{proj.cost}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Final Division CTA */}
            <div className="bg-[#1C1C1C] text-white rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl border border-neutral-800">
              <div className="space-y-2 text-center sm:text-left">
                <h3 className="text-2xl font-display font-black text-white">
                  Ready to Start with {currentDivision.shortName}?
                </h3>
                <p className="text-sm font-medium text-[#A8A8A2]">
                  Book a free site inspection with {currentDivision.divisionHead} today.
                </p>
              </div>

              <button
                onClick={() => navigateTo('request', { divisionId: currentDivision.id })}
                className="px-6 py-3.5 rounded-xl bg-[#F59E0B] hover:bg-[#D97706] text-[#1C1C1C] hover:text-white font-extrabold text-sm transition-all shadow-md flex-shrink-0"
              >
                Submit Project Request &rarr;
              </button>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
}

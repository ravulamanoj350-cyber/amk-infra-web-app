import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  ArrowRight,
  Calculator,
  ShieldCheck,
  CheckCircle2,
  HardHat,
  Building2,
  Phone,
  MessageSquare,
  Search,
  Sparkles,
  MapPin,
  CalendarCheck,
  Layers,
  Smartphone,
  QrCode,
  Award,
  Briefcase,
  FileText,
  Shield,
  Activity
} from 'lucide-react';

export function HeroSection() {
  const {
    navigateTo,
    setEstimatorModalOpen,
    setWebMobileSyncModalOpen,
    openJobApplication,
    openStaffIntranet,
    divisions,
    t
  } = useApp();
  const [quickTrackCode, setQuickTrackCode] = useState('');

  const handleQuickTrack = (e) => {
    e.preventDefault();
    if (quickTrackCode.trim()) {
      navigateTo('tracker', { trackingCode: quickTrackCode.trim() });
    }
  };

  return (
    <section className="relative overflow-hidden text-white min-h-[92vh] flex items-center">
      {/* Background Luminous Highlights & Architectural Glow */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Subtle Ambient Highlight Glow Orbs */}
        <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-[#F59E0B]/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 left-1/3 w-[600px] h-72 bg-neutral-800/20 rounded-full blur-3xl" />

        {/* Clean Deep Gradients */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#181818]/95 via-[#181818]/80 to-[#181818]/50" />
        <div className="absolute inset-0 construction-grid-pattern opacity-25" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Trust Badges Bar */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1C1C1C] border border-[#F59E0B]/40 text-[#F59E0B] text-xs font-extrabold tracking-wide backdrop-blur-md">
                <Building2 className="w-4 h-4 text-[#F59E0B] animate-bounce" />
                <span>{t('hero_badge', '7 SPECIALIZED CORPORATE ENGINEERING DIVISIONS')}</span>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-bold backdrop-blur-md">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>{t('iso_badge', '0.00 LTI Safety • ISO 9001:2015')}</span>
              </div>
            </div>

            {/* Main Headline */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-black tracking-tight text-white leading-[1.1]">
                {t('hero_headline_1', 'Engineering Iconic Spaces.')}{' '}
                <span className="text-[#F59E0B]">
                  {t('hero_headline_2', 'Empowering Talent.')}
                </span>
              </h1>
              <p className="text-lg sm:text-xl font-medium text-amber-100/90 italic">
                {t('hero_subquote', '"Your Vision, Our Commitment • 100% Milestone Reliability"')}
              </p>
            </div>

            {/* Description */}
            <p className="text-[#E8E8E5] text-base sm:text-lg max-w-2xl leading-relaxed">
              {t('hero_bio', 'Led by Founder & MD A. Charan Patel, AMK INFRA operates across 7 Specialized Corporate Divisions—executing commercial multi-storey towers, bespoke custom villas, government highway box canals, turnkey interiors, and 4K AI security across Telangana.')}
            </p>

            {/* Division Selector Pills */}
            <div className="space-y-2 pt-1">
              <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-[#F59E0B]" />
                {t('explore_by_wing', 'Explore by Corporate Wing:')}
              </span>
              <div className="flex flex-wrap gap-1.5">
                {[
                  { label: t('div_civil', 'Civil & Commercial'), id: 'civil-commercial' },
                  { label: t('div_villas', 'Custom Luxury Villas'), id: 'residential-villas' },
                  { label: t('div_heavy', 'Heavy Roads & Canals'), id: 'infrastructure-public' },
                  { label: t('div_interiors', 'Turnkey 3D Interiors'), id: 'interiors-living' },
                  { label: t('div_power', 'Power & Smart Grid'), id: 'power-automation' },
                  { label: t('div_security', '4K CCTV & Security'), id: 'surveillance-security' },
                  { label: t('div_paint', 'Waterproofing & Paint'), id: 'surface-protection' }
                ].map(item => (
                  <button
                    key={item.id}
                    onClick={() => navigateTo('divisions', { divisionId: item.id })}
                    className="px-3 py-1.5 rounded-xl bg-[#242424] hover:bg-[#F59E0B] hover:text-[#1C1C1C] text-neutral-200 text-xs font-bold border border-neutral-700 hover:border-[#F59E0B] transition-all shadow-sm"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Target Action Buttons */}
            <div className="pt-2 flex flex-wrap gap-3.5">
              
              {/* For Clients */}
              <button
                onClick={() => navigateTo('request')}
                className="px-6 py-4 rounded-xl bg-[#F59E0B] hover:bg-[#D97706] text-[#1C1C1C] hover:text-white font-black text-xs sm:text-sm shadow-md transition-all transform hover:-translate-y-0.5 flex items-center gap-2.5"
              >
                <Building2 className="w-4 h-4 stroke-[2.5]" />
                <span>{t('btn_client_request', 'Client Service Request')}</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>

              {/* Explore Corporate Divisions */}
              <button
                onClick={() => navigateTo('divisions')}
                className="px-5 py-4 rounded-xl bg-[#262626] hover:bg-[#333333] text-white font-bold text-xs sm:text-sm border border-neutral-700 hover:border-[#F59E0B] transition-all flex items-center gap-2 backdrop-blur-md"
              >
                <Layers className="w-4 h-4 text-[#F59E0B]" />
                <span>{t('nav_divisions', 'Explore 7 Divisions')}</span>
              </button>

              {/* For Staff / Engineers Hiring */}
              <button
                onClick={() => navigateTo('careers')}
                className="px-5 py-4 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 font-bold text-xs sm:text-sm border border-emerald-500/40 transition-all flex items-center gap-2 backdrop-blur-md"
              >
                <Briefcase className="w-4 h-4 text-emerald-400" />
                <span>{t('btn_join_careers', 'Join Engineering Force')}</span>
              </button>

              {/* Calculator */}
              <button
                onClick={() => setEstimatorModalOpen(true)}
                className="px-4 py-4 rounded-xl bg-[#262626] hover:bg-[#333333] text-neutral-200 font-bold text-xs sm:text-sm border border-neutral-700 transition-all flex items-center gap-2 backdrop-blur-md"
                title="Calculate Construction Estimate"
              >
                <Calculator className="w-4 h-4 text-[#F59E0B]" />
                <span>{t('btn_cost_estimator', 'Cost Estimator')}</span>
              </button>
            </div>

            {/* Quick Live Track Bar */}
            <form onSubmit={handleQuickTrack} className="pt-1 max-w-md">
              <div className="relative flex items-center">
                <Search className="absolute left-3.5 w-4 h-4 text-neutral-400" />
                <input
                  type="text"
                  placeholder={t('track_placeholder', 'Enter Tracking ID e.g. AMK-2026-1042')}
                  value={quickTrackCode}
                  onChange={e => setQuickTrackCode(e.target.value)}
                  className="w-full bg-[#141414] border border-neutral-700 focus:border-[#F59E0B] rounded-xl pl-10 pr-24 py-2.5 text-xs text-white placeholder-neutral-400 outline-none transition-colors backdrop-blur-md"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 px-3 py-1.5 rounded-lg bg-[#F59E0B] text-[#1C1C1C] hover:bg-[#D97706] hover:text-white font-bold text-xs transition-colors"
                >
                  {t('btn_track_live', 'Track Live')}
                </button>
              </div>
            </form>

            {/* Key Value Checks */}
            <div className="pt-2 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-neutral-300 font-medium">
              <div className="flex items-center gap-2 bg-[#1C1C1C]/80 px-2.5 py-1.5 rounded-xl border border-neutral-800 backdrop-blur-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>{t('check_7_divisions', '7 Corporate Divisions')}</span>
              </div>
              <div className="flex items-center gap-2 bg-[#1C1C1C]/80 px-2.5 py-1.5 rounded-xl border border-neutral-800 backdrop-blur-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>{t('check_nabl_tested', 'NABL Lab Tested Steel/RCC')}</span>
              </div>
              <div className="flex items-center gap-2 bg-[#1C1C1C]/80 px-2.5 py-1.5 rounded-xl border border-neutral-800 backdrop-blur-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>{t('check_solvency', '₹25 Cr Bank Solvency')}</span>
              </div>
              <div className="flex items-center gap-2 bg-[#1C1C1C]/80 px-2.5 py-1.5 rounded-xl border border-neutral-800 backdrop-blur-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>{t('check_mobile_sync', 'Mobile App Live Sync')}</span>
              </div>
            </div>
          </div>

          {/* Right Hero Card / Live Operational Metrics */}
          <div className="lg:col-span-5">
            <div className="relative bg-[#242424] p-6 sm:p-8 rounded-3xl border border-neutral-700 shadow-2xl space-y-6 backdrop-blur-xl">
              
              {/* Founder Header Badge */}
              <div className="flex items-center justify-between pb-4 border-b border-neutral-700">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#F59E0B] text-[#1C1C1C] flex items-center justify-center font-black text-xl shadow-md">
                    A
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-base">{t('founder_name', 'A. Charan Patel')}</h3>
                    <p className="text-xs text-[#F59E0B] font-medium">{t('founder_title', 'Founder & Managing Director')}</p>
                  </div>
                </div>
                <div className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold border border-emerald-500/30 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>{t('founder_verified', '100% Quality Verified')}</span>
                </div>
              </div>

              {/* Live Metric Stats Grid */}
              <div className="grid grid-cols-2 gap-3.5">
                <div className="bg-[#1C1C1C] p-4 rounded-2xl border border-neutral-700">
                  <div className="text-2xl sm:text-3xl font-black text-[#F59E0B] font-display">₹150Cr+</div>
                  <div className="text-xs text-neutral-200 font-semibold mt-0.5">{t('stat_contracts', 'Contracts Executed')}</div>
                  <div className="text-[10px] text-neutral-400">{t('stat_contracts_sub', 'Commercial & Roads')}</div>
                </div>

                <div className="bg-[#1C1C1C] p-4 rounded-2xl border border-neutral-700">
                  <div className="text-2xl sm:text-3xl font-black text-emerald-400 font-display">0.00 LTI</div>
                  <div className="text-xs text-neutral-200 font-semibold mt-0.5">{t('stat_safety', 'Safety Benchmark')}</div>
                  <div className="text-[10px] text-neutral-400">{t('stat_safety_sub', '1.28M Safe Hours')}</div>
                </div>

                <div className="bg-[#1C1C1C] p-4 rounded-2xl border border-neutral-700">
                  <div className="text-2xl sm:text-3xl font-black text-white font-display">450+</div>
                  <div className="text-xs text-neutral-200 font-semibold mt-0.5">{t('stat_workforce', 'Active Workforce')}</div>
                  <div className="text-[10px] text-neutral-400">{t('stat_workforce_sub', 'Engineers & Crew')}</div>
                </div>

                <div className="bg-[#1C1C1C] p-4 rounded-2xl border border-neutral-700">
                  <div className="text-2xl sm:text-3xl font-black text-blue-400 font-display">100%</div>
                  <div className="text-xs text-neutral-200 font-semibold mt-0.5">{t('stat_handover', 'On-Time Handover')}</div>
                  <div className="text-[10px] text-neutral-400">{t('stat_handover_sub', 'Contract Guarantee')}</div>
                </div>
              </div>

              {/* Live Photographic Site Camera Stream Mini-Card */}
              <div className="relative rounded-2xl overflow-hidden border border-neutral-700 group shadow-lg">
                <div className="h-28 w-full relative overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1541888946425-d0fbb18f15f6?auto=format&fit=crop&w=800&q=80"
                    alt="AMK Live Site Camera"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                  
                  <div className="absolute top-2 left-2 flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-black/85 backdrop-blur-md border border-red-500/40 text-[10px] text-white font-mono font-bold">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                    <span>LIVE CAM • WARANGAL TECH HUB</span>
                  </div>

                  <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-xs text-white">
                    <span className="text-[11px] font-semibold text-neutral-200">Level 4 RCC Casting in Progress</span>
                    <button
                      onClick={() => navigateTo('portfolio')}
                      className="px-2 py-0.5 rounded bg-[#F59E0B] text-[#1C1C1C] font-bold text-[10px] hover:bg-[#D97706] hover:text-white transition-colors"
                    >
                      View Live Photos
                    </button>
                  </div>
                </div>
              </div>

              {/* Field Staff Intranet Quick Trigger Bar */}
              <div className="bg-[#1C1C1C] p-4 rounded-2xl border border-neutral-700 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold">
                    <HardHat className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white block">{t('field_intranet_title', 'Field Staff Intranet')}</span>
                    <span className="text-[11px] text-neutral-400">{t('field_intranet_desc', 'File Daily Progress Reports & Toolbox Talks')}</span>
                  </div>
                </div>
                <button
                  onClick={openStaffIntranet}
                  className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-colors"
                >
                  {t('btn_open_dpr', 'Open DPR')}
                </button>
              </div>

              {/* Companion App Live Sync Card */}
              <div className="bg-[#1C1C1C] p-4 rounded-2xl border border-neutral-700 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-[#F59E0B] flex items-center justify-center font-bold">
                    <Smartphone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white block">{t('companion_app_title', 'Companion Mobile App')}</span>
                    <span className="text-[11px] text-neutral-400">{t('companion_app_desc', 'Pair iOS / Android for site cameras & alerts')}</span>
                  </div>
                </div>
                <button
                  onClick={() => setWebMobileSyncModalOpen(true)}
                  className="px-3 py-1.5 rounded-lg bg-[#F59E0B] text-[#1C1C1C] hover:bg-[#D97706] hover:text-white font-bold text-xs transition-colors"
                >
                  {t('btn_pair_qr', 'Pair QR')}
                </button>
              </div>

              {/* Direct Call / Contact Banner */}
              <div className="pt-1 flex items-center justify-between bg-neutral-800/80 p-3 rounded-2xl border border-neutral-700">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#F59E0B] text-[#1C1C1C] flex items-center justify-center font-bold">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] text-neutral-400 uppercase block font-bold">{t('direct_hotline', 'Direct MD Hotline')}</span>
                    <a href="tel:9032477292" className="text-sm font-extrabold text-white hover:text-[#F59E0B]">
                      9032477292
                    </a>
                  </div>
                </div>

                <button
                  onClick={() => navigateTo('contact')}
                  className="text-xs font-bold text-[#F59E0B] hover:text-amber-300 flex items-center gap-1"
                >
                  <span>{t('btn_book_consultation', 'Book Consultation')}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

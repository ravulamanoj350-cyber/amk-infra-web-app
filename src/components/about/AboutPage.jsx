import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Building2,
  HardHat,
  ShieldCheck,
  Handshake,
  Lightbulb,
  Award,
  Users,
  CheckCircle2,
  MapPin,
  Phone,
  MessageSquare,
  ArrowRight,
  Sparkles,
  Wrench,
  Truck,
  Briefcase,
  FileText,
  Layers
} from 'lucide-react';

export function AboutPage() {
  const { navigateTo, openJobApplication, divisions } = useApp();

  return (
    <div className="py-16 bg-[#F5F5F3] text-[#4B4B4B] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header Hero */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white text-[#D97706] text-xs font-bold border border-[#F59E0B]/30 shadow-sm">
            <Building2 className="w-3.5 h-3.5 text-[#F59E0B]" />
            <span>About AMK INFRA Enterprise</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-display font-black tracking-tight text-[#1C1C1C]">
            Engineering Better Spaces,{' '}
            <span className="text-[#D97706]">
              Delivering Lasting Trust.
            </span>
          </h1>
          <p className="text-[#4B4B4B] text-sm sm:text-base leading-relaxed">
            Headquartered in Subedari, Hanamkonda, AMK INFRA is a Class-I licensed multi-disciplinary construction conglomerate operating across 7 specialized corporate divisions in Telangana.
          </p>
        </div>

        {/* Founder Spotlight Card */}
        <div className="bg-[#1C1C1C] text-white rounded-2xl border border-neutral-800 p-8 sm:p-12 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-4 flex flex-col items-center text-center">
              <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-2xl bg-[#F59E0B] text-[#1C1C1C] flex items-center justify-center font-black text-6xl shadow-xl border-4 border-neutral-800">
                A
              </div>
              <h3 className="text-xl font-bold text-white font-display mt-4">
                A. Charan Patel
              </h3>
              <p className="text-xs text-[#F59E0B] font-semibold uppercase tracking-wider">
                Founder & Managing Director
              </p>
              <span className="text-[11px] text-[#A8A8A2] mt-1">
                Civil Engineering Leader • 12+ Years Field Experience
              </span>

              <div className="mt-4 flex gap-2">
                <a
                  href="tel:9032477292"
                  className="px-3 py-1.5 rounded-lg bg-[#242424] hover:bg-[#2e2e2e] text-white text-xs font-bold flex items-center gap-1 border border-neutral-700"
                >
                  <Phone className="w-3.5 h-3.5 text-[#F59E0B]" />
                  <span>Call 9032477292</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-8 space-y-4 text-[#A8A8A2] text-xs sm:text-sm leading-relaxed">
              <span className="text-xs font-bold text-[#F59E0B] uppercase tracking-widest block">
                Message from the Managing Director
              </span>
              <h2 className="text-2xl font-bold text-white font-display">
                "Our commitment is to construct structures that stand as generational landmarks."
              </h2>
              <p>
                When we started AMK INFRA in Warangal, our vision was clear: to eliminate the common headaches of construction — cost escalations, unmonitored material quality, and delayed handovers.
              </p>
              <p>
                By establishing <strong className="text-white">7 specialized corporate divisions</strong>—each headed by seasoned structural engineers, architects, and technical directors—we deliver end-to-end turnkey quality from soil bearing tests and RCC frame execution to Hafele modular interiors and 4K AI security networks.
              </p>
              <p>
                Whether you are building your family's dream villa, a multi-storey commercial retail tower, or requiring municipal road infrastructure, my team and I personally guarantee uncompromising structural integrity and 100% on-time delivery.
              </p>
            </div>
          </div>
        </div>

        {/* Division Engineering Leadership Grid */}
        <div className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs text-[#D97706] font-extrabold uppercase tracking-widest block">
              Executive Technical Leadership
            </span>
            <h3 className="text-3xl font-bold text-[#1C1C1C] font-display">
              Directors of Our 7 Corporate Wings
            </h3>
            <p className="text-xs text-[#737373]">
              Specialized domain directors bringing decades of field execution excellence to every site.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {(divisions || []).map(div => (
              <div
                key={div.id}
                onClick={() => navigateTo('divisions', { divisionId: div.id })}
                className="p-5 rounded-2xl bg-[#FFFFFF] border border-neutral-200 hover:border-[#F59E0B] shadow-sm hover:shadow-lg transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold text-[#D97706] bg-[#F5F5F3] px-2 py-0.5 rounded border border-neutral-200">
                      {div.code}
                    </span>
                    <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      Active Wing
                    </span>
                  </div>

                  <div>
                    <h4 className="font-bold text-[#1C1C1C] group-hover:text-[#D97706] text-sm font-display transition-colors">
                      {div.shortName || div.name}
                    </h4>
                    <p className="text-xs text-[#D97706] font-semibold mt-1">
                      {div.divisionHead}
                    </p>
                    <span className="text-[10px] text-[#737373] block mt-0.5">
                      {div.headTitle}
                    </span>
                  </div>
                </div>

                <div className="pt-3 mt-3 border-t border-neutral-100 flex items-center justify-between text-[11px] text-[#737373]">
                  <span>{div.stats?.completedProjects || '50+'} Projects</span>
                  <span className="text-[#F59E0B] font-bold group-hover:translate-x-1 transition-transform">
                    View Specs &rarr;
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 4 Pillars of Operational Integrity */}
        <div className="space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h3 className="text-2xl font-bold text-[#1C1C1C] font-display">
              Our 4 Pillars of Operational Integrity
            </h3>
            <p className="text-xs text-[#737373]">
              The fundamental engineering principles that guide every foundation we pour and every key we hand over.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-[#FFFFFF] border border-neutral-200 shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#F59E0B]/15 text-[#F59E0B] flex items-center justify-center font-bold">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-[#1C1C1C] text-base">Quality First</h4>
              <p className="text-xs text-[#737373] leading-relaxed">
                NABL lab tested Fe-550D TMT steel, 53-grade certified cement, and machine vibrated compaction with 10-year warranty.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FFFFFF] border border-neutral-200 shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold border border-emerald-200">
                <Handshake className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-[#1C1C1C] text-base">100% Trust</h4>
              <p className="text-xs text-[#737373] leading-relaxed">
                Complete transparency in itemized BOQ estimations, milestone billing schedules, and zero hidden costs.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FFFFFF] border border-neutral-200 shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-xl bg-neutral-100 text-[#1C1C1C] flex items-center justify-center font-bold border border-neutral-300">
                <Lightbulb className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-[#1C1C1C] text-base">Tech Innovation</h4>
              <p className="text-xs text-[#737373] leading-relaxed">
                Digital laser theodolites, 3D photorealistic architectural renders, DJI LiDAR drones, and mobile app sync.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FFFFFF] border border-neutral-200 shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#F59E0B]/15 text-[#D97706] flex items-center justify-center font-bold border border-[#F59E0B]/30">
                <Award className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-[#1C1C1C] text-base">Zero-LTI Safety</h4>
              <p className="text-xs text-[#737373] leading-relaxed">
                ISO 45001 audited safety protocols, ₹25L staff insurance, daily toolbox talks, and 1.28M safe man-hours.
              </p>
            </div>
          </div>
        </div>

        {/* Machinery & Equipment Inventory */}
        <div className="bg-[#FFFFFF] p-8 rounded-2xl border border-neutral-200 shadow-md space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold text-[#1C1C1C] font-display">
                Modern Equipment & Mechanized Fleet
              </h3>
              <p className="text-xs text-[#737373]">
                100% owned in-house specialized construction equipment ensuring speed, safety, and precision.
              </p>
            </div>
            <div className="px-3 py-1 rounded-md bg-[#F5F5F3] text-[#D97706] text-xs font-bold border border-neutral-200">
              🚜 Mechanized Fleet
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-[#F5F5F3] border border-neutral-200">
              <strong className="text-[#1C1C1C] block">Batching Concrete Mixers</strong>
              <span className="text-[#737373] text-[11px]">Consistent mix ratio & zero manual variation</span>
            </div>
            <div className="p-4 rounded-xl bg-[#F5F5F3] border border-neutral-200">
              <strong className="text-[#1C1C1C] block">Heavy Cuplock Scaffolding</strong>
              <span className="text-[#737373] text-[11px]">1,50,000 sq.ft capacity multi-tier safety</span>
            </div>
            <div className="p-4 rounded-xl bg-[#F5F5F3] border border-neutral-200">
              <strong className="text-[#1C1C1C] block">Laser Screed & Total Station</strong>
              <span className="text-[#737373] text-[11px]">Millimeter precision structural alignment</span>
            </div>
            <div className="p-4 rounded-xl bg-[#F5F5F3] border border-neutral-200">
              <strong className="text-[#1C1C1C] block">Hydraulic Excavator Fleet</strong>
              <span className="text-[#737373] text-[11px]">JCB 3DX & Tata Hitachi EX200 units</span>
            </div>
          </div>
        </div>

        {/* Dual CTA: For Clients vs For Careers */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <div className="p-8 rounded-2xl bg-[#1C1C1C] text-white border border-neutral-800 shadow-xl space-y-4">
            <span className="text-xs text-[#F59E0B] font-bold uppercase tracking-wider block">
              For Clients & Institutional Developers
            </span>
            <h3 className="text-2xl font-bold text-white font-display">
              Build Your Landmark With AMK INFRA
            </h3>
            <p className="text-xs text-[#A8A8A2]">
              Schedule a technical consultation with Founder A. Charan Patel or request an itemized BOQ estimate.
            </p>
            <div className="flex gap-2.5">
              <button
                onClick={() => navigateTo('request')}
                className="px-5 py-2.5 rounded-xl bg-[#F59E0B] hover:bg-[#D97706] text-[#1C1C1C] hover:text-white font-extrabold text-xs shadow-md transition-all"
              >
                Request Service &rarr;
              </button>
            </div>
          </div>

          <div className="p-8 rounded-2xl bg-[#242424] text-white border border-neutral-800 shadow-xl space-y-4">
            <span className="text-xs text-emerald-400 font-bold uppercase tracking-wider block">
              For Engineers, Architects & Field Supervisors
            </span>
            <h3 className="text-2xl font-bold text-white font-display">
              Join Our Engineering Force
            </h3>
            <p className="text-xs text-[#A8A8A2]">
              We offer ₹25L hazard insurance, continuous NABL certification sponsorship, and performance bonuses.
            </p>
            <div className="flex gap-2.5">
              <button
                onClick={() => navigateTo('careers')}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-md transition-all"
              >
                View Open Positions &rarr;
              </button>
              <button
                onClick={() => openJobApplication()}
                className="px-4 py-2.5 rounded-xl bg-[#181818] hover:bg-[#121212] text-neutral-200 font-bold text-xs border border-neutral-700 transition-all"
              >
                Fast-Track CV
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

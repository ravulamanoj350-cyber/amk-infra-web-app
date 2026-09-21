import React from 'react';
import {
  Users,
  CalendarCheck,
  BadgeIndianRupee,
  HeartHandshake,
  CheckCircle2,
  Building2,
  Wrench,
  HardHat,
  Sparkles,
  ShieldAlert
} from 'lucide-react';

const ICONS = {
  Users,
  CalendarCheck,
  BadgeIndianRupee,
  HeartHandshake,
  CheckCircle2,
  Building2,
  Wrench,
  HardHat
};

export function WhyChooseUsSection() {
  const pillars = [
    {
      id: 1,
      title: "Experienced & Skilled Team",
      desc: "Licensed civil engineers, master masons, certified architects, and seasoned electricians with 12+ years of field excellence.",
      icon: Users,
      badge: "Expertise"
    },
    {
      id: 2,
      title: "On-Time Project Delivery",
      desc: "Structured milestone scheduling, strict project Gantt charts, and penalty-backed handover guarantees.",
      icon: CalendarCheck,
      badge: "Punctuality"
    },
    {
      id: 3,
      title: "Affordable & Transparent Pricing",
      desc: "Detailed, itemized BOQ estimates with competitive sq.ft rates and zero surprise hidden charges.",
      icon: BadgeIndianRupee,
      badge: "No Hidden Costs"
    },
    {
      id: 4,
      title: "Customer-Centric Approach",
      desc: "Daily WhatsApp video updates, dedicated site supervisors, and 24/7 client liaison with Founder A. Charan Patel.",
      icon: HeartHandshake,
      badge: "Daily Updates"
    },
    {
      id: 5,
      title: "End-to-End Solutions",
      desc: "Complete handling from municipal GHMC/GWMC plan sanctions, soil testing, foundation, to key handover.",
      icon: CheckCircle2,
      badge: "Full Lifecycle"
    },
    {
      id: 6,
      title: "One-Stop Solution",
      desc: "Civil engineering, interior fitouts, CCTV security, 3-phase electricals, and painting under one roof.",
      icon: Building2,
      badge: "All-in-One"
    },
    {
      id: 7,
      title: "Modern Equipment & Machinery",
      desc: "Automated concrete batching, laser levelers, heavy compaction rollers, and precision CNC interior joinery.",
      icon: Wrench,
      badge: "High Tech"
    },
    {
      id: 8,
      title: "Safe & Secure Work Process",
      desc: "Strict HSE safety protocols, worker health insurance, and zero-accident construction site standards.",
      icon: HardHat,
      badge: "HSE Certified"
    }
  ];

  return (
    <section className="py-20 bg-[#1C1C1C] text-white relative">
      {/* Architectural subtle line background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#242424] text-[#F59E0B] text-xs font-extrabold uppercase tracking-wider border border-[#F59E0B]/30 shadow-sm">
            <Sparkles className="w-4 h-4 text-[#F59E0B]" />
            <span>The AMK INFRA Advantage</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black tracking-tight text-white">
            Why Choose Us for Your{' '}
            <span className="text-[#F59E0B]">
              Next Construction?
            </span>
          </h2>
          <p className="text-[#A8A8A2] text-sm sm:text-base leading-relaxed">
            We combine civil engineering precision, uncompromising material quality, and client-first transparency to make your dream project effortless and enduring.
          </p>
        </div>

        {/* 8 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="group p-6 rounded-2xl bg-[#242424] border border-neutral-800 hover:border-[#F59E0B] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-[#F59E0B]/15 group-hover:bg-[#F59E0B] group-hover:text-[#1C1C1C] text-[#F59E0B] flex items-center justify-center transition-all duration-300 shadow-md">
                      <Icon className="w-6 h-6 stroke-[2.2]" />
                    </div>
                    <span className="text-[10px] font-extrabold px-2.5 py-1 rounded-md bg-[#181818] text-[#A8A8A2] border border-neutral-700">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-base text-white group-hover:text-[#F59E0B] transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs text-[#A8A8A2] leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-neutral-800 flex items-center gap-2 text-[11px] text-[#737373] font-semibold">
                  <span className="text-[#F59E0B]">0{idx + 1}</span>
                  <span>/ 08 Pillar</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Trust Seal Banner */}
        <div className="mt-14 p-6 sm:p-8 rounded-2xl bg-[#242424] border border-[#F59E0B]/40 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#F59E0B]/20 text-[#F59E0B] flex items-center justify-center flex-shrink-0">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-white">
                100% Quality & Structural Warranty Guarantee
              </h4>
              <p className="text-xs sm:text-sm text-[#A8A8A2]">
                All RCC frame structures executed by AMK INFRA come with a 10-year structural warranty certificate signed by our chief structural engineer.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 flex-shrink-0">
            <a
              href="tel:9032477292"
              className="px-5 py-3 rounded-xl bg-[#F59E0B] hover:bg-[#D97706] text-[#1C1C1C] hover:text-white font-extrabold text-xs transition-all shadow-md"
            >
              Speak with A. Charan Patel
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

import React from 'react';
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
  ArrowRight,
  CheckCircle2,
  Tag,
  Clock
} from 'lucide-react';

const ICON_MAP = {
  Building2: Building2,
  Home: Home,
  Construction: Construction,
  Hammer: Hammer,
  Zap: Zap,
  Camera: Camera,
  Sparkles: Sparkles,
  PaintBucket: PaintBucket
};

const ACCENT_COLORS = {
  construction: {
    border: 'hover:border-[#F59E0B]',
    tagBg: 'bg-[#F59E0B]/15 text-[#D97706] border-[#F59E0B]/30',
    iconBg: 'bg-[#F59E0B] text-[#1C1C1C]'
  },
  residential: {
    border: 'hover:border-[#F59E0B]',
    tagBg: 'bg-[#F59E0B]/15 text-[#D97706] border-[#F59E0B]/30',
    iconBg: 'bg-[#F59E0B] text-[#1C1C1C]'
  },
  infrastructure: {
    border: 'hover:border-[#1C1C1C]',
    tagBg: 'bg-[#1C1C1C]/10 text-[#1C1C1C] border-[#1C1C1C]/20',
    iconBg: 'bg-[#1C1C1C] text-white'
  },
  renovation: {
    border: 'hover:border-[#F59E0B]',
    tagBg: 'bg-[#F59E0B]/15 text-[#D97706] border-[#F59E0B]/30',
    iconBg: 'bg-[#F59E0B] text-[#1C1C1C]'
  },
  electrical: {
    border: 'hover:border-[#F59E0B]',
    tagBg: 'bg-[#F59E0B]/15 text-[#D97706] border-[#F59E0B]/30',
    iconBg: 'bg-[#F59E0B] text-[#1C1C1C]'
  },
  security: {
    border: 'hover:border-[#1C1C1C]',
    tagBg: 'bg-[#1C1C1C]/10 text-[#1C1C1C] border-[#1C1C1C]/20',
    iconBg: 'bg-[#1C1C1C] text-white'
  },
  interior: {
    border: 'hover:border-[#F59E0B]',
    tagBg: 'bg-[#F59E0B]/15 text-[#D97706] border-[#F59E0B]/30',
    iconBg: 'bg-[#F59E0B] text-[#1C1C1C]'
  },
  painting: {
    border: 'hover:border-[#F59E0B]',
    tagBg: 'bg-[#F59E0B]/15 text-[#D97706] border-[#F59E0B]/30',
    iconBg: 'bg-[#F59E0B] text-[#1C1C1C]'
  }
};

export function ServicesGrid() {
  const { services, navigateTo, openServiceModal } = useApp();

  return (
    <section id="services" className="py-20 bg-[#E8E8E5] text-[#4B4B4B] relative overflow-hidden">
      {/* Background Subtle Architectural Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#1C1C1C_0.5px,transparent_0.5px)] opacity-[0.03] [background-size:24px_24px] pointer-events-none" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#F59E0B]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white text-[#D97706] text-xs font-extrabold uppercase tracking-wider border border-[#F59E0B]/30 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#F59E0B] animate-pulse" />
            <span>Comprehensive Solutions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold tracking-tight text-[#1C1C1C]">
            Our Core Construction & <br className="hidden sm:inline" />
            <span className="text-[#D97706]">
              Infrastructure Services
            </span>
          </h2>
          <p className="text-[#4B4B4B] text-sm sm:text-base leading-relaxed">
            From foundation to turnkey finishing, AMK INFRA provides full-lifecycle engineering expertise. Select any service to explore detailed scope, pricing, and book your site consultation.
          </p>
        </div>

        {/* 8 Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map(service => {
            const Icon = ICON_MAP[service.icon] || Building2;
            const style = ACCENT_COLORS[service.id] || ACCENT_COLORS.construction;

            return (
              <div
                key={service.id}
                className={`group bg-[#FFFFFF] rounded-2xl overflow-hidden border border-neutral-200/90 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-[#F59E0B] flex flex-col justify-between`}
              >
                <div>
                  {/* Service Photo Header with Accent Badge */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1C1C1C]/80 via-transparent to-transparent" />
                    
                    {/* Badge Tag */}
                    <div className="absolute top-3 right-3">
                      <span className={`px-2.5 py-1 rounded-md text-[11px] font-bold border backdrop-blur-md bg-white/95 text-[#1C1C1C] border-neutral-200 shadow-sm`}>
                        {service.badge}
                      </span>
                    </div>

                    {/* Icon Floating Box */}
                    <div className="absolute bottom-3 left-4 flex items-center gap-2.5">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-md bg-[#F59E0B] text-[#1C1C1C]`}>
                        <Icon className="w-5 h-5 stroke-[2.5]" />
                      </div>
                      <span className="text-xs font-bold text-white bg-[#1C1C1C]/90 px-2.5 py-1 rounded-md shadow-sm">
                        {service.startingPrice}
                      </span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-5 space-y-3">
                    <h3 className="font-display font-bold text-base text-[#1C1C1C] group-hover:text-[#D97706] transition-colors line-clamp-1">
                      {service.title}
                    </h3>
                    <p className="text-xs text-[#4B4B4B] leading-relaxed line-clamp-2">
                      {service.shortDesc}
                    </p>

                    {/* Feature Bullets */}
                    <div className="pt-2 space-y-1.5 border-t border-neutral-100">
                      {service.features.slice(0, 3).map((feat, idx) => (
                        <div key={idx} className="flex items-start gap-1.5 text-[11px] text-[#737373]">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#F59E0B] flex-shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="p-5 pt-0 grid grid-cols-2 gap-2 mt-2">
                  <button
                    onClick={() => openServiceModal(service.id)}
                    className="py-2 px-3 rounded-lg bg-[#F5F5F3] hover:bg-[#E8E8E5] text-[#1C1C1C] border border-neutral-200 text-xs font-bold text-center transition-colors"
                  >
                    Details
                  </button>
                  <button
                    onClick={() => navigateTo('request', { serviceId: service.id })}
                    className="py-2 px-3 rounded-lg bg-[#F59E0B] hover:bg-[#D97706] text-[#1C1C1C] hover:text-white font-extrabold text-xs text-center transition-all flex items-center justify-center gap-1 shadow-sm"
                  >
                    <span>Request</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner CTA */}
        <div className="mt-12 text-center bg-[#1C1C1C] text-white p-6 sm:p-8 rounded-2xl border border-neutral-800 shadow-xl max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-left space-y-1">
            <h4 className="font-bold text-white text-lg flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-[#F59E0B] rounded-sm" />
              Need a Customized Mixed Project?
            </h4>
            <p className="text-xs sm:text-sm text-[#A8A8A2]">
              Combine Civil Construction + 3D Interiors + CC Camera Security in one package with special bundled discounts.
            </p>
          </div>
          <button
            onClick={() => navigateTo('request')}
            className="whitespace-nowrap px-6 py-3 rounded-xl bg-[#F59E0B] hover:bg-[#D97706] text-[#1C1C1C] hover:text-white font-extrabold text-xs sm:text-sm shadow-md transition-all flex items-center gap-2"
          >
            <span>Start Custom Request</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}

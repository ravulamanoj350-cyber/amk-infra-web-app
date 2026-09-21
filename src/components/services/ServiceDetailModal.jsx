import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  Building2,
  Home,
  Construction,
  Hammer,
  Zap,
  Camera,
  Sparkles,
  PaintBucket,
  CheckCircle2,
  Clock,
  Tag,
  ArrowRight,
  ShieldCheck,
  Phone,
  MessageSquare
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

export function ServiceDetailModal({ serviceId, isOpen, onClose }) {
  const { services, navigateTo } = useApp();

  if (!isOpen || !serviceId) return null;

  const service = services.find(s => s.id === serviceId) || services[0];
  if (!service) return null;

  const Icon = ICON_MAP[service.icon] || Building2;

  const handleBookService = () => {
    onClose();
    navigateTo('request', { serviceId: service.id });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1C1C1C]/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-[#FFFFFF] border border-neutral-200 rounded-3xl shadow-2xl overflow-hidden text-[#4B4B4B] max-h-[92vh] flex flex-col">
        
        {/* Header Photo with Overlay */}
        <div className="relative h-60 overflow-hidden flex-shrink-0">
          <img
            src={service.featuredImage || service.image}
            alt={service.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/50 to-transparent" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-xl bg-black/60 text-white hover:bg-black/90 transition-colors z-20"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Service badge & Title in photo */}
          <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between text-white">
            <div className="space-y-1">
              <span className="px-3 py-1 rounded-full bg-[#F59E0B] text-[#1C1C1C] font-extrabold text-xs">
                {service.badge}
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white font-display">
                {service.title}
              </h2>
            </div>
            <div className="text-right hidden sm:block">
              <span className="text-[10px] text-neutral-300 block font-semibold">Indicative Pricing</span>
              <span className="text-base font-extrabold text-[#F59E0B] font-mono">
                {service.startingPrice}
              </span>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs sm:text-sm">
          
          {/* Overview */}
          <div className="space-y-2">
            <h3 className="font-bold text-[#1C1C1C] text-base font-display">Service Overview</h3>
            <p className="text-[#4B4B4B] leading-relaxed">
              {service.shortDesc}
            </p>
          </div>

          {/* Key Deliverables & Specifications */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#F5F5F3] p-5 rounded-2xl border border-neutral-200">
            <div className="space-y-3">
              <h4 className="font-bold text-[#D97706] text-xs uppercase tracking-wider flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Core Engineering Highlights</span>
              </h4>
              <ul className="space-y-2 text-[#4B4B4B] text-xs">
                {service.features.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B] mt-1.5 flex-shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="font-bold text-[#D97706] text-xs uppercase tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-blue-600" />
                <span>Scope of Execution & Workflow</span>
              </h4>
              <ul className="space-y-2 text-[#4B4B4B] text-xs">
                {service.scope.map((step, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-4 h-4 rounded bg-[#FFFFFF] border border-neutral-200 text-[10px] font-bold text-[#D97706] flex items-center justify-center flex-shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Quick Specifications */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            <div className="bg-[#F5F5F3] p-3 rounded-xl border border-neutral-200">
              <span className="text-[10px] text-[#737373] block font-semibold">Typical Timeline</span>
              <span className="font-bold text-[#1C1C1C] text-xs mt-0.5 block">{service.duration}</span>
            </div>
            <div className="bg-[#F5F5F3] p-3 rounded-xl border border-neutral-200">
              <span className="text-[10px] text-[#737373] block font-semibold">Material Grade</span>
              <span className="font-bold text-[#1C1C1C] text-xs mt-0.5 block">Tier-1 Tested</span>
            </div>
            <div className="bg-[#F5F5F3] p-3 rounded-xl border border-neutral-200">
              <span className="text-[10px] text-[#737373] block font-semibold">Warranty</span>
              <span className="font-bold text-[#1C1C1C] text-xs mt-0.5 block">5 - 10 Years</span>
            </div>
            <div className="bg-[#F5F5F3] p-3 rounded-xl border border-neutral-200">
              <span className="text-[10px] text-[#737373] block font-semibold">Lead Engineer</span>
              <span className="font-bold text-[#D97706] text-xs mt-0.5 block">A. Charan Patel</span>
            </div>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 sm:p-6 bg-[#F5F5F3] border-t border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <a
              href="tel:9032477292"
              className="px-4 py-2.5 rounded-xl bg-[#FFFFFF] hover:bg-neutral-100 text-[#1C1C1C] font-bold text-xs flex items-center gap-1.5 border border-neutral-300 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#D97706]" />
              <span>Call 9032477292</span>
            </a>

            <a
              href={`https://wa.me/919032477292?text=Hello%20AMK%20INFRA%2C%20I%20want%20to%20inquire%20about%20${encodeURIComponent(service.title)}.`}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </a>
          </div>

          <button
            onClick={handleBookService}
            className="w-full sm:w-auto px-7 py-3 rounded-xl bg-[#F59E0B] hover:bg-[#D97706] text-[#1C1C1C] hover:text-white font-extrabold text-xs shadow-md transition-all flex items-center justify-center gap-2"
          >
            <span>Book & Request Quotation</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

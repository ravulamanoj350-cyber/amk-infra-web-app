import React from 'react';
import { useApp } from '../../context/AppContext';
import { Phone, MessageSquare, ArrowRight, ShieldCheck, HardHat } from 'lucide-react';

export function CtaBanner() {
  const { navigateTo } = useApp();

  return (
    <section className="py-16 bg-[#141414] text-white relative overflow-hidden border-y border-neutral-800">
      {/* Decorative Subtle Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-32 bg-[#F59E0B]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 bg-[#1C1C1C] p-8 sm:p-12 rounded-2xl border border-neutral-800 shadow-2xl">
          
          <div className="space-y-3 text-center lg:text-left max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#242424] text-[#F59E0B] text-xs font-bold border border-[#F59E0B]/30 shadow-sm">
              <HardHat className="w-3.5 h-3.5" />
              <span>Ready to Build or Modernize?</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-display font-black text-white leading-tight">
              Let's Turn Your Vision Into a{' '}
              <span className="text-[#F59E0B]">Masterpiece.</span>
            </h2>
            
            <p className="text-[#A8A8A2] text-sm leading-relaxed">
              Connect with Founder <strong className="text-white">A. Charan Patel</strong> and our certified civil engineering team for a free site assessment, 2D/3D conceptual plan, and transparent estimate.
            </p>
          </div>

          {/* Action Button Group */}
          <div className="flex flex-col sm:flex-row items-center gap-3.5 flex-shrink-0 w-full lg:w-auto">
            <button
              onClick={() => navigateTo('request')}
              className="w-full sm:w-auto px-7 py-4 rounded-xl bg-[#F59E0B] hover:bg-[#D97706] text-[#1C1C1C] hover:text-white font-extrabold text-sm shadow-lg transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
            >
              <span>Choose Construction Type</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </button>

            <a
              href="https://wa.me/919032477292?text=Hello%20AMK%20INFRA%2C%20I%20want%20to%20schedule%20a%20site%20meeting."
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto px-6 py-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-md"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp (9032477292)</span>
            </a>

            <a
              href="tel:9032477292"
              className="w-full sm:w-auto px-6 py-4 rounded-xl bg-[#242424] hover:bg-[#2e2e2e] text-white font-bold text-sm border border-neutral-700 transition-all flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4 text-[#F59E0B]" />
              <span>Call Us</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

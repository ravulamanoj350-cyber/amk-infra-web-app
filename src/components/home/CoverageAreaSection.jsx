import React from 'react';
import { useApp } from '../../context/AppContext';
import { MapPin, Navigation, Phone, Clock, ArrowRight, ShieldCheck } from 'lucide-react';

export function CoverageAreaSection() {
  const { navigateTo } = useApp();

  const primeHubs = [
    { name: "Hanamkonda Central", desc: "Subedari, Collectorate Road, Nakkalagutta, Balasamudram", count: "80+ Projects" },
    { name: "Warangal Urban", desc: "Hunter Road, Fort Warangal, Pochamma Maidan, Mattewada", count: "45+ Projects" },
    { name: "Kazipet Junction", desc: "Kazipet Railway Colony, NIT Warangal Corridor, Bapuji Nagar", count: "30+ Projects" },
    { name: "Greater Telangana Area", desc: "Narsampet, Jangaon, Station Ghanpur, Hyderabad ORR Hubs", count: "25+ Projects" }
  ];

  return (
    <section className="py-20 bg-[#F5F5F3] text-[#4B4B4B] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Text & Hubs */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white text-[#D97706] text-xs font-bold border border-[#F59E0B]/30 shadow-sm">
              <MapPin className="w-3.5 h-3.5 text-[#F59E0B]" />
              <span>Local Service Coverage</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-display font-black text-[#1C1C1C]">
              Proudly Building in <br />
              <span className="text-[#D97706]">Warangal, Hanamkonda & Beyond</span>
            </h2>

            <p className="text-[#4B4B4B] text-sm leading-relaxed">
              With our operational headquarters in Subedari, Hanamkonda, AMK INFRA maintains dedicated mobile engineering squads ready to inspect your site, conduct soil tests, and commence construction with zero delay across the tri-cities.
            </p>

            {/* Hubs Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              {primeHubs.map((hub, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-[#FFFFFF] border border-neutral-200 shadow-sm hover:border-[#F59E0B] transition-all"
                >
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="text-xs font-bold text-[#1C1C1C] flex items-center gap-1.5">
                      <Navigation className="w-3.5 h-3.5 text-[#F59E0B]" />
                      {hub.name}
                    </h4>
                    <span className="text-[10px] font-bold text-[#1C1C1C] bg-[#F5F5F3] border border-neutral-200 px-2 py-0.5 rounded-md">
                      {hub.count}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#737373]">{hub.desc}</p>
                </div>
              ))}
            </div>

            <div className="pt-2 flex flex-wrap gap-3">
              <button
                onClick={() => navigateTo('request')}
                className="px-6 py-3 rounded-xl bg-[#F59E0B] hover:bg-[#D97706] text-[#1C1C1C] hover:text-white font-extrabold text-xs shadow-md transition-all flex items-center gap-2"
              >
                <span>Book Free Site Visit in Your Area</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Simulated Interactive Map Card */}
          <div className="lg:col-span-6">
            <div className="bg-[#1C1C1C] p-6 rounded-2xl border border-neutral-800 shadow-2xl relative overflow-hidden space-y-4">
              
              {/* Map Header */}
              <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#F59E0B] text-[#1C1C1C] flex items-center justify-center font-bold">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">AMK INFRA Headquarters</h4>
                    <p className="text-[10px] text-[#A8A8A2]">Opp. Collectorate Office, Subedari, Hanamkonda</p>
                  </div>
                </div>

                <a
                  href="https://maps.google.com/?q=Hanamkonda,Warangal,Telangana"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[11px] font-bold text-[#F59E0B] hover:underline"
                >
                  Open in Google Maps &rarr;
                </a>
              </div>

              {/* Visual Map Representation */}
              <div className="relative h-64 rounded-xl overflow-hidden bg-[#141414] border border-neutral-800 flex items-center justify-center p-4">
                <img
                  src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=1000&q=80"
                  alt="Hanamkonda Warangal Map Area"
                  className="absolute inset-0 w-full h-full object-cover opacity-35"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1C1C1C] via-[#1C1C1C]/60 to-transparent" />

                {/* Pulsing Pin for Subedari HQ */}
                <div className="relative z-10 flex flex-col items-center animate-bounce">
                  <div className="px-3 py-1.5 rounded-xl bg-[#F59E0B] text-[#1C1C1C] font-extrabold text-xs shadow-xl flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 fill-current" />
                    <span>AMK INFRA HQ - Hanamkonda</span>
                  </div>
                  <div className="w-3 h-3 bg-[#F59E0B] rotate-45 -mt-1.5 shadow-md" />
                  <div className="w-6 h-6 rounded-full bg-[#F59E0B]/30 animate-ping -mt-3" />
                </div>

                {/* Sub Pins */}
                <div className="absolute top-8 left-10 z-10 bg-[#141414]/90 text-[10px] font-bold text-[#A8A8A2] px-2 py-0.5 rounded border border-neutral-700">
                  📍 Kazipet Hub
                </div>
                <div className="absolute bottom-10 right-10 z-10 bg-[#141414]/90 text-[10px] font-bold text-[#A8A8A2] px-2 py-0.5 rounded border border-neutral-700">
                  📍 Hunter Road Site
                </div>
              </div>

              {/* Quick Contact info */}
              <div className="grid grid-cols-2 gap-3 text-xs pt-1">
                <div className="bg-[#242424] p-3 rounded-xl border border-neutral-800">
                  <span className="text-[10px] text-[#A8A8A2] block">Direct Founder Helpline</span>
                  <a href="tel:9032477292" className="font-extrabold text-white hover:text-[#F59E0B]">
                    +91 90324 77292
                  </a>
                </div>

                <div className="bg-[#242424] p-3 rounded-xl border border-neutral-800">
                  <span className="text-[10px] text-[#A8A8A2] block">Site Inspection Schedule</span>
                  <span className="font-bold text-[#F59E0B]">Mon - Sat, 8:30 AM - 8 PM</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Globe, Check } from 'lucide-react';

export function LanguageSelector({ variant = 'pills' }) {
  const { lang, changeLanguage } = useApp();

  const languages = [
    { code: 'en', label: 'English', native: 'English', flag: '🇬🇧' },
    { code: 'te', label: 'Telugu', native: 'తెలుగు', flag: '🇮🇳' },
    { code: 'hi', label: 'Hindi', native: 'हिन्दी', flag: '🇮🇳' }
  ];

  if (variant === 'mobile') {
    return (
      <div className="w-full bg-[#1C1C1C] border border-[#F59E0B]/40 p-3 rounded-2xl space-y-2 backdrop-blur-md">
        <div className="flex items-center gap-2 text-xs font-bold text-[#F59E0B]">
          <Globe className="w-4 h-4 text-[#F59E0B] animate-spin-slow" />
          <span>Select Language / భాషను ఎంచుకోండి / भाषा चुनें:</span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {languages.map(l => (
            <button
              key={l.code}
              onClick={() => changeLanguage(l.code)}
              className={`py-2 px-1 rounded-xl text-center transition-all ${
                lang === l.code
                  ? 'bg-[#F59E0B] text-[#1C1C1C] font-black shadow-md scale-105 border border-amber-300'
                  : 'bg-[#242424] text-neutral-200 hover:bg-[#2e2e2e] text-xs font-semibold border border-neutral-700'
              }`}
            >
              <span className="block text-xs font-bold">{l.native}</span>
              <span className="text-[10px] opacity-80 uppercase tracking-wider">{l.label}</span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // High-visibility 1-Click Selectable Pills for Topbar & Navbar
  return (
    <div className="inline-flex items-center bg-[#181818] border border-neutral-700 rounded-xl p-0.5 shadow-md">
      <div className="px-2 py-1 flex items-center gap-1 text-[11px] font-extrabold text-[#F59E0B] border-r border-neutral-700">
        <Globe className="w-3.5 h-3.5 text-[#F59E0B] animate-spin-slow" />
        <span className="hidden sm:inline">LANG:</span>
      </div>
      <div className="flex items-center gap-0.5 p-0.5">
        {languages.map(l => {
          const isActive = lang === l.code;
          return (
            <button
              key={l.code}
              onClick={() => changeLanguage(l.code)}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                isActive
                  ? 'bg-[#F59E0B] text-[#1C1C1C] shadow-sm font-black'
                  : 'text-neutral-300 hover:text-white hover:bg-[#242424]'
              }`}
              title={`Switch to ${l.label} (${l.native})`}
            >
              <span>{l.native}</span>
              {isActive && <Check className="w-3 h-3 stroke-[3]" />}
            </button>
          );
        })}
      </div>
    </div>
  );
}

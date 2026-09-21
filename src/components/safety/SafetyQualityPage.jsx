import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { api } from '../../api';
import {
  ShieldCheck,
  Award,
  CheckCircle2,
  HardHat,
  FlaskConical,
  Activity,
  Sparkles,
  Zap,
  Building2,
  FileCheck,
  Check,
  ChevronRight,
  Phone
} from 'lucide-react';

export function SafetyQualityPage() {
  const { navigateTo, openStaffIntranet } = useApp();
  const [qualityData, setQualityData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const res = await api.getSafetyQuality();
        if (res.success) {
          setQualityData(res.data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  return (
    <div className="py-14 bg-[#F5F5F3] text-[#4B4B4B] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header Hero */}
        <div className="relative rounded-3xl overflow-hidden bg-[#1C1C1C] border border-[#F59E0B]/40 p-8 sm:p-14 shadow-2xl">
          <div className="relative z-10 max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F59E0B]/15 text-[#F59E0B] text-xs font-extrabold border border-[#F59E0B]/30">
              <ShieldCheck className="w-4 h-4 text-[#F59E0B]" />
              <span>NABL TESTED • ISO 9001:2015 & ISO 45001:2018 AUDITED</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-black tracking-tight text-white leading-tight">
              Uncompromising Quality.{' '}
              <span className="text-[#F59E0B]">
                Zero Hazard Safety.
              </span>
            </h1>

            <p className="text-[#E8E8E5] text-sm sm:text-base leading-relaxed">
              Every foundation, column, and finish poured by AMK INFRA undergoes rigorous in-house NABL laboratory testing. Backed by an audited <strong>0.00 LTI (Zero Lost Time Injury)</strong> record over 1.28 Million safe man-hours.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <button
                onClick={() => navigateTo('request')}
                className="px-6 py-3.5 rounded-xl bg-[#F59E0B] hover:bg-[#D97706] text-[#1C1C1C] hover:text-white font-black text-xs sm:text-sm shadow-md transition-all"
              >
                Request Quality-Certified Construction &rarr;
              </button>
              <button
                onClick={openStaffIntranet}
                className="px-5 py-3.5 rounded-xl bg-[#242424] hover:bg-[#2E2E2E] text-white text-xs sm:text-sm font-bold border border-neutral-700 transition-colors"
              >
                Log Site Safety Toolbox Talk
              </button>
            </div>
          </div>
        </div>

        {/* Live Safety Milestones */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl bg-[#FFFFFF] border border-neutral-200/90 shadow-sm space-y-2">
            <span className="text-xs text-[#737373] block uppercase font-bold tracking-wider">Safe Man-Hours</span>
            <strong className="text-3xl font-display font-black text-emerald-700 block">
              {qualityData?.safeManHours || '1,280,000+'}
            </strong>
            <p className="text-[11px] text-[#737373]">Zero lost-time incidents recorded across 180+ sites</p>
          </div>

          <div className="p-6 rounded-2xl bg-[#FFFFFF] border border-neutral-200/90 shadow-sm space-y-2">
            <span className="text-xs text-[#737373] block uppercase font-bold tracking-wider">LTI Safety Rate</span>
            <strong className="text-3xl font-display font-black text-[#D97706] block">
              {qualityData?.lostTimeInjuryRate || '0.00 LTI'}
            </strong>
            <p className="text-[11px] text-[#737373]">100% Personal Protective Equipment (PPE) compliance</p>
          </div>

          <div className="p-6 rounded-2xl bg-[#FFFFFF] border border-neutral-200/90 shadow-sm space-y-2">
            <span className="text-xs text-[#737373] block uppercase font-bold tracking-wider">NABL Cube Test Pass Rate</span>
            <strong className="text-3xl font-display font-black text-blue-700 block">
              {qualityData?.qualityPassRate || '99.8%'}
            </strong>
            <p className="text-[11px] text-[#737373]">IS 516 certified 7-day & 28-day concrete strength</p>
          </div>

          <div className="p-6 rounded-2xl bg-[#FFFFFF] border border-neutral-200/90 shadow-sm space-y-2">
            <span className="text-xs text-[#737373] block uppercase font-bold tracking-wider">Site QA Audits</span>
            <strong className="text-3xl font-display font-black text-[#1C1C1C] block">
              100% Bi-Weekly
            </strong>
            <p className="text-[11px] text-[#737373]">Inspections led by MD & Chief Structural Engineer</p>
          </div>
        </div>

        {/* NABL Quality Testing Parameters */}
        <div className="p-8 rounded-3xl bg-[#E8E8E5] border border-neutral-300 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs text-emerald-700 font-bold uppercase tracking-wider block">
                In-House Materials Laboratory Testing
              </span>
              <h3 className="text-2xl font-bold text-[#1C1C1C] font-display">
                Concrete, Rebar & Moisture QA Inspection Matrix
              </h3>
            </div>
            <div className="px-3 py-1 rounded-full bg-[#FFFFFF] text-emerald-700 text-xs font-bold border border-neutral-300 shadow-sm">
              🔬 BIS National Standard Compliant
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {(qualityData?.testingParameters || []).map((param, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-[#FFFFFF] border border-neutral-200 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <strong className="text-[#1C1C1C] text-sm font-bold">{param.test}</strong>
                  <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 text-xs font-bold font-mono border border-emerald-200">
                    {param.result}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs text-[#737373] pt-1 border-t border-neutral-100">
                  <div>
                    <span className="text-[#737373] block text-[10px]">Standard Code:</span>
                    <span className="text-[#1C1C1C] font-semibold">{param.standard}</span>
                  </div>
                  <div>
                    <span className="text-[#737373] block text-[10px]">Target Criteria:</span>
                    <span className="text-[#D97706] font-semibold">{param.target}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 5-Step Quality Assurance Process */}
        <div className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs text-[#D97706] font-extrabold uppercase tracking-widest block">
              Engineering Governance
            </span>
            <h2 className="text-3xl font-bold text-[#1C1C1C] font-display">
              5-Tier Site QA & Safety Verification Pipeline
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 text-xs">
            <div className="p-5 rounded-2xl bg-[#FFFFFF] border border-neutral-200/90 shadow-sm space-y-2">
              <span className="w-7 h-7 rounded-full bg-[#F59E0B] text-[#1C1C1C] font-black flex items-center justify-center text-xs">1</span>
              <strong className="text-[#1C1C1C] block text-sm">Soil Bearing Test</strong>
              <p className="text-[#737373]">Plate load test & soil chemical analysis to determine exact footing depth.</p>
            </div>

            <div className="p-5 rounded-2xl bg-[#FFFFFF] border border-neutral-200/90 shadow-sm space-y-2">
              <span className="w-7 h-7 rounded-full bg-[#F59E0B] text-[#1C1C1C] font-black flex items-center justify-center text-xs">2</span>
              <strong className="text-[#1C1C1C] block text-sm">TMT Rebar Audit</strong>
              <p className="text-[#737373]">Direct factory mill test certificates verified for Fe-550D elongation & yield strength.</p>
            </div>

            <div className="p-5 rounded-2xl bg-[#FFFFFF] border border-neutral-200/90 shadow-sm space-y-2">
              <span className="w-7 h-7 rounded-full bg-[#F59E0B] text-[#1C1C1C] font-black flex items-center justify-center text-xs">3</span>
              <strong className="text-[#1C1C1C] block text-sm">Batching Slump Check</strong>
              <p className="text-[#737373]">Slump cone test performed on every ready-mix concrete transit mixer arrival.</p>
            </div>

            <div className="p-5 rounded-2xl bg-[#FFFFFF] border border-neutral-200/90 shadow-sm space-y-2">
              <span className="w-7 h-7 rounded-full bg-[#F59E0B] text-[#1C1C1C] font-black flex items-center justify-center text-xs">4</span>
              <strong className="text-[#1C1C1C] block text-sm">Cube Crushing Lab</strong>
              <p className="text-[#737373]">Specimen test cubes crushed at 7 & 28 days in calibrated compression machine.</p>
            </div>

            <div className="p-5 rounded-2xl bg-[#FFFFFF] border border-neutral-200/90 shadow-sm space-y-2">
              <span className="w-7 h-7 rounded-full bg-[#F59E0B] text-[#1C1C1C] font-black flex items-center justify-center text-xs">5</span>
              <strong className="text-[#1C1C1C] block text-sm">Digital Drone Audit</strong>
              <p className="text-[#737373]">4K drone elevation inspection and ultrasonic pulse velocity slab check.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

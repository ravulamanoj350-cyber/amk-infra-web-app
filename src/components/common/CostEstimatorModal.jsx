import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { api } from '../../api';
import {
  Calculator,
  X,
  Building2,
  Home,
  Hammer,
  Sparkles,
  PaintBucket,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  Info
} from 'lucide-react';

export function CostEstimatorModal({ isOpen, onClose }) {
  const { navigateTo } = useApp();

  const [category, setCategory] = useState('residential');
  const [builtUpArea, setBuiltUpArea] = useState(1800);
  const [floors, setFloors] = useState(1);
  const [packageType, setPackageType] = useState('premium');
  const [estimateData, setEstimateData] = useState(null);
  const [loading, setLoading] = useState(false);

  const categories = [
    { id: 'residential', label: 'Residential Home', icon: Home },
    { id: 'construction', label: 'Commercial Complex', icon: Building2 },
    { id: 'interior', label: 'Interior Design', icon: Sparkles },
    { id: 'renovation', label: 'Renovation', icon: Hammer },
    { id: 'painting', label: 'Painting Works', icon: PaintBucket }
  ];

  const packages = [
    { id: 'standard', name: 'Standard Quality', badge: 'Economical', desc: 'Quality Red Brick/AAC, Vitrified Tiles, Standard Fixtures' },
    { id: 'premium', name: 'Premium Grade', badge: 'Most Popular', desc: 'Fe-550 Steel, Teak Main Door, Jaguar Fittings, Concealed LED' },
    { id: 'luxury', name: 'Luxury Signature', badge: 'High End', desc: 'Italian Marble, Smart Home Automation, Designer Elevation, Kohler' }
  ];

  useEffect(() => {
    if (!isOpen) return;

    async function fetchEstimate() {
      setLoading(true);
      try {
        const res = await api.calculateEstimate({
          category,
          builtUpArea,
          floors: category === 'interior' || category === 'painting' ? 1 : floors,
          packageType
        });
        if (res.success) {
          setEstimateData(res.data);
        }
      } catch (err) {
        console.error('Estimate error', err);
      } finally {
        setLoading(false);
      }
    }

    fetchEstimate();
  }, [category, builtUpArea, floors, packageType, isOpen]);

  if (!isOpen) return null;

  const handleProceedToRequest = () => {
    onClose();
    navigateTo('request', {
      serviceId: category
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1C1C1C]/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-[#FFFFFF] border border-neutral-200 rounded-3xl shadow-2xl overflow-hidden text-[#4B4B4B] max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#1C1C1C] border-b border-neutral-800 text-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#F59E0B] text-[#1C1C1C] flex items-center justify-center font-bold">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white font-display">
                AMK Construction Cost Calculator
              </h3>
              <p className="text-xs text-[#E8E8E5]">
                Instant market estimation for Warangal & Hanamkonda projects
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-[#242424] text-neutral-300 hover:text-white hover:bg-[#2e2e2e] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* Step 1: Service Category */}
          <div>
            <label className="block text-xs font-bold text-[#D97706] uppercase tracking-wider mb-2">
              1. Choose Service Type
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {categories.map(cat => {
                const Icon = cat.icon;
                const isSelected = category === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setCategory(cat.id)}
                    className={`p-3 rounded-xl flex flex-col items-center gap-2 text-xs font-bold transition-all ${
                      isSelected
                        ? 'bg-[#F59E0B] text-[#1C1C1C] shadow-sm font-black'
                        : 'bg-[#F5F5F3] hover:bg-[#E8E8E5] text-[#4B4B4B] border border-neutral-200'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="text-center">{cat.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Area & Floor Slider */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-[#F5F5F3] p-4 rounded-2xl border border-neutral-200">
            <div>
              <div className="flex justify-between items-center mb-1 text-xs">
                <span className="font-semibold text-[#1C1C1C]">Built-Up Area</span>
                <span className="text-[#D97706] font-extrabold text-sm">{builtUpArea.toLocaleString('en-IN')} sq.ft</span>
              </div>
              <input
                type="range"
                min="400"
                max="8000"
                step="50"
                value={builtUpArea}
                onChange={e => setBuiltUpArea(Number(e.target.value))}
                className="w-full h-2 bg-neutral-300 rounded-lg appearance-none cursor-pointer accent-[#F59E0B]"
              />
              <div className="flex justify-between text-[10px] text-[#737373] mt-1">
                <span>400 sq.ft</span>
                <span>4,000 sq.ft</span>
                <span>8,000 sq.ft</span>
              </div>
            </div>

            {category !== 'interior' && category !== 'painting' && (
              <div>
                <div className="flex justify-between items-center mb-1 text-xs">
                  <span className="font-semibold text-[#1C1C1C]">Number of Floors</span>
                  <span className="text-[#D97706] font-extrabold text-sm">
                    {floors === 1 ? 'Ground Floor (G)' : floors === 2 ? 'G + 1 (Duplex)' : floors === 3 ? 'G + 2 (Triplex)' : `G + ${floors - 1}`}
                  </span>
                </div>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map(f => (
                    <button
                      key={f}
                      onClick={() => setFloors(f)}
                      className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                        floors === f
                          ? 'bg-[#F59E0B] text-[#1C1C1C]'
                          : 'bg-[#FFFFFF] text-[#4B4B4B] hover:text-[#1C1C1C] border border-neutral-200'
                      }`}
                    >
                      {f === 1 ? 'G' : `G+${f - 1}`}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Step 3: Package Tiers */}
          <div>
            <label className="block text-xs font-bold text-[#D97706] uppercase tracking-wider mb-2">
              2. Select Construction & Finishing Package
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {packages.map(pkg => {
                const isSelected = packageType === pkg.id;
                return (
                  <div
                    key={pkg.id}
                    onClick={() => setPackageType(pkg.id)}
                    className={`cursor-pointer p-4 rounded-2xl border transition-all relative ${
                      isSelected
                        ? 'border-[#F59E0B] bg-[#F59E0B]/10 shadow-sm'
                        : 'border-neutral-200 bg-[#FFFFFF] hover:bg-[#F5F5F3]'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <span className="text-xs font-bold text-[#1C1C1C]">{pkg.name}</span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#E8E8E5] text-[#D97706]">
                        {pkg.badge}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#737373] mt-1">{pkg.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Live Estimate Card */}
          {estimateData && (
            <div className="bg-[#1C1C1C] p-5 rounded-2xl border border-[#F59E0B]/40 shadow-xl text-white">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-neutral-700">
                <div>
                  <span className="text-xs text-neutral-400 uppercase font-semibold tracking-wider">Estimated Project Budget</span>
                  <div className="text-3xl font-extrabold text-[#F59E0B] font-display">
                    {estimateData.totalEstimateFormatted}
                  </div>
                  <span className="text-xs text-[#E8E8E5]">
                    Rate: <strong className="text-white">{estimateData.ratePerSqFt}</strong> | Total Built-up: <strong className="text-white">{(builtUpArea * (category === 'interior' || category === 'painting' ? 1 : floors)).toLocaleString('en-IN')} sq.ft</strong>
                  </span>
                </div>

                <button
                  onClick={handleProceedToRequest}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#F59E0B] hover:bg-[#D97706] text-[#1C1C1C] hover:text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 transition-all"
                >
                  <span>Book with this Estimate</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Cost Breakdown */}
              {estimateData.breakdown && (
                <div className="pt-4 space-y-2">
                  <span className="text-xs font-bold text-neutral-200">Itemized Cost Breakdown:</span>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                    {Object.entries(estimateData.breakdown).map(([key, val]) => (
                      <div key={key} className="bg-[#242424] p-2.5 rounded-lg border border-neutral-700">
                        <span className="text-[11px] text-neutral-400 block capitalize">
                          {key.replace(/([A-Z])/g, ' $1')}
                        </span>
                        <span className="text-white font-bold">
                          ₹{Number(val).toLocaleString('en-IN')}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <p className="text-[10px] text-neutral-400 mt-4 flex items-center gap-1">
                <Info className="w-3.5 h-3.5 text-[#F59E0B] flex-shrink-0" />
                <span>Rates are indicative for Hanamkonda & Warangal. A detailed itemized BOQ is provided following site survey by A. Charan Patel.</span>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { api } from '../../api';
import {
  Search,
  CheckCircle2,
  Clock,
  Phone,
  MessageSquare,
  Building2,
  ShieldCheck,
  User,
  MapPin,
  Calendar,
  IndianRupee,
  FileText,
  AlertCircle,
  ArrowRight,
  RefreshCw,
  Layers,
  Smartphone
} from 'lucide-react';

const STATUS_STAGES = [
  { id: 'Received', label: '1. Received', desc: 'Inquiry registered on portal' },
  { id: 'Contacted', label: '2. Contacted', desc: 'Site survey & phone consultation' },
  { id: 'Quoted', label: '3. Quoted', desc: 'Itemized BOQ & pricing prepared' },
  { id: 'In Progress', label: '4. In Progress', desc: 'Active construction & finishing' },
  { id: 'Completed', label: '5. Completed', desc: 'Quality audit passed & handover' }
];

export function TrackStatusPage() {
  const { searchTrackingCode, setSearchTrackingCode, showToast, navigateTo, setMobileMode } = useApp();
  const [inputCode, setInputCode] = useState(searchTrackingCode || 'AMK-2026-1042');
  const [inquiry, setInquiry] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    if (searchTrackingCode) {
      setInputCode(searchTrackingCode);
      handleTrack(searchTrackingCode);
    } else {
      handleTrack('AMK-2026-1042');
    }
  }, [searchTrackingCode]);

  const handleTrack = async (codeToSearch) => {
    const query = (codeToSearch || inputCode).trim();
    if (!query) return;

    setLoading(true);
    setSearched(true);
    try {
      const res = await api.getInquiryById(query);
      if (res.success) {
        setInquiry(res.data);
      } else {
        setInquiry(null);
      }
    } catch (err) {
      console.error('Tracking query error', err);
      setInquiry(null);
    } finally {
      setLoading(false);
    }
  };

  const getStageIndex = (status) => {
    const map = {
      'Received': 0,
      'Contacted': 1,
      'Quoted': 2,
      'In Progress': 3,
      'Completed': 4
    };
    return map[status] !== undefined ? map[status] : 0;
  };

  const currentStageIndex = inquiry ? getStageIndex(inquiry.status) : 0;

  return (
    <div className="py-16 bg-[#F5F5F3] text-[#4B4B4B] min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center space-y-3 mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white text-[#D97706] text-xs font-bold border border-[#F59E0B]/30 shadow-sm">
            <Clock className="w-3.5 h-3.5 text-[#F59E0B]" />
            <span>Real-Time Milestone Tracking</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black text-[#1C1C1C]">
            Track Your Service Inquiry &{' '}
            <span className="text-[#D97706]">
              Site Progress
            </span>
          </h1>
          <p className="text-[#4B4B4B] text-xs sm:text-sm max-w-xl mx-auto">
            Enter your AMK tracking code (e.g. <strong className="text-[#1C1C1C]">AMK-2026-1042</strong>) to view the 5-stage milestone timeline, assigned corporate division, and quotation updates.
          </p>
        </div>

        {/* Search Bar */}
        <div className="bg-[#FFFFFF] p-4 sm:p-6 rounded-2xl border border-neutral-200/90 shadow-md mb-8">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleTrack();
            }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <div className="relative flex-1">
              <Search className="absolute left-4 top-3.5 w-4 h-4 text-neutral-400" />
              <input
                type="text"
                placeholder="Enter Tracking ID (e.g. AMK-2026-1042, AMK-2026-1088)..."
                value={inputCode}
                onChange={e => setInputCode(e.target.value)}
                className="w-full bg-[#F5F5F3] border border-neutral-300 focus:border-[#F59E0B] rounded-xl pl-11 pr-4 py-3 text-xs sm:text-sm text-[#1C1C1C] font-mono outline-none uppercase"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="px-8 py-3 rounded-xl bg-[#F59E0B] hover:bg-[#D97706] text-[#1C1C1C] hover:text-white font-extrabold text-xs sm:text-sm shadow-md flex items-center justify-center gap-2 transition-all"
            >
              {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
              <span>{loading ? 'Searching...' : 'Track Request'}</span>
            </button>
          </form>

          {/* Sample quick pills */}
          <div className="mt-3 flex flex-wrap items-center gap-2 text-[11px] text-[#737373]">
            <span>Try sample tracking IDs:</span>
            {['AMK-2026-1042', 'AMK-2026-1088', 'AMK-2026-1120', 'AMK-2026-1155', 'AMK-2026-1199'].map(code => (
              <button
                key={code}
                type="button"
                onClick={() => {
                  setInputCode(code);
                  handleTrack(code);
                }}
                className="px-2.5 py-0.5 rounded-lg bg-[#F5F5F3] hover:bg-[#E8E8E5] text-[#D97706] font-mono font-bold border border-neutral-200"
              >
                {code}
              </button>
            ))}
          </div>
        </div>

        {/* Result Card */}
        {inquiry ? (
          <div className="bg-[#FFFFFF] border border-neutral-200/90 rounded-2xl p-6 sm:p-8 shadow-xl space-y-8 animate-in fade-in duration-300">
            
            {/* Top Bar with Tracking ID and Status Pill */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-neutral-100">
              <div>
                <span className="text-[10px] text-[#737373] uppercase font-bold tracking-wider block">
                  Inquiry Reference
                </span>
                <h2 className="text-2xl font-mono font-black text-[#1C1C1C] flex flex-wrap items-center gap-2">
                  <span>{inquiry.id}</span>
                  <span className="text-xs font-sans px-2.5 py-0.5 rounded-md bg-[#F59E0B]/15 text-[#D97706] font-bold border border-[#F59E0B]/30">
                    {inquiry.serviceTitle}
                  </span>
                  {inquiry.divisionName && (
                    <span className="text-xs font-sans px-2.5 py-0.5 rounded-md bg-neutral-100 text-[#1C1C1C] font-bold border border-neutral-300">
                      {inquiry.divisionName}
                    </span>
                  )}
                </h2>
              </div>

              <div className="text-right self-start sm:self-auto">
                <span className="text-[10px] text-[#737373] block font-semibold">Current State</span>
                <span className={`inline-block px-3.5 py-1 rounded-md text-xs font-black uppercase tracking-wider ${
                  inquiry.status === 'Completed'
                    ? 'bg-emerald-600 text-white'
                    : inquiry.status === 'In Progress'
                    ? 'bg-[#1C1C1C] text-[#F59E0B] border border-[#F59E0B]'
                    : inquiry.status === 'Quoted'
                    ? 'bg-[#F59E0B] text-[#1C1C1C] font-bold'
                    : 'bg-[#F5F5F3] text-[#1C1C1C] border border-neutral-300'
                }`}>
                  ● {inquiry.status}
                </span>
              </div>
            </div>

            {/* 5-Stage Visual Progress Timeline */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-[#1C1C1C] uppercase tracking-wider">
                5-Stage Milestone Progress Tracker
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 relative">
                {STATUS_STAGES.map((stage, idx) => {
                  const isDone = idx <= currentStageIndex;
                  const isCurrent = idx === currentStageIndex;

                  return (
                    <div
                      key={stage.id}
                      className={`p-3.5 rounded-xl border transition-all text-left relative ${
                        isCurrent
                          ? 'bg-[#F59E0B]/10 border-[#F59E0B] shadow-sm'
                          : isDone
                          ? 'bg-[#F5F5F3] border-neutral-300 text-[#1C1C1C]'
                          : 'bg-neutral-50 border-neutral-200 text-[#737373]'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                          isDone ? 'bg-[#F59E0B] text-[#1C1C1C] font-black' : 'bg-neutral-200 text-[#737373]'
                        }`}>
                          0{idx + 1}
                        </span>
                        {isDone && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                      </div>
                      <h4 className={`text-xs font-bold ${isCurrent ? 'text-[#D97706]' : isDone ? 'text-[#1C1C1C]' : 'text-[#737373]'}`}>
                        {stage.id}
                      </h4>
                      <p className="text-[10px] text-[#737373] leading-tight mt-0.5">
                        {stage.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Project Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-[#F5F5F3] p-5 rounded-xl border border-neutral-200 text-xs">
              <div className="space-y-2.5">
                <div className="flex justify-between py-1 border-b border-neutral-200">
                  <span className="text-[#737373]">Customer Name:</span>
                  <strong className="text-[#1C1C1C]">{inquiry.customerName}</strong>
                </div>
                <div className="flex justify-between py-1 border-b border-neutral-200">
                  <span className="text-[#737373]">Assigned Division:</span>
                  <strong className="text-[#D97706]">{inquiry.divisionName || 'Civil & Commercial'}</strong>
                </div>
                <div className="flex justify-between py-1 border-b border-neutral-200">
                  <span className="text-[#737373]">Project Type:</span>
                  <strong className="text-[#1C1C1C]">{inquiry.projectType}</strong>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-[#737373]">Site Location:</span>
                  <strong className="text-[#1C1C1C]">{inquiry.location}</strong>
                </div>
              </div>

              <div className="space-y-2.5">
                <div className="flex justify-between py-1 border-b border-neutral-200">
                  <span className="text-[#737373]">Assigned Lead Engineer:</span>
                  <strong className="text-[#D97706]">{inquiry.assignedEngineer || 'A. Charan Patel'}</strong>
                </div>
                <div className="flex justify-between py-1 border-b border-neutral-200">
                  <span className="text-[#737373]">Quoted Estimate:</span>
                  <strong className="text-emerald-700 font-mono text-sm">{inquiry.estimatedQuote || 'Under Assessment'}</strong>
                </div>
                <div className="flex justify-between py-1 border-b border-neutral-200">
                  <span className="text-[#737373]">Submitted Date:</span>
                  <strong className="text-[#1C1C1C]">{new Date(inquiry.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</strong>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-[#737373]">Target Timeline:</span>
                  <strong className="text-[#1C1C1C]">{inquiry.timeline}</strong>
                </div>
              </div>
            </div>

            {/* Latest Status Note */}
            <div className="p-4 rounded-xl bg-[#F59E0B]/10 border border-[#F59E0B]/30 space-y-1">
              <span className="text-[10px] text-[#D97706] font-bold uppercase tracking-wider block">
                Latest Engineering Note from Site Team
              </span>
              <p className="text-xs sm:text-sm text-[#1C1C1C] leading-relaxed">
                "{inquiry.statusNote}"
              </p>
            </div>

            {/* Milestone History Logs */}
            {inquiry.history && inquiry.history.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-xs font-bold text-[#1C1C1C] uppercase tracking-wider">
                  Milestone Update History
                </h3>
                <div className="space-y-2">
                  {inquiry.history.map((h, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-[#FFFFFF] border border-neutral-200 text-xs shadow-sm">
                      <div className="w-6 h-6 rounded-full bg-[#F5F5F3] text-[#D97706] border border-neutral-200 flex items-center justify-center font-bold text-[10px] flex-shrink-0 mt-0.5">
                        {i + 1}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-0.5">
                          <strong className="text-[#1C1C1C] font-semibold">{h.status}</strong>
                          <span className="text-[10px] text-[#737373]">
                            {new Date(h.time).toLocaleString('en-IN', { dateStyle: 'short', timeStyle: 'short' })}
                          </span>
                        </div>
                        <p className="text-[#4B4B4B] text-[11px]">{h.note}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Engineer Contact & Actions Bar */}
            <div className="p-5 bg-[#1C1C1C] text-white rounded-2xl border border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#F59E0B] text-[#1C1C1C] flex items-center justify-center font-black text-lg">
                  CP
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Need to Discuss This Request?</h4>
                  <p className="text-[11px] text-[#A8A8A2]">Directly connect with Managing Director A. Charan Patel</p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                <a
                  href={`https://wa.me/919032477292?text=Hello%20AMK%20INFRA%2C%20regarding%20inquiry%20${inquiry.id}%20(${inquiry.customerName})`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>

                <a
                  href="tel:9032477292"
                  className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-[#242424] hover:bg-[#2e2e2e] text-white font-bold text-xs border border-neutral-700 flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-[#F59E0B]" />
                  <span>Call 9032477292</span>
                </a>

                <button
                  onClick={() => setMobileMode(true)}
                  className="flex-1 sm:flex-none px-3 py-2.5 rounded-xl bg-[#242424] text-[#F59E0B] hover:text-white text-xs font-bold border border-neutral-700 flex items-center justify-center gap-1"
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>Mobile View</span>
                </button>
              </div>
            </div>

          </div>
        ) : searched ? (
          <div className="bg-[#FFFFFF] border border-neutral-200 rounded-2xl p-10 text-center space-y-4 shadow-sm">
            <AlertCircle className="w-12 h-12 text-[#F59E0B] mx-auto" />
            <h3 className="text-xl font-bold text-[#1C1C1C]">No Inquiry Found for "{inputCode}"</h3>
            <p className="text-xs text-[#737373] max-w-md mx-auto">
              Please check the tracking ID entered or submit a new service request to generate an official tracking code.
            </p>
            <button
              onClick={() => navigateTo('request')}
              className="px-6 py-3 rounded-xl bg-[#F59E0B] text-[#1C1C1C] hover:bg-[#D97706] hover:text-white font-bold text-xs shadow-md transition-all"
            >
              Start New Service Request &rarr;
            </button>
          </div>
        ) : null}

      </div>
    </div>
  );
}

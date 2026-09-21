import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { api } from '../../api';
import {
  X,
  HardHat,
  ClipboardList,
  CheckCircle2,
  Calendar,
  Users,
  Wrench,
  AlertCircle,
  Send,
  Loader2,
  ShieldCheck,
  Building,
  Sparkles,
  ChevronRight
} from 'lucide-react';

export function StaffIntranetModal() {
  const {
    staffIntranetModalOpen,
    closeStaffIntranet,
    divisions,
    showToast
  } = useApp();

  const [dprLogs, setDprLogs] = useState([]);
  const [activeTab, setActiveTab] = useState('new-dpr'); // 'new-dpr' | 'recent-logs'
  const [submitting, setSubmitting] = useState(false);

  const [dprForm, setDprForm] = useState({
    siteCode: 'AMK-SITE-COMM-02',
    siteName: 'Kazipet Commercial Shopping Tower',
    divisionId: 'civil-commercial',
    supervisorName: 'Er. Sandeep Goud',
    weather: 'Clear / 31°C',
    workforceCount: 35,
    machineryRunning: 'Transit Mixer, Concrete Boom Pump, 3 Vibrators',
    activitiesCompleted: '',
    safetyToolboxTopic: 'Working at Heights: Full-body harness tie-off verification.',
    incidentReported: 'None. Zero hazard logged.'
  });

  useEffect(() => {
    if (staffIntranetModalOpen) {
      loadLogs();
    }
  }, [staffIntranetModalOpen]);

  async function loadLogs() {
    try {
      const res = await api.getStaffDprLogs();
      if (res.success) {
        setDprLogs(res.data);
      }
    } catch (err) {
      console.error(err);
    }
  }

  if (!staffIntranetModalOpen) return null;

  const handleChange = (e) => {
    setDprForm({ ...dprForm, [e.target.name]: e.target.value });
  };

  const handleSubmitDpr = async (e) => {
    e.preventDefault();
    if (!dprForm.siteName || !dprForm.supervisorName || !dprForm.activitiesCompleted) {
      showToast('Incomplete DPR', 'Please enter Site Name, Supervisor Name, and Activities Completed.', 'info');
      return;
    }

    setSubmitting(true);
    try {
      const res = await api.submitStaffDpr(dprForm);
      if (res.success) {
        showToast('DPR Logged!', `DPR Ref: ${res.data.id} filed for ${res.data.siteName}`, 'success');
        setDprForm({
          ...dprForm,
          activitiesCompleted: ''
        });
        loadLogs();
        setActiveTab('recent-logs');
      } else {
        showToast('Error', res.message || 'Failed to submit DPR.', 'error');
      }
    } catch (err) {
      console.error(err);
      showToast('Network Error', 'Could not sync DPR with server.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#1C1C1C]/75 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-[#FFFFFF] rounded-3xl border border-neutral-200 shadow-2xl overflow-hidden my-8 text-[#4B4B4B]">
        
        {/* Header Ribbon */}
        <div className="bg-[#1C1C1C] px-6 py-5 border-b border-neutral-800 flex items-center justify-between text-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#F59E0B] text-[#1C1C1C] flex items-center justify-center font-black shadow-sm">
              <HardHat className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <span className="text-[10px] text-[#F59E0B] font-extrabold uppercase tracking-widest block">
                AMK Field Operations Desk
              </span>
              <h3 className="text-lg font-bold text-white font-display">
                Staff & Site Engineers Intranet Portal
              </h3>
            </div>
          </div>

          <button
            onClick={closeStaffIntranet}
            className="p-2 rounded-xl bg-[#242424] hover:bg-[#2e2e2e] text-neutral-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Controls */}
        <div className="px-6 pt-4 border-b border-neutral-200 flex gap-4 bg-[#F5F5F3]">
          <button
            onClick={() => setActiveTab('new-dpr')}
            className={`pb-3 text-xs font-bold border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'new-dpr'
                ? 'text-[#D97706] border-[#F59E0B]'
                : 'text-[#737373] border-transparent hover:text-[#1C1C1C]'
            }`}
          >
            <ClipboardList className="w-4 h-4" />
            <span>File Daily Progress Report (DPR)</span>
          </button>

          <button
            onClick={() => setActiveTab('recent-logs')}
            className={`pb-3 text-xs font-bold border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'recent-logs'
                ? 'text-[#D97706] border-[#F59E0B]'
                : 'text-[#737373] border-transparent hover:text-[#1C1C1C]'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Recent Site DPR Logs ({dprLogs.length})</span>
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 max-h-[70vh] overflow-y-auto space-y-6">
          {activeTab === 'new-dpr' ? (
            <form onSubmit={handleSubmitDpr} className="space-y-4">
              
              <div className="p-3.5 rounded-2xl bg-[#F59E0B]/10 border border-[#F59E0B]/30 flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-[#D97706] flex-shrink-0 mt-0.5" />
                <div className="text-xs text-[#4B4B4B]">
                  <strong className="text-[#1C1C1C]">Daily Mandatory Site Log:</strong>{' '}
                  All site engineers must submit daily concrete pour volume, workforce attendance, machinery runtime, and HSE toolbox talk compliance before 7:00 PM.
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#1C1C1C] mb-1">
                    Site / Project Name *
                  </label>
                  <input
                    type="text"
                    name="siteName"
                    required
                    placeholder="e.g., Ramnagar 4BHK Villa / Kazipet Tower"
                    value={dprForm.siteName}
                    onChange={handleChange}
                    className="w-full bg-[#F5F5F3] border border-neutral-300 rounded-xl px-3 py-2 text-xs text-[#1C1C1C] placeholder:text-[#737373] focus:outline-none focus:border-[#F59E0B]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1C1C1C] mb-1">
                    Supervisor / Field Engineer Name *
                  </label>
                  <input
                    type="text"
                    name="supervisorName"
                    required
                    placeholder="e.g., Er. Sandeep Goud"
                    value={dprForm.supervisorName}
                    onChange={handleChange}
                    className="w-full bg-[#F5F5F3] border border-neutral-300 rounded-xl px-3 py-2 text-xs text-[#1C1C1C] placeholder:text-[#737373] focus:outline-none focus:border-[#F59E0B]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1C1C1C] mb-1">
                    Corporate Division
                  </label>
                  <select
                    name="divisionId"
                    value={dprForm.divisionId}
                    onChange={handleChange}
                    className="w-full bg-[#F5F5F3] border border-neutral-300 rounded-xl px-3 py-2 text-xs text-[#1C1C1C] focus:outline-none focus:border-[#F59E0B]"
                  >
                    {(divisions || []).map(d => (
                      <option key={d.id} value={d.id}>
                        {d.shortName || d.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1C1C1C] mb-1">
                    Workforce Count on Site Today
                  </label>
                  <input
                    type="number"
                    name="workforceCount"
                    value={dprForm.workforceCount}
                    onChange={handleChange}
                    className="w-full bg-[#F5F5F3] border border-neutral-300 rounded-xl px-3 py-2 text-xs text-[#1C1C1C] placeholder:text-[#737373] focus:outline-none focus:border-[#F59E0B]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1C1C1C] mb-1">
                    Weather Condition
                  </label>
                  <input
                    type="text"
                    name="weather"
                    placeholder="e.g., Clear / 32°C"
                    value={dprForm.weather}
                    onChange={handleChange}
                    className="w-full bg-[#F5F5F3] border border-neutral-300 rounded-xl px-3 py-2 text-xs text-[#1C1C1C] placeholder:text-[#737373] focus:outline-none focus:border-[#F59E0B]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1C1C1C] mb-1">
                    Active Plant & Machinery
                  </label>
                  <input
                    type="text"
                    name="machineryRunning"
                    placeholder="e.g., 2 Mixers, 1 Compactor, Laser Leveler"
                    value={dprForm.machineryRunning}
                    onChange={handleChange}
                    className="w-full bg-[#F5F5F3] border border-neutral-300 rounded-xl px-3 py-2 text-xs text-[#1C1C1C] placeholder:text-[#737373] focus:outline-none focus:border-[#F59E0B]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1C1C1C] mb-1">
                  Activities Executed & Milestones Reached *
                </label>
                <textarea
                  rows="3"
                  name="activitiesCompleted"
                  required
                  placeholder="e.g., Completed 110 cu.m M30 grade concrete slab pour. Slump tested at 115mm. Bar bending and column plumb checked with laser..."
                  value={dprForm.activitiesCompleted}
                  onChange={handleChange}
                  className="w-full bg-[#F5F5F3] border border-neutral-300 rounded-xl p-3 text-xs text-[#1C1C1C] placeholder:text-[#737373] focus:outline-none focus:border-[#F59E0B]"
                ></textarea>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#1C1C1C] mb-1">
                    Safety Toolbox Talk Topic
                  </label>
                  <input
                    type="text"
                    name="safetyToolboxTopic"
                    value={dprForm.safetyToolboxTopic}
                    onChange={handleChange}
                    className="w-full bg-[#F5F5F3] border border-neutral-300 rounded-xl px-3 py-2 text-xs text-[#1C1C1C] focus:outline-none focus:border-[#F59E0B]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1C1C1C] mb-1">
                    Incidents / Hazard Observations
                  </label>
                  <input
                    type="text"
                    name="incidentReported"
                    value={dprForm.incidentReported}
                    onChange={handleChange}
                    className="w-full bg-[#F5F5F3] border border-neutral-300 rounded-xl px-3 py-2 text-xs text-[#1C1C1C] focus:outline-none focus:border-[#F59E0B]"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-neutral-200 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs text-[#737373]">
                  <ShieldCheck className="w-4 h-4 text-emerald-700" />
                  <span>Verified by AMK Central Engineering Control</span>
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={closeStaffIntranet}
                    className="px-4 py-2 rounded-xl bg-[#F5F5F3] hover:bg-[#E8E8E5] text-[#1C1C1C] text-xs font-semibold border border-neutral-200"
                  >
                    Close
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-6 py-2 rounded-xl bg-[#F59E0B] hover:bg-[#D97706] text-[#1C1C1C] hover:text-white text-xs font-extrabold flex items-center gap-2 shadow-sm disabled:opacity-50"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Filing DPR...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 stroke-[2.5]" />
                        <span>Submit Site DPR</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

            </form>
          ) : (
            <div className="space-y-4">
              {dprLogs.length === 0 ? (
                <div className="text-center py-12 text-[#737373] text-xs">
                  No DPR logs recorded yet.
                </div>
              ) : (
                dprLogs.map(log => (
                  <div
                    key={log.id}
                    className="p-5 rounded-2xl bg-[#FFFFFF] border border-neutral-200 shadow-sm space-y-3"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-neutral-100 pb-2.5">
                      <div>
                        <span className="text-[10px] text-[#D97706] font-mono font-bold block">{log.id}</span>
                        <strong className="text-sm text-[#1C1C1C] font-display">{log.siteName}</strong>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-[#737373]">{log.date}</span>
                        <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200">
                          {log.status || 'Verified'}
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-[#4B4B4B] leading-relaxed">
                      {log.activitiesCompleted}
                    </p>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-2 border-t border-neutral-100 text-[11px] text-[#737373]">
                      <div>
                        <span className="text-[#737373] block">Lead Engineer:</span>
                        <span className="text-[#1C1C1C] font-medium">{log.supervisorName}</span>
                      </div>
                      <div>
                        <span className="text-[#737373] block">Workforce On-Site:</span>
                        <span className="text-[#D97706] font-bold">{log.workforceCount} Personnel</span>
                      </div>
                      <div>
                        <span className="text-[#737373] block">Safety Talk:</span>
                        <span className="text-emerald-700 font-medium truncate block">{log.safetyToolboxTopic}</span>
                      </div>
                    </div>

                  </div>
                ))
              )}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

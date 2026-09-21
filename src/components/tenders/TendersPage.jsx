import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { api } from '../../api';
import {
  FileText,
  Award,
  ShieldCheck,
  Building2,
  CheckCircle2,
  Download,
  UploadCloud,
  Send,
  Loader2,
  DollarSign,
  Phone,
  MessageSquare,
  Truck,
  Wrench,
  Layers,
  Sparkles,
  ChevronRight
} from 'lucide-react';

export function TendersPage() {
  const { showToast, navigateTo } = useApp();
  const [tenderData, setTenderData] = useState(null);
  const [loading, setLoading] = useState(true);

  const [rfpForm, setRfpForm] = useState({
    organizationName: '',
    contactPerson: '',
    officialEmail: '',
    officialPhone: '',
    tenderType: 'Commercial Complex / High-Rise Civil (G+5)',
    projectScope: '',
    estimatedBoqValue: '₹1 Crore - ₹5 Crore',
    submissionDeadline: 'Within 30 Days',
    rfpDocumentLink: '',
    notes: ''
  });

  const [submitting, setSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(null);

  useEffect(() => {
    async function loadPreQual() {
      try {
        const res = await api.getTendersPreQual();
        if (res.success) {
          setTenderData(res.data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadPreQual();
  }, []);

  const handleFormChange = (e) => {
    setRfpForm({ ...rfpForm, [e.target.name]: e.target.value });
  };

  const handleRfpSubmit = async (e) => {
    e.preventDefault();
    if (!rfpForm.organizationName || !rfpForm.officialPhone || !rfpForm.projectScope) {
      showToast('Incomplete RFP', 'Please provide Organization Name, Phone, and Project Scope.', 'info');
      return;
    }

    setSubmitting(true);
    try {
      const res = await api.submitTenderRfp(rfpForm);
      if (res.success) {
        setSubmissionSuccess(res.data);
        showToast('RFP Submitted!', `Tender Reference: ${res.data.id}`, 'success');
      } else {
        showToast('Error', res.message || 'Submission failed.', 'error');
      }
    } catch (err) {
      console.error(err);
      showToast('Network Error', 'Could not transmit RFP proposal.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="py-14 bg-[#F5F5F3] text-[#4B4B4B] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header Hero */}
        <div className="relative rounded-3xl overflow-hidden bg-[#1C1C1C] border border-[#F59E0B]/40 p-8 sm:p-14 shadow-2xl">
          <div className="relative z-10 max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F59E0B]/15 text-[#F59E0B] text-xs font-extrabold border border-[#F59E0B]/30">
              <Award className="w-4 h-4 text-[#F59E0B]" />
              <span>GOVERNMENT & ENTERPRISE PROCUREMENT DESK</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-black tracking-tight text-white leading-tight">
              Class-I Licensed.{' '}
              <span className="text-[#F59E0B]">
                Turnkey Tender Execution.
              </span>
            </h1>

            <p className="text-[#E8E8E5] text-sm sm:text-base leading-relaxed">
              Empaneled with Telangana Public Works Department (PWD), GWMC, and institutional developers. We provide itemized BOQ bidding, computerized laser surveying, ₹25 Cr bank solvency, and ISO 9001/45001 accredited quality assurance.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href="#rfp-submission-form"
                className="px-6 py-3.5 rounded-xl bg-[#F59E0B] hover:bg-[#D97706] text-[#1C1C1C] hover:text-white font-black text-xs sm:text-sm flex items-center gap-2 shadow-md transition-all"
              >
                <FileText className="w-4 h-4 stroke-[2.5]" />
                <span>Submit RFP / Tender Proposal &rarr;</span>
              </a>

              <a
                href="tel:9032477292"
                className="px-5 py-3.5 rounded-xl bg-[#242424] hover:bg-[#2E2E2E] text-white text-xs sm:text-sm font-bold border border-neutral-700 flex items-center gap-2 transition-colors"
              >
                <Phone className="w-4 h-4 text-[#F59E0B]" />
                <span>MD Tender Hotline: 9032477292</span>
              </a>
            </div>
          </div>
        </div>

        {/* Pre-Qualification Credentials Grid */}
        <div className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs text-[#D97706] font-extrabold uppercase tracking-widest block">
              Audited Enterprise Credentials
            </span>
            <h2 className="text-3xl font-bold text-[#1C1C1C] font-display">
              Corporate Pre-Qualification Dossier
            </h2>
            <p className="text-xs text-[#737373]">
              Verified legal registrations, bank financial bonding, and accredited quality certifications for government tender bidding.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="p-6 rounded-2xl bg-[#FFFFFF] border border-neutral-200/90 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#F59E0B]/15 text-[#D97706] flex items-center justify-center font-bold">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-[#1C1C1C] text-base">Class-I Contractor License</h3>
              <p className="text-xs text-[#737373] leading-relaxed">
                Registered with Government of Telangana Roads & Buildings / Municipal Department under Registration No: <strong className="text-[#1C1C1C] font-mono">TS-PWD-CL1-2018-8842</strong>.
              </p>
              <div className="p-3 rounded-xl bg-[#F5F5F3] border border-neutral-200 text-[11px] text-[#4B4B4B] space-y-1">
                <div>GSTIN: <span className="text-[#D97706] font-mono font-bold">36AAKFA9842C1Z5</span></div>
                <div>PAN: <span className="text-[#D97706] font-mono font-bold">AAKFA9842C</span></div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#FFFFFF] border border-neutral-200/90 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
                <DollarSign className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-[#1C1C1C] text-base">₹25 Crore Bank Solvency</h3>
              <p className="text-xs text-[#737373] leading-relaxed">
                Certified bank guarantee and liquidity solvency certificate from State Bank of India Consortium for multi-crore EPC and turn-key infrastructure contracts.
              </p>
              <div className="p-3 rounded-xl bg-[#F5F5F3] border border-neutral-200 text-[11px] text-[#4B4B4B] space-y-1">
                <div>EPF & ESIC: <span className="text-emerald-700 font-bold">100% Compliant (450+ Crew)</span></div>
                <div>Credit Rating: <span className="text-emerald-700 font-bold">CRISIL MSE-1 High</span></div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#FFFFFF] border border-neutral-200/90 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-[#1C1C1C] text-base">ISO 9001 / 45001 / 14001</h3>
              <p className="text-xs text-[#737373] leading-relaxed">
                Audited by TUV SUD & Bureau Veritas for Total Quality Management (TQM), Occupational Health & Safety (OHSAS), and Green Building standard compliance.
              </p>
              <div className="p-3 rounded-xl bg-[#F5F5F3] border border-neutral-200 text-[11px] text-[#4B4B4B] space-y-1">
                <div>In-House Lab: <span className="text-blue-700 font-bold">NABL Concrete Cube Lab</span></div>
                <div>Safety Record: <span className="text-blue-700 font-bold">0.00 LTI (1.28M Safe Hrs)</span></div>
              </div>
            </div>

          </div>
        </div>

        {/* Heavy Equipment Asset Registry */}
        <div className="p-8 rounded-3xl bg-[#E8E8E5] border border-neutral-300 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs text-[#D97706] font-bold uppercase tracking-wider block">
                100% Owned In-House Plant & Machinery
              </span>
              <h3 className="text-2xl font-bold text-[#1C1C1C] font-display">
                Heavy Equipment & Mechanized Fleet Capacity
              </h3>
            </div>
            <div className="px-3.5 py-1.5 rounded-full bg-[#FFFFFF] text-[#D97706] text-xs font-bold border border-neutral-300 shadow-sm">
              🚜 Zero Equipment Dependency
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
            {(tenderData?.machineryFleet || []).map((item, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-[#FFFFFF] border border-neutral-200 flex items-center justify-between shadow-sm">
                <div className="space-y-0.5">
                  <strong className="text-[#1C1C1C] block">{item.name}</strong>
                  <span className="text-[#737373] text-[11px]">Deployable for Immediate Work</span>
                </div>
                <span className="px-2.5 py-1 rounded-md bg-[#F59E0B]/20 text-[#D97706] font-bold font-mono">
                  {item.qty}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Landmark Government & Commercial Contracts Executed */}
        <div className="space-y-6">
          <div className="space-y-2">
            <span className="text-xs text-[#D97706] font-bold uppercase tracking-wider block">
              Proof of On-Time Execution
            </span>
            <h3 className="text-2xl font-bold text-[#1C1C1C] font-display">
              Key Institutional Landmark Contracts Handed Over
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {(tenderData?.landmarkContracts || []).map((contract, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-[#FFFFFF] border border-neutral-200/90 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-700 font-mono">{contract.value}</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200">
                    {contract.status}
                  </span>
                </div>
                <h4 className="font-bold text-[#1C1C1C] text-base font-display">{contract.name}</h4>
                <p className="text-xs text-[#737373]">Authority: {contract.authority}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Enterprise RFP Submission Form */}
        <div id="rfp-submission-form" className="rounded-3xl bg-[#1C1C1C] border border-[#F59E0B]/40 p-8 sm:p-12 shadow-2xl space-y-8 text-white">
          
          <div className="space-y-2 text-center max-w-2xl mx-auto">
            <span className="text-xs text-[#F59E0B] font-extrabold uppercase tracking-widest block">
              Direct Tender Procurement Form
            </span>
            <h3 className="text-3xl font-bold text-white font-display">
              Submit Your RFP, Tender Document or BOQ
            </h3>
            <p className="text-xs text-[#E8E8E5]">
              Our Managing Director A. Charan Patel & Chief Structural Engineer Er. Sandeep Goud will review your technical specifications within 24 hours.
            </p>
          </div>

          {submissionSuccess ? (
            <div className="text-center py-10 space-y-4 max-w-lg mx-auto">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center border border-emerald-500/40">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="text-2xl font-bold text-white">
                Tender RFP Transmitted!
              </h4>
              <p className="text-xs text-[#E8E8E5]">
                Your procurement submission for <strong className="text-[#F59E0B]">{submissionSuccess.organizationName}</strong> has been assigned reference code:
              </p>
              <div className="p-4 rounded-2xl bg-[#141414] border border-neutral-700 text-sm font-mono text-emerald-400 font-bold">
                {submissionSuccess.id}
              </div>
              <p className="text-xs text-neutral-400">
                Assigned to: {submissionSuccess.assignedDirector}
              </p>

              <div className="pt-4 flex justify-center gap-3">
                <a
                  href={`https://wa.me/919032477292?text=Hello%20AMK%20INFRA%20MD%2C%20We%20have%20submitted%20an%20RFP%20Tender%20proposal%20under%20Ref%20${submissionSuccess.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Notify MD on WhatsApp</span>
                </a>
                <button
                  onClick={() => setSubmissionSuccess(null)}
                  className="px-5 py-2.5 rounded-xl bg-[#242424] hover:bg-[#2e2e2e] text-white text-xs font-bold border border-neutral-700"
                >
                  Submit Another RFP
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleRfpSubmit} className="space-y-6 max-w-3xl mx-auto">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">
                    Organization / Developer Name *
                  </label>
                  <input
                    type="text"
                    name="organizationName"
                    required
                    placeholder="e.g., TSIIC / Sri Balaji Group / GWMC"
                    value={rfpForm.organizationName}
                    onChange={handleFormChange}
                    className="w-full bg-[#141414] border border-neutral-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-neutral-500 focus:outline-none focus:border-[#F59E0B]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">
                    Procurement Officer / Contact Person
                  </label>
                  <input
                    type="text"
                    name="contactPerson"
                    placeholder="e.g., Executive Engineer / Project Director"
                    value={rfpForm.contactPerson}
                    onChange={handleFormChange}
                    className="w-full bg-[#141414] border border-neutral-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-neutral-500 focus:outline-none focus:border-[#F59E0B]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">
                    Official Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    name="officialPhone"
                    required
                    placeholder="e.g., 9032477292"
                    value={rfpForm.officialPhone}
                    onChange={handleFormChange}
                    className="w-full bg-[#141414] border border-neutral-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-neutral-500 focus:outline-none focus:border-[#F59E0B]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">
                    Official Email
                  </label>
                  <input
                    type="email"
                    name="officialEmail"
                    placeholder="e.g., tenders@organization.gov.in"
                    value={rfpForm.officialEmail}
                    onChange={handleFormChange}
                    className="w-full bg-[#141414] border border-neutral-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-neutral-500 focus:outline-none focus:border-[#F59E0B]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">
                    Tender / Project Category
                  </label>
                  <select
                    name="tenderType"
                    value={rfpForm.tenderType}
                    onChange={handleFormChange}
                    className="w-full bg-[#141414] border border-neutral-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#F59E0B]"
                  >
                    <option value="Commercial Complex / High-Rise Civil (G+5)">Commercial Complex / High-Rise Civil (G+5)</option>
                    <option value="Heavy Arterial CC/BT Roads & Box Canals">Heavy Arterial CC/BT Roads & Box Canals</option>
                    <option value="Luxury Gated Enclave Villa Construction">Luxury Gated Enclave Villa Construction</option>
                    <option value="Turnkey Interior Fitout & Architectural MEP">Turnkey Interior Fitout & Architectural MEP</option>
                    <option value="Smart Industrial Power Grid & 4K AI Security">Smart Industrial Power Grid & 4K AI Security</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">
                    Estimated BOQ Budget Range
                  </label>
                  <select
                    name="estimatedBoqValue"
                    value={rfpForm.estimatedBoqValue}
                    onChange={handleFormChange}
                    className="w-full bg-[#141414] border border-neutral-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#F59E0B]"
                  >
                    <option value="₹50 Lakh - ₹1 Crore">₹50 Lakh - ₹1 Crore</option>
                    <option value="₹1 Crore - ₹5 Crore">₹1 Crore - ₹5 Crore</option>
                    <option value="₹5 Crore - ₹15 Crore">₹5 Crore - ₹15 Crore</option>
                    <option value="₹15 Crore+ Mega Project">₹15 Crore+ Mega Project</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">
                  Project Scope & Technical Requirements *
                </label>
                <textarea
                  rows="3"
                  name="projectScope"
                  required
                  placeholder="Detail the site location, built-up sq.ft, concrete grades required (M30/M40), timeline milestones, or DPR references..."
                  value={rfpForm.projectScope}
                  onChange={handleFormChange}
                  className="w-full bg-[#141414] border border-neutral-700 rounded-xl p-3 text-xs text-white placeholder:text-neutral-500 focus:outline-none focus:border-[#F59E0B]"
                ></textarea>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">
                  Link to Tender RFP / BOQ Document (Google Drive / Dropbox / Govt Portal)
                </label>
                <input
                  type="url"
                  name="rfpDocumentLink"
                  placeholder="https://drive.google.com/tender-dpr.pdf"
                  value={rfpForm.rfpDocumentLink}
                  onChange={handleFormChange}
                  className="w-full bg-[#141414] border border-neutral-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-neutral-500 focus:outline-none focus:border-[#F59E0B]"
                />
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-neutral-800">
                <div className="flex items-center gap-2 text-xs text-neutral-400">
                  <ShieldCheck className="w-4 h-4 text-[#F59E0B]" />
                  <span>Class-I Confidential Procurement Protocol</span>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="px-6 py-3 rounded-xl bg-[#F59E0B] hover:bg-[#D97706] text-[#1C1C1C] hover:text-white font-black text-xs sm:text-sm flex items-center gap-2 shadow-md disabled:opacity-50 transition-all"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Transmitting RFP...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 stroke-[2.5]" />
                      <span>Submit Official RFP Proposal</span>
                    </>
                  )}
                </button>
              </div>

            </form>
          )}

        </div>

      </div>
    </div>
  );
}

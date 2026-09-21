import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { api } from '../../api';
import {
  X,
  Briefcase,
  UploadCloud,
  CheckCircle2,
  FileText,
  User,
  Phone,
  Mail,
  GraduationCap,
  Building,
  DollarSign,
  Link,
  ShieldCheck,
  Send,
  Loader2,
  Sparkles
} from 'lucide-react';

export function JobApplicationModal() {
  const {
    jobApplicationModalOpen,
    closeJobApplication,
    selectedJobForApplication,
    showToast
  } = useApp();

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    qualification: '',
    experienceYears: '3-5 Years',
    currentCompany: '',
    expectedSalary: '',
    portfolioUrl: '',
    coverNote: ''
  });

  const [submitting, setSubmitting] = useState(false);
  const [successResult, setSuccessResult] = useState(null);

  if (!jobApplicationModalOpen) return null;

  const jobTitle = selectedJobForApplication?.title || 'General Engineering Force';
  const divisionName = selectedJobForApplication?.divisionName || 'AMK Infrastructure Engineering Corps';

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone || !formData.qualification) {
      showToast('Required Fields', 'Please complete Full Name, Phone, and Qualification.', 'info');
      return;
    }

    setSubmitting(true);
    try {
      const res = await api.applyForJob({
        jobId: selectedJobForApplication?.id || 'GENERAL',
        ...formData
      });

      if (res.success) {
        setSuccessResult(res.data);
        showToast('Application Submitted!', `Reference ID: ${res.data.id}`, 'success');
      } else {
        showToast('Submission Failed', res.message || 'Please try again.', 'error');
      }
    } catch (err) {
      console.error(err);
      showToast('Network Error', 'Failed to connect to careers portal server.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    setSuccessResult(null);
    closeJobApplication();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#1C1C1C]/75 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#FFFFFF] rounded-3xl border border-neutral-200 shadow-2xl overflow-hidden my-8 text-[#4B4B4B]">
        
        {/* Header Ribbon */}
        <div className="relative bg-[#1C1C1C] px-6 py-5 border-b border-neutral-800 flex items-center justify-between text-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#F59E0B] text-[#1C1C1C] flex items-center justify-center font-black shadow-sm">
              <Briefcase className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <span className="text-[10px] text-[#F59E0B] font-extrabold uppercase tracking-widest block">
                AMK Talent Acquisition • Fast Track
              </span>
              <h3 className="text-lg font-bold text-white font-display truncate max-w-md">
                {jobTitle}
              </h3>
            </div>
          </div>

          <button
            onClick={handleClose}
            className="p-2 rounded-xl bg-[#242424] hover:bg-[#2e2e2e] text-neutral-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 max-h-[75vh] overflow-y-auto space-y-6">
          {successResult ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-700 mx-auto flex items-center justify-center border border-emerald-200">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="text-2xl font-bold text-[#1C1C1C] font-display">
                Application Registered!
              </h4>
              <p className="text-xs text-[#737373] max-w-md mx-auto">
                Thank you, <strong className="text-[#D97706]">{successResult.fullName}</strong>. Your engineering profile has been routed directly to our Head of Talent Acquisition & Er. Sandeep Goud.
              </p>

              <div className="p-4 rounded-2xl bg-[#F5F5F3] border border-neutral-200 inline-block text-left text-xs space-y-1.5">
                <div>
                  <span className="text-[#737373]">Application Ref:</span>{' '}
                  <strong className="text-emerald-700 font-mono">{successResult.id}</strong>
                </div>
                <div>
                  <span className="text-[#737373]">Position:</span>{' '}
                  <span className="text-[#1C1C1C] font-semibold">{successResult.jobTitle}</span>
                </div>
                <div>
                  <span className="text-[#737373]">Target Division:</span>{' '}
                  <span className="text-[#D97706] font-semibold">{successResult.divisionName}</span>
                </div>
                <div>
                  <span className="text-[#737373]">Status:</span>{' '}
                  <span className="text-emerald-700 font-semibold">{successResult.status}</span>
                </div>
              </div>

              <div className="pt-4 flex justify-center gap-3">
                <a
                  href={`https://wa.me/919032477292?text=Hello%20AMK%20INFRA%20HR%2C%20I%20have%20submitted%20my%20application%20for%20${encodeURIComponent(successResult.jobTitle)}%20with%20Ref%20${successResult.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-2 shadow-sm"
                >
                  <span>Connect with HR on WhatsApp</span>
                </a>
                <button
                  onClick={handleClose}
                  className="px-5 py-2.5 rounded-xl bg-[#1C1C1C] hover:bg-[#242424] text-white text-xs font-bold"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div className="p-3.5 rounded-2xl bg-[#F59E0B]/10 border border-[#F59E0B]/30 flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-[#D97706] flex-shrink-0 mt-0.5" />
                <div className="text-xs text-[#4B4B4B]">
                  <strong className="text-[#1C1C1C]">Direct Engineering Recruitment:</strong>{' '}
                  We offer competitive remuneration, site hazard insurance (₹25L), annual performance bonuses, and continuous NABL/ISO professional growth.
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#1C1C1C] mb-1">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 w-4 h-4 text-[#737373]" />
                    <input
                      type="text"
                      name="fullName"
                      required
                      placeholder="e.g., Er. Rajesh Kumar"
                      value={formData.fullName}
                      onChange={handleChange}
                      className="w-full bg-[#F5F5F3] border border-neutral-300 rounded-xl pl-9 pr-3 py-2.5 text-xs text-[#1C1C1C] placeholder:text-[#737373] focus:outline-none focus:border-[#F59E0B]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1C1C1C] mb-1">
                    Contact Phone (WhatsApp) *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 w-4 h-4 text-[#737373]" />
                    <input
                      type="tel"
                      name="phone"
                      required
                      placeholder="e.g., 9848012345"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full bg-[#F5F5F3] border border-neutral-300 rounded-xl pl-9 pr-3 py-2.5 text-xs text-[#1C1C1C] placeholder:text-[#737373] focus:outline-none focus:border-[#F59E0B]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1C1C1C] mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 w-4 h-4 text-[#737373]" />
                    <input
                      type="email"
                      name="email"
                      placeholder="e.g., rajesh.civil@gmail.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-[#F5F5F3] border border-neutral-300 rounded-xl pl-9 pr-3 py-2.5 text-xs text-[#1C1C1C] placeholder:text-[#737373] focus:outline-none focus:border-[#F59E0B]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1C1C1C] mb-1">
                    Highest Qualification *
                  </label>
                  <div className="relative">
                    <GraduationCap className="absolute left-3 top-3 w-4 h-4 text-[#737373]" />
                    <input
                      type="text"
                      name="qualification"
                      required
                      placeholder="e.g., B.Tech Civil / M.Tech Structural / Diploma"
                      value={formData.qualification}
                      onChange={handleChange}
                      className="w-full bg-[#F5F5F3] border border-neutral-300 rounded-xl pl-9 pr-3 py-2.5 text-xs text-[#1C1C1C] placeholder:text-[#737373] focus:outline-none focus:border-[#F59E0B]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1C1C1C] mb-1">
                    Experience Level
                  </label>
                  <select
                    name="experienceYears"
                    value={formData.experienceYears}
                    onChange={handleChange}
                    className="w-full bg-[#F5F5F3] border border-neutral-300 rounded-xl px-3 py-2.5 text-xs text-[#1C1C1C] focus:outline-none focus:border-[#F59E0B]"
                  >
                    <option value="Fresh Graduate / Entry">Fresh Graduate / Entry (0-1 yr)</option>
                    <option value="1 - 3 Years">1 - 3 Years Site Experience</option>
                    <option value="3 - 5 Years">3 - 5 Years Core Civil/MEP</option>
                    <option value="5 - 8 Years">5 - 8 Years Senior Lead</option>
                    <option value="8+ Years Executive">8+ Years Executive Project Manager</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1C1C1C] mb-1">
                    Current / Last Company
                  </label>
                  <div className="relative">
                    <Building className="absolute left-3 top-3 w-4 h-4 text-[#737373]" />
                    <input
                      type="text"
                      name="currentCompany"
                      placeholder="e.g., L&T / NCC / Independent Site"
                      value={formData.currentCompany}
                      onChange={handleChange}
                      className="w-full bg-[#F5F5F3] border border-neutral-300 rounded-xl pl-9 pr-3 py-2.5 text-xs text-[#1C1C1C] placeholder:text-[#737373] focus:outline-none focus:border-[#F59E0B]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1C1C1C] mb-1">
                    Expected CTC / Salary
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-3 w-4 h-4 text-[#737373]" />
                    <input
                      type="text"
                      name="expectedSalary"
                      placeholder="e.g., ₹7.5 LPA"
                      value={formData.expectedSalary}
                      onChange={handleChange}
                      className="w-full bg-[#F5F5F3] border border-neutral-300 rounded-xl pl-9 pr-3 py-2.5 text-xs text-[#1C1C1C] placeholder:text-[#737373] focus:outline-none focus:border-[#F59E0B]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1C1C1C] mb-1">
                    Portfolio / LinkedIn / CV Drive Link
                  </label>
                  <div className="relative">
                    <Link className="absolute left-3 top-3 w-4 h-4 text-[#737373]" />
                    <input
                      type="url"
                      name="portfolioUrl"
                      placeholder="https://drive.google.com/your-cv..."
                      value={formData.portfolioUrl}
                      onChange={handleChange}
                      className="w-full bg-[#F5F5F3] border border-neutral-300 rounded-xl pl-9 pr-3 py-2.5 text-xs text-[#1C1C1C] placeholder:text-[#737373] focus:outline-none focus:border-[#F59E0B]"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1C1C1C] mb-1">
                  Summary of Past Projects & Key Skills
                </label>
                <textarea
                  rows="3"
                  name="coverNote"
                  placeholder="Mention your software proficiency (AutoCAD, Revit, STAAD.Pro), types of RCC slabs or highway stretches handled, and availability to join..."
                  value={formData.coverNote}
                  onChange={handleChange}
                  className="w-full bg-[#F5F5F3] border border-neutral-300 rounded-xl p-3 text-xs text-[#1C1C1C] placeholder:text-[#737373] focus:outline-none focus:border-[#F59E0B]"
                ></textarea>
              </div>

              {/* Submit Buttons */}
              <div className="pt-3 border-t border-neutral-200 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-[11px] text-[#737373]">
                  <ShieldCheck className="w-4 h-4 text-emerald-700" />
                  <span>Confidential HR fast-track processing</span>
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="px-4 py-2 rounded-xl bg-[#F5F5F3] hover:bg-[#E8E8E5] text-[#1C1C1C] text-xs font-semibold border border-neutral-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-6 py-2 rounded-xl bg-[#F59E0B] hover:bg-[#D97706] text-[#1C1C1C] hover:text-white text-xs font-extrabold flex items-center gap-2 shadow-sm disabled:opacity-50"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Submitting...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 stroke-[2.5]" />
                        <span>Submit Application</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
}

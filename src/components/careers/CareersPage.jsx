import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { api } from '../../api';
import {
  Briefcase,
  Users,
  HardHat,
  Award,
  ShieldCheck,
  Zap,
  CheckCircle2,
  MapPin,
  Clock,
  Sparkles,
  ChevronRight,
  DollarSign,
  Phone,
  MessageSquare,
  Building2,
  Layers,
  Search,
  Filter
} from 'lucide-react';

export function CareersPage() {
  const {
    divisions,
    openJobApplication,
    navigateTo,
    openStaffIntranet
  } = useApp();

  const [jobs, setJobs] = useState([]);
  const [selectedDivisionFilter, setSelectedDivisionFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadJobs() {
      setLoading(true);
      try {
        const res = await api.getCareersJobs(selectedDivisionFilter);
        if (res.success) {
          setJobs(res.data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadJobs();
  }, [selectedDivisionFilter]);

  const filteredJobs = jobs.filter(job => {
    const q = searchQuery.toLowerCase();
    return (
      job.title.toLowerCase().includes(q) ||
      job.department.toLowerCase().includes(q) ||
      job.divisionName.toLowerCase().includes(q) ||
      job.location.toLowerCase().includes(q)
    );
  });

  return (
    <div className="py-14 bg-[#F5F5F3] text-[#4B4B4B] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Hero Section */}
        <div className="relative rounded-3xl overflow-hidden bg-[#1C1C1C] border border-[#F59E0B]/30 p-8 sm:p-14 shadow-2xl text-white">
          <div className="relative z-10 max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F59E0B]/15 text-[#F59E0B] text-xs font-extrabold border border-[#F59E0B]/30">
              <HardHat className="w-4 h-4 text-[#F59E0B]" />
              <span>AMK ENGINEERING CORPS • TALENT RECRUITMENT 2026</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-black tracking-tight text-white leading-tight">
              Build Iconic Landmarks.{' '}
              <span className="text-[#F59E0B]">
                Advance Your Engineering Career.
              </span>
            </h1>

            <p className="text-[#E8E8E5] text-sm sm:text-base leading-relaxed">
              Join Telangana's Class-I licensed infrastructure conglomerate. We empower civil engineers, architects, MEP leads, and master supervisors with state-of-the-art telemetry, zero-LTI safety standards, and merit-based executive growth.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <button
                onClick={() => openJobApplication()}
                className="px-6 py-3.5 rounded-xl bg-[#F59E0B] hover:bg-[#D97706] text-[#1C1C1C] hover:text-white font-black text-xs sm:text-sm flex items-center gap-2 shadow-md transition-all"
              >
                <Briefcase className="w-4 h-4 stroke-[2.5]" />
                <span>Fast-Track Apply Now &rarr;</span>
              </button>

              <button
                onClick={openStaffIntranet}
                className="px-5 py-3.5 rounded-xl bg-[#242424] hover:bg-[#2e2e2e] text-white text-xs sm:text-sm font-bold border border-neutral-700 flex items-center gap-2 transition-colors"
              >
                <Users className="w-4 h-4 text-[#F59E0B]" />
                <span>Existing Staff & Field Portal</span>
              </button>
            </div>
          </div>
        </div>

        {/* Why Engineers Choose AMK INFRA */}
        <div className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs text-[#D97706] font-extrabold uppercase tracking-widest block">
              The AMK Engineering Advantage
            </span>
            <h2 className="text-3xl font-bold text-[#1C1C1C] font-display">
              Why Premier Engineers & Craftsmen Join Us
            </h2>
            <p className="text-xs text-[#737373]">
              We treat construction engineering as an exacting science, backing our workforce with top-tier tools, safety, and security.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="p-6 rounded-2xl bg-[#FFFFFF] border border-neutral-200/90 shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-[#1C1C1C] text-base">0.00 LTI Safety Benchmark</h3>
              <p className="text-xs text-[#737373] leading-relaxed">
                Strict HSE compliance, full personal protective equipment, safety nets, and ₹25L comprehensive accidental coverage for every site team member.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FFFFFF] border border-neutral-200/90 shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#F59E0B]/15 text-[#D97706] flex items-center justify-center font-bold">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-[#1C1C1C] text-base">Continuous CPD Academy</h3>
              <p className="text-xs text-[#737373] leading-relaxed">
                Full sponsorship for NABL concrete testing, STAAD.Pro / Revit BIM mastery, and licensed government supervisor accreditation.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FFFFFF] border border-neutral-200/90 shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-[#1C1C1C] text-base">Modern Tech & Drones</h3>
              <p className="text-xs text-[#737373] leading-relaxed">
                Field engineers are equipped with digital Leica theodolites, DJI LiDAR drones, concrete ultrasonic testers, and iPad DPR logs.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FFFFFF] border border-neutral-200/90 shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-700 flex items-center justify-center font-bold">
                <DollarSign className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-[#1C1C1C] text-base">Meritocracy & On-Time Pay</h3>
              <p className="text-xs text-[#737373] leading-relaxed">
                1st of the month guaranteed salaries, provident fund (PF), ESI, family medical coverage, and milestone handover bonuses.
              </p>
            </div>

          </div>
        </div>

        {/* Live Job Openings Directory */}
        <div className="space-y-6 pt-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="text-xs text-[#D97706] font-extrabold uppercase tracking-widest block">
                Open Engineering & Leadership Roles
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#1C1C1C] font-display">
                Current Opportunities Across 7 Divisions
              </h2>
            </div>

            {/* Search Bar */}
            <div className="relative w-full md:w-72">
              <Search className="absolute left-3.5 top-3 w-4 h-4 text-[#737373]" />
              <input
                type="text"
                placeholder="Search role, skills, department..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#FFFFFF] border border-neutral-300 rounded-xl pl-10 pr-4 py-2 text-xs text-[#1C1C1C] placeholder:text-[#737373] focus:outline-none focus:border-[#F59E0B]"
              />
            </div>
          </div>

          {/* Division Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            <button
              onClick={() => setSelectedDivisionFilter('all')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedDivisionFilter === 'all'
                  ? 'bg-[#F59E0B] text-[#1C1C1C] shadow-sm font-black'
                  : 'bg-[#FFFFFF] text-[#4B4B4B] hover:bg-[#E8E8E5] border border-neutral-300'
              }`}
            >
              All Divisions ({jobs.length})
            </button>
            {(divisions || []).map(div => (
              <button
                key={div.id}
                onClick={() => setSelectedDivisionFilter(div.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  selectedDivisionFilter === div.id
                    ? 'bg-[#F59E0B] text-[#1C1C1C] shadow-sm font-black'
                    : 'bg-[#FFFFFF] text-[#4B4B4B] hover:bg-[#E8E8E5] border border-neutral-300'
                }`}
              >
                {div.shortName || div.name}
              </button>
            ))}
          </div>

          {/* Job Openings Grid */}
          {loading ? (
            <div className="py-16 text-center text-[#737373] text-xs">
              Loading active engineering openings...
            </div>
          ) : filteredJobs.length === 0 ? (
            <div className="p-12 rounded-3xl bg-[#FFFFFF] text-center space-y-3 border border-neutral-200 shadow-sm">
              <Briefcase className="w-10 h-10 text-[#737373] mx-auto" />
              <h3 className="text-base font-bold text-[#1C1C1C]">No exact position matching your filter</h3>
              <p className="text-xs text-[#737373]">
                You can still submit a general engineering application and our Talent Lead will review your profile.
              </p>
              <button
                onClick={() => openJobApplication()}
                className="px-5 py-2.5 rounded-xl bg-[#F59E0B] hover:bg-[#D97706] text-[#1C1C1C] hover:text-white font-bold text-xs shadow-md"
              >
                Submit General Engineering CV
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredJobs.map(job => (
                <div
                  key={job.id}
                  className="rounded-2xl bg-[#FFFFFF] border border-neutral-200 hover:border-[#F59E0B]/60 p-6 sm:p-7 shadow-sm space-y-5 transition-all group flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    {/* Top Metadata */}
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="px-2.5 py-1 rounded-md bg-[#F59E0B]/15 text-[#D97706] text-[10px] font-extrabold uppercase tracking-wider border border-[#F59E0B]/30">
                        {job.divisionName}
                      </span>
                      <span className="text-[11px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        🔥 {job.openings} Openings
                      </span>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-[#1C1C1C] group-hover:text-[#D97706] transition-colors font-display">
                        {job.title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-3 text-[#737373] text-xs mt-2">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-[#737373]" />
                          {job.location}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-[#737373]" />
                          {job.type}
                        </span>
                        <span>•</span>
                        <span className="text-[#D97706] font-semibold">
                          {job.experience} Exp
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-[#4B4B4B] leading-relaxed">
                      {job.summary}
                    </p>

                    {/* Key Requirements */}
                    <div className="space-y-1.5 pt-2">
                      <span className="text-[10px] uppercase font-bold text-[#737373] tracking-wider block">
                        Requirements:
                      </span>
                      <ul className="space-y-1 text-xs text-[#4B4B4B]">
                        {(job.requirements || []).slice(0, 2).map((req, idx) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#D97706] flex-shrink-0 mt-0.5" />
                            <span>{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Salary & Benefits Tag */}
                    <div className="p-3 rounded-xl bg-[#F5F5F3] border border-neutral-200 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-[#737373] block uppercase">Remuneration Package</span>
                        <strong className="text-xs text-emerald-700 font-mono font-bold">
                          {job.salaryRange}
                        </strong>
                      </div>
                      <span className="text-[10px] text-[#737373] font-medium">PF + ESI + Bonus</span>
                    </div>
                  </div>

                  {/* Apply Button */}
                  <div className="pt-3 border-t border-neutral-100 flex items-center justify-between gap-3">
                    <span className="text-[10px] text-[#737373] font-mono">Job Code: {job.id}</span>
                    <button
                      onClick={() => openJobApplication(job)}
                      className="px-5 py-2.5 rounded-xl bg-[#F59E0B] hover:bg-[#D97706] text-[#1C1C1C] hover:text-white font-black text-xs shadow-sm flex items-center gap-1.5 transition-all"
                    >
                      <span>Apply for this Role</span>
                      <ChevronRight className="w-4 h-4 stroke-[2.5]" />
                    </button>
                  </div>

                </div>
              ))}
            </div>
          )}
        </div>

        {/* HR Hotline & Field Staff Intranet Bar */}
        <div className="bg-[#E8E8E5] rounded-3xl border border-neutral-300 p-8 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-xs text-[#D97706] font-bold uppercase tracking-wider block">
              Direct HR & Engineering Desk
            </span>
            <h3 className="text-xl font-bold text-[#1C1C1C] font-display">
              Have Questions Regarding Careers or Field Deployments?
            </h3>
            <p className="text-xs text-[#4B4B4B]">
              Speak directly with our HR team or submit field daily progress reports (DPRs).
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <a
              href="tel:9032477292"
              className="px-4 py-2.5 rounded-xl bg-[#FFFFFF] hover:bg-[#F5F5F3] text-[#1C1C1C] font-bold text-xs flex items-center gap-2 border border-neutral-300"
            >
              <Phone className="w-4 h-4 text-[#F59E0B]" />
              <span>Call HR: 9032477292</span>
            </a>
            <a
              href="https://wa.me/919032477292?text=Hello%20AMK%20INFRA%20Careers%2C%20I%20am%20interested%20in%20joining%20the%20engineering%20team."
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-2 shadow-sm"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp Careers Desk</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}

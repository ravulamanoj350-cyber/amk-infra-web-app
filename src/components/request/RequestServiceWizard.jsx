import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { api } from '../../api';
import {
  Building2,
  Home,
  Construction,
  Hammer,
  Zap,
  Camera,
  Sparkles,
  PaintBucket,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  MessageSquare,
  Phone,
  MapPin,
  Calendar,
  IndianRupee,
  Upload,
  ShieldCheck,
  Send,
  Copy,
  ExternalLink,
  Clock,
  Sparkle,
  Layers,
  Smartphone,
  Check
} from 'lucide-react';

const CATEGORIES = [
  {
    id: 'construction',
    divisionId: 'civil-commercial',
    divisionName: 'Civil Infrastructure & Commercial Division',
    name: 'Construction (Civil & Commercial)',
    tag: 'Commercial & Multi-Tier (G+5)',
    icon: Building2,
    subTypes: ['Commercial Complex', 'Shopping Mall / Retail Plaza', 'Industrial Warehouse', 'Apartment Building (G+4)', 'Institutional Building']
  },
  {
    id: 'residential',
    divisionId: 'residential-villas',
    divisionName: 'Luxury Residential & Bespoke Villas Division',
    name: 'Residential (Custom Home Building)',
    tag: 'Custom Luxury Villas & Duplexes',
    icon: Home,
    subTypes: ['2BHK Independent Villa', '3BHK Luxury Duplex Villa', '4BHK Triplex Villa', 'Farmhouse / Weekend Villa', 'Floor Addition / Penthouse']
  },
  {
    id: 'infrastructure',
    divisionId: 'infrastructure-public',
    divisionName: 'Heavy Works, Roads & Urban Canals Division',
    name: 'Infrastructure (Roads & Drainage)',
    tag: 'Heavy Public & Municipal Works',
    icon: Construction,
    subTypes: ['Concrete Cement (CC) Road', 'Bituminous (BT) Asphalt Road', 'Stormwater Box Drainage', 'Culvert / Retaining Wall', 'Gated Community Internal Roads']
  },
  {
    id: 'renovation',
    divisionId: 'residential-villas',
    divisionName: 'Luxury Residential & Bespoke Villas Division',
    name: 'Renovation & Remodeling',
    tag: 'Structural Makeover & Retrofit',
    icon: Hammer,
    subTypes: ['Complete Villa Renovation', 'Bathroom & Kitchen Overhaul', 'Facade Modernization', 'Floor Extension & Column Jacketing', 'Commercial Office Fitout Remodel']
  },
  {
    id: 'interior',
    divisionId: 'interiors-living',
    divisionName: 'Luxury Living, Interiors & Turnkey Fitouts Division',
    name: 'Interior Design & Turnkey Fitouts',
    tag: '3D Photorealistic & Modular',
    icon: Sparkles,
    subTypes: ['Full 3BHK/4BHK Turnkey Interiors', 'Acrylic Modular Kitchen', 'False Ceiling & Profile Lighting', 'Custom Wardrobes & TV Units', 'Commercial Office & Clinic Interiors']
  },
  {
    id: 'security',
    divisionId: 'surveillance-security',
    divisionName: 'Surveillance, AI Security & Shield Systems Division',
    name: 'CC Camera & Security Installation',
    tag: 'Smart 4K AI Surveillance',
    icon: Camera,
    subTypes: ['4-Camera HD Villa Kit', '8-Camera 4K Commercial Grid', '16/32-Camera Industrial System', 'Video Door Phone & Smart Lock', 'Biometric Access Control System']
  },
  {
    id: 'electrical',
    divisionId: 'power-automation',
    divisionName: 'Electrical Grids, Power & Smart Automation Division',
    name: 'Electrical Works & Smart Power',
    tag: '3-Phase HT/LT & Automation',
    icon: Zap,
    subTypes: ['Concealed House Wiring (FRLS)', '3-Phase Industrial Panel Board', 'Smart Home Lighting Automation', 'Inverter / Generator Backup Line', 'Chemical Copper Plate Earthing']
  },
  {
    id: 'painting',
    divisionId: 'surface-protection',
    divisionName: 'Surface Protection, Royale Painting & Waterproofing Division',
    name: 'Painting Works & Waterproofing',
    tag: 'Weatherproof & Dr. Fixit Polyurethane',
    icon: PaintBucket,
    subTypes: ['Complete Interior Royale Painting', 'Weatherproof Exterior Apex Coating', 'Terrace Roof Waterproofing', 'Texture Wall Accent Design', 'Anti-Dampness Chemical Treatment']
  }
];

export function RequestServiceWizard() {
  const {
    selectedServiceId,
    setSelectedServiceId,
    selectedDivisionId,
    divisions,
    navigateTo,
    showToast,
    addNotification,
    setMobileMode
  } = useApp();

  const [step, setStep] = useState(1);
  const [serviceCategory, setServiceCategory] = useState(selectedServiceId || 'residential');
  const [projectType, setProjectType] = useState('');
  const [location, setLocation] = useState('');
  const [siteSize, setSiteSize] = useState('');
  const [budgetRange, setBudgetRange] = useState('₹25 Lakh - ₹50 Lakh');
  const [timeline, setTimeline] = useState('Within 1 - 3 Months');
  const [details, setDetails] = useState('');
  
  // Customer info
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  // Result state
  const [submittedInquiry, setSubmittedInquiry] = useState(null);
  const [whatsappUrl, setWhatsappUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (selectedServiceId) {
      setServiceCategory(selectedServiceId);
      const catObj = CATEGORIES.find(c => c.id === selectedServiceId);
      if (catObj && catObj.subTypes.length > 0) {
        setProjectType(catObj.subTypes[0]);
      }
    } else if (selectedDivisionId) {
      const matched = CATEGORIES.find(c => c.divisionId === selectedDivisionId);
      if (matched) {
        setServiceCategory(matched.id);
        if (matched.subTypes.length > 0) setProjectType(matched.subTypes[0]);
      }
    }
  }, [selectedServiceId, selectedDivisionId]);

  const activeCategoryObj = CATEGORIES.find(c => c.id === serviceCategory) || CATEGORIES[0];
  const matchedDivision = (divisions || []).find(d => d.id === activeCategoryObj.divisionId);

  const handleSelectCategory = (catId) => {
    setServiceCategory(catId);
    setSelectedServiceId(catId);
    const found = CATEGORIES.find(c => c.id === catId);
    if (found && found.subTypes.length > 0) {
      setProjectType(found.subTypes[0]);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!customerName.trim() || !phone.trim()) {
      showToast('Missing Details', 'Please provide your Name and Phone Number.', 'error');
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        customerName: customerName.trim(),
        phone: phone.trim(),
        email: email ? email.trim() : '',
        serviceCategory,
        divisionId: activeCategoryObj.divisionId,
        projectType: projectType || activeCategoryObj.subTypes[0] || 'General Construction',
        location: location.trim() || 'Hanamkonda / Warangal Area',
        siteSize: siteSize.trim() || 'Not specified',
        budgetRange,
        timeline,
        details: details.trim()
      };

      const res = await api.createInquiry(payload);

      if (res.success) {
        setSubmittedInquiry(res.data);
        setWhatsappUrl(res.whatsappNotificationUrl);
        setStep(4); // Success step
        
        showToast('Request Registered!', `Tracking ID: ${res.data.id}`, 'success');
        
        // Add simulated notification
        addNotification({
          title: 'Inquiry Registered',
          message: `Your request (${res.data.id}) for ${res.data.serviceTitle} was assigned to ${res.data.divisionName}.`,
          type: 'success'
        });
      } else {
        showToast('Submission Error', res.message || 'Could not submit inquiry', 'error');
      }
    } catch (err) {
      console.error('Request submission error', err);
      showToast('Network Error', 'Please check your connection or call 9032477292 directly.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyTrackingCode = () => {
    if (submittedInquiry) {
      navigator.clipboard.writeText(submittedInquiry.id);
      setCopied(true);
      showToast('Copied!', 'Tracking ID copied to clipboard.', 'info');
      setTimeout(() => setCopied(false), 3000);
    }
  };

  return (
    <div className="py-16 bg-[#F5F5F3] text-[#1C1C1C] min-h-screen relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <div className="text-center space-y-3 mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFFFFF] text-[#D97706] text-xs font-bold border border-[#F59E0B]/40 shadow-sm">
            <Sparkle className="w-3.5 h-3.5 text-[#F59E0B]" />
            <span>Interactive Corporate Request System</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black text-[#1C1C1C]">
            Choose Construction Type &{' '}
            <span className="text-[#D97706]">
              Corporate Wing
            </span>
          </h1>
          <p className="text-[#4B4B4B] text-xs sm:text-sm max-w-xl mx-auto">
            Select your discipline to receive an itemized estimate, assign a dedicated division engineer, and track your site execution in real-time.
          </p>
        </div>

        {/* Wizard Card */}
        <div className="bg-[#FFFFFF] border border-neutral-200 rounded-3xl p-6 sm:p-10 shadow-xl">
          
          {/* Step Progress Tracker */}
          <div className="flex items-center justify-between mb-8 relative">
            <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-1 bg-[#E8E8E5] -z-0" />
            
            {[
              { num: 1, label: 'Division & Type' },
              { num: 2, label: 'Scope & Location' },
              { num: 3, label: 'Contact Info' },
              { num: 4, label: 'Tracking & Quote' }
            ].map((st) => {
              const isPassed = step >= st.num;
              const isCurrent = step === st.num;

              return (
                <div key={st.num} className="relative z-10 flex flex-col items-center">
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                      isPassed
                        ? 'bg-[#F59E0B] text-[#1C1C1C] shadow-md scale-105'
                        : 'bg-[#E8E8E5] text-[#737373]'
                    }`}
                  >
                    {isPassed && step > st.num ? '✓' : st.num}
                  </div>
                  <span className={`text-[10px] sm:text-xs font-semibold mt-2 hidden sm:block ${
                    isCurrent ? 'text-[#D97706]' : isPassed ? 'text-[#1C1C1C]' : 'text-[#737373]'
                  }`}>
                    {st.label}
                  </span>
                </div>
              );
            })}
          </div>

          {/* STEP 1: Select Category / Division */}
          {step === 1 && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <h2 className="text-lg font-bold text-[#1C1C1C] font-display">
                  Step 1: Select Corporate Division & Project Type
                </h2>
                {matchedDivision && (
                  <span className="text-xs font-mono text-[#D97706] font-bold bg-[#F59E0B]/10 px-2.5 py-1 rounded-lg border border-[#F59E0B]/30">
                    Assigned: {matchedDivision.shortName}
                  </span>
                )}
              </div>

              {/* 8 Category Tiles */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {CATEGORIES.map((cat) => {
                  const Icon = cat.icon;
                  const isSelected = serviceCategory === cat.id;

                  return (
                    <div
                      key={cat.id}
                      onClick={() => handleSelectCategory(cat.id)}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all duration-200 flex items-start gap-3.5 ${
                        isSelected
                          ? 'bg-[#F59E0B]/10 border-[#F59E0B] shadow-md ring-1 ring-[#F59E0B]/50'
                          : 'bg-[#F5F5F3] border-neutral-200 hover:bg-[#E8E8E5] hover:border-neutral-300'
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                        isSelected ? 'bg-[#F59E0B] text-[#1C1C1C] font-bold' : 'bg-[#FFFFFF] text-[#D97706] border border-neutral-200'
                      }`}>
                        <Icon className="w-5 h-5" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <strong className="text-sm text-[#1C1C1C] font-bold block truncate">
                            {cat.name}
                          </strong>
                          {isSelected && (
                            <CheckCircle2 className="w-4 h-4 text-[#D97706] flex-shrink-0 ml-1" />
                          )}
                        </div>
                        <span className="text-[10px] text-[#D97706] font-semibold block mt-0.5">
                          {cat.tag}
                        </span>
                        <span className="text-[10px] text-[#737373] block truncate font-mono mt-0.5">
                          {cat.divisionName}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Sub-Type Selector */}
              {activeCategoryObj && (
                <div className="bg-[#F5F5F3] p-5 rounded-2xl border border-neutral-200 space-y-3">
                  <label className="block text-xs font-bold text-[#1C1C1C]">
                    Specific Structure Choice for <strong className="text-[#D97706]">{activeCategoryObj.name}</strong>:
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {activeCategoryObj.subTypes.map((sub, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setProjectType(sub)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                          projectType === sub
                            ? 'bg-[#F59E0B] text-[#1C1C1C] font-bold shadow-sm'
                            : 'bg-[#FFFFFF] text-[#4B4B4B] border border-neutral-200 hover:bg-neutral-100'
                        }`}
                      >
                        {sub}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex justify-end pt-4">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-7 py-3.5 rounded-xl bg-[#F59E0B] hover:bg-[#D97706] text-[#1C1C1C] hover:text-white font-extrabold text-xs shadow-md flex items-center gap-2 transition-all hover:scale-105"
                >
                  <span>Continue to Scope & Location</span>
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Scope, Location, Budget, Timeline */}
          {step === 2 && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-[#1C1C1C] font-display">
                  Step 2: Project Scope, Location & Budget
                </h2>
                <span className="text-xs text-[#D97706] font-semibold">
                  {activeCategoryObj.name}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#1C1C1C] mb-1.5">
                    Site Location in Warangal / Telangana *
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3.5 top-3 w-4 h-4 text-[#737373]" />
                    <input
                      type="text"
                      placeholder="e.g. Ramnagar, Hanamkonda / Hunter Road"
                      value={location}
                      onChange={e => setLocation(e.target.value)}
                      className="w-full bg-[#F5F5F3] border border-neutral-300 focus:border-[#F59E0B] rounded-xl pl-10 pr-4 py-2.5 text-xs text-[#1C1C1C] outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1C1C1C] mb-1.5">
                    Approximate Site / Built-up Size (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 200 sq.yards plot / 2,800 sq.ft built-up"
                    value={siteSize}
                    onChange={e => setSiteSize(e.target.value)}
                    className="w-full bg-[#F5F5F3] border border-neutral-300 focus:border-[#F59E0B] rounded-xl px-4 py-2.5 text-xs text-[#1C1C1C] outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#1C1C1C] mb-1.5">
                    Estimated Budget Expectation
                  </label>
                  <select
                    value={budgetRange}
                    onChange={e => setBudgetRange(e.target.value)}
                    className="w-full bg-[#F5F5F3] border border-neutral-300 focus:border-[#F59E0B] rounded-xl px-4 py-2.5 text-xs text-[#1C1C1C] outline-none"
                  >
                    <option value="Under ₹5 Lakh (Maintenance / Painting / CC Camera)">Under ₹5 Lakh (Maintenance / Small Works)</option>
                    <option value="₹5 Lakh - ₹15 Lakh (Interior / Renovation)">₹5 Lakh - ₹15 Lakh (Interior / Renovation)</option>
                    <option value="₹15 Lakh - ₹30 Lakh">₹15 Lakh - ₹30 Lakh</option>
                    <option value="₹30 Lakh - ₹50 Lakh (Custom Villa)">₹30 Lakh - ₹50 Lakh (Custom Villa)</option>
                    <option value="₹50 Lakh - ₹1 Crore (Luxury Villa)">₹50 Lakh - ₹1 Crore (Luxury Villa)</option>
                    <option value="Above ₹1 Crore (Commercial / Multi-tier / Infra)">Above ₹1 Crore (Commercial / Multi-tier)</option>
                    <option value="Need AMK Engineering Consultation">Need AMK Engineering Consultation</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1C1C1C] mb-1.5">
                    Target Execution Timeline
                  </label>
                  <select
                    value={timeline}
                    onChange={e => setTimeline(e.target.value)}
                    className="w-full bg-[#F5F5F3] border border-neutral-300 focus:border-[#F59E0B] rounded-xl px-4 py-2.5 text-xs text-[#1C1C1C] outline-none"
                  >
                    <option value="Immediately (Within 1-2 Weeks)">Immediately (Within 1-2 Weeks)</option>
                    <option value="Within 1 Month">Within 1 Month</option>
                    <option value="Within 3 Months">Within 3 Months</option>
                    <option value="Planning Phase / Next 6 Months">Planning Phase / Next 6 Months</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1C1C1C] mb-1.5">
                  Additional Project Specifications / Notes
                </label>
                <textarea
                  rows="3"
                  placeholder="Mention specific requirements like Vastu orientation, number of rooms, commercial requirements, material choices, etc."
                  value={details}
                  onChange={e => setDetails(e.target.value)}
                  className="w-full bg-[#F5F5F3] border border-neutral-300 focus:border-[#F59E0B] rounded-xl p-3.5 text-xs text-[#1C1C1C] outline-none resize-none"
                />
              </div>

              <div className="flex items-center justify-between pt-4">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-5 py-3 rounded-xl bg-[#E8E8E5] hover:bg-neutral-300 text-[#1C1C1C] text-xs font-bold flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>

                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="px-7 py-3.5 rounded-xl bg-[#F59E0B] hover:bg-[#D97706] text-[#1C1C1C] hover:text-white font-extrabold text-xs shadow-md flex items-center gap-2"
                >
                  <span>Proceed to Final Step</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Customer Information & Submission */}
          {step === 3 && (
            <form onSubmit={handleFormSubmit} className="space-y-6 animate-in fade-in duration-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-[#1C1C1C] font-display">
                  Step 3: Client Contact Details
                </h2>
                <span className="text-xs text-emerald-700 font-bold flex items-center gap-1">
                  <ShieldCheck className="w-4 h-4" /> 100% Confidential
                </span>
              </div>

              {/* Summary Pill */}
              <div className="bg-[#F5F5F3] p-4 rounded-2xl border border-neutral-200 text-xs space-y-1">
                <span className="text-[#737373] block font-semibold">Review Selection:</span>
                <div className="flex flex-wrap gap-2 text-[#1C1C1C] font-bold">
                  <span className="px-2 py-0.5 rounded bg-[#FFFFFF] border border-neutral-200 text-[#D97706]">{activeCategoryObj.name}</span>
                  <span className="px-2 py-0.5 rounded bg-[#FFFFFF] border border-neutral-200">{projectType}</span>
                  <span className="px-2 py-0.5 rounded bg-[#FFFFFF] border border-neutral-200">{location || 'Warangal Region'}</span>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[#1C1C1C] mb-1.5">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Suresh Reddy"
                    value={customerName}
                    onChange={e => setCustomerName(e.target.value)}
                    className="w-full bg-[#F5F5F3] border border-neutral-300 focus:border-[#F59E0B] rounded-xl px-4 py-3 text-xs text-[#1C1C1C] outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#1C1C1C] mb-1.5">
                      Phone Number (WhatsApp Preferred) *
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3.5 top-3.5 w-4 h-4 text-[#737373]" />
                      <input
                        type="tel"
                        required
                        placeholder="e.g. 98480 22334"
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                        className="w-full bg-[#F5F5F3] border border-neutral-300 focus:border-[#F59E0B] rounded-xl pl-10 pr-4 py-3 text-xs text-[#1C1C1C] outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1C1C1C] mb-1.5">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      placeholder="e.g. suresh.reddy@gmail.com"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      className="w-full bg-[#F5F5F3] border border-neutral-300 focus:border-[#F59E0B] rounded-xl px-4 py-3 text-xs text-[#1C1C1C] outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-5 py-3 rounded-xl bg-[#E8E8E5] hover:bg-neutral-300 text-[#1C1C1C] text-xs font-bold flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-3.5 rounded-xl bg-[#F59E0B] hover:bg-[#D97706] text-[#1C1C1C] hover:text-white font-black text-xs sm:text-sm shadow-md flex items-center gap-2 transition-all hover:scale-105 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Registering with AMK INFRA...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Submit & Generate Tracking Code</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

          {/* STEP 4: Success & Tracking Code */}
          {step === 4 && submittedInquiry && (
            <div className="space-y-6 text-center animate-in zoom-in-95 duration-300">
              
              <div className="w-16 h-16 rounded-3xl bg-emerald-100 text-emerald-700 border border-emerald-300 flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-8 h-8 stroke-[2.5]" />
              </div>

              <div className="space-y-2">
                <h2 className="text-2xl sm:text-3xl font-display font-black text-[#1C1C1C]">
                  Request Registered Successfully!
                </h2>
                <p className="text-xs sm:text-sm text-[#4B4B4B] max-w-md mx-auto">
                  Your project has been assigned to <strong className="text-[#1C1C1C]">{submittedInquiry.divisionName}</strong> under Chief Engineer <strong className="text-[#D97706]">{submittedInquiry.assignedEngineer}</strong>.
                </p>
              </div>

              {/* Tracking ID Badge Box */}
              <div className="bg-[#F5F5F3] border border-[#F59E0B]/50 rounded-2xl p-5 max-w-md mx-auto space-y-3">
                <span className="text-xs text-[#737373] uppercase tracking-wider block font-bold">
                  Your Official Project Tracking Code
                </span>
                
                <div className="flex items-center justify-center gap-3">
                  <span className="text-2xl sm:text-3xl font-mono font-black text-[#D97706] tracking-wider">
                    {submittedInquiry.id}
                  </span>
                  <button
                    onClick={copyTrackingCode}
                    className="p-2 rounded-xl bg-[#FFFFFF] hover:bg-neutral-200 text-[#1C1C1C] border border-neutral-300 transition-colors"
                    title="Copy Tracking ID"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
                
                <p className="text-[11px] text-[#737373]">
                  Save this code to check real-time milestone updates anytime.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-md transition-all"
                >
                  <MessageSquare className="w-4 h-4 fill-current" />
                  <span>Connect with Engineer on WhatsApp</span>
                </a>

                <button
                  onClick={() => navigateTo('tracker', { trackingCode: submittedInquiry.id })}
                  className="px-5 py-3.5 rounded-xl bg-[#1C1C1C] hover:bg-[#242424] text-[#F59E0B] font-bold text-xs sm:text-sm border border-neutral-700 transition-colors flex items-center gap-2"
                >
                  <Clock className="w-4 h-4" />
                  <span>Open Live Status Tracker</span>
                </button>

                <button
                  onClick={() => {
                    setMobileMode(true);
                    navigateTo('tracker', { trackingCode: submittedInquiry.id });
                  }}
                  className="px-4 py-3.5 rounded-xl bg-[#E8E8E5] hover:bg-neutral-300 text-[#1C1C1C] font-bold text-xs flex items-center gap-1.5 border border-neutral-300"
                >
                  <Smartphone className="w-4 h-4 text-[#D97706]" />
                  <span>View in Mobile App</span>
                </button>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
}

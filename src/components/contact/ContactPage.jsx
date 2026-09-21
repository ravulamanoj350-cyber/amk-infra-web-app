import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { api } from '../../api';
import {
  Phone,
  MessageSquare,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  Building2,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  ExternalLink
} from 'lucide-react';

export function ContactPage() {
  const { showToast, addNotification } = useApp();
  
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [service, setService] = useState('General Consultation');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);

  const faqs = [
    {
      q: "What areas in Telangana does AMK INFRA cover?",
      a: "We operate primarily across the tri-cities of Hanamkonda, Warangal, and Kazipet, as well as surrounding districts including Narsampet, Jangaon, Station Ghanpur, and Greater Hyderabad corridors."
    },
    {
      q: "How does AMK INFRA calculate construction cost per sq.ft?",
      a: "Our basic residential rate starts from ₹1,650/sq.ft for Standard package, ₹1,950/sq.ft for Premium grade (with Fe-550 TMT, Teak main doors, and Vitrified tiles), and ₹2,400+/sq.ft for Luxury signature homes. We provide an itemized BOQ so you see exact material costs."
    },
    {
      q: "Do you assist with municipal building permissions (GWMC/GHMC)?",
      a: "Yes! AMK INFRA provides complete end-to-end architectural plan drawings, structural calculations, and municipal sanction assistance with local civic authorities."
    },
    {
      q: "Can I monitor daily site progress if I am not in Warangal / living abroad?",
      a: "Absolutely. Founder A. Charan Patel and our civil supervisors provide daily WhatsApp video updates, drone footage for large projects, and milestone logs updated directly in our online tracking system."
    }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      showToast('Error', 'Please enter your name and phone number.', 'error');
      return;
    }

    setSubmitting(true);
    try {
      // Create quick inquiry in backend
      const res = await api.createInquiry({
        customerName: name.trim(),
        phone: phone.trim(),
        email: email ? email.trim() : '',
        serviceCategory: 'residential',
        projectType: `Contact Form Message: ${service}`,
        location: 'Hanamkonda / Warangal Area',
        details: message.trim()
      });

      if (res.success) {
        setSubmitted(true);
        showToast('Message Sent!', 'A. Charan Patel will contact you shortly.', 'success');
        addNotification({
          title: 'Contact Form Message',
          message: `Thank you, ${name}. Your message has been routed to our Hanamkonda engineering team.`,
          type: 'success'
        });
      }
    } catch (err) {
      showToast('Error', 'Could not send message. Please call 9032477292 directly.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="py-16 bg-[#F5F5F3] text-[#4B4B4B] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white text-[#D97706] text-xs font-bold border border-[#F59E0B]/30 shadow-sm">
            <Phone className="w-3.5 h-3.5 text-[#F59E0B]" />
            <span>Connect with AMK INFRA</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-display font-black tracking-tight text-[#1C1C1C]">
            We Are Ready to Build Your{' '}
            <span className="text-[#D97706]">
              Next Vision.
            </span>
          </h1>
          <p className="text-[#4B4B4B] text-sm sm:text-base leading-relaxed">
            Reach out to Managing Director <strong className="text-[#1C1C1C]">A. Charan Patel</strong> and the engineering desk for site visits, project estimations, or urgent tenders.
          </p>
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Col: Contact Cards & Map */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Quick Contact Cards */}
            <div className="space-y-3.5">
              <a
                href="tel:9032477292"
                className="p-5 rounded-2xl bg-[#FFFFFF] border border-neutral-200 shadow-sm hover:border-[#F59E0B] transition-all flex items-center gap-4 group"
              >
                <div className="w-12 h-12 rounded-xl bg-[#F59E0B]/15 group-hover:bg-[#F59E0B] text-[#F59E0B] group-hover:text-[#1C1C1C] flex items-center justify-center font-bold transition-colors">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] text-[#737373] uppercase font-bold block">Direct Helpline / Call</span>
                  <strong className="text-[#1C1C1C] text-base group-hover:text-[#D97706] font-mono transition-colors">+91 90324 77292</strong>
                  <span className="text-[11px] text-[#737373] block">Founder: A. Charan Patel</span>
                </div>
              </a>

              <a
                href="https://wa.me/919032477292?text=Hello%20AMK%20INFRA%2C%20I%20want%20to%20inquire%20about%20construction%20services."
                target="_blank"
                rel="noreferrer"
                className="p-5 rounded-2xl bg-[#FFFFFF] border border-neutral-200 shadow-sm hover:border-emerald-500/40 transition-all flex items-center gap-4 group"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-50 group-hover:bg-emerald-600 text-emerald-600 group-hover:text-white flex items-center justify-center font-bold transition-colors">
                  <MessageSquare className="w-6 h-6 fill-current" />
                </div>
                <div>
                  <span className="text-[10px] text-[#737373] uppercase font-bold block">Instant WhatsApp Chat</span>
                  <strong className="text-[#1C1C1C] text-base group-hover:text-emerald-600 font-mono transition-colors">+91 90324 77292</strong>
                  <span className="text-[11px] text-[#737373] block">Fast 15-minute response time</span>
                </div>
              </a>

              <div className="p-5 rounded-2xl bg-[#FFFFFF] border border-neutral-200 shadow-sm flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#F5F5F3] text-[#1C1C1C] flex items-center justify-center font-bold border border-neutral-200">
                  <MapPin className="w-6 h-6 text-[#F59E0B]" />
                </div>
                <div>
                  <span className="text-[10px] text-[#737373] uppercase font-bold block">Headquarters Address</span>
                  <strong className="text-[#1C1C1C] text-xs block leading-relaxed">
                    Opp. Collectorate Office, Subedari, Hanamkonda, Warangal, Telangana - 506001
                  </strong>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-[#FFFFFF] border border-neutral-200 shadow-sm flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#F5F5F3] text-[#1C1C1C] flex items-center justify-center font-bold border border-neutral-200">
                  <Clock className="w-6 h-6 text-[#F59E0B]" />
                </div>
                <div>
                  <span className="text-[10px] text-[#737373] uppercase font-bold block">Working Hours</span>
                  <strong className="text-[#1C1C1C] text-xs block">
                    Mon - Sat: 8:30 AM - 8:00 PM<br />Sun: 10:00 AM - 4:00 PM
                  </strong>
                </div>
              </div>
            </div>

            {/* Google Maps Anchor */}
            <div className="p-5 rounded-2xl bg-[#FFFFFF] border border-neutral-200 shadow-sm flex items-center justify-between">
              <span className="text-xs text-[#4B4B4B]">Locate office on Google Maps</span>
              <a
                href="https://maps.google.com/?q=Subedari,Hanamkonda,Warangal,Telangana"
                target="_blank"
                rel="noreferrer"
                className="text-xs font-bold text-[#D97706] hover:underline flex items-center gap-1"
              >
                <span>Open Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Right Col: Contact Message Form */}
          <div className="lg:col-span-7">
            <div className="bg-[#FFFFFF] p-8 sm:p-10 rounded-2xl border border-neutral-200/90 shadow-lg space-y-6">
              
              <div>
                <h3 className="text-2xl font-bold text-[#1C1C1C] font-display">
                  Send a Direct Message
                </h3>
                <p className="text-xs text-[#737373] mt-1">
                  Fill out the form below and Founder A. Charan Patel or an engineer will contact you promptly.
                </p>
              </div>

              {submitted ? (
                <div className="py-12 text-center space-y-3 animate-in zoom-in-95">
                  <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 mx-auto flex items-center justify-center border border-emerald-200">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h4 className="text-xl font-bold text-[#1C1C1C]">Thank You! Message Received</h4>
                  <p className="text-xs text-[#4B4B4B] max-w-sm mx-auto">
                    We have received your message. Our team in Subedari, Hanamkonda will call you within 2 hours.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setName('');
                      setPhone('');
                      setMessage('');
                    }}
                    className="px-5 py-2.5 rounded-xl bg-[#F5F5F3] hover:bg-[#E8E8E5] text-[#1C1C1C] text-xs font-bold border border-neutral-300"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-[#1C1C1C] mb-1">Your Full Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. A. Madhusudhan Reddy"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        className="w-full bg-[#F5F5F3] border border-neutral-300 focus:border-[#F59E0B] rounded-xl px-4 py-3 text-[#1C1C1C] outline-none"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-[#1C1C1C] mb-1">Phone Number *</label>
                      <input
                        type="tel"
                        required
                        placeholder="98XXXXXXXX"
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                        className="w-full bg-[#F5F5F3] border border-neutral-300 focus:border-[#F59E0B] rounded-xl px-4 py-3 text-[#1C1C1C] outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-[#1C1C1C] mb-1">Email Address (Optional)</label>
                      <input
                        type="email"
                        placeholder="client@gmail.com"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        className="w-full bg-[#F5F5F3] border border-neutral-300 focus:border-[#F59E0B] rounded-xl px-4 py-3 text-[#1C1C1C] outline-none"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-[#1C1C1C] mb-1">Service Interested In</label>
                      <select
                        value={service}
                        onChange={e => setService(e.target.value)}
                        className="w-full bg-[#F5F5F3] border border-neutral-300 focus:border-[#F59E0B] rounded-xl px-4 py-3 text-[#1C1C1C] outline-none"
                      >
                        <option value="General Consultation">General Consultation</option>
                        <option value="Residential Custom Villa">Residential Custom Villa</option>
                        <option value="Commercial Construction">Commercial Complex</option>
                        <option value="Infrastructure Works">Infrastructure & Roadways</option>
                        <option value="Renovation">Renovation & Remodeling</option>
                        <option value="Interior Design">3D Interior Design</option>
                        <option value="CC Camera / Security">CC Camera / Security</option>
                        <option value="Electrical Works">Electrical & Smart Power</option>
                        <option value="Painting Works">Painting & Waterproofing</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-[#1C1C1C] mb-1">Project Details / Question</label>
                    <textarea
                      rows="4"
                      placeholder="Tell us about your plot location, size, or specific construction requirements..."
                      value={message}
                      onChange={e => setMessage(e.target.value)}
                      className="w-full bg-[#F5F5F3] border border-neutral-300 focus:border-[#F59E0B] rounded-xl p-4 text-[#1C1C1C] outline-none resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-4 rounded-xl bg-[#F59E0B] hover:bg-[#D97706] text-[#1C1C1C] hover:text-white font-black text-sm shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>{submitting ? 'Sending Message...' : 'Send Inquiry to AMK Team'}</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* FAQs Accordion */}
        <div className="bg-[#FFFFFF] p-8 rounded-2xl border border-neutral-200 shadow-sm space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-1">
            <h3 className="text-2xl font-bold text-[#1C1C1C] font-display">
              Frequently Asked Questions
            </h3>
            <p className="text-xs text-[#737373]">
              Clear answers regarding our construction contracts, billing, and timelines.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="bg-[#F5F5F3] rounded-xl border border-neutral-200 overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                    className="w-full p-4 text-left flex items-center justify-between gap-4 text-xs sm:text-sm font-bold text-[#1C1C1C] hover:text-[#D97706] transition-colors"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? <ChevronUp className="w-4 h-4 text-[#F59E0B]" /> : <ChevronDown className="w-4 h-4 text-[#737373]" />}
                  </button>

                  {isOpen && (
                    <div className="px-4 pb-4 text-xs text-[#4B4B4B] leading-relaxed border-t border-neutral-200 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}

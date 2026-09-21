import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { api } from '../../api';
import { Star, MessageSquarePlus, Quote, CheckCircle2, ShieldCheck } from 'lucide-react';

export function TestimonialsSection() {
  const { showToast } = useApp();
  const [testimonials, setTestimonials] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [location, setLocation] = useState('');
  const [serviceTag, setServiceTag] = useState('Residential Construction');
  const [rating, setRating] = useState(5);
  const [content, setContent] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    async function loadTestimonials() {
      try {
        const res = await api.getTestimonials();
        if (res.success) {
          setTestimonials(res.data);
        }
      } catch (err) {
        console.error('Testimonials load error', err);
      }
    }
    loadTestimonials();
  }, []);

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!name.trim() || !content.trim()) return;

    setSubmitting(true);
    try {
      const res = await api.createTestimonial({
        name,
        role: role || 'Homeowner',
        location: location || 'Hanamkonda',
        serviceTag,
        rating,
        content
      });

      if (res.success) {
        setTestimonials(prev => [res.data, ...prev]);
        showToast('Review Submitted', 'Thank you for your feedback!', 'success');
        setModalOpen(false);
        setName('');
        setRole('');
        setContent('');
      }
    } catch (err) {
      showToast('Error', 'Could not submit review', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="py-20 bg-[#E8E8E5] text-[#4B4B4B] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white text-[#D97706] text-xs font-bold border border-[#F59E0B]/30 shadow-sm">
              <Star className="w-3.5 h-3.5 fill-[#F59E0B] text-[#F59E0B]" />
              <span>Client Satisfaction</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-black text-[#1C1C1C]">
              What Our Clients Say About{' '}
              <span className="text-[#D97706]">AMK INFRA</span>
            </h2>
            <p className="text-[#4B4B4B] text-xs sm:text-sm max-w-xl">
              Real reviews from villa owners, commercial developers, and government infrastructure stakeholders in Hanamkonda and Warangal.
            </p>
          </div>

          <button
            onClick={() => setModalOpen(true)}
            className="px-5 py-3 rounded-xl bg-white hover:bg-[#F5F5F3] text-[#1C1C1C] font-bold text-xs border border-neutral-300 shadow-sm transition-all flex items-center gap-2 self-start md:self-auto hover:border-[#F59E0B]"
          >
            <MessageSquarePlus className="w-4 h-4 text-[#F59E0B]" />
            <span>Leave a Review</span>
          </button>
        </div>

        {/* Testimonials Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map(item => (
            <div
              key={item.id}
              className="p-6 rounded-2xl bg-[#FFFFFF] border border-neutral-200/90 shadow-sm hover:shadow-xl hover:border-[#F59E0B] transition-all flex flex-col justify-between relative group"
            >
              <Quote className="absolute top-6 right-6 w-8 h-8 text-neutral-200 group-hover:text-[#F59E0B]/20 transition-colors" />

              <div className="space-y-4">
                {/* Rating Stars */}
                <div className="flex items-center gap-1 text-[#F59E0B]">
                  {[...Array(item.rating || 5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                  <span className="text-xs font-bold text-[#1C1C1C] ml-1">5.0</span>
                </div>

                {/* Content */}
                <p className="text-xs text-[#4B4B4B] leading-relaxed italic">
                  "{item.content}"
                </p>

                <div className="inline-block px-2.5 py-0.5 rounded-md bg-[#F5F5F3] text-[#D97706] text-[10px] font-bold border border-neutral-200">
                  {item.serviceTag}
                </div>
              </div>

              {/* Author Info */}
              <div className="pt-4 mt-4 border-t border-neutral-100 flex items-center gap-3">
                <img
                  src={item.avatar}
                  alt={item.name}
                  className="w-10 h-10 rounded-full object-cover border-2 border-[#F59E0B]/40"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="text-xs font-bold text-[#1C1C1C]">{item.name}</h4>
                    {item.verified && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" title="Verified Client" />
                    )}
                  </div>
                  <p className="text-[10px] text-[#737373]">{item.role} • {item.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Review Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in">
          <div className="bg-[#1C1C1C] border border-neutral-800 rounded-2xl p-6 max-w-md w-full text-[#A8A8A2] shadow-2xl">
            <h3 className="text-lg font-bold text-white font-display mb-1">
              Leave Client Feedback
            </h3>
            <p className="text-xs text-[#737373] mb-4">
              Share your project experience with A. Charan Patel and AMK INFRA.
            </p>

            <form onSubmit={handleSubmitReview} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold mb-1 text-[#A8A8A2]">Your Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Kumar"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full bg-[#242424] border border-neutral-700 rounded-xl px-3 py-2 text-white outline-none focus:border-[#F59E0B]"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-semibold mb-1 text-[#A8A8A2]">Role / Project</label>
                  <input
                    type="text"
                    placeholder="e.g. Villa Owner"
                    value={role}
                    onChange={e => setRole(e.target.value)}
                    className="w-full bg-[#242424] border border-neutral-700 rounded-xl px-3 py-2 text-white outline-none focus:border-[#F59E0B]"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1 text-[#A8A8A2]">Location in Warangal</label>
                  <input
                    type="text"
                    placeholder="e.g. Hanamkonda"
                    value={location}
                    onChange={e => setLocation(e.target.value)}
                    className="w-full bg-[#242424] border border-neutral-700 rounded-xl px-3 py-2 text-white outline-none focus:border-[#F59E0B]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1 text-[#A8A8A2]">Service Availed</label>
                <select
                  value={serviceTag}
                  onChange={e => setServiceTag(e.target.value)}
                  className="w-full bg-[#242424] border border-neutral-700 rounded-xl px-3 py-2 text-white outline-none focus:border-[#F59E0B]"
                >
                  <option value="Residential Construction">Residential Custom Home</option>
                  <option value="Commercial Construction">Commercial Complex</option>
                  <option value="Infrastructure">Infrastructure & Roadways</option>
                  <option value="Interior Design">Interior Design & Fitouts</option>
                  <option value="Renovation">Home & Office Renovation</option>
                  <option value="CC Camera & Security">CC Camera / Security</option>
                  <option value="Electrical Works">Electrical & Smart Power</option>
                  <option value="Painting Works">Painting & Waterproofing</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold mb-1 text-[#A8A8A2]">Rating (1 to 5 Stars)</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map(star => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className={`p-2 rounded-xl border flex items-center justify-center transition-colors ${
                        rating >= star
                          ? 'bg-[#F59E0B]/20 text-[#F59E0B] border-[#F59E0B]/50'
                          : 'bg-[#242424] text-neutral-600 border-neutral-700'
                      }`}
                    >
                      <Star className="w-5 h-5 fill-current" />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1 text-[#A8A8A2]">Your Review *</label>
                <textarea
                  required
                  rows="3"
                  placeholder="Tell us about the project quality, team communication, and timeline..."
                  value={content}
                  onChange={e => setContent(e.target.value)}
                  className="w-full bg-[#242424] border border-neutral-700 rounded-xl p-3 text-white outline-none focus:border-[#F59E0B] resize-none"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="flex-1 py-2.5 rounded-xl bg-[#242424] text-[#A8A8A2] hover:text-white font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 py-2.5 rounded-xl bg-[#F59E0B] text-[#1C1C1C] hover:bg-[#D97706] hover:text-white font-extrabold shadow-md transition-colors"
                >
                  {submitting ? 'Submitting...' : 'Post Review'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}

import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { api } from '../../api';
import {
  Building2,
  MapPin,
  Calendar,
  IndianRupee,
  ArrowRight,
  Maximize2,
  Tag,
  CheckCircle2
} from 'lucide-react';

export function FeaturedPortfolio() {
  const { navigateTo } = useApp();
  const [projects, setProjects] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [loading, setLoading] = useState(false);

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'residential', label: 'Villas & Homes' },
    { id: 'construction', label: 'Commercial' },
    { id: 'infrastructure', label: 'Infrastructure' },
    { id: 'interior', label: 'Interiors' },
    { id: 'renovation', label: 'Renovation' }
  ];

  useEffect(() => {
    async function loadPortfolio() {
      setLoading(true);
      try {
        const res = await api.getPortfolio(activeCategory);
        if (res.success) {
          setProjects(res.data);
        }
      } catch (err) {
        console.error('Error fetching portfolio', err);
      } finally {
        setLoading(false);
      }
    }
    loadPortfolio();
  }, [activeCategory]);

  return (
    <section className="py-20 bg-[#1C1C1C] text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#242424] text-[#F59E0B] text-xs font-bold border border-[#F59E0B]/30 shadow-sm">
              <Building2 className="w-3.5 h-3.5" />
              <span>Demonstrated Excellence</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-black text-white">
              Featured Project{' '}
              <span className="text-[#F59E0B]">
                Portfolio
              </span>
            </h2>
            <p className="text-[#A8A8A2] text-xs sm:text-sm max-w-xl">
              Take an interactive tour of our recent landmark constructions and infrastructure achievements in Warangal, Hanamkonda, and across Telangana.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeCategory === cat.id
                    ? 'bg-[#F59E0B] text-[#1C1C1C] shadow-sm'
                    : 'bg-[#242424] text-[#A8A8A2] border border-neutral-800 hover:bg-[#2d2d2d] hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.slice(0, 6).map(project => (
            <div
              key={project.id}
              className="group bg-[#242424] rounded-2xl overflow-hidden border border-neutral-800 hover:border-[#F59E0B] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl flex flex-col justify-between"
            >
              <div>
                {/* Image & Badge */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1C1C1C] via-transparent to-transparent" />
                  
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-md bg-[#1C1C1C]/90 backdrop-blur-md text-[#F59E0B] text-[11px] font-bold border border-neutral-700 shadow-sm">
                      {project.categoryLabel || project.category}
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 flex justify-between items-center text-xs">
                    <span className="text-white flex items-center gap-1 font-semibold bg-[#141414]/80 px-2 py-0.5 rounded backdrop-blur-sm">
                      <MapPin className="w-3.5 h-3.5 text-[#F59E0B]" />
                      {project.location}
                    </span>
                    <span className="text-[#F59E0B] font-extrabold bg-[#141414]/80 px-2.5 py-0.5 rounded backdrop-blur-sm">
                      {project.cost}
                    </span>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-5 space-y-3">
                  <h3 className="text-base font-bold text-white group-hover:text-[#F59E0B] transition-colors line-clamp-1">
                    {project.title}
                  </h3>
                  
                  <p className="text-xs text-[#A8A8A2] leading-relaxed line-clamp-2">
                    {project.description}
                  </p>

                  {/* Highlights Tags */}
                  {project.highlights && (
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {project.highlights.slice(0, 3).map((h, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded bg-[#181818] text-[#A8A8A2] text-[10px] font-semibold border border-neutral-700"
                        >
                          ✓ {h}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Card Footer */}
              <div className="p-5 pt-0 border-t border-neutral-800 mt-3 flex items-center justify-between text-xs">
                <span className="text-[#737373] text-[11px]">Area: <strong className="text-white">{project.area}</strong></span>
                <button
                  onClick={() => navigateTo('portfolio')}
                  className="text-[#F59E0B] hover:text-[#D97706] font-bold flex items-center gap-1 transition-colors"
                >
                  <span>View Details</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-12 text-center">
          <button
            onClick={() => navigateTo('portfolio')}
            className="px-8 py-3.5 rounded-xl bg-[#242424] hover:bg-[#2d2d2d] text-white font-bold text-xs border border-neutral-700 hover:border-[#F59E0B] transition-all shadow-md inline-flex items-center gap-2"
          >
            <span>Explore Complete AMK Portfolio & Gallery (12+ Projects)</span>
            <ArrowRight className="w-4 h-4 text-[#F59E0B]" />
          </button>
        </div>
      </div>
    </section>
  );
}

import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Clock, MapPin, ArrowRight, Tag, Calendar, SlidersHorizontal, ChevronDown, ChevronUp, CheckCircle, Users, X, Filter, DollarSign, Globe, Check } from 'lucide-react';
import { DataService } from '../services/db';
import { Program, ProgramType } from '../types';

const Programs: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [programs, setPrograms] = useState<Program[]>([]);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [isFilterExpanded, setIsFilterExpanded] = useState(true);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const lastScrollY = useRef(0);
  const [searchParams] = useSearchParams();

  const [filters, setFilters] = useState({
    age: "",
    language: "",
    type: "",
    country: "",
    budget: "",
  });

  useEffect(() => {
    const fetchPrograms = async () => {
        setIsLoading(true);
        try {
            const data = await DataService.getPrograms();
            setPrograms(data || []);
        } catch (err) {
            console.error(err);
            setPrograms([]);
        } finally {
            setIsLoading(false);
        }
    };
    fetchPrograms();
  }, []);

  useEffect(() => {
    const countryParam = searchParams.get('country');
    const typeParam = searchParams.get('type');
    
    if (countryParam || typeParam) {
        setFilters(prev => ({ 
          ...prev, 
          country: countryParam || prev.country,
          type: typeParam || prev.type
        }));
    }
  }, [searchParams]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY.current;
      if (delta > 0 && currentScrollY > 100) {
        setIsFilterExpanded(false);
        setActiveDropdown(null);
      } else if (currentScrollY < 50) {
        setIsFilterExpanded(true);
      }
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ 
        ...prev, 
        [key]: value === "" ? "" : (prev[key as keyof typeof prev] === value ? "" : value) 
    }));
  };

  const clearFilters = () => {
    setFilters({ age: "", language: "", type: "", country: "", budget: "" });
    setActiveDropdown(null);
  };

  const filteredPrograms = useMemo(() => {
    return programs.filter(program => {
      if (filters.type && program.type !== filters.type) return false;
      if (filters.country && program.country !== filters.country) return false;
      if (filters.language && program.language !== filters.language) return false;
      
      if (filters.age) {
          const matches = program.ageRange?.includes(filters.age) || program.tags?.some(t => t.includes(filters.age));
          if (!matches) return false;
      }

      if (filters.budget) {
        const price = program.priceRangeNumeric || 0;
        if (filters.budget === "10萬以下" && price >= 100000) return false;
        if (filters.budget === "10萬-20萬" && (price < 100000 || price > 200000)) return false;
        if (filters.budget === "20萬以上" && price <= 200000) return false;
      }
      return true;
    });
  }, [filters, programs]);

  const activeFilterCount = Object.values(filters).filter(Boolean).length;

  const FilterDropdown = ({ label, value, options, filterKey, icon: Icon }: any) => {
    const isOpen = activeDropdown === filterKey;
    return (
      <div className="relative">
        <button
          onClick={(e) => { e.stopPropagation(); setActiveDropdown(isOpen ? null : filterKey); }}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-full border text-[11px] font-bold tracking-widest uppercase transition-all duration-300 ${
            value || isOpen ? 'border-brand-accent bg-brand-accent text-brand-primary' : 'border-white/10 bg-white/5 text-brand-secondary hover:border-brand-accent'
          }`}
        >
          {Icon && <Icon size={14} className="opacity-50" />}
          <span>{value || label}</span>
          <ChevronDown size={14} className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
        </button>
        {isOpen && (
           <div className="absolute top-[120%] left-0 w-60 bg-brand-primary rounded-2xl shadow-zen border border-white/5 z-50 overflow-hidden animate-fade-in py-2">
              <button onClick={() => { handleFilterChange(filterKey, ""); setActiveDropdown(null); }} className="w-full text-left px-6 py-3 text-xs text-brand-sub hover:bg-white/5 hover:text-brand-accent">All {label}</button>
              {options.map((opt: string) => (
                 <button key={opt} onClick={() => { handleFilterChange(filterKey, opt); setActiveDropdown(null); }} className={`w-full text-left px-6 py-3 text-xs flex justify-between items-center transition-colors ${value === opt ? 'bg-brand-accent/10 text-brand-accent font-bold' : 'text-brand-secondary/70 hover:bg-white/5 hover:text-brand-accent'}`}>
                    <span>{opt}</span>
                    {value === opt && <Check size={14} />}
                 </button>
              ))}
           </div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-brand-primary min-h-screen pt-32">
      <div className="container mx-auto px-6 lg:px-12 mb-16">
        <div className="text-center max-w-3xl mx-auto space-y-6">
          <span className="text-brand-accent font-bold tracking-[0.5em] uppercase text-[10px] block mb-4">Curated Programs</span>
          <h1 className="text-5xl md:text-7xl font-serif font-black text-brand-secondary leading-tight">遊學行 <span className="text-brand-accent/50">Programs</span></h1>
          <p className="text-brand-sub font-light leading-relaxed">我們為您篩選最優質的海外教育資源。不論是插班微留學還是長期名校規劃，點石始終是您的最佳戰友。</p>
        </div>
      </div>

      <div className={`sticky top-20 z-40 bg-brand-primary/95 backdrop-blur-md border-y border-white/5 py-4 transition-all duration-500`}>
        <div className="container mx-auto px-6 lg:px-12 flex flex-wrap items-center gap-4">
          <div className="hidden md:flex items-center gap-4">
            <FilterDropdown label="方案類型" value={filters.type} options={Object.values(ProgramType)} filterKey="type" icon={Tag} />
            <FilterDropdown label="國家" value={filters.country} options={["New Zealand", "UK", "USA", "Australia"]} filterKey="country" icon={MapPin} />
            <FilterDropdown label="適合年齡" value={filters.age} options={["5-11 歲", "13-18 歲", "18 歲以上"]} filterKey="age" icon={Users} />
            <FilterDropdown label="預算" value={filters.budget} options={["10萬以下", "10萬-20萬", "20萬以上"]} filterKey="budget" icon={DollarSign} />
          </div>
          {activeFilterCount > 0 && (
            <button onClick={clearFilters} className="text-[10px] font-bold text-brand-accent flex items-center gap-2 hover:bg-white/5 px-4 py-2 rounded-full transition-all">
              <X size={12} /> CLEAR FILTERS ({activeFilterCount})
            </button>
          )}
        </div>
      </div>

      <div className="container mx-auto px-6 lg:px-12 py-20">
        {filteredPrograms.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {filteredPrograms.map(program => (
              <Link to={`/programs/${program.id}`} key={program.id} className="group relative bg-white/5 rounded-[40px] overflow-hidden border border-white/5 hover:border-brand-accent/30 transition-all duration-500 hover:-translate-y-2">
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={program.image} className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700" alt={program.title} />
                  <div className="absolute top-6 left-6 bg-brand-accent text-brand-primary px-4 py-1.5 rounded-full font-black text-[9px] uppercase tracking-widest shadow-xl">
                    {program.type}
                  </div>
                </div>
                <div className="p-10 space-y-6">
                  <div className="flex items-center justify-between text-brand-sub text-[10px] font-bold uppercase tracking-widest">
                    <span className="flex items-center gap-1"><MapPin size={12}/> {program.city}</span>
                    <span className="flex items-center gap-1"><Clock size={12}/> {program.duration}</span>
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-brand-secondary group-hover:text-brand-accent transition-colors leading-snug">
                    {program.title}
                  </h3>
                  <div className="text-brand-accent font-black text-lg tracking-tight">
                    {program.price}
                  </div>
                  <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                     <span className="text-[10px] font-bold tracking-[0.2em] text-brand-sub group-hover:text-brand-secondary uppercase">View Detail</span>
                     <ArrowRight size={20} className="text-brand-accent group-hover:translate-x-2 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="py-40 text-center">
            <h2 className="text-3xl font-serif font-bold text-brand-secondary mb-4">找不到符合的方案</h2>
            <p className="text-brand-sub font-light mb-10">試著更換篩選條件，或是聯繫顧問為您特別安排。</p>
            <button onClick={clearFilters} className="px-10 py-4 bg-brand-accent text-brand-primary font-black rounded-full uppercase tracking-widest text-xs">Reset All Filters</button>
          </div>
        )}
      </div>
    </div>
  );
};
export default Programs;

import React, { useState, useMemo, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Clock, MapPin, Tag, ChevronDown, Users, X, DollarSign, Check, ArrowUpRight, Info } from 'lucide-react';
import { DataService } from '../services/db';
import { Program, ProgramType } from '../types';

const Programs: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [programs, setPrograms] = useState<Program[]>([]);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
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
      // 擴展 type 篩選邏輯，支援「大分類」
      if (filters.type) {
          if (filters.type === "Study Abroad" && program.type !== ProgramType.STUDY_ABROAD) return false;
          if (filters.type === "Language School" && 
             ![ProgramType.LANGUAGE_SCHOOL, ProgramType.SUMMER_CAMP, ProgramType.WINTER_CAMP, ProgramType.CULTURAL_TRIP].includes(program.type)) return false;
          if (filters.type === "Micro Study" && 
             ![ProgramType.MICRO_STUDY, ProgramType.PARENT_CHILD].includes(program.type)) return false;
      }
      
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
          className={`flex items-center gap-2 px-6 py-2.5 rounded-full border text-[10px] font-bold tracking-widest uppercase transition-all duration-300 ${
            value || isOpen ? 'border-brand-accent bg-brand-accent text-white' : 'border-brand-ink/10 bg-white text-brand-ink/60 hover:border-brand-accent'
          }`}
        >
          {Icon && <Icon size={14} className="opacity-50" />}
          <span>{value || label}</span>
          <ChevronDown size={14} className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
        </button>
        {isOpen && (
           <div className="absolute top-[120%] left-0 w-60 bg-white rounded-xl shadow-heavy border border-brand-border z-50 overflow-hidden animate-fade-in py-2">
              <button onClick={() => { handleFilterChange(filterKey, ""); setActiveDropdown(null); }} className="w-full text-left px-6 py-3 text-xs text-brand-sub hover:bg-brand-cream hover:text-brand-accent">All {label}</button>
              {options.map((opt: any) => (
                 <button key={opt.value || opt} onClick={() => { handleFilterChange(filterKey, opt.value || opt); setActiveDropdown(null); }} className={`w-full text-left px-6 py-3 text-xs flex justify-between items-center transition-colors ${value === (opt.value || opt) ? 'bg-brand-accent/5 text-brand-accent font-bold' : 'text-brand-ink/70 hover:bg-brand-cream hover:text-brand-accent'}`}>
                    <span>{opt.label || opt}</span>
                    {value === (opt.value || opt) && <Check size={14} />}
                 </button>
              ))}
           </div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-brand-cream min-h-screen pt-44">
      <div className="container mx-auto px-6 lg:px-12 mb-20">
        <div className="text-center max-w-3xl mx-auto space-y-6">
          <span className="text-brand-accent font-bold tracking-[0.5em] uppercase text-[10px] block mb-4">Curated Programs</span>
          <h1 className="text-6xl md:text-8xl font-serif font-black text-brand-ink leading-none tracking-tighter">課程列表 <span className="text-brand-accent/30 font-light italic">Courses</span></h1>
          <p className="text-brand-sub text-lg font-light leading-relaxed max-w-xl mx-auto mt-6">
            點石精選全球優質校園，從短期插班到長期留學，為不同階段的學習者提供最契合的教育方案。
          </p>
        </div>
      </div>

      <div className={`sticky top-20 z-40 bg-brand-cream/80 backdrop-blur-md border-y border-brand-border py-6 transition-all duration-500`}>
        <div className="container mx-auto px-6 lg:px-12 flex flex-wrap items-center justify-between gap-4">
          <div className="hidden md:flex items-center gap-4">
            <FilterDropdown 
              label="方案類型" 
              value={filters.type} 
              options={[
                { label: "留學", value: "Study Abroad" },
                { label: "遊學", value: "Language School" },
                { label: "微留學", value: "Micro Study" }
              ]} 
              filterKey="type" 
              icon={Tag} 
            />
            <FilterDropdown label="國家" value={filters.country} options={["New Zealand", "UK", "USA", "Australia"]} filterKey="country" icon={MapPin} />
            <FilterDropdown label="適合年齡" value={filters.age} options={["5-11 歲", "13-18 歲", "18 歲以上"]} filterKey="age" icon={Users} />
            <FilterDropdown label="預算" value={filters.budget} options={["10萬以下", "10萬-20萬", "20萬以上"]} filterKey="budget" icon={DollarSign} />
          </div>
          {activeFilterCount > 0 && (
            <button onClick={clearFilters} className="text-[10px] font-bold text-brand-accent flex items-center gap-2 hover:bg-brand-ink hover:text-white px-5 py-2.5 rounded-full transition-all border border-brand-accent/20">
              <X size={12} /> CLEAR FILTERS ({activeFilterCount})
            </button>
          )}
        </div>
      </div>

      <div className="container mx-auto px-6 lg:px-12 py-24">
        {isLoading ? (
           <div className="py-40 flex justify-center">
              <div className="w-12 h-12 border-2 border-brand-accent/20 border-t-brand-accent rounded-full animate-spin"></div>
           </div>
        ) : filteredPrograms.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredPrograms.map(program => (
              <Link to={`/programs/${program.id}`} key={program.id} className="group bg-white rounded-xl overflow-hidden border border-brand-border hover:shadow-heavy transition-all duration-500 hover:-translate-y-2 flex flex-col h-full relative">
                <div className="aspect-[16/10] overflow-hidden relative">
                  <img src={program.image} className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000" alt={program.title} />
                  
                  <div className="absolute top-6 left-6 bg-brand-ink/40 backdrop-blur-md text-white px-4 py-1.5 rounded-sm font-black text-[9px] uppercase tracking-widest shadow-sm z-10">
                    {program.type}
                  </div>

                  <div className="absolute inset-0 bg-brand-ink/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-center p-8 text-center z-20">
                    <Info size={24} className="text-brand-secondary mb-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75" />
                    <p className="text-white text-sm font-light leading-relaxed transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-100">
                      {program.description.length > 100 ? `${program.description.substring(0, 100)}...` : program.description}
                    </p>
                  </div>
                </div>

                <div className="p-10 flex-grow flex flex-col space-y-6">
                  <div className="flex items-center justify-between text-brand-sub text-[10px] font-bold uppercase tracking-widest">
                    <span className="flex items-center gap-1.5"><MapPin size={14} className="text-brand-accent"/> {program.city}</span>
                    <span className="flex items-center gap-1.5"><Clock size={14} className="text-brand-accent"/> {program.duration}</span>
                  </div>
                  <h3 className="text-2xl font-serif font-black text-brand-ink group-hover:text-brand-accent transition-colors leading-snug">
                    {program.title}
                  </h3>
                  <div className="text-brand-accent font-black text-2xl tracking-tight mt-auto">
                    {program.price}
                  </div>
                  <div className="pt-8 border-t border-brand-border flex items-center justify-between">
                     <span className="text-[10px] font-bold tracking-[0.2em] text-brand-sub group-hover:text-brand-ink uppercase">View Program</span>
                     <ArrowUpRight size={20} className="text-brand-accent group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="py-40 text-center">
            <h2 className="text-4xl font-serif font-black text-brand-ink mb-6">找不到符合的方案</h2>
            <p className="text-brand-sub font-light text-lg mb-12">試著更換篩選條件，或是聯繫顧問為您特別安排。</p>
            <button onClick={clearFilters} className="px-12 py-5 bg-brand-ink text-white font-black rounded-lg uppercase tracking-widest text-[10px]">Reset All Filters</button>
          </div>
        )}
      </div>
    </div>
  );
};
export default Programs;

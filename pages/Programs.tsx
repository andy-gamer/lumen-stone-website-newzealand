
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

  // Update filters based on URLSearchParams
  useEffect(() => {
    const countryParam = searchParams.get('country');
    // Note: We don't have a direct 'tag' filter in the main state object visible in dropdowns usually,
    // but the filter logic uses tags. We can add basic country/type support here.
    
    if (countryParam) {
        setFilters(prev => ({ ...prev, country: countryParam }));
    } else {
        // Reset country if not in URL? Or keep existing? 
        // Typically navigating to /programs clears filters unless params exist.
        // setFilters(prev => ({ ...prev, country: "" })); 
    }
  }, [searchParams]);

  // Scroll Listener for Auto-Collapse
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY.current;
      const isScrollingDown = delta > 0;

      if (isScrollingDown && currentScrollY > 100 && Math.abs(delta) > 10) {
        setIsFilterExpanded(false);
        setActiveDropdown(null); // Close dropdowns on scroll
      } else if (currentScrollY < 50) {
        setIsFilterExpanded(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Click Outside to Close Dropdowns
  useEffect(() => {
    const handleClickOutside = () => setActiveDropdown(null);
    if (activeDropdown) {
        window.addEventListener('click', handleClickOutside);
    }
    return () => window.removeEventListener('click', handleClickOutside);
  }, [activeDropdown]);

  const handleFilterChange = (key: string, value: string) => {
    // If value is empty (Clear/All), explicitly set to empty
    // If value matches current, toggle it off
    // Otherwise set new value
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
          if (filters.age === "成人") {
             const isAdult = program.ageRange?.includes("18") || program.ageRange?.includes("成人") || program.tags?.some(t => t.includes("成人"));
             if (!isAdult) return false;
          } else {
             const matches = program.ageRange?.includes(filters.age) || program.tags?.some(t => t.includes(filters.age));
             const range = program.ageRange || "";
             let inferredMatch = false;
             if (filters.age === "國小" && (range.includes("5-") || range.includes("7-") || range.includes("10-"))) inferredMatch = true;
             else if (filters.age === "國中" && (range.includes("13-") || range.includes("10-15"))) inferredMatch = true;
             else if (filters.age === "高中" && (range.includes("13-17") || range.includes("15-") || range.includes("16"))) inferredMatch = true;
             else if (filters.age === "大學生" && (range.includes("18") || range.includes("大學"))) inferredMatch = true;
             if (!matches && !inferredMatch) return false;
          }
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

  const ProgramSkeleton = () => (
    <div className="bg-white flex flex-col h-full border border-stone-100 p-6 rounded-3xl shadow-sm relative overflow-hidden">
      <div className="animate-pulse flex flex-col h-full">
        <div className="h-64 bg-stone-200 w-full mb-6 rounded-2xl" />
        <div className="flex justify-between items-center mb-3">
           <div className="h-4 bg-stone-200 w-20 rounded" />
           <div className="h-3 bg-stone-200 w-24 rounded" />
        </div>
        <div className="space-y-2 mb-4">
          <div className="h-6 bg-stone-200 w-full rounded" />
          <div className="h-6 bg-stone-200 w-2/3 rounded" />
        </div>
        <div className="flex gap-2 mb-4 pb-4 border-b border-stone-100">
           <div className="h-6 bg-stone-100 w-16 rounded-md" />
           <div className="h-6 bg-stone-100 w-16 rounded-md" />
           <div className="h-6 bg-stone-100 w-16 rounded-md" />
        </div>
        <div className="space-y-2 mb-4">
           <div className="flex gap-2 items-center">
              <div className="w-3 h-3 rounded-full bg-stone-200 shrink-0" />
              <div className="h-3 bg-stone-100 w-full rounded" />
           </div>
           <div className="flex gap-2 items-center">
              <div className="w-3 h-3 rounded-full bg-stone-200 shrink-0" />
              <div className="h-3 bg-stone-100 w-5/6 rounded" />
           </div>
        </div>
        <div className="mt-auto flex justify-between items-center pt-4 border-t border-stone-100">
           <div className="h-4 bg-stone-200 w-24 rounded" />
           <div className="h-4 bg-stone-200 w-8 rounded-full" />
        </div>
      </div>
    </div>
  );

  const TYPES = Object.values(ProgramType);
  const COUNTRIES = ["Taiwan", "UK", "USA", "Canada", "Australia", "New Zealand", "Japan", "Philippines"];
  const AGES = ["國小", "國中", "高中", "大學生", "成人"];
  const BUDGETS = ["10萬以下", "10萬-20萬", "20萬以上"];
  const LANGUAGES = ["English", "Japanese", "French", "Mandarin/English"];

  // Reusable Dropdown Component
  const FilterDropdown = ({ 
    label, 
    value, 
    options, 
    filterKey,
    icon: Icon
  }: { 
    label: string, 
    value: string, 
    options: string[], 
    filterKey: string,
    icon?: React.ElementType
  }) => {
    const isOpen = activeDropdown === filterKey;
    
    return (
      <div className="relative">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setActiveDropdown(isOpen ? null : filterKey);
          }}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-full border text-sm font-medium transition-all duration-200 whitespace-nowrap ${
            value || isOpen
              ? 'border-lumen-dark bg-lumen-dark text-white shadow-md' 
              : 'border-stone-200 bg-white text-stone-600 hover:border-lumen-accent hover:text-lumen-accent'
          }`}
        >
          {Icon && !value && <Icon size={14} className={isOpen ? 'text-white' : 'text-stone-400'} />}
          <span>{value || label}</span>
          <ChevronDown size={14} className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
        </button>
        
        {isOpen && (
           <div className="absolute top-[120%] left-0 w-60 bg-white rounded-xl shadow-xl border border-stone-100 z-50 overflow-hidden animate-fade-in origin-top-left">
              <div className="max-h-80 overflow-y-auto custom-scrollbar p-1.5 space-y-0.5">
                  <button
                     onClick={() => { handleFilterChange(filterKey, ""); setActiveDropdown(null); }}
                     className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition-colors ${!value ? 'bg-stone-50 font-bold text-lumen-dark' : 'text-stone-500 hover:bg-stone-50'}`}
                  >
                     All {label}
                  </button>
                  {options.map(opt => (
                     <button
                        key={opt}
                        onClick={() => { handleFilterChange(filterKey, opt); setActiveDropdown(null); }}
                        className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition-colors flex justify-between items-center ${value === opt ? 'bg-lumen-accent/10 text-lumen-dark font-bold' : 'text-stone-600 hover:bg-stone-50'}`}
                     >
                        <span>{opt}</span>
                        {value === opt && <Check size={14} className="text-lumen-accent"/>}
                     </button>
                  ))}
              </div>
           </div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-lumen-base min-h-screen font-sans">
      {/* Banner */}
      <div className="bg-lumen-base pt-16 pb-8 border-b border-lumen-dark/5">
        <div className="container mx-auto px-6 lg:px-12 text-center">
          <span className="text-lumen-accent font-serif text-xs tracking-[0.3em] uppercase block mb-4">Curated Journeys</span>
          <h1 className="text-4xl font-serif text-lumen-dark mb-6 font-bold">
            {filters.country === 'Taiwan' ? '國內營隊' : '精選遊學方案'}
          </h1>
          <div className="w-12 h-[1px] bg-lumen-dark mx-auto"></div>
        </div>
      </div>

      {/* Sticky Filter Bar */}
      <div className={`sticky top-20 md:top-24 z-30 bg-lumen-base/95 backdrop-blur border-b border-lumen-dark/5 shadow-sm transition-all duration-300`}>
        <div className="container mx-auto px-6 lg:px-12">
            
            {/* Desktop Filters: Horizontal Toolbar */}
            <div className={`hidden md:flex items-center gap-3 py-4 overflow-visible transition-all duration-500 ${isFilterExpanded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none absolute'}`}>
                <div className="flex items-center gap-2 mr-4 text-lumen-dark font-bold text-sm">
                    <SlidersHorizontal size={16} />
                    <span>篩選</span>
                </div>
                
                <FilterDropdown label="Type" value={filters.type} options={TYPES} filterKey="type" icon={Tag} />
                <FilterDropdown label="Country" value={filters.country} options={COUNTRIES} filterKey="country" icon={MapPin} />
                <FilterDropdown label="Age" value={filters.age} options={AGES} filterKey="age" icon={Users} />
                <FilterDropdown label="Language" value={filters.language} options={LANGUAGES} filterKey="language" icon={Globe} />
                <FilterDropdown label="Budget" value={filters.budget} options={BUDGETS} filterKey="budget" icon={DollarSign} />

                {activeFilterCount > 0 && (
                    <button 
                        onClick={clearFilters}
                        className="ml-auto text-xs font-bold text-stone-400 hover:text-red-400 flex items-center gap-1.5 transition-colors px-3 py-1.5 rounded-full hover:bg-red-50"
                    >
                        <X size={14} /> Clear All ({activeFilterCount})
                    </button>
                )}
            </div>

            {/* Mobile Filters: Collapsible Panel */}
            <div className="md:hidden py-2">
                <button 
                    onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
                    className={`w-full flex items-center justify-between px-4 py-3 bg-white border rounded-xl shadow-sm text-lumen-dark font-bold transition-colors ${isMobileFiltersOpen ? 'border-lumen-accent ring-1 ring-lumen-accent' : 'border-stone-200'}`}
                >
                    <div className="flex items-center gap-2">
                        <SlidersHorizontal size={18} />
                        <span>篩選條件 ({activeFilterCount})</span>
                    </div>
                    {isMobileFiltersOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {isMobileFiltersOpen && (
                    <div className="mt-3 p-4 bg-white border border-stone-200 rounded-xl shadow-lg animate-fade-in">
                        <div className="flex flex-wrap gap-3">
                            <FilterDropdown label="Type" value={filters.type} options={TYPES} filterKey="type" icon={Tag} />
                            <FilterDropdown label="Country" value={filters.country} options={COUNTRIES} filterKey="country" icon={MapPin} />
                            <FilterDropdown label="Age" value={filters.age} options={AGES} filterKey="age" icon={Users} />
                            <FilterDropdown label="Language" value={filters.language} options={LANGUAGES} filterKey="language" icon={Globe} />
                            <FilterDropdown label="Budget" value={filters.budget} options={BUDGETS} filterKey="budget" icon={DollarSign} />
                        </div>
                        {activeFilterCount > 0 && (
                            <div className="mt-4 pt-3 border-t border-stone-100 flex justify-end">
                                <button onClick={clearFilters} className="text-xs text-red-500 font-bold flex items-center gap-1 px-3 py-2 bg-red-50 rounded-lg">
                                    <X size={14} /> 清除所有條件
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>

        </div>
      </div>

      <div className="container mx-auto px-6 lg:px-12 py-16">
        
        {!isLoading && (
            <div className="mb-8 text-sm text-lumen-sub font-medium flex items-center justify-between">
                <span>Showing {filteredPrograms.length} result(s)</span>
                {filters.country === 'Taiwan' && <span className="text-lumen-accent font-bold">★ 國內精選</span>}
            </div>
        )}

        {isLoading ? (
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                {[1, 2, 3, 4, 5, 6].map(i => <ProgramSkeleton key={i} />)}
             </div>
        ) : filteredPrograms.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredPrograms.map(program => (
              <Link to={`/programs/${program.id}`} key={program.id} className="group flex flex-col h-full bg-white p-6 rounded-3xl shadow-sm hover:shadow-zen transition-all duration-500 border border-transparent hover:border-lumen-light/50 relative top-0 hover:-top-2">
                <div className="relative h-64 overflow-hidden mb-6 bg-stone-100 rounded-2xl">
                  <img src={program.image} alt={program.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 grayscale-[10%] group-hover:grayscale-0" />
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-3 py-1 text-xs font-bold text-lumen-dark rounded-lg shadow-sm">
                     {program.price}
                  </div>
                </div>
                
                <div className="flex flex-col flex-1">
                  <div className="flex justify-between items-center mb-3">
                     <span className="text-[10px] font-bold text-lumen-accent uppercase tracking-widest border border-lumen-accent/30 px-2 py-1 rounded">
                        {program.type}
                     </span>
                     <div className="flex items-center gap-1 text-xs text-lumen-sub font-medium">
                        <MapPin size={12} /> {program.city}, {program.country}
                     </div>
                  </div>

                  <h3 className="text-xl font-serif text-lumen-dark mb-4 leading-relaxed group-hover:text-lumen-accent transition-colors font-bold line-clamp-2 h-[3.5rem]">
                      {program.title}
                  </h3>

                  <div className="flex flex-wrap items-center gap-3 text-xs text-lumen-sub mb-4 pb-4 border-b border-stone-100">
                     <span className="flex items-center gap-1 bg-stone-50 px-2 py-1 rounded"><Clock size={14}/> {program.duration}</span>
                     <span className="flex items-center gap-1 bg-stone-50 px-2 py-1 rounded"><Users size={14}/> {program.ageRange}</span>
                     <span className="flex items-center gap-1 bg-stone-50 px-2 py-1 rounded"><Calendar size={14}/> 隨時出發</span>
                  </div>
                  
                   <div className="mb-4 space-y-1">
                    {(program.highlights || []).slice(0, 2).map((highlight, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-lumen-sub">
                            <CheckCircle size={12} className="text-lumen-accent mt-0.5 shrink-0" />
                            <span className="line-clamp-1">{highlight}</span>
                        </div>
                    ))}
                  </div>

                  <div className="mt-auto flex items-center justify-between text-lumen-dark group-hover:text-lumen-accent transition-colors font-bold text-sm tracking-widest pt-4 border-t border-stone-100">
                     <span>VIEW DETAILS</span>
                     <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform"/>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="py-24 text-center">
            <div className="w-20 h-20 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-6 text-stone-400">
                <Filter size={32} />
            </div>
            <h3 className="text-2xl font-serif text-lumen-dark mb-4">暫無符合行程</h3>
            <p className="text-lumen-sub font-light mb-8 max-w-md mx-auto">
                我們找不到符合您所有篩選條件的行程。試著移除一些條件，或是瀏覽所有行程。
            </p>
            <button 
              onClick={clearFilters} 
              className="px-8 py-3 bg-lumen-dark text-white rounded-full hover:bg-lumen-accent transition-colors font-bold tracking-wider"
            >
              清除所有篩選
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Programs;

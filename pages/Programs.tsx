
import React, { useState, useMemo, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { 
  Clock, MapPin, Tag, ChevronDown, Users, X, DollarSign, 
  Check, ArrowUpRight, Info, Eye, CheckCircle, Sparkles, 
  Globe, Calendar, Shield, Maximize2, ChevronLeft, ChevronRight
} from 'lucide-react';
import { DataService } from '../services/db';
import { Program, ProgramType } from '../types';

const Programs: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [programs, setPrograms] = useState<Program[]>([]);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
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

  const QuickViewModal = ({ program, onClose }: { program: Program; onClose: () => void }) => {
    const [imgIdx, setImgIdx] = useState(0);
    const gallery = program.gallery || [program.image];

    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 lg:p-12">
        <div className="absolute inset-0 bg-brand-ink/90 backdrop-blur-xl animate-fade-in" onClick={onClose}></div>
        
        <div className="relative w-full max-w-6xl bg-brand-cream rounded-[40px] shadow-heavy overflow-hidden flex flex-col lg:flex-row animate-scale-up max-h-[90vh]">
          <button onClick={onClose} className="absolute top-6 right-6 z-20 w-12 h-12 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center hover:bg-brand-accent transition-all">
            <X size={24} />
          </button>

          {/* Left: Image Gallery */}
          <div className="lg:w-1/2 relative bg-brand-ink h-[300px] lg:h-auto overflow-hidden">
             <img src={gallery[imgIdx]} className="w-full h-full object-cover animate-fade-in" alt={program.title} />
             {gallery.length > 1 && (
               <>
                 <button onClick={() => setImgIdx((imgIdx - 1 + gallery.length) % gallery.length)} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/30 text-white flex items-center justify-center hover:bg-brand-accent transition-all">
                   <ChevronLeft size={20} />
                 </button>
                 <button onClick={() => setImgIdx((imgIdx + 1) % gallery.length)} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/30 text-white flex items-center justify-center hover:bg-brand-accent transition-all">
                   <ChevronRight size={20} />
                 </button>
               </>
             )}
             <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                {gallery.map((_, i) => (
                  <div key={i} className={`h-1 rounded-full transition-all ${i === imgIdx ? 'w-8 bg-brand-secondary' : 'w-2 bg-white/30'}`}></div>
                ))}
             </div>
          </div>

          {/* Right: Content */}
          <div className="lg:w-1/2 p-8 lg:p-16 overflow-y-auto">
            <div className="space-y-8">
              <div>
                <span className="text-brand-accent font-black text-[9px] uppercase tracking-[0.4em] block mb-4">Quick View</span>
                <h2 className="text-3xl lg:text-4xl font-serif font-black text-brand-ink leading-tight mb-4">{program.title}</h2>
                <div className="flex flex-wrap gap-4 text-[10px] font-bold text-brand-sub uppercase tracking-widest">
                  <span className="flex items-center gap-1.5"><MapPin size={14} className="text-brand-accent"/> {program.city}</span>
                  <span className="flex items-center gap-1.5"><Clock size={14} className="text-brand-accent"/> {program.duration}</span>
                  <span className="flex items-center gap-1.5"><Users size={14} className="text-brand-accent"/> {program.ageRange}</span>
                </div>
              </div>

              <div className="h-[1px] bg-brand-border"></div>

              <div>
                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-ink/40 mb-4">Description</h4>
                <p className="text-sm text-brand-sub leading-loose font-light">{program.description}</p>
              </div>

              <div>
                 <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-ink/40 mb-4">Program Highlights</h4>
                 <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                   {program.highlights?.slice(0, 4).map((h, i) => (
                     <li key={i} className="flex items-center gap-3 text-xs text-brand-ink font-bold">
                        <CheckCircle size={16} className="text-brand-accent shrink-0" />
                        {h}
                     </li>
                   ))}
                 </ul>
              </div>

              <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-6">
                <div>
                   <p className="text-[9px] font-black text-brand-sub uppercase tracking-widest mb-1">Estimated Tuition</p>
                   <p className="text-2xl font-serif font-black text-brand-accent">{program.price}</p>
                </div>
                <div className="flex gap-4 w-full sm:w-auto">
                  <Link to={`/programs/${program.id}`} className="flex-1 sm:flex-none px-8 py-4 bg-brand-ink text-white text-[10px] font-black uppercase tracking-widest rounded-lg hover:bg-brand-accent transition-all text-center">
                    Full Details
                  </Link>
                  <Link to="/booking" state={{ interestedProgram: program.title }} className="flex-1 sm:flex-none px-8 py-4 bg-brand-secondary text-brand-primary text-[10px] font-black uppercase tracking-widest rounded-lg hover:bg-white transition-all text-center">
                    Book Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-brand-cream min-h-screen pt-44">
      {/* Quick View Modal */}
      {selectedProgram && (
        <QuickViewModal program={selectedProgram} onClose={() => setSelectedProgram(null)} />
      )}

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
              <div key={program.id} className="group bg-white rounded-xl overflow-hidden border border-brand-border hover:shadow-heavy transition-all duration-500 flex flex-col h-full relative">
                
                {/* Image Area */}
                <div className="aspect-[16/10] overflow-hidden relative">
                  <img src={program.image} className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000" alt={program.title} />
                  
                  <div className="absolute top-6 left-6 bg-brand-ink/40 backdrop-blur-md text-white px-4 py-1.5 rounded-sm font-black text-[9px] uppercase tracking-widest shadow-sm z-10">
                    {program.type}
                  </div>

                  {/* Tooltip & Actions Overlay */}
                  <div className="absolute inset-0 bg-brand-ink/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-center p-8 text-center z-20">
                    <Info size={24} className="text-brand-secondary mb-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75" />
                    <p className="text-white text-xs font-light leading-relaxed mb-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-100 px-4">
                      {program.description.length > 100 ? `${program.description.substring(0, 100)}...` : program.description}
                    </p>
                    
                    <div className="flex gap-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-150">
                       <button 
                        onClick={() => setSelectedProgram(program)}
                        className="px-6 py-2.5 bg-brand-secondary text-brand-primary text-[9px] font-black uppercase tracking-widest rounded hover:bg-white transition-all flex items-center gap-2"
                       >
                         <Eye size={12} /> Quick View
                       </button>
                       <Link 
                        to={`/programs/${program.id}`}
                        className="px-6 py-2.5 bg-white/10 text-white border border-white/20 text-[9px] font-black uppercase tracking-widest rounded hover:bg-white/20 transition-all"
                       >
                         View Details
                       </Link>
                    </div>
                  </div>
                </div>

                {/* Content Area */}
                <div className="p-10 flex-grow flex flex-col space-y-6">
                  <div className="flex items-center justify-between text-brand-sub text-[10px] font-bold uppercase tracking-widest">
                    <span className="flex items-center gap-1.5"><MapPin size={14} className="text-brand-accent"/> {program.city}</span>
                    <span className="flex items-center gap-1.5"><Clock size={14} className="text-brand-accent"/> {program.duration}</span>
                  </div>
                  <h3 className="text-2xl font-serif font-black text-brand-ink leading-snug">
                    {program.title}
                  </h3>
                  <div className="text-brand-accent font-black text-2xl tracking-tight mt-auto">
                    {program.price}
                  </div>
                  <div className="pt-8 border-t border-brand-border flex items-center justify-between">
                     <Link to={`/programs/${program.id}`} className="text-[10px] font-bold tracking-[0.2em] text-brand-sub hover:text-brand-accent uppercase transition-colors">Learn More</Link>
                     <ArrowUpRight size={20} className="text-brand-accent group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </div>
                </div>
              </div>
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

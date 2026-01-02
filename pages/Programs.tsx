
import React, { useState, useMemo, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { 
  Clock, MapPin, Tag, ChevronDown, Users, X, DollarSign, 
  Check, ArrowUpRight, Eye, ChevronLeft, ChevronRight, Briefcase
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
      <div className="relative shrink-0">
        <button
          onClick={(e) => { e.stopPropagation(); setActiveDropdown(isOpen ? null : filterKey); }}
          className={`flex items-center gap-2.5 px-6 py-2.5 rounded-full border text-[11px] font-black tracking-widest uppercase transition-all duration-300 ${
            value || isOpen ? 'border-brand-accent bg-brand-accent text-white shadow-sm' : 'border-brand-border bg-white text-brand-ink/50 hover:border-brand-accent'
          }`}
        >
          {Icon && <Icon size={14} className="opacity-70" />}
          <span>{value || label}</span>
          <ChevronDown size={14} className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
        </button>
        {isOpen && (
           <div className="absolute top-[120%] left-0 w-56 bg-white rounded-xl shadow-heavy border border-brand-border z-50 overflow-hidden animate-fade-in py-2">
              <button onClick={() => { handleFilterChange(filterKey, ""); setActiveDropdown(null); }} className="w-full text-left px-6 py-2.5 text-[12px] text-brand-sub hover:bg-brand-cream hover:text-brand-accent transition-colors">所有 {label}</button>
              {options.map((opt: any) => (
                 <button key={opt.value || opt} onClick={() => { handleFilterChange(filterKey, opt.value || opt); setActiveDropdown(null); }} className={`w-full text-left px-6 py-2.5 text-[12px] flex justify-between items-center transition-colors ${value === (opt.value || opt) ? 'bg-brand-accent/5 text-brand-accent font-black' : 'text-brand-ink/70 hover:bg-brand-cream hover:text-brand-accent'}`}>
                    <span>{opt.label || opt}</span>
                    {value === (opt.value || opt) && <Check size={16} />}
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
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10">
        <div className="absolute inset-0 bg-brand-ink/90 backdrop-blur-xl animate-fade-in" onClick={onClose}></div>
        
        <div className="relative w-full max-w-6xl bg-brand-cream rounded-3xl shadow-heavy overflow-hidden flex flex-col lg:flex-row animate-scale-up max-h-[90vh]">
          <button onClick={onClose} className="absolute top-5 right-5 z-20 w-12 h-12 rounded-full bg-brand-primary text-white flex items-center justify-center hover:bg-brand-ink transition-all shadow-xl">
            <X size={24} />
          </button>

          <div className="lg:w-1/2 relative bg-brand-ink h-[200px] md:h-[350px] lg:h-auto overflow-hidden shrink-0">
             <img src={gallery[imgIdx]} className="w-full h-full object-cover animate-fade-in" alt={program.title} />
             {gallery.length > 1 && (
               <>
                 <button onClick={(e) => { e.stopPropagation(); setImgIdx((imgIdx - 1 + gallery.length) % gallery.length); }} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-brand-accent transition-all">
                   <ChevronLeft size={20} />
                 </button>
                 <button onClick={(e) => { e.stopPropagation(); setImgIdx((imgIdx + 1) % gallery.length); }} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-brand-accent transition-all">
                   <ChevronRight size={20} />
                 </button>
               </>
             )}
          </div>

          <div className="lg:w-1/2 p-8 md:p-12 lg:p-16 overflow-y-auto">
            <div className="space-y-8">
              <div>
                <span className="text-brand-accent font-black text-[10px] uppercase tracking-[0.3em] block mb-4">Quick View</span>
                <h2 className="text-2xl md:text-4xl font-serif font-black text-brand-ink leading-tight mb-6">{program.title}</h2>
                <div className="flex flex-wrap gap-5 text-[11px] font-black text-brand-sub uppercase tracking-wider">
                  <span className="flex items-center gap-1.5"><MapPin size={16} className="text-brand-accent"/> {program.city}</span>
                  <span className="flex items-center gap-1.5"><Clock size={16} className="text-brand-accent"/> {program.duration}</span>
                  <span className="flex items-center gap-1.5"><Users size={16} className="text-brand-accent"/> {program.ageRange}</span>
                </div>
              </div>

              <div className="h-[1px] bg-brand-border"></div>

              <div>
                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-ink/40 mb-4">Description</h4>
                <p className="text-base text-brand-sub leading-loose font-light">{program.description}</p>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-8">
                <div className="text-center sm:text-left">
                   <p className="text-[10px] font-black text-brand-sub uppercase tracking-widest mb-1">Estimated Tuition</p>
                   <p className="text-2xl md:text-3xl font-serif font-black text-brand-accent">{program.price}</p>
                </div>
                <Link to={`/programs/${program.id}`} className="w-full sm:w-auto px-10 py-4 bg-brand-primary text-white text-[11px] font-black uppercase tracking-widest rounded-lg hover:bg-brand-ink transition-all text-center shadow-lg">
                  瀏覽細節
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-brand-cream min-h-screen pt-32 md:pt-40">
      {selectedProgram && (
        <QuickViewModal program={selectedProgram} onClose={() => setSelectedProgram(null)} />
      )}

      <div className="container mx-auto px-6 lg:px-12 mb-16">
        <div className="text-center max-w-3xl mx-auto space-y-6">
          <span className="text-brand-accent font-black tracking-[0.4em] uppercase text-[10px] block mb-2">Curated Programs</span>
          <h1 className="text-4xl md:text-6xl font-serif font-black text-brand-ink leading-tight tracking-tight">
            課程列表 <span className="text-brand-accent/30 font-light italic">Courses</span>
          </h1>
          <p className="text-brand-sub text-sm md:text-base font-light leading-relaxed max-w-xl mx-auto mt-4">
            點石精選全球優質校園，從短期插班到長期留學，為不同階段的學習者提供最契合的教育方案。
          </p>
        </div>
      </div>

      <div className="sticky top-14 md:top-16 z-40 bg-brand-cream/85 backdrop-blur-md border-y border-brand-border py-4 transition-all duration-500 overflow-hidden">
        <div className="container mx-auto px-6 lg:px-12 flex flex-nowrap md:flex-wrap items-center gap-4 overflow-x-auto scrollbar-hide">
          <FilterDropdown label="方案類型" value={filters.type} options={[{ label: "長期留學", value: "Study Abroad" }, { label: "密集遊學", value: "Language School" }, { label: "微留學體驗", value: "Micro Study" }]} filterKey="type" icon={Tag} />
          <FilterDropdown label="適合年齡" value={filters.age} options={["5-11 歲", "13-18 歲", "18 歲以上"]} filterKey="age" icon={Users} />
          <FilterDropdown label="預算範圍" value={filters.budget} options={["10萬以下", "10萬-20萬", "20萬以上"]} filterKey="budget" icon={DollarSign} />
          {activeFilterCount > 0 && (
            <button onClick={clearFilters} className="shrink-0 text-[11px] font-black text-brand-primary flex items-center gap-2 bg-white px-6 py-2.5 rounded-full border border-brand-primary/20 shadow-sm hover:bg-brand-primary hover:text-white transition-all">
              <X size={14} /> 清除全部 ({activeFilterCount})
            </button>
          )}
        </div>
      </div>

      <div className="container mx-auto px-6 lg:px-12 py-12 md:py-20">
        {isLoading ? (
           <div className="py-40 flex justify-center">
              <div className="w-12 h-12 border-2 border-brand-accent/20 border-t-brand-accent rounded-full animate-spin"></div>
           </div>
        ) : filteredPrograms.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {filteredPrograms.map(program => (
              <div key={program.id} className="group bg-white rounded-2xl overflow-hidden border border-brand-border hover:shadow-heavy transition-all duration-500 flex flex-col h-full">
                <div className="aspect-[16/10] overflow-hidden relative">
                  <img src={program.image} className="w-full h-full object-cover grayscale-[5%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000" alt={program.title} />
                  
                  {/* Floating Badges */}
                  <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
                    <div className="bg-brand-primary/90 backdrop-blur-md text-white px-3 py-1 rounded text-[8px] font-black uppercase tracking-widest shadow-lg">
                      {program.type}
                    </div>
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-brand-ink/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-center p-8 text-center z-20">
                    <p className="text-white text-sm font-light leading-relaxed mb-8 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 px-4">
                      {program.description.length > 100 ? `${program.description.substring(0, 100)}...` : program.description}
                    </p>
                    <button onClick={() => setSelectedProgram(program)} className="px-7 py-3 bg-brand-secondary text-brand-primary text-[10px] font-black uppercase tracking-widest rounded-md hover:bg-white transition-all flex items-center gap-2.5 shadow-lg">
                       <Eye size={16} /> 快速預覽
                    </button>
                  </div>
                </div>

                <div className="p-7 md:p-9 flex-grow flex flex-col">
                  {/* Meta Row 1 */}
                  <div className="flex items-center justify-between text-brand-sub text-[10px] font-black uppercase tracking-widest mb-4">
                    <span className="flex items-center gap-1.5"><MapPin size={16} className="text-brand-accent"/> {program.city}</span>
                    <span className="flex items-center gap-1.5"><Clock size={16} className="text-brand-accent"/> {program.duration}</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl md:text-2xl font-serif font-black text-brand-ink leading-tight group-hover:text-brand-primary transition-colors mb-4">
                    {program.title}
                  </h3>

                  {/* Meta Row 2: Price & Budget Info */}
                  <div className="flex items-center gap-3 mb-6">
                    <div className="bg-brand-cream text-brand-accent px-3 py-1 rounded-md text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5">
                       <DollarSign size={12} /> {program.price}
                    </div>
                  </div>

                  {/* Tags Cloud */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {program.tags?.slice(0, 3).map((tag, tIdx) => (
                      <span key={tIdx} className="text-[8px] font-black text-brand-sub/60 bg-brand-cream/50 px-2.5 py-1 rounded border border-brand-border/40 uppercase tracking-wider">
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Footer Action */}
                  <div className="pt-6 border-t border-brand-border flex items-center justify-between mt-auto">
                     <Link to={`/programs/${program.id}`} className="text-[11px] font-black tracking-[0.15em] text-brand-ink hover:text-brand-primary uppercase transition-colors">查看詳情</Link>
                     <ArrowUpRight size={22} className="text-brand-accent group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-40 text-center">
            <h2 className="text-3xl md:text-5xl font-serif font-black text-brand-ink mb-6 tracking-tight">找不到符合的方案</h2>
            <p className="text-brand-sub font-light text-lg mb-10">試著更換篩選條件，或是聯繫顧問為您特別安排。</p>
            <button onClick={clearFilters} className="px-10 py-4 bg-brand-primary text-white font-black rounded-lg uppercase tracking-widest text-[12px] shadow-heavy">重設所有過濾器</button>
          </div>
        )}
      </div>
    </div>
  );
};
export default Programs;

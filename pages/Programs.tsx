
import React, { useState, useMemo, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { 
  Clock, MapPin, Tag, ChevronDown, Users, X, DollarSign, 
  Check, ArrowUpRight, Info, Eye, ChevronLeft, ChevronRight
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
          className={`flex items-center gap-3 px-8 py-3.5 rounded-full border text-[14px] font-black tracking-widest uppercase transition-all duration-300 ${
            value || isOpen ? 'border-brand-accent bg-brand-accent text-white shadow-md' : 'border-brand-ink/10 bg-white text-brand-ink/60 hover:border-brand-accent'
          }`}
        >
          {Icon && <Icon size={18} className="opacity-70" />}
          <span>{value || label}</span>
          <ChevronDown size={18} className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
        </button>
        {isOpen && (
           <div className="absolute top-[120%] left-0 w-64 bg-white rounded-2xl shadow-heavy border border-brand-border z-50 overflow-hidden animate-fade-in py-3">
              <button onClick={() => { handleFilterChange(filterKey, ""); setActiveDropdown(null); }} className="w-full text-left px-8 py-4 text-base text-brand-sub hover:bg-brand-cream hover:text-brand-accent transition-colors">所有 {label}</button>
              {options.map((opt: any) => (
                 <button key={opt.value || opt} onClick={() => { handleFilterChange(filterKey, opt.value || opt); setActiveDropdown(null); }} className={`w-full text-left px-8 py-4 text-base flex justify-between items-center transition-colors ${value === (opt.value || opt) ? 'bg-brand-accent/5 text-brand-accent font-black' : 'text-brand-ink/70 hover:bg-brand-cream hover:text-brand-accent'}`}>
                    <span>{opt.label || opt}</span>
                    {value === (opt.value || opt) && <Check size={20} />}
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
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12">
        <div className="absolute inset-0 bg-brand-ink/90 backdrop-blur-xl animate-fade-in" onClick={onClose}></div>
        
        <div className="relative w-full max-w-6xl bg-brand-cream rounded-2xl shadow-heavy overflow-hidden flex flex-col lg:flex-row animate-scale-up max-h-[92vh]">
          <button onClick={onClose} className="absolute top-6 right-6 z-20 w-14 h-14 rounded-full bg-brand-primary text-white flex items-center justify-center hover:bg-brand-ink transition-all shadow-xl">
            <X size={32} />
          </button>

          <div className="lg:w-1/2 relative bg-brand-ink h-[250px] md:h-[400px] lg:h-auto overflow-hidden shrink-0">
             <img src={gallery[imgIdx]} className="w-full h-full object-cover animate-fade-in" alt={program.title} />
             {gallery.length > 1 && (
               <>
                 <button onClick={() => setImgIdx((imgIdx - 1 + gallery.length) % gallery.length)} className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-brand-accent transition-all">
                   <ChevronLeft size={24} />
                 </button>
                 <button onClick={() => setImgIdx((imgIdx + 1) % gallery.length)} className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-brand-accent transition-all">
                   <ChevronRight size={24} />
                 </button>
               </>
             )}
          </div>

          <div className="lg:w-1/2 p-8 md:p-16 lg:p-20 overflow-y-auto">
            <div className="space-y-10">
              <div>
                <span className="text-brand-accent font-black text-[12px] uppercase tracking-[0.4em] block mb-6">Quick View</span>
                <h2 className="text-3xl md:text-5xl font-serif font-black text-brand-ink leading-tight mb-8">{program.title}</h2>
                <div className="flex flex-wrap gap-6 text-[13px] font-black text-brand-sub uppercase tracking-widest">
                  <span className="flex items-center gap-2"><MapPin size={18} className="text-brand-accent"/> {program.city}</span>
                  <span className="flex items-center gap-2"><Clock size={18} className="text-brand-accent"/> {program.duration}</span>
                  <span className="flex items-center gap-2"><Users size={18} className="text-brand-accent"/> {program.ageRange}</span>
                </div>
              </div>

              <div className="h-[1px] bg-brand-border"></div>

              <div>
                <h4 className="text-[12px] font-black uppercase tracking-[0.3em] text-brand-ink/40 mb-6">Description</h4>
                <p className="text-base md:text-lg text-brand-sub leading-loose font-light">{program.description}</p>
              </div>

              <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-10">
                <div className="text-center sm:text-left">
                   <p className="text-[11px] font-black text-brand-sub uppercase tracking-widest mb-2">Estimated Tuition</p>
                   <p className="text-3xl md:text-4xl font-serif font-black text-brand-accent">{program.price}</p>
                </div>
                <div className="flex gap-4 w-full sm:w-auto">
                  <Link to={`/programs/${program.id}`} className="w-full sm:w-auto px-12 py-5 bg-brand-primary text-white text-[14px] font-black uppercase tracking-widest rounded-xl hover:bg-brand-ink transition-all text-center shadow-lg">
                    瀏覽細節
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
      {selectedProgram && (
        <QuickViewModal program={selectedProgram} onClose={() => setSelectedProgram(null)} />
      )}

      <div className="container mx-auto px-6 lg:px-12 mb-20">
        <div className="text-center max-w-4xl mx-auto space-y-8">
          <span className="text-brand-accent font-black tracking-[0.5em] uppercase text-[12px] block mb-4">Curated Programs</span>
          <h1 className="text-6xl md:text-8xl font-serif font-black text-brand-ink leading-none tracking-tighter">
            課程列表 <span className="text-brand-accent/30 font-light italic">Courses</span>
          </h1>
          <p className="text-brand-sub text-lg md:text-xl font-light leading-relaxed max-w-2xl mx-auto mt-8">
            點石精選全球優質校園，從短期插班到長期留學，為不同階段的學習者提供最契合的教育方案。
          </p>
        </div>
      </div>

      <div className="sticky top-20 z-40 bg-brand-cream/80 backdrop-blur-md border-y border-brand-border py-6 md:py-10 transition-all duration-500 overflow-hidden">
        <div className="container mx-auto px-6 lg:px-12 flex flex-nowrap md:flex-wrap items-center gap-6 overflow-x-auto scrollbar-hide">
          <FilterDropdown label="方案類型" value={filters.type} options={[{ label: "長期留學", value: "Study Abroad" }, { label: "密集遊學", value: "Language School" }, { label: "微留學體驗", value: "Micro Study" }]} filterKey="type" icon={Tag} />
          <FilterDropdown label="適合年齡" value={filters.age} options={["5-11 歲", "13-18 歲", "18 歲以上"]} filterKey="age" icon={Users} />
          <FilterDropdown label="預算範圍" value={filters.budget} options={["10萬以下", "10萬-20萬", "20萬以上"]} filterKey="budget" icon={DollarSign} />
          {activeFilterCount > 0 && (
            <button onClick={clearFilters} className="shrink-0 text-[13px] font-black text-brand-primary flex items-center gap-3 bg-white px-8 py-3.5 rounded-full border border-brand-primary/20 shadow-sm hover:bg-brand-primary hover:text-white transition-all">
              <X size={18} /> 清除全部 ({activeFilterCount})
            </button>
          )}
        </div>
      </div>

      <div className="container mx-auto px-6 lg:px-12 py-16 md:py-28">
        {isLoading ? (
           <div className="py-40 flex justify-center">
              <div className="w-16 h-16 border-2 border-brand-accent/20 border-t-brand-accent rounded-full animate-spin"></div>
           </div>
        ) : filteredPrograms.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-14">
            {filteredPrograms.map(program => (
              <div key={program.id} className="group bg-white rounded-2xl overflow-hidden border border-brand-border hover:shadow-heavy transition-all duration-500 flex flex-col h-full">
                <div className="aspect-[16/10] overflow-hidden relative">
                  <img src={program.image} className="w-full h-full object-cover grayscale-[10%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000" alt={program.title} />
                  <div className="absolute top-6 left-6 bg-brand-primary text-white px-5 py-2 rounded-lg font-black text-[11px] uppercase tracking-widest shadow-lg z-10">
                    {program.type}
                  </div>
                  <div className="absolute inset-0 bg-brand-ink/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-center p-8 text-center z-20">
                    <p className="text-white text-base font-light leading-loose mb-10 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 px-4">
                      {program.description.length > 120 ? `${program.description.substring(0, 120)}...` : program.description}
                    </p>
                    <button onClick={() => setSelectedProgram(program)} className="px-10 py-4 bg-brand-secondary text-brand-primary text-[12px] font-black uppercase tracking-widest rounded-xl hover:bg-white transition-all flex items-center gap-3 shadow-lg">
                       <Eye size={18} /> 快速預覽
                    </button>
                  </div>
                </div>

                <div className="p-8 md:p-10 flex-grow flex flex-col space-y-8">
                  <div className="flex items-center justify-between text-brand-sub text-[13px] font-black uppercase tracking-widest">
                    <span className="flex items-center gap-2"><MapPin size={18} className="text-brand-accent"/> {program.city}</span>
                    <span className="flex items-center gap-2"><Clock size={18} className="text-brand-accent"/> {program.duration}</span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-serif font-black text-brand-ink leading-tight group-hover:text-brand-primary transition-colors">
                    {program.title}
                  </h3>
                  <div className="text-brand-accent font-black text-3xl md:text-4xl tracking-tight mt-auto">
                    {program.price}
                  </div>
                  <div className="pt-8 border-t border-brand-border flex items-center justify-between">
                     <Link to={`/programs/${program.id}`} className="text-[13px] font-black tracking-[0.2em] text-brand-ink hover:text-brand-primary uppercase transition-colors">查看詳情</Link>
                     <ArrowUpRight size={28} className="text-brand-accent group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-40 text-center">
            <h2 className="text-4xl md:text-6xl font-serif font-black text-brand-ink mb-8">找不到符合的方案</h2>
            <p className="text-brand-sub font-light text-xl mb-12">試著更換篩選條件，或是聯繫顧問為您特別安排。</p>
            <button onClick={clearFilters} className="px-14 py-6 bg-brand-primary text-white font-black rounded-xl uppercase tracking-widest text-[14px] shadow-heavy">重設所有過濾器</button>
          </div>
        )}
      </div>
    </div>
  );
};
export default Programs;

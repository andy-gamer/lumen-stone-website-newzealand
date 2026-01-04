
import React, { useState, useMemo, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { 
  Clock, MapPin, Tag, Check, ArrowUpRight, Filter, Search, BookOpen, Banknote, Bookmark, X
} from 'lucide-react';
import { DataService } from '../services/db';
import { Program, ProgramType } from '../types';

const Programs: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [programs, setPrograms] = useState<Program[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchParams] = useSearchParams();

  const [filters, setFilters] = useState({
    age: "",
    type: "",
    location: "",
    duration: "",
    subject: ""
  });

  useEffect(() => {
    DataService.getPrograms().then(data => {
        setPrograms(data || []);
        setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    const typeParam = searchParams.get('type');
    if (typeParam) setFilters(prev => ({ ...prev, type: typeParam }));
  }, [searchParams]);

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: prev[key as keyof typeof prev] === value ? "" : value }));
  };

  const filteredPrograms = useMemo(() => {
    return programs.filter(program => {
      if (filters.type && program.type !== filters.type) return false;
      if (filters.age && !program.ageRange?.includes(filters.age)) return false;
      if (filters.location && !program.city?.includes(filters.location)) return false;
      if (filters.duration && program.duration !== filters.duration) return false;
      if (filters.subject && !program.subjects?.includes(filters.subject)) return false;
      return true;
    });
  }, [filters, programs]);

  const FilterSection = ({ label, value, options, filterKey }: any) => (
    <div className="mb-6">
      <h4 className="text-[10px] font-black text-brand-ink/30 uppercase tracking-[0.3em] mb-3">{label}</h4>
      <div className="flex flex-wrap gap-2">
        {options.map((opt: any) => {
          const optValue = opt.value || opt;
          const optLabel = opt.label || opt;
          const isActive = value === optValue;
          return (
            <button
              key={optValue}
              onClick={() => handleFilterChange(filterKey, optValue)}
              className={`px-4 py-2 rounded-lg text-[10px] font-bold transition-all border ${
                isActive 
                ? 'bg-brand-primary text-white border-brand-primary' 
                : 'bg-white text-brand-sub border-brand-border hover:border-brand-accent/50'
              }`}
            >
              {optLabel}
            </button>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="bg-brand-cream min-h-screen pt-28 md:pt-40">
      {/* Header */}
      <div className="container mx-auto px-6 lg:px-12 mb-8 md:mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-xl space-y-3 md:space-y-4 animate-fade-in-up">
            <span className="text-brand-accent font-black tracking-[0.4em] uppercase text-[8px] md:text-[9px] block">Curated Selection</span>
            <h1 className="text-2xl md:text-4xl font-serif font-black text-brand-ink leading-tight tracking-tight">
              精選教育方案 <span className="text-brand-accent/30 font-light italic text-xl md:text-2xl">Programs</span>
            </h1>
            <p className="text-brand-sub text-[12px] md:text-[13px] font-light leading-relaxed">
              根據校區治安、學術聲譽與國際生支持系統，點石為您嚴選最優質的紐西蘭校園。
            </p>
          </div>
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="lg:hidden flex items-center justify-center gap-2 bg-white border border-brand-border px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm active:scale-95 transition-transform"
          >
            <Filter size={14} /> 篩選課程
          </button>
        </div>
      </div>

      <div className="container mx-auto px-6 lg:px-12 pb-20">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          
          {/* Sidebar Filters */}
          <aside className={`lg:w-1/4 shrink-0 transition-all ${isSidebarOpen ? 'fixed inset-0 z-[100] bg-brand-cream p-8 overflow-y-auto' : 'hidden lg:block'}`}>
            <div className="lg:sticky lg:top-32 space-y-6">
              <div className="flex items-center justify-between lg:hidden mb-8">
                 <h2 className="text-xl font-serif font-black">篩選條件</h2>
                 <button onClick={() => setIsSidebarOpen(false)} className="w-10 h-10 rounded-full bg-brand-primary text-white flex items-center justify-center"><X size={20}/></button>
              </div>

              <div className="bg-white rounded-2xl border border-brand-border p-6 shadow-zen">
                <FilterSection label="方案類型" value={filters.type} options={[{ label: "長期留學", value: ProgramType.LONG_TERM }, { label: "短期遊學", value: ProgramType.SHORT_TERM }, { label: "微留學", value: ProgramType.MICRO_STUDY }]} filterKey="type" />
                <FilterSection 
                  label="學習時長" 
                  value={filters.duration} 
                  options={[
                    { label: "1 學期", value: "1 semester" },
                    { label: "1 學年", value: "1 academic year+" },
                    { label: "短期週數", value: "2 weeks - 8 weeks" }
                  ]} 
                  filterKey="duration" 
                />
                <FilterSection label="地區位置" value={filters.location} options={["北岸", "中區", "陶朗加", "基督城"]} filterKey="location" />

                <button 
                  onClick={() => { setFilters({ age: "", type: "", location: "", duration: "", subject: "" }); setIsSidebarOpen(false); }}
                  className="w-full mt-6 py-3 border border-brand-border text-brand-sub text-[10px] font-black uppercase tracking-widest rounded-lg hover:bg-brand-cream transition-colors"
                >
                  清除所有篩選
                </button>
              </div>

              <div className="bg-brand-primary p-6 rounded-2xl text-white hidden lg:block">
                 <h4 className="text-xs font-black uppercase tracking-widest mb-3 flex items-center gap-2">
                   <BookOpen size={14} className="text-brand-secondary" /> 專業建議
                 </h4>
                 <p className="text-[11px] font-light leading-relaxed text-white/70 mb-4">不確定如何選擇？我們的指南能幫您快速縮小範圍。</p>
                 <Link to="/guide" className="inline-block text-[10px] font-black uppercase tracking-widest text-brand-secondary">開啟指南 →</Link>
              </div>
            </div>
          </aside>

          {/* Program List */}
          <div className="lg:w-3/4 flex flex-col gap-6 md:gap-10">
            {isLoading ? (
               <div className="py-20 flex justify-center">
                  <div className="w-10 h-10 border-2 border-brand-accent/20 border-t-brand-accent rounded-full animate-spin"></div>
               </div>
            ) : filteredPrograms.length > 0 ? (
              filteredPrograms.map((program, idx) => (
                <div key={program.id} className="group bg-white rounded-[24px] md:rounded-[32px] overflow-hidden border border-brand-border hover:shadow-heavy transition-all duration-500 flex flex-col md:flex-row shadow-zen reveal" style={{ transitionDelay: `${(idx % 3) * 0.1}s` }}>
                  
                  {/* Image Area */}
                  <div className="md:w-[35%] relative overflow-hidden aspect-[16/9] md:aspect-auto">
                    <img src={program.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt={program.title} />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/40 to-transparent"></div>
                    <div className="absolute top-4 left-4 flex flex-col gap-2">
                      <span className="bg-brand-primary/90 text-white px-2.5 py-1 rounded-md text-[7px] font-black uppercase tracking-widest flex items-center gap-1.5 shadow-lg"><Bookmark size={8} fill="currentColor" /> {program.type}</span>
                    </div>
                  </div>

                  {/* Content Area */}
                  <div className="p-6 md:p-10 md:w-[65%] flex flex-col">
                    <div className="flex flex-wrap items-center gap-4 text-brand-accent font-bold text-[9px] uppercase tracking-widest mb-4">
                      <span className="flex items-center gap-1.5"><MapPin size={12} /> {program.city}</span>
                      <span className="flex items-center gap-1.5"><Clock size={12} /> {program.duration}</span>
                    </div>

                    <h3 className="text-xl md:text-2xl font-serif font-black text-brand-ink mb-3 leading-tight">{program.title}</h3>
                    <p className="text-[12px] text-brand-sub font-light leading-relaxed mb-6 line-clamp-2">{program.description}</p>

                    <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mt-auto">
                       <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                          {program.subjects?.slice(0, 2).map((sub, i) => (
                            <span key={i} className="text-[8px] font-black text-brand-primary bg-brand-primary/5 px-2.5 py-1 rounded-full border border-brand-primary/10 uppercase tracking-widest">{sub}</span>
                          ))}
                       </div>
                       
                       <Link to={`/programs/${program.id}`} className="w-full sm:w-auto text-center px-8 py-3 bg-brand-ink text-white rounded-xl font-black text-[9px] uppercase tracking-widest transition-all hover:bg-brand-primary shadow-lg flex items-center justify-center gap-2 group/btn">
                          詳細資訊 <ArrowUpRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                       </Link>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-20 text-center bg-white rounded-3xl border border-brand-border reveal">
                 <Search size={32} className="text-brand-accent/20 mx-auto mb-4" />
                 <h2 className="text-lg font-serif font-black mb-2">未找到符合方案</h2>
                 <p className="text-brand-sub font-light text-xs">請嘗試重設篩選條件。</p>
                 <button onClick={() => setFilters({ age: "", type: "", location: "", duration: "", subject: "" })} className="mt-6 px-8 py-3 bg-brand-primary text-white rounded-lg text-[9px] font-black uppercase tracking-widest">重設所有篩選</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Programs;

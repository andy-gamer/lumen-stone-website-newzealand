
import React, { useState, useMemo, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { 
  Clock, MapPin, Tag, ChevronDown, Users, X, 
  Check, ArrowUpRight, Eye, Info, Filter, Search,
  BookOpen, Calendar, Banknote, Bookmark
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
      if (filters.type) {
          if (filters.type === "Study Abroad" && program.type !== ProgramType.STUDY_ABROAD) return false;
          if (filters.type === "Micro Study" && program.type !== ProgramType.MICRO_STUDY) return false;
      }
      if (filters.age && !program.ageRange?.includes(filters.age)) return false;
      if (filters.location && !program.city?.includes(filters.location)) return false;
      if (filters.duration && program.duration !== filters.duration) return false;
      if (filters.subject && !program.subjects?.includes(filters.subject)) return false;
      return true;
    });
  }, [filters, programs]);

  const FilterSection = ({ label, value, options, filterKey }: any) => (
    <div className="mb-8">
      <h4 className="text-[10px] font-black text-brand-ink/30 uppercase tracking-[0.3em] mb-4">{label}</h4>
      <div className="flex flex-col gap-1.5">
        {options.map((opt: any) => {
          const optValue = opt.value || opt;
          const optLabel = opt.label || opt;
          const isActive = value === optValue;
          return (
            <button
              key={optValue}
              onClick={() => handleFilterChange(filterKey, optValue)}
              className={`flex items-center justify-between px-4 py-2 rounded-lg text-[11px] font-bold transition-all border ${
                isActive 
                ? 'bg-brand-primary text-white border-brand-primary' 
                : 'bg-white text-brand-sub border-brand-border hover:border-brand-accent/50'
              }`}
            >
              <span>{optLabel}</span>
              {isActive && <Check size={14} />}
            </button>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="bg-brand-cream min-h-screen pt-32 md:pt-40">
      {/* Header */}
      <div className="container mx-auto px-6 lg:px-12 mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-xl space-y-4">
            <span className="text-brand-accent font-black tracking-[0.4em] uppercase text-[9px] block">Curated Schools</span>
            <h1 className="text-2xl md:text-4xl font-serif font-black text-brand-ink leading-tight tracking-tight">
              精選教育方案 <span className="text-brand-accent/30 font-light italic text-xl md:text-2xl">Programs</span>
            </h1>
            <p className="text-brand-sub text-[13px] font-light leading-relaxed">
              點石根據各校設施、學制優勢與留學生照護體系，為您嚴格篩選最優質的紐西蘭校園。
            </p>
          </div>
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="md:hidden flex items-center gap-3 bg-white border border-brand-border px-6 py-3 rounded-full text-[11px] font-black uppercase tracking-widest shadow-sm"
          >
            <Filter size={14} /> 篩選條件
          </button>
        </div>
      </div>

      <div className="container mx-auto px-6 lg:px-12 pb-24">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Sidebar Filters */}
          <aside className={`lg:w-1/4 shrink-0 transition-all ${isSidebarOpen ? 'block' : 'hidden lg:block'}`}>
            <div className="sticky top-32 space-y-4">
              <div className="bg-white rounded-2xl border border-brand-border p-6 shadow-zen max-h-[80vh] overflow-y-auto scrollbar-hide">
                <div className="flex items-center justify-between mb-8">
                   <h3 className="text-xs font-black text-brand-ink uppercase tracking-widest flex items-center gap-2">
                     <Filter size={14} /> 篩選條件
                   </h3>
                   {Object.values(filters).some(v => v) && (
                     <button 
                        onClick={() => setFilters({ age: "", type: "", location: "", duration: "", subject: "" })}
                        className="text-[9px] text-brand-accent font-bold hover:underline"
                     >
                        清除所有
                     </button>
                   )}
                </div>
                
                <FilterSection label="方案類型" value={filters.type} options={[{ label: "長期留學", value: "Study Abroad" }, { label: "微留學體驗", value: "Micro Study" }]} filterKey="type" />
                <FilterSection 
                  label="學習時長 (Duration)" 
                  value={filters.duration} 
                  options={[
                    { label: "1 學期 (1 Semester)", value: "1 semester" },
                    { label: "1 學年 (1 Academic Year)", value: "1 academic year" },
                    { label: "2 週 - 8 週 (Short Term)", value: "2 weeks - 8 weeks" },
                    { label: "1 學年起 (1 Year+)", value: "1 year+" }
                  ]} 
                  filterKey="duration" 
                />
                <FilterSection label="優勢學科" value={filters.subject} options={["藝術/音樂", "商科/經濟", "傳媒/設計", "科學/數位", "戶外教育"]} filterKey="subject" />
                <FilterSection label="適合年齡" value={filters.age} options={["5-11 歲", "13-18 歲", "18 歲"]} filterKey="age" />
                <FilterSection label="地區位置" value={filters.location} options={["北岸", "中區", "陶朗加", "基督城"]} filterKey="location" />

                <div className="mt-8 pt-6 border-t border-brand-border">
                   <div className="bg-brand-cream p-4 rounded-xl flex items-center gap-3">
                      <Search size={16} className="text-brand-accent" />
                      <input type="text" placeholder="關鍵字搜尋..." className="bg-transparent text-[11px] outline-none w-full font-light" />
                   </div>
                </div>
              </div>

              <div className="bg-brand-primary p-6 rounded-2xl text-white">
                 <h4 className="text-xs font-black uppercase tracking-widest mb-3 flex items-center gap-2">
                   <BookOpen size={14} className="text-brand-secondary" /> 專業建議
                 </h4>
                 <p className="text-[11px] font-light leading-relaxed text-white/70 mb-4">
                   不確定該如何選擇？我們的選課指南能幫您快速縮小範圍。
                 </p>
                 <Link to="/guide" className="inline-block text-[10px] font-black uppercase tracking-widest text-brand-secondary hover:text-white transition-colors">
                   開啟選課指南 →
                 </Link>
              </div>
            </div>
          </aside>

          {/* Program List */}
          <div className="lg:w-3/4 flex flex-col gap-10">
            {isLoading ? (
               <div className="py-40 flex justify-center">
                  <div className="w-10 h-10 border-2 border-brand-accent/20 border-t-brand-accent rounded-full animate-spin"></div>
               </div>
            ) : filteredPrograms.length > 0 ? (
              filteredPrograms.map(program => (
                <div key={program.id} className="group bg-white rounded-[32px] overflow-hidden border border-brand-border hover:shadow-heavy transition-all duration-500 flex flex-col lg:flex-row shadow-zen">
                  
                  {/* Card Image Area */}
                  <div className="lg:w-[35%] relative overflow-hidden aspect-[16/10] lg:aspect-auto">
                    <img src={program.image} className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110" alt={program.title} />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/40 to-transparent"></div>
                    
                    {/* Badge Overlay */}
                    <div className="absolute top-6 left-6 flex flex-col gap-2">
                      <span className="bg-brand-primary/90 backdrop-blur-md text-white px-3 py-1.5 rounded-lg text-[8px] font-black uppercase tracking-widest shadow-lg inline-flex items-center gap-2">
                        <Bookmark size={10} fill="currentColor" /> {program.type}
                      </span>
                      <span className="bg-brand-gold text-brand-ink px-3 py-1.5 rounded-lg text-[8px] font-black uppercase tracking-widest shadow-lg inline-flex items-center gap-2">
                        <Banknote size={10} /> {program.price}
                      </span>
                    </div>
                  </div>

                  {/* Card Content Area */}
                  <div className="p-8 lg:p-10 lg:w-[65%] flex flex-col">
                    
                    {/* Meta Section */}
                    <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mb-6">
                      <div className="flex items-center gap-2 text-brand-accent">
                        <MapPin size={14} />
                        <span className="text-[10px] font-bold uppercase tracking-widest">{program.city}</span>
                      </div>
                      <div className="flex items-center gap-2 text-brand-accent">
                        <Clock size={14} />
                        <span className="text-[10px] font-bold uppercase tracking-widest">{program.duration}</span>
                      </div>
                      <div className="flex items-center gap-2 text-brand-accent">
                        <Users size={14} />
                        <span className="text-[10px] font-bold uppercase tracking-widest">{program.ageRange}</span>
                      </div>
                    </div>

                    {/* Title & Desc */}
                    <div className="mb-8">
                      <h3 className="text-xl lg:text-2xl font-serif font-black text-brand-ink group-hover:text-brand-primary transition-colors mb-4 leading-tight">
                        {program.title}
                      </h3>
                      <p className="text-[13px] text-brand-sub font-light leading-relaxed line-clamp-2">
                        {program.description}
                      </p>
                    </div>

                    {/* Highlights Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 mb-8 pb-8 border-b border-brand-border/60">
                       {program.highlights.slice(0, 3).map((h, i) => (
                         <div key={i} className="flex items-start gap-3 text-[11px] text-brand-ink/80 leading-relaxed font-medium">
                            <div className="mt-0.5 w-4 h-4 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary shrink-0">
                               <Check size={10} />
                            </div>
                            <span className="line-clamp-1">{h}</span>
                         </div>
                       ))}
                    </div>

                    {/* Tags & Footer */}
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mt-auto">
                       <div className="flex flex-wrap justify-center sm:justify-start gap-2">
                          {program.subjects?.map((sub, i) => (
                            <span key={i} className="text-[8px] font-black text-brand-primary bg-brand-primary/5 px-3 py-1.5 rounded-full uppercase tracking-widest border border-brand-primary/10">
                              {sub}
                            </span>
                          ))}
                          {program.tags?.slice(0, 3).map((tag, i) => (
                            <span key={i} className="text-[8px] font-black text-brand-accent/60 bg-brand-cream px-3 py-1.5 rounded-full uppercase tracking-widest">
                              #{tag}
                            </span>
                          ))}
                       </div>
                       
                       <Link to={`/programs/${program.id}`} className="shrink-0 group/btn relative inline-flex items-center gap-3 px-8 py-3 bg-brand-ink text-white rounded-xl font-black text-[10px] uppercase tracking-widest transition-all hover:bg-brand-primary shadow-lg overflow-hidden">
                          <span className="relative z-10">詳細資訊</span>
                          <ArrowUpRight size={14} className="relative z-10 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                       </Link>
                    </div>

                  </div>
                </div>
              ))
            ) : (
              <div className="py-40 text-center bg-white rounded-3xl border border-brand-border">
                 <div className="inline-block p-6 bg-brand-cream rounded-full mb-6">
                    <Search size={32} className="text-brand-accent/30" />
                 </div>
                 <h2 className="text-xl font-serif font-black text-brand-ink mb-2">找不到符合的方案</h2>
                 <p className="text-brand-sub font-light text-sm">請嘗試重設篩選條件或是聯絡我們獲取建議。</p>
                 <button 
                  onClick={() => setFilters({ age: "", type: "", location: "", duration: "", subject: "" })}
                  className="mt-8 px-8 py-3 bg-brand-primary text-white rounded-lg text-[10px] font-black uppercase tracking-widest"
                 >
                    重設所有篩選
                 </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Programs;

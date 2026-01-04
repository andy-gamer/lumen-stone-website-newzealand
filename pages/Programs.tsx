
import React, { useState, useMemo, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { 
  Clock, MapPin, Tag, ChevronDown, Users, X, 
  Check, ArrowUpRight, Eye, Info, Filter, Search,
  BookOpen, Calendar
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
          <div className="lg:w-3/4 flex flex-col gap-6">
            {isLoading ? (
               <div className="py-40 flex justify-center">
                  <div className="w-10 h-10 border-2 border-brand-accent/20 border-t-brand-accent rounded-full animate-spin"></div>
               </div>
            ) : filteredPrograms.length > 0 ? (
              filteredPrograms.map(program => (
                <div key={program.id} className="group bg-white rounded-2xl overflow-hidden border border-brand-border hover:shadow-heavy transition-all duration-500 flex flex-col md:flex-row h-full">
                  {/* Card Image */}
                  <div className="md:w-2/5 relative overflow-hidden aspect-[16/10] md:aspect-auto h-full">
                    <img src={program.image} className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-105" alt={program.title} />
                    <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                      <div className="bg-brand-primary/90 backdrop-blur-md text-white px-3 py-1 rounded text-[8px] font-black uppercase tracking-widest shadow-md">
                          {program.type}
                      </div>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 md:p-8 md:w-3/5 flex flex-col">
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[8px] font-black text-brand-accent uppercase mb-3 tracking-[0.2em]">
                      <span className="flex items-center gap-1.5"><MapPin size={12}/> {program.city}</span>
                      <span className="flex items-center gap-1.5"><Users size={12}/> {program.ageRange.split(' ')[0]} 級別</span>
                      <span className="flex items-center gap-1.5"><Clock size={12}/> {program.duration}</span>
                    </div>
                    
                    <h3 className="text-base md:text-xl font-serif font-black text-brand-ink group-hover:text-brand-primary transition-colors mb-3 leading-snug">
                      {program.title}
                    </h3>

                    <p className="text-[12px] text-brand-sub font-light leading-relaxed mb-6 line-clamp-2 md:line-clamp-2">
                      {program.description}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 mb-6">
                       {program.highlights.slice(0, 2).map((h, i) => (
                         <div key={i} className="flex items-start gap-2.5 text-[10px] text-brand-sub leading-relaxed font-light">
                            <Check size={12} className="text-brand-accent mt-0.5 shrink-0" />
                            <span>{h}</span>
                         </div>
                       ))}
                    </div>

                    <div className="flex flex-wrap gap-1.5 mb-8">
                       {program.subjects?.map((sub, i) => (
                         <span key={i} className="text-[7px] font-black text-brand-primary bg-brand-primary/5 px-2 py-1 rounded-md uppercase tracking-widest border border-brand-primary/10">
                           {sub}
                         </span>
                       ))}
                       {program.tags?.slice(0, 2).map((tag, i) => (
                         <span key={i} className="text-[7px] font-black text-brand-sub/40 bg-brand-cream px-2 py-1 rounded-md uppercase tracking-widest">
                           #{tag}
                         </span>
                       ))}
                    </div>

                    <div className="pt-6 border-t border-brand-border flex items-center justify-between mt-auto">
                       <Link to={`/programs/${program.id}`} className="text-[9px] font-black tracking-[0.3em] text-brand-ink hover:text-brand-accent uppercase transition-all flex items-center gap-2">
                          View Details <ArrowUpRight size={14} />
                       </Link>
                       <div className="flex items-center gap-1.5 text-[9px] font-black text-brand-accent uppercase tracking-widest bg-brand-accent/5 px-2.5 py-1 rounded">
                          <Info size={12} /> 諮詢熱點
                       </div>
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

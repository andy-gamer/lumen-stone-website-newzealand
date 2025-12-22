import React, { useState, useMemo, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Clock, ArrowRight, SlidersHorizontal, Users, Search, X, MapPin } from 'lucide-react';
import { DataService } from '../services/db';
import { Program, ProgramType } from '../types';

const Programs: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [programs, setPrograms] = useState<Program[]>([]);
  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("");

  const [filters, setFilters] = useState({
    type: "",
    country: "",
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
    setFilters(prev => ({ 
        ...prev, 
        [key]: prev[key as keyof typeof prev] === value ? "" : value 
    }));
  };

  const filteredPrograms = useMemo(() => {
    return programs.filter(program => {
      const matchesType = filters.type ? program.type === filters.type : true;
      const matchesSearch = searchTerm 
        ? (program.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
           program.description.toLowerCase().includes(searchTerm.toLowerCase()))
        : true;
      return matchesType && matchesSearch;
    });
  }, [filters, programs, searchTerm]);

  const TYPES = Object.values(ProgramType);

  return (
    <div className="bg-brand-cream min-h-screen">
      
      {/* Search & Hero Section */}
      <div className="bg-brand-ink text-white pt-40 pb-32 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
           <img src="https://images.unsplash.com/photo-1507699622177-38889b58527d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80" className="w-full h-full object-cover opacity-20" alt="Background" />
        </div>
        <div className="container mx-auto px-6 lg:px-16 relative z-10">
          <div className="max-w-4xl">
             <span className="text-brand-accent font-bold tracking-[0.5em] uppercase block mb-6">Discovery Center</span>
             <h1 className="text-5xl md:text-7xl font-serif font-bold mb-12">尋找您的<br/>命定探險</h1>
             
             {/* Integrated Search Bar */}
             <div className="relative max-w-2xl fade-up">
                <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none text-brand-ink/40">
                   <Search size={24} />
                </div>
                <input 
                  type="text" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="搜尋課程名稱、關鍵字或地點..."
                  className="w-full bg-white/95 backdrop-blur-md border-none py-6 pl-16 pr-20 rounded-3xl text-brand-ink text-lg focus:ring-4 focus:ring-brand-accent/20 transition-all shadow-premium"
                />
                {searchTerm && (
                  <button 
                    onClick={() => setSearchTerm("")}
                    className="absolute inset-y-0 right-6 flex items-center text-brand-ink/40 hover:text-brand-accent transition-colors"
                  >
                    <X size={24} />
                  </button>
                )}
             </div>
          </div>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="sticky top-20 z-40 bg-brand-cream/80 backdrop-blur-xl border-b border-brand-sage/5 py-6">
         <div className="container mx-auto px-6 lg:px-16 flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-2 text-brand-ink font-bold text-xs uppercase tracking-widest">
               <SlidersHorizontal size={16} />
               <span>篩選類別</span>
            </div>
            <div className="flex flex-wrap gap-2">
               {TYPES.map(type => (
                 <button 
                  key={type}
                  onClick={() => handleFilterChange('type', type)}
                  className={`px-6 py-2.5 rounded-full text-xs font-bold transition-all ${filters.type === type ? 'bg-brand-sage text-white shadow-premium' : 'bg-white text-brand-sub hover:bg-brand-sage hover:text-white border border-brand-sage/10'}`}
                 >
                   {type}
                 </button>
               ))}
            </div>
            {searchTerm && (
              <div className="ml-auto text-sm text-brand-sage font-medium">
                 找到 {filteredPrograms.length} 個結果
              </div>
            )}
         </div>
      </div>

      {/* Program Grid - Enhanced Cards */}
      <div className="container mx-auto px-6 lg:px-16 py-20">
        {filteredPrograms.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {filteredPrograms.map(program => (
              <Link to={`/programs/${program.id}`} key={program.id} className="group flex flex-col bg-white rounded-[48px] overflow-hidden shadow-elevated hover:shadow-premium transition-all duration-500 hover:-translate-y-3">
                <div className="relative h-80 overflow-hidden">
                   <img src={program.image} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt={program.title} />
                   <div className="absolute inset-0 bg-gradient-to-t from-brand-ink/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                   
                   {/* Badges */}
                   <div className="absolute top-6 left-6 flex flex-col gap-2">
                      <span className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl text-[10px] font-bold text-brand-ink tracking-widest uppercase shadow-sm">
                         {program.city}
                      </span>
                   </div>
                   
                   <div className="absolute bottom-6 right-6 glass-card px-5 py-2 rounded-2xl font-bold text-brand-ink text-sm shadow-lg">
                      {program.price}
                   </div>
                </div>

                <div className="p-10 flex-grow flex flex-col">
                   <div className="flex justify-between items-start mb-4">
                      <span className="text-[11px] font-bold text-brand-accent uppercase tracking-[0.2em]">{program.type}</span>
                   </div>
                   <h3 className="text-2xl font-serif font-bold text-brand-ink leading-tight mb-6 group-hover:text-brand-sage transition-colors">
                      {program.title}
                   </h3>
                   <p className="text-brand-sub text-sm font-light leading-relaxed line-clamp-2 mb-8">
                      {program.description}
                   </p>
                   
                   <div className="mt-auto pt-8 border-t border-brand-sage/10 flex items-center justify-between">
                      <div className="flex gap-4">
                         <div className="flex items-center gap-1.5 text-[11px] font-medium text-brand-sub">
                            <Clock size={14} className="text-brand-sage" />
                            {program.duration}
                         </div>
                         <div className="flex items-center gap-1.5 text-[11px] font-medium text-brand-sub">
                            <Users size={14} className="text-brand-sage" />
                            {program.ageRange}
                         </div>
                      </div>
                      <div className="w-10 h-10 rounded-full border border-brand-sage/20 flex items-center justify-center text-brand-sage group-hover:bg-brand-sage group-hover:text-white transition-all">
                         <ArrowRight size={18} />
                      </div>
                   </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-40 animate-fade-in">
             <div className="w-24 h-24 bg-brand-light rounded-full flex items-center justify-center mx-auto mb-8 text-brand-sage">
                <Search size={40} />
             </div>
             <h3 className="text-2xl font-serif font-bold text-brand-ink mb-4">找不到符合關鍵字的課程</h3>
             <p className="text-brand-sub mb-8">建議嘗試其他關鍵字，或是預約諮詢由我們為您推薦。</p>
             <button onClick={() => setSearchTerm("")} className="text-brand-sage font-bold border-b-2 border-brand-sage pb-1">清除搜尋條件</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Programs;
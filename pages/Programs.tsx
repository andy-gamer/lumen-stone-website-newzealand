
import React, { useState, useMemo, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Clock, ArrowRight, SlidersHorizontal, Users, Search, X } from 'lucide-react';
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
        <div className="container mx-auto px-6 lg:px-16 relative z-10">
          <div className="max-w-3xl">
             <span className="text-brand-accent font-bold tracking-[0.5em] uppercase block mb-6 text-[10px]">Discovery Center</span>
             <h1 className="text-5xl md:text-7xl font-serif font-bold mb-12">尋找您的<br/>命定探險</h1>
             
             <div className="relative max-w-2xl">
                <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none text-brand-ink/40">
                   <Search size={22} />
                </div>
                <input 
                  type="text" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="搜尋課程名稱、關鍵字或地點..."
                  className="w-full bg-white/95 backdrop-blur-md border-none py-6 pl-16 pr-20 rounded-full text-brand-ink text-lg focus:ring-4 focus:ring-brand-accent/20 transition-all shadow-premium"
                />
             </div>
          </div>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="sticky top-20 md:top-24 z-40 bg-brand-cream/95 backdrop-blur-md border-b border-brand-sage/10 py-6">
         <div className="container mx-auto px-6 lg:px-16 flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-2 text-brand-ink font-bold text-[11px] uppercase tracking-widest shrink-0">
               <SlidersHorizontal size={14} />
               <span>篩選行程</span>
            </div>
            <div className="flex flex-nowrap md:flex-wrap gap-2 overflow-x-auto no-scrollbar py-2">
               {TYPES.map(type => (
                 <button 
                  key={type}
                  onClick={() => handleFilterChange('type', type)}
                  className={`px-6 py-2.5 rounded-full text-[11px] font-bold transition-all whitespace-nowrap ${filters.type === type ? 'bg-brand-sage text-white shadow-premium' : 'bg-white text-brand-sub hover:bg-brand-sage/10 border border-brand-sage/10'}`}
                 >
                   {type}
                 </button>
               ))}
            </div>
         </div>
      </div>

      {/* Program Grid */}
      <div className="container mx-auto px-6 lg:px-16 py-20">
        {filteredPrograms.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {filteredPrograms.map(program => (
              <Link to={`/programs/${program.id}`} key={program.id} className="group flex flex-col bg-white rounded-[2.5rem] overflow-hidden shadow-zen hover:shadow-premium transition-all duration-700 hover:scale-[1.02] transform-gpu">
                <div className="relative h-72 overflow-hidden">
                   {/* 背景視差微位移效果 */}
                   <img 
                    src={program.image} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-115 group-hover:translate-y-[-5%]" 
                    alt={program.title} 
                   />
                   <div className="absolute inset-0 bg-brand-ink/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                   <div className="absolute top-6 left-6">
                      <span className="bg-white/95 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-bold text-brand-ink tracking-widest uppercase">
                         {program.city}
                      </span>
                   </div>
                </div>

                <div className="p-10 flex-grow flex flex-col">
                   <div className="flex justify-between items-start mb-6">
                      <span className="text-[10px] font-bold text-brand-accent uppercase tracking-[0.2em]">{program.type}</span>
                   </div>
                   <h3 className="text-2xl font-serif font-bold text-brand-ink leading-snug mb-8 group-hover:text-brand-sage transition-colors duration-300">
                      {program.title}
                   </h3>
                   
                   <div className="mt-auto pt-8 border-t border-brand-sage/5 flex items-center justify-between">
                      <div className="flex gap-5">
                         <div className="flex items-center gap-1.5 text-[10px] font-medium text-brand-sub">
                            <Clock size={14} className="text-brand-sage" />
                            {program.duration}
                         </div>
                         <div className="flex items-center gap-1.5 text-[10px] font-medium text-brand-sub">
                            <Users size={14} className="text-brand-sage" />
                            {program.ageRange}
                         </div>
                      </div>
                      <div className="w-10 h-10 rounded-full border border-brand-sage/20 flex items-center justify-center text-brand-sage group-hover:bg-brand-sage group-hover:text-white transition-all duration-300">
                         <ArrowRight size={18} />
                      </div>
                   </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-40">
             <h3 className="text-2xl font-serif font-bold text-brand-ink mb-4">找不到符合條件的行程</h3>
             <button onClick={() => setSearchTerm("")} className="text-brand-sage font-bold border-b border-brand-sage pb-1">重設搜尋條件</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Programs;

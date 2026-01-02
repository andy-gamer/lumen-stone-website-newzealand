
import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, Globe, BookOpen, Plane, Check, Star, GraduationCap, Clock, Search, FileText, MessageCircle, ChevronLeft, ChevronRight, ArrowUpRight, Users, X, ExternalLink, ShieldCheck, Sun, Award
} from 'lucide-react';
import { DataService } from '../services/db';
import { NewsItem } from '../types';

const Home: React.FC = () => {
  const newsRef = useRef<HTMLDivElement>(null);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [activeNewsIdx, setActiveNewsIdx] = useState(0);

  useEffect(() => {
    DataService.getNews().then(data => setNews(data.slice(0, 3)));
  }, []);

  const handleNewsScroll = (direction: 'left' | 'right') => {
    if (newsRef.current) {
      const { scrollLeft, clientWidth } = newsRef.current;
      const step = clientWidth * 0.9; 
      const scrollTo = direction === 'left' ? scrollLeft - step : scrollLeft + step;
      
      newsRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
      
      const newIdx = direction === 'left' ? Math.max(0, activeNewsIdx - 1) : Math.min(news.length - 1, activeNewsIdx + 1);
      setActiveNewsIdx(newIdx);
    }
  };

  const NewsModal = ({ item, onClose }: { item: NewsItem; onClose: () => void }) => {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10">
        <div className="absolute inset-0 bg-brand-ink/80 backdrop-blur-md animate-fade-in" onClick={onClose}></div>
        <div className="relative w-full max-w-4xl bg-brand-cream rounded-3xl shadow-heavy overflow-hidden animate-scale-up max-h-[90vh] flex flex-col">
          <button onClick={onClose} className="absolute top-6 right-6 z-20 w-12 h-12 rounded-full bg-brand-primary text-white flex items-center justify-center hover:bg-brand-ink transition-all shadow-lg">
            <X size={24} />
          </button>
          <div className="overflow-y-auto">
            <div className="relative h-64 md:h-[400px]">
               <img src={item.image} className="w-full h-full object-cover" alt={item.title} />
               <div className="absolute inset-0 bg-gradient-to-t from-brand-cream via-transparent to-transparent"></div>
            </div>
            <div className="p-8 md:p-16 -mt-20 relative z-10">
               <div className="flex items-center gap-4 mb-8">
                  <span className="px-3 py-1 bg-brand-primary text-white text-[9px] font-black uppercase tracking-widest rounded-md">
                    {item.category}
                  </span>
                  <span className="text-brand-accent font-black text-[10px] tracking-widest">{item.date}</span>
               </div>
               <h2 className="text-2xl md:text-3xl font-serif font-black text-brand-ink leading-tight mb-6">
                  {item.title}
               </h2>
               <div className="prose prose-stone max-w-none text-brand-sub text-base leading-loose font-light whitespace-pre-line">
                  {item.content || item.summary}
               </div>
               <div className="mt-10 pt-6 border-t border-brand-border flex flex-col md:flex-row gap-6 items-center justify-between">
                  <Link to="/booking" onClick={onClose} className="w-full md:w-auto px-8 py-3 bg-brand-primary text-white rounded-lg font-black text-[11px] uppercase tracking-[0.1em] hover:bg-brand-ink transition-all flex items-center justify-center gap-3 shadow-xl">
                     預開顧問說明 <ArrowRight size={16} />
                  </Link>
               </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-brand-cream selection:bg-brand-primary selection:text-white">
      {selectedNews && <NewsModal item={selectedNews} onClose={() => setSelectedNews(null)} />}

      {/* 1. HERO SECTION */}
      <section className="relative h-auto lg:min-h-[70vh] flex items-center pt-24 pb-12 md:pt-32 md:pb-20 overflow-hidden bg-brand-cream">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row-reverse items-center gap-10 lg:gap-16">
            
            <div className="w-full lg:w-[50%] relative animate-fade-in">
               <div className="relative aspect-[16/10] lg:aspect-[4/3] w-full rounded-2xl md:rounded-3xl overflow-hidden shadow-heavy group">
                  <img 
                    src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200&q=80" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" 
                    alt="International Students Exploring" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-brand-primary/40 to-transparent"></div>
               </div>
               <div className="absolute -bottom-6 -left-6 bg-brand-secondary text-brand-primary p-4 rounded-xl shadow-xl hidden lg:block animate-bounce-slow">
                  <GraduationCap size={24} />
               </div>
            </div>

            <div className="w-full lg:w-[50%] z-10 space-y-7 animate-fade-in text-center lg:text-left">
              <div className="space-y-4">
                <div className="flex items-center justify-center lg:justify-start gap-2">
                   <div className="w-6 h-[2px] bg-brand-primary"></div>
                   <span className="text-brand-primary font-black tracking-[0.3em] uppercase text-[9px]">Lumen Stone International</span>
                </div>
                <h1 className="text-3xl md:text-5xl xl:text-6xl font-serif font-black leading-[1.15] text-brand-ink tracking-tight">
                  啟發孩子<br/>
                  看見<span className="italic text-brand-primary">世界的寬廣</span>
                </h1>
                <p className="text-brand-sub text-[15px] md:text-base font-light leading-relaxed max-w-md mx-auto lg:mx-0">
                  我們不只是留學代辦，更是教育的策展人。透過點石精選的紐西蘭校園，讓學習不再侷限於課本。
                </p>
              </div>
              <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-3 pt-1">
                <Link to="/programs" className="px-7 py-2.5 bg-brand-primary text-white font-black rounded-md hover:bg-brand-ink transition-all tracking-[0.1em] text-[11px] uppercase shadow-md flex items-center justify-center gap-2.5 group">
                  方案探索 <ArrowRight className="group-hover:translate-x-1 transition-transform" size={14} />
                </Link>
                <Link to="/guide" className="px-7 py-2.5 bg-white border border-brand-primary text-brand-primary font-black rounded-md hover:bg-brand-primary hover:text-white transition-all tracking-[0.1em] text-[11px] uppercase flex items-center justify-center">
                  選課指南
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. ADVANTAGE SECTION */}
      <section className="py-24 md:py-32 bg-brand-primary text-brand-cream relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-brand-accent/20 rounded-full blur-[120px] -z-0"></div>
        
        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
            <div className="w-full lg:w-[45%] order-1">
              <div className="relative">
                <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border border-white/10 group">
                  <img 
                    src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1200&q=80" 
                    className="w-full h-full object-cover grayscale-[10%]" 
                    alt="NZ Education" 
                  />
                </div>
                <div className="absolute -bottom-6 -right-4 md:-right-6 max-w-[160px] md:max-w-[240px] bg-white p-5 rounded-xl shadow-heavy border border-brand-border animate-float">
                   <div className="flex gap-0.5 text-brand-accent mb-2.5">
                      {[1,2,3,4,5].map(i => <Star key={i} size={10} fill="currentColor"/>)}
                   </div>
                   <p className="text-[11px] md:text-xs font-serif font-black text-brand-ink leading-relaxed">
                     「在紐西蘭，老師問的是：<br/>
                     <span className="italic text-brand-accent">『你想成為什麼樣的人？』</span>」
                   </p>
                </div>
              </div>
            </div>

            <div className="w-full lg:w-[55%] space-y-8 order-2">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                   <div className="w-8 h-[1px] bg-brand-secondary"></div>
                   <span className="text-brand-secondary font-black tracking-[0.3em] uppercase text-[9px]">THE NEW ZEALAND WAY</span>
                </div>
                <h2 className="text-3xl md:text-5xl font-serif font-black leading-tight tracking-tight">
                  紐西蘭教育：<br/>
                  <span className="italic text-brand-secondary">成就無限可能的起點</span>
                </h2>
                <p className="text-brand-cream/60 text-[15px] md:text-base font-light leading-relaxed max-w-lg border-l-2 border-brand-accent/30 pl-6">
                  超越傳統競爭，我們更在乎孩子的獨特性與對生命的探索力。
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {[
                  { icon: <Award className="text-brand-secondary" size={18} />, title: "啟發式教學", desc: "引導孩子發現熱愛，而非填鴨知識。" },
                  { icon: <ShieldCheck className="text-brand-secondary" size={18} />, title: "安全友善", desc: "全球治安首選，讓學習更專注。" },
                  { icon: <GraduationCap className="text-brand-secondary" size={18} />, title: "頂尖學制", desc: "學歷通行全球，接軌一流名校。" },
                  { icon: <Sun className="text-brand-secondary" size={18} />, title: "大自然教室", desc: "在山海間學習生命力與韌性。" }
                ].map((item, idx) => (
                  <div key={idx} className="bg-white/5 p-5 rounded-xl border border-white/5 space-y-2.5 hover:bg-white/10 transition-all">
                    <div className="flex items-center gap-2.5">
                       <div className="w-7 h-7 rounded-lg bg-brand-secondary/10 flex items-center justify-center text-brand-secondary">
                          {item.icon}
                       </div>
                       <h4 className="text-sm font-serif font-bold text-white">{item.title}</h4>
                    </div>
                    <p className="text-[11px] text-brand-cream/40 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                 <Link to="/education" className="group relative inline-flex w-full md:w-auto items-center justify-center gap-2.5 px-7 py-3 bg-brand-secondary text-brand-primary rounded-md font-black text-[11px] tracking-[0.1em] uppercase transition-all shadow-lg hover:bg-white">
                    探索紐西蘭學制 <ArrowRight size={14} className="group-hover:translate-x-1.5 transition-transform" />
                 </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LATEST NEWS SECTION */}
      <section className="py-24 md:py-32 bg-brand-cream border-t border-brand-border overflow-hidden">
        <div className="container mx-auto px-6 lg:px-12">
           <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-14">
              <div className="space-y-3 text-center md:text-left">
                 <span className="text-brand-primary font-black tracking-[0.3em] uppercase text-[9px] block">Insights & Updates</span>
                 <h2 className="text-3xl md:text-5xl font-serif font-black text-brand-ink tracking-tight">最新消息</h2>
              </div>
              
              <div className="flex items-center justify-center gap-3.5">
                 <button 
                  onClick={() => handleNewsScroll('left')}
                  className="w-10 h-10 rounded-full bg-brand-primary text-white flex items-center justify-center shadow-md hover:bg-brand-ink active:scale-95 transition-all z-10"
                 >
                    <ChevronLeft size={18} />
                 </button>
                 <button 
                  onClick={() => handleNewsScroll('right')}
                  className="w-10 h-10 rounded-full bg-brand-primary text-white flex items-center justify-center shadow-md hover:bg-brand-ink active:scale-95 transition-all z-10"
                 >
                    <ChevronRight size={18} />
                 </button>
              </div>
           </div>
           
           <div 
            ref={newsRef}
            className="flex md:grid md:grid-cols-3 gap-6 overflow-x-auto md:overflow-visible scrollbar-hide snap-x snap-mandatory -mx-6 px-6 md:mx-0 md:px-0 pb-6"
           >
              {news.map((item, idx) => (
                <div 
                  key={item.id} 
                  onClick={() => setSelectedNews(item)} 
                  className="min-w-[85vw] md:min-w-0 snap-center group cursor-pointer bg-white rounded-xl p-7 shadow-zen border border-brand-border/40 hover:border-brand-primary/20 transition-all duration-300"
                >
                   <div className="relative aspect-[16/10] rounded-lg overflow-hidden mb-6">
                      <img src={item.image} className="w-full h-full object-cover grayscale-[5%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" alt={item.title} />
                      <div className="absolute top-4 right-4 bg-brand-primary text-white px-2.5 py-1 rounded text-[8px] font-black uppercase tracking-widest shadow-sm">
                         {item.category}
                      </div>
                   </div>
                   <div className="space-y-3.5">
                      <div className="flex items-center gap-3 text-brand-accent font-black text-[9px] uppercase tracking-[0.2em]">
                         <span>{item.date}</span>
                         <div className="h-[1px] flex-grow bg-brand-border/40"></div>
                      </div>
                      <h3 className="text-lg font-serif font-black text-brand-ink group-hover:text-brand-primary transition-colors leading-snug line-clamp-2">
                         {item.title}
                      </h3>
                      <p className="text-brand-sub text-[13px] font-light leading-relaxed line-clamp-2 opacity-70">
                         {item.summary}
                      </p>
                      <div className="pt-2 flex items-center gap-2 text-brand-primary font-black text-[9px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                         閱讀完整內容 <ArrowRight size={12} />
                      </div>
                   </div>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* FINAL CTA - Refined with Imagery and Depth */}
      <section className="relative py-48 md:py-64 flex items-center justify-center overflow-hidden">
         {/* Background Imagery Layer */}
         <div className="absolute inset-0 z-0 scale-105 animate-slow-zoom">
            <img 
              src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1920&q=80" 
              className="w-full h-full object-cover" 
              alt="NZ Landscapes" 
            />
            {/* Ink Mask with deep transparency and blur */}
            <div className="absolute inset-0 bg-brand-ink/80 backdrop-blur-[1px]"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-brand-ink via-transparent to-brand-ink/40"></div>
         </div>

         <div className="container mx-auto px-6 text-center relative z-10">
            <div className="max-w-4xl mx-auto space-y-10">
               <span className="text-brand-secondary/60 font-black tracking-[0.5em] uppercase text-[9px] block">Curating Your Path</span>
               <h2 className="text-5xl md:text-7xl lg:text-8xl font-serif font-black leading-[1.05] tracking-tight text-white drop-shadow-2xl">
                 Explore<br/><span className="text-brand-secondary italic">Your Future</span>
               </h2>
               <div className="flex justify-center pt-8">
                 <Link to="/booking" className="inline-flex items-center gap-5 px-10 py-4 bg-brand-secondary text-brand-primary font-black rounded-lg transition-all text-[12px] tracking-[0.2em] uppercase hover:bg-white shadow-2xl hover:scale-105 active:scale-95">
                    預約一對一諮詢 <ArrowRight size={20} />
                 </Link>
               </div>
               <p className="text-white/20 text-[10px] font-light mt-14 tracking-[0.2em] uppercase">專業顧問將於 24 小時內與您聯繫</p>
            </div>
         </div>
      </section>

      <style>{`
        @keyframes slow-zoom {
          0% { transform: scale(1); }
          100% { transform: scale(1.1); }
        }
        .animate-slow-zoom {
          animation: slow-zoom 30s infinite alternate ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default Home;

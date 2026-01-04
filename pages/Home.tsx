
import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, Globe, BookOpen, Plane, Check, Star, GraduationCap, Clock, Search, FileText, MessageCircle, ChevronLeft, ChevronRight, ArrowUpRight, Users, X, ShieldCheck, Sun, Award, Sparkles
} from 'lucide-react';
import { DataService } from '../services/db';
import { NewsItem } from '../types';

const Home: React.FC = () => {
  const newsRef = useRef<HTMLDivElement>(null);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);

  useEffect(() => {
    DataService.getNews().then(data => setNews(data));
  }, []);

  const handleNewsScroll = (direction: 'left' | 'right') => {
    if (newsRef.current) {
      const { scrollLeft, clientWidth } = newsRef.current;
      const step = clientWidth * 0.85; 
      const scrollTo = direction === 'left' ? scrollLeft - step : scrollLeft + step;
      newsRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-brand-cream selection:bg-brand-primary selection:text-white">
      {/* News Modal */}
      {selectedNews && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-brand-ink/80 backdrop-blur-md" onClick={() => setSelectedNews(null)}></div>
          <div className="relative w-full max-w-2xl bg-brand-cream rounded-[32px] shadow-heavy overflow-hidden animate-fade-in-up flex flex-col max-h-[85vh]">
            <button onClick={() => setSelectedNews(null)} className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-brand-primary text-white flex items-center justify-center shadow-lg"><X size={20}/></button>
            <div className="overflow-y-auto p-6 md:p-12">
               <div className="flex items-center gap-3 mb-4">
                  <span className="px-2 py-0.5 bg-brand-primary text-white text-[8px] font-black uppercase rounded">{selectedNews.category}</span>
                  <span className="text-brand-accent font-black text-[9px]">{selectedNews.date}</span>
               </div>
               <h2 className="text-xl md:text-2xl font-serif font-black text-brand-ink mb-6">{selectedNews.title}</h2>
               <div className="text-brand-sub text-sm leading-relaxed font-light whitespace-pre-line">{selectedNews.content || selectedNews.summary}</div>
            </div>
          </div>
        </div>
      )}

      {/* 1. HERO SECTION */}
      <section className="relative pt-24 pb-12 md:pt-40 md:pb-24 overflow-hidden bg-brand-cream">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row-reverse items-center gap-8 lg:gap-16">
            <div className="w-full lg:w-[50%] animate-fade-in-up">
               <div className="relative aspect-[16/10] lg:aspect-[4/3] w-full rounded-[32px] md:rounded-[48px] overflow-hidden shadow-heavy border-4 md:border-8 border-white group">
                  <img src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200&q=80" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" alt="Study in NZ" />
                  <div className="absolute inset-0 bg-gradient-to-tr from-brand-primary/20 to-transparent"></div>
               </div>
            </div>
            <div className="w-full lg:w-[50%] text-center lg:text-left space-y-6 md:space-y-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <div className="space-y-4 md:space-y-6">
                <div className="flex items-center justify-center lg:justify-start gap-3">
                   <div className="w-6 md:w-8 h-[2px] bg-brand-primary"></div>
                   <span className="text-brand-primary font-black tracking-[0.4em] uppercase text-[8px] md:text-[9px]">Lumen Stone Education</span>
                </div>
                <h1 className="text-3xl md:text-6xl xl:text-7xl font-serif font-black leading-tight text-brand-ink tracking-tighter">
                  解決學業焦慮<br/>
                  為孩子找回<span className="italic text-brand-primary">學習的快樂</span>
                </h1>
                <p className="text-brand-sub text-sm md:text-lg font-light leading-relaxed max-w-lg mx-auto lg:mx-0">
                  針對體制內適應困難、語言斷層焦慮，我們提供紐西蘭頂尖公私立校園媒合，讓孩子在尊重特質的環境中，直通世界百大名校。
                </p>
              </div>
              <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-3 pt-2">
                <Link to="/programs" className="px-8 py-3.5 bg-brand-primary text-white font-black rounded-xl hover:bg-brand-ink transition-all text-[11px] md:text-[12px] uppercase shadow-heavy flex items-center justify-center gap-3">
                  查看所有方案 <ArrowRight size={16} />
                </Link>
                <Link to="/guide" className="px-8 py-3.5 bg-white border border-brand-primary text-brand-primary font-black rounded-xl hover:bg-brand-primary hover:text-white transition-all text-[11px] md:text-[12px] uppercase flex items-center justify-center">
                  3分鐘精準配對
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EARLY BIRD BANNER */}
      <section className="container mx-auto px-6 lg:px-12 mb-12 md:mb-20 reveal">
         <div className="early-bird-shimmer relative rounded-2xl md:rounded-[40px] p-5 md:p-8 shadow-heavy overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 border border-brand-gold/30">
            <div className="flex items-center gap-4 md:gap-6 relative z-10">
               <div className="w-10 h-10 md:w-14 md:h-14 shrink-0 rounded-full bg-brand-ink text-brand-gold flex items-center justify-center shadow-lg">
                  <Sparkles size={20} />
               </div>
               <div className="text-left">
                  <span className="text-brand-ink font-black text-[8px] uppercase tracking-widest block mb-1">Priority Reservation</span>
                  <h2 className="text-sm md:text-base font-serif font-black text-brand-ink leading-tight">
                    紐西蘭公立名校 2025 名額稀缺，<span className="text-brand-primary">立即預約需求</span> 領取優先保留權！
                  </h2>
               </div>
            </div>
            <Link to="/guide" className="shrink-0 w-full md:w-auto px-6 md:px-8 py-3 bg-brand-ink text-white rounded-full font-black text-[10px] uppercase tracking-widest shadow-md hover:scale-105 transition-all flex items-center justify-center gap-3">
               立即精準配對 <ArrowRight size={14} />
            </Link>
         </div>
      </section>

      {/* LATEST NEWS SECTION */}
      <section className="py-12 md:py-20 bg-brand-cream border-t border-brand-border overflow-hidden">
        <div className="container mx-auto px-6 lg:px-12">
           <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 reveal">
              <div className="space-y-1 text-center md:text-left">
                 <span className="text-brand-primary font-black tracking-[0.4em] uppercase text-[9px] block">Updates</span>
                 <h2 className="text-3xl font-serif font-black text-brand-ink">最新動態</h2>
              </div>
              <div className="flex items-center justify-center gap-3">
                 <button onClick={() => handleNewsScroll('left')} className="w-9 h-9 rounded-full bg-brand-primary text-white flex items-center justify-center shadow-md active:scale-90 transition-all"><ChevronLeft size={16}/></button>
                 <button onClick={() => handleNewsScroll('right')} className="w-9 h-9 rounded-full bg-brand-primary text-white flex items-center justify-center shadow-md active:scale-90 transition-all"><ChevronRight size={16}/></button>
              </div>
           </div>
           
           <div ref={newsRef} className="flex gap-4 md:gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory -mx-6 px-6 md:mx-0 md:px-0">
              {news.map((item) => (
                <div key={item.id} onClick={() => setSelectedNews(item)} className="min-w-[75vw] md:min-w-[30%] lg:min-w-[28%] snap-center group cursor-pointer bg-white rounded-2xl p-6 shadow-zen border border-brand-border/40 hover:border-brand-primary/30 transition-all duration-300 reveal flex flex-col justify-between">
                   <div className="space-y-3">
                      <div className="flex items-center justify-between text-brand-accent font-black text-[9px] uppercase tracking-widest">
                         <span>{item.date}</span>
                         <span className="bg-brand-primary text-white px-2 py-0.5 rounded">{item.category}</span>
                      </div>
                      <h3 className="text-base font-serif font-black text-brand-ink group-hover:text-brand-primary transition-colors leading-tight line-clamp-2">{item.title}</h3>
                      <p className="text-brand-sub text-[12px] font-light leading-relaxed line-clamp-2">{item.summary}</p>
                   </div>
                   <div className="pt-4 flex items-center gap-2 text-brand-primary font-black text-[9px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">閱讀全文 <ArrowRight size={12} /></div>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* 2. ADVANTAGE SECTION */}
      <section className="py-20 md:py-32 bg-brand-primary text-brand-cream relative overflow-hidden">
        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
            <div className="w-full lg:w-[45%] reveal">
              <div className="relative">
                <div className="aspect-[4/5] rounded-[32px] overflow-hidden shadow-2xl border border-white/10">
                  <img src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1200&q=80" className="w-full h-full object-cover grayscale-[10%]" alt="NZ Education" />
                </div>
                <div className="absolute -bottom-6 -right-2 md:-right-8 max-w-[160px] md:max-w-[280px] bg-white p-5 md:p-8 rounded-2xl shadow-heavy border border-brand-border animate-float text-center">
                   <p className="text-[11px] md:text-sm font-serif font-black text-brand-ink leading-relaxed">
                     「跳脫死記硬背，<br/>
                     <span className="italic text-brand-accent">孩子本就該閃閃發亮。</span>」
                   </p>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-[55%] space-y-8 md:space-y-10 reveal" style={{ transitionDelay: '0.2s' }}>
              <div className="space-y-4 md:space-y-6">
                <div className="flex items-center gap-4">
                   <div className="w-10 h-[1px] bg-brand-secondary"></div>
                   <span className="text-brand-secondary font-black tracking-[0.4em] uppercase text-[9px]">YOUR PAIN POINTS, OUR MISSION</span>
                </div>
                <h2 className="text-3xl md:text-5xl font-serif font-black leading-tight tracking-tighter">
                  找回學習自主權：<br/>
                  <span className="italic text-brand-secondary">安全且接軌國際的選擇</span>
                </h2>
                <p className="text-brand-cream/70 text-sm md:text-lg font-light leading-relaxed max-w-xl border-l-2 border-brand-accent/40 pl-6">
                  與其在體制內焦慮徘徊，不如為孩子選擇尊重個性的教育。紐西蘭具備全球最高的保護國際生標準，並以 NCEA 評量系統對接全球百大名校。
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                {[
                  { icon: <Award size={18} />, title: "擺脫考試壓力", desc: "NCEA 認可平時實作表現，不再一試定生死。" },
                  { icon: <ShieldCheck size={18} />, title: "全球治安首選", desc: "唯一立法保護國際生之國家，安全度極高。" },
                  { icon: <GraduationCap size={18} />, title: "直升全球百大", desc: "學歷全球通用，輕鬆銜接英、美、澳名校。" },
                  { icon: <Sun size={18} />, title: "純淨英語語境", desc: "超低華人比率，建立道地英語口說自信。" }
                ].map((item, idx) => (
                  <div key={idx} className="bg-white/5 p-5 md:p-6 rounded-2xl border border-white/5 space-y-2 hover:bg-white/10 transition-all">
                    <div className="flex items-center gap-3 text-brand-secondary">
                       {item.icon}
                       <h4 className="text-base font-serif font-bold text-white">{item.title}</h4>
                    </div>
                    <p className="text-[11px] text-brand-cream/50 leading-loose">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. PROGRAM CATEGORIES - 需求導向分類 */}
      <section className="py-20 md:py-32 bg-white">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-4xl mx-auto text-center mb-12 md:mb-20 reveal">
             <span className="text-brand-primary font-black tracking-[0.5em] uppercase text-[9px] block mb-4">PRECISE MATCHING</span>
             <h2 className="text-3xl md:text-5xl font-serif font-black text-brand-ink tracking-tighter">為不同階段的家長精選方案</h2>
             <p className="mt-4 text-brand-sub text-sm md:text-lg font-light max-w-2xl mx-auto">
               不管是徹底擺脫升學壓力，還是短期體驗異國文化，我們根據孩子特質提供最精準的配對。
             </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-10">
            {[
              { 
                title: "長期留學 (學位銜接)", 
                type: "長期留學", 
                img: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&q=80", 
                duration: "1 學年起", 
                value: "針對國、高中生，提供完整的 NCEA 學制銜接，助力孩子攻讀英、美、澳頂尖大學。",
                icon: <GraduationCap size={24}/> 
              },
              { 
                title: "短期遊學 (寒暑假限定)", 
                type: "短期遊學", 
                img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80", 
                duration: "2 週 - 4 週", 
                value: "寒暑假營隊或主題式語言學習。在短時間內開啟孩子國際視野與口說自信。",
                icon: <Globe size={24}/> 
              },
              { 
                title: "微留學 (全真插班)", 
                type: "微留學", 
                img: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80", 
                duration: "2 週 - 8 週", 
                value: "孩子進入紐西蘭公立學校同步上課，體驗正式海外學籍與真實課堂互動。",
                icon: <Users size={24}/> 
              }
            ].map((item, idx) => (
              <div key={idx} className="group bg-brand-cream rounded-3xl overflow-hidden shadow-zen border border-brand-border flex flex-col hover:border-brand-primary/40 transition-all duration-500 hover:-translate-y-2 reveal" style={{ transitionDelay: `${idx * 0.1}s` }}>
                <div className="relative h-56 md:h-64 overflow-hidden">
                  <img src={item.img} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={item.title} />
                  <div className="absolute inset-0 bg-brand-primary/10"></div>
                </div>
                <div className="p-8 flex-grow flex flex-col space-y-4">
                  <div>
                    <h3 className="text-xl font-serif font-black text-brand-ink mb-1">{item.title}</h3>
                    <p className="text-[9px] text-brand-primary font-black uppercase tracking-widest">{item.type}</p>
                  </div>
                  <p className="text-sm text-brand-ink/80 leading-relaxed">{item.value}</p>
                  <div className="pt-4 border-t border-brand-border flex items-center justify-between mt-auto">
                    <Link to={`/programs?type=${item.type}`} className="flex items-center gap-2 text-brand-primary font-black text-[10px] uppercase tracking-widest">查看所有方案 <ArrowUpRight size={14} /></Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. SERVICE SOP */}
      <section className="py-20 md:py-32 bg-brand-primary text-white">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-16 md:mb-24 reveal">
             <h2 className="text-3xl md:text-5xl font-serif font-black mb-4">全方位守護服務</h2>
             <span className="text-brand-secondary tracking-[0.4em] uppercase text-[9px] font-black opacity-60">SIMPLE 5 STEPS TO THE WORLD</span>
          </div>
          <div className="max-w-5xl mx-auto space-y-12 md:space-y-0 md:flex md:justify-between">
            {[
              { id: "01", icon: <MessageCircle size={24} />, title: "痛點剖析", desc: "分析學生特質，找出合適跑道" },
              { id: "02", icon: <Search size={24} />, title: "方案媒合", desc: "根據預算與氣候精選校園" },
              { id: "03", icon: <FileText size={24} />, title: "無痛申辦", desc: "簽證與成績轉換全程代辦" },
              { id: "04", icon: <BookOpen size={24} />, title: "心理備戰", desc: "行前特訓，落地快速適應" },
              { id: "05", icon: <Plane size={24} />, title: "終生安置", desc: "接機與在學期間生活支援" }
            ].map((step, i) => (
              <div key={i} className="flex flex-row md:flex-col items-center gap-6 md:gap-4 text-left md:text-center reveal" style={{ transitionDelay: `${i * 0.1}s` }}>
                <div className="w-14 h-14 rounded-full bg-brand-primary border border-brand-secondary/30 flex items-center justify-center text-brand-secondary shadow-lg shrink-0 relative">
                  {step.icon}
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-brand-accent text-white rounded-full flex items-center justify-center text-[9px] font-black">{step.id}</span>
                </div>
                <div className="space-y-1">
                   <h4 className="text-lg font-serif font-bold">{step.title}</h4>
                   <p className="text-[11px] text-white/50 leading-relaxed font-light">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-16 text-center reveal">
             <Link to="/booking" className="inline-flex items-center gap-4 px-10 py-4 bg-brand-secondary text-brand-primary rounded-xl font-black text-[12px] tracking-[0.1em] uppercase hover:bg-white transition-all shadow-heavy">
                開始免費需求評估 <ArrowRight size={18} />
             </Link>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative py-40 md:py-64 flex items-center justify-center overflow-hidden">
         <div className="absolute inset-0">
            <img src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1920&q=80" className="w-full h-full object-cover" alt="Mountains" />
            <div className="absolute inset-0 bg-brand-ink/85"></div>
         </div>
         <div className="container mx-auto px-6 text-center relative z-10 reveal">
            <div className="max-w-4xl mx-auto space-y-10">
               <span className="text-brand-secondary/70 font-black tracking-[0.8em] uppercase text-[9px] block">A NEW CHAPTER</span>
               <h2 className="text-4xl md:text-8xl font-serif font-black leading-tight tracking-tighter text-white">
                 別讓標準化考試<br/><span className="text-brand-secondary italic">埋沒了光芒</span>
               </h2>
               <div className="flex justify-center pt-8">
                 <Link to="/booking" className="inline-flex items-center gap-6 px-10 py-4 bg-brand-secondary text-brand-primary font-black rounded-xl transition-all text-[12px] tracking-[0.2em] uppercase hover:bg-white shadow-2xl active:scale-95">
                    立即一對一免費面談 <ArrowRight size={20} />
                 </Link>
               </div>
            </div>
         </div>
      </section>
    </div>
  );
};

export default Home;


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
  const [activeNewsIdx, setActiveNewsIdx] = useState(0);

  useEffect(() => {
    DataService.getNews().then(data => setNews(data));
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
            <div className="h-24 bg-brand-primary/10"></div>
            <div className="p-8 md:p-16 relative z-10">
               <div className="flex items-center gap-4 mb-6">
                  <span className="px-3 py-1 bg-brand-primary text-white text-[9px] font-black uppercase tracking-widest rounded-md">
                    {item.category}
                  </span>
                  <span className="text-brand-accent font-black text-[10px] tracking-widest">{item.date}</span>
               </div>
               <h2 className="text-2xl md:text-3xl font-serif font-black text-brand-ink leading-tight mb-6">
                  {item.title}
               </h2>
               <div className="prose prose-stone max-w-none text-brand-sub text-sm md:text-base leading-relaxed font-light whitespace-pre-line">
                  {item.content || item.summary}
               </div>
               <div className="mt-8 pt-6 border-t border-brand-border flex flex-col md:flex-row gap-6 items-center justify-between">
                  <Link to="/booking" onClick={onClose} className="w-full md:w-auto px-8 py-3 bg-brand-primary text-white rounded-lg font-black text-[11px] uppercase tracking-[0.1em] hover:bg-brand-ink transition-all flex items-center justify-center gap-3 shadow-xl">
                     預約顧問諮詢 <ArrowRight size={16} />
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
      <section className="relative h-auto lg:min-h-[85vh] flex items-center pt-28 pb-12 md:pt-40 md:pb-24 overflow-hidden bg-brand-cream">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row-reverse items-center gap-10 lg:gap-16">
            <div className="w-full lg:w-[50%] relative animate-fade-in">
               <div className="relative aspect-[16/10] lg:aspect-[4/3] w-full rounded-2xl md:rounded-[48px] overflow-hidden shadow-heavy group border-8 border-white">
                  <img 
                    src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200&q=80" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" 
                    alt="Study in NZ" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-brand-primary/40 to-transparent"></div>
               </div>
               <div className="absolute -bottom-6 -left-6 bg-brand-secondary text-brand-primary p-6 rounded-3xl shadow-xl hidden lg:block animate-bounce-slow border-4 border-white">
                  < GraduationCap size={32} />
               </div>
            </div>
            <div className="w-full lg:w-[50%] z-10 space-y-8 animate-fade-in text-center lg:text-left">
              <div className="space-y-6">
                <div className="flex items-center justify-center lg:justify-start gap-3">
                   <div className="w-8 h-[2px] bg-brand-primary"></div>
                   <span className="text-brand-primary font-black tracking-[0.4em] uppercase text-[9px]">Professional Study Abroad Curation</span>
                </div>
                <h1 className="text-4xl md:text-6xl xl:text-7xl font-serif font-black leading-[1.1] text-brand-ink tracking-tighter">
                  為孩子找對跑道<br/>
                  比<span className="italic text-brand-primary">贏在起跑點</span>更重要
                </h1>
                <p className="text-brand-sub text-[16px] md:text-lg font-light leading-relaxed max-w-lg mx-auto lg:mx-0">
                  針對國高中學業焦慮、語言適應困難，提供最精準的紐西蘭校園媒合服務。我們不只是代辦，更是幫助孩子找回學習熱情的教育引路人。
                </p>
              </div>
              <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-3 pt-2">
                <Link to="/programs" className="px-8 py-3.5 bg-brand-primary text-white font-black rounded-xl hover:bg-brand-ink transition-all tracking-[0.1em] text-[12px] uppercase shadow-heavy flex items-center justify-center gap-3 group">
                  探索精選方案 <ArrowRight className="group-hover:translate-x-1 transition-transform" size={16} />
                </Link>
                <Link to="/guide" className="px-8 py-3.5 bg-white border border-brand-primary text-brand-primary font-black rounded-xl hover:bg-brand-primary hover:text-white transition-all tracking-[0.1em] text-[12px] uppercase flex items-center justify-center shadow-sm">
                  3分鐘選課指南
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EARLY BIRD BANNER */}
      <section className="container mx-auto px-6 lg:px-12 mb-16">
         <div className="early-bird-shimmer relative rounded-2xl md:rounded-[40px] p-4 md:p-6 shadow-heavy overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 border border-brand-gold/30">
            <div className="flex items-center gap-4 md:gap-6 relative z-10">
               <div className="w-12 h-12 md:w-14 md:h-14 shrink-0 rounded-full bg-brand-ink text-brand-gold flex items-center justify-center shadow-lg">
                  <Sparkles size={24} />
               </div>
               <div className="text-left">
                  <div className="flex items-center gap-2 mb-1">
                     <span className="bg-brand-ink text-white text-[7px] font-black uppercase tracking-[0.2em] px-2 py-0.5 rounded">Priority</span>
                     <span className="text-brand-ink font-black text-[9px] uppercase tracking-widest">2025 名額預約</span>
                  </div>
                  <h2 className="text-sm md:text-base font-serif font-black text-brand-ink leading-tight">
                    紐西蘭公立名校名額有限，立即完成測驗領取 <span className="text-brand-primary">「名額優先保留」</span> 權利！
                  </h2>
               </div>
            </div>
            <Link to="/guide" className="shrink-0 w-full md:w-auto px-8 py-3 bg-brand-ink text-white rounded-full font-black text-[11px] uppercase tracking-[0.2em] shadow-md hover:scale-105 transition-all flex items-center justify-center gap-3 group">
               立即精準配對 <ArrowRight className="group-hover:translate-x-1 transition-transform" size={14} />
            </Link>
         </div>
      </section>

      {/* LATEST NEWS SECTION */}
      <section className="py-12 md:py-16 bg-brand-cream border-t border-brand-border overflow-hidden">
        <div className="container mx-auto px-6 lg:px-12">
           <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
              <div className="space-y-1 text-center md:text-left">
                 <span className="text-brand-primary font-black tracking-[0.4em] uppercase text-[9px] block">Updates</span>
                 <h2 className="text-3xl md:text-4xl font-serif font-black text-brand-ink tracking-tighter">最新消息</h2>
              </div>
              <div className={`flex items-center justify-center gap-4 ${news.length <= 1 ? 'hidden' : ''}`}>
                 <button onClick={() => handleNewsScroll('left')} className="w-10 h-10 rounded-full bg-brand-primary text-white flex items-center justify-center shadow hover:bg-brand-ink transition-all"><ChevronLeft size={18}/></button>
                 <button onClick={() => handleNewsScroll('right')} className="w-10 h-10 rounded-full bg-brand-primary text-white flex items-center justify-center shadow hover:bg-brand-ink transition-all"><ChevronRight size={18}/></button>
              </div>
           </div>
           
           <div ref={newsRef} className={`flex md:grid md:grid-cols-3 gap-6 overflow-x-auto md:overflow-visible scrollbar-hide snap-x snap-mandatory -mx-6 px-6 md:mx-0 md:px-0 pb-4 ${news.length === 1 ? 'md:justify-center' : ''}`}>
              {news.map((item) => (
                <div key={item.id} onClick={() => setSelectedNews(item)} className={`min-w-[85vw] md:min-w-0 snap-center group cursor-pointer bg-white rounded-2xl p-6 shadow-zen border border-brand-border/40 hover:border-brand-primary/30 transition-all duration-300 flex flex-col justify-between ${news.length === 1 ? 'md:col-span-1 max-w-sm mx-auto' : ''}`}>
                   <div className="space-y-3">
                      <div className="flex items-center gap-4 text-brand-accent font-black text-[9px] uppercase tracking-[0.2em]">
                         <span>{item.date}</span>
                         <div className="h-[1px] flex-grow bg-brand-border/40"></div>
                      </div>
                      <span className="bg-brand-primary text-white text-[7px] font-black uppercase px-2 py-0.5 rounded w-fit">{item.category}</span>
                      <h3 className="text-lg font-serif font-black text-brand-ink group-hover:text-brand-primary transition-colors leading-tight line-clamp-2">{item.title}</h3>
                      <p className="text-brand-sub text-[13px] font-light leading-relaxed line-clamp-2 opacity-80">{item.summary}</p>
                   </div>
                   <div className="pt-4 flex items-center gap-2 text-brand-primary font-black text-[9px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">閱讀全文 <ArrowRight size={12} /></div>
                </div>
              ))}
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
                  <img src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1200&q=80" className="w-full h-full object-cover grayscale-[10%]" alt="NZ Education" />
                </div>
                <div className="absolute -bottom-8 -right-4 md:-right-8 max-w-[180px] md:max-w-[280px] bg-white p-6 rounded-2xl shadow-heavy border border-brand-border animate-float text-center">
                   <p className="text-[12px] md:text-sm font-serif font-black text-brand-ink leading-relaxed">
                     「解決孩子在體制內的壓抑，<br/>
                     <span className="italic text-brand-accent">找回學習的快樂與競爭力。</span>」
                   </p>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-[55%] space-y-10 order-2">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                   <div className="w-10 h-[1px] bg-brand-secondary"></div>
                   <span className="text-brand-secondary font-black tracking-[0.4em] uppercase text-[10px]">REAL NEEDS, REAL RESULTS</span>
                </div>
                <h2 className="text-3xl md:text-5xl font-serif font-black leading-tight tracking-tighter">
                  跳脫無效競爭：<br/>
                  <span className="italic text-brand-secondary">安全且更高效的升學選擇</span>
                </h2>
                <p className="text-brand-cream/70 text-[16px] md:text-lg font-light leading-relaxed max-w-xl border-l-2 border-brand-accent/40 pl-8">
                  我們理解您對孩子學業落後、或是對治安不穩的焦慮。紐西蘭提供全球最高的國際生保護標準，並具備與英美加澳完全銜接的學分系統。
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { icon: <Award className="text-brand-secondary" size={20} />, title: "認可平時努力", desc: "NCEA 學制不只看考試，平時表現也是升學關鍵。" },
                  { icon: <ShieldCheck className="text-brand-secondary" size={20} />, title: "全球治安首選", desc: "唯一政府立法保護國際生的國家，家長最放心。" },
                  { icon: <GraduationCap className="text-brand-secondary" size={20} />, title: "直通百大名校", desc: "跳過競爭激烈的學測，用紐西蘭成績申請世界百大。" },
                  { icon: <Sun className="text-brand-secondary" size={20} />, title: "解決語言斷層", desc: "低比例華人語境，讓孩子在半年內建立生活溝通力。" }
                ].map((item, idx) => (
                  <div key={idx} className="bg-white/5 p-6 rounded-2xl border border-white/5 space-y-3 hover:bg-white/10 transition-all">
                    <div className="flex items-center gap-3">
                       <div className="w-8 h-8 rounded-lg bg-brand-secondary/10 flex items-center justify-center text-brand-secondary">{item.icon}</div>
                       <h4 className="text-base font-serif font-bold text-white">{item.title}</h4>
                    </div>
                    <p className="text-[12px] text-brand-cream/50 leading-loose">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. PROGRAM CATEGORIES - 具體需求導向 */}
      <section className="py-24 md:py-40 bg-white">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-4xl mx-auto text-center mb-20">
             <span className="text-brand-primary font-black tracking-[0.5em] uppercase text-[10px] block mb-6">PRECISE MATCHING</span>
             <h2 className="text-4xl md:text-6xl font-serif font-black text-brand-ink tracking-tighter">選擇合適的留遊學方案</h2>
             <p className="mt-8 text-brand-sub text-[16px] md:text-lg font-light max-w-2xl mx-auto">
               不管是長期升學規劃，還是短期的文化衝擊，我們根據您的預算、學制對接需求與孩子特質，精選最適合的起點。
             </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {[
              { 
                title: "長期學位留學", 
                type: "Higher Education Path", 
                img: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&q=80", 
                duration: "1 學年起", 
                value: "針對國、高中生，提供完整的學制銜接，助力孩子攻讀英、美、澳頂尖大學。",
                bullets: ["學分 100% 國際認可", "奧克蘭八大校園獨家合作", "全程生活監護與學力提升"],
                icon: <GraduationCap size={24}/> 
              },
              { 
                title: "微留學體驗營", 
                type: "Short-term Full Immersion", 
                img: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80", 
                duration: "2 週 - 8 週", 
                value: "插班紐西蘭公立學校。孩子進入真實課堂，與當地同學同步上課、交流。",
                bullets: ["獨家 Buddy 一對一學伴制度", "家長可同步體驗海外生活", "快速建立口說自信與生活適應力"],
                icon: <Users size={24}/> 
              },
              { 
                title: "精銳語文特訓", 
                type: "Language Booster", 
                img: "https://images.unsplash.com/photo-1523908511403-7fc7b25592f4?w=800&q=80", 
                duration: "4 週起", 
                value: "適合大學生或社會人士。在最純淨的英語語境中，透過密集溝通快速躍升語言能力。",
                bullets: ["雅思、多益專業證照衝刺", "強化職場專業會話與寫作", "結交世界各地的國際友人"],
                icon: <Globe size={24}/> 
              }
            ].map((item, idx) => (
              <div key={idx} className="group bg-brand-cream rounded-3xl overflow-hidden shadow-zen border border-brand-border flex flex-col hover:border-brand-primary/40 transition-all duration-500 hover:-translate-y-2">
                <div className="relative h-64 overflow-hidden">
                  <img src={item.img} className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700" alt={item.title} />
                </div>
                <div className="p-8 flex-grow flex flex-col space-y-6">
                  <div>
                    <h3 className="text-xl font-serif font-black text-brand-ink mb-2">{item.title}</h3>
                    <p className="text-[9px] text-brand-primary font-black uppercase tracking-widest">{item.type}</p>
                  </div>
                  <div className="space-y-4">
                    <p className="text-sm text-brand-ink/80 leading-relaxed font-bold">{item.value}</p>
                    <ul className="space-y-2.5">
                      {item.bullets.map((b, bi) => (
                        <li key={bi} className="flex items-start gap-3 text-xs text-brand-sub font-light">
                          <Check size={14} className="text-brand-primary shrink-0 mt-1" />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="pt-6 border-t border-brand-border flex items-center justify-between mt-auto">
                    <Link to="/programs" className="flex items-center gap-2 text-brand-primary font-black text-[11px] uppercase tracking-widest">
                      查看所有方案 <ArrowUpRight size={16} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. SERVICE SOP */}
      <section className="py-24 md:py-32 bg-brand-primary text-white relative">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-24">
             <h2 className="text-4xl md:text-5xl font-serif font-black mb-6">服務流程</h2>
             <span className="text-brand-secondary tracking-[0.5em] uppercase text-[10px] font-black opacity-60">HOW WE SUPPORT YOUR GROWTH</span>
          </div>
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-10">
            {[
              { id: "01", icon: <MessageCircle size={24} />, title: "需求諮詢", desc: "分析學生特質，找出最適合的學制跑道" },
              { id: "02", icon: <Search size={24} />, title: "方案媒合", desc: "根據預算、氣候與校風精準推薦校園" },
              { id: "03", icon: <FileText size={24} />, title: "申辦支援", desc: "繁瑣簽證、成績轉換與保險文件全程代辦" },
              { id: "04", icon: <BookOpen size={24} />, title: "行前特訓", desc: "獨家 LPP 會話特訓，讓孩子落地不卡關" },
              { id: "05", icon: <Plane size={24} />, title: "落地安置", desc: "接機、宿舍管理、在學期間 24/7 生活支援" }
            ].map((step, i) => (
              <div key={i} className="flex flex-col items-center text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-brand-primary border border-brand-secondary/30 flex items-center justify-center text-brand-secondary shadow-xl relative">
                  {step.icon}
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-brand-accent text-white rounded-full flex items-center justify-center text-[9px] font-black">{step.id}</span>
                </div>
                <h4 className="text-lg font-serif font-bold">{step.title}</h4>
                <p className="text-[12px] text-white/50 leading-relaxed font-light">{step.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-20 text-center">
             <Link to="/booking" className="inline-flex items-center gap-4 px-10 py-4 bg-brand-secondary text-brand-primary rounded-xl font-black text-[12px] tracking-[0.1em] uppercase hover:bg-white transition-all shadow-heavy">
                開始您的需求諮詢 <ArrowRight size={18} />
             </Link>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative py-48 md:py-64 flex items-center justify-center overflow-hidden">
         <div className="absolute inset-0 z-0">
            <img src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1920&q=80" className="w-full h-full object-cover scale-105" alt="Mountains" />
            <div className="absolute inset-0 bg-brand-ink/85 backdrop-blur-[2px]"></div>
         </div>
         <div className="container mx-auto px-6 text-center relative z-10">
            <div className="max-w-4xl mx-auto space-y-12">
               <span className="text-brand-secondary/70 font-black tracking-[0.8em] uppercase text-[10px] block">A NEW START BEGINS HERE</span>
               <h2 className="text-5xl md:text-8xl font-serif font-black leading-[1.05] tracking-tighter text-white">
                 讓孩子在對的地方<br/><span className="text-brand-secondary italic">發揮天賦</span>
               </h2>
               <div className="flex justify-center pt-10">
                 <Link to="/booking" className="inline-flex items-center gap-6 px-12 py-5 bg-brand-secondary text-brand-primary font-black rounded-xl transition-all text-[13px] tracking-[0.3em] uppercase hover:bg-white shadow-2xl hover:scale-105 active:scale-95">
                    立即安排一對一面談 <ArrowRight size={24} />
                 </Link>
               </div>
            </div>
         </div>
      </section>
    </div>
  );
};

export default Home;

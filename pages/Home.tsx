
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
      
      // Update active index based on scroll position (approximate)
      const newIdx = direction === 'left' ? Math.max(0, activeNewsIdx - 1) : Math.min(news.length - 1, activeNewsIdx + 1);
      setActiveNewsIdx(newIdx);
    }
  };

  const NewsModal = ({ item, onClose }: { item: NewsItem; onClose: () => void }) => {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10">
        <div className="absolute inset-0 bg-brand-ink/80 backdrop-blur-md animate-fade-in" onClick={onClose}></div>
        <div className="relative w-full max-w-4xl bg-brand-cream rounded-2xl shadow-heavy overflow-hidden animate-scale-up max-h-[90vh] flex flex-col">
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
                  <span className="px-4 py-1.5 bg-brand-primary text-white text-[9px] font-black uppercase tracking-widest rounded-sm">
                    {item.category}
                  </span>
                  <span className="text-brand-accent font-black text-[10px] tracking-widest">{item.date}</span>
               </div>
               <h2 className="text-3xl md:text-5xl font-serif font-black text-brand-ink leading-tight mb-8">
                  {item.title}
               </h2>
               <div className="prose prose-stone max-w-none text-brand-sub leading-loose font-light whitespace-pre-line">
                  {item.content || item.summary}
               </div>
               <div className="mt-16 pt-10 border-t border-brand-border flex flex-col md:flex-row gap-6 items-center justify-between">
                  <Link to="/booking" onClick={onClose} className="w-full md:w-auto px-12 py-5 bg-brand-primary text-white rounded-xl font-black text-[11px] uppercase tracking-[0.2em] hover:bg-brand-ink transition-all flex items-center justify-center gap-3 shadow-xl">
                     預約顧問說明 <ArrowRight size={18} />
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

      {/* 1. HERO SECTION - Mobile: Image First, Desktop: Text First */}
      <section className="relative h-auto lg:min-h-[75vh] flex items-center pt-28 pb-12 md:pt-44 md:pb-20 overflow-hidden bg-brand-cream">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row-reverse items-center gap-10 lg:gap-16">
            
            {/* Hero Image - Appears first on mobile */}
            <div className="w-full lg:w-[50%] relative animate-fade-in">
               <div className="relative aspect-[16/10] lg:aspect-[4/3] w-full rounded-2xl md:rounded-3xl overflow-hidden shadow-heavy group">
                  <img 
                    src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200&q=80" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" 
                    alt="International Students Exploring" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-brand-primary/40 to-transparent"></div>
               </div>
               {/* Floating Batch - Desktop Only */}
               <div className="absolute -bottom-6 -left-6 bg-brand-secondary text-brand-primary p-6 rounded-2xl shadow-xl hidden lg:block animate-bounce-slow">
                  <GraduationCap size={32} />
               </div>
            </div>

            {/* Hero Text */}
            <div className="w-full lg:w-[50%] z-10 space-y-8 animate-fade-in text-center lg:text-left">
              <div className="space-y-4">
                <div className="flex items-center justify-center lg:justify-start gap-3">
                   <div className="w-6 h-[2px] bg-brand-primary"></div>
                   <span className="text-brand-primary font-black tracking-[0.4em] uppercase text-[9px]">Lumen Stone International</span>
                </div>
                <h1 className="text-5xl md:text-7xl xl:text-8xl font-serif font-black leading-[1.05] text-brand-ink tracking-tighter">
                  啟發孩子<br/>
                  看見<span className="italic text-brand-primary">世界的寬廣</span>
                </h1>
                <p className="text-brand-sub text-base md:text-lg font-light leading-relaxed max-w-lg mx-auto lg:mx-0">
                  我們不只是留學代辦，更是教育的策展人。透過點石精選的紐西蘭校園，讓學習不再侷限於課本。
                </p>
              </div>
              <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 pt-2">
                <Link to="/programs" className="px-12 py-5 bg-brand-primary text-white font-black rounded-xl hover:bg-brand-ink transition-all tracking-[0.2em] text-[11px] uppercase shadow-heavy flex items-center justify-center gap-3 group">
                  方案探索 <ArrowRight className="group-hover:translate-x-1 transition-transform" size={18} />
                </Link>
                <Link to="/guide" className="px-12 py-5 bg-white border-2 border-brand-primary text-brand-primary font-black rounded-xl hover:bg-brand-primary hover:text-white transition-all tracking-[0.2em] text-[11px] uppercase flex items-center justify-center shadow-sm">
                  選課指南
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. ADVANTAGE SECTION */}
      <section className="py-24 md:py-28 bg-brand-primary text-brand-cream relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-brand-accent/20 rounded-full blur-[120px] -z-0"></div>
        
        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            <div className="w-full lg:w-[45%] order-1">
              <div className="relative">
                <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl border border-white/10 group">
                  <img 
                    src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1200&q=80" 
                    className="w-full h-full object-cover grayscale-[10%]" 
                    alt="NZ Education" 
                  />
                </div>
                <div className="absolute -bottom-6 -right-4 md:-right-8 max-w-[200px] md:max-w-[300px] bg-white p-6 md:p-8 rounded-2xl shadow-heavy border border-brand-border animate-float">
                   <div className="flex gap-1 text-brand-accent mb-3">
                      {[1,2,3,4,5].map(i => <Star key={i} size={10} fill="currentColor"/>)}
                   </div>
                   <p className="text-xs md:text-sm font-serif font-black text-brand-ink leading-relaxed">
                     「在紐西蘭，老師問的是：<br/>
                     <span className="italic text-brand-accent">『你想成為什麼樣的人？』</span>」
                   </p>
                </div>
              </div>
            </div>

            <div className="w-full lg:w-[55%] space-y-10 order-2">
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                   <div className="w-8 h-[1px] bg-brand-secondary"></div>
                   <span className="text-brand-secondary font-black tracking-[0.4em] uppercase text-[10px]">THE NEW ZEALAND WAY</span>
                </div>
                <h2 className="text-4xl md:text-6xl font-serif font-black leading-tight tracking-tighter">
                  紐西蘭教育：<br/>
                  <span className="italic text-brand-secondary">成就無限可能的起點</span>
                </h2>
                <p className="text-brand-cream/70 text-base md:text-lg font-light leading-relaxed max-w-xl border-l-2 border-brand-accent/40 pl-6">
                  超越傳統競爭，我們更在乎孩子的獨特性與對生命的探索力。
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
                {[
                  { icon: <Award className="text-brand-secondary" size={20} />, title: "啟發式教學", desc: "引導孩子發現熱愛，而非填鴨知識。" },
                  { icon: <ShieldCheck className="text-brand-secondary" size={20} />, title: "安全友善", desc: "全球治安首選，讓學習更專注。" },
                  { icon: <GraduationCap className="text-brand-secondary" size={20} />, title: "頂尖學制", desc: "學歷通行全球，接軌一流名校。" },
                  { icon: <Sun className="text-brand-secondary" size={20} />, title: "大自然教室", desc: "在山海間學習生命力與韌性。" }
                ].map((item, idx) => (
                  <div key={idx} className="bg-white/5 p-6 rounded-2xl border border-white/5 space-y-3 hover:bg-white/10 transition-all">
                    <div className="flex items-center gap-4">
                       <div className="w-10 h-10 rounded-xl bg-brand-secondary/10 flex items-center justify-center text-brand-secondary">
                          {item.icon}
                       </div>
                       <h4 className="text-lg font-serif font-bold text-white">{item.title}</h4>
                    </div>
                    <p className="text-xs text-brand-cream/40 leading-loose">{item.desc}</p>
                  </div>
                ))}
              </div>

              <div className="pt-4">
                 <Link to="/education" className="group relative inline-flex w-full md:w-auto items-center justify-center gap-6 px-12 py-5 bg-brand-secondary text-brand-primary rounded-xl font-black text-[11px] tracking-[0.4em] uppercase transition-all shadow-xl hover:scale-105">
                    探索紐西蘭學制 <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                 </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LATEST NEWS SECTION - No Scrollbar, Button Navigation */}
      <section className="py-20 md:py-28 bg-brand-cream border-t border-brand-border overflow-hidden">
        <div className="container mx-auto px-6 lg:px-12">
           <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-12">
              <div className="space-y-4 text-center md:text-left">
                 <span className="text-brand-primary font-black tracking-[0.4em] uppercase text-[9px] block">Insights & Updates</span>
                 <h2 className="text-4xl md:text-5xl font-serif font-black text-brand-ink tracking-tighter">最新消息</h2>
              </div>
              
              <div className="flex items-center justify-center gap-4">
                 <button 
                  onClick={() => handleNewsScroll('left')}
                  className="w-14 h-14 rounded-full bg-brand-primary text-white flex items-center justify-center shadow-lg hover:bg-brand-ink active:scale-90 transition-all z-10"
                 >
                    <ChevronLeft size={24} />
                 </button>
                 <button 
                  onClick={() => handleNewsScroll('right')}
                  className="w-14 h-14 rounded-full bg-brand-primary text-white flex items-center justify-center shadow-lg hover:bg-brand-ink active:scale-90 transition-all z-10"
                 >
                    <ChevronRight size={24} />
                 </button>
              </div>
           </div>
           
           {/* scrollbar-hide ensures no ugly scrollbar */}
           <div 
            ref={newsRef}
            className="flex md:grid md:grid-cols-3 gap-6 overflow-x-auto md:overflow-visible scrollbar-hide snap-x snap-mandatory -mx-6 px-6 md:mx-0 md:px-0 pb-4"
           >
              {news.map((item, idx) => (
                <div 
                  key={item.id} 
                  onClick={() => setSelectedNews(item)} 
                  className="min-w-[85vw] md:min-w-0 snap-center group cursor-pointer bg-white rounded-2xl p-7 shadow-zen border border-brand-border/40 hover:border-brand-primary/30 transition-all duration-300"
                >
                   <div className="relative aspect-[16/10] rounded-xl overflow-hidden mb-7">
                      <img src={item.image} className="w-full h-full object-cover grayscale-[10%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" alt={item.title} />
                      <div className="absolute top-4 right-4 bg-brand-primary text-white px-3 py-1.5 rounded-lg text-[8px] font-black uppercase tracking-widest shadow-md">
                         {item.category}
                      </div>
                   </div>
                   <div className="space-y-4">
                      <div className="flex items-center gap-4 text-brand-accent font-black text-[9px] uppercase tracking-[0.2em]">
                         <span>{item.date}</span>
                         <div className="h-[1px] flex-grow bg-brand-border/60"></div>
                      </div>
                      <h3 className="text-xl md:text-2xl font-serif font-black text-brand-ink group-hover:text-brand-primary transition-colors leading-tight line-clamp-2">
                         {item.title}
                      </h3>
                      <p className="text-brand-sub text-sm font-light leading-relaxed line-clamp-2 opacity-80">
                         {item.summary}
                      </p>
                      <div className="pt-4 flex items-center gap-2 text-brand-primary font-black text-[9px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                         閱讀完整內容 <ArrowRight size={14} />
                      </div>
                   </div>
                </div>
              ))}
           </div>
           
           <div className="flex justify-center gap-1.5 mt-8 md:hidden">
              {news.map((_, i) => (
                <div key={i} className={`h-1 rounded-full transition-all duration-300 ${activeNewsIdx === i ? 'w-6 bg-brand-primary' : 'w-2 bg-brand-border'}`}></div>
              ))}
           </div>
        </div>
      </section>

      {/* 3. PROGRAM CATEGORIES - Updated Title and Info */}
      <section className="py-24 md:py-32 bg-white">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-4xl mx-auto text-center mb-16 md:mb-24">
             <span className="text-brand-primary font-black tracking-[0.5em] uppercase text-[10px] block mb-4">EDUCATION CURATION</span>
             <h2 className="text-4xl md:text-6xl font-serif font-black text-brand-ink tracking-tighter">為您規劃最理想的起點</h2>
             <p className="mt-6 text-brand-sub text-lg font-light max-w-2xl mx-auto">
               我們將繁雜的資訊系統化，針對不同學習目標，提供具備深度與溫度的專業建議。
             </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {[
              { 
                title: "長期留學", 
                type: "Study Abroad", 
                img: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&q=80", 
                duration: "1 - 4 學年", 
                value: "完整 NCEA/IB 學制銜接，奧克蘭八大名校定向培養。",
                bullets: ["學歷通行全球頂尖大學", "專業職涯發展與升學諮詢", "落地生活與住宿安置支援"],
                icon: <GraduationCap size={24}/> 
              },
              { 
                title: "密集遊學", 
                type: "Language Tour", 
                img: "https://images.unsplash.com/photo-1523908511403-7fc7b25592f4?w=800&q=80", 
                duration: "4 週 - 半年", 
                value: "密集口說實戰，結合戶外探險與世界各地的朋友交流。",
                bullets: ["全英語浸潤式學習環境", "皇后鎮冒險與城市文化探索", "強化雅思/托福應試能力"],
                icon: <Globe size={24}/> 
              },
              { 
                title: "微留學", 
                type: "Micro Study", 
                img: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80", 
                duration: "2 週 - 4 週", 
                value: "插班紐西蘭公立學校，專屬 Buddy 學伴制度領航。",
                bullets: ["與當地 Kiwi 學生同步上課", "深入在地寄宿家庭文化", "親子共讀與彈性旅遊安排"],
                icon: <Users size={24}/> 
              }
            ].map((item, idx) => (
              <div key={idx} className="group bg-brand-cream rounded-2xl overflow-hidden shadow-zen border border-brand-border flex flex-col hover:border-brand-primary/40 transition-all duration-500 hover:-translate-y-2">
                <div className="relative h-64 overflow-hidden">
                  <img src={item.img} className="w-full h-full object-cover grayscale-[10%] group-hover:grayscale-0 transition-all duration-700" alt={item.title} />
                  <div className="absolute inset-0 bg-brand-primary/10"></div>
                </div>
                <div className="p-10 flex-grow flex flex-col space-y-7">
                  <div>
                    <h3 className="text-3xl font-serif font-black text-brand-ink mb-2">{item.title}</h3>
                    <p className="text-[10px] text-brand-primary font-black uppercase tracking-widest">{item.type}</p>
                  </div>
                  <div className="space-y-5">
                    <div className="flex items-start gap-4">
                      <Clock className="w-5 h-5 text-brand-primary mt-1 shrink-0" />
                      <div>
                        <p className="text-[9px] font-black text-brand-ink/30 uppercase tracking-widest mb-1">Duration</p>
                        <p className="text-base font-bold text-brand-ink">{item.duration}</p>
                      </div>
                    </div>
                    <div className="flex flex-col gap-3">
                       <p className="text-sm text-brand-ink/80 leading-relaxed font-bold">{item.value}</p>
                       <ul className="space-y-2">
                         {item.bullets.map((b, bi) => (
                           <li key={bi} className="flex items-center gap-3 text-xs text-brand-sub font-light">
                             <Check size={14} className="text-brand-primary shrink-0" />
                             {b}
                           </li>
                         ))}
                       </ul>
                    </div>
                  </div>
                  <div className="pt-8 border-t border-brand-border flex items-center justify-between mt-auto">
                    <Link to="/programs" className="flex items-center gap-2 text-brand-primary font-black text-[11px] uppercase tracking-widest group-hover:gap-4 transition-all">
                      瀏覽完整細節 <ArrowUpRight size={16} />
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
        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <div className="text-center mb-24">
             <h2 className="text-4xl md:text-5xl font-serif font-black mb-4">服務流程</h2>
             <span className="text-brand-secondary tracking-[0.5em] uppercase text-[10px] font-black opacity-60">SIMPLE 5 STEPS TO THE WORLD</span>
          </div>

          <div className="max-w-4xl mx-auto relative">
            {/* Desktop Horizontal Line */}
            <div className="absolute top-[40px] left-[10%] w-[80%] h-[1px] bg-white/10 hidden lg:block z-0"></div>
            
            {/* Mobile Vertical Path Line */}
            <div className="absolute left-[39px] top-8 bottom-8 w-[1px] bg-white/10 lg:hidden border-l-2 border-brand-secondary/30 border-dashed"></div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-10">
              {[
                { id: "01", icon: <MessageCircle size={28} />, title: "需求諮詢", desc: "深度訪談目標與預算設定" },
                { id: "02", icon: <Search size={28} />, title: "精準配對", desc: "精選最適合環境與學制" },
                { id: "03", icon: <FileText size={28} />, title: "報名代辦", desc: "全程文件與簽證支援" },
                { id: "04", icon: <BookOpen size={28} />, title: "行前特訓", desc: "獨家 LPP 語言心理準備" },
                { id: "05", icon: <Plane size={28} />, title: "落地安置", desc: "落地與全程生活關懷支援" }
              ].map((step, i) => (
                <div key={i} className="flex flex-row lg:flex-col items-start lg:items-center text-left lg:text-center group gap-8 lg:gap-0">
                  <div className="relative shrink-0 mb-0 lg:mb-10">
                    <div className="w-20 h-20 rounded-full bg-brand-primary border border-white/20 flex items-center justify-center text-brand-secondary group-hover:bg-brand-secondary group-hover:text-brand-primary transition-all duration-500 shadow-xl group-hover:scale-110">
                      {step.icon}
                    </div>
                    <div className="absolute -top-1 -right-1 w-7 h-7 bg-brand-accent text-white rounded-full flex items-center justify-center text-[10px] font-black border-2 border-brand-primary">
                      {step.id}
                    </div>
                  </div>
                  <div className="space-y-3 lg:pt-0 pt-3">
                    <h4 className="text-xl md:text-2xl font-serif font-bold text-white group-hover:text-brand-secondary transition-colors">{step.title}</h4>
                    <p className="text-sm text-white/50 leading-relaxed max-w-[180px] lg:mx-auto font-light">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mt-24 text-center">
             <Link to="/booking" className="inline-flex items-center gap-6 px-14 py-6 bg-brand-secondary text-brand-primary rounded-xl font-black text-[12px] tracking-[0.4em] uppercase hover:bg-white transition-all shadow-heavy active:scale-95">
                啟動您的遊學計畫 <ArrowRight size={20} />
             </Link>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-40 bg-white text-brand-ink relative overflow-hidden">
         <div className="container mx-auto px-6 text-center">
            <div className="max-w-4xl mx-auto space-y-12">
               <span className="text-brand-primary font-black tracking-[0.6em] uppercase text-[10px] block">BEYOND BOUNDARIES</span>
               <h2 className="text-6xl md:text-9xl font-serif font-black leading-none tracking-tighter">
                 Explore<br/><span className="text-brand-primary italic">Your Future</span>
               </h2>
               <div className="flex justify-center pt-8">
                 <Link to="/booking" className="inline-flex items-center gap-8 px-16 py-8 bg-brand-primary text-white font-black rounded-xl transition-all text-[14px] tracking-[0.4em] uppercase hover:bg-brand-ink shadow-2xl hover:scale-105 active:scale-95">
                    預約一對一諮詢 <ArrowRight size={32} />
                 </Link>
               </div>
               <p className="text-brand-sub text-sm font-light mt-12 opacity-50">專業顧問將於 24 小時內與您聯繫</p>
            </div>
         </div>
      </section>
    </div>
  );
};

export default Home;

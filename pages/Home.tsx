
import React, { useState, useEffect, ReactNode, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, Shield, Wallet, School, Plane, 
  Compass, Map, MapPin, Sparkles, Calendar, Heart, Waves, Trees, Sun, Quote
} from 'lucide-react';

const FadeInSection: React.FC<{ children: ReactNode; delay?: string; className?: string }> = ({ children, delay = '0s', className = '' }) => {
  const [isVisible, setVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) setVisible(true);
      });
    }, { threshold: 0.1 });
    if (domRef.current) observer.observe(domRef.current);
    return () => { if (domRef.current) observer.unobserve(domRef.current); };
  }, []);
  return (
    <div ref={domRef} className={`fade-in-section ${isVisible ? 'visible' : ''} ${className}`} style={{ transitionDelay: delay }}>
      {children}
    </div>
  );
};

const Home: React.FC = () => {
  return (
    <div className="bg-brand-cream overflow-x-hidden">
      
      {/* 🟢 Hero: 藝術意境開場 */}
      <section className="relative min-h-[90vh] flex items-center pt-20 px-6 lg:px-12">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2 z-10 space-y-10">
              <FadeInSection>
                <div className="flex items-center gap-2 text-brand-accent font-bold text-xs tracking-[0.4em] uppercase mb-4">
                  <Sparkles size={14} /> Since 2012 Lumen Stone
                </div>
                <h1 className="text-6xl md:text-8xl font-serif font-bold text-brand-ink leading-tight">
                  讓視野，<br/>
                  決定成長的<br/>
                  <span className="underline-art italic">高度</span>
                </h1>
                <p className="text-xl text-brand-sub max-w-md font-light leading-loose">
                  在南半球的長白雲之下，點石留遊學為您尋找最純粹的教育體驗，在自然與校園間編織夢想。
                </p>
                <div className="flex flex-col sm:flex-row gap-6 pt-6">
                  <Link to="/nz-guide" className="px-10 py-5 bg-brand-sage text-white font-bold rounded-full hover:bg-brand-ink transition-all shadow-premium flex items-center justify-center gap-3">
                    紐西蘭選課指南 <ArrowRight size={18} />
                  </Link>
                  <Link to="/programs" className="px-10 py-5 border border-brand-accent text-brand-accent font-bold rounded-full hover:bg-brand-accent hover:text-white transition-all flex items-center justify-center">
                    精選方案
                  </Link>
                </div>
              </FadeInSection>
            </div>
            
            <div className="lg:w-1/2 relative">
               <div className="relative w-full aspect-[4/5] md:aspect-square overflow-hidden custom-shape shadow-premium border-8 border-white">
                  <img 
                    src="https://images.unsplash.com/photo-1528605248644-14dd04cb113d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=90" 
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                    alt="Education in NZ"
                  />
               </div>
               {/* 藝術性裝飾元素 */}
               <div className="absolute -top-12 -right-12 w-64 h-64 bg-brand-accent/10 rounded-full blur-3xl animate-pulse"></div>
               <div className="absolute bottom-10 -left-10 p-10 bg-white/90 backdrop-blur-md rounded-[40px] shadow-premium max-w-xs border border-white/50 sketch-border z-20">
                  <Quote className="text-brand-accent mb-4 opacity-50" size={24} />
                  <p className="font-serif italic text-brand-ink text-lg leading-relaxed">「教育不是注滿一桶水，而是點燃一把火。」</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* 🟢 紐西蘭專區：文青百科視覺強化 */}
      <section className="py-32 bg-white relative overflow-hidden">
        {/* 背景自然紋理裝飾 */}
        <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none">
           <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
             <path d="M0,50 Q25,30 50,50 T100,50" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-brand-sage" />
             <path d="M0,70 Q25,50 50,70 T100,70" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-brand-accent" />
           </svg>
        </div>

        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row gap-24 items-center">
             <div className="lg:w-1/2 space-y-12">
                <FadeInSection>
                  <div className="inline-flex items-center gap-3 px-4 py-2 bg-brand-light rounded-full text-brand-sage font-bold text-[10px] tracking-[0.3em] uppercase mb-4">
                    <Trees size={14}/> Nature's Classroom
                  </div>
                  <h2 className="text-4xl md:text-7xl font-serif font-bold text-brand-ink leading-[1.1]">長白雲之鄉：<br/><span className="text-brand-sage">全世界</span>最純淨的教室</h2>
                  <p className="text-xl text-brand-sub font-light leading-loose max-w-xl">
                     為什麼 90% 的低齡家長首選紐西蘭？<br/>
                     這裡拒絕焦慮，尊重個性。我們陪伴孩子在星空、大海與校園之間，找回對世界的原始好奇與熱情。
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 pt-6">
                     <div className="group space-y-4">
                        <div className="w-16 h-16 bg-brand-sage/5 text-brand-sage flex items-center justify-center rounded-3xl group-hover:bg-brand-sage group-hover:text-white transition-all duration-500 shadow-zen">
                           <Shield size={28}/>
                        </div>
                        <h4 className="text-xl font-serif font-bold text-brand-ink">溫暖的安全感</h4>
                        <p className="text-sm text-brand-sub font-light leading-relaxed">全球和平指數 Top 2。在這裡，信任是空氣中的基本成分，讓孩子放膽探索。</p>
                     </div>
                     <div className="group space-y-4">
                        <div className="w-16 h-16 bg-brand-accent/5 text-brand-accent flex items-center justify-center rounded-3xl group-hover:bg-brand-accent group-hover:text-white transition-all duration-500 shadow-zen">
                           <Waves size={28}/>
                        </div>
                        <h4 className="text-xl font-serif font-bold text-brand-ink">深度融入學伴</h4>
                        <p className="text-sm text-brand-sub font-light leading-relaxed">獨家 Buddy 學伴計畫，拒絕成為班級的旁聽生，讓當地朋友帶領孩子融入社群。</p>
                     </div>
                  </div>
                  
                  <Link to="/nz-guide" className="inline-flex items-center gap-4 text-brand-sage font-bold py-5 px-12 border-2 border-brand-sage/20 rounded-full hover:bg-brand-sage hover:text-white transition-all shadow-zen mt-8">
                    紐西蘭教育百科與指南 <ArrowRight size={20} />
                  </Link>
                </FadeInSection>
             </div>
             
             <div className="lg:w-1/2 relative">
                {/* 錯位動態版面 */}
                <div className="grid grid-cols-2 gap-8">
                   <FadeInSection delay="0.2s" className="space-y-8 pt-20">
                      <div className="rounded-[60px] overflow-hidden shadow-premium aspect-[4/5] transform hover:-rotate-2 transition-transform duration-700">
                         <img src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80" className="w-full h-full object-cover"/>
                      </div>
                      <div className="bg-brand-sage text-white p-10 rounded-[50px] shadow-premium text-center relative">
                         <div className="absolute -top-4 -left-4 w-12 h-12 bg-brand-accent rounded-full flex items-center justify-center font-serif italic text-2xl border-4 border-white">N</div>
                         <h4 className="font-serif text-2xl mb-3 italic">NZQA 認證</h4>
                         <p className="text-xs opacity-80 leading-loose font-light">不僅是體驗，更是含金量十足的學術銜接路徑。</p>
                      </div>
                   </FadeInSection>
                   
                   <FadeInSection delay="0.4s" className="space-y-8">
                      <div className="bg-brand-ink text-brand-cream p-12 rounded-[60px] text-center flex flex-col items-center justify-center border-2 border-brand-accent/20 shadow-premium group">
                         <Compass size={48} className="mb-6 text-brand-accent group-hover:rotate-45 transition-transform duration-1000"/>
                         <h4 className="text-xl font-bold mb-4 tracking-wider">選課迷惘嗎？</h4>
                         <p className="text-xs opacity-60 mb-8 font-light">讓我們用 2 分鐘，為您分析出最適合孩子的成長方案。</p>
                         <Link to="/nz-guide" className="w-full py-4 bg-brand-accent text-white text-xs rounded-full font-bold shadow-gold hover:translate-y-[-2px] transition-all">
                            立即進行互動診斷
                         </Link>
                      </div>
                      <div className="rounded-[60px] overflow-hidden shadow-premium aspect-[4/5] transform hover:rotate-2 transition-transform duration-700">
                         <img src="https://images.unsplash.com/photo-1470770841072-f978cf4d019e?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80" className="w-full h-full object-cover"/>
                      </div>
                   </FadeInSection>
                </div>
                {/* 裝飾線條 */}
                <svg className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] opacity-10" viewBox="0 0 100 100">
                   <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="0.2" strokeDasharray="2,2" className="text-brand-sage" />
                </svg>
             </div>
          </div>
        </div>
      </section>

      {/* 🟢 透明預算承諾 */}
      <section className="py-32 bg-brand-cream relative overflow-hidden">
        <div className="container mx-auto px-6 lg:px-12 text-center">
          <FadeInSection>
            <div className="max-w-3xl mx-auto mb-24 space-y-8">
               <h2 className="text-4xl md:text-6xl font-serif font-bold text-brand-ink leading-tight">透明，<br/><span className="text-brand-accent">是我們對信任的理解</span></h2>
               <div className="h-px w-24 bg-brand-accent mx-auto"></div>
               <p className="text-xl text-brand-sub font-light leading-relaxed">點石堅持代辦費與第三方費用（學費、住宿）獨立報價，確保每一分教育投資都清晰、合理且具備價值。</p>
            </div>
          </FadeInSection>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto">
             {[
               { icon: <Wallet size={32}/>, color: "brand-sage", title: "專業諮詢代辦", desc: "含精確的校園媒合、文件指導、簽證協助與當地 24H 繁體支援。" },
               { icon: <School size={32}/>, color: "brand-accent", title: "官方學雜費", desc: "依照校方 Invoice 原始單據電匯。不賺取匯差，無任何隱藏行政收費。" },
               { icon: <Plane size={32}/>, color: "brand-ink", title: "住宿與生活", desc: "寄宿家庭與機票實報實銷。我們親自走訪每一間宿舍與 Home stay。" }
             ].map((item, i) => (
               <FadeInSection key={i} delay={`${i * 0.1}s`}>
                 <div className="group p-12 bg-white rounded-[60px] shadow-zen hover:shadow-premium transition-all duration-500 border-b-[8px] border-transparent hover:border-brand-accent flex flex-col items-center h-full">
                    <div className={`mb-8 text-${item.color} group-hover:scale-110 transition-transform`}>{item.icon}</div>
                    <h5 className="text-2xl font-serif font-bold mb-6 text-brand-ink">{item.title}</h5>
                    <p className="text-base text-brand-sub font-light leading-loose">{item.desc}</p>
                 </div>
               </FadeInSection>
             ))}
          </div>
        </div>
      </section>

      {/* 🟢 說明會區塊：文青手繪明信片質感 */}
      <section id="events" className="py-32 bg-brand-paper relative overflow-hidden">
        {/* 手繪點綴背景 */}
        <div className="absolute top-20 right-20 opacity-10 pointer-events-none rotate-12">
           <Sun size={200} strokeWidth={0.5} className="text-brand-accent" />
        </div>
        
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row gap-16 items-end mb-24">
             <FadeInSection className="lg:w-2/3 space-y-8">
                <span className="text-brand-accent font-bold tracking-[0.6em] text-xs uppercase block">Postcards & Conversations</span>
                <h2 className="text-4xl md:text-7xl font-serif font-bold text-brand-ink">讓對話，<br/>為您的旅程開場</h2>
                <p className="text-xl text-brand-sub font-light max-w-2xl leading-relaxed">
                   不確定的資訊我們幫您過濾。歡迎來到我們的講座，像是老朋友般的聚會，一起描繪未來的藍圖。
                </p>
             </FadeInSection>
             <div className="lg:w-1/3 text-right">
                <Link to="/booking" className="inline-flex items-center gap-3 text-brand-sage font-bold border-b-2 border-brand-sage pb-2 hover:text-brand-accent hover:border-brand-accent transition-all text-2xl group">
                   報名近期分享會 <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
                </Link>
             </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
             {[
               { date: "09.14 SAT", time: "14:00 - 16:00", title: "紐西蘭微留學：親子插班實踐攻略", location: "台北市信義路 101 辦公室", tag: "實體講座", color: "bg-brand-sage" },
               { date: "09.20 FRI", time: "20:00 - 21:30", title: "中學升學全解析：NCEA 與未來規劃", location: "線上 Zoom 雲端視訊", tag: "線上視訊", color: "bg-brand-accent" }
             ].map((event, i) => (
               <FadeInSection key={i} delay={`${i * 0.2}s`} className="relative group">
                  {/* 明信片背景感 */}
                  <div className="absolute inset-0 bg-brand-cream shadow-zen rounded-[60px] transform group-hover:rotate-1 transition-transform duration-500"></div>
                  
                  <div className="relative bg-white p-12 md:p-16 rounded-[60px] shadow-premium hover:-translate-y-3 transition-all duration-500 border border-brand-accent/5 sketch-border overflow-hidden">
                     {/* 郵戳質感 Badge */}
                     <div className="absolute top-10 right-10 w-24 h-24 border-2 border-dashed border-brand-accent/20 rounded-full flex items-center justify-center rotate-12 opacity-40 group-hover:opacity-100 group-hover:rotate-0 transition-all duration-1000">
                        <span className="text-[10px] font-bold text-brand-accent tracking-tighter text-center leading-tight">LUMEN<br/>STONE<br/>STAMP</span>
                     </div>
                     
                     <div className="flex flex-col h-full">
                        <div className="mb-10 flex items-center gap-4">
                           <div className={`w-3 h-3 rounded-full ${event.color}`}></div>
                           <span className="text-brand-accent font-black text-lg tracking-widest">{event.date}</span>
                           <span className="text-brand-sub font-light text-sm">/ {event.time}</span>
                        </div>
                        
                        <h4 className="text-3xl md:text-4xl font-serif font-bold text-brand-ink mb-10 group-hover:text-brand-sage transition-colors leading-tight">
                           {event.title}
                        </h4>
                        
                        <div className="mt-auto pt-10 border-t border-brand-accent/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                           <div className="space-y-2">
                              <span className="text-brand-sub text-sm flex items-center gap-2 font-medium">
                                 <MapPin size={18} className="text-brand-accent"/> {event.location}
                              </span>
                              <div className="inline-block px-4 py-1 bg-brand-light text-brand-sage text-[10px] font-bold rounded-full uppercase tracking-widest">
                                 {event.tag}
                              </div>
                           </div>
                           <Link to="/booking" className="group/btn relative px-8 py-4 bg-brand-ink text-white rounded-2xl font-bold text-sm tracking-widest overflow-hidden">
                              <span className="relative z-10">預約席次</span>
                              <div className="absolute inset-0 bg-brand-sage translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300"></div>
                           </Link>
                        </div>
                     </div>
                  </div>
               </FadeInSection>
             ))}
          </div>
        </div>
      </section>

      {/* 🟢 Final CTA */}
      <section className="py-40 bg-brand-ink text-white text-center relative overflow-hidden">
         <div className="container mx-auto px-6 relative z-10">
            <FadeInSection>
               <h2 className="text-4xl md:text-8xl font-serif font-bold mb-16 leading-tight">故事的下一章，<br/>在世界的課堂展開。</h2>
               <div className="flex flex-col sm:flex-row justify-center gap-8">
                  <Link to="/booking" className="inline-block bg-brand-accent text-white px-20 py-7 font-bold rounded-full hover:bg-white hover:text-brand-ink transition-all shadow-gold tracking-[0.3em] text-base border border-brand-accent">
                     預約一場探索之約
                  </Link>
                  <Link to="/nz-guide" className="inline-block bg-white/5 backdrop-blur-md text-white px-20 py-7 font-bold rounded-full border border-white/20 hover:bg-white/10 transition-all tracking-[0.3em] text-base">
                     閱讀選課百科
                  </Link>
               </div>
            </FadeInSection>
         </div>
         {/* 抽象背景 */}
         <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] opacity-20 pointer-events-none"></div>
         <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80vw] h-[80vw] bg-brand-sage/5 rounded-full blur-[120px] pointer-events-none"></div>
      </section>

    </div>
  );
};

export default Home;


import React, { useState, useEffect, ReactNode, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, MapPin, Sparkles, BookOpen, Globe, Calendar, 
  CheckCircle2, Award, Zap, GraduationCap, Clock, Users
} from 'lucide-react';
import { PROGRAMS } from '../constants';

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
    <div className="bg-brand-cream">
      
      {/* 🟢 Hero Section: 專注轉換與清晰資訊 */}
      <section className="relative min-h-[80vh] flex items-center pt-24 px-6 lg:px-12">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2 z-10 space-y-10">
              <FadeInSection>
                <div className="flex items-center gap-4 text-brand-sage font-bold text-[11px] tracking-[0.4em] uppercase mb-6">
                  <span className="w-12 h-px bg-brand-sage"></span> Lumen Stone Education
                </div>
                <h1 className="text-5xl md:text-7xl font-serif font-bold text-brand-ink leading-[1.15] tracking-tight">
                  讓孩子在純淨的<br/>
                  <span className="editorial-underline">紐西蘭教室</span><br/>
                  自然開啟國際視野
                </h1>
                <p className="text-lg text-brand-sub max-w-xl font-light leading-relaxed pt-6">
                  我們專精於 6-15 歲紐西蘭插班微留學。不只是行政代辦，我們從在地顧問支援到校園媒合，為您的孩子提供最穩定的成長銜接。
                </p>
                <div className="flex flex-col sm:flex-row gap-5 pt-12">
                  <Link to="/booking" className="px-12 py-5 bg-brand-ink text-white text-[13px] font-bold tracking-[0.2em] hover:bg-brand-sage transition-all rounded-full shadow-premium uppercase flex items-center justify-center gap-3 group">
                    預約專家諮詢 <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link to="/programs" className="px-10 py-5 bg-white text-brand-sage border border-brand-sage/10 font-bold rounded-full hover:bg-brand-sage hover:text-white transition-all flex items-center justify-center gap-2 group">
                    探索遊學行程
                  </Link>
                </div>
              </FadeInSection>
            </div>
            
            <div className="lg:w-1/2 relative flex justify-center">
               <div className="relative w-full max-w-md aspect-[4/5] overflow-hidden rounded-3xl shadow-2xl">
                  <img 
                    src="https://images.unsplash.com/photo-1528605248644-14dd04cb113d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=90" 
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                    alt="New Zealand Classroom"
                  />
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* 🟢 三大方案對照: 協助家長快速決策 */}
      <section className="section-padding bg-white">
         <div className="container mx-auto px-6 lg:px-12">
            <div className="max-w-3xl mb-24">
               <h2 className="text-4xl md:text-5xl font-serif font-bold text-brand-ink mb-6">選擇最適合孩子的路徑</h2>
               <p className="text-brand-sub font-light text-lg">依據學習目標與停留時間，精準媒合對應方案。</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
               {[
                 {
                   title: "紐西蘭微留學",
                   en: "Immersion Study",
                   icon: <GraduationCap size={28}/>,
                   desc: "1-4 週短期插班，直接進入當地公立學校。與 Kiwi 同學共同上課，體驗最道地的啟發式教育。",
                   bestFor: "想深度體驗學制、考慮長期留學前的評估。",
                   color: "bg-brand-cream/40"
                 },
                 {
                   title: "寒暑假特色營隊",
                   en: "Seasonal Camps",
                   icon: <Globe size={28}/>,
                   desc: "針對假期設計的封閉式營隊。結合英語課程與豐富的戶外運動，在團體中培養獨立性。",
                   bestFor: "第一次嘗試出國、想在樂趣中建立語言興趣。",
                   color: "bg-brand-ink text-brand-cream"
                 },
                 {
                   title: "長期升學規劃",
                   en: "Full Academic",
                   icon: <BookOpen size={28}/>,
                   desc: "銜接中學 NCEA 學制或大學預科。目標獲取國外正式文憑，並規畫全球頂尖大學升學。",
                   bestFor: "國高中階段學員、有長期海外求學規劃。",
                   color: "bg-white border border-brand-sage/10"
                 }
               ].map((item, idx) => (
                 <FadeInSection key={idx} delay={`${idx * 0.1}s`} className={`${item.color} p-12 rounded-[2rem] flex flex-col h-full group`}>
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-10 ${idx === 1 ? 'bg-brand-accent' : 'bg-brand-sage text-white'}`}>
                       {item.icon}
                    </div>
                    <h4 className="text-2xl font-serif font-bold mb-2">{item.title}</h4>
                    <span className="text-[10px] font-bold tracking-widest uppercase opacity-40 mb-8 block">{item.en}</span>
                    <p className={`text-sm font-light leading-relaxed mb-10 flex-grow ${idx === 1 ? 'text-white/70' : 'text-brand-sub'}`}>{item.desc}</p>
                    <div className="pt-8 border-t border-brand-sage/10">
                       <p className="text-[11px] font-bold uppercase tracking-widest mb-2 opacity-50">適合對象</p>
                       <p className="text-xs font-medium leading-relaxed mb-8">{item.bestFor}</p>
                       <Link to="/programs" className={`inline-flex items-center gap-2 font-bold text-sm border-b pb-1 transition-all ${idx === 1 ? 'text-brand-accent border-brand-accent/30' : 'text-brand-sage border-brand-sage/30'}`}>
                          詳細方案對比 <ArrowRight size={16}/>
                       </Link>
                    </div>
                 </FadeInSection>
               ))}
            </div>
         </div>
      </section>

      {/* 🟢 推薦課程: 快速預覽行程 */}
      <section className="section-padding bg-brand-cream/30">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="space-y-4">
               <span className="text-brand-accent font-bold tracking-[0.4em] text-[10px] uppercase block">Selected Programs</span>
               <h2 className="text-4xl font-serif font-bold text-brand-ink">本季推薦行程</h2>
            </div>
            <Link to="/programs" className="text-brand-sage font-bold border-b border-brand-sage/30 pb-1 text-sm">查看所有遊學行程</Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {PROGRAMS.slice(0, 3).map((program) => (
              <Link to={`/programs/${program.id}`} key={program.id} className="group bg-white rounded-3xl overflow-hidden shadow-zen hover:shadow-premium transition-all duration-700">
                <div className="relative h-64 overflow-hidden">
                  <img src={program.image} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt={program.title} />
                  <div className="absolute top-4 left-4 bg-brand-ink/90 text-white text-[10px] px-3 py-1 rounded-full uppercase tracking-widest">
                    {program.city}
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-xl font-serif font-bold text-brand-ink mb-4 group-hover:text-brand-sage transition-colors leading-tight">{program.title}</h3>
                  <div className="flex items-center justify-between pt-6 border-t border-brand-sage/5">
                    <span className="text-[11px] font-bold text-brand-sub uppercase tracking-widest">{program.duration}</span>
                    <ArrowRight size={16} className="text-brand-sage group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 🟢 顧問服務價值: 強調專業支持 */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="space-y-12">
               <div className="space-y-4">
                  <h2 className="text-4xl md:text-5xl font-serif font-bold text-brand-ink">為什麼選擇點石？</h2>
                  <p className="text-brand-sub font-light text-lg leading-loose">我們深耕教育顧問多年，深知「安全」與「適應」是家長最核心的掛念。我們不追求規模，只追求每一次媒合的精確度。</p>
               </div>
               
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                  {[
                    { 
                      icon: <MapPin className="text-brand-sage" size={24} />, 
                      title: "奧克蘭在地支持", 
                      desc: "並非轉介外部機構。點石派駐在地專員，提供 24/7 緊急支援與最即時的生活照顧。" 
                    },
                    { 
                      icon: <Award className="text-brand-sage" size={24} />, 
                      title: "校園深度媒合", 
                      desc: "根據孩子個性選校，確保學籍銜接。不推銷商業化名校，只推選真正友善的環境。" 
                    },
                    { 
                      icon: <Zap className="text-brand-sage" size={24} />, 
                      title: "同步透明報價", 
                      desc: "所有學費皆與紐西蘭校方官方定價同步。零隱藏費用，為家長把關每一分教育預算。" 
                    },
                    { 
                      icon: <Users className="text-brand-sage" size={24} />, 
                      title: "學伴制度對策", 
                      desc: "與校方深度溝通，為每位微留學生落實 Buddy 制度，縮短孩子跨文化的適應期。" 
                    }
                  ].map((f, i) => (
                    <div key={i} className="space-y-4">
                       <div className="w-10 h-10 bg-brand-cream rounded-xl flex items-center justify-center text-brand-sage">
                          {f.icon}
                       </div>
                       <h5 className="font-bold text-brand-ink text-sm tracking-wide">{f.title}</h5>
                       <p className="text-xs text-brand-sub leading-relaxed font-light">{f.desc}</p>
                    </div>
                  ))}
               </div>
            </div>
            
            <div className="relative">
               <div className="aspect-square bg-brand-cream rounded-full absolute -inset-10 -z-10 opacity-50 blur-3xl"></div>
               <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-6 pt-12">
                    <img src="https://images.unsplash.com/photo-1571260899304-425eee4c7efc?auto=format&fit=crop&w=400&q=80" className="rounded-3xl shadow-premium w-full" alt="Counseling" />
                    <div className="bg-brand-ink p-8 rounded-3xl text-brand-cream">
                       <h6 className="font-serif font-bold text-lg mb-4 italic">“Education First”</h6>
                       <p className="text-[10px] opacity-60 leading-relaxed font-light">我們認為遊學不僅是語言的精進，更是人格在不同環境下的重新探索。</p>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div className="bg-brand-accent p-8 rounded-3xl text-white">
                       <p className="text-2xl font-serif font-bold mb-1">12+</p>
                       <p className="text-[10px] uppercase tracking-widest opacity-80">多年紐西蘭深耕經驗</p>
                    </div>
                    <img src="https://images.unsplash.com/photo-1544717297-fa95b6ee9643?auto=format&fit=crop&w=400&q=80" className="rounded-3xl shadow-premium w-full" alt="Students" />
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* 🟢 精簡版說明會: 放置於底部作為 CTA 補充 */}
      <section className="py-24 bg-brand-cream/40 border-t border-brand-sage/5">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="bg-white p-12 md:p-16 rounded-[3rem] shadow-zen border border-brand-sage/5 flex flex-col md:flex-row items-center justify-between gap-12">
             <div className="space-y-4 max-w-xl">
                <span className="text-brand-accent font-bold tracking-[0.4em] text-[10px] uppercase block">Event Notice</span>
                <h3 className="text-3xl font-serif font-bold text-brand-ink">顧問深度分享會：為新手家庭引路</h3>
                <p className="text-brand-sub font-light leading-relaxed">我們不舉辦大拜拜式的說明會。每場活動僅限小規模報名，讓家長與資深顧問深度討論，解決最細瑣的插班問題。</p>
             </div>
             <div className="flex flex-col gap-4 shrink-0 w-full md:w-auto">
                <div className="bg-brand-cream px-8 py-6 rounded-2xl border border-brand-sage/5">
                   <p className="text-[10px] text-brand-accent font-bold uppercase tracking-widest mb-1">Next Session</p>
                   <p className="font-serif font-bold text-brand-ink">10/14 (六) 奧克蘭小學微留學 Q&A</p>
                </div>
                <Link to="/booking" className="px-10 py-5 bg-brand-ink text-white rounded-full font-bold text-center hover:bg-brand-sage transition-all shadow-premium text-sm tracking-widest">
                   立即預約參加
                </Link>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

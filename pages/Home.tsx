
import React, { useState, useEffect, ReactNode, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, Shield, MapPin, Sparkles, Waves, Trees, BookOpen, Globe, Calendar, 
  Map, Heart, Search, CheckCircle2, Award, Zap
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
      
      {/* 🟢 Hero Section */}
      <section className="relative min-h-[90vh] flex items-center pt-24 px-6 lg:px-12">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2 z-10 space-y-8">
              <FadeInSection>
                <div className="flex items-center gap-3 text-brand-accent font-bold text-[10px] tracking-[0.4em] uppercase mb-4">
                  <span className="w-8 h-px bg-brand-accent"></span> Lumen Stone Education
                </div>
                <h1 className="text-6xl md:text-8xl font-serif font-bold text-brand-ink leading-[1.1] tracking-tight">
                  讓視野，<br/>
                  在世界的課堂<br/>
                  <span className="underline-art italic">開花</span>
                </h1>
                <p className="text-xl text-brand-sub max-w-sm font-light leading-relaxed pt-4">
                  給孩子一個暑假，換他一生對世界的好奇心。<br/>
                  從南半球的第一個微笑開始。
                </p>
                <div className="flex flex-col sm:flex-row flex-wrap gap-4 pt-10">
                  {/* Primary Consultation Button */}
                  <Link to="/booking" className="px-10 py-5 bg-brand-ink text-white text-[13px] font-bold tracking-[0.2em] hover:bg-brand-sage transition-all rounded-full shadow-gold uppercase border border-white/10 flex items-center justify-center gap-3 group">
                    預約免費諮詢 <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link to="/guide" className="px-10 py-5 bg-brand-sage/10 text-brand-sage font-bold rounded-full hover:bg-brand-sage hover:text-white transition-all flex items-center justify-center gap-2 group">
                    互動選課指南 <Sparkles size={18} />
                  </Link>
                </div>
              </FadeInSection>
            </div>
            
            <div className="lg:w-1/2 relative flex justify-center">
               <div className="relative w-full max-w-md aspect-[3/4] overflow-hidden custom-shape shadow-2xl border-[12px] border-white transform -rotate-3 hover:rotate-0 transition-transform duration-700">
                  <img 
                    src="https://images.unsplash.com/photo-1528605248644-14dd04cb113d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=90" 
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                    alt="Education"
                  />
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 washi-tape opacity-80"></div>
               </div>
               <div className="absolute top-10 right-0 p-6 bg-brand-accent text-white rounded-2xl shadow-xl transform rotate-12 font-hand text-2xl hidden md:block">
                  Go Beyond!
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* 🟢 遊學樣貌 */}
      <section className="py-32 bg-white relative">
         <div className="container mx-auto px-6 lg:px-12">
            <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
               <div className="max-w-xl space-y-4">
                  <h2 className="text-4xl md:text-5xl font-serif font-bold text-brand-ink">成長，是不同形狀的旅程</h2>
                  <p className="text-brand-sub font-light">點石陪伴您在南半球展開新篇章</p>
               </div>
               <div className="text-right">
                  <span className="font-hand text-4xl text-brand-accent">Pick your way...</span>
               </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
               <FadeInSection className="md:col-span-7 bg-brand-cream/40 p-12 rounded-[80px] border border-brand-accent/5 relative overflow-hidden group">
                  <div className="absolute -right-20 -top-20 w-64 h-64 bg-brand-sage/5 rounded-full blur-3xl group-hover:bg-brand-sage/10 transition-colors"></div>
                  <BookOpen className="text-brand-sage mb-10" size={40}/>
                  <div className="max-w-md space-y-6">
                     <h4 className="text-3xl font-serif font-bold text-brand-ink">中小學微留學 <span className="text-sm font-sans bg-brand-sage text-white px-3 py-1 rounded-full align-middle ml-2">最推薦</span></h4>
                     <p className="text-brand-sub font-light leading-relaxed">直接進入紐西蘭校園，與當地同學共學。這是最具衝擊力的成長方式。我們媒合專屬學伴，讓孩子第一天就有好朋友。</p>
                     <Link to="/programs" className="inline-flex items-center gap-2 font-bold text-brand-sage border-b border-brand-sage/30 pb-1">瞭解微留學行程 <ArrowRight size={16}/></Link>
                  </div>
               </FadeInSection>

               <FadeInSection delay="0.2s" className="md:col-span-5 bg-brand-ink text-brand-cream p-12 rounded-[80px] shadow-2xl flex flex-col justify-between">
                  <div>
                    <Globe className="text-brand-accent mb-10" size={40}/>
                    <h4 className="text-2xl font-serif font-bold mb-4">精選寒暑假營隊</h4>
                    <p className="text-brand-light/60 text-sm font-light leading-relaxed">適合第一次出國的孩子。在團體活動中學會獨立，在森林與大海間開口說英文。</p>
                  </div>
                  <Link to="/programs" className="mt-12 w-12 h-12 bg-brand-accent rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform"><ArrowRight size={20}/></Link>
               </FadeInSection>
            </div>
         </div>
      </section>

      {/* 🟢 Why Choose Lumen Stone? - Highlighted Differentiators Section */}
      <section className="py-32 bg-brand-cream/30 border-y border-brand-sage/5">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-20 space-y-4">
             <span className="text-brand-accent font-bold tracking-[0.5em] text-xs uppercase block">Our Differentiators</span>
             <h2 className="text-4xl md:text-5xl font-serif font-bold text-brand-ink">為什麼選擇點石？</h2>
             <p className="text-brand-sub max-w-2xl mx-auto font-light leading-loose">超越代辦，我們是您孩子在南半球的教育引路人。</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { 
                icon: <MapPin className="text-brand-sage" size={32} />, 
                title: "紐西蘭在地團隊", 
                desc: "奧克蘭設有服務處，提供 24/7 緊急聯繫與最即時的當地生活支援。" 
              },
              { 
                icon: <Search className="text-brand-sage" size={32} />, 
                title: "精準校園媒合", 
                desc: "跳脫商業利益，根據孩子個性與學習目標，在數百所校園中選出最契合的環境。" 
              },
              { 
                icon: <Award className="text-brand-sage" size={32} />, 
                title: "獨家學伴制度", 
                desc: "與校方深度合作，媒合專屬 Kiwi Buddy 帶領，確保孩子首週即可開口交友。" 
              },
              { 
                icon: <Zap className="text-brand-sage" size={32} />, 
                title: "透明報價體系", 
                desc: "與紐西蘭校方官網價格同步，零隱藏費用，為家長把關每一分教育投資。" 
              }
            ].map((feature, idx) => (
              <FadeInSection key={idx} delay={`${idx * 0.1}s`} className="bg-white p-10 rounded-[40px] shadow-zen hover:shadow-premium transition-all duration-500 group border border-brand-sage/5">
                <div className="w-16 h-16 bg-brand-sage/5 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-brand-sage group-hover:text-white transition-all duration-500">
                  {/* Fix: Explicitly cast the icon to React.ReactElement<any> to resolve the TypeScript error regarding unknown className property in React.cloneElement */}
                  {React.cloneElement(feature.icon as React.ReactElement<any>, { className: "group-hover:text-white transition-colors" })}
                </div>
                <h4 className="text-xl font-serif font-bold text-brand-ink mb-4">{feature.title}</h4>
                <p className="text-brand-sub text-sm font-light leading-relaxed">{feature.desc}</p>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* 🟢 說明會：精緻剪貼簿風格 */}
      <section className="py-24 bg-brand-paper relative overflow-hidden">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-6">
            <div className="space-y-2">
               <h2 className="text-3xl font-serif font-bold text-brand-ink">來聊聊，<span className="font-hand text-4xl text-brand-accent ml-2">Meet up!</span></h2>
               <p className="text-brand-sub text-sm font-light italic">我們每月定期舉辦小規模分享會，為新手家庭解惑。</p>
            </div>
          </div>

          <div className="flex overflow-x-auto gap-8 pb-12 no-scrollbar px-2">
             {[
               { date: "SEP 14", title: "微留學：親子插班實踐", tag: "實體講座", color: "bg-brand-sage", rotate: "-rotate-2" },
               { date: "SEP 20", title: "中學 NCEA 學制全解析", tag: "線上視訊", color: "bg-brand-accent", rotate: "rotate-1" },
               { date: "OCT 05", title: "新手家長：遊學第一步QA", tag: "實體講座", color: "bg-brand-ink", rotate: "-rotate-1" },
             ].map((event, i) => (
               <div key={i} className={`shrink-0 w-80 bg-brand-cream p-8 rounded-[40px] shadow-tape border border-brand-accent/10 transform ${event.rotate} hover:rotate-0 hover:translate-y-[-10px] transition-all duration-500 relative group`}>
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 washi-tape opacity-40"></div>
                  <div className="space-y-8">
                     <div className="flex justify-between items-start">
                        <span className="font-hand text-3xl text-brand-accent">{event.date}</span>
                        <div className={`w-8 h-8 ${event.color} rounded-full flex items-center justify-center text-white`}><Calendar size={14}/></div>
                     </div>
                     <h5 className="text-xl font-serif font-bold text-brand-ink leading-tight min-h-[3rem]">{event.title}</h5>
                     <div className="flex items-center justify-between pt-6 border-t border-brand-accent/10">
                        <span className="text-[10px] font-bold text-brand-sub uppercase tracking-widest">{event.tag}</span>
                        <Link to="/booking" className="w-8 h-8 rounded-full border border-brand-accent/20 flex items-center justify-center text-brand-accent group-hover:bg-brand-accent group-hover:text-white transition-all">
                           <ArrowRight size={14}/>
                        </Link>
                     </div>
                  </div>
               </div>
             ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

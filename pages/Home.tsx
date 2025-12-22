
import React, { useState, useEffect, ReactNode, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, Shield, Compass, MapPin, Sparkles, Heart, Waves, Trees, Sun, Quote, BookOpen, Globe, Ticket, Calendar
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
                <div className="flex flex-col sm:flex-row gap-6 pt-10">
                  <Link to="/nz-guide" className="px-10 py-5 bg-brand-sage text-white font-bold rounded-full hover:bg-brand-ink transition-all shadow-premium flex items-center justify-center gap-3 group">
                    新手選課指南 <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link to="/programs" className="px-10 py-5 text-brand-ink font-bold border-b-2 border-brand-accent/30 hover:border-brand-accent transition-all flex items-center justify-center">
                    探索成長方案
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
                  {/* Washi Tape */}
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 washi-tape opacity-80"></div>
               </div>
               {/* 漂浮手繪標籤 */}
               <div className="absolute top-10 right-0 p-6 bg-brand-accent text-white rounded-2xl shadow-xl transform rotate-12 font-hand text-2xl hidden md:block">
                  Go Beyond!
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* 🟢 遊學樣貌：不規則視覺網格 */}
      <section className="py-32 bg-white relative">
         <div className="container mx-auto px-6 lg:px-12">
            <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
               <div className="max-w-xl space-y-4">
                  <h2 className="text-4xl md:text-5xl font-serif font-bold text-brand-ink">成長，是不同形狀的旅程</h2>
                  <p className="text-brand-sub font-light">新手家長的三種進場方式</p>
               </div>
               <div className="text-right">
                  <span className="font-hand text-4xl text-brand-accent">Pick your way...</span>
               </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
               {/* 插班方案 - 大卡片 */}
               <FadeInSection className="md:col-span-7 bg-brand-cream/40 p-12 rounded-[80px] border border-brand-accent/5 relative overflow-hidden group">
                  <div className="absolute -right-20 -top-20 w-64 h-64 bg-brand-sage/5 rounded-full blur-3xl group-hover:bg-brand-sage/10 transition-colors"></div>
                  <BookOpen className="text-brand-sage mb-10" size={40}/>
                  <div className="max-w-md space-y-6">
                     <h4 className="text-3xl font-serif font-bold text-brand-ink">微留學插班 <span className="text-sm font-sans bg-brand-sage text-white px-3 py-1 rounded-full align-middle ml-2">最推薦</span></h4>
                     <p className="text-brand-sub font-light leading-relaxed">直接進入紐西蘭校園，與當地同學共學。這是最真實、最具衝擊力的成長方式。我們媒合專屬學伴，讓孩子第一天就有好朋友。</p>
                     <Link to="/programs" className="inline-flex items-center gap-2 font-bold text-brand-sage border-b border-brand-sage/30 pb-1">瞭解微留學細節 <ArrowRight size={16}/></Link>
                  </div>
               </FadeInSection>

               {/* 營隊方案 - 小卡片 */}
               <FadeInSection delay="0.2s" className="md:col-span-5 bg-brand-ink text-brand-cream p-12 rounded-[80px] shadow-2xl flex flex-col justify-between">
                  <div>
                    <Globe className="text-brand-accent mb-10" size={40}/>
                    <h4 className="text-2xl font-serif font-bold mb-4">探索營隊</h4>
                    <p className="text-brand-light/60 text-sm font-light leading-relaxed">適合第一次出國的孩子。在團體活動中學會獨立，在森林與大海間開口說英文。</p>
                  </div>
                  <Link to="/programs" className="mt-12 w-12 h-12 bg-brand-accent rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform"><ArrowRight size={20}/></Link>
               </FadeInSection>
            </div>
         </div>
      </section>

      {/* 🟢 紐西蘭專區：打破框架的設計感 */}
      <section className="py-40 bg-brand-cream/50 relative overflow-hidden">
        {/* 手繪裝飾細節 */}
        <div className="absolute top-10 left-10 opacity-20"><svg width="100" height="100" viewBox="0 0 100 100" className="text-brand-sage"><circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="5,5" /></svg></div>
        
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row gap-24 items-center">
             <div className="lg:w-1/2 relative order-2 lg:order-1">
                {/* Asymmetric Image Grid */}
                <div className="relative">
                   <div className="w-full max-w-sm aspect-square bg-white rounded-[100px] overflow-hidden shadow-premium z-10 relative border-8 border-white">
                      <img src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" className="w-full h-full object-cover"/>
                   </div>
                   <div className="absolute -bottom-16 -right-10 w-64 aspect-[4/5] bg-brand-sage rounded-[60px] overflow-hidden shadow-2xl z-20 border-8 border-white hidden md:block">
                      <img src="https://images.unsplash.com/photo-1470770841072-f978cf4d019e?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80" className="w-full h-full object-cover"/>
                   </div>
                   {/* 手寫筆記標註 */}
                   <div className="absolute -top-10 -left-10 z-0 opacity-40"><span className="font-hand text-6xl text-brand-accent">Pure Nature</span></div>
                </div>
             </div>
             
             <div className="lg:w-1/2 space-y-12 order-1 lg:order-2">
                <FadeInSection>
                  <div className="inline-block px-5 py-2 bg-brand-sage text-white rounded-full font-bold text-[10px] tracking-[0.4em] uppercase mb-6">New Zealand Focus</div>
                  <h2 className="text-4xl md:text-7xl font-serif font-bold text-brand-ink leading-tight">為什麼第一次<br/><span className="text-brand-accent italic">必選紐西蘭？</span></h2>
                  <p className="text-xl text-brand-sub font-light leading-relaxed pt-4">
                     紐西蘭是「新手家長最安心的選擇」。這裡不只有純淨的自然環境，更有全世界對孩子最包容、最慢節奏的教育氛圍。
                  </p>
                  
                  <div className="space-y-10 pt-10">
                     <div className="flex gap-8 group">
                        <div className="shrink-0 w-16 h-16 bg-white rounded-3xl flex items-center justify-center text-brand-sage shadow-zen group-hover:bg-brand-sage group-hover:text-white transition-all duration-500"><Shield size={32}/></div>
                        <div className="space-y-2">
                           <h5 className="text-xl font-serif font-bold text-brand-ink">信任為基石的社會</h5>
                           <p className="text-sm text-brand-sub font-light leading-relaxed">全球安全指數 Top 2。在那裡，每個孩子都被視為珍寶，無論背景，都能獲得最溫暖的引導。</p>
                        </div>
                     </div>
                     <div className="flex gap-8 group">
                        <div className="shrink-0 w-16 h-16 bg-white rounded-3xl flex items-center justify-center text-brand-accent shadow-zen group-hover:bg-brand-accent group-hover:text-white transition-all duration-500"><Waves size={32}/></div>
                        <div className="space-y-2">
                           <h5 className="text-xl font-serif font-bold text-brand-ink">無痛銜接學伴制</h5>
                           <p className="text-sm text-brand-sub font-light leading-relaxed">點石獨家 Buddy 計畫，每個孩子入學第一天都會由當地同學帶著認識校園。不讓孤單發生在旅程中。</p>
                        </div>
                     </div>
                  </div>
                </FadeInSection>
             </div>
          </div>
        </div>
      </section>

      {/* 🟢 說明會：精緻剪貼簿風格 (Small Panel, High Design) */}
      <section className="py-24 bg-brand-paper relative overflow-hidden">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-6">
            <div className="space-y-2">
               <h2 className="text-3xl font-serif font-bold text-brand-ink">來聊聊，<span className="font-hand text-4xl text-brand-accent ml-2">Meet up!</span></h2>
               <p className="text-brand-sub text-sm font-light italic">我們每月定期舉辦小規模分享會，為新手家庭解惑。</p>
            </div>
            <Link to="/booking" className="text-xs font-bold tracking-widest text-brand-sage border-2 border-brand-sage px-8 py-3 rounded-full hover:bg-brand-sage hover:text-white transition-all">
               查看完整場次
            </Link>
          </div>

          {/* 橫向捲動的活動卡片 */}
          <div className="flex overflow-x-auto gap-8 pb-12 no-scrollbar px-2">
             {[
               { date: "SEP 14", title: "國小微留學：親子插班實踐", tag: "實體講座", color: "bg-brand-sage", rotate: "-rotate-2" },
               { date: "SEP 20", title: "中學 NCEA 學制全解析", tag: "線上視訊", color: "bg-brand-accent", rotate: "rotate-1" },
               { date: "OCT 05", title: "新手家長：遊學第一步QA", tag: "實體講座", color: "bg-brand-ink", rotate: "-rotate-1" },
               { date: "OCT 18", title: "奧克蘭 vs 基督城 選校指南", tag: "線上視訊", color: "bg-brand-sage", rotate: "rotate-2" }
             ].map((event, i) => (
               <div key={i} className={`shrink-0 w-80 bg-brand-cream p-8 rounded-[40px] shadow-tape border border-brand-accent/10 transform ${event.rotate} hover:rotate-0 hover:translate-y-[-10px] transition-all duration-500 relative group`}>
                  {/* Washi Tape */}
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

      {/* 🟢 Final CTA: 極簡留白 */}
      <section className="py-40 bg-brand-cream relative text-center">
         <div className="container mx-auto px-6">
            <FadeInSection>
               <h2 className="text-4xl md:text-6xl font-serif font-bold text-brand-ink mb-12">給孩子一個看見世界的<br/><span className="italic underline-art">觀點</span></h2>
               <p className="text-brand-sub font-light max-w-lg mx-auto mb-16 leading-loose">我們不只是在辦理手續，我們在為下一個世代規劃成長的路徑。</p>
               <Link to="/booking" className="inline-block px-16 py-6 bg-brand-sage text-white rounded-full font-bold shadow-gold hover:bg-brand-ink hover:-translate-y-1 transition-all tracking-[0.4em] text-xs">
                  預約探索之約
               </Link>
            </FadeInSection>
         </div>
         {/* 底部裝飾 */}
         <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-brand-sage via-brand-accent to-brand-ink opacity-20"></div>
      </section>

    </div>
  );
};

export default Home;


import React, { useState, useEffect, ReactNode, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, MapPin, Sparkles, BookOpen, Globe, Calendar, 
  CheckCircle2, Award, Zap, GraduationCap, Clock, ShieldCheck, Compass, Users, Search, FileText, Backpack
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
      
      {/* 🟢 Hero Section: 專業社論風格 */}
      <section className="relative min-h-[85vh] flex items-center pt-24 px-6 lg:px-12">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">
            <div className="lg:col-span-7 z-10 space-y-10">
              <FadeInSection>
                <div className="flex items-center gap-4 text-brand-sage font-bold text-[11px] tracking-[0.4em] uppercase mb-6">
                  <span className="w-12 h-px bg-brand-sage"></span> Lumen Stone Education
                </div>
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-brand-ink leading-[1.1] tracking-tight">
                  讓孩子在純淨中<br/>
                  開啟<span className="editorial-accent">國際視野</span>
                </h1>
                <p className="text-xl text-brand-sub max-w-xl font-light leading-relaxed pt-6">
                  點石專精於 6-15 歲紐西蘭「微留學」與插班體驗。我們提供真實的在地辦公室支援與專業校園媒合，陪伴家長邁出海外教育的第一步。
                </p>
                <div className="flex flex-col sm:flex-row gap-5 pt-12">
                  <Link to="/booking" className="px-12 py-5 bg-brand-ink text-white text-[13px] font-bold tracking-[0.2em] hover:bg-brand-sage transition-all rounded-full shadow-premium flex items-center justify-center gap-3 group">
                    預約 15 分鐘顧問諮詢 <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link to="/programs" className="px-10 py-5 bg-white text-brand-sage border border-brand-sage/10 font-bold rounded-full hover:bg-brand-sage hover:text-white transition-all flex items-center justify-center gap-2 group shadow-zen">
                    瀏覽所有行程
                  </Link>
                </div>
              </FadeInSection>
            </div>
            
            <div className="lg:col-span-5 relative">
               <div className="relative w-full aspect-[4/5] overflow-hidden rounded-[2rem] shadow-2xl">
                  <img 
                    src="https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=90" 
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                    alt="Education New Zealand"
                  />
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* 🟢 Why New Zealand: 核心地理雜誌章節 */}
      <section className="section-padding bg-white relative">
         <div className="container mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
               <div className="relative order-2 lg:order-1">
                  <div className="grid grid-cols-2 gap-4">
                     <img src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" className="rounded-2xl shadow-premium h-64 w-full object-cover" alt="NZ Nature" />
                     <img src="https://images.unsplash.com/photo-1578530332818-6ba472e67b93?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" className="rounded-2xl shadow-premium h-64 w-full object-cover mt-8" alt="NZ School" />
                  </div>
                  <div className="absolute -bottom-6 -left-6 bg-brand-ink text-white p-8 rounded-2xl max-w-xs shadow-2xl">
                    <p className="text-xs font-light opacity-60 uppercase tracking-widest mb-2">Purity in Education</p>
                    <p className="font-serif italic text-lg leading-relaxed">「讓教育回歸自然的本質，而非僅僅是學位的追求。」</p>
                  </div>
               </div>
               <div className="space-y-8 order-1 lg:order-2">
                  <span className="text-brand-accent font-bold tracking-[0.4em] text-[10px] uppercase block">Why New Zealand</span>
                  <h2 className="text-4xl md:text-5xl font-serif font-bold text-brand-ink leading-tight">安全，是探索世界<br/>唯一的路徑</h2>
                  <p className="text-brand-sub font-light text-lg leading-loose">
                    紐西蘭被譽為南半球最純淨的教室。其啟發式教育 (Inquiry-based Learning) 不強制填鴨知識，而是引導孩子提出問題。低齡學童在此能獲得極高的安全保障與大自然的情感連結。
                  </p>
                  <ul className="space-y-4 pt-4">
                     <li className="flex items-center gap-4 text-brand-ink font-medium">
                        <CheckCircle2 size={18} className="text-brand-sage shrink-0" /> 全球前三大的教育輸出國，學制受全球認可
                     </li>
                     <li className="flex items-center gap-4 text-brand-ink font-medium">
                        <CheckCircle2 size={18} className="text-brand-sage shrink-0" /> 5 歲當天即可入學，無縫接軌當地小學
                     </li>
                     <li className="flex items-center gap-4 text-brand-ink font-medium">
                        <CheckCircle2 size={18} className="text-brand-sage shrink-0" /> 純淨口音與最高等級的國際生保護法規
                     </li>
                  </ul>
                  <Link to="/guide" className="inline-flex items-center gap-2 font-bold text-brand-sage border-b-2 border-brand-sage/20 pb-1 hover:border-brand-sage transition-all mt-4">
                    深入瞭解紐西蘭學制 <ArrowRight size={16}/>
                  </Link>
               </div>
            </div>
         </div>
      </section>

      {/* 🟢 學習路徑: 專業流程圖 */}
      <section className="section-padding bg-brand-cream/30 border-y border-brand-sage/5">
        <div className="container mx-auto px-6 lg:px-12 text-center mb-24">
          <span className="text-brand-accent font-bold tracking-[0.4em] text-[10px] uppercase block mb-4">Our Process</span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-brand-ink mb-6">您的紐西蘭學習路徑</h2>
          <p className="text-brand-sub font-light text-lg max-w-2xl mx-auto">我們將繁瑣的手續拆解為清晰的里程碑，讓家長能安心陪伴孩子成長。</p>
        </div>
        
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
            {/* Step 1 */}
            <div className="relative group p-8 bg-white rounded-3xl border border-brand-sage/5 shadow-zen hover:shadow-premium transition-all">
              <div className="w-12 h-12 bg-brand-sage/5 text-brand-sage rounded-xl flex items-center justify-center mb-6 group-hover:bg-brand-sage group-hover:text-white transition-colors">
                <Search size={24}/>
              </div>
              <h4 className="text-lg font-serif font-bold text-brand-ink mb-2">深度諮詢</h4>
              <p className="text-xs text-brand-sub leading-loose font-light">了解孩子的個性、英語程度與家庭預算。</p>
              <div className="absolute -right-2 top-1/2 -translate-y-1/2 hidden lg:block text-brand-sage/20"><ArrowRight size={20}/></div>
            </div>
            {/* Step 2 */}
            <div className="relative group p-8 bg-white rounded-3xl border border-brand-sage/5 shadow-zen hover:shadow-premium transition-all">
              <div className="w-12 h-12 bg-brand-sage/5 text-brand-sage rounded-xl flex items-center justify-center mb-6 group-hover:bg-brand-sage group-hover:text-white transition-colors">
                <GraduationCap size={24}/>
              </div>
              <h4 className="text-lg font-serif font-bold text-brand-ink mb-2">方案媒合</h4>
              <p className="text-xs text-brand-sub leading-loose font-light">根據特質選校，非商業化推銷，確保適配度。</p>
              <div className="absolute -right-2 top-1/2 -translate-y-1/2 hidden lg:block text-brand-sage/20"><ArrowRight size={20}/></div>
            </div>
            {/* Step 3 */}
            <div className="relative group p-8 bg-white rounded-3xl border border-brand-sage/5 shadow-zen hover:shadow-premium transition-all">
              <div className="w-12 h-12 bg-brand-sage/5 text-brand-sage rounded-xl flex items-center justify-center mb-6 group-hover:bg-brand-sage group-hover:text-white transition-colors">
                <FileText size={24}/>
              </div>
              <h4 className="text-lg font-serif font-bold text-brand-ink mb-2">文件送審</h4>
              <p className="text-xs text-brand-sub leading-loose font-light">一站式代辦學校申請與學生簽證辦理。</p>
              <div className="absolute -right-2 top-1/2 -translate-y-1/2 hidden lg:block text-brand-sage/20"><ArrowRight size={20}/></div>
            </div>
            {/* Step 4 */}
            <div className="relative group p-8 bg-white rounded-3xl border border-brand-sage/5 shadow-zen hover:shadow-premium transition-all">
              <div className="w-12 h-12 bg-brand-sage/5 text-brand-sage rounded-xl flex items-center justify-center mb-6 group-hover:bg-brand-sage group-hover:text-white transition-colors">
                <Backpack size={24}/>
              </div>
              <h4 className="text-lg font-serif font-bold text-brand-ink mb-2">行前輔導</h4>
              <p className="text-xs text-brand-sub leading-loose font-light">提供紐西蘭文化與生活須知，降低適應衝擊。</p>
              <div className="absolute -right-2 top-1/2 -translate-y-1/2 hidden lg:block text-brand-sage/20"><ArrowRight size={20}/></div>
            </div>
            {/* Step 5 */}
            <div className="relative group p-8 bg-brand-ink text-white rounded-3xl shadow-xl hover:scale-105 transition-all">
              <div className="w-12 h-12 bg-brand-accent text-white rounded-xl flex items-center justify-center mb-6">
                <MapPin size={24}/>
              </div>
              <h4 className="text-lg font-serif font-bold mb-2">落地支援</h4>
              <p className="text-xs opacity-70 leading-loose font-light">點石在地辦公室協助報到、開學與緊急聯繫。</p>
            </div>
          </div>
        </div>
      </section>

      {/* 🟢 精選行程: 高畫質預覽 */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div className="max-w-xl space-y-4">
               <span className="text-brand-accent font-bold tracking-[0.4em] text-[10px] uppercase block">Selected Programs</span>
               <h2 className="text-4xl md:text-5xl font-serif font-bold text-brand-ink">本季精選課程</h2>
            </div>
            <Link to="/programs" className="text-brand-sage font-bold border-b border-brand-sage/30 pb-1 text-sm">瀏覽所有遊學行程</Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {PROGRAMS.slice(0, 3).map((p, i) => (
              <FadeInSection key={i} delay={`${i * 0.1}s`} className="group">
                <Link to={`/programs/${p.id}`} className="block space-y-6">
                  <div className="aspect-[4/5] overflow-hidden rounded-[2.5rem] shadow-premium relative">
                    <img src={p.image} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt={p.title} />
                    <div className="absolute inset-0 bg-brand-ink/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="absolute bottom-6 left-6 right-6 p-6 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                      <div className="flex justify-between items-center text-[11px] font-bold text-brand-sage uppercase tracking-widest">
                        <span>{p.city}</span>
                        <span>{p.duration}</span>
                      </div>
                    </div>
                  </div>
                  <div className="px-4">
                    <h3 className="text-2xl font-serif font-bold text-brand-ink mb-3 leading-snug">{p.title}</h3>
                    <p className="text-brand-sub text-sm font-light line-clamp-2">{p.description}</p>
                  </div>
                </Link>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* 🟢 Real Value Proposition: 真實在地支援 */}
      <section className="section-padding bg-brand-cream/30 border-t border-brand-sage/5">
        <div className="container mx-auto px-6 lg:px-12">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
              <div className="space-y-12">
                 <h2 className="text-4xl md:text-5xl font-serif font-bold text-brand-ink">為什麼選擇點石？</h2>
                 <p className="text-brand-sub font-light text-lg leading-loose">
                   在遊學代辦產業中，資訊往往是破碎的。點石不販售虛幻的夢想，我們販售的是「確定的執行力」與「對教育的長期承諾」。
                 </p>
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                    {[
                      { 
                        icon: <MapPin className="text-brand-sage" size={24} />, 
                        title: "奧克蘭在地辦公室", 
                        desc: "並非委託外部接機。我們在奧克蘭設有直屬辦公室，提供在地支援與最真實的校園反饋。" 
                      },
                      { 
                        icon: <Compass size={24} />, 
                        title: "精準校園適配", 
                        desc: "我們不推銷特定的商業校園。而是根據孩子的性格與英語程度，在數百所 NZ 公校中選出最適環境。" 
                      },
                      { 
                        icon: <ShieldCheck size={24} />, 
                        title: "真實透明報價", 
                        desc: "所有學費皆與紐西蘭校方官方定價同步。零隱藏費用，為家長把關每一分教育預算。" 
                      },
                      { 
                        icon: <Clock size={24} />, 
                        title: "深度行前諮詢", 
                        desc: "由擁有紐西蘭生活經驗的顧問團隊親自領軍，解決家長對學制銜接的最細瑣疑問。" 
                      }
                    ].map((f, i) => (
                      <div key={i} className="space-y-4">
                         <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-brand-sage shadow-zen">
                            {f.icon}
                         </div>
                         <h5 className="font-bold text-brand-ink text-sm">{f.title}</h5>
                         <p className="text-xs text-brand-sub leading-relaxed font-light">{f.desc}</p>
                      </div>
                    ))}
                 </div>
              </div>
              
              <div className="relative">
                 <img src="https://images.unsplash.com/photo-1544717297-fa95b6ee9643?auto=format&fit=crop&w=800&q=80" className="rounded-[3rem] shadow-premium" alt="Student Support" />
                 <div className="mt-12 p-10 bg-brand-ink text-white rounded-[2.5rem] shadow-2xl">
                    <h6 className="font-serif font-bold text-xl mb-4 italic">「我們在意的是適應，而不只是入學。」</h6>
                    <p className="text-sm opacity-60 font-light leading-loose">我們深知微留學的關鍵不在於簽證，而在於孩子踏入教室的第一個小時是否感到被接納。</p>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* 🟢 Footer Actions: 精簡諮詢按鈕 */}
      <section className="py-24 bg-white border-t border-brand-sage/5">
        <div className="container mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-12 text-center md:text-left">
           <div className="space-y-4">
              <h3 className="text-3xl font-serif font-bold text-brand-ink">準備好為孩子規劃下一步了嗎？</h3>
              <p className="text-brand-sub font-light">您可以先預約一對一線上會談，我們隨時準備為您解答疑問。</p>
           </div>
           <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <Link to="/booking" className="px-10 py-5 bg-brand-ink text-white rounded-full font-bold text-center hover:bg-brand-sage transition-all shadow-premium text-xs tracking-[0.2em] uppercase">
                 立即預約 1:1 諮詢
              </Link>
           </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

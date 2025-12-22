
import React, { useState, useEffect, ReactNode, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, CheckCircle, Shield, Users, 
  MapPin, Search, Plane, GraduationCap, MessageSquare, 
  Heart, Sparkles, Compass, Wind, Quote, Star, BookOpen, ExternalLink,
  ChevronRight, ClipboardCheck, School, SearchCode, Info
} from 'lucide-react';

const FadeInSection: React.FC<{ children: ReactNode; delay?: string }> = ({ children, delay = '0s' }) => {
  const [isVisible, setVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => setVisible(entry.isIntersecting));
    }, { threshold: 0.1 });
    if (domRef.current) observer.observe(domRef.current);
    return () => { if (domRef.current) observer.unobserve(domRef.current); };
  }, []);
  return (
    <div ref={domRef} className={`transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: delay }}>
      {children}
    </div>
  );
};

const Home: React.FC = () => {
  return (
    <div className="bg-brand-cream selection:bg-brand-sage selection:text-white pb-20">
      
      {/* Hero: Storytelling Split */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div className="container mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <div className="z-10 space-y-8 animate-slide-up order-2 lg:order-1">
            <div className="inline-flex items-center gap-3 bg-brand-sage/10 px-4 py-2 rounded-full border border-brand-sage/20">
               <Sparkles className="text-brand-sage" size={14}/>
               <span className="text-brand-sage text-[10px] tracking-[0.4em] uppercase font-bold">Lumen Stone Education</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-serif text-brand-ink font-bold leading-[1.2]">
              出國，是為了看見<br/>
              <span className="underline-draw text-brand-accent">更好的自己</span>。
            </h1>
            
            <p className="text-lg text-brand-sub font-light max-w-lg leading-relaxed">
              點石遊學：專注紐西蘭、澳洲中小學插班與親子體驗。<br/>
              我們不只辦理文件，更陪伴您度過每一個初次探索的時刻。
            </p>
            
            <div className="flex flex-wrap gap-5 pt-4">
              <Link to="/guide" className="px-10 py-5 bg-brand-sage text-white font-bold rounded-full shadow-hand-drawn hover:bg-brand-ink transition-all tracking-widest text-sm flex items-center gap-2">
                開始選課指南 <ArrowRight size={18} />
              </Link>
              <Link to="/booking" className="px-10 py-5 bg-white text-brand-ink font-bold rounded-full border border-brand-sage/10 hover:shadow-xl transition-all tracking-widest text-sm">
                預約諮詢
              </Link>
            </div>
          </div>

          <div className="relative order-1 lg:order-2">
            <div className="relative z-10 rounded-[60px] overflow-hidden shadow-2xl border-8 border-white">
              <img 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80" 
                className="w-full aspect-[4/3] object-cover"
                alt="Students collaborating in NZ classroom"
              />
            </div>
            <div className="absolute -top-6 -right-6 w-32 h-32 border-4 border-brand-accent/20 rounded-full border-dashed animate-spin-slow"></div>
            <div className="absolute -bottom-10 -left-10 bg-brand-sage/5 w-64 h-64 rounded-full blur-3xl"></div>
          </div>
        </div>
      </section>

      {/* Philosophy: Grid layout with iconography */}
      <section className="py-24 bg-white border-y border-brand-sage/5">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
             <div className="md:col-span-1 border-r border-brand-sage/10 pr-8">
                <h2 className="text-3xl font-serif font-bold text-brand-ink mb-6">為什麼選擇點石？</h2>
                <p className="text-brand-sub text-sm leading-loose">我們相信，每一顆石頭經過磨練，都能閃耀出金色的光芒。</p>
             </div>
             
             {[
               { icon: <Users size={24}/>, title: "深度連結", desc: "與當地校方直接聯繫，確保學生插班適應無礙。" },
               { icon: <Compass size={24}/>, title: "精準引導", desc: "根據學生性格推薦最合適的校風與社區環境。" },
               { icon: <Shield size={24}/>, title: "安心守護", desc: "提供 24/7 當地支援，家長在台也能全然放心。" }
             ].map((item, i) => (
               <div key={i} className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-brand-cream flex items-center justify-center text-brand-sage">
                    {item.icon}
                  </div>
                  <h4 className="text-lg font-bold text-brand-ink">{item.title}</h4>
                  <p className="text-sm text-brand-sub leading-relaxed">{item.desc}</p>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* Program Entry: Immersive Cards & Comparison */}
      <section className="py-32">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-20 max-w-2xl mx-auto">
            <h2 className="text-4xl font-serif font-bold text-brand-ink mb-6">探索您的無限可能</h2>
            <p className="text-brand-sub font-light">不論年齡，不論目的，在南半球都有一個位子為您準備。</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
             {/* Cards for each path... (Same as previous) */}
             <div className="group relative rounded-[40px] overflow-hidden aspect-[3/4] shadow-zen">
                <img src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80" className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt="Study Abroad" />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-ink/80 via-brand-ink/20 to-transparent"></div>
                <div className="absolute bottom-10 left-10 right-10 text-white">
                   <span className="text-[10px] tracking-[0.4em] uppercase font-bold mb-4 block opacity-80">Full-time Learning</span>
                   <h3 className="text-3xl font-serif font-bold mb-4">長期留學</h3>
                   <Link to="/programs?type=Study Abroad" className="inline-flex items-center gap-2 text-sm font-bold border-b border-white/50 pb-1 hover:border-white transition-all">
                      看見未來路徑 <ExternalLink size={14}/>
                   </Link>
                </div>
             </div>

             <div className="group relative rounded-[40px] overflow-hidden aspect-[3/4] shadow-zen">
                <img src="https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=800&q=80" className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt="Language School" />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-accent/80 via-brand-accent/20 to-transparent"></div>
                <div className="absolute bottom-10 left-10 right-10 text-white">
                   <span className="text-[10px] tracking-[0.4em] uppercase font-bold mb-4 block opacity-80">Language Immersion</span>
                   <h3 className="text-3xl font-serif font-bold mb-4">短期遊學</h3>
                   <Link to="/programs?type=Language School" className="inline-flex items-center gap-2 text-sm font-bold border-b border-white/50 pb-1 hover:border-white transition-all">
                      重拾學習熱情 <ExternalLink size={14}/>
                   </Link>
                </div>
             </div>

             <div className="group relative rounded-[40px] overflow-hidden aspect-[3/4] shadow-zen">
                <img src="https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=800&q=80" className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt="Micro Study" />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-sage/80 via-brand-sage/20 to-transparent"></div>
                <div className="absolute bottom-10 left-10 right-10 text-white">
                   <span className="text-[10px] tracking-[0.4em] uppercase font-bold mb-4 block opacity-80">School Life Experience</span>
                   <h3 className="text-3xl font-serif font-bold mb-4">微留學插班</h3>
                   <Link to="/programs?type=Micro Study" className="inline-flex items-center gap-2 text-sm font-bold border-b border-white/50 pb-1 hover:border-white transition-all">
                      進入真實課堂 <ExternalLink size={14}/>
                   </Link>
                </div>
             </div>
          </div>

          {/* New: Visual Comparison Table */}
          <FadeInSection>
            <div className="bg-white rounded-[40px] p-8 md:p-12 shadow-zen border border-brand-sage/5 overflow-x-auto">
              <h3 className="text-2xl font-serif font-bold text-brand-ink mb-10 text-center">方案核心差異對照</h3>
              <table className="w-full min-w-[600px] text-left">
                <thead>
                  <tr className="border-b border-brand-sage/10">
                    <th className="py-6 font-serif text-brand-sub font-medium">比較維度</th>
                    <th className="py-6 font-serif text-brand-ink font-bold">長期留學</th>
                    <th className="py-6 font-serif text-brand-ink font-bold">短期遊學</th>
                    <th className="py-6 font-serif text-brand-ink font-bold">微留學插班</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  <tr className="border-b border-brand-sage/5 hover:bg-brand-cream/30 transition-colors">
                    <td className="py-6 font-bold text-brand-ink/70">主要目標</td>
                    <td className="py-6">取得正式學位 / 升學銜接</td>
                    <td className="py-6">語言能力提升 / 文化體驗</td>
                    <td className="py-6">在地校園融入 / 潛力測試</td>
                  </tr>
                  <tr className="border-b border-brand-sage/5 hover:bg-brand-cream/30 transition-colors">
                    <td className="py-6 font-bold text-brand-ink/70">建議時長</td>
                    <td className="py-6">1 年以上 (長期紮根)</td>
                    <td className="py-6">2 週 - 3 個月 (精實充電)</td>
                    <td className="py-6">4 週 - 10 週 (深度插班)</td>
                  </tr>
                  <tr className="border-b border-brand-sage/5 hover:bg-brand-cream/30 transition-colors">
                    <td className="py-6 font-bold text-brand-ink/70">簽證類型</td>
                    <td className="py-6">正式學生簽證 (Student Visa)</td>
                    <td className="py-6">免簽 (NZeTA) / 觀光簽證</td>
                    <td className="py-6">免簽 (NZeTA) / 觀光簽證</td>
                  </tr>
                  <tr className="hover:bg-brand-cream/30 transition-colors">
                    <td className="py-6 font-bold text-brand-ink/70">入學要求</td>
                    <td className="py-6">學術成績評估 / 英語門檻</td>
                    <td className="py-6">分級測驗 (隨時入學)</td>
                    <td className="py-6">基本英文溝通 (中小學)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* Real Scene & Selection Process */}
      <section className="py-32 bg-brand-cream relative overflow-hidden">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row gap-20 items-center mb-32">
            <div className="lg:w-1/2 space-y-10">
               <div className="inline-block border-l-4 border-brand-accent pl-6">
                  <span className="text-brand-accent font-bold tracking-widest text-xs uppercase block mb-2">The Classroom Without Walls</span>
                  <h2 className="text-4xl font-serif font-bold text-brand-ink leading-tight">紐西蘭教育：<br/>不只是讀書。</h2>
               </div>
               <p className="text-brand-sub leading-loose text-lg font-light">
                 在這裡，老師不只是傳授知識，更是啟發興趣。課堂可能在森林、在海灘，也可能在一次充滿歡笑的團隊討論中。我們帶您深入奧克蘭、基督城的公立學校，體驗最真實的 Kiwi Style。
               </p>
               <div className="space-y-6">
                  {[
                    "學伴 (Buddy) 制度：快速融入校園社交圈",
                    "適才適性：從體育、藝術到科學的多元選修",
                    "親子友善：完善的寄宿家庭與陪讀安排"
                  ].map(s => (
                    <div key={s} className="flex gap-4 items-center group">
                       <CheckCircle className="text-brand-sage group-hover:scale-125 transition-transform" size={20} />
                       <span className="text-brand-ink font-medium">{s}</span>
                    </div>
                  ))}
               </div>
            </div>
            
            <div className="lg:w-1/2 relative">
               <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-4 pt-12">
                    <img src="https://images.unsplash.com/photo-1571260899304-425eee4c7efc?auto=format&fit=crop&w=600&q=80" className="rounded-3xl shadow-lg border-4 border-white" alt="Campus Life" />
                    <img src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=600&q=80" className="rounded-3xl shadow-lg border-4 border-white" alt="Group Discussion" />
                  </div>
                  <div className="space-y-4">
                    <img src="https://images.unsplash.com/photo-1524178232363-1fb280714553?auto=format&fit=crop&w=600&q=80" className="rounded-3xl shadow-lg border-4 border-white" alt="Active Learning" />
                    <img src="https://images.unsplash.com/photo-1523050853063-bd8012fbb3d0?auto=format&fit=crop&w=600&q=80" className="rounded-3xl shadow-lg border-4 border-white" alt="School Scene" />
                  </div>
               </div>
            </div>
          </div>

          {/* New Section: Choosing NZ Process */}
          <FadeInSection>
            <div className="bg-white rounded-[60px] p-12 md:p-20 shadow-zen">
              <div className="max-w-3xl mx-auto text-center mb-16">
                <h3 className="text-3xl font-serif font-bold text-brand-ink mb-6">從起點到啟程：如何規劃您的留學之路？</h3>
                <p className="text-brand-sub font-light">踏上南半球的旅程不需要衝動，我們將複雜的流程簡化為四個關鍵階段。</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
                {/* Visual Connector (Line) for desktop */}
                <div className="hidden md:block absolute top-1/4 left-10 right-10 h-[1px] bg-brand-sage/20 z-0"></div>

                {[
                  { icon: <SearchCode />, title: "探索與研究", desc: "了解紐西蘭各城市文化、氣候與教育體系特色，建立初步印象。", color: "brand-sage" },
                  { icon: <Compass />, title: "目標定位", desc: "根據學生性格、興趣與長期發展目標，決定適合留學、遊學或微留學。", color: "brand-accent" },
                  { icon: <School />, title: "校園篩選", desc: "深入了解公立學校、私立中學 or 語言中心，挑選氣息相合的環境。", color: "brand-sage" },
                  { icon: <ClipboardCheck />, title: "申請與簽證", desc: "準備入學文件、簽證辦理與寄宿家庭對接，確保流程萬無一失。", color: "brand-accent" }
                ].map((step, idx) => (
                  <div key={idx} className="relative z-10 flex flex-col items-center text-center space-y-6">
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center bg-white border-2 border-${step.color}/30 text-${step.color} shadow-sm group hover:scale-110 transition-transform`}>
                      {/* Fix: Use React.cloneElement with generic <any> to allow 'size' prop to be passed to cloned element */}
                      {React.cloneElement(step.icon as React.ReactElement<any>, { size: 28 })}
                    </div>
                    <div className="space-y-3">
                      <span className="text-[10px] font-bold text-brand-sub uppercase tracking-widest">Phase 0{idx + 1}</span>
                      <h4 className="font-bold text-brand-ink">{step.title}</h4>
                      <p className="text-xs text-brand-sub leading-loose font-light px-4">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* Testimonial: Authentic Feedback */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-6 lg:px-12 text-center">
          <Quote className="text-brand-sage/10 mx-auto mb-10" size={100} />
          <div className="max-w-4xl mx-auto">
             <p className="text-3xl md:text-4xl font-serif text-brand-ink leading-snug italic mb-12">
               「我從沒想過我的孩子能在短短四周內，從不敢開口到主動用英文跟 Buddy 介紹台灣的零食。點石的安排非常細膩，讓我們在紐西蘭感受到了家一般的溫暖。」
             </p>
             <div className="flex items-center justify-center gap-6">
                <img src="https://images.unsplash.com/photo-1544717297-fa95b6ee9643?auto=format&fit=crop&w=200&q=80" className="w-16 h-16 rounded-full object-cover border-2 border-brand-sage/20" alt="Parent Reviewer" />
                <div className="text-left">
                   <h4 className="font-bold text-brand-ink">陳媽媽</h4>
                   <p className="text-xs text-brand-sub tracking-widest uppercase mt-1">奧克蘭微留學 / 親子陪讀</p>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Final CTA: Handwritten Style */}
      <section className="py-40 bg-brand-ink text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 p-20 opacity-10">
           <Plane size={300} strokeWidth={0.5} />
        </div>
        <div className="container mx-auto px-6 text-center relative z-10">
           <h2 className="text-5xl md:text-7xl font-serif font-bold mb-10 leading-tight">
             您的冒險，<br/>從一次<span className="underline-draw text-brand-accent">對話</span>開始。
           </h2>
           <p className="text-white/60 text-lg font-light mb-16 max-w-xl mx-auto leading-loose">
             如果您還在猶豫、還不確定方向，這非常正常。<br/>
             我們提供 15 分鐘的免費諮詢，幫您釐清目標。
           </p>
           <div className="flex flex-col md:flex-row gap-6 justify-center">
              <Link to="/booking" className="px-12 py-6 bg-brand-sage text-white font-bold rounded-full hover:bg-white hover:text-brand-ink transition-all shadow-xl tracking-widest">
                 立即預約諮詢
              </Link>
              <Link to="/guide" className="px-12 py-6 bg-transparent border border-white/20 text-white font-bold rounded-full hover:bg-white/10 transition-all tracking-widest">
                 探索選課指南
              </Link>
           </div>
        </div>
      </section>

    </div>
  );
};

export default Home;

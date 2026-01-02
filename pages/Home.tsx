import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, Users, Globe, BookOpen, Plane, Check, Star, Shield, GraduationCap, Clock, Target, Sparkles, Search, FileText, MessageCircle
} from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="bg-brand-cream selection:bg-brand-primary selection:text-white">
      
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[80vh] flex items-center pt-20 overflow-hidden">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
            
            <div className="w-full lg:w-[45%] z-10 space-y-12 animate-fade-in">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                   <span className="w-8 h-[2px] bg-brand-accent"></span>
                   <span className="text-brand-accent font-black tracking-[0.4em] uppercase text-[10px] block">Lumen Stone International</span>
                </div>
                <h1 className="text-5xl md:text-8xl font-serif font-black leading-[1.05] text-brand-primary tracking-tighter">
                  啟發孩子<br/>
                  看見<span className="italic text-brand-accent">世界的寬廣</span>
                </h1>
                <p className="text-brand-sub text-lg md:text-xl font-light leading-relaxed max-w-lg">
                  我們不只是留學代辦，更是教育的策展人。透過點石精選的紐西蘭校園，讓學習不再侷限於課本。
                </p>
              </div>

              <div className="flex flex-wrap gap-5 pt-4">
                <Link to="/programs" className="px-14 py-6 bg-brand-primary text-white font-black rounded-full hover:bg-brand-accent transition-all tracking-[0.3em] text-[10px] uppercase shadow-heavy text-center min-w-[200px]">
                  方案探索
                </Link>
                <Link to="/guide" className="px-14 py-6 bg-white border border-brand-primary/10 text-brand-primary font-black rounded-full hover:bg-brand-primary hover:text-white transition-all tracking-[0.3em] text-[10px] uppercase text-center min-w-[200px]">
                  選課指南
                </Link>
              </div>
            </div>

            <div className="w-full lg:w-[55%] relative">
               <div className="relative aspect-[16/10] w-full">
                  <div className="absolute inset-0 rounded-[60px] overflow-hidden shadow-heavy group">
                    <img 
                      src="https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=1200&q=80" 
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
                      alt="New Zealand Nature Education" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-brand-primary/20 to-transparent"></div>
                  </div>
                  <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-brand-secondary rounded-full flex items-center justify-center p-8 shadow-heavy animate-bounce-slow border-8 border-brand-cream">
                     <img src="https://pub-eab9e45abd56499794188fcd886beee3.r2.dev/logo/logo.png" className="w-full h-full object-contain grayscale brightness-0" alt="Logo Icon" />
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. OUR PHILOSOPHY - 縮小版面、更簡約的橫向排版 */}
      <section className="py-16 bg-brand-cream">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10 border-y border-brand-accent/10 py-12">
            <div className="md:w-1/3">
              <span className="text-brand-accent font-black tracking-[0.4em] uppercase text-[9px] mb-2 block">PHILOSOPHY</span>
              <h2 className="text-3xl font-serif font-black text-brand-primary leading-tight">
                教育是打磨心靈<br/><span className="italic text-brand-accent">的永恆過程</span>
              </h2>
            </div>
            <div className="md:w-2/3 border-l border-brand-accent/20 pl-0 md:pl-12">
              <p className="text-brand-sub text-sm leading-loose font-light italic">
                「點石」象徵著我們的核心使命：將每一位充滿潛力的學生視為未經雕琢的原石，透過最精準的教育媒合與最具溫度的專業諮詢，在最適合的環境中雕琢出璀璨的光芒。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. PROGRAM CATEGORIES - 比較重心、小圓角、強化規格差異 */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-4xl mx-auto text-center mb-20">
             <span className="text-brand-accent font-bold tracking-[0.5em] uppercase text-[10px] block mb-4">COMPARE PATHWAYS</span>
             <h2 className="text-4xl md:text-5xl font-serif font-black text-brand-primary">選擇最契合的教育樣貌</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* 留學 Card */}
            <div className="group bg-brand-cream rounded-2xl overflow-hidden shadow-zen border border-brand-primary/5 flex flex-col hover:border-brand-primary/20 transition-all duration-500">
              <div className="relative h-56 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&q=80" className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700" alt="Study" />
                <div className="absolute inset-0 bg-brand-primary/20"></div>
              </div>
              <div className="p-10 flex-grow flex flex-col space-y-8">
                <div>
                  <h3 className="text-2xl font-serif font-black text-brand-primary mb-2">長期留學</h3>
                  <p className="text-xs text-brand-accent font-bold uppercase tracking-widest">Study Abroad</p>
                </div>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <Clock className="w-4 h-4 text-brand-primary mt-1 shrink-0" />
                    <div>
                      <p className="text-[10px] font-black text-brand-primary/40 uppercase tracking-widest mb-1">時長 Duration</p>
                      <p className="text-sm font-bold text-brand-primary">1 - 4 學年 (長期深造)</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Target className="w-4 h-4 text-brand-primary mt-1 shrink-0" />
                    <div>
                      <p className="text-[10px] font-black text-brand-primary/40 uppercase tracking-widest mb-1">適合對象 Target</p>
                      <p className="text-sm font-bold text-brand-primary">欲銜接紐西蘭學制或取得正式學位者</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Check className="w-4 h-4 text-brand-accent mt-1 shrink-0" />
                    <div>
                      <p className="text-[10px] font-black text-brand-primary/40 uppercase tracking-widest mb-1">核心價值 Value</p>
                      <p className="text-xs text-brand-sub leading-loose">深度體驗八大名校體系、建立全球職涯基礎、長期人脈建立。</p>
                    </div>
                  </div>
                </div>

                <div className="pt-8 border-t border-brand-primary/5 flex items-center justify-between mt-auto">
                  <Link to="/programs?type=Study Abroad" className="px-8 py-3 bg-brand-primary text-brand-secondary rounded-full font-black text-[10px] uppercase tracking-widest hover:bg-brand-accent transition-all">
                    方案細節
                  </Link>
                  <GraduationCap size={24} className="text-brand-primary/20" />
                </div>
              </div>
            </div>

            {/* 遊學 Card */}
            <div className="group bg-brand-cream rounded-2xl overflow-hidden shadow-zen border border-brand-primary/5 flex flex-col hover:border-brand-primary/20 transition-all duration-500">
              <div className="relative h-56 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1523908511403-7fc7b25592f4?w=800&q=80" className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700" alt="Tour" />
                <div className="absolute inset-0 bg-brand-accent/20"></div>
              </div>
              <div className="p-10 flex-grow flex flex-col space-y-8">
                <div>
                  <h3 className="text-2xl font-serif font-black text-brand-primary mb-2">密集遊學</h3>
                  <p className="text-xs text-brand-accent font-bold uppercase tracking-widest">Language Tour</p>
                </div>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <Clock className="w-4 h-4 text-brand-primary mt-1 shrink-0" />
                    <div>
                      <p className="text-[10px] font-black text-brand-primary/40 uppercase tracking-widest mb-1">時長 Duration</p>
                      <p className="text-sm font-bold text-brand-primary">4 週 - 半年 (短期快充)</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Target className="w-4 h-4 text-brand-primary mt-1 shrink-0" />
                    <div>
                      <p className="text-[10px] font-black text-brand-primary/40 uppercase tracking-widest mb-1">適合對象 Target</p>
                      <p className="text-sm font-bold text-brand-primary">學生族寒暑假或職場轉銜空檔者</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Check className="w-4 h-4 text-brand-accent mt-1 shrink-0" />
                    <div>
                      <p className="text-[10px] font-black text-brand-primary/40 uppercase tracking-widest mb-1">核心價值 Value</p>
                      <p className="text-xs text-brand-sub leading-loose">密集語言口說訓練、文化探索、打工度假前哨戰與適應。</p>
                    </div>
                  </div>
                </div>

                <div className="pt-8 border-t border-brand-primary/5 flex items-center justify-between mt-auto">
                  <Link to="/programs?type=Language School" className="px-8 py-3 bg-brand-accent text-white rounded-full font-black text-[10px] uppercase tracking-widest hover:bg-brand-primary transition-all">
                    方案細節
                  </Link>
                  <Globe size={24} className="text-brand-accent/20" />
                </div>
              </div>
            </div>

            {/* 微留學 Card */}
            <div className="group bg-brand-cream rounded-2xl overflow-hidden shadow-zen border border-brand-primary/5 flex flex-col hover:border-brand-primary/20 transition-all duration-500">
              <div className="relative h-56 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80" className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700" alt="Experience" />
                <div className="absolute inset-0 bg-brand-primary/10"></div>
              </div>
              <div className="p-10 flex-grow flex flex-col space-y-8">
                <div>
                  <h3 className="text-2xl font-serif font-black text-brand-primary mb-2">微留學</h3>
                  <p className="text-xs text-brand-accent font-bold uppercase tracking-widest">Micro Study</p>
                </div>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <Clock className="w-4 h-4 text-brand-primary mt-1 shrink-0" />
                    <div>
                      <p className="text-[10px] font-black text-brand-primary/40 uppercase tracking-widest mb-1">時長 Duration</p>
                      <p className="text-sm font-bold text-brand-primary">2 週 - 4 週 (體驗主導)</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Target className="w-4 h-4 text-brand-primary mt-1 shrink-0" />
                    <div>
                      <p className="text-[10px] font-black text-brand-primary/40 uppercase tracking-widest mb-1">適合對象 Target</p>
                      <p className="text-sm font-bold text-brand-primary">國中小親子家庭、低齡學生首次出國者</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Check className="w-4 h-4 text-brand-accent mt-1 shrink-0" />
                    <div>
                      <p className="text-[10px] font-black text-brand-primary/40 uppercase tracking-widest mb-1">核心價值 Value</p>
                      <p className="text-xs text-brand-sub leading-loose">插班公立小學、Kiwi 學伴制度、親子共同探索、無痛啟發國際視野。</p>
                    </div>
                  </div>
                </div>

                <div className="pt-8 border-t border-brand-primary/5 flex items-center justify-between mt-auto">
                  <Link to="/programs?type=Micro Study" className="px-8 py-3 bg-brand-primary text-brand-secondary rounded-full font-black text-[10px] uppercase tracking-widest hover:bg-brand-accent transition-all">
                    方案細節
                  </Link>
                  <Users size={24} className="text-brand-primary/20" />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. SERVICE SOP */}
      <section className="py-32 bg-brand-cream/30">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-24">
             <h2 className="text-4xl md:text-5xl font-serif font-black text-brand-primary mb-6">服務流程</h2>
             <span className="text-brand-accent tracking-[0.5em] uppercase text-[10px] font-black opacity-60">SIMPLE 5 STEPS TO THE WORLD</span>
          </div>

          <div className="relative max-w-6xl mx-auto">
            <div className="absolute top-[48px] left-[10%] w-[80%] h-[1px] bg-brand-primary/10 hidden lg:block z-0"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-12 lg:gap-8 relative z-10">
              {[
                { id: "01", icon: <MessageCircle size={24} />, title: "需求諮詢", desc: "深度訪談與目標設定" },
                { id: "02", icon: <Search size={24} />, title: "精準配對", desc: "精選最適合的環境" },
                { id: "03", icon: <FileText size={24} />, title: "報名代辦", desc: "行政文件與簽證支援" },
                { id: "04", icon: <BookOpen size={24} />, title: "行前特訓", desc: "LPP 語言與心理準備" },
                { id: "05", icon: <Plane size={24} />, title: "抵達安置", desc: "落地與全程生活支援" }
              ].map((step, i) => (
                <div key={i} className="flex flex-col items-center group">
                  <div className="relative mb-8 transition-transform duration-500 group-hover:scale-110">
                    <div className="w-24 h-24 rounded-full bg-white border-2 border-brand-secondary flex items-center justify-center text-brand-accent group-hover:bg-brand-primary group-hover:text-brand-secondary group-hover:border-brand-primary transition-all duration-500 shadow-zen">
                      {step.icon}
                    </div>
                    <div className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-brand-primary text-white rounded-full flex items-center justify-center text-[10px] font-black border-2 border-white">
                      {step.id}
                    </div>
                  </div>
                  <h4 className="text-lg font-serif font-black text-brand-primary mb-3">{step.title}</h4>
                  <p className="text-xs text-brand-sub font-medium leading-relaxed text-center px-4">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. FINAL CTA */}
      <section className="py-48 bg-brand-primary text-brand-cream relative overflow-hidden">
         <div className="absolute inset-0 opacity-15 pointer-events-none">
            <img 
              src="https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=1920&q=80" 
              className="w-full h-full object-cover grayscale brightness-50" 
              alt="Nature Background" 
            />
         </div>
         <div className="container mx-auto px-6 text-center relative z-10">
            <div className="max-w-4xl mx-auto space-y-16">
               <h2 className="text-5xl md:text-9xl font-serif font-black leading-none tracking-tighter">
                 Explore<br/><span className="text-brand-accent italic">Your Future</span>
               </h2>
               <div className="flex justify-center">
                 <Link to="/booking" className="inline-flex items-center gap-10 px-16 py-8 font-black rounded-full transition-all text-[11px] tracking-[0.5em] uppercase bg-brand-secondary text-brand-primary hover:scale-110 shadow-heavy">
                    預約一對一諮詢 <ArrowRight size={28} />
                 </Link>
               </div>
            </div>
         </div>
      </section>

    </div>
  );
};

export default Home;

import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, Globe, BookOpen, Plane, Check, Star, GraduationCap, Clock, Search, FileText, MessageCircle, Quote, ChevronLeft, ChevronRight, ArrowUpRight, Users
} from 'lucide-react';

const Home: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-brand-cream selection:bg-brand-primary selection:text-white">
      
      {/* 1. HERO SECTION */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
            
            <div className="w-full lg:w-[45%] z-10 space-y-12 animate-fade-in">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                   <span className="w-8 h-[1px] bg-brand-primary"></span>
                   <span className="text-brand-primary font-black tracking-[0.4em] uppercase text-[9px] block">Lumen Stone International</span>
                </div>
                <h1 className="text-6xl md:text-8xl font-serif font-black leading-[0.95] text-brand-ink tracking-tighter">
                  啟發孩子<br/>
                  看見<span className="italic text-brand-primary">世界的寬廣</span>
                </h1>
                <p className="text-brand-sub text-lg md:text-xl font-light leading-relaxed max-w-lg">
                  我們不只是留學代辦，更是教育的策展人。透過點石精選的紐西蘭校園，讓學習不再侷限於課本。
                </p>
              </div>

              <div className="flex flex-wrap gap-5 pt-4">
                <Link to="/programs" className="px-12 py-5 bg-brand-primary text-white font-black rounded-lg hover:bg-brand-accent transition-all tracking-[0.3em] text-[10px] uppercase shadow-heavy text-center min-w-[180px]">
                  方案探索
                </Link>
                <Link to="/guide" className="px-12 py-5 bg-white border border-brand-primary/10 text-brand-primary font-black rounded-lg hover:bg-brand-primary hover:text-white transition-all tracking-[0.3em] text-[10px] uppercase text-center min-w-[180px]">
                  選課指南
                </Link>
              </div>
            </div>

            <div className="w-full lg:w-[55%] relative">
               <div className="relative aspect-[4/3] w-full">
                  <div className="absolute inset-0 rounded-2xl overflow-hidden shadow-heavy group">
                    <img 
                      src="https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=1200&q=80" 
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
                      alt="New Zealand Nature Education" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-brand-primary/40 to-transparent"></div>
                  </div>
                  <div className="absolute -bottom-10 -left-10 w-36 h-36 bg-brand-secondary rounded-full flex items-center justify-center p-8 shadow-heavy animate-bounce-slow border-4 border-brand-cream">
                     <img src="https://pub-eab9e45abd56499794188fcd886beee3.r2.dev/logo/logo.png" className="w-full h-full object-contain grayscale brightness-0 opacity-40" alt="Logo Icon" />
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. OUR PHILOSOPHY */}
      <section className="py-24 bg-brand-cream">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12 border-y border-brand-primary/10 py-20">
            <div className="md:w-1/3">
              <span className="text-brand-primary font-black tracking-[0.4em] uppercase text-[9px] mb-3 block">PHILOSOPHY</span>
              <h2 className="text-4xl font-serif font-black text-brand-ink leading-tight">
                教育是打磨心靈<br/><span className="italic text-brand-primary">的永恆過程</span>
              </h2>
            </div>
            <div className="md:w-2/3 border-l border-brand-primary/10 pl-0 md:pl-16">
              <p className="text-brand-sub text-lg leading-loose font-light italic opacity-80">
                「點石」象徵著我們的核心使命：將每一位充滿潛力的學生視為未經雕琢的原石，透過最精準的教育媒合與最具溫度的專業諮詢，在最適合的環境中雕琢出璀璨的光芒。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. PROGRAM CATEGORIES */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-4xl mx-auto text-center mb-24">
             <span className="text-brand-primary font-bold tracking-[0.5em] uppercase text-[10px] block mb-4">COMPARE PATHWAYS</span>
             <h2 className="text-5xl font-serif font-black text-brand-ink">選擇最契合的教育樣貌</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {[
              { title: "長期留學", type: "Study Abroad", img: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&q=80", duration: "1 - 4 學年", target: "欲銜接紐西蘭學制或學位者", value: "深度體驗學位體系、建立全球職涯基礎。", icon: <GraduationCap size={24}/> },
              { title: "密集遊學", type: "Language Tour", img: "https://images.unsplash.com/photo-1523908511403-7fc7b25592f4?w=800&q=80", duration: "4 週 - 半年", target: "學生寒暑假或職場轉銜空檔者", value: "密集口說訓練、文化探索、打工度假前哨。", icon: <Globe size={24}/> },
              { title: "微留學", type: "Micro Study", img: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80", duration: "2 週 - 4 週", target: "國中小親子家庭、低齡學生", value: "插班公立小學、Kiwi 學伴制度、親子共同探索。", icon: <Users size={24}/> }
            ].map((item, idx) => (
              <div key={idx} className="group bg-brand-cream rounded-xl overflow-hidden shadow-zen border border-brand-border flex flex-col hover:border-brand-primary/40 transition-all duration-500">
                <div className="relative h-64 overflow-hidden">
                  <img src={item.img} className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" alt={item.title} />
                  <div className="absolute inset-0 bg-brand-primary/10"></div>
                </div>
                <div className="p-10 flex-grow flex flex-col space-y-8">
                  <div>
                    <h3 className="text-2xl font-serif font-black text-brand-ink mb-2">{item.title}</h3>
                    <p className="text-[10px] text-brand-primary font-bold uppercase tracking-widest">{item.type}</p>
                  </div>
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <Clock className="w-4 h-4 text-brand-primary mt-1 shrink-0" />
                      <div>
                        <p className="text-[10px] font-black text-brand-ink/30 uppercase tracking-widest mb-1">時長 Duration</p>
                        <p className="text-sm font-bold text-brand-ink">{item.duration}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <Check className="w-4 h-4 text-brand-primary mt-1 shrink-0" />
                      <div>
                        <p className="text-[10px] font-black text-brand-ink/30 uppercase tracking-widest mb-1">價值 Value</p>
                        <p className="text-sm text-brand-sub leading-loose font-light">{item.value}</p>
                      </div>
                    </div>
                  </div>
                  <div className="pt-8 border-t border-brand-border flex items-center justify-between mt-auto">
                    <Link to="/programs" className="flex items-center gap-2 text-brand-ink font-black text-[10px] uppercase tracking-widest hover:text-brand-primary transition-all group/btn">
                      查看細節 <ArrowUpRight size={14} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                    </Link>
                    <span className="opacity-10 text-brand-primary">{item.icon}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. SERVICE SOP - MOVED UP and Updated to Brand Primary */}
      <section className="py-40 bg-brand-primary text-white">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-24">
             <h2 className="text-5xl font-serif font-black mb-6">服務流程</h2>
             <span className="text-brand-secondary tracking-[0.5em] uppercase text-[10px] font-black opacity-60">SIMPLE 5 STEPS TO THE WORLD</span>
          </div>

          <div className="relative max-w-6xl mx-auto">
            <div className="absolute top-[48px] left-[10%] w-[80%] h-[1px] bg-white/10 hidden lg:block z-0"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-12 lg:gap-12 relative z-10">
              {[
                { id: "01", icon: <MessageCircle size={24} />, title: "需求諮詢", desc: "深度訪談與目標設定" },
                { id: "02", icon: <Search size={24} />, title: "精準配對", desc: "精選最適合的環境" },
                { id: "03", icon: <FileText size={24} />, title: "報名代辦", desc: "行政文件與簽證支援" },
                { id: "04", icon: <BookOpen size={24} />, title: "行前特訓", desc: "LPP 語言與心理準備" },
                { id: "05", icon: <Plane size={24} />, title: "抵達安置", desc: "落地與全程生活支援" }
              ].map((step, i) => (
                <div key={i} className="flex flex-col items-center group text-center">
                  <div className="relative mb-10 transition-transform duration-500 group-hover:scale-110">
                    <div className="w-24 h-24 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-brand-secondary group-hover:bg-brand-secondary group-hover:text-brand-primary transition-all duration-500 shadow-sm">
                      {step.icon}
                    </div>
                    <div className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-brand-accent text-white rounded-full flex items-center justify-center text-[10px] font-black border-2 border-brand-primary">
                      {step.id}
                    </div>
                  </div>
                  <h4 className="text-xl font-serif font-black text-white mb-3">{step.title}</h4>
                  <p className="text-xs text-white/60 font-medium leading-relaxed max-w-[140px]">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. TESTIMONIALS - MOVED DOWN */}
      <section className="py-40 bg-brand-cream/50 relative overflow-hidden">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row gap-20">
            
            {/* Left Content (Static) */}
            <div className="lg:w-1/3 lg:sticky lg:top-40 h-fit space-y-12">
              <div className="space-y-6">
                <span className="text-brand-primary font-black tracking-[0.4em] uppercase text-[9px] block">STUDENT VOICES</span>
                <h2 className="text-5xl font-serif font-black text-brand-ink leading-tight">
                  來自世界的<br/><span className="italic text-brand-primary">真實回聲</span>
                </h2>
                <div className="w-12 h-[1px] bg-brand-primary"></div>
                <p className="text-brand-sub text-lg leading-loose font-light max-w-sm">
                  回想啟程的那一刻，心中依然充滿感動。聽聽那些曾在異國土地上茁壯的靈魂，如何描述這段改變一生的旅程。
                </p>
              </div>
              
              <div className="flex gap-4">
                <button 
                  onClick={() => scroll('left')}
                  className="w-14 h-14 rounded-full border border-brand-primary/20 flex items-center justify-center text-brand-primary hover:bg-brand-primary hover:text-white transition-all shadow-sm"
                >
                  <ChevronLeft size={24} />
                </button>
                <button 
                  onClick={() => scroll('right')}
                  className="w-14 h-14 rounded-full border border-brand-primary/20 flex items-center justify-center text-brand-primary hover:bg-brand-primary hover:text-white transition-all shadow-sm"
                >
                  <ChevronRight size={24} />
                </button>
              </div>
            </div>

            {/* Right Scrollable Cards */}
            <div className="lg:w-2/3">
              <div 
                ref={scrollRef}
                className="flex gap-8 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-12"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {[
                  {
                    name: "卓郁雅 (CG)",
                    location: "菲律賓宿霧",
                    title: "在短時間內看到自己的改變",
                    tags: ["菲律賓遊學", "密集英文"],
                    content: "在挑選代辦時，上網看了很多資料，最後選擇了「點石」。回覆速度超快、資訊也完整，特別是宿霧的教學環境超乎想像，讓我從不敢開口到現在能流暢與外師討論時事。",
                    img: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&q=80"
                  },
                  {
                    name: "鄭雅之 (IB)",
                    location: "澳洲布里斯本",
                    title: "把這段美好的經歷分享給大家",
                    tags: ["澳洲遊學", "咖啡課程"],
                    content: "當初遊學的初衷是英文能力很差，但想追求更好的未來。在點石的建議下，我選擇了結合實作的課程，不僅英文進步了，還拿到了當地的咖啡師證照。",
                    img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80"
                  },
                  {
                    name: "陳佳穎 (CES)",
                    location: "英國愛丁堡",
                    title: "完成了我的心願，有機會一定要再回來",
                    tags: ["英國留學", "文化藝術"],
                    content: "本人非常嚮往愛丁堡，再加上每次與不同國家的人談話後，深知自己英文的不足。點石顧問幫我對接了專業語言學校，還安排了非常有質感的寄宿家庭，讓我徹底融入當地文化。",
                    img: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&q=80"
                  },
                   {
                    name: "林小弟 (Age 10)",
                    location: "紐西蘭奧克蘭",
                    title: "我最好的朋友是 KiWi 傑克",
                    tags: ["微留學", "親子共學"],
                    content: "剛開始很緊張，但學伴傑克帶我一起踢足球。紐西蘭的學校下午三點就放學，我們可以去公園抓昆蟲，那裡的草地真的好大好美，我不想回台灣了！",
                    img: "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=800&q=80"
                  }
                ].map((testi, i) => (
                  <div key={i} className="min-w-[85vw] md:min-w-[450px] snap-center bg-white rounded-xl overflow-hidden shadow-zen border border-brand-border flex flex-col group hover:shadow-heavy transition-all duration-500">
                    <div className="relative h-64 overflow-hidden">
                      <img src={testi.img} className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110" alt={testi.name} />
                      <div className="absolute top-6 left-6 flex flex-wrap gap-2">
                        {testi.tags.map(tag => (
                          <span key={tag} className="text-[9px] font-black uppercase tracking-widest text-white bg-brand-primary/40 backdrop-blur-md px-3 py-1 rounded-sm">{tag}</span>
                        ))}
                      </div>
                    </div>
                    <div className="p-10 space-y-6 flex-grow flex flex-col">
                      <Quote size={32} className="text-brand-primary opacity-10" />
                      <h4 className="text-xl font-serif font-black text-brand-ink leading-snug">「{testi.title}」</h4>
                      <p className="text-sm text-brand-sub leading-loose font-light italic flex-grow">
                        {testi.content}
                      </p>
                      <div className="pt-8 mt-8 border-t border-brand-border flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-brand-cream border border-brand-primary/10 flex items-center justify-center font-serif font-bold text-brand-primary overflow-hidden">
                           <img src={`https://i.pravatar.cc/150?u=${testi.name}`} className="w-full h-full object-cover grayscale" />
                        </div>
                        <div>
                          <p className="text-sm font-black text-brand-ink">{testi.name}</p>
                          <p className="text-[9px] text-brand-primary/60 uppercase tracking-widest font-bold">{testi.location}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FINAL CTA */}
      <section className="py-48 bg-brand-primary text-brand-cream relative overflow-hidden">
         <div className="absolute inset-0 opacity-10 pointer-events-none">
            <img 
              src="https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=1920&q=80" 
              className="w-full h-full object-cover grayscale" 
              alt="Nature Background" 
            />
         </div>
         <div className="container mx-auto px-6 text-center relative z-10">
            <div className="max-w-4xl mx-auto space-y-16">
               <h2 className="text-6xl md:text-9xl font-serif font-black leading-none tracking-tighter">
                 Explore<br/><span className="text-brand-secondary italic">Your Future</span>
               </h2>
               <div className="flex justify-center">
                 <Link to="/booking" className="inline-flex items-center gap-10 px-16 py-8 font-black rounded-lg transition-all text-[11px] tracking-[0.5em] uppercase bg-brand-secondary text-brand-primary hover:scale-105 shadow-heavy">
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

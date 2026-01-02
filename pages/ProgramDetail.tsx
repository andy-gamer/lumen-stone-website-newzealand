import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  MapPin, Calendar, Clock, CheckCircle, Shield, 
  Globe, Users, ArrowLeft, ArrowRight, Download, 
  Sparkles, X, ChevronLeft, ChevronRight, Maximize2 
} from 'lucide-react';
import { DataService } from '../services/db';
import { Program } from '../types';

const ProgramDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [program, setProgram] = useState<Program | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  useEffect(() => {
    const fetchProgram = async () => {
        if (id) {
            setLoading(true);
            const data = await DataService.getProgramById(id);
            setProgram(data);
            setLoading(false);
        }
    };
    fetchProgram();
  }, [id]);

  const images = program?.gallery && program.gallery.length > 0 
    ? program.gallery 
    : [program?.image || ''];

  const nextImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setActiveImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setActiveImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  if (loading) {
      return (
          <div className="min-h-screen flex items-center justify-center bg-brand-cream">
              <div className="w-12 h-12 border-4 border-brand-accent/20 border-t-brand-accent rounded-full animate-spin"></div>
          </div>
      );
  }

  if (!program) {
    return (
      <div className="p-20 text-center min-h-screen flex flex-col items-center justify-center bg-brand-cream text-brand-ink">
        <h2 className="text-2xl font-serif font-bold mb-4">找不到該方案</h2>
        <Link to="/programs" className="text-brand-accent underline">返回方案列表</Link>
      </div>
    );
  }

  return (
    <div className="bg-brand-cream font-sans min-h-screen text-brand-ink">
      {/* Lightbox */}
      {isLightboxOpen && (
        <div 
          className="fixed inset-0 z-[100] bg-brand-ink/95 backdrop-blur-xl flex items-center justify-center animate-fade-in cursor-zoom-out"
          onClick={() => setIsLightboxOpen(false)}
        >
          <button 
            className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors"
            onClick={() => setIsLightboxOpen(false)}
          >
            <X size={32} />
          </button>
          
          <button 
            className="absolute left-8 top-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-all"
            onClick={prevImage}
          >
            <ChevronLeft size={32} />
          </button>

          <img 
            src={images[activeImageIndex]} 
            className="max-w-[90vw] max-h-[85vh] object-contain shadow-2xl rounded-lg animate-scale-up" 
            alt="Program Preview" 
          />

          <button 
            className="absolute right-8 top-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-all"
            onClick={nextImage}
          >
            <ChevronRight size={32} />
          </button>

          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 bg-black/40 px-6 py-2 rounded-full border border-white/10 text-[10px] text-white font-bold tracking-widest uppercase">
            {activeImageIndex + 1} / {images.length}
          </div>
        </div>
      )}

      {/* Back Button */}
      <div className="container mx-auto px-6 pt-40">
        <Link to="/programs" className="inline-flex items-center gap-2 text-brand-sub hover:text-brand-accent font-bold transition-colors text-[10px] tracking-[0.3em] uppercase">
          <ArrowLeft size={14} /> Back to Programs
        </Link>
      </div>

      {/* Hero Section */}
      <div className="container mx-auto px-6 py-12">
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div className="animate-fade-in space-y-8">
               <div className="space-y-4">
                  <span className="inline-block px-4 py-1 rounded-full bg-brand-accent/10 text-brand-accent font-bold text-[9px] tracking-[0.3em] uppercase">
                    {program.type}
                  </span>
                  <h1 className="text-4xl md:text-6xl font-serif font-black text-brand-ink leading-[1.1] tracking-tighter">
                    {program.title}
                  </h1>
               </div>
               
               <div className="flex flex-wrap gap-4 text-brand-sub font-bold text-[10px] uppercase tracking-wider">
                 <span className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-brand-border"><MapPin size={14} className="text-brand-accent" /> {program.country}, {program.city}</span>
                 <span className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-brand-border"><Users size={14} className="text-brand-accent" /> {program.ageRange}</span>
                 <span className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-brand-border"><Clock size={14} className="text-brand-accent" /> {program.duration}</span>
               </div>

               <p className="text-brand-sub leading-loose text-lg font-light text-justify max-w-xl">
                 {program.description}
               </p>

               <div className="text-4xl font-serif font-black text-brand-accent pt-4">
                 {program.price}
               </div>

               <div className="flex flex-wrap gap-4 pt-6">
                  <Link 
                    to="/booking"
                    state={{ interestedProgram: program.title }}
                    className="px-12 py-5 bg-brand-ink text-white rounded-full font-black hover:bg-brand-accent transition-all tracking-[0.2em] text-[10px] flex items-center gap-3 shadow-heavy uppercase"
                  >
                    立即諮詢方案 <ArrowRight size={18} />
                  </Link>
                  <button className="px-10 py-5 bg-white border border-brand-border text-brand-ink rounded-full font-bold hover:bg-brand-cream transition-all flex items-center gap-3 text-[10px] tracking-[0.2em] uppercase">
                    <Download size={18} /> 下載簡章
                  </button>
               </div>
            </div>
            
            {/* Gallery Column */}
            <div className="space-y-6">
               <div 
                  className="relative group rounded-[40px] overflow-hidden shadow-heavy border border-brand-border aspect-[16/11] cursor-zoom-in"
                  onClick={() => setIsLightboxOpen(true)}
               >
                  <img 
                    src={images[activeImageIndex]} 
                    alt={program.title} 
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105" 
                  />
                  <div className="absolute inset-0 bg-brand-ink/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="bg-white/20 backdrop-blur-md p-4 rounded-full border border-white/20">
                      <Maximize2 size={24} className="text-white" />
                    </div>
                  </div>
                  
                  {/* Quick Controls */}
                  {images.length > 1 && (
                    <>
                      <button 
                        onClick={(e) => { e.stopPropagation(); prevImage(); }}
                        className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/80 backdrop-blur-md border border-brand-border flex items-center justify-center text-brand-ink opacity-0 group-hover:opacity-100 transition-all hover:bg-brand-ink hover:text-white"
                      >
                        <ChevronLeft size={20} />
                      </button>
                      <button 
                        onClick={(e) => { e.stopPropagation(); nextImage(); }}
                        className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/80 backdrop-blur-md border border-brand-border flex items-center justify-center text-brand-ink opacity-0 group-hover:opacity-100 transition-all hover:bg-brand-ink hover:text-white"
                      >
                        <ChevronRight size={20} />
                      </button>
                    </>
                  )}
               </div>

               {/* Thumbnails */}
               {images.length > 1 && (
                 <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                    {images.map((img, idx) => (
                      <button 
                        key={idx}
                        onClick={() => setActiveImageIndex(idx)}
                        className={`relative shrink-0 w-24 aspect-square rounded-2xl overflow-hidden border-2 transition-all duration-300 ${activeImageIndex === idx ? 'border-brand-accent scale-105 shadow-md' : 'border-transparent opacity-50 hover:opacity-100'}`}
                      >
                        <img src={img} className="w-full h-full object-cover" alt={`Thumb ${idx}`} />
                      </button>
                    ))}
                 </div>
               )}
            </div>
         </div>
      </div>

      <div className="container mx-auto px-6 py-24 grid grid-cols-1 lg:grid-cols-3 gap-20 border-t border-brand-border mt-12">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-24">
          
          <section>
            <div className="flex items-center gap-6 mb-12">
               <div className="w-12 h-12 rounded-2xl bg-brand-accent/10 flex items-center justify-center text-brand-accent">
                 <Sparkles size={24} />
               </div>
               <h2 className="text-3xl font-serif font-black text-brand-ink">方案亮點</h2>
            </div>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {program.highlights?.map((h, i) => (
                <li key={i} className="flex items-center gap-6 bg-white p-8 rounded-3xl border border-brand-border hover:shadow-zen transition-all group">
                  <div className="w-10 h-10 rounded-full bg-brand-accent text-white flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                     <CheckCircle size={20} />
                  </div>
                  <span className="text-brand-ink font-bold text-base leading-relaxed">{h}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
             <h2 className="text-3xl font-serif font-black text-brand-ink mb-12">關於本方案</h2>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                <div className="bg-white p-8 rounded-3xl text-center border border-brand-border hover:shadow-zen transition-all">
                  <div className="w-14 h-14 bg-brand-cream text-brand-accent rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm border border-brand-border"><Globe size={28}/></div>
                  <h4 className="font-black text-[10px] uppercase tracking-widest mb-3 text-brand-accent">國際化環境</h4>
                  <p className="text-xs text-brand-sub leading-loose font-light">全英文浸潤式學習，快速融入當地社交圈。</p>
                </div>
                 <div className="bg-white p-8 rounded-3xl text-center border border-brand-border hover:shadow-zen transition-all">
                  <div className="w-14 h-14 bg-brand-cream text-brand-accent rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm border border-brand-border"><Shield size={28}/></div>
                  <h4 className="font-black text-[10px] uppercase tracking-widest mb-3 text-brand-accent">安心守護</h4>
                  <p className="text-xs text-brand-sub leading-loose font-light">嚴選優質寄宿家庭，提供專業落地支援。</p>
                </div>
                 <div className="bg-white p-8 rounded-3xl text-center border border-brand-border hover:shadow-zen transition-all">
                  <div className="w-14 h-14 bg-brand-cream text-brand-accent rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm border border-brand-border"><Calendar size={28}/></div>
                  <h4 className="font-black text-[10px] uppercase tracking-widest mb-3 text-brand-accent">豐富活動</h4>
                  <p className="text-xs text-brand-sub leading-loose font-light">週末戶外探險與文化體驗，平衡學習與生活。</p>
                </div>
             </div>
          </section>

          <section>
            <h2 className="text-3xl font-serif font-black text-brand-ink mb-12">每日作息參考</h2>
            <div className="overflow-hidden rounded-3xl border border-brand-border bg-white shadow-zen">
              <table className="w-full text-left text-brand-ink">
                <thead className="bg-brand-cream text-brand-accent uppercase tracking-[0.3em] text-[10px]">
                  <tr>
                    <th className="px-10 py-6 font-black">時段 Time</th>
                    <th className="px-10 py-6 font-black">活動內容 Activity</th>
                  </tr>
                </thead>
                <tbody className="text-sm font-light">
                  <tr className="border-b border-brand-border hover:bg-brand-cream transition-colors">
                    <td className="px-10 py-8 font-black text-brand-accent">09:00 - 12:00</td>
                    <td className="px-10 py-8 text-brand-ink/80">學術課程 / 分級英語教學</td>
                  </tr>
                  <tr className="border-b border-brand-border hover:bg-brand-cream transition-colors">
                    <td className="px-10 py-8 font-black text-brand-accent">12:00 - 13:30</td>
                    <td className="px-10 py-8 text-brand-ink/80">午休與交流時段</td>
                  </tr>
                  <tr className="hover:bg-brand-cream transition-colors">
                    <td className="px-10 py-8 font-black text-brand-accent">13:30 - 16:30</td>
                    <td className="px-10 py-8 text-brand-ink/80">下午工作坊 / 戶外體育與文化巡禮</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </div>

        {/* Sidebar Sticky */}
        <div className="lg:col-span-1">
          <div className="sticky top-32 space-y-10">
            <div className="bg-white rounded-[40px] border border-brand-border p-12 shadow-heavy">
              <h3 className="text-xl font-serif font-black text-brand-ink mb-10 flex items-center justify-between">
                方案包含內容 <CheckCircle size={20} className="text-brand-accent" />
              </h3>
              <div className="space-y-4 mb-12">
                {[
                  "學雜費與註冊費",
                  "住宿與餐食代訂",
                  "當地交通接送 (加購)",
                  "平安保險與簽證輔導"
                ].map((item, i) => (
                    <div key={i} className="flex justify-between items-center bg-brand-cream/50 p-5 rounded-2xl border border-brand-border group hover:border-brand-accent/50 transition-all">
                        <span className="text-sm font-bold text-brand-ink/70">{item}</span>
                        <div className="w-6 h-6 rounded-full border border-brand-accent/30 flex items-center justify-center text-brand-accent">
                          <CheckCircle size={14} />
                        </div>
                    </div>
                ))}
              </div>

              <div className="bg-brand-ink rounded-[32px] p-10 text-center text-brand-secondary relative overflow-hidden group">
                 <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-125 transition-transform"><Sparkles size={80}/></div>
                 <p className="text-[9px] uppercase tracking-[0.4em] font-black mb-4 opacity-50">Estimated Total</p>
                 <p className="text-3xl font-serif font-black mb-10 leading-none text-white">{program.price}</p>
                 <Link 
                    to="/booking"
                    state={{ interestedProgram: program.title }}
                    className="block w-full bg-brand-secondary text-brand-ink py-5 rounded-full font-black hover:bg-white transition-all tracking-[0.2em] text-[10px] uppercase shadow-xl"
                  >
                    立即預約諮詢
                  </Link>
              </div>
            </div>
            
            <div className="bg-white p-10 rounded-[40px] border border-brand-border border-dashed">
              <h4 className="font-black text-brand-accent mb-6 flex items-center gap-3 uppercase tracking-widest text-[9px]">
                <span className="w-2 h-2 rounded-full bg-brand-accent animate-ping"></span>
                Next Intake
              </h4>
              <p className="text-brand-sub text-sm mb-8 leading-loose font-light">熱門梯次名額有限，建議提前三個月完成報名與評估。</p>
              <div className="space-y-4">
                <div className="bg-brand-cream px-6 py-4 rounded-2xl text-[10px] font-black text-brand-ink border border-brand-border flex items-center justify-between">
                  <span>2024.07.01 - 2024.07.28</span>
                  <div className="w-2 h-2 rounded-full bg-brand-accent"></div>
                </div>
                <div className="bg-brand-cream px-6 py-4 rounded-2xl text-[10px] font-black text-brand-ink border border-brand-border flex items-center justify-between">
                  <span>2024.08.01 - 2024.08.28</span>
                  <div className="w-2 h-2 rounded-full bg-brand-accent"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgramDetail;
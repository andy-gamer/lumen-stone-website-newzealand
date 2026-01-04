import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  MapPin, Calendar, Clock, CheckCircle, Shield, 
  Globe, Users, ArrowLeft, ArrowRight, Download, 
  Sparkles, X, ChevronLeft, ChevronRight, Maximize2,
  Award
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

  if (loading) {
      return (
          <div className="min-h-screen flex items-center justify-center bg-brand-cream">
              <div className="w-10 h-10 border-2 border-brand-accent/20 border-t-brand-accent rounded-full animate-spin"></div>
          </div>
      );
  }

  if (!program) {
    return (
      <div className="p-20 text-center min-h-screen flex flex-col items-center justify-center bg-brand-cream text-brand-ink">
        <h2 className="text-xl font-serif font-bold mb-4">找不到該方案</h2>
        <Link to="/programs" className="text-brand-accent underline text-sm">返回方案列表</Link>
      </div>
    );
  }

  return (
    <div className="bg-brand-cream font-sans min-h-screen text-brand-ink">
      {/* Back Button */}
      <div className="container mx-auto px-6 pt-32 md:pt-40">
        <Link to="/programs" className="inline-flex items-center gap-2 text-brand-sub hover:text-brand-accent font-black transition-colors text-[9px] tracking-[0.4em] uppercase">
          <ArrowLeft size={12} /> Back to Programs
        </Link>
      </div>

      {/* Hero Section */}
      <div className="container mx-auto px-6 py-12">
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <div className="animate-fade-in space-y-8">
               <div className="space-y-3">
                  <span className="inline-block px-3 py-1 rounded bg-brand-accent/10 text-brand-accent font-black text-[8px] tracking-[0.4em] uppercase">
                    {program.type}
                  </span>
                  <h1 className="text-3xl md:text-5xl font-serif font-black text-brand-ink leading-tight tracking-tight">
                    {program.title}
                  </h1>
               </div>
               
               <div className="flex flex-wrap gap-3 text-brand-sub font-black text-[9px] uppercase tracking-widest">
                 <span className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg border border-brand-border"><MapPin size={14} className="text-brand-accent" /> {program.city}</span>
                 <span className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg border border-brand-border"><Users size={14} className="text-brand-accent" /> {program.ageRange}</span>
                 <span className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg border border-brand-border"><Clock size={14} className="text-brand-accent" /> {program.duration}</span>
               </div>

               <p className="text-brand-sub leading-loose text-[15px] font-light text-justify max-w-xl border-l-2 border-brand-border pl-8">
                 {program.description}
               </p>

               <div className="flex flex-wrap gap-4 pt-6">
                  <Link 
                    to="/booking"
                    state={{ interestedProgram: program.title }}
                    className="px-10 py-4 bg-brand-primary text-white rounded-lg font-black hover:bg-brand-ink transition-all tracking-[0.2em] text-[10px] flex items-center gap-3 shadow-heavy uppercase"
                  >
                    立即諮詢專業顧問 <ArrowRight size={16} />
                  </Link>
                  <button className="px-8 py-4 bg-white border border-brand-border text-brand-ink rounded-lg font-black hover:bg-brand-cream transition-all flex items-center gap-3 text-[10px] tracking-[0.2em] uppercase">
                    <Download size={16} /> 下載學校簡章
                  </button>
               </div>
            </div>
            
            <div className="relative group rounded-3xl overflow-hidden shadow-heavy border border-brand-border aspect-[4/3]">
                <img src={program.image} alt={program.title} className="w-full h-full object-cover" />
            </div>
         </div>
      </div>

      <div className="container mx-auto px-6 py-24 grid grid-cols-1 lg:grid-cols-3 gap-16 border-t border-brand-border mt-12">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-20">
          <section>
            <div className="flex items-center gap-4 mb-12">
               <div className="w-10 h-10 rounded-xl bg-brand-accent/10 flex items-center justify-center text-brand-accent">
                 <Sparkles size={20} />
               </div>
               <h2 className="text-2xl font-serif font-black text-brand-ink">學校亮點與特色</h2>
            </div>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {program.highlights?.map((h, i) => (
                <li key={i} className="flex items-start gap-4 bg-white p-6 rounded-2xl border border-brand-border hover:border-brand-accent transition-all group">
                  <div className="w-7 h-7 rounded-full bg-brand-accent/10 text-brand-accent flex items-center justify-center shrink-0 group-hover:bg-brand-accent group-hover:text-white transition-all">
                     <CheckCircle size={16} />
                  </div>
                  <span className="text-brand-ink font-bold text-sm leading-relaxed">{h}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="bg-brand-primary p-12 rounded-[40px] text-white overflow-hidden relative">
             <Award className="absolute -bottom-10 -right-10 w-48 h-48 opacity-5" />
             <h2 className="text-xl md:text-2xl font-serif font-black mb-8 text-brand-secondary uppercase tracking-widest">Why This School?</h2>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                <div className="space-y-3">
                   <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center text-brand-secondary"><Globe size={20}/></div>
                   <h4 className="font-black text-[10px] uppercase tracking-widest text-brand-secondary/80">純淨環境</h4>
                   <p className="text-xs text-white/60 leading-relaxed font-light">精心挑選治安極佳且自然資源豐富的校區。</p>
                </div>
                <div className="space-y-3">
                   <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center text-brand-secondary"><Shield size={20}/></div>
                   <h4 className="font-black text-[10px] uppercase tracking-widest text-brand-secondary/80">在地守護</h4>
                   <p className="text-xs text-white/60 leading-relaxed font-light">駐紐西蘭辦公室團隊提供 24/7 生活支援。</p>
                </div>
                <div className="space-y-3">
                   <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center text-brand-secondary"><Calendar size={20}/></div>
                   <h4 className="font-black text-[10px] uppercase tracking-widest text-brand-secondary/80">多元探索</h4>
                   <p className="text-xs text-white/60 leading-relaxed font-light">融合科學、藝術與獨特戶外探險課程。</p>
                </div>
             </div>
          </section>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-32 space-y-8">
            <div className="bg-white rounded-[32px] border border-brand-border p-10 shadow-heavy">
              <h3 className="text-lg font-serif font-black text-brand-ink mb-8">預約入學諮詢</h3>
              <p className="text-xs text-brand-sub mb-8 leading-relaxed font-light">學位名額有限，建議提早 6-12 個月進行規畫與申請，我們將協助您處理所有成績對接與簽證手續。</p>
              <Link 
                to="/booking"
                state={{ interestedProgram: program.title }}
                className="block w-full bg-brand-primary text-white py-4 rounded-lg text-center font-black hover:bg-brand-ink transition-all tracking-[0.2em] text-[10px] uppercase shadow-lg"
              >
                安排 1 對 1 免費諮詢
              </Link>
              <div className="mt-8 pt-8 border-t border-brand-border space-y-4">
                 <div className="flex items-center gap-3 text-brand-sub">
                    <CheckCircle size={14} className="text-brand-accent"/>
                    <span className="text-[11px] font-bold">全流程文件代辦服務</span>
                 </div>
                 <div className="flex items-center gap-3 text-brand-sub">
                    <CheckCircle size={14} className="text-brand-accent"/>
                    <span className="text-[11px] font-bold">精準校園配對與學分轉換</span>
                 </div>
                 <div className="flex items-center gap-3 text-brand-sub">
                    <CheckCircle size={14} className="text-brand-accent"/>
                    <span className="text-[11px] font-bold">紐西蘭落地生活導航</span>
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
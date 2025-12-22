
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  CheckCircle, ArrowRight, RefreshCcw, HelpCircle, 
  MapPin, Award, GraduationCap, Clock, Info, Shield, Heart,
  ChevronDown, ChevronUp, Users, BookOpen, Trees, Waves, Coffee
} from 'lucide-react';

const NzGuideZone: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const quizRef = useRef<HTMLDivElement>(null);

  const scrollToQuiz = () => {
    quizRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const GRADE_MAP = [
    { nz: "Year 1-6", age: "5-10 歲", tw: "國小", stage: "Primary School" },
    { nz: "Year 7-8", age: "11-12 歲", tw: "國一、二", stage: "Intermediate" },
    { nz: "Year 9-13", age: "13-18 歲", tw: "國三、高中", stage: "High School" },
  ];

  const REGIONS = [
    {
      name: "奧克蘭 Auckland",
      tag: "帆船之都",
      desc: "紐西蘭最大的教育樞紐，擁有最多元的校園選擇與頂尖的學術資源。",
      ratio: "1:15",
      esl: "極高 (專屬 ESL 班級)",
      feature: "帆船、高爾夫、頂尖商科課程",
      image: "https://images.unsplash.com/photo-1507699622177-38889b58527d?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      color: "border-brand-sage"
    },
    {
      name: "基督城 Christchurch",
      tag: "花園城市",
      desc: "充滿英式人文氣息，環境優雅寧靜，是許多台灣家長微留學的首選。",
      ratio: "1:12",
      esl: "高 (小班制輔導)",
      feature: "農業科學、自然地理、划船運動",
      image: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      color: "border-brand-accent"
    },
    {
      name: "皇后鎮 Queenstown",
      tag: "冒險天堂",
      desc: "在壯麗山海中學習，強調戶外教育與自信心培養，適合外向好動的孩子。",
      ratio: "1:10",
      esl: "中 (沉浸式英語環境)",
      feature: "滑雪、登山、觀光與飯店管理",
      image: "https://images.unsplash.com/photo-1589802829985-817e51171b92?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      color: "border-brand-ink"
    }
  ];

  const FAQS = [
    {
      q: "紐西蘭遊學需要辦理簽證嗎？",
      a: "持台灣護照前往紐西蘭遊學，不超過 90 天可免簽證入境（僅需辦理電子旅行授權 NZeTA）。若課程超過 3 個月，則需申請學生簽證。點石顧問會協助家長準備所有文件。"
    },
    {
      q: "微留學期間，生活費用大約需要多少？",
      a: "紐西蘭消費水平與台北相近。寄宿家庭通常包含三餐，孩子每週的零用金建議在 50-100 紐幣。若家長陪讀，租屋與開銷建議預估每月台幣 6-8 萬。"
    },
    {
      q: "孩子回台灣後，學制如何銜接？",
      a: "紐西蘭的學級對照相對明確。短期插班不影響台灣學籍，長期就讀 NCEA 系統之成績受全球認可，可直接回台申請轉學或以國外學生身分銜接高二/高三課程。"
    },
    {
      q: "當地的醫療體系安全嗎？",
      a: "紐西蘭對國際生有嚴格的 Code of Practice 保護。所有學員必須購買醫療保險，感冒、意外受傷等在當地門診皆有完整保障，重大傷病保險全額給付，家長可完全放心。"
    }
  ];

  const questions = [
    {
      id: 1,
      question: "孩子目前的年齡階段？",
      sub: "紐西蘭 5 歲即可入學，不同階段有不同的學制銜接。",
      options: ["幼兒/國小低年級 (5-7歲)", "國小中年級 (8-10歲)", "高小/國中 (11-14歲)", "高中階段 (15歲以上)"]
    },
    {
      id: 2,
      question: "這是否為孩子第一次出國？",
      sub: "這將決定學伴 (Buddy) 制度的建議密集程度。",
      options: ["是的，第一次嘗試", "有過短期旅遊經驗", "有過夏令營經驗", "經驗豐富且獨立"]
    },
    {
      id: 3,
      question: "家長是否會隨行陪同？",
      sub: "陪讀家長我們也會規劃成人英語或在地文化行程。",
      options: ["家長全程陪同 (親子方案)", "家長送機後返台", "孩子獨自前往 (寄宿家庭)", "目前尚未決定"]
    },
    {
      id: 4,
      question: "預計在紐西蘭停留的時間？",
      sub: "停留時間決定了簽證類型與學習深度。",
      options: ["短期快充 (2-4週)", "精實體驗 (1-3個月)", "長期銜接 (半年至一年)", "移民 / 長期升學規劃"]
    }
  ];

  const handleSelect = (option: string) => { setAnswers({ ...answers, [step]: option }); };
  const nextStep = () => { if (step < questions.length) setStep(step + 1); };

  const getRecommendation = () => {
    const age = answers[0];
    const parentAccompany = answers[2];
    const duration = answers[3];
    
    if (duration?.includes("長期") || duration?.includes("移民")) return "長期學籍銜接計畫";
    if (parentAccompany?.includes("親子") || age?.includes("國小")) return "中小學微留學親子插班 (含學伴)";
    return "寒暑假短期校園營隊";
  };

  return (
    <div className="bg-brand-cream min-h-screen">
      
      {/* 🟢 Hero Section */}
      <section className="bg-brand-ink text-white pt-40 pb-32 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20"><img src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80" className="w-full h-full object-cover"/></div>
        <div className="container mx-auto px-6 text-center relative z-10">
           <h1 className="text-5xl md:text-7xl font-serif font-bold mb-8">紐西蘭：<br/>成長的百科全書</h1>
           <p className="text-xl text-white/70 max-w-2xl mx-auto font-light leading-relaxed">
             從學制對照到選課診斷，點石為您梳理南半球最純粹的教育路徑。
           </p>
           <button onClick={scrollToQuiz} className="mt-12 px-10 py-4 bg-brand-accent text-white rounded-full font-bold shadow-gold flex items-center gap-3 mx-auto transition-transform hover:scale-105">
             開始選課診斷 <ArrowRight size={18}/>
           </button>
        </div>
      </section>

      {/* 🟢 NZ Education Info */}
      <section className="py-32 container mx-auto px-6 lg:px-12">
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
            <div className="space-y-12">
               <div>
                  <h2 className="text-3xl font-serif font-bold text-brand-ink mb-6">學級對照：銜接不留白</h2>
                  <p className="text-brand-sub font-light leading-loose mb-8">
                     紐西蘭採 13 年學制，孩子年滿 5 歲生日當天即可直接入學。我們與奧克蘭、基督城多所優質校園深度合作，確保孩子回台後學籍完美對接。
                  </p>
                  <div className="bg-white rounded-3xl shadow-zen border border-brand-sage/10 overflow-hidden">
                     <table className="w-full text-left">
                        <thead>
                           <tr className="bg-brand-sage text-white text-xs uppercase tracking-widest">
                              <th className="p-4 font-bold">紐西蘭年級</th>
                              <th className="p-4 font-bold">入學年齡</th>
                              <th className="p-4 font-bold">台灣對照</th>
                           </tr>
                        </thead>
                        <tbody className="text-sm">
                           {GRADE_MAP.map((row, i) => (
                              <tr key={i} className="border-b border-brand-cream/50 hover:bg-brand-cream/20">
                                 <td className="p-4 font-bold text-brand-sage">{row.nz}</td>
                                 <td className="p-4 text-brand-sub">{row.age}</td>
                                 <td className="p-4 text-brand-sub">{row.tw}</td>
                              </tr>
                           ))}
                        </tbody>
                     </table>
                  </div>
               </div>
               
               <div className="bg-brand-sage text-white p-10 rounded-[50px] shadow-premium relative overflow-hidden">
                  <Award className="absolute -top-10 -right-10 w-48 h-48 opacity-10" />
                  <h3 className="text-2xl font-serif font-bold mb-6">NCEA：重視個性的學制</h3>
                  <p className="text-white/80 leading-loose text-sm font-light">
                     NCEA 是紐西蘭中學生的主要學歷。它拒絕一試定生死，結合了平時作業、實作評量與年終測試。這種學制讓具備術科專長的孩子也能在全球名校錄取中獲得優勢。
                  </p>
               </div>
            </div>

            <div className="space-y-12">
               <div className="relative group">
                  <img src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" className="rounded-[60px] shadow-premium"/>
                  <div className="absolute -bottom-10 -right-10 glass-card p-10 rounded-[40px] shadow-premium border border-brand-accent/20 max-w-xs hidden md:block">
                     <h4 className="font-bold text-brand-accent mb-2">安全第一</h4>
                     <p className="text-xs text-brand-sub leading-relaxed">低齡插班家長最重視的「安全」，在紐西蘭是理所當然的標配。</p>
                  </div>
               </div>
               
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-10">
                  <div className="flex gap-4">
                     <div className="w-10 h-10 bg-brand-accent/10 text-brand-accent rounded-full flex items-center justify-center shrink-0"><Shield size={18}/></div>
                     <div><h5 className="font-bold text-brand-ink mb-1">純淨英文環境</h5><p className="text-xs text-brand-sub">當地生比例高，強迫啟動英語腦。</p></div>
                  </div>
                  <div className="flex gap-4">
                     <div className="w-10 h-10 bg-brand-accent/10 text-brand-accent rounded-full flex items-center justify-center shrink-0"><Heart size={18}/></div>
                     <div><h5 className="font-bold text-brand-ink mb-1">獨家學伴陪伴</h5><p className="text-xs text-brand-sub">每位新生皆配有一位 Buddy 同學。</p></div>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* 🟢 特色校區展示 */}
      <section className="py-32 bg-brand-cream/30">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-20 space-y-4">
             <span className="text-brand-accent font-bold tracking-widest text-xs uppercase">Choose Your Vibe</span>
             <h2 className="text-3xl md:text-5xl font-serif font-bold text-brand-ink">熱門校區特色對比</h2>
             <p className="text-brand-sub font-light">不同的城市氛圍，適合不同個性的孩子。</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {REGIONS.map((region, idx) => (
              <div key={idx} className={`bg-white p-8 rounded-[60px] border-t-8 ${region.color} shadow-zen group hover:shadow-premium transition-all duration-500`}>
                 <div className="h-48 rounded-[40px] overflow-hidden mb-8">
                   <img src={region.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt={region.name} />
                 </div>
                 <span className="text-brand-accent font-bold text-[10px] tracking-widest uppercase mb-2 block">{region.tag}</span>
                 <h4 className="text-2xl font-serif font-bold text-brand-ink mb-4">{region.name}</h4>
                 <p className="text-brand-sub text-sm font-light leading-loose mb-8 h-20 overflow-hidden">{region.desc}</p>
                 <div className="space-y-3 pt-6 border-t border-brand-accent/10">
                    <div className="flex justify-between text-xs">
                       <span className="text-brand-sub flex items-center gap-1"><Users size={14}/> 平均師生比</span>
                       <span className="font-bold text-brand-sage">{region.ratio}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                       <span className="text-brand-sub flex items-center gap-1"><BookOpen size={14}/> ESL 支持度</span>
                       <span className="font-bold text-brand-sage">{region.esl}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                       <span className="text-brand-sub flex items-center gap-1"><Trees size={14}/> 核心特色</span>
                       <span className="font-bold text-brand-sage">{region.feature}</span>
                    </div>
                 </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 🟢 Interactive Selection Quiz */}
      <section ref={quizRef} className="py-32 bg-white scroll-mt-24">
         <div className="container mx-auto px-6 max-w-4xl">
            <div className="sketch-border p-12 md:p-20 bg-brand-cream/30 rounded-[60px] shadow-zen relative">
               <div className="absolute top-0 right-0 p-10 opacity-5"><HelpCircle size={100} className="text-brand-sage"/></div>
               
               {step < questions.length ? (
                  <div className="animate-fade-in">
                     <div className="mb-12">
                        <span className="text-brand-accent font-bold text-xs tracking-[0.4em] uppercase block mb-4">Step {step + 1} / {questions.length}</span>
                        <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand-ink mb-4">{questions[step].question}</h2>
                        <p className="text-brand-sub font-light">{questions[step].sub}</p>
                     </div>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
                        {questions[step].options.map(opt => (
                           <button 
                              key={opt} 
                              onClick={() => handleSelect(opt)} 
                              className={`text-left p-6 rounded-3xl border transition-all flex justify-between items-center ${answers[step] === opt ? 'bg-brand-sage/5 border-brand-sage text-brand-ink' : 'bg-white border-brand-accent/10 hover:border-brand-accent/40 text-brand-sub'}`}
                           >
                              <span className="font-bold text-sm">{opt}</span>
                              {answers[step] === opt && <CheckCircle size={20} className="text-brand-sage" />}
                           </button>
                        ))}
                     </div>
                     <div className="flex justify-between items-center">
                        <button onClick={() => setStep(Math.max(0, step - 1))} className={`text-brand-sub hover:text-brand-sage text-sm font-medium ${step === 0 ? 'invisible' : ''}`}>返回</button>
                        <button onClick={nextStep} disabled={!answers[step]} className="px-10 py-4 bg-brand-sage text-white rounded-full font-bold flex items-center gap-2 disabled:bg-brand-sage/10 disabled:text-brand-sage/30 shadow-gold">下一步 <ArrowRight size={18}/></button>
                     </div>
                  </div>
               ) : (
                  <div className="text-center animate-fade-in">
                     <div className="w-24 h-24 bg-brand-accent/10 text-brand-accent rounded-full flex items-center justify-center mx-auto mb-10"><CheckCircle size={48} /></div>
                     <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand-ink mb-6">推薦方案：<br/><span className="text-brand-accent italic underline-art">{getRecommendation()}</span></h2>
                     <p className="text-brand-sub font-light leading-loose mb-12 max-w-lg mx-auto">
                        根據您的偏好，這項路徑最能平衡孩子的適應度與成長收益。我們建議您直接預約一次免費的深度諮詢，獲取更精準的校園清單。
                     </p>
                     <div className="flex flex-col md:flex-row gap-6 justify-center">
                        <button onClick={() => navigate('/booking')} className="px-12 py-5 bg-brand-sage text-white rounded-full font-bold shadow-gold">立即預約專家諮詢</button>
                        <button onClick={() => setStep(0)} className="px-8 py-5 text-brand-sub flex items-center gap-2 justify-center hover:text-brand-sage transition-all"><RefreshCcw size={18}/> 重新測驗</button>
                     </div>
                  </div>
               )}
            </div>
         </div>
      </section>

      {/* 🟢 家長常見問題 FAQ */}
      <section className="py-32 bg-brand-paper">
         <div className="container mx-auto px-6 max-w-3xl">
            <div className="text-center mb-16 space-y-4">
               <h2 className="text-3xl md:text-5xl font-serif font-bold text-brand-ink">家長常見問題 FAQ</h2>
               <div className="h-1 w-20 bg-brand-accent mx-auto rounded-full"></div>
            </div>
            <div className="space-y-4">
               {FAQS.map((faq, idx) => (
                 <div key={idx} className="border border-brand-accent/10 rounded-3xl overflow-hidden bg-white shadow-zen">
                    <button 
                       onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                       className="w-full flex items-center justify-between p-8 text-left transition-colors hover:bg-brand-cream/50"
                    >
                       <span className="font-serif font-bold text-brand-ink text-lg">{faq.q}</span>
                       {openFaq === idx ? <ChevronUp className="text-brand-accent" /> : <ChevronDown className="text-brand-sub" />}
                    </button>
                    {openFaq === idx && (
                      <div className="p-8 pt-0 text-brand-sub leading-loose font-light border-t border-brand-accent/5 animate-fade-in">
                         {faq.a}
                      </div>
                    )}
                 </div>
               ))}
            </div>
            <div className="mt-16 text-center">
               <p className="text-brand-sub mb-6">還有其他疑問？我們的顧問隨時準備為您解答。</p>
               <button onClick={() => navigate('/booking')} className="inline-flex items-center gap-2 text-brand-sage font-bold border-b-2 border-brand-sage pb-1 hover:text-brand-accent hover:border-brand-accent transition-all">
                  與專家對談 <ArrowRight size={18} />
               </button>
            </div>
         </div>
      </section>

    </div>
  );
};

export default NzGuideZone;

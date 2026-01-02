
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  CheckCircle, ArrowRight, RefreshCcw, 
  Compass, Sparkles, BookOpen, Plane, 
  ChevronRight, Smile, MapPin, ClipboardList
} from 'lucide-react';

const Guide: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});

  const questions = [
    {
      id: 1,
      question: "這次出國的主要目的是？",
      sub: "不同的目的將導向不同的簽證與方案建議",
      icon: <BookOpen className="text-brand-accent" size={24} />,
      options: [
        { title: "拿正式學位 (升學)", desc: "預計入讀紐西蘭公立中小學或大學" },
        { title: "提升英文實力 (進修)", desc: "短期或長期的語言能力強化" },
        { title: "體驗當地生活 (度假)", desc: "半日學習配合半日戶外探險" },
        { title: "親子共同學習 (家庭)", desc: "孩子插班上課，家長一同陪讀體驗" }
      ]
    },
    {
      id: 2,
      question: "預計停留的時間長短？",
      sub: "時間決定了您適合「留學」還是「遊學」",
      icon: <Plane className="text-brand-sage" size={24} />,
      options: [
        { title: "超過半年 (長期規劃)", desc: "適合深度文化融入與學術發展" },
        { title: "1 - 3 個月 (精實體驗)", desc: "適合寒暑假或職場空檔充電" },
        { title: "2 - 4 週 (短期快充)", desc: "快速感受異國校園氛圍" },
        { title: "尚未決定", desc: "想根據方案推薦來決定時間" }
      ]
    },
    {
      id: 3,
      question: "對環境的主要偏好？",
      sub: "紐西蘭南島與北島有截然不同的生活節奏",
      icon: <MapPin className="text-brand-accent" size={24} />,
      options: [
        { title: "城市便利 (奧克蘭)", desc: "多元文化、資源豐富的北島大城" },
        { title: "花園靜謐 (基督城)", desc: "南島學術氣息濃厚、風景宜人" },
        { title: "冒險戶外 (皇后鎮)", desc: "適合熱愛大自然與極限運動的你" },
        { title: "藝術人文 (威靈頓)", desc: "紐西蘭首都，電影與設計之鄉" }
      ]
    },
    {
      id: 4,
      question: "目前最擔心的部分是？",
      sub: "讓我們知道如何提供更精確的協助",
      icon: <ClipboardList className="text-brand-sage" size={24} />,
      options: [
        { title: "語言程度跟不上", desc: "希望能有額外的 ESL 支援" },
        { title: "當地住宿安排", desc: "高品質寄宿家庭或學生公寓" },
        { title: "簽證申請流程", desc: "需要完整的一站式代辦服務" },
        { title: "預算控管", desc: "希望找到性價比最高的選擇" }
      ]
    }
  ];

  const handleSelect = (option: string) => { 
    setAnswers({ ...answers, [step]: option }); 
    // 自動進入下一題，提供流暢體驗
    setTimeout(() => {
        if (step < questions.length - 1) {
            setStep(step + 1);
        } else {
            setStep(questions.length);
        }
    }, 400);
  };

  const getRecommendation = () => {
    const mainGoal = answers[0];
    const duration = answers[1];
    
    if (mainGoal?.includes("學位") || duration?.includes("超過半年")) return {
      title: "紐西蘭長期學術留學",
      desc: "根據您的目標，建議從公立中學銜接課程開始。我們將協助您對接基督城或奧克蘭的優質公立學校，並進行學分預估。",
      type: "Study Abroad",
      cta: "查看中學方案"
    };
    if (mainGoal?.includes("家庭")) return {
      title: "家長陪讀與微留學體驗",
      desc: "適合帶著孩子一同出發。我們會安排孩子入讀當地小學插班 (Year 1-6)，並為您安排合適的陪讀住所或短期英語課程。",
      type: "Micro Study",
      cta: "探索微留學"
    };
    if (mainGoal?.includes("進修")) return {
      title: "專業語言學校進修方案",
      desc: "奧克蘭或皇后鎮的語言中心提供高密度的口說訓練。建議選擇 8-12 週的課程，能獲得最明顯的進步感。",
      type: "Language School",
      cta: "查看語言學校"
    };
    return {
      title: "短期文化體驗遊學",
      desc: "2-4 週的精緻體驗最適合您。在皇后鎮享受冒險之餘，同時在全英文環境中重拾社交自信。",
      type: "Language School",
      cta: "瀏覽體驗方案"
    };
  };

  const recommendation = getRecommendation();

  return (
    <div className="min-h-screen bg-brand-cream py-24 flex items-center">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="bg-white p-8 md:p-20 rounded-[60px] shadow-zen border border-brand-sage/10 relative overflow-hidden">
           
           {/* Background Decoration */}
           <div className="absolute top-0 right-0 p-12 opacity-5">
              <Compass size={120} className="text-brand-sage animate-spin-slow" />
           </div>

           {step < questions.length ? (
             <div className="animate-fade-in relative z-10">
                {/* Progress Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-16">
                   <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-brand-sage/10 text-brand-sage flex items-center justify-center font-bold">
                         {step + 1}
                      </div>
                      <div>
                         <span className="text-brand-sage font-bold text-[10px] tracking-[0.4em] uppercase block">Analysis Progress</span>
                         <h3 className="text-brand-ink font-bold">Step {step + 1} of {questions.length}</h3>
                      </div>
                   </div>
                   {/* Visual Progress Bar */}
                   <div className="flex gap-2 h-1 w-32">
                      {questions.map((_, i) => (
                        <div key={i} className={`flex-1 rounded-full transition-all duration-500 ${i <= step ? 'bg-brand-sage' : 'bg-stone-100'}`}></div>
                      ))}
                   </div>
                </div>

                {/* Question */}
                <div className="mb-12">
                   <h2 className="text-3xl md:text-5xl font-serif font-bold text-brand-ink mb-6 leading-tight">
                      {questions[step].question}
                   </h2>
                   <p className="text-brand-sub font-light text-lg">
                      {questions[step].sub}
                   </p>
                </div>
                
                {/* Options Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   {questions[step].options.map((opt, oIdx) => (
                      <button 
                        key={oIdx} 
                        onClick={() => handleSelect(opt.title)} 
                        className={`text-left p-8 rounded-[32px] border-2 transition-all duration-300 group flex flex-col justify-between h-full ${answers[step] === opt.title ? 'bg-brand-sage border-brand-sage text-white shadow-xl translate-y-[-4px]' : 'bg-white border-stone-100 hover:border-brand-sage/30 hover:shadow-md'}`}
                      >
                         <div className="mb-6">
                            <span className={`text-lg font-bold block mb-1 ${answers[step] === opt.title ? 'text-white' : 'text-brand-ink'}`}>
                                {opt.title}
                            </span>
                            <p className={`text-xs font-light leading-relaxed ${answers[step] === opt.title ? 'text-white/70' : 'text-brand-sub'}`}>
                                {opt.desc}
                            </p>
                         </div>
                         <div className={`w-8 h-8 rounded-full border flex items-center justify-center self-end transition-colors ${answers[step] === opt.title ? 'bg-white border-white text-brand-sage' : 'border-stone-200 text-transparent'}`}>
                            <CheckCircle size={16} />
                         </div>
                      </button>
                   ))}
                </div>
                
                {/* Footer Nav */}
                <div className="mt-16 pt-8 border-t border-stone-50 flex justify-between items-center">
                   <button 
                     onClick={() => setStep(Math.max(0, step - 1))} 
                     disabled={step === 0}
                     className={`text-brand-sub hover:text-brand-sage text-sm font-medium flex items-center gap-2 transition-colors disabled:opacity-0`}
                   >
                      <RefreshCcw size={16} /> Back to Previous
                   </button>
                   <span className="text-[10px] text-brand-sub font-bold uppercase tracking-widest opacity-40">Lumen Stone Education</span>
                </div>
             </div>
           ) : (
             <div className="text-center animate-fade-in relative z-10 py-10">
                <div className="inline-block p-6 rounded-full bg-brand-sage/10 text-brand-sage mb-8">
                   <Sparkles size={48} className="animate-pulse" />
                </div>
                <h2 className="text-4xl md:text-5xl font-serif font-bold text-brand-ink mb-6">為您量身打造的建議</h2>
                <div className="max-w-xl mx-auto mb-12">
                   <div className="bg-brand-cream p-10 rounded-[40px] border border-brand-sage/10 relative">
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-brand-accent text-white text-[10px] px-4 py-1 rounded-full font-bold tracking-widest">
                         RECOMMENDED PATH
                      </div>
                      <h3 className="text-2xl font-serif font-bold text-brand-ink mb-4">{recommendation.title}</h3>
                      <p className="text-brand-sub leading-loose font-light">
                        {recommendation.desc}
                      </p>
                   </div>
                </div>
                
                <div className="flex flex-col md:flex-row gap-4 justify-center">
                   <button 
                    onClick={() => navigate('/booking', { state: { interestedProgram: recommendation.title } })} 
                    className="px-12 py-6 bg-brand-sage text-white rounded-full font-bold shadow-hand-drawn hover:bg-brand-ink transition-all flex items-center justify-center gap-3 group"
                   >
                      立即預約詳細諮詢 <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                   </button>
                   <button 
                    onClick={() => navigate(`/programs?type=${recommendation.type}`)} 
                    className="px-12 py-6 bg-white border border-brand-sage/20 text-brand-sage rounded-full font-bold hover:bg-brand-sage/5 transition-all"
                   >
                      {recommendation.cta}
                   </button>
                </div>
                
                <button 
                  onClick={() => { setStep(0); setAnswers({}); }} 
                  className="mt-12 text-brand-sub flex items-center gap-2 mx-auto hover:text-brand-sage transition-colors text-xs font-bold uppercase tracking-widest"
                >
                  <RefreshCcw size={14}/> Restart Analysis
                </button>
             </div>
           )}
        </div>
      </div>
    </div>
  );
};
export default Guide;

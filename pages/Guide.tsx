
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  CheckCircle, ArrowRight, RefreshCcw, 
  Compass, Sparkles, BookOpen, Plane, 
  MapPin, ClipboardList
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
      icon: <Plane className="text-brand-accent" size={24} />,
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
      icon: <ClipboardList className="text-brand-accent" size={24} />,
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
    <div className="min-h-screen bg-brand-cream font-sans pt-24">
      <section className="py-20 flex items-center">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="bg-white p-12 md:p-24 rounded-xl shadow-heavy border border-brand-border relative overflow-hidden">
            
            <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                <Compass size={200} className="text-brand-accent animate-spin-slow" />
            </div>

            {step < questions.length ? (
              <div className="animate-fade-in relative z-10">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-10 mb-20">
                    <div className="flex items-center gap-6">
                        <div className="w-16 h-16 rounded-xl bg-brand-cream text-brand-accent flex items-center justify-center font-serif text-2xl font-black shadow-sm border border-brand-border">
                          {step + 1}
                        </div>
                        <div>
                          <span className="text-brand-accent font-black text-[10px] tracking-[0.4em] uppercase block mb-1">Interactive Quiz</span>
                          <h3 className="text-brand-ink font-serif font-black text-xl">選課指南 {step + 1} / {questions.length}</h3>
                        </div>
                    </div>
                  </div>

                  <div className="mb-16">
                    <h2 className="text-4xl md:text-6xl font-serif font-black text-brand-ink mb-8 leading-tight tracking-tighter">
                        {questions[step].question}
                    </h2>
                    <p className="text-brand-sub font-light text-xl leading-relaxed">
                        {questions[step].sub}
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {questions[step].options.map((opt, oIdx) => (
                        <button 
                          key={oIdx} 
                          onClick={() => handleSelect(opt.title)} 
                          className={`text-left p-10 rounded-xl border transition-all duration-500 group flex flex-col justify-between h-full relative overflow-hidden ${answers[step] === opt.title ? 'bg-brand-ink border-brand-ink text-white shadow-xl -translate-y-2' : 'bg-white border-brand-border hover:border-brand-accent/50 hover:shadow-md'}`}
                        >
                          <div className="relative z-10">
                              <span className={`text-xl font-serif font-black block mb-2 ${answers[step] === opt.title ? 'text-brand-secondary' : 'text-brand-ink'}`}>
                                  {opt.title}
                              </span>
                              <p className={`text-sm font-light leading-loose ${answers[step] === opt.title ? 'text-white/70' : 'text-brand-sub'}`}>
                                  {opt.desc}
                              </p>
                          </div>
                          <div className={`mt-8 self-end transition-all ${answers[step] === opt.title ? 'text-brand-secondary scale-125' : 'text-brand-ink/10 group-hover:text-brand-accent/30'}`}>
                              <CheckCircle size={28} />
                          </div>
                        </button>
                    ))}
                  </div>
              </div>
            ) : (
              <div className="text-center animate-fade-in relative z-10 py-10">
                  <div className="inline-block p-10 rounded-full bg-brand-cream text-brand-accent mb-12 shadow-sm border border-brand-border">
                    <Sparkles size={60} className="animate-pulse" />
                  </div>
                  <h2 className="text-5xl md:text-7xl font-serif font-black text-brand-ink mb-10 tracking-tighter">為您量身打造的建議</h2>
                  <div className="max-w-xl mx-auto mb-16">
                    <div className="bg-brand-cream p-12 rounded-xl border border-brand-border relative shadow-sm">
                        <h3 className="text-3xl font-serif font-black text-brand-ink mb-6">{recommendation.title}</h3>
                        <p className="text-brand-sub text-lg leading-loose font-light italic">
                          {recommendation.desc}
                        </p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col md:flex-row gap-6 justify-center">
                    <button 
                      onClick={() => navigate('/booking', { state: { interestedProgram: recommendation.title } })} 
                      className="px-14 py-6 bg-brand-ink text-white rounded-lg font-black shadow-heavy hover:bg-brand-accent transition-all flex items-center justify-center gap-4 group uppercase text-[10px] tracking-widest"
                    >
                        立即預約諮詢 <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                    <button 
                      onClick={() => navigate(`/programs?type=${recommendation.type}`)} 
                      className="px-14 py-6 bg-white border border-brand-ink/10 text-brand-ink rounded-lg font-black hover:bg-brand-ink hover:text-white transition-all uppercase text-[10px] tracking-widest"
                    >
                        {recommendation.cta}
                    </button>
                  </div>
                  
                  <button 
                    onClick={() => { setStep(0); setAnswers({}); }} 
                    className="mt-16 text-brand-sub flex items-center gap-3 mx-auto hover:text-brand-accent transition-colors text-[10px] font-black uppercase tracking-[0.4em]"
                  >
                    <RefreshCcw size={16}/> 重新測驗
                  </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
export default Guide;

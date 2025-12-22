
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, ArrowRight, RefreshCcw, HelpCircle, Compass } from 'lucide-react';

const Guide: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});

  const questions = [
    {
      id: 1,
      question: "這次出國的主要目的是？",
      sub: "不同的目的將導向不同的簽證與方案",
      options: ["拿正式學位 (升學)", "提升英文實力 (短期進修)", "體驗當地生活 (度假休閒)", "孩子與家長共同學習 (親子)"]
    },
    {
      id: 2,
      question: "預計停留的時間長短？",
      sub: "時間決定了您適合「留學」還是「遊學」",
      options: ["超過半年 (長期規劃)", "1 - 3 個月 (精實體驗)", "2 - 4 週 (短期快充)", "尚未決定"]
    },
    {
      id: 3,
      question: "對環境的主要偏好？",
      sub: "紐西蘭南島與北島有截然不同的氛圍",
      options: ["城市便利 (奧克蘭)", "花園靜謐 (基督城)", "冒險戶外 (皇后鎮)", "文化藝術 (威靈頓)"]
    },
    {
      id: 4,
      question: "預算大概的範圍？",
      sub: "這將幫助我們過濾合適的學校類型",
      options: ["10萬以內", "10 - 30 萬", "30 - 60 萬", "60 萬以上"]
    }
  ];

  const handleSelect = (option: string) => { 
    setAnswers({ ...answers, [step]: option }); 
  };
  
  const nextStep = () => { 
    if (step < questions.length) setStep(step + 1); 
  };

  const getRecommendation = () => {
    const mainGoal = answers[0];
    const duration = answers[1];
    
    if (mainGoal?.includes("學位") || duration === "超過半年 (長期規劃)") return "正式學位留學方案";
    if (mainGoal?.includes("親子")) return "親子微留學插班方案";
    if (mainGoal?.includes("進修")) return "語言學校長期強化班";
    return "短期微留學體驗營";
  };

  return (
    <div className="min-h-screen bg-brand-cream py-20 flex items-center">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="bg-white p-8 md:p-16 rounded-[60px] shadow-zen border border-brand-sage/10 relative overflow-hidden">
           <div className="absolute top-0 right-0 p-8 opacity-5">
              <Compass size={120} className="text-brand-sage" />
           </div>
           
           {step < questions.length ? (
             <div className="animate-fade-in relative z-10">
                <div className="mb-12">
                   <div className="flex items-center gap-4 mb-6">
                      <span className="text-brand-sage font-bold text-xs tracking-[0.3em] uppercase">Selection Guide</span>
                      <div className="h-[1px] flex-grow bg-brand-sage/20"></div>
                      <span className="text-brand-sub text-xs">Step {step + 1} / {questions.length}</span>
                   </div>
                   <h2 className="text-3xl font-serif font-bold text-brand-ink mb-4">{questions[step].question}</h2>
                   <p className="text-brand-sub font-light">{questions[step].sub}</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
                   {questions[step].options.map(opt => (
                      <button 
                        key={opt} 
                        onClick={() => handleSelect(opt)} 
                        className={`text-left p-6 rounded-3xl border transition-all flex justify-between items-center ${answers[step] === opt ? 'bg-brand-sage/5 border-brand-sage text-brand-ink shadow-sm' : 'bg-white border-brand-sage/10 hover:border-brand-sage/40 text-brand-sub'}`}
                      >
                         <span className="font-bold">{opt}</span>
                         {answers[step] === opt && <CheckCircle size={20} className="text-brand-sage" />}
                      </button>
                   ))}
                </div>
                
                <div className="flex justify-between items-center">
                   <button onClick={() => setStep(Math.max(0, step - 1))} className={`text-brand-sub hover:text-brand-sage text-sm font-medium ${step === 0 ? 'invisible' : ''}`}>
                      返回上一步
                   </button>
                   <button 
                    onClick={nextStep} 
                    disabled={!answers[step]} 
                    className="px-10 py-4 bg-brand-sage text-white rounded-full font-bold flex items-center gap-2 disabled:bg-brand-sage/20 disabled:text-brand-sage/40 shadow-hand-drawn"
                   >
                      下一步 <ArrowRight size={18} />
                   </button>
                </div>
             </div>
           ) : (
             <div className="text-center animate-fade-in relative z-10">
                <div className="w-20 h-20 bg-brand-sage/10 text-brand-sage rounded-full flex items-center justify-center mx-auto mb-8">
                   <CheckCircle size={40} />
                </div>
                <h2 className="text-3xl font-serif font-bold text-brand-ink mb-4">分析建議：{getRecommendation()}</h2>
                <p className="text-brand-sub mb-10 max-w-lg mx-auto leading-loose font-light">
                  根據您的回答，我們初步建議您可以朝這個方向規劃。接下來，建議您預約一次 15 分鐘的線上諮詢，我們會為您列出更具體的預算清單與學校列表。
                </p>
                <div className="flex flex-col md:flex-row gap-4 justify-center">
                   <button onClick={() => navigate('/booking')} className="px-12 py-5 bg-brand-sage text-white rounded-full font-bold shadow-hand-drawn">立即預約一對一諮詢</button>
                   <button onClick={() => setStep(0)} className="px-8 py-5 text-brand-sub flex items-center gap-2 justify-center hover:text-brand-sage transition-colors"><RefreshCcw size={18}/> 重新測驗</button>
                </div>
             </div>
           )}
        </div>
      </div>
    </div>
  );
};
export default Guide;

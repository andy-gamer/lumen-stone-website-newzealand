
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, ArrowRight, RefreshCcw, HelpCircle } from 'lucide-react';

const Guide: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});

  const questions = [
    {
      id: 1,
      question: "孩子目前的年齡階段？",
      sub: "紐西蘭 5 歲即可入學，不同階段有不同的學制銜接。",
      options: ["幼兒園 / 國小低年級 (5-7歲)", "國小中年級 (8-10歲)", "國小高年級 / 國中 (11-14歲)", "高中階段 (15歲以上)"]
    },
    {
      id: 2,
      question: "這是否為孩子第一次長期出國？",
      sub: "這將決定我們是否建議「學伴 (Buddy) 制度」的密集程度。",
      options: ["是的，第一次嘗試", "有過短期旅遊經驗", "有過夏令營或海外生活經驗", "經驗豐富，非常獨立"]
    },
    {
      id: 3,
      question: "這次旅程家長是否會隨行陪同？",
      sub: "陪讀家長我們也會規劃成人英語或在地文化行程。",
      options: ["家長全程陪同 (親子方案)", "家長送機後返台", "孩子獨自前往 (寄宿家庭)", "目前尚未決定"]
    },
    {
      id: 4,
      question: "孩子目前的英語溝通程度？",
      sub: "這將幫助我們媒合適合的學校氛圍與學伴。",
      options: ["零基礎 (需要密集 ESL 支持)", "基礎會話 (敢開口但詞彙有限)", "中級程度 (可應付日常交流)", "流利 (目標是學術升學)"]
    },
    {
      id: 5,
      question: "預計在紐西蘭停留的時間？",
      sub: "停留時間決定了簽證類型與學習深度。",
      options: ["短期快充 (2-4週)", "精實體驗 (1-3個月)", "長期銜接 (半年至一年)", "移民 / 長期升學規劃"]
    }
  ];

  const handleSelect = (option: string) => { setAnswers({ ...answers, [step]: option }); };
  const nextStep = () => { if (step < questions.length) setStep(step + 1); };

  const getRecommendation = () => {
    const age = answers[0];
    const firstTime = answers[1];
    const parentAccompany = answers[2];
    const duration = answers[4];
    
    if (duration?.includes("長期") || duration?.includes("移民")) return "長期學籍銜接留學方案";
    if (parentAccompany?.includes("親子") || firstTime === "是的，第一次嘗試") return "親子微留學插班方案 (含學伴制度)";
    if (age?.includes("高中")) return "中學 NCEA 升學強化方案";
    return "短期校園遊學體驗營";
  };

  return (
    <div className="min-h-screen bg-brand-cream py-20 flex items-center">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="bg-white p-8 md:p-16 rounded-[40px] shadow-zen border border-brand-sage/10 relative overflow-hidden">
           <div className="absolute top-0 right-0 p-8 opacity-5">
              <HelpCircle size={120} className="text-brand-sage" />
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
                        className={`text-left p-6 rounded-2xl border transition-all flex justify-between items-center ${answers[step] === opt ? 'bg-brand-sage/5 border-brand-sage text-brand-ink shadow-sm' : 'bg-white border-brand-sage/10 hover:border-brand-sage/40 text-brand-sub'}`}
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

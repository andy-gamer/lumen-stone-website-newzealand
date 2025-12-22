
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, ArrowRight, RefreshCcw, HelpCircle, Sparkles, Loader2 } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

const Guide: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [aiRecommendation, setAiRecommendation] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState(false);

  const questions = [
    {
      id: 1,
      question: "孩子目前的年齡階段？",
      sub: "紐西蘭 5 歲即可入學，不同階段有不同的學制銜接。",
      options: ["幼兒園 / 國小低年級 (5-7歲)", "國小中年級 (8-10歲)", "國小高年級 / 國中 (11-14歲)", "高中階段 (15歲以上)"]
    },
    {
      id: 2,
      question: "孩子目前的英語溝通程度？",
      sub: "這將幫助我們媒合適合的學校氛圍與學伴。",
      options: ["零基礎 (需要密集 ESL 支持)", "基礎會話 (敢開口但詞彙有限)", "中級程度 (可應付日常交流)", "流利 (目標是學術升學)"]
    },
    {
      id: 3,
      question: "這次旅程家長是否會隨行陪同？",
      sub: "陪讀家長我們也會規劃成人英語或在地文化行程。",
      options: ["家長全程陪同 (親子方案)", "家長送機後返台", "孩子獨自前往 (寄宿家庭)", "目前尚未決定"]
    },
    {
      id: 4,
      question: "您最看重的成長收穫是？",
      sub: "每個家庭對「遊學」的定義不同。",
      options: ["純淨英語環境與口說能力", "多元文化體驗與國際視野", "獨立性培養與生活技能", "學術銜接與未來升學規劃"]
    },
    {
      id: 5,
      question: "預計在紐西蘭停留的時間？",
      sub: "停留時間決定了簽證類型與學習深度。",
      options: ["短期快充 (2-4週)", "精實體驗 (1-3個月)", "長期銜接 (半年至一年)", "移民 / 長期升學規劃"]
    }
  ];

  const handleSelect = (option: string) => { 
    setAnswers({ ...answers, [step]: option }); 
  };

  const nextStep = async () => { 
    if (step < questions.length - 1) {
      setStep(step + 1); 
    } else {
      setStep(questions.length);
      generateAiAdvice();
    }
  };

  const generateAiAdvice = async () => {
    setIsGenerating(true);
    try {
      // Fix: Follow strict guideline to initialize GoogleGenAI with { apiKey: process.env.API_KEY } directly
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `
        You are an expert study abroad consultant for New Zealand education at "Lumen Stone".
        Based on the following profile:
        - Age: ${answers[0]}
        - English Level: ${answers[1]}
        - Parent Accompany: ${answers[2]}
        - Goal: ${answers[3]}
        - Duration: ${answers[4]}
        
        Provide a professional, encouraging, and personalized 3-sentence recommendation in Traditional Chinese (Taiwan). 
        Make it sound like a warm advisor. Do not use generic placeholders. 
        Start with a friendly greeting and end with a call to action.
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
      });

      // Correctly access the .text property of GenerateContentResponse
      setAiRecommendation(response.text || "您的情況非常適合參加我們的紐西蘭微留學計畫。我們將為您安排專屬學伴，讓孩子在純淨環境中自然成長。建議您預約一對一諮詢以獲取詳細方案。");
    } catch (error) {
      console.error("AI Error:", error);
      setAiRecommendation("分析完成！根據您的回答，紐西蘭的啟發式教育環境將非常適合孩子的成長。建議您與我們的顧問聊聊，獲取更精準的校園媒合清單。");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-cream py-20 flex items-center">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="bg-white p-8 md:p-16 rounded-[40px] shadow-zen border border-brand-sage/10 relative overflow-hidden">
           {/* Decorative Background */}
           <div className="absolute top-0 right-0 p-8 opacity-5">
              <HelpCircle size={120} className="text-brand-sage" />
           </div>
           
           {step < questions.length ? (
             <div className="animate-fade-in relative z-10">
                <div className="mb-12">
                   <div className="flex items-center gap-4 mb-6">
                      <span className="text-brand-sage font-bold text-xs tracking-[0.3em] uppercase">Interactive Guide</span>
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
                    className="px-10 py-4 bg-brand-sage text-white rounded-full font-bold flex items-center gap-2 disabled:bg-brand-sage/20 disabled:text-brand-sage/40 shadow-premium group"
                   >
                      {step === questions.length - 1 ? '獲取 AI 顧問建議' : '下一步'} <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                   </button>
                </div>
             </div>
           ) : (
             <div className="text-center animate-fade-in relative z-10">
                {isGenerating ? (
                  <div className="py-20 flex flex-col items-center">
                    <Loader2 className="w-12 h-12 text-brand-sage animate-spin mb-6" />
                    <h3 className="text-2xl font-serif font-bold text-brand-ink mb-2">點石 AI 顧問正在分析中...</h3>
                    <p className="text-brand-sub font-light">正在為您量身打造紐西蘭成長藍圖</p>
                  </div>
                ) : (
                  <>
                    <div className="w-20 h-20 bg-brand-sage/10 text-brand-sage rounded-full flex items-center justify-center mx-auto mb-8">
                       <Sparkles size={40} />
                    </div>
                    <h2 className="text-3xl font-serif font-bold text-brand-ink mb-6">您的專屬遊學診斷</h2>
                    
                    <div className="bg-brand-cream/40 p-10 rounded-[30px] border border-brand-sage/10 mb-10 text-left relative">
                      <div className="absolute -top-4 -left-4 w-12 h-12 bg-brand-sage text-white rounded-2xl flex items-center justify-center shadow-lg transform -rotate-12">
                         <span className="font-serif text-2xl font-bold">“</span>
                      </div>
                      <p className="text-brand-ink text-lg leading-loose font-light italic">
                        {aiRecommendation}
                      </p>
                    </div>

                    <p className="text-brand-sub mb-10 max-w-lg mx-auto leading-loose font-light">
                      這只是成長的第一步。接下來，建議您預約一次 15 分鐘的顧問會談，我們會針對您的需求提供具體的預算與學校清單。
                    </p>
                    
                    <div className="flex flex-col md:flex-row gap-4 justify-center">
                       <button onClick={() => navigate('/booking')} className="px-12 py-5 bg-brand-sage text-white rounded-full font-bold shadow-gold hover:-translate-y-1 transition-all">立即預約一對一諮詢</button>
                       <button onClick={() => setStep(0)} className="px-8 py-5 text-brand-sub flex items-center gap-2 justify-center hover:text-brand-sage transition-colors"><RefreshCcw size={18}/> 重新測驗</button>
                    </div>
                  </>
                )}
             </div>
           )}
        </div>
      </div>
    </div>
  );
};
export default Guide;

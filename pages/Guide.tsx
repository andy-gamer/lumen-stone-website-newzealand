
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
      question: "您這次出國留/遊學的主要目的是？",
      sub: "不同的目的將導向不同的簽證與方案建議",
      icon: <BookOpen className="text-brand-accent" size={24} />,
      options: [
        { title: "拿正式學位 (長期升學)", desc: "預計入讀國外公立中小學或大學" },
        { title: "提升語言實力 (短期進修)", desc: "1-6個月密集英語或第二外語強化" },
        { title: "親子共同學習 (親子陪讀)", desc: "孩子進入校園，家長同步體驗異國生活" },
        { title: "技職/證照探索 (職涯發展)", desc: "包含烘焙、設計、運動等專業證照課程" }
      ]
    },
    {
      id: 2,
      question: "心中偏好哪個國家或地區？",
      sub: "如果您尚未決定，我們也能根據需求為您推薦",
      icon: <MapPin className="text-brand-accent" size={24} />,
      options: [
        { title: "紐西蘭/澳洲 (純淨自然)", desc: "南半球友善環境，學制與台灣接軌度高" },
        { title: "英國/愛爾蘭 (英倫經典)", desc: "深厚學術歷史與正統英式英語發源地" },
        { title: "美國/加拿大 (多元發展)", desc: "頂尖名校林立，最具競爭力的學術舞台" },
        { title: "菲律賓/日本 (亞洲鄰國)", desc: "高CP值密集訓練或獨特的文化體驗" }
      ]
    },
    {
      id: 3,
      question: "預計停留的時間長短？",
      sub: "時間長度將影響簽證申請的類別",
      icon: <Plane className="text-brand-accent" size={24} />,
      options: [
        { title: "2-4 週 (精華體驗)", desc: "適合寒暑假或職場空檔快速充電" },
        { title: "1-3 個月 (精實進修)", desc: "能獲得明顯的語言或文化適應提升" },
        { title: "超過半年 (深度生活)", desc: "完整的學期或學年，真正融入異國" },
        { title: "尚未決定", desc: "想根據預算與課程再做最後考量" }
      ]
    },
    {
      id: 4,
      question: "最在意的諮詢重點是？",
      sub: "我們會根據您的優先順序指派最專業的顧問",
      icon: <ClipboardList className="text-brand-accent" size={24} />,
      options: [
        { title: "校園環境與安全性", desc: "安全第一，舒適的硬體與在地照護" },
        { title: "住宿安排 (寄宿或宿舍)", desc: "高品質的在地生活體驗與文化對接" },
        { title: "簽證與文件代辦服務", desc: "繁雜手續全代勞，提高核發率" },
        { title: "CP值與預算控管", desc: "在有限預算內尋找最高品質的校園" }
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
    const region = answers[1];
    
    let title = "您的專屬全球學習藍圖";
    let desc = `根據您對「${mainGoal}」的規劃以及對「${region}」的偏向，點石顧問已準備好相關地區的最新名額資訊。`;
    let type = region?.includes("紐西蘭") ? "Study Abroad" : "Language School";

    return {
      title,
      desc,
      type,
      results: answers
    };
  };

  const rec = getRecommendation();

  return (
    <div className="min-h-screen bg-brand-cream font-sans pt-24">
      <section className="py-20 flex items-center">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="bg-white p-8 md:p-20 rounded-3xl shadow-heavy border border-brand-border relative overflow-hidden">
            
            <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                <Compass size={200} className="text-brand-accent animate-spin-slow" />
            </div>

            {step < questions.length ? (
              <div className="animate-fade-in relative z-10">
                  <div className="flex items-center gap-4 mb-12">
                        <div className="w-12 h-12 rounded-xl bg-brand-cream text-brand-accent flex items-center justify-center font-serif text-lg font-black shadow-sm border border-brand-border">
                          {step + 1}
                        </div>
                        <h3 className="text-brand-ink font-serif font-black text-base uppercase tracking-widest">Step {step + 1} / {questions.length}</h3>
                  </div>

                  <div className="mb-12">
                    <h2 className="text-2xl md:text-4xl font-serif font-black text-brand-ink mb-4 leading-tight">
                        {questions[step].question}
                    </h2>
                    <p className="text-brand-sub font-light text-base md:text-lg">
                        {questions[step].sub}
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {questions[step].options.map((opt, oIdx) => (
                        <button 
                          key={oIdx} 
                          onClick={() => handleSelect(opt.title)} 
                          className={`text-left p-6 rounded-2xl border transition-all duration-500 group flex flex-col justify-between h-full relative overflow-hidden ${answers[step] === opt.title ? 'bg-brand-primary border-brand-primary text-white shadow-xl' : 'bg-white border-brand-border hover:border-brand-accent/50 hover:shadow-md'}`}
                        >
                          <div className="relative z-10">
                              <span className={`text-base font-serif font-black block mb-2 ${answers[step] === opt.title ? 'text-brand-secondary' : 'text-brand-ink'}`}>
                                  {opt.title}
                              </span>
                              <p className={`text-xs font-light leading-relaxed ${answers[step] === opt.title ? 'text-white/70' : 'text-brand-sub'}`}>
                                  {opt.desc}
                              </p>
                          </div>
                        </button>
                    ))}
                  </div>
              </div>
            ) : (
              <div className="text-center animate-fade-in relative z-10 py-10">
                  <div className="inline-block p-8 rounded-full bg-brand-cream text-brand-accent mb-8 shadow-sm border border-brand-border">
                    <Sparkles size={40} className="animate-pulse" />
                  </div>
                  <h2 className="text-3xl md:text-5xl font-serif font-black text-brand-ink mb-8 tracking-tighter">問卷分析完成</h2>
                  <div className="max-w-xl mx-auto mb-12">
                    <div className="bg-brand-cream p-8 rounded-2xl border border-brand-border relative shadow-sm text-left">
                        <h3 className="text-xl font-serif font-black text-brand-ink mb-4">{rec.title}</h3>
                        <p className="text-brand-sub text-base leading-relaxed font-light italic">
                          {rec.desc}
                        </p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col md:flex-row gap-4 justify-center">
                    <button 
                      onClick={() => navigate('/booking', { state: { surveyResults: answers } })} 
                      className="px-10 py-4 bg-brand-primary text-white rounded-lg font-black shadow-heavy hover:bg-brand-ink transition-all flex items-center justify-center gap-4 group uppercase text-[10px] tracking-widest"
                    >
                        送出問卷並預約諮詢 <ArrowRight size={18} />
                    </button>
                    <button 
                      onClick={() => { setStep(0); setAnswers({}); }} 
                      className="px-10 py-4 bg-white border border-brand-border text-brand-ink rounded-lg font-black hover:bg-brand-cream transition-all uppercase text-[10px] tracking-widest"
                    >
                        重新測驗
                    </button>
                  </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
export default Guide;

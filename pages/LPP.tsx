
import React from 'react';
import { Link } from 'react-router-dom';
import { Video, Mic, FileText, Coffee, Check, Sparkles, ArrowRight } from 'lucide-react';

const LPP: React.FC = () => {
  return (
    <div className="bg-brand-cream min-h-screen">
      {/* LPP Hero */}
      <section className="bg-brand-sage text-white py-32 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/notebook.png')]"></div>
        <div className="container mx-auto px-6 relative z-10">
          <span className="bg-brand-accent text-white font-bold px-4 py-1 rounded-full uppercase text-[10px] tracking-[0.3em] mb-8 inline-block">Exclusive Service</span>
          <h1 className="text-4xl md:text-6xl font-serif font-bold mb-8">Language Prep Program</h1>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-loose font-light">
            別讓語言成為你看見世界的障礙。<br/>點石獨家「行前語言暖身」，讓你落地第一天就敢開口交流。
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-6 lg:px-12 py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-10">
            <div className="inline-block border-l-4 border-brand-accent pl-6">
                <span className="text-brand-accent font-bold tracking-widest text-xs uppercase block mb-2">Confidence Builder</span>
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand-ink">為什麼你需要 LPP？</h2>
            </div>
            <p className="text-brand-sub text-lg leading-loose font-light">
              許多學生剛到紐西蘭時，因為害怕犯錯而不敢開口，白白浪費了寶貴的前兩週適應期。
              LPP 是點石獨創的「心理與語言特訓」，透過 1 對 1 線上家教模擬真實場景，幫您打好強心針。
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { icon: <Mic size={24} />, title: "生存會話", desc: "點餐、購物、搭車，實戰模擬。" },
                { icon: <Video size={24} />, title: "海關模擬", desc: "應對提問，自信通關不緊張。" },
                { icon: <FileText size={24} />, title: "分級測驗", desc: "熟悉題型，進入理想程度班級。" },
                { icon: <Coffee size={24} />, title: "社交破冰", desc: "學會如何主動向 Kiwi 同學介紹自己。" }
              ].map((item, i) => (
                <div key={i} className="bg-white p-8 rounded-[32px] border border-brand-sage/5 shadow-zen group hover:border-brand-sage/20 transition-all">
                  <div className="text-brand-sage mb-4 group-hover:scale-110 transition-transform">{item.icon}</div>
                  <h4 className="font-bold text-brand-ink mb-2">{item.title}</h4>
                  <p className="text-xs text-brand-sub leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="rounded-[60px] overflow-hidden shadow-2xl border-8 border-white aspect-square">
               <img src="https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=1000&q=80" alt="Online Tutoring" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-8 -left-8 bg-brand-ink p-10 rounded-[40px] shadow-xl max-w-xs text-white">
              <p className="text-brand-accent font-bold text-3xl mb-2 flex items-center gap-2">
                <Sparkles size={24} /> 100%
              </p>
              <p className="text-white/60 text-sm leading-loose">學員一致好評：「上完 LPP，第一天走進教室就不怕跟同學聊天了！」</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing / Packages */}
      <section className="bg-white py-32 border-y border-brand-sage/5">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand-ink mb-16">課程方案</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              { title: "輕量體驗", hours: "4 小時", price: "NT$ 3,600", target: "適合已有基礎的提點" },
              { title: "標準特訓", hours: "10 小時", price: "NT$ 8,500", target: "最推薦！全方位口說強化", popular: true },
              { title: "密集衝刺", hours: "20 小時", price: "NT$ 16,000", target: "適合零基礎或需雅思考試者" }
            ].map((plan, i) => (
              <div key={i} className={`bg-brand-cream p-12 rounded-[50px] transition-all relative group flex flex-col justify-between ${plan.popular ? 'border-2 border-brand-accent shadow-2xl scale-105 z-10' : 'border border-brand-sage/10'}`}>
                {plan.popular && <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-brand-accent text-white px-6 py-1.5 rounded-full text-[10px] font-bold tracking-[0.3em] uppercase">Recommended</span>}
                <div>
                    <h3 className="text-2xl font-serif font-bold text-brand-ink mb-4">{plan.title}</h3>
                    <p className="text-brand-sub text-sm mb-10 font-light">{plan.target}</p>
                    <div className="text-4xl font-serif font-bold text-brand-ink mb-2">{plan.price}</div>
                    <div className="text-brand-sage font-bold text-xs tracking-widest uppercase mb-10">包含 {plan.hours} 線上家教</div>
                    <ul className="text-left space-y-4 mb-12 text-sm text-brand-sub">
                    <li className="flex items-center gap-3"><Check className="text-brand-accent" size={16} /> 專屬互動教材電子檔</li>
                    <li className="flex items-center gap-3"><Check className="text-brand-accent" size={16} /> 時間彈性，自由預約</li>
                    <li className="flex items-center gap-3"><Check className="text-brand-accent" size={16} /> 課程進度分析報告</li>
                    </ul>
                </div>
                <Link to="/booking" className={`block w-full py-4 rounded-full font-bold transition-all tracking-widest text-sm ${plan.popular ? 'bg-brand-accent text-white hover:bg-brand-ink shadow-lg' : 'bg-white text-brand-ink hover:bg-brand-sage hover:text-white border border-brand-sage/20'}`}>
                  立即預約評估
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default LPP;

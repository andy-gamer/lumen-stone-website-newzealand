import React from 'react';
import { Link } from 'react-router-dom';
import { Video, Mic, FileText, Coffee, Check } from 'lucide-react';

const LPP: React.FC = () => {
  return (
    <div>
      {/* LPP Hero */}
      <section className="bg-gradient-to-r from-indigo-900 to-brand-800 text-white py-24 text-center">
        <div className="container mx-auto px-4">
          <span className="bg-yellow-400 text-indigo-900 font-bold px-3 py-1 rounded-full uppercase text-sm tracking-wider mb-6 inline-block">獨家服務</span>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Language Prep Program</h1>
          <p className="text-xl md:text-2xl text-indigo-200 max-w-2xl mx-auto">
            別讓語言成為你看見世界的障礙。<br/>出國前的暖身，讓你落地第一天就敢開口。
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-slate-900">為什麼你需要 LPP？</h2>
            <p className="text-slate-600 text-lg leading-relaxed">
              許多學生到了國外，因為害怕犯錯而不敢開口，浪費了寶貴的前兩週適應期。
              LPP (Language Prep Program) 是 GlobalStep 獨創的行前語言特訓，
              透過 1 對 1 線上家教，模擬真實遊學情境，先幫你打好強心針。
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { icon: <Mic size={24} />, title: "生存會話", desc: "點餐、問路、買票，模擬真實場景。" },
                { icon: <Video size={24} />, title: "海關模擬", desc: "全英文應對海關提問，通關不緊張。" },
                { icon: <FileText size={24} />, title: "分級測驗準備", desc: "熟悉入學考題型，分到理想班級。" },
                { icon: <Coffee size={24} />, title: "社交破冰", desc: "學會自我介紹與開啟話題的技巧。" }
              ].map((item, i) => (
                <div key={i} className="bg-slate-50 p-6 rounded-xl border border-slate-100">
                  <div className="text-brand-600 mb-3">{item.icon}</div>
                  <h4 className="font-bold text-slate-900 mb-1">{item.title}</h4>
                  <p className="text-sm text-slate-500">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <img src="https://picsum.photos/seed/tutoring/800/800" alt="Online Tutoring" className="rounded-3xl shadow-2xl" />
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-lg max-w-xs">
              <p className="text-brand-600 font-bold text-xl mb-1">100%</p>
              <p className="text-slate-600 text-sm">學員回饋：「上完 LPP，第一天到學校就不怕跟外國同學講話了！」</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing / Packages */}
      <section className="bg-slate-50 py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-12">課程方案</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { title: "輕量體驗", hours: "4 小時", price: "NT$ 3,600", target: "適合只需基礎行前提點" },
              { title: "標準特訓", hours: "10 小時", price: "NT$ 8,500", target: "適合希望能順暢溝通者", popular: true },
              { title: "密集衝刺", hours: "20 小時", price: "NT$ 16,000", target: "適合零基礎或需雅思準備" }
            ].map((plan, i) => (
              <div key={i} className={`bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all relative ${plan.popular ? 'border-2 border-brand-500 transform scale-105 z-10' : 'border border-slate-200'}`}>
                {plan.popular && <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-brand-500 text-white px-4 py-1 rounded-full text-xs font-bold tracking-wide">MOST POPULAR</span>}
                <h3 className="text-xl font-bold text-slate-900 mb-2">{plan.title}</h3>
                <p className="text-slate-500 text-sm mb-6">{plan.target}</p>
                <div className="text-4xl font-bold text-brand-600 mb-2">{plan.price}</div>
                <div className="text-slate-400 font-medium mb-8">包含 {plan.hours} 1對1教學</div>
                <ul className="text-left space-y-3 mb-8 text-sm text-slate-600">
                  <li className="flex items-center gap-2"><Check className="text-green-500" size={16} /> 專屬教材電子檔</li>
                  <li className="flex items-center gap-2"><Check className="text-green-500" size={16} /> 時間彈性預約</li>
                  <li className="flex items-center gap-2"><Check className="text-green-500" size={16} /> 課後學習報告</li>
                </ul>
                <Link to="/booking" className={`block w-full py-3 rounded-full font-bold transition-colors ${plan.popular ? 'bg-brand-600 text-white hover:bg-brand-700' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
                  預約評估
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
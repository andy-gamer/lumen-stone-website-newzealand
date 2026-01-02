
import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, ArrowRight, Shield, Star, Award, GraduationCap, Sun, BookOpen, CheckCircle, Users, Globe, Book, Library, Backpack, Calendar, Clock, Info, ChevronDown } from 'lucide-react';

const NzAuZone: React.FC = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const GRADE_MAP = [
    { nz: "Year 1", age: "5 歲", tw: "幼兒園大班", stage: "Primary School (小學)" },
    { nz: "Year 2", age: "6 歲", tw: "國小一年級", stage: "Primary School (小學)" },
    { nz: "Year 3", age: "7 歲", tw: "國小二年級", stage: "Primary School (小學)" },
    { nz: "Year 4", age: "8 歲", tw: "國小三年級", stage: "Primary School (小學)" },
    { nz: "Year 5", age: "9 歲", tw: "國小四年級", stage: "Primary School (小學)" },
    { nz: "Year 6", age: "10 歲", tw: "國小五年級", stage: "Primary School (小學)" },
    { nz: "Year 7", age: "11 歲", tw: "國小六年級", stage: "Intermediate (國中預備/高小)" },
    { nz: "Year 8", age: "12 歲", tw: "國中一年級", stage: "Intermediate (國中預備/高小)" },
    { nz: "Year 9", age: "13 歲", tw: "國中二年級", stage: "High School (中學)" },
    { nz: "Year 10", age: "14 歲", tw: "國中三年級", stage: "High School (中學)" },
    { nz: "Year 11", age: "15 歲", tw: "高中一年級", stage: "NCEA Level 1" },
    { nz: "Year 12", age: "16 歲", tw: "高中二年級", stage: "NCEA Level 2" },
    { nz: "Year 13", age: "17 歲", tw: "高中三年級", stage: "NCEA Level 3" },
  ];

  return (
    <div className="bg-brand-cream min-h-screen font-sans">
      {/* Hero */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80" className="w-full h-full object-cover" alt="NZ School" />
          <div className="absolute inset-0 bg-brand-ink/70 backdrop-blur-[2px]"></div>
        </div>
        <div className="relative z-10 text-center text-white px-6">
           <span className="text-brand-accent tracking-[0.4em] uppercase text-xs font-bold mb-4 block">Knowledge Base</span>
           <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6">紐西蘭教育百科</h1>
           <p className="text-xl font-light opacity-90 max-w-2xl mx-auto">從 5 歲到 18 歲的完整學習路徑解析，為您的孩子繪製清晰的未來地圖。</p>
        </div>
      </section>

      {/* Anchor Nav */}
      <section className="sticky top-20 md:top-24 z-40 bg-white/90 backdrop-blur border-b border-brand-sage/10">
         <div className="container mx-auto px-6 flex justify-center gap-12">
            <button onClick={() => scrollToSection('system')} className="py-6 font-bold text-brand-sage border-b-2 border-brand-sage transition-all">學制解析</button>
            <button onClick={() => scrollToSection('ncea')} className="py-6 font-bold text-brand-sub hover:text-brand-sage transition-all">NCEA系統</button>
         </div>
      </section>

      <div className="bg-brand-cream py-24">
          <div id="system" className="scroll-mt-40 container mx-auto px-6 lg:px-12 mb-32">
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand-ink mb-6">紐西蘭 vs 台灣 學級對照表</h2>
                    <p className="text-brand-sub font-light">紐西蘭學制採 13 年制，5 歲當天即可入學就讀 Year 1，這與台灣學制有顯著差異。</p>
                </div>
                <div className="max-w-4xl mx-auto bg-white rounded-[40px] shadow-zen border border-brand-sage/5 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-brand-sage text-white">
                                    <th className="p-6 font-bold tracking-widest text-sm uppercase">紐西蘭年級</th>
                                    <th className="p-6 font-bold tracking-widest text-sm uppercase">入學年齡</th>
                                    <th className="p-6 font-bold tracking-widest text-sm uppercase">台灣對照</th>
                                    <th className="p-6 font-bold tracking-widest text-sm uppercase">階段分期</th>
                                </tr>
                            </thead>
                            <tbody>
                                {GRADE_MAP.map((row, idx) => (
                                    <tr key={idx} className="border-b border-brand-sage/5 hover:bg-brand-cream transition-colors">
                                        <td className="p-6 font-bold text-brand-ink">{row.nz}</td>
                                        <td className="p-6 text-brand-sub text-sm">{row.age}</td>
                                        <td className="p-6 text-brand-sub text-sm">{row.tw}</td>
                                        <td className="p-6">
                                            <span className="text-[10px] font-bold text-brand-accent border border-brand-accent/30 px-2 py-1 rounded uppercase tracking-widest">
                                                {row.stage}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
          </div>

          <div id="ncea" className="scroll-mt-40 container mx-auto px-6 lg:px-12">
              <div className="max-w-5xl mx-auto bg-brand-ink text-brand-cream p-12 md:p-20 rounded-[60px] shadow-2xl relative overflow-hidden group">
                  <Award className="absolute -top-10 -right-10 w-64 h-64 text-white/5 group-hover:scale-110 transition-transform duration-1000" />
                  <div className="relative z-10">
                      <span className="text-brand-accent font-bold tracking-[0.4em] uppercase text-xs mb-6 block">National Certificate</span>
                      <h2 className="text-3xl md:text-4xl font-serif font-bold mb-8">認識 NCEA 評量證書</h2>
                      <p className="text-brand-cream/60 leading-loose mb-12 max-w-2xl font-light text-lg">
                          NCEA 是紐西蘭中學生的主要學歷認證。它不受「一試定生死」的侷限，而是透過結合平時作業、實作評量與年終測試，全方位評估學生的學習潛力與表現。
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                          {[
                            { level: "Level 1 (高一)", desc: "建立基礎學術知識與探索個人興趣範圍。" },
                            { level: "Level 2 (高二)", desc: "選科趨向專業化，決定未來升學的方向。" },
                            { level: "Level 3 (高三)", desc: "取得大學入學許可 (UE) 的關鍵年度。" }
                          ].map((item, i) => (
                            <div key={i} className="bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-sm hover:bg-white/10 transition-all">
                                <h4 className="font-bold text-brand-accent mb-3">{item.level}</h4>
                                <p className="text-xs text-brand-cream/50 leading-loose">{item.desc}</p>
                            </div>
                          ))}
                      </div>
                  </div>
              </div>
          </div>
      </div>
    </div>
  );
};
export default NzAuZone;

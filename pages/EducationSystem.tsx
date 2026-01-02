
import React from 'react';
import { BookOpen, Award } from 'lucide-react';

const EducationSystem: React.FC = () => {
  const GRADE_MAP = [
    { nz: "Year 1", age: "5 歲", tw: "幼兒園大班", stage: "Primary School (小學)" },
    { nz: "Year 2", age: "6 歲", tw: "國小一年級", stage: "Primary School (小學)" },
    { nz: "Year 3", age: "7 歲", tw: "國小二年級", stage: "Primary School (小學)" },
    { nz: "Year 4", age: "8 歲", tw: "國小三年級", stage: "Primary School (小學)" },
    { nz: "Year 5", age: "9 歲", tw: "國小四年級", stage: "Primary School (小學)" },
    { nz: "Year 6", age: "10 歲", tw: "國小五年級", stage: "Primary School (小學)" },
    { nz: "Year 7", age: "11 歲", tw: "國小六年級", stage: "Intermediate (國中預備)" },
    { nz: "Year 8", age: "12 歲", tw: "國中一年級", stage: "Intermediate (國中預備)" },
    { nz: "Year 9", age: "13 歲", tw: "國中二年級", stage: "High School (中學)" },
    { nz: "Year 10", age: "14 歲", tw: "國中三年級", stage: "High School (中學)" },
    { nz: "Year 11", age: "15 歲", tw: "高中一年級", stage: "NCEA Level 1" },
    { nz: "Year 12", age: "16 歲", tw: "高中二年級", stage: "NCEA Level 2" },
    { nz: "Year 13", age: "17 歲", tw: "高中三年級", stage: "NCEA Level 3" },
  ];

  return (
    <div className="bg-brand-cream min-h-screen pt-44">
      <section className="bg-white py-32 border-t border-brand-border">
        <div className="container mx-auto px-6 lg:px-12">
          
          <div className="max-w-4xl mx-auto text-center mb-24">
              <span className="text-brand-accent font-bold tracking-[0.5em] uppercase text-[10px] block mb-4">Educational System</span>
              <h2 className="text-5xl font-serif font-black text-brand-ink mb-6">紐西蘭學制百科</h2>
              <p className="text-brand-sub text-lg font-light leading-relaxed">
                了解紐西蘭與台灣的學級對照，從 5 歲入學到 NCEA 評量證書，為孩子的求學地圖打下穩固基礎。
              </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
            
            <div className="bg-brand-cream rounded-3xl p-8 border border-brand-border shadow-zen overflow-hidden">
                <h3 className="text-xl font-serif font-black text-brand-ink mb-8 flex items-center gap-3">
                  <BookOpen size={20} className="text-brand-accent" /> 年級對照參考表
                </h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-brand-border text-brand-accent uppercase tracking-widest text-[10px] font-black">
                                <th className="py-4 px-2">紐西蘭年級</th>
                                <th className="py-4 px-2">入學年齡</th>
                                <th className="py-4 px-2">台灣對照</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm">
                            {GRADE_MAP.map((row, idx) => (
                                <tr key={idx} className="border-b border-brand-border/50 hover:bg-white transition-colors">
                                    <td className="py-4 px-2 font-bold text-brand-ink">{row.nz}</td>
                                    <td className="py-4 px-2 text-brand-sub">{row.age}</td>
                                    <td className="py-4 px-2 text-brand-sub italic opacity-70">{row.tw}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="space-y-12">
               <div className="bg-brand-ink text-white p-12 rounded-3xl shadow-heavy relative overflow-hidden group">
                  <Award className="absolute -top-10 -right-10 w-48 h-48 text-white/5 group-hover:scale-110 transition-transform duration-1000" />
                  <div className="relative z-10">
                    <h3 className="text-2xl font-serif font-black mb-6 text-brand-secondary">認識 NCEA 評量</h3>
                    <p className="text-white/60 leading-loose font-light mb-8">
                      NCEA 是紐西蘭中學生的主要學歷認證。它不受「一試定生死」的侷限，而是透過結合平時作業、實作評量與年終測試，全方位評估學習表現。
                    </p>
                    <div className="space-y-4">
                       <div className="flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/10">
                          <span className="w-8 h-8 rounded-full bg-brand-accent text-white flex items-center justify-center font-bold text-xs">1</span>
                          <span className="text-sm font-bold">Level 1 (高一)：建立基礎學術知識</span>
                       </div>
                       <div className="flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/10">
                          <span className="w-8 h-8 rounded-full bg-brand-accent text-white flex items-center justify-center font-bold text-xs">2</span>
                          <span className="text-sm font-bold">Level 2 (高二)：選科專業化，決定方向</span>
                       </div>
                       <div className="flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/10">
                          <span className="w-8 h-8 rounded-full bg-brand-accent text-white flex items-center justify-center font-bold text-xs">3</span>
                          <span className="text-sm font-bold">Level 3 (高三)：大學入學關鍵指標</span>
                       </div>
                    </div>
                  </div>
               </div>

               <div className="bg-brand-cream border border-brand-accent/10 p-10 rounded-3xl border-dashed">
                  <h4 className="text-brand-ink font-serif font-black text-xl mb-4">為什麼選紐西蘭？</h4>
                  <p className="text-brand-sub text-sm leading-loose font-light">
                    紐西蘭教育體系在全球競爭力中名列前茅，強調「啟發」而非「死記」。Year 1-6 的微留學插班，能讓孩子在全英文環境中自然成長，培養批判性思考。
                  </p>
               </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};
export default EducationSystem;

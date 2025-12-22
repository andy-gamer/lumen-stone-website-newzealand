
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
    <div className="bg-white min-h-screen font-sans">
      {/* Hero */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80" className="w-full h-full object-cover" alt="NZ School" />
          <div className="absolute inset-0 bg-emerald-950/80"></div>
        </div>
        <div className="relative z-10 text-center text-white">
           <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6">紐西蘭教育百科</h1>
           <p className="text-xl font-light opacity-90">從 5 歲到 18 歲的完整學習路徑解析</p>
        </div>
      </section>

      {/* Anchor Nav */}
      <section className="sticky top-20 md:top-24 z-40 bg-white border-b border-stone-200">
         <div className="container mx-auto px-6 flex justify-center gap-12">
            <button onClick={() => scrollToSection('system')} className="py-5 font-bold text-emerald-900 border-b-2 border-emerald-600">學制解析</button>
            <button onClick={() => scrollToSection('ncea')} className="py-5 font-bold text-stone-400 hover:text-emerald-700">NCEA系統</button>
         </div>
      </section>

      <div className="bg-stone-50 py-20">
          <div id="system" className="scroll-mt-40 container mx-auto px-6 lg:px-12 mb-24">
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <h2 className="text-3xl font-serif font-bold text-emerald-950 mb-6">紐西蘭 vs 台灣 學級對照表</h2>
                    <p className="text-stone-600">紐西蘭學制採 13 年制，5 歲當天即可入學就讀 Year 1。</p>
                </div>
                <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-sm border border-emerald-100 overflow-hidden">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-emerald-900 text-white">
                                <th className="p-4 font-bold">紐西蘭年級</th>
                                <th className="p-4 font-bold">入學年齡</th>
                                <th className="p-4 font-bold">台灣對照</th>
                                <th className="p-4 font-bold">階段</th>
                            </tr>
                        </thead>
                        <tbody>
                            {GRADE_MAP.map((row, idx) => (
                                <tr key={idx} className="border-b border-stone-100 hover:bg-emerald-50">
                                    <td className="p-4 font-bold text-emerald-900">{row.nz}</td>
                                    <td className="p-4 text-stone-600">{row.age}</td>
                                    <td className="p-4 text-stone-600">{row.tw}</td>
                                    <td className="p-4 text-xs font-bold text-emerald-600 uppercase">{row.stage}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
          </div>

          <div id="ncea" className="scroll-mt-40 container mx-auto px-6 lg:px-12">
              <div className="max-w-4xl mx-auto bg-emerald-900 text-white p-12 rounded-[50px] shadow-2xl relative overflow-hidden">
                  <Award className="absolute -top-10 -right-10 w-48 h-48 text-white/10" />
                  <h2 className="text-3xl font-serif font-bold mb-8">認識 NCEA 證書</h2>
                  <p className="text-emerald-100 leading-loose mb-8">
                      NCEA (National Certificate of Educational Achievement) 是紐西蘭中學生的主要學歷。它不受考試一試定生死的侷限，而是結合平時作業、實作評量與年終測試。
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="bg-white/10 p-6 rounded-2xl">
                          <h4 className="font-bold text-emerald-400 mb-2">Level 1 (高一)</h4>
                          <p className="text-xs">建立基礎知識與興趣</p>
                      </div>
                      <div className="bg-white/10 p-6 rounded-2xl">
                          <h4 className="font-bold text-emerald-400 mb-2">Level 2 (高二)</h4>
                          <p className="text-xs">選科專業化的開始</p>
                      </div>
                      <div className="bg-white/10 p-6 rounded-2xl">
                          <h4 className="font-bold text-emerald-400 mb-2">Level 3 (高三)</h4>
                          <p className="text-xs">取得 University Entrance</p>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    </div>
  );
};
export default NzAuZone;

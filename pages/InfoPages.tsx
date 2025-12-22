
import React, { useState, useEffect } from 'react';
import { Instagram, Facebook, MapPin, Mail, Phone, ChevronDown, ChevronUp, ArrowRight, Quote } from 'lucide-react';
import { DataService } from '../services/db';
import { TeamMember, Testimonial, FAQItem } from '../types';

/* --- Components --- */

const PageHeader: React.FC<{ title: string; subtitle: string }> = ({ title, subtitle }) => (
  <div className="bg-lumen-base pt-20 pb-16 text-center border-b border-lumen-dark/5">
     <span className="text-lumen-accent text-xs tracking-[0.3em] uppercase block mb-4">{subtitle}</span>
     <h1 className="text-4xl md:text-5xl font-serif text-lumen-dark font-bold">{title}</h1>
     <div className="w-16 h-[1px] bg-lumen-dark mx-auto mt-8"></div>
  </div>
);

/* --- About Page --- */
export const About: React.FC = () => (
  <div className="bg-lumen-base min-h-screen">
    <PageHeader title="關於我們" subtitle="About GlobalStep" />
    
    <div className="container mx-auto px-6 lg:px-12 py-20">
       <div className="flex flex-col lg:flex-row gap-20 items-center">
          {/* Vertical Text Section */}
          <div className="lg:w-1/2 relative h-[600px] w-full hidden lg:block">
             <div className="absolute top-0 left-0 w-full h-full bg-stone-200 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1598342434319-21df84347710?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80" className="w-full h-full object-cover opacity-80" alt="Zen Interior" />
             </div>
             <div className="absolute top-12 left-12 w-24 bg-white p-6 shadow-xl writing-vertical h-[400px] flex items-center justify-center border border-lumen-dark/10">
                 <p className="text-2xl font-serif tracking-[0.3em] leading-loose text-lumen-dark">
                   專注教育<br/>打磨心靈
                 </p>
             </div>
          </div>

          <div className="lg:w-1/2 space-y-10">
             <h2 className="text-3xl font-serif text-lumen-dark font-bold leading-relaxed">
               不只是代辦，<br/>
               更是您的人生引路人。
             </h2>
             <div className="text-lumen-sub font-light text-lg space-y-6 leading-loose text-justify">
                <p>
                  GlobalStep Education 成立於 2015 年，我們的創始團隊由一群熱愛旅行與教育的資深英語教師組成。
                  我們深知，遊學不只是一次旅行，更是一次改變視野的機會。
                </p>
                <p>
                  不同於傳統代辦僅著重於行政手續，我們更重視「教育」的本質。
                  透過獨家的 LPP 英語預備計畫，我們確保每一位學員在出發前都做好了語言與心理的準備。
                </p>
             </div>
             
             <div className="bg-white p-8 border-l-4 border-lumen-accent shadow-sm mt-8">
               <h3 className="text-xl font-serif font-bold text-lumen-dark mb-2">點石書屋</h3>
               <p className="text-lumen-sub font-light">
                 我們在台北辦公室設有小型圖書館「點石書屋」，收藏了上千本原文童書與旅遊文學。
                 歡迎家長與孩子隨時來訪，在書香中規劃未來的旅程。
               </p>
             </div>
          </div>
       </div>
    </div>
  </div>
);

/* --- Team Page --- */
export const Team: React.FC = () => {
    const [members, setMembers] = useState<TeamMember[]>([]);
    
    useEffect(() => {
        DataService.getTeamMembers().then(setMembers);
    }, []);

    return (
      <div className="bg-stone-50 min-h-screen">
        <PageHeader title="顧問團隊" subtitle="Our Professionals" />
        
        <div className="container mx-auto px-6 lg:px-12 py-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {members.map((member, idx) => (
              <div key={member.id} className={`bg-white group overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 ${idx === 1 ? 'md:-mt-10' : ''}`}>
                 <div className="h-[400px] overflow-hidden relative">
                    <img src={member.image} alt={member.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter grayscale-[20%] group-hover:grayscale-0" />
                    <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/60 to-transparent p-6 pt-20 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <p className="text-sm font-light">{member.specialty}</p>
                    </div>
                 </div>
                 <div className="p-8 text-center relative bg-white">
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-lumen-accent text-white flex items-center justify-center font-serif text-xl font-bold rounded-full shadow-lg border-4 border-white">
                       {member.name.charAt(0)}
                    </div>
                    <h3 className="text-2xl font-serif font-bold text-lumen-dark mt-4 mb-2">{member.name}</h3>
                    <p className="text-lumen-accent text-xs tracking-widest uppercase font-bold mb-4">{member.role}</p>
                    
                    <div className="flex flex-wrap gap-2 justify-center mb-6">
                      {member.languages.map(lang => (
                        <span key={lang} className="text-[10px] border border-stone-200 text-stone-500 px-2 py-1 uppercase">{lang}</span>
                      ))}
                    </div>
                    <p className="text-sm text-stone-500 font-light italic">"{member.experience}"</p>
                 </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
};

/* --- Success Stories Page --- */
export const SuccessStories: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
      DataService.getTestimonials().then(setTestimonials);
  }, []);

  return (
      <div className="bg-lumen-base min-h-screen">
        <PageHeader title="學員見證" subtitle="Success Stories" />
        
        <div className="container mx-auto px-6 lg:px-12 py-20">
           <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
              {testimonials.map(t => (
                <div key={t.id} className="break-inside-avoid bg-white p-8 rounded-none shadow-sm border-t-4 border-lumen-accent hover:-translate-y-2 transition-transform duration-500">
                   <Quote className="text-stone-200 mb-6" size={40} />
                   <p className="text-lumen-dark/80 font-serif leading-loose mb-8 text-justify">
                      {t.content}
                   </p>
                   <div className="flex items-center gap-4">
                      <img src={t.image} alt={t.name} className="w-12 h-12 rounded-full object-cover grayscale" />
                      <div>
                         <h4 className="font-bold text-lumen-dark font-serif">{t.name}</h4>
                         <p className="text-xs text-lumen-accent uppercase tracking-wider">{t.ageCountry}</p>
                      </div>
                   </div>
                </div>
              ))}
              {/* Mock More Stories */}
              <div className="break-inside-avoid bg-stone-900 text-white p-8 rounded-none shadow-xl hover:-translate-y-2 transition-transform duration-500">
                   <Quote className="text-lumen-accent/50 mb-6" size={40} />
                   <p className="font-serif leading-loose mb-8 text-justify opacity-90">
                      "LPP 課程真的救了我！原本很怕開口，但經過顧問一對一特訓後，去到宿霧第一天就能跟老師聊天。這次遊學讓我多益進步了200分，非常感謝 GlobalStep!"
                   </p>
                   <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-lumen-accent flex items-center justify-center font-bold text-lumen-dark">J</div>
                      <div>
                         <h4 className="font-bold font-serif">Jason Lee</h4>
                         <p className="text-xs text-lumen-accent uppercase tracking-wider">菲律賓宿霧 / 22歲</p>
                      </div>
                   </div>
                </div>
           </div>
        </div>
      </div>
  );
};

/* --- FAQ Page --- */
export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [faqs, setFaqs] = useState<FAQItem[]>([]);

  useEffect(() => {
     DataService.getFAQs().then(setFaqs);
  }, []);

  return (
    <div className="bg-stone-50 min-h-screen">
      <PageHeader title="常見問題" subtitle="Questions & Answers" />
      
      <div className="container mx-auto px-6 lg:px-12 py-20 max-w-3xl">
         <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className={`bg-white border ${openIndex === i ? 'border-lumen-accent' : 'border-stone-200'} transition-all duration-300`}>
                 <button 
                   onClick={() => setOpenIndex(openIndex === i ? null : i)}
                   className="w-full flex items-center justify-between p-6 text-left"
                 >
                    <div className="flex items-center gap-4">
                       <span className={`text-xs font-bold tracking-widest px-2 py-1 ${openIndex === i ? 'bg-lumen-accent text-white' : 'bg-stone-100 text-stone-500'}`}>
                          {faq.category}
                       </span>
                       <span className={`font-serif font-bold text-lg ${openIndex === i ? 'text-lumen-dark' : 'text-stone-600'}`}>
                          {faq.question}
                       </span>
                    </div>
                    {openIndex === i ? <ChevronUp size={20} className="text-lumen-accent"/> : <ChevronDown size={20} className="text-stone-400"/>}
                 </button>
                 <div className={`overflow-hidden transition-all duration-300 ${openIndex === i ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <div className="p-6 pt-0 text-lumen-sub leading-loose font-light border-t border-stone-100 mx-6">
                       {faq.answer}
                    </div>
                 </div>
              </div>
            ))}
         </div>
         
         <div className="text-center mt-16">
            <p className="text-stone-500 mb-4">找不到您的問題嗎？</p>
            <a href="/contact" className="inline-flex items-center gap-2 text-lumen-dark border-b border-lumen-dark pb-1 hover:text-lumen-accent hover:border-lumen-accent transition-all">
               直接聯繫我們 <ArrowRight size={16} />
            </a>
         </div>
      </div>
    </div>
  );
};

/* --- Media Page --- */
export const Media: React.FC = () => (
  <div className="bg-lumen-base min-h-screen">
     <PageHeader title="社群動態" subtitle="Social Media" />
     <div className="container mx-auto px-6 lg:px-12 py-20 text-center">
        <p className="text-lumen-sub mb-12 max-w-xl mx-auto font-light leading-relaxed">
           追蹤我們的 Instagram 與 Facebook，獲取最新的海外生活分享、學員實況與獨家優惠活動。
        </p>
        <div className="flex justify-center gap-6 mb-16">
          <a href="#" className="flex items-center gap-3 bg-stone-900 text-white px-8 py-4 rounded-full font-bold hover:bg-lumen-accent transition-colors tracking-widest text-sm">
            <Instagram size={18} /> INSTAGRAM
          </a>
          <a href="#" className="flex items-center gap-3 bg-white border border-stone-300 text-stone-900 px-8 py-4 rounded-full font-bold hover:border-lumen-accent hover:text-lumen-accent transition-colors tracking-widest text-sm">
            <Facebook size={18} /> FACEBOOK
          </a>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1,2,3,4].map(i => (
            <div key={i} className="group relative overflow-hidden aspect-square cursor-pointer">
               <img src={`https://picsum.photos/seed/social${i}/600/600`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Social Media" />
               <div className="absolute inset-0 bg-lumen-dark/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center text-white">
                  <Instagram size={32} />
               </div>
            </div>
          ))}
        </div>
     </div>
  </div>
);

/* --- Contact Page --- */
export const Contact: React.FC = () => (
  <div className="bg-lumen-base min-h-screen">
     <PageHeader title="聯絡我們" subtitle="Get in Touch" />
     
     <div className="container mx-auto px-6 lg:px-12 py-20">
       <div className="max-w-5xl mx-auto bg-white shadow-2xl overflow-hidden flex flex-col md:flex-row">
         
         {/* Info Side */}
         <div className="bg-stone-900 text-lumen-base p-12 md:w-2/5 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
            
            <div className="relative z-10">
               <h3 className="text-2xl font-serif font-bold mb-8 text-lumen-accent">聯絡資訊</h3>
               <div className="space-y-8 font-light">
                  <div className="flex items-start gap-4">
                     <MapPin className="text-lumen-accent shrink-0 mt-1" />
                     <div>
                        <p className="font-bold mb-1">台北總部</p>
                        <p className="text-white/60 text-sm leading-relaxed">台北市信義區信義路五段7號<br/>(台北101對面)</p>
                     </div>
                  </div>
                  <div className="flex items-center gap-4">
                     <Phone className="text-lumen-accent shrink-0" />
                     <p className="tracking-wider">02-2345-6789</p>
                  </div>
                  <div className="flex items-center gap-4">
                     <Mail className="text-lumen-accent shrink-0" />
                     <p className="tracking-wider">info@lumenstone.edu</p>
                  </div>
               </div>
            </div>

            <div className="relative z-10 mt-12">
               <p className="text-xs text-white/40 uppercase tracking-widest">Office Hours</p>
               <p className="text-sm mt-2">Mon - Fri: 10:00 - 19:00</p>
               <p className="text-sm">Sat: 13:00 - 18:00 (預約制)</p>
            </div>
         </div>

         {/* Form Side */}
         <div className="p-12 md:w-3/5">
           <h3 className="text-2xl font-serif font-bold text-lumen-dark mb-6">留言給我們</h3>
           <form 
              className="space-y-6"
              onSubmit={async (e) => {
                  e.preventDefault();
                  // In a real app, collect form data here
                  await DataService.submitContact({ timestamp: new Date() });
                  alert("訊息已發送");
              }}
           >
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                   <label className="text-xs font-bold text-stone-500 uppercase tracking-widest">Name</label>
                   <input type="text" className="w-full border-b border-stone-300 py-2 focus:border-lumen-accent outline-none bg-transparent transition-colors" placeholder="您的姓名" />
                </div>
                <div className="space-y-2">
                   <label className="text-xs font-bold text-stone-500 uppercase tracking-widest">Phone</label>
                   <input type="tel" className="w-full border-b border-stone-300 py-2 focus:border-lumen-accent outline-none bg-transparent transition-colors" placeholder="聯絡電話" />
                </div>
             </div>
             <div className="space-y-2">
                <label className="text-xs font-bold text-stone-500 uppercase tracking-widest">Email</label>
                <input type="email" className="w-full border-b border-stone-300 py-2 focus:border-lumen-accent outline-none bg-transparent transition-colors" placeholder="電子信箱" />
             </div>
             <div className="space-y-2">
                <label className="text-xs font-bold text-stone-500 uppercase tracking-widest">Message</label>
                <textarea rows={4} className="w-full border-b border-stone-300 py-2 focus:border-lumen-accent outline-none bg-transparent transition-colors resize-none" placeholder="想詢問的內容..."></textarea>
             </div>
             <button type="submit" className="bg-lumen-dark text-white px-10 py-4 font-bold hover:bg-lumen-accent transition-colors w-full md:w-auto tracking-widest text-sm mt-4">
               發送訊息
             </button>
           </form>
         </div>
       </div>
     </div>
  </div>
);

/* --- Legal Page --- */
export const Legal: React.FC = () => (
  <div className="bg-lumen-base min-h-screen">
     <PageHeader title="條款與聲明" subtitle="Legal" />
     <div className="container mx-auto px-6 lg:px-12 py-20 max-w-4xl text-lumen-sub font-light leading-loose text-justify space-y-12">
        <section>
           <h2 className="text-xl font-bold text-lumen-dark mb-4 font-serif">隱私權政策</h2>
           <p>GlobalStep (以下簡稱本公司) 非常重視您的隱私權。我們僅會蒐集為提供遊學諮詢服務所必須之個人資料（包括但不限於姓名、電話、電子郵件等），絕不會將您的資料販售給第三方。所有的資料傳輸皆經過加密處理，並存儲於安全的伺服器中。</p>
        </section>
        <div className="h-[1px] bg-stone-200 w-full"></div>
        <section>
           <h2 className="text-xl font-bold text-lumen-dark mb-4 font-serif">服務條款</h2>
           <p>使用本網站即代表您同意本公司的服務條款。網站上的所有行程價格僅供參考，實際費用可能因匯率、季節及學校政策而有所變動，最終價格以正式簽約文件為準。本公司保留隨時修改網站內容之權利，恕不另行通知。</p>
        </section>
     </div>
  </div>
);

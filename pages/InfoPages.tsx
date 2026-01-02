
import React, { useState, useEffect } from 'react';
import { Instagram, Facebook, MapPin, Mail, Phone, ChevronDown, ChevronUp, ArrowRight, Quote, Send, Star } from 'lucide-react';
import { DataService } from '../services/db';
import { TeamMember, Testimonial, FAQItem } from '../types';

/* --- Components --- */

const PageHeader: React.FC<{ title: string; subtitle: string }> = ({ title, subtitle }) => (
  <div className="bg-brand-cream pt-20 pb-16 text-center border-b border-brand-border">
     <span className="text-brand-primary text-xs tracking-[0.4em] uppercase block mb-4 font-black">{subtitle}</span>
     <h1 className="text-4xl md:text-6xl font-serif text-brand-ink font-black tracking-tighter">{title}</h1>
     <div className="w-16 h-[2px] bg-brand-primary mx-auto mt-8"></div>
  </div>
);

/* --- About Page --- */
export const About: React.FC = () => (
  <div className="bg-brand-cream min-h-screen">
    <PageHeader title="關於我們" subtitle="About Lumen Stone" />
    
    <div className="container mx-auto px-6 lg:px-12 py-24">
       <div className="flex flex-col lg:flex-row gap-20 items-center">
          <div className="lg:w-1/2 relative h-[500px] lg:h-[600px] w-full">
             <div className="absolute inset-0 bg-stone-200 overflow-hidden rounded-3xl shadow-heavy">
                <img src="https://images.unsplash.com/photo-1598342434319-21df84347710?w=1200&q=80" className="w-full h-full object-cover opacity-90 grayscale-[20%]" alt="Zen Interior" />
             </div>
             <div className="absolute top-12 left-12 w-24 bg-white p-6 shadow-xl writing-vertical h-[350px] flex items-center justify-center border border-brand-border hidden lg:flex">
                 <p className="text-2xl font-serif tracking-[0.3em] leading-loose text-brand-ink font-black">
                   專注教育<br/>打磨心靈
                 </p>
             </div>
          </div>

          <div className="lg:w-1/2 space-y-12">
             <h2 className="text-3xl md:text-5xl font-serif text-brand-ink font-black leading-tight tracking-tighter">
               不只是代辦，<br/>
               更是您的人生引路人。
             </h2>
             <div className="text-brand-sub font-light text-lg md:text-xl space-y-8 leading-loose text-justify">
                <p>
                  Lumen Stone 點石遊學成立於 2015 年，我們的創始團隊由一群熱愛旅行與教育的資深英語教師組成。
                  我們深知，遊學不只是一次旅行，更是一次改變視野的機會。
                </p>
                <p>
                  不同於傳統代辦僅著重於行政手續，我們更重視「教育」的本質。
                  透過點石獨家精選的紐西蘭校園，我們確保每一位學員都能在最純淨的環境中獲得啟發。
                </p>
             </div>
             
             <div className="bg-white p-10 border-l-8 border-brand-primary shadow-zen rounded-r-3xl">
               <h3 className="text-2xl font-serif font-black text-brand-ink mb-4">點石書屋</h3>
               <p className="text-brand-sub font-light text-lg">
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
      <div className="bg-white min-h-screen">
        <PageHeader title="顧問團隊" subtitle="Our Professionals" />
        
        <div className="container mx-auto px-6 lg:px-12 py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {members.map((member, idx) => (
              <div key={member.id} className="bg-brand-cream group overflow-hidden shadow-zen hover:shadow-heavy transition-all duration-500 rounded-3xl border border-brand-border">
                 <div className="h-[400px] md:h-[450px] overflow-hidden relative">
                    <img src={member.image} alt={member.name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 filter grayscale-[20%] group-hover:grayscale-0" />
                    <div className="absolute inset-0 bg-brand-primary/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                 </div>
                 <div className="p-10 text-center relative bg-brand-cream">
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-16 h-16 bg-brand-primary text-white flex items-center justify-center font-serif text-2xl font-black rounded-full shadow-lg border-4 border-brand-cream">
                       {member.name.charAt(0)}
                    </div>
                    <h3 className="text-2xl md:text-3xl font-serif font-black text-brand-ink mt-6 mb-2">{member.name}</h3>
                    <p className="text-brand-accent text-[12px] tracking-widest uppercase font-black mb-6">{member.role}</p>
                    
                    <div className="flex flex-wrap gap-3 justify-center mb-8">
                      {member.languages.map(lang => (
                        <span key={lang} className="text-[11px] font-black border border-brand-border text-brand-sub px-3 py-1.5 rounded-md uppercase tracking-widest">{lang}</span>
                      ))}
                    </div>
                    <p className="text-base text-brand-sub font-light italic leading-relaxed">"{member.experience}"</p>
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
      <div className="bg-brand-cream min-h-screen">
        <PageHeader title="學員見證" subtitle="Success Stories" />
        
        <div className="container mx-auto px-6 lg:px-12 py-24">
           <div className="columns-1 md:columns-2 lg:columns-3 gap-10 space-y-10">
              {testimonials.map(t => (
                <div key={t.id} className="break-inside-avoid bg-white p-10 rounded-3xl shadow-zen border-t-8 border-brand-primary hover:-translate-y-2 transition-transform duration-500">
                   <Quote className="text-brand-border mb-8" size={48} />
                   <p className="text-brand-ink text-lg md:text-xl font-serif leading-loose mb-10 text-justify">
                      {t.content}
                   </p>
                   <div className="flex items-center gap-6">
                      <img src={t.image} alt={t.name} className="w-14 h-14 rounded-full object-cover grayscale border-2 border-brand-border" />
                      <div>
                         <h4 className="font-black text-brand-ink text-lg font-serif">{t.name}</h4>
                         <p className="text-[11px] text-brand-accent uppercase font-black tracking-widest">{t.ageCountry}</p>
                      </div>
                   </div>
                </div>
              ))}
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
    <div className="bg-white min-h-screen">
      <PageHeader title="常見問題" subtitle="Questions & Answers" />
      
      <div className="container mx-auto px-6 lg:px-12 py-24 max-w-4xl">
         <div className="space-y-6">
            {faqs.map((faq, i) => (
              <div key={i} className={`bg-brand-cream border rounded-2xl overflow-hidden transition-all duration-300 ${openIndex === i ? 'border-brand-primary shadow-heavy' : 'border-brand-border'}`}>
                 <button 
                   onClick={() => setOpenIndex(openIndex === i ? null : i)}
                   className="w-full flex items-center justify-between p-8 text-left"
                 >
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                       <span className={`w-fit text-[10px] font-black tracking-widest px-3 py-1.5 rounded-md uppercase ${openIndex === i ? 'bg-brand-primary text-white' : 'bg-white text-brand-sub'}`}>
                          {faq.category}
                       </span>
                       <span className={`font-serif font-black text-xl md:text-2xl ${openIndex === i ? 'text-brand-primary' : 'text-brand-ink'}`}>
                          {faq.question}
                       </span>
                    </div>
                    {openIndex === i ? <ChevronUp size={24} className="text-brand-primary shrink-0"/> : <ChevronDown size={24} className="text-brand-ink/30 shrink-0"/>}
                 </button>
                 <div className={`overflow-hidden transition-all duration-300 ${openIndex === i ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                    <div className="p-8 pt-0 text-brand-sub text-lg leading-loose font-light border-t border-brand-border/30 mx-2">
                       {faq.answer}
                    </div>
                 </div>
              </div>
            ))}
         </div>
         
         <div className="text-center mt-20">
            <p className="text-brand-sub text-lg mb-6">找不到您的問題嗎？</p>
            <a href="/contact" className="inline-flex items-center gap-4 text-brand-primary font-black border-b-2 border-brand-primary pb-2 hover:opacity-70 transition-all text-lg uppercase tracking-widest">
               直接聯繫我們 <ArrowRight size={24} />
            </a>
         </div>
      </div>
    </div>
  );
};

/* --- Media Page --- */
export const Media: React.FC = () => (
  <div className="bg-brand-cream min-h-screen">
     <PageHeader title="社群動態" subtitle="Social Media" />
     <div className="container mx-auto px-6 lg:px-12 py-24 text-center">
        <p className="text-brand-sub text-lg md:text-xl mb-16 max-w-2xl mx-auto font-light leading-relaxed">
           追蹤我們的 Instagram 與 Facebook，獲取最新的海外生活分享、學員實況與獨家優惠活動。
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-6 mb-24">
          <a href="#" className="flex items-center justify-center gap-4 bg-brand-ink text-white px-12 py-5 rounded-xl font-black hover:bg-brand-primary transition-all tracking-[0.2em] text-[13px] uppercase shadow-lg">
            <Instagram size={20} /> INSTAGRAM
          </a>
          <a href="#" className="flex items-center justify-center gap-4 bg-white border-2 border-brand-border text-brand-ink px-12 py-5 rounded-xl font-black hover:border-brand-primary hover:text-brand-primary transition-all tracking-[0.2em] text-[13px] uppercase shadow-sm">
            <Facebook size={20} /> FACEBOOK
          </a>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[1,2,3,4].map(i => (
            <div key={i} className="group relative overflow-hidden aspect-square rounded-3xl shadow-zen cursor-pointer">
               <img src={`https://picsum.photos/seed/social${i}/600/600`} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale-[30%] group-hover:grayscale-0" alt="Social Media" />
               <div className="absolute inset-0 bg-brand-primary/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center text-white">
                  <Instagram size={48} />
               </div>
            </div>
          ))}
        </div>
     </div>
  </div>
);

/* --- Contact Page --- */
export const Contact: React.FC = () => (
  <div className="bg-brand-cream min-h-screen">
     <PageHeader title="聯絡我們" subtitle="Get in Touch" />
     
     <div className="container mx-auto px-6 lg:px-12 py-16 md:py-24">
       <div className="max-w-6xl mx-auto bg-white shadow-heavy rounded-[40px] overflow-hidden flex flex-col lg:flex-row">
         
         {/* Info Side */}
         <div className="bg-brand-primary text-brand-cream p-12 md:p-16 lg:w-2/5 flex flex-col justify-between relative overflow-hidden order-2 lg:order-1">
            <div className="absolute top-0 left-0 w-full h-full opacity-5 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
            
            <div className="relative z-10">
               <h3 className="text-3xl font-serif font-black mb-12 text-brand-secondary tracking-tight">聯絡資訊</h3>
               <div className="space-y-12">
                  <div className="flex items-start gap-6">
                     <MapPin className="text-brand-secondary shrink-0 mt-1" size={28} />
                     <div>
                        <p className="font-black text-xl mb-2">台北總部</p>
                        <p className="text-white/60 text-base leading-relaxed">台北市信義區信義路五段7號<br/>(台北101對面)</p>
                     </div>
                  </div>
                  <div className="flex items-center gap-6">
                     <Phone className="text-brand-secondary shrink-0" size={28} />
                     <p className="text-xl font-medium tracking-wider">02-2345-6789</p>
                  </div>
                  <div className="flex items-center gap-6">
                     <Mail className="text-brand-secondary shrink-0" size={28} />
                     <p className="text-xl font-medium tracking-wider">info@lumenstone.edu</p>
                  </div>
               </div>
            </div>

            <div className="relative z-10 mt-20 p-8 bg-white/5 rounded-3xl border border-white/10">
               <p className="text-[11px] text-brand-secondary uppercase tracking-[0.4em] font-black mb-4">Office Hours</p>
               <p className="text-base text-white/80">週一至週五: 10:00 - 19:00</p>
               <p className="text-base text-white/80">週六: 13:00 - 18:00 (預約制)</p>
            </div>
         </div>

         {/* Form Side */}
         <div className="p-10 md:p-16 lg:p-20 lg:w-3/5 order-1 lg:order-2">
           <h3 className="text-3xl md:text-4xl font-serif font-black text-brand-ink mb-10 tracking-tighter">留言給我們</h3>
           <form 
              className="space-y-10"
              onSubmit={async (e) => {
                  e.preventDefault();
                  await DataService.submitContact({ timestamp: new Date() });
                  alert("訊息已發送，我們將盡快與您聯繫。");
              }}
           >
             <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-3">
                   <label className="text-sm font-black text-brand-ink/50 uppercase tracking-[0.2em]">您的姓名 Name *</label>
                   <input required type="text" className="w-full border-b-2 border-brand-border py-4 focus:border-brand-primary outline-none bg-transparent transition-all text-lg placeholder:text-brand-ink/20" placeholder="王小明" />
                </div>
                <div className="space-y-3">
                   <label className="text-sm font-black text-brand-ink/50 uppercase tracking-[0.2em]">聯絡電話 Phone *</label>
                   <input required type="tel" className="w-full border-b-2 border-brand-border py-4 focus:border-brand-primary outline-none bg-transparent transition-all text-lg placeholder:text-brand-ink/20" placeholder="0912-345-678" />
                </div>
             </div>
             <div className="space-y-3">
                <label className="text-sm font-black text-brand-ink/50 uppercase tracking-[0.2em]">電子信箱 Email *</label>
                <input required type="email" className="w-full border-b-2 border-brand-border py-4 focus:border-brand-primary outline-none bg-transparent transition-all text-lg placeholder:text-brand-ink/20" placeholder="example@email.com" />
             </div>
             <div className="space-y-3">
                <label className="text-sm font-black text-brand-ink/50 uppercase tracking-[0.2em]">想詢問的內容 Message</label>
                <textarea rows={4} className="w-full border-2 border-brand-border rounded-2xl p-6 focus:border-brand-primary outline-none bg-brand-cream/30 transition-all text-lg resize-none placeholder:text-brand-ink/20" placeholder="請描述您的需求或想問的問題..."></textarea>
             </div>
             <button type="submit" className="w-full py-6 bg-brand-primary text-white font-black rounded-xl hover:bg-brand-ink transition-all tracking-[0.4em] text-[15px] shadow-heavy flex items-center justify-center gap-4 group">
               發送諮詢訊息 <Send size={20} className="group-hover:translate-x-2 transition-transform" />
             </button>
           </form>
         </div>
       </div>
     </div>
  </div>
);

/* --- Legal Page --- */
export const Legal: React.FC = () => (
  <div className="bg-brand-cream min-h-screen">
     <PageHeader title="條款與聲明" subtitle="Legal" />
     <div className="container mx-auto px-6 lg:px-12 py-24 max-w-4xl text-brand-sub font-light leading-loose text-justify space-y-16">
        <section className="bg-white p-12 rounded-[40px] shadow-zen border border-brand-border">
           <h2 className="text-2xl md:text-3xl font-black text-brand-ink mb-8 font-serif tracking-tight">隱私權政策</h2>
           <p className="text-lg md:text-xl">Lumen Stone (以下簡稱本公司) 非常重視您的隱私權。我們僅會蒐集為提供遊學諮詢服務所必須之個人資料（包括但不限於姓名、電話、電子郵件等），絕不會將您的資料販售給第三方。所有的資料傳輸皆經過加密處理，並存儲於安全的伺服器中。</p>
        </section>
        <section className="bg-white p-12 rounded-[40px] shadow-zen border border-brand-border">
           <h2 className="text-2xl md:text-3xl font-black text-brand-ink mb-8 font-serif tracking-tight">服務條款</h2>
           <p className="text-lg md:text-xl">使用本網站即代表您同意本公司的服務條款。網站上的所有行程價格僅供參考，實際費用可能因匯率、季節及學校政策而有所變動，最終價格以正式簽約文件為準。本公司保留隨時修改網站內容之權利，恕不另行通知。</p>
        </section>
     </div>
  </div>
);


import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Send, Check, ArrowRight, Star } from 'lucide-react';
import { DataService } from '../services/db';

const Booking: React.FC = () => {
  const location = useLocation();
  const initialState = location.state || {};
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Collect form data (using simple FormData API or refs in a real app, here visualizing the concept)
    const formData = {
        interestedProgram: initialState.interestedProgram || null,
        timestamp: new Date().toISOString()
    };

    try {
        await DataService.submitBooking(formData);
        setSubmitted(true);
        window.scrollTo(0,0);
    } catch (error) {
        alert("Something went wrong. Please try again.");
    } finally {
        setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-[80vh] bg-lumen-base flex items-center justify-center px-4">
        <div className="bg-white p-16 rounded-3xl shadow-zen text-center max-w-lg w-full animate-fade-in border border-lumen-dark/5">
          <div className="w-20 h-20 bg-lumen-light/30 text-lumen-dark rounded-full flex items-center justify-center mx-auto mb-8 border border-lumen-accent/30">
            <Check size={40} />
          </div>
          <h2 className="text-3xl font-serif font-bold text-lumen-dark mb-6">預約成功</h2>
          <div className="h-[1px] w-12 bg-lumen-accent mx-auto mb-6"></div>
          <p className="text-lumen-sub mb-10 leading-loose">
            感謝您的填寫。<br/>
            我們的專業顧問將於 24 小時內（工作日）透過 LINE 或電話與您聯繫，為您安排一對一諮詢時間。
          </p>
          <a href="/" className="inline-flex items-center gap-2 text-lumen-dark font-bold hover:text-lumen-accent transition-colors tracking-widest text-sm border-b border-lumen-dark pb-1 hover:border-lumen-accent">
            返回首頁 <ArrowRight size={16} />
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-lumen-base min-h-screen">
      <div className="flex flex-col lg:flex-row min-h-screen">
        
        {/* Left Side: Zen Visuals & Info (Sticky on Desktop) */}
        <div className="lg:w-2/5 bg-lumen-dark text-lumen-base relative lg:sticky lg:top-0 lg:h-screen flex flex-col justify-between p-12 lg:p-20 overflow-hidden">
            {/* Background Texture & Image */}
            <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] z-0"></div>
            <img 
              src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80" 
              className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-overlay"
              alt="Peaceful Sea"
            />
            
            <div className="relative z-10">
               <span className="text-lumen-accent tracking-[0.3em] text-xs uppercase block mb-6">Start Your Journey</span>
               <h1 className="text-4xl lg:text-5xl font-serif font-bold leading-tight">
                 預約<br/>免費諮詢
               </h1>
               <div className="w-16 h-[2px] bg-lumen-accent mt-8 mb-8"></div>
               <p className="text-lumen-base/60 font-light leading-loose text-lg">
                 無論您是計畫短期充電，還是長期留學深造，我們都在這裡為您引路。填寫右側表單，讓我們開始對話。
               </p>
            </div>

            <div className="relative z-10 mt-12 lg:mt-0">
               <div className="flex gap-1 mb-4">
                  {[1,2,3,4,5].map(i => <Star key={i} size={16} className="fill-lumen-accent text-lumen-accent"/>)}
               </div>
               <p className="font-serif italic text-xl opacity-90 mb-2">"顧問非常細心，幫我找到最適合的學校！"</p>
               <p className="text-sm text-lumen-base/50 uppercase tracking-widest">— Emily, UK Summer Camp</p>
            </div>
        </div>

        {/* Right Side: Form */}
        <div className="lg:w-3/5 p-6 lg:p-20 bg-lumen-base">
          <div className="max-w-2xl mx-auto">
            <form onSubmit={handleSubmit} className="space-y-12">
              
              {/* Section 1 */}
              <div className="animate-slide-up" style={{animationDelay: '0.1s'}}>
                <h3 className="text-xl font-serif font-bold text-lumen-dark mb-8 flex items-center gap-4">
                   <span className="w-8 h-8 rounded-full border border-lumen-dark/30 flex items-center justify-center text-sm font-sans">01</span>
                   基本資料
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="group">
                    <label className="block text-xs font-bold text-lumen-sub uppercase tracking-widest mb-2 group-focus-within:text-lumen-accent transition-colors">學生姓名 *</label>
                    <input required type="text" className="w-full bg-transparent border-b border-lumen-dark/20 py-3 text-lumen-dark focus:border-lumen-accent outline-none transition-all placeholder-lumen-dark/20" placeholder="Your Name" />
                  </div>
                  <div className="group">
                    <label className="block text-xs font-bold text-lumen-sub uppercase tracking-widest mb-2 group-focus-within:text-lumen-accent transition-colors">聯絡電話 *</label>
                    <input required type="tel" className="w-full bg-transparent border-b border-lumen-dark/20 py-3 text-lumen-dark focus:border-lumen-accent outline-none transition-all placeholder-lumen-dark/20" placeholder="Phone Number" />
                  </div>
                  <div className="group">
                    <label className="block text-xs font-bold text-lumen-sub uppercase tracking-widest mb-2 group-focus-within:text-lumen-accent transition-colors">LINE ID *</label>
                    <input required type="text" className="w-full bg-transparent border-b border-lumen-dark/20 py-3 text-lumen-dark focus:border-lumen-accent outline-none transition-all placeholder-lumen-dark/20" placeholder="For Contact" />
                  </div>
                  <div className="group">
                    <label className="block text-xs font-bold text-lumen-sub uppercase tracking-widest mb-2 group-focus-within:text-lumen-accent transition-colors">Email</label>
                    <input type="email" className="w-full bg-transparent border-b border-lumen-dark/20 py-3 text-lumen-dark focus:border-lumen-accent outline-none transition-all placeholder-lumen-dark/20" placeholder="Email Address" />
                  </div>
                </div>
              </div>

              {/* Section 2 */}
              <div className="animate-slide-up" style={{animationDelay: '0.2s'}}>
                <h3 className="text-xl font-serif font-bold text-lumen-dark mb-8 flex items-center gap-4">
                   <span className="w-8 h-8 rounded-full border border-lumen-dark/30 flex items-center justify-center text-sm font-sans">02</span>
                   遊學需求
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div className="group">
                    <label className="block text-xs font-bold text-lumen-sub uppercase tracking-widest mb-2 group-focus-within:text-lumen-accent transition-colors">學生年齡</label>
                    <div className="relative">
                      <select className="w-full bg-transparent border-b border-lumen-dark/20 py-3 text-lumen-dark focus:border-lumen-accent outline-none transition-all appearance-none cursor-pointer">
                        <option>請選擇年齡層</option>
                        <option>國小 (7-12)</option>
                        <option>國中 (13-15)</option>
                        <option>高中 (15-18)</option>
                        <option>大學生</option>
                        <option>社會人士</option>
                      </select>
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-lumen-dark/50">▼</div>
                    </div>
                  </div>
                   <div className="group">
                    <label className="block text-xs font-bold text-lumen-sub uppercase tracking-widest mb-2 group-focus-within:text-lumen-accent transition-colors">預算範圍</label>
                    <div className="relative">
                      <select className="w-full bg-transparent border-b border-lumen-dark/20 py-3 text-lumen-dark focus:border-lumen-accent outline-none transition-all appearance-none cursor-pointer">
                        <option>請選擇預算</option>
                        <option>5 萬以下</option>
                        <option>5-10 萬</option>
                        <option>10-20 萬</option>
                        <option>20 萬以上</option>
                      </select>
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-lumen-dark/50">▼</div>
                    </div>
                  </div>
                </div>

                <div className="mb-8">
                  <label className="block text-xs font-bold text-lumen-sub uppercase tracking-widest mb-4">有興趣的國家 (可複選)</label>
                  <div className="flex flex-wrap gap-3">
                    {['英國', '美國', '加拿大', '澳洲', '日本', '菲律賓', '尚未決定'].map(c => (
                      <label key={c} className="flex items-center cursor-pointer group">
                        <input type="checkbox" className="peer sr-only" />
                        <span className="px-4 py-2 border border-lumen-dark/20 rounded-full text-sm text-lumen-sub peer-checked:bg-lumen-dark peer-checked:text-white peer-checked:border-lumen-dark transition-all hover:border-lumen-accent">
                          {c}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                 {initialState.interestedProgram && (
                  <div className="bg-lumen-accent/10 p-6 rounded-xl border border-lumen-accent/20 mb-8 flex items-start gap-3">
                    <Star size={18} className="text-lumen-accent mt-0.5" fill="currentColor"/>
                    <div>
                        <span className="text-lumen-dark font-bold text-sm block mb-1">已指定諮詢行程：</span>
                        <span className="text-lumen-dark/80 text-lg font-serif">{initialState.interestedProgram}</span>
                    </div>
                  </div>
                )}

                <div className="group">
                  <label className="block text-xs font-bold text-lumen-sub uppercase tracking-widest mb-2 group-focus-within:text-lumen-accent transition-colors">備註留言</label>
                  <textarea 
                    rows={4} 
                    className="w-full bg-stone-50 border border-lumen-dark/10 rounded-xl p-4 text-lumen-dark focus:border-lumen-accent outline-none transition-all resize-none placeholder-lumen-dark/30"
                    placeholder="有什麼特別需求或想問的問題嗎？"
                  ></textarea>
                </div>
              </div>

              <div className="pt-8">
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full py-5 bg-lumen-dark hover:bg-lumen-accent text-white rounded-xl text-lg font-bold shadow-zen hover:shadow-lg transition-all duration-500 flex items-center justify-center gap-3 tracking-widest group disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? '處理中...' : (
                      <>
                        <span>送出諮詢單</span> 
                        <Send size={18} className="group-hover:translate-x-1 transition-transform" />
                      </>
                  )}
                </button>
                <p className="text-[10px] text-lumen-sub text-center mt-6 tracking-wide">
                  送出即代表您同意本公司的隱私權政策，我們會妥善保護您的個人資料。
                </p>
              </div>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;

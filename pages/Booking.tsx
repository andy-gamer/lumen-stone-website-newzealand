
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Send, Check, ArrowRight, Star, ClipboardCheck } from 'lucide-react';
import { DataService } from '../services/db';

const Booking: React.FC = () => {
  const location = useLocation();
  const initialState = location.state || {};
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    lineId: '',
    email: '',
    ageGroup: '請選擇年齡層',
    budget: '請選擇預算',
    remarks: '',
    surveyResults: initialState.surveyResults || null
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
        await DataService.submitBooking({
            ...formData,
            targetEmail: "info@lumenstone-global.com",
            timestamp: new Date().toISOString()
        });
        setSubmitted(true);
        window.scrollTo(0,0);
    } catch (error) {
        alert("發送失敗，請稍後再試。");
    } finally {
        setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-[80vh] bg-brand-cream flex items-center justify-center px-4">
        <div className="bg-white p-12 md:p-16 rounded-3xl shadow-heavy text-center max-w-lg w-full animate-fade-in border border-brand-border">
          <div className="w-20 h-20 bg-brand-primary/10 text-brand-primary rounded-full flex items-center justify-center mx-auto mb-8">
            <Check size={40} />
          </div>
          <h2 className="text-3xl font-serif font-bold text-brand-ink mb-6">諮詢需求已送出</h2>
          <div className="h-[1px] w-12 bg-brand-accent mx-auto mb-6"></div>
          <p className="text-brand-sub mb-10 leading-loose text-sm">
            感謝您的填寫。<br/>
            您的需求已同步發送至顧問信箱：<br/>
            <span className="text-brand-accent font-bold">info@lumenstone-global.com</span><br/>
            我們將於 24 小時內與您聯繫。
          </p>
          <a href="/" className="inline-flex items-center gap-2 text-brand-ink font-bold hover:text-brand-accent transition-colors tracking-widest text-xs border-b border-brand-ink pb-1 uppercase">
            Back to Home <ArrowRight size={16} />
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-brand-cream min-h-screen pt-32">
      <div className="flex flex-col lg:flex-row min-h-screen">
        
        {/* Left Info */}
        <div className="lg:w-1/3 bg-brand-primary text-white p-10 lg:p-16 flex flex-col justify-between relative overflow-hidden">
            <div className="relative z-10">
               <span className="text-brand-secondary tracking-[0.4em] text-[10px] uppercase block mb-4 font-black">Official Contact</span>
               <h1 className="text-3xl lg:text-4xl font-serif font-black leading-tight mb-8">
                 預約 1 對 1<br/>專業課程諮詢
               </h1>
               <div className="space-y-6 text-white/60 text-sm font-light leading-relaxed">
                  <p>點石代辦全程透明，針對您的需求提供量身打造的方案建議。</p>
                  <p>諮詢表單將直接遞交至：<br/><span className="text-white font-bold">info@lumenstone-global.com</span></p>
               </div>
            </div>

            <div className="relative z-10 mt-12 bg-white/5 p-8 rounded-2xl border border-white/10">
               <div className="flex gap-1 mb-4">
                  {[1,2,3,4,5].map(i => <Star key={i} size={14} className="fill-brand-secondary text-brand-secondary"/>)}
               </div>
               <p className="font-serif italic text-lg opacity-90 mb-4 leading-relaxed">"專業且細心，讓我們在選擇學校時非常放心。"</p>
               <p className="text-[10px] text-white/40 uppercase tracking-widest">— 客戶真實評論</p>
            </div>
        </div>

        {/* Form */}
        <div className="lg:w-2/3 p-6 lg:p-20 bg-brand-cream">
          <div className="max-w-3xl mx-auto">
            <form onSubmit={handleSubmit} className="space-y-12">
              
              {formData.surveyResults && (
                <div className="bg-brand-primary/5 p-8 rounded-2xl border border-brand-primary/10 mb-10 flex items-start gap-4">
                  <ClipboardCheck className="text-brand-primary shrink-0" size={24} />
                  <div>
                    <h4 className="text-brand-primary font-black text-xs uppercase tracking-widest mb-3">已帶入問卷結果</h4>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                      {Object.entries(formData.surveyResults).map(([key, val]: any) => (
                        <li key={key} className="text-[11px] text-brand-sub flex items-center gap-2">
                           <div className="w-1 h-1 bg-brand-accent rounded-full"></div>
                           <span>{val}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-brand-ink/40 uppercase tracking-widest">姓名 Name *</label>
                  <input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} type="text" className="w-full bg-transparent border-b border-brand-border py-3 text-brand-ink focus:border-brand-primary outline-none transition-all placeholder:text-brand-ink/20" placeholder="王小明" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-brand-ink/40 uppercase tracking-widest">電話 Phone *</label>
                  <input required value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} type="tel" className="w-full bg-transparent border-b border-brand-border py-3 text-brand-ink focus:border-brand-primary outline-none transition-all placeholder:text-brand-ink/20" placeholder="0912-345-678" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-brand-ink/40 uppercase tracking-widest">LINE ID *</label>
                  <input required value={formData.lineId} onChange={e => setFormData({...formData, lineId: e.target.value})} type="text" className="w-full bg-transparent border-b border-brand-border py-3 text-brand-ink focus:border-brand-primary outline-none transition-all placeholder:text-brand-ink/20" placeholder="方便聯繫的 ID" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-brand-ink/40 uppercase tracking-widest">Email</label>
                  <input value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} type="email" className="w-full bg-transparent border-b border-brand-border py-3 text-brand-ink focus:border-brand-primary outline-none transition-all placeholder:text-brand-ink/20" placeholder="example@email.com" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-brand-ink/40 uppercase tracking-widest">年齡層 Age</label>
                  <select value={formData.ageGroup} onChange={e => setFormData({...formData, ageGroup: e.target.value})} className="w-full bg-transparent border-b border-brand-border py-3 text-brand-ink focus:border-brand-primary outline-none transition-all cursor-pointer">
                    <option>請選擇年齡層</option>
                    <option>國小 (7-12)</option>
                    <option>國中 (13-15)</option>
                    <option>高中 (15-18)</option>
                    <option>大學生</option>
                    <option>社會人士</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-brand-ink/40 uppercase tracking-widest">預算範圍 Budget</label>
                  <select value={formData.budget} onChange={e => setFormData({...formData, budget: e.target.value})} className="w-full bg-transparent border-b border-brand-border py-3 text-brand-ink focus:border-brand-primary outline-none transition-all cursor-pointer">
                    <option>請選擇預算</option>
                    <option>10 萬以下</option>
                    <option>10-20 萬</option>
                    <option>20-50 萬</option>
                    <option>50 萬以上</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-brand-ink/40 uppercase tracking-widest">諮詢細節與留言 Message</label>
                <textarea rows={4} value={formData.remarks} onChange={e => setFormData({...formData, remarks: e.target.value})} className="w-full bg-white/50 border border-brand-border rounded-xl p-4 text-brand-ink focus:border-brand-primary outline-none transition-all resize-none placeholder:text-brand-ink/20" placeholder="還有其他想讓我們知道的事情嗎？"></textarea>
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full py-5 bg-brand-primary hover:bg-brand-ink text-white rounded-xl text-[12px] font-black uppercase tracking-[0.3em] shadow-heavy transition-all flex items-center justify-center gap-3"
              >
                {isSubmitting ? '發送中...' : (
                    <>
                      <span>送出諮詢表單</span> 
                      <Send size={16} />
                    </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;

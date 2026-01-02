
import React, { useState, useEffect } from 'react';
import { Calendar, Tag, ChevronRight, Bell } from 'lucide-react';
import { DataService } from '../services/db';
import { NewsItem } from '../types';

const News: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    DataService.getNews().then(data => {
      setNews(data);
      setIsLoading(false);
    });
  }, []);

  return (
    <div className="bg-brand-cream min-h-screen pt-44 pb-32">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-4xl mx-auto mb-20 text-center">
           <span className="text-brand-accent font-black tracking-[0.5em] uppercase text-[10px] block mb-4">Latest Updates</span>
           <h1 className="text-6xl md:text-8xl font-serif font-black text-brand-ink leading-none tracking-tighter mb-8">
             最新消息 <span className="text-brand-accent/30 font-light italic">News</span>
           </h1>
           <p className="text-brand-sub text-lg font-light leading-relaxed max-w-xl mx-auto">
             掌握第一手紐西蘭留遊學資訊、品牌動態與限時優惠，讓您的教育規劃始終領先一步。
           </p>
        </div>

        {isLoading ? (
          <div className="py-40 flex justify-center">
            <div className="w-12 h-12 border-2 border-brand-accent/20 border-t-brand-accent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto space-y-8">
            {news.map(item => (
              <div key={item.id} className="group bg-white p-10 rounded-2xl border border-brand-border hover:shadow-zen transition-all flex flex-col md:flex-row gap-10 items-start md:items-center">
                <div className="shrink-0 flex flex-col items-center bg-brand-cream px-6 py-4 rounded-xl border border-brand-border">
                  <Calendar size={18} className="text-brand-accent mb-2" />
                  <span className="text-[10px] font-black tracking-widest text-brand-ink">{item.date}</span>
                </div>
                
                <div className="flex-grow space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 bg-brand-ink text-white text-[8px] font-black uppercase tracking-widest rounded-sm">
                      {item.category}
                    </span>
                  </div>
                  <h3 className="text-2xl font-serif font-black text-brand-ink group-hover:text-brand-accent transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-brand-sub text-sm font-light leading-relaxed">
                    {item.summary}
                  </p>
                </div>

                <button className="md:self-center w-12 h-12 rounded-full border border-brand-border flex items-center justify-center text-brand-ink/30 group-hover:bg-brand-ink group-hover:text-white group-hover:border-brand-ink transition-all">
                  <ChevronRight size={20} />
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="max-w-2xl mx-auto mt-32 p-12 bg-brand-ink text-white rounded-3xl text-center relative overflow-hidden">
           <Bell className="absolute -top-10 -right-10 w-48 h-48 opacity-5" />
           <h3 className="text-2xl font-serif font-black mb-4 text-brand-secondary">訂閱電子報</h3>
           <p className="text-white/60 text-sm font-light mb-10">不想錯過任何重要資訊？留下 Email，我們將在第一時間通知您。</p>
           <div className="flex flex-col sm:flex-row gap-4">
              <input type="email" placeholder="Your Email Address" className="flex-grow bg-white/10 border border-white/20 rounded-lg px-6 py-4 text-sm focus:outline-none focus:border-brand-secondary" />
              <button className="px-10 py-4 bg-brand-secondary text-brand-primary font-black uppercase tracking-widest text-[10px] rounded-lg hover:bg-white transition-all">Subscribe</button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default News;

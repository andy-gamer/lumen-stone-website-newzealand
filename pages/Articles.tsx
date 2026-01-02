
import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Clock, Tag, ArrowRight, Search, Calendar, User, ChevronRight } from 'lucide-react';
import { DataService } from '../services/db';
import { Article } from '../types';

const Articles: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [isLoading, setIsLoading] = useState(true);

  const categories = ['All', '趨勢分析', '學員心得', '生活指南', '攻略'];

  useEffect(() => {
    DataService.getArticles().then(data => {
      setArticles(data);
      setIsLoading(false);
    });
  }, []);

  const filteredArticles = useMemo(() => {
    if (activeCategory === 'All') return articles;
    return articles.filter(a => a.category === activeCategory);
  }, [articles, activeCategory]);

  return (
    <div className="bg-brand-cream min-h-screen pt-44 pb-32">
      <div className="container mx-auto px-6 lg:px-12">
        
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 mb-20">
          <div className="max-w-2xl">
            <span className="text-brand-primary font-black tracking-[0.5em] uppercase text-[10px] block mb-4">Discovery & Learning</span>
            <h1 className="text-6xl md:text-8xl font-serif font-black text-brand-ink leading-none tracking-tighter">
              文章導覽 <span className="text-brand-primary/30 font-light italic">Insights</span>
            </h1>
          </div>
          <p className="text-brand-sub text-lg font-light leading-relaxed max-w-sm border-l-2 border-brand-primary/20 pl-8">
            深入探討留學生活、方案對照與成功案例，為您的探索之旅提供最具參考價值的內容。
          </p>
        </div>

        {/* Categories Bar */}
        <div className="sticky top-20 z-40 bg-brand-cream/90 backdrop-blur-md py-6 border-y border-brand-border mb-16">
          <div className="flex items-center gap-4 overflow-x-auto scrollbar-hide">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`shrink-0 px-8 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest border transition-all duration-300 ${
                  activeCategory === cat ? 'bg-brand-primary border-brand-primary text-white shadow-lg' : 'border-brand-border bg-white/50 hover:border-brand-primary text-brand-ink/40'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Articles List Layout */}
        {isLoading ? (
          <div className="py-40 flex justify-center">
            <div className="w-12 h-12 border-2 border-brand-primary/20 border-t-brand-primary rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="max-w-5xl mx-auto space-y-8">
            {filteredArticles.map(article => (
              <Link 
                to={`/articles/${article.id}`} 
                key={article.id} 
                className="group block bg-white rounded-[40px] overflow-hidden border border-brand-border hover:shadow-heavy hover:border-brand-primary transition-all duration-500"
              >
                <div className="flex flex-col md:flex-row h-full">
                  {/* Thumbnail */}
                  <div className="md:w-2/5 relative overflow-hidden aspect-video md:aspect-auto h-[240px] md:h-auto">
                     <img src={article.image} className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000" alt={article.title} />
                     <div className="absolute top-6 left-6 bg-brand-ink/60 backdrop-blur-md text-white px-4 py-1.5 rounded-sm font-black text-[9px] uppercase tracking-widest shadow-sm">
                        {article.category}
                     </div>
                  </div>

                  {/* Content Area */}
                  <div className="md:w-3/5 p-8 md:p-12 flex flex-col justify-center">
                     <div className="flex flex-wrap items-center gap-6 text-brand-primary text-[9px] font-bold uppercase tracking-widest mb-6">
                        <span className="flex items-center gap-2"><Calendar size={14} className="text-brand-accent"/> {article.publishDate}</span>
                        <span className="flex items-center gap-2"><Clock size={14} className="text-brand-accent"/> {article.readTime} READ</span>
                     </div>
                     
                     <h3 className="text-2xl md:text-3xl font-serif font-black text-brand-ink leading-tight mb-6 group-hover:text-brand-primary transition-colors">
                       {article.title}
                     </h3>
                     
                     <p className="text-brand-sub text-sm md:text-base font-light leading-loose mb-8 line-clamp-2 md:line-clamp-3">
                       {article.summary}
                     </p>

                     <div className="flex items-center justify-between pt-8 border-t border-brand-border mt-auto">
                        <div className="flex flex-wrap gap-2">
                           {article.tags.map(tag => (
                             <span key={tag} className="text-[9px] font-bold text-brand-primary/60 bg-brand-primary/5 px-2 py-1 rounded">#{tag}</span>
                           ))}
                        </div>
                        <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-brand-ink group-hover:text-brand-primary transition-all">
                           Read More <ChevronRight size={16} />
                        </div>
                     </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {filteredArticles.length === 0 && !isLoading && (
          <div className="py-40 text-center">
             <h2 className="text-3xl font-serif font-black text-brand-ink mb-4">目前沒有相關文章</h2>
             <p className="text-brand-sub font-light">請嘗試切換其他分類標籤。</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Articles;

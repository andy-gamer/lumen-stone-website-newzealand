
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, Calendar, Share2, ArrowRight, Quote, Bookmark } from 'lucide-react';
import { DataService } from '../services/db';
import { Article } from '../types';

const ArticleDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [article, setArticle] = useState<Article | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (id) {
      DataService.getArticleById(id).then(data => {
        setArticle(data);
        setIsLoading(false);
      });
    }
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-cream">
        <div className="w-12 h-12 border-4 border-brand-accent/20 border-t-brand-accent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!article) return <div className="p-20 text-center">Article not found</div>;

  return (
    <div className="bg-brand-cream min-h-screen font-sans">
      
      {/* Hero Section */}
      <div className="relative h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={article.image} className="w-full h-full object-cover" alt={article.title} />
          <div className="absolute inset-0 bg-brand-ink/60 backdrop-blur-[2px]"></div>
        </div>
        
        <div className="relative z-10 container mx-auto px-6 text-center max-w-4xl pt-20">
          <Link to="/articles" className="inline-flex items-center gap-2 text-brand-secondary/60 hover:text-brand-secondary font-black text-[9px] tracking-[0.4em] uppercase mb-10 transition-colors">
            <ArrowLeft size={14} /> Back to Insights
          </Link>
          <div className="flex justify-center gap-4 mb-6">
            <span className="px-4 py-1.5 bg-brand-accent text-white text-[9px] font-black uppercase tracking-widest rounded-sm">
              {article.category}
            </span>
          </div>
          <h1 className="text-4xl md:text-7xl font-serif font-black text-white leading-tight tracking-tighter mb-10">
            {article.title}
          </h1>
          <div className="flex items-center justify-center gap-10 text-brand-secondary/40 text-[10px] font-bold uppercase tracking-widest">
            <span className="flex items-center gap-2"><Calendar size={14}/> {article.publishDate}</span>
            <span className="flex items-center gap-2"><Clock size={14}/> {article.readTime} Read</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-24">
        <div className="max-w-3xl mx-auto">
          
          {/* Article Meta */}
          <div className="flex items-center justify-between mb-20 pb-10 border-b border-brand-border">
             <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-brand-accent/10 border border-brand-accent/20 flex items-center justify-center text-brand-accent font-serif font-bold text-xl">L</div>
                <div>
                   <p className="text-sm font-black text-brand-ink tracking-tight">Lumen Stone Editorial</p>
                   <p className="text-[10px] text-brand-sub uppercase font-bold tracking-widest">教育策展團隊</p>
                </div>
             </div>
             <div className="flex gap-4">
                <button className="w-10 h-10 rounded-full border border-brand-border flex items-center justify-center text-brand-sub hover:bg-brand-ink hover:text-white transition-all"><Share2 size={16}/></button>
                <button className="w-10 h-10 rounded-full border border-brand-border flex items-center justify-center text-brand-sub hover:bg-brand-ink hover:text-white transition-all"><Bookmark size={16}/></button>
             </div>
          </div>

          {/* Article Body */}
          <div className="prose prose-lg prose-stone max-w-none prose-headings:font-serif prose-headings:font-black prose-p:font-light prose-p:leading-relaxed prose-p:text-brand-sub">
             <div className="whitespace-pre-line text-lg md:text-xl text-brand-sub font-light leading-loose text-justify">
                {article.content}
             </div>

             <div className="my-20 p-12 bg-white border-l-4 border-brand-accent shadow-zen italic text-brand-ink font-serif text-2xl leading-relaxed">
                「真正的教育，不是注滿一桶水，而是點燃一盆火。點石的使命，就是為每一塊原石尋找那點火的環境。」
             </div>

             <p className="text-brand-sub font-light leading-relaxed">
               紐西蘭的學制不僅在於學分，更在於對於個體尊嚴與興趣的極大化包容。透過 NCEA，學生能提早接觸職業導向的選修課，這也是為什麼點石始終推薦家長考慮『微留學』作為銜接的第一步。
             </p>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-4 mt-24">
            {article.tags.map(tag => (
              <span key={tag} className="text-[10px] font-bold text-brand-accent border border-brand-accent/20 px-5 py-2 rounded-full uppercase tracking-widest hover:bg-brand-accent hover:text-white transition-all cursor-pointer">
                #{tag}
              </span>
            ))}
          </div>

          {/* CTA Section */}
          <div className="mt-32 p-12 bg-white rounded-3xl border border-brand-border shadow-heavy flex flex-col md:flex-row items-center justify-between gap-10">
             <div className="space-y-4 text-center md:text-left">
                <h3 className="text-3xl font-serif font-black text-brand-ink">開啟您的教育藍圖</h3>
                <p className="text-brand-sub font-light">這篇文章有幫助到您嗎？直接與我們的顧問聊聊您的具體需求。</p>
             </div>
             <Link to="/booking" className="px-14 py-6 bg-brand-ink text-white rounded-lg font-black uppercase tracking-widest text-[10px] shadow-lg hover:bg-brand-accent transition-all flex items-center gap-4">
               預約免費諮詢 <ArrowRight size={18} />
             </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleDetail;

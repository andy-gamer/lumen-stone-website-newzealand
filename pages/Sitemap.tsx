
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Home, GraduationCap, 
  ArrowRight, Star, HelpCircle, Info, MessageSquare, Search, MessageCircle
} from 'lucide-react';

const Sitemap: React.FC = () => {
  const lineUrl = "https://line.me/ti/p/@647loexf";

  const sections = [
    {
      id: "01",
      title: "首頁 Home",
      icon: <Home className="text-brand-accent" size={24} />,
      links: [
        { name: "品牌首頁", path: "/", desc: "探索點石的核心理念與最新動態" },
        { name: "品牌故事", path: "/about", desc: "了解我們的教育初心" },
        { name: "顧問團隊", path: "/team", desc: "遇見您的留學規劃師" },
      ]
    },
    {
      id: "02",
      title: "選課指南 Guide",
      icon: <Search className="text-brand-accent" size={24} />,
      links: [
        { name: "互動式選課指南", path: "/guide", desc: "3分鐘快速分析最適合方案" },
        { name: "常見問題 FAQ", path: "/faq", desc: "簽證、保險與生活大小事" },
        { name: "紐西蘭百科", path: "/education", desc: "深入了解紐西蘭學制與 NCEA" },
      ]
    },
    {
      id: "03",
      title: "遊學行 Programs",
      icon: <GraduationCap className="text-brand-accent" size={24} />,
      links: [
        { name: "所有方案清單", path: "/programs", desc: "瀏覽點石精選的全球優質行程" },
        { name: "長期學位留學", path: "/programs?type=Study Abroad", desc: "國中小及大學升學規劃" },
        { name: "微留學插班體驗", path: "/programs?type=Micro Study", desc: "短期插班，體驗當地校園生活" },
        { name: "LPP 語言暖身課程", path: "/lpp", desc: "獨家行前語言特訓服務" },
      ]
    },
    {
      id: "04",
      title: "學員與聯繫",
      icon: <MessageSquare className="text-brand-accent" size={24} />,
      links: [
        { name: "學員見證", path: "/success", desc: "來自學員與家長的真實分享" },
        { name: "預約諮詢", path: "/booking", desc: "安排一對一免費面談時間" },
        { name: "聯絡我們", path: "/contact", desc: "辦公室資訊與即時客服聯絡" },
      ]
    }
  ];

  return (
    <div className="bg-brand-cream min-h-screen pt-40 pb-32">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-6xl mx-auto">
          
          <div className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-10">
            <div className="max-w-2xl">
              <span className="text-brand-accent font-bold tracking-[0.5em] uppercase text-[10px] mb-4 block">Navigation Hub</span>
              <h1 className="text-5xl md:text-8xl font-serif font-black text-brand-ink leading-none tracking-tighter">
                Sitemap<br/><span className="text-brand-accent/40">全站導覽</span>
              </h1>
            </div>
            <p className="text-brand-sub font-light max-w-sm leading-relaxed border-l border-brand-accent/20 pl-8">
              我們將繁瑣的資訊系統化，為您提供最清晰的導航。從品牌初衷到每一個精選行程，在這裡都能輕鬆尋得。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-20">
            {sections.map((section, idx) => (
              <div key={idx} className="group">
                <div className="flex items-center gap-6 mb-10 pb-6 border-b border-brand-accent/10">
                  <span className="text-4xl font-serif italic text-brand-accent/10 font-black">{section.id}</span>
                  <div className="flex items-center gap-4">
                    {section.icon}
                    <h2 className="text-2xl font-serif font-bold text-brand-ink tracking-tight">{section.title}</h2>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-8">
                  {section.links.map((link, lIdx) => (
                    <Link key={lIdx} to={link.path} className="block group/item">
                      <div className="flex items-start gap-4">
                        <div className="mt-1 w-5 h-5 rounded-full border border-brand-border flex items-center justify-center group-hover/item:border-brand-accent group-hover/item:bg-brand-accent transition-all duration-300">
                           <ArrowRight size={10} className="text-transparent group-hover/item:text-white" />
                        </div>
                        <div>
                          <span className="text-lg font-bold text-brand-ink group-hover/item:text-brand-accent transition-colors block mb-1">
                            {link.name}
                          </span>
                          <p className="text-xs text-brand-sub font-light group-hover/item:text-brand-ink transition-colors">
                            {link.desc}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Quick Support Banner */}
          <div className="mt-40 grid grid-cols-1 md:grid-cols-3 gap-8">
             <div className="p-10 bg-white rounded-[40px] border border-brand-border hover:shadow-zen transition-all">
                <HelpCircle className="text-brand-accent mb-6" size={32} />
                <h4 className="text-xl font-serif font-bold text-brand-ink mb-4">需要協助？</h4>
                <p className="text-brand-sub text-sm leading-relaxed mb-6">不確定哪個方案適合您嗎？讓我們的 AI 導購或是真人顧問協助您。</p>
                <Link to="/guide" className="text-brand-accent text-xs font-bold tracking-widest uppercase hover:underline">啟動選課指南</Link>
             </div>
             <div className="p-10 bg-brand-ink rounded-[40px] shadow-heavy md:translate-y-[-20px] text-white">
                <MessageCircle className="text-brand-secondary mb-6" size={32} />
                <h4 className="text-xl font-serif font-bold text-white mb-4">即時諮詢</h4>
                <p className="text-white/60 text-sm leading-relaxed mb-6">點擊下方按鈕，加入 LINE 帳號與資深顧問進行一對一免費諮詢。</p>
                <a href={lineUrl} target="_blank" rel="noopener noreferrer" className="inline-block px-8 py-3 bg-brand-secondary text-brand-ink rounded-full text-xs font-black tracking-widest uppercase hover:bg-white transition-all">加入 LINE 帳號</a>
             </div>
             <div className="p-10 bg-white rounded-[40px] border border-brand-border hover:shadow-zen transition-all">
                <Info className="text-brand-accent mb-6" size={32} />
                <h4 className="text-xl font-serif font-bold text-brand-ink mb-4">法律聲明</h4>
                <p className="text-brand-sub text-sm leading-relaxed mb-6">了解點石的隱私權政策與服務條款，我們妥善守護您的資料。</p>
                <Link to="/legal" className="text-brand-accent text-xs font-bold tracking-widest uppercase hover:underline">閱讀條款</Link>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Sitemap;

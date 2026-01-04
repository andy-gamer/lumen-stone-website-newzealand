
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, MessageCircle, ArrowRight, Home, Search, BookOpen, GraduationCap } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMenuOpen]);

  const logoUrl = "https://pub-eab9e45abd56499794188fcd886beee3.r2.dev/logo/logo.png";
  const lineUrl = "https://line.me/ti/p/@647loexf";

  const navbarClasses = scrolled 
    ? 'bg-brand-cream/95 backdrop-blur-md shadow-sm h-16' 
    : 'bg-transparent h-20 md:h-24';

  return (
    <div className="flex flex-col min-h-screen bg-brand-cream text-brand-ink font-sans">
      
      <nav className={`fixed top-0 w-full z-[60] transition-all duration-500 flex items-center ${navbarClasses}`}>
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex justify-between items-center">
            
            <Link to="/" className="flex items-center gap-2 md:gap-3 group relative z-[70]">
               <div className={`transition-all duration-500 ${scrolled ? 'h-7 w-7' : 'h-9 w-9 md:h-12 md:w-12'} group-hover:scale-110 grayscale brightness-0 opacity-80`}>
                  <img src={logoUrl} alt="Lumen Stone Logo" className="w-full h-full object-contain" />
               </div>
               <div className="flex flex-col">
                 <span className={`font-serif font-black tracking-tighter transition-all ${scrolled ? 'text-sm' : 'text-base md:text-lg'}`}>點石遊學國際</span>
                 <span className="text-[8px] md:text-[9px] tracking-[0.2em] uppercase font-bold opacity-30 leading-none">Lumen Stone Education</span>
               </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              <div 
                className="relative group"
                onMouseEnter={() => setActiveDropdown('guide')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button className="flex items-center gap-1.5 text-[11px] tracking-widest font-black transition-all hover:text-brand-accent py-4">
                  如何選課？ <ChevronDown size={10} className={`transition-transform duration-300 ${activeDropdown === 'guide' ? 'rotate-180' : ''}`} />
                </button>
                <div className={`absolute top-full left-0 w-44 bg-white shadow-heavy border border-brand-border rounded-lg py-3 overflow-hidden transition-all duration-300 ${activeDropdown === 'guide' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'}`}>
                  <Link to="/guide" className="block px-6 py-2 text-[11px] font-bold tracking-wide hover:bg-brand-cream hover:text-brand-accent transition-colors">選課指南 (問答)</Link>
                  <Link to="/education" className="block px-6 py-2 text-[11px] font-bold tracking-wide hover:bg-brand-cream hover:text-brand-accent transition-colors">紐西蘭學制</Link>
                </div>
              </div>

              <div 
                className="relative group"
                onMouseEnter={() => setActiveDropdown('programs')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button className="flex items-center gap-1.5 text-[11px] tracking-widest font-black transition-all hover:text-brand-accent py-4">
                  課程方案 <ChevronDown size={10} className={`transition-transform duration-300 ${activeDropdown === 'programs' ? 'rotate-180' : ''}`} />
                </button>
                <div className={`absolute top-full left-0 w-44 bg-white shadow-heavy border border-brand-border rounded-lg py-3 overflow-hidden transition-all duration-300 ${activeDropdown === 'programs' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'}`}>
                  <Link to="/programs" className="block px-6 py-2 text-[11px] font-bold tracking-wide hover:bg-brand-cream hover:text-brand-accent transition-colors">所有方案</Link>
                  <Link to="/programs?type=長期留學" className="block px-6 py-2 text-[11px] font-bold tracking-wide hover:bg-brand-cream hover:text-brand-accent transition-colors">長期留學</Link>
                  <Link to="/programs?type=短期遊學" className="block px-6 py-2 text-[11px] font-bold tracking-wide hover:bg-brand-cream hover:text-brand-accent transition-colors">短期遊學</Link>
                  <Link to="/programs?type=微留學" className="block px-6 py-2 text-[11px] font-bold tracking-wide hover:bg-brand-cream hover:text-brand-accent transition-colors">微留學體驗</Link>
                </div>
              </div>

              <Link to="/articles" className="text-[11px] tracking-widest font-black transition-all hover:text-brand-accent text-brand-ink/70">文章導覽</Link>

              <a href={lineUrl} target="_blank" rel="noopener noreferrer" className="px-5 py-2.5 bg-brand-primary text-white text-[11px] font-black tracking-[0.1em] uppercase rounded-md hover:bg-[#06C755] transition-all flex items-center gap-2 shadow-sm">
                <MessageCircle size={14} /> 加入 LINE 帳號
              </a>
            </div>

            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)} 
              className="lg:hidden relative z-[70] w-10 h-10 flex items-center justify-center text-brand-ink focus:outline-none bg-white/50 backdrop-blur rounded-full shadow-sm"
              aria-label="Toggle Menu"
            >
              {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden fixed inset-0 z-[65] transition-all duration-500 transform ${isMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0 pointer-events-none'}`}>
            <div className="absolute inset-0 bg-brand-cream"></div>
            <div className="relative flex flex-col items-center justify-center h-full space-y-8 p-6">
              <Link to="/" className="text-3xl font-serif font-black text-brand-ink">首頁</Link>
              <Link to="/guide" className="text-3xl font-serif font-black text-brand-ink">選課指南</Link>
              <Link to="/programs" className="text-3xl font-serif font-black text-brand-ink">所有課程</Link>
              <div className="flex flex-col items-center gap-3">
                <Link to="/programs?type=長期留學" className="text-sm font-bold text-brand-sub">長期留學</Link>
                <Link to="/programs?type=短期遊學" className="text-sm font-bold text-brand-sub">短期遊學</Link>
                <Link to="/programs?type=微留學" className="text-sm font-bold text-brand-sub">微留學體驗</Link>
              </div>
              <Link to="/articles" className="text-3xl font-serif font-black text-brand-ink">精選文章</Link>
              <Link to="/contact" className="text-3xl font-serif font-black text-brand-ink">聯絡我們</Link>
              <a href={lineUrl} className="w-full max-w-xs py-4 bg-[#06C755] text-white rounded-xl font-black text-sm tracking-widest shadow-xl flex items-center justify-center gap-2 uppercase">
                <MessageCircle size={20} /> 加入 LINE 帳號
              </a>
            </div>
        </div>
      </nav>

      <main className="flex-grow">{children}</main>

      {/* Floating LINE Button */}
      <a href={lineUrl} target="_blank" rel="noopener noreferrer" className="fixed bottom-6 right-6 z-[60] w-14 h-14 bg-[#06C755] text-white rounded-full shadow-heavy flex items-center justify-center animate-float">
        <MessageCircle size={30} />
      </a>

      <footer className="bg-brand-ink text-white/50">
        <div className="bg-brand-secondary py-12 md:py-20 reveal">
          <div className="container mx-auto px-6 lg:px-12 text-center">
            <h3 className="text-2xl md:text-4xl font-serif font-black text-brand-primary mb-4 md:mb-6">開啟教育藍圖的第一步</h3>
            <p className="text-brand-primary/70 mb-8 md:mb-12 max-w-xl mx-auto font-light text-sm md:text-base">我們理解您的焦慮，讓我們用專業與經驗，為您的孩子媒合最適合的成長環境。</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/booking" className="px-10 py-4 bg-brand-primary text-white rounded-xl font-black text-[11px] tracking-widest uppercase hover:bg-brand-ink transition-all shadow-xl flex items-center justify-center gap-3">
                預約諮詢 <ArrowRight size={18} />
              </Link>
              <a href={lineUrl} target="_blank" rel="noopener noreferrer" className="px-10 py-4 bg-[#06C755] text-white rounded-xl font-black text-[11px] tracking-widest uppercase flex items-center justify-center gap-3">
                <MessageCircle size={18} /> 加入 LINE 帳號
              </a>
            </div>
          </div>
        </div>

        <div className="py-12 md:py-20 container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-12 mb-10">
            <div className="md:col-span-2 space-y-4">
               <div className="flex items-center gap-3">
                  <img src={logoUrl} className="w-7 h-7 invert opacity-60" />
                  <h2 className="text-lg font-serif font-black text-white">點石遊學國際</h2>
               </div>
               <p className="text-xs font-light opacity-60 leading-relaxed max-w-sm">
                 致力於提供最具深度與溫度的教育媒合服務。不只是代辦，更是您在教育規劃過程中的專業引路人。
               </p>
            </div>
            <div>
              <h4 className="text-brand-secondary text-[10px] tracking-[0.4em] uppercase font-black mb-4">選單導航</h4>
              <ul className="space-y-2 text-[11px] font-medium">
                <li><Link to="/articles" className="hover:text-white">文章導覽</Link></li>
                <li><Link to="/guide" className="hover:text-white">選課指南</Link></li>
                <li><Link to="/programs" className="hover:text-white">課程列表</Link></li>
                <li><Link to="/contact" className="hover:text-white">聯絡我們</Link></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-brand-secondary text-[10px] tracking-[0.4em] uppercase font-black mb-4">聯絡資訊</h4>
              <p className="text-[11px] leading-relaxed">桃園市中壢區慈惠三街106號3樓</p>
              <p className="text-[11px] text-[#06C755] font-bold">LINE ID: @647loexf</p>
            </div>
          </div>
          <div className="pt-6 border-t border-white/5 text-[9px] tracking-[0.3em] uppercase text-center font-light opacity-20">
             © 2024 Lumen Stone Education. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;

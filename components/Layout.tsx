
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, MessageCircle, ArrowRight } from 'lucide-react';

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
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const logoUrl = "https://pub-eab9e45abd56499794188fcd886beee3.r2.dev/logo/logo.png";
  const lineUrl = "https://line.me/ti/p/@647loexf";

  const navbarClasses = scrolled 
    ? 'bg-brand-cream/95 backdrop-blur-xl text-brand-ink shadow-sm h-14 md:h-16' 
    : 'bg-transparent text-brand-ink h-20 md:h-24';

  return (
    <div className="flex flex-col min-h-screen bg-brand-cream text-brand-ink font-sans">
      
      {/* Navbar */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 flex items-center ${navbarClasses}`}>
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex justify-between items-center">
            
            <Link to="/" className="flex items-center gap-3 group" onClick={() => setIsMenuOpen(false)}>
               <div className={`transition-all duration-500 ${scrolled ? 'h-7 w-7 md:h-8 md:w-8' : 'h-10 w-10 md:h-12 md:w-12'} group-hover:scale-110 grayscale brightness-0 opacity-80`}>
                  <img src={logoUrl} alt="Lumen Stone Logo" className="w-full h-full object-contain" />
               </div>
               <div className="flex flex-col">
                 <span className={`font-serif font-black tracking-tighter transition-all ${scrolled ? 'text-sm md:text-base' : 'text-base md:text-lg'}`}>點石遊學國際</span>
                 <span className="text-[9px] tracking-[0.2em] uppercase font-bold opacity-30">Lumen Stone Education</span>
               </div>
            </Link>

            <div className="hidden lg:flex items-center space-x-7">
              <div 
                className="relative group"
                onMouseEnter={() => setActiveDropdown('guide')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button className="flex items-center gap-1.5 text-[12px] tracking-widest font-black transition-all hover:text-brand-accent py-4">
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
                <button className="flex items-center gap-1.5 text-[12px] tracking-widest font-black transition-all hover:text-brand-accent py-4">
                  課程列表 <ChevronDown size={10} className={`transition-transform duration-300 ${activeDropdown === 'programs' ? 'rotate-180' : ''}`} />
                </button>
                <div className={`absolute top-full left-0 w-44 bg-white shadow-heavy border border-brand-border rounded-lg py-3 overflow-hidden transition-all duration-300 ${activeDropdown === 'programs' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'}`}>
                  <Link to="/programs" className="block px-6 py-2 text-[11px] font-bold tracking-wide hover:bg-brand-cream hover:text-brand-accent transition-colors">所有方案</Link>
                  <div className="h-[1px] bg-brand-border mx-4 my-1 opacity-50"></div>
                  <Link to="/programs?type=Study Abroad" className="block px-6 py-2 text-[11px] font-bold tracking-wide hover:bg-brand-cream hover:text-brand-accent transition-colors">長期留學</Link>
                  <Link to="/programs?type=Micro Study" className="block px-6 py-2 text-[11px] font-bold tracking-wide hover:bg-brand-cream hover:text-brand-accent transition-colors">微留學體驗</Link>
                </div>
              </div>

              <Link to="/articles" className="text-[12px] tracking-widest font-black transition-all hover:text-brand-accent text-brand-ink/70">文章導覽</Link>

              <a href={lineUrl} target="_blank" rel="noopener noreferrer" className="px-5 py-2.5 bg-brand-primary text-white text-[11px] font-black tracking-[0.1em] uppercase rounded-md hover:bg-[#06C755] transition-all shadow-md flex items-center gap-2">
                <MessageCircle size={14} /> 加入 LINE 帳號
              </a>
            </div>

            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden text-brand-ink">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-40 bg-brand-cream pt-32 flex flex-col items-center overflow-y-auto animate-fade-in">
            <div className="flex flex-col items-center space-y-7 pb-20">
              <Link to="/guide" onClick={() => setIsMenuOpen(false)} className="text-2xl font-serif font-black text-brand-ink">選課指南</Link>
              <Link to="/education" onClick={() => setIsMenuOpen(false)} className="text-2xl font-serif font-black text-brand-ink">紐西蘭學制</Link>
              <div className="h-[1px] w-12 bg-brand-border"></div>
              <Link to="/programs" onClick={() => setIsMenuOpen(false)} className="text-2xl font-serif font-black text-brand-ink">課程列表</Link>
              <Link to="/articles" onClick={() => setIsMenuOpen(false)} className="text-2xl font-serif font-black text-brand-ink">文章導覽</Link>
              <a href={lineUrl} onClick={() => setIsMenuOpen(false)} className="px-10 py-3 bg-[#06C755] text-white rounded-lg font-black text-sm tracking-widest shadow-xl flex items-center gap-2 uppercase">
                <MessageCircle size={18} /> 加入 LINE 帳號
              </a>
            </div>
          </div>
        )}
      </nav>

      <main className="flex-grow">{children}</main>

      {/* Floating LINE Button */}
      <a 
        href={lineUrl} 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 z-[60] w-14 h-14 bg-[#06C755] text-white rounded-full shadow-heavy flex items-center justify-center hover:scale-110 transition-transform animate-bounce-slow group"
      >
        <MessageCircle size={30} />
        <span className="absolute right-full mr-4 bg-white text-brand-ink px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest shadow-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-brand-border">
          加入 LINE 帳號 @647loexf
        </span>
      </a>

      <footer className="bg-brand-ink text-white/50">
        {/* Footer CTA Section */}
        <div className="bg-brand-secondary py-16">
          <div className="container mx-auto px-6 lg:px-12 text-center">
            <h3 className="text-2xl md:text-4xl font-serif font-black text-brand-primary mb-6">準備好開啟孩子的教育藍圖了嗎？</h3>
            <p className="text-brand-primary/70 mb-10 max-w-2xl mx-auto font-light leading-relaxed">專業顧問將根據孩子的學業狀況與性格特質，量身打造最適合的紐西蘭留遊學路徑。</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/booking" className="px-10 py-4 bg-brand-primary text-white rounded-xl font-black text-[12px] tracking-[0.2em] uppercase hover:bg-brand-ink transition-all shadow-xl flex items-center justify-center gap-3">
                預約一對一諮詢 <ArrowRight size={18} />
              </Link>
              <a href={lineUrl} target="_blank" rel="noopener noreferrer" className="px-10 py-4 bg-[#06C755] text-white rounded-xl font-black text-[12px] tracking-[0.2em] uppercase hover:opacity-90 transition-all shadow-xl flex items-center justify-center gap-3">
                <MessageCircle size={18} /> 加入 LINE 帳號
              </a>
            </div>
          </div>
        </div>

        <div className="py-20 container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-14">
            <div className="md:col-span-2 space-y-5">
               <div className="flex items-center gap-3">
                  <img src={logoUrl} className="w-8 h-8 object-contain invert opacity-60" />
                  <div className="flex flex-col">
                    <h2 className="text-lg font-serif font-black text-white">點石遊學國際</h2>
                    <span className="text-[8px] tracking-[0.3em] uppercase opacity-40">Lumen Stone Education</span>
                  </div>
               </div>
               <p className="text-xs max-w-sm leading-relaxed font-light opacity-60">
                 致力於提供最具深度與溫度的教育媒合服務。我們不只是代辦，更是您在探索世界過程中的專業策展人。
               </p>
            </div>
            <div>
              <h4 className="text-brand-secondary text-[10px] tracking-[0.4em] uppercase font-black mb-5">Explore</h4>
              <ul className="space-y-2.5 text-[12px] font-medium">
                <li><Link to="/articles" className="hover:text-white transition-colors">文章導覽</Link></li>
                <li><Link to="/guide" className="hover:text-white transition-colors">選課指南</Link></li>
                <li><Link to="/programs" className="hover:text-white transition-colors">課程列表</Link></li>
                <li><Link to="/contact" className="hover:text-white transition-colors">聯絡我們</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-brand-secondary text-[10px] tracking-[0.4em] uppercase font-black mb-5">Contact</h4>
              <ul className="space-y-2.5 text-[12px] font-medium">
                <li className="flex items-center gap-2 font-light">320桃園市中壢區慈惠三街106號3樓</li>
                <li className="flex items-center gap-2 font-light text-brand-secondary">info@lumenstone-global.com</li>
                <li className="flex items-center gap-2 font-light text-[#06C755] font-bold">LINE ID: @647loexf</li>
              </ul>
            </div>
          </div>
          <div className="pt-6 border-t border-white/5 text-[9px] tracking-[0.3em] uppercase text-center md:text-left font-light opacity-20">
             © 2024 Lumen Stone Education. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;

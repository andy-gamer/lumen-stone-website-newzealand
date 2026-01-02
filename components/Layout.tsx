
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';

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
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const logoUrl = "https://pub-eab9e45abd56499794188fcd886beee3.r2.dev/logo/logo.png";

  const navbarClasses = scrolled 
    ? 'bg-brand-cream/90 backdrop-blur-xl text-brand-ink shadow-sm h-14 md:h-16' 
    : 'bg-transparent text-brand-ink h-16 md:h-20';

  return (
    <div className="flex flex-col min-h-screen bg-brand-cream text-brand-ink font-sans">
      
      {/* Navbar */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 flex items-center ${navbarClasses}`}>
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex justify-between items-center">
            
            <Link to="/" className="flex items-center gap-2.5 group" onClick={() => setIsMenuOpen(false)}>
               <div className={`transition-all duration-500 ${scrolled ? 'h-6 w-6 md:h-7 md:w-7' : 'h-8 w-8 md:h-9 md:w-9'} group-hover:scale-110 grayscale brightness-0 opacity-80`}>
                  <img src={logoUrl} alt="Lumen Stone Logo" className="w-full h-full object-contain" />
               </div>
               <div className="flex flex-col">
                 <span className={`font-serif font-black tracking-tight transition-all ${scrolled ? 'text-sm md:text-base' : 'text-base md:text-lg'}`}>點石遊學國際</span>
                 <span className="text-[8px] tracking-[0.2em] uppercase font-bold opacity-30">Lumen Stone Education</span>
               </div>
            </Link>

            <div className="hidden lg:flex items-center space-x-6">
              <div 
                className="relative group"
                onMouseEnter={() => setActiveDropdown('guide')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button className="flex items-center gap-1 text-[11px] tracking-[0.2em] font-black transition-all hover:text-brand-accent py-4 uppercase">
                  如何選課？ <ChevronDown size={8} className={`transition-transform duration-300 ${activeDropdown === 'guide' ? 'rotate-180' : ''}`} />
                </button>
                <div className={`absolute top-full left-0 w-40 bg-white shadow-heavy border border-brand-border rounded-lg py-2.5 overflow-hidden transition-all duration-300 ${activeDropdown === 'guide' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'}`}>
                  <Link to="/guide" className="block px-5 py-2 text-[10px] font-bold tracking-wider hover:bg-brand-cream hover:text-brand-accent transition-colors uppercase">選課指南</Link>
                  <Link to="/education" className="block px-5 py-2 text-[10px] font-bold tracking-wider hover:bg-brand-cream hover:text-brand-accent transition-colors uppercase">紐西蘭學制</Link>
                </div>
              </div>

              <div 
                className="relative group"
                onMouseEnter={() => setActiveDropdown('programs')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button className="flex items-center gap-1 text-[11px] tracking-[0.2em] font-black transition-all hover:text-brand-accent py-4 uppercase">
                  課程列表 <ChevronDown size={8} className={`transition-transform duration-300 ${activeDropdown === 'programs' ? 'rotate-180' : ''}`} />
                </button>
                <div className={`absolute top-full left-0 w-40 bg-white shadow-heavy border border-brand-border rounded-lg py-2.5 overflow-hidden transition-all duration-300 ${activeDropdown === 'programs' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'}`}>
                  <Link to="/programs" className="block px-5 py-2 text-[10px] font-bold tracking-wider hover:bg-brand-cream hover:text-brand-accent transition-colors uppercase">所有方案</Link>
                  <div className="h-[1px] bg-brand-border mx-3 my-1 opacity-50"></div>
                  <Link to="/programs?type=Study Abroad" className="block px-5 py-2 text-[10px] font-bold tracking-wider hover:bg-brand-cream hover:text-brand-accent transition-colors uppercase">長期留學</Link>
                  <Link to="/programs?type=Language School" className="block px-5 py-2 text-[10px] font-bold tracking-wider hover:bg-brand-cream hover:text-brand-accent transition-colors uppercase">密集遊學</Link>
                  <Link to="/programs?type=Micro Study" className="block px-5 py-2 text-[10px] font-bold tracking-wider hover:bg-brand-cream hover:text-brand-accent transition-colors uppercase">微留學體驗</Link>
                </div>
              </div>

              <Link to="/articles" className="text-[11px] tracking-[0.2em] font-black transition-all hover:text-brand-accent text-brand-ink/70 uppercase">文章導覽</Link>

              <Link to="/booking" className="px-5 py-2 bg-brand-primary text-white text-[10px] font-black tracking-[0.2em] uppercase rounded-md hover:bg-brand-ink transition-all shadow-sm">
                Contact
              </Link>
            </div>

            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden text-brand-ink">
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-40 bg-brand-cream pt-24 flex flex-col items-center overflow-y-auto animate-fade-in">
            <div className="flex flex-col items-center space-y-6 pb-20">
              <Link to="/guide" onClick={() => setIsMenuOpen(false)} className="text-xl font-serif font-black text-brand-ink">選課指南</Link>
              <Link to="/education" onClick={() => setIsMenuOpen(false)} className="text-xl font-serif font-black text-brand-ink">紐西蘭學制</Link>
              <div className="h-[1px] w-10 bg-brand-border"></div>
              <Link to="/programs" onClick={() => setIsMenuOpen(false)} className="text-xl font-serif font-black text-brand-ink">課程列表</Link>
              <Link to="/articles" onClick={() => setIsMenuOpen(false)} className="text-xl font-serif font-black text-brand-ink">文章導覽</Link>
              <Link to="/booking" onClick={() => setIsMenuOpen(false)} className="px-8 py-2.5 bg-brand-primary text-white rounded-lg font-black text-xs tracking-widest uppercase shadow-xl">CONTACT</Link>
            </div>
          </div>
        )}
      </nav>

      <main className="flex-grow">{children}</main>

      <footer className="py-12 bg-brand-ink text-white/50">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
            <div className="md:col-span-2 space-y-4">
               <div className="flex items-center gap-2">
                  <img src={logoUrl} className="w-6 h-6 object-contain invert opacity-50" />
                  <div className="flex flex-col">
                    <h2 className="text-base font-serif font-black text-white">點石遊學國際</h2>
                    <span className="text-[7px] tracking-[0.3em] uppercase opacity-30">Lumen Stone Education</span>
                  </div>
               </div>
               <p className="text-[11px] max-w-sm leading-relaxed font-light opacity-50">
                 致力於提供最具深度與溫度的教育媒合服務。我們不只是代辦，更是您在探索世界過程中的專業策展人。
               </p>
            </div>
            <div>
              <h4 className="text-brand-secondary text-[9px] tracking-[0.4em] uppercase font-black mb-4">Explore</h4>
              <ul className="space-y-2 text-[11px] font-medium">
                <li><Link to="/articles" className="hover:text-white transition-colors">文章導覽</Link></li>
                <li><Link to="/guide" className="hover:text-white transition-colors">選課指南</Link></li>
                <li><Link to="/programs" className="hover:text-white transition-colors">課程列表</Link></li>
                <li><Link to="/about" className="hover:text-white transition-colors">品牌故事</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-brand-secondary text-[9px] tracking-[0.4em] uppercase font-black mb-4">Contact</h4>
              <ul className="space-y-2 text-[11px] font-medium">
                <li className="flex items-center gap-2 font-light">台北市信義區信義路五段</li>
                <li className="flex items-center gap-2 font-light">info@lumenstone.edu</li>
                <li className="flex items-center gap-2 font-light">02-2345-6789</li>
              </ul>
            </div>
          </div>
          <div className="pt-6 border-t border-white/5 text-[8px] tracking-[0.3em] uppercase text-center md:text-left font-light opacity-20">
             © 2024 Lumen Stone Education. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;

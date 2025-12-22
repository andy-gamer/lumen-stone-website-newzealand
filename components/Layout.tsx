
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, MapPin, Phone, Mail, Sparkles } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: '首頁', path: '/' },
    { name: '選課指南', path: '/guide' },
    { name: '遊學行程', path: '/programs' },
    { name: '學員故事', path: '/success' },
    { name: '關於點石', path: '/about' },
  ];

  return (
    <div className="flex flex-col min-h-screen selection:bg-brand-sage selection:text-white">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-brand-cream/80 backdrop-blur-xl border-b border-brand-sage/5">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex justify-between items-center h-20 md:h-24">
            
            {/* Logo Section */}
            <Link to="/" className="flex items-center gap-3 md:gap-4 group" onClick={() => setIsMenuOpen(false)}>
               <div className="relative shrink-0">
                 <div className="w-10 h-10 md:w-14 md:h-14 bg-brand-sage text-white rounded-2xl flex items-center justify-center shadow-lg transform group-hover:rotate-6 transition-transform duration-500">
                    <Sparkles className="w-6 h-6 md:w-8 md:h-8" />
                 </div>
                 <div className="absolute -top-1 -right-1 w-3 h-3 bg-brand-accent rounded-full border-2 border-brand-cream"></div>
               </div>
               
               <div className="flex flex-col text-brand-ink">
                 <div className="flex items-center gap-1.5">
                   <span className="text-xl md:text-2xl font-serif font-bold tracking-tight">點石留遊學</span>
                 </div>
                 <div className="flex items-center gap-2">
                    <span className="text-[8px] md:text-[10px] tracking-[0.4em] md:tracking-[0.6em] uppercase text-brand-accent font-black">Lumen Stone</span>
                    <div className="h-[1px] w-4 md:w-8 bg-brand-accent/30 hidden sm:block"></div>
                 </div>
               </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center space-x-10">
              {navLinks.map(link => (
                <Link 
                  key={link.path} 
                  to={link.path} 
                  className={`text-[13px] tracking-[0.2em] font-medium transition-all relative group/link ${location.pathname === link.path ? 'text-brand-sage font-bold' : 'text-brand-sub hover:text-brand-sage'}`}
                >
                  {link.name}
                  <span className={`absolute -bottom-1 left-0 h-[2px] bg-brand-accent transition-all duration-300 ${location.pathname === link.path ? 'w-full' : 'w-0 group-hover/link:w-full'}`}></span>
                </Link>
              ))}
              <Link to="/booking" className="px-8 py-2.5 bg-brand-ink text-white text-[11px] font-bold tracking-[0.3em] hover:bg-brand-sage transition-all rounded-full shadow-gold uppercase border border-white/10">
                諮詢預約
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden p-2 text-brand-ink">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden fixed inset-0 bg-brand-cream z-40 pt-24 px-6 flex flex-col items-center">
            <div className="w-full flex flex-col items-center space-y-8 mt-12">
              {navLinks.map((link, idx) => (
                <Link 
                  key={link.path} 
                  to={link.path} 
                  onClick={() => setIsMenuOpen(false)} 
                  className="text-4xl font-serif text-brand-ink hover:text-brand-accent transition-colors"
                >
                  {link.name}
                </Link>
              ))}
              <Link to="/booking" onClick={() => setIsMenuOpen(false)} className="w-full max-w-xs text-center px-12 py-5 bg-brand-sage text-white rounded-full font-bold shadow-xl">
                立即預約諮詢
              </Link>
            </div>
          </div>
        )}
      </nav>

      <main className="flex-grow pt-20 md:pt-24">{children}</main>

      {/* Footer */}
      <footer className="bg-brand-ink text-brand-cream py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-sage/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20 border-b border-white/5 pb-20">
            <div className="md:col-span-2 space-y-8">
              <div className="flex items-center gap-4">
                 <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center border border-white/10">
                    <Sparkles className="text-brand-accent" size={24} />
                 </div>
                 <h2 className="text-3xl font-serif font-bold tracking-tight">Lumen Stone</h2>
              </div>
              <p className="text-brand-light/50 text-base leading-loose max-w-md font-light italic">
                「在不確定的時代中，我們陪伴每一個家庭，<br/>為孩子尋找最純淨、最確定的成長路徑。」
              </p>
            </div>
            <div>
              <h4 className="text-brand-accent text-[10px] tracking-[0.4em] font-bold uppercase mb-10 opacity-80">Directory</h4>
              <div className="space-y-4 text-sm font-light">
                 {navLinks.map(link => (
                   <Link key={link.path} to={link.path} className="block text-brand-light/60 hover:text-brand-accent transition-colors">{link.name}</Link>
                 ))}
              </div>
            </div>
            <div>
              <h4 className="text-brand-accent text-[10px] tracking-[0.4em] font-bold uppercase mb-10 opacity-80">Connect</h4>
              <div className="space-y-5 text-sm font-light">
                 <p className="flex items-start gap-4 text-brand-light/60"><MapPin size={18} className="text-brand-accent mt-0.5 shrink-0"/> 台北市信義區信義路五段7號</p>
                 <p className="flex items-center gap-4 text-brand-light/60"><Phone size={18} className="text-brand-accent shrink-0"/> 02-2345-6789</p>
                 <p className="flex items-center gap-4 text-brand-light/60"><Mail size={18} className="text-brand-accent shrink-0"/> info@lumenstone.edu</p>
              </div>
            </div>
          </div>
          <div className="text-[10px] tracking-[0.5em] text-center opacity-30 uppercase">
             © 2024 Lumen Stone Education International.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;

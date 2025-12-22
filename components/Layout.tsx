
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, MapPin, Phone, Mail } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: '首頁', path: '/' },
    { name: '紐西蘭學制', path: '/guide' },
    { name: '精選行程', path: '/programs' },
    { name: '關於點石', path: '/about' },
  ];

  return (
    <div className="flex flex-col min-h-screen selection:bg-brand-sage selection:text-white">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-brand-cream/90 backdrop-blur-xl border-b border-brand-sage/5">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex justify-between items-center h-20 md:h-24">
            
            {/* Logo Section */}
            <Link to="/" className="flex items-center gap-4 group" onClick={() => setIsMenuOpen(false)}>
               <div className="flex flex-col text-brand-ink">
                 <span className="text-2xl font-serif font-bold tracking-tight">點石留遊學</span>
                 <span className="text-[9px] tracking-[0.6em] uppercase text-brand-accent font-bold">Lumen Stone</span>
               </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center space-x-12">
              {navLinks.map(link => (
                <Link 
                  key={link.path} 
                  to={link.path} 
                  className={`text-[13px] tracking-[0.2em] font-bold transition-all relative group/link uppercase ${location.pathname === link.path ? 'text-brand-sage' : 'text-brand-sub hover:text-brand-sage'}`}
                >
                  {link.name}
                  <span className={`absolute -bottom-2 left-0 h-[2px] bg-brand-sage transition-all duration-300 ${location.pathname === link.path ? 'w-full' : 'w-0 group-hover/link:w-full'}`}></span>
                </Link>
              ))}
              <Link to="/booking" className="px-10 py-3 bg-brand-ink text-white text-[11px] font-bold tracking-[0.3em] hover:bg-brand-sage transition-all rounded-full shadow-premium uppercase">
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
            <div className="w-full flex flex-col items-center space-y-12 mt-12">
              {navLinks.map((link) => (
                <Link 
                  key={link.path} 
                  to={link.path} 
                  onClick={() => setIsMenuOpen(false)} 
                  className="text-4xl font-serif text-brand-ink hover:text-brand-sage transition-colors"
                >
                  {link.name}
                </Link>
              ))}
              <Link to="/booking" onClick={() => setIsMenuOpen(false)} className="w-full max-w-xs text-center px-12 py-5 bg-brand-ink text-white rounded-full font-bold shadow-xl uppercase tracking-widest text-sm">
                立即預約諮詢
              </Link>
            </div>
          </div>
        )}
      </nav>

      <main className="flex-grow pt-20 md:pt-24">{children}</main>

      {/* Footer */}
      <footer className="bg-brand-ink text-brand-cream py-24">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20 border-b border-white/5 pb-20">
            <div className="md:col-span-2 space-y-8">
              <div className="flex flex-col">
                 <h2 className="text-3xl font-serif font-bold tracking-tight">Lumen Stone</h2>
                 <span className="text-[10px] tracking-[0.4em] uppercase text-brand-accent font-bold mt-1">Education International</span>
              </div>
              <p className="text-brand-light/40 text-base leading-loose max-w-md font-light italic">
                「在不確定的時代中，我們陪伴每一個家庭，<br/>為孩子尋找最純淨、最確定的成長路徑。」
              </p>
            </div>
            <div>
              <h4 className="text-brand-accent text-[10px] tracking-[0.4em] font-bold uppercase mb-10 opacity-80">Directory</h4>
              <div className="space-y-4 text-sm font-light">
                 {navLinks.map(link => (
                   <Link key={link.path} to={link.path} className="block text-brand-light/60 hover:text-brand-accent transition-colors">{link.name}</Link>
                 ))}
                 <Link to="/faq" className="block text-brand-light/60 hover:text-brand-accent transition-colors">常見問題</Link>
              </div>
            </div>
            <div>
              <h4 className="text-brand-accent text-[10px] tracking-[0.4em] font-bold uppercase mb-10 opacity-80">Office</h4>
              <div className="space-y-5 text-sm font-light">
                 <p className="flex items-start gap-4 text-brand-light/60"><MapPin size={18} className="text-brand-accent mt-0.5 shrink-0"/> 台北市信義區信義路五段7號</p>
                 <p className="flex items-center gap-4 text-brand-light/60"><Phone size={18} className="text-brand-accent shrink-0"/> 02-2345-6789</p>
                 <p className="flex items-center gap-4 text-brand-light/60"><Mail size={18} className="text-brand-accent shrink-0"/> info@lumenstone.edu</p>
              </div>
            </div>
          </div>
          <div className="text-[10px] tracking-[0.5em] text-center opacity-20 uppercase">
             © 2024 Lumen Stone Education International.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;

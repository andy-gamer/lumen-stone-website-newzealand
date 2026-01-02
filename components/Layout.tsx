import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, MapPin, Phone, Mail } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: '選課指南', path: '/guide' },
    { name: '遊學行', path: '/programs' },
    { name: '紐西蘭百科', path: '/nz-au' },
    { name: '學員見證', path: '/success' },
    { name: '全站地圖', path: '/sitemap' },
  ];

  const logoUrl = "https://pub-eab9e45abd56499794188fcd886beee3.r2.dev/logo/logo.png";

  const navbarClasses = scrolled 
    ? 'bg-brand-cream/80 backdrop-blur-lg text-brand-primary shadow-sm h-20' 
    : 'bg-transparent text-brand-primary h-28';

  return (
    <div className="flex flex-col min-h-screen bg-brand-cream text-brand-ink font-sans">
      
      {/* Navbar */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 flex items-center ${navbarClasses}`}>
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex justify-between items-center">
            
            <Link to="/" className="flex items-center gap-4 group" onClick={() => setIsMenuOpen(false)}>
               <div className={`transition-all duration-500 ${scrolled ? 'h-12 w-12' : 'h-16 w-16'} group-hover:scale-110 grayscale brightness-0`}>
                  <img src={logoUrl} alt="Lumen Stone Logo" className="w-full h-full object-contain" />
               </div>
               <div className="flex flex-col">
                 <span className={`font-serif font-black tracking-tighter transition-all ${scrolled ? 'text-lg' : 'text-xl'}`}>點石遊學國際</span>
                 <span className="text-[7px] tracking-[0.4em] uppercase font-bold opacity-40">Lumen Stone Education</span>
               </div>
            </Link>

            <div className="hidden lg:flex items-center space-x-10">
              {navLinks.map(link => (
                <Link 
                  key={link.path} 
                  to={link.path} 
                  className={`text-[10px] tracking-[0.2em] uppercase font-bold transition-all hover:text-brand-accent ${
                    location.pathname === link.path ? 'text-brand-accent' : 'text-brand-primary/70'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <Link to="/booking" className="px-8 py-3 bg-brand-primary text-white text-[10px] font-extrabold tracking-[0.2em] uppercase rounded-full hover:bg-brand-accent transition-all">
                Contact
              </Link>
            </div>

            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden text-brand-primary">
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-40 bg-brand-cream pt-32 flex flex-col items-center">
            <div className="flex flex-col items-center space-y-8">
              {navLinks.map(link => (
                <Link key={link.path} to={link.path} onClick={() => setIsMenuOpen(false)} className="text-3xl font-serif font-bold text-brand-primary">{link.name}</Link>
              ))}
              <Link to="/booking" onClick={() => setIsMenuOpen(false)} className="px-12 py-4 bg-brand-primary text-white rounded-full font-bold">CONTACT</Link>
            </div>
          </div>
        )}
      </nav>

      <main className="flex-grow">{children}</main>

      <footer className="py-24 bg-brand-primary text-brand-cream/60">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="md:col-span-2 space-y-6">
               <div className="flex items-center gap-4">
                  <img src={logoUrl} className="w-12 h-12 object-contain invert opacity-50" />
                  <h2 className="text-2xl font-serif font-bold text-white">點石遊學國際</h2>
               </div>
               <p className="text-sm max-w-sm leading-relaxed">
                 專注於紐西蘭精緻教育。在自然中尋找教育的真諦。<br/>
                 不同於傳統代辦的流水線，我們雕琢每一顆原石。
               </p>
            </div>
            <div>
              <h4 className="text-brand-secondary text-[10px] tracking-[0.4em] uppercase font-bold mb-6">Explore</h4>
              <ul className="space-y-3 text-xs">
                <li><Link to="/guide" className="hover:text-white transition-colors">選課指南</Link></li>
                <li><Link to="/programs" className="hover:text-white transition-colors">遊學方案</Link></li>
                <li><Link to="/sitemap" className="hover:text-white transition-colors">全站地圖</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-brand-secondary text-[10px] tracking-[0.4em] uppercase font-bold mb-6">Contact</h4>
              <ul className="space-y-3 text-xs">
                <li className="flex items-center gap-2"><MapPin size={14}/> 台北市信義區信義路五段</li>
                <li className="flex items-center gap-2"><Mail size={14}/> info@lumenstone.edu</li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-white/5 text-[9px] tracking-[0.4em] uppercase text-center md:text-left">
             © 2024 Lumen Stone Education. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
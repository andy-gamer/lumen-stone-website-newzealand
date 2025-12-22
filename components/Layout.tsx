import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Camera, MapPin, Phone, Mail } from 'lucide-react';
import html2canvas from 'html2canvas';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const handleScreenshot = async () => {
    const element = document.body;
    try {
        const canvas = await html2canvas(element, { useCORS: true, scale: 1 });
        const data = canvas.toDataURL('image/jpeg', 0.8);
        const link = document.createElement('a');
        link.href = data;
        link.download = `lumen-stone-${Date.now()}.jpg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } catch (err) {
        console.error("Screenshot failed", err);
    }
  };

  const navLinks = [
    { name: '如何選擇', path: '/guide' },
    { name: '留學', path: '/programs?type=Study Abroad' },
    { name: '遊學', path: '/programs?type=Language School' },
    { name: '微留學', path: '/programs?type=Micro Study' },
    { name: '紐西蘭生活', path: '/nz-au' },
    { name: '成功案例', path: '/success' },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-brand-cream selection:bg-brand-sage selection:text-white">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-brand-cream/90 backdrop-blur-md border-b border-brand-sage/10">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex justify-between items-center h-20 md:h-24">
            
            {/* Logo */}
            <Link to="/" className="flex flex-col group" onClick={() => setIsMenuOpen(false)}>
               <div className="flex items-center gap-2">
                 <span className="text-xl md:text-2xl font-serif font-bold text-brand-ink tracking-tight">點石遊學國際</span>
                 <div className="w-1.5 h-1.5 rounded-full bg-brand-accent"></div>
               </div>
               <span className="text-[10px] tracking-[0.3em] uppercase text-brand-sage font-medium">Lumen Stone Education</span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center space-x-8">
              {navLinks.map(link => (
                <Link 
                  key={link.path} 
                  to={link.path} 
                  className={`text-sm tracking-widest font-medium transition-all ${location.pathname + location.search === link.path ? 'text-brand-sage font-bold border-b-2 border-brand-sage' : 'text-brand-sub hover:text-brand-sage'}`}
                >
                  {link.name}
                </Link>
              ))}
              <Link to="/booking" className="px-6 py-2.5 bg-brand-sage text-white text-xs tracking-widest hover:bg-brand-ink transition-all rounded-full shadow-hand-drawn">
                免費諮詢
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden text-brand-ink">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden fixed inset-0 bg-brand-cream z-40 pt-24 animate-fade-in flex flex-col items-center">
            <div className="flex flex-col items-center space-y-8">
              {navLinks.map(link => (
                <Link key={link.path} to={link.path} onClick={() => setIsMenuOpen(false)} className="text-2xl font-serif text-brand-ink">{link.name}</Link>
              ))}
              <Link to="/booking" onClick={() => setIsMenuOpen(false)} className="px-10 py-3 bg-brand-sage text-white rounded-full">免費諮詢</Link>
            </div>
          </div>
        )}
      </nav>

      <main className="flex-grow pt-20 md:pt-24">{children}</main>

      {/* Footer */}
      <footer className="bg-brand-ink text-brand-cream py-20 mt-20">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="md:col-span-2">
              <h2 className="text-3xl font-serif font-bold mb-6">點石遊學國際</h2>
              <p className="text-brand-light/60 text-sm leading-loose max-w-sm mb-8">
                讓出國不是壓力，而是剛剛好的開始。我們陪伴第一次出境的你，從釐清方向到安心抵達。
              </p>
              <div className="flex gap-4">
                 <div className="w-10 h-10 rounded-full bg-brand-paper/10 flex items-center justify-center hover:bg-brand-sage transition-colors cursor-pointer"><Mail size={18}/></div>
                 <div className="w-10 h-10 rounded-full bg-brand-paper/10 flex items-center justify-center hover:bg-brand-sage transition-colors cursor-pointer"><Phone size={18}/></div>
              </div>
            </div>
            <div>
              <h4 className="text-brand-accent text-xs tracking-[0.2em] uppercase mb-8">服務項目</h4>
              <div className="space-y-4 text-sm opacity-70">
                 <Link to="/guide" className="block hover:text-brand-sage">如何選擇</Link>
                 <Link to="/programs" className="block hover:text-brand-sage">留學方案</Link>
                 <Link to="/programs" className="block hover:text-brand-sage">遊學方案</Link>
                 <Link to="/programs" className="block hover:text-brand-sage">微留學體驗</Link>
              </div>
            </div>
            <div>
              <h4 className="text-brand-accent text-xs tracking-[0.2em] uppercase mb-8">聯絡我們</h4>
              <div className="space-y-4 text-sm opacity-70">
                 <p className="flex items-center gap-3"><MapPin size={16}/> 台北市信義區信義路五段7號</p>
                 <p className="flex items-center gap-3"><Phone size={16}/> 02-2345-6789</p>
                 <p className="flex items-center gap-3"><Mail size={16}/> info@lumenstone.edu</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5 opacity-30 text-[10px] tracking-widest">
             <p>© 2024 Lumen Stone International Study Abroad.</p>
             <button onClick={handleScreenshot} className="mt-4 md:mt-0 flex items-center gap-2 hover:opacity-100 transition-opacity">
                <Camera size={12} /> 存為筆記
             </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
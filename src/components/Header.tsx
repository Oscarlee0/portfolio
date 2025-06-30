import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <>
      {/* Desktop Header - Centered */}
      <header className={`hidden md:block fixed top-4 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-xl' 
          : 'bg-white/90 backdrop-blur-sm shadow-lg'
      } rounded-full px-6 py-3`}>
        <nav className="max-w-2xl mx-auto">
          <div className="flex items-center justify-center">
            <div className="flex items-center space-x-8">
              <button
                onClick={() => scrollToSection('hero')}
                className="text-lg font-bold text-gray-800 hover:text-purple-600 transition-colors duration-200 focus:outline-none focus:ring-0"
              >
                Oscar.Dev
              </button>
              <button
                onClick={() => scrollToSection('projects')}
                className="text-gray-700 hover:text-purple-600 transition-colors duration-200 font-medium focus:outline-none focus:ring-0"
              >
                Projects
              </button>
              <button
                onClick={() => scrollToSection('skills')}
                className="text-gray-700 hover:text-purple-600 transition-colors duration-200 font-medium focus:outline-none focus:ring-0"
              >
                Skills
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="text-gray-700 hover:text-purple-600 transition-colors duration-200 font-medium focus:outline-none focus:ring-0"
              >
                Contact
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Header - Wrapped Navbar */}
      <header className="md:hidden fixed top-4 left-4 right-4 z-50">
        <div className={`transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-md shadow-xl' 
            : 'bg-white/90 backdrop-blur-sm shadow-lg'
        } rounded-2xl overflow-hidden border border-gray-200/50`}>
          
          {/* Name Header - Clickable */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="w-full flex items-center justify-between px-6 py-4 hover:bg-gray-50/50 transition-all duration-200 focus:outline-none focus:ring-0 active:bg-gray-100/50"
          >
            <span className="text-lg font-bold text-gray-800">
              Oscar.Dev
            </span>
            <div className="transition-transform duration-300">
              {isMenuOpen ? (
                <ChevronUp className="w-5 h-5 text-gray-600" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-600" />
              )}
            </div>
          </button>

          {/* Dropdown Menu - Animated */}
          <div className={`transition-all duration-500 ease-out overflow-hidden ${
            isMenuOpen 
              ? 'max-h-64 opacity-100' 
              : 'max-h-0 opacity-0'
          }`}>
            <div className="border-t border-gray-200/50 bg-gradient-to-b from-white/50 to-gray-50/50">
              <div className="px-2 py-3 space-y-1">
                {[
                  { id: 'projects', label: 'Projects', delay: '100ms' },
                  { id: 'skills', label: 'Skills', delay: '200ms' },
                  { id: 'contact', label: 'Contact', delay: '300ms' }
                ].map((item, index) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`w-full text-left px-4 py-3 text-gray-700 hover:text-purple-600 hover:bg-purple-50/80 rounded-xl font-medium transition-all duration-300 transform focus:outline-none focus:ring-0 ${
                      isMenuOpen 
                        ? 'translate-x-0 opacity-100' 
                        : '-translate-x-4 opacity-0'
                    }`}
                    style={{ 
                      transitionDelay: isMenuOpen ? item.delay : '0ms'
                    }}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        isMenuOpen ? 'bg-purple-400 scale-100' : 'bg-gray-300 scale-0'
                      }`} style={{ transitionDelay: isMenuOpen ? `calc(${item.delay} + 100ms)` : '0ms' }} />
                      <span>{item.label}</span>
                    </div>
                  </button>
                ))}
              </div>
              
              {/* Bottom Accent Line */}
              <div className={`h-1 bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-500 transition-all duration-700 ${
                isMenuOpen ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
              }`} style={{ transitionDelay: isMenuOpen ? '400ms' : '0ms' }} />
            </div>
          </div>
        </div>

        {/* Backdrop Overlay */}
        {isMenuOpen && (
          <div 
            className="fixed inset-0 bg-black/10 backdrop-blur-sm transition-all duration-300 z-[-1]"
            onClick={() => setIsMenuOpen(false)}
          />
        )}
      </header>
    </>
  );
};

export default Header;
// src/components/Header.tsx
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { TabType } from '../App';

import bpLogo from '../assets/logos/bplogo.png';

interface HeaderProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  showNavigation?: boolean;
}

export function Header({
  activeTab,
  onTabChange,
  showNavigation = true,
}: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const tabs: { id: TabType; label: string }[] = [
    { id: 'home', label: 'HOME' },
    { id: 'album', label: 'ALBUM' },
    { id: 'guidelines', label: 'GUIDELINES' },
    // { id: 'medias', label: 'MEDIAS' },      // commented out - not available yet
    // { id: 'blink-hub', label: 'BLINK HUB' }, // commented out - not available yet
    { id: 'music-shows', label: 'MUSIC SHOWS' },
  ];

  const handleTabClick = (tab: TabType) => {
    onTabChange(tab);
    setIsMobileMenuOpen(false);
  };

  const handleLogoClick = () => {
    onTabChange('home');
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 z-50 h-20 bg-black/95 backdrop-blur-2xl border-b border-pink-500/30 px-6 flex items-center justify-between shadow-2xl supports-[backdrop-filter]:bg-black/80">
        {/* Logo - Clickable to go HOME */}
        <button
          onClick={handleLogoClick}
          className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
          aria-label="Go to Home"
        >
          <img
            src={bpLogo}
            alt="BLACKPINK Logo"
            className="w-14 h-14 md:w-16 md:h-16 object-contain drop-shadow-lg"
          />
        </button>

        {/* Desktop Navigation */}
        {showNavigation && (
          <>
            <nav className="hidden md:flex items-center space-x-10">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => handleTabClick(tab.id)}
                  className={`relative font-bold text-sm tracking-widest transition-all duration-300 pb-2
                    ${activeTab === tab.id
                      ? 'text-pink-400'
                      : 'text-gray-400 hover:text-pink-300'
                    }`}
                >
                  {tab.label}
                  {activeTab === tab.id && (
                    <span className="absolute -bottom-1 left-0 w-full h-1 bg-pink-500 rounded-full shadow-lg" />
                  )}
                </button>
              ))}
            </nav>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-pink-400 p-2"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
            </button>
          </>
        )}
      </header>

      {/* Mobile Full-Screen Menu */}
      {isMobileMenuOpen && showNavigation && (
        <div className="fixed inset-0 z-40 bg-black/98 backdrop-blur-2xl pt-20 md:hidden">
          <nav className="flex flex-col items-center justify-center h-full space-y-10">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className={`text-4xl font-black tracking-widest transition-all duration-300
                  ${activeTab === tab.id
                    ? 'text-pink-400 scale-110'
                    : 'text-gray-300 hover:text-pink-400'
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      )}

      {/* Spacer to prevent content overlap */}
      <div className="h-20 w-full" />
    </>
  );
}
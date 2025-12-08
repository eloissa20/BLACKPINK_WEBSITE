// src/components/Header.tsx
import { Crown, Menu } from 'lucide-react';
import { useState } from 'react';
import { TabType } from '../App';

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
    { id: 'medias', label: 'MEDIAS' },
    { id: 'blink-hub', label: 'BLINK HUB' },
    { id: 'music-shows', label: 'MUSIC SHOWS' },
  ];

  const handleTabClick = (tab: TabType) => {
    onTabChange(tab);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-20 bg-black/95 backdrop-blur-xl border-b border-pink-500/20 px-6 flex items-center justify-between shadow-2xl">
      {/* Logo */}
      <div className="flex items-center space-x-3">
        <Crown className="w-9 h-9 text-pink-500 drop-shadow-lg" />
        <h1 className="text-2xl md:text-3xl font-black tracking-widest bg-gradient-to-r from-pink-400 to-pink-600 bg-clip-text text-transparent">
          BLACKPINK
        </h1>
      </div>

      {/* Desktop Navigation */}
      {showNavigation && (
        <>
          <nav className="hidden md:flex items-center space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className={`relative font-bold text-sm tracking-wider pb-1 transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'text-pink-400'
                    : 'text-gray-400 hover:text-pink-300'
                }`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-pink-500 to-pink-400 rounded-full" />
                )}
              </button>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-pink-400 p-2"
            aria-label="Toggle menu"
          >
            <Menu className="w-8 h-8" />
          </button>
        </>
      )}

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && showNavigation && (
        <div className="absolute top-20 left-0 right-0 bg-black/98 backdrop-blur-2xl border-b border-pink-600 shadow-2xl md:hidden">
          <nav className="flex flex-col py-4 px-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className={`py-4 text-lg font-bold tracking-wide border-b border-pink-900/30 transition-colors ${
                  activeTab === tab.id
                    ? 'text-pink-400 bg-pink-900/20'
                    : 'text-gray-300 hover:text-pink-400 hover:bg-pink-900/10'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
import React from 'react';
import { Crown } from 'lucide-react';
import { TabType } from '../App';

interface HeaderProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  showNavigation: boolean;
}

export function Header({ activeTab, onTabChange, showNavigation }: HeaderProps) {
  const tabs: { id: TabType; label: string }[] = [
    { id: 'home', label: 'HOME' },
    { id: 'album', label: 'ALBUM' },
    { id: 'guidelines', label: 'GUIDELINES' },
    { id: 'medias', label: 'MEDIAS' },
    { id: 'blink-hub', label: 'BLINK HUB' },
    { id: 'music-shows', label: 'MUSIC SHOWS' },
  ];

  return (
    <header className="h-20 bg-black/90 backdrop-blur-md border-b border-pink-500/30 px-6 flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <Crown className="w-8 h-8 text-pink-500" />
        <h1 className="text-2xl font-black text-white tracking-wider">
          BLACKPINK
        </h1>
      </div>
      
      {showNavigation && (
        <nav className="flex space-x-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`px-4 py-2 text-sm font-bold tracking-wide transition-all duration-300 ${
                activeTab === tab.id
                  ? 'text-pink-400 border-b-2 border-pink-400'
                  : 'text-gray-300 hover:text-pink-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      )}
    </header>
  );
}
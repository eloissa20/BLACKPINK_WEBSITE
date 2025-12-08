// BottomNav.tsx  (create this new file)
import { Home, Disc3, ScrollText, Image, Users, Tv } from 'lucide-react';
import { TabType } from '../App';

interface BottomNavProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  const navItems = [
    { id: 'home' as TabType, label: 'Home', icon: Home },
    { id: 'album' as TabType, label: 'Album', icon: Disc3 },
    { id: 'guidelines' as TabType, label: 'Guide', icon: ScrollText },
    { id: 'medias' as TabType, label: 'Media', icon: Image },
    { id: 'blink-hub' as TabType, label: 'Hub', icon: Users },
    { id: 'music-shows' as TabType, label: 'Shows', icon: Tv },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden">
      {/* Blur background */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-2xl" />
      
      {/* Pink glow border on top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-pink-500 to-transparent" />
      
      <nav className="relative flex justify-around items-center py-3 px-4">
        {navItems.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => onTabChange(id)}
            className="flex flex-col items-center gap-1 min-w-0 flex-1 group"
          >
            <div
              className={`p-3 rounded-2xl transition-all duration-300 ${
                activeTab === id
                  ? 'bg-pink-600/30 shadow-lg shadow-pink-500/50 scale-110'
                  : 'bg-transparent group-hover:bg-pink-900/20'
              }`}
            >
              <Icon
                className={`w-6 h-6 transition-colors duration-300 ${
                  activeTab === id
                    ? 'text-pink-400'
                    : 'text-gray-500 group-hover:text-pink-300'
                }`}
              />
            </div>
            <span
              className={`text-xs font-bold transition-colors ${
                activeTab === id ? 'text-pink-400' : 'text-gray-500 group-hover:text-pink-300'
              }`}
            >
              {label}
            </span>
            
            {/* Active indicator dot */}
            {activeTab === id && (
              <div className="absolute -top-1 w-2 h-2 bg-pink-400 rounded-full animate-ping" />
            )}
          </button>
        ))}
      </nav>
    </div>
  );
}
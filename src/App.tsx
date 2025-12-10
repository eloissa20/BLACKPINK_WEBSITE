// App.tsx
import { useState } from 'react';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { HomePage } from './components/HomePage';
import { AlbumPage } from './components/AlbumPage';
import { GuidelinesPage } from './components/GuidelinesPage';
import { MediasPage } from './components/MediasPage';
import { BlinkHubPage } from './components/BlinkHubPage';
import { MusicShowsPage } from './components/MusicShowsPage';
import { AlbumDetailsPage } from './components/AlbumDetailsPage';
import { ChartDetailsPage } from './components/ChartDetailsPage';
import { FanbaseDetailsPage } from './components/FanbaseDetailsPage';
import { Footer } from './components/Footer';

export type TabType = 'home' | 'album' | 'guidelines' | 'medias' | 'blink-hub' | 'music-shows';
export type ContinentType = 'global' | 'korea' | 'usa' | 'uk';

function App() {
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [selectedContinent, setSelectedContinent] = useState<ContinentType | null>(null);
  const [selectedChart, setSelectedChart] = useState<ContinentType | null>(null);
  const [selectedFanbase, setSelectedFanbase] = useState<string | null>(null);

  // Check if we're in a "detail" sub-page
  const isInSubPage = selectedContinent || selectedChart || selectedFanbase;

  const handleTabChange = (tab: TabType) => {
    // Reset all sub-pages when changing main tab
    setSelectedContinent(null);
    setSelectedChart(null);
    setSelectedFanbase(null);
    setActiveTab(tab);
  };

  const renderContent = () => {
    // Sub-pages (higher priority)
    if (selectedContinent) {
      return (
        <AlbumDetailsPage
          continent={selectedContinent}
          onBack={() => setSelectedContinent(null)}
        />
      );
    }

    if (selectedChart) {
      return (
        <ChartDetailsPage
          region={selectedChart}
          onBack={() => setSelectedChart(null)}
        />
      );
    }

    if (selectedFanbase) {
      return (
        <FanbaseDetailsPage
          fanbase={selectedFanbase}
          onBack={() => setSelectedFanbase(null)}
        />
      );
    }

    // Main tabs
    switch (activeTab) {
      case 'home':
        return <HomePage onNavigate={handleTabChange} />;
      case 'album':
        return <AlbumPage onSelectContinent={setSelectedContinent} />;
      case 'guidelines':
        return <GuidelinesPage onSelectChart={setSelectedChart} />;
      case 'medias':
        return <MediasPage />;
      case 'blink-hub':
        return <BlinkHubPage onSelectFanbase={setSelectedFanbase} />;
      case 'music-shows':
        return <MusicShowsPage />;
      default:
        return <HomePage onNavigate={handleTabChange} />;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Header - Hidden navigation in sub-pages */}
      <Header
        activeTab={activeTab}
        onTabChange={handleTabChange}
        showNavigation={!isInSubPage}
      />

      {/* Main Content Area - Safe padding for mobile */}
      <main className="flex-1 pb-20 lg:pb-0 overflow-y-auto">
        <div className="h-full">
          {renderContent()}
        </div>
      </main>

      {/* Footer (optional - only if you want credits or links) */}
      <Footer />

      {/* Beautiful Bottom Navigation - Only on Mobile & Tablet */}
      {!isInSubPage && (
        <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
      )}
    </div>
  );
}

export default App;
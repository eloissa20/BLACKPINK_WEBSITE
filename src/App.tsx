// src/App.tsx
import { useState } from 'react';

import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { HomePage } from './components/HomePage';
import AlbumPage from './components/AlbumPage';
import { GuidelinesPage } from './components/GuidelinesPage';
import { MediasPage } from './components/MediasPage';
import { BlinkHubPage } from './components/BlinkHubPage';
import { MusicShowsPage } from './components/MusicShowsPage';
import { AlbumDetailsPage } from './components/AlbumDetailsPage';
import { ChartDetailsPage } from './components/ChartDetailsPage';
import { FanbaseDetailsPage } from './components/FanbaseDetailsPage';
import Footer from './components/Footer';

import { TabType, ContinentType } from './types';   // ← correct

function App() {
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [selectedContinent, setSelectedContinent] = useState<ContinentType | null>(null);
  const [selectedChart, setSelectedChart] = useState<ContinentType | null>(null);
  const [selectedFanbase, setSelectedFanbase] = useState<string | null>(null);

  const isInSubPage = selectedContinent || selectedChart || selectedFanbase;

  const handleTabChange = (tab: TabType) => {
    setSelectedContinent(null);
    setSelectedChart(null);
    setSelectedFanbase(null);
    setActiveTab(tab);
  };

  const renderContent = () => {
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
      <Header
        activeTab={activeTab}
        onTabChange={handleTabChange}
        showNavigation={!isInSubPage}
      />

      <main className="flex-1 pb-20 lg:pb-0 overflow-y-auto">
        <div className="h-full">{renderContent()}</div>
      </main>

      <Footer />

      {!isInSubPage && (
        <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
      )}
    </div>
  );
}

export default App;
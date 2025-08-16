import React, { useState } from 'react';
import { Header } from './components/Header';
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
        return <HomePage onNavigate={setActiveTab} />;
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
        return <HomePage onNavigate={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-pink-900 flex flex-col">
      <Header 
        activeTab={activeTab} 
        onTabChange={setActiveTab}
        showNavigation={!selectedContinent && !selectedChart && !selectedFanbase}
      />
      <main className="flex-1 h-[calc(100vh-160px)] overflow-hidden">
        {renderContent()}
      </main>
      <Footer />
    </div>
  );
}

export default App;
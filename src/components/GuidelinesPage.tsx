import React, { useState } from 'react';
import { Music, CreditCard, BarChart3, TrendingUp, ExternalLink } from 'lucide-react';
import { ContinentType } from '../App';

interface GuidelinesPageProps {
  onSelectChart: (region: ContinentType) => void;
}

export function GuidelinesPage({ onSelectChart }: GuidelinesPageProps) {
  const [activeSection, setActiveSection] = useState<'streaming' | 'buying' | 'payment' | 'charts'>('streaming');

  const sections = [
    { id: 'streaming' as const, title: 'Streaming Methods', icon: Music },
    { id: 'buying' as const, title: 'Buying Methods', icon: CreditCard },
    { id: 'payment' as const, title: 'Payment Methods', icon: TrendingUp },
    { id: 'charts' as const, title: 'Charts', icon: BarChart3 },
  ];

  const chartRegions = [
    { id: 'global' as ContinentType, title: 'GLOBAL CHARTS', description: 'Worldwide music charts' },
    { id: 'korea' as ContinentType, title: 'KOREA CHARTS', description: 'Korean music shows & charts' },
    { id: 'usa' as ContinentType, title: 'USA CHARTS', description: 'Billboard Hot 100 & 200' },
    { id: 'uk' as ContinentType, title: 'UK CHARTS', description: 'Official UK charts' },
  ];

  const streamingPlatforms = [
    { name: 'Spotify', url: 'https://open.spotify.com/artist/41MozSoPIsD1dJM0CLPjZF', type: 'Premium & Free' },
    { name: 'Apple Music', url: 'https://music.apple.com/us/artist/blackpink/1252555207', type: 'Subscription' },
    { name: 'YouTube Music', url: 'https://music.youtube.com/channel/UCOmHUn--16B90oW2L6FRR3A', type: 'Free & Premium' },
    { name: 'Amazon Music', url: 'https://music.amazon.com/artists/B01LWZY8S7/blackpink', type: 'Prime & Unlimited' },
    { name: 'Deezer', url: 'https://www.deezer.com/en/artist/9635624', type: 'Free & Premium' },
    { name: 'Tidal', url: 'https://tidal.com/browse/artist/8348745', type: 'HiFi Streaming' },
  ];

  const digitalStores = [
    { name: 'iTunes Store', url: 'https://music.apple.com/us/artist/blackpink/1252555207', region: 'Global' },
    { name: 'Amazon Music', url: 'https://music.amazon.com/artists/B01LWZY8S7/blackpink', region: 'Global' },
    { name: 'Google Play Music', url: 'https://play.google.com/store/music/', region: 'Global' },
    { name: 'Bandcamp', url: 'https://bandcamp.com/', region: 'Independent' },
    { name: '7digital', url: 'https://www.7digital.com/', region: 'Global' },
  ];

  const physicalStores = [
    { name: 'Target', url: 'https://www.target.com/s?searchTerm=blackpink', region: 'USA' },
    { name: 'Walmart', url: 'https://www.walmart.com/search?query=blackpink%20album', region: 'USA' },
    { name: 'Barnes & Noble', url: 'https://www.barnesandnoble.com/', region: 'USA' },
    { name: 'HMV', url: 'https://store.hmv.com/', region: 'UK' },
    { name: 'Amazon', url: 'https://www.amazon.com/s?k=blackpink+album', region: 'Global' },
    { name: 'YG Shop', url: 'https://shop.ygfamily.com/', region: 'Official' },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'streaming':
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-white mb-6">Streaming Guidelines</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-900/50 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-pink-400 mb-4">Best Practices</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-300">
                  <li>Stream on multiple platforms daily</li>
                  <li>Use different devices and accounts</li>
                  <li>Play full songs without skipping</li>
                  <li>Alternate between different tracks</li>
                  <li>Stream at different times of day</li>
                  <li>Create playlists with BLACKPINK songs</li>
                  <li>Share playlists with friends and family</li>
                </ul>
              </div>
              <div className="bg-gray-900/50 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-purple-400 mb-4">Streaming Platforms</h3>
                <div className="space-y-3">
                  {streamingPlatforms.map((platform, index) => (
                    <a
                      key={index}
                      href={platform.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg hover:bg-gray-700/50 transition-all duration-300 group"
                    >
                      <div>
                        <span className="text-white font-semibold">{platform.name}</span>
                        <span className="text-gray-400 text-sm ml-2">({platform.type})</span>
                      </div>
                      <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-pink-400 transition-colors duration-300" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      case 'buying':
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-white mb-6">Buying Guidelines</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-900/50 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-pink-400 mb-4">Digital Stores</h3>
                <div className="space-y-3">
                  {digitalStores.map((store, index) => (
                    <a
                      key={index}
                      href={store.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg hover:bg-gray-700/50 transition-all duration-300 group"
                    >
                      <div>
                        <span className="text-white font-semibold">{store.name}</span>
                        <span className="text-gray-400 text-sm ml-2">({store.region})</span>
                      </div>
                      <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-pink-400 transition-colors duration-300" />
                    </a>
                  ))}
                </div>
              </div>
              <div className="bg-gray-900/50 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-purple-400 mb-4">Physical Stores</h3>
                <div className="space-y-3">
                  {physicalStores.map((store, index) => (
                    <a
                      key={index}
                      href={store.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg hover:bg-gray-700/50 transition-all duration-300 group"
                    >
                      <div>
                        <span className="text-white font-semibold">{store.name}</span>
                        <span className="text-gray-400 text-sm ml-2">({store.region})</span>
                      </div>
                      <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-purple-400 transition-colors duration-300" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      case 'payment':
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-white mb-6">Payment Guidelines</h2>
            <div className="bg-gray-900/50 rounded-2xl p-6">
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <h3 className="text-xl font-bold text-pink-400 mb-4">Credit Cards</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-300">
                    <li>Visa</li>
                    <li>Mastercard</li>
                    <li>American Express</li>
                    <li>Discover</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-purple-400 mb-4">Digital Wallets</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-300">
                    <li>PayPal</li>
                    <li>Apple Pay</li>
                    <li>Google Pay</li>
                    <li>Samsung Pay</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-blue-400 mb-4">Gift Cards</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-300">
                    <li>iTunes Cards</li>
                    <li>Amazon Cards</li>
                    <li>Google Play Cards</li>
                    <li>Spotify Cards</li>
                  </ul>
                </div>
              </div>
              <div className="mt-8 p-6 bg-gray-800/30 rounded-xl">
                <h4 className="text-lg font-bold text-yellow-400 mb-3">💳 Payment Tips</h4>
                <ul className="list-disc list-inside space-y-2 text-gray-300 text-sm">
                  <li>Use different payment methods for multiple purchases</li>
                  <li>Gift cards can be used for chart-eligible purchases</li>
                  <li>Some platforms offer discounts for bulk purchases</li>
                  <li>Check regional pricing differences</li>
                </ul>
              </div>
            </div>
          </div>
        );
      case 'charts':
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-white mb-6">Music Charts</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {chartRegions.map((region) => (
                <button
                  key={region.id}
                  onClick={() => onSelectChart(region.id)}
                  className="bg-gradient-to-br from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 p-6 rounded-2xl transform hover:scale-105 transition-all duration-300 text-left"
                >
                  <h3 className="text-xl font-bold text-white mb-2">{region.title}</h3>
                  <p className="text-white/80">{region.description}</p>
                </button>
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="h-full p-8 overflow-y-auto">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-black text-white text-center mb-12">
          STREAMING & BUYING GUIDELINES
        </h1>

        {/* Section Navigation */}
        <div className="flex justify-center mb-12">
          <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-2 flex space-x-2">
            {sections.map((section) => {
              const IconComponent = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-xl transition-all duration-300 ${
                    activeSection === section.id
                      ? 'bg-pink-600 text-white'
                      : 'text-gray-400 hover:text-white hover:bg-gray-800'
                  }`}
                >
                  <IconComponent className="w-5 h-5" />
                  <span className="font-semibold">{section.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className="min-h-[400px]">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}
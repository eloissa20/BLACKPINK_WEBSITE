// src/components/GuidelinesPage.tsx
import { useState, useEffect } from 'react';
import {
  Music,
  CreditCard,
  BarChart3,
  TrendingUp,
  Globe,
  Flag,
} from 'lucide-react';
import { ContinentType } from '../App';

import { DigitalBuying } from './DigitalBuying';
import { PhysicalBuying } from './PhysicalBuying';
import { AppleMusicDetails } from './AppleMusicDetails';
import { SpotifyDetails } from './SpotifyDetails';
import { YouTubeDetails } from './YouTubeDetails';
import { YouTubeMusicDetails } from './YouTubeMusicDetails';
import { DeezerDetails } from './DeezerDetails';
import { PandoraDetails } from './PandoraDetails';
import { StationheadDetails } from './StationheadDetails';
import { QobuzDetails } from './QobuzDetails';
import { AmazonMusicDetails } from './AmazonMusicDetails';
import { TidalDetails } from './TidalDetails';

// Import all streaming platform logos
import appleMusicLogo from '../assets/logos/apple-music.png';
import spotifyLogo from '../assets/logos/spotify.png';
import youtubeLogo from '../assets/logos/youtube.png';
import youtubeMusicLogo from '../assets/logos/youtube-music.png';
import deezerLogo from '../assets/logos/deezer.png';
import pandoraLogo from '../assets/logos/pandora.png';
import stationheadLogo from '../assets/logos/stationhead.png';
import qobuzLogo from '../assets/logos/qobuz.png';
import amazonMusicLogo from '../assets/logos/amazon-music.png';
import tidalLogo from '../assets/logos/tidal.png';

const useSound = () => {
  const audio = new Audio('https://cdn.glitch.global/8d5e2c8d-5e2c-8d5e-2c8d-5e2c8d5e2c8d/ddudu-whistle.mp3');
  audio.volume = 0.6;

  useEffect(() => {
    audio.load();
  }, []);

  const play = () => {
    audio.currentTime = 0;
    audio.play().catch(() => {});
  };

  return play;
};

interface GuidelinesPageProps {
  onSelectChart: (region: ContinentType) => void;
}

// Separate type for streaming platforms only (they have logos)
type StreamingPlatformKey =
  | 'apple' | 'spotify' | 'youtube' | 'ytmusic' | 'deezer'
  | 'pandora' | 'stationhead' | 'qobuz' | 'amazon' | 'tidal';

// Full type for what can be selected (includes buying sections)
type SelectedPlatformKey = StreamingPlatformKey | 'digital' | 'physical';

// platformData only contains streaming platforms → perfect type match
const platformData: Record<StreamingPlatformKey, { name: string; logo: string }> = {
  apple: { name: 'Apple Music', logo: appleMusicLogo },
  spotify: { name: 'Spotify', logo: spotifyLogo },
  youtube: { name: 'YouTube', logo: youtubeLogo },
  ytmusic: { name: 'YouTube Music', logo: youtubeMusicLogo },
  deezer: { name: 'Deezer', logo: deezerLogo },
  pandora: { name: 'Pandora', logo: pandoraLogo },
  stationhead: { name: 'Stationhead', logo: stationheadLogo },
  qobuz: { name: 'Qobuz', logo: qobuzLogo },
  amazon: { name: 'Amazon Music', logo: amazonMusicLogo },
  tidal: { name: 'Tidal', logo: tidalLogo },
};

export function GuidelinesPage({ onSelectChart }: GuidelinesPageProps) {
  const [activeSection, setActiveSection] = useState<'streaming' | 'buying' | 'payment' | 'charts'>('streaming');
  const [selectedPlatform, setSelectedPlatform] = useState<SelectedPlatformKey | null>(null);
  const playSound = useSound();

  const detailProps = {
    onBack: () => setSelectedPlatform(null),
    playSound,
  };

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

  // Render selected detail page
  if (selectedPlatform) {
    switch (selectedPlatform) {
      case 'apple':
        return <AppleMusicDetails {...detailProps} />;
      case 'spotify':
        return <SpotifyDetails {...detailProps} />;
      case 'youtube':
        return <YouTubeDetails {...detailProps} />;
      case 'ytmusic':
        return <YouTubeMusicDetails {...detailProps} />;
      case 'deezer':
        return <DeezerDetails {...detailProps} />;
      case 'pandora':
        return <PandoraDetails {...detailProps} />;
      case 'stationhead':
        return <StationheadDetails {...detailProps} />;
      case 'qobuz':
        return <QobuzDetails {...detailProps} />;
      case 'amazon':
        return <AmazonMusicDetails {...detailProps} />;
      case 'tidal':
        return <TidalDetails {...detailProps} />;
      case 'digital':
        return <DigitalBuying {...detailProps} />;
      case 'physical':
        return <PhysicalBuying {...detailProps} />;
      default:
        return <SpotifyDetails {...detailProps} />;
    }
  }

  return (
    <div className="h-full p-8 overflow-y-auto bg-gradient-to-b from-black to-purple-900/20">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-6xl font-black text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500">
          STREAMING & BUYING GUIDELINES
        </h1>

        {/* Section Tabs */}
        <div className="flex justify-center mb-16">
          <div className="backdrop-blur-md rounded-3xl p-3 flex flex-wrap justify-center gap-4">
            {sections.map((s) => {
              const Icon = s.icon;
              return (
                <button
                  key={s.id}
                  onClick={() => { playSound(); setActiveSection(s.id); }}
                  onMouseEnter={playSound}
                  className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-bold transition ${
                    activeSection === s.id
                      ? 'bg-gradient-to-r from-pink-600 to-purple-600 text-white shadow-xl shadow-pink-500/60'
                      : 'text-gray-400 hover:text-white hover:bg-gray-800'
                  }`}
                >
                  <Icon className="w-6 h-6" />
                  <span>{s.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Streaming Section */}
        {activeSection === 'streaming' && (
          <div className="space-y-16">
            <h2 className="text-5xl font-black text-white text-center mb-12">Streaming Platforms</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-10 max-w-6xl mx-auto">
              {Object.entries(platformData).map(([key, plat]) => (
                <button
                  key={key}
                  onClick={() => { playSound(); setSelectedPlatform(key as StreamingPlatformKey); }}
                  onMouseEnter={playSound}
                  className="group relative bg-transparent rounded-3xl p-8 transition-all duration-500 hover:scale-110 border-2 border-pink-500"
                  style={{ background: 'rgba(255,105,180,0.1)', backdropFilter: 'blur(10px)', boxShadow: '0 0 40px rgba(236, 72, 153, 0.4)' }}
                >
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-pink-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  <img src={plat.logo} alt={plat.name} className="w-48 h-48 mx-auto object-contain drop-shadow-2xl transition-all duration-500 group-hover:drop-shadow-[0_0_40px_rgba(255,105,180,0.9)]" />
                </button>
              ))}
            </div>

            {/* US & Worldwide chart focus */}
            <div className="space-y-16 mt-24">
              <div className="bg-transparent border-2 border-pink-500 rounded-3xl p-10 backdrop-blur-xl">
                <div className="flex items-center justify-center gap-4 mb-10">
                  <Flag className="w-12 h-12 text-red-400" />
                  <h3 className="text-4xl font-black text-white">US BLINKS → Billboard Hot 100</h3>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
                  {Object.values(platformData)
                    .filter(p => ['apple','spotify','youtube','ytmusic','pandora','stationhead','amazon','tidal'].includes(p.name.toLowerCase().replace(/ /g,'')))
                    .map(p => (
                      <div key={p.name} className="bg-transparent rounded-3xl p-6 border-2 border-pink-500 backdrop-blur-sm">
                        <img src={p.logo} alt="" className="w-32 h-32 mx-auto object-contain" />
                      </div>
                    ))}
                </div>
              </div>

              <div className="bg-transparent border-2 border-purple-500 rounded-3xl p-10 backdrop-blur-xl">
                <div className="flex items-center justify-center gap-4 mb-10">
                  <Globe className="w-12 h-12 text-blue-400" />
                  <h3 className="text-4xl font-black text-white">WORLDWIDE BLINKS → Global Charts</h3>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
                  {Object.values(platformData).filter(p => p.name !== 'Pandora').map(p => (
                    <div key={p.name} className="bg-transparent rounded-3xl p-6 border-2 border-purple-500 backdrop-blur-sm">
                      <img src={p.logo} alt="" className="w-32 h-32 mx-auto object-contain" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modern Buying Methods Section */}
        {activeSection === 'buying' && (
          <div className="space-y-16">
            <h2 className="text-5xl font-black text-white text-center mb-12">Buying Guidelines</h2>
            
            {/* Important Reminder Banner */}
            <div className="max-w-5xl mx-auto mb-20">
              <div className="bg-gradient-to-r from-pink-900/50 to-purple-900/50 backdrop-blur-xl rounded-3xl p-10 border-2 border-pink-500/70 shadow-2xl shadow-pink-500/30">
                <h3 className="text-4xl font-black text-pink-300 text-center mb-6">
                  ⚠️ IMPORTANT REMINDER FOR BLINKS
                </h3>
                <p className="text-xl text-gray-200 text-center leading-relaxed max-w-4xl mx-auto">
                  Digital Music Buying and Physical Albums Buying are <span className="text-pink-400 font-bold">completely separate</span> with different rules and chart contributions.
                  <br /><br />
                  Some platforms have <span className="text-yellow-300 font-bold">strict limitations</span> (e.g., region restrictions, shipping, chart eligibility).
                  <br /><br />
                  <span className="text-pink-400 font-bold">Always read carefully</span> before purchasing to ensure your support counts toward BLACKPINK's charts!
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-16 max-w-7xl mx-auto">
              {/* Digital Music Buying Card */}
              <button
                onClick={() => { playSound(); setSelectedPlatform('digital'); }}
                onMouseEnter={playSound}
                className="group relative bg-black/60 backdrop-blur-2xl rounded-3xl p-16 overflow-hidden border-2 border-[#F70776]/60 shadow-2xl transition-all duration-700 hover:scale-110 hover:border-[#F70776] hover:shadow-2xl hover:shadow-[#F70776]/60"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#F70776]/80 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="relative z-10 text-center">
                  <div className="w-48 h-48 mx-auto mb-10 rounded-3xl overflow-hidden shadow-2xl border-4 border-pink-500/30">
                    <img 
                      src="https://logos-world.net/wp-content/uploads/2020/11/Apple-Music-Logo-2015-present.png" 
                      alt="Digital Music" 
                      className="w-full h-full object-contain bg-black/50"
                    />
                  </div>
                  <h3 className="text-5xl font-black mb-6 transition-colors duration-500 group-hover:text-white text-[#F11A7B]">
                    Digital Music Buying
                  </h3>
                  <p className="text-2xl text-gray-300 mb-4">iTunes, Amazon Digital, 7digital and more</p>
                  <p className="text-xl text-gray-400">Instant downloads • Global availability</p>
                </div>
              </button>

              {/* Physical Albums Buying Card */}
              <button
                onClick={() => { playSound(); setSelectedPlatform('physical'); }}
                onMouseEnter={playSound}
                className="group relative bg-black/60 backdrop-blur-2xl rounded-3xl p-16 overflow-hidden border-2 border-[#FA58B6]/60 shadow-2xl transition-all duration-700 hover:scale-110 hover:border-[#FA58B6] hover:shadow-2xl hover:shadow-[#FA58B6]/60"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#FA58B6]/80 to-pink-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="relative z-10 text-center">
                  <div className="w-48 h-48 mx-auto mb-10 rounded-3xl overflow-hidden shadow-2xl border-4 border-purple-500/30">
                    <img 
                      src="https://i.redd.it/9fplyk9jxhg61.jpg" 
                      alt="Physical Albums" 
                      className="w-full h-full object-cover brightness-90"
                    />
                  </div>
                  <h3 className="text-5xl font-black mb-6 transition-colors duration-500 group-hover:text-white text-[#F94892]">
                    Physical Albums Buying
                  </h3>
                  <p className="text-2xl text-gray-300 mb-4">Official stores by region • Counts toward charts</p>
                  <p className="text-xl text-gray-400">Global • Korea • USA • UK</p>
                </div>
              </button>
            </div>

            {/* Large Footer Spacing + Final Note */}
            <div className="mt-32 pb-20 text-center">
              <p className="text-2xl text-gray-400 max-w-4xl mx-auto leading-relaxed">
                Your purchases and streams are the greatest support for BLACKPINK.
                <br />
                <span className="text-pink-400 font-bold">Every BLINK makes a difference — let's push them higher together!</span> 💗
              </p>
            </div>
          </div>
        )}


        {/* Payment Methods Section */}
        {activeSection === 'payment' && (
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-black text-white text-center mb-10">Payment Methods</h2>
            <div className="bg-gray-900/60 backdrop-blur-xl rounded-3xl p-10 border-2 border-pink-400">
              <div className="grid md:grid-cols-3 gap-8">
                <div>
                  <h3 className="text-xl font-bold text-pink-400 mb-4">Credit Cards</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>Visa</li>
                    <li>Mastercard</li>
                    <li>American Express</li>
                    <li>Discover</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-purple-400 mb-4">Digital Wallets</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>PayPal</li>
                    <li>Apple Pay</li>
                    <li>Google Pay</li>
                    <li>Samsung Pay</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-blue-400 mb-4">Gift Cards</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>iTunes Cards</li>
                    <li>Amazon Cards</li>
                    <li>Google Play Cards</li>
                    <li>Spotify Cards</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Charts Section */}
        {activeSection === 'charts' && (
          <div className="space-y-10">
            <h2 className="text-4xl font-black text-white text-center mb-10">Choose Your Chart</h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {chartRegions.map((region) => (
                <button
                  key={region.id}
                  onClick={() => onSelectChart(region.id)}
                  className="bg-gradient-to-br from-pink-600/80 to-purple-700/80 backdrop-blur-xl p-10 rounded-3xl hover:scale-105 transition-all border-2 border-pink-400 shadow-2xl"
                >
                  <h3 className="text-3xl font-black text-white mb-3">{region.title}</h3>
                  <p className="text-white/80 text-lg">{region.description}</p>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
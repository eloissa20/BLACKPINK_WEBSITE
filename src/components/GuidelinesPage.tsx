import { useState, useEffect } from 'react';
import { 
  Music, 
  CreditCard, 
  BarChart3, 
  TrendingUp, 
  Globe, 
  Flag, 
  Sparkles, 
  Heart, 
  Star 
} from 'lucide-react';

// Import local logo assets
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

type ContinentType = 'global' | 'korea' | 'usa' | 'uk';

interface GuidelinesPageProps {
  onSelectChart: (region: ContinentType) => void;
}

// Import all detail components 
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

const useSound = () => {
  const audio = new Audio('https://cdn.glitch.global/8d5e2c8d-5e2c-8d5e2c8d-5e2c8d5e2c8d/ddudu-whistle.mp3');
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

export function GuidelinesPage({ onSelectChart }: GuidelinesPageProps) {
  const [activeSection, setActiveSection] = useState<'streaming' | 'buying' | 'payment' | 'charts'>('streaming');
  const [selectedPlatform, setSelectedPlatform] = useState<'apple' | 'spotify' | 'youtube' | 'ytmusic' | 'deezer' | 'pandora' | 'stationhead' | 'qobuz' | 'amazon' | 'tidal' | 'digital' | 'physical' | null>(null);
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
    { id: 'global' as ContinentType, title: 'GLOBAL CHARTS', description: 'Worldwide music charts 🌍', gradient: 'from-blue-500 to-cyan-500' },
    { id: 'korea' as ContinentType, title: 'KOREA CHARTS', description: 'Korean music shows & charts 🇰🇷', gradient: 'from-red-500 to-pink-500' },
    { id: 'usa' as ContinentType, title: 'USA CHARTS', description: 'Billboard Hot 100 & 200 🇺🇸', gradient: 'from-purple-500 to-pink-500' },
    { id: 'uk' as ContinentType, title: 'UK CHARTS', description: 'Official UK charts 🇬🇧', gradient: 'from-indigo-500 to-blue-500' },
  ];

  const platformData = {
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

  // Render detail page if a platform is selected
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
        return null;
    }
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-15px); }
          }
          @keyframes sparkle {
            0%, 100% { opacity: 0.3; transform: scale(1); }
            50% { opacity: 1; transform: scale(1.2); }
          }
          @keyframes slideIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-float { animation: float 3s ease-in-out infinite; }
          .animate-sparkle { animation: sparkle 2s ease-in-out infinite; }
          .animate-slide-in { animation: slideIn 0.5s ease-out; }
        `
      }} />

      <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white overflow-y-auto">
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <Sparkles className="absolute top-20 left-10 w-8 h-8 text-pink-400 animate-sparkle" />
          <Sparkles className="absolute top-40 right-20 w-6 h-6 text-purple-400 animate-sparkle" style={{ animationDelay: '0.5s' }} />
          <Sparkles className="absolute bottom-40 left-1/4 w-10 h-10 text-pink-300 animate-sparkle" style={{ animationDelay: '1s' }} />
          <Star className="absolute top-1/3 right-1/3 w-12 h-12 text-pink-500 animate-pulse" style={{ animationDelay: '1.5s' }} />
          <Star className="absolute bottom-1/3 left-1/3 w-8 h-8 text-purple-500 animate-pulse" style={{ animationDelay: '2s' }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-12 pb-32">
          <div className="text-center mb-16 animate-slide-in">
            <div className="flex items-center justify-center gap-4 mb-6">
              <Heart className="w-12 h-12 text-pink-400 animate-pulse fill-pink-400" />
              <h1 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-pink-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                STREAMING & BUYING GUIDELINES
              </h1>
              <Heart className="w-12 h-12 text-pink-400 animate-pulse fill-pink-400" />
            </div>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Everything you need to know to support BLACKPINK! Let's make them shine brighter!
            </p>
          </div>

          {/* Clean blended tabs */}
          <div className="flex justify-center mb-16">
            <div className="backdrop-blur-xl rounded-3xl p-4 shadow-2xl shadow-pink-500/20">
              <div className="flex flex-wrap justify-center gap-3">
                {sections.map((s) => {
                  const Icon = s.icon;
                  return (
                    <button
                      key={s.id}
                      onClick={() => { playSound(); setActiveSection(s.id); }}
                      onMouseEnter={playSound}
                      className={`group flex items-center gap-3 px-6 py-4 rounded-2xl font-bold transition-all duration-300 ${
                        activeSection === s.id
                          ? 'bg-gradient-to-r from-pink-600 to-purple-600 text-white shadow-xl shadow-pink-500/50 scale-105'
                          : 'text-gray-400 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <Icon className={`w-6 h-6 ${activeSection === s.id ? 'animate-bounce' : 'group-hover:animate-bounce'}`} />
                      <span>{s.title}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {activeSection === 'streaming' && (
            <div className="space-y-16 animate-slide-in">
              <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent mb-4">
                  ✨ Streaming Platforms ✨
                </h2>
                <p className="text-lg text-gray-300">Click any platform to see detailed streaming guides!</p>
              </div>

              {/* 4 columns, big clickable cards */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 max-w-7xl mx-auto">
                {Object.entries(platformData).map(([key, plat], index) => (
                  <button
                    key={key}
                    onClick={() => { playSound(); setSelectedPlatform(key as any); }}
                    onMouseEnter={playSound}
                    className="group relative bg-gradient-to-br from-gray-900/60 to-black/60 backdrop-blur-xl rounded-3xl p-10 border-2 border-pink-500/30 hover:border-pink-500 transition-all duration-500 hover:scale-110 hover:-translate-y-4 shadow-2xl hover:shadow-pink-500/60 animate-float"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-pink-500/0 to-purple-500/0 group-hover:from-pink-500/20 group-hover:to-purple-500/20 transition-all duration-500" />
                    <div className="relative">
                      <img 
                        src={plat.logo} 
                        alt={plat.name} 
                        className="w-full h-40 object-contain drop-shadow-2xl transition-all duration-500 group-hover:drop-shadow-[0_0_40px_rgba(255,105,180,0.9)] group-hover:scale-115 pointer-events-none"
                      />
                      <p className="mt-6 text-center text-gray-200 font-bold text-lg">{plat.name}</p>
                    </div>
                    <Sparkles className="absolute top-4 right-4 w-6 h-6 text-pink-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-spin" />
                  </button>
                ))}
              </div>

              <div className="space-y-12 mt-20">
                <div className="bg-gradient-to-br from-red-900/20 to-pink-900/20 rounded-3xl p-8 backdrop-blur-xl shadow-2xl shadow-red-500/20">
                  <div className="flex items-center justify-center gap-4 mb-8">
                    <Flag className="w-10 h-10 text-red-400 animate-bounce" />
                    <h3 className="text-3xl md:text-4xl font-black text-white">🇺🇸 US BLINKS → Billboard Hot 100</h3>
                  </div>
                  <p className="text-center text-gray-300 mb-6 text-lg">Stream on these platforms to help BLACKPINK chart on Billboard! 📊</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {['apple', 'spotify', 'youtube', 'ytmusic', 'pandora', 'amazon', 'tidal'].map((key) => {
                      const plat = platformData[key as keyof typeof platformData];
                      return (
                        <div key={key} className="bg-black/40 backdrop-blur-sm rounded-2xl p-5 border border-red-500/30 hover:border-red-500 transition-all duration-300 hover:scale-105">
                          <img src={plat.logo} alt={plat.name} className="w-full h-20 object-contain" />
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 rounded-3xl p-8 backdrop-blur-xl shadow-2xl shadow-blue-500/20">
                  <div className="flex items-center justify-center gap-4 mb-8">
                    <Globe className="w-10 h-10 text-blue-400 animate-spin" style={{ animationDuration: '10s' }} />
                    <h3 className="text-3xl md:text-4xl font-black text-white">🌍 WORLDWIDE BLINKS → Global Charts</h3>
                  </div>
                  <p className="text-center text-gray-300 mb-6 text-lg">All platforms available globally! Stream anywhere, anytime! 🎵</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    {Object.entries(platformData).filter(([key]) => key !== 'pandora').map(([key, plat]) => (
                      <div key={key} className="bg-black/40 backdrop-blur-sm rounded-2xl p-5 border border-blue-500/30 hover:border-blue-500 transition-all duration-300 hover:scale-105">
                        <img src={plat.logo} alt={plat.name} className="w-full h-20 object-contain" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'buying' && (
            <div className="space-y-16 animate-slide-in">
              <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent mb-4">
                  💳 Buying Guidelines 💳
                </h2>
              </div>

              <div className="max-w-5xl mx-auto">
                <div className="bg-gradient-to-r from-pink-900/60 to-purple-900/60 backdrop-blur-xl rounded-3xl p-8 border-2 border-pink-500/70 shadow-2xl shadow-pink-500/30">
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <Star className="w-8 h-8 text-yellow-400 animate-pulse fill-yellow-400" />
                    <h3 className="text-3xl font-black text-pink-300 text-center">
                      ⚠️ IMPORTANT REMINDER FOR BLINKS
                    </h3>
                    <Star className="w-8 h-8 text-yellow-400 animate-pulse fill-yellow-400" />
                  </div>
                  <p className="text-lg text-gray-200 text-center leading-relaxed">
                    Digital Music Buying and Physical Albums Buying are <span className="text-pink-400 font-bold">completely separate</span> with different rules and chart contributions! 📊
                    <br /><br />
                    Some platforms have <span className="text-yellow-300 font-bold">strict limitations</span> (region restrictions, shipping, chart eligibility). 🚫
                    <br /><br />
                    <span className="text-pink-400 font-bold">Always read carefully</span> before purchasing to ensure your support counts! 💖
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-10 max-w-6xl mx-auto">
                <button
                  onClick={() => { playSound(); setSelectedPlatform('digital'); }}
                  onMouseEnter={playSound}
                  className="group relative bg-gradient-to-br from-pink-900/40 to-purple-900/40 backdrop-blur-xl rounded-3xl p-12 overflow-hidden border-2 border-pink-500/60 hover:border-pink-500 shadow-2xl transition-all duration-700 hover:scale-105 hover:-translate-y-2 hover:shadow-pink-500/60"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-pink-500/0 to-purple-500/0 group-hover:from-pink-500/20 group-hover:to-purple-500/20 transition-all duration-700" />
                  <div className="relative">
                    <div className="w-40 h-40 mx-auto mb-8 rounded-3xl overflow-hidden shadow-2xl border-4 border-pink-500/50 group-hover:border-pink-500 transition-all duration-500 group-hover:scale-110">
                      <img 
                        src={appleMusicLogo}
                        alt="Digital Music" 
                        className="w-full h-full object-contain bg-black/50"
                      />
                    </div>
                    <h3 className="text-4xl font-black mb-4 text-pink-400 group-hover:text-white transition-colors duration-500">
                      💿 Digital Music Buying
                    </h3>
                    <p className="text-xl text-gray-300 mb-3">iTunes • Amazon Digital • 7digital</p>
                    <p className="text-lg text-gray-400">⚡ Instant downloads • 🌍 Global availability</p>
                  </div>
                  <Sparkles className="absolute top-4 right-4 w-8 h-8 text-pink-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-spin" />
                </button>

                <button
                  onClick={() => { playSound(); setSelectedPlatform('physical'); }}
                  onMouseEnter={playSound}
                  className="group relative bg-gradient-to-br from-purple-900/40 to-pink-900/40 backdrop-blur-xl rounded-3xl p-12 overflow-hidden border-2 border-purple-500/60 hover:border-purple-500 shadow-2xl transition-all duration-700 hover:scale-105 hover:-translate-y-2 hover:shadow-purple-500/60"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-pink-500/0 group-hover:from-purple-500/20 group-hover:to-pink-500/20 transition-all duration-700" />
                  <div className="relative">
                    <div className="w-40 h-40 mx-auto mb-8 rounded-3xl overflow-hidden shadow-2xl border-4 border-purple-500/50 group-hover:border-purple-500 transition-all duration-500 group-hover:scale-110">
                      <img 
                        src="https://upload.wikimedia.org/wikipedia/en/6/6f/BLACKPINK_-_The_Album.png" 
                        alt="Physical Albums" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="text-4xl font-black mb-4 text-purple-400 group-hover:text-white transition-colors duration-500">
                      📀 Physical Albums Buying
                    </h3>
                    <p className="text-xl text-gray-300 mb-3">Official stores • Counts toward charts</p>
                    <p className="text-lg text-gray-400">🌍 Global • 🇰🇷 Korea • 🇺🇸 USA • 🇬🇧 UK</p>
                  </div>
                  <Star className="absolute top-4 right-4 w-8 h-8 text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse" />
                </button>
              </div>

              <div className="mt-16 text-center max-w-4xl mx-auto">
                <p className="text-2xl text-gray-300 leading-relaxed">
                  Your purchases and streams are the greatest support for BLACKPINK! 💖
                  <br />
                  <span className="text-pink-400 font-bold text-3xl">Every BLINK makes a difference!</span> ✨
                </p>
              </div>
            </div>
          )}

          {activeSection === 'payment' && (
            <div className="max-w-5xl mx-auto animate-slide-in">
              <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent mb-4">
                  💳 Payment Methods 💳
                </h2>
                <p className="text-lg text-gray-300">Multiple ways to support BLACKPINK!</p>
              </div>

              <div className="bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-xl rounded-3xl p-10 border-2 border-pink-500/50 shadow-2xl shadow-pink-500/20">
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="bg-gradient-to-br from-pink-900/30 to-purple-900/30 rounded-2xl p-6 border border-pink-500/30">
                    <h3 className="text-2xl font-bold text-pink-400 mb-6 flex items-center gap-2">
                      <CreditCard className="w-6 h-6" />
                      Credit Cards
                    </h3>
                    <ul className="space-y-3 text-gray-300">
                      {['Visa', 'Mastercard', 'American Express', 'Discover'].map((card) => (
                        <li key={card} className="flex items-center gap-2">
                          <Heart className="w-4 h-4 text-pink-400 fill-pink-400" />
                          {card}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 rounded-2xl p-6 border border-purple-500/30">
                    <h3 className="text-2xl font-bold text-purple-400 mb-6 flex items-center gap-2">
                      <TrendingUp className="w-6 h-6" />
                      Digital Wallets
                    </h3>
                    <ul className="space-y-3 text-gray-300">
                      {['PayPal', 'Apple Pay', 'Google Pay', 'Samsung Pay'].map((wallet) => (
                        <li key={wallet} className="flex items-center gap-2">
                          <Star className="w-4 h-4 text-purple-400 fill-purple-400" />
                          {wallet}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 rounded-2xl p-6 border border-blue-500/30">
                    <h3 className="text-2xl font-bold text-blue-400 mb-6 flex items-center gap-2">
                      <Sparkles className="w-6 h-6" />
                      Gift Cards
                    </h3>
                    <ul className="space-y-3 text-gray-300">
                      {['iTunes Cards', 'Amazon Cards', 'Google Play Cards', 'Spotify Cards'].map((gift) => (
                        <li key={gift} className="flex items-center gap-2">
                          <Sparkles className="w-4 h-4 text-blue-400" />
                          {gift}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'charts' && (
            <div className="space-y-12 animate-slide-in">
              <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent mb-4">
                  📊 Choose Your Chart 📊
                </h2>
                <p className="text-lg text-gray-300">Track BLACKPINK's success around the world!</p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                {chartRegions.map((region, index) => (
                  <button
                    key={region.id}
                    onClick={() => { playSound(); onSelectChart(region.id); }}
                    onMouseEnter={playSound}
                    className={`group relative bg-gradient-to-br ${region.gradient} p-10 rounded-3xl hover:scale-105 transition-all duration-500 border-2 border-white/30 hover:border-white shadow-2xl hover:shadow-xl overflow-hidden animate-float`}
                    style={{ animationDelay: `${index * 0.2}s` }}
                  >
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-all duration-500" />
                    <div className="relative">
                      <h3 className="text-3xl font-black text-white mb-3">{region.title}</h3>
                      <p className="text-white/90 text-lg">{region.description}</p>
                    </div>
                    <BarChart3 className="absolute bottom-4 right-4 w-12 h-12 text-white/20 group-hover:text-white/40 transition-all duration-500 group-hover:scale-125" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
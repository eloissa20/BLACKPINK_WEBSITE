import { useState, useEffect } from 'react';
import {
  Music,
  CreditCard,
  BarChart3,
  TrendingUp,
  ExternalLink,
  ArrowLeft,
  Globe,
  Flag,
} from 'lucide-react';
import { ContinentType } from '../App';

// DDU-DU DDU-DU whistle sound
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

type PlatformKey =
  | 'apple'
  | 'spotify'
  | 'youtube'
  | 'ytmusic'
  | 'deezer'
  | 'pandora'
  | 'stationhead'
  | 'qobuz'
  | 'amazon'
  | 'tidal';

interface Platform {
  name: string;
  logo: string;
  blackpink: string;
  members: Record<string, string>;
  freeRules: string[];
  premiumRules: string[];
  billboardEligible: boolean;
  globalCharts: boolean;
}

const platformData: Record<PlatformKey, Platform> = {
  apple: {
    name: 'Apple Music',
    logo: '/src/assets/logos/apple-music.png',
    blackpink: 'https://music.apple.com/us/artist/blackpink/1252555207',
    members: {
      jisoo: 'https://music.apple.com/us/artist/jisoo/1630130415',
      jennie: 'https://music.apple.com/us/artist/jennie/1486136387',
      rosé: 'https://music.apple.com/us/artist/rosé/1486129974',
      lisa: 'https://music.apple.com/us/artist/lalisa/1587033465',
    },
    freeRules: ['No free tier'],
    premiumRules: ['100% counts'],
    billboardEligible: true,
    globalCharts: true,
  },
  spotify: {
    name: 'Spotify',
    logo: '/src/assets/logos/spotify.png',
    blackpink: 'https://open.spotify.com/artist/41MozSoPIsD1dJM0CLPjZF',
    members: {
      jisoo: 'https://open.spotify.com/artist/4l6fQh6Q7k1kMOp5zoQ2dr',
      jennie: 'https://open.spotify.com/artist/250qxy6r2G0kqwqZncQ1od',
      rosé: 'https://open.spotify.com/artist/3e5t6M2nA5t7v4k0ZTP5uB',
      lisa: 'https://open.spotify.com/artist/5CJ3Oaqh3E0s9L6Hj0S1i8',
    },
    freeRules: ['Free with ads counts'],
    premiumRules: ['Premium weighted higher'],
    billboardEligible: true,
    globalCharts: true,
  },
  youtube: {
    name: 'YouTube',
    logo: '/src/assets/logos/youtube.png',
    blackpink: 'https://www.youtube.com/@BLACKPINK',
    members: {
      jisoo: 'https://www.youtube.com/@sooyaaa__',
      jennie: 'https://www.youtube.com/@jennierubyjane',
      rosé: 'https://www.youtube.com/@roses_are_rosie',
      lisa: 'https://www.youtube.com/@liliilili',
    },
    freeRules: ['All views count'],
    premiumRules: ['Premium higher weight'],
    billboardEligible: true,
    globalCharts: true,
  },
  ytmusic: {
    name: 'YouTube Music',
    logo: '/src/assets/logos/youtube-music.png',
    blackpink: 'https://music.youtube.com/channel/UCOmHUn--16B90oW2L6FRR3A',
    members: { jisoo: '', jennie: '', rosé: '', lisa: '' },
    freeRules: ['Free with ads counts'],
    premiumRules: ['Premium higher weight'],
    billboardEligible: true,
    globalCharts: true,
  },
  deezer: {
    name: 'Deezer',
    logo: '/src/assets/logos/deezer.png',
    blackpink: 'https://www.deezer.com/en/artist/9635624',
    members: { jisoo: '', jennie: '', rosé: '', lisa: '' },
    freeRules: ['Free tier counts'],
    premiumRules: ['HiFi counts'],
    billboardEligible: false,
    globalCharts: true,
  },
  pandora: {
    name: 'Pandora',
    logo: '/src/assets/logos/pandora.png',
    blackpink: 'https://www.pandora.com/artist/blackpink',
    members: { jisoo: '', jennie: '', rosé: '', lisa: '' },
    freeRules: ['USA only'],
    premiumRules: ['Premium higher weight'],
    billboardEligible: true,
    globalCharts: false,
  },
  stationhead: {
    name: 'Stationhead',
    logo: '/src/assets/logos/stationhead.png',
    blackpink: 'https://app.stationhead.com/blackpink',
    members: { jisoo: '', jennie: '', rosé: '', lisa: '' },
    freeRules: ['100% counts'],
    premiumRules: ['Premium boosts'],
    billboardEligible: true,
    globalCharts: true,
  },
  qobuz: {
    name: 'Qobuz',
    logo: '/src/assets/logos/qobuz.png',
    blackpink: 'https://www.qobuz.com/us-en/performer/blackpink/141939',
    members: { jisoo: '', jennie: '', rosé: '', lisa: '' },
    freeRules: ['No free tier'],
    premiumRules: ['HiFi counts'],
    billboardEligible: false,
    globalCharts: true,
  },
  amazon: {
    name: 'Amazon Music',
    logo: '/src/assets/logos/amazon-music.png',
    blackpink: 'https://music.amazon.com/artists/B01LWZY8S7/blackpink',
    members: { jisoo: '', jennie: '', rosé: '', lisa: '' },
    freeRules: ['Shuffled free doesn’t count'],
    premiumRules: ['Unlimited = 100%'],
    billboardEligible: true,
    globalCharts: true,
  },
  tidal: {
    name: 'Tidal',
    logo: '/src/assets/logos/tidal.png',
    blackpink: 'https://tidal.com/browse/artist/8348745',
    members: { jisoo: '', jennie: '', rosé: '', lisa: '' },
    freeRules: ['No free tier'],
    premiumRules: ['HiFi & HiFi Plus = 100%'],
    billboardEligible: true,
    globalCharts: true,
  },
};

const digitalStores = [
  { name: 'iTunes Store', url: 'https://music.apple.com/us/artist/blackpink/1252555207', region: 'Global' },
  { name: 'Amazon Music', url: 'https://music.amazon.com/artists/B01LWZY8S7/blackpink', region: 'Global' },
  { name: '7digital', url: 'https://www.7digital.com/', region: 'Global' },
];

const physicalStores = [
  { name: 'Target', url: 'https://www.target.com/s?searchTerm=blackpink', region: 'USA' },
  { name: 'Walmart', url: 'https://www.walmart.com/search?query=blackpink%20album', region: 'USA' },
  { name: 'Amazon', url: 'https://www.amazon.com/s?k=blackpink+album', region: 'Global' },
  { name: 'YG Shop', url: 'https://shop.ygfamily.com/', region: 'Official' },
];

export function GuidelinesPage({ onSelectChart }: GuidelinesPageProps) {
  const [activeSection, setActiveSection] = useState<'streaming' | 'buying' | 'payment' | 'charts'>('streaming');
  const [selectedPlatform, setSelectedPlatform] = useState<PlatformKey | null>(null);
  const playSound = useSound();

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

  if (selectedPlatform) {
    const platform = platformData[selectedPlatform];

    return (
      <div className="h-full p-8 overflow-y-auto bg-gradient-to-br from-black via-purple-900/30 to-black">
        <div className="max-w-5xl mx-auto">
          <button onClick={() => setSelectedPlatform(null)} className="flex items-center gap-3 text-pink-400 hover:text-pink-300 mb-10 font-semibold">
            <ArrowLeft className="w-6 h-6" /> Back to Guidelines
          </button>

          <div className="text-center mb-12">
            <img src={platform.logo} alt={platform.name} className="w-32 h-32 mx-auto mb-6 rounded-2xl shadow-2xl border-2 border-pink-500" onMouseEnter={playSound} />
            <h1 className="text-5xl font-black text-white">{platform.name}</h1>
            <p className="text-xl text-gray-400 mt-2">Streaming Guide for BLINKs</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            <div className="bg-transparent backdrop-blur-xl rounded-3xl p-8 border-2 border-pink-500 shadow-2xl">
              <h2 className="text-3xl font-bold text-pink-400 mb-6">Free Tier</h2>
              <ul className="space-y-4 text-gray-200 text-lg">
                {platform.freeRules.map((rule, i) => (
                  <li key={i} className="flex gap-3"><span className="text-pink-400">•</span> {rule}</li>
                ))}
              </ul>
            </div>
            <div className="bg-transparent backdrop-blur-xl rounded-3xl p-8 border-2 border-purple-500 shadow-2xl">
              <h2 className="text-3xl font-bold text-purple-400 mb-6">Premium Tier</h2>
              <ul className="space-y-4 text-gray-200 text-lg">
                {platform.premiumRules.map((rule, i) => (
                  <li key={i} className="flex gap-3"><span className="text-purple-400">•</span> {rule}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="space-y-8">
            <h2 className="text-4xl font-black text-white text-center">Official Links</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              <a
                href={platform.blackpink}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-br from-pink-600 to-purple-700 p-10 rounded-3xl text-center hover:scale-105 transition text-2xl font-bold text-white shadow-xl border-2 border-pink-500"
                onMouseEnter={playSound}
              >
                BLACKPINK
              </a>
              {Object.entries(platform.members)
                .filter(([_, url]) => url)
                .map(([member, url]) => (
                  <a
                    key={member}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-800/90 p-10 rounded-3xl text-center hover:bg-gray-700 transition text-xl font-bold text-white capitalize shadow-xl border-2 border-pink-500"
                    onMouseEnter={playSound}
                  >
                    {member}
                  </a>
                ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full p-8 overflow-y-auto bg-gradient-to-b from-black to-purple-900/20">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-6xl font-black text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500">
          STREAMING & BUYING GUIDELINES
        </h1>

        <div className="flex justify-center mb-16">
          <div className="backdrop-blur-md rounded-3xl p-3 flex flex-wrap justify-center gap-4">
            {sections.map((s) => {
              const Icon = s.icon;
              return (
                <button
                  key={s.id}
                  onClick={() => {
                    playSound();
                    setActiveSection(s.id);
                  }}
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

        {activeSection === 'streaming' && (
          <div className="space-y-16">
            <h2 className="text-5xl font-black text-white text-center mb-12">Streaming Platforms</h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-10 max-w-6xl mx-auto">
              {Object.entries(platformData).map(([key, plat]) => (
                <button
                  key={key}
                  onClick={() => {
                    playSound();
                    setSelectedPlatform(key as PlatformKey);
                  }}
                  onMouseEnter={playSound}
                  className="group relative bg-transparent rounded-3xl p-8 transition-all duration-500 hover:scale-110 border-2 border-pink-500"
                  style={{
                    background: 'rgba(255,105,180,0.1)',
                    backdropFilter: 'blur(10px)',
                    boxShadow: '0 0 40px rgba(236, 72, 153, 0.4)',
                  }}
                >
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-pink-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  <img
                    src={plat.logo}
                    alt={plat.name}
                    className="w-48 h-48 mx-auto object-contain drop-shadow-2xl transition-all duration-500 group-hover:drop-shadow-[0_0_40px_rgba(255,105,180,0.9)]"
                  />
                </button>
              ))}
            </div>

            {/* Keep your original glow cards for Billboard/Global */}
            <div className="space-y-16 mt-24">
              <div className="bg-transparent border-2 border-pink-500 rounded-3xl p-10 backdrop-blur-xl">
                <div className="flex items-center justify-center gap-4 mb-10">
                  <Flag className="w-12 h-12 text-red-400" />
                  <h3 className="text-4xl font-black text-white">US BLINKS → Billboard Hot 100</h3>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
                  {Object.values(platformData)
                    .filter(p => p.billboardEligible)
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
                  {Object.values(platformData)
                    .filter(p => p.globalCharts)
                    .map(p => (
                      <div key={p.name} className="bg-transparent rounded-3xl p-6 border-2 border-purple-500 backdrop-blur-sm">
                        <img src={p.logo} alt="" className="w-32 h-32 mx-auto object-contain" />
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'buying' && (
          <div className="space-y-10">
            <h2 className="text-4xl font-black text-white text-center mb-10">Buying Guidelines</h2>
            <div className="grid md:grid-cols-2 gap-10">
              <div className="bg-gray-900/60 backdrop-blur-xl rounded-3xl p-8 border-2 border-pink-400">
                <h3 className="text-2xl font-bold text-pink-400 mb-6">Digital Stores</h3>
                {digitalStores.map((store, i) => (
                  <a
                    key={i}
                    href={store.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-4 bg-gray-800/50 rounded-xl hover:bg-gray-700/60 transition mb-3 group"
                    onMouseEnter={playSound}
                  >
                    <div>
                      <span className="text-white font-semibold">{store.name}</span>
                      <span className="text-gray-400 text-sm ml-2">({store.region})</span>
                    </div>
                    <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-pink-400" />
                  </a>
                ))}
              </div>

              <div className="bg-gray-900/60 backdrop-blur-xl rounded-3xl p-8 border-2 border-purple-400">
                <h3 className="text-2xl font-bold text-purple-400 mb-6">Physical Albums</h3>
                {physicalStores.map((store, i) => (
                  <a
                    key={i}
                    href={store.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-4 bg-gray-800/50 rounded-xl hover:bg-gray-700/60 transition mb-3 group"
                    onMouseEnter={playSound}
                  >
                    <div>
                      <span className="text-white font-semibold">{store.name}</span>
                      <span className="text-gray-400 text-sm ml-2">({store.region})</span>
                    </div>
                    <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-purple-400" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}

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
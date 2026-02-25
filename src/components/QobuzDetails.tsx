import { ArrowLeft } from 'lucide-react';
import qobuzLogo from '../assets/logos/qobuz.png';

interface Props {
  onBack: () => void;
  playSound: () => void;
}

export function QobuzDetails({ onBack, playSound }: Props) {
  const platform = {
    name: 'Qobuz',
    logo: qobuzLogo,
    blackpink: 'https://www.qobuz.com/us-en/performer/blackpink/141939',
    members: { jisoo: '', jennie: '', rosé: '', lisa: '' },
    freeRules: ['No free tier'],
    premiumRules: ['HiFi counts'],
  };

  return (
    <div className="h-full p-8 overflow-y-auto bg-gradient-to-br from-black via-purple-900/30 to-black">
      <div className="max-w-5xl mx-auto">
        <button onClick={onBack} className="flex items-center gap-3 text-pink-400 hover:text-pink-300 mb-10 font-semibold">
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
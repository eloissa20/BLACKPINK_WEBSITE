// src/components/DigitalBuying.tsx
import { ArrowLeft } from 'lucide-react';

interface Props {
  onBack: () => void;
  playSound: () => void;
}

const stores = [
  { name: 'iTunes Store', url: 'https://music.apple.com/us/artist/blackpink/1252555207', region: 'Global', logo: 'https://logos-world.net/wp-content/uploads/2020/11/Apple-Music-Logo-2015-present.png' },
  { name: 'Amazon Music Digital', url: 'https://music.amazon.com/artists/B01LWZY8S7/blackpink', region: 'Global', logo: 'https://s.yimg.com/ny/api/res/1.2/ath09PwmcYUGLnFkt5BDFw--/YXBwaWQ9aGlnaGxhbmRlcjt3PTk2MDtoPTU0MA--/https://media.zenfs.com/en/creative_bloq_161/ee33ecc1b6d5ab9ac7b660c437f6ff61' },
  { name: '7digital', url: 'https://www.7digital.com/', region: 'Global', logo: '' }, // Add logo if you have one
];

export function DigitalBuying({ onBack, playSound }: Props) {
  return (
    <div className="h-full p-8 overflow-y-auto bg-gradient-to-br from-black via-purple-900/30 to-black">
      <div className="max-w-5xl mx-auto">
        <button onClick={onBack} onMouseEnter={playSound} className="flex items-center gap-3 text-pink-400 hover:text-pink-300 mb-12 font-bold text-xl transition">
          <ArrowLeft className="w-8 h-8" /> Back to Buying Methods
        </button>

        <h1 className="text-6xl font-black text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500">
          Digital Music Buying
        </h1>

        <div className="grid md:grid-cols-3 gap-10">
          {stores.map((store) => (
            <a
              key={store.name}
              href={store.url}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={playSound}
              className="group relative bg-black/60 backdrop-blur-xl rounded-3xl p-8 text-center border-2 border-pink-500/50 transition-all hover:scale-105 hover:border-pink-400 shadow-2xl"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              {store.logo && (
                <img src={store.logo} alt={store.name} className="w-32 h-32 mx-auto mb-6 object-contain drop-shadow-xl" />
              )}
              <h3 className="text-2xl font-black text-pink-300 mb-2">{store.name}</h3>
              <p className="text-gray-400">{store.region}</p>
            </a>
          ))}
        </div>

        <p className="text-center text-gray-400 mt-16 text-lg">
          Digital purchases count toward global charts and are instantly available worldwide.
        </p>
      </div>
    </div>
  );
}
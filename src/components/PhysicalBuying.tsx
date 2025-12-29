// src/components/PhysicalBuying.tsx
import { ArrowLeft } from 'lucide-react';
import { useState } from 'react';

interface Props {
  onBack: () => void;
  playSound: () => void;
}

interface StoreItem {
  store: string;
  contributes: string;
  description: string;
  url?: string;
  logo?: string;
  note?: string;
}

const tabs = ['Global', 'South Korea', 'USA', 'UK'] as const;
type Tab = typeof tabs[number];

const data: Record<Tab, StoreItem[]> = {
  Global: [
    {
      store: 'Amazon',
      contributes: 'Billboard, Hanteo, Gaon, UK Official Charts (sometimes)',
      description: 'Global online shopping in many countries. Accepts Visa/Mastercard.',
      url: 'https://www.amazon.com/s?k=blackpink+album',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg',
    },
  ],
  'South Korea': [
    {
      store: 'YG SELECT',
      contributes: 'Hanteo, Gaon',
      description: 'YG official store (being phased out soon). Worldwide shipping to most countries.',
      logo: 'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/23/c6/87/23c6877d-e105-8587-61e7-e09c4c6efc92/AppIcon-0-0-1x_U007emarketing-0-8-0-85-220.png/1200x630wa.jpg',
      note: 'Being phased out by YGE soon',
    },
    {
      store: 'KTOWN4U',
      contributes: 'Hanteo, Gaon',
      description: 'Popular K-pop store with reliable worldwide shipping.',
      logo: 'https://i.ytimg.com/vi/xMJ26sq64iE/maxresdefault.jpg',
    },
    {
      store: 'ALADIN',
      contributes: 'Hanteo, Gaon',
      description: 'Korean bookstore & music retailer with worldwide shipping.',
    },
    {
      store: 'HOTTRACKS',
      contributes: 'Hanteo',
      description: 'Domestic shipping only.',
    },
    {
      store: 'INTERPARK',
      contributes: 'Hanteo, Gaon',
      description: 'Major Korean ticketing & shopping site with worldwide shipping.',
    },
    {
      store: 'KPOPMART',
      contributes: 'Hanteo',
      description: 'Dedicated K-pop store with worldwide shipping.',
    },
    {
      store: 'SYNNARA',
      contributes: 'Hanteo, Gaon',
      description: 'Long-standing Korean music retailer with worldwide shipping.',
    },
    {
      store: 'YES24',
      contributes: 'Hanteo, Gaon',
      description: 'Major Korean online retailer with worldwide shipping.',
    },
  ],
  USA: [
    {
      store: 'Official USA Store',
      contributes: 'Billboard, Gaon',
      description: 'BLACKPINK official US merchandise & albums.',
    },
    {
      store: 'Barnes & Noble',
      contributes: 'Billboard, Gaon',
      description: 'Available online and in physical stores across the US.',
    },
    {
      store: 'Target',
      contributes: 'Billboard, Gaon',
      description: 'Major US retailer – available online & in-store.',
      logo: 'https://1000logos.net/wp-content/uploads/2017/06/Color-Target-logo.png',
    },
    {
      store: 'Walmart',
      contributes: 'Billboard, Gaon',
      description: 'Available online and in thousands of US locations.',
    },
  ],
  UK: [
    {
      store: 'Official UK Store',
      contributes: 'Official Charts (UK), Gaon',
      description: 'Official BLACKPINK UK merchandise & albums.',
      note: 'Use with caution: reported delays in fulfillment (as of 2021)',
    },
    {
      store: 'HMV',
      contributes: 'Official Charts (UK), Gaon',
      description: 'Premier UK music retailer – highly recommended.',
      logo: 'https://upload.wikimedia.org/wikipedia/en/2/2f/HMV_logo.svg',
    },
  ],
};

export function PhysicalBuying({ onBack, playSound }: Props) {
  const [activeTab, setActiveTab] = useState<Tab>('Global');

  return (
    <div className="min-h-screen bg-black overflow-hidden relative">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-pink-900/20" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(236,72,153,0.15),transparent_70%)] animate-pulse" />
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Back Button */}
        <button
          onClick={onBack}
          onMouseEnter={playSound}
          className="flex items-center gap-3 text-pink-400 hover:text-pink-300 mb-12 font-bold text-xl transition-all duration-500 hover:-translate-x-2 group"
        >
          <ArrowLeft className="w-8 h-8 transition-transform group-hover:-translate-x-1" />
          Back to Buying Methods
        </button>

        {/* Hero Section - Text moved to bottom */}
        <div className="relative text-center mb-20">
          <div className="relative overflow-hidden rounded-3xl shadow-2xl">
            <img
              src="https://phinf.wevpstatic.net/MjAyNTA3MTFfMjk0/MDAxNzUyMjA1NzA5NjAw.OgupiTBrwDfDuMc-Y_az-M0Jt3sDxnIUHOozxtG4kw4g.2Th_wRKOE4HSn9cj_zAEGDyfYQp_ppXacIKZ7ZF_-OYg.JPEG/5b224ece-a958-49cf-b1c8-694d430e9885.jpeg?type=w1414"
              alt="BLACKPINK"
              className="w-full h-96 md:h-[40rem] object-cover brightness-75"
            />
            {/* Dark gradient from bottom for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
          </div>

          {/* Text overlay positioned at the bottom */}
          <div className="absolute inset-x-0 bottom-0 pb-12 px-8 flex flex-col items-center pointer-events-none">
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-400 to-pink-500 bg-[length:200%_200%] animate-[gradient_8s_ease_infinite]">
              PHYSICAL ALBUMS
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mt-6 font-medium">
              Support BLACKPINK on global charts
            </p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center gap-6 mb-24 flex-wrap">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              onMouseEnter={playSound}
              className={`relative px-8 py-4 rounded-full font-bold text-xl tracking-wide transition-all duration-500 overflow-hidden
                ${activeTab === tab
                  ? 'text-white shadow-2xl shadow-pink-600/50'
                  : 'text-gray-500 hover:text-gray-200'
                }`}
            >
              <span className="relative z-10">{tab}</span>
              {activeTab === tab && (
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-600 via-purple-600 to-pink-600 animate-pulse" />
              )}
              {activeTab === tab && (
                <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-pink-500/40 to-purple-500/40 blur-2xl animate-ping" />
              )}
            </button>
          ))}
        </div>

        {/* Stores Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 pb-32">
          {data[activeTab].map((item, index) => (
            <div
              key={item.store}
              className="group relative"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="h-[620px] relative bg-gradient-to-br from-gray-900/90 via-purple-900/20 to-pink-900/30 backdrop-blur-xl rounded-3xl p-10 border border-pink-500/20 overflow-hidden shadow-2xl transition-all duration-700 group-hover:-translate-y-6 group-hover:shadow-pink-500/40 flex flex-col">
                {/* Glow Orb */}
                <div className="absolute -top-20 -right-20 w-64 h-64 bg-pink-600/20 rounded-full blur-3xl group-hover:bg-pink-500/30 transition-all duration-1000" />

                {/* Logo */}
                <div className="relative z-10 mb-8">
                  {item.logo ? (
                    <div className="w-32 h-32 mx-auto rounded-2xl overflow-hidden shadow-2xl border-4 border-pink-500/30">
                      <img
                        src={item.logo}
                        alt={item.store}
                        className="w-full h-full object-contain bg-black/50 p-4 group-hover:scale-110 transition-transform duration-700"
                      />
                    </div>
                  ) : (
                    <div className="w-32 h-32 mx-auto bg-gradient-to-br from-pink-900/60 to-purple-900/60 rounded-2xl border-4 border-dashed border-pink-500/40 flex items-center justify-center">
                      <span className="text-5xl font-black text-pink-400">
                        {item.store.slice(0, 2).toUpperCase()}
                      </span>
                    </div>
                  )}
                </div>

                {/* Store Name */}
                <h3 className="text-3xl font-black text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400 mb-6 group-hover:from-pink-300 group-hover:to-purple-300 transition-all duration-500">
                  {item.store}
                </h3>

                {/* Contributes */}
                <div className="text-center mb-6">
                  <p className="text-sm uppercase tracking-wider text-pink-300 font-semibold">Contributes to</p>
                  <p className="text-gray-300 text-sm mt-2">{item.contributes}</p>
                </div>

                {/* Description */}
                <p className="text-gray-300 text-center leading-relaxed mb-8 flex-1">
                  {item.description}
                </p>

                {/* Note */}
                {item.note && (
                  <div className="bg-yellow-900/40 border border-yellow-600/60 rounded-2xl px-5 py-4 text-yellow-300 text-center font-bold mb-8 animate-pulse">
                    ⚠️ {item.note}
                  </div>
                )}

                {/* CTA */}
                <div className="mt-auto">
                  {item.url ? (
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onMouseEnter={playSound}
                      className="relative block w-full py-4 text-center text-lg font-bold text-white rounded-full overflow-hidden group/btn"
                    >
                      <span className="relative z-10">Visit Store →</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500" />
                    </a>
                  ) : (
                    <div className="h-12" />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg max-w-3xl mx-auto">
            Always verify with your local BLINK community for the latest chart-eligible purchase links and updates.
          </p>
        </div>
      </div>
    </div>
  );
}
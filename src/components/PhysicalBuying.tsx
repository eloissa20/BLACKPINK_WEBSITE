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
  tips?: {
    steps: string[];
    benefits?: string[];
  };
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
      tips: {
        steps: [
          'Search for the latest BLACKPINK album + version you want',
          'Choose official or trusted sellers (avoid third-party resellers for chart eligibility)',
          'Complete purchase and keep receipt / order confirmation',
          'Most Amazon purchases count toward global & national charts if shipped from eligible regions',
        ],
        benefits: [
          'Wide availability and fast shipping in many countries',
          'Often contributes to Billboard / Hanteo when bought in first week',
        ],
      },
    },
  ],
  'South Korea': [
    {
      store: 'YG SELECT',
      contributes: 'Hanteo, Gaon',
      description: 'YG official store (being phased out soon). Worldwide shipping to most countries.',
      url: 'https://www.ygselect.com/',
      logo: 'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/23/c6/87/23c6877d-e105-8587-61e7-e09c4c6efc92/AppIcon-0-0-1x_U007emarketing-0-8-0-85-220.png/1200x630wa.jpg',
      tips: {
        steps: [
          'Access via Korean IP if needed (VPN sometimes helps)',
          'Select desired version and add to cart',
          'Checkout with international shipping option',
        ],
      },
    },
    {
      store: 'KTOWN4U',
      contributes: 'Hanteo, Gaon',
      description: 'Popular K-pop store with reliable worldwide shipping.',
      url: 'https://www.ktown4u.com/',
      logo: 'https://i.ytimg.com/vi/xMJ26sq64iE/maxresdefault.jpg',
      tips: {
        steps: [
          'Create account and verify email',
          'Search BLACKPINK latest release',
          'Select version → checkout with global shipping',
        ],
      },
    },
    {
      store: 'KPOPMART',
      contributes: 'Hanteo',
      description: 'Dedicated K-pop store with worldwide shipping.',
      url: 'https://www.kpopmart.com/',
      tips: {
        steps: [
          'Browse BLACKPINK section',
          'Select version and checkout',
        ],
      },
    },
    {
      store: 'SYNNARA',
      contributes: 'Hanteo, Gaon',
      description: 'Long-standing Korean music retailer with worldwide shipping.',
      url: 'https://www.syn-nara.co.kr/',
      tips: {
        steps: [
          'Search for BLACKPINK',
          'Choose version and ship internationally',
        ],
      },
    },
    {
      store: 'YES24',
      contributes: 'Hanteo, Gaon',
      description: 'Major Korean online retailer with worldwide shipping.',
      url: 'https://www.yes24.com/',
      tips: {
        steps: [
          'Use international shipping',
          'Purchase during promo periods if available',
        ],
      },
    },
  ],
  USA: [
    {
      store: 'Official USA Store',
      contributes: 'Billboard, Gaon',
      description: 'BLACKPINK official US merchandise & albums.',
      url: 'https://shop.us.ygfamily.com/', // update if changed
      tips: {
        steps: [
          'Visit during release week',
          'Buy physical album (no bundles with non-music items if possible)',
          'Keep order confirmation for proof',
        ],
        benefits: [
          'Direct contribution to Billboard 200',
          'Eligible for first-week tracking',
        ],
      },
    },
    {
      store: 'Barnes & Noble',
      contributes: 'Billboard, Gaon',
      description: 'Available online and in physical stores across the US.',
      url: 'https://www.barnesandnoble.com/s/blackpink',
      tips: {
        steps: [
          'Order online or buy in-store',
          'Prefer in-store pickup for faster reporting',
        ],
      },
    },
    {
      store: 'Target',
      contributes: 'Billboard, Gaon',
      description: 'Major US retailer – available online & in-store.',
      url: 'https://www.target.com/s?searchTerm=blackpink+album',
      logo: 'https://1000logos.net/wp-content/uploads/2017/06/Color-Target-logo.png',
      tips: {
        steps: [
          'Check for exclusive versions',
          'Buy in first tracking week',
          'Online orders usually report quickly',
        ],
      },
    },
    {
      store: 'Walmart',
      contributes: 'Billboard, Gaon',
      description: 'Available online and in thousands of US locations.',
      url: 'https://www.walmart.com/search?q=blackpink+album',
      tips: {
        steps: [
          'In-store or online purchase',
          'Multiple copies allowed (but follow local limits)',
        ],
      },
    },
  ],
  UK: [
    {
      store: 'Official UK Store',
      contributes: 'Official Charts (UK), Gaon',
      description: 'Official BLACKPINK UK merchandise & albums.',
      url: 'https://shop.ygfamily.com/', // adjust to UK-specific if exists
      note: 'Use with caution: reported delays in fulfillment in past',
      tips: {
        steps: [
          'Order early to avoid stock issues',
          'Physical albums count toward UK Official Charts',
        ],
      },
    },
    {
      store: 'HMV',
      contributes: 'Official Charts (UK), Gaon',
      description: 'Premier UK music retailer – highly recommended.',
      url: 'https://www.hmv.com/store/music/search?query=blackpink',
      logo: 'https://upload.wikimedia.org/wikipedia/en/2/2f/HMV_logo.svg',
      tips: {
        steps: [
          'Buy online or in-store',
          'HMV purchases are well-tracked for OCC charts',
        ],
        benefits: [
          'Strong contribution to UK charts',
          'Reliable reporting',
        ],
      },
    },
  ],
};

export function PhysicalBuying({ onBack, playSound }: Props) {
  const [activeTab, setActiveTab] = useState<Tab>('Global');
  const [flipped, setFlipped] = useState<Record<string, boolean>>({});

  const toggleFlip = (store: string) => {
    setFlipped((prev) => ({ ...prev, [store]: !prev[store] }));
  };

  // Embedded CSS for flip cards
  const flipStyles = `
    .perspective-1000 { perspective: 1000px; }
    .transform-style-preserve-3d { transform-style: preserve-3d; }
    .backface-hidden { backface-visibility: hidden; }
    .rotate-y-180 { transform: rotateY(180deg); }
  `;

  const isUSA = activeTab === 'USA';

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: flipStyles }} />

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

          {/* Hero Section */}
          <div className="relative text-center mb-20">
            <div className="relative overflow-hidden rounded-3xl shadow-2xl">
              <img
                src="src/assets/deadliness.png"
                alt="BLACKPINK Physical Albums"
                className="w-full h-96 md:h-[40rem] object-cover brightness-75"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
            </div>

            <div className="absolute inset-x-0 bottom-0 pb-12 px-8 flex flex-col items-center pointer-events-none">
              <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-400 to-pink-500 bg-[length:200%_200%] animate-[gradient_8s_ease_infinite]">
                PHYSICAL ALBUMS
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 mt-6 font-medium">
                Support BLACKPINK on global charts
              </p>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex justify-center gap-6 mb-24 flex-wrap">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                onMouseEnter={playSound}
                className={`relative px-8 py-4 rounded-full font-bold text-xl tracking-wide transition-all duration-500 overflow-hidden
                  ${activeTab === tab ? 'text-white shadow-2xl shadow-pink-600/50' : 'text-gray-500 hover:text-gray-200'}`}
              >
                <span className="relative z-10">{tab}</span>
                {activeTab === tab && (
                  <>
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-600 via-purple-600 to-pink-600 animate-pulse" />
                    <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-pink-500/40 to-purple-500/40 blur-2xl animate-ping" />
                  </>
                )}
              </button>
            ))}
          </div>

          {/* USA Reminder Block - Physical Guidelines */}
          {isUSA && (
            <div className="bg-gradient-to-br from-red-900/40 via-pink-900/30 to-purple-900/20 backdrop-blur-xl rounded-3xl p-8 mb-12 border border-pink-500/40 text-gray-200">
              <h3 className="text-3xl font-black text-center bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent mb-6">
                USA PHYSICAL BUYING GUIDELINES
              </h3>
              <p className="text-lg mb-6 text-center font-medium">
                Key rules to maximize chart impact on Billboard 200 while staying safe from bulk flags.
              </p>

              <div className="space-y-4 text-base">
                <p className="font-semibold text-yellow-300 text-lg">𝗢𝘃𝗲𝗿𝗮𝗹𝗹 𝗥𝘂𝗹𝗲𝘀 🚨</p>
                <ul className="list-disc pl-6 space-y-3">
                  <li><strong>4 copies MAX per version per customer per store</strong> — this is the safe limit most fanbases follow to ensure sales count without triggering anti-bulk filters.</li>
                  <li><strong>In-person (cash buys at stores like Target, Walmart, Barnes & Noble)</strong>: Limit to 4 albums per version per transaction. If the store has more stock, do multiple separate transactions (different times/cashiers if needed).</li>
                  <li><strong>Low stock tip</strong>: Many stores don't carry large quantities → buy everything available, but split purchases so no single transaction exceeds 4 per version.</li>
                  <li><strong>NO bulk buying</strong>: Avoid purchasing large quantities at once (online or in-person) — this risks sales not counting toward Billboard. Spread buys across multiple people/stores if needed.</li>
                  <li>Buy during the first tracking week for maximum impact. Keep receipts/order confirmations.</li>
                </ul>
              </div>
            </div>
          )}

          {/* Stores Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 pb-32">
            {data[activeTab].map((item) => {
              const isFlipped = flipped[item.store] || false;
              const hasExtra = item.note || item.tips;

              return (
                <div
                  key={item.store}
                  className={`group relative h-[620px] transition-transform duration-700 transform-style-preserve-3d cursor-pointer ${isFlipped ? 'rotate-y-180' : ''}`}
                  onClick={() => hasExtra && toggleFlip(item.store)}
                >
                  {/* Front face */}
                  <div className="absolute inset-0 backface-hidden bg-gradient-to-br from-gray-900/90 via-purple-900/20 to-pink-900/30 backdrop-blur-xl rounded-3xl p-10 border border-pink-500/20 shadow-2xl flex flex-col">
                    <div className="absolute -top-20 -right-20 w-64 h-64 bg-pink-600/20 rounded-full blur-3xl group-hover:bg-pink-500/30 transition-all duration-1000" />

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

                    <h3 className="text-3xl font-black text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400 mb-6 group-hover:from-pink-300 group-hover:to-purple-300 transition-all duration-500">
                      {item.store}
                    </h3>

                    <div className="text-center mb-6">
                      <p className="text-sm uppercase tracking-wider text-pink-300 font-semibold">Contributes to</p>
                      <p className="text-gray-300 text-sm mt-2">{item.contributes}</p>
                    </div>

                    <p className="text-gray-300 text-center leading-relaxed mb-8 flex-1">
                      {item.description}
                    </p>

                    {item.note && (
                      <div className="bg-yellow-900/40 border border-yellow-600/60 rounded-2xl px-5 py-4 text-yellow-300 text-center font-bold mb-8 animate-pulse">
                        ⚠️ {item.note}
                      </div>
                    )}

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
                        <button
                          disabled
                          className="relative block w-full py-4 text-center text-lg font-bold text-gray-500 rounded-full bg-gray-800/50 cursor-not-allowed"
                        >
                          <span className="relative z-10">Check Store</span>
                        </button>
                      )}
                    </div>

                    {hasExtra && (
                      <p className="text-center text-sm text-gray-400 mt-4">
                        Click card to see tips →
                      </p>
                    )}
                  </div>

                  {/* Back face - Tips / Guide */}
                  {hasExtra && (
                    <div className="absolute inset-0 backface-hidden rotate-y-180 bg-gradient-to-br from-gray-900/95 to-purple-950/80 backdrop-blur-xl rounded-3xl p-8 border border-pink-500/40 shadow-2xl flex flex-col overflow-y-auto">
                      <h4 className="text-2xl font-black text-center text-pink-300 mb-6">
                        {item.store} Buying Tips
                      </h4>

                      {item.tips?.steps && (
                        <ol className="list-decimal pl-6 space-y-3 text-gray-200 mb-8 text-sm">
                          {item.tips.steps.map((step, i) => (
                            <li key={i}>{step}</li>
                          ))}
                        </ol>
                      )}

                      {item.tips?.benefits && (
                        <div className="mt-auto">
                          <p className="font-semibold text-pink-300 mb-3">BENEFITS:</p>
                          <ul className="list-disc pl-6 space-y-2 text-gray-300 text-sm">
                            {item.tips.benefits.map((ben, i) => (
                              <li key={i}>{ben}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {item.note && (
                        <div className="bg-yellow-900/40 border border-yellow-600/60 rounded-2xl px-5 py-4 text-yellow-300 text-center font-bold mt-6">
                          ⚠️ {item.note}
                        </div>
                      )}

                      <p className="text-center text-sm text-gray-400 mt-6">
                        Click to flip back
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Footer */}
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg max-w-3xl mx-auto">
              Physical purchases count most in the first tracking week. Follow safe buying limits to ensure they report properly. Always coordinate with your local BLINK community for the latest tips and links.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
// src/components/DigitalBuying.tsx
import { ArrowLeft } from 'lucide-react';
import { useState } from 'react';

interface Props {
  onBack: () => void;
  playSound: () => void;
}

interface DigitalStore {
  name: string;
  url: string;
  region: string;
  logo?: string;
  description?: string | string[];
  contributes?: string;
  note?: string;
  guide?: {
    steps: string[];
    benefits: string[];
  };
}

const tabs = ['Global', 'USA', 'UK', 'Billboard 2026 Guide'] as const;
type Tab = typeof tabs[number];

const data: Record<Tab, DigitalStore[]> = {
  Global: [
    {
      name: 'Apple Music / iTunes',
      url: 'https://music.apple.com/us/artist/blackpink/1141774019',
      region: 'Global',
      logo: 'https://logos-world.net/wp-content/uploads/2020/11/Apple-Music-Logo-2015-present.png',
      contributes: 'Streams + digital album/track sales',
      description: 'High-quality streaming and permanent digital purchases — widely accepted worldwide.',
      guide: {
        steps: [
          'Open Apple Music or iTunes in your country',
          'Search for BLACKPINK',
          'Stream songs daily (especially on premium)',
          'Optionally buy tracks/albums for permanent support',
        ],
        benefits: [
          'Premium streams have strong chart weight globally',
          'Purchases count as sales in most countries',
          'Works in almost every region without VPN',
        ],
      },
    },
    {
      name: 'Spotify',
      url: 'https://open.spotify.com/artist/41MozSoPIsD1dJM0CLPjZF',
      region: 'Global',
      logo: 'https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_Green.png',
      contributes: 'Streams (major impact on global charts)',
      description: 'Most popular streaming platform — playlisting & discovery drive massive plays.',
      guide: {
        steps: [
          'Use Spotify Premium if possible',
          'Add BLACKPINK songs to playlists',
          'Stream full songs (not just 30 seconds)',
          'Listen daily — multiple devices help',
        ],
        benefits: [
          'Very high streaming weight on global & many national charts',
          'Playlist adds = long-term streaming growth',
          'Easiest platform for consistent daily support',
        ],
      },
    },
    {
      name: 'YouTube Music',
      url: 'https://music.youtube.com/channel/UCOmHUn--16B90oW2L6FRR3A',
      region: 'Global',
      logo: 'https://www.logo.wine/a/logo/YouTube_Music/YouTube_Music-Logo.wine.svg',
      contributes: 'Streams + views',
      description: 'Premium audio/video streaming. Note: Main YouTube views removed from Billboard Jan 2026.',
      note: 'Focus on YouTube Music premium for better counting',
      guide: {
        steps: [
          'Use YouTube Music (not regular YouTube)',
          'Get Premium for ad-free + background play',
          'Stream full tracks/albums in audio mode',
          'Repeat plays in playlist or library',
        ],
        benefits: [
          'Premium audio streams still count on many charts post-2026',
          'Great for music show views & fan campaigns',
          'Offline downloads available with Premium',
        ],
      },
    },
    {
      name: 'Amazon Music',
      url: 'https://music.amazon.com/artists/B01LWZY8S7/blackpink',
      region: 'Global',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg',
      contributes: 'Streams + digital purchases',
      description: 'Unlimited streaming + digital album/track sales in many countries.',
      guide: {
        steps: [
          'Sign into Amazon Music',
          'Choose Unlimited plan if available',
          'Search & stream BLACKPINK',
          'Buy digital tracks/albums when desired',
        ],
        benefits: [
          'HD/Ultra HD streams in some regions',
          'Purchases count toward sales charts',
          'Good alternative to Spotify/Apple',
        ],
      },
    },
  ],

  USA: [
    {
      name: 'iTunes / Apple Music (US)',
      url: 'https://music.apple.com/us/artist/blackpink/1141774019',
      region: 'USA',
      logo: 'https://logos-world.net/wp-content/uploads/2020/11/Apple-Music-Logo-2015-present.png',
      contributes: 'Billboard Hot 100, Billboard 200 & Global 200 (digital sales)',
      description: [ 'Minimum of 10 iTunes accounts required.', 'Digital track and album purchases count directly toward Billboard charts.', ],
      guide: {
        steps: [
          'Go to iTunes or Apple Music US store',
          'Search for BLACKPINK DEADLINE',
          'Buy TITLE TRACK first and buy other tracks individually (NOT "Complete Album")',
          'After buying, go to LIBRARY ⇢ DELETE the downloaded tracks so the purchase counts toward Billboard',
          'Maximum of 4 itunes purchase per payment method',
        ],
        benefits: [
          'Each track purchase = 1 sale toward Digital Song Sales',
          '10 track sales = 1 album unit (TEA)',
          'Helps both Hot 100, Global 200 & Billboard 200 ,',
        ],
      },
    },
    {
      name: 'Amazon Music (US)',
      url: 'https://music.amazon.com/artists/B01LWZY8S7/blackpink',
      region: 'USA',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg',
      contributes: 'Billboard Hot 100, Billboard 200 & Global 200 (streams + digital sales)',
      description: '1 Amazon account PER card',
      guide: {
        steps: [
          'Sign in or Create Account on Amazon Music Website/App',
          'Use the search bar to find BLACKPINK – DEADLINE, ensuring it includes all tracks, with priority on the title track',
          'Select the purchase option and choose MP3 Album or Pre-Order MP3 Album',
          'Do NOT CLICK Pre-Order MP3 Album Pay now',
          'Buy each track individually',
          'Click "BUY MP3 SONG" button',
          'Purchased made will be available on your AMAZON MUSIC LIBRARY',
          'In LIBRARY ⇢ "PURCHASED" to DOWNLOAD the song by clicking the THREE-DOT icon',
        ],
        benefits: [
          'Direct sales count for Billboard',
          'Push for Amazon Best seller',
          '1 purchase = 1 full Billboard unit',
          'Streaming needs 1,250–3,750 streams for the same result',
        ],
      },
    },
    {
      name: 'Qobuz (US)',
      url: 'https://www.qobuz.com/us-en/search?q=blackpink',
      region: 'USA',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/1/16/Qobuz_-_logo_%28France%2C_2007%29.svg',
      contributes: 'Billboard (high-res downloads)',
      description: ['1 Qobuz account PER card.', 'High-resolution audio downloads count toward charts.',],
      guide: {
        steps: [
          'Sign in or Create an Account on the QOBUZ Website/App',
          'Search for BLACKPINK DEADLINE / [Title Track]',
          'Click the ALBUM or SINGLE containing the song',
          'Click the CART ICON next to the song you want to purchase',
          'Select any available format offered by QOBUZ',
        ],
        benefits: [
          'Downloads count as sales',
          'Strong weight on Billboard charts',
        ],
      },
    },
    {
      name: '7digital (US)',
      url: 'https://us.7digital.com/artist/blackpink',
      region: 'USA',
      logo: 'https://images.ctfassets.net/6pk8mg3yh2ee/4SyoUHdVJK4SaK8S0UIqq8/12b7e69967f6222d5a8c523aade98283/7digitallogo.png',
      contributes: 'Billboard (digital sales)',
      description: ['1 7Digital account PER card.', 'Digital music store — sales contribute to US charts.',],
      guide: {
        steps: [
          'Go to 7DIGITAL WEBSITE. Sign in or Create Account',
          "Search for the song or album, e.g., 'BLACKPINK JUMP'.",
          'Select the TRACK e.g., "JUMP 16 BIT FLAC"',
          "Choose audio quality or format, then click on 'BUY'",
          'Click on "CHECKOUT", choose your payment method',
          'Download your purchased track. Go to "MY MUSIC" or "MY DOWNLOADS", then click "DOWNLOAD"',
        ],
        benefits: [
          'Every paid download from DIGITAL counts as one sale toward the BILLBOARD DIGITAL SONG SALES CHART',
          'Every paid download from DIGITAL counts as one sale toward the BILLBOARD DIGITAL SONG SALES CHART',
          'Since digital sales have more weight than streaming, a high number of 7DIGITAL PURCHASES can push a song higher on the HOT 100',
        ],
      },
    },
  ],

  UK: [
    {
      name: 'Apple Music / iTunes UK',
      url: 'https://music.apple.com/gb/artist/blackpink/1141774019',
      region: 'UK',
      logo: 'https://logos-world.net/wp-content/uploads/2020/11/Apple-Music-Logo-2015-present.png',
      contributes: 'UK Official Charts (streams + downloads)',
      description: 'Digital purchases and streams count toward OCC charts.',
      guide: {
        steps: [
          'Switch to UK store or use UK account',
          'Stream BLACKPINK on premium',
          'Purchase tracks/albums if desired',
          'Download purchases',
        ],
        benefits: [
          'Counts toward UK Official Singles & Albums Chart',
          'Premium streams have good weight',
          'Digital sales give strong boost',
        ],
      },
    },
    {
      name: 'Amazon Music UK',
      url: 'https://music.amazon.co.uk/artists/B01LWZY8S7/blackpink',
      region: 'UK',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg',
      contributes: 'UK Official Charts',
      description: 'Digital sales and streaming eligible for UK charts.',
      guide: {
        steps: [
          'Use Amazon Music UK',
          'Stream with Unlimited plan',
          'Buy digital tracks/albums',
          'Download after purchase',
        ],
        benefits: [
          'Streams & sales both count for OCC',
          'HD quality available',
          'Good complement to Apple Music UK',
        ],
      },
    },
    {
      name: 'Qobuz (UK)',
      url: 'https://www.qobuz.com/gb-en/search?q=blackpink',
      region: 'UK',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/1/16/Qobuz_-_logo_%28France%2C_2007%29.svg',
      contributes: 'UK Official Charts (high-res downloads)',
      description: 'High-resolution audio downloads count toward OCC charts.',
      guide: {
        steps: [
          'Sign in or create account on Qobuz UK site',
          'Search for BLACKPINK album or title track',
          'Add desired format (FLAC, Hi-Res) to cart',
          'Complete purchase and download files',
        ],
        benefits: [
          'Permanent downloads count as sales for Singles & Albums',
          'High audio quality preferred by some fans',
          'Eligible for OCC reporting',
        ],
      },
    },
    {
      name: '7digital (UK)',
      url: 'https://www.7digital.com/artist/blackpink',
      region: 'UK',
      logo: 'https://images.ctfassets.net/6pk8mg3yh2ee/4SyoUHdVJK4SaK8S0UIqq8/12b7e69967f6222d5a8c523aade98283/7digitallogo.png',
      contributes: 'UK Official Charts (digital sales)',
      description: 'Digital music downloads contribute to UK charts.',
      guide: {
        steps: [
          'Go to 7digital UK website and sign in/create account',
          'Search for BLACKPINK album or title track',
          'Select format (MP3 or FLAC) and buy',
          'Download purchased files immediately',
        ],
        benefits: [
          'Each download counts toward OCC Singles/Albums',
          'One purchase per account/version rule applies',
          'Reliable OCC-reporting retailer',
        ],
      },
    },
  ],

  'Billboard 2026 Guide': [],
};

export function DigitalBuying({ onBack, playSound }: Props) {
  const [activeTab, setActiveTab] = useState<Tab>('Global');
  const [flipped, setFlipped] = useState<Record<string, boolean>>({});

  const toggleFlip = (name: string) => {
    setFlipped((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const isUSA = activeTab === 'USA';
  const isUK = activeTab === 'UK';

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            .perspective-1000 { perspective: 1000px; }
            .transform-style-preserve-3d { transform-style: preserve-3d; }
            .backface-hidden { backface-visibility: hidden; }
            .rotate-y-180 { transform: rotateY(180deg); }
          `,
        }}
      />

      <div className="min-h-screen bg-black overflow-hidden relative">
        {/* Animated Background */}
        <div className="fixed inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-pink-900/20" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(236,72,153,0.15),transparent_70%)] animate-pulse" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          {/* Back Button */}
          <button
            onClick={onBack}
            onMouseEnter={playSound}
            className="flex items-center gap-2 sm:gap-3 text-pink-400 hover:text-pink-300 mb-8 sm:mb-12 font-bold text-lg sm:text-xl transition-all duration-500 hover:-translate-x-2 group"
          >
            <ArrowLeft className="w-6 sm:w-8 transition-transform group-hover:-translate-x-1" />
            Back to Buying Methods
          </button>

          {/* Hero Section */}
          <div className="relative text-center mb-12 sm:mb-20">
            <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl shadow-2xl">
              <img
                src="https://6.soompi.io/wp-content/uploads/image/20260114150718_BLACKPINK.jpg?s=900x600&e=t"
                alt="Digital Music"
                className="w-full h-64 sm:h-80 lg:h-[40rem] object-cover brightness-75 object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
            </div>

            <div className="absolute inset-x-0 bottom-4 sm:bottom-12 px-4 sm:px-8 flex flex-col items-center pointer-events-none">
              <h1 className="text-4xl sm:text-6xl lg:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-400 to-pink-500 bg-[length:200%_200%] animate-[gradient_8s_ease_infinite]">
                DIGITAL PURCHASES
              </h1>
              <p className="text-lg sm:text-xl lg:text-2xl text-gray-300 mt-4 sm:mt-6 font-medium">
                Support BLACKPINK through streams and digital buys
              </p>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex justify-center gap-4 sm:gap-6 mb-12 sm:mb-24 flex-wrap">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                onMouseEnter={playSound}
                className={`relative px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold text-base sm:text-xl tracking-wide transition-all duration-500 overflow-hidden
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

          {activeTab === 'Billboard 2026 Guide' ? (
            <div className="space-y-10 sm:space-y-16 pb-16 lg:pb-24 max-w-7xl mx-auto">
              {/* Header */}
              <div className="text-center">
                <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black bg-gradient-to-r from-pink-500 via-purple-500 to-pink-600 bg-clip-text text-transparent mb-6 tracking-tight animate-pulse">
                  BILLBOARD 2026 GUIDE
                </h2>
                <p className="text-xl sm:text-2xl text-gray-300 font-medium max-w-4xl mx-auto">
                  Updated rules • Streaming weights • YouTube change • How to maximize BLACKPINK chart impact
                </p>
              </div>

              {/* Key Charts Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
                {[
                  {
                    title: "Hot 100",
                    desc: "Top US singles — radio + official streams + digital/track sales",
                    icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Billboard_Hot_100_logo.svg/1200px-Billboard_Hot_100_logo.svg.png",
                    color: "from-red-600/30 to-pink-600/20 border-red-500/40",
                  },
                  {
                    title: "Billboard 200",
                    desc: "Leading US albums chart — album sales + track equivalent albums (TEA) + streaming equivalent albums (SEA)",
                    icon: "https://nos.jkt-1.neo.id/cdc-s3/image/2025/04/19/billboard200-2025_3_68031ea6ecfeb.jpg",
                    color: "from-purple-600/30 to-pink-600/20 border-purple-500/40",
                  },
                  {
                    title: "Global 200",
                    desc: "Worldwide songs — combines sales & streams from all countries (no US exclusion)",
                    icon: null,
                    emoji: "🌍",
                    color: "from-blue-600/30 to-purple-600/20 border-blue-500/40",
                  },
                  {
                    title: "Global Excl. US",
                    desc: "Global chart without US data — important for international strength",
                    icon: null,
                    emoji: "🌐",
                    color: "from-green-600/30 to-teal-600/20 border-green-500/40",
                  },
                  {
                    title: "Artist 100",
                    desc: "Artist popularity — album sales + track sales + streams + radio + social/activity",
                    icon: null,
                    emoji: "🎤",
                    color: "from-yellow-600/30 to-orange-600/20 border-yellow-500/40",
                  },
                  {
                    title: "Digital Song Sales",
                    desc: "Pure digital track downloads (US) — strong weight per purchase",
                    icon: null,
                    emoji: "💿",
                    color: "from-cyan-600/30 to-blue-600/20 border-cyan-500/40",
                  },
                  {
                    title: "World Digital Song Sales",
                    desc: "International/world music digital track sales ranking",
                    icon: null,
                    emoji: "🌏💿",
                    color: "from-rose-600/30 to-pink-600/20 border-rose-500/40",
                  },
                  {
                    title: "World Albums",
                    desc: "World music / non-mainstream albums chart (US)",
                    icon: null,
                    emoji: "🌍📀",
                    color: "from-indigo-600/30 to-purple-600/20 border-indigo-500/40",
                  },
                ].map((chart, idx) => (
                  <div
                    key={idx}
                    className={`bg-gradient-to-br ${chart.color} backdrop-blur-xl rounded-3xl p-6 border hover:border-opacity-70 hover:scale-[1.03] transition-all duration-300 shadow-xl flex flex-col items-center text-center`}
                  >
                    <div className="w-20 h-20 sm:w-24 sm:h-24 mb-5 rounded-2xl overflow-hidden bg-black/30 border-2 border-white/10 flex items-center justify-center shadow-lg">
                      {chart.icon ? (
                        <img src={chart.icon} alt={chart.title} className="w-5/6 h-5/6 object-contain p-2" />
                      ) : (
                        <span className="text-4xl sm:text-5xl font-black">{chart.emoji}</span>
                      )}
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-black text-white mb-3 tracking-tight">
                      {chart.title}
                    </h3>
                    <p className="text-gray-200 text-sm sm:text-base leading-relaxed">
                      {chart.desc}
                    </p>
                  </div>
                ))}
              </div>

              {/* Album Unit Equivalencies - 2026 Rules */}
              <div className="bg-gradient-to-br from-black/70 via-purple-950/60 to-pink-950/50 backdrop-blur-2xl rounded-3xl p-8 lg:p-12 border border-pink-500/30 shadow-2xl">
                <h3 className="text-4xl sm:text-5xl font-black text-center bg-gradient-to-r from-pink-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-10">
                  2026 Album Unit Equivalencies
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                  <div className="bg-gradient-to-br from-pink-900/60 to-purple-900/50 rounded-2xl p-7 border border-pink-400/30 text-center hover:scale-105 transition-transform">
                    <p className="text-3xl font-black text-yellow-300 mb-4">1×</p>
                    <p className="text-xl font-bold text-white mb-2">Album Sale</p>
                    <p className="text-gray-200">1 full digital or physical album purchase = 1 unit</p>
                  </div>

                  <div className="bg-gradient-to-br from-purple-900/60 to-indigo-900/50 rounded-2xl p-7 border border-purple-400/30 text-center hover:scale-105 transition-transform">
                    <p className="text-3xl font-black text-yellow-300 mb-4">1,000</p>
                    <p className="text-xl font-bold text-white mb-2">Paid / Premium Streams (SEA)</p>
                    <p className="text-gray-200 text-sm mt-2">
                      1,000 on-demand streams from paid subscriptions (Spotify Premium, Apple Music, Amazon Unlimited, Tidal, Qobuz, etc.)
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-blue-900/60 to-teal-900/50 rounded-2xl p-7 border border-blue-400/30 text-center hover:scale-105 transition-transform">
                    <p className="text-3xl font-black text-yellow-300 mb-4">2,500</p>
                    <p className="text-xl font-bold text-white mb-2">Ad-Supported / Free Streams (SEA)</p>
                    <p className="text-gray-200 text-sm mt-2">
                      2,500 on-demand streams from free/ad-supported tiers = 1 album unit
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-green-900/60 to-emerald-900/50 rounded-2xl p-7 border border-green-400/30 text-center hover:scale-105 transition-transform">
                    <p className="text-3xl font-black text-yellow-300 mb-4">10×</p>
                    <p className="text-xl font-bold text-white mb-2">Track Equivalent Albums (TEA)</p>
                    <p className="text-gray-200">10 individual digital track sales = 1 album unit</p>
                  </div>
                </div>

                <p className="text-center text-gray-300 italic mt-10 text-lg">
                  Source: Billboard 2026 methodology update (effective January 2026 charts)
                </p>
              </div>

              {/* YouTube 2026 Update - Alert Box */}
              <div className="bg-gradient-to-br from-red-950/70 via-orange-950/50 to-yellow-950/40 backdrop-blur-xl rounded-3xl p-8 lg:p-12 border-2 border-red-500/60 shadow-2xl relative overflow-hidden">
                <div className="absolute -top-10 -right-10 w-64 h-64 bg-red-600/20 rounded-full blur-3xl animate-pulse" />

                <div className="flex items-center justify-center gap-4 mb-8">
                  <span className="text-5xl animate-bounce">🚨</span>
                  <h3 className="text-4xl sm:text-5xl font-black text-red-300 text-center tracking-tight">
                    YouTube & Billboard Split – 2026
                  </h3>
                  <span className="text-5xl animate-bounce">🚨</span>
                </div>

                <div className="bg-black/50 rounded-2xl p-6 mb-8 border border-red-400/30">
                  <p className="text-xl sm:text-2xl font-bold text-white mb-6 text-center leading-relaxed">
                    Starting January 16, 2026 — YouTube (including YouTube Music) data no longer counts toward any U.S. Billboard charts
                  </p>

                  <p className="text-lg text-gray-200 mb-6 text-center">
                    Reason: Disagreement over weighting paid vs. ad-supported streams.<br />
                    Billboard kept higher value for paid streams → YouTube withdrew data submission.
                  </p>

                  <div className="grid sm:grid-cols-2 gap-6 text-gray-100">
                    <div>
                      <p className="font-semibold text-pink-300 mb-3 text-xl">Still worth streaming on YouTube for:</p>
                      <ul className="space-y-3 text-base">
                        <li className="flex items-start gap-3">
                          <span className="text-green-400 text-2xl">✓</span>
                          <span>Music show wins (M Countdown, Inkigayo, Show Champion…)</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="text-green-400 text-2xl">✓</span>
                          <span>Korean awards (MAMA, MMA, Golden Disc…)</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="text-green-400 text-2xl">✓</span>
                          <span>IFPI global rankings</span>
                        </li>
                      </ul>
                    </div>

                    <div>
                      <p className="font-semibold text-pink-300 mb-3 text-xl">Also still counts for:</p>
                      <ul className="space-y-3 text-base">
                        <li className="flex items-start gap-3">
                          <span className="text-green-400 text-2xl">✓</span>
                          <span>RIAA certifications (US sales + equivalent units)</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="text-green-400 text-2xl">✓</span>
                          <span>Fan visibility • algorithm push • MV views</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <p className="text-center text-gray-200 font-medium text-lg italic">
                  Focus digital purchases + premium streams (Spotify, Apple, Amazon, Tidal, Qobuz…) for Billboard impact in 2026
                </p>
              </div>

              {/* Final Note */}
              <div className="text-center text-gray-400 text-lg sm:text-xl max-w-4xl mx-auto pt-8 border-t border-pink-500/20">
                <p className="mb-4">
                  All chart data compiled by <strong>Luminate</strong> • Rules can evolve — always check latest Billboard announcements
                </p>
                <p className="font-medium text-pink-300">
                  Let's push <span className="italic font-black">DEADLINE</span> as high as possible — BLINK power! 💖
                </p>
              </div>
            </div>
          ) : (
            <>
              {/* USA Reminder Block */}
              {isUSA && (
                <div className="bg-gradient-to-br from-red-900/40 via-pink-900/30 to-purple-900/20 backdrop-blur-xl rounded-3xl p-6 sm:p-8 mb-8 sm:mb-12 border border-pink-500/40 text-gray-200">
                  <h3 className="text-2xl sm:text-3xl font-black text-center bg-gradient-to-r from-[#E37383] to-[#F33A6A] bg-clip-text text-transparent mb-6">
                    USA DIGITAL BUYING
                  </h3>
                  <p className="text-base sm:text-lg mb-6 text-center font-medium">
                    Create accounts for EACH of the USA Billboard Buying Platforms for the preparation of Digital Buying upon release.
                  </p>
                  <p className="text-center font-bold text-yellow-300 mb-6 text-base sm:text-lg">
                    ⇢ This is very important for the success of BLACKPINK&apos;s <span className="italic">DEADLINE</span> mini-album and its TITLE TRACK on the
                    <br className="hidden sm:block" />
                    US Billboard Hot 100 (Singles Chart), US Global 200 (Most Popular Song), US Billboard 200 (Album Chart), and the Digital Song Sales Chart.
                  </p>

                  <div className="space-y-4">
                    <p className="font-semibold text-base sm:text-lg">𝗜𝗺𝗽𝗼𝗿𝘁𝗮𝗻𝘁 𝗥𝗲𝗺𝗶𝗻𝗱𝗲𝗿𝘀: 🚨</p>
                    <ol className="list-decimal pl-5 sm:pl-6 space-y-3 text-sm sm:text-base">
                      <li>Purchase ALL tracks individually & NOT as an album (Do NOT click on "Complete Album") so we can accomplish our goals for both BBH100 & BB200.</li>
                      <li>After purchasing, DOWNLOAD your digital copies. Purchases that are not downloaded will not count toward Billboard.</li>
                      <li>Do NOT gift purchases — gifted items do not count toward Billboard charts.</li>
                      <li>Do NOT use VPN to purchase. It will NOT count towards US Billboard Charts.</li>
                      <li>NO weekly reset. Create new accounts & use a completely different payment card to buy again after the 1st tracking week.</li>
                      <li>AVOID pre-ordering Deadline album on iTunes, as this prevents individual track purchases upon release (which affects US iTunes charting).</li>
                    </ol>
                  </div>
                </div>
              )}

              {/* UK Reminder Block */}
              {isUK && (
                <div className="bg-gradient-to-br from-blue-900/40 via-indigo-900/30 to-purple-900/20 backdrop-blur-xl rounded-3xl p-6 sm:p-8 mb-8 sm:mb-12 border border-indigo-500/40 text-gray-200">
                  <h3 className="text-2xl sm:text-3xl font-black text-center bg-gradient-to-r from-indigo-400 via-blue-400 to-indigo-300 bg-clip-text text-transparent mb-6">
                    UK DIGITAL BUYING
                  </h3>
                  <p className="text-base sm:text-lg mb-6 text-center font-medium">
                    Create accounts for UK chart-eligible digital music platforms in preparation for digital buying during release week.
                  </p>
                  <p className="text-center font-bold text-yellow-300 mb-6 text-base sm:text-lg">
                    ⇢ This is crucial for maximizing chart impact for the TITLE TRACK (Singles Chart) and the ALBUM (Official Albums Chart) <br/> under the UK Official Charts Company (OCC).
                  </p>

                  <div className="space-y-4">
                    <p className="font-semibold text-base sm:text-lg flex items-center gap-2">
                      <p className="font-semibold text-base sm:text-lg">𝗜𝗺𝗽𝗼𝗿𝘁𝗮𝗻𝘁 𝗥𝗲𝗺𝗶𝗻𝗱𝗲𝗿𝘀: 🚨</p>
                    </p>
                    <ol className="list-decimal pl-5 sm:pl-6 space-y-3 text-sm sm:text-base">
                      <li>
                        Digital downloads count for BOTH Singles and Albums Charts when purchased from UK OCC-reporting retailers and downloaded permanently.
                      </li>
                      <li>
                        <span className="font-semibold">Best strategy for chart impact:</span><br />
                        Buy the TITLE TRACK (lead single) first → boosts the UK Singles Chart<br />
                        Then buy the FULL ALBUM download → counts toward the UK Albums Chart<br />
                        Avoid buying all album tracks individually. Buying the full album download is more efficient and properly counted for Albums Chart impact.
                      </li>
                      <li>
                        Downloads must be completed and saved to your device (You must own the files — streaming access does NOT count).
                      </li>
                      <li>
                        Chart week timing matters: Purchases and downloads must occur within the UK chart week (Friday 00:01 – Thursday 00:00 UK time).
                      </li>
                      <li>
                        Purchase limit: Only 1 digital copy per version per account (e.g., standard or deluxe). Multiple purchases from the same account may be filtered out.
                      </li>
                      <li>
                        Only buy from UK chart-eligible retailers:<br />
                        • Apple Music / iTunes UK (digital downloads)<br />
                        • Amazon Music UK (Digital Music)<br />
                        • Qobuz (UK)<br />
                        • 7digital (UK)<br />
                        Avoid non-reporting stores (K-pop-exclusive shops, fan-targeted sites, or unverified retailers often do NOT report to the OCC).
                      </li>
                      <li>
                        If unsure about a store’s eligibility, verify that it’s a major UK digital retailer that reports sales via Kantar / OCC.
                      </li>
                    </ol>
                  </div>
                </div>
              )}

              {/* Stores Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 pb-16 sm:pb-24 lg:pb-32">
                {data[activeTab].map((item) => {
                  const isFlipped = flipped[item.name] || false;

                  return (
                    <div
                      key={item.name}
                      className={`group relative min-h-[480px] sm:min-h-[580px] lg:min-h-[620px] transition-transform duration-700 transform-style-preserve-3d cursor-pointer ${isFlipped ? 'rotate-y-180' : ''}`}
                      onClick={() => item.guide && toggleFlip(item.name)}
                    >
                      {/* Front face */}
                      <div className="absolute inset-0 backface-hidden bg-gradient-to-br from-gray-900/90 via-purple-900/20 to-pink-900/30 backdrop-blur-xl rounded-3xl p-6 sm:p-8 lg:p-10 border border-pink-500/20 shadow-2xl flex flex-col">
                        <div className="absolute -top-20 -right-20 w-48 sm:w-64 h-48 sm:h-64 bg-pink-600/20 rounded-full blur-3xl group-hover:bg-pink-500/30 transition-all duration-1000" />

                        <div className="relative z-10 mb-6 sm:mb-8">
                          {item.logo ? (
                            <div className="w-24 sm:w-32 h-24 sm:h-32 mx-auto rounded-2xl overflow-hidden shadow-xl border-4 border-pink-600/60 bg-[#F4679D]">
                              <img
                                src={item.logo}
                                alt={item.name}
                                className="w-full h-full object-contain p-3 sm:p-4 group-hover:scale-110 transition-transform duration-700"
                              />
                            </div>
                          ) : (
                            <div className="w-24 sm:w-32 h-24 sm:h-32 mx-auto bg-gradient-to-br from-pink-900/60 to-purple-900/60 rounded-2xl border-4 border-dashed border-pink-500/40 flex items-center justify-center">
                              <span className="text-4xl sm:text-5xl font-black text-pink-400">
                                {item.name.slice(0, 2).toUpperCase()}
                              </span>
                            </div>
                          )}
                        </div>

                        <h3 className="text-2xl sm:text-3xl font-black text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400 mb-4 sm:mb-6 group-hover:from-pink-300 group-hover:to-purple-300 transition-all duration-500">
                          {item.name}
                        </h3>

                        {item.contributes && (
                          <div className="text-center mb-4 sm:mb-6">
                            <p className="text-xs sm:text-sm uppercase tracking-wider text-pink-300 font-semibold">Contributes to</p>
                            <p className="text-gray-300 text-xs sm:text-sm mt-1 sm:mt-2">{item.contributes}</p>
                          </div>
                        )}

                        <p className="text-gray-300 text-center leading-relaxed mb-6 sm:mb-8 flex-1 text-sm sm:text-base">
                          {Array.isArray(item.description) ? item.description.map((line, i) => <p key={i}>{line}</p>) : item.description}
                        </p>

                        {item.note && (
                          <div className="bg-yellow-900/40 border border-yellow-600/60 rounded-2xl px-4 sm:px-5 py-3 sm:py-4 text-yellow-300 text-center font-bold mb-6 sm:mb-8 animate-pulse text-sm sm:text-base">
                            ⚠️ {item.note}
                          </div>
                        )}

                        <div className="mt-auto">
                          <a
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            onMouseEnter={playSound}
                            className="relative block w-full py-4 text-center text-lg font-bold text-white rounded-full overflow-hidden group/btn"
                          >
                            <span className="relative z-10">Visit Platform →</span>
                            <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500" />
                          </a>
                        </div>

                        {item.guide && (
                          <p className="text-center text-sm text-gray-400 mt-4">
                            Click card to see Buying Guide →
                          </p>
                        )}
                      </div>

                      {/* Back face - Buying Guide */}
                      {item.guide && (
                        <div className="absolute inset-0 backface-hidden rotate-y-180 bg-gradient-to-br from-gray-900/95 to-purple-950/80 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-pink-500/40 shadow-2xl flex flex-col overflow-y-auto">
                          <h4 className="text-2xl font-black text-center text-pink-300 mb-6">
                            {item.name} Buying Guide
                          </h4>

                          <ol className="list-decimal pl-6 space-y-3 text-gray-200 mb-8 text-sm">
                            {item.guide.steps.map((step, i) => (
                              <li key={i}>{step}</li>
                            ))}
                          </ol>

                          <div className="mt-auto">
                            <p className="font-semibold text-pink-300 mb-3">BENEFITS:</p>
                            <ul className="list-disc pl-6 space-y-2 text-gray-300 text-sm">
                              {item.guide.benefits.map((ben, i) => (
                                <li key={i}>{ben}</li>
                              ))}
                            </ul>
                          </div>

                          <p className="text-center text-sm text-gray-400 mt-6">
                            Click to flip back
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg max-w-3xl mx-auto">
            Streaming counts most when done daily on premium plans. Digital purchases help most charts instantly. Always follow current chart rules.
          </p>
        </div>
      </div>
    </>
  );
}
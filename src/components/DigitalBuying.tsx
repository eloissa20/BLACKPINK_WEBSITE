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

const tabs = ['Global', 'South Korea', 'USA', 'UK', 'Billboard 2026 Guide'] as const;
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

  'South Korea': [
    {
      name: 'Melon',
      url: 'https://www.melon.com/artist/index.htm?artistId=780066',
      region: 'South Korea',
      contributes: 'Melon daily/weekly charts + Circle Chart streams',
      description: 'Korea’s largest music platform — very important for domestic charting.',
      note: 'Korean IP or VPN often required for full access',
      guide: {
        steps: [
          'Access Melon (Korean IP/VPN recommended)',
          'Create/log in to account',
          'Stream BLACKPINK songs daily',
          'Add to playlist & repeat',
        ],
        benefits: [
          'Strongest impact on Korean domestic charts',
          'High weight in Circle Chart (Gaon)',
          'Essential for music show & award points',
        ],
      },
    },
    {
      name: 'Genie',
      url: 'https://www.genie.co.kr/detail/artistInfo?xgnm=80465066',
      region: 'South Korea',
      contributes: 'Genie charts + Circle Chart',
      description: 'Popular Korean streaming service with strong fanbase.',
      note: 'Korean account/payment usually required',
      guide: {
        steps: [
          'Sign up/log in to Genie (Korean number helpful)',
          'Search BLACKPINK',
          'Stream full songs repeatedly',
          'Use playlists for better counting',
        ],
        benefits: [
          'Important for Circle digital charts',
          'Good fanbase engagement',
          'Complements Melon streaming',
        ],
      },
    },
    {
      name: 'FLO',
      url: 'https://www.music-flo.com/',
      region: 'South Korea',
      contributes: 'FLO charts + Circle Chart',
      description: 'Modern Korean streaming platform — growing influence.',
      guide: {
        steps: [
          'Access FLO app/site',
          'Log in or create account',
          'Stream BLACKPINK content daily',
          'Create & share playlists',
        ],
        benefits: [
          'Rising importance in Korean charts',
          'Clean UI & good audio quality',
          'Helps diversify Circle Chart points',
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
            <div className="bg-black/60 backdrop-blur-xl rounded-3xl p-6 sm:p-10 border border-pink-500/30 text-gray-200 leading-relaxed max-w-4xl mx-auto">
              <h2 className="text-3xl sm:text-4xl font-black text-center bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent mb-8 sm:mb-10">
                BILLBOARD 2026 GUIDE
              </h2>

              <div className="space-y-10">
                <section>
                  <h3 className="text-2xl font-bold text-pink-400 mb-4">Album Unit Equivalencies</h3>
                  <p className="mb-4">Album Sale: 1 unit (physical or digital)</p>

                  <p className="font-semibold text-yellow-300 mb-2">PREMIUM STREAMS</p>
                  <p>1,000 on-demand audio/video streams from paid subscription services or premium plan trials.</p>
                  <p className="text-sm mt-2 text-gray-300">
                    (Spotify Premium, Apple Music, Tidal, Qobuz, Amazon Prime/Unlimited, Pandora Premium, Deezer, AudioMack Plus, SoundCloud Go/Go+, etc.)
                  </p>

                  <p className="font-semibold text-yellow-300 mt-6 mb-2">FREE / AD-SUPPORTED STREAMS</p>
                  <p>2,500 on-demand audio/video streams from ad-supported services</p>
                  <p className="text-sm mt-2 text-gray-300">
                    (Spotify Free, Pandora Free & Plus, etc.)
                  </p>
                  <p className="text-sm italic mt-2">
                    *Note: Streaming Pandora Radio stations, regardless of subscription tier, are Programmed Streams & count less than Free/Plus.
                  </p>
                </section>

                <section>
                  <h3 className="text-2xl font-bold text-pink-400 mb-4">Track Equivalencies</h3>
                  <p className="mb-2">Track Sales (TEA): 10 digital track sales = 1 album unit</p>
                  <p>Track Streams (SEA): Calculated from album track streams</p>
                </section>

                <section className="bg-red-900/30 p-6 rounded-2xl border border-red-500/40">
                  <h3 className="text-2xl font-bold text-red-300 mb-4">YouTube Update – IMPORTANT</h3>
                  <p className="font-semibold mb-3">
                    YouTube (including YouTube Music) will be removed from Billboard tracking effective January 16, 2026.
                  </p>
                  <p className="mb-3">Continue streaming on YouTube for:</p>
                  <ul className="list-disc pl-6 space-y-1 mb-4">
                    <li>Music Shows wins</li>
                    <li>K-Awards</li>
                    <li>IFPI Global Artist / Song / Album rankings</li>
                    <li>RIAA song/album unit sales certifications</li>
                  </ul>
                  <p className="italic">
                    Please continue to stream on YouTube Music for Music Shows wins, K-Awards, IFPI Global rankings, and RIAA certifications.
                  </p>
                </section>

                <p className="text-center text-gray-400 italic mt-8">
                  All data (digital & physical sales, streams, radio play) are compiled and reported to Billboard by Luminate.
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
                      <li>Purchase ALL tracks individually & NOT as an album (Do NOT click on “Complete Album”) so we can accomplish our goals for both BBH100 & BB200.</li>
                      <li>After purchasing, DOWNLOAD your digital copies. Purchases that are not downloaded will not count toward Billboard.</li>
                      <li>Do NOT gift purchases — gifted items do not count toward Billboard charts.</li>
                      <li>Do NOT use VPN to purchase. It will NOT count towards US Billboard Charts.</li>
                      <li>NO weekly reset. Create new accounts & use a completely different payment card to buy again after the 1st tracking week.</li>
                      <li>AVOID pre-ordering Deadline album on iTunes, as this prevents individual track purchases upon release (which affects US iTunes charting).</li>
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
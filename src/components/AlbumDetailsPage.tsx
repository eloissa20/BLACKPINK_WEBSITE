import {
  ArrowLeft,
  ExternalLink,
  Sparkles,
  Star,
  Award,
  TrendingUp,
  ShoppingCart,
  Zap,
  AlertCircle,
} from 'lucide-react';
import React from 'react';

// Local logo imports – assuming AlbumDetailsPage.tsx is in src/components/
// If the file is in a deeper folder, change ../ to ../../ or more
import ItunesLogo from '../assets/logos/itunes.png';
import AmazonMusicLogo from '../assets/logos/amazon-music.png';
import QobuzLogo from '../assets/logos/qobuz.png';
import SevenDigitalLogo from '../assets/logos/7digital.png';

type ContinentType = 'global' | 'korea' | 'usa' | 'uk';

interface Store {
  name: string;
  url: string;
  description: string;
  icon: string;
  highlight?: boolean;
}

interface BuyingTipSection {
  title?: string;
  subtitle?: React.ReactNode;
  icon?: React.ReactNode;
  tips: string[];
}

interface ChartInfo {
  primary: string;
  period: string;
  certification: string;
}

interface RegionData {
  title: string;
  gradient: string;
  digital: Store[];
  physical: Store[];
  chartInfo: ChartInfo;
  buyingTips: BuyingTipSection;
}

interface AlbumDetailsPageProps {
  continent: ContinentType;
  onBack: () => void;
}

// Flag Components
const FlagGlobal = () => (
  <img
    src="https://png.pngtree.com/png-vector/20230905/ourmid/pngtree-metallic-globe-3d-planet-png-image_9942792.png"
    alt="3D Globe Icon with Stand"
    className="w-full h-full object-contain"
  />
);

const FlagKR = () => (
  <img
    src="https://static.vecteezy.com/system/resources/previews/015/309/515/non_2x/south-korea-waving-flag-realistic-transparent-background-free-png.png"
    alt="South Korea Waving Flag"
    className="w-full h-full object-contain"
  />
);

const FlagUS = () => (
  <img
    src="https://static.vecteezy.com/system/resources/previews/015/309/669/non_2x/united-states-waving-flag-realistic-transparent-background-free-png.png"
    alt="USA Waving Flag"
    className="w-full h-full object-contain"
  />
);

const FlagUK = () => (
  <img
    src="https://static.vecteezy.com/system/resources/previews/015/309/522/non_2x/united-kingdom-waving-flag-realistic-transparent-background-free-png.png"
    alt="UK Waving Flag"
    className="w-full h-full object-contain"
  />
);

export function AlbumDetailsPage({ continent, onBack }: AlbumDetailsPageProps) {
  const [scrollY, setScrollY] = React.useState(0);

  React.useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const flagMap: Record<ContinentType, React.ReactNode> = {
    global: <FlagGlobal />,
    korea: <FlagKR />,
    usa: <FlagUS />,
    uk: <FlagUK />,
  };

  const getStoresByContinent = (continent: ContinentType): RegionData => {
    const stores: Record<ContinentType, RegionData> = {
      global: {
        title: 'GLOBAL',
        gradient: 'from-[#E83C91] via-[#EE6983] to-[#FF0066]',
        digital: [
          { name: 'Apple Music', url: 'https://music.apple.com/us/artist/blackpink/1141774019', description: 'Global streaming - High quality audio', icon: '🎧' },
          { name: 'Spotify', url: 'https://open.spotify.com/artist/41MozSoPIsD1dJM0CLPjZF', description: 'Worldwide streaming - Playlists & discovery', icon: '🎵' },
          { name: 'YouTube Music', url: 'https://music.youtube.com/channel/UCOmHUn--16B90oW2L6FRR3A', description: 'Global access - Premium features', icon: '▶️' },
          { name: 'Amazon Music', url: 'https://music.amazon.com/artists/B01LWZY8S7/blackpink', description: 'Digital purchases & streaming worldwide', icon: '🛒' },
          { name: 'Deezer', url: 'https://www.deezer.com/en/artist/9635624', description: 'HiFi streaming - Available globally', icon: '🎶' },
        ],
        physical: [
          { name: 'BLACKPINK Official Shop', url: 'https://shop.blackpinkmusic.com/', description: 'Exclusive merch & limited editions', icon: '🖤' },
          { name: 'Weverse Shop Global', url: 'https://weverse.io/blackpink/feed', description: 'Global fan platform - Special albums & merch', icon: '🌐' },
          { name: 'YG Select Global', url: 'https://en.ygselect.com/', description: 'Official YG store - Worldwide shipping', icon: '🏪' },
          { name: 'Amazon International', url: 'https://www.amazon.com/s?k=blackpink+album', description: 'Fast global shipping options', icon: '📦' },
          { name: 'Ktown4u', url: 'https://www.ktown4u.com/artist_store?artist_name=BLACKPINK', description: 'K-pop specialist - International delivery', icon: '✈️' },
        ],
        chartInfo: {
          primary: 'Global Charts',
          period: 'Ongoing Streams',
          certification: 'IFPI / RIAA Eligible',
        },
        buyingTips: {
          title: 'Global Support Tips',
          tips: [
            'Stream daily on multiple platforms',
            'Add songs to high-engagement playlists',
            'Purchase digital albums where possible',
            'Share official content widely',
            'All global streams and sales help rankings',
          ],
        },
      },

      korea: {
        title: 'KOREA',
        gradient: 'from-[#E83C91] via-[#EE6983] to-[#FF0066]',
        digital: [],
        physical: [
          { 
            name: 'Ktown4u', 
            url: 'https://kr.ktown4u.com/eventinfo?eve_no=43973847&biz_no=967', 
            description: 'K-pop specialist - Circle Chart counting', 
            icon: 'https://kr.ktown4u.com/icons/ktown4u-logo.png' 
          },
          { 
            name: 'YG Select', 
            url: 'https://ygselect.com/product/list.html?cate_no=43', 
            description: 'Official YG store - Chart eligible', 
            icon: 'https://ygselect.com/web/logo/YG%20SELECT_Signature_black.png' 
          },
          { 
            name: 'Dear My Muse', 
            url: 'https://dearmymuse.com/article/notice/1/77799/', 
            description: 'Official retailer - Circle certified', 
            icon: 'https://dearmymuse.kr/_dj/img/logo.png' 
          },
          { 
            name: 'WithMuu', 
            url: 'https://www.withmuu.com/goods/goods_list.php?brandCd=009', 
            description: 'Trusted K-pop store - Fast delivery', 
            icon: 'https://www.withmuu.com/data/skin/front/moment/images/common/symbol.svg' 
          },
        ],
        chartInfo: {
          primary: 'Hanteo Chart',
          period: 'Circle Chart',
          certification: 'Circle Certified',
        },
        buyingTips: {
          tips: [
            'Purchase only from Hanteo/Gaon/Circle counted stores',
            'Different versions help increase album sales rank',
            'Pre-order early for strong first-week numbers',
            'Multiple purchases per person usually allowed',
          ],
        },
      },

      usa: {
        title: 'USA',
        gradient: 'from-[#E83C91] via-[#EE6983] to-[#FF0066]',
        digital: [
          { 
            name: 'iTunes', 
            url: 'https://music.apple.com/us/artist/blackpink/1141774019', 
            description: 'Digital track & album sales count toward Billboard Hot 100 & 200', 
            icon: ItunesLogo,
          },
          { 
            name: 'Amazon Music', 
            url: 'https://music.amazon.com/artists/B01LWZY8S7/blackpink', 
            description: 'Digital album purchases & eligible streams - Billboard counted', 
            icon: AmazonMusicLogo,
          },
          { 
            name: 'Qobuz', 
            url: 'https://www.qobuz.com/us-en/search?q=blackpink', 
            description: 'High-resolution downloads & streams contribute to Billboard', 
            icon: QobuzLogo,
          },
          { 
            name: '7digital', 
            url: 'https://us.7digital.com/artist/blackpink', 
            description: 'Digital sales platform - contributes to Hot 100 & Billboard 200', 
            icon: SevenDigitalLogo,
          },
        ],
        physical: [
          { name: 'BLACKPINK US Shop', url: 'https://forms.sonymusicfans.com/campaign/blackpink-deadline/', description: 'Official store - Billboard counting', icon: '🖤', highlight: true },
          { name: 'Target (Black Ver.)', url: 'https://www.target.com/p/-/A-95174953', description: 'Exclusive Black Version - Major retailer', icon: '🎯' },
          { name: 'Target (Pink Ver.)', url: 'https://www.target.com/p/-/A-95175206', description: 'Exclusive Pink Version - Major retailer', icon: '💖' },
          { name: 'Amazon US', url: 'https://www.amazon.com/dp/B0GGDNRNBQ', description: 'Fast shipping - Chart eligible', icon: '📦' },
        ],
        chartInfo: {
          primary: 'Billboard 200',
          period: 'Tracking Week (Fri–Thu)',
          certification: 'RIAA Certified',
        },
        buyingTips: {
          icon: <AlertCircle className="w-10 h-10 text-[#FF0066] flex-shrink-0 animate-pulse" />,
          title: 'Billboard Rules Reminder',
          subtitle: (
            <span className="whitespace-nowrap overflow-hidden block">
              Note: When purchasing from the US Amazon Store, please do NOT buy from Amazon resellers.
            </span>
          ),
          tips: [
            'PRIORITIZE purchasing from USA Retail stores',
            'You may purchase from WEVERSE USA, US Amazon Store, & Artist Store',
            'Do NOT buy physical albums from WEVERSE GLOBAL or KTOWN4U (they will not count towards USA Billboard Charts)',
            'Do NOT purchase more than 4 physical albums PER card',
            'ONLY shipped physical albums are counted as sales',
            'First-week sales matter most',
          ],
        },
      },

      uk: {
        title: 'UK',
        gradient: 'from-[#E83C91] via-[#EE6983] to-[#FF0066]',
        digital: [
          { name: 'Apple Music / iTunes UK', url: 'https://music.apple.com/gb/artist/blackpink/1141774019', description: 'Official Charts counting', icon: '🍎' },
          { name: 'Spotify UK', url: 'https://open.spotify.com/artist/41MozSoPIsD1dJM0CLPjZF', description: 'Streaming impact on OCC', icon: '🎵' },
          { name: 'Amazon Music UK', url: 'https://music.amazon.co.uk/artists/B01LWZY8S7/blackpink', description: 'Digital sales eligible', icon: '🛒' },
        ],
        physical: [
          { name: 'HMV', url: 'https://store.hmv.com/search?searchtext=blackpink', description: 'Iconic UK retailer - Chart counting', icon: '💿' },
          { name: 'Amazon UK', url: 'https://www.amazon.co.uk/s?k=blackpink+album', description: 'Fast delivery - OCC eligible', icon: '📦' },
          { name: 'Zavvi', url: 'https://www.zavvi.com/search/blackpink.list', description: 'Exclusive editions available', icon: '🎬' },
          { name: 'Rough Trade', url: 'https://www.roughtrade.com/search?q=blackpink', description: 'Indie specialist - Vinyl focus', icon: '🎶' },
        ],
        chartInfo: {
          primary: 'Official Charts Company (OCC)',
          period: 'Friday–Thursday',
          certification: 'BPI Certified',
        },
        buyingTips: {
          title: 'UK Chart Tips',
          tips: [
            'Buy from UK-based or OCC-reporting retailers',
            'Vinyl and CD purchases carry strong weight',
            'No strict per-customer purchase limits like Billboard',
            'Pre-orders help secure better first-week position',
            'Streaming also contributes significantly to charts',
          ],
        },
      },
    };
    return stores[continent];
  };

  const storeData = getStoresByContinent(continent);

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes gradient { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
            @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-12px); } }
            @keyframes glow { 0%, 100% { box-shadow: 0 0 25px rgba(232,60,145,0.5); } 50% { box-shadow: 0 0 45px rgba(255,0,102,0.75); } }
            .animate-gradient { background-size: 200% 200%; animation: gradient 14s ease infinite; }
            .animate-float { animation: float 5.5s ease-in-out infinite; }
            .animate-glow { animation: glow 5s ease-in-out infinite; }
            .scrollbar-hide::-webkit-scrollbar { display: none; }
            .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
          `,
        }}
      />

      <div className="relative min-h-screen bg-black text-white overflow-hidden pb-20">
        <div className="fixed inset-0 bg-gradient-to-br from-black via-rose-950/20 to-pink-950/30 pointer-events-none" />
        <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(232,60,145,0.07),transparent_70%)] pointer-events-none" />

        <div className="fixed inset-0 pointer-events-none z-10">
          <Sparkles className="absolute top-24 left-20 w-14 h-14 text-[#E83C91] opacity-70 animate-float" />
          <Sparkles className="absolute bottom-40 right-24 w-12 h-12 text-[#FF0066] opacity-60 animate-pulse" />
        </div>

        <div className="relative z-20 p-6 md:p-10 lg:p-12">
          <div className="max-w-7xl mx-auto">

            {/* Back Button */}
            <button
              onClick={onBack}
              className="group flex items-center gap-4 text-[#E83C91] hover:text-[#FF0066] transition-all duration-300 mb-8 bg-black/60 px-8 py-5 rounded-2xl border border-[#E83C91]/40 hover:border-[#FF0066]/70 backdrop-blur-xl transform hover:scale-105 shadow-xl"
            >
              <ArrowLeft className="w-7 h-7 group-hover:-translate-x-1.5 transition-transform" />
              <span className="font-bold text-2xl">Back to Regions</span>
            </button>

            {/* Header */}
            <div className="text-center mb-12" style={{ transform: `translateY(${scrollY * -0.15}px)` }}>
              <div className="inline-block mb-3 w-36 h-36 sm:w-44 sm:h-44 md:w-48 md:h-48 mx-auto">
                <div className="animate-float">{flagMap[continent]}</div>
              </div>

              <h1
                className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight bg-gradient-to-r ${storeData.gradient} bg-clip-text text-transparent animate-gradient drop-shadow-lg mb-2 leading-tight`}
              >
                {storeData.title}
              </h1>

              <p className="text-base sm:text-lg md:text-xl text-white/90 tracking-wide font-medium">
                Support BLACKPINK • Official Stores & Platforms
              </p>
            </div>

            {/* Digital Platforms */}
            {storeData.digital.length > 0 && (
              <section className="mb-28">
                <div className="flex items-center gap-6 mb-10">
                  <div className="h-1 flex-1 bg-gradient-to-r from-transparent via-[#EE6983]/50 to-transparent" />
                  <h2 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-[#E83C91] via-[#EE6983] to-[#FF0066] bg-clip-text text-transparent px-8 pb-4">
                    Digital Platforms
                  </h2>
                  <div className="h-1 flex-1 bg-gradient-to-r from-transparent via-[#EE6983]/50 to-transparent" />
                </div>

                <div className="grid md:grid-cols-2 gap-7">
                  {storeData.digital.map((store, i) => (
                    <a
                      key={i}
                      href={store.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative block rounded-3xl p-[3px] bg-gradient-to-br from-[#E83C91] via-[#EE6983] to-[#FF0066] hover:from-[#FF0066] hover:via-[#EE6983] hover:to-[#E83C91] transition-all duration-500 hover:scale-[1.03] hover:shadow-2xl hover:shadow-[#FF0066]/40"
                    >
                      <div className="bg-black/85 backdrop-blur-xl rounded-[calc(1.5rem-3px)] p-8 h-full flex flex-col">
                        <div className="flex items-start gap-5 mb-5">
                          <div
                            className="p-5 rounded-2xl bg-[#ffccd5]/90 backdrop-blur-sm shadow-[#FF0066]/40 transform group-hover:rotate-6 transition-transform"
                          >
                            {store.icon.includes('.png') || store.icon.includes('.jpg') || store.icon.includes('.svg') ? (
                              <img
                                src={store.icon}
                                alt={`${store.name} logo`}
                                className="w-14 h-14 object-contain"
                              />
                            ) : (
                              <span className="text-5xl">{store.icon}</span>
                            )}
                          </div>

                          <div className="flex-1">
                            <h3 className="text-xl md:text-2xl font-bold mb-2 group-hover:text-[#FF0066] transition-colors">
                              {store.name}
                            </h3>
                            <p className="text-gray-100 text-base sm:text-lg md:text-xl leading-relaxed font-medium tracking-wide">
                              {store.description}
                            </p>
                          </div>

                          <ExternalLink className="w-6 h-6 text-gray-400 group-hover:text-[#FF0066] transition-colors flex-shrink-0 mt-1" />
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </section>
            )}

            {/* Physical Stores */}
            <section className="mb-32">
              <div className="flex items-center gap-6 mb-10">
                <div className="h-1 flex-1 bg-gradient-to-r from-transparent via-[#EE6983]/50 to-transparent" />
                <h2 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-[#E83C91] via-[#EE6983] to-[#FF0066] bg-clip-text text-transparent px-8 pb-4">
                  Physical Stores
                </h2>
                <div className="h-1 flex-1 bg-gradient-to-r from-transparent via-[#EE6983]/50 to-transparent" />
              </div>

              {storeData.buyingTips.icon || storeData.buyingTips.title ? (
                <div className="mb-10 p-6 bg-black/70 border border-[#E83C91]/40 rounded-2xl backdrop-blur-xl">
                  <div className="flex items-start gap-5">
                    {storeData.buyingTips.icon}
                    <div>
                      {storeData.buyingTips.title && (
                        <p className="text-[#E83C91] font-bold text-xl mb-3">{storeData.buyingTips.title}</p>
                      )}
                      {storeData.buyingTips.subtitle && (
                        <p className="text-gray-200 text-base leading-relaxed">{storeData.buyingTips.subtitle}</p>
                      )}
                    </div>
                  </div>
                </div>
              ) : null}

              <div className="grid md:grid-cols-2 gap-7">
                {storeData.physical.map((store, i) => (
                  <a
                    key={i}
                    href={store.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group relative block rounded-3xl p-[4px] bg-gradient-to-br from-[#E83C91] via-[#EE6983] to-[#FF0066] hover:from-[#FF0066] hover:via-[#EE6983] hover:to-[#E83C91] transition-all duration-500 hover:scale-[1.03] hover:shadow-2xl hover:shadow-[#FF0066]/40 ${store.highlight ? 'scale-[1.02] hover:scale-[1.05]' : ''}`}
                  >
                    <div className="bg-black/85 backdrop-blur-xl rounded-[calc(1.5rem-4px)] p-8 h-full flex flex-col relative">
                      {store.highlight && (
                        <div className="absolute -top-4 -right-5 z-20">
                          <div className="bg-gradient-to-r from-[#E83C91] to-[#FF0066] text-white px-5 py-2 rounded-full font-bold text-sm shadow-xl animate-pulse">
                            OFFICIAL
                          </div>
                        </div>
                      )}

                      <div className="flex items-start gap-5 mb-5">
                        <div
                          className="p-5 rounded-2xl bg-[#ffccd5]/90 backdrop-blur-sm shadow-[#FF0066]/40 transform group-hover:rotate-6 transition-transform"
                        >
                          {store.icon.includes('.png') || store.icon.includes('.jpg') || store.icon.includes('.svg') ? (
                            <img
                              src={store.icon}
                              alt={`${store.name} logo`}
                              className="w-14 h-14 object-contain"
                            />
                          ) : (
                            <span className="text-5xl">{store.icon}</span>
                          )}
                        </div>

                        <div className="flex-1">
                          <h3 className="text-xl md:text-2xl font-bold mb-2 group-hover:text-[#FF0066] transition-colors">
                            {store.name}
                          </h3>
                          <p className="text-gray-100 text-base sm:text-lg md:text-xl leading-relaxed font-medium tracking-wide">
                            {store.description}
                          </p>
                        </div>

                        <ExternalLink className="w-6 h-6 text-gray-400 group-hover:text-[#FF0066] transition-colors flex-shrink-0 mt-1" />
                      </div>
                    </div>
                  </a>
                ))}
              </div>

              {/* Buying Tips Section */}
              <div className="mt-12 p-10 bg-black/70 backdrop-blur-xl border border-[#E83C91]/40 rounded-3xl relative">
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#E83C91] to-[#FF0066] p-5 rounded-full shadow-2xl">
                  <ShoppingCart className="w-10 h-10 text-white" />
                </div>

                <h3 className="text-2xl md:text-3xl font-bold text-center bg-gradient-to-r from-[#ff9ec1] via-[#EE6983] to-[#FF0066] bg-clip-text text-transparent mt-4 mb-6 py-3">
                  <span className="text-white">💡</span> Buying Tips <span className="text-white">💡</span>
                </h3>

                {storeData.buyingTips.subtitle && (
                  <p className="text-center text-base md:text-lg text-white/90 font-medium mb-8 max-w-3xl mx-auto">
                    {storeData.buyingTips.subtitle}
                  </p>
                )}

                <div className="grid md:grid-cols-2 gap-5">
                  {storeData.buyingTips.tips.map((tip, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-4 p-5 bg-black/50 rounded-2xl border border-[#E83C91]/30 hover:border-[#FF0066]/70 transition-colors"
                    >
                      <Star className="w-6 h-6 text-[#FF0066] flex-shrink-0" />
                      <span className="text-gray-100 text-lg md:text-xl font-medium leading-relaxed">
                        {tip}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Chart Counting Information */}
            <div className="relative bg-black/60 backdrop-blur-xl rounded-3xl p-10 border-2 border-[#E83C91]/30 shadow-2xl animate-glow mb-16">
              <div className="absolute inset-0 bg-gradient-to-r from-[#E83C91]/5 via-[#EE6983]/5 to-[#FF0066]/5 rounded-3xl pointer-events-none" />
              <div className="relative z-10">
                <div className="flex items-center justify-center gap-4 mb-10">
                  <Award className="w-10 h-10 text-[#FF0066] animate-bounce" />
                  <h2 className="text-4xl font-bold bg-gradient-to-r from-[#E83C91] via-[#EE6983] to-[#FF0066] bg-clip-text text-transparent text-center pb-4">
                    Chart Counting Information
                  </h2>
                  <Award className="w-10 h-10 text-[#FF0066] animate-bounce" style={{ animationDelay: '0.5s' }} />
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-black/50 rounded-2xl p-8 text-center border border-[#E83C91]/30 transform hover:scale-105 transition-all duration-300">
                    <TrendingUp className="w-12 h-12 text-[#E83C91] mx-auto mb-4" />
                    <div className="text-2xl font-bold text-[#ff4d6d] mb-2">{storeData.chartInfo.primary}</div>
                    <p className="text-gray-300 font-medium">Tracks actual album purchases by fans in Real-Time</p>
                  </div>
                  <div className="bg-black/50 rounded-2xl p-8 text-center border border-[#EE6983]/30 transform hover:scale-105 transition-all duration-300">
                    <Zap className="w-12 h-12 text-[#EE6983] mx-auto mb-4" />
                    <div className="text-2xl font-bold text-[#FF0066] mb-2">{storeData.chartInfo.period}</div>
                    <p className="text-gray-300 font-medium">Based on distributor shipments to retailers/stores, updated Weekly.</p>
                  </div>
                  <div className="bg-black/50 rounded-2xl p-8 text-center border border-[#FF0066]/30 transform hover:scale-105 transition-all duration-300">
                    <Award className="w-12 h-12 text-[#FF0066] mx-auto mb-4" />
                    <div className="text-2xl font-bold text-[#E83C91] mb-2">{storeData.chartInfo.certification}</div>
                    <p className="text-gray-300 font-medium">Official Certification</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Every Purchase Supports BLACKPINK */}
            <div className="text-center bg-black/60 backdrop-blur-xl border-2 border-[#E83C91]/30 rounded-3xl p-10 mb-20">
              <Sparkles className="w-16 h-16 text-[#FF0066] mx-auto mb-6 animate-spin" style={{ animationDuration: '4s' }} />
              <h3 className="text-3xl font-bold bg-gradient-to-r from-[#E83C91] via-[#EE6983] to-[#FF0066] bg-clip-text text-transparent mb-4">
                EVERY PURCHASE SUPPORTS BLACKPINK!
              </h3>
              <p className="text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed">
                Choose your favorite store above and help BLACKPINK charts worldwide
              </p>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
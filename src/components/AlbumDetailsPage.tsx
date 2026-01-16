import { ArrowLeft, ExternalLink, CreditCard, Package, Sparkles, Star, Award, TrendingUp, ShoppingCart, Zap, AlertCircle, DollarSign } from 'lucide-react';

type ContinentType = 'global' | 'korea' | 'usa' | 'uk';

interface Store {
  name: string;
  url: string;
  description: string;
  icon: string;
  highlight?: boolean;
}

interface AlbumDetailsPageProps {
  continent: ContinentType;
  onBack: () => void;
}

export function AlbumDetailsPage({ continent, onBack }: AlbumDetailsPageProps) {
  const getStoresByContinent = (continent: ContinentType) => {
    const stores = {
      global: {
        title: 'GLOBAL',
        flag: '🌐',
        gradient: 'from-blue-500 via-purple-500 to-pink-600',
        digital: [
          { name: 'Apple Music', url: 'https://music.apple.com/us/artist/blackpink/1141774019', description: 'Global streaming - High quality audio', icon: '🎧' },
          { name: 'Spotify', url: 'https://open.spotify.com/artist/41MozSoPIsD1dJM0CLPjZF', description: 'Worldwide streaming - Playlists & discovery', icon: '🎵' },
          { name: 'YouTube Music', url: 'https://music.youtube.com/channel/UCOmHUn--16B90oW2L6FRR3A', description: 'Global access - Premium features', icon: '▶️' },
          { name: 'Amazon Music', url: 'https://music.amazon.com/artists/B01LWZY8S7/blackpink', description: 'Digital purchases & streaming worldwide', icon: '🛒' },
          { name: 'Deezer', url: 'https://www.deezer.com/en/artist/9635624', description: 'HiFi streaming - Available globally', icon: '🎶' },
        ],
        physical: [
          { name: 'BLACKPINK Official Shop', url: 'https://shop.blackpinkmusic.com/', description: 'Exclusive merch & limited editions', icon: '🖤' } as Store,
          { name: 'Weverse Shop Global', url: 'https://weverse.io/blackpink/feed', description: 'Global fan platform - Special albums & merch', icon: '🌐' } as Store,
          { name: 'YG Select Global', url: 'https://en.ygselect.com/', description: 'Official YG store - Worldwide shipping', icon: '🏪' } as Store,
          { name: 'Amazon International', url: 'https://www.amazon.com/s?k=blackpink+album', description: 'Fast global shipping options', icon: '📦' } as Store,
          { name: 'Ktown4u', url: 'https://www.ktown4u.com/artist_store?artist_name=BLACKPINK', description: 'K-pop specialist - International delivery', icon: '✈️' } as Store,
        ],
        chartInfo: { primary: 'Global Charts', period: 'Ongoing Streams', certification: 'IFPI / RIAA Eligible' }
      },
      korea: {
        title: 'KOREA',
        flag: '🇰🇷',
        gradient: 'from-red-500 via-pink-500 to-rose-600',
        digital: [
          { name: 'Melon', url: 'https://www.melon.com/artist/timeline.htm?artistId=261143', description: 'Leading Korean platform - Major chart impact', icon: '🍈' },
          { name: 'Genie Music', url: 'https://www.genie.co.kr/detail/artistInfo?xxnm=80216', description: 'Realtime charts - High influence', icon: '🧞' },
          { name: 'Bugs', url: 'https://music.bugs.co.kr/artist/80038', description: 'Popular digital service - Chart eligible', icon: '🐛' },
          { name: 'Flo', url: 'https://www.music-flo.com/detail/artist/arzayaer/albumtrack', description: '24-bit HiFi streaming', icon: '🎼' },
          { name: 'Vibe', url: 'https://vibe.naver.com/artist/15169', description: 'Naver platform - Strong domestic reach', icon: '💫' },
        ],
        physical: [
          { name: 'Weverse Shop KR', url: 'https://weverse.io/blackpink/feed', description: 'Official albums - Counts for Circle Chart', icon: '🌐' } as Store,
          { name: 'YG Select', url: 'https://en.ygselect.com/', description: 'Official YG albums & merch', icon: '🏪' } as Store,
          { name: 'Synnara', url: 'https://www.synnara.co.kr/', description: 'Major retailer - Circle certified', icon: '🏬' } as Store,
          { name: 'Yes24', url: 'http://www.yes24.com/searchcorner/Search?keywordAd=&keyword=&domain=ALL&qdomain=%EC%A0%84%EC%B2%B4&Wcode=001_005&query=BLACKPINK', description: 'Large selection - Chart counting', icon: '✅' } as Store,
          { name: 'Aladin', url: 'https://www.aladin.co.kr/search/wsearchresult.aspx?SearchTarget=All&SearchWord=BLACKPINK', description: 'Popular store - Fast shipping', icon: '📚' } as Store,
        ],
        chartInfo: { primary: 'Circle Chart', period: 'Realtime & Weekly', certification: 'Circle Certified' }
      },
      usa: {
        title: 'USA',
        flag: '🇺🇸',
        gradient: 'from-pink-600 via-rose-500 to-pink-600',
        digital: [
          { name: 'Apple Music / iTunes', url: 'https://music.apple.com/us/artist/blackpink/1141774019', description: 'Counts toward Billboard Hot 100 & 200', icon: '🍎' },
          { name: 'Spotify', url: 'https://open.spotify.com/artist/41MozSoPIsD1dJM0CLPjZF', description: 'US streaming - Major chart weight', icon: '🎵' },
          { name: 'Amazon Music', url: 'https://music.amazon.com/artists/B01LWZY8S7/blackpink', description: 'Digital sales & streams - Billboard eligible', icon: '🛒' },
          { name: 'YouTube Music', url: 'https://music.youtube.com/channel/UCOmHUn--16B90oW2L6FRR3A', description: 'Premium streaming counts', icon: '▶️' },
        ],
        physical: [
          { name: 'BLACKPINK US Shop', url: 'https://forms.sonymusicfans.com/campaign/blackpink-deadline/', description: 'Official store - Billboard counting', icon: '🖤', highlight: true } as Store,
          { name: 'Target (Black Ver.)', url: 'https://www.target.com/p/-/A-95174953', description: 'Exclusive Black Version - Major retailer', icon: '🎯' } as Store,
          { name: 'Target (Pink Ver.)', url: 'https://www.target.com/p/-/A-95175206', description: 'Exclusive Pink Version - Major retailer', icon: '💖' } as Store,
          { name: 'Amazon US', url: 'https://www.amazon.com/dp/B0GGDNRNBQ', description: 'Fast shipping - Chart eligible', icon: '📦' } as Store,
        ],
        chartInfo: { primary: 'Billboard 200', period: 'Tracking Week', certification: 'RIAA Certified' }
      },
      uk: {
        title: 'UK',
        flag: '🇬🇧',
        gradient: 'from-indigo-600 via-purple-500 to-pink-600',
        digital: [
          { name: 'Apple Music / iTunes UK', url: 'https://music.apple.com/gb/artist/blackpink/1141774019', description: 'Official Charts counting', icon: '🍎' },
          { name: 'Spotify UK', url: 'https://open.spotify.com/artist/41MozSoPIsD1dJM0CLPjZF', description: 'Streaming impact on OCC', icon: '🎵' },
          { name: 'Amazon Music UK', url: 'https://music.amazon.co.uk/artists/B01LWZY8S7/blackpink', description: 'Digital sales eligible', icon: '🛒' },
        ],
        physical: [
          { name: 'HMV', url: 'https://store.hmv.com/search?searchtext=blackpink', description: 'Iconic UK retailer - Chart counting', icon: '💿' } as Store,
          { name: 'Amazon UK', url: 'https://www.amazon.co.uk/s?k=blackpink+album', description: 'Fast delivery - OCC eligible', icon: '📦' } as Store,
          { name: 'Zavvi', url: 'https://www.zavvi.com/search/blackpink.list', description: 'Exclusive editions available', icon: '🎬' } as Store,
          { name: 'Rough Trade', url: 'https://www.roughtrade.com/search?q=blackpink', description: 'Indie specialist - Vinyl focus', icon: '🎶' } as Store,
        ],
        chartInfo: { primary: 'Official Charts', period: 'Friday-Thursday', certification: 'BPI Certified' }
      },
    };
    return stores[continent];
  };

  const storeData = getStoresByContinent(continent);
  const isUSA = continent === 'usa';

  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes gradient { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
          @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-15px); } }
          @keyframes glow { 0%, 100% { box-shadow: 0 0 20px rgba(236, 72, 153, 0.5); } 50% { box-shadow: 0 0 40px rgba(236, 72, 153, 0.8); } }
          @keyframes pulse-glow { 0%, 100% { box-shadow: 0 0 30px rgba(236, 72, 153, 0.6), 0 0 60px rgba(236, 72, 153, 0.3); } 50% { box-shadow: 0 0 50px rgba(236, 72, 153, 0.9), 0 0 100px rgba(236, 72, 153, 0.5); } }
          @keyframes shimmer { 0% { background-position: -200% center; } 100% { background-position: 200% center; } }
          .animate-gradient { background-size: 200% 200%; animation: gradient 8s ease infinite; }
          .animate-float { animation: float 3s ease-in-out infinite; }
          .animate-glow { animation: glow 2s ease-in-out infinite; }
          .animate-pulse-glow { animation: pulse-glow 3s ease-in-out infinite; }
          .animate-shimmer { background-size: 200% 100%; animation: shimmer 3s linear infinite; }
        `
      }} />

      <div className="relative min-h-screen bg-black text-white overflow-hidden">
        <div className="fixed inset-0 bg-gradient-to-br from-black via-purple-900/20 to-pink-900/30" />
        <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-pink-900/20 via-black to-black" />
        
        <div className="fixed inset-0 pointer-events-none z-10">
          <Sparkles className="absolute top-20 left-10 w-8 h-8 text-pink-400 animate-pulse animate-float" />
          <Sparkles className="absolute bottom-32 right-20 w-12 h-12 text-pink-300 animate-ping" />
          <Star className="absolute top-40 right-1/3 w-10 h-10 text-pink-500 animate-pulse" />
        </div>

        <div className="relative z-20 p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            <button
              onClick={onBack}
              className="group flex items-center gap-3 text-pink-400 hover:text-pink-300 transition-all duration-300 mb-8 bg-pink-900/20 hover:bg-pink-900/40 px-6 py-3 rounded-2xl border-2 border-pink-500/30 hover:border-pink-400 backdrop-blur-xl transform hover:scale-105"
            >
              <ArrowLeft className="w-5 h-5 group-hover:animate-bounce" />
              <span className="font-bold text-lg">Back to Regions</span>
            </button>

            <div className="text-center mb-16 space-y-6">
              <div className="inline-block mb-4">
                <div 
                  className="animate-float drop-shadow-[0_8px_16px_rgba(0,0,0,0.6)]" 
                  style={{ filter: 'drop-shadow(0 4px 12px rgba(255,255,255,0.4))' }}
                >
                  <span className={continent === 'global' ? 'text-[10rem] md:text-[12rem]' : 'text-9xl'}>
                    {storeData.flag}
                  </span>
                </div>
              </div>
              <h1 className={`text-5xl md:text-7xl font-extrabold tracking-widest bg-gradient-to-r ${storeData.gradient} bg-clip-text text-transparent animate-gradient drop-shadow-2xl`}>
                {storeData.title}
              </h1>
              <p className="text-xl md:text-2xl text-gray-200 font-light tracking-wide drop-shadow-lg">
                💖 Official stores & platforms to support BLACKPINK ✨
              </p>
            </div>

            {/* Digital & Physical Stores */}
            <div className="grid lg:grid-cols-2 gap-8 mb-12">
              {/* Digital */}
              <div className="group relative bg-gradient-to-br from-pink-900/40 to-purple-900/40 backdrop-blur-xl border-2 border-pink-500/40 rounded-3xl p-8 hover:border-pink-400 transition-all duration-500 shadow-2xl hover:shadow-pink-500/40">
                <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 to-transparent opacity-0 group-hover:opacity-100 rounded-3xl transition-opacity duration-500" />
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="bg-gradient-to-br from-pink-500 to-rose-500 p-4 rounded-2xl shadow-lg animate-glow">
                      <CreditCard className="w-8 h-8 text-white" />
                    </div>
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-300 to-purple-300 bg-clip-text text-transparent">
                      Digital Stores
                    </h2>
                  </div>
                  <div className="space-y-4">
                    {storeData.digital.map((store, i) => (
                      <a key={i} href={store.url} target="_blank" rel="noopener noreferrer"
                        className="block bg-black/40 hover:bg-black/60 rounded-2xl p-6 transition-all duration-300 group/item border border-pink-500/20 hover:border-pink-400/60 transform hover:-translate-y-1">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <span className="text-2xl">{store.icon}</span>
                              <h3 className="text-xl font-bold text-white group-hover/item:text-pink-300 transition-colors">{store.name}</h3>
                            </div>
                            <p className="text-gray-300 text-sm leading-relaxed">{store.description}</p>
                          </div>
                          <ExternalLink className="w-5 h-5 text-gray-400 group-hover/item:text-pink-400 transition-all duration-300 flex-shrink-0 group-hover/item:scale-125" />
                        </div>
                      </a>
                    ))}
                  </div>
                  <div className="mt-8 p-6 bg-gradient-to-br from-pink-900/40 to-purple-900/40 rounded-2xl border border-pink-500/30">
                    <div className="flex items-center gap-3 mb-4">
                      <Zap className="w-6 h-6 text-pink-400" />
                      <h3 className="text-lg font-bold text-pink-300">Digital Buying Tips</h3>
                    </div>
                    <ul className="space-y-3 text-gray-300 text-sm">
                      {['Buy/stream from official platforms for chart impact', 'Multiple purchases allowed', 'Digital counts instantly', 'High-quality & lossless options available', 'Helps global & regional performance'].map((tip, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <Star className="w-4 h-4 text-pink-400 flex-shrink-0 mt-0.5" />
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Physical */}
              <div className={`group relative backdrop-blur-xl border-2 rounded-3xl p-8 transition-all duration-500 shadow-2xl ${
                isUSA 
                  ? 'bg-gradient-to-br from-pink-900/50 to-rose-900/50 border-pink-400/60 hover:border-pink-300 shadow-pink-500/50 hover:shadow-pink-400/60' 
                  : 'bg-gradient-to-br from-purple-900/40 to-blue-900/40 border-purple-500/40 hover:border-purple-400 hover:shadow-purple-500/40'
              }`}>
                <div className={`absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
                  isUSA 
                    ? 'bg-gradient-to-br from-pink-500/30 to-rose-500/20' 
                    : 'bg-gradient-to-br from-purple-500/20 to-transparent'
                }`} />
                
                {isUSA && (
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-transparent via-pink-400/20 to-transparent animate-shimmer" />
                )}
                
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-8">
                    <div className={`p-4 rounded-2xl shadow-lg ${
                      isUSA 
                        ? 'bg-gradient-to-br from-pink-500 to-rose-500 animate-pulse-glow' 
                        : 'bg-gradient-to-br from-purple-500 to-blue-500 animate-glow'
                    }`}>
                      <Package className="w-8 h-8 text-white" />
                    </div>
                    <h2 className={`text-3xl font-bold bg-gradient-to-r bg-clip-text text-transparent ${
                      isUSA 
                        ? 'from-pink-200 via-rose-200 to-pink-300' 
                        : 'from-purple-300 to-blue-300'
                    }`}>
                      Physical Stores
                    </h2>
                  </div>
                  
                  <div className="space-y-4">
                    {storeData.physical.map((store, i) => (
                      <a key={i} href={store.url} target="_blank" rel="noopener noreferrer"
                        className={`block bg-black/40 hover:bg-black/60 rounded-2xl p-6 transition-all duration-300 group/item border transform hover:-translate-y-1 hover:scale-[1.02] ${
                          isUSA 
                            ? 'border-pink-500/30 hover:border-pink-300/80 hover:shadow-lg hover:shadow-pink-500/30' 
                            : 'border-purple-500/20 hover:border-purple-400/60'
                        } ${store.highlight && isUSA ? 'ring-2 ring-pink-400/50 bg-pink-950/30' : ''}`}>
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <span className="text-2xl">{store.icon}</span>
                              <h3 className={`text-xl font-bold text-white transition-colors ${
                                isUSA 
                                  ? 'group-hover/item:text-pink-200' 
                                  : 'group-hover/item:text-purple-300'
                              }`}>{store.name}</h3>
                              {store.highlight && isUSA && (
                                <span className="ml-2 px-3 py-1 text-xs font-bold bg-gradient-to-r from-pink-500 to-rose-500 rounded-full text-white animate-pulse">
                                  OFFICIAL
                                </span>
                              )}
                            </div>
                            <p className="text-gray-300 text-sm leading-relaxed">{store.description}</p>
                          </div>
                          <ExternalLink className={`w-5 h-5 text-gray-400 transition-all duration-300 flex-shrink-0 group-hover/item:scale-125 ${
                            isUSA 
                              ? 'group-hover/item:text-pink-300' 
                              : 'group-hover/item:text-purple-400'
                          }`} />
                        </div>
                      </a>
                    ))}
                  </div>
                  
                  <div className={`mt-8 p-8 rounded-2xl border-2 ${
                    isUSA 
                      ? 'bg-gradient-to-br from-pink-950/60 to-rose-950/60 border-pink-400/50 shadow-xl shadow-pink-500/20' 
                      : 'bg-gradient-to-br from-purple-900/40 to-blue-900/40 border-purple-500/30'
                  }`}>
                    <div className="flex items-center gap-3 mb-6">
                      <div className={`p-2 rounded-xl ${
                        isUSA 
                          ? 'bg-gradient-to-br from-pink-500 to-rose-500' 
                          : 'bg-purple-600'
                      }`}>
                        <ShoppingCart className={`${isUSA ? 'w-7 h-7' : 'w-6 h-6'} text-white`} />
                      </div>
                      <h3 className={`${isUSA ? 'text-2xl' : 'text-lg'} font-bold ${
                        isUSA 
                          ? 'text-pink-200' 
                          : 'text-purple-300'
                      }`}>Physical Buying Tips</h3>
                    </div>
                    
                    {isUSA && (
                      <div className="mb-6 p-4 bg-pink-900/40 border-2 border-pink-400/60 rounded-xl">
                        <div className="flex items-start gap-3">
                          <AlertCircle className="w-6 h-6 text-pink-300 flex-shrink-0 mt-0.5 animate-pulse" />
                          <div>
                            <p className="text-pink-200 font-bold text-lg mb-1">🚨 Important Billboard Rules 🚨</p>
                            <p className="text-gray-200 text-base">Follow these rules carefully for your purchases to count toward Billboard charts!</p>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    <ul className={`space-y-4 text-gray-300 ${isUSA ? 'text-base' : 'text-sm'}`}>
                      {(isUSA 
                        ? ['Buy from certified retailers for chart counting', 'Max 4 copies regardless of versions per store', 'First-week sales are crucial', 'Max copies per transaction can use cash', 'Boosts physical chart positions']
                        : ['Buy from certified retailers for chart counting', 'Look for exclusive variants & inclusions', 'First-week sales are crucial', 'Includes photocards & collectibles', 'Boosts physical chart positions']
                      ).map((tip, i) => (
                        <li key={i} className={`flex items-start gap-4 p-3 rounded-lg transition-all duration-300 ${
                          isUSA 
                            ? 'hover:bg-pink-900/30 border border-transparent hover:border-pink-500/30' 
                            : ''
                        }`}>
                          <div className={`p-1.5 rounded-lg flex-shrink-0 ${
                            isUSA 
                              ? 'bg-gradient-to-br from-pink-500 to-rose-500' 
                              : 'bg-purple-600/50'
                          }`}>
                            {isUSA && i === 1 ? (
                              <DollarSign className="w-5 h-5 text-white" />
                            ) : (
                              <Star className={`${isUSA ? 'w-5 h-5' : 'w-4 h-4'} text-white`} />
                            )}
                          </div>
                          <span className={isUSA ? 'font-medium leading-relaxed' : ''}>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Chart Info */}
            <div className="relative bg-gradient-to-r from-pink-900/40 via-purple-900/40 to-pink-900/40 backdrop-blur-xl rounded-3xl p-10 border-2 border-pink-500/40 shadow-2xl animate-glow">
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 to-purple-500/10 rounded-3xl" />
              <div className="relative z-10">
                <div className="flex items-center justify-center gap-4 mb-10">
                  <Award className="w-10 h-10 text-pink-400 animate-bounce" />
                  <h2 className="text-4xl font-bold bg-gradient-to-r from-pink-300 to-purple-300 bg-clip-text text-transparent text-center">
                    Chart Counting Information
                  </h2>
                  <Award className="w-10 h-10 text-pink-400 animate-bounce" style={{ animationDelay: '0.5s' }} />
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-8 text-center border border-pink-500/30 transform hover:scale-105 transition-all duration-300">
                    <TrendingUp className="w-12 h-12 text-pink-400 mx-auto mb-4" />
                    <div className="text-3xl font-bold text-pink-300 mb-2">{storeData.chartInfo.primary}</div>
                    <p className="text-gray-300 font-medium">Primary Chart System</p>
                  </div>
                  <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-8 text-center border border-purple-500/30 transform hover:scale-105 transition-all duration-300">
                    <Zap className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                    <div className="text-3xl font-bold text-purple-300 mb-2">{storeData.chartInfo.period}</div>
                    <p className="text-gray-300 font-medium">Critical Tracking Period</p>
                  </div>
                  <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-8 text-center border border-blue-500/30 transform hover:scale-105 transition-all duration-300">
                    <Award className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                    <div className="text-3xl font-bold text-blue-300 mb-2">{storeData.chartInfo.certification}</div>
                    <p className="text-gray-300 font-medium">Official Certification</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 text-center bg-gradient-to-br from-pink-900/30 to-purple-900/30 backdrop-blur-xl border-2 border-pink-500/30 rounded-3xl p-10">
              <Sparkles className="w-16 h-16 text-pink-400 mx-auto mb-6 animate-spin" style={{ animationDuration: '4s' }} />
              <h3 className="text-3xl font-bold bg-gradient-to-r from-pink-300 to-purple-300 bg-clip-text text-transparent mb-4">
                Every Purchase Supports BLACKPINK! 💖
              </h3>
              <p className="text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed">
                Choose your favorite store above and help BLACKPINK dominate the charts worldwide! ✨
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
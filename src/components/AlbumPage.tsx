import {
  CreditCard,
  Package,
  Sparkles,
  Star,
  ShoppingBag,
  TrendingUp,
} from 'lucide-react';

type ContinentType = 'global' | 'korea' | 'usa' | 'uk';

interface AlbumPageProps {
  onSelectContinent: (continent: ContinentType) => void;
}

/* =========================
   FLAGS & GLOBE ICONS
   - Global: Clean 3D globe icon with stand (icon/illustration style)
   - Countries: Realistic waving flags (same style series for consistency)
========================= */

const FlagGlobal = () => (
  <img
    src="https://png.pngtree.com/png-vector/20230905/ourmid/pngtree-metallic-globe-3d-planet-png-image_9942792.png"
    alt="3D Globe Icon with Stand"
    className="w-full h-full object-contain drop-shadow-2xl"
  />
);

const FlagKR = () => (
  <img
    src="https://static.vecteezy.com/system/resources/previews/015/309/515/non_2x/south-korea-waving-flag-realistic-transparent-background-free-png.png"
    alt="South Korea Waving Flag"
    className="w-full h-full object-contain drop-shadow-2xl"
  />
);

const FlagUS = () => (
  <img
    src="https://static.vecteezy.com/system/resources/previews/015/309/669/non_2x/united-states-waving-flag-realistic-transparent-background-free-png.png"
    alt="USA Waving Flag"
    className="w-full h-full object-contain drop-shadow-2xl"
  />
);

const FlagUK = () => (
  <img
    src="https://static.vecteezy.com/system/resources/previews/015/309/522/non_2x/united-kingdom-waving-flag-realistic-transparent-background-free-png.png"
    alt="UK Waving Flag"
    className="w-full h-full object-contain drop-shadow-2xl"
  />
);

/* =========================
   MAIN COMPONENT
========================= */

export default function AlbumPage({ onSelectContinent }: AlbumPageProps) {
  const continents = [
    {
      id: 'global' as ContinentType,
      title: 'GLOBAL',
      description: 'Worldwide stores & platforms',
      gradient: 'from-blue-500 via-purple-500 to-pink-600',
      flag: <FlagGlobal />,
    },
    {
      id: 'korea' as ContinentType,
      title: 'KOREA',
      description: 'Korean charts & platforms',
      gradient: 'from-red-500 via-pink-500 to-rose-600',
      flag: <FlagKR />,
    },
    {
      id: 'usa' as ContinentType,
      title: 'USA',
      description: 'Billboard & US platforms',
      gradient: 'from-blue-600 via-indigo-500 to-purple-600',
      flag: <FlagUS />,
    },
    {
      id: 'uk' as ContinentType,
      title: 'UK',
      description: 'UK charts & platforms',
      gradient: 'from-indigo-600 via-purple-500 to-pink-600',
      flag: <FlagUK />,
    },
  ];

  return (
    <>
      {/* ===== Animations ===== */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes gradient {
              0% { background-position: 0% 50%; }
              50% { background-position: 100% 50%; }
              100% { background-position: 0% 50%; }
            }
            @keyframes float {
              0%, 100% { transform: translateY(0); }
              50% { transform: translateY(-20px); }
            }
            @keyframes glow {
              0%, 100% { box-shadow: 0 0 20px rgba(236,72,153,.5); }
              50% { box-shadow: 0 0 40px rgba(236,72,153,.8); }
            }
            .animate-gradient { background-size: 200% 200%; animation: gradient 8s ease infinite; }
            .animate-float { animation: float 6s ease-in-out infinite; }
            .animate-glow { animation: glow 2s ease-in-out infinite; }
          `,
        }}
      />

      {/* ===== Background ===== */}
      <div className="relative min-h-screen bg-black text-white overflow-hidden">
        <div className="fixed inset-0 bg-gradient-to-br from-black via-purple-900/20 to-pink-900/30" />
        <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-pink-900/20 via-black to-black" />

        {/* Floating Icons */}
        <div className="fixed inset-0 pointer-events-none z-10">
          <Sparkles className="absolute top-20 left-10 w-8 h-8 text-pink-400 animate-float" />
          <Sparkles className="absolute bottom-32 right-20 w-12 h-12 text-pink-300 animate-ping" />
          <Star className="absolute top-40 right-1/3 w-10 h-10 text-pink-500 animate-pulse" />
          <Star className="absolute bottom-40 left-1/4 w-8 h-8 text-purple-500 animate-pulse" />
        </div>

        {/* ===== Content ===== */}
        <div className="relative z-20 p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto">

            {/* Header */}
            <div className="text-center mb-16 space-y-6">
              <div className="flex items-center justify-center gap-4 mb-6 flex-wrap">
                <ShoppingBag className="w-12 h-12 md:w-14 md:h-14 text-pink-400 animate-bounce" />
                <h1 className="text-5xl md:text-7xl font-extrabold tracking-widest bg-gradient-to-r from-pink-400 via-pink-300 to-purple-400 bg-clip-text text-transparent animate-gradient drop-shadow-2xl">
                  ALBUM STORE
                </h1>
                <ShoppingBag className="w-12 h-12 md:w-14 md:h-14 text-pink-400 animate-bounce" />
              </div>
              <p className="text-xl md:text-2xl text-gray-200 font-light tracking-wide drop-shadow-lg">
                💖 Choose your region to find official stores & purchasing guidelines ✨
              </p>
            </div>

            {/* Region Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
              {continents.map((continent) => (
                <button
                  key={continent.id}
                  onClick={() => onSelectContinent(continent.id)}
                  className={`group relative overflow-hidden bg-gradient-to-br ${continent.gradient} p-10 rounded-3xl transform hover:scale-110 transition-all duration-500 shadow-2xl animate-glow border-2 border-white/20`}
                >
                  <div className="relative z-10 text-center space-y-6">
                    <div className="w-40 h-40 mx-auto animate-float">
                      {continent.flag}
                    </div>
                    <h3 className="text-3xl font-extrabold text-white drop-shadow-2xl">
                      {continent.title}
                    </h3>
                    <p className="text-white/90 text-base font-medium px-4">
                      {continent.description}
                    </p>
                  </div>
                  <Sparkles className="absolute top-4 right-4 w-8 h-8 text-white/70 opacity-0 group-hover:opacity-100 animate-spin transition-opacity duration-500" />
                </button>
              ))}
            </div>

            {/* Digital & Physical Info Cards */}
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {/* Digital */}
              <div className="group relative bg-gradient-to-br from-pink-900/40 to-purple-900/40 backdrop-blur-xl border-2 border-pink-500/40 rounded-3xl p-8 hover:border-pink-400 transition-all duration-500 shadow-2xl hover:shadow-pink-500/40 transform hover:-translate-y-2">
                <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 to-transparent opacity-0 group-hover:opacity-100 rounded-3xl transition-opacity duration-500" />
                <div className="relative z-10">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="bg-gradient-to-br from-pink-500 to-rose-500 p-4 rounded-2xl shadow-lg animate-glow">
                      <CreditCard className="w-8 h-8 text-white" />
                    </div>
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-300 to-purple-300 bg-clip-text text-transparent">
                      Digital Purchasing
                    </h2>
                  </div>
                  <ul className="space-y-3 text-gray-200">
                    {[
                      '✅ Purchase from official digital stores',
                      '✅ Multiple versions per account allowed',
                      '✅ Counts toward Billboard & global charts',
                      '✅ Instant delivery, no shipping costs',
                      '✅ Support global chart performance'
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-gray-300">
                        <Star className="w-5 h-5 text-pink-400 flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Physical */}
              <div className="group relative bg-gradient-to-br from-purple-900/40 to-blue-900/40 backdrop-blur-xl border-2 border-purple-500/40 rounded-3xl p-8 hover:border-purple-400 transition-all duration-500 shadow-2xl hover:shadow-purple-500/40 transform hover:-translate-y-2">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-transparent opacity-0 group-hover:opacity-100 rounded-3xl transition-opacity duration-500" />
                <div className="relative z-10">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="bg-gradient-to-br from-purple-500 to-blue-500 p-4 rounded-2xl shadow-lg animate-glow">
                      <Package className="w-8 h-8 text-white" />
                    </div>
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-transparent">
                      Physical Purchasing
                    </h2>
                  </div>
                  <ul className="space-y-3 text-gray-200">
                    {[
                      '📀 Official merchandise & photobooks',
                      '🎴 Exclusive photocards & posters',
                      '🌟 Limited edition variants available',
                      '📊 Support physical chart performance',
                      '💎 Collectible value for true BLINKs'
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-gray-300">
                        <Star className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="text-center bg-gradient-to-r from-pink-900/30 via-purple-900/30 to-pink-900/30 backdrop-blur-xl border-2 border-pink-500/40 rounded-3xl p-12 shadow-2xl animate-glow">
              <TrendingUp className="w-16 h-16 text-pink-400 mx-auto mb-6 animate-bounce" />
              <h3 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-pink-300 to-purple-300 bg-clip-text text-transparent mb-4">
                Every Purchase Counts! 💖
              </h3>
              <p className="text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
                Your support helps BLACKPINK top the charts worldwide. Choose your region above to start shopping and make a difference! ✨
              </p>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
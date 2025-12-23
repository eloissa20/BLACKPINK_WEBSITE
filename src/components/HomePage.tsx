import { useEffect, useRef, useState } from 'react';
import {
  Music,
  ShoppingBag,
  Zap,
  Volume2,
  VolumeX,
  Play,
  Youtube,
  Heart,
  Sparkles,
} from 'lucide-react';
import bgVideo from '../assets/bg-home-bp.mp4';
import bgImage from '../assets/bpdolls.jpg';

// Import all local images here for proper bundling
import jumpLocal from '../assets/jump-mv-bp.jpg.jpg';
import tamagotchiLocal from '../assets/tamagotchi-bp.jpg';
import fragmentLocal from '../assets/fragment-bp.jpg';

type HomePageProps = {
  onNavigate: (tab: 'guidelines' | 'album' | string) => void;
};

export function HomePage({ onNavigate }: HomePageProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [stats, setStats] = useState({ streams: 0, blinks: 0, views: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/stats');
        if (!response.ok) throw new Error('Fetch failed');
        const data = await response.json();
        setStats({
          streams: data.streams || 5300000,
          blinks: data.blinks || 8000000,
          views: data.views || 40900000000,
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
        setStats({
          streams: 5300000,      // Approx. Spotify daily streams (group) ~Dec 2025
          blinks: 8000000,       // Estimate based on ~24.9M monthly listeners
          views: 40900000000,    // YouTube channel total views ~40.9B (Dec 2025)
        });
      } finally {
        setLoading(false);
      }
    };

    fetchStats();

    const interval = setInterval(fetchStats, 600000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.playsInline = true;
    video.play()?.then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));

    return () => video.pause();
  }, []);

  const handlePlay = () => {
    videoRef.current?.play().then(() => setIsPlaying(true));
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  // Latest BLACKPINK news - December 23, 2025
  const newsPosts = [
    {
      title: 'BLACKPINK Original Tamagotchi Launches TODAY!',
      content: 'Limited-edition BLACKPINK Tamagotchi nano now available on KakaoTalk Gift! Raise Jennie, Jisoo, Rosé, and Lisa as cute digital pets ♡ Physical version coming 2026.',
      author: 'Bandai Namco / YG Plus',
      timestamp: 'Dec 23, 2025',
      link: 'https://gift.kakao.com/brand/14367',
      image: tamagotchiLocal,
    },
    {
      title: 'fragment design x BLACKPINK Second Collab Drops',
      content: 'DEADLINE tour-inspired collection: hoodies, stadium jackets, tees, totes & more – available now!',
      author: 'Hiroshi Fujiwara x BLACKPINK',
      timestamp: 'Dec 22, 2025',
      link: 'https://blackpinkofficial.com/shop',
      image: fragmentLocal,
    },
    {
      title: '"JUMP" MV Surpasses 300 Million Views',
      content: 'The 2025 comeback single hits 300M views in just 161 days! Thank you BLINKs ♡',
      author: 'YG Entertainment',
      timestamp: 'Dec 19, 2025',
      link: 'https://www.youtube.com/watch?v=JUMP_MV_ID',
      image: jumpLocal,
    },
    {
      title: 'Full Group Comeback Album Confirmed for January 2026',
      content: 'First full BLACKPINK album since Born Pink – coming very soon!',
      author: 'YG Entertainment',
      timestamp: 'Nov 2025',
      link: 'https://yg-life.com',
      image: 'https://www.soompi.com/wp-content/uploads/2025/11/blackpink-group-2025-comeback-teaser.jpg',
    },
    {
      title: 'Deadline World Tour Finale',
      content: 'Final shows: Tokyo Dome (Jan 16-18, 2026) and Hong Kong (Jan 24-26). Last chance to see them!',
      author: 'BLACKPINK Official',
      timestamp: '2025-2026',
      link: 'https://blackpinkofficial.com/concert',
      image: 'https://kpopofficial.com/wp-content/uploads/2025/07/BLACKPINK-Deadline-World-Tour-2025-2026-schedule-poster.jpg',
    },
  ];

  const NewsFeed = () => (
    <div
      className="relative w-full h-full bg-cover bg-no-repeat bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/60 to-black/50" />
      <div className="relative z-10 h-full overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-pink-500 scrollbar-track-transparent">
        <header className="flex items-center justify-between mb-8 border-b-4 border-pink-500/50 pb-4">
          <h2 className="text-5xl font-extrabold text-pink-500 bg-gradient-to-r from-pink-500 to-pink-700 bg-clip-text text-transparent animate-pulse">
            Latest News
          </h2>
          <div className="text-gray-300 text-lg">Updated: Dec 23, 2025</div>
        </header>

        <div className="space-y-8">
          {newsPosts.map((post, index) => (
            <div
              key={index}
              className="bg-gray-900/60 backdrop-blur-md rounded-3xl p-6 shadow-2xl border border-pink-500/30 transition-all duration-500 hover:shadow-pink-500/40 hover:scale-105"
            >
              <a href={post.link} target="_blank" rel="noopener noreferrer" className="block w-full">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-64 md:h-96 object-cover rounded-xl shadow-lg hover:scale-105 transition-transform duration-300 cursor-pointer"
                  onError={(e) => {
                    e.currentTarget.src = bgImage;
                  }}
                />
              </a>
              <div className="mt-6 prose prose-xl max-w-none text-white">
                <a
                  href={post.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-pink-400 hover:text-pink-300 transition-colors duration-300 text-2xl font-bold block mb-3"
                >
                  {post.title}
                </a>
                <p>{post.content}</p>
              </div>
              <div className="mt-6 text-gray-300 text-lg flex justify-between items-center border-t border-pink-500/30 pt-4">
                <span>{post.author}</span>
                <span>{post.timestamp}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes gradient {
              0% { background-position: 0% 50%; }
              50% { background-position: 100% 50%; }
              100% { background-position: 0% 50%; }
            }
            .animate-gradient {
              background-size: 200% 200%;
              animation: gradient 8s ease infinite;
            }
            .slow-spin {
              animation-duration: 12s;
            }
            /* Custom pink scrollbar - thin and visible only on hover if needed */
            .scrollbar-thin::-webkit-scrollbar {
              width: 8px;
            }
            .scrollbar-thin::-webkit-scrollbar-track {
              background: transparent;
            }
            .scrollbar-thin::-webkit-scrollbar-thumb {
              background-color: rgba(236, 72, 153, 0.6); /* pink-500 with opacity */
              border-radius: 4px;
            }
            .scrollbar-thin::-webkit-scrollbar-thumb:hover {
              background-color: rgb(236, 72, 153);
            }
          `,
        }}
      />

      <div className="flex flex-col h-screen bg-black text-white overflow-hidden">
        {/* Sparkle Overlay */}
        <div className="fixed inset-0 pointer-events-none z-40">
          <div className="absolute inset-0 bg-gradient-to-t from-pink-900/20 via-transparent to-purple-900/20" />
          <Sparkles className="absolute top-20 left-10 w-8 h-8 text-pink-400 animate-pulse" />
          <Sparkles className="absolute bottom-32 right-20 w-12 h-12 text-pink-300 animate-ping" />
          <Sparkles className="absolute top-1/2 right-10 w-6 h-6 text-purple-400 animate-spin slow-spin" />
        </div>

        <div className="flex flex-1 flex-col lg:flex-row overflow-hidden">
          {/* Desktop Sidebar */}
          <div className="hidden lg:block lg:w-80 xl:w-96 h-full overflow-hidden border-r border-pink-900/50">
            <NewsFeed />
          </div>

          {/* Main Hero */}
          <div className="relative flex-1 flex flex-col justify-center items-center">
            <video
              ref={videoRef}
              className="absolute inset-0 w-full h-full object-cover"
              src={bgVideo}
              loop
              muted
              playsInline
            />

            <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-pink-900/20 to-black/80 z-10" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/50 z-10" />

            {/* Video Controls */}
            <div className="absolute top-4 left-4 z-30 flex gap-3">
              {!isPlaying && (
                <button
                  onClick={handlePlay}
                  className="bg-pink-600/80 hover:bg-pink-500 backdrop-blur p-3 rounded-full shadow-2xl transition"
                >
                  <Play className="w-5 h-5" />
                </button>
              )}
              <button
                onClick={toggleMute}
                className="bg-pink-600/80 hover:bg-pink-500 backdrop-blur p-3 rounded-full shadow-2xl transition"
              >
                {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
              </button>
            </div>

            {/* Main Content */}
            <div className="relative z-20 text-center px-6 py-12 max-w-5xl mx-auto space-y-16">
              <div>
                <div className="flex items-center justify-center gap-6 mb-8 flex-wrap">
                  <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-widest bg-gradient-to-r from-pink-400 via-pink-300 to-purple-400 bg-clip-text text-transparent animate-gradient">
                    WELCOME BLINKS
                  </h1>
                  <Zap className="w-12 h-12 md:w-16 md:h-16 text-pink-400 animate-pulse" />
                </div>
                <p className="text-xl md:text-2xl text-gray-200 font-light tracking-wide">
                  The ultimate hub for BLACKPINK fans worldwide ♡
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-8 justify-center">
                <button
                  onClick={() => onNavigate('guidelines')}
                  className="group relative overflow-hidden bg-gradient-to-r from-pink-600 to-purple-700 hover:from-pink-500 hover:to-purple-600 px-16 py-6 rounded-3xl text-2xl font-bold shadow-2xl transform hover:scale-105 transition-all duration-500"
                >
                  <span className="flex items-center gap-4">
                    <Music className="w-8 h-8" />
                    LET'S STREAM
                  </span>
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-700" />
                </button>

                <button
                  onClick={() => onNavigate('album')}
                  className="group relative overflow-hidden bg-black/70 hover:bg-black/90 border-2 border-pink-500 px-16 py-6 rounded-3xl text-2xl font-bold shadow-2xl transform hover:scale-105 transition-all duration-500 backdrop-blur"
                >
                  <span className="flex items-center gap-4">
                    <ShoppingBag className="w-8 h-8" />
                    LET'S BUY
                  </span>
                </button>
              </div>

              <div className="grid grid-cols-3 gap-8 mt-20 max-w-4xl mx-auto">
                {loading ? (
                  <p className="col-span-3 text-pink-400 text-2xl">Loading live stats...</p>
                ) : (
                  [
                    { value: stats.streams, label: 'Streams Today (Spotify)', icon: Music },
                    { value: stats.blinks, label: 'Active BLINKs (est.)', icon: Heart },
                    { value: stats.views, label: 'Total Views (YouTube)', icon: Youtube },
                  ].map((stat, i) => (
                    <div
                      key={i}
                      className="bg-white/5 backdrop-blur-lg border border-pink-800/50 rounded-2xl p-6 hover:border-pink-500 transition-all"
                    >
                      <stat.icon className="w-10 h-10 text-pink-400 mx-auto mb-3" />
                      <p className="text-3xl font-bold text-pink-300">
                        {stat.value.toLocaleString()}
                      </p>
                      <p className="text-gray-400 mt-2">{stat.label}</p>
                    </div>
                  ))
                )}
              </div>

              {/* Mobile News */}
              <div className="mt-16 lg:hidden">
                <h3 className="text-2xl font-bold text-pink-300 mb-6">Latest News</h3>
                <div className="bg-black/50 backdrop-blur-xl rounded-2xl border border-pink-800/70 max-h-96 overflow-hidden">
                  <NewsFeed />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
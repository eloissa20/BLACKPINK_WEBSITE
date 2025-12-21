import { useEffect, useRef, useState } from 'react';
import {
  Music,
  ShoppingBag,
  Zap,
  Volume2,
  VolumeX,
  Play,
  Instagram,
  Youtube,
  Twitter,
  Calendar,
  Heart,
  Sparkles,
} from 'lucide-react';
import bgVideo from '../assets/bg-home-bp.mp4';

// Updated NewsFeed with accurate latest news as of December 21, 2025
function NewsFeed() {
  const newsItems = [
    {
      id: 1,
      title: 'BLACKPINK x Tamagotchi Collaboration Pre-Release',
      date: 'Dec 18, 2025',
      summary: 'Limited BLACKPINK Original Tamagotchi collectible launches Dec 23 via KakaoTalk Gift. Full collab lineup coming in 2026!',
    },
    {
      id: 2,
      title: 'fragment design x BLACKPINK Second Collab Teased',
      date: 'Dec 17, 2025',
      summary: 'Hiroshi Fujiwara reveals polka dot tote, hoodies/tees with "PINK IS THE NEW BLACK", and varsity jacket.',
    },
    {
      id: 3,
      title: '"JUMP" MV Surpasses 300 Million Views',
      date: 'Dec 19, 2025',
      summary: '2025 comeback single hits massive milestone. Also named top K-pop song of 2025 by Apple Music!',
    },
    {
      id: 4,
      title: 'Full Group Comeback Album Confirmed for January 2026',
      date: 'Nov 6, 2025',
      summary: 'YG confirms new album in early 2026 (final touches ongoing). First full release since Born Pink!',
    },
    {
      id: 5,
      title: 'Deadline World Tour Ongoing',
      date: '2025-2026',
      summary: 'Stadium tour continues with recent stops in Bangkok, upcoming Tokyo & Hong Kong finale Jan 26.',
    },
  ];

  return (
    <div className="space-y-4">
      {newsItems.map((item) => (
        <div
          key={item.id}
          className="bg-black/40 backdrop-blur-sm border border-pink-900/50 rounded-xl p-4 hover:border-pink-600 hover:scale-105 transition-all"
        >
          <p className="text-pink-400 text-sm font-medium">{item.date}</p>
          <h4 className="text-lg font-bold mt-1 text-white">{item.title}</h4>
          <p className="text-gray-300 text-sm mt-2">{item.summary}</p>
        </div>
      ))}
    </div>
  );
}

interface HomePageProps {
  onNavigate: (tab: 'guidelines' | 'album' | string) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [stats, setStats] = useState({ streams: 0, blinks: 0, views: 0 });

  // Autoplay muted video
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.playsInline = true;
    video.play()?.then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));

    return () => video.pause();
  }, []);

  // Animated stats counter (realistic end-of-2025 numbers)
  useEffect(() => {
    const target = { streams: 16800000, blinks: 7200000, views: 13200000000 };
    const duration = 2200;
    const steps = 60;
    const interval = duration / steps;

    let current = { streams: 0, blinks: 0, views: 0 };
    const timer = setInterval(() => {
      let finished = true;
      (Object.keys(target) as Array<keyof typeof target>).forEach((key) => {
        current[key] += target[key] / steps;
        if (current[key] < target[key]) finished = false;
      });

      setStats({
        streams: Math.floor(current.streams),
        blinks: Math.floor(current.blinks),
        views: Math.floor(current.views),
      });

      if (finished) clearInterval(timer);
    }, interval);

    return () => clearInterval(timer);
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

  return (
    <>
      <style jsx>{`
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
      `}</style>

      <div className="flex flex-col h-screen bg-black text-white overflow-hidden">
        {/* Sparkle Overlay */}
        <div className="fixed inset-0 pointer-events-none z-40">
          <div className="absolute inset-0 bg-gradient-to-t from-pink-900/20 via-transparent to-purple-900/20" />
          <Sparkles className="absolute top-20 left-10 w-8 h-8 text-pink-400 animate-pulse" />
          <Sparkles className="absolute bottom-32 right-20 w-12 h-12 text-pink-300 animate-ping" />
          <Sparkles className="absolute top-1/2 right-10 w-6 h-6 text-purple-400 animate-spin slow-spin" />
        </div>

        <div className="flex flex-1 flex-col lg:flex-row overflow-hidden">
          {/* Desktop News Sidebar - Original clean style (no heavy gradient) */}
          <div className="hidden lg:block lg:w-80 xl:w-96 h-full overflow-y-auto border-r border-pink-900/50 bg-black/60 backdrop-blur-md">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-pink-300 mb-6 flex items-center gap-3">
                <Calendar className="w-7 h-7" />
                Latest Updates
              </h2>
              <NewsFeed />
            </div>
          </div>

          {/* Main Hero Section */}
          <div className="relative flex-1 flex flex-col justify-center items-center">
            <video
              ref={videoRef}
              className="absolute inset-0 w-full h-full object-cover"
              src={bgVideo}
              loop
              muted
              playsInline
            />

            {/* Multi-layer overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-pink-900/20 to-black/80 z-10" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/50 z-10" />

            {/* Video Controls */}
            <div className="absolute top-4 left-4 z-30 flex gap-3">
              {!isPlaying && (
                <button
                  onClick={handlePlay}
                  className="bg-pink-600/80 hover:bg-pink-500 backdrop-blur p-3 rounded-full shadow-2xl transition"
                  aria-label="Play video"
                >
                  <Play className="w-5 h-5" />
                </button>
              )}
              <button
                onClick={toggleMute}
                className="bg-pink-600/80 hover:bg-pink-500 backdrop-blur p-3 rounded-full shadow-2xl transition"
                aria-label={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
              </button>
            </div>

            {/* Main Content */}
            <div className="relative z-20 text-center px-6 py-12 max-w-5xl mx-auto space-y-16">
              {/* Header */}
              <div>
                <div className="flex items-center justify-center gap-6 mb-8 flex-wrap">
                  <Zap className="w-12 h-12 md:w-16 md:h-16 text-pink-400 animate-pulse" />
                  <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-widest bg-gradient-to-r from-pink-400 via-pink-300 to-purple-400 bg-clip-text text-transparent animate-gradient">
                    WELCOME BLINKS
                  </h1>
                  <Zap className="w-12 h-12 md:w-16 md:h-16 text-pink-400 animate-pulse" />
                </div>
                <p className="text-xl md:text-2xl text-gray-200 font-light tracking-wide">
                  The ultimate hub for BLACKPINK fans worldwide ♡
                </p>
              </div>

              {/* Action Buttons */}
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

              {/* BLINK Power Stats */}
              <div className="grid grid-cols-3 gap-8 mt-20 max-w-4xl mx-auto">
                {[
                  { value: stats.streams, label: 'Streams Today', icon: Music },
                  { value: stats.blinks, label: 'Active BLINKs', icon: Heart },
                  { value: stats.views, label: 'Total Views', icon: Youtube },
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
                ))}
              </div>

              {/* Social Links */}
              <div className="flex gap-6 justify-center mt-12">
                {[
                  { icon: Instagram, href: 'https://instagram.com/blackpinkofficial', label: 'Instagram' },
                  { icon: Youtube, href: 'https://youtube.com/BLACKPINK', label: 'YouTube' },
                  { icon: Twitter, href: 'https://twitter.com/BLACKPINK', label: 'X / Twitter' },
                ].map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-pink-600/20 hover:bg-pink-600/60 backdrop-blur p-5 rounded-full transition-all hover:scale-110 shadow-xl border border-pink-700/50"
                    aria-label={social.label}
                  >
                    <social.icon className="w-8 h-8" />
                  </a>
                ))}
              </div>

              {/* Mobile News Preview - Original lighter style */}
              <div className="mt-16 lg:hidden">
                <h3 className="text-2xl font-bold text-pink-300 mb-6">Latest News</h3>
                <div className="bg-black/50 backdrop-blur-xl rounded-2xl p-6 border border-pink-800/70 max-h-80 overflow-y-auto">
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
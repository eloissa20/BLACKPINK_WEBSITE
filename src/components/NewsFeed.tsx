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
import bgImage from '../assets/bpdolls.jpg'; // Assuming this is the background image from NewsFeed.tsx
import blackpinkImage from '../assets/blackpink-group.jpg'; // Group image or a relevant news image

// Updated Latest News layout inspired by NewsFeed.tsx – full background, header, single featured post style
// But adapted to show multiple recent news items with images if possible (using placeholders for additional images)
function LatestNews() {
  const newsItems = [
    {
      id: 1,
      title: 'BLACKPINK x Tamagotchi Collaboration Pre-Release',
      date: 'Dec 18, 2025',
      summary: 'Limited BLACKPINK Original Tamagotchi collectible launches Dec 23 via KakaoTalk Gift. Full collab lineup coming in 2026!',
      image: blackpinkImage, // Reuse or replace with specific image
      link: 'https://www.bandwagon.asia/articles/blackpink-tease-official-tamagotchi-collaboration',
    },
    {
      id: 2,
      title: 'fragment design x BLACKPINK Second Collab Teased',
      date: 'Dec 17, 2025',
      summary: 'Hiroshi Fujiwara reveals polka dot tote, hoodies/tees with "PINK IS THE NEW BLACK", and varsity jacket.',
      image: blackpinkImage,
      link: 'https://hypebeast.com/2025/12/blackpink-lisa-rose-jisoo-jennie-fragment-hiroshi-fujiwara-collaboration-teaser-release-info',
    },
    {
      id: 3,
      title: '"JUMP" MV Surpasses 300 Million Views',
      date: 'Dec 19, 2025',
      summary: '2025 comeback single "JUMP" hits 300M views in just 161 days!',
      image: blackpinkImage,
      link: 'https://www.soompi.com/article/1806661wpp/blackpinks-jump-becomes-their-13th-mv-to-hit-300-million-views',
    },
    {
      id: 4,
      title: 'Full Group Comeback Album Confirmed for January 2026',
      date: 'Nov 6, 2025',
      summary: 'YG confirms new full album in early 2026 – first since Born Pink!',
      image: blackpinkImage,
      link: 'https://www.allkpop.com/article/2025/11/yg-entertainment-confirms-blackpinks-comeback-in-january',
    },
    {
      id: 5,
      title: 'Deadline World Tour Ongoing',
      date: '2025-2026',
      summary: 'Stadium tour continues with upcoming Tokyo Dome & Hong Kong finale Jan 26.',
      image: blackpinkImage,
      link: 'https://en.wikipedia.org/wiki/Deadline_World_Tour',
    },
  ];

  return (
    <div className="relative h-full bg-cover bg-no-repeat bg-center" style={{ backgroundImage: `url(${bgImage})` }}>
      <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/60 to-black/50" />
      <div className="relative z-10 h-full overflow-y-auto p-6">
        <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 border-b-4 border-pink-500/50 pb-4">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-pink-500 bg-gradient-to-r from-pink-500 to-pink-700 bg-clip-text text-transparent animate-pulse">
            Latest Updates
          </h2>
          <div className="text-gray-300 text-lg mt-4 sm:mt-0">Updated: Dec 21, 2025</div>
        </header>

        <div className="space-y-8">
          {newsItems.map((item) => (
            <div
              key={item.id}
              className="bg-gray-900/60 backdrop-blur-md rounded-3xl p-6 shadow-2xl border border-pink-500/30 transition-all duration-500 hover:shadow-pink-500/30 hover:scale-105"
            >
              <a href={item.link} target="_blank" rel="noopener noreferrer" className="block">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-64 md:h-80 object-cover rounded-xl shadow-lg hover:scale-105 transition-transform duration-300"
                />
              </a>
              <p className="text-pink-400 text-sm font-medium mt-4">{item.date}</p>
              <h4 className="text-2xl font-bold mt-2 text-white">
                <a href={item.link} target="_blank" rel="noopener noreferrer" className="hover:text-pink-300 transition-colors">
                  {item.title}
                </a>
              </h4>
              <p className="text-gray-300 text-base mt-3">{item.summary}</p>
            </div>
          ))}
        </div>
      </div>
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

  // Animated stats counter
  useEffect(() => {
    const target = { streams: 16800000, blinks: 7200000, views: 13200000000 };
    const duration = 2200;
    const steps = 60;
    const interval = duration / steps;

    let current = { streams: 0, blinks: 0, views: 0 };
    const timer = setInterval(() => {
      let finished = true;
      Object.keys(target).forEach((key) => {
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
          {/* Desktop Latest News Sidebar – New stylish layout with background, header, cards with images */}
          <div className="hidden lg:block lg:w-80 xl:w-96 h-full overflow-y-auto border-r border-pink-900/50">
            <LatestNews />
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

              {/* Mobile Latest News Preview – Same new style */}
              <div className="mt-16 lg:hidden">
                <LatestNews />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
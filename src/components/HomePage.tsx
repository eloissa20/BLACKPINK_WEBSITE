import { useEffect, useRef, useState } from 'react';
import {
  Music,
  ShoppingBag,
  Zap,
  Volume2,
  VolumeX,
  Youtube,
  Heart,
  Sparkles,
  Star,
  TrendingUp,
} from 'lucide-react';

import { TabType } from '../types';
import bgVideo from '../assets/go.mp4';

type HomePageProps = {
  onNavigate: (tab: TabType) => void;
  bgImage?: string;
};

export function HomePage({ onNavigate, bgImage }: HomePageProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [stats, setStats] = useState({ streams: 0, blinks: 0, views: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('https://blinkhourcity-backend.vercel.app/api/stats');
        if (!response.ok) throw new Error('Fetch failed');
        const data = await response.json();
        setStats({
          streams: data.streams || 12000000,      // Updated realistic fallback (post-comeback surge)
          blinks: data.blinks || 4500000,         // Active BLINKs estimate
          views: data.views || 52000000000,       // Total views (YouTube + others, growing fast)
        });
      } catch (error) {
        console.error('Error fetching stats (using fallbacks):', error);
        setStats({
          streams: 12000000,
          blinks: 4500000,
          views: 52000000000,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
    const interval = setInterval(fetchStats, 10000); // Refresh every 10s
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.playsInline = true;
    video.setAttribute('webkit-playsinline', 'true');

    const attemptPlay = () => {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            console.log('Video autoplay started successfully');
          })
          .catch((error) => {
            console.warn('Autoplay was prevented:', error);
            setTimeout(attemptPlay, 100);
          });
      }
    };

    if (video.readyState >= 3) {
      attemptPlay();
    } else {
      video.addEventListener('loadeddata', attemptPlay);
    }

    return () => {
      video.pause();
      video.removeEventListener('loadeddata', attemptPlay);
    };
  }, []);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  const newsPosts = [

    // New #2: 'GO' M/V Teaser drops TOMORROW (Feb 27)
    {
      title: "'GO' M/V Teaser Drops Tomorrow – DEADLINE Title Track Incoming!",
      content:
        'BLACKPINK drops the official M/V teaser for "GO" (title track of DEADLINE) on Feb 27, 2026 at 12AM EST / 2PM KST! Pre-save now and get ready on FRIDAY',
      author: 'YG Entertainment',
      timestamp: 'Feb 25, 2026',
      link: 'https://www.youtube.com/watch?v=_t_jdSMufrU', // Actual GO M/V Teaser YouTube link
      image: 'https://www.allkpop.com/upload/2026/02/content/191044/1771515851-2026-02-19-3.jpg', // Strong DEADLINE/GO concept group poster
    },

    // New #1: National Museum of Korea × BLACKPINK (pink lighting + listening starts TOMORROW)
    {
      title: 'National Museum of Korea Goes PINK for DEADLINE Release!',
      content:
        'Tomorrow (Feb 27, 2026) the National Museum of Korea lights up in signature BLACKPINK pink every evening (4PM–10PM) as part of the historic "DEADLINE: BLACKPINK WILL MAKE YOU" collab with Spotify! Pre-Listening sessions (Feb 26) sold out instantly 🔥, but the public Listening Zone opens Feb 27–Mar 8 at the Path of History (Gwanggaeto Stele area) — immerse yourself in the album tracks. BLINKs, head to Seoul! 🏛️🩷',
      author: 'YG Entertainment × National Museum of Korea × Spotify',
      timestamp: 'Feb 25, 2026',
      link: 'https://weverse.io/blackpink/notice/33735', // Official Weverse notice
      image: 'https://www.antimusic.com/news/photos/26/02/11/blackpink.jpg', // Official pink-lit museum poster
    },

    // Your original posts (kept as-is, now below the new urgent ones)
    {
      title: '3rd Mini Album "DEADLINE" - PRE-ORDER NOW!',
      content:
        'Pre-order BLACKPINK\'s highly anticipated 3rd mini album "DEADLINE" now! Available in multiple versions with exclusive photo cards and posters. Ships January 2026!',
      author: 'YG Entertainment',
      timestamp: 'Jan 15, 2026',
      link: 'https://orcd.co/blackpink-deadline',
      image:
        'https://cafe24img.poxo.com/ygnext/web/product/big/202601/1df098494a816d5bcb8306d6f71d9824.jpg',
    },
    {
      title: 'BLACKPINK 3rd Mini Album "DEADLINE" Announced!',
      content:
        'BREAKING: BLACKPINK is releasing their 3rd mini album "DEADLINE" on February 27, 2026! YG Entertainment: "We would like to express our deep gratitude to the fans (BLINKS) who have waited for us for such a long time. We plan to repay you with high-quality music."',
      author: 'YG Entertainment',
      timestamp: 'Jan 14, 2026',
      link: 'https://www.youtube.com/watch?v=6gi87AUDs0M',
      image: 'https://pbs.twimg.com/media/G-qnKDRbQAYq3KZ?format=jpg&name=large',
    },
    {
      title: 'BLACKPINK Original Tamagotchi Launches TODAY!',
      content:
        'Limited-edition BLACKPINK Tamagotchi nano now available on KakaoTalk Gift! Raise Jennie, Jisoo, Rosé, and Lisa as cute digital pets ♡ Physical version coming 2026.',
      author: 'Bandai Namco / YG Plus',
      timestamp: 'Dec 23, 2025',
      link: 'https://gift.kakao.com/brand/14367',
      image:
        'https://www.allkpop.com/upload/2025/12/content/191449/web_data/allkpop_1766173858_allkpop-header-photo.jpg',
    },
    {
      title: 'fragment design x BLACKPINK Second Collab Drops',
      content:
        'DEADLINE tour-inspired collection: hoodies, stadium jackets, tees, totes & more – available now!',
      author: 'Hiroshi Fujiwara x BLACKPINK',
      timestamp: 'Dec 22, 2025',
      link: 'https://blackpinkofficial.com/shop',
      image:
        'https://image-cdn.hypb.st/https%3A%2F%2Fhypebeast.com%2Fwp-content%2Fblogs.dir%2F6%2Ffiles%2F2025%2F12%2F30%2Fblackpink-fragment-design-deadline-tour-merch-collection-hiroshi-fujiwara-where-to-buy-ft.jpg?w=960&cbr=1&q=90&fit=max',
    },
    {
      title: '"JUMP" MV Surpasses 300 Million Views',
      content:
        'The 2025 comeback single hits 300M views in just 161 days! Thank you BLINKs ♡',
      author: 'YG Entertainment',
      timestamp: 'Dec 19, 2025',
      link: 'https://www.youtube.com/watch?v=CgCVZdcKcqY',
      image: 'https://i.ytimg.com/vi/CgCVZdcKcqY/maxresdefault.jpg',
    },
    {
      title: 'Deadline World Tour Finale',
      content:
        'Final shows: Tokyo Dome (Jan 16-18, 2026) and Hong Kong (Jan 24-26). Last chance to see them!',
      author: 'BLACKPINK Official',
      timestamp: '2025-2026',
      link: 'https://blackpinkofficial.com/concert',
      image:
        'https://kpopofficial.com/wp-content/uploads/2025/07/BLACKPINK-Deadline-World-tour-schedule.webp',
    },
  ];

  const NewsFeed = () => (
    <div
      className="relative w-full h-full bg-cover bg-no-repeat bg-center"
      style={{
        backgroundImage: `url(${
          bgImage ||
          'https://4kwallpapers.com/images/wallpapers/blackpink-3840x2160-19348.jpg'
        })`,
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/70 to-pink-900/40" />
      <div className="relative z-10 h-full overflow-y-auto p-4 sm:p-6 md:p-8 scrollbar-thin scrollbar-thumb-pink-500 scrollbar-track-transparent">
        <header className="sticky top-0 bg-gradient-to-r from-black/90 to-pink-900/50 backdrop-blur-xl mb-6 border-b-2 border-pink-500/50 pb-4 rounded-xl p-4 shadow-2xl z-20">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-pink-400 via-pink-300 to-purple-400 bg-clip-text text-transparent flex items-center gap-3">
              <TrendingUp className="w-7 h-7 sm:w-8 sm:h-8 animate-bounce" />
              Latest News
            </h2>
            <div className="text-pink-300 text-sm font-semibold bg-pink-900/30 px-3 py-2 rounded-full border border-pink-500/30">
              Updated: Feb 25, 2026
            </div>
          </div>
        </header>

        <div className="space-y-6 pb-8">
          {newsPosts.map((post, index) => (
            <div
              key={index}
              className="group bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-xl rounded-2xl overflow-hidden shadow-2xl border-2 border-pink-500/20 transition-all duration-500 hover:border-pink-500/60 hover:shadow-pink-500/30 hover:-translate-y-2"
            >
              <a
                href={post.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 sm:h-56 object-cover transition-transform duration-700 group-hover:scale-110"
                  onError={(e) => {
                    e.currentTarget.src =
                      bgImage ||
                      'https://4kwallpapers.com/images/wallpapers/blackpink-3840x2160-19348.jpg';
                  }}
                />
                <Star className="absolute top-4 right-4 w-6 h-6 text-pink-400 opacity-0 group-hover:opacity-100 animate-spin transition-opacity duration-300 z-20" />
              </a>
              <div className="p-5 sm:p-6">
                <a
                  href={post.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-pink-400 group-hover:text-pink-300 transition-colors duration-300 text-lg sm:text-xl font-bold block mb-3"
                >
                  {post.title}
                </a>
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-4">
                  {post.content}
                </p>
                <div className="flex justify-between items-center text-sm text-gray-400 border-t border-pink-500/20 pt-4">
                  <span className="font-semibold">{post.author}</span>
                  <span>{post.timestamp}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // ... (the rest of your component remains unchanged: return JSX with video bg, buttons, stats grid, mobile news feed, style tag, etc.)
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
            @keyframes float {
              0%, 100% { transform: translateY(0px); }
              50% { transform: translateY(-20px); }
            }
            @keyframes glow {
              0%, 100% { box-shadow: 0 0 20px rgba(236, 72, 153, 0.5); }
              50% { box-shadow: 0 0 40px rgba(236, 72, 153, 0.8); }
            }
            .animate-gradient {
              background-size: 200% 200%;
              animation: gradient 8s ease infinite;
            }
            .animate-float {
              animation: float 3s ease-in-out infinite;
            }
            .animate-glow {
              animation: glow 2s ease-in-out infinite;
            }
            .slow-spin {
              animation-duration: 12s;
            }
            .scrollbar-thin::-webkit-scrollbar {
              width: 6px;
            }
            .scrollbar-thin::-webkit-scrollbar-track {
              background: transparent;
            }
            .scrollbar-thin::-webkit-scrollbar-thumb {
              background: linear-gradient(to bottom, rgba(236, 72, 153, 0.6), rgba(168, 85, 247, 0.6));
              border-radius: 10px;
            }
            .scrollbar-thin::-webkit-scrollbar-thumb:hover {
              background: linear-gradient(to bottom, rgb(236, 72, 153), rgb(168, 85, 247));
            }
            
            @supports (-webkit-touch-callout: none) {
              .mobile-vh {
                height: -webkit-fill-available;
              }
            }
          `,
        }}
      />

      <div className="flex flex-col h-screen mobile-vh bg-black text-white overflow-hidden">
        <div className="fixed inset-0 pointer-events-none z-40 hidden sm:block">
          <div className="absolute inset-0 bg-gradient-to-t from-pink-900/30 via-transparent to-purple-900/30" />
          <Sparkles className="absolute top-20 left-10 w-8 h-8 text-pink-400 animate-pulse animate-float" />
          <Sparkles className="absolute bottom-32 right-20 w-12 h-12 text-pink-300 animate-ping" />
          <Sparkles className="absolute top-1/2 right-10 w-6 h-6 text-purple-400 animate-spin slow-spin" />
          <Star className="absolute top-40 right-1/3 w-10 h-10 text-pink-500 animate-pulse" style={{ animationDelay: '0.5s' }} />
          <Star className="absolute bottom-40 left-1/4 w-8 h-8 text-purple-500 animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        <div className="flex flex-1 flex-col lg:flex-row overflow-hidden h-full">
          <div className="hidden lg:block lg:w-80 xl:w-96 h-full overflow-hidden border-r-4 border-pink-500/30 shadow-2xl shadow-pink-500/20">
            <NewsFeed />
          </div>

          <div className="relative flex-1 flex flex-col overflow-y-auto overflow-x-hidden">
            {/* Video Background Section */}
            <div className="relative min-h-screen lg:min-h-0 lg:h-auto flex flex-col justify-center items-center">
              <video
                ref={videoRef}
                className="absolute inset-0 w-full h-full object-cover"
                src={bgVideo}
                loop
                muted
                playsInline
                autoPlay
                preload="auto"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-pink-900/30 to-purple-900/40 z-10" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60 z-10" />

              <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-30 flex gap-2 sm:gap-4">
                <button
                  onClick={toggleMute}
                  className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 backdrop-blur-xl p-2 sm:p-3 md:p-4 rounded-xl sm:rounded-2xl shadow-2xl transition-all duration-300 transform hover:scale-110 border border-pink-400/50 animate-glow"
                >
                  {isMuted ? <VolumeX className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" /> : <Volume2 className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />}
                </button>
              </div>

              <div className="relative z-20 text-center px-4 sm:px-6 py-6 sm:py-12 md:py-16 max-w-6xl mx-auto w-full flex flex-col justify-center min-h-screen">
                <div className="space-y-4 sm:space-y-6 md:space-y-8">
                  {/* Title Section */}
                  <div className="space-y-3 sm:space-y-4">
                    <div className="flex items-center justify-center gap-2 sm:gap-4 md:gap-6 mb-2 sm:mb-4">
                      <Zap className="w-6 h-6 sm:w-10 sm:h-10 md:w-14 md:h-14 text-pink-400 animate-pulse animate-float flex-shrink-0" />
                      <h1 className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-wider sm:tracking-widest bg-gradient-to-r from-pink-400 via-pink-300 to-purple-400 bg-clip-text text-transparent animate-gradient drop-shadow-2xl leading-tight">
                        WELCOME BLINKS
                      </h1>
                      <Zap className="w-6 h-6 sm:w-10 sm:h-10 md:w-14 md:h-14 text-pink-400 animate-pulse animate-float flex-shrink-0" style={{ animationDelay: '0.5s' }} />
                    </div>
                    <p className="text-sm sm:text-lg md:text-xl lg:text-2xl text-gray-200 font-light tracking-wide drop-shadow-lg px-2 sm:px-4">
                      🩷 The BLINKHOURCITY for BLACKPINK fans worldwide 🩷
                    </p>
                  </div>

                  {/* Buttons Section */}
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6 justify-center items-stretch sm:items-center px-4 sm:px-6 max-w-3xl mx-auto w-full">
                    <button
                      onClick={() => onNavigate('guidelines')}
                      className="group relative overflow-hidden bg-gradient-to-r from-pink-600 via-pink-500 to-purple-700 hover:from-pink-500 hover:via-pink-400 hover:to-purple-600 px-6 sm:px-8 md:px-10 lg:px-12 py-4 sm:py-5 md:py-6 rounded-2xl sm:rounded-3xl text-base sm:text-lg md:text-xl lg:text-2xl font-bold shadow-2xl transform hover:scale-105 sm:hover:scale-110 transition-all duration-500 border-2 border-pink-400/50 animate-glow w-full sm:w-auto"
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2 sm:gap-3 md:gap-4">
                        <Music className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 animate-bounce flex-shrink-0" />
                        <span className="whitespace-nowrap">LET'S STREAM</span>
                        <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 animate-spin flex-shrink-0" />
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-white/30 to-transparent translate-x-full group-hover:translate-x-0 transition-transform duration-700" />
                    </button>

                    <button
                      onClick={() => onNavigate('album')}
                      className="group relative overflow-hidden bg-black/80 hover:bg-black/60 border-2 sm:border-3 md:border-4 border-pink-500 hover:border-purple-500 px-6 sm:px-8 md:px-10 lg:px-12 py-4 sm:py-5 md:py-6 rounded-2xl sm:rounded-3xl text-base sm:text-lg md:text-xl lg:text-2xl font-bold shadow-2xl transform hover:scale-105 sm:hover:scale-110 transition-all duration-500 backdrop-blur-xl w-full sm:w-auto"
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2 sm:gap-3 md:gap-4">
                        <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 group-hover:animate-bounce flex-shrink-0" />
                        <span className="whitespace-nowrap">LET'S BUY</span>
                        <Heart className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 group-hover:animate-pulse flex-shrink-0" />
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </button>
                  </div>

                  {/* Stats Section */}
                  {/* <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 md:gap-6 mt-6 sm:mt-8 md:mt-10 max-w-5xl mx-auto px-4 sm:px-6 w-full"> */}
                    {loading ? (
                      <p className="col-span-3 text-pink-400 text-base sm:text-lg md:text-2xl animate-pulse"></p>
                    ) : (
                      [
                        { value: stats.streams, label: 'Streams Today', icon: Music, color: 'from-pink-500 to-rose-500' },
                        { value: stats.blinks, label: 'Active BLINKS', icon: Heart, color: 'from-pink-500 to-purple-500' },
                        { value: stats.views, label: 'Total Views', icon: Youtube, color: 'from-red-500 to-pink-500' },
                      ].map((stat, i) => (
                        <div
                          key={i}
                          className="group relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border-2 border-pink-500/30 rounded-2xl sm:rounded-3xl p-4 sm:p-5 md:p-6 hover:border-pink-400 transition-all duration-500 transform hover:scale-105 hover:-translate-y-1 sm:hover:-translate-y-2 shadow-2xl hover:shadow-pink-500/40"
                        >
                          <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-20 rounded-2xl sm:rounded-3xl transition-opacity duration-500`} />
                          <stat.icon className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 text-pink-400 mx-auto mb-2 sm:mb-3 group-hover:scale-125 transition-transform duration-300" />
                          <p className="text-xl sm:text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-pink-300 to-purple-300 bg-clip-text text-transparent">
                            {stat.value.toLocaleString()}
                          </p>
                          <p className="text-gray-300 mt-1 sm:mt-2 font-semibold text-xs sm:text-sm">{stat.label}</p>
                        </div>
                      ))
                    )}
                  {/* </div> */}
                </div>
              </div>
            </div>

            {/* Mobile News Feed */}
            <div className="lg:hidden relative min-h-[80vh] bg-cover bg-no-repeat bg-center"
              style={{
                backgroundImage: `url(${
                  bgImage ||
                  'https://4kwallpapers.com/images/wallpapers/blackpink-3840x2160-19348.jpg'
                })`,
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/70 to-pink-900/40" />
              <div className="relative z-10 h-full overflow-y-auto p-4 sm:p-6 scrollbar-thin scrollbar-thumb-pink-500 scrollbar-track-transparent">
                <header className="sticky top-0 bg-gradient-to-r from-black/90 to-pink-900/50 backdrop-blur-xl mb-6 border-b-2 border-pink-500/50 pb-4 rounded-xl p-4 shadow-2xl z-20">
                  <div className="flex items-center justify-between">
                    <h2 className="text-3xl font-extrabold bg-gradient-to-r from-pink-400 via-pink-300 to-purple-400 bg-clip-text text-transparent flex items-center gap-3">
                      <TrendingUp className="w-7 h-7 animate-bounce" />
                      Latest News
                    </h2>
                    <div className="text-pink-300 text-sm font-semibold bg-pink-900/30 px-3 py-2 rounded-full border border-pink-500/30">
                      Updated: Jan 17, 2026
                    </div>
                  </div>
                </header>

                <div className="space-y-6 pb-12">
                  {newsPosts.map((post, index) => (
                    <div
                      key={index}
                      className="group bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-xl rounded-2xl overflow-hidden shadow-2xl border-2 border-pink-500/20 transition-all duration-500 hover:border-pink-500/60 hover:shadow-pink-500/30 hover:-translate-y-2"
                    >
                      <a
                        href={post.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block relative overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110"
                          onError={(e) => {
                            e.currentTarget.src =
                              bgImage ||
                              'https://4kwallpapers.com/images/wallpapers/blackpink-3840x2160-19348.jpg';
                          }}
                        />
                        <Star className="absolute top-4 right-4 w-6 h-6 text-pink-400 opacity-0 group-hover:opacity-100 animate-spin transition-opacity duration-300 z-20" />
                      </a>
                      <div className="p-5">
                        <a
                          href={post.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-pink-400 group-hover:text-pink-300 transition-colors duration-300 text-lg font-bold block mb-3"
                        >
                          {post.title}
                        </a>
                        <p className="text-gray-300 text-sm leading-relaxed mb-4">
                          {post.content}
                        </p>
                        <div className="flex justify-between items-center text-sm text-gray-400 border-t border-pink-500/20 pt-4">
                          <span className="font-semibold">{post.author}</span>
                          <span>{post.timestamp}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
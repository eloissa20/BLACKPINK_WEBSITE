import { useEffect, useRef, useState } from 'react';
import { Music, ShoppingBag, Zap, Volume2, VolumeX, Play } from 'lucide-react';
import { NewsFeed } from './NewsFeed';
import { TabType } from '../App';
import bgVideo from '../assets/bg-home-bp.mp4';

interface HomePageProps {
  onNavigate: (tab: TabType) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true); // Start muted for autoplay policy

  // Autoplay video (muted) on mount
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true; // Required for autoplay on most browsers
    video.playsInline = true;

    const playPromise = video.play();

    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
        })
        .catch((error) => {
          console.log('Autoplay prevented:', error);
          setIsPlaying(false);
        });
    }

    return () => {
      video.pause();
    };
  }, []);

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play().then(() => setIsPlaying(true));
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-black text-white">
      {/* Main Layout - Stack on Mobile, Side-by-Side on Large Screens */}
      <div className="flex flex-1 flex-col lg:flex-row overflow-hidden">
        
        {/* News Feed Sidebar - Hidden on mobile, visible on lg+ */}
        <div className="hidden lg:block lg:w-80 xl:w-96 h-full overflow-y-auto border-r border-pink-800 bg-black/50 backdrop-blur-sm">
          <NewsFeed />
        </div>

        {/* Main Hero Section */}
        <div className="relative flex-1 flex flex-col justify-center items-center overflow-hidden">
          {/* Background Video */}
          <video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover"
            src={bgVideo}
            autoPlay
            loop
            muted
            playsInline
          />

          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/90 z-10" />

          {/* Floating Controls (Top Left) */}
          <div className="absolute top-4 left-4 z-30 flex gap-3">
            {!isPlaying && (
              <button
                onClick={handlePlay}
                className="bg-pink-600/90 hover:bg-pink-500 backdrop-blur-sm text-white p-3 rounded-full shadow-lg transition"
                aria-label="Play video"
              >
                <Play className="w-5 h-5" />
              </button>
            )}
            <button
              onClick={toggleMute}
              className="bg-pink-600/90 hover:bg-pink-500 backdrop-blur-sm text-white p-3 rounded-full shadow-lg transition"
              aria-label={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </button>
          </div>

          {/* Content */}
          <div className="relative z-20 text-center px-6 py-12 max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-4 mb-8 flex-wrap">
              <Zap className="w-10 h-10 md:w-14 md:h-14 text-pink-400 animate-pulse" />
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-pink-300 to-pink-500">
                WELCOME BLINKS
              </h1>
              <Zap className="w-10 h-10 md:w-14 md:h-14 text-pink-400 animate-pulse" />
            </div>

            <p className="text-lg md:text-xl text-gray-200 mb-10 max-w-2xl mx-auto">
              Join the BLACKPINK community and support your queens!
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <button
                onClick={() => onNavigate('guidelines')}
                className="group relative overflow-hidden bg-gradient-to-r from-pink-500 to-pink-700 hover:from-pink-400 hover:to-pink-600 text-white font-bold py-5 px-12 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-2xl w-72 sm:w-auto"
              >
                <div className="flex items-center justify-center gap-3">
                  <Music className="w-7 h-7" />
                  <span className="text-xl">LET'S STREAM</span>
                </div>
                <div className="absolute inset-0 bg-white/20 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              </button>

              <button
                onClick={() => onNavigate('album')}
                className="group relative overflow-hidden bg-gradient-to-r from-pink-800 to-black hover:from-pink-700 hover:to-gray-900 text-white font-bold py-5 px-12 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-2xl w-72 sm:w-auto border border-pink-600"
              >
                <div className="flex items-center justify-center gap-3">
                  <ShoppingBag className="w-7 h-7" />
                  <span className="text-l">LET'S BUY</span>
                </div>
                <div className="absolute inset-0 bg-white/10 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              </button>
            </div>

            {/* Mobile News Feed Preview (Optional) */}
            <div className="mt-12 lg:hidden">
              <h3 className="text-lg font-semibold mb-4 text-pink-300">Latest News</h3>
              <div className="max-h-64 overflow-y-auto bg-black/40 backdrop-blur rounded-xl p-4 border border-pink-900">
                <NewsFeed />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
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
  const [isMuted, setIsMuted] = useState(true); // Retained for potential future use
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.log('Autoplay failed, likely due to sound policy:', error);
        // Video will remain paused/muted until user interaction if blocked
      });
    }
    return () => {
      if (videoRef.current) {
        videoRef.current.pause();
      }
    };
  }, []);

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((error) => {
        console.log('Play failed:', error);
      });
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      if (isMuted) {
        videoRef.current.muted = false;
        setIsMuted(false);
      } else {
        videoRef.current.muted = true;
        setIsMuted(true);
      }
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-1 overflow-hidden">
        <div className="w-1/4 h-full overflow-y-auto border-r border-pink-500">
          <NewsFeed />
        </div>
        <div className="flex-1 relative overflow-hidden">
          <video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover z-0"
            src={bgVideo}
            autoPlay
            loop
            playsInline
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
          />
          <div className="absolute inset-0 bg-black/70 z-10" />
          <div className="absolute top-4 left-4 z-20 flex space-x-4 hidden">
            {!isPlaying && (
              <button
                onClick={handlePlay}
                className="bg-pink-500 hover:bg-pink-600 text-white p-2 rounded-full transition-all duration-300 flex items-center"
                aria-label="Play video"
              >
                <Play className="w-6 h-6" />
              </button>
            )}
            <button
              onClick={toggleMute}
              className="bg-pink-500 hover:bg-pink-600 text-white p-2 rounded-full transition-all duration-300 flex items-center"
              aria-label={isMuted ? 'Unmute video' : 'Mute video'}
            >
              {isMuted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
            </button>
          </div>
          <div className="relative z-20 flex flex-col items-center justify-center h-full text-center p-6">
            <div className="flex items-center justify-center space-x-4 mb-6">
              <Zap className="w-12 h-12 text-pink-500" />
              <h1 className="text-6xl font-black text-white tracking-wider">WELCOME BLINKS</h1>
              <Zap className="w-12 h-12 text-pink-500" />
            </div>
            <p className="text-xl text-gray-200 mb-8">Join the BLACKPINK community and support your queens!</p>
            <div className="flex items-center justify-center space-x-6">
              <button
                onClick={() => onNavigate('guidelines')}
                className="group relative overflow-hidden bg-gradient-to-r from-pink-500 to-pink-700 hover:from-pink-400 hover:to-pink-600 text-white font-bold py-4 px-10 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-2xl w-64"
              >
                <div className="flex items-center justify-center space-x-3">
                  <Music className="w-6 h-6" />
                  <span className="text-lg">LET'S STREAM</span>
                </div>
                <div className="absolute inset-0 bg-black/20 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </button>
              <button
                onClick={() => onNavigate('album')}
                className="group relative overflow-hidden bg-gradient-to-r from-pink-700 to-black hover:from-pink-600 hover:to-black/80 text-white font-bold py-4 px-10 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-2xl w-64"
              >
                <div className="flex items-center justify-center space-x-3">
                  <ShoppingBag className="w-6 h-6" />
                  <span className="text-lg">LET'S BUY</span>
                </div>
                <div className="absolute inset-0 bg-white/20 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
import { ArrowLeft, Heart, ChevronDown } from 'lucide-react';
import stationheadLogo from '../assets/logos/stationhead.png';
import { useEffect } from 'react';

interface Props {
  onBack: () => void;
  playSound: () => void;
}

export function StationheadDetails({ onBack, playSound }: Props) {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, []);

  const platform = {
    name: 'Stationhead',
    logo: stationheadLogo,
    blackpink: 'https://app.stationhead.com/blackpink', // or https://app.stationhead.com/stations/blackpink if specific
    members: {
      jisoo: '',
      jennie: '',
      rosé: '',
      lisa: '',
    },
  };

  const howToJoinStream = [
    'Tap "Sign Up" to get started',
    'Register using your email, phone number, Apple ID, or X account',
    'Choose a unique username and set a secure password',
    'Link your Apple Music or Spotify Premium account for full access',
    'Search for BPSTATIONHEAD (or BLACKPINK fan stations) and join the live stream with fellow BLINKs',
  ];

  const keyTips = [
    'Connect a premium music account (Spotify Premium or Apple Music) — free tiers may have limits',
    'All streams count toward BLACKPINK charts when played live in stations',
    'Join or create BLACKPINK-themed stations for group listening power',
    'Interact with chat to keep energy high — live broadcasts boost engagement',
    'No VPN needed; use stable connection for smooth co-streaming',
    'Streams sync with your music service — higher quality plans = better impact',
  ];

  return (
    <div className="h-full p-8 overflow-y-auto bg-gradient-to-br from-black via-indigo-950/70 to-black">
      <div className="max-w-5xl mx-auto">

        <button 
          onClick={onBack} 
          className="flex items-center gap-3 text-[#00D1FF] hover:text-[#00FFFF] mb-10 font-semibold transition"
        >
          <ArrowLeft className="w-6 h-6" /> Return to Main Guidelines
        </button>

        <div className="text-center mb-12">
          <img 
            src={platform.logo} 
            alt={platform.name} 
            className="w-32 h-32 mx-auto mb-6 rounded-2xl shadow-2xl" 
            onMouseEnter={playSound} 
          />
          <h1 className="text-5xl font-black text-white">STATIONHEAD</h1>
          <p className="text-xl text-gray-300 mt-4">BLACKPINK DEADLINE Streaming Guide</p>
          
          <p className="text-2xl font-medium text-white mt-8">
            Join live with BLINKs to amplify <span className="text-[#00D1FF] font-black">BLACKPINK</span> streams on <span className="text-[#00D1FF] font-black">Stationhead</span>!
          </p>
        </div>

        <div className="bg-black/70 backdrop-blur-xl rounded-3xl p-10 border-2 border-[#00D1FF]/60 shadow-2xl mb-20">
          <h2 className="text-4xl font-black text-[#00D1FF] text-center mb-8">
            How to Join & Stream
          </h2>
          <ol className="space-y-4 text-gray-200 text-lg max-w-4xl mx-auto list-decimal list-inside">
            {howToJoinStream.map((step, i) => (
              <li key={i} className="flex items-center gap-4 pl-2">
                <Heart className="w-6 h-6 text-[#00D1FF] fill-[#00D1FF]/70 flex-shrink-0" />
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="bg-black/70 backdrop-blur-xl rounded-3xl p-10 border-2 border-[#C084FC]/60 shadow-2xl mb-20">
          <h2 className="text-4xl font-black text-[#00D1FF] mb-8 text-center">
            Essential Tips for Max Impact
          </h2>
          <ul className="space-y-5 text-gray-200 text-lg max-w-4xl mx-auto">
            {keyTips.map((tip, i) => (
              <li key={i} className="flex items-center gap-4">
                <Heart className="w-6 h-6 text-[#00D1FF] fill-[#00D1FF]/70 flex-shrink-0" />
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-16">
          <h2 className="text-5xl font-black text-center text-white mb-10 tracking-widest">
            QUICK POWER TIPS
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-[#46C3D0]/20 to-[#00D1FF]/20 backdrop-blur-xl border-2 border-[#00D1FF] rounded-3xl p-6 text-center shadow-2xl">
              <p className="text-[#00D1FF] font-bold text-xl mb-2">Premium Music Link</p>
              <p className="text-gray-200">Spotify/Apple required</p>
            </div>
            <div className="bg-gradient-to-br from-[#00D1FF]/20 to-[#C084FC]/20 backdrop-blur-xl border-2 border-[#C084FC] rounded-3xl p-6 text-center shadow-2xl">
              <p className="text-[#00D1FF] font-bold text-xl mb-2">Live Co-Streaming</p>
              <p className="text-gray-200">Join BLINK stations</p>
            </div>
            <div className="bg-gradient-to-br from-[#46C3D0]/20 to-[#00D1FF]/20 backdrop-blur-xl border-2 border-[#00D1FF] rounded-3xl p-6 text-center shadow-2xl">
              <p className="text-[#00D1FF] font-bold text-xl mb-2">All Streams Count</p>
              <p className="text-gray-200">100% toward charts</p>
            </div>
            <div className="bg-gradient-to-br from-[#00D1FF]/20 to-[#C084FC]/20 backdrop-blur-xl border-2 border-[#C084FC] rounded-3xl p-6 text-center shadow-2xl">
              <p className="text-[#00D1FF] font-bold text-xl mb-2">Chat & Engage</p>
              <p className="text-gray-200">Boost station energy</p>
            </div>
            <div className="bg-gradient-to-br from-[#46C3D0]/20 to-[#00D1FF]/20 backdrop-blur-xl border-2 border-[#00D1FF] rounded-3xl p-6 text-center shadow-2xl">
              <p className="text-[#00D1FF] font-bold text-xl mb-2">No VPN Needed</p>
              <p className="text-gray-200">Stable connection only</p>
            </div>
            <div className="bg-gradient-to-br from-[#00D1FF]/20 to-[#C084FC]/20 backdrop-blur-xl border-2 border-[#C084FC] rounded-3xl p-6 text-center shadow-2xl">
              <p className="text-[#00D1FF] font-bold text-xl mb-2">Create BP Stations</p>
              <p className="text-gray-200">For DEADLINE pushes</p>
            </div>
          </div>
        </div>

        <div className="mt-32 pb-20">
          <h2 className="text-5xl font-black text-center text-white mb-16 tracking-widest">
            Official BLACKPINK on Stationhead
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto items-center">
            <div className="flex justify-center md:justify-end">
              <a 
                href={platform.blackpink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="group relative bg-transparent rounded-3xl p-8 transition-all duration-500 hover:scale-110 hover:z-10 active:scale-95 border-2 border-[#00D1FF] hover:border-[#00FFFF]"
                style={{ background: 'rgba(0, 209, 255, 0.08)', backdropFilter: 'blur(12px)' }}
                onMouseEnter={playSound}
              >
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#00D1FF]/30 to-[#C084FC]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                <div className="relative z-10 text-center">
                  <p className="text-5xl font-black text-[#00D1FF] group-hover:text-[#00FFFF] tracking-widest transition-colors">BLACKPINK</p>
                  <p className="text-gray-200 text-lg mt-2">Official/Fan Station</p>
                </div>
              </a>
            </div>

            <div className="md:col-span-2">
              <div className="grid grid-cols-2 gap-6">
                {Object.entries(platform.members).map(([member, url]) => (
                  <a 
                    key={member} 
                    href={url || '#'} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={`group relative bg-transparent rounded-3xl p-8 transition-all duration-500 hover:scale-110 hover:z-10 active:scale-95 border-2 border-[#00D1FF] hover:border-[#00FFFF] ${!url ? 'opacity-50 cursor-not-allowed' : ''}`}
                    style={{ background: 'rgba(0, 209, 255, 0.08)', backdropFilter: 'blur(12px)' }}
                    onMouseEnter={playSound}
                  >
                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#00D1FF]/30 to-[#C084FC]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                    <div className="relative z-10 text-center">
                      <p className="text-4xl font-black text-[#00D1FF] group-hover:text-[#00FFFF] tracking-widest transition-colors">
                        {member.toUpperCase()}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
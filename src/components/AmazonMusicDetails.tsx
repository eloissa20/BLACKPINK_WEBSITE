import { ArrowLeft, Heart, ChevronDown } from 'lucide-react';
import amazonMusicLogo from '../assets/logos/amazon-music.png';
import { useEffect } from 'react';

interface Props {
  onBack: () => void;
  playSound: () => void;
}

export function AmazonMusicDetails({ onBack, playSound }: Props) {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, []);

  const platform = {
    name: 'Amazon Music',
    logo: amazonMusicLogo,
    blackpink: 'https://music.amazon.com/artists/B01K9Q0AZ4/blackpink',
    members: {
      jisoo: '',
      jennie: '',
      rosé: '',
      lisa: '',
    },
  };

  const howToStream = [
    'Launch Amazon Music via web player or the app on your device',
    'Sign in or register, then choose a paid subscription plan',
    'Search for the BLACKPINK artist profile and stream directly from there, or use/create a dedicated playlist',
    'Build your own track-focused playlist or tap into BLACKPINK fan-curated ones for effective looping',
  ];

  const purchasedTrackSteps = [
    'Open Amazon Music and delete any purchased tracks from your Digital Music library first',
    'Head to your Library and play the track to ensure it registers as a stream',
  ];

  const keyPoints = [
    'Get a paid Amazon Music subscription (Unlimited ideal) so streams fully count',
    'Share direct BLACKPINK track or album links to drive targeted plays',
    'Avoid any repetitive or bot-like patterns to stay safe',
    'Turn off Autoplay for better control',
    'No VPN usage during sessions',
    'Keep audio unmuted',
    'Disable Shuffle to focus on priority tracks',
    'Valid streams all contribute — paid plans have higher weighting on Billboard, UK Official Charts, and global rankings',
  ];

  return (
    <div className="h-full p-8 overflow-y-auto bg-gradient-to-br from-black via-[#46C3D0]/20 to-black">
      <div className="max-w-5xl mx-auto">

        <button 
          onClick={onBack} 
          className="flex items-center gap-3 text-[#0077C1] hover:text-[#0DBFF5] mb-10 font-semibold transition"
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
          <h1 className="text-5xl font-black text-white">AMAZON MUSIC</h1>
          <p className="text-xl text-gray-300 mt-4">BLACKPINK DEADLINE Streaming Guide</p>
          
          <p className="text-2xl font-medium text-white mt-8">
            Maximize chart impact for <span className="text-[#05A0D1] font-black">BLACKPINK</span> on <span className="text-[#05A0D1] font-black">Amazon Music</span> — Paid subscriptions give stronger weight!
          </p>
        </div>

        <div className="bg-black/70 backdrop-blur-xl rounded-3xl p-10 border-2 border-[#46C3D0] shadow-2xl mb-20">
          <h2 className="text-4xl font-black text-[#05A0D1] text-center mb-8">
            How to Stream Effectively
          </h2>
          <ol className="space-y-4 text-gray-200 text-lg max-w-4xl mx-auto list-decimal list-inside">
            {howToStream.map((step, i) => (
              <li key={i} className="flex items-center gap-4 pl-2">
                <Heart className="w-6 h-6 text-[#05A0D1] fill-[#05A0D1]/70 flex-shrink-0" />
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="bg-black/70 backdrop-blur-xl rounded-3xl p-10 border-2 border-[#46C3D0]/80 shadow-2xl mb-20">
          <h2 className="text-4xl font-black text-[#05A0D1] text-center mb-8">
            Streaming Purchased Tracks
          </h2>
          <ol className="space-y-5 text-gray-200 text-lg max-w-4xl mx-auto list-decimal list-inside">
            {purchasedTrackSteps.map((step, i) => (
              <li key={i} className="flex items-center gap-4 pl-2">
                <Heart className="w-6 h-6 text-[#05A0D1] fill-[#05A0D1]/70 flex-shrink-0" />
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="bg-black/70 backdrop-blur-xl rounded-3xl p-10 border-2 border-[#46C3D0] shadow-2xl mb-20">
          <h2 className="text-4xl font-black text-[#05A0D1] mb-8 text-center">
            Important Guidelines
          </h2>
          <ul className="space-y-5 text-gray-200 text-lg max-w-4xl mx-auto">
            {keyPoints.map((tip, i) => (
              <li key={i} className="flex items-center gap-4">
                <Heart className="w-6 h-6 text-[#05A0D1] fill-[#05A0D1]/70 flex-shrink-0" />
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-16">
          <h2 className="text-5xl font-black text-center text-white mb-10 tracking-widest">
            QUICK REMINDERS
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-[#46C3D0]/30 to-[#05A0D1]/20 backdrop-blur-xl border-2 border-[#46C3D0] rounded-3xl p-6 text-center shadow-2xl">
              <p className="text-[#05A0D1] font-bold text-xl mb-2">Paid Subscription Required</p>
              <p className="text-gray-200">Unlimited for max credit</p>
            </div>
            <div className="bg-gradient-to-br from-[#05A0D1]/20 to-[#0DBFF5]/20 backdrop-blur-xl border-2 border-[#0DBFF5] rounded-3xl p-6 text-center shadow-2xl">
              <p className="text-[#0DBFF5] font-bold text-xl mb-2">No VPN / Shuffle / Mute</p>
              <p className="text-gray-200">Stay natural</p>
            </div>
            <div className="bg-gradient-to-br from-[#46C3D0]/30 to-[#05A0D1]/20 backdrop-blur-xl border-2 border-[#46C3D0] rounded-3xl p-6 text-center shadow-2xl">
              <p className="text-[#05A0D1] font-bold text-xl mb-2">Delete Purchased Tracks</p>
              <p className="text-gray-200">Before playback</p>
            </div>
            <div className="bg-gradient-to-br from-[#05A0D1]/20 to-[#0DBFF5]/20 backdrop-blur-xl border-2 border-[#0DBFF5] rounded-3xl p-6 text-center shadow-2xl">
              <p className="text-[#0DBFF5] font-bold text-xl mb-2">Share Direct Links</p>
              <p className="text-gray-200">Targeted plays</p>
            </div>
            <div className="bg-gradient-to-br from-[#46C3D0]/30 to-[#05A0D1]/20 backdrop-blur-xl border-2 border-[#46C3D0] rounded-3xl p-6 text-center shadow-2xl">
              <p className="text-[#05A0D1] font-bold text-xl mb-2">Avoid Bot-Like Activity</p>
              <p className="text-gray-200">Act organic</p>
            </div>
            <div className="bg-gradient-to-br from-[#05A0D1]/20 to-[#0DBFF5]/20 backdrop-blur-xl border-2 border-[#0DBFF5] rounded-3xl p-6 text-center shadow-2xl">
              <p className="text-[#0DBFF5] font-bold text-xl mb-2">Paid Plans = Higher Weight</p>
              <p className="text-gray-200">Billboard / UK impact</p>
            </div>
          </div>
        </div>

        <div className="mt-32 pb-20">
          <h2 className="text-5xl font-black text-center text-white mb-16 tracking-widest">
            Official BLACKPINK Pages on Amazon Music
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto items-center">
            <div className="flex justify-center md:justify-end">
              <a 
                href={platform.blackpink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="group relative bg-transparent rounded-3xl p-8 transition-all duration-500 hover:scale-110 hover:z-10 active:scale-95 border-2 border-[#46C3D0] hover:border-[#05A0D1]"
                style={{ background: 'rgba(70, 195, 208, 0.12)', backdropFilter: 'blur(12px)' }}
                onMouseEnter={playSound}
              >
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#46C3D0]/30 via-[#05A0D1]/20 to-[#46C3D0]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                <div className="relative z-10 text-center">
                  <p className="text-5xl font-black text-[#05A0D1] group-hover:text-[#0DBFF5] tracking-widest transition-colors">BLACKPINK</p>
                  <p className="text-gray-200 text-lg mt-2">Group Profile</p>
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
                    className={`group relative bg-transparent rounded-3xl p-8 transition-all duration-500 hover:scale-110 hover:z-10 active:scale-95 border-2 border-[#46C3D0] hover:border-[#05A0D1] ${!url ? 'opacity-50 cursor-not-allowed' : ''}`}
                    style={{ background: 'rgba(70, 195, 208, 0.12)', backdropFilter: 'blur(12px)' }}
                    onMouseEnter={playSound}
                  >
                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#46C3D0]/30 via-[#05A0D1]/20 to-[#46C3D0]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                    <div className="relative z-10 text-center">
                      <p className="text-4xl font-black text-[#05A0D1] group-hover:text-[#0DBFF5] tracking-widest transition-colors">
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
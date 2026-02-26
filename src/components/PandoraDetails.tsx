import { ArrowLeft, Heart, ChevronDown } from 'lucide-react';
import pandoraLogo from '../assets/logos/pandora.png';
import { useEffect } from 'react'; 

interface Props {
  onBack: () => void;
  playSound: () => void;
}

export function PandoraDetails({ onBack, playSound }: Props) {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, []);

  const platform = {
    name: 'Pandora',
    logo: pandoraLogo,
    blackpink: 'https://www.pandora.com/artist/blackpink/ARngn52tPwgcqdg',
    members: {
      jisoo: '',
      jennie: '',
      rosé: '',
      lisa: '',
    },
  };

  const subscriptionComparison = [
    'Free tier: limited to station-based listening; treated as automated/programmed plays',
    'Plus tier: requires payment with ads still present; streams register like free ones',
    'Premium tier: ad-free listening via subscription; registers as high-value premium plays',
    'Subscription options include Individual, Student, and Family (up to 6 accounts)',
    'New users can try free trial periods',
  ];

  const playlistStrategy = [
    'Place 1–2 buffer tracks between your main target song',
    'Alternate versions (like sped-up/remixed edits) work great as buffers',
    'No constant checking or adjustments required for playlists',
    'Feel free to loop the same playlist multiple times daily',
  ];

  const thumbsUpApproach = [
    'Play from the artist’s official station right after a fresh drop (e.g., JENNIE page) and give thumbs-up to boost visibility',
    'Avoid repeatedly using the same artist station long-term — it may flag as scripted activity',
    'This method increases chances of songs landing in more curated stations and reaching wider audiences',
  ];

  const proTips = [
    'Start playback straight from the track or full album page',
    'Every play session contributes (no exceptions)',
    'No restrictions on how many tracks you can stream per day',
    'Premium plays carry 3–5× more influence on chart rankings',
    'Push fellow BLINKs to grab Premium — trials make it easy to start',
  ];

  return (
    <div className="h-full p-8 overflow-y-auto bg-gradient-to-br from-black via-indigo-950/60 to-[#F55150]/10">
      <div className="max-w-5xl mx-auto">

        <button 
          onClick={onBack} 
          className="flex items-center gap-3 text-[#00A0EE] hover:text-[#F55150] mb-10 font-semibold transition"
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
          <h1 className="text-5xl font-black text-white">PANDORA</h1>
          <p className="text-xl text-gray-300 mt-4">BLINK Streaming Strategies</p>
          
          <p className="text-2xl font-medium text-white mt-8">
            Unlock stronger chart impact on <span className="text-[#00A0EE] font-black">Pandora</span> — 
            go Premium for maximum <span className="text-[#00A0EE] font-black">BLACKPINK</span> support!
          </p>
        </div>

        <div className="bg-black/70 backdrop-blur-xl rounded-3xl p-10 border-2 border-[#224099] shadow-2xl mb-20">
          <h2 className="text-4xl font-black text-[#00A0EE] text-center mb-8">
            Subscription Breakdown
          </h2>
          <ul className="space-y-4 text-gray-200 text-lg max-w-4xl mx-auto">
            {subscriptionComparison.map((item, i) => (
              <li key={i} className="flex items-center gap-4">
                <Heart className="w-6 h-6 text-[#00A0EE] fill-[#00A0EE]/70 flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-20">
          <div className="relative bg-black/70 backdrop-blur-xl rounded-3xl p-8 border-2 border-[#00A0EE] shadow-2xl overflow-hidden">
            <h2 className="text-4xl font-black text-[#00A0EE] mb-8 text-center">
              Smart Playlist Building
            </h2>
            <ul className="space-y-5 text-gray-200 text-lg mt-6">
              {playlistStrategy.map((tip, i) => (
                <li key={i} className="flex items-center gap-4">
                  <Heart className="w-6 h-6 text-[#00A0EE] fill-[#00A0EE]/70 flex-shrink-0" />
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative bg-black/70 backdrop-blur-xl rounded-3xl p-8 border-2 border-[#224099] shadow-2xl overflow-hidden">
            <h2 className="text-4xl font-black text-[#00A0EE] mb-8 text-center">
              Thumbs-Up Boost Tactics
            </h2>
            <ul className="space-y-5 text-gray-200 text-lg mt-6">
              {thumbsUpApproach.map((tip, i) => (
                <li key={i} className="flex items-center gap-4">
                  <Heart className="w-6 h-6 text-[#00A0EE] fill-[#00A0EE]/70 flex-shrink-0" />
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="bg-black/70 backdrop-blur-xl rounded-3xl p-10 border-2 border-[#00A0EE]/80 shadow-2xl mb-20">
          <h2 className="text-4xl font-black text-[#00A0EE] mb-8 text-center">
            Essential Streaming Advice
          </h2>
          <ul className="space-y-5 text-gray-200 text-lg max-w-4xl mx-auto">
            {proTips.map((tip, i) => (
              <li key={i} className="flex items-center gap-4">
                <Heart className="w-6 h-6 text-[#00A0EE] fill-[#00A0EE]/70 flex-shrink-0" />
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
            <div className="bg-gradient-to-br from-[#224099]/40 to-[#00A0EE]/30 backdrop-blur-xl border-2 border-[#00A0EE] rounded-3xl p-6 text-center shadow-2xl">
              <p className="text-[#00A0EE] font-bold text-xl mb-2">Premium Plays = 3–5× Power</p>
              <p className="text-gray-200">Bigger chart push</p>
            </div>
            <div className="bg-gradient-to-br from-[#00A0EE]/30 to-[#F55150]/30 backdrop-blur-xl border-2 border-[#F55150] rounded-3xl p-6 text-center shadow-2xl">
              <p className="text-[#F55150] font-bold text-xl mb-2">Unlimited Daily Streams</p>
              <p className="text-gray-200">No caps — go all day</p>
            </div>
            <div className="bg-gradient-to-br from-[#224099]/40 to-[#00A0EE]/30 backdrop-blur-xl border-2 border-[#00A0EE] rounded-3xl p-6 text-center shadow-2xl">
              <p className="text-[#00A0EE] font-bold text-xl mb-2">Every Stream Counts</p>
              <p className="text-gray-200">Free or paid</p>
            </div>
            <div className="bg-gradient-to-br from-[#00A0EE]/30 to-[#F55150]/30 backdrop-blur-xl border-2 border-[#F55150] rounded-3xl p-6 text-center shadow-2xl">
              <p className="text-[#F55150] font-bold text-xl mb-2">Add Buffer Tracks</p>
              <p className="text-gray-200">Keep it natural</p>
            </div>
            <div className="bg-gradient-to-br from-[#224099]/40 to-[#00A0EE]/30 backdrop-blur-xl border-2 border-[#00A0EE] rounded-3xl p-6 text-center shadow-2xl">
              <p className="text-[#00A0EE] font-bold text-xl mb-2">Thumbs Up on New Drops</p>
              <p className="text-gray-200">From artist page</p>
            </div>
            <div className="bg-gradient-to-br from-[#00A0EE]/30 to-[#F55150]/30 backdrop-blur-xl border-2 border-[#F55150] rounded-3xl p-6 text-center shadow-2xl">
              <p className="text-[#F55150] font-bold text-xl mb-2">Grab Free Trials</p>
              <p className="text-gray-200">Upgrade to Premium fast</p>
            </div>
          </div>
        </div>

        <div className="mt-32 pb-20">
          <h2 className="text-5xl font-black text-center text-white mb-16 tracking-widest">
            Pandora Artist Pages
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto items-center">
            <div className="flex justify-center md:justify-end">
              <a 
                href={platform.blackpink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="group relative bg-transparent rounded-3xl p-8 transition-all duration-500 hover:scale-110 hover:z-10 active:scale-95 border-2 border-[#00A0EE] hover:border-[#F55150]"
                style={{ background: 'rgba(0, 160, 238, 0.10)', backdropFilter: 'blur(12px)' }}
                onMouseEnter={playSound}
              >
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#00A0EE]/30 via-[#F55150]/20 to-[#224099]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                <div className="relative z-10 text-center">
                  <p className="text-5xl font-black text-[#00A0EE] group-hover:text-[#F55150] tracking-widest transition-colors">BLACKPINK</p>
                  <p className="text-gray-200 text-lg mt-2">Group Station</p>
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
                    className={`group relative bg-transparent rounded-3xl p-8 transition-all duration-500 hover:scale-110 hover:z-10 active:scale-95 border-2 border-[#00A0EE] hover:border-[#F55150] ${!url ? 'opacity-50 cursor-not-allowed' : ''}`}
                    style={{ background: 'rgba(0, 160, 238, 0.10)', backdropFilter: 'blur(12px)' }}
                    onMouseEnter={playSound}
                  >
                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#00A0EE]/30 via-[#F55150]/20 to-[#224099]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                    <div className="relative z-10 text-center">
                      <p className="text-4xl font-black text-[#00A0EE] group-hover:text-[#F55150] tracking-widest transition-colors">
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
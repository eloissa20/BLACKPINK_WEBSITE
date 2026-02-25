import { ArrowLeft, ChevronDown, Heart } from 'lucide-react';
import tidalLogo from '../assets/logos/tidal.png';

interface Props {
  onBack: () => void;
  playSound: () => void;
}

export function TidalDetails({ onBack, playSound }: Props) {
  const platform = {
    name: 'TIDAL',
    logo: tidalLogo,
    blackpink: 'https://tidal.com/browse/artist/8036491',
    members: {
      jisoo: 'https://tidal.com/browse/artist/20206117',
      jennie: 'https://tidal.com/browse/artist/32294964',
      rosé: 'https://tidal.com/browse/artist/23901722',
      lisa: 'https://tidal.com/browse/artist/28344561',
    },
  };

  const introText = [
    'Tidal is a subscription based online streaming service.',
    'Tidal streams count towards various national charts including Billboard Global 200, Billboard Global Excl. US, RIAA Charts, Official Charts (UK).',
  ];

  const iosSteps = [
    'Open the Tidal app.',
    'Search for The Album or Single and select it.',
    'Click the three dots on the right side of the track.',
    'Select “Add to Playlist”.',
    'Click on “Create New Playlist”.',
    'Name your playlist.',
    'Finish by pressing “Create Playlist”.',
    'To add duplicates, repeat steps 2, 3, 4.',
    'Click “add anyway”.',
    'Click three dots on the top right corner and select “Enter Edit Mode”.',
    'Drag songs into place by holding the three lines on the right side of the song.',
  ];

  const androidSteps = [
    'Open the Tidal app.',
    'Go to “My Collection”.',
    'Click on “Playlists.”.',
    'Select “+ Create New Playlists”.',
    'Name the playlist.',
    'Search for the song then hold down on track, and click “Add to Playlist”.',
    'Select the correct playlist.',
    'To add the same song again, repeat steps 6 & 7.',
    'Select “add anyway” when prompted.',
    'Click three dots on the top right corner and select “Enter Edit Mode“.',
    'Drag songs into place by holding the three lines on the right side of the song.',
  ];

  const desktopSteps = [
    'Open Tidal.',
    'Go to “My Playlist” on the left side column.',
    'Click „Create New Playlist“.',
    'Name your playlist.',
    'Search for The Album or a Single in the search bar.',
    'Click the “+” and add to your created playlist.',
    'To add duplicates repeat your steps 5 & 6.',
    'Click “add anyway”.',
    'Edit your playlist & drag songs into place.',
  ];

  const tipsList = [
    'TIDAL is a paid-only platform — no free tier available.',
    'HiFi and HiFi Plus subscriptions provide full stream credit (100%).',
    'Create playlists with many duplicates of the title track to maximize streams.',
    'Play each song for at least 30 seconds for it to count as a stream.',
    'Focus especially on the title track after playing through the full album.',
    'Act natural — occasionally skip or rearrange to avoid bot detection.',
  ];

  const faqItems = [
    'Only paid subscriptions (HiFi & HiFi Plus) count streams on TIDAL.',
    'All paid streams are weighted 100% on supported charts.',
    'Streams from all countries contribute to global charts.',
    'Using duplicates in playlists is allowed and effective for farming streams.',
    'For questions → contact your local BLINK streaming team.',
  ];

  return (
    <div className="h-full p-8 overflow-y-auto bg-gradient-to-br from-black via-[#535e7a]/30 to-black">
      <div className="max-w-5xl mx-auto">

        {/* Back Button */}
        <button onClick={onBack} className="flex items-center gap-3 text-[#535e7a] hover:text-[#6b7590] mb-10 font-semibold transition">
          <ArrowLeft className="w-6 h-6" /> Back to Guidelines
        </button>

        {/* Header */}
        <div className="text-center mb-12">
          <img src={platform.logo} alt="TIDAL" className="w-32 h-32 mx-auto mb-6 rounded-2xl shadow-2xl" onMouseEnter={playSound} />
          <h1 className="text-5xl font-black text-white">TIDAL</h1>
          <p className="text-xl text-gray-400 mt-4">Streaming Guide for BLINKs</p>
          
          {/* Scroll Prompt */}
          <p className="text-2xl font-medium text-white mt-8">
            Scroll to see important tips to maximise{' '}
            <span className="text-[#535e7a] font-black">TIDAL</span>{' '}
            streams for{' '}
            <span className="text-[#535e7a] font-black">BLACKPINK</span>.
          </p>
        </div>

        {/* WHAT IS TIDAL & WHY IMPORTANT */}
        <div className="bg-black/60 backdrop-blur-xl rounded-3xl p-10 border-2 border-[#535e7a] shadow-2xl mb-20">
          <h2 className="text-4xl font-black text-[#d0e1f3] text-center mb-8">
            What is Tidal & Why It Matters
          </h2>
          <ul className="space-y-4 text-gray-200 text-lg max-w-4xl mx-auto">
            {introText.map((item, i) => (
              <li key={i} className="flex items-center gap-4">
                <Heart className="w-6 h-6 text-[#d0e1f3] fill-[#d0e1f3] flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* STREAMING GUIDE */}
        <div className="grid lg:grid-cols-3 gap-8 mb-20">

          {/* iOS */}
          <div className="relative bg-black/60 backdrop-blur-xl rounded-3xl p-8 border-2 border-[#535e7a] shadow-2xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[#535e7a]/20 to-transparent opacity-50 pointer-events-none" />
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#535e7a]/10 to-transparent pointer-events-none" />
            <h2 className="text-4xl font-black text-[#d0e1f3] mb-8 text-center">
              iOS STREAMING
            </h2>
            <ol className="space-y-5 text-gray-200 text-lg list-decimal list-inside ml-4 mt-10 relative z-10">
              {iosSteps.map((step, i) => (
                <li key={i} className="pl-2 flex items-center gap-3">
                  <Heart className="w-6 h-6 text-[#d0e1f3] fill-[#d0e1f3] flex-shrink-0" />
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Android */}
          <div className="relative bg-black/60 backdrop-blur-xl rounded-3xl p-8 border-2 border-[#535e7a] shadow-2xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[#535e7a]/20 to-transparent opacity-50 pointer-events-none" />
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#535e7a]/10 to-transparent pointer-events-none" />
            <h2 className="text-4xl font-black text-[#d0e1f3] mb-8 text-center">
              ANDROID STREAMING
            </h2>
            <ol className="space-y-5 text-gray-200 text-lg list-decimal list-inside ml-4 mt-10 relative z-10">
              {androidSteps.map((step, i) => (
                <li key={i} className="pl-2 flex items-center gap-3">
                  <Heart className="w-6 h-6 text-[#d0e1f3] fill-[#d0e1f3] flex-shrink-0" />
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Desktop */}
          <div className="relative bg-black/60 backdrop-blur-xl rounded-3xl p-8 border-2 border-[#535e7a] shadow-2xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[#535e7a]/20 to-transparent opacity-50 pointer-events-none" />
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#535e7a]/10 to-transparent pointer-events-none" />
            <h2 className="text-4xl font-black text-[#d0e1f3] mb-8 text-center">
              DESKTOP STREAMING
            </h2>
            <ol className="space-y-5 text-gray-200 text-lg list-decimal list-inside ml-4 mt-10 relative z-10">
              {desktopSteps.map((step, i) => (
                <li key={i} className="pl-2 flex items-center gap-3">
                  <Heart className="w-6 h-6 text-[#d0e1f3] fill-[#d0e1f3] flex-shrink-0" />
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* STREAMING TIPS */}
        <div className="bg-black/60 backdrop-blur-xl rounded-3xl p-8 border-2 border-[#535e7a] shadow-2xl mb-20">
          <h2 className="text-4xl font-black text-[#d0e1f3] mb-8 text-center">
            STREAMING TIPS
          </h2>
          <ul className="space-y-5 text-gray-200 text-lg mt-10 max-w-4xl mx-auto">
            {tipsList.map((tip, i) => (
              <li key={i} className="flex items-center gap-4">
                <Heart className="w-6 h-6 text-[#d0e1f3] fill-[#d0e1f3] flex-shrink-0" />
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* IMPORTANT REMINDERS */}
        <div className="mb-16">
          <h2 className="text-5xl font-black text-center text-white mb-10 tracking-widest">
            IMPORTANT REMINDERS
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-[#535e7a]/20 to-[#3a4255]/20 backdrop-blur-xl border-2 border-[#535e7a] rounded-3xl p-6 text-center shadow-2xl">
              <p className="text-[#d0e1f3] font-bold text-xl mb-2">Paid Only</p>
              <p className="text-gray-200">HiFi / HiFi Plus required</p>
            </div>
            <div className="bg-gradient-to-br from-[#3a4255]/20 to-[#535e7a]/20 backdrop-blur-xl border-2 border-[#535e7a] rounded-3xl p-6 text-center shadow-2xl">
              <p className="text-[#d0e1f3] font-bold text-xl mb-2"> ➤ 30 Seconds = 1 Stream</p>
              <p className="text-gray-200">Play past 30s mark</p>
            </div>
            <div className="bg-gradient-to-br from-[#535e7a]/20 to-[#6b7590]/20 backdrop-blur-xl border-2 border-[#535e7a] rounded-3xl p-6 text-center shadow-2xl">
              <p className="text-[#d0e1f3] font-bold text-xl mb-2">Use Duplicates</p>
              <p className="text-gray-200">In playlists</p>
            </div>
            <div className="bg-gradient-to-br from-[#6b7590]/20 to-[#535e7a]/20 backdrop-blur-xl border-2 border-[#535e7a] rounded-3xl p-6 text-center shadow-2xl">
              <p className="text-[#d0e1f3] font-bold text-xl mb-2">Act Natural</p>
              <p className="text-gray-200">Vary playback</p>
            </div>
            <div className="bg-gradient-to-br from-[#3a4255]/20 to-[#535e7a]/20 backdrop-blur-xl border-2 border-[#535e7a] rounded-3xl p-6 text-center shadow-2xl">
              <p className="text-[#d0e1f3] font-bold text-xl mb-2">Focus Title Track</p>
              <p className="text-gray-200">After full album</p>
            </div>
            <div className="bg-gradient-to-br from-[#535e7a]/20 to-[#3a4255]/20 backdrop-blur-xl border-2 border-[#535e7a] rounded-3xl p-6 text-center shadow-2xl">
              <p className="text-[#d0e1f3] font-bold text-xl mb-2 flex items-center justify-center gap-2">
                100% Weight <Heart className="w-6 h-6 fill-[#535e7a]" />
              </p>
              <p className="text-gray-200">On charts</p>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="my-24">
          <h2 className="text-5xl font-black text-center text-white mb-12 tracking-widest flex items-center justify-center gap-4">
            FAQ <ChevronDown className="w-12 h-12 animate-bounce" />
          </h2>
          <div className="bg-black/60 backdrop-blur-xl rounded-3xl p-10 border-2 border-[#535e7a] shadow-2xl">
            <ul className="space-y-5 text-gray-200 text-lg leading-relaxed">
              {faqItems.map((item, i) => (
                <li key={i} className="flex items-start gap-4">
                  <span className="text-[#d0e1f3] font-bold mt-1">Q{i + 1}.</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* OFFICIAL ARTIST LINKS */}
        <div className="mt-32 pb-20">
          <h2 className="text-5xl font-black text-center text-white mb-16 tracking-widest">
            Official Artist Links
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto items-center">
            {/* BLACKPINK Group */}
            <div className="flex justify-center md:justify-end">
              <a href={platform.blackpink} target="_blank" rel="noopener noreferrer"
                className="group relative bg-transparent rounded-3xl p-6 transition-all duration-500 hover:scale-110 hover:z-10 active:scale-95 border-2 border-[#535e7a]"
                style={{ background: 'rgba(83,94,122,0.1)', backdropFilter: 'blur(10px)'}}
                onMouseEnter={playSound}>
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#535e7a]/30 to-[#3a4255]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                <div className="relative z-10 text-center">
                  <p className="text-5xl font-black text-[#d0e1f3] tracking-widest">BLACKPINK</p>
                  <p className="text-white text-lg mt-2">Official Group</p>
                </div>
              </a>
            </div>

            {/* Members */}
            <div className="md:col-span-2">
              <div className="grid grid-cols-2 gap-6">
                {Object.entries(platform.members).map(([member, url]) => (
                  <a key={member} href={url} target="_blank" rel="noopener noreferrer"
                    className="group relative bg-transparent rounded-3xl p-6 transition-all duration-500 hover:scale-110 hover:z-10 active:scale-95 border-2 border-[#535e7a]"
                    style={{ background: 'rgba(83,94,122,0.1)', backdropFilter: 'blur(10px)'}}
                    onMouseEnter={playSound}>
                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#535e7a]/30 to-[#3a4255]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                    <div className="relative z-10 text-center">
                      <p className="text-4xl font-black text-[#d0e1f3] tracking-widest">
                        {member === 'rosé' ? 'ROSÉ' : member.toUpperCase()}
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
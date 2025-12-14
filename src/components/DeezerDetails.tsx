import { ArrowLeft, ChevronDown, Heart } from 'lucide-react';

interface Props {
  onBack: () => void;
  playSound: () => void;
}

export function DeezerDetails({ onBack, playSound }: Props) {
  const platform = {
    name: 'Deezer',
    logo: '/src/assets/logos/deezer.png',
    blackpink: 'https://link.deezer.com/s/31SvpKQUA8g2oEm2fTK5p',
    members: {
      jisoo: 'https://link.deezer.com/s/31SvqcR8anNePcDAB8CFm',
      jennie: 'https://link.deezer.com/s/31SvqEes3CfUpPDgLUPRK',
      rosé: 'https://link.deezer.com/s/31SvreiKl2sHZcFOsqgQh',
      lisa: 'https://link.deezer.com/s/31SvrxEOTqnvzEAfcM4Oe',
    },
  };

  const introText = [
    'Deezer is an online music streaming service available for free and paid subscriptions.',
    'Deezer streams count towards various national charts including Billboard Global 200, Billboard Global Excl. US, RIAA Charts, and Official Charts (UK).',
  ];

  const streamingSteps = [
    'Open Deezer App or Browser.',
    'Type in “BLACKPINK” in the search bar.',
    'Click on BLACKPINK artist page.',
    'Click on the “Add” option to become a fan of BLACKPINK.',
    'On the artist page, scroll down to the desired song.',
    'Click on album or single.',
    'Click the “Add” button to become a fan of the album/single.',
    'Click the heart button next to each track to add it to your favourites.',
    'Play through the album with special emphasis on the title track.',
    'After listening to the album, close the tab.',
    'Repeat steps 1, 2, 3, 6, 9, 10.',
  ];

  const tipsList = [
    'Streaming for free from a desktop or tablet allows unlimited skips.',
    'Playing a song for over 30 seconds counts as a stream.',
    'Avoid being a bot — make your behaviour natural by interacting with the playlist occasionally.',
    'Deezer app will automatically count downloaded songs played offline as soon as the device reconnects to the internet.',
    'The “hot key” control option on the desktop Deezer app enables playing, pausing and skipping tracks using the keyboard.',
  ];

  const faqItems = [
    'Both free and premium accounts count streams on Deezer.',
    'HiFi (premium) streams may have higher weighting on some charts.',
    'Streams from all countries contribute to global charts.',
    'Hearting tracks and becoming a fan helps with artist visibility.',
    'Offline plays are counted once you reconnect to the internet.',
    'For questions → contact your local BLINK streaming team.',
  ];

  return (
    <div className="h-full p-8 overflow-y-auto bg-gradient-to-br from-black via-purple-900/30 to-black">
      <div className="max-w-5xl mx-auto">

        {/* Back Button */}
        <button onClick={onBack} className="flex items-center gap-3 text-pink-400 hover:text-pink-300 mb-10 font-semibold transition">
          <ArrowLeft className="w-6 h-6" /> Back to Guidelines
        </button>

        {/* Header */}
        <div className="text-center mb-12">
          <img src={platform.logo} alt="Deezer" className="w-32 h-32 mx-auto mb-6 rounded-2xl shadow-2xl" onMouseEnter={playSound} />
          <h1 className="text-5xl font-black text-white">Deezer</h1>
          <p className="text-xl text-gray-400 mt-4">Streaming Guide for BLINKs</p>
          
          {/* Scroll Prompt */}
          <p className="text-2xl font-medium text-white mt-8">
            Scroll to see important tips to maximise{' '}
            <span className="text-pink-400 font-black">DEEZER</span>{' '}
            streams for{' '}
            <span className="text-pink-400 font-black">BLACKPINK</span>.
          </p>
        </div>

        {/* WHAT IS DEEZER & WHY IMPORTANT */}
        <div className="bg-black/60 backdrop-blur-xl rounded-3xl p-10 border-2 border-[#a238ff] shadow-2xl mb-20">
          <h2 className="text-4xl font-black text-[#a238ff] text-center mb-8">
            What is Deezer & Why It Matters
          </h2>
          <ul className="space-y-4 text-gray-200 text-lg max-w-4xl mx-auto">
            {introText.map((item, i) => (
              <li key={i} className="flex items-center gap-4">
                <Heart className="w-6 h-6 text-[#a238ff] fill-[#a238ff] flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* STREAMING GUIDE */}
        <div className="grid lg:grid-cols-2 gap-8 mb-20">

          {/* HOW TO STREAM */}
          <div className="bg-black/60 backdrop-blur-xl rounded-3xl p-8 border-2 border-[#a238ff] shadow-2xl">
            <h2 className="text-4xl font-black text-[#a238ff] mb-8 text-center flex items-center justify-center gap-3">
              HOW TO STREAM <Heart className="w-10 h-10 text-[#a238ff] fill-[#a238ff]" />
            </h2>
            <ol className="space-y-5 text-gray-200 text-lg list-decimal list-inside ml-4 mt-10">
              {streamingSteps.map((step, i) => (
                <li key={i} className="pl-2 flex items-center gap-3">
                  <Heart className="w-6 h-6 text-[#a238ff] fill-[#a238ff] flex-shrink-0" />
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* STREAMING TIPS */}
          <div className="bg-black/60 backdrop-blur-xl rounded-3xl p-8 border-2 border-[#a238ff] shadow-2xl">
            <h2 className="text-4xl font-black text-[#a238ff] mb-8 text-center">
              STREAMING TIPS
            </h2>
            <ul className="space-y-5 text-gray-200 text-lg mt-10">
              {tipsList.map((tip, i) => (
                <li key={i} className="flex items-center gap-4">
                  <Heart className="w-6 h-6 text-[#a238ff] fill-[#a238ff] flex-shrink-0" />
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* IMPORTANT REMINDERS */}
        <div className="mb-16">
          <h2 className="text-5xl font-black text-center text-white mb-10 tracking-widest">
            IMPORTANT REMINDERS
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 backdrop-blur-xl border-2 border-[#a238ff] rounded-3xl p-6 text-center shadow-2xl">
              <p className="text-[#a238ff] font-bold text-xl mb-2 flex items-center justify-center gap-2">
                Heart Everything <Heart className="w-6 h-6 fill-[#a238ff]" />
              </p>
              <p className="text-gray-200">Tracks, albums & artist</p>
            </div>
            <div className="bg-gradient-to-br from-pink-600/20 to-purple-600/20 backdrop-blur-xl border-2 border-[#a238ff] rounded-3xl p-6 text-center shadow-2xl">
              <p className="text-[#a238ff] font-bold text-xl mb-2"> ➤ 30 Seconds = 1 Stream</p>
              <p className="text-gray-200">Play past 30s mark</p>
            </div>
            <div className="bg-gradient-to-br from-purple-600/20 to-indigo-600/20 backdrop-blur-xl border-2 border-[#a238ff] rounded-3xl p-6 text-center shadow-2xl">
              <p className="text-[#a238ff] font-bold text-xl mb-2">Desktop/Tablet Free</p>
              <p className="text-gray-200">Unlimited skips</p>
            </div>
            <div className="bg-gradient-to-br from-indigo-600/20 to-purple-600/20 backdrop-blur-xl border-2 border-[#a238ff] rounded-3xl p-6 text-center shadow-2xl">
              <p className="text-[#a238ff] font-bold text-xl mb-2">Offline Counts</p>
              <p className="text-gray-200">When reconnected</p>
            </div>
            <div className="bg-gradient-to-br from-pink-600/20 to-purple-600/20 backdrop-blur-xl border-2 border-[#a238ff] rounded-3xl p-6 text-center shadow-2xl">
              <p className="text-[#a238ff] font-bold text-xl mb-2">Act Natural</p>
              <p className="text-gray-200">Interact occasionally</p>
            </div>
            <div className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 backdrop-blur-xl border-2 border-[#a238ff] rounded-3xl p-6 text-center shadow-2xl">
              <p className="text-[#a238ff] font-bold text-xl mb-2">Focus Title Track</p>
              <p className="text-gray-200">After full album play</p>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="my-24">
          <h2 className="text-5xl font-black text-center text-white mb-12 tracking-widest flex items-center justify-center gap-4">
            FAQ <ChevronDown className="w-12 h-12 animate-bounce" />
          </h2>
          <div className="bg-black/60 backdrop-blur-xl rounded-3xl p-10 border-2 border-[#a238ff] shadow-2xl">
            <ul className="space-y-5 text-gray-200 text-lg leading-relaxed">
              {faqItems.map((item, i) => (
                <li key={i} className="flex items-start gap-4">
                  <span className="text-[#a238ff] font-bold mt-1">Q{i + 1}.</span>
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
                className="group relative bg-transparent rounded-3xl p-6 transition-all duration-500 hover:scale-110 hover:z-10 active:scale-95 border-2 border-[#a238ff]"
                style={{ background: 'rgba(255,105,180,0.1)', backdropFilter: 'blur(10px)'}}
                onMouseEnter={playSound}>
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-pink-500/30 to-purple-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                <div className="relative z-10 text-center">
                  <p className="text-5xl font-black text-[#a238ff] tracking-widest">BLACKPINK</p>
                  <p className="text-white text-lg mt-2">Official Group</p>
                </div>
              </a>
            </div>

            {/* Members */}
            <div className="md:col-span-2">
              <div className="grid grid-cols-2 gap-6">
                {Object.entries(platform.members).map(([member, url]) => (
                  <a key={member} href={url} target="_blank" rel="noopener noreferrer"
                    className="group relative bg-transparent rounded-3xl p-6 transition-all duration-500 hover:scale-110 hover:z-10 active:scale-95 border-2 border-[#a238ff]"
                    style={{ background: 'rgba(255,105,180,0.1)', backdropFilter: 'blur(10px)'}}
                    onMouseEnter={playSound}>
                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-pink-500/30 to-purple-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                    <div className="relative z-10 text-center">
                      <p className="text-4xl font-black text-[#a238ff] tracking-widest">
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
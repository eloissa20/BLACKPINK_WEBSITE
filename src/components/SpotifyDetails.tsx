// src/components/SpotifyDetails.tsx
import { ArrowLeft, Check, X, ChevronDown, Info } from 'lucide-react';

// ✅ Correct way: Import the image just like in Header.tsx
import spotifyLogo from '../assets/logos/spotify.png';

interface Props {
  onBack: () => void;
  playSound: () => void;
}

export function SpotifyDetails({ onBack, playSound }: Props) {
  const platform = {
    name: 'Spotify',
    logo: spotifyLogo, // ✅ Use the imported variable (not a string path)
    blackpink: 'https://open.spotify.com/artist/41MozSoPIsD1dJM0CLPjZF?si=EFuT525WTV-e4T3-Hpbwzg',
    members: {
      jisoo: 'https://open.spotify.com/artist/6UZ0ba50XreR4TM8u322gs?si=IcT7lWRkROyQgPkxEa5JEA',
      jennie: 'https://open.spotify.com/artist/250b0Wlc5Vk0CoUsaCY84M?si=bL_x_3heSE-HTtgg4T07IA',
      rosé: 'https://open.spotify.com/artist/3eVa5w3URK5duf6eyVDbu9?si=GuJSCdNZRdGpwolvX1OnDQ',
      lisa: 'https://open.spotify.com/artist/41MozSoPIsD1dJM0CLPjZF?si=EFuT525WTV-e4T3-Hpbwzg',
    },
  };

  // ... (all your lists stay exactly the same – no changes needed below)

  const doList = [
    'Log in to your Spotify account',
    'Search BLACKPINK’s Spotify account + the name of the song.',
    'A fan should use at least 5 accounts to stream',
    'You can use multiple free accounts on a computer via these options:',
    '1 - Using different Web browsers with different Spotify accounts.',
    '2 - Using different Google Chrome profiles (no sync).',
    '3 - Spotify app on desktop (1 account)',
    '(Mobile/Tablets)',
    '1 - Android free bypass → follow @sunnysunlisa thread',
    '2 - Android Premium → no restrictions',
    '3 - iOS free → doesn’t work',
    '4 - iOS Premium → no restrictions',
    'Listen to BLACKPINK Music 24/7.',
    'Use BLACKPINK focused playlists.',
    'Playlist length should be at least 1 hour.',
    'Press a Like on all BLACKPINK songs.',
    'Shazam while you listen to the songs.',
    'Set volume to at least 1% or use earphones.',
    'You can mute your device, but don’t mute the app.',
    'Buy premium if you can to support BLACKPINK more on charts.',
    'Use long playlists from “BP BLINK” website or your local fanbase.',
    'Diversify:',
    'Comeback period: 80% new song + 20% old',
    'Post-comeback: 50–60% new + 40–50% old',
    'Turn OFF Autoplay (Home > Settings > Autoplay).',
  ];

  const singleExample = '“New Title Track” > JUMP > New TT > PV > New TT > SHUTDOWN > New TT…';
  const albumExample = 'Album song: (All album songs in order) + (few older Title tracks) + (All album songs in order) + (few older Title Tracks)...';

  const dontList = [
    'Don’t shuffle the playlist.',
    'Don’t mute audio, leave at least 1%.',
    'Don’t loop the song via loop button.',
    'Don’t use VPN.',
    'Don’t use only 1–2 accounts.',
    'Don‘t need to skip or interact with songs.',
    'No other artists in BLACKPINK playlists.',
  ];

  const specialLines = new Set([
    'You can use multiple free accounts on a computer via these options:',
    '(Mobile/Tablets)',
    'Diversify:',
  ]);

  const faqItems = [
    'Spotify total stream count with all streams is reflected on Spotify web counter.',
    'Spotify daily charts and charts in general will only show 20 streams from 1 account/per song version/per day.',
    'NOTE: Maximum amount of streams you can generate is the max amount of Spotify accounts you can manage simultaneously.',
    'We advise everyone to only Stream on your computers via Spotify app & Web browsers (Google, Firefox, Microsoft Edge, Opera, Chromium, Safari, ur, avast, Duckduckgo, Epic, Brave).',
    'You will most likely be required to add extension on browsers to allow it to play Spotify.',
    'Each Spotify account must be on a different browser (Not different window unless you are using profiles option).',
    'If you stream on Android (Mobile/Tablets) with a free account – follow the Thread of Spotify Web mobile on “@FUNDING_BPMXCO” through a link on “24365withblinks.com”.',
    'You Should Stream 24/7 to support the artist you Love.',
    'If you are a fan, you must use at least 3 Spotify accounts to stream BLACKPINK music.',
    'Spotify does track your IP address, but we have not noticed any limitations. Spotify family plan allows 6 members – 6 participants from one IP is safe.',
    'Your Focused playlist MUST consist of ONLY BLACKPINK songs + BLACKPINK soloist songs.',
    'Your Focused playlist MUST NOT have any other artists. You can switch to personal playlists from time to time but focus on BLACKPINK.',
    'During comeback: If album → play new songs mixed with title tracks. If single → mix the new song with full discography.',
    'Only BLACKPINK songs in my playlist, will my streams count? → Yes, 100% counted toward total counter.',
    'For longevity: use long 24-hour playlists → ~20% pre-album + 20% The Album + 60% new comeback.',
    'If you use VPN → streams may show in total counter but WILL NOT count on any charts.',
    'Please register at least 1 Premium account — those streams are extremely valuable on global charts.',
    'Premium users must reconnect to internet within 24 hours to count offline streams.',
    'We BAN any non-BLACKPINK / non-soloist songs in focused playlists.',
    'Avoid using loop function — better to use long focused playlists.',
    'Play the song through huge Spotify playlists (Today’s Top Hits, Pop Up, etc.) whenever possible.',
    'Share the track everywhere on social media — crucial for Spotify Viral 50.',
    'Stream the whole song (30+ seconds = 1 stream, but full play is best).',
    'Follow BLACKPINK & members’ official Spotify accounts + follow the playlist “This is BLACKPINK”.',
    'Spotify counts each version separately → double filtered streams possible on songs with multiple versions.',
    'Current cap: 20 filtered streams/account/song version/day (as of 2022-03-03) — may change in future.',
    'For streaming questions → contact @WorldwideBLINK via DM.',
  ];

  return (
    <div className="h-full p-8 overflow-y-auto bg-gradient-to-br from-black via-purple-900/30 to-black">
      <div className="max-w-5xl mx-auto">
        <button onClick={onBack} className="flex items-center gap-3 text-pink-400 hover:text-pink-300 mb-10 font-semibold transition">
          <ArrowLeft className="w-6 h-6" /> Back to Guidelines
        </button>

        <div className="text-center mb-12">
          {/* ✅ This will now work on Vercel just like the BP logo */}
          <img 
            src={platform.logo} 
            alt="Spotify" 
            className="w-32 h-32 mx-auto mb-6 rounded-2xl shadow-2xl" 
            onMouseEnter={playSound} 
          />
          <h1 className="text-5xl font-black text-white">Spotify</h1>
          <p className="text-xl text-gray-400 mt-4">Streaming Guide for BLINKs</p>

          <p className="text-2xl font-medium text-white mt-8">
            Scroll to see important tips to maximise {' '}
            <span className="text-pink-400 font-black">SPOTIFY</span>{' '}
            streams for{' '}
            <span className="text-pink-400 font-black">BLACKPINK</span>.
          </p>
        </div>
        {/* The rest of your component remains 100% unchanged */}
        {/* DO'S & DON'TS, STREAMING RULE NOTES, IMPORTANT REMINDERS, FAQ, OFFICIAL LINKS */}
        {/* (All kept exactly as you had them – no other changes) */}

        {/* DO'S & DON'TS */}
        <div className="grid lg:grid-cols-2 gap-8 mb-20">

          {/* DO'S */}
          <div className="bg-black/60 backdrop-blur-xl rounded-3xl p-8 border-2 border-[#1db954] shadow-2xl">
            <h2 className="text-4xl font-black text-[#1db954] mb-8 text-center flex items-center justify-center gap-3">
              DO'S <Check className="w-10 h-10 text-[#1db954]" />
            </h2>
            <ul className="space-y-3 text-gray-200 text-lg mt-10">
              {doList.map((item, i) => {
                const isSpecial = specialLines.has(item);
                return (
                  <li key={i} className={`flex items-start gap-3 ${isSpecial ? 'mt-7' : ''}`}>
                    {isSpecial ? (
                      <span className="font-black text-pink-400 text-xl">{item}</span>
                    ) : (
                      <>
                        <Check className="w-6 h-6 text-[#1db954] flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </>
                    )}
                  </li>
                );
              })}
            </ul>

            <div className="mt-10 p-8 bg-black/50 rounded-2xl border-2 border-pink-500">
              <p className="text-2xl font-black text-pink-400 mb-4 text-center">SINGLE RELEASE EXAMPLE</p>
              <p className="text-xl text-pink-300 font-bold text-center">{singleExample}</p>
              <p className="text-2xl font-black text-pink-400 mt-8 mb-4 text-center">ALBUM RELEASE EXAMPLE</p>
              <p className="text-xl text-pink-300 font-bold text-center">{albumExample}</p>
            </div>
          </div>

          {/* DON'TS */}
          <div className="bg-black/60 backdrop-blur-xl rounded-3xl p-8 border-2 border-[#ff0436] shadow-2xl">
            <h2 className="text-4xl font-black text-[#f94c57] mb-8 text-center flex items-center justify-center gap-3">
              DON'T <X className="w-12 h-12" />
            </h2>
            <ul className="space-y-4 text-gray-200 text-lg">
              {dontList.map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <X className="w-7 h-7 text-[#f94c57] flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* STREAMING RULE NOTES – INDEPENDENT FULL-WIDTH SECTION */}
        <div className="my-24">
          <h2 className="text-5xl font-black text-white text-center mb-14 tracking-widest flex items-center justify-center gap-5">
            <Info className="w-12 h-12" />
            STREAMING RULE NOTES
          </h2>

          <div className="grid md:grid-cols-2 gap-10 max-w-7xl mx-auto">

            {/* LEFT: PURE BLACKPINK PLAYLIST */}
            <div className="bg-gradient-to-br from-[#1db954]/20 to-transparent rounded-3xl p-10 border-2 border-[#1db954] backdrop-blur-xl shadow-2xl">
              <h3 className="text-3xl font-black text-[#1db954] text-center mb-8">
                PURE BLACKPINK PLAYLIST (RECOMMENDED)
              </h3>
              <ol className="space-y-5 text-gray-100 text-lg list-decimal list-inside ml-6">
                <li>Create a playlist with <strong>ONLY BLACKPINK + solo songs</strong>.</li>
                <li>No other artists allowed in focused playlists.</li>
                <li>Make it 24 hours long for overnight streaming.</li>
                <li>During comeback: 80% new release + 20% old titles.</li>
                <li>Post-comeback: 50–60% new + 40–50% old.</li>
                <li>Turn OFF Autoplay to prevent outside songs.</li>
                <li>Like (heart) every BLACKPINK song.</li>
                <li>Play in order — no shuffle.</li>
              </ol>
            </div>

            {/* RIGHT: ACCOUNT SWITCHING */}
            <div className="bg-gradient-to-br from-[#ff0436]/20 to-transparent rounded-3xl p-10 border-2 border-[#ff0436] backdrop-blur-xl shadow-2xl">
              <h3 className="text-3xl font-black text-[#f94c57] text-center mb-8">
                ACCOUNT & CAP RULES
              </h3>
              <ol className="space-y-5 text-gray-100 text-lg list-decimal list-inside ml-6">
                <li>Use <strong>at least 5 accounts</strong> per fan.</li>
                <li>Max <strong>20 filtered streams</strong> per account per song version per day.</li>
                <li>Switch accounts after every playlist with 20× repeats of the new song.</li>
                <li>Premium streams are weighted higher on charts.</li>
                <li>Family Plan: up to 6 accounts from same IP is safe.</li>
                <li>Reconnect to internet within 24h for offline Premium streams to count.</li>
              </ol>

              <div className="mt-10 space-y-5 text-center">
                <p className="text-yellow-300 font-black text-2xl">
                  SWITCH ACCOUNTS AFTER EVERY 20× NEW SONG PLAYLIST!
                </p>
                <p className="text-cyan-300 font-bold text-xl">
                  TIP: Use multiple browsers or Chrome profiles on desktop
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* IMPORTANT REMINDERS */}
        <div className="mb-16">
          <h2 className="text-5xl font-black text-center text-white mb-10 tracking-widest">
            IMPORTANT REMINDERS
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-red-600/20 to-pink-600/20 backdrop-blur-xl border-2 border-red-500 rounded-3xl p-6 text-center shadow-2xl">
              <p className="text-red-300 font-bold text-xl mb-2">No Other Artists</p>
              <p className="text-gray-200">In focused playlists</p>
            </div>
            <div className="bg-gradient-to-br from-pink-600/20 to-purple-600/20 backdrop-blur-xl border-2 border-pink-500 rounded-3xl p-6 text-center shadow-2xl">
              <p className="text-pink-300 font-bold text-xl mb-2">No VPN Ever</p>
              <p className="text-gray-200">Spotify blocks filtered streams</p>
            </div>
            <div className="bg-gradient-to-br from-purple-600/20 to-indigo-600/20 backdrop-blur-xl border-2 border-purple-500 rounded-3xl p-6 text-center shadow-2xl">
              <p className="text-purple-300 font-bold text-xl mb-2">Volume ≥ 1%</p>
              <p className="text-gray-200">Never mute Spotify app</p>
            </div>
            <div className="bg-gradient-to-br from-yellow-600/20 to-orange-600/20 backdrop-blur-xl border-2 border-yellow-500 rounded-3xl p-6 text-center shadow-2xl">
              <p className="text-yellow-300 font-bold text-xl mb-2">Switch Accounts</p>
              <p className="text-gray-200">After 20 streams per song</p>
            </div>
            <div className="bg-gradient-to-br from-green-600/20 to-teal-600/20 backdrop-blur-xl border-2 border-green-500 rounded-3xl p-6 text-center shadow-2xl">
              <p className="text-green-300 font-bold text-xl mb-2">Long Playlists</p>
              <p className="text-gray-200">24-hour BLACKPINK only</p>
            </div>
            <div className="bg-gradient-to-br from-cyan-600/20 to-blue-600/20 backdrop-blur-xl border-2 border-cyan-500 rounded-3xl p-6 text-center shadow-2xl">
              <p className="text-cyan-300 font-bold text-xl mb-2">Share Daily</p>
              <p className="text-gray-200">Helps Viral 50 charts</p>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="my-24">
          <h2 className="text-5xl font-black text-center text-white mb-12 tracking-widest flex items-center justify-center gap-4">
            FAQ <ChevronDown className="w-12 h-12 animate-bounce" />
          </h2>
          <div className="bg-black/60 backdrop-blur-xl rounded-3xl p-10 border-2 border-[#1db954] shadow-2xl">
            <ul className="space-y-5 text-gray-200 text-lg leading-relaxed">
              {faqItems.map((item, i) => (
                <li key={i} className="flex items-start gap-4">
                  <span className="text-[#1db954] font-bold mt-1">Q{i + 1}.</span>
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
            <div className="flex justify-center md:justify-end">
              <a href={platform.blackpink} target="_blank" rel="noopener noreferrer"
                className="group relative bg-transparent rounded-3xl p-6 transition-all duration-500 hover:scale-110 hover:z-10 active:scale-95 border-2 border-[#1db954]"
                style={{ background: 'rgba(255,105,180,0.1)', backdropFilter: 'blur(10px)'}}
                onMouseEnter={playSound}>
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-pink-500/30 to-purple-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                <div className="relative z-10 text-center">
                  <p className="text-5xl font-black text-[#1db954] tracking-widest">BLACKPINK</p>
                  <p className="text-white text-lg mt-2">Official Group</p>
                </div>
              </a>
            </div>

            <div className="md:col-span-2">
              <div className="grid grid-cols-2 gap-6">
                {Object.entries(platform.members).map(([member, url]) => (
                  <a key={member} href={url} target="_blank" rel="noopener noreferrer"
                    className="group relative bg-transparent rounded-3xl p-6 transition-all duration-500 hover:scale-110 hover:z-10 active:scale-95 border-2 border-[#1db954]"
                    style={{ background: 'rgba(255,105,180,0.1)', backdropFilter: 'blur(10px)'}}
                    onMouseEnter={playSound}>
                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-pink-500/30 to-purple-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                    <div className="relative z-10 text-center">
                      <p className="text-4xl font-black text-[#1db954] tracking-widest">
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
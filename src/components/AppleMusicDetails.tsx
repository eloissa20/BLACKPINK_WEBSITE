import { ArrowLeft, Check, X, ChevronDown, Info } from 'lucide-react';

interface Props {
  onBack: () => void;
  playSound: () => void;
}

export function AppleMusicDetails({ onBack, playSound }: Props) {
  const platform = {
    name: 'Apple Music',
    logo: '/assets/logos/apple-music.png',
    blackpink: 'https://music.apple.com/ph/artist/blackpink/1141774019',
    members: {
      jisoo: 'https://music.apple.com/ph/artist/jisoo/1548008317',
      jennie: 'https://music.apple.com/ph/artist/jennie/913944',
      rosé: 'https://music.apple.com/ph/artist/ros%C3%A9/1406242696',
      lisa: 'https://music.apple.com/ph/artist/lisa/1583908668',
    },
  };

  const doList = [
    'Search “BLACKPINK Title Song” on Apple Music and play it.',
    'Click 3 dots on the song (right side)',
    'Click “Add to a playlist”',
    'Click “New Playlist”',
    'Click “Done” (and now you have a playlist with 1 song)',
    'To add more songs: Search for them > press 3 dots > add to a playlist > choose a playlist that you had created > press on it > and the song will be added there.',
    'We advise you to create long playlists full of BLACKPINK music up to 24 hours.',
    'Stream the song/s inside the made playlist (TIP: if you make a playlist long enough, you can leave it overnight).',
    'When a new music is released we suggest using gaps of 1 song before putting the same song again.',
    'Offline streams count only when your mobile data is on.',
    'Share song on all your social media',
  ];

  const singleExample = '“New Title Track” > JUMP > New TT > PV > New TT > SHUTDOWN > New TT…';
  const albumExample = 'Album song: (All album songs in order) + (few older Title tracks) + (All album songs in order) + (few older Title Tracks)...';

  const dontList = [
    'DON\'T download the songs or your streams would not count.',
    'If you have already downloaded (see an arrow next to the song), please delete them, press 3 dots > press remove > press remove download.',
    'DON\'T use VPN as it blocks your IP address.',
    'DON\'T mute while streaming. Use earphones if you have to.',
    'DON\'T use loop function to loop songs, instead use just 1 long playlist.',
  ];

  const specialLines = new Set([
    'When a new music is released we suggest using gaps of 1 song before putting the same song again.',
  ]);

  const faqItems = [
    'Apple Music only counts streams from paid accounts (Individual, Family, Student).',
    'Free trial accounts DO count during the trial period.',
    'You must play at least 30 seconds for a stream to register.',
    'Downloaded songs DO NOT count — always delete downloads!',
    'Offline streams only count when you reconnect to the internet.',
    'Volume must be above 0% (even 1% is enough).',
    'Sharing songs on social media helps with chart performance.',
    'Pre-add upcoming releases for maximum impact on release day.',
    'Family Plan allows 6 accounts — use all of them!',
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
          <img src={platform.logo} alt="Apple Music" className="w-32 h-32 mx-auto mb-6 rounded-2xl shadow-2xl" onMouseEnter={playSound} />
          <h1 className="text-5xl font-black text-white">Apple Music</h1>
          <p className="text-xl text-gray-400 mt-4">Streaming Guide for BLINKs</p>

          {/* NEW SCROLL PROMPT */}
          <p className="text-2xl font-medium text-white mt-8">
            Scroll to see important tips to maximise{' '}
            <span className="text-pink-400 font-black">APPLE MUSIC</span>{' '}
            streams for{' '}
            <span className="text-pink-400 font-black">BLACKPINK</span>.
          </p>
        </div>

        {/* DO'S & DON'TS */}
        <div className="grid lg:grid-cols-2 gap-8 mb-20">

          {/* DO'S – NOW WITH #35C3F3 */}
          <div className="bg-black/60 backdrop-blur-xl rounded-3xl p-8 border-2 border-[#35C3F3] shadow-2xl">
            <h2 className="text-4xl font-black text-[#35C3F3] mb-mb-8 text-center flex items-center justify-center gap-3">
              DO'S <Check className="w-10 h-10 text-[#35C3F3]" />
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
                        <Check className="w-6 h-6 text-[#35C3F3] flex-shrink-0 mt-0.5" />
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

            {/* LEFT: DIDN'T DOWNLOAD */}
            <div className="bg-gradient-to-br from-[#35C3F3]/20 to-transparent rounded-3xl p-10 border-2 border-[#35C3F3] backdrop-blur-xl shadow-2xl">
              <h3 className="text-3xl font-black text-[#35C3F3] text-center mb-8">
                IF YOU DIDN'T DOWNLOAD THE SONGS
              </h3>
              <ol className="space-y-5 text-gray-100 text-lg list-decimal list-inside ml-6">
                <li>Search “BLACKPINK Title Song” on Apple Music and play it.</li>
                <li>You’ll see 3 dots on the right side of the song.</li>
                <li>Tap Library (bottom) → Playlists → add the song.</li>
                <li>Name it “BLACKPINK + title song”.</li>
                <li>Add songs with <strong>1 song gap</strong> between repeats.</li>
                <li>Make sure only <strong>3 dots (no cloud/arrow)</strong> appear → streaming version.</li>
                <li>Stream from this playlist (can leave overnight if 24h long).</li>
                <li>Offline streams count only when you reopen Apple Music with internet on.</li>
              </ol>
            </div>

            {/* RIGHT: DOWNLOADED */}
            <div className="bg-gradient-to-br from-[#ff0436]/20 to-transparent rounded-3xl p-10 border-2 border-[#ff0436] backdrop-blur-xl shadow-2xl">
              <h3 className="text-3xl font-black text-[#f94c57] text-center mb-8">
                IF YOU DOWNLOADED THE SONGS
              </h3>
              <ol className="space-y-5 text-gray-100 text-lg list-decimal list-inside ml-6">
                <li>Go to Library → search the downloaded song.</li>
                <li>Tap 3 dots → <strong>Remove</strong> → <strong>Remove Download</strong>.</li>
                <li>Create a new playlist in Library → Playlists.</li>
                <li>Search & add the song again (now streaming version).</li>
                <li>Build playlist using only non-downloaded songs.</li>
                <li>Confirm: only <strong>3 dots (no cloud)</strong> → safe to stream!</li>
              </ol>

              <div className="mt-10 space-y-5 text-center">
                <p className="text-yellow-300 font-black text-2xl">
                  MUST DELETE DOWNLOADED SONGS — THEY DON'T COUNT!
                </p>
                <p className="text-cyan-300 font-bold text-xl">
                  TIP: Settings → Music → Turn OFF “Automatic Downloads”
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
              <p className="text-red-300 font-bold text-xl mb-2">No Downloads</p>
              <p className="text-gray-200">Delete all downloaded songs</p>
            </div>
            <div className="bg-gradient-to-br from-pink-600/20 to-purple-600/20 backdrop-blur-xl border-2 border-pink-500 rounded-3xl p-6 text-center shadow-2xl">
              <p className="text-pink-300 font-bold text-xl mb-2">No VPN Ever</p>
              <p className="text-gray-200">Apple blocks filtered streams</p>
            </div>
            <div className="bg-gradient-to-br from-purple-600/20 to-indigo-600/20 backdrop-blur-xl border-2 border-purple-500 rounded-3xl p-6 text-center shadow-2xl">
              <p className="text-purple-300 font-bold text-xl mb-2">Volume ≥ 1%</p>
              <p className="text-gray-200">Never mute Apple Music</p>
            </div>
            <div className="bg-gradient-to-br from-yellow-600/20 to-orange-600/20 backdrop-blur-xl border-2 border-yellow-500 rounded-3xl p-6 text-center shadow-2xl">
              <p className="text-yellow-300 font-bold text-xl mb-2">Turn On Internet</p>
              <p className="text-gray-200">For offline streams to count</p>
            </div>
            <div className="bg-gradient-to-br from-green-600/20 to-teal-600/20 backdrop-blur-xl border-2 border-green-500 rounded-3xl p-6 text-center shadow-2xl">
              <p className="text-green-300 font-bold text-xl mb-2">Long Playlists</p>
              <p className="text-gray-200">24-hour BLACKPINK only</p>
            </div>
            <div className="bg-gradient-to-br from-cyan-600/20 to-blue-600/20 backdrop-blur-xl border-2 border-cyan-500 rounded-3xl p-6 text-center shadow-2xl">
              <p className="text-cyan-300 font-bold text-xl mb-2">Share Daily</p>
              <p className="text-gray-200">Helps chart performance</p>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="my-24">
          <h2 className="text-5xl font-black text-center text-white mb-12 tracking-widest flex items-center justify-center gap-4">
            FAQ <ChevronDown className="w-12 h-12 animate-bounce" />
          </h2>
          <div className="bg-black/60 backdrop-blur-xl rounded-3xl p-10 border-2 border-[#ff0436] shadow-2xl">
            <ul className="space-y-5 text-gray-200 text-lg leading-relaxed">
              {faqItems.map((item, i) => (
                <li key={i} className="flex items-start gap-4">
                  <span className="text-[#f94c57] font-bold mt-1">Q{i + 1}.</span>
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
                className="group relative bg-transparent rounded-3xl p-6 transition-all duration-500 hover:scale-110 hover:z-10 active:scale-95 border-2 border-[#ff0436]"
                style={{ background: 'rgba(255,105,180,0.1)', backdropFilter: 'blur(10px)'}}
                onMouseEnter={playSound}>
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-pink-500/30 to-purple-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                <div className="relative z-10 text-center">
                  <p className="text-5xl font-black text-[#f94c57] tracking-widest">BLACKPINK</p>
                  <p className="text-white text-lg mt-2">Official Group</p>
                </div>
              </a>
            </div>

            <div className="md:col-span-2">
              <div className="grid grid-cols-2 gap-6">
                {Object.entries(platform.members).map(([member, url]) => (
                  <a key={member} href={url} target="_blank" rel="noopener noreferrer"
                    className="group relative bg-transparent rounded-3xl p-6 transition-all duration-500 hover:scale-110 hover:z-10 active:scale-95 border-2 border-[#ff0436]"
                    style={{ background: 'rgba(255,105,180,0.1)', backdropFilter: 'blur(10px)'}}
                    onMouseEnter={playSound}>
                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-pink-500/30 to-purple-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                    <div className="relative z-10 text-center">
                      <p className="text-4xl font-black text-[#f94c57] tracking-widest">
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
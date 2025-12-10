// src/components/AppleMusicDetails.tsx
import { ArrowLeft, Check, X } from 'lucide-react';

interface Props {
  onBack: () => void;
  playSound: () => void;
}

export function AppleMusicDetails({ onBack, playSound }: Props) {
  const platform = {
    name: 'Apple Music',
    logo: '/src/assets/logos/apple-music.png',
    blackpink: 'https://music.apple.com/us/artist/blackpink/1252555207',
    members: {
      jisoo: 'https://music.apple.com/us/artist/jisoo/1630130415',
      jennie: 'https://music.apple.com/us/artist/jennie/1486136387',
      rosé: 'https://music.apple.com/us/artist/rosé/1486129974',
      lisa: 'https://music.apple.com/us/artist/lalisa/1587033465',
    },
  };

  const doRules = [
    'Search “BLACKPINK Title Song” on Apple Music and play it.',
    'Click 3 dots on the song (right side)',
    'Click “Add to a playlist”',
    'Click “New Playlist”',
    'Click “Done” (and now you have a playlist with 1 song)',
    'To add more songs: Search for them → press 3 dots → add to a playlist → choose your playlist',
    'We advise you to create long playlists full of BLACKPINK music up to 24 hours.',
    'Stream the song/s inside the made playlist (long enough → leave overnight).',
    'When new music is released: use gaps of 1 song before repeating the same song.',
    'Share song on all your social media',
  ];

  const singleExample = 'New Title Track → KTL → New TT → D4 → New TT → AIIYL → New TT…';
  const albumExample = '(All album songs in order) + (few older Title tracks) + (All album songs in order) + (few older Title Tracks)...';

  const dontRules = [
    'DON’T download the songs or your streams will not count.',
    'If already downloaded (arrow next to song) → 3 dots → Remove → Remove Download',
    'DON’T use VPN (blocks your IP)',
    'DON’T mute while streaming. Use earphones if needed.',
    'DON’T use loop function — use one long playlist instead',
  ];

  return (
    <div className="h-full p-8 overflow-y-auto bg-gradient-to-br from-black via-purple-900/30 to-black">
      <div className="max-w-5xl mx-auto">

        {/* Back Button */}
        <button
          onClick={onBack}
          className="flex items-center gap-3 text-pink-400 hover:text-pink-300 mb-10 font-semibold transition"
        >
          <ArrowLeft className="w-6 h-6" /> Back to Guidelines
        </button>

        {/* Header */}
        <div className="text-center mb-12">
          <img
            src={platform.logo}
            alt="Apple Music"
            className="w-32 h-32 mx-auto mb-6 rounded-2xl shadow-2xl"
            onMouseEnter={playSound}
          />
          <h1 className="text-5xl font-black text-white">Apple Music</h1>
          <p className="text-xl text-gray-400 mt-2">Streaming Guide for BLINKs</p>
        </div>

        {/* DO'S */}
        <div className="bg-transparent backdrop-blur-xl rounded-3xl p-10 border-2 border-green-500 shadow-2xl mb-12">
          <h2 className="text-4xl font-black text-green-400 mb-8 text-center flex items-center justify-center gap-4">
            DO'S <Check className="w-10 h-10" />
          </h2>
          <ul className="space-y-5 text-gray-200 text-lg leading-relaxed">
            {doRules.map((item, i) => (
              <li key={i} className="flex items-start gap-4">
                <Check className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          {/* Pink Examples */}
          <div className="mt-10 space-y-6 bg-black/50 rounded-2xl p-8 border border-pink-500">
            <div>
              <p className="text-2xl font-black text-pink-400 mb-3">SINGLE RELEASE EXAMPLE</p>
              <p className="text-lg text-pink-300 font-bold tracking-wide">{singleExample}</p>
            </div>
            <div>
              <p className="text-2xl font-black text-pink-400 mb-3">ALBUM RELEASE EXAMPLE</p>
              <p className="text-lg text-pink-300 font-bold tracking-wide">{albumExample}</p>
            </div>
          </div>
        </div>

        {/* DON'TS */}
        <div className="bg-transparent backdrop-blur-xl rounded-3xl p-10 border-2 border-red-600 shadow-2xl mb-12">
          <h2 className="text-4xl font-black text-red-500 mb-8 text-center flex items-center justify-center gap-4">
            DON'T <X className="w-12 h-12" />
          </h2>
          <ul className="space-y-5 text-gray-200 text-lg leading-relaxed">
            {dontRules.map((item, i) => (
              <li key={i} className="flex items-start gap-4">
                <X className="w-7 h-7 text-red-500 flex-shrink-0 mt-1" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Official Links */}
        <div className="space-y-8">
          <h2 className="text-4xl font-black text-white text-center">Official Links</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            <a
              href={platform.blackpink}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-br from-pink-600 to-purple-700 p-10 rounded-3xl text-center hover:scale-105 transition text-2xl font-bold text-white shadow-xl border-2 border-pink-500"
              onMouseEnter={playSound}
            >
              BLACKPINK
            </a>

            {Object.entries(platform.members).map(([member, url]) => (
              <a
                key={member}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800/90 p-10 rounded-3xl text-center hover:bg-gray-700 transition text-xl font-bold text-white capitalize shadow-xl border-2 border-pink-500"
                onMouseEnter={playSound}
              >
                {member === 'rosé' ? 'ROSÉ' : member.toUpperCase()}
              </a>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
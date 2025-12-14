import { ArrowLeft, Check, X, ChevronDown, Info } from 'lucide-react';

interface Props {
  onBack: () => void;
  playSound: () => void;
}

export function YouTubeDetails({ onBack, playSound }: Props) {
  const platform = {
    name: 'YouTube',
    logo: '/src/assets/logos/youtube.png',
    blackpink: 'https://www.youtube.com/@BLACKPINK',
    members: {
      jisoo: 'https://www.youtube.com/@sooyaaa__',
      jennie: 'https://www.youtube.com/@jennierubyjane',
      rosé: 'https://www.youtube.com/@roses_are_rosie',
      lisa: 'https://www.youtube.com/@wearelloud',
    },
  };

  const doList = [
    'Even with Premium membership you must stream by the rules!!!',
    'Log in to your YouTube account (1 account per 1 device)',
    'Search the (MV Title) or just enter “BLACKPINK MV’s” each time manually',
    'You can play the same video only 5-6 times per 1 hour on average',
    'You must watch 3 different videos in between before watching MV Title again',
    'You must do 6-10 minute gaps before watching MV Title again',
    'TURN OFF autoplay',
    'Watch MV until the end',
    'LIKE MV only AFTER you watched full video',
    'You can skip ads (If you have no option to skip long ads – go to another video)',
    'Set volume on YouTube to more than 50%, use earphones if needed',
    'Set video quality to 480p or above (when watching MV always double check if quality is not too low)',
    'Watch MV on BLACKPINK’s official channel Only',
    'Join to Watch & Like live countdown as early as possible and don’t leave the livestream (you will be redirected directly into a Music Video)',
    'SHARE MV link on all your social media for more unique viewers',
    'Keep streaming even if Views/Likes freezes (they will be added later)',
    'On YouTube Music: Only 50 streams may be accounted per day (US), you may skip after 30 sec. (NOTE: streams on YouTube Music are audio streams Not views)',
    'For UK Charts: watch only on BLACKPINK’s official YouTube channel (MV, Official audio track, dance practice & live performances). UK residents only. Views from embedded videos do not count for charts.',
    'For USA Billboard: watch only on BLACKPINK’s official YouTube channel (only Official Video & Audio views count for Billboard). USA residents only. Views from embedded videos do not count for charts.',
    'Turn on your watch history (Follow Watch History Guide)',
    'Use 2 devices for 1 IP address, but use 2 different accounts',
    'Use different browsers on different devices that are connected to 1 IP address',
    'Write your own comment, try not to copy & paste, be original',
    'Interact with positive comments only and moderately',
  ];

  const dontList = [
    'Don’t play the same MV more than 5-6 times per 1 hour and don’t repeat your behaviour',
    'Don’t refresh the page',
    'Don’t Replay/Loop video',
    'Don’t use “Ad-Block” & APK',
    'Don’t use VPN it will filter views',
    'Don’t change the playback speed',
    'Don’t clear history/cache/cookies',
    'Don’t stream from embedded links',
    'Don’t like the video as soon as you start it',
    'Don’t pause or skip or forward any parts of MV',
    'Don’t stream on small screen /mini player/split screen',
    'Don’t use your browser on Incognito or multiple tabs to watch MV',
    'Don’t lower the volume less than 50% on YouTube itself (you can lower it on your PC device and for phones use earphones if needed)',
    'Don’t use background play where you watch and use another app at the same time (It will be counted as a single view only)',
    'Don’t Use: Brave, Avast Secure, UR, Epic Privacy browsers or any other browser that works as vpn or ad block that hides ads or your IP (It deletes all your views)',
    'Don’t stream on YouTube Music (Streaming on YouTube Music will be counted as an audio song stream not as views)',
    'Don’t use playlists to stream as it officially counts as a single view only (even with premium account it counts as a single view)',
    'Don’t comment too much in a short period of time, don’t use words “stream”- “emojis” and try to not copy other comments as system could count that as spam',
    'Don’t close YouTube with Title MV open (click on another video or go to another page and then leave)',
    'Don’t post photos of streaming with multiple devices',
    'Don’t use newly created accounts as views from them will most likely be filtered out',
    'Don’t download MV and then re-upload it on other platforms, channels, sns',
    'Don’t watch fan made colour coded lyric videos in first 24 hours',
    'DO NOT interact with BOT comments!!! Don’t report spam, just ignore it !!!',
  ];

  const faqItems = [
    'All legitimate views from anywhere in the world count toward the official view counter.',
    'YouTube Premium views have higher weight and no ads.',
    'Views are counted only if you watch the full video (or nearly full).',
    'Always search and play manually — never use playlists for repeated views.',
    'YouTube tracks watch history, IP, and behavior to detect bots.',
    'Freezing views/likes is normal — they update in batches later.',
    'Only views from the official BLACKPINK channel count for charts (Billboard, UK, etc.).',
    'Embedded views (e.g., on websites) do NOT count toward charts.',
    'Multiple devices on same IP are allowed if using different accounts.',
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
          <img src={platform.logo} alt="YouTube" className="w-32 h-32 mx-auto mb-6 rounded-2xl shadow-2xl" onMouseEnter={playSound} />
          <h1 className="text-5xl font-black text-white">YouTube</h1>
          <p className="text-xl text-gray-400 mt-4">Streaming Guide for BLINKs</p>
          
          {/* Scroll Prompt */}
          <p className="text-2xl font-medium text-white mt-8">
            If possible sign up for a{' '}
            <span className="text-pink-400 font-black">YOUTUBE premium</span>{' '}
            so you won‘t need to watch ad‘s, even with premium membership you must stream by the rules!!!
          </p>
        </div>

        {/* DO'S & DON'TS */}
        <div className="grid lg:grid-cols-2 gap-8 mb-20">

          {/* DO'S */}
          <div className="bg-black/60 backdrop-blur-xl rounded-3xl p-8 border-2 border-[#f5ebdc] shadow-2xl">
            <h2 className="text-4xl font-black text-[#f5ebdc] mb-8 text-center flex items-center justify-center gap-3">
              DO'S <Check className="w-10 h-10 text-[#f5ebdc]" />
            </h2>
            <ul className="space-y-3 text-gray-200 text-lg mt-10">
              {doList.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <Check className="w-6 h-6 text-[#f5ebdc] flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
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

            {/* LEFT: VIEWING BEHAVIOR */}
            <div className="bg-gradient-to-br from-[#f5ebdc]/20 to-transparent rounded-3xl p-10 border-2 border-[#f5ebdc] backdrop-blur-xl shadow-2xl">
              <h3 className="text-3xl font-black text-[#f5ebdc] text-center mb-8">
                MANUAL & NATURAL VIEWING
              </h3>
              <ol className="space-y-5 text-gray-100 text-lg list-decimal list-inside ml-6">
                <li>Always search and play videos <strong>manually</strong> each time.</li>
                <li>Watch <strong>3 different videos</strong> between repeats of the title MV.</li>
                <li>Use <strong>6–10 minute gaps</strong> before repeating the title track.</li>
                <li>Watch the <strong>full video</strong> until the end.</li>
                <li>Like only <strong>after</strong> watching completely.</li>
                <li>Set quality to <strong>480p or higher</strong> and volume ➤ 50% in YouTube.</li>
                <li>Turn OFF autoplay and never use playlists for farming.</li>
                <li>Only videos from <strong>official BLACKPINK channel</strong> count for charts.</li>
              </ol>
            </div>

            {/* RIGHT: DEVICES & IP */}
            <div className="bg-gradient-to-br from-[#ff0436]/20 to-transparent rounded-3xl p-10 border-2 border-[#ff0436] backdrop-blur-xl shadow-2xl">
              <h3 className="text-3xl font-black text-[#f94c57] text-center mb-8">
                DEVICES, IP & ACCOUNTS
              </h3>
              <ol className="space-y-5 text-gray-100 text-lg list-decimal list-inside ml-6">
                <li>Max <strong>2 devices per IP</strong> with different accounts.</li>
                <li>Use <strong>mobile data + WiFi</strong> on different devices for more IPs.</li>
                <li>Safe browsers: <strong>Chrome, Safari, Firefox, Edge</strong> only.</li>
                <li>Avoid browsers with built-in ad-block/VPN (Brave, UR, etc.).</li>
                <li>Enable <strong>watch history</strong> fully.</li>
                <li>Don’t clear cache, cookies, or history.</li>
              </ol>

              <div className="mt-10 space-y-5 text-center">
                <p className="text-yellow-300 font-black text-2xl">
                  NEVER USE PLAYLISTS — COUNTS AS 1 VIEW ONLY!
                </p>
                <p className="mt-10 text-cyan-300 font-bold text-xl">
                  TIP: Search “BLACKPINK [song]” manually every time
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
              <p className="text-red-300 font-bold text-xl mb-2">Manual Search Only</p>
              <p className="text-gray-200">Never use playlists</p>
            </div>
            <div className="bg-gradient-to-br from-pink-600/20 to-purple-600/20 backdrop-blur-xl border-2 border-pink-500 rounded-3xl p-6 text-center shadow-2xl">
              <p className="text-pink-300 font-bold text-xl mb-2">No VPN/Ad-Block</p>
              <p className="text-gray-200">Views will be filtered</p>
            </div>
            <div className="bg-gradient-to-br from-purple-600/20 to-indigo-600/20 backdrop-blur-xl border-2 border-purple-500 rounded-3xl p-6 text-center shadow-2xl">
              <p className="text-purple-300 font-bold text-xl mb-2">Volume ➤ 50%</p>
              <p className="text-gray-200">In YouTube app/player</p>
            </div>
            <div className="bg-gradient-to-br from-yellow-600/20 to-orange-600/20 backdrop-blur-xl border-2 border-yellow-500 rounded-3xl p-6 text-center shadow-2xl">
              <p className="text-yellow-300 font-bold text-xl mb-2">Full Watch</p>
              <p className="text-gray-200">No skipping or pausing</p>
            </div>
            <div className="bg-gradient-to-br from-green-600/20 to-teal-600/20 backdrop-blur-xl border-2 border-green-500 rounded-3xl p-6 text-center shadow-2xl">
              <p className="text-green-300 font-bold text-xl mb-2">Official Channel Only</p>
              <p className="text-gray-200">For chart eligibility</p>
            </div>
            <div className="bg-gradient-to-br from-cyan-600/20 to-blue-600/20 backdrop-blur-xl border-2 border-cyan-500 rounded-3xl p-6 text-center shadow-2xl">
              <p className="text-cyan-300 font-bold text-xl mb-2">Share Everywhere</p>
              <p className="text-gray-200">For unique viewers</p>
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
                  <span className="text-[#ff0436] font-bold mt-1">Q{i + 1}.</span>
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
                  <p className="text-5xl font-black text-[#ff0436] tracking-widest">BLACKPINK</p>
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
                      <p className="text-4xl font-black text-[#ff0436] tracking-widest">
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
import React, { useState, useEffect } from 'react';
import { MessageCircle, Heart, Repeat, Share, RefreshCw } from 'lucide-react';

// Twitter accounts to monitor
const TWITTER_ACCOUNTS = [
  '@BBU_BLACKPINK',
  '@BLACKPINK', 
  '@USBU4WAYS',
  '@BBU_Philippines',
  '@billboard',
  '@SpotifyKPop',
  '@AppleMusic'
];

// Mock real-time tweets (in production, this would connect to Twitter API)
const generateMockTweets = () => [
  {
    id: Date.now() + 1,
    account: '@BLACKPINK',
    handle: 'BLACKPINK OFFICIAL',
    time: '2m',
    content: '🖤💖 Thank you BLINKs for all your love! The support means everything to us. Stay tuned for more surprises! 💖🖤 #BLACKPINK #BLINK',
    likes: Math.floor(Math.random() * 500000) + 200000,
    retweets: Math.floor(Math.random() * 200000) + 80000,
    replies: Math.floor(Math.random() * 50000) + 10000,
    isNew: true,
  },
  {
    id: Date.now() + 2,
    account: '@BBU_BLACKPINK',
    handle: 'BLACKPINK BLINK UNION',
    time: '15m',
    content: '🚨 BLINKs! New streaming goals for this week:\n📱 Stream on ALL platforms\n💿 Buy from official stores\n📊 Every stream counts for charts!\n\n#BLACKPINK #StreamingParty #BLINKs',
    likes: Math.floor(Math.random() * 200000) + 100000,
    retweets: Math.floor(Math.random() * 100000) + 50000,
    replies: Math.floor(Math.random() * 20000) + 5000,
    isNew: false,
  },
  {
    id: Date.now() + 3,
    account: '@billboard',
    handle: 'Billboard',
    time: '1h',
    content: '🚨 CHART UPDATE: BLACKPINK continues to dominate global charts! Their latest achievements show the incredible power of BLINK support worldwide 🌍👑 #BLACKPINK #Billboard',
    likes: Math.floor(Math.random() * 150000) + 80000,
    retweets: Math.floor(Math.random() * 80000) + 30000,
    replies: Math.floor(Math.random() * 15000) + 5000,
    isNew: false,
  },
  {
    id: Date.now() + 4,
    account: '@USBU4WAYS',
    handle: 'US BLINK UNION',
    time: '2h',
    content: '🇺🇸 US BLINKs! Remember to:\n✅ Stream on US platforms\n✅ Buy from Billboard-certified stores\n✅ Request on radio stations\n\nLet\'s get those Billboard numbers! 📈 #USBlinks #BLACKPINK',
    likes: Math.floor(Math.random() * 100000) + 60000,
    retweets: Math.floor(Math.random() * 60000) + 25000,
    replies: Math.floor(Math.random() * 10000) + 3000,
    isNew: false,
  },
  {
    id: Date.now() + 5,
    account: '@BBU_Philippines',
    handle: 'BBU PHILIPPINES',
    time: '3h',
    content: '🇵🇭 Filipino BLINKs! Streaming party starts NOW! 🎉\n\n📱 Use all your devices\n🎵 Stream full songs\n💪 Let\'s show our BLACKPINK love!\n\n#BLINKsPH #BLACKPINK #StreamingParty',
    likes: Math.floor(Math.random() * 80000) + 40000,
    retweets: Math.floor(Math.random() * 40000) + 20000,
    replies: Math.floor(Math.random() * 8000) + 2000,
    isNew: false,
  },
  {
    id: Date.now() + 6,
    account: '@SpotifyKPop',
    handle: 'Spotify K-Pop',
    time: '4h',
    content: '✨ BLACKPINK tracks are trending on Spotify Global! 🔥\n\n🎧 Most streamed:\n1️⃣ Pink Venom\n2️⃣ Shut Down\n3️⃣ How You Like That\n\nKeep streaming BLINKs! 🎵 #BlackpinkOnSpotify #BLACKPINK',
    likes: Math.floor(Math.random() * 120000) + 70000,
    retweets: Math.floor(Math.random() * 70000) + 35000,
    replies: Math.floor(Math.random() * 12000) + 4000,
    isNew: false,
  },
];

export function TwitterFeed() {
  const [tweets, setTweets] = useState(generateMockTweets());
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate new tweets every 2-5 minutes
      if (Math.random() > 0.7) {
        const newTweets = generateMockTweets();
        setTweets(newTweets);
        setLastUpdate(new Date());
      }
    }, 120000); // Check every 2 minutes

    return () => clearInterval(interval);
  }, []);

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const refreshFeed = async () => {
    setIsRefreshing(true);
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    setTweets(generateMockTweets());
    setLastUpdate(new Date());
    setIsRefreshing(false);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  return (
    <div className="h-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-white flex items-center space-x-2">
          <MessageCircle className="w-6 h-6 text-pink-400" />
          <span>Live Updates</span>
        </h2>
        <button
          onClick={refreshFeed}
          disabled={isRefreshing}
          className="flex items-center space-x-2 px-3 py-1 bg-pink-600/20 hover:bg-pink-600/30 border border-pink-500/30 rounded-lg transition-all duration-300 disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 text-pink-400 ${isRefreshing ? 'animate-spin' : ''}`} />
          <span className="text-pink-400 text-sm">Refresh</span>
        </button>
      </div>
      
      <div className="text-xs text-gray-400 mb-4">
        Last updated: {formatTime(lastUpdate)}
      </div>
      
      <div className="h-[calc(100%-120px)] overflow-y-auto space-y-4 scrollbar-thin scrollbar-thumb-pink-500 scrollbar-track-gray-800">
        {tweets.map((tweet) => (
          <div
            key={tweet.id}
            className={`bg-gray-900/80 backdrop-blur-sm border rounded-xl p-4 transition-all duration-300 ${
              tweet.isNew 
                ? 'border-pink-500/70 shadow-lg shadow-pink-500/20' 
                : 'border-gray-700 hover:border-pink-500/50'
            }`}
          >
            {tweet.isNew && (
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-2 h-2 bg-pink-500 rounded-full animate-pulse"></div>
                <span className="text-pink-400 text-xs font-semibold">NEW</span>
              </div>
            )}
            
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                {tweet.handle.charAt(0)}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="font-bold text-white text-sm">{tweet.handle}</span>
                  <span className="text-gray-500 text-sm">{tweet.account}</span>
                  <span className="text-gray-500 text-sm">·</span>
                  <span className="text-gray-500 text-sm">{tweet.time}</span>
                </div>
                
                <p className="text-gray-200 text-sm mb-3 leading-relaxed whitespace-pre-line">
                  {tweet.content}
                </p>
                
                <div className="flex items-center justify-between text-gray-500 text-xs">
                  <div className="flex items-center space-x-1 hover:text-blue-400 cursor-pointer transition-colors duration-300">
                    <MessageCircle className="w-4 h-4" />
                    <span>{formatNumber(tweet.replies)}</span>
                  </div>
                  <div className="flex items-center space-x-1 hover:text-green-400 cursor-pointer transition-colors duration-300">
                    <Repeat className="w-4 h-4" />
                    <span>{formatNumber(tweet.retweets)}</span>
                  </div>
                  <div className="flex items-center space-x-1 hover:text-red-400 cursor-pointer transition-colors duration-300">
                    <Heart className="w-4 h-4" />
                    <span>{formatNumber(tweet.likes)}</span>
                  </div>
                  <div className="hover:text-gray-300 cursor-pointer transition-colors duration-300">
                    <Share className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
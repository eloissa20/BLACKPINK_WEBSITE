import { Instagram, Youtube, Music, Twitter, Sparkles, Heart } from 'lucide-react';
import { useState } from 'react';

export default function Footer() {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    socialPlatform: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error' | 'limit'>('success');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email || !formData.email.includes('@')) {
      setMessage('❌ Please enter a valid email!');
      setMessageType('error');
      return;
    }

    if (!formData.username.trim()) {
      setMessage('❌ Please enter your username!');
      setMessageType('error');
      return;
    }

    if (!formData.socialPlatform) {
      setMessage('❌ Please select a social platform!');
      setMessageType('error');
      return;
    }

    setIsSubmitting(true);
    setMessage('');

    try {
      const response = await fetch('https://blinkhourcity-backend.vercel.app/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('✨ Welcome to BLINKHOURCITY! Check your email! 💖');
        setMessageType('success');
        setFormData({ email: '', username: '', socialPlatform: '' });
      } else if (response.status === 429 && data.limitReached) {
        // Daily limit reached
        setMessage('💖 Daily limit reached! We can only welcome 500 new BLINKs per day. Please come back tomorrow to join our family! See you soon! 🌸✨');
        setMessageType('limit');
      } else {
        setMessage(data.message || '❌ Something went wrong!');
        setMessageType('error');
      }
    } catch (error) {
      console.error('Signup error:', error);
      setMessage('❌ Unable to connect. Please try again!');
      setMessageType('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setMessage(''), 10000); // Show for 10 seconds
    }
  };

  const socialLinks = [
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/blackpinkofficial/',
      icon: Instagram,
      gradient: 'from-pink-500 to-purple-600',
    },
    {
      name: 'YouTube',
      url: 'https://www.youtube.com/c/BLACKPINKOFFICIAL',
      icon: Youtube,
      gradient: 'from-red-500 to-red-700',
    },
    {
      name: 'TikTok',
      url: 'https://www.tiktok.com/@bp_tiktok',
      icon: Music,
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      name: 'Twitter',
      url: 'https://x.com/BLACKPINK',
      icon: Twitter,
      gradient: 'from-blue-400 to-blue-600',
    },
  ];

  const members = [
    { name: 'JISOO', instagram: 'https://www.instagram.com/sooyaaa__/', color: 'from-purple-400 to-pink-400' },
    { name: 'JENNIE', instagram: 'https://www.instagram.com/jennierubyjane/', color: 'from-pink-400 to-rose-400' },
    { name: 'ROSÉ', instagram: 'https://www.instagram.com/roses_are_rosie/', color: 'from-rose-400 to-orange-400' },
    { name: 'LISA', instagram: 'https://www.instagram.com/lalalalisa_m/', color: 'from-yellow-400 to-pink-400' },
  ];

  const streamingPlatforms = [
    { name: 'Spotify', url: 'https://open.spotify.com/artist/41MozSoPIsD1dJM0CLPjZF' },
    { name: 'Apple Music', url: 'https://music.apple.com/us/artist/blackpink/1252555207' },
    { name: 'YouTube Music', url: 'https://music.youtube.com/channel/UCOmHUn--16B90oW2L6FRR3A' },
    { name: 'Amazon Music', url: 'https://music.amazon.com/artists/B01LWZY8S7/blackpink' },
    { name: 'Deezer', url: 'https://www.deezer.com/en/artist/9635624' },
    { name: 'Tidal', url: 'https://tidal.com/browse/artist/8348745' },
  ];

  return (
    <footer className="relative bg-gradient-to-b from-black via-gray-900 to-black overflow-hidden border-t-4 border-pink-500">
      {/* Fun Animated Background Effects */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-1/4 w-96 h-96 bg-pink-500 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-pink-400 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-16">
        {/* Main Grid - 3 Columns */}
        <div className="grid md:grid-cols-3 gap-16 mb-16">
          
          {/* Brand Section */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3 mb-6">
              <Heart className="w-8 h-8 text-pink-400 animate-bounce" />
              <h2 className="text-4xl font-black bg-gradient-to-r from-pink-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                BLACKPINK
              </h2>
              <Heart className="w-8 h-8 text-pink-400 animate-bounce" style={{ animationDelay: '0.2s' }} />
            </div>
            
            <p className="text-gray-300 text-sm mb-8 leading-relaxed max-w-xs mx-auto md:mx-0">
              💖 The revolutionary K-pop girl group taking the world by storm! Join BLINKs worldwide! 🌍✨
            </p>
            
            {/* Social Links with Fun Effects */}
            <div className="flex gap-4 justify-center md:justify-start">
              {socialLinks.map((social) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative"
                    aria-label={social.name}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-r ${social.gradient} rounded-xl blur-md opacity-0 group-hover:opacity-100 transition-all duration-300 animate-pulse`}></div>
                    <div className="relative p-4 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl group-hover:from-gray-700 group-hover:to-gray-800 transition-all duration-300 transform group-hover:scale-110 group-hover:rotate-3 shadow-lg">
                      <IconComponent className="w-6 h-6 text-gray-300 group-hover:text-white transition-colors duration-300" />
                    </div>
                  </a>
                );
              })}
            </div>
          </div>

          {/* Members Section - Centered */}
          <div className="text-center">
            <h3 className="text-2xl font-bold text-pink-400 mb-6 flex items-center justify-center gap-2">
              <Heart className="w-6 h-6 text-purple-400 animate-pulse" />
              MEMBERS
              <Heart className="w-6 h-6 text-rose-400 animate-pulse" />
            </h3>
            <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
              {members.map((member, index) => (
                <a
                  key={member.name}
                  href={member.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block relative overflow-hidden rounded-2xl transform transition-all duration-300 hover:scale-105 hover:-rotate-1"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Glow Effect */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${member.color} opacity-30 group-hover:opacity-50 transition-opacity duration-300 blur-sm`}></div>
                  
                  {/* Card */}
                  <div className="relative px-6 py-4 bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-sm border-2 border-gray-700 group-hover:border-pink-400 transition-all duration-300">
                    <div className={`absolute inset-0 bg-gradient-to-br ${member.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}></div>
                    <span className="relative text-white font-bold text-lg tracking-wide group-hover:text-pink-300 transition-colors duration-300">
                      {member.name}
                    </span>
                    <Heart className="absolute top-2 right-2 w-4 h-4 text-pink-400 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:animate-pulse" />
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Newsletter Section */}
          <div className="text-center md:text-right">
            <h3 className="text-2xl font-bold text-pink-400 mb-6 flex items-center justify-center md:justify-end gap-2">
              <Sparkles className="w-6 h-6 text-purple-400 animate-spin-slow" />
              JOIN BLINKHOURCITY
              <Heart className="w-6 h-6 text-pink-400 animate-pulse" />
            </h3>
            <p className="text-gray-300 text-sm mb-6 leading-relaxed">
              Get exclusive updates, behind-the-scenes content, and be the first to know about everything BLACKPINK! 💌
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3 max-w-sm mx-auto md:ml-auto md:mr-0">
              <input
                type="email"
                placeholder="✉️ Your email address"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                disabled={isSubmitting}
                className="px-5 py-3 bg-gray-800/80 backdrop-blur-sm border-2 border-gray-700 rounded-xl text-white text-sm placeholder-gray-400 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/50 transition-all duration-300 disabled:opacity-50"
              />
              
              {/* Username and Social Platform in one row */}
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="👤 Username"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  disabled={isSubmitting}
                  className="px-4 py-3 bg-gray-800/80 backdrop-blur-sm border-2 border-gray-700 rounded-xl text-white text-sm placeholder-gray-400 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/50 transition-all duration-300 disabled:opacity-50"
                />
                
                <select
                  value={formData.socialPlatform}
                  onChange={(e) => setFormData({ ...formData, socialPlatform: e.target.value })}
                  disabled={isSubmitting}
                  className="px-4 py-3 bg-gray-800/80 backdrop-blur-sm border-2 border-gray-700 rounded-xl text-white text-sm focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/50 transition-all duration-300 disabled:opacity-50"
                >
                  <option value="">📱 Platform</option>
                  <option value="Instagram">Instagram</option>
                  <option value="Twitter">Twitter</option>
                  <option value="TikTok">TikTok</option>
                  <option value="YouTube">YouTube</option>
                  <option value="Facebook">Facebook</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <button 
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-3 bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 rounded-xl text-white text-sm font-bold hover:shadow-2xl hover:shadow-pink-500/50 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 bg-size-200 bg-pos-0 hover:bg-pos-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? '⏳ JOINING...' : '🚀 JOIN THE BLINK FAMILY!'}
              </button>
              
              {message && (
                <div className={`text-sm font-semibold p-3 rounded-lg ${
                  messageType === 'success' 
                    ? 'bg-green-900/30 text-green-400 border border-green-500/30' 
                    : messageType === 'limit'
                    ? 'bg-purple-900/30 text-purple-300 border border-purple-500/30'
                    : 'bg-red-900/30 text-red-400 border border-red-500/30'
                }`}>
                  {message}
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Streaming Platforms */}
        <div className="border-t-2 border-pink-500/30 pt-12 mb-12">
          <h3 className="text-center text-2xl font-bold text-white mb-8 flex items-center justify-center gap-3">
            <Music className="w-6 h-6 text-pink-400 animate-bounce" />
            STREAM BLACKPINK NOW
            <Music className="w-6 h-6 text-pink-400 animate-bounce" style={{ animationDelay: '0.2s' }} />
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {streamingPlatforms.map((platform, index) => (
              <a
                key={platform.name}
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative px-6 py-3 bg-gradient-to-r from-gray-800 to-gray-900 backdrop-blur-sm border-2 border-gray-700 rounded-full text-gray-300 text-sm font-semibold transition-all duration-300 hover:border-pink-400 hover:text-white hover:shadow-xl hover:shadow-pink-500/30 transform hover:scale-110"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <span className="relative z-10">{platform.name}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              </a>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t-2 border-pink-500/30 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm font-medium">
              © 2026 BLINKHOURCITY • All rights reserved
            </p>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-gray-400">Made with</span>
              <Heart className="w-4 h-4 text-pink-500 animate-pulse fill-pink-500" />
              <span className="text-gray-400">for</span>
              <span className="font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">BLINKs</span>
              <span className="text-gray-400">worldwide 🌎</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }
        
        .bg-size-200 {
          background-size: 200% 100%;
        }
        
        .bg-pos-0 {
          background-position: 0% 50%;
        }
        
        .hover\\:bg-pos-100:hover {
          background-position: 100% 50%;
        }
      `}</style>
    </footer>
  );
}
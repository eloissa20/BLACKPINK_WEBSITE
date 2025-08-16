import React from 'react';
import { ExternalLink, Instagram, Youtube, Music, Twitter, Crown } from 'lucide-react';

export function Footer() {
  const socialLinks = [
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/blackpinkofficial/',
      icon: Instagram,
      color: 'hover:text-pink-400',
    },
    {
      name: 'YouTube',
      url: 'https://www.youtube.com/c/BLACKPINKOFFICIAL',
      icon: Youtube,
      color: 'hover:text-red-400',
    },
    {
      name: 'TikTok',
      url: 'https://www.tiktok.com/@bp_tiktok',
      icon: Music,
      color: 'hover:text-purple-400',
    },
    {
      name: 'X (Twitter)',
      url: 'https://x.com/BLACKPINK',
      icon: Twitter,
      color: 'hover:text-blue-400',
    },
  ];

  const memberLinks = [
    { name: 'JISOO', instagram: 'https://www.instagram.com/sooyaaa__/' },
    { name: 'JENNIE', instagram: 'https://www.instagram.com/jennierubyjane/' },
    { name: 'ROSÉ', instagram: 'https://www.instagram.com/roses_are_rosie/' },
    { name: 'LISA', instagram: 'https://www.instagram.com/lalalalisa_m/' },
  ];

  return (
    <footer className="bg-black/95 backdrop-blur-md border-t border-pink-500/30 px-6 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* BLACKPINK Official */}
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-black text-white mb-4 flex items-center justify-center md:justify-start space-x-2">
              <Crown className="w-6 h-6 text-pink-500" />
              <span>BLACKPINK OFFICIAL</span>
            </h3>
            <div className="flex justify-center md:justify-start space-x-4">
              {socialLinks.map((social) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-3 bg-gray-900/50 rounded-full ${social.color} transition-all duration-300 hover:scale-110 hover:bg-gray-800/50`}
                    aria-label={social.name}
                  >
                    <IconComponent className="w-5 h-5 text-white" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Members */}
          <div className="text-center">
            <h3 className="text-xl font-bold text-pink-400 mb-4">MEMBERS</h3>
            <div className="grid grid-cols-2 gap-3">
              {memberLinks.map((member) => (
                <a
                  key={member.name}
                  href={member.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gradient-to-r from-pink-600/20 to-purple-600/20 border border-pink-500/30 rounded-xl p-3 hover:from-pink-600/30 hover:to-purple-600/30 hover:border-pink-400/50 transition-all duration-300 group"
                >
                  <div className="flex items-center justify-center space-x-2">
                    <span className="text-white font-bold text-sm">{member.name}</span>
                    <ExternalLink className="w-3 h-3 text-gray-400 group-hover:text-pink-400 transition-colors duration-300" />
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-center md:text-right">
            <h3 className="text-xl font-bold text-pink-400 mb-4">QUICK LINKS</h3>
            <div className="space-y-2">
              <a
                href="https://shop.blackpinkmusic.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-gray-300 hover:text-pink-400 transition-colors duration-300"
              >
                Official Store
              </a>
              <a
                href="https://weverse.io/blackpink"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-gray-300 hover:text-pink-400 transition-colors duration-300"
              >
                Weverse
              </a>
              <a
                href="https://www.ygfamily.com/artist/About.asp?LANGDIV=E&ATYPE=2&ARTIDX=77"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-gray-300 hover:text-pink-400 transition-colors duration-300"
              >
                YG Entertainment
              </a>
            </div>
          </div>
        </div>

        {/* Streaming Platforms */}
        <div className="border-t border-gray-800 pt-6 mb-6">
          <h3 className="text-lg font-bold text-white text-center mb-4">STREAM BLACKPINK</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { name: 'Spotify', url: 'https://open.spotify.com/artist/41MozSoPIsD1dJM0CLPjZF' },
              { name: 'Apple Music', url: 'https://music.apple.com/us/artist/blackpink/1252555207' },
              { name: 'YouTube Music', url: 'https://music.youtube.com/channel/UCOmHUn--16B90oW2L6FRR3A' },
              { name: 'Amazon Music', url: 'https://music.amazon.com/artists/B01LWZY8S7/blackpink' },
              { name: 'Deezer', url: 'https://www.deezer.com/en/artist/9635624' },
              { name: 'Tidal', url: 'https://tidal.com/browse/artist/8348745' },
            ].map((platform) => (
              <a
                key={platform.name}
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-gray-900/50 hover:bg-pink-600/20 border border-gray-700 hover:border-pink-500/50 rounded-lg text-gray-300 hover:text-white transition-all duration-300 text-sm"
              >
                {platform.name}
              </a>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 pt-6 text-center">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © 2024 BLACKPINK. All rights reserved. | YG Entertainment
            </p>
            <div className="flex items-center space-x-4 text-xs text-gray-500">
              <span>Made with 🖤💖 for BLINKs worldwide</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
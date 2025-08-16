import React from 'react';
import { ArrowLeft, Users, Star, Calendar, ExternalLink } from 'lucide-react';

interface FanbaseDetailsPageProps {
  fanbase: string;
  onBack: () => void;
}

export function FanbaseDetailsPage({ fanbase, onBack }: FanbaseDetailsPageProps) {
  const getFanbaseDetails = (fanbaseId: string) => {
    const details = {
      bbu: {
        name: 'BLACKPINK BLINK UNION',
        handle: '@BLACKPINKUNION',
        country: 'Global',
        founded: '2016',
        followers: '2.5M',
        description: 'The official global streaming and charting fanbase for BLACKPINK. We coordinate worldwide efforts to support the girls through streaming parties, chart updates, and promotional campaigns.',
        team: [
          { role: 'Head Admin', name: 'Sarah Kim', focus: 'Overall coordination' },
          { role: 'Streaming Team', name: 'Multiple Admins', focus: 'Spotify, Apple Music, YouTube' },
          { role: 'Chart Tracking', name: 'Data Team', focus: 'Billboard, Global Charts' },
          { role: 'Social Media', name: 'Content Team', focus: 'Updates & Engagement' },
        ],
        achievements: [
          'Coordinated #1 Billboard achievements',
          'Organized global streaming parties',
          'Tracked chart performance worldwide',
          'Supported tour ticket sales',
        ],
      },
      bp_philippines: {
        name: 'BLACKPINK PHILIPPINES',
        handle: '@BLACKPINKPH',
        country: 'Philippines',
        founded: '2017',
        followers: '890K',
        description: 'The leading BLACKPINK fanbase in the Philippines, supporting the girls through streaming, purchasing, and local promotional activities.',
        team: [
          { role: 'Head Admin', name: 'Maria Santos', focus: 'Philippines operations' },
          { role: 'Streaming Team', name: 'Local Coordinators', focus: 'Local platform focus' },
          { role: 'Events Team', name: 'Manila Team', focus: 'Fan events & meetups' },
          { role: 'Translation', name: 'Language Team', focus: 'Filipino translations' },
        ],
        achievements: [
          'Top streaming country in SEA',
          'Organized Manila fan events',
          'Supported Philippines tour dates',
          'Local media coverage coordination',
        ],
      },
    };
    
    return details[fanbaseId as keyof typeof details] || details.bbu;
  };

  const fanbaseData = getFanbaseDetails(fanbase);

  return (
    <div className="h-full p-8 overflow-y-auto">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center mb-8">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-pink-400 hover:text-pink-300 transition-colors duration-300"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Blink Hub</span>
          </button>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-24 h-24 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Users className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-5xl font-black text-white mb-4">
            {fanbaseData.name}
          </h1>
          <p className="text-xl text-gray-300 mb-6">
            {fanbaseData.handle} • {fanbaseData.country}
          </p>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            {fanbaseData.description}
          </p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-gradient-to-br from-pink-900/30 to-purple-900/30 backdrop-blur-sm rounded-3xl p-8 text-center">
            <Users className="w-8 h-8 text-pink-400 mx-auto mb-4" />
            <div className="text-3xl font-black text-white mb-2">{fanbaseData.followers}</div>
            <div className="text-gray-300">Followers</div>
          </div>
          <div className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 backdrop-blur-sm rounded-3xl p-8 text-center">
            <Calendar className="w-8 h-8 text-purple-400 mx-auto mb-4" />
            <div className="text-3xl font-black text-white mb-2">{fanbaseData.founded}</div>
            <div className="text-gray-300">Founded</div>
          </div>
          <div className="bg-gradient-to-br from-blue-900/30 to-pink-900/30 backdrop-blur-sm rounded-3xl p-8 text-center">
            <Star className="w-8 h-8 text-blue-400 mx-auto mb-4" />
            <div className="text-3xl font-black text-white mb-2">Top 5</div>
            <div className="text-gray-300">Global Fanbase</div>
          </div>
        </div>

        {/* Team */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            Leadership Team
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {fanbaseData.team.map((member, index) => (
              <div
                key={index}
                className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 hover:border-pink-500/50 transition-all duration-300"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                    {member.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{member.role}</h3>
                    <p className="text-gray-400">{member.name}</p>
                    <p className="text-sm text-gray-500">{member.focus}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div className="bg-gradient-to-r from-pink-900/30 to-purple-900/30 backdrop-blur-sm rounded-3xl p-8">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            Major Achievements
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {fanbaseData.achievements.map((achievement, index) => (
              <div
                key={index}
                className="flex items-center space-x-3 bg-gray-900/30 rounded-2xl p-4"
              >
                <Star className="w-6 h-6 text-yellow-400 fill-current" />
                <span className="text-gray-200">{achievement}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div className="mt-12 text-center">
          <button className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 flex items-center space-x-2 mx-auto">
            <ExternalLink className="w-5 h-5" />
            <span>Follow on X/Twitter</span>
          </button>
        </div>
      </div>
    </div>
  );
}
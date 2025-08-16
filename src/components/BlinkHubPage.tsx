import React from 'react';
import { Users, MapPin, Star, ExternalLink } from 'lucide-react';

const fanbases = [
  {
    id: 'bbu',
    name: 'BLACKPINK BLINK UNION',
    handle: '@BLACKPINKUNION',
    country: 'Global',
    followers: '2.5M',
    description: 'Official global fanbase for streaming and chart updates',
    color: 'from-pink-500 to-purple-600',
  },
  {
    id: 'bp_philippines',
    name: 'BLACKPINK PHILIPPINES',
    handle: '@BLACKPINKPH',
    country: 'Philippines',
    followers: '890K',
    description: 'Leading BLACKPINK fanbase in the Philippines',
    color: 'from-blue-500 to-pink-600',
  },
  {
    id: 'bp_thailand',
    name: 'BLACKPINK THAILAND',
    handle: '@BLACKPINKTH',
    country: 'Thailand',
    followers: '1.2M',
    description: 'Official BLACKPINK fanbase in Thailand',
    color: 'from-purple-500 to-pink-600',
  },
  {
    id: 'bp_indonesia',
    name: 'BLACKPINK INDONESIA',
    handle: '@BLACKPINKID',
    country: 'Indonesia',
    followers: '756K',
    description: 'Largest BLACKPINK community in Indonesia',
    color: 'from-red-500 to-pink-600',
  },
  {
    id: 'bp_brazil',
    name: 'BLACKPINK BRAZIL',
    handle: '@BLACKPINKBR',
    country: 'Brazil',
    followers: '643K',
    description: 'Brazilian BLACKPINK fanbase community',
    color: 'from-green-500 to-yellow-500',
  },
  {
    id: 'bp_usa',
    name: 'BLACKPINK USA',
    handle: '@BLACKPINKUSA',
    country: 'United States',
    followers: '1.8M',
    description: 'Official US fanbase for chart support',
    color: 'from-blue-600 to-red-600',
  },
];

interface BlinkHubPageProps {
  onSelectFanbase: (fanbaseId: string) => void;
}

export function BlinkHubPage({ onSelectFanbase }: BlinkHubPageProps) {
  return (
    <div className="h-full p-8 overflow-y-auto">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-black text-white text-center mb-4">
          BLINK HUB
        </h1>
        <p className="text-xl text-gray-300 text-center mb-12">
          Connect with BLACKPINK fanbases around the world
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {fanbases.map((fanbase) => (
            <div
              key={fanbase.id}
              className="group bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-3xl p-6 hover:border-pink-500/50 transition-all duration-300 hover:scale-105 cursor-pointer"
              onClick={() => onSelectFanbase(fanbase.id)}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 bg-gradient-to-br ${fanbase.color} rounded-full flex items-center justify-center`}>
                  <Users className="w-6 h-6 text-white" />
                </div>
                <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors duration-300" />
              </div>

              <h3 className="text-xl font-bold text-white mb-2">
                {fanbase.name}
              </h3>
              
              <p className="text-gray-400 text-sm mb-4">
                {fanbase.handle}
              </p>

              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-1">
                  <MapPin className="w-4 h-4 text-pink-400" />
                  <span className="text-gray-300 text-sm">{fanbase.country}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-400" />
                  <span className="text-gray-300 text-sm">{fanbase.followers}</span>
                </div>
              </div>

              <p className="text-gray-300 text-sm leading-relaxed">
                {fanbase.description}
              </p>

              <div className="mt-6 pt-4 border-t border-gray-700">
                <button className="w-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-semibold py-2 px-4 rounded-xl transition-all duration-300">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-16 bg-gradient-to-r from-pink-900/30 to-purple-900/30 backdrop-blur-sm rounded-3xl p-8">
          <h2 className="text-3xl font-bold text-white text-center mb-8">
            Global BLINK Community
          </h2>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-black text-pink-400 mb-2">15M+</div>
              <div className="text-gray-300">Total Followers</div>
            </div>
            <div>
              <div className="text-4xl font-black text-purple-400 mb-2">50+</div>
              <div className="text-gray-300">Countries</div>
            </div>
            <div>
              <div className="text-4xl font-black text-blue-400 mb-2">200+</div>
              <div className="text-gray-300">Fanbases</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
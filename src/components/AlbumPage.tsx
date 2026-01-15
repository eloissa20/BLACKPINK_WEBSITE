import React from 'react';
import { Globe, MapPin, CreditCard, Package } from 'lucide-react';
import { ContinentType } from '../App';

interface AlbumPageProps {
  onSelectContinent: (continent: ContinentType) => void;
}

export function AlbumPage({ onSelectContinent }: AlbumPageProps) {
  const continents = [
    {
      id: 'global' as ContinentType,
      title: 'GLOBAL',
      icon: Globe,
      description: 'Worldwide stores and platforms',
      gradient: 'from-blue-500 to-purple-600',
    },
    {
      id: 'korea' as ContinentType,
      title: 'KOREA',
      icon: MapPin,
      description: 'Korean charts and platforms',
      gradient: 'from-red-500 to-pink-600',
    },
    {
      id: 'usa' as ContinentType,
      title: 'USA',
      icon: MapPin,
      description: 'Billboard and US platforms',
      gradient: 'from-blue-600 to-red-600',
    },
    {
      id: 'uk' as ContinentType,
      title: 'UK',
      icon: MapPin,
      description: 'UK charts and platforms',
      gradient: 'from-indigo-600 to-purple-600',
    },
  ];

  return (
    <div className="h-full p-8 overflow-y-auto">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-black text-white text-center mb-4">
          ALBUM PURCHASING GUIDE
        </h1>
        <p className="text-xl text-gray-300 text-center mb-12">
          Choose your region to find official stores and purchasing guidelines
        </p>

        {/* Continent Selection */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {continents.map((continent) => {
            const IconComponent = continent.icon;
            return (
              <button
                key={continent.id}
                onClick={() => onSelectContinent(continent.id)}
                className={`group relative overflow-hidden bg-gradient-to-br ${continent.gradient} p-8 rounded-3xl transform hover:scale-105 transition-all duration-300 shadow-2xl`}
              >
                <div className="relative z-10 text-center">
                  <IconComponent className="w-12 h-12 text-white mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {continent.title}
                  </h3>
                  <p className="text-white/80 text-sm">
                    {continent.description}
                  </p>
                </div>
                <div className="absolute inset-0 bg-white/20 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </button>
            );
          })}
        </div>

        {/* Information Sections */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-pink-900/30 to-purple-900/30 backdrop-blur-sm border border-pink-500/30 rounded-3xl p-8">
            <div className="flex items-center space-x-3 mb-6">
              <CreditCard className="w-8 h-8 text-pink-400" />
              <h2 className="text-3xl font-bold text-white">Digital Purchasing</h2>
            </div>
            <div className="space-y-4 text-gray-300">
              <p className="text-lg">
                Digital purchases count towards various music charts and help support BLACKPINK directly.
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>Purchase from official digital stores</li>
                <li>Each account can buy multiple copies</li>
                <li>Digital sales count towards Billboard charts</li>
                <li>Instant delivery and no shipping costs</li>
                <li>Support global chart performance</li>
              </ul>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 backdrop-blur-sm border border-purple-500/30 rounded-3xl p-8">
            <div className="flex items-center space-x-3 mb-6">
              <Package className="w-8 h-8 text-purple-400" />
              <h2 className="text-3xl font-bold text-white">Physical Purchasing</h2>
            </div>
            <div className="space-y-4 text-gray-300">
              <p className="text-lg">
                Physical albums provide the full BLACKPINK experience with exclusive content and collectibles.
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>Official merchandise and photobooks</li>
                <li>Exclusive photocards and posters</li>
                <li>Limited edition variants available</li>
                <li>Support physical chart performance</li>
                <li>Collectible value for fans</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
import React from 'react';
import { Play, Eye, Calendar, Star } from 'lucide-react';

const mediaContent = [
  {
    id: 1,
    title: 'BLACKPINK WORLD TOUR [BORN PINK] IN CINEMAS',
    type: 'Concert Film',
    date: '2023-07-31',
    thumbnail: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=800',
    views: '50M+',
    rating: 4.9,
  },
  {
    id: 2,
    title: 'Shut Down (Official Music Video)',
    type: 'Music Video',
    date: '2022-09-16',
    thumbnail: 'https://images.pexels.com/photos/2108845/pexels-photo-2108845.jpeg?auto=compress&cs=tinysrgb&w=800',
    views: '800M+',
    rating: 4.8,
  },
  {
    id: 3,
    title: 'Pink Venom (Official Music Video)',
    type: 'Music Video',
    date: '2022-08-19',
    thumbnail: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=800',
    views: '900M+',
    rating: 4.9,
  },
  {
    id: 4,
    title: 'BLACKPINK Diaries',
    type: 'Documentary',
    date: '2023-01-15',
    thumbnail: 'https://images.pexels.com/photos/2108845/pexels-photo-2108845.jpeg?auto=compress&cs=tinysrgb&w=800',
    views: '25M+',
    rating: 4.7,
  },
];

export function MediasPage() {
  return (
    <div className="h-full p-8 overflow-y-auto">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-black text-white text-center mb-4">
          BLACKPINK MEDIA
        </h1>
        <p className="text-xl text-gray-300 text-center mb-12">
          Watch the latest videos, concerts, and exclusive content
        </p>

        {/* Featured Content */}
        <div className="mb-12">
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-pink-900 to-purple-900 p-8">
            <div className="relative z-10">
              <h2 className="text-4xl font-bold text-white mb-4">
                🎬 LATEST RELEASE
              </h2>
              <div className="flex items-center space-x-6">
                <img
                  src="https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=400"
                  alt="Featured"
                  className="w-32 h-32 rounded-2xl object-cover"
                />
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    WORLD TOUR [BORN PINK] FINALE
                  </h3>
                  <p className="text-gray-200 mb-4">
                    Experience the incredible finale of BLACKPINK's record-breaking world tour
                  </p>
                  <button className="bg-white text-black font-bold py-3 px-6 rounded-xl hover:bg-gray-200 transition-colors duration-300 flex items-center space-x-2">
                    <Play className="w-5 h-5" />
                    <span>Watch Now</span>
                  </button>
                </div>
              </div>
            </div>
            <div className="absolute inset-0 bg-black/20" />
          </div>
        </div>

        {/* Media Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mediaContent.map((media) => (
            <div
              key={media.id}
              className="group bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl overflow-hidden hover:border-pink-500/50 transition-all duration-300 hover:scale-105"
            >
              <div className="relative">
                <img
                  src={media.thumbnail}
                  alt={media.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button className="bg-pink-600 text-white p-4 rounded-full hover:bg-pink-500 transition-colors duration-300">
                    <Play className="w-6 h-6" />
                  </button>
                </div>
                <div className="absolute top-4 left-4 bg-black/70 text-white text-xs px-2 py-1 rounded">
                  {media.type}
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-lg font-bold text-white mb-2 line-clamp-2">
                  {media.title}
                </h3>
                
                <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{media.date}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Eye className="w-4 h-4" />
                    <span>{media.views}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-white font-semibold">{media.rating}</span>
                  </div>
                  <button className="text-pink-400 hover:text-pink-300 transition-colors duration-300 font-semibold">
                    Watch →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Categories */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            Browse by Category
          </h2>
          <div className="grid md:grid-cols-4 gap-4">
            {['Music Videos', 'Concerts', 'Documentaries', 'Behind The Scenes'].map((category) => (
              <button
                key={category}
                className="bg-gradient-to-br from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-bold py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105"
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
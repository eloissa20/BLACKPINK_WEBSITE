import React from 'react';
import { ArrowLeft, ExternalLink, CreditCard, Package } from 'lucide-react';
import { ContinentType } from '../App';

interface AlbumDetailsPageProps {
  continent: ContinentType;
  onBack: () => void;
}

export function AlbumDetailsPage({ continent, onBack }: AlbumDetailsPageProps) {
  const getStoresByContinent = (continent: ContinentType) => {
    const stores = {
      global: {
        title: 'Global Stores',
        digital: [
          { name: 'iTunes', url: 'https://music.apple.com/us/artist/blackpink/1252555207', description: 'Available worldwide' },
          { name: 'Spotify', url: 'https://open.spotify.com/artist/41MozSoPIsD1dJM0CLPjZF', description: 'Stream globally' },
          { name: 'Apple Music', url: 'https://music.apple.com/us/artist/blackpink/1252555207', description: 'Global streaming' },
          { name: 'Amazon Music', url: 'https://music.amazon.com/artists/B01LWZY8S7/blackpink', description: 'Digital downloads' },
          { name: 'YouTube Music', url: 'https://music.youtube.com/channel/UCOmHUn--16B90oW2L6FRR3A', description: 'Global streaming' },
          { name: 'Deezer', url: 'https://www.deezer.com/en/artist/9635624', description: 'Worldwide availability' },
        ],
        physical: [
          { name: 'Amazon', url: 'https://www.amazon.com/s?k=blackpink+album', description: 'Worldwide shipping' },
          { name: 'YG Shop', url: 'https://shop.ygfamily.com/', description: 'Official merchandise' },
          { name: 'Weverse Shop', url: 'https://weverse.io/blackpink/media', description: 'Fan platform store' },
          { name: 'Target', url: 'https://www.target.com/s?searchTerm=blackpink', description: 'US retailer with global shipping' },
          { name: 'HMV', url: 'https://store.hmv.com/', description: 'UK-based with international shipping' },
        ],
      },
      korea: {
        title: 'Korean Stores',
        digital: [
          { name: 'Melon', url: 'https://www.melon.com/artist/timeline.htm?artistId=261143', description: 'Top Korean streaming platform' },
          { name: 'Genie', url: 'https://www.genie.co.kr/detail/artistInfo?xxnm=80216', description: 'Major Korean music service' },
          { name: 'Bugs', url: 'https://music.bugs.co.kr/artist/80038', description: 'Korean digital music store' },
          { name: 'Flo', url: 'https://www.music-flo.com/detail/artist/arzayaer/albumtrack', description: 'High-quality Korean streaming' },
          { name: 'Vibe', url: 'https://vibe.naver.com/artist/15169', description: 'Naver music platform' },
        ],
        physical: [
          { name: 'Hanteo Family', url: 'https://www.hanteochart.com/', description: 'Official Hanteo counting' },
          { name: 'Circle Chart Stores', url: 'https://circlechart.kr/', description: 'Circle Chart certified' },
          { name: 'Synnara Record', url: 'https://www.synnara.co.kr/', description: 'Major Korean retailer' },
          { name: 'Hot Tracks', url: 'https://www.hottracks.co.kr/', description: 'Popular Korean music store' },
          { name: 'Yes24', url: 'http://www.yes24.com/', description: 'Korean online retailer' },
        ],
      },
      usa: {
        title: 'USA Stores',
        digital: [
          { name: 'iTunes Store', url: 'https://music.apple.com/us/artist/blackpink/1252555207', description: 'Counts toward Billboard' },
          { name: 'Amazon Music', url: 'https://music.amazon.com/artists/B01LWZY8S7/blackpink', description: 'Billboard certified' },
          { name: 'Google Play', url: 'https://play.google.com/store/music/artist/Blackpink?id=Aoxq3iz645k552sgktxhzxb6qne', description: 'Digital downloads' },
          { name: '7digital', url: 'https://us.7digital.com/', description: 'High-quality downloads' },
          { name: 'Bandcamp', url: 'https://bandcamp.com/', description: 'Independent platform' },
        ],
        physical: [
          { name: 'Target', url: 'https://www.target.com/s?searchTerm=blackpink', description: 'Major US retailer' },
          { name: 'Walmart', url: 'https://www.walmart.com/search?query=blackpink%20album', description: 'Nationwide availability' },
          { name: 'Barnes & Noble', url: 'https://www.barnesandnoble.com/', description: 'Bookstore chain' },
          { name: 'Best Buy', url: 'https://www.bestbuy.com/', description: 'Electronics retailer' },
          { name: 'Independent Record Stores', url: 'https://www.recordstoreday.com/Stores', description: 'Support local music stores' },
        ],
      },
      uk: {
        title: 'UK Stores',
        digital: [
          { name: 'iTunes UK', url: 'https://music.apple.com/gb/artist/blackpink/1252555207', description: 'Official UK charts counting' },
          { name: 'Amazon Music UK', url: 'https://music.amazon.co.uk/', description: 'UK chart eligible' },
          { name: 'Google Play UK', url: 'https://play.google.com/store/music/', description: 'Digital downloads' },
          { name: '7digital UK', url: 'https://uk.7digital.com/', description: 'UK-based digital store' },
          { name: 'Spotify UK', url: 'https://open.spotify.com/artist/41MozSoPIsD1dJM0CLPjZF', description: 'UK streaming counts' },
        ],
        physical: [
          { name: 'HMV', url: 'https://store.hmv.com/', description: 'UK music retailer' },
          { name: 'Amazon UK', url: 'https://www.amazon.co.uk/', description: 'UK shipping' },
          { name: 'Zavvi', url: 'https://www.zavvi.com/', description: 'Entertainment retailer' },
          { name: 'Rough Trade', url: 'https://www.roughtrade.com/', description: 'Independent record shop' },
          { name: 'Independent UK Stores', url: 'https://www.recordshopday.co.uk/', description: 'Local record shops' },
        ],
      },
    };
    return stores[continent];
  };

  const storeData = getStoresByContinent(continent);

  return (
    <div className="h-full p-8 overflow-y-auto">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center mb-8">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-pink-400 hover:text-pink-300 transition-colors duration-300"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Albums</span>
          </button>
        </div>

        <h1 className="text-5xl font-black text-white text-center mb-12">
          {storeData.title.toUpperCase()}
        </h1>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Digital Stores */}
          <div className="bg-gradient-to-br from-pink-900/30 to-purple-900/30 backdrop-blur-sm border border-pink-500/30 rounded-3xl p-8">
            <div className="flex items-center space-x-3 mb-8">
              <CreditCard className="w-8 h-8 text-pink-400" />
              <h2 className="text-3xl font-bold text-white">Digital Stores</h2>
            </div>

            <div className="space-y-4">
              {storeData.digital.map((store, index) => (
                <a
                  key={index}
                  href={store.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-gray-900/50 rounded-2xl p-6 hover:bg-gray-800/50 transition-all duration-300 group"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">{store.name}</h3>
                      <p className="text-gray-300">{store.description}</p>
                    </div>
                    <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-pink-400 transition-colors duration-300" />
                  </div>
                </a>
              ))}
            </div>

            <div className="mt-8 p-6 bg-gray-900/30 rounded-2xl">
              <h3 className="text-lg font-bold text-pink-400 mb-4">💡 Digital Buying Tips</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-300 text-sm">
                <li>Buy from official stores to ensure chart counting</li>
                <li>Each account can purchase multiple copies</li>
                <li>Digital sales count immediately toward charts</li>
                <li>Support different formats (MP3, FLAC, etc.)</li>
              </ul>
            </div>
          </div>

          {/* Physical Stores */}
          <div className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 backdrop-blur-sm border border-purple-500/30 rounded-3xl p-8">
            <div className="flex items-center space-x-3 mb-8">
              <Package className="w-8 h-8 text-purple-400" />
              <h2 className="text-3xl font-bold text-white">Physical Stores</h2>
            </div>

            <div className="space-y-4">
              {storeData.physical.map((store, index) => (
                <a
                  key={index}
                  href={store.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-gray-900/50 rounded-2xl p-6 hover:bg-gray-800/50 transition-all duration-300 group"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">{store.name}</h3>
                      <p className="text-gray-300">{store.description}</p>
                    </div>
                    <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-purple-400 transition-colors duration-300" />
                  </div>
                </a>
              ))}
            </div>

            <div className="mt-8 p-6 bg-gray-900/30 rounded-2xl">
              <h3 className="text-lg font-bold text-purple-400 mb-4">📦 Physical Buying Tips</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-300 text-sm">
                <li>Buy from certified retailers for chart counting</li>
                <li>Check for exclusive editions and variants</li>
                <li>Physical sales count toward first-week sales</li>
                <li>Support includes photocards and special items</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Chart Information */}
        <div className="mt-12 bg-gradient-to-r from-pink-900/30 to-purple-900/30 backdrop-blur-sm rounded-3xl p-8">
          <h2 className="text-3xl font-bold text-white text-center mb-8">
            Chart Counting Information
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-pink-400 mb-2">
                {continent === 'usa' ? 'Billboard' : continent === 'korea' ? 'Hanteo/Circle' : continent === 'uk' ? 'Official Charts' : 'Various Charts'}
              </div>
              <p className="text-gray-300">Primary chart system</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400 mb-2">1st Week</div>
              <p className="text-gray-300">Critical sales period</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400 mb-2">Certified</div>
              <p className="text-gray-300">Official counting stores</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
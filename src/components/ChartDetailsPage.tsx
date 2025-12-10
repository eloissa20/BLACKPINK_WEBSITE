import { ArrowLeft, BarChart3, TrendingUp, Award } from 'lucide-react';
import { ContinentType } from '../App';

interface ChartDetailsPageProps {
  region: ContinentType;
  onBack: () => void;
}

export function ChartDetailsPage({ region, onBack }: ChartDetailsPageProps) {
  const getChartsByRegion = (region: ContinentType) => {
    const charts = {
      global: [
        { name: 'Spotify Global Charts', description: 'Worldwide streaming rankings', icon: '🌍' },
        { name: 'Apple Music Global', description: 'Global Apple Music charts', icon: '🍎' },
        { name: 'YouTube Global Music', description: 'YouTube music video charts', icon: '📺' },
        { name: 'Rolling Stone Global', description: 'Global music consumption', icon: '🎵' },
      ],
      korea: [
        { name: 'Melon Chart', description: 'Real-time streaming chart', icon: '🍈' },
        { name: 'Circle Chart (Gaon)', description: 'Official Korean music chart', icon: '⭕' },
        { name: 'Hanteo Chart', description: 'Real-time physical sales', icon: '📊' },
        { name: 'Music Bank', description: 'KBS music show chart', icon: '🏆' },
        { name: 'Inkigayo', description: 'SBS music show chart', icon: '🎤' },
        { name: 'Show Champion', description: 'MBC music show chart', icon: '👑' },
      ],
      usa: [
        { name: 'Billboard Hot 100', description: 'Premier US singles chart', icon: '🔥' },
        { name: 'Billboard 200', description: 'Album sales and streaming', icon: '💿' },
        { name: 'Billboard Artist 100', description: 'Artist popularity ranking', icon: '⭐' },
        { name: 'Billboard Global 200', description: 'Global songs chart', icon: '🌎' },
        { name: 'Rolling Stone Top 100', description: 'Alternative US chart', icon: '🪨' },
      ],
      uk: [
        { name: 'Official Singles Chart', description: 'UK singles chart', icon: '🇬🇧' },
        { name: 'Official Albums Chart', description: 'UK albums chart', icon: '💽' },
        { name: 'Official Trending Chart', description: 'Fast-rising tracks', icon: '📈' },
        { name: 'BBC Radio 1 Chart', description: 'Radio play chart', icon: '📻' },
      ],
    };
    return charts[region];
  };

  const chartData = getChartsByRegion(region);
  const regionName = region.charAt(0).toUpperCase() + region.slice(1);

  return (
    <div className="h-full p-8 overflow-y-auto">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center mb-8">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-pink-400 hover:text-pink-300 transition-colors duration-300"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Guidelines</span>
          </button>
        </div>

        <h1 className="text-5xl font-black text-white text-center mb-4">
          {regionName.toUpperCase()} CHARTS
        </h1>
        <p className="text-xl text-gray-300 text-center mb-12">
          Music charts and performance tracking for {regionName}
        </p>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {chartData.map((chart, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-3xl p-8 hover:border-pink-500/50 transition-all duration-300 hover:scale-105"
            >
              <div className="flex items-center space-x-4 mb-6">
                <div className="text-4xl">{chart.icon}</div>
                <div>
                  <h3 className="text-2xl font-bold text-white">{chart.name}</h3>
                  <p className="text-gray-400">{chart.description}</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-300">Update Frequency:</span>
                  <span className="text-pink-400 font-semibold">
                    {chart.name.includes('Real-time') ? 'Real-time' : 'Weekly'}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-300">Chart Type:</span>
                  <span className="text-purple-400 font-semibold">
                    {chart.name.includes('Album') || chart.name.includes('200') ? 'Albums' : 'Singles'}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-300">Importance:</span>
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Award key={i} className={`w-3 h-3 ${i < 4 ? 'text-yellow-400' : 'text-gray-600'}`} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Chart Strategies */}
        <div className="bg-gradient-to-r from-pink-900/30 to-purple-900/30 backdrop-blur-sm rounded-3xl p-8">
          <div className="flex items-center space-x-3 mb-8">
            <TrendingUp className="w-8 h-8 text-pink-400" />
            <h2 className="text-3xl font-bold text-white">Chart Success Strategies</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-900/50 rounded-2xl p-6">
              <BarChart3 className="w-8 h-8 text-pink-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-4">Streaming Strategy</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-300 text-sm">
                <li>Stream consistently across all platforms</li>
                <li>Use different devices and accounts</li>
                <li>Focus on the first 24-48 hours</li>
                <li>Create playlists with BLACKPINK songs</li>
              </ul>
            </div>

            <div className="bg-gray-900/50 rounded-2xl p-6">
              <Award className="w-8 h-8 text-purple-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-4">Purchase Strategy</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-300 text-sm">
                <li>Buy from certified chart stores</li>
                <li>Purchase multiple formats if possible</li>
                <li>Coordinate with fanbase for timing</li>
                <li>Support both digital and physical sales</li>
              </ul>
            </div>

            <div className="bg-gray-900/50 rounded-2xl p-6">
              <TrendingUp className="w-8 h-8 text-blue-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-4">Long-term Support</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-300 text-sm">
                <li>Maintain consistent streaming habits</li>
                <li>Share music with friends and family</li>
                <li>Support radio play and requests</li>
                <li>Engage with official content</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
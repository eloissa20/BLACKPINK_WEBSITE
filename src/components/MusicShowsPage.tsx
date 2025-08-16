import React, { useState } from 'react';
import { Calendar, Clock, Smartphone, Trophy, ExternalLink, ArrowLeft } from 'lucide-react';

interface MusicShow {
  id: string;
  name: string;
  network: string;
  airTime: string;
  votingApp: string;
  appUrl: string;
  preVotingStart: string;
  preVotingEnd: string;
  liveVotingTime: string;
  description: string;
  color: string;
}

const musicShows: MusicShow[] = [
  {
    id: 'mcountdown',
    name: 'M COUNTDOWN',
    network: 'Mnet',
    airTime: 'Thursday 6:00 PM KST',
    votingApp: 'Mnet Plus',
    appUrl: 'https://www.mnetplus.world/',
    preVotingStart: '7 days before broadcast',
    preVotingEnd: '1 hour before broadcast',
    liveVotingTime: 'During live broadcast',
    description: 'Premier K-pop music show with global voting system',
    color: 'from-blue-500 to-purple-600',
  },
  {
    id: 'inkigayo',
    name: 'INKIGAYO',
    network: 'SBS',
    airTime: 'Sunday 3:40 PM KST',
    votingApp: 'SBS Mobile App',
    appUrl: 'https://www.sbs.co.kr/',
    preVotingStart: '6 days before broadcast',
    preVotingEnd: '2 hours before broadcast',
    liveVotingTime: 'During nominee announcement',
    description: 'Popular Sunday music show with strong digital focus',
    color: 'from-red-500 to-pink-600',
  },
  {
    id: 'musiccore',
    name: 'MUSIC CORE',
    network: 'MBC',
    airTime: 'Saturday 3:30 PM KST',
    votingApp: 'MBC Mobile App',
    appUrl: 'https://www.imbc.com/',
    preVotingStart: '5 days before broadcast',
    preVotingEnd: '3 hours before broadcast',
    liveVotingTime: 'During show (limited time)',
    description: 'Long-running music show with traditional scoring',
    color: 'from-green-500 to-blue-600',
  },
  {
    id: 'musicbank',
    name: 'MUSIC BANK',
    network: 'KBS',
    airTime: 'Friday 5:00 PM KST',
    votingApp: 'KBS Mobile App',
    appUrl: 'https://www.kbs.co.kr/',
    preVotingStart: '7 days before broadcast',
    preVotingEnd: '1 hour before broadcast',
    liveVotingTime: 'During live show',
    description: 'Prestigious weekly music program with K-Chart system',
    color: 'from-yellow-500 to-orange-600',
  },
  {
    id: 'showchampion',
    name: 'SHOW CHAMPION',
    network: 'MBC M',
    airTime: 'Wednesday 6:00 PM KST',
    votingApp: 'Show Champion App',
    appUrl: 'https://www.mbcm.co.kr/',
    preVotingStart: '6 days before broadcast',
    preVotingEnd: '2 hours before broadcast',
    liveVotingTime: 'During champion selection',
    description: 'Mid-week music show with active fan participation',
    color: 'from-purple-500 to-pink-600',
  },
];

export function MusicShowsPage() {
  const [selectedShow, setSelectedShow] = useState<MusicShow | null>(null);

  if (selectedShow) {
    return (
      <div className="h-full p-8 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center mb-8">
            <button
              onClick={() => setSelectedShow(null)}
              className="flex items-center space-x-2 text-pink-400 hover:text-pink-300 transition-colors duration-300"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Music Shows</span>
            </button>
          </div>

          <div className={`bg-gradient-to-br ${selectedShow.color} rounded-3xl p-8 mb-8`}>
            <h1 className="text-4xl font-black text-white text-center mb-4">
              {selectedShow.name}
            </h1>
            <p className="text-white/90 text-center text-lg mb-6">
              {selectedShow.network} • {selectedShow.airTime}
            </p>
            <p className="text-white/80 text-center">
              {selectedShow.description}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Voting Schedule */}
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-3xl p-8">
              <div className="flex items-center space-x-3 mb-6">
                <Calendar className="w-8 h-8 text-pink-400" />
                <h2 className="text-2xl font-bold text-white">Voting Schedule</h2>
              </div>
              
              <div className="space-y-6">
                <div className="bg-gray-800/50 rounded-2xl p-4">
                  <h3 className="text-lg font-bold text-pink-400 mb-2">Pre-Voting Period</h3>
                  <div className="space-y-2 text-gray-300">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-green-400" />
                      <span>Starts: {selectedShow.preVotingStart}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-red-400" />
                      <span>Ends: {selectedShow.preVotingEnd}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-800/50 rounded-2xl p-4">
                  <h3 className="text-lg font-bold text-purple-400 mb-2">Live Voting</h3>
                  <div className="flex items-center space-x-2 text-gray-300">
                    <Clock className="w-4 h-4 text-yellow-400" />
                    <span>{selectedShow.liveVotingTime}</span>
                  </div>
                </div>

                <div className="bg-gray-800/50 rounded-2xl p-4">
                  <h3 className="text-lg font-bold text-blue-400 mb-2">Broadcast Time</h3>
                  <div className="flex items-center space-x-2 text-gray-300">
                    <Trophy className="w-4 h-4 text-yellow-400" />
                    <span>{selectedShow.airTime}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Voting App */}
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-3xl p-8">
              <div className="flex items-center space-x-3 mb-6">
                <Smartphone className="w-8 h-8 text-purple-400" />
                <h2 className="text-2xl font-bold text-white">Voting App</h2>
              </div>

              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-pink-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Smartphone className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{selectedShow.votingApp}</h3>
                <p className="text-gray-400 mb-4">Official voting application</p>
                
                <a
                  href={selectedShow.appUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300"
                >
                  <span>Download App</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>

              <div className="bg-gray-800/30 rounded-2xl p-4">
                <h4 className="text-lg font-bold text-yellow-400 mb-3">📱 Voting Tips</h4>
                <ul className="list-disc list-inside space-y-2 text-gray-300 text-sm">
                  <li>Download the official app before voting opens</li>
                  <li>Create account and verify phone number</li>
                  <li>Vote daily during pre-voting period</li>
                  <li>Set reminders for live voting times</li>
                  <li>Share voting reminders with other BLINKs</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Voting Strategy */}
          <div className="mt-8 bg-gradient-to-r from-pink-900/30 to-purple-900/30 backdrop-blur-sm rounded-3xl p-8">
            <h2 className="text-3xl font-bold text-white text-center mb-8">
              Voting Strategy for BLACKPINK
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gray-900/50 rounded-2xl p-6">
                <Trophy className="w-8 h-8 text-yellow-400 mb-4" />
                <h3 className="text-xl font-bold text-white mb-4">Pre-Voting</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-300 text-sm">
                  <li>Vote every day during the period</li>
                  <li>Use multiple devices if allowed</li>
                  <li>Coordinate with fanbase timing</li>
                  <li>Share voting links with friends</li>
                </ul>
              </div>

              <div className="bg-gray-900/50 rounded-2xl p-6">
                <Clock className="w-8 h-8 text-pink-400 mb-4" />
                <h3 className="text-xl font-bold text-white mb-4">Live Voting</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-300 text-sm">
                  <li>Be ready before the show starts</li>
                  <li>Vote immediately when it opens</li>
                  <li>Watch for voting announcements</li>
                  <li>Stay active during entire broadcast</li>
                </ul>
              </div>

              <div className="bg-gray-900/50 rounded-2xl p-6">
                <Smartphone className="w-8 h-8 text-purple-400 mb-4" />
                <h3 className="text-xl font-bold text-white mb-4">App Management</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-300 text-sm">
                  <li>Keep apps updated regularly</li>
                  <li>Enable push notifications</li>
                  <li>Clear cache if voting fails</li>
                  <li>Have backup devices ready</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full p-8 overflow-y-auto">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-black text-white text-center mb-4">
          KOREAN MUSIC SHOWS
        </h1>
        <p className="text-xl text-gray-300 text-center mb-12">
          Vote for BLACKPINK on Korean music shows and help them win!
        </p>

        {/* Music Shows Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {musicShows.map((show) => (
            <div
              key={show.id}
              className="group bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-3xl overflow-hidden hover:border-pink-500/50 transition-all duration-300 hover:scale-105 cursor-pointer"
              onClick={() => setSelectedShow(show)}
            >
              <div className={`h-32 bg-gradient-to-br ${show.color} flex items-center justify-center`}>
                <Trophy className="w-12 h-12 text-white" />
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">
                  {show.name}
                </h3>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center space-x-2 text-gray-400 text-sm">
                    <Calendar className="w-4 h-4" />
                    <span>{show.network}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-400 text-sm">
                    <Clock className="w-4 h-4" />
                    <span>{show.airTime}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-400 text-sm">
                    <Smartphone className="w-4 h-4" />
                    <span>{show.votingApp}</span>
                  </div>
                </div>

                <p className="text-gray-300 text-sm leading-relaxed mb-4">
                  {show.description}
                </p>

                <button className="w-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-semibold py-2 px-4 rounded-xl transition-all duration-300">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* General Voting Tips */}
        <div className="bg-gradient-to-r from-pink-900/30 to-purple-900/30 backdrop-blur-sm rounded-3xl p-8">
          <h2 className="text-3xl font-bold text-white text-center mb-8">
            General Voting Guidelines
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-pink-400 mb-4">📱 Before Voting</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-300">
                <li>Download all official music show apps</li>
                <li>Create accounts and verify phone numbers</li>
                <li>Follow fanbase accounts for voting reminders</li>
                <li>Set up notifications for voting periods</li>
                <li>Prepare multiple devices if allowed</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold text-purple-400 mb-4">🗳️ During Voting</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-300">
                <li>Vote consistently during pre-voting periods</li>
                <li>Be ready for live voting during broadcasts</li>
                <li>Coordinate with international fanbase timing</li>
                <li>Share voting links and reminders</li>
                <li>Stay updated on voting rule changes</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
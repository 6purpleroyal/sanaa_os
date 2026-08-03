import React, { useState } from 'react';
import {
  Trophy,
  Medal,
  Tv,
  Flame,
  Search,
  CheckCircle2,
  Filter,
  Sparkles,
  ExternalLink,
  Volume2,
  Award,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Performance, Award as AwardType } from '../types';

interface LiveDashboardProps {
  performances: Performance[];
  awards: AwardType[];
}

export const LiveDashboard: React.FC<LiveDashboardProps> = ({
  performances,
  awards,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedTier, setSelectedTier] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  const filteredPerformances = performances.filter((p) => {
    const matchesCategory = selectedCategory === 'All' || p.categoryName.includes(selectedCategory);
    const matchesTier = selectedTier === 'All' || p.awardType === selectedTier;
    const matchesSearch =
      p.schoolName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.countyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.pieceTitle.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesTier && matchesSearch;
  });

  return (
    <section className="py-10 px-4 sm:px-6 lg:px-8 bg-[#050505] text-white min-h-screen border-b border-white/10">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Live Ticker Banner */}
        <div className="bg-[#09090b] border border-white/15 text-white font-mono text-xs py-2 px-4 rounded-md flex items-center justify-between shadow-lg overflow-hidden">
          <div className="flex items-center gap-2 font-bold uppercase tracking-widest shrink-0 text-amber-400 text-[10px]">
            <Flame className="w-3.5 h-3.5 text-amber-400 animate-bounce" />
            <span>LIVE RESULT TICKER:</span>
          </div>
          <div className="animate-marquee whitespace-nowrap text-zinc-300 overflow-hidden text-ellipsis text-[11px]">
            🥇 Kakamega High School (96.0 pts - Gold) &bull; 🥇 Maseno School Choir (94.5 pts - Gold) &bull; 🥈 Starehe Boys Centre (92.8 pts - Silver) &bull; 🥉 Moi Girls Eldoret (91.2 pts - Bronze)
          </div>
          <button
            onClick={triggerConfetti}
            className="shrink-0 bg-white text-black px-2.5 py-0.5 rounded font-mono text-[10px] font-bold uppercase tracking-wider hover:bg-zinc-200 transition-colors"
          >
            🎉 Celebrate
          </button>
        </div>

        {/* Live Stage Monitor Box */}
        <div className="bg-[#09090b] border border-white/15 rounded-xl p-6 shadow-2xl relative overflow-hidden">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded bg-white/10 text-white border border-white/15 font-mono">
                <Tv className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <div className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-[0.2em] flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                  <span>ON STAGE NOW &bull; KABARAK AUDITORIUM</span>
                </div>
                <h3 className="text-2xl font-serif text-white">
                  Maseno School Choir — Zilizopendwa Gold Showcase
                </h3>
              </div>
            </div>

            <a
              href="https://youtube.com"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 bg-white text-black font-mono font-bold text-[10px] uppercase tracking-[0.15em] px-4 py-2.5 rounded-md hover:bg-zinc-200 transition-all shadow-md"
            >
              <Volume2 className="w-4 h-4 text-black" />
              <span>Watch Livestream Feed</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 font-mono text-xs">
            <div className="bg-[#050505] p-3 rounded-lg border border-white/10">
              <div className="text-white/40 uppercase text-[9px] tracking-wider">Conductor</div>
              <div className="font-bold text-white text-sm font-serif">Mwalimu Benedict Odhiambo</div>
            </div>
            <div className="bg-[#050505] p-3 rounded-lg border border-white/10">
              <div className="text-white/40 uppercase text-[9px] tracking-wider">County Origin</div>
              <div className="font-bold text-amber-300 text-sm">Kisumu County (Nyanza)</div>
            </div>
            <div className="bg-[#050505] p-3 rounded-lg border border-white/10">
              <div className="text-white/40 uppercase text-[9px] tracking-wider">Current Live Score</div>
              <div className="font-bold text-amber-400 text-sm">94.5 / 100 (Official Gold)</div>
            </div>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-[#09090b] p-4 rounded-xl border border-white/10 font-mono">
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            <span className="text-[10px] uppercase font-bold text-white/50 tracking-wider flex items-center gap-1 mr-2">
              <Filter className="w-3.5 h-3.5 text-amber-400" />
              <span>Filter:</span>
            </span>

            {['All', 'Zilizopendwa', 'Folk Songs', 'Western Classical', 'Instrumental', 'Poetry'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-md text-[11px] uppercase tracking-wider transition-all ${
                  selectedCategory === cat
                    ? 'bg-white text-black font-bold shadow'
                    : 'bg-[#050505] text-white/70 border border-white/10 hover:bg-white/10 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto">
            {['All', 'Gold', 'Silver', 'Bronze'].map((tier) => (
              <button
                key={tier}
                onClick={() => setSelectedTier(tier)}
                className={`px-3 py-1.5 rounded-md text-[11px] uppercase tracking-wider transition-all ${
                  selectedTier === tier
                    ? 'bg-amber-400 text-black font-bold'
                    : 'bg-[#050505] text-white/60 border border-white/10 hover:bg-white/10'
                }`}
              >
                {tier === 'All' ? 'All Medals' : `${tier} Medal`}
              </button>
            ))}

            <div className="relative flex-1 max-w-xs">
              <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-white/40" />
              <input
                type="text"
                placeholder="Search leaderboard..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 text-xs font-mono rounded-md bg-[#050505] border border-white/15 text-white placeholder-white/30 focus:outline-none focus:border-white/40"
              />
            </div>
          </div>
        </div>

        {/* Official Leaderboard Cards */}
        <div className="space-y-4">
          <div className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-amber-400 flex items-center gap-1.5">
            <Trophy className="w-3.5 h-3.5" />
            <span>Official Leaderboard Standings ({filteredPerformances.length} Items)</span>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {filteredPerformances.map((perf, index) => {
              const isGold = perf.awardType === 'Gold';
              const isSilver = perf.awardType === 'Silver';
              const isBronze = perf.awardType === 'Bronze';

              return (
                <div
                  key={perf.id}
                  className={`p-5 rounded-xl border transition-all ${
                    isGold
                      ? 'bg-[#0c0c0f] border-amber-400/40 shadow-xl'
                      : 'bg-[#09090b] border-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    {/* Left Rank & School Info */}
                    <div className="flex items-start gap-4">
                      <div
                        className={`w-11 h-11 rounded-md flex items-center justify-center font-mono font-bold text-base shrink-0 ${
                          isGold
                            ? 'bg-white text-black shadow-lg'
                            : isSilver
                            ? 'bg-zinc-300 text-black'
                            : isBronze
                            ? 'bg-amber-700 text-white'
                            : 'bg-[#121215] text-white/40 border border-white/10'
                        }`}
                      >
                        #{perf.rank || index + 1}
                      </div>

                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h4 className="text-base font-serif font-bold text-white">{perf.schoolName}</h4>
                          <span className="text-[9px] font-mono bg-white/10 text-amber-300 px-2 py-0.5 rounded border border-white/10 uppercase tracking-widest">
                            {perf.countyName} County
                          </span>
                          {perf.awardType && (
                            <span
                              className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                                isGold
                                  ? 'bg-amber-400 text-black'
                                  : isSilver
                                  ? 'bg-zinc-200 text-black'
                                  : 'bg-amber-800 text-white'
                              }`}
                            >
                              {perf.awardType} Medal
                            </span>
                          )}
                        </div>

                        <div className="text-xs text-zinc-300 font-sans">
                          Piece: <span className="text-amber-200 italic font-serif">"{perf.pieceTitle}"</span> &bull; Conductor: {perf.conductor}
                        </div>

                        <div className="text-[11px] font-mono text-white/50">
                          Category: <span className="text-zinc-300">{perf.categoryName}</span> ({perf.venueName})
                        </div>
                      </div>
                    </div>

                    {/* Right Score Badge */}
                    <div className="text-right flex items-center md:flex-col justify-between md:justify-center border-t md:border-t-0 border-white/10 pt-3 md:pt-0">
                      <div className="text-[9px] text-white/40 uppercase font-mono tracking-widest">Final Score</div>
                      <div className="text-2xl font-bold font-mono text-amber-400">
                        {perf.finalScore ? perf.finalScore.toFixed(1) : 'Pending'}
                        <span className="text-xs text-white/40 font-normal"> / 100</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

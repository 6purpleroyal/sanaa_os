import React, { useState } from 'react';
import {
  Archive,
  Search,
  Calendar,
  Filter,
  Trophy,
  Music,
  School,
  MapPin,
  ExternalLink,
  Tag,
  Clock,
} from 'lucide-react';
import { Performance, MediaItem } from '../types';

interface DigitalArchiveProps {
  performances: Performance[];
  mediaItems: MediaItem[];
}

export const DigitalArchive: React.FC<DigitalArchiveProps> = ({
  performances,
  mediaItems,
}) => {
  const [selectedYear, setSelectedYear] = useState<number>(2026);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');

  const availableYears = [2027, 2026, 2025, 2024, 2023, 2020, 2015, 2010, 2005, 2000, 1995, 1990];

  const filteredPerformances = performances.filter((p) => {
    const matchesYear = p.festivalYear === selectedYear;
    const matchesSearch =
      p.schoolName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.categoryName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.countyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.pieceTitle.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = filterCategory === 'All' || p.categoryName.includes(filterCategory);
    return matchesYear && matchesSearch && matchesCat;
  });

  const filteredMedia = mediaItems.filter((m) => {
    const matchesYear = m.festivalYear === selectedYear;
    const matchesSearch =
      m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesYear && matchesSearch;
  });

  return (
    <section className="py-10 px-4 sm:px-6 lg:px-8 bg-[#050505] text-white min-h-screen border-b border-white/10">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <div className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-amber-400 flex items-center gap-1.5">
              <Archive className="w-3.5 h-3.5 text-amber-400" />
              <span>Historical Performance Vault (1990 - 2027)</span>
            </div>
            <h2 className="text-3xl font-serif text-white tracking-tight mt-1">
              National Music Festival Digital Archive
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 max-w-2xl mt-1 font-sans">
              Preserving decades of Kenyan youth vocal recordings, traditional dances, poetry recitals, and gold medal winning scorecards.
            </p>
          </div>

          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-white/40" />
            <input
              type="text"
              placeholder="Search school, county, category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs rounded-md bg-[#09090b] border border-white/15 text-white placeholder-white/30 focus:outline-none focus:border-white/40 font-mono"
            />
          </div>
        </div>

        {/* Timeline Year Slider Bar */}
        <div className="space-y-2">
          <div className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-[0.2em] flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" />
            <span>Select Festival Year Edition:</span>
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin font-mono text-xs">
            {availableYears.map((yr) => (
              <button
                key={yr}
                onClick={() => setSelectedYear(yr)}
                className={`px-3.5 py-1.5 rounded-md font-bold transition-all whitespace-nowrap ${
                  selectedYear === yr
                    ? 'bg-white text-black shadow-md scale-105'
                    : 'bg-[#09090b] text-white/70 border border-white/10 hover:bg-white/10 hover:text-white'
                }`}
              >
                {yr} {yr === 2026 ? '(100th Centennial)' : ''}
              </button>
            ))}
          </div>
        </div>

        {/* Results Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 font-sans">
          {/* Main Performances Archive Column */}
          <div className="lg:col-span-8 space-y-4">
            <div className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-white/50 flex items-center justify-between border-b border-white/10 pb-2">
              <span>Performance Master Records ({filteredPerformances.length})</span>
              <span className="text-amber-400">Year {selectedYear} Archive</span>
            </div>

            {filteredPerformances.length === 0 ? (
              <div className="bg-[#09090b] p-8 rounded-xl border border-white/10 text-center space-y-2 text-white/50 font-mono">
                <Clock className="w-8 h-8 text-amber-400 mx-auto" />
                <div className="font-bold text-sm text-white">No items found for {selectedYear}</div>
                <p className="text-xs max-w-sm mx-auto text-zinc-400">
                  Try switching to 2026, 2025, or 2024 to view fully indexed gold medal scorecards.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredPerformances.map((perf) => (
                  <div
                    key={perf.id}
                    className="p-4 rounded-xl bg-[#09090b] border border-white/10 hover:border-white/20 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-white font-mono">{perf.schoolName}</span>
                        <span className="text-[9px] bg-white/10 text-amber-300 border border-white/10 px-2 py-0.5 rounded font-mono uppercase">
                          {perf.countyName} County
                        </span>
                      </div>
                      <div className="text-xs text-amber-300 italic font-serif">"{perf.pieceTitle}"</div>
                      <div className="text-[11px] text-zinc-400">
                        {perf.categoryName} &bull; Conductor: {perf.conductor}
                      </div>
                    </div>

                    <div className="text-right shrink-0 font-mono">
                      <div className="text-2xl font-bold text-amber-400">
                        {perf.finalScore ? `${perf.finalScore.toFixed(1)} pts` : 'Scored'}
                      </div>
                      <span className="text-[10px] text-white/50 uppercase font-bold tracking-wider">
                        {perf.awardType || 'Archived Entry'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Media & Recordings Sidebar Column */}
          <div className="lg:col-span-4 space-y-4">
            <div className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-white/50 border-b border-white/10 pb-2">
              Media & Photo Vault ({filteredMedia.length})
            </div>

            <div className="space-y-3">
              {filteredMedia.map((med) => (
                <div
                  key={med.id}
                  className="bg-[#09090b] rounded-xl overflow-hidden border border-white/10 p-3 space-y-2 hover:border-white/20 transition-all"
                >
                  <div className="h-32 rounded-lg overflow-hidden relative border border-white/10">
                    <img
                      src={med.thumbnailUrl || med.url}
                      alt={med.title}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-2 left-2 bg-[#050505]/90 text-amber-300 text-[9px] px-2 py-0.5 rounded font-mono uppercase border border-white/15">
                      {med.type}
                    </span>
                  </div>

                  <div>
                    <div className="text-xs font-bold text-white line-clamp-1">{med.title}</div>
                    <div className="text-[10px] text-zinc-400 mt-0.5 font-mono">{med.credits}</div>
                  </div>

                  <div className="flex flex-wrap gap-1 pt-1 font-mono">
                    {med.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[9px] bg-[#050505] text-white/60 px-2 py-0.5 rounded border border-white/10"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

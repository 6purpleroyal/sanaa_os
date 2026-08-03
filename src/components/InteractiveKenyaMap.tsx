import React, { useState } from 'react';
import {
  MapPin,
  Trophy,
  School,
  Users,
  Phone,
  Search,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
} from 'lucide-react';
import { County } from '../types';

interface InteractiveKenyaMapProps {
  counties: County[];
  onSelectCountyPerformances?: (countyName: string) => void;
}

export const InteractiveKenyaMap: React.FC<InteractiveKenyaMapProps> = ({
  counties,
  onSelectCountyPerformances,
}) => {
  const [selectedRegion, setSelectedRegion] = useState<string>('All');
  const [selectedCounty, setSelectedCounty] = useState<County>(counties[0]);
  const [filterQuery, setFilterQuery] = useState('');

  const regions = ['All', 'Western', 'Nyanza', 'Rift Valley', 'Nairobi', 'Central', 'Coast', 'Eastern', 'North Eastern'];

  const filteredCounties = counties.filter((c) => {
    const matchesRegion = selectedRegion === 'All' || c.region === selectedRegion;
    const matchesSearch = c.name.toLowerCase().includes(filterQuery.toLowerCase()) || c.topSchool.toLowerCase().includes(filterQuery.toLowerCase());
    return matchesRegion && matchesSearch;
  });

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-[#050505] text-white border-b border-white/10 transition-colors">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <div className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-amber-400 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              <span>47 Devolved Counties Intelligence</span>
            </div>
            <h2 className="text-3xl font-serif text-white tracking-tight mt-1">
              Interactive Kenya Festival Map
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-2xl font-sans">
              Explore participating schools, gold medal standings, and county coordinator contacts across all 8 provinces and 47 counties of Kenya.
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-white/40" />
            <input
              type="text"
              placeholder="Search county or top school..."
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs font-mono rounded-md bg-[#09090b] border border-white/15 text-white placeholder-white/30 focus:outline-none focus:border-white/40"
            />
          </div>
        </div>

        {/* Region Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin font-mono text-[11px] uppercase">
          {regions.map((reg) => (
            <button
              key={reg}
              onClick={() => setSelectedRegion(reg)}
              className={`px-3.5 py-1.5 rounded-md tracking-wider transition-all whitespace-nowrap ${
                selectedRegion === reg
                  ? 'bg-white text-black font-bold shadow-md'
                  : 'bg-[#09090b] text-white/70 border border-white/10 hover:bg-white/10 hover:text-white'
              }`}
            >
              {reg === 'All' ? 'All Regions (47)' : `${reg} Region`}
            </button>
          ))}
        </div>

        {/* Main Interactive Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* County Selector Cards (Left Column) */}
          <div className="lg:col-span-5 space-y-3 max-h-[520px] overflow-y-auto pr-1">
            {filteredCounties.map((county) => {
              const isSelected = selectedCounty.id === county.id;
              return (
                <div
                  key={county.id}
                  onClick={() => setSelectedCounty(county)}
                  className={`p-4 rounded-xl cursor-pointer transition-all border ${
                    isSelected
                      ? 'bg-[#121215] border-amber-400/50 shadow-lg'
                      : 'bg-[#09090b] border-white/10 hover:border-white/20 hover:bg-[#0c0c0f]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded bg-white/10 border border-white/10 text-white flex items-center justify-center font-bold text-sm font-mono">
                        {county.name.substring(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <div className="font-serif font-bold text-sm text-white flex items-center gap-2">
                          <span>{county.name} County</span>
                          <span className="text-[9px] font-mono bg-white/10 text-white/70 px-2 py-0.5 rounded border border-white/10 uppercase">
                            {county.region}
                          </span>
                        </div>
                        <div className="text-xs text-white/50 mt-0.5 font-sans">
                          Top: <span className="text-zinc-300">{county.topSchool}</span>
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-xs font-mono font-bold text-amber-400 flex items-center justify-end gap-1">
                        <Trophy className="w-3.5 h-3.5" />
                        <span>{county.goldMedals} Gold</span>
                      </div>
                      <div className="text-[11px] font-mono text-white/40">
                        {county.schoolCount} Schools
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* County Detail & Map Spotlight Panel (Right Column) */}
          <div className="lg:col-span-7 bg-[#09090b] text-white rounded-xl p-6 border border-white/15 shadow-2xl relative overflow-hidden flex flex-col justify-between">
            {/* Background Map Watermark Graphic */}
            <div className="absolute right-0 bottom-0 opacity-5 pointer-events-none text-9xl font-mono font-black text-white select-none">
              KENYA
            </div>

            <div className="relative z-10 space-y-6">
              {/* County Title & Flag Header */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
                <div>
                  <div className="text-[10px] font-mono font-semibold text-amber-400 uppercase tracking-[0.2em]">
                    {selectedCounty.region} Region &bull; County Code #{selectedCounty.id.replace('cty-', '')}
                  </div>
                  <h3 className="text-3xl font-serif text-white tracking-tight flex items-center gap-3 mt-1">
                    <span>{selectedCounty.name} County</span>
                    <span className="text-2xl">{selectedCounty.flag}</span>
                  </h3>
                </div>

                <div className="bg-[#050505] border border-white/15 rounded-md px-4 py-2 text-right">
                  <div className="text-[10px] font-mono text-white/50 uppercase tracking-wider">Gold Standing</div>
                  <div className="text-xl font-mono font-bold text-amber-400">
                    #{counties.findIndex((c) => c.id === selectedCounty.id) + 1} Nationally
                  </div>
                </div>
              </div>

              {/* Trophies & Numbers Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono">
                <div className="bg-[#050505] p-3.5 rounded-lg border border-white/10">
                  <div className="text-[9px] text-white/40 uppercase font-semibold flex items-center gap-1 tracking-wider">
                    <School className="w-3.5 h-3.5 text-amber-400" />
                    <span>Schools</span>
                  </div>
                  <div className="text-2xl font-bold text-white mt-1">
                    {selectedCounty.schoolCount}
                  </div>
                </div>

                <div className="bg-[#050505] p-3.5 rounded-lg border border-white/10">
                  <div className="text-[9px] text-white/40 uppercase font-semibold flex items-center gap-1 tracking-wider">
                    <Users className="w-3.5 h-3.5 text-amber-400" />
                    <span>Participants</span>
                  </div>
                  <div className="text-2xl font-bold text-amber-300 mt-1">
                    {selectedCounty.participantCount.toLocaleString()}
                  </div>
                </div>

                <div className="bg-[#050505] p-3.5 rounded-lg border border-white/10">
                  <div className="text-[9px] text-white/40 uppercase font-semibold flex items-center gap-1 tracking-wider">
                    <Trophy className="w-3.5 h-3.5 text-amber-400" />
                    <span>Gold Medals</span>
                  </div>
                  <div className="text-2xl font-bold text-amber-400 mt-1">
                    {selectedCounty.goldMedals}
                  </div>
                </div>

                <div className="bg-[#050505] p-3.5 rounded-lg border border-white/10">
                  <div className="text-[9px] text-white/40 uppercase font-semibold flex items-center gap-1 tracking-wider">
                    <Trophy className="w-3.5 h-3.5 text-white/40" />
                    <span>Silver/Bronze</span>
                  </div>
                  <div className="text-2xl font-bold text-white/70 mt-1">
                    {selectedCounty.silverMedals}/{selectedCounty.bronzeMedals}
                  </div>
                </div>
              </div>

              {/* Top School & Coordinator Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono">
                <div className="bg-[#050505] p-4 rounded-lg border border-white/10 space-y-1">
                  <div className="text-[10px] text-amber-400 uppercase font-bold tracking-wider flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Top Performing Institution</span>
                  </div>
                  <div className="text-sm font-bold text-white font-serif">
                    {selectedCounty.topSchool}
                  </div>
                  <p className="text-[11px] text-white/50 font-sans">
                    Leading the county trophy tally in traditional dance & choral arrangements.
                  </p>
                </div>

                <div className="bg-[#050505] p-4 rounded-lg border border-white/10 space-y-1">
                  <div className="text-[10px] text-amber-400 uppercase font-bold tracking-wider flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5" />
                    <span>County Festival Coordinator</span>
                  </div>
                  <div className="text-sm font-bold text-white font-serif">
                    {selectedCounty.coordinator}
                  </div>
                  <p className="text-[11px] text-amber-300 font-mono">
                    {selectedCounty.coordinatorPhone}
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="relative z-10 pt-6 mt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
              <span className="text-xs font-mono text-white/40">
                Data updated live from Festival OS County Command Desk.
              </span>

              {onSelectCountyPerformances && (
                <button
                  onClick={() => onSelectCountyPerformances(selectedCounty.name)}
                  className="flex items-center gap-2 bg-white text-black font-mono text-[11px] font-bold uppercase tracking-[0.15em] px-4 py-2.5 rounded-md hover:bg-zinc-200 transition-all shadow-md"
                >
                  <span>View {selectedCounty.name} Performances</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

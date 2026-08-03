import React from 'react';
import {
  School,
  Users,
  MapPin,
  Music,
  Trophy,
  Building2,
  Camera,
  BookOpen,
} from 'lucide-react';
import { Festival } from '../types';

interface FestivalInNumbersProps {
  festival: Festival;
}

export const FestivalInNumbers: React.FC<FestivalInNumbersProps> = ({ festival }) => {
  const stats = [
    {
      label: 'Participating Schools',
      value: festival.totalSchools.toLocaleString(),
      subtext: 'Primary, Secondary, Universities & TVETs',
      icon: School,
      gradient: 'from-emerald-500 to-teal-700',
    },
    {
      label: 'Youth Participants',
      value: festival.totalParticipants.toLocaleString(),
      subtext: 'Performers, Soloists, Conductors & Dancers',
      icon: Users,
      gradient: 'from-amber-500 to-orange-600',
    },
    {
      label: 'Counties Represented',
      value: `${festival.totalCounties} / 47`,
      subtext: '100% Devolved Regional Representation',
      icon: MapPin,
      gradient: 'from-purple-600 to-indigo-700',
    },
    {
      label: 'Festival Performances',
      value: festival.totalPerformances.toLocaleString(),
      subtext: 'Zilizopendwa, Folk Dance, Poetry & Choral',
      icon: Music,
      gradient: 'from-emerald-600 to-emerald-900',
    },
    {
      label: 'National Awards & Grants',
      value: `${festival.totalAwards}`,
      subtext: 'Gold, Silver, Bronze & President Trophies',
      icon: Trophy,
      gradient: 'from-amber-400 to-yellow-600',
    },
    {
      label: 'Official Venues',
      value: '12 Halls',
      subtext: 'Simultaneous Stage Sessions & Auditoriums',
      icon: Building2,
      gradient: 'from-blue-600 to-indigo-800',
    },
    {
      label: 'Digital Media Archive',
      value: '1,450+',
      subtext: 'Photos, HD Videos & Voice Master Notes',
      icon: Camera,
      gradient: 'from-rose-600 to-pink-700',
    },
    {
      label: 'Journalism Stories',
      value: '34 Published',
      subtext: 'National Geographic & Magazine Style',
      icon: BookOpen,
      gradient: 'from-teal-600 to-cyan-700',
    },
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#050505] text-white border-b border-white/10 transition-colors">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Section Header */}
        <div className="text-center space-y-2">
          <div className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-amber-400">
            Live Metric Telemetry
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif text-white tracking-tight">
            The Festival in Numbers
          </h2>
          <p className="max-w-xl mx-auto text-xs sm:text-sm text-zinc-400 font-sans">
            Real-time quantitative overview of East Africa’s largest youth cultural and performance festival.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div
                key={i}
                className="group relative bg-[#09090b] rounded-xl p-5 shadow-sm border border-white/10 hover:border-white/25 transition-all overflow-hidden"
              >
                {/* Thin Top Accent Border */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#006600] via-white to-[#BB0000]" />

                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="text-3xl font-bold font-mono text-white tracking-tight group-hover:text-[#4ade80] transition-colors">
                      {stat.value}
                    </div>
                    <div className="text-xs font-mono tracking-wider uppercase text-zinc-300">
                      {stat.label}
                    </div>
                  </div>

                  <div className="p-2.5 rounded-lg bg-[#121215] border border-[#006600]/30 text-[#4ade80] shadow-md">
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-white/10 text-[11px] font-mono text-white/50 tracking-wide">
                  {stat.subtext}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

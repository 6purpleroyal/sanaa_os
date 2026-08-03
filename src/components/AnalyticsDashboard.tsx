import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  CartesianGrid,
} from 'recharts';
import { BarChart3, Trophy, Users, School, MapPin, Sparkles } from 'lucide-react';
import { County, Festival } from '../types';

interface AnalyticsDashboardProps {
  festival: Festival;
  counties: County[];
}

export const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({
  festival,
  counties,
}) => {
  const countyChartData = counties.map((c) => ({
    name: c.name,
    goldMedals: c.goldMedals,
    participants: c.participantCount,
    schools: c.schoolCount,
  }));

  const institutionTypeData = [
    { name: 'Secondary Schools', value: 680, color: '#065F46' },
    { name: 'Primary Schools', value: 340, color: '#F59E0B' },
    { name: 'Universities', value: 120, color: '#7C3AED' },
    { name: 'TVET Colleges', value: 90, color: '#0EA5E9' },
    { name: 'Special Schools', value: 50, color: '#EC4899' },
  ];

  const radarCriteriaData = [
    { criterion: 'Creativity', score: 92 },
    { criterion: 'Technique', score: 95 },
    { criterion: 'Presentation', score: 90 },
    { criterion: 'Originality', score: 94 },
    { criterion: 'Timing', score: 88 },
    { criterion: 'Stage Presence', score: 91 },
  ];

  return (
    <section className="py-10 px-4 sm:px-6 lg:px-8 bg-[#050505] text-white min-h-screen border-b border-white/10">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <div className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-amber-400 flex items-center gap-1.5">
              <BarChart3 className="w-3.5 h-3.5 text-amber-400" />
              <span>PowerBI & Olympic Style Analytics Engine</span>
            </div>
            <h2 className="text-3xl font-serif text-white tracking-tight mt-1">
              National Festival Analytics & Intelligence
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 max-w-2xl mt-1 font-sans">
              Data visualizations covering county participation growth, scoring criteria distributions, institution demographics, and national rankings.
            </p>
          </div>
        </div>

        {/* Top Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono">
          <div className="bg-[#09090b] p-5 rounded-xl border border-white/10 shadow-xl space-y-1">
            <div className="text-[10px] text-white/50 font-bold uppercase tracking-wider flex items-center gap-1">
              <School className="w-3.5 h-3.5 text-amber-400" />
              <span>Total Institutions</span>
            </div>
            <div className="text-3xl font-bold text-white">{festival.totalSchools}</div>
            <div className="text-[10px] text-amber-300">+12% increase from 2025</div>
          </div>

          <div className="bg-[#09090b] p-5 rounded-xl border border-white/10 shadow-xl space-y-1">
            <div className="text-[10px] text-white/50 font-bold uppercase tracking-wider flex items-center gap-1">
              <Users className="w-3.5 h-3.5 text-amber-400" />
              <span>Youth Participants</span>
            </div>
            <div className="text-3xl font-bold text-amber-400">
              {festival.totalParticipants.toLocaleString()}
            </div>
            <div className="text-[10px] text-zinc-400">54% Female / 46% Male Ratio</div>
          </div>

          <div className="bg-[#09090b] p-5 rounded-xl border border-white/10 shadow-xl space-y-1">
            <div className="text-[10px] text-white/50 font-bold uppercase tracking-wider flex items-center gap-1">
              <Trophy className="w-3.5 h-3.5 text-amber-400" />
              <span>Gold Medal Standings</span>
            </div>
            <div className="text-3xl font-bold text-white">Kakamega #1</div>
            <div className="text-[10px] text-amber-300">18 Gold Medals in 2026</div>
          </div>

          <div className="bg-[#09090b] p-5 rounded-xl border border-white/10 shadow-xl space-y-1">
            <div className="text-[10px] text-white/50 font-bold uppercase tracking-wider flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              <span>Devolved Reach</span>
            </div>
            <div className="text-3xl font-bold text-white">47 / 47</div>
            <div className="text-[10px] text-zinc-400">100% County Representation</div>
          </div>
        </div>

        {/* Main Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* County Gold Medal Standing Bar Chart */}
          <div className="lg:col-span-8 bg-[#09090b] p-6 rounded-xl border border-white/10 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3 font-mono">
              <div>
                <h3 className="font-serif text-lg text-white">
                  Gold Medal Standings by County
                </h3>
                <p className="text-xs text-zinc-400 font-sans">Comparing Gold Medals won across counties</p>
              </div>
              <span className="text-[10px] text-amber-400 font-bold bg-white/10 px-2.5 py-1 rounded border border-white/10 uppercase tracking-wider">
                Live Rank
              </span>
            </div>

            <div className="h-72 w-full font-mono">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={countyChartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                  <XAxis dataKey="name" stroke="#a1a1aa" fontSize={11} />
                  <YAxis stroke="#a1a1aa" fontSize={11} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#050505', borderColor: '#27272a', borderRadius: '8px', color: '#fff' }}
                  />
                  <Bar dataKey="goldMedals" fill="#ffffff" radius={[4, 4, 0, 0]} name="Gold Medals" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Institution Types Pie Chart */}
          <div className="lg:col-span-4 bg-[#09090b] p-6 rounded-xl border border-white/10 shadow-2xl space-y-4">
            <div className="border-b border-white/10 pb-3 font-mono">
              <h3 className="font-serif text-lg text-white">
                Institution Type Share
              </h3>
              <p className="text-xs text-zinc-400 font-sans">Breakdown of participating institutions</p>
            </div>

            <div className="h-60 w-full flex items-center justify-center font-mono">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={institutionTypeData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {institutionTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: '#050505', borderColor: '#27272a', borderRadius: '8px', color: '#fff' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-1 text-xs font-mono">
              {institutionTypeData.map((item) => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-zinc-300">{item.name}</span>
                  </div>
                  <span className="font-bold text-white">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Scoring Radar Breakdown Chart */}
          <div className="lg:col-span-12 bg-[#09090b] p-6 rounded-xl border border-white/10 shadow-2xl space-y-4">
            <div className="border-b border-white/10 pb-3 flex items-center justify-between font-mono">
              <div>
                <h3 className="font-serif text-lg text-white">
                  National Score Criteria Performance Radar
                </h3>
                <p className="text-xs text-zinc-400 font-sans">
                  Average marks awarded across Creativity, Technique, Diction, Authenticity, Timing, and Stage Presence
                </p>
              </div>
              <span className="text-[10px] text-amber-400 uppercase tracking-widest">100-Point Radar Scale</span>
            </div>

            <div className="h-72 w-full flex items-center justify-center font-mono">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarCriteriaData}>
                  <PolarGrid stroke="#27272a" />
                  <PolarAngleAxis dataKey="criterion" stroke="#dcdcdc" fontSize={11} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#52525b" />
                  <Radar name="Average Score" dataKey="score" stroke="#F59E0B" fill="#F59E0B" fillOpacity={0.3} />
                  <Tooltip contentStyle={{ backgroundColor: '#050505', borderColor: '#27272a', borderRadius: '8px', color: '#fff' }} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

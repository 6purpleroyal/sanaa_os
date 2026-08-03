import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Play,
  Calendar,
  MapPin,
  Trophy,
  ClipboardList,
  Flame,
  ArrowRight,
  Music,
  Tv,
} from 'lucide-react';
import { Festival } from '../types';

interface HeroCinematicProps {
  festival: Festival;
  onNavigate: (tab: string) => void;
}

export const HeroCinematic: React.FC<HeroCinematicProps> = ({ festival, onNavigate }) => {
  const [timeLeft, setTimeLeft] = useState({ days: 12, hours: 8, minutes: 42, seconds: 15 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        return { ...prev, seconds: 59, minutes: prev.minutes > 0 ? prev.minutes - 1 : 59 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-[#050505] text-white py-16 px-4 sm:px-6 lg:px-8 border-b border-white/10">
      {/* Kenya flag colour stripe at bottom */}
      <div className="absolute bottom-0 left-0 right-0 flex h-1 z-20">
        <div className="flex-1 bg-[#006600]" />
        <div className="flex-1 bg-white" />
        <div className="flex-1 bg-[#BB0000]" />
      </div>
      {/* Background Image with Dark Vignette */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105 filter brightness-25 contrast-125 transition-all duration-1000"
        style={{ backgroundImage: `url(${festival.banner})` }}
      />

      {/* Vignette Gradients */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-[#050505]/60" />
      <div className="absolute inset-0 bg-radial-vignette opacity-80" />

      {/* Content Container */}
      <div className="relative max-w-5xl mx-auto text-center z-10 space-y-8">
        {/* Edition Pill */}
        <div className="inline-flex items-center gap-2 bg-[#09090b] border border-white/15 px-4 py-1.5 rounded-full shadow-2xl">
          <span className="w-1.5 h-1.5 rounded-full bg-[#4ade80] animate-ping" />
          <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-white/80">
            {festival.edition} Kenya National Music Festival ({festival.year})
          </span>
          <span className="text-[9px] font-mono bg-white/10 text-amber-300 px-2 py-0.5 rounded border border-white/10 uppercase tracking-widest hidden sm:inline">
            SYSTEM ONLINE
          </span>
        </div>

        {/* Serif Headline */}
        <div className="space-y-4">
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif tracking-tight leading-none text-white drop-shadow-md">
            PRESERVING PERFORMANCE.<br />
            <span className="italic font-normal text-white/70">MEASURING EXCELLENCE.</span><br />
            CELEBRATING CREATIVITY.
          </h1>

          <p className="max-w-2xl mx-auto text-zinc-400 text-xs sm:text-sm md:text-base font-sans leading-relaxed tracking-wide">
            {festival.theme}
          </p>
        </div>

        {/* Metadata Badges */}
        <div className="flex flex-wrap items-center justify-center gap-3 text-[10px] font-mono tracking-[0.15em] uppercase text-white/60">
          <div className="flex items-center gap-2 bg-[#09090b] px-3.5 py-2 rounded border border-white/10">
            <Calendar className="w-3.5 h-3.5 text-amber-400" />
            <span>{festival.dates}</span>
          </div>
          <div className="flex items-center gap-2 bg-[#09090b] px-3.5 py-2 rounded border border-white/10">
            <MapPin className="w-3.5 h-3.5 text-white/70" />
            <span>{festival.hostVenue}</span>
          </div>
          <div className="flex items-center gap-2 bg-[#09090b] px-3.5 py-2 rounded border border-white/10">
            <Music className="w-3.5 h-3.5 text-amber-300" />
            <span>840 Categories & Choral Acts</span>
          </div>
        </div>

        {/* Live Countdown Timer */}
        <div className="bg-[#09090b]/90 border border-white/15 backdrop-blur-md rounded-xl p-5 sm:p-6 max-w-xl mx-auto shadow-2xl">
          <div className="text-[10px] font-mono tracking-[0.2em] uppercase text-[#4ade80] mb-4 flex items-center justify-center gap-2">
            <Tv className="w-3.5 h-3.5 text-amber-400" />
            <span>Countdown to Centennial Gala Finals</span>
          </div>
          <div className="grid grid-cols-4 gap-2 sm:gap-4 font-mono">
            <div className="bg-[#050505] p-3 rounded-lg border border-[#006600]/30 text-center">
              <div className="text-2xl sm:text-3xl font-bold text-[#4ade80]">{timeLeft.days}</div>
              <div className="text-[9px] text-white/40 uppercase tracking-widest mt-1">Days</div>
            </div>
            <div className="bg-[#050505] p-3 rounded-lg border border-white/10 text-center">
              <div className="text-2xl sm:text-3xl font-bold text-white">{timeLeft.hours}</div>
              <div className="text-[9px] text-white/40 uppercase tracking-widest mt-1">Hours</div>
            </div>
            <div className="bg-[#050505] p-3 rounded-lg border border-white/10 text-center">
              <div className="text-2xl sm:text-3xl font-bold text-white">{timeLeft.minutes}</div>
              <div className="text-[9px] text-white/40 uppercase tracking-widest mt-1">Mins</div>
            </div>
            <div className="bg-[#050505] p-3 rounded-lg border border-[#BB0000]/30 text-center">
              <div className="text-2xl sm:text-3xl font-bold text-[#f87171]">{timeLeft.seconds}</div>
              <div className="text-[9px] text-white/40 uppercase tracking-widest mt-1">Secs</div>
            </div>
          </div>
        </div>

        {/* Action CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            onClick={() => onNavigate('live')}
            className="flex items-center gap-2 bg-white text-black font-mono text-[11px] font-bold uppercase tracking-[0.15em] px-6 py-3.5 rounded-md hover:bg-zinc-200 transition-all shadow-xl"
          >
            <Trophy className="w-4 h-4 text-black" />
            <span>Live Results & Leaderboard</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => onNavigate('capture')}
            className="flex items-center gap-2 bg-[#09090b] text-white font-mono text-[11px] font-semibold uppercase tracking-[0.15em] px-6 py-3.5 rounded-md border border-white/20 hover:bg-white/10 transition-all"
          >
            <ClipboardList className="w-4 h-4 text-amber-400" />
            <span>Tablet Data Capture</span>
          </button>

          <button
            onClick={() => onNavigate('map')}
            className="flex items-center gap-2 bg-transparent text-white/80 hover:text-white font-mono text-[11px] uppercase tracking-[0.15em] px-5 py-3.5 rounded-md border border-white/10 hover:bg-white/5 transition-all"
          >
            <MapPin className="w-4 h-4 text-white/60" />
            <span>County Map</span>
          </button>
        </div>
      </div>
    </section>
  );
};

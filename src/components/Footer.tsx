import React from 'react';
import {
  Sparkles,
  ShieldCheck,
  Heart,
  Globe,
  Tv,
  Radio,
  Share2,
} from 'lucide-react';
import { Festival, Sponsor } from '../types';

interface FooterProps {
  festival: Festival;
  sponsors: Sponsor[];
  onNavigate: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ festival, sponsors, onNavigate }) => {
  return (
    <footer className="bg-[#050505] text-white/50 border-t border-white/10 text-xs py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Sponsor Ticker */}
        <div className="border-b border-white/10 pb-8 space-y-3">
          <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-amber-400 font-bold text-center">
            Official Patron & National Partners
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            {sponsors.map((sp) => (
              <a
                key={sp.id}
                href={sp.website}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 bg-[#09090b] px-4 py-2 rounded-md border border-white/10 hover:border-white/30 transition-all group"
              >
                <div className="w-6 h-6 rounded bg-white/10 text-white font-bold text-[10px] font-mono flex items-center justify-center">
                  {sp.name.substring(0, 2)}
                </div>
                <div>
                  <div className="font-serif font-bold text-white group-hover:text-amber-300 transition-colors">
                    {sp.name}
                  </div>
                  <div className="text-[9px] font-mono text-white/40 uppercase tracking-widest">{sp.tier}</div>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <div className="font-cinzel text-lg text-white font-bold tracking-wider flex items-center gap-2">
              FESTIVAL<span className="text-white/40 font-light">OS</span>
            </div>
            <p className="text-white/50 leading-relaxed text-xs font-sans">
              The Digital Intelligence Platform for the Kenya National Music Festival. Preserving performance, measuring excellence, and celebrating youth creativity across 47 counties.
            </p>
            <div className="text-[10px] text-amber-400 font-mono tracking-wider">
              Tenant: {festival.edition} Festival ({festival.year})
            </div>
          </div>

          <div className="space-y-2 font-mono">
            <div className="font-serif font-bold text-white uppercase text-xs tracking-[0.15em]">
              Platform Modules
            </div>
            <ul className="space-y-1.5 text-white/60 text-[11px]">
              <li>
                <button onClick={() => onNavigate('landing')} className="hover:text-white transition-colors">
                  Festival Landing Page
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('live')} className="hover:text-white transition-colors">
                  Live Leaderboard & Ticker
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('capture')} className="hover:text-white transition-colors">
                  Tablet Data Collection
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('map')} className="hover:text-white transition-colors">
                  Interactive 47 County Map
                </button>
              </li>
            </ul>
          </div>

          <div className="space-y-2 font-mono">
            <div className="font-serif font-bold text-white uppercase text-xs tracking-[0.15em]">
              Archives & Intel
            </div>
            <ul className="space-y-1.5 text-white/60 text-[11px]">
              <li>
                <button onClick={() => onNavigate('magazine')} className="hover:text-white transition-colors">
                  Storytelling Magazine
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('archive')} className="hover:text-white transition-colors">
                  Digital Vault (1990 - 2027)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('analytics')} className="hover:text-white transition-colors">
                  Analytics Dashboard
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('admin')} className="hover:text-white transition-colors">
                  Admin CMS Command Desk
                </button>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <div className="font-serif font-bold text-white uppercase text-xs tracking-[0.15em]">
              Cultural Mission
            </div>
            <p className="text-white/50 text-[11px] leading-relaxed italic font-serif">
              "To inspire, educate, and preserve Kenya’s musical, poetic, and cultural traditions through digital excellence and youth empowerment."
            </p>
            <div className="flex items-center gap-2 text-[10px] text-amber-400 font-mono tracking-wider">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>Ministry of Education Approved</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-white/40 text-[10px] font-mono tracking-wider">
          <div>
            © 2026 Kenya National Music Festival (KNMF) & Festival OS Platform.
          </div>
          <div className="flex items-center gap-4">
            <span>Powered by Gemini AI</span>
            <span>&bull;</span>
            <span>47 Counties Devolved Sync</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

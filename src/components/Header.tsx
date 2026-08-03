import React, { useState } from 'react';
import {
  Sparkles,
  Search,
  Calendar,
  ShieldAlert,
  Moon,
  Sun,
  Bot,
  Menu,
  X,
  Trophy,
  ClipboardList,
  MapPin,
  BookOpen,
  Archive,
  BarChart3,
  Sliders,
  ChevronDown,
} from 'lucide-react';
import { Festival, UserRole } from '../types';

interface HeaderProps {
  festivals: Festival[];
  currentFestival: Festival;
  onSelectFestival: (festival: Festival) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  onOpenAI: () => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  festivals,
  currentFestival,
  onSelectFestival,
  activeTab,
  setActiveTab,
  userRole,
  setUserRole,
  darkMode,
  setDarkMode,
  onOpenAI,
  searchQuery,
  setSearchQuery,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const [festDropdownOpen, setFestDropdownOpen] = useState(false);

  const roles: UserRole[] = [
    'Visitor',
    'Journalist',
    'Participant',
    'Teacher',
    'School Admin',
    'Volunteer',
    'Judge',
    'County Coordinator',
    'Festival Coordinator',
    'National Admin',
    'Super Admin',
  ];

  const navItems = [
    { id: 'landing', label: 'Festival Home', icon: Sparkles },
    { id: 'live', label: 'Live Dashboard', icon: Trophy },
    { id: 'capture', label: 'Tablet Capture', icon: ClipboardList, badge: 'Offline' },
    { id: 'map', label: 'County Map', icon: MapPin },
    { id: 'magazine', label: 'Storytelling', icon: BookOpen },
    { id: 'archive', label: 'Digital Archive', icon: Archive },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'admin', label: 'Admin CMS', icon: Sliders, requiresAdmin: true },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#050505]/95 backdrop-blur-md border-b border-white/10 text-white transition-colors">
      {/* Top Banner Bar */}
      <div className="bg-[#09090b] border-b border-white/10 text-white text-xs py-1.5 px-4 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-3">
          <span className="font-mono text-[10px] tracking-[0.2em] text-[#4ade80] uppercase flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4ade80] animate-ping" />
            KNMF Intelligence Platform
          </span>
          <span className="hidden sm:inline-block text-white/20">|</span>
          <span className="hidden sm:inline-block font-mono text-[10px] tracking-widest text-white/60 uppercase">
            {currentFestival.edition} Edition ({currentFestival.year}) &bull; {currentFestival.hostCounty}
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* Multi-Tenant Year Selector */}
          <div className="relative">
            <button
              onClick={() => setFestDropdownOpen(!festDropdownOpen)}
              className="flex items-center gap-1.5 bg-[#121215] hover:bg-[#1a1a1e] border border-white/15 rounded-md px-2.5 py-0.5 text-white/90 transition-all text-[11px] font-mono tracking-wide"
            >
              <Calendar className="w-3 h-3 text-amber-400" />
              <span>{currentFestival.year} ({currentFestival.edition})</span>
              <ChevronDown className="w-3 h-3 text-white/40" />
            </button>

            {festDropdownOpen && (
              <div className="absolute right-0 mt-1 w-64 bg-[#09090b] text-white rounded-lg shadow-2xl border border-white/15 py-2 z-50">
                <div className="px-3 py-1 text-[10px] font-mono font-semibold text-white/40 uppercase tracking-[0.2em] border-b border-white/10">
                  Switch Festival Edition
                </div>
                {festivals.map((f) => (
                  <button
                    key={f.id}
                    onClick={() => {
                      onSelectFestival(f);
                      setFestDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-white/5 transition-colors ${
                      f.id === currentFestival.id ? 'bg-[#006600]/20 text-[#4ade80] font-semibold' : 'text-zinc-300'
                    }`}
                  >
                    <div>
                      <div className="font-bold font-serif">{f.edition} KNMF ({f.year})</div>
                      <div className="text-[10px] font-mono text-white/50 truncate max-w-[180px]">{f.hostVenue}</div>
                    </div>
                    <span className={`text-[9px] font-mono uppercase px-1.5 py-0.5 rounded border ${
                      f.status === 'Active' ? 'bg-[#006600]/20 text-[#4ade80] border-[#006600]/30' :
                      f.status === 'Upcoming' ? 'bg-white/5 text-zinc-300 border-white/15' : 'bg-black text-white/40 border-white/10'
                    }`}>
                      {f.status}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Role Switcher */}
          <div className="relative">
            <button
              onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
              className="flex items-center gap-1.5 bg-[#121215] hover:bg-[#1a1a1e] border border-[#006600]/40 rounded-md px-2.5 py-0.5 text-[#4ade80] transition-all text-[11px] font-mono tracking-wide"
            >
              <ShieldAlert className="w-3 h-3 text-[#4ade80]" />
              <span>Role: {userRole}</span>
              <ChevronDown className="w-3 h-3 text-[#4ade80]/60" />
            </button>

            {roleDropdownOpen && (
              <div className="absolute right-0 mt-1 w-56 bg-[#09090b] text-white rounded-lg shadow-2xl border border-white/15 py-2 z-50 max-h-72 overflow-y-auto">
                <div className="px-3 py-1 text-[10px] font-mono text-white/40 uppercase tracking-[0.2em] border-b border-white/10">
                  Select Role View Context
                </div>
                {roles.map((role) => (
                  <button
                    key={role}
                    onClick={() => {
                      setUserRole(role);
                      setRoleDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 text-xs font-mono hover:bg-white/5 transition-colors flex items-center justify-between ${
                      userRole === role ? 'text-[#4ade80] font-bold bg-white/10' : 'text-zinc-300'
                    }`}
                  >
                    <span>{role}</span>
                    {userRole === role && <span className="text-[#4ade80]">✓</span>}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Navigation Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
        {/* Brand & Logo */}
        <div
          onClick={() => setActiveTab('landing')}
          className="cursor-pointer flex items-center gap-3 group"
        >
          <div className="w-9 h-9 rounded bg-white text-black font-bold font-cinzel text-base flex items-center justify-center border border-white/20 group-hover:scale-105 transition-transform shadow-lg">
            F
          </div>
          <div>
            <div className="font-cinzel tracking-wider text-lg text-white font-bold flex items-center gap-2">
              FESTIVAL<span className="text-white/40 font-light">OS</span>
              <span className="text-[9px] font-mono bg-white/10 text-amber-300 px-1.5 py-0.5 rounded border border-white/10 uppercase tracking-widest">
                v2.6
              </span>
            </div>
            <div className="text-[9px] font-mono tracking-[0.2em] text-white/40 uppercase">
              Kenya National Music Festival
            </div>
          </div>
        </div>

        {/* Global Search Bar */}
        <div className="hidden md:flex flex-1 max-w-sm relative">
          <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-white/40" />
          <input
            type="text"
            placeholder="Search schools, categories, scores, judges..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-1.5 text-xs font-mono rounded-md bg-[#09090b] border border-white/15 text-white placeholder-white/30 focus:outline-none focus:border-white/40 transition-all"
          />
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[11px] font-mono tracking-wider uppercase transition-all relative ${
                  isActive
                    ? 'bg-[#006600] text-white font-bold shadow-md shadow-green-900/40'
                    : 'text-white/70 hover:bg-white/10 hover:text-white'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-[#4ade80]'}`} />
                <span>{item.label}</span>
                {item.badge && (
                  <span className="ml-0.5 text-[8px] bg-[#BB0000] text-white font-bold px-1 rounded uppercase tracking-tighter">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* AI Assistant Button */}
          <button
            onClick={onOpenAI}
            className="flex items-center gap-1.5 bg-white text-black hover:bg-zinc-200 text-[10px] font-mono font-bold tracking-[0.15em] uppercase px-3 py-1.5 rounded-md shadow-md transition-all"
          >
            <Bot className="w-3.5 h-3.5 text-black" />
            <span className="hidden sm:inline">Festival AI</span>
          </button>

          {/* Dark Mode Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-1.5 rounded-md border border-white/10 text-white/70 hover:bg-white/10 transition-colors"
            title="Toggle theme"
          >
            {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-white/70" />}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-1.5 rounded-md border border-white/10 text-white/70 hover:bg-white/10"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#09090b] text-white border-t border-white/10 px-4 py-4 space-y-2">
          <div className="relative mb-3">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-white/40" />
            <input
              type="text"
              placeholder="Search schools, scores, categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs font-mono rounded-md bg-[#050505] border border-white/15 text-white placeholder-white/30"
            />
          </div>

          <div className="grid grid-cols-2 gap-2 font-mono text-[11px]">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center gap-2 p-2.5 rounded-md text-xs font-semibold uppercase tracking-wider transition-all ${
                    isActive
                      ? 'bg-[#006600] text-white font-bold shadow-md'
                      : 'bg-[#121215] text-white/80 border border-white/10 hover:bg-white/10'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-[#4ade80]'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};

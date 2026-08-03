import React, { useState } from 'react';
import {
  Sliders,
  Plus,
  Trash2,
  Edit,
  CheckCircle2,
  XCircle,
  FileText,
  Key,
  ShieldAlert,
  Download,
  Calendar,
  Building2,
  Music,
  UserCheck,
  Check,
  AlertTriangle,
} from 'lucide-react';
import {
  Festival,
  Venue,
  Category,
  Performance,
  NewsStory,
  AuditLog,
  UserRole,
} from '../types';

interface AdminCMSProps {
  festivals: Festival[];
  venues: Venue[];
  categories: Category[];
  performances: Performance[];
  stories: NewsStory[];
  auditLogs: AuditLog[];
  userRole: UserRole;
  onAddFestival: (fest: Festival) => void;
  onApprovePerformanceScore: (id: string) => void;
}

export const AdminCMS: React.FC<AdminCMSProps> = ({
  festivals,
  venues,
  categories,
  performances,
  stories,
  auditLogs,
  userRole,
  onAddFestival,
  onApprovePerformanceScore,
}) => {
  const [activeCmsTab, setActiveCmsTab] = useState<'editions' | 'categories' | 'venues' | 'approvals' | 'stories' | 'audit'>('editions');

  // New Festival form modal state
  const [showAddFestModal, setShowAddFestModal] = useState(false);
  const [newYear, setNewYear] = useState<number>(2028);
  const [newEdition, setNewEdition] = useState('102nd');
  const [newTheme, setNewTheme] = useState('Cultural Horizons: Youth Leadership in the Digital Creative Economy');
  const [newHost, setNewHost] = useState('KICC & Bomas of Kenya, Nairobi');

  const handleCreateFestival = (e: React.FormEvent) => {
    e.preventDefault();
    const newFest: Festival = {
      id: `fest-${newYear}`,
      year: newYear,
      edition: newEdition,
      theme: newTheme,
      dates: `August 10 - 22, ${newYear}`,
      logo: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&auto=format&fit=crop&q=80',
      banner: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1600&auto=format&fit=crop&q=80',
      status: 'Upcoming',
      totalSchools: 1000,
      totalParticipants: 15000,
      totalCounties: 47,
      totalPerformances: 700,
      totalAwards: 100,
      hostVenue: newHost,
      hostCounty: 'Nairobi County',
    };
    onAddFestival(newFest);
    setShowAddFestModal(false);
  };

  const isSuperAdmin = userRole === 'Super Admin' || userRole === 'National Admin' || userRole === 'Festival Coordinator';

  return (
    <section className="py-10 px-4 sm:px-6 lg:px-8 bg-[#050505] text-white min-h-screen border-b border-white/10">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <div className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-amber-400 flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-amber-400" />
              <span>Notion-Style CMS & Governance Control Center</span>
            </div>
            <h2 className="text-3xl font-serif text-white tracking-tight mt-1">
              Admin CMS Command Desk
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 max-w-2xl mt-1 font-sans">
              Multi-tenant festival year management, judge result approval workflows, category parameters, and server-side API configurations.
            </p>
          </div>

          {!isSuperAdmin && (
            <div className="bg-[#09090b] border border-amber-400/40 p-3 rounded-md flex items-center gap-2 text-amber-300 text-xs font-mono">
              <AlertTriangle className="w-4 h-4 shrink-0 text-amber-400" />
              <span>Viewing in read-only mode for role '{userRole}'. Switch to 'Super Admin' in top menu for full permissions.</span>
            </div>
          )}
        </div>

        {/* CMS Tabs */}
        <div className="flex items-center gap-2 border-b border-white/10 overflow-x-auto pb-2 scrollbar-thin font-mono text-xs">
          {[
            { id: 'editions', label: 'Festival Editions', icon: Calendar },
            { id: 'categories', label: 'Categories (840)', icon: Music },
            { id: 'venues', label: 'Venues & Halls', icon: Building2 },
            { id: 'approvals', label: 'Result Approvals', icon: CheckCircle2, badge: 'Live Queue' },
            { id: 'stories', label: 'Journalism CMS', icon: FileText },
            { id: 'audit', label: 'Audit Logs & API', icon: Key },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeCmsTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveCmsTab(tab.id as any)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-md font-bold transition-all whitespace-nowrap uppercase tracking-wider ${
                  isActive
                    ? 'bg-white text-black shadow-md'
                    : 'bg-[#09090b] text-white/70 border border-white/10 hover:bg-white/10 hover:text-white'
                }`}
              >
                <Icon className="w-3.5 h-3.5 text-amber-400" />
                <span>{tab.label}</span>
                {tab.badge && (
                  <span className="text-[9px] bg-amber-400 text-black font-bold px-1.5 py-0.2 rounded uppercase">
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Tab 1: Festival Editions Multi-Tenant Manager */}
        {activeCmsTab === 'editions' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-serif text-white">Configured Festival Years</h3>

              {isSuperAdmin && (
                <button
                  onClick={() => setShowAddFestModal(true)}
                  className="flex items-center gap-1.5 bg-white text-black font-mono font-bold text-xs uppercase tracking-wider px-4 py-2.5 rounded-md shadow hover:bg-zinc-200 transition-all"
                >
                  <Plus className="w-4 h-4 text-black" />
                  <span>Create New Festival Record</span>
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-sans">
              {festivals.map((f) => (
                <div
                  key={f.id}
                  className="bg-[#09090b] p-5 rounded-xl border border-white/10 space-y-3 relative shadow-xl"
                >
                  <div className="flex items-center justify-between font-mono">
                    <span className="text-[10px] font-bold text-amber-400 bg-white/10 px-2.5 py-0.5 rounded border border-white/10 uppercase tracking-wider">
                      {f.edition} KNMF ({f.year})
                    </span>

                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase tracking-wider ${
                        f.status === 'Active'
                          ? 'bg-white/10 text-white border-white/20'
                          : f.status === 'Upcoming'
                          ? 'bg-amber-400/10 text-amber-300 border border-amber-400/30'
                          : 'bg-[#050505] text-white/40 border-white/10'
                      }`}
                    >
                      {f.status}
                    </span>
                  </div>

                  <div>
                    <h4 className="text-lg font-serif font-bold text-white">{f.theme}</h4>
                    <p className="text-xs text-zinc-400 mt-1">{f.dates} &bull; Host: {f.hostVenue}</p>
                  </div>

                  <div className="pt-3 border-t border-white/10 text-xs text-white/50 flex items-center justify-between font-mono">
                    <span>{f.totalSchools} Schools Registered</span>
                    <span>{f.totalPerformances} Performances</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Result Approvals Workflow */}
        {activeCmsTab === 'approvals' && (
          <div className="space-y-4">
            <div className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-amber-400 flex items-center justify-between border-b border-white/10 pb-2">
              <span>National Judge Scorecard Review Queue</span>
              <span>Pending Release Approval</span>
            </div>

            <div className="space-y-3 font-sans">
              {performances.map((perf) => (
                <div
                  key={perf.id}
                  className="bg-[#09090b] p-4 rounded-xl border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-lg"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-sm font-mono">{perf.schoolName}</span>
                      <span className="text-[9px] bg-white/10 text-amber-300 px-2 py-0.5 rounded font-mono border border-white/10">
                        {perf.categoryName}
                      </span>
                    </div>
                    <div className="text-xs text-zinc-300 font-serif italic">
                      Piece: "{perf.pieceTitle}" &bull; Conductor: {perf.conductor}
                    </div>
                    <div className="text-[11px] text-zinc-400 font-mono">
                      Venue: {perf.venueName} &bull; County: {perf.countyName}
                    </div>
                  </div>

                  <div className="flex items-center gap-4 shrink-0 justify-between md:justify-end font-mono">
                    <div className="text-right">
                      <div className="text-[10px] text-white/40 uppercase">Judge Score</div>
                      <div className="text-2xl font-bold text-amber-400">
                        {perf.finalScore ? `${perf.finalScore.toFixed(1)} pts` : 'In Review'}
                      </div>
                    </div>

                    {isSuperAdmin && (
                      <button
                        onClick={() => {
                          onApprovePerformanceScore(perf.id);
                          alert(`Scorecard for ${perf.schoolName} approved and published to Live Leaderboard!`);
                        }}
                        className="flex items-center gap-1.5 bg-white text-black font-bold text-xs uppercase tracking-wider px-4 py-2.5 rounded-md shadow hover:bg-zinc-200 transition-all"
                      >
                        <Check className="w-4 h-4 text-black" />
                        <span>Approve & Publish</span>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 6: Audit Logs & API Configuration */}
        {activeCmsTab === 'audit' && (
          <div className="space-y-6">
            <div className="bg-[#09090b] p-5 rounded-xl border border-white/10 space-y-3 shadow-xl">
              <h4 className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-[0.2em] flex items-center gap-2">
                <Key className="w-4 h-4 text-amber-400" />
                <span>API Connection & Server Credentials</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                <div className="bg-[#050505] p-3 rounded-md border border-white/10">
                  <div className="text-white/40">GEMINI_API_KEY</div>
                  <div className="text-amber-300 font-bold truncate mt-1">&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull; (Server-Side Injected)</div>
                </div>

                <div className="bg-[#050505] p-3 rounded-md border border-white/10">
                  <div className="text-white/40">APP_URL Service Host</div>
                  <div className="text-amber-300 font-bold truncate mt-1">https://festivalos.kenya.go.ke</div>
                </div>
              </div>
            </div>

            <div className="space-y-3 font-mono">
              <div className="text-[10px] font-bold text-white/50 uppercase tracking-[0.2em]">
                System Audit & Security Logs
              </div>

              <div className="bg-[#09090b] rounded-xl border border-white/10 overflow-hidden text-xs">
                {auditLogs.map((log) => (
                  <div key={log.id} className="p-3 border-b border-white/10 flex items-start justify-between gap-4">
                    <div>
                      <div className="font-bold text-white">{log.action}</div>
                      <div className="text-[11px] text-zinc-400 mt-0.5 font-sans">{log.details}</div>
                    </div>
                    <div className="text-right font-mono text-[10px] text-white/40 shrink-0">
                      <div>{log.user}</div>
                      <div>{log.timestamp}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Create Festival Modal */}
        {showAddFestModal && (
          <div className="fixed inset-0 z-50 bg-[#050505]/80 backdrop-blur flex items-center justify-center p-4 font-mono">
            <form
              onSubmit={handleCreateFestival}
              className="bg-[#09090b] p-6 rounded-xl border border-white/20 max-w-lg w-full space-y-4 shadow-2xl"
            >
              <h3 className="text-xl font-serif text-white">Create New Festival Edition</h3>

              <div className="space-y-2 text-xs">
                <div>
                  <label className="text-white/70">Festival Year</label>
                  <input
                    type="number"
                    value={newYear}
                    onChange={(e) => setNewYear(parseInt(e.target.value))}
                    className="w-full p-2.5 rounded-md bg-[#050505] border border-white/15 text-white font-mono mt-1 focus:outline-none focus:border-white/40"
                  />
                </div>

                <div>
                  <label className="text-white/70">Edition Title</label>
                  <input
                    type="text"
                    value={newEdition}
                    onChange={(e) => setNewEdition(e.target.value)}
                    className="w-full p-2.5 rounded-md bg-[#050505] border border-white/15 text-white font-mono mt-1 focus:outline-none focus:border-white/40"
                  />
                </div>

                <div>
                  <label className="text-white/70">Theme Statement</label>
                  <textarea
                    rows={2}
                    value={newTheme}
                    onChange={(e) => setNewTheme(e.target.value)}
                    className="w-full p-2.5 rounded-md bg-[#050505] border border-white/15 text-white font-sans mt-1 focus:outline-none focus:border-white/40"
                  />
                </div>

                <div>
                  <label className="text-white/70">Host Venue & County</label>
                  <input
                    type="text"
                    value={newHost}
                    onChange={(e) => setNewHost(e.target.value)}
                    className="w-full p-2.5 rounded-md bg-[#050505] border border-white/15 text-white font-sans mt-1 focus:outline-none focus:border-white/40"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setShowAddFestModal(false)}
                  className="px-4 py-2 rounded-md bg-[#050505] border border-white/10 text-white/70 text-xs font-bold hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-md bg-white text-black font-bold text-xs uppercase tracking-wider hover:bg-zinc-200"
                >
                  Save Festival Record
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </section>
  );
};

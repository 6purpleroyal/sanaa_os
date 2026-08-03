import React, { useState } from 'react';
import {
  Sliders, Plus, Trash2, Edit, CheckCircle2, FileText, Key,
  ShieldAlert, Calendar, Building2, Music, UserCheck, Check,
  AlertTriangle, School, Image, BookOpen, Save, X, ChevronDown,
} from 'lucide-react';
import {
  Festival, Venue, Category, Performance, NewsStory, AuditLog,
  UserRole, Institution, MediaItem, InstitutionType,
} from '../types';

interface AdminCMSProps {
  festivals: Festival[];
  venues: Venue[];
  categories: Category[];
  performances: Performance[];
  stories: NewsStory[];
  auditLogs: AuditLog[];
  userRole: UserRole;
  institutions: Institution[];
  mediaItems: MediaItem[];
  onAddFestival: (fest: Festival) => void;
  onApprovePerformanceScore: (id: string) => void;
  onAddStory: (story: NewsStory) => void;
  onDeleteStory: (id: string) => void;
  onAddInstitution: (inst: Institution) => void;
  onDeleteInstitution: (id: string) => void;
  onAddCategory: (cat: Category) => void;
  onDeleteCategory: (id: string) => void;
  onAddMediaItem: (item: MediaItem) => void;
  onDeleteMediaItem: (id: string) => void;
}

type CmsTab = 'editions' | 'schools' | 'categories' | 'venues' | 'approvals' | 'stories' | 'media' | 'audit';


export const AdminCMS: React.FC<AdminCMSProps> = ({
  festivals, venues, categories, performances, stories, auditLogs,
  userRole, institutions, mediaItems,
  onAddFestival, onApprovePerformanceScore,
  onAddStory, onDeleteStory,
  onAddInstitution, onDeleteInstitution,
  onAddCategory, onDeleteCategory,
  onAddMediaItem, onDeleteMediaItem,
}) => {
  const [activeCmsTab, setActiveCmsTab] = useState<CmsTab>('editions');

  // Festival form
  const [showAddFestModal, setShowAddFestModal] = useState(false);
  const [newYear, setNewYear] = useState<number>(2028);
  const [newEdition, setNewEdition] = useState('102nd');
  const [newTheme, setNewTheme] = useState('Cultural Horizons: Youth Leadership in the Digital Creative Economy');
  const [newHost, setNewHost] = useState('KICC & Bomas of Kenya, Nairobi');

  // School / Institution form
  const [showSchoolModal, setShowSchoolModal] = useState(false);
  const [schoolForm, setSchoolForm] = useState({
    name: '', type: 'Secondary' as InstitutionType, countyName: '',
    principal: '', contacts: '', website: '',
  });

  // Category form
  const [showCatModal, setShowCatModal] = useState(false);
  const [catForm, setCatForm] = useState({
    code: '', name: '', description: '', timeLimitMinutes: 8, maxParticipantsPerGroup: 40,
  });

  // Story form
  const [showStoryModal, setShowStoryModal] = useState(false);
  const [storyForm, setStoryForm] = useState({
    title: '', subtitle: '', category: 'Featured Story' as NewsStory['category'],
    author: '', authorRole: '', content: '', coverImage: '',
  });

  // Media form
  const [showMediaModal, setShowMediaModal] = useState(false);
  const [mediaForm, setMediaForm] = useState({
    title: '', type: 'photo' as MediaItem['type'],
    url: '', tags: '', credits: '', countyName: '', schoolName: '',
  });

  // Delete confirm
  const [deleteConfirm, setDeleteConfirm] = useState<{ type: string; id: string; label: string } | null>(null);

  const isSuperAdmin = userRole === 'Super Admin' || userRole === 'National Admin' || userRole === 'Festival Coordinator';

  const handleCreateFestival = (e: React.FormEvent) => {
    e.preventDefault();
    onAddFestival({
      id: `fest-${newYear}`, year: newYear, edition: newEdition, theme: newTheme,
      dates: `August 10 - 22, ${newYear}`,
      logo: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&auto=format&fit=crop&q=80',
      banner: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1600&auto=format&fit=crop&q=80',
      status: 'Upcoming', totalSchools: 1000, totalParticipants: 15000,
      totalCounties: 47, totalPerformances: 700, totalAwards: 100,
      hostVenue: newHost, hostCounty: 'Nairobi County',
    });
    setShowAddFestModal(false);
  };

  const handleAddSchool = (e: React.FormEvent) => {
    e.preventDefault();
    onAddInstitution({
      id: `inst-${Date.now()}`,
      name: schoolForm.name,
      type: schoolForm.type,
      countyId: `cty-${schoolForm.countyName.toLowerCase().replace(/\s/g, '-')}`,
      countyName: schoolForm.countyName,
      principal: schoolForm.principal,
      logo: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=150&auto=format&fit=crop&q=80',
      contacts: schoolForm.contacts,
      website: schoolForm.website || undefined,
      totalAppearances: 1,
      trophiesWon: 0,
    });
    setShowSchoolModal(false);
    setSchoolForm({ name: '', type: 'Secondary', countyName: '', principal: '', contacts: '', website: '' });
  };

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    onAddCategory({
      id: `cat-${Date.now()}`,
      code: catForm.code,
      name: catForm.name,
      type: 'Choral & Folk Songs',
      description: catForm.description,
      timeLimitMinutes: catForm.timeLimitMinutes,
      maxParticipantsPerGroup: catForm.maxParticipantsPerGroup,
    });
    setShowCatModal(false);
    setCatForm({ code: '', name: '', description: '', timeLimitMinutes: 8, maxParticipantsPerGroup: 40 });
  };

  const handleAddStory = (e: React.FormEvent) => {
    e.preventDefault();
    onAddStory({
      id: `news-${Date.now()}`,
      title: storyForm.title,
      subtitle: storyForm.subtitle,
      category: storyForm.category,
      author: storyForm.author,
      authorRole: storyForm.authorRole,
      publishDate: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      coverImage: storyForm.coverImage || 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=1200&auto=format&fit=crop&q=80',
      content: storyForm.content,
      galleryImages: [],
      isFeatured: false,
      readTime: `${Math.ceil(storyForm.content.split(' ').length / 200)} min read`,
      likes: 0,
      commentsCount: 0,
    });
    setShowStoryModal(false);
    setStoryForm({ title: '', subtitle: '', category: 'Featured Story', author: '', authorRole: '', content: '', coverImage: '' });
  };

  const handleAddMedia = (e: React.FormEvent) => {
    e.preventDefault();
    onAddMediaItem({
      id: `med-${Date.now()}`,
      type: mediaForm.type,
      title: mediaForm.title,
      url: mediaForm.url || 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=1200&auto=format&fit=crop&q=80',
      tags: mediaForm.tags.split(',').map(t => t.trim()).filter(Boolean),
      credits: mediaForm.credits,
      countyName: mediaForm.countyName,
      schoolName: mediaForm.schoolName || undefined,
      festivalYear: 2026,
      createdAt: new Date().toISOString().split('T')[0],
    });
    setShowMediaModal(false);
    setMediaForm({ title: '', type: 'photo', url: '', tags: '', credits: '', countyName: '', schoolName: '' });
  };

  const confirmDelete = () => {
    if (!deleteConfirm) return;
    if (deleteConfirm.type === 'story') onDeleteStory(deleteConfirm.id);
    if (deleteConfirm.type === 'school') onDeleteInstitution(deleteConfirm.id);
    if (deleteConfirm.type === 'category') onDeleteCategory(deleteConfirm.id);
    if (deleteConfirm.type === 'media') onDeleteMediaItem(deleteConfirm.id);
    setDeleteConfirm(null);
  };


  const tabs: { id: CmsTab; label: string; icon: React.ElementType; badge?: string }[] = [
    { id: 'editions', label: 'Festivals', icon: Calendar },
    { id: 'schools', label: 'Schools', icon: School, badge: `${institutions.length}` },
    { id: 'categories', label: 'Categories', icon: Music, badge: `${categories.length}` },
    { id: 'venues', label: 'Venues', icon: Building2 },
    { id: 'approvals', label: 'Approvals', icon: CheckCircle2, badge: 'Queue' },
    { id: 'stories', label: 'Stories', icon: BookOpen, badge: `${stories.length}` },
    { id: 'media', label: 'Media', icon: Image, badge: `${mediaItems.length}` },
    { id: 'audit', label: 'Audit & API', icon: Key },
  ];

  // ──────────────── Shared input styles ────────────────
  const inp = 'w-full p-2.5 rounded-md bg-[#050505] border border-white/15 text-white font-mono mt-1 focus:outline-none focus:border-[#4ade80]/60 text-xs';
  const btn = 'px-5 py-2.5 rounded-md bg-[#006600] hover:bg-[#15803d] text-white font-mono font-bold text-xs uppercase tracking-wider transition-all';
  const btnGhost = 'px-4 py-2.5 rounded-md bg-[#050505] border border-white/10 text-white/70 text-xs font-bold hover:text-white font-mono';

  return (
    <section className="py-10 px-4 sm:px-6 lg:px-8 bg-[#050505] text-white min-h-screen border-b border-white/10">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <div className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-[#4ade80] flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5" />
              <span>Super Admin · FestivalOS CMS Command Desk</span>
            </div>
            <h2 className="text-3xl font-serif text-white tracking-tight mt-1">Admin Control Center</h2>
            <p className="text-xs text-zinc-400 max-w-2xl mt-1 font-sans">
              Add schools, categories, venues, stories, media, approve scores and manage all festival data.
            </p>
          </div>
          {!isSuperAdmin && (
            <div className="bg-[#09090b] border border-[#BB0000]/40 p-3 rounded-md flex items-center gap-2 text-red-400 text-xs font-mono">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>Read-only view for role '{userRole}'.</span>
            </div>
          )}
        </div>

        {/* CMS Tabs */}
        <div className="flex items-center gap-2 border-b border-white/10 overflow-x-auto pb-2 font-mono text-xs">
          {tabs.map(({ id, label, icon: Icon, badge }) => {
            const isActive = activeCmsTab === id;
            return (
              <button key={id} onClick={() => setActiveCmsTab(id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-md font-bold transition-all whitespace-nowrap uppercase tracking-wider ${
                  isActive ? 'bg-[#006600] text-white shadow-md' : 'bg-[#09090b] text-white/70 border border-white/10 hover:bg-white/10 hover:text-white'
                }`}>
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-[#4ade80]'}`} />
                <span>{label}</span>
                {badge && <span className="text-[9px] bg-white/20 text-white font-bold px-1.5 py-0.5 rounded uppercase">{badge}</span>}
              </button>
            );
          })}
        </div>


        {/* ── TAB: Festival Editions ── */}
        {activeCmsTab === 'editions' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-serif text-white">Configured Festival Years</h3>
              {isSuperAdmin && (
                <button onClick={() => setShowAddFestModal(true)} className={`${btn} flex items-center gap-1.5`}>
                  <Plus className="w-4 h-4" /> Create New Festival Record
                </button>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {festivals.map((f) => (
                <div key={f.id} className="bg-[#09090b] p-5 rounded-xl border border-white/10 space-y-3 shadow-xl">
                  <div className="flex items-center justify-between font-mono">
                    <span className="text-[10px] font-bold text-[#4ade80] bg-white/10 px-2.5 py-0.5 rounded border border-white/10 uppercase tracking-wider">
                      {f.edition} KNMF ({f.year})
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase tracking-wider ${
                      f.status === 'Active' ? 'bg-[#006600]/20 text-[#4ade80] border-[#006600]/40' :
                      f.status === 'Upcoming' ? 'bg-white/10 text-white border-white/20' : 'bg-black text-white/40 border-white/10'
                    }`}>{f.status}</span>
                  </div>
                  <div>
                    <h4 className="text-lg font-serif font-bold text-white">{f.theme}</h4>
                    <p className="text-xs text-zinc-400 mt-1">{f.dates} · Host: {f.hostVenue}</p>
                  </div>
                  <div className="pt-3 border-t border-white/10 text-xs text-white/50 flex items-center justify-between font-mono">
                    <span>{f.totalSchools.toLocaleString()} Schools</span>
                    <span>{f.totalPerformances.toLocaleString()} Performances</span>
                    <span>{f.totalAwards} Awards</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── TAB: Schools ── */}
        {activeCmsTab === 'schools' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-serif text-white">Registered Schools & Institutions <span className="text-white/40 font-normal font-mono text-sm">({institutions.length})</span></h3>
              {isSuperAdmin && (
                <button onClick={() => setShowSchoolModal(true)} className={`${btn} flex items-center gap-1.5`}>
                  <Plus className="w-4 h-4" /> Add School
                </button>
              )}
            </div>
            <div className="bg-[#09090b] rounded-xl border border-white/10 overflow-hidden">
              <table className="w-full text-xs font-mono">
                <thead>
                  <tr className="border-b border-white/10 text-[10px] text-white/40 uppercase tracking-widest">
                    <th className="text-left p-3 pl-4">School Name</th>
                    <th className="text-left p-3">Type</th>
                    <th className="text-left p-3">County</th>
                    <th className="text-left p-3">Principal</th>
                    <th className="text-left p-3">Appearances</th>
                    {isSuperAdmin && <th className="p-3 text-right pr-4">Actions</th>}
                  </tr>
                </thead>
                <tbody>
                  {institutions.map((inst) => (
                    <tr key={inst.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="p-3 pl-4">
                        <div className="font-bold text-white font-serif text-sm">{inst.name}</div>
                        <div className="text-white/40 text-[10px] mt-0.5">{inst.contacts}</div>
                      </td>
                      <td className="p-3">
                        <span className="bg-[#006600]/20 text-[#4ade80] border border-[#006600]/30 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">{inst.type}</span>
                      </td>
                      <td className="p-3 text-zinc-300">{inst.countyName}</td>
                      <td className="p-3 text-zinc-300">{inst.principal}</td>
                      <td className="p-3 text-amber-400 font-bold">{inst.totalAppearances}</td>
                      {isSuperAdmin && (
                        <td className="p-3 text-right pr-4">
                          <button onClick={() => setDeleteConfirm({ type: 'school', id: inst.id, label: inst.name })}
                            className="text-white/30 hover:text-[#BB0000] transition-colors p-1.5 rounded hover:bg-[#BB0000]/10">
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
              {institutions.length === 0 && (
                <div className="p-10 text-center text-white/30 font-mono text-sm">No schools added yet. Click "Add School" to begin.</div>
              )}
            </div>
          </div>
        )}


        {/* ── TAB: Categories ── */}
        {activeCmsTab === 'categories' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-serif text-white">Performance Categories <span className="text-white/40 font-normal font-mono text-sm">({categories.length})</span></h3>
              {isSuperAdmin && (
                <button onClick={() => setShowCatModal(true)} className={`${btn} flex items-center gap-1.5`}>
                  <Plus className="w-4 h-4" /> Add Category
                </button>
              )}
            </div>
            <div className="space-y-3">
              {categories.map((cat) => (
                <div key={cat.id} className="bg-[#09090b] p-4 rounded-xl border border-white/10 flex items-center justify-between gap-4 shadow-md">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-mono text-[10px] bg-[#006600]/20 text-[#4ade80] border border-[#006600]/30 px-2 py-0.5 rounded font-bold uppercase tracking-wider">{cat.code}</span>
                      <h4 className="font-serif font-bold text-white text-sm">{cat.name}</h4>
                    </div>
                    <p className="text-xs text-zinc-400">{cat.description}</p>
                    <div className="text-[10px] font-mono text-white/40">
                      Time Limit: {cat.timeLimitMinutes} min · Max Participants: {cat.maxParticipantsPerGroup}
                    </div>
                  </div>
                  {isSuperAdmin && (
                    <button onClick={() => setDeleteConfirm({ type: 'category', id: cat.id, label: cat.name })}
                      className="shrink-0 text-white/30 hover:text-[#BB0000] transition-colors p-2 rounded hover:bg-[#BB0000]/10">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
              {categories.length === 0 && (
                <div className="p-10 text-center text-white/30 font-mono text-sm bg-[#09090b] rounded-xl border border-white/10">No categories added yet.</div>
              )}
            </div>
          </div>
        )}

        {/* ── TAB: Venues ── */}
        {activeCmsTab === 'venues' && (
          <div className="space-y-4">
            <h3 className="text-xl font-serif text-white">Venues & Performance Halls</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {venues.map((v) => (
                <div key={v.id} className="bg-[#09090b] p-5 rounded-xl border border-white/10 space-y-3">
                  <div className="flex items-center justify-between font-mono">
                    <h4 className="font-serif font-bold text-white">{v.name}</h4>
                    <span className={`text-[10px] px-2 py-0.5 rounded font-bold border uppercase ${
                      v.status === 'Active' ? 'bg-[#006600]/20 text-[#4ade80] border-[#006600]/40' :
                      v.status === 'Idle' ? 'bg-white/5 text-white/50 border-white/10' : 'bg-[#BB0000]/10 text-red-400 border-[#BB0000]/30'
                    }`}>{v.status}</span>
                  </div>
                  <p className="text-xs text-zinc-400 font-mono">{v.hall}</p>
                  <div className="text-[11px] font-mono text-white/40 flex gap-4">
                    <span>Capacity: {v.capacity.toLocaleString()}</span>
                    <span>Judges: {v.assignedJudgeCount}</span>
                  </div>
                  {v.currentPerformance && (
                    <div className="text-xs font-mono text-[#4ade80] bg-[#006600]/10 border border-[#006600]/20 px-3 py-1.5 rounded-md">
                      🎵 Now: {v.currentPerformance}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── TAB: Result Approvals ── */}
        {activeCmsTab === 'approvals' && (
          <div className="space-y-4">
            <div className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-[#4ade80] flex items-center justify-between border-b border-white/10 pb-2">
              <span>Judge Scorecard Review Queue</span><span>Pending Approval</span>
            </div>
            <div className="space-y-3">
              {performances.map((perf) => (
                <div key={perf.id} className="bg-[#09090b] p-4 rounded-xl border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-white text-sm font-mono">{perf.schoolName}</span>
                      <span className="text-[9px] bg-white/10 text-[#4ade80] px-2 py-0.5 rounded font-mono border border-white/10">{perf.categoryName}</span>
                    </div>
                    <div className="text-xs text-zinc-300 font-serif italic">"{perf.pieceTitle}" · {perf.conductor}</div>
                    <div className="text-[11px] text-zinc-400 font-mono">{perf.venueName} · {perf.countyName}</div>
                  </div>
                  <div className="flex items-center gap-4 shrink-0 font-mono">
                    <div className="text-right">
                      <div className="text-[10px] text-white/40 uppercase">Score</div>
                      <div className="text-2xl font-bold text-[#4ade80]">{perf.finalScore ? `${perf.finalScore.toFixed(1)}` : '—'}</div>
                    </div>
                    {isSuperAdmin && (
                      <button onClick={() => { onApprovePerformanceScore(perf.id); }}
                        className={`${btn} flex items-center gap-1.5`}>
                        <Check className="w-4 h-4" /> Approve
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}


        {/* ── TAB: Stories ── */}
        {activeCmsTab === 'stories' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-serif text-white">Journalism & Storytelling <span className="text-white/40 font-normal font-mono text-sm">({stories.length})</span></h3>
              {isSuperAdmin && (
                <button onClick={() => setShowStoryModal(true)} className={`${btn} flex items-center gap-1.5`}>
                  <Plus className="w-4 h-4" /> New Story
                </button>
              )}
            </div>
            <div className="space-y-3">
              {stories.map((story) => (
                <div key={story.id} className="bg-[#09090b] p-4 rounded-xl border border-white/10 flex items-start justify-between gap-4">
                  <div className="flex gap-4 flex-1 min-w-0">
                    <img src={story.coverImage} alt="" className="w-20 h-16 rounded-lg object-cover border border-white/10 shrink-0" />
                    <div className="space-y-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[9px] font-mono bg-[#006600]/20 text-[#4ade80] border border-[#006600]/30 px-2 py-0.5 rounded uppercase font-bold tracking-wider">{story.category}</span>
                        {story.isFeatured && <span className="text-[9px] font-mono bg-white/20 text-white px-2 py-0.5 rounded uppercase font-bold">Featured</span>}
                      </div>
                      <h4 className="font-serif font-bold text-white text-sm truncate">{story.title}</h4>
                      <p className="text-xs text-zinc-400 line-clamp-1">{story.subtitle}</p>
                      <div className="text-[10px] font-mono text-white/40">By {story.author} · {story.publishDate} · {story.readTime}</div>
                    </div>
                  </div>
                  {isSuperAdmin && (
                    <button onClick={() => setDeleteConfirm({ type: 'story', id: story.id, label: story.title })}
                      className="shrink-0 text-white/30 hover:text-[#BB0000] transition-colors p-2 rounded hover:bg-[#BB0000]/10">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
              {stories.length === 0 && (
                <div className="p-10 text-center text-white/30 font-mono text-sm bg-[#09090b] rounded-xl border border-white/10">No stories yet. Click "New Story" to publish.</div>
              )}
            </div>
          </div>
        )}

        {/* ── TAB: Media ── */}
        {activeCmsTab === 'media' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-serif text-white">Media Coverage Gallery <span className="text-white/40 font-normal font-mono text-sm">({mediaItems.length})</span></h3>
              {isSuperAdmin && (
                <button onClick={() => setShowMediaModal(true)} className={`${btn} flex items-center gap-1.5`}>
                  <Plus className="w-4 h-4" /> Add Media
                </button>
              )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {mediaItems.map((item) => (
                <div key={item.id} className="bg-[#09090b] rounded-xl border border-white/10 overflow-hidden group relative">
                  <div className="h-44 relative overflow-hidden">
                    <img src={item.url} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute top-2 left-2 bg-[#050505]/80 text-[#4ade80] font-mono text-[9px] uppercase px-2 py-0.5 rounded border border-[#006600]/40 font-bold tracking-wider">{item.type}</div>
                    {isSuperAdmin && (
                      <button onClick={() => setDeleteConfirm({ type: 'media', id: item.id, label: item.title })}
                        className="absolute top-2 right-2 bg-[#BB0000]/80 text-white p-1.5 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                  <div className="p-3 space-y-1">
                    <h4 className="font-serif text-sm font-bold text-white truncate">{item.title}</h4>
                    <div className="text-[10px] font-mono text-white/40">{item.countyName} · {item.festivalYear}</div>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {item.tags.slice(0, 3).map((tag, i) => (
                        <span key={i} className="text-[9px] bg-white/10 text-white/60 px-1.5 py-0.5 rounded font-mono">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
              {mediaItems.length === 0 && (
                <div className="col-span-3 p-10 text-center text-white/30 font-mono text-sm bg-[#09090b] rounded-xl border border-white/10">No media added yet.</div>
              )}
            </div>
          </div>
        )}

        {/* ── TAB: Audit ── */}
        {activeCmsTab === 'audit' && (
          <div className="space-y-6">
            <div className="bg-[#09090b] p-5 rounded-xl border border-white/10 space-y-3">
              <h4 className="text-[10px] font-mono font-bold text-[#4ade80] uppercase tracking-[0.2em] flex items-center gap-2">
                <Key className="w-4 h-4" /> API Connection & Server Credentials
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                <div className="bg-[#050505] p-3 rounded-md border border-white/10">
                  <div className="text-white/40">GEMINI_API_KEY</div>
                  <div className="text-[#4ade80] font-bold mt-1">●●●●●●●●●●●●●●●● (Server-Injected)</div>
                </div>
                <div className="bg-[#050505] p-3 rounded-md border border-white/10">
                  <div className="text-white/40">APP_URL</div>
                  <div className="text-[#4ade80] font-bold mt-1">https://festivalos.kenya.go.ke</div>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="text-[10px] font-bold text-white/50 uppercase tracking-[0.2em] font-mono">System Audit & Security Logs</div>
              <div className="bg-[#09090b] rounded-xl border border-white/10 overflow-hidden text-xs">
                {auditLogs.map((log) => (
                  <div key={log.id} className="p-3 border-b border-white/10 flex items-start justify-between gap-4">
                    <div>
                      <div className="font-bold text-white font-mono">{log.action}</div>
                      <div className="text-[11px] text-zinc-400 mt-0.5 font-sans">{log.details}</div>
                    </div>
                    <div className="text-right font-mono text-[10px] text-white/40 shrink-0">
                      <div>{log.user}</div><div>{log.timestamp}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}


        {/* ──────── MODALS ──────── */}

        {/* Create Festival */}
        {showAddFestModal && (
          <div className="fixed inset-0 z-50 bg-[#050505]/80 backdrop-blur flex items-center justify-center p-4">
            <form onSubmit={handleCreateFestival} className="bg-[#09090b] p-6 rounded-xl border border-white/20 max-w-lg w-full space-y-4 shadow-2xl">
              <div className="flex items-center justify-between"><h3 className="text-xl font-serif text-white">New Festival Edition</h3>
                <button type="button" onClick={() => setShowAddFestModal(false)} className="text-white/40 hover:text-white"><X className="w-5 h-5" /></button>
              </div>
              <div className="space-y-3 text-xs">
                <div><label className="text-white/60 font-mono">Year</label><input type="number" value={newYear} onChange={(e) => setNewYear(parseInt(e.target.value))} className={inp} /></div>
                <div><label className="text-white/60 font-mono">Edition (e.g. 102nd)</label><input type="text" value={newEdition} onChange={(e) => setNewEdition(e.target.value)} className={inp} /></div>
                <div><label className="text-white/60 font-mono">Theme</label><textarea rows={2} value={newTheme} onChange={(e) => setNewTheme(e.target.value)} className={inp} /></div>
                <div><label className="text-white/60 font-mono">Host Venue & County</label><input type="text" value={newHost} onChange={(e) => setNewHost(e.target.value)} className={inp} /></div>
              </div>
              <div className="flex justify-end gap-3 pt-3 border-t border-white/10">
                <button type="button" onClick={() => setShowAddFestModal(false)} className={btnGhost}>Cancel</button>
                <button type="submit" className={btn}>Save Festival</button>
              </div>
            </form>
          </div>
        )}

        {/* Add School */}
        {showSchoolModal && (
          <div className="fixed inset-0 z-50 bg-[#050505]/80 backdrop-blur flex items-center justify-center p-4">
            <form onSubmit={handleAddSchool} className="bg-[#09090b] p-6 rounded-xl border border-white/20 max-w-lg w-full space-y-4 shadow-2xl">
              <div className="flex items-center justify-between"><h3 className="text-xl font-serif text-white">Add School / Institution</h3>
                <button type="button" onClick={() => setShowSchoolModal(false)} className="text-white/40 hover:text-white"><X className="w-5 h-5" /></button>
              </div>
              <div className="space-y-3 text-xs">
                <div><label className="text-white/60 font-mono">School Name *</label><input required type="text" value={schoolForm.name} onChange={(e) => setSchoolForm({...schoolForm, name: e.target.value})} placeholder="e.g. Alliance High School" className={inp} /></div>
                <div><label className="text-white/60 font-mono">Institution Type</label>
                  <select value={schoolForm.type} onChange={(e) => setSchoolForm({...schoolForm, type: e.target.value as InstitutionType})} className={inp}>
                    {['Primary','Secondary','University','TVET','Special School'].map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div><label className="text-white/60 font-mono">County *</label><input required type="text" value={schoolForm.countyName} onChange={(e) => setSchoolForm({...schoolForm, countyName: e.target.value})} placeholder="e.g. Nairobi" className={inp} /></div>
                <div><label className="text-white/60 font-mono">Principal / Head Teacher *</label><input required type="text" value={schoolForm.principal} onChange={(e) => setSchoolForm({...schoolForm, principal: e.target.value})} className={inp} /></div>
                <div><label className="text-white/60 font-mono">Contact (Phone / Email)</label><input type="text" value={schoolForm.contacts} onChange={(e) => setSchoolForm({...schoolForm, contacts: e.target.value})} className={inp} /></div>
                <div><label className="text-white/60 font-mono">Website (optional)</label><input type="text" value={schoolForm.website} onChange={(e) => setSchoolForm({...schoolForm, website: e.target.value})} className={inp} /></div>
              </div>
              <div className="flex justify-end gap-3 pt-3 border-t border-white/10">
                <button type="button" onClick={() => setShowSchoolModal(false)} className={btnGhost}>Cancel</button>
                <button type="submit" className={btn}>Save School</button>
              </div>
            </form>
          </div>
        )}

        {/* Add Category */}
        {showCatModal && (
          <div className="fixed inset-0 z-50 bg-[#050505]/80 backdrop-blur flex items-center justify-center p-4">
            <form onSubmit={handleAddCategory} className="bg-[#09090b] p-6 rounded-xl border border-white/20 max-w-lg w-full space-y-4 shadow-2xl">
              <div className="flex items-center justify-between"><h3 className="text-xl font-serif text-white">Add Performance Category</h3>
                <button type="button" onClick={() => setShowCatModal(false)} className="text-white/40 hover:text-white"><X className="w-5 h-5" /></button>
              </div>
              <div className="space-y-3 text-xs">
                <div><label className="text-white/60 font-mono">Category Code *</label><input required type="text" value={catForm.code} onChange={(e) => setCatForm({...catForm, code: e.target.value})} placeholder="e.g. FOLK-702" className={inp} /></div>
                <div><label className="text-white/60 font-mono">Category Name *</label><input required type="text" value={catForm.name} onChange={(e) => setCatForm({...catForm, name: e.target.value})} className={inp} /></div>
                <div><label className="text-white/60 font-mono">Description</label><textarea rows={2} value={catForm.description} onChange={(e) => setCatForm({...catForm, description: e.target.value})} className={inp} /></div>
                <div className="grid grid-cols-2 gap-3">
                  <div><label className="text-white/60 font-mono">Time Limit (min)</label><input type="number" value={catForm.timeLimitMinutes} onChange={(e) => setCatForm({...catForm, timeLimitMinutes: parseInt(e.target.value)})} className={inp} /></div>
                  <div><label className="text-white/60 font-mono">Max Participants</label><input type="number" value={catForm.maxParticipantsPerGroup} onChange={(e) => setCatForm({...catForm, maxParticipantsPerGroup: parseInt(e.target.value)})} className={inp} /></div>
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-3 border-t border-white/10">
                <button type="button" onClick={() => setShowCatModal(false)} className={btnGhost}>Cancel</button>
                <button type="submit" className={btn}>Save Category</button>
              </div>
            </form>
          </div>
        )}

        {/* Add Story */}
        {showStoryModal && (
          <div className="fixed inset-0 z-50 bg-[#050505]/80 backdrop-blur flex items-center justify-center p-4 overflow-y-auto">
            <form onSubmit={handleAddStory} className="bg-[#09090b] p-6 rounded-xl border border-white/20 max-w-2xl w-full space-y-4 shadow-2xl my-4">
              <div className="flex items-center justify-between"><h3 className="text-xl font-serif text-white">Publish New Story</h3>
                <button type="button" onClick={() => setShowStoryModal(false)} className="text-white/40 hover:text-white"><X className="w-5 h-5" /></button>
              </div>
              <div className="space-y-3 text-xs">
                <div><label className="text-white/60 font-mono">Headline *</label><input required type="text" value={storyForm.title} onChange={(e) => setStoryForm({...storyForm, title: e.target.value})} className={inp} /></div>
                <div><label className="text-white/60 font-mono">Subtitle / Deck</label><input type="text" value={storyForm.subtitle} onChange={(e) => setStoryForm({...storyForm, subtitle: e.target.value})} className={inp} /></div>
                <div><label className="text-white/60 font-mono">Story Category</label>
                  <select value={storyForm.category} onChange={(e) => setStoryForm({...storyForm, category: e.target.value as NewsStory['category']})} className={inp}>
                    {['Featured Story','Behind the Performance','Artist Spotlight','School Spotlight','Judge Perspective','Volunteer Diaries','Cultural Heritage'].map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div><label className="text-white/60 font-mono">Author Name *</label><input required type="text" value={storyForm.author} onChange={(e) => setStoryForm({...storyForm, author: e.target.value})} className={inp} /></div>
                  <div><label className="text-white/60 font-mono">Author Role</label><input type="text" value={storyForm.authorRole} onChange={(e) => setStoryForm({...storyForm, authorRole: e.target.value})} placeholder="e.g. Cultural Correspondent" className={inp} /></div>
                </div>
                <div><label className="text-white/60 font-mono">Cover Image URL (optional)</label><input type="text" value={storyForm.coverImage} onChange={(e) => setStoryForm({...storyForm, coverImage: e.target.value})} placeholder="https://..." className={inp} /></div>
                <div><label className="text-white/60 font-mono">Story Body *</label><textarea required rows={6} value={storyForm.content} onChange={(e) => setStoryForm({...storyForm, content: e.target.value})} placeholder="Write the full story here..." className={inp} /></div>
              </div>
              <div className="flex justify-end gap-3 pt-3 border-t border-white/10">
                <button type="button" onClick={() => setShowStoryModal(false)} className={btnGhost}>Cancel</button>
                <button type="submit" className={btn}>Publish Story</button>
              </div>
            </form>
          </div>
        )}

        {/* Add Media */}
        {showMediaModal && (
          <div className="fixed inset-0 z-50 bg-[#050505]/80 backdrop-blur flex items-center justify-center p-4">
            <form onSubmit={handleAddMedia} className="bg-[#09090b] p-6 rounded-xl border border-white/20 max-w-lg w-full space-y-4 shadow-2xl">
              <div className="flex items-center justify-between"><h3 className="text-xl font-serif text-white">Add Media Item</h3>
                <button type="button" onClick={() => setShowMediaModal(false)} className="text-white/40 hover:text-white"><X className="w-5 h-5" /></button>
              </div>
              <div className="space-y-3 text-xs">
                <div><label className="text-white/60 font-mono">Title *</label><input required type="text" value={mediaForm.title} onChange={(e) => setMediaForm({...mediaForm, title: e.target.value})} className={inp} /></div>
                <div><label className="text-white/60 font-mono">Type</label>
                  <select value={mediaForm.type} onChange={(e) => setMediaForm({...mediaForm, type: e.target.value as MediaItem['type']})} className={inp}>
                    <option value="photo">Photo</option><option value="video">Video</option><option value="audio">Audio</option>
                  </select>
                </div>
                <div><label className="text-white/60 font-mono">Media URL *</label><input required type="text" value={mediaForm.url} onChange={(e) => setMediaForm({...mediaForm, url: e.target.value})} placeholder="https://..." className={inp} /></div>
                <div><label className="text-white/60 font-mono">County</label><input type="text" value={mediaForm.countyName} onChange={(e) => setMediaForm({...mediaForm, countyName: e.target.value})} className={inp} /></div>
                <div><label className="text-white/60 font-mono">School (optional)</label><input type="text" value={mediaForm.schoolName} onChange={(e) => setMediaForm({...mediaForm, schoolName: e.target.value})} className={inp} /></div>
                <div><label className="text-white/60 font-mono">Tags (comma-separated)</label><input type="text" value={mediaForm.tags} onChange={(e) => setMediaForm({...mediaForm, tags: e.target.value})} placeholder="Gold Medal, Choral, Nairobi" className={inp} /></div>
                <div><label className="text-white/60 font-mono">Photo Credits</label><input type="text" value={mediaForm.credits} onChange={(e) => setMediaForm({...mediaForm, credits: e.target.value})} className={inp} /></div>
              </div>
              <div className="flex justify-end gap-3 pt-3 border-t border-white/10">
                <button type="button" onClick={() => setShowMediaModal(false)} className={btnGhost}>Cancel</button>
                <button type="submit" className={btn}>Add Media</button>
              </div>
            </form>
          </div>
        )}

        {/* Delete Confirm */}
        {deleteConfirm && (
          <div className="fixed inset-0 z-50 bg-[#050505]/80 backdrop-blur flex items-center justify-center p-4">
            <div className="bg-[#09090b] p-6 rounded-xl border border-[#BB0000]/30 max-w-sm w-full space-y-4 shadow-2xl">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-[#BB0000]/10 rounded-lg border border-[#BB0000]/30 shrink-0">
                  <Trash2 className="w-5 h-5 text-red-400" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-white text-lg">Confirm Delete</h3>
                  <p className="text-xs text-zinc-400 mt-1 font-sans">
                    Are you sure you want to permanently delete <span className="text-white font-bold">"{deleteConfirm.label}"</span>? This cannot be undone.
                  </p>
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-2 border-t border-white/10">
                <button onClick={() => setDeleteConfirm(null)} className={btnGhost}>Cancel</button>
                <button onClick={confirmDelete} className="px-5 py-2.5 rounded-md bg-[#BB0000] hover:bg-red-700 text-white font-mono font-bold text-xs uppercase tracking-wider transition-all">
                  Delete Permanently
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

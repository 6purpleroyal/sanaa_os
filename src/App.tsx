import React, { useState, useEffect } from 'react';
import {
  INITIAL_FESTIVALS, INITIAL_VENUES, INITIAL_COUNTIES, INITIAL_INSTITUTIONS,
  INITIAL_CATEGORIES, INITIAL_PERFORMANCES, INITIAL_JUDGES, INITIAL_AWARDS,
  INITIAL_SPONSORS, INITIAL_NEWS, INITIAL_MEDIA, INITIAL_VOLUNTEER_TASKS, INITIAL_AUDIT_LOGS,
} from './data/mockFestivalData';
import { Festival, UserRole, Performance, OfflineScoreCapture, Award, NewsStory, Institution, Category, MediaItem } from './types';
import { Header } from './components/Header';
import { HeroCinematic } from './components/HeroCinematic';
import { FestivalInNumbers } from './components/FestivalInNumbers';
import { InteractiveKenyaMap } from './components/InteractiveKenyaMap';
import { DataCollectionModule } from './components/DataCollectionModule';
import { LiveDashboard } from './components/LiveDashboard';
import { MagazineStorytelling } from './components/MagazineStorytelling';
import { DigitalArchive } from './components/DigitalArchive';
import { AnalyticsDashboard } from './components/AnalyticsDashboard';
import { AdminCMS } from './components/AdminCMS';
import { AdminLogin } from './components/AdminLogin';
import { AIAssistantModal } from './components/AIAssistantModal';
import { Footer } from './components/Footer';

export default function App() {
  const [festivals, setFestivals] = useState<Festival[]>(INITIAL_FESTIVALS);
  const [currentFestival, setCurrentFestival] = useState<Festival>(INITIAL_FESTIVALS[0]);
  const [userRole, setUserRole] = useState<UserRole>('Super Admin');
  const [activeTab, setActiveTab] = useState<string>('landing');
  const [darkMode, setDarkMode] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const [performances, setPerformances] = useState<Performance[]>(INITIAL_PERFORMANCES);
  const [awards, setAwards] = useState<Award[]>(INITIAL_AWARDS);
  const [auditLogs, setAuditLogs] = useState(INITIAL_AUDIT_LOGS);
  const [stories, setStories] = useState<NewsStory[]>(INITIAL_NEWS);
  const [institutions, setInstitutions] = useState<Institution[]>(INITIAL_INSTITUTIONS);
  const [categories, setCategories] = useState<Category[]>(INITIAL_CATEGORIES);
  const [mediaItems, setMediaItems] = useState<MediaItem[]>(INITIAL_MEDIA);
  const [isAIOpen, setIsAIOpen] = useState(false);

  // Admin login gate
  const [adminAuthenticated, setAdminAuthenticated] = useState(false);

  // When user navigates away from admin, reset auth
  useEffect(() => {
    if (activeTab !== 'admin') setAdminAuthenticated(false);
  }, [activeTab]);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  const handleAddFestival = (newFest: Festival) => {
    setFestivals((prev) => [newFest, ...prev]);
    setCurrentFestival(newFest);
  };

  const handleAddScoreFromTablet = (scoreData: OfflineScoreCapture) => {
    const newPerf: Performance = {
      id: scoreData.performanceId,
      festivalYear: currentFestival.year,
      categoryId: 'cat-01',
      categoryName: scoreData.categoryName,
      categoryCode: 'CAP-2026',
      venueId: 'v-01',
      venueName: scoreData.venueName,
      scheduledTime: scoreData.timestamp,
      schoolId: 'inst-01',
      schoolName: scoreData.schoolName,
      countyName: 'Kakamega',
      conductor: 'Mwalimu Tablet Volunteer',
      pieceTitle: 'Captured Scorecard',
      status: 'Scored',
      finalScore: scoreData.finalScore,
      rank: 1,
      awardType: scoreData.finalScore >= 90 ? 'Gold' : scoreData.finalScore >= 80 ? 'Silver' : 'Bronze',
    };
    setPerformances((prev) => [newPerf, ...prev]);
    setAuditLogs((prev) => [{
      id: `log-${Date.now()}`,
      user: `${userRole.toLowerCase().replace(' ', '')}@festivalos.ke`,
      role: userRole,
      action: `Submitted Tablet Scorecard for ${scoreData.schoolName} (${scoreData.finalScore} pts)`,
      timestamp: new Date().toLocaleString(),
      ip: '197.232.88.90',
      details: scoreData.comments,
    }, ...prev]);
  };

  const handleApprovePerformanceScore = (perfId: string) => {
    setPerformances((prev) => prev.map((p) => (p.id === perfId ? { ...p, status: 'Completed' } : p)));
  };

  // CMS data handlers
  const handleAddStory = (s: NewsStory) => setStories((prev) => [s, ...prev]);
  const handleDeleteStory = (id: string) => setStories((prev) => prev.filter((s) => s.id !== id));
  const handleAddInstitution = (inst: Institution) => setInstitutions((prev) => [inst, ...prev]);
  const handleDeleteInstitution = (id: string) => setInstitutions((prev) => prev.filter((i) => i.id !== id));
  const handleAddCategory = (cat: Category) => setCategories((prev) => [...prev, cat]);
  const handleDeleteCategory = (id: string) => setCategories((prev) => prev.filter((c) => c.id !== id));
  const handleAddMediaItem = (item: MediaItem) => setMediaItems((prev) => [item, ...prev]);
  const handleDeleteMediaItem = (id: string) => setMediaItems((prev) => prev.filter((m) => m.id !== id));

  return (
    <div className={`min-h-screen transition-colors ${darkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
      <Header
        festivals={festivals}
        currentFestival={currentFestival}
        onSelectFestival={(f) => setCurrentFestival(f)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        userRole={userRole}
        setUserRole={setUserRole}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        onOpenAI={() => setIsAIOpen(true)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <main>
        {activeTab === 'landing' && (
          <div className="space-y-4">
            <HeroCinematic festival={currentFestival} onNavigate={(tab) => setActiveTab(tab)} />
            <FestivalInNumbers festival={currentFestival} />
            <InteractiveKenyaMap
              counties={INITIAL_COUNTIES}
              onSelectCountyPerformances={(county) => { setSearchQuery(county); setActiveTab('live'); }}
            />
          </div>
        )}
        {activeTab === 'live' && <LiveDashboard performances={performances} awards={awards} />}
        {activeTab === 'capture' && (
          <DataCollectionModule
            venues={INITIAL_VENUES}
            categories={categories}
            institutions={institutions}
            performances={performances}
            judges={INITIAL_JUDGES}
            onAddScore={handleAddScoreFromTablet}
          />
        )}
        {activeTab === 'map' && (
          <InteractiveKenyaMap
            counties={INITIAL_COUNTIES}
            onSelectCountyPerformances={(county) => { setSearchQuery(county); setActiveTab('live'); }}
          />
        )}
        {activeTab === 'magazine' && <MagazineStorytelling stories={stories} />}
        {activeTab === 'archive' && <DigitalArchive performances={performances} mediaItems={mediaItems} />}
        {activeTab === 'analytics' && <AnalyticsDashboard festival={currentFestival} counties={INITIAL_COUNTIES} />}

        {activeTab === 'admin' && (
          adminAuthenticated ? (
            <AdminCMS
              festivals={festivals}
              venues={INITIAL_VENUES}
              categories={categories}
              performances={performances}
              stories={stories}
              auditLogs={auditLogs}
              userRole={userRole}
              institutions={institutions}
              mediaItems={mediaItems}
              onAddFestival={handleAddFestival}
              onApprovePerformanceScore={handleApprovePerformanceScore}
              onAddStory={handleAddStory}
              onDeleteStory={handleDeleteStory}
              onAddInstitution={handleAddInstitution}
              onDeleteInstitution={handleDeleteInstitution}
              onAddCategory={handleAddCategory}
              onDeleteCategory={handleDeleteCategory}
              onAddMediaItem={handleAddMediaItem}
              onDeleteMediaItem={handleDeleteMediaItem}
            />
          ) : (
            <AdminLogin onLogin={() => setAdminAuthenticated(true)} />
          )
        )}
      </main>

      <AIAssistantModal
        isOpen={isAIOpen}
        onClose={() => setIsAIOpen(false)}
        festival={currentFestival}
        counties={INITIAL_COUNTIES}
        performances={performances}
      />

      <Footer festival={currentFestival} sponsors={INITIAL_SPONSORS} onNavigate={(tab) => setActiveTab(tab)} />
    </div>
  );
}

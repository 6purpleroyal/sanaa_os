import React, { useState, useEffect } from 'react';
import {
  INITIAL_FESTIVALS,
  INITIAL_VENUES,
  INITIAL_COUNTIES,
  INITIAL_INSTITUTIONS,
  INITIAL_CATEGORIES,
  INITIAL_PERFORMANCES,
  INITIAL_JUDGES,
  INITIAL_AWARDS,
  INITIAL_SPONSORS,
  INITIAL_NEWS,
  INITIAL_MEDIA,
  INITIAL_VOLUNTEER_TASKS,
  INITIAL_AUDIT_LOGS,
} from './data/mockFestivalData';
import {
  Festival,
  UserRole,
  Performance,
  OfflineScoreCapture,
  Award,
} from './types';
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
  const [isAIOpen, setIsAIOpen] = useState(false);

  // Apply dark mode class to root html element
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
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
      pieceTitle: 'Captured Item Scorecard',
      status: 'Scored',
      finalScore: scoreData.finalScore,
      rank: 1,
      awardType: scoreData.finalScore >= 90 ? 'Gold' : scoreData.finalScore >= 80 ? 'Silver' : 'Bronze',
    };

    setPerformances((prev) => [newPerf, ...prev]);

    // Log in audit logs
    setAuditLogs((prev) => [
      {
        id: `log-${Date.now()}`,
        user: `${userRole.toLowerCase().replace(' ', '')}@festivalos.ke`,
        role: userRole,
        action: `Submitted Tablet Scorecard for ${scoreData.schoolName} (${scoreData.finalScore} pts)`,
        timestamp: new Date().toLocaleString(),
        ip: '197.232.88.90',
        details: scoreData.comments,
      },
      ...prev,
    ]);
  };

  const handleApprovePerformanceScore = (perfId: string) => {
    setPerformances((prev) =>
      prev.map((p) => (p.id === perfId ? { ...p, status: 'Completed' } : p))
    );
  };

  return (
    <div className={`min-h-screen transition-colors ${darkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
      {/* Header */}
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

      {/* Main Tab View Routing */}
      <main>
        {activeTab === 'landing' && (
          <div className="space-y-4">
            <HeroCinematic festival={currentFestival} onNavigate={(tab) => setActiveTab(tab)} />
            <FestivalInNumbers festival={currentFestival} />
            <InteractiveKenyaMap
              counties={INITIAL_COUNTIES}
              onSelectCountyPerformances={(county) => {
                setSearchQuery(county);
                setActiveTab('live');
              }}
            />
          </div>
        )}

        {activeTab === 'live' && (
          <LiveDashboard performances={performances} awards={awards} />
        )}

        {activeTab === 'capture' && (
          <DataCollectionModule
            venues={INITIAL_VENUES}
            categories={INITIAL_CATEGORIES}
            institutions={INITIAL_INSTITUTIONS}
            performances={performances}
            judges={INITIAL_JUDGES}
            onAddScore={handleAddScoreFromTablet}
          />
        )}

        {activeTab === 'map' && (
          <InteractiveKenyaMap
            counties={INITIAL_COUNTIES}
            onSelectCountyPerformances={(county) => {
              setSearchQuery(county);
              setActiveTab('live');
            }}
          />
        )}

        {activeTab === 'magazine' && (
          <MagazineStorytelling stories={INITIAL_NEWS} />
        )}

        {activeTab === 'archive' && (
          <DigitalArchive performances={performances} mediaItems={INITIAL_MEDIA} />
        )}

        {activeTab === 'analytics' && (
          <AnalyticsDashboard festival={currentFestival} counties={INITIAL_COUNTIES} />
        )}

        {activeTab === 'admin' && (
          <AdminCMS
            festivals={festivals}
            venues={INITIAL_VENUES}
            categories={INITIAL_CATEGORIES}
            performances={performances}
            stories={INITIAL_NEWS}
            auditLogs={auditLogs}
            userRole={userRole}
            onAddFestival={handleAddFestival}
            onApprovePerformanceScore={handleApprovePerformanceScore}
          />
        )}
      </main>

      {/* AI Assistant Modal */}
      <AIAssistantModal
        isOpen={isAIOpen}
        onClose={() => setIsAIOpen(false)}
        festival={currentFestival}
        counties={INITIAL_COUNTIES}
        performances={performances}
      />

      {/* Footer */}
      <Footer festival={currentFestival} sponsors={INITIAL_SPONSORS} onNavigate={(tab) => setActiveTab(tab)} />
    </div>
  );
}

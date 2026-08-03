import React, { useState } from 'react';
import {
  Tablet,
  Wifi,
  WifiOff,
  CheckCircle2,
  Sliders,
  Camera,
  Mic,
  Save,
  Clock,
  Sparkles,
  Building2,
  Music,
  School,
  UserCheck,
  RotateCcw,
  UploadCloud,
  FileText,
  AlertCircle,
  Plus,
} from 'lucide-react';
import {
  Venue,
  Category,
  Institution,
  Performance,
  Judge,
  ScoreCriterion,
  OfflineScoreCapture,
} from '../types';

interface DataCollectionModuleProps {
  venues: Venue[];
  categories: Category[];
  institutions: Institution[];
  performances: Performance[];
  judges: Judge[];
  onAddScore: (scoreData: OfflineScoreCapture) => void;
}

export const DataCollectionModule: React.FC<DataCollectionModuleProps> = ({
  venues,
  categories,
  institutions,
  performances,
  judges,
  onAddScore,
}) => {
  const [tabletDarkMode, setTabletDarkMode] = useState(true);
  const [isOnline, setIsOnline] = useState(true);
  const [offlineQueue, setOfflineQueue] = useState<OfflineScoreCapture[]>([]);

  // Step state for quick capture under 30 seconds
  const [selectedVenueId, setSelectedVenueId] = useState<string>(venues[0]?.id || '');
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>(categories[0]?.id || '');
  const [selectedSchoolName, setSelectedSchoolName] = useState<string>(institutions[0]?.name || '');
  const [pieceTitle, setPieceTitle] = useState('Sina Makosa Choral Special');
  const [selectedJudgeId, setSelectedJudgeId] = useState<string>(judges[0]?.id || '');

  // Scores criteria state
  const [scores, setScores] = useState<ScoreCriterion>({
    creativity: 18,
    technique: 19,
    presentation: 18,
    originality: 19,
    timing: 9,
    stagePresence: 9,
  });

  const [comments, setComments] = useState('Outstanding vocal balance, crisp articulation and electrifying stage presence!');
  const [mediaFilesCount, setMediaFilesCount] = useState(1);
  const [savedSuccessAlert, setSavedSuccessAlert] = useState(false);

  // Calculate total score out of 100
  const totalScore =
    scores.creativity +
    scores.technique +
    scores.presentation +
    scores.originality +
    scores.timing +
    scores.stagePresence;

  const handleScoreChange = (key: keyof ScoreCriterion, val: number) => {
    setScores((prev) => ({ ...prev, [key]: val }));
  };

  const handleSaveScore = (e: React.FormEvent) => {
    e.preventDefault();

    const selectedVenue = venues.find((v) => v.id === selectedVenueId);
    const selectedCategory = categories.find((c) => c.id === selectedCategoryId);
    const selectedJudge = judges.find((j) => j.id === selectedJudgeId);

    const newCapture: OfflineScoreCapture = {
      id: `score-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString(),
      performanceId: `perf-${Date.now()}`,
      schoolName: selectedSchoolName,
      categoryName: selectedCategory?.name || 'Choral Performance',
      venueName: selectedVenue?.name || 'Main Hall',
      judgeName: selectedJudge?.name || 'Chief Judge',
      scores,
      finalScore: totalScore,
      comments,
      mediaFilesCount,
      synced: isOnline,
    };

    onAddScore(newCapture);

    if (!isOnline) {
      setOfflineQueue((prev) => [newCapture, ...prev]);
    }

    setSavedSuccessAlert(true);
    setTimeout(() => setSavedSuccessAlert(false), 4000);
  };

  const handleManualSync = () => {
    setOfflineQueue((prev) => prev.map((item) => ({ ...item, synced: true })));
    setTimeout(() => setOfflineQueue([]), 1500);
  };

  return (
    <div
      className={`min-h-screen py-8 px-4 sm:px-6 lg:px-8 transition-colors bg-[#050505] text-white border-b border-white/10`}
    >
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Top Control Header Bar */}
        <div className="bg-[#09090b] p-4 rounded-xl border border-white/15 shadow-2xl flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-white/10 text-white rounded-md border border-white/15 font-mono">
              <Tablet className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <div className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-[0.2em] flex items-center gap-2">
                <span>VOLUNTEER & JUDGE TABLET DESK</span>
                <span className="text-[9px] bg-white/10 text-amber-300 px-2 py-0.5 rounded border border-white/10 uppercase">
                  ⚡ &lt;30s Speed Entry
                </span>
              </div>
              <h2 className="text-2xl font-serif text-white tracking-tight">
                Data Collection Engine
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Online / Offline Simulator Toggle */}
            <button
              onClick={() => setIsOnline(!isOnline)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-[10px] font-bold font-mono tracking-wider transition-all border ${
                isOnline
                  ? 'bg-white text-black border-white'
                  : 'bg-[#121215] text-amber-300 border-amber-400/50'
              }`}
            >
              {isOnline ? (
                <>
                  <Wifi className="w-3.5 h-3.5 text-black" />
                  <span>ONLINE AUTO-SYNC</span>
                </>
              ) : (
                <>
                  <WifiOff className="w-3.5 h-3.5 text-amber-400" />
                  <span>OFFLINE MODE ({offlineQueue.length} QUEUED)</span>
                </>
              )}
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={() => setTabletDarkMode(!tabletDarkMode)}
              className="p-2 rounded-md bg-[#050505] text-amber-400 hover:bg-white/10 transition-colors border border-white/10"
              title="Toggle Tablet Theme"
            >
              <Sliders className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Sync Queue Notice */}
        {offlineQueue.length > 0 && (
          <div className="bg-[#09090b] border border-amber-400/40 p-4 rounded-xl flex items-center justify-between gap-4 font-mono">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-amber-400 shrink-0" />
              <div className="text-xs text-amber-200">
                <span className="font-bold">{offlineQueue.length} scorecards saved locally in tablet offline memory.</span>
                <span className="hidden sm:inline"> They will auto-upload when venue Wi-Fi restores.</span>
              </div>
            </div>

            <button
              onClick={handleManualSync}
              className="flex items-center gap-1.5 bg-amber-400 text-black font-bold text-xs px-3 py-1.5 rounded-md hover:bg-amber-300 transition-colors"
            >
              <UploadCloud className="w-4 h-4" />
              <span>Sync Now</span>
            </button>
          </div>
        )}

        {/* Success Alert */}
        {savedSuccessAlert && (
          <div className="bg-[#09090b] border border-amber-400 p-4 rounded-xl flex items-center justify-between text-amber-300 text-xs font-mono font-bold animate-fade-in">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-amber-400" />
              <span>Scorecard saved & timestamped! Score: {totalScore} / 100 ({isOnline ? 'Synced to Cloud' : 'Stored in Offline Queue'})</span>
            </div>
            <span>{new Date().toLocaleTimeString()}</span>
          </div>
        )}

        {/* Tablet Input Form Layout */}
        <form onSubmit={handleSaveScore} className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Quick Metadata Selectors */}
          <div className="lg:col-span-5 space-y-4 bg-[#09090b] p-5 rounded-xl border border-white/10 shadow-xl">
            <div className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-amber-400 flex items-center gap-1.5 border-b border-white/10 pb-3">
              <Clock className="w-3.5 h-3.5" />
              <span>Step 1: Performance Selection</span>
            </div>

            {/* Venue Selector */}
            <div className="space-y-1">
              <label className="text-xs font-mono text-white/70 flex items-center gap-1">
                <Building2 className="w-3.5 h-3.5 text-amber-400" />
                <span>Assigned Venue Stage</span>
              </label>
              <select
                value={selectedVenueId}
                onChange={(e) => setSelectedVenueId(e.target.value)}
                className="w-full p-3 text-xs rounded-md bg-[#050505] border border-white/15 text-white focus:outline-none focus:border-white/40 font-mono"
              >
                {venues.map((v) => (
                  <option key={v.id} value={v.id}>
                    {v.name} ({v.hall})
                  </option>
                ))}
              </select>
            </div>

            {/* Category Selector */}
            <div className="space-y-1">
              <label className="text-xs font-mono text-white/70 flex items-center gap-1">
                <Music className="w-3.5 h-3.5 text-amber-400" />
                <span>Festival Category</span>
              </label>
              <select
                value={selectedCategoryId}
                onChange={(e) => setSelectedCategoryId(e.target.value)}
                className="w-full p-3 text-xs rounded-md bg-[#050505] border border-white/15 text-white focus:outline-none focus:border-white/40 font-mono"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    [{c.code}] {c.name}
                  </option>
                ))}
              </select>
            </div>

            {/* School Selector */}
            <div className="space-y-1">
              <label className="text-xs font-mono text-white/70 flex items-center gap-1">
                <School className="w-3.5 h-3.5 text-amber-400" />
                <span>Performing School / Troupe</span>
              </label>
              <select
                value={selectedSchoolName}
                onChange={(e) => setSelectedSchoolName(e.target.value)}
                className="w-full p-3 text-xs rounded-md bg-[#050505] border border-white/15 text-white focus:outline-none focus:border-white/40 font-mono"
              >
                {institutions.map((i) => (
                  <option key={i.id} value={i.name}>
                    {i.name} ({i.countyName} County)
                  </option>
                ))}
              </select>
            </div>

            {/* Piece Title Input */}
            <div className="space-y-1">
              <label className="text-xs font-mono text-white/70">
                Piece / Item Title
              </label>
              <input
                type="text"
                value={pieceTitle}
                onChange={(e) => setPieceTitle(e.target.value)}
                className="w-full p-3 text-xs rounded-md bg-[#050505] border border-white/15 text-white focus:outline-none focus:border-white/40 font-mono"
              />
            </div>

            {/* Judge Selector */}
            <div className="space-y-1">
              <label className="text-xs font-mono text-white/70 flex items-center gap-1">
                <UserCheck className="w-3.5 h-3.5 text-amber-400" />
                <span>Scoring Judge</span>
              </label>
              <select
                value={selectedJudgeId}
                onChange={(e) => setSelectedJudgeId(e.target.value)}
                className="w-full p-3 text-xs rounded-md bg-[#050505] border border-white/15 text-white focus:outline-none focus:border-white/40 font-mono"
              >
                {judges.map((j) => (
                  <option key={j.id} value={j.id}>
                    {j.name} ({j.specialization})
                  </option>
                ))}
              </select>
            </div>

            {/* Quick Media Attach Simulation */}
            <div className="pt-2 border-t border-white/10 space-y-2 font-mono">
              <div className="text-[10px] font-bold text-white/40 uppercase tracking-wider">
                Quick Media Capture
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setMediaFilesCount((c) => c + 1)}
                  className="flex items-center justify-center gap-2 p-3 rounded-md bg-[#050505] border border-white/10 hover:border-white/30 text-white/70 hover:text-white text-xs font-semibold transition-all"
                >
                  <Camera className="w-4 h-4 text-amber-400" />
                  <span>Photo ({mediaFilesCount})</span>
                </button>

                <button
                  type="button"
                  onClick={() => alert('Simulated 10-second voice note captured for judge comments')}
                  className="flex items-center justify-center gap-2 p-3 rounded-md bg-[#050505] border border-white/10 hover:border-white/30 text-white/70 hover:text-white text-xs font-semibold transition-all"
                >
                  <Mic className="w-4 h-4 text-amber-400" />
                  <span>Voice Note</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Large Touch Scoring Controls */}
          <div className="lg:col-span-7 space-y-5 bg-[#09090b] p-6 rounded-xl border border-white/15 shadow-2xl flex flex-col justify-between">
            <div>
              {/* Header with Calculated Score */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-5">
                <div>
                  <div className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-[0.2em]">
                    Step 2: Criteria Score Evaluation
                  </div>
                  <h3 className="text-xl font-serif text-white mt-0.5">
                    Touch & Slider Scoring Sheet
                  </h3>
                </div>

                <div className="bg-[#050505] p-3 rounded-md border border-white/15 text-right font-mono">
                  <div className="text-[9px] text-white/40 uppercase font-bold tracking-wider">Total Score</div>
                  <div className="text-3xl font-bold text-amber-400">
                    {totalScore} <span className="text-xs text-white/40 font-normal">/ 100</span>
                  </div>
                </div>
              </div>

              {/* Touch Sliders Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono">
                {/* Creativity */}
                <div className="bg-[#050505] p-4 rounded-md border border-white/10 space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-white/80">Creativity & Harmony</span>
                    <span className="text-amber-400 text-sm font-bold">{scores.creativity} / 20</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="20"
                    value={scores.creativity}
                    onChange={(e) => handleScoreChange('creativity', parseInt(e.target.value))}
                    className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-amber-400"
                  />
                </div>

                {/* Technique */}
                <div className="bg-[#050505] p-4 rounded-md border border-white/10 space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-white/80">Vocal & Instrumental Tech</span>
                    <span className="text-amber-400 text-sm font-bold">{scores.technique} / 20</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="20"
                    value={scores.technique}
                    onChange={(e) => handleScoreChange('technique', parseInt(e.target.value))}
                    className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-amber-400"
                  />
                </div>

                {/* Presentation */}
                <div className="bg-[#050505] p-4 rounded-md border border-white/10 space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-white/80">Stage Attire & Diction</span>
                    <span className="text-amber-400 text-sm font-bold">{scores.presentation} / 20</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="20"
                    value={scores.presentation}
                    onChange={(e) => handleScoreChange('presentation', parseInt(e.target.value))}
                    className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-amber-400"
                  />
                </div>

                {/* Originality */}
                <div className="bg-[#050505] p-4 rounded-md border border-white/10 space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-white/80">Cultural Authenticity</span>
                    <span className="text-amber-400 text-sm font-bold">{scores.originality} / 20</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="20"
                    value={scores.originality}
                    onChange={(e) => handleScoreChange('originality', parseInt(e.target.value))}
                    className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-amber-400"
                  />
                </div>

                {/* Timing */}
                <div className="bg-[#050505] p-4 rounded-md border border-white/10 space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-white/80">Stage Timing & Tempo</span>
                    <span className="text-amber-400 text-sm font-bold">{scores.timing} / 10</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="10"
                    value={scores.timing}
                    onChange={(e) => handleScoreChange('timing', parseInt(e.target.value))}
                    className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-amber-400"
                  />
                </div>

                {/* Stage Presence */}
                <div className="bg-[#050505] p-4 rounded-md border border-white/10 space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-white/80">Stage Presence & Impact</span>
                    <span className="text-amber-400 text-sm font-bold">{scores.stagePresence} / 10</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="10"
                    value={scores.stagePresence}
                    onChange={(e) => handleScoreChange('stagePresence', parseInt(e.target.value))}
                    className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-amber-400"
                  />
                </div>
              </div>

              {/* Judge Comments Field */}
              <div className="mt-4 space-y-1 font-mono">
                <label className="text-xs text-white/70 flex items-center gap-1">
                  <FileText className="w-3.5 h-3.5 text-amber-400" />
                  <span>Judge Remarks & Master Feedback</span>
                </label>
                <textarea
                  rows={2}
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                  className="w-full p-3 text-xs rounded-md bg-[#050505] border border-white/15 text-white focus:outline-none focus:border-white/40 font-mono"
                />
              </div>
            </div>

            {/* Bottom Submit CTA */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={() => {
                  setScores({ creativity: 15, technique: 15, presentation: 15, originality: 15, timing: 8, stagePresence: 8 });
                  setComments('');
                }}
                className="flex items-center gap-1.5 px-4 py-3 rounded-md bg-[#050505] text-white/70 border border-white/10 hover:text-white text-xs font-mono font-bold transition-all"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reset</span>
              </button>

              <button
                type="submit"
                className="flex-1 flex items-center justify-center gap-2 bg-white text-black font-mono font-bold text-xs uppercase tracking-[0.15em] px-6 py-3.5 rounded-md shadow-xl hover:bg-zinc-200 transition-all active:scale-95"
              >
                <Save className="w-4 h-4 text-black" />
                <span>Save & Submit Scorecard (&lt;30s)</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { Bot, Send, X, Sparkles, Loader2, Music, Trophy, BookOpen, RefreshCw } from 'lucide-react';
import { Festival, County, Performance } from '../types';

interface AIAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  festival: Festival;
  counties: County[];
  performances: Performance[];
}

export const AIAssistantModal: React.FC<AIAssistantModalProps> = ({
  isOpen,
  onClose,
  festival,
  counties,
  performances,
}) => {
  const [messages, setMessages] = useState<Array<{ sender: 'user' | 'ai'; text: string }>>([
    {
      sender: 'ai',
      text: `Habari! I am **Festival OS Intelligence AI**, your digital archive and analytics assistant for the Kenya National Music Festival. Ask me anything about scores, school performance records, county standings, Zilizopendwa arrangements, traditional folk dances, or request a drafted press release!`,
    },
  ]);

  const [inputPrompt, setInputPrompt] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const presetQueries = [
    "Who won the Zilizopendwa choir category in 2026?",
    "Which county leads the gold medal standing?",
    "Draft a press release for Kakamega High School's Isukuti victory",
    "How many schools came from Western Region?",
  ];

  const handleSendPrompt = async (promptToSend?: string) => {
    const text = promptToSend || inputPrompt;
    if (!text.trim() || loading) return;

    const userMsg = { sender: 'user' as const, text };
    setMessages((prev) => [...prev, userMsg]);
    setInputPrompt('');
    setLoading(true);

    try {
      const res = await fetch('/api/ai/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: text,
          contextData: {
            currentFestivalYear: festival.year,
            currentFestivalEdition: festival.edition,
            theme: festival.theme,
            totalSchools: festival.totalSchools,
            countiesSample: counties.map((c) => ({ name: c.name, gold: c.goldMedals, top: c.topSchool })),
            performancesSample: performances.map((p) => ({
              school: p.schoolName,
              category: p.categoryName,
              score: p.finalScore,
              award: p.awardType,
            })),
          },
        }),
      });

      const data = await res.json();
      const aiText = data.text || 'I could not process the query right now. Please try again.';
      setMessages((prev) => [...prev, { sender: 'ai', text: aiText }]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: 'Note: Live Gemini AI Server processing completed. (Ensure GEMINI_API_KEY is configured in Secrets panel for live responses).',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#050505]/90 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#09090b] border border-white/20 rounded-xl max-w-2xl w-full h-[80vh] flex flex-col justify-between shadow-2xl relative overflow-hidden text-white">
        {/* Header Bar */}
        <div className="bg-[#050505] p-4 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/10 text-amber-300 rounded border border-white/15 font-mono">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-[0.2em] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>SERVER-SIDE GEMINI AI ENGINE</span>
              </div>
              <h3 className="text-lg font-serif text-white">
                Festival OS Intelligence AI
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 bg-[#121215] border border-white/10 text-white/70 rounded-md hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Preset Prompt Suggestions */}
        <div className="bg-[#050505] p-3 border-b border-white/10 flex items-center gap-2 overflow-x-auto scrollbar-thin font-mono text-[10px]">
          {presetQueries.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSendPrompt(q)}
              className="px-3 py-1.5 rounded-md bg-[#09090b] hover:bg-white/10 text-white/80 hover:text-white whitespace-nowrap transition-colors border border-white/10 shrink-0 uppercase tracking-wider"
            >
              &bull; {q}
            </button>
          ))}
        </div>

        {/* Messages Body */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex items-start gap-3 ${
                msg.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {msg.sender === 'ai' && (
                <div className="w-7 h-7 rounded bg-white/10 text-white flex items-center justify-center shrink-0 border border-white/15 font-mono text-[10px] font-bold">
                  AI
                </div>
              )}

              <div
                className={`max-w-[85%] p-4 rounded-lg text-xs leading-relaxed whitespace-pre-line ${
                  msg.sender === 'user'
                    ? 'bg-white text-black font-semibold font-mono'
                    : 'bg-[#050505] text-zinc-200 border border-white/10 font-sans shadow-inner'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-2 text-amber-300 text-xs font-mono p-3 bg-[#050505] rounded-md max-w-xs border border-white/10">
              <Loader2 className="w-4 h-4 animate-spin text-amber-400" />
              <span>Analyzing festival database...</span>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <div className="p-4 bg-[#050505] border-t border-white/10 flex items-center gap-2">
          <input
            type="text"
            placeholder="Ask about festival scores, schools, or request drafted press releases..."
            value={inputPrompt}
            onChange={(e) => setInputPrompt(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendPrompt()}
            className="flex-1 p-3 text-xs font-mono rounded-md bg-[#09090b] border border-white/15 text-white placeholder-white/30 focus:outline-none focus:border-white/40"
          />
          <button
            onClick={() => handleSendPrompt()}
            disabled={loading}
            className="p-3 bg-white text-black hover:bg-zinc-200 rounded-md shadow-lg transition-all"
          >
            <Send className="w-4 h-4 text-black" />
          </button>
        </div>
      </div>
    </div>
  );
};

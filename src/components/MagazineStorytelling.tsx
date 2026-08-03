import React, { useState } from 'react';
import {
  BookOpen,
  Sparkles,
  Heart,
  MessageSquare,
  Share2,
  Volume2,
  X,
  User,
  Calendar,
  Clock,
  ArrowRight,
  Bookmark,
} from 'lucide-react';
import { NewsStory } from '../types';

interface MagazineStorytellingProps {
  stories: NewsStory[];
}

export const MagazineStorytelling: React.FC<MagazineStorytellingProps> = ({ stories }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedStory, setSelectedStory] = useState<NewsStory | null>(null);
  const [likesMap, setLikesMap] = useState<Record<string, number>>({});

  const categories = [
    'All',
    'Featured Story',
    'Behind the Performance',
    'Artist Spotlight',
    'School Spotlight',
    'Judge Perspective',
    'Volunteer Diaries',
    'Cultural Heritage',
  ];

  const filteredStories = stories.filter(
    (s) => activeCategory === 'All' || s.category === activeCategory
  );

  const handleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikesMap((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-[#050505] text-white min-h-screen border-b border-white/10">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <div className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-amber-400 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>National Geographic & Behance Style Journalism</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif text-white tracking-tight mt-1">
              Festival Storytelling Magazine
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 max-w-2xl mt-1 font-sans">
              Immerse in longform cultural stories, behind-the-scenes interviews, conductor perspectives, and historical preservation.
            </p>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin font-mono text-[11px] uppercase">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 rounded-md tracking-wider transition-all whitespace-nowrap ${
                activeCategory === cat
                  ? 'bg-[#006600] text-white font-bold shadow-md'
                  : 'bg-[#09090b] text-white/70 border border-white/10 hover:bg-white/10 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Featured Story Hero Card */}
        {stories.find((s) => s.isFeatured) && (
          <div
            onClick={() => setSelectedStory(stories.find((s) => s.isFeatured)!)}
            className="group cursor-pointer relative rounded-xl overflow-hidden border border-white/15 shadow-2xl bg-[#09090b] flex flex-col lg:flex-row transform hover:-translate-y-1 transition-all"
          >
            <div className="lg:w-3/5 h-80 lg:h-auto relative overflow-hidden">
              <img
                src={stories.find((s) => s.isFeatured)!.coverImage}
                alt="Featured"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-[#09090b]/40 to-transparent lg:hidden" />
              <div className="absolute top-4 left-4 bg-[#006600] text-white font-mono font-bold text-[9px] uppercase tracking-widest px-3 py-1 rounded shadow">
                Featured Cover Story
              </div>
            </div>

            <div className="lg:w-2/5 p-6 lg:p-8 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-[10px] text-amber-400 font-mono font-bold uppercase tracking-wider">
                  <span>{stories.find((s) => s.isFeatured)!.category}</span>
                  <span>&bull;</span>
                  <span>{stories.find((s) => s.isFeatured)!.readTime}</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-serif leading-tight text-white group-hover:text-amber-300 transition-colors">
                  {stories.find((s) => s.isFeatured)!.title}
                </h3>

                <p className="text-xs sm:text-sm text-zinc-300 line-clamp-3 leading-relaxed font-sans">
                  {stories.find((s) => s.isFeatured)!.subtitle}
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-white/50 font-mono">
                <div className="flex items-center gap-2">
                  <User className="w-3.5 h-3.5 text-amber-400" />
                  <span>{stories.find((s) => s.isFeatured)!.author}</span>
                </div>

                <div className="flex items-center gap-1 text-white font-bold uppercase text-[11px] tracking-wider">
                  <span>Read Article</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStories.map((story) => (
            <div
              key={story.id}
              onClick={() => setSelectedStory(story)}
              className="group cursor-pointer bg-[#09090b] rounded-xl overflow-hidden border border-white/10 hover:border-white/20 shadow-lg flex flex-col justify-between transform hover:-translate-y-1 transition-all"
            >
              <div>
                <div className="h-48 relative overflow-hidden">
                  <img
                    src={story.coverImage}
                    alt={story.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-[#050505]/80 backdrop-blur text-amber-400 font-mono font-bold text-[9px] uppercase tracking-wider px-2.5 py-1 rounded border border-white/10">
                    {story.category}
                  </div>
                </div>

                <div className="p-5 space-y-2">
                  <div className="flex items-center gap-2 text-[10px] text-white/40 font-mono">
                    <Calendar className="w-3 h-3 text-amber-400" />
                    <span>{story.publishDate}</span>
                    <span>&bull;</span>
                    <Clock className="w-3 h-3 text-amber-400" />
                    <span>{story.readTime}</span>
                  </div>

                  <h4 className="text-lg font-serif font-bold text-white group-hover:text-amber-300 transition-colors line-clamp-2">
                    {story.title}
                  </h4>

                  <p className="text-xs text-zinc-400 line-clamp-2 font-sans">
                    {story.subtitle}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0 border-t border-white/10 flex items-center justify-between text-xs text-white/50 mt-2 font-mono">
                <span className="font-medium text-white/70">By {story.author}</span>

                <div className="flex items-center gap-3">
                  <button
                    onClick={(e) => handleLike(story.id, e)}
                    className="flex items-center gap-1 text-amber-400 hover:scale-110 transition-transform"
                  >
                    <Heart className="w-3.5 h-3.5 fill-current" />
                    <span className="font-mono text-[10px]">{story.likes + (likesMap[story.id] || 0)}</span>
                  </button>
                  <span className="flex items-center gap-1 text-white/40">
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span className="font-mono text-[10px]">{story.commentsCount}</span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Story Modal Reader */}
        {selectedStory && (
          <div className="fixed inset-0 z-50 bg-[#050505]/90 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-[#09090b] text-white rounded-xl border border-white/20 max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative p-6 sm:p-8 space-y-6">
              <button
                onClick={() => setSelectedStory(null)}
                className="absolute top-5 right-5 p-2 bg-[#121215] text-white/70 rounded-md hover:bg-white/10 transition-colors border border-white/10"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-3">
                <span className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-[0.2em] bg-white/10 px-3 py-1 rounded border border-white/10">
                  {selectedStory.category}
                </span>

                <h2 className="text-2xl sm:text-4xl font-serif text-white leading-tight">
                  {selectedStory.title}
                </h2>

                <p className="text-sm sm:text-base text-zinc-300 italic font-serif border-l-2 border-amber-400 pl-3">
                  {selectedStory.subtitle}
                </p>

                <div className="flex items-center gap-4 text-xs font-mono text-white/50 pt-2 border-b border-white/10 pb-4">
                  <div>
                    <span className="font-bold text-white">{selectedStory.author}</span> ({selectedStory.authorRole})
                  </div>
                  <span>&bull;</span>
                  <span>{selectedStory.publishDate}</span>
                </div>
              </div>

              <div className="rounded-xl overflow-hidden h-72 sm:h-96 border border-white/10">
                <img
                  src={selectedStory.coverImage}
                  alt={selectedStory.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Story Audio Quote Player if available */}
              {selectedStory.audioQuoteUrl && (
                <div className="bg-[#050505] p-4 rounded-lg border border-white/15 flex items-center gap-4 font-mono">
                  <div className="p-3 bg-white text-black rounded font-bold">
                    <Volume2 className="w-5 h-5 text-black" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="text-xs font-bold text-amber-300">
                      {selectedStory.audioQuoteTitle}
                    </div>
                    <audio controls src={selectedStory.audioQuoteUrl} className="w-full h-8" />
                  </div>
                </div>
              )}

              {/* Story Main Text Body */}
              <div className="prose prose-invert max-w-none text-zinc-200 text-sm sm:text-base leading-relaxed whitespace-pre-line font-serif">
                {selectedStory.content}
              </div>

              {/* Gallery Images */}
              {selectedStory.galleryImages.length > 0 && (
                <div className="space-y-2 pt-4">
                  <h4 className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-[0.2em]">
                    Photo Story Gallery
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {selectedStory.galleryImages.map((img, idx) => (
                      <img
                        key={idx}
                        src={img}
                        alt="Gallery"
                        className="rounded-lg h-32 w-full object-cover border border-white/10"
                      />
                    ))}
                  </div>
                </div>
              )}

              <div className="pt-6 border-t border-white/10 flex items-center justify-between text-xs font-mono text-white/50">
                <button
                  onClick={(e) => handleLike(selectedStory.id, e)}
                  className="flex items-center gap-2 bg-[#050505] border border-white/15 px-4 py-2 rounded-md text-amber-400 font-bold"
                >
                  <Heart className="w-4 h-4 fill-current" />
                  <span>{selectedStory.likes + (likesMap[selectedStory.id] || 0)} Applaud Story</span>
                </button>

                <button
                  onClick={() => alert('Story link copied to clipboard')}
                  className="flex items-center gap-1.5 text-white/70 hover:text-white"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Share Story</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

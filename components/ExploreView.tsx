
import React from 'react';
import { Compass, Flame, Music, Gamepad2, Newspaper, Trophy, Play } from './Icons';
import { HomeGrid } from './HomeGrid';
import { Video } from '../types';

interface ExploreViewProps {
  videos: Video[];
  onSelectVideo: (video: Video) => void;
  onSelectAuthor: (authorName: string) => void;
}

const CATEGORIES = [
  { id: 'trending', label: 'Em alta', icon: Flame, color: 'bg-orange-600' },
  { id: 'music', label: 'Música', icon: Music, color: 'bg-teal-600' },
  { id: 'gaming', label: 'Jogos', icon: Gamepad2, color: 'bg-indigo-600' },
  { id: 'news', label: 'Notícias', icon: Newspaper, color: 'bg-blue-600' },
  { id: 'sports', label: 'Esportes', icon: Trophy, color: 'bg-green-600' },
];

export const ExploreView: React.FC<ExploreViewProps> = ({ videos, onSelectVideo, onSelectAuthor }) => {
  return (
    <div className="p-4 md:p-8 pt-20 md:pt-8 md:ml-64 bg-dark-900 min-h-screen">
      <div className="mb-8">
        <h2 className="text-3xl font-bold flex items-center gap-3 mb-6">
          <Compass className="text-brand-500" size={32} />
          Explorar
        </h2>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-10">
          {CATEGORIES.map((cat) => (
            <button 
              key={cat.id}
              className={`${cat.color} p-4 rounded-2xl flex flex-col items-center gap-2 hover:scale-105 transition-transform shadow-lg group`}
            >
              <cat.icon size={28} className="text-white group-hover:animate-bounce" />
              <span className="text-sm font-bold text-white uppercase tracking-tight">{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Featured Video Section */}
        <div className="mb-10">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Flame className="text-orange-500" size={20} />
            Vídeo em Destaque
          </h3>
          <div 
            className="relative w-full aspect-[21/9] rounded-3xl overflow-hidden group cursor-pointer"
            onClick={() => onSelectVideo(videos[0])}
          >
            <img 
              src={videos[0].thumbnailUrl || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop'} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              alt="Destaque"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-8">
              <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded w-fit mb-3">CONTEÚDO TRENDING</span>
              <h4 className="text-3xl md:text-5xl font-black text-white mb-2 leading-tight">{videos[0].prompt}</h4>
              <p className="text-gray-300 max-w-2xl text-sm md:text-base line-clamp-2">{videos[0].description}</p>
              <div className="flex items-center gap-3 mt-6">
                <button className="bg-white text-black px-6 py-2.5 rounded-full font-bold flex items-center gap-2 hover:bg-gray-200 transition-colors">
                  <Play size={20} fill="black" /> Assistir Agora
                </button>
                <span className="text-white font-bold text-sm">@{videos[0].author}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Trending Grid */}
        <h3 className="text-xl font-bold mb-6">Vídeos em alta</h3>
        <div className="md:-ml-64 md:pl-64">
           <HomeGrid 
              videos={videos} 
              onSelectVideo={onSelectVideo} 
              onSelectAuthor={onSelectAuthor}
           />
        </div>
      </div>
    </div>
  );
};

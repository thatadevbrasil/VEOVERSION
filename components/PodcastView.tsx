
import React, { useState } from 'react';
import { Mic, Search, Play, Volume2, Clock, Share2, ExternalLink } from './Icons';

interface Episode {
  id: string;
  title: string;
  show: string;
  duration: string;
  date: string;
  cover: string;
  description: string;
}

const MOCK_EPISODES: Episode[] = [
  {
    id: 'e1',
    title: 'O Futuro da Inteligência Artificial nos Vídeos',
    show: 'VeoTalks',
    duration: '45min',
    date: 'Hoje',
    cover: 'https://images.unsplash.com/photo-1478737270239-2fccd2c78621?q=80&w=2070&auto=format&fit=crop',
    description: 'Neste episódio discutimos como os novos modelos de IA estão mudando a forma como consumimos conteúdo.'
  },
  {
    id: 'e2',
    title: 'Como monetizar seu canal em 2024',
    show: 'Criadores Prime',
    duration: '32min',
    date: 'Ontem',
    cover: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=2070&auto=format&fit=crop',
    description: 'Dicas práticas de quem já vive do YouTube e agora está no VeoTube.'
  },
  {
    id: 'e3',
    title: 'Especial: Entrevista com Sam Altman',
    show: 'Tech Insight',
    duration: '1h 12min',
    date: '3 dias atrás',
    cover: 'https://images.unsplash.com/photo-1557426272-fc759fbb7a8d?q=80&w=2070&auto=format&fit=crop',
    description: 'Uma conversa profunda sobre o rumo da humanidade com o CEO da OpenAI.'
  }
];

export const PodcastView: React.FC = () => {
  const [currentEpisode, setCurrentEpisode] = useState<Episode | null>(null);

  return (
    <div className="p-4 md:p-8 pt-20 md:pt-8 md:ml-64 bg-dark-900 min-h-screen">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <h2 className="text-3xl font-bold flex items-center gap-3 mb-2">
            <Mic className="text-brand-500" size={32} />
            Podcasts & Áudio
          </h2>
          <p className="text-gray-400">Ouça os melhores criadores enquanto faz outras coisas.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
            <input 
              type="text" 
              placeholder="Cole o link RSS ou Spotify..." 
              className="bg-dark-800 border border-dark-700 rounded-xl py-2.5 pl-10 pr-4 w-64 md:w-80 outline-none focus:border-brand-500 transition-all text-sm"
            />
          </div>
          <button className="bg-brand-600 hover:bg-brand-700 text-white px-4 py-2.5 rounded-xl font-bold transition-all text-sm">
            Importar
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2 space-y-4">
          <h3 className="text-xl font-bold text-white mb-6">Novos Episódios</h3>
          {MOCK_EPISODES.map(ep => (
            <div 
              key={ep.id} 
              onClick={() => setCurrentEpisode(ep)}
              className={`p-4 rounded-2xl border border-dark-700 hover:bg-dark-800 transition-all cursor-pointer group flex items-center gap-4 ${
                currentEpisode?.id === ep.id ? 'bg-dark-800 border-brand-500' : 'bg-dark-800/30'
              }`}
            >
              <div className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                <img src={ep.cover} alt={ep.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <Play size={20} fill="white" />
                </div>
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-brand-400 text-xs font-bold uppercase">{ep.show}</span>
                  <span className="text-gray-500 text-[10px]">• {ep.date}</span>
                </div>
                <h4 className="font-bold text-white truncate text-lg group-hover:text-brand-400 transition-colors">{ep.title}</h4>
                <p className="text-gray-400 text-sm line-clamp-1">{ep.description}</p>
              </div>

              <div className="hidden md:flex flex-col items-end gap-2 text-gray-500">
                <div className="flex items-center gap-1 text-xs font-bold">
                  <Clock size={14} /> {ep.duration}
                </div>
                <div className="flex gap-2">
                  <button className="p-2 hover:bg-dark-700 rounded-full transition-colors"><Share2 size={16}/></button>
                  <button className="p-2 hover:bg-dark-700 rounded-full transition-colors text-green-500"><ExternalLink size={16}/></button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-6">
          <div className="bg-dark-800 rounded-3xl border border-dark-700 p-6 sticky top-24">
            {currentEpisode ? (
              <div className="animate-in fade-in slide-in-from-bottom-4">
                <div className="aspect-square rounded-2xl overflow-hidden mb-6 shadow-2xl">
                  <img src={currentEpisode.cover} alt={currentEpisode.title} className="w-full h-full object-cover" />
                </div>
                <h3 className="text-2xl font-bold mb-1 text-center">{currentEpisode.title}</h3>
                <p className="text-brand-500 font-bold text-center mb-6">{currentEpisode.show}</p>
                
                {/* Audio Controls Mock */}
                <div className="space-y-6">
                  <div className="relative h-1.5 bg-dark-700 rounded-full">
                    <div className="absolute top-0 left-0 h-full w-1/3 bg-brand-500 rounded-full" />
                    <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-lg cursor-pointer" />
                  </div>
                  <div className="flex justify-between text-[10px] font-bold text-gray-500">
                    <span>12:45</span>
                    <span>{currentEpisode.duration}</span>
                  </div>
                  
                  <div className="flex items-center justify-center gap-8">
                    <button className="text-gray-400 hover:text-white"><Share2 size={24}/></button>
                    <button className="bg-brand-600 text-white p-6 rounded-full shadow-xl shadow-brand-900/40 hover:scale-110 transition-transform active:scale-95">
                      <Play size={32} fill="white" />
                    </button>
                    <button className="text-gray-400 hover:text-white"><Volume2 size={24}/></button>
                  </div>

                  <a 
                    href="#" 
                    className="flex items-center justify-center gap-2 w-full py-4 bg-[#1DB954] hover:bg-[#1ed760] text-black font-bold rounded-2xl transition-all shadow-lg"
                  >
                    Ouvir no Spotify
                  </a>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-gray-500 text-center">
                <div className="w-20 h-20 bg-dark-700 rounded-full flex items-center justify-center mb-6 animate-pulse">
                  <Mic size={40} />
                </div>
                <p className="font-bold">Selecione um episódio para ouvir</p>
                <p className="text-xs mt-2 max-w-[200px]">Os melhores podcasts do mundo estão aqui no VeoTube.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

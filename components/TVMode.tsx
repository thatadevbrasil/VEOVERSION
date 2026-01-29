import React from 'react';
import { Video } from '../types';
import { Tv, Play, Maximize2 } from './Icons';

interface TVModeProps {
  videos: Video[];
}

export const TVMode: React.FC<TVModeProps> = ({ videos }) => {
  const featuredVideo = videos[0];
  const suggestedVideos = videos.slice(1);

  return (
    <div className="min-h-screen bg-black md:pl-64 text-white overflow-hidden">
        {/* Hero Section */}
        <div className="relative w-full h-[70vh]">
            {featuredVideo ? (
                <>
                    <video 
                        src={featuredVideo.url} 
                        className="w-full h-full object-cover opacity-60"
                        autoPlay
                        muted
                        loop
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                    <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full md:w-2/3">
                         <div className="inline-block px-3 py-1 bg-brand-600 text-xs font-bold rounded-md mb-4 tracking-widest uppercase">
                            Em Destaque na TV
                         </div>
                         <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">{featuredVideo.prompt}</h1>
                         <p className="text-lg text-gray-300 mb-8 line-clamp-2">{featuredVideo.description || "Uma experiência cinematográfica exclusiva gerada por inteligência artificial."}</p>
                         
                         <div className="flex gap-4">
                            <button className="bg-white text-black px-8 py-3 rounded-lg font-bold flex items-center gap-2 hover:bg-gray-200 transition-colors">
                                <Play className="fill-black" size={24} />
                                Assistir Agora
                            </button>
                            <button className="bg-gray-800/80 backdrop-blur-md text-white px-8 py-3 rounded-lg font-bold hover:bg-gray-700 transition-colors">
                                Mais Informações
                            </button>
                         </div>
                    </div>
                </>
            ) : (
                <div className="flex items-center justify-center h-full">
                    <Tv size={64} className="text-gray-600" />
                </div>
            )}
        </div>

        {/* Channels/Suggestions */}
        <div className="p-8 -mt-20 relative z-10">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Tv size={20} className="text-brand-500" />
                Canais Recomendados
            </h2>
            <div className="flex gap-4 overflow-x-auto pb-8 no-scrollbar">
                {suggestedVideos.map((video) => (
                    <div key={video.id} className="min-w-[280px] bg-dark-800 rounded-xl overflow-hidden hover:scale-105 transition-transform duration-300 cursor-pointer group">
                        <div className="relative aspect-video">
                            <video src={video.url} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                                <Play className="fill-white" size={32} />
                            </div>
                        </div>
                        <div className="p-3">
                            <h3 className="font-bold text-sm line-clamp-1">{video.prompt}</h3>
                            <p className="text-xs text-gray-400 mt-1">{video.author}</p>
                        </div>
                    </div>
                ))}
                {/* Mock placeholders */}
                {[1,2,3].map(i => (
                    <div key={i} className="min-w-[280px] bg-dark-800 rounded-xl h-48 flex flex-col items-center justify-center text-gray-600 border border-dark-700 border-dashed">
                        <span>Canal {i} Offline</span>
                    </div>
                ))}
            </div>
        </div>
    </div>
  );
};

import React, { useState } from 'react';
import { Video } from '../types';
import { MoreVertical, Radio, Cast, Camera, MonitorPlay } from './Icons';

interface LiveGridProps {
  videos: Video[];
  onOpenCreate?: () => void;
  onSelectVideo?: (video: Video) => void;
}

export const LiveGrid: React.FC<LiveGridProps> = ({ videos, onOpenCreate, onSelectVideo }) => {
  const [isBroadcasting, setIsBroadcasting] = useState(false);

  return (
    <div className="p-4 md:p-8 pt-20 md:pt-8 md:ml-64 bg-dark-900 min-h-screen">
      <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-red-600/20 rounded-full animate-pulse">
                <Radio className="text-red-500" size={24} />
            </div>
            <h2 className="text-2xl font-bold">Ao Vivo Agora</h2>
          </div>
          
          <div className="flex items-center gap-3">
            <button 
              onClick={onOpenCreate}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-full font-bold transition-colors shadow-lg"
            >
              <MonitorPlay size={18} />
              <span>Vídeo Longo</span>
            </button>

            <button 
              onClick={() => setIsBroadcasting(!isBroadcasting)}
              className="flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white px-4 py-2 rounded-full font-bold transition-colors shadow-lg"
            >
              {isBroadcasting ? <Radio size={18} /> : <Cast size={18} />}
              {isBroadcasting ? 'Encerrar Transmissão' : 'Iniciar Transmissão'}
            </button>
          </div>
      </div>

      {isBroadcasting && (
          <div className="mb-8 bg-dark-800 rounded-xl overflow-hidden border border-brand-500/50 relative aspect-video">
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50">
                   <div className="w-20 h-20 rounded-full bg-dark-700 flex items-center justify-center mb-4 animate-pulse">
                        <Camera size={40} className="text-gray-400" />
                   </div>
                   <h3 className="text-xl font-bold">Transmitindo...</h3>
                   <p className="text-gray-400">Sua câmera estaria ativa aqui.</p>
                   <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded text-xs font-bold animate-pulse">
                       NO AR
                   </div>
              </div>
          </div>
      )}
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {videos.map((video) => (
          <div 
            key={video.id} 
            className="group cursor-pointer"
            onClick={() => onSelectVideo?.(video)}
          >
            <div className="relative aspect-video bg-dark-800 rounded-xl overflow-hidden mb-3 ring-2 ring-transparent group-hover:ring-brand-600 transition-all">
              <video 
                src={video.url}
                className="w-full h-full object-cover"
                muted
                loop
                onMouseOver={e => e.currentTarget.play().catch(() => {})}
                onMouseOut={e => {
                  e.currentTarget.pause();
                  e.currentTarget.currentTime = 0;
                }}
              />
              <div className="absolute top-2 left-2 bg-red-600 text-xs px-2 py-1 rounded-md text-white font-bold flex items-center gap-1 shadow-md">
                <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>
                AO VIVO
              </div>
              <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-sm text-xs px-2 py-1 rounded text-white font-medium">
                {Math.floor(Math.random() * 5000) + 500} assistindo
              </div>
            </div>
            
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-500 to-orange-500 flex-shrink-0 flex items-center justify-center text-sm font-bold border-2 border-red-600">
                {video.author[0]}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-white line-clamp-2 leading-tight mb-1 group-hover:text-red-500 transition-colors">
                  {video.prompt}
                </h3>
                <div className="text-sm text-gray-400">
                  <p className="flex items-center gap-1">
                    {video.author}
                    <span className="text-xs bg-gray-700 px-1 rounded text-gray-300">Host</span>
                  </p>
                  <p className="text-red-400 text-xs mt-1">Transmissão iniciada há 20 min</p>
                </div>
              </div>
              <button className="text-gray-400 hover:text-white h-fit">
                <MoreVertical size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

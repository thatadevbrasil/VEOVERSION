import React, { useRef, useEffect, useState } from 'react';
import { Video, VideoFormat } from '../types';
import { Heart, MessageCircle, Share2, Maximize2, Link, Play, Film } from './Icons';

interface ShortsFeedProps {
  videos: Video[];
}

const ShortItem: React.FC<{ video: Video; isActive: boolean }> = ({ video, isActive }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showFullDesc, setShowFullDesc] = useState(false);

  useEffect(() => {
    if (isActive && videoRef.current) {
      videoRef.current.currentTime = 0;
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch(() => setIsPlaying(false));
      }
    } else if (!isActive && videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  }, [isActive]);

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleFullScreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!document.fullscreenElement && containerRef.current) {
      containerRef.current.requestFullscreen().catch((err) => {
        console.error(`Erro ao tentar modo tela cheia: ${err.message}`);
      });
    } else if (document.fullscreenElement) {
      document.exitFullscreen();
    }
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-screen snap-start flex justify-center bg-black overflow-hidden"
    >
      <div className="relative h-full aspect-[9/16] bg-dark-800 shadow-2xl overflow-hidden">
        <video
          ref={videoRef}
          src={video.url}
          className="w-full h-full object-cover cursor-pointer"
          loop
          playsInline
          onClick={togglePlay}
        />
        
        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none bg-black/20">
            <div className="p-6 rounded-full bg-black/40 backdrop-blur-sm">
                <Play size={48} className="text-white fill-white ml-1" />
            </div>
          </div>
        )}

        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/95 via-black/40 to-transparent pt-32 pointer-events-none">
          <div className="flex justify-between items-end pointer-events-auto">
            <div className="flex-1 mr-4">
              
              {video.affiliateLink && (
                  <a 
                    href={video.affiliateLink.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-yellow-500 hover:bg-yellow-400 text-black px-3 py-1.5 rounded-lg font-bold text-sm mb-3 transition-colors shadow-lg animate-pulse"
                  >
                    <Link size={16} />
                    {video.affiliateLink.label}
                  </a>
              )}

              <div className="flex items-center gap-2 mb-2">
                <div className="w-10 h-10 rounded-full bg-brand-600 flex items-center justify-center text-sm font-bold border-2 border-white/20">
                  {video.author[0]}
                </div>
                <span className="font-bold text-white drop-shadow-lg">@{video.author}</span>
                <button className="bg-white text-black text-xs font-bold px-3 py-1 rounded-full hover:bg-gray-200 transition-colors ml-1">
                    Seguir
                </button>
              </div>

              <div className="text-gray-200 mb-2">
                <p className={`text-sm ${showFullDesc ? '' : 'line-clamp-2'} drop-shadow-md leading-snug`}>
                    <span className="font-semibold text-white mr-2">{video.prompt}</span>
                    {video.description}
                </p>
                {(video.description && video.description.length > 50) && (
                    <button 
                        onClick={(e) => { e.stopPropagation(); setShowFullDesc(!showFullDesc); }}
                        className="text-xs text-gray-400 hover:text-white mt-1 font-semibold"
                    >
                        {showFullDesc ? 'Ver menos' : 'mais...'}
                    </button>
                )}
              </div>
            </div>
            
            <div className="flex flex-col gap-5 items-center pb-2">
              <button className="flex flex-col items-center gap-1 group">
                <div className="p-3 bg-dark-800/60 backdrop-blur-md rounded-full group-hover:bg-brand-500/20 transition-colors border border-white/10">
                  <Heart size={28} className="group-hover:text-red-500 transition-colors fill-transparent group-hover:fill-red-500" />
                </div>
                <span className="text-xs font-bold drop-shadow-lg">{video.likes}</span>
              </button>
              
              <button className="flex flex-col items-center gap-1 group">
                <div className="p-3 bg-dark-800/60 backdrop-blur-md rounded-full group-hover:bg-brand-500/20 transition-colors border border-white/10">
                  <MessageCircle size={28} />
                </div>
                <span className="text-xs font-bold drop-shadow-lg">124</span>
              </button>

              <button 
                onClick={toggleFullScreen}
                className="flex flex-col items-center gap-1 group"
              >
                 <div className="p-3 bg-dark-800/60 backdrop-blur-md rounded-full group-hover:bg-brand-500/20 transition-colors border border-white/10">
                  <Maximize2 size={28} />
                 </div>
                 <span className="text-xs font-bold drop-shadow-lg">Tela Cheia</span>
              </button>

              <button className="flex flex-col items-center gap-1 group">
                 <div className="p-3 bg-dark-800/60 backdrop-blur-md rounded-full group-hover:bg-brand-500/20 transition-colors border border-white/10">
                  <Share2 size={28} />
                 </div>
                 <span className="text-xs font-bold drop-shadow-lg">Partilhar</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ShortsFeed: React.FC<ShortsFeedProps> = ({ videos }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const shortVideos = videos.filter(v => v.format === VideoFormat.Short);

  const handleScroll = () => {
    if (containerRef.current) {
      const { scrollTop, clientHeight } = containerRef.current;
      const index = Math.round(scrollTop / clientHeight);
      if (index !== activeIndex) {
        setActiveIndex(index);
      }
    }
  };

  useEffect(() => {
    // Garante que o container de shorts receba o foco para navegação por teclado
    containerRef.current?.focus();
  }, []);

  if (shortVideos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-screen md:ml-64 text-gray-500 bg-dark-900">
        <Film size={64} className="mb-4 opacity-20" />
        <p className="text-xl font-bold">Nenhum Short disponível</p>
        <p className="text-sm mt-2">Clique no botão central "+" para carregar um!</p>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      onScroll={handleScroll}
      tabIndex={0}
      className="h-screen overflow-y-scroll snap-y snap-mandatory shorts-container bg-black md:ml-64 outline-none"
    >
      {shortVideos.map((video, index) => (
        <ShortItem 
          key={video.id} 
          video={video} 
          isActive={index === activeIndex} 
        />
      ))}
    </div>
  );
};
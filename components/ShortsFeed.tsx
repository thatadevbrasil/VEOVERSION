import React, { useRef, useEffect, useState } from 'react';
import { Video, VideoFormat } from '../types';
import { Heart, MessageCircle, Share2, MoreVertical, Play, Film, Maximize2, Link } from './Icons';

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

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleFullScreen = () => {
    if (!document.fullscreenElement && containerRef.current) {
      containerRef.current.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable full-screen mode: ${err.message}`);
      });
    } else if (document.fullscreenElement) {
      document.exitFullscreen();
    }
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-[calc(100vh-64px)] md:h-screen snap-start flex justify-center bg-black"
    >
      {/* Video Container */}
      <div className="relative h-full aspect-[9/16] max-w-md bg-dark-800">
        <video
          ref={videoRef}
          src={video.url}
          className="w-full h-full object-cover"
          loop
          playsInline
          onClick={togglePlay}
        />
        
        {/* Play Pause Overlay */}
        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none bg-black/20">
            <Play size={48} className="text-white/80 fill-white/80" />
          </div>
        )}

        {/* Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 via-black/60 to-transparent pt-32">
          <div className="flex justify-between items-end">
            <div className="flex-1 mr-4">
              
              {/* Affiliate Link */}
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
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-brand-500 to-orange-500 flex items-center justify-center text-sm font-bold border-2 border-white/20">
                  {video.author[0]}
                </div>
                <span className="font-bold text-white shadow-black drop-shadow-md">@{video.author}</span>
                <button className="bg-white text-black text-xs font-bold px-3 py-1 rounded-full hover:bg-gray-200 transition-colors">
                    Inscrever-se
                </button>
              </div>

              {/* Description Section */}
              <div className="text-gray-200 mb-2">
                <p className={`text-sm ${showFullDesc ? '' : 'line-clamp-2'} drop-shadow-md`}>
                    <span className="font-semibold text-white mr-2">{video.prompt}</span>
                    {video.description}
                </p>
                {(video.description && video.description.length > 50) && (
                    <button 
                        onClick={() => setShowFullDesc(!showFullDesc)}
                        className="text-xs text-gray-400 hover:text-white mt-1 font-semibold"
                    >
                        {showFullDesc ? 'Mostrar menos' : 'mais...'}
                    </button>
                )}
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-col gap-4 items-center">
              <button className="flex flex-col items-center gap-1 group">
                <div className="p-3 bg-dark-800/60 backdrop-blur-md rounded-full group-hover:bg-dark-700/80 transition-colors border border-white/10">
                  <Heart size={26} className="group-hover:text-red-500 transition-colors" />
                </div>
                <span className="text-xs font-medium shadow-black drop-shadow-md">{video.likes}</span>
              </button>
              
              <button className="flex flex-col items-center gap-1 group">
                <div className="p-3 bg-dark-800/60 backdrop-blur-md rounded-full group-hover:bg-dark-700/80 transition-colors border border-white/10">
                  <MessageCircle size={26} />
                </div>
                <span className="text-xs font-medium shadow-black drop-shadow-md">124</span>
              </button>

              <button 
                onClick={toggleFullScreen}
                className="flex flex-col items-center gap-1 group"
              >
                 <div className="p-3 bg-dark-800/60 backdrop-blur-md rounded-full group-hover:bg-dark-700/80 transition-colors border border-white/10">
                  <Maximize2 size={26} />
                 </div>
                 <span className="text-xs font-medium shadow-black drop-shadow-md">Tela cheia</span>
              </button>

              <button className="flex flex-col items-center gap-1 group">
                 <div className="p-3 bg-dark-800/60 backdrop-blur-md rounded-full group-hover:bg-dark-700/80 transition-colors border border-white/10">
                  <Share2 size={26} />
                 </div>
                 <span className="text-xs font-medium shadow-black drop-shadow-md">Partilhar</span>
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

  // Filter only short videos
  const shortVideos = videos.filter(v => v.format === VideoFormat.Short);

  const handleScroll = () => {
    if (containerRef.current) {
      const { scrollTop, clientHeight } = containerRef.current;
      const index = Math.round(scrollTop / clientHeight);
      setActiveIndex(index);
    }
  };

  if (shortVideos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-gray-500">
        <Film size={48} className="mb-4 opacity-50" />
        <p>Nenhum Short encontrado. Crie um!</p>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      onScroll={handleScroll}
      className="h-screen overflow-y-scroll snap-y snap-mandatory no-scrollbar bg-black"
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
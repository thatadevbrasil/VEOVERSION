
import React, { useEffect, useRef } from 'react';
import { Video } from '../types';
import { X, Heart, MessageCircle, Share2, MoreVertical, Link as LinkIcon, User } from './Icons';

interface VideoPlayerProps {
  video: Video;
  onClose: () => void;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({ video, onClose }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Garantir que o scroll do corpo seja bloqueado quando o player estiver aberto
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[150] bg-black flex flex-col md:flex-row overflow-y-auto md:overflow-hidden">
      {/* Área do Vídeo */}
      <div className="relative flex-1 bg-black flex items-center justify-center group">
        <video
          ref={videoRef}
          src={video.url}
          className="max-h-screen w-full"
          controls
          autoPlay
          playsInline
        />
        <button 
          onClick={onClose}
          className="absolute top-4 left-4 p-2 bg-black/40 hover:bg-black/60 rounded-full text-white transition-all backdrop-blur-sm z-10"
        >
          <X size={24} />
        </button>
      </div>

      {/* Área de Informações / Lateral */}
      <div className="w-full md:w-[400px] lg:w-[450px] bg-dark-900 border-l border-dark-700 flex flex-col h-full overflow-y-auto">
        <div className="p-6 space-y-6">
          <div className="flex justify-between items-start">
            <h1 className="text-xl font-bold text-white leading-tight">
              {video.prompt}
            </h1>
            <button className="text-gray-400 hover:text-white">
              <MoreVertical size={20} />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-brand-600 flex items-center justify-center text-lg font-bold">
                {video.author[0]}
              </div>
              <div>
                <p className="font-bold text-white">{video.author}</p>
                <p className="text-xs text-gray-500">1.2M inscritos</p>
              </div>
            </div>
            <button className="bg-white text-black px-4 py-2 rounded-full font-bold text-sm hover:bg-gray-200 transition-colors">
              Inscrever-se
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button className="flex-1 flex items-center justify-center gap-2 bg-dark-800 hover:bg-dark-700 py-2.5 rounded-full text-sm font-bold transition-colors">
              <Heart size={18} />
              {video.likes}
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 bg-dark-800 hover:bg-dark-700 py-2.5 rounded-full text-sm font-bold transition-colors">
              <Share2 size={18} />
              Compartilhar
            </button>
          </div>

          {video.affiliateLink && (
            <a 
              href={video.affiliateLink.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-4 bg-brand-600/10 border border-brand-500/30 rounded-xl group hover:bg-brand-600/20 transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-brand-600 rounded-lg text-white">
                  <LinkIcon size={20} />
                </div>
                <div>
                  <p className="text-xs text-brand-400 font-bold uppercase">Oferta Especial</p>
                  <p className="text-sm font-bold text-white">{video.affiliateLink.label}</p>
                </div>
              </div>
              <div className="p-2 text-brand-500">
                <Share2 size={18} className="rotate-90" />
              </div>
            </a>
          )}

          <div className="bg-dark-800 rounded-xl p-4 space-y-2">
            <p className="text-sm font-bold text-white">
              {video.views} visualizações • Publicado em {new Date(video.createdAt).toLocaleDateString()}
            </p>
            <p className="text-sm text-gray-300 whitespace-pre-wrap leading-relaxed">
              {video.description || "Sem descrição disponível para este vídeo."}
            </p>
          </div>

          <div className="space-y-4 pt-4">
            <h3 className="font-bold text-white flex items-center gap-2">
              <MessageCircle size={18} />
              Comentários
            </h3>
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-dark-700 flex-shrink-0" />
              <input 
                type="text" 
                placeholder="Adicione um comentário..." 
                className="flex-1 bg-transparent border-b border-dark-700 py-1 text-sm outline-none focus:border-brand-500 transition-colors"
              />
            </div>
            
            {/* Mock comments */}
            <div className="space-y-4 opacity-50">
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-gray-600" />
                <div className="space-y-1">
                  <p className="text-xs font-bold">Usuário Anônimo <span className="text-gray-500 font-normal ml-2">há 2 horas</span></p>
                  <p className="text-sm">Incrível! Como você fez esse vídeo?</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-purple-600" />
                <div className="space-y-1">
                  <p className="text-xs font-bold">TechLover <span className="text-gray-500 font-normal ml-2">há 5 horas</span></p>
                  <p className="text-sm">Qualidade espetacular.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

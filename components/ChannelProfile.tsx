
import React, { useRef } from 'react';
import { User, Video, VideoFormat } from '../types';
import { Camera, Edit3, PlusSquare, Image as ImageIcon, Share2 } from './Icons';
import { HomeGrid } from './HomeGrid';

interface ChannelProfileProps {
  user: User | { name: string; avatar?: string; banner?: string; subscribers: string; id?: string };
  videos: Video[];
  onUpdateUser?: (updatedUser: User) => void;
  onOpenCreate: () => void;
  onSelectVideo?: (video: Video) => void;
  isOwnChannel: boolean;
  onSelectAuthor?: (authorName: string) => void;
}

export const ChannelProfile: React.FC<ChannelProfileProps> = ({ 
  user, 
  videos, 
  onUpdateUser, 
  onOpenCreate, 
  onSelectVideo, 
  isOwnChannel,
  onSelectAuthor
}) => {
  const bannerInputRef = useRef<HTMLInputElement>(null);
  const avatarInputRef = useRef<HTMLInputElement>(null);

  const userVideos = videos.filter(v => v.authorId === user.id || v.author === user.name);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, field: 'banner' | 'avatar') => {
    if (!onUpdateUser) return;
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onUpdateUser({
          ...user as User,
          [field]: reader.result as string
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-dark-900 md:ml-64 pb-20">
      {/* Banner Section */}
      <div className="relative w-full h-48 md:h-72 bg-dark-800 group">
        <img 
          src={user.banner || 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2070&auto=format&fit=crop'} 
          alt="Banner do canal" 
          className="w-full h-full object-cover"
        />
        {isOwnChannel && (
          <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <button 
              onClick={() => bannerInputRef.current?.click()}
              className="bg-black/60 hover:bg-black/80 text-white px-4 py-2 rounded-full flex items-center gap-2 backdrop-blur-sm transition-all"
            >
              <Camera size={20} />
              <span>Alterar Banner</span>
            </button>
            <input 
              ref={bannerInputRef}
              type="file" 
              accept="image/*" 
              className="hidden" 
              onChange={(e) => handleImageUpload(e, 'banner')}
            />
          </div>
        )}
      </div>

      {/* Profile Info Section */}
      <div className="px-4 md:px-12 relative">
        <div className="flex flex-col md:flex-row items-start md:items-end gap-6 -mt-16 mb-8">
          {/* Avatar */}
          <div className="relative group">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-dark-900 overflow-hidden bg-dark-700 shadow-xl">
              <img 
                src={user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`} 
                alt={user.name} 
                className="w-full h-full object-cover"
              />
            </div>
            {isOwnChannel && (
              <>
                <button 
                  onClick={() => avatarInputRef.current?.click()}
                  className="absolute bottom-2 right-2 p-3 bg-brand-600 rounded-full text-white hover:bg-brand-700 transition-colors shadow-lg"
                  title="Alterar foto de perfil"
                >
                  <Camera size={18} />
                </button>
                <input 
                  ref={avatarInputRef}
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  onChange={(e) => handleImageUpload(e, 'avatar')}
                />
              </>
            )}
          </div>

          {/* Info */}
          <div className="flex-1 pt-2 md:pt-0">
            <h1 className="text-3xl md:text-4xl font-black text-white mb-1 uppercase tracking-tight">{user.name}</h1>
            <p className="text-gray-400 text-sm mb-4 font-medium tracking-wide">
              @{user.name.toLowerCase().replace(/\s/g, '')} • {user.subscribers} inscritos • {userVideos.length} vídeos
            </p>
            
            <div className="flex gap-3">
              {isOwnChannel ? (
                <>
                  <button className="px-6 py-2.5 bg-brand-600 hover:bg-brand-700 text-white rounded-full font-bold transition-all shadow-lg shadow-brand-900/20">
                    Gerenciar Vídeos
                  </button>
                  <button className="px-6 py-2.5 bg-dark-800 hover:bg-dark-700 rounded-full font-bold border border-dark-700 transition-colors">
                    Personalizar Canal
                  </button>
                </>
              ) : (
                <>
                  <button className="px-8 py-2.5 bg-white text-black hover:bg-gray-200 rounded-full font-bold transition-all shadow-lg">
                    Inscrever-se
                  </button>
                  <button className="p-2.5 bg-dark-800 hover:bg-dark-700 rounded-full border border-dark-700 transition-colors">
                    <Share2 size={20} />
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Action Button */}
          {isOwnChannel && (
            <button 
              onClick={onOpenCreate}
              className="hidden md:flex items-center gap-2 bg-brand-600 hover:bg-brand-700 px-8 py-3.5 rounded-2xl font-black shadow-xl shadow-brand-900/20 transition-all uppercase text-sm tracking-widest"
            >
              <PlusSquare size={20} />
              Publicar Novo
            </button>
          )}
        </div>

        {/* Channel Content Tabs */}
        <div className="border-b border-dark-700 mb-8 flex gap-8">
          <button className="py-4 border-b-2 border-brand-500 font-bold text-white text-sm uppercase tracking-widest">Início</button>
          <button className="py-4 border-b-2 border-transparent font-bold text-gray-400 hover:text-gray-200 text-sm uppercase tracking-widest">Vídeos</button>
          <button className="py-4 border-b-2 border-transparent font-bold text-gray-400 hover:text-gray-200 text-sm uppercase tracking-widest">Shorts</button>
          <button className="py-4 border-b-2 border-transparent font-bold text-gray-400 hover:text-gray-200 text-sm uppercase tracking-widest">Playlists</button>
        </div>

        {/* Videos List */}
        <div className="md:-ml-64 md:pl-64">
            {userVideos.length === 0 ? (
                <div className="text-center py-24 bg-dark-800/20 rounded-3xl border-2 border-dark-700 border-dashed max-w-4xl mx-auto">
                    <div className="w-20 h-20 bg-dark-800 rounded-full flex items-center justify-center mx-auto mb-6">
                        <ImageIcon className="text-gray-600" size={40}/>
                    </div>
                    <h3 className="text-2xl font-bold mb-3">O canal ainda não tem vídeos</h3>
                    <p className="text-gray-400 mb-8 max-w-md mx-auto">Acompanhe este criador para receber notificações quando ele postar conteúdos incríveis.</p>
                    {isOwnChannel && (
                        <button 
                            onClick={onOpenCreate}
                            className="bg-brand-600 hover:bg-brand-700 text-white px-8 py-3 rounded-2xl font-bold transition-all shadow-lg"
                        >
                            Subir Primeiro Vídeo
                        </button>
                    )}
                </div>
            ) : (
                <HomeGrid 
                  videos={userVideos} 
                  onSelectVideo={onSelectVideo} 
                  onSelectAuthor={onSelectAuthor}
                />
            )}
        </div>
      </div>
    </div>
  );
};

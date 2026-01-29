import React, { useRef } from 'react';
import { User, Video, VideoFormat } from '../types';
import { Camera, Edit3, PlusSquare, Image as ImageIcon } from './Icons';
import { HomeGrid } from './HomeGrid';

interface ChannelProfileProps {
  user: User;
  videos: Video[];
  onUpdateUser: (updatedUser: User) => void;
  onOpenCreate: () => void;
}

export const ChannelProfile: React.FC<ChannelProfileProps> = ({ user, videos, onUpdateUser, onOpenCreate }) => {
  const bannerInputRef = useRef<HTMLInputElement>(null);
  const avatarInputRef = useRef<HTMLInputElement>(null);

  const userVideos = videos.filter(v => v.authorId === user.id || v.author === user.name);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, field: 'banner' | 'avatar') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onUpdateUser({
          ...user,
          [field]: reader.result as string
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-dark-900 md:ml-64 pb-20">
      {/* Banner Section */}
      <div className="relative w-full h-48 md:h-64 bg-dark-800 group">
        <img 
          src={user.banner} 
          alt="Banner do canal" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <button 
            onClick={() => bannerInputRef.current?.click()}
            className="bg-black/60 hover:bg-black/80 text-white px-4 py-2 rounded-full flex items-center gap-2 backdrop-blur-sm transition-all"
          >
            <Camera size={20} />
            <span>Alterar Capa</span>
          </button>
          <input 
            ref={bannerInputRef}
            type="file" 
            accept="image/*" 
            className="hidden" 
            onChange={(e) => handleImageUpload(e, 'banner')}
          />
        </div>
      </div>

      {/* Profile Info Section */}
      <div className="px-4 md:px-12 relative">
        <div className="flex flex-col md:flex-row items-start md:items-end gap-6 -mt-16 mb-8">
          {/* Avatar */}
          <div className="relative group">
            <div className="w-32 h-32 rounded-full border-4 border-dark-900 overflow-hidden bg-dark-700">
              <img 
                src={user.avatar} 
                alt={user.name} 
                className="w-full h-full object-cover"
              />
            </div>
            <button 
              onClick={() => avatarInputRef.current?.click()}
              className="absolute bottom-2 right-2 p-2 bg-brand-600 rounded-full text-white hover:bg-brand-700 transition-colors shadow-lg"
              title="Alterar foto de perfil"
            >
              <Edit3 size={16} />
            </button>
            <input 
              ref={avatarInputRef}
              type="file" 
              accept="image/*" 
              className="hidden" 
              onChange={(e) => handleImageUpload(e, 'avatar')}
            />
          </div>

          {/* Info */}
          <div className="flex-1 pt-2 md:pt-0">
            <h1 className="text-3xl font-bold text-white mb-1">{user.name}</h1>
            <p className="text-gray-400 text-sm mb-4">@{user.name.toLowerCase().replace(/\s/g, '')} • {user.subscribers} inscritos • {userVideos.length} vídeos</p>
            
            <div className="flex gap-3">
              <button className="px-6 py-2 bg-dark-800 hover:bg-dark-700 rounded-full font-medium transition-colors">
                Gerenciar Vídeos
              </button>
              <button className="px-6 py-2 bg-dark-800 hover:bg-dark-700 rounded-full font-medium transition-colors">
                Sobre
              </button>
            </div>
          </div>

          {/* Create Button in Channel Context */}
          <button 
            onClick={onOpenCreate}
            className="hidden md:flex items-center gap-2 bg-brand-600 hover:bg-brand-700 px-6 py-3 rounded-full font-bold shadow-lg shadow-brand-900/20 transition-all"
          >
            <PlusSquare size={20} />
            Criar Vídeo
          </button>
        </div>

        {/* Channel Content Tabs */}
        <div className="border-b border-dark-700 mb-6 flex gap-8">
          <button className="py-3 border-b-2 border-white font-medium text-white">Vídeos</button>
          <button className="py-3 border-b-2 border-transparent font-medium text-gray-400 hover:text-gray-200">Shorts</button>
          <button className="py-3 border-b-2 border-transparent font-medium text-gray-400 hover:text-gray-200">Playlists</button>
        </div>

        {/* Videos List */}
        <div>
            {userVideos.length === 0 ? (
                <div className="text-center py-20 bg-dark-800/30 rounded-2xl border border-dark-700 border-dashed">
                    <div className="w-16 h-16 bg-dark-800 rounded-full flex items-center justify-center mx-auto mb-4">
                        <ImageIcon className="text-gray-500" size={32}/>
                    </div>
                    <h3 className="text-xl font-bold mb-2">Envie seu primeiro vídeo</h3>
                    <p className="text-gray-400 mb-6 max-w-sm mx-auto">Compartilhe suas histórias e conecte-se com o público. Vídeos longos aparecem aqui.</p>
                    <button 
                        onClick={onOpenCreate}
                        className="bg-brand-600 hover:bg-brand-700 text-white px-6 py-3 rounded-full font-bold transition-colors"
                    >
                        Criar Vídeo
                    </button>
                </div>
            ) : (
                <div className="md:-ml-64 md:pl-64"> 
                  {/* HomeGrid expects styling context, so we adjust margins to fit inside Profile */}
                  <HomeGrid videos={userVideos.filter(v => v.format === VideoFormat.Landscape)} />
                </div>
            )}
        </div>
      </div>
    </div>
  );
};
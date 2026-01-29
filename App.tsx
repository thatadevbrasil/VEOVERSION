import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { ShortsFeed } from './components/ShortsFeed';
import { HomeGrid } from './components/HomeGrid';
import { LiveGrid } from './components/LiveGrid';
import { TVMode } from './components/TVMode';
import { SplashScreen } from './components/SplashScreen';
import { CreateModal } from './components/CreateModal';
import { AuthModal } from './components/AuthModal';
import { UploadView } from './components/UploadView';
import { ChannelProfile } from './components/ChannelProfile';
import { Video, Tab, VideoFormat, GenerationStatus, User, AffiliateLink } from './types';
import { Youtube, User as UserIcon } from './components/Icons';

const INITIAL_VIDEOS: Video[] = [
  {
    id: '1',
    url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2070&auto=format&fit=crop',
    prompt: 'Uma viagem cinematográfica pelas montanhas',
    description: 'Explore as paisagens mais incríveis das montanhas rochosas neste vídeo 4K.',
    format: VideoFormat.Landscape,
    status: GenerationStatus.Completed,
    createdAt: Date.now(),
    likes: 1205,
    views: '12K',
    author: 'TravelBot'
  },
  {
    id: '2',
    url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1542435503-956c469947f6?q=80&w=1974&auto=format&fit=crop',
    prompt: 'Cena de ação rápida com efeitos especiais',
    description: 'Bastidores de como criamos esses efeitos especiais usando apenas IA.',
    affiliateLink: {
        url: 'https://example.com/curso-vfx',
        label: 'Aprenda VFX'
    },
    format: VideoFormat.Landscape,
    status: GenerationStatus.Completed,
    createdAt: Date.now() - 100000,
    likes: 850,
    views: '8.5K',
    author: 'ActionAI'
  },
  {
    id: '4',
    url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    prompt: 'Animação surreal de sonhos',
    description: 'Já sonhou com elefantes voadores? Essa animação foi gerada inteiramente a partir de um sonho que tive.',
    format: VideoFormat.Short,
    status: GenerationStatus.Completed,
    createdAt: Date.now() - 50000,
    likes: 5600,
    views: '100K',
    author: 'DreamGen'
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [videos, setVideos] = useState<Video[]>(INITIAL_VIDEOS);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    setActiveTab('channel');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setActiveTab('home');
  };

  const handleVideoCreated = (url: string, prompt: string, format: VideoFormat, description: string, affiliateLink?: AffiliateLink, thumbnailUrl?: string) => {
    const newVideo: Video = {
      id: Date.now().toString(),
      url,
      thumbnailUrl,
      prompt,
      description,
      affiliateLink,
      format,
      status: GenerationStatus.Completed,
      createdAt: Date.now(),
      likes: 0,
      views: '0',
      author: currentUser ? currentUser.name : 'Você',
      authorId: currentUser?.id,
      authorAvatar: currentUser?.avatar
    };
    
    setVideos(prev => [newVideo, ...prev]);
    
    if (format === VideoFormat.Short) {
      setActiveTab('shorts');
    } else {
      setActiveTab('home'); 
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'shorts':
        return <ShortsFeed videos={videos} />;
      case 'videos':
        return <HomeGrid videos={videos.filter(v => v.format === VideoFormat.Landscape)} />;
      case 'upload':
        return <UploadView onCancel={() => setActiveTab('home')} onUploadSuccess={handleVideoCreated} />;
      case 'tv':
        return <TVMode videos={videos} />;
      case 'live':
        return <LiveGrid videos={videos} onOpenCreate={() => setIsCreateModalOpen(true)} />;
      case 'home':
      case 'library':
      case 'my_videos':
      case 'channel':
        if ((activeTab === 'channel' || activeTab === 'my_videos') && !currentUser) {
            setTimeout(() => setIsAuthModalOpen(true), 0);
            setActiveTab('home');
            return <HomeGrid videos={videos} />;
        }
        if (currentUser && activeTab === 'channel') {
           return <ChannelProfile user={currentUser} videos={videos} onUpdateUser={setCurrentUser} onOpenCreate={() => setIsCreateModalOpen(true)} />;
        }
        return <HomeGrid videos={videos} />;
      default:
        return <HomeGrid videos={videos} />;
    }
  };

  if (loading) {
    return <SplashScreen onFinish={() => setLoading(false)} />;
  }

  // Importante: Remover padding inferior para Shorts para o snap scroll funcionar
  const isShortsActive = activeTab === 'shorts';

  return (
    <div className={`min-h-screen bg-dark-900 text-white font-sans ${!isShortsActive ? 'pb-20 md:pb-0' : ''}`}>
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onOpenCreate={() => setIsCreateModalOpen(true)}
        isMobile={isMobile}
        currentUser={currentUser}
        onLoginClick={() => setIsAuthModalOpen(true)}
        onLogout={handleLogout}
      />

      {isMobile && !isShortsActive && activeTab !== 'upload' && (
        <div className="fixed top-0 left-0 right-0 h-16 bg-dark-900/80 backdrop-blur-md z-40 flex items-center justify-between px-4 border-b border-dark-700">
           <div className="flex items-center gap-2">
             <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center font-bold text-white">
                <Youtube className="text-white fill-white" size={20} />
             </div>
             <span className="font-bold text-lg tracking-tight">VeoTube</span>
           </div>
           {currentUser ? (
              <button onClick={() => setActiveTab('channel')} className="w-8 h-8 rounded-full overflow-hidden border border-brand-500">
                <img src={currentUser.avatar} alt="Me" />
              </button>
           ) : (
             <button className="p-2 text-brand-500" onClick={() => setIsAuthModalOpen(true)}>
                <UserIcon size={24} />
             </button>
           )}
        </div>
      )}

      <main className="min-h-screen">
        {renderContent()}
      </main>

      <CreateModal 
        isOpen={isCreateModalOpen} 
        onClose={() => setIsCreateModalOpen(false)}
        onSuccess={handleVideoCreated}
      />

      <AuthModal 
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLogin={handleLogin}
      />
    </div>
  );
}
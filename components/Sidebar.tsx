
import React from 'react';
import { Home, Compass, Film, MonitorPlay, GraduationCap, Mic, Radio, Clapperboard, Youtube, Tv, LogOut, User as UserIcon, PlusSquare } from './Icons';
import { Tab, User } from '../types';

interface SidebarProps {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
  onOpenCreate: () => void;
  isMobile: boolean;
  currentUser: User | null;
  onLoginClick: () => void;
  onLogout: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  activeTab, 
  setActiveTab, 
  onOpenCreate, 
  isMobile,
  currentUser,
  onLoginClick,
  onLogout
}) => {
  const navItems = [
    { id: 'home', label: 'Início', icon: Home },
    { id: 'explore', label: 'Explorar', icon: Compass },
    { id: 'shorts', label: 'Shorts', icon: Film },
    { id: 'courses', label: 'Cursos', icon: GraduationCap },
    { id: 'podcasts', label: 'Podcasts', icon: Mic },
    { id: 'live', label: 'Ao Vivo', icon: Radio },
  ];

  if (isMobile) {
    return (
      <div className="fixed bottom-0 left-0 right-0 bg-dark-900 border-t border-dark-700 py-2 px-1 flex justify-around items-center z-50">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id as Tab)}
            className={`flex flex-col items-center gap-1 transition-all ${
              activeTab === item.id ? 'text-brand-500' : 'text-gray-400'
            }`}
          >
            <item.icon size={22} />
            <span className="text-[9px] font-medium">{item.label}</span>
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="w-64 h-screen bg-dark-900 border-r border-dark-700 flex flex-col fixed left-0 top-0 hidden md:flex z-50 overflow-hidden">
      <div className="p-4">
        <div className="flex items-center gap-2 mb-8 px-2 cursor-pointer" onClick={() => setActiveTab('home')}>
          <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center">
            <Youtube className="text-white fill-white" size={20} />
          </div>
          <h1 className="text-xl font-bold tracking-tight">VeoTube</h1>
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-1 overflow-y-auto custom-sidebar-scroll pb-4">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id as Tab)}
            className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-colors ${
              activeTab === item.id 
                ? 'bg-brand-600/10 text-brand-500 font-medium' 
                : 'text-gray-400 hover:bg-dark-800 hover:text-white'
            }`}
          >
            <item.icon size={22} />
            <span>{item.label}</span>
          </button>
        ))}

        <div className="my-4 border-t border-dark-700/50" />
        
        <button
            onClick={() => setActiveTab('my_videos')}
            className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-colors ${
              activeTab === 'my_videos' 
                ? 'bg-brand-600/10 text-brand-500 font-medium' 
                : 'text-gray-400 hover:bg-dark-800 hover:text-white'
            }`}
          >
            <Clapperboard size={22} />
            <span>Meus Vídeos</span>
        </button>

        {currentUser ? (
            <button
                onClick={() => setActiveTab('channel')}
                className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-colors ${
                activeTab === 'channel' 
                    ? 'bg-brand-600/10 text-brand-500 font-medium' 
                    : 'text-gray-400 hover:bg-dark-800 hover:text-white'
                }`}
            >
                <div className="w-6 h-6 rounded-full overflow-hidden">
                    <img src={currentUser.avatar} alt="Profile" className="w-full h-full object-cover" />
                </div>
                <span>Seu Canal</span>
            </button>
        ) : (
             <button
                onClick={onLoginClick}
                className="w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-colors text-gray-400 hover:bg-dark-800 hover:text-white"
            >
                <UserIcon size={22} />
                <span>Fazer Login</span>
            </button>
        )}
      </nav>

      <div className="p-4 pt-2 border-t border-dark-700 space-y-3 bg-dark-900">
         <button 
            onClick={onOpenCreate}
            className="w-full flex items-center justify-center gap-2 bg-brand-600 hover:bg-brand-700 text-white py-3 rounded-xl font-semibold transition-all shadow-lg shadow-brand-900/20"
         >
            <PlusSquare size={20} />
            <span>Publicar Vídeo</span>
         </button>

         {currentUser && (
             <button 
                onClick={onLogout}
                className="w-full flex items-center justify-center gap-2 text-gray-500 hover:text-white py-2 text-sm"
             >
                <LogOut size={16} />
                <span>Sair</span>
             </button>
         )}
      </div>
    </div>
  );
};


import React, { useState } from 'react';
import { 
  Home, 
  Compass, 
  Film, 
  MonitorPlay, 
  GraduationCap, 
  Mic, 
  Radio, 
  Clapperboard, 
  Youtube, 
  Tv, 
  LogOut, 
  User as UserIcon, 
  PlusSquare, 
  Cast, 
  Settings,
  ChevronUp,
  ChevronDown,
  LayoutGrid,
  X
} from './Icons';
import { Tab, User } from '../types';

interface SidebarProps {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
  onOpenCreate: () => void;
  onOpenTVConnect: () => void;
  isMobile: boolean;
  currentUser: User | null;
  onLoginClick: () => void;
  onLogout: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  activeTab, 
  setActiveTab, 
  onOpenCreate, 
  onOpenTVConnect,
  isMobile,
  currentUser,
  onLoginClick,
  onLogout
}) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const mainNav = [
    { id: 'home', label: 'Início', icon: Home },
    { id: 'explore', label: 'Explorar', icon: Compass },
    { id: 'shorts', label: 'Shorts', icon: Film },
  ];

  const secondaryNav = [
    { id: 'courses', label: 'Cursos', icon: GraduationCap },
    { id: 'podcasts', label: 'Podcasts', icon: Mic },
    { id: 'live', label: 'Ao Vivo', icon: Radio },
    { id: 'tv', label: 'VeoTV', icon: Tv },
    { id: 'my_videos', label: 'Meus Vídeos', icon: Clapperboard },
  ];

  if (isMobile) {
    return (
      <>
        {/* Overlay do Drawer */}
        <div 
          className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[90] transition-opacity duration-300 ${isDrawerOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
          onClick={() => setIsDrawerOpen(false)}
        />

        {/* Aba Deslizante (Bottom Sheet) */}
        <div 
          className={`fixed bottom-0 left-0 right-0 bg-dark-900 border-t border-dark-700 z-[100] transition-transform duration-500 ease-out rounded-t-[2.5rem] shadow-[0_-20px_50px_rgba(0,0,0,0.8)] ${isDrawerOpen ? 'translate-y-0' : 'translate-y-[calc(100%-80px)]'}`}
        >
          {/* Handle / Puxador */}
          <div 
            className="w-full flex flex-col items-center py-3 cursor-pointer"
            onClick={() => setIsDrawerOpen(!isDrawerOpen)}
          >
            <div className="w-12 h-1.5 bg-dark-700 rounded-full mb-1" />
            {!isDrawerOpen && <span className="text-[10px] font-black text-brand-500 uppercase tracking-widest animate-pulse">Menu Completo</span>}
          </div>

          <div className="px-6 pb-32">
            {isDrawerOpen && (
              <div className="grid grid-cols-3 gap-4 animate-in slide-in-from-bottom-4 duration-500">
                {secondaryNav.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id as Tab);
                      setIsDrawerOpen(false);
                    }}
                    className={`flex flex-col items-center justify-center gap-2 p-4 rounded-3xl transition-all ${
                      activeTab === item.id ? 'bg-brand-600 text-white shadow-lg' : 'bg-dark-800 text-gray-400 hover:text-white'
                    }`}
                  >
                    <item.icon size={24} />
                    <span className="text-[10px] font-bold text-center leading-tight">{item.label}</span>
                  </button>
                ))}
                
                <button
                  onClick={() => {
                    onOpenTVConnect();
                    setIsDrawerOpen(false);
                  }}
                  className="flex flex-col items-center justify-center gap-2 p-4 rounded-3xl bg-dark-800 text-gray-400"
                >
                  <Cast size={24} />
                  <span className="text-[10px] font-bold text-center">Transmitir</span>
                </button>

                {currentUser && (
                  <button
                    onClick={() => {
                      onLogout();
                      setIsDrawerOpen(false);
                    }}
                    className="flex flex-col items-center justify-center gap-2 p-4 rounded-3xl bg-red-900/20 text-red-500"
                  >
                    <LogOut size={24} />
                    <span className="text-[10px] font-bold text-center">Sair</span>
                  </button>
                )}
              </div>
            )}

            {/* Barra Inferior Fixa (Visível quando fechado) */}
            <div className={`flex justify-around items-center h-20 transition-opacity duration-300 ${isDrawerOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
              <button
                onClick={() => setActiveTab('home')}
                className={`flex flex-col items-center gap-1 transition-all ${activeTab === 'home' ? 'text-brand-500 scale-110' : 'text-gray-400'}`}
              >
                <Home size={22} />
                <span className="text-[9px] font-black uppercase tracking-tighter">Início</span>
              </button>
              <button
                onClick={() => setActiveTab('explore')}
                className={`flex flex-col items-center gap-1 transition-all ${activeTab === 'explore' ? 'text-brand-500 scale-110' : 'text-gray-400'}`}
              >
                <Compass size={22} />
                <span className="text-[9px] font-black uppercase tracking-tighter">Explorar</span>
              </button>

              {/* Botão Flutuante (+) */}
              <div className="relative -mt-16 group">
                <div className="absolute inset-0 bg-brand-600 blur-2xl opacity-40 rounded-full" />
                <button
                  onClick={onOpenCreate}
                  className="relative flex flex-col items-center justify-center w-16 h-16 text-white bg-brand-600 rounded-2xl shadow-2xl shadow-brand-900/50 border-4 border-dark-900 transform transition-all active:scale-90"
                >
                  <PlusSquare size={32} />
                </button>
              </div>

              <button
                onClick={() => setActiveTab('shorts')}
                className={`flex flex-col items-center gap-1 transition-all ${activeTab === 'shorts' ? 'text-brand-500 scale-110' : 'text-gray-400'}`}
              >
                <Film size={22} />
                <span className="text-[9px] font-black uppercase tracking-tighter">Shorts</span>
              </button>
              <button
                onClick={() => currentUser ? setActiveTab('channel') : onLoginClick()}
                className={`flex flex-col items-center gap-1 transition-all ${activeTab === 'channel' ? 'text-brand-500 scale-110' : 'text-gray-400'}`}
              >
                {currentUser ? (
                  <img src={currentUser.avatar} className="w-6 h-6 rounded-full border border-brand-500 object-cover" />
                ) : (
                  <UserIcon size={22} />
                )}
                <span className="text-[9px] font-black uppercase tracking-tighter">{currentUser ? 'Perfil' : 'Entrar'}</span>
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  // Desktop Sidebar (Sem alterações para manter consistência)
  return (
    <div className="w-64 h-screen bg-dark-900 border-r border-dark-700 flex flex-col fixed left-0 top-0 hidden lg:flex z-50 overflow-hidden">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-10 cursor-pointer" onClick={() => setActiveTab('home')}>
          <div className="w-10 h-10 bg-brand-600 rounded-2xl flex items-center justify-center shadow-lg shadow-brand-900/30 rotate-3 group hover:rotate-0 transition-transform">
            <Youtube className="text-white fill-white" size={24} />
          </div>
          <h1 className="text-2xl font-black tracking-tighter uppercase italic text-white">VeoTube</h1>
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-1 overflow-y-auto custom-sidebar-scroll pb-6">
        <p className="px-4 text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-2">Principal</p>
        {mainNav.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id as Tab)}
            className={`w-full flex items-center gap-4 px-4 py-3 rounded-2xl transition-all duration-300 ${
              activeTab === item.id 
                ? 'bg-brand-600 text-white font-bold shadow-lg shadow-brand-900/20' 
                : 'text-gray-400 hover:bg-dark-800 hover:text-white'
            }`}
          >
            <item.icon size={20} />
            <span className="text-sm">{item.label}</span>
          </button>
        ))}

        <div className="my-6 border-t border-dark-800" />
        
        <p className="px-4 text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-2">Conteúdo</p>
        {secondaryNav.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id as Tab)}
            className={`w-full flex items-center gap-4 px-4 py-3 rounded-2xl transition-all duration-300 ${
              activeTab === item.id 
                ? 'bg-brand-600 text-white font-bold shadow-lg shadow-brand-900/20' 
                : 'text-gray-400 hover:bg-dark-800 hover:text-white'
            }`}
          >
            <item.icon size={20} />
            <span className="text-sm">{item.label}</span>
          </button>
        ))}

        <div className="my-6 border-t border-dark-800" />
        
        <p className="px-4 text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-2">Ferramentas</p>
        <button
            onClick={onOpenTVConnect}
            className="w-full flex items-center gap-4 px-4 py-3 rounded-2xl text-gray-400 hover:bg-dark-800 hover:text-brand-500 transition-all group"
          >
            <Cast size={20} className="group-hover:animate-pulse" />
            <span className="text-sm">Transmitir para TV</span>
        </button>
      </nav>

      <div className="p-4 space-y-2 bg-dark-900 border-t border-dark-800">
         {currentUser ? (
             <div className="flex items-center justify-between px-2">
                <button 
                    onClick={onLogout}
                    className="flex items-center gap-2 text-gray-500 hover:text-red-400 transition-colors text-xs font-bold uppercase"
                >
                    <LogOut size={14} />
                    <span>Sair</span>
                </button>
                <button className="text-gray-500 hover:text-white">
                    <Settings size={14} />
                </button>
             </div>
         ) : (
            <button 
                onClick={onLoginClick}
                className="w-full bg-dark-800 hover:bg-dark-700 text-white py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all"
            >
                Fazer Login
            </button>
         )}
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { X, Mail, Loader2, Youtube } from './Icons';
import { User } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (user: User) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email.includes('@hotmail.com') && !email.includes('@outlook.com') && !email.includes('@live.com')) {
      setError('Por favor, use um email Hotmail, Outlook ou Live.');
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      const newUser: User = {
        id: Date.now().toString(),
        name: name || email.split('@')[0],
        email: email,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`,
        banner: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2070&auto=format&fit=crop',
        subscribers: '0'
      };
      
      onLogin(newUser);
      setIsLoading(false);
      onClose();
    }, 1500);
  };

  const handleYoutubeLogin = () => {
    setIsLoading(true);
    // Simulate YouTube Auth
    setTimeout(() => {
        const newUser: User = {
            id: 'yt_' + Date.now().toString(),
            name: 'YouTube Creator',
            email: 'creator@youtube.com',
            avatar: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1000&auto=format&fit=crop',
            banner: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop',
            subscribers: '1.2K'
        };
        onLogin(newUser);
        setIsLoading(false);
        onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-dark-900 border border-dark-700 w-full max-w-md rounded-2xl shadow-2xl p-8 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white">
          <X size={24} />
        </button>

        <div className="flex flex-col items-center mb-6">
          <h2 className="text-2xl font-bold">Entrar no VeoTube</h2>
          <p className="text-gray-400 text-sm mt-1">Crie, compartilhe e monetize seus vídeos</p>
        </div>

        <div className="space-y-4">
            <button 
                onClick={handleYoutubeLogin}
                disabled={isLoading}
                className="w-full bg-white hover:bg-gray-100 text-gray-900 font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
                <Youtube className="text-red-600 fill-red-600" size={24} />
                <span>Entrar com YouTube</span>
            </button>

            <div className="flex items-center gap-4 py-2">
                <div className="h-px bg-dark-700 flex-1"></div>
                <span className="text-gray-500 text-sm">ou com Microsoft</span>
                <div className="h-px bg-dark-700 flex-1"></div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="text-sm font-medium text-gray-300 block mb-1">Nome do Canal</label>
                <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-dark-800 border border-dark-700 rounded-lg p-3 text-white focus:border-brand-500 outline-none"
                placeholder="Ex: TechMaster"
                />
            </div>
            
            <div>
                <label className="text-sm font-medium text-gray-300 block mb-1">Email (Hotmail/Outlook)</label>
                <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-dark-800 border border-dark-700 rounded-lg p-3 text-white focus:border-brand-500 outline-none"
                placeholder="seu.email@hotmail.com"
                />
            </div>

            <div>
                <label className="text-sm font-medium text-gray-300 block mb-1">Senha</label>
                <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-dark-800 border border-dark-700 rounded-lg p-3 text-white focus:border-brand-500 outline-none"
                placeholder="••••••••"
                />
            </div>

            {error && (
                <div className="text-red-500 text-sm text-center bg-red-500/10 p-2 rounded">
                {error}
                </div>
            )}

            <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
                {isLoading ? <Loader2 className="animate-spin" /> : <><Mail size={20}/> <span>Entrar com Hotmail</span></>}
            </button>
            </form>
        </div>
      </div>
    </div>
  );
};
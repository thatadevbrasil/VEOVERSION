import React, { useEffect, useState } from 'react';
import { Camera } from './Icons';

interface SplashScreenProps {
  onFinish: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onFinish, 500); // Wait a bit after hitting 100%
          return 100;
        }
        // Randomize speed slightly for realism
        return prev + Math.floor(Math.random() * 5) + 1;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [onFinish]);

  return (
    <div className="fixed inset-0 z-[200] bg-dark-900 flex flex-col items-center justify-center">
      <div className="relative mb-8 animate-pulse">
        <div className="w-24 h-24 bg-brand-600 rounded-2xl flex items-center justify-center shadow-lg shadow-brand-900/50">
           <Camera size={48} className="text-white" />
        </div>
        <div className="absolute -bottom-2 -right-2 text-3xl">
            🇧🇷
        </div>
      </div>
      
      <h1 className="text-3xl font-bold mb-8 tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
        VEOTUBE
      </h1>

      <div className="w-64 h-2 bg-dark-700 rounded-full overflow-hidden relative">
        <div 
          className="h-full bg-brand-600 transition-all duration-100 ease-out"
          style={{ width: `${Math.min(progress, 100)}%` }}
        ></div>
      </div>
      
      <div className="mt-4 text-brand-500 font-mono text-sm">
        Processando... {Math.min(progress, 100)}%
      </div>
    </div>
  );
};
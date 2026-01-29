
import React, { useState, useEffect } from 'react';
import { X, Tv, Cast, Loader2, CheckCircle, Smartphone, History, Trash2 } from './Icons';
import { PairedDevice } from '../types';

interface TVConnectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TVConnectModal: React.FC<TVConnectModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<'generate' | 'connecting' | 'success'>('generate');
  const [pairingCode, setPairingCode] = useState('');
  const [pairedDevices, setPairedDevices] = useState<PairedDevice[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('veotube_paired_tvs');
    if (saved) {
      setPairedDevices(JSON.parse(saved));
    }
  }, []);

  const generateCode = () => {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setPairingCode(code);
    setStep('connecting');

    // Simula a conexão após 4 segundos
    setTimeout(() => {
      const newDevice: PairedDevice = {
        id: Math.random().toString(36).substr(2, 9),
        name: `Smart TV ${pairedDevices.length + 1}`,
        lastConnected: Date.now(),
        code: code
      };
      
      const updated = [newDevice, ...pairedDevices];
      setPairedDevices(updated);
      localStorage.setItem('veotube_paired_tvs', JSON.stringify(updated));
      setStep('success');
    }, 4000);
  };

  const removeDevice = (id: string) => {
    const updated = pairedDevices.filter(d => d.id !== id);
    setPairedDevices(updated);
    localStorage.setItem('veotube_paired_tvs', JSON.stringify(updated));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/95 backdrop-blur-md">
      <div className="bg-dark-900 border border-dark-700 w-full max-w-lg rounded-[2.5rem] shadow-2xl p-8 relative overflow-hidden">
        {/* Decorative background */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-brand-600/10 blur-3xl rounded-full -mr-16 -mt-16" />
        
        <button onClick={onClose} className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors">
          <X size={28} />
        </button>

        <div className="flex flex-col items-center text-center">
          <div className="w-20 h-20 bg-brand-600 rounded-3xl flex items-center justify-center mb-6 shadow-xl shadow-brand-900/40 rotate-6">
            <Cast size={40} className="text-white" />
          </div>
          
          <h2 className="text-3xl font-black mb-2 uppercase tracking-tighter">Conectar Smart TV</h2>
          <p className="text-gray-400 text-sm mb-8">Transmita seus vídeos favoritos para a tela grande com um toque.</p>

          {step === 'generate' && (
            <div className="w-full space-y-6">
              <button 
                onClick={generateCode}
                className="w-full py-5 bg-brand-600 hover:bg-brand-700 text-white rounded-3xl font-black text-lg shadow-xl shadow-brand-900/30 transition-all active:scale-95 flex items-center justify-center gap-3 uppercase tracking-widest"
              >
                <Tv size={24} />
                Gerar Código de Pareamento
              </button>

              {pairedDevices.length > 0 && (
                <div className="pt-6 border-t border-dark-800 w-full">
                  <h3 className="text-left text-xs font-black text-gray-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <History size={14} />
                    Dispositivos Conhecidos
                  </h3>
                  <div className="space-y-3 max-h-48 overflow-y-auto pr-2 custom-sidebar-scroll">
                    {pairedDevices.map(device => (
                      <div key={device.id} className="flex items-center justify-between p-4 bg-dark-800/50 rounded-2xl border border-dark-700 group">
                        <div className="flex items-center gap-3">
                          <Tv className="text-brand-500" size={20} />
                          <div className="text-left">
                            <p className="text-sm font-bold">{device.name}</p>
                            <p className="text-[10px] text-gray-500">Visto pela última vez: {new Date(device.lastConnected).toLocaleDateString()}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <button className="text-xs font-bold text-brand-500 hover:underline">Reconectar</button>
                            <button onClick={() => removeDevice(device.id)} className="p-2 text-gray-600 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Trash2 size={16} />
                            </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {step === 'connecting' && (
            <div className="flex flex-col items-center py-10 space-y-8 animate-in fade-in duration-500">
               <div className="relative">
                  <div className="w-24 h-24 border-4 border-brand-500 border-t-transparent rounded-full animate-spin" />
                  <Smartphone className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-brand-500" size={32} />
               </div>
               <div className="text-center">
                  <p className="text-4xl font-black tracking-[0.5em] text-brand-500 mb-4">{pairingCode}</p>
                  <p className="text-sm text-gray-400 font-bold uppercase tracking-widest">Aguardando Pareamento...</p>
                  <p className="text-xs text-gray-500 mt-2">Insira este código no app da sua Smart TV</p>
               </div>
            </div>
          )}

          {step === 'success' && (
            <div className="flex flex-col items-center py-10 space-y-6 animate-in zoom-in duration-300">
               <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center text-white shadow-xl shadow-green-900/30">
                  <CheckCircle size={48} />
               </div>
               <div className="text-center">
                  <h3 className="text-2xl font-bold mb-2">Conectado com Sucesso!</h3>
                  <p className="text-gray-400">Agora você pode controlar sua TV através do app.</p>
               </div>
               <button 
                onClick={onClose}
                className="px-10 py-3 bg-dark-800 hover:bg-dark-700 rounded-full font-bold transition-colors"
               >
                 Entendido
               </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

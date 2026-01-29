import React, { useState } from 'react';
import { X, Loader2, Film, Link } from './Icons';
import { VideoFormat, GenerationStatus, AffiliateLink } from '../types';
import { generateVideo } from '../services/geminiService';

interface CreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (videoUrl: string, prompt: string, format: VideoFormat, description: string, affiliateLink?: AffiliateLink) => void;
}

export const CreateModal: React.FC<CreateModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [prompt, setPrompt] = useState('');
  const [description, setDescription] = useState('');
  const [linkUrl, setLinkUrl] = useState('');
  const [linkLabel, setLinkLabel] = useState('');
  const [format, setFormat] = useState<VideoFormat>(VideoFormat.Landscape);
  const [status, setStatus] = useState<GenerationStatus>(GenerationStatus.Idle);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setStatus(GenerationStatus.Generating);
    setError(null);

    try {
      const url = await generateVideo(prompt, format);
      
      const affiliateLink = linkUrl ? { url: linkUrl, label: linkLabel || 'Ver Produto' } : undefined;

      onSuccess(url, prompt, format, description, affiliateLink);
      setStatus(GenerationStatus.Completed);
      // Reset after brief delay
      setTimeout(() => {
        onClose();
        setStatus(GenerationStatus.Idle);
        setPrompt('');
        setDescription('');
        setLinkUrl('');
        setLinkLabel('');
      }, 1000);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Falha ao gerar o vídeo. Tente novamente.');
      setStatus(GenerationStatus.Failed);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="bg-dark-900 border border-dark-700 w-full max-w-lg rounded-2xl shadow-2xl p-6 relative my-8">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
          disabled={status === GenerationStatus.Generating}
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl font-bold mb-1 flex items-center gap-2">
          <Film className="text-brand-500" />
          Criar Novo Vídeo
        </h2>
        <p className="text-gray-400 mb-6 text-sm">
          Descreva sua visão e a IA Veo do Google irá gerar um vídeo para você.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Prompt de Criação</label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Ex: Um gato cibernético andando de skate..."
              className="w-full h-24 bg-dark-800 border border-dark-700 rounded-xl p-4 text-white placeholder-gray-500 focus:ring-2 focus:ring-brand-600 focus:border-transparent resize-none"
              disabled={status === GenerationStatus.Generating}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Descrição do Vídeo</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Adicione detalhes sobre o conteúdo..."
              className="w-full h-20 bg-dark-800 border border-dark-700 rounded-xl p-4 text-white placeholder-gray-500 focus:ring-2 focus:ring-brand-600 focus:border-transparent resize-none"
              disabled={status === GenerationStatus.Generating}
            />
          </div>

          <div className="bg-dark-800/50 p-4 rounded-xl space-y-3 border border-dark-700/50">
            <div className="flex items-center gap-2 text-brand-500 mb-2">
                <Link size={16} />
                <span className="text-sm font-bold">Link de Afiliado (Opcional)</span>
            </div>
            <div>
                <input
                    type="url"
                    value={linkUrl}
                    onChange={(e) => setLinkUrl(e.target.value)}
                    placeholder="URL (ex: https://loja.com/produto)"
                    className="w-full bg-dark-800 border border-dark-700 rounded-lg p-3 text-white text-sm focus:border-brand-500 outline-none"
                    disabled={status === GenerationStatus.Generating}
                />
            </div>
            <div>
                <input
                    type="text"
                    value={linkLabel}
                    onChange={(e) => setLinkLabel(e.target.value)}
                    placeholder="Texto do Botão (ex: Compre Agora - 50% OFF)"
                    className="w-full bg-dark-800 border border-dark-700 rounded-lg p-3 text-white text-sm focus:border-brand-500 outline-none"
                    disabled={status === GenerationStatus.Generating}
                />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Formato</label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setFormat(VideoFormat.Landscape)}
                className={`p-4 rounded-xl border flex flex-col items-center gap-2 transition-all ${
                  format === VideoFormat.Landscape
                    ? 'bg-brand-600/10 border-brand-500 text-brand-500'
                    : 'bg-dark-800 border-dark-700 text-gray-400 hover:border-dark-600'
                }`}
                disabled={status === GenerationStatus.Generating}
              >
                <div className="w-12 h-8 border-2 border-current rounded-md border-dashed opacity-50" />
                <span className="text-sm font-medium">Longo (16:9)</span>
              </button>

              <button
                type="button"
                onClick={() => setFormat(VideoFormat.Short)}
                className={`p-4 rounded-xl border flex flex-col items-center gap-2 transition-all ${
                  format === VideoFormat.Short
                    ? 'bg-brand-600/10 border-brand-500 text-brand-500'
                    : 'bg-dark-800 border-dark-700 text-gray-400 hover:border-dark-600'
                }`}
                disabled={status === GenerationStatus.Generating}
              >
                <div className="w-6 h-10 border-2 border-current rounded-md border-dashed opacity-50" />
                <span className="text-sm font-medium">Shorts (9:16)</span>
              </button>
            </div>
          </div>

          {error && (
            <div className="p-3 bg-red-900/20 border border-red-900/50 rounded-lg text-red-400 text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={!prompt.trim() || status === GenerationStatus.Generating}
            className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
              status === GenerationStatus.Generating
                ? 'bg-dark-700 cursor-not-allowed text-gray-400'
                : 'bg-brand-600 hover:bg-brand-700 text-white shadow-lg shadow-brand-900/30'
            }`}
          >
            {status === GenerationStatus.Generating ? (
              <>
                <Loader2 className="animate-spin" />
                Gerando sua visão...
              </>
            ) : status === GenerationStatus.Completed ? (
              'Concluído!'
            ) : (
              'Gerar Vídeo'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
import React, { useState, useRef } from 'react';
import { X, Loader2, Film, Link, Camera, Image as ImageIcon, UploadCloud, CheckCircle } from './Icons';
import { VideoFormat, GenerationStatus, AffiliateLink } from '../types';

interface CreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (videoUrl: string, title: string, format: VideoFormat, description: string, affiliateLink?: AffiliateLink, thumbnailUrl?: string) => void;
}

export const CreateModal: React.FC<CreateModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [linkUrl, setLinkUrl] = useState('');
  const [linkLabel, setLinkLabel] = useState('');
  const [format, setFormat] = useState<VideoFormat>(VideoFormat.Landscape);
  const [status, setStatus] = useState<GenerationStatus>(GenerationStatus.Idle);
  const [thumbnailUrl, setThumbnailUrl] = useState<string | undefined>(undefined);
  
  const videoInputRef = useRef<HTMLInputElement>(null);
  const thumbnailInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setVideoFile(file);
      const url = URL.createObjectURL(file);
      setVideoPreview(url);
    }
  };

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnailUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!videoPreview || !title.trim()) return;

    setStatus(GenerationStatus.Generating); // Usando como estado de "Processando"

    // Simula processamento manual
    setTimeout(() => {
      const affiliateLink = linkUrl ? { url: linkUrl, label: linkLabel || 'Ver Produto' } : undefined;
      onSuccess(videoPreview, title, format, description, affiliateLink, thumbnailUrl);
      setStatus(GenerationStatus.Completed);
      
      setTimeout(() => {
        onClose();
        // Reset
        setVideoFile(null);
        setVideoPreview(null);
        setTitle('');
        setDescription('');
        setLinkUrl('');
        setLinkLabel('');
        setThumbnailUrl(undefined);
        setStatus(GenerationStatus.Idle);
      }, 800);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md overflow-y-auto">
      <div className="bg-dark-900 border border-dark-700 w-full max-w-2xl rounded-3xl shadow-2xl p-6 md:p-8 relative my-8">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors"
          disabled={status === GenerationStatus.Generating}
        >
          <X size={28} />
        </button>

        <h2 className="text-3xl font-bold mb-2 flex items-center gap-3">
          <UploadCloud className="text-brand-500" size={32} />
          Novo Vídeo Manual
        </h2>
        <p className="text-gray-400 mb-8">
          Preencha as informações e suba seu próprio arquivo de vídeo.
        </p>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Coluna Esquerda: Arquivos */}
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-300 uppercase tracking-wider">Arquivo de Vídeo</label>
              <div 
                onClick={() => videoInputRef.current?.click()}
                className={`relative aspect-video w-full border-2 border-dashed rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-all overflow-hidden group ${
                    videoPreview ? 'border-brand-500 bg-black' : 'border-dark-700 bg-dark-800 hover:border-brand-500'
                }`}
              >
                {videoPreview ? (
                  <video src={videoPreview} className="w-full h-full object-contain" />
                ) : (
                  <>
                    <Film size={40} className="text-gray-500 mb-2 group-hover:text-brand-500 transition-colors" />
                    <span className="text-xs text-gray-500 font-bold">Selecionar Vídeo</span>
                  </>
                )}
              </div>
              <input ref={videoInputRef} type="file" accept="video/*" className="hidden" onChange={handleVideoChange} />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-300 uppercase tracking-wider">Capa (Thumbnail)</label>
              <div 
                onClick={() => thumbnailInputRef.current?.click()}
                className={`relative aspect-video w-full border-2 border-dashed rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-all overflow-hidden group ${
                    thumbnailUrl ? 'border-brand-500 bg-black' : 'border-dark-700 bg-dark-800 hover:border-brand-500'
                }`}
              >
                {thumbnailUrl ? (
                  <img src={thumbnailUrl} alt="Capa" className="w-full h-full object-cover" />
                ) : (
                  <>
                    <ImageIcon size={32} className="text-gray-500 mb-2 group-hover:text-brand-500 transition-colors" />
                    <span className="text-xs text-gray-500 font-bold">Escolher Capa</span>
                  </>
                )}
              </div>
              <input ref={thumbnailInputRef} type="file" accept="image/*" className="hidden" onChange={handleThumbnailChange} />
            </div>
          </div>

          {/* Coluna Direita: Metadados */}
          <div className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-300 uppercase tracking-wider">Título</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ex: Meu vlog de viagem"
                className="w-full bg-dark-800 border border-dark-700 rounded-xl p-4 text-white focus:ring-2 focus:ring-brand-600 outline-none"
                disabled={status === GenerationStatus.Generating}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-300 uppercase tracking-wider">Descrição</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Conte sobre o vídeo..."
                className="w-full h-24 bg-dark-800 border border-dark-700 rounded-xl p-4 text-white focus:ring-2 focus:ring-brand-600 outline-none resize-none"
                disabled={status === GenerationStatus.Generating}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-300 uppercase tracking-wider">Formato</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setFormat(VideoFormat.Landscape)}
                  className={`py-3 rounded-xl border font-bold text-xs transition-all ${
                    format === VideoFormat.Landscape
                      ? 'bg-brand-600 border-brand-500 text-white'
                      : 'bg-dark-800 border-dark-700 text-gray-500 hover:border-dark-600'
                  }`}
                  disabled={status === GenerationStatus.Generating}
                >
                  HORIZONTAL (16:9)
                </button>
                <button
                  type="button"
                  onClick={() => setFormat(VideoFormat.Short)}
                  className={`py-3 rounded-xl border font-bold text-xs transition-all ${
                    format === VideoFormat.Short
                      ? 'bg-brand-600 border-brand-500 text-white'
                      : 'bg-dark-800 border-dark-700 text-gray-500 hover:border-dark-600'
                  }`}
                  disabled={status === GenerationStatus.Generating}
                >
                  SHORTS (9:16)
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={!videoPreview || !title.trim() || status === GenerationStatus.Generating}
              className={`w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all mt-4 ${
                status === GenerationStatus.Generating
                  ? 'bg-dark-700 text-gray-400'
                  : 'bg-brand-600 hover:bg-brand-700 text-white shadow-xl shadow-brand-900/30 active:scale-95'
              }`}
            >
              {status === GenerationStatus.Generating ? (
                <><Loader2 className="animate-spin" />Publicando...</>
              ) : status === GenerationStatus.Completed ? (
                <><CheckCircle /> Publicado!</>
              ) : (
                'Publicar Vídeo'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
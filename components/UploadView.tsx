
import React, { useState, useRef } from 'react';
// Added MonitorPlay to imports
import { UploadCloud, X, Film, Link as LinkIcon, CheckCircle, Loader2, MonitorPlay } from './Icons';
import { VideoFormat, GenerationStatus, AffiliateLink } from '../types';

interface UploadViewProps {
  onUploadSuccess: (videoUrl: string, title: string, format: VideoFormat, description: string, affiliateLink?: AffiliateLink) => void;
  onCancel: () => void;
}

export const UploadView: React.FC<UploadViewProps> = ({ onUploadSuccess, onCancel }) => {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [linkUrl, setLinkUrl] = useState('');
  const [linkLabel, setLinkLabel] = useState('');
  const [format, setFormat] = useState<VideoFormat>(VideoFormat.Short);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const url = URL.createObjectURL(selectedFile);
      setPreviewUrl(url);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !title) return;

    setIsUploading(true);
    
    // Simulate upload processing
    setTimeout(() => {
      const affiliateLink = linkUrl ? { url: linkUrl, label: linkLabel || 'Ver Link' } : undefined;
      onUploadSuccess(previewUrl!, title, format, description, affiliateLink);
      setIsUploading(false);
    }, 2000);
  };

  const clearSelection = () => {
    setFile(null);
    setPreviewUrl(null);
  };

  return (
    <div className="p-4 md:p-8 pt-20 md:pt-8 md:ml-64 bg-dark-900 min-h-screen flex flex-col items-center">
      <div className="w-full max-w-4xl">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold flex items-center gap-3">
            <div className="p-2 bg-brand-600 rounded-lg">
                <UploadCloud size={24} className="text-white" />
            </div>
            Carregar Vídeo da Galeria
          </h2>
          <button onClick={onCancel} className="text-gray-400 hover:text-white transition-colors">
            <X size={28} />
          </button>
        </div>

        {!previewUrl ? (
          <div 
            onClick={() => fileInputRef.current?.click()}
            className="w-full aspect-video md:aspect-[21/9] border-2 border-dashed border-dark-700 rounded-3xl flex flex-col items-center justify-center bg-dark-800/50 hover:bg-dark-800 hover:border-brand-500/50 transition-all cursor-pointer group"
          >
            <div className="w-20 h-20 bg-dark-700 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform group-hover:bg-brand-600/20">
              <UploadCloud size={40} className="text-brand-500" />
            </div>
            <p className="text-xl font-bold mb-2">Selecione o vídeo da sua galeria</p>
            <p className="text-gray-400 text-sm">MP4, WebM ou OGG. Até 500MB.</p>
            <input 
              ref={fileInputRef}
              type="file" 
              accept="video/*" 
              className="hidden" 
              onChange={handleFileChange}
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Preview Section */}
            <div className="space-y-4">
              <div className="relative rounded-3xl overflow-hidden bg-black aspect-[9/16] max-h-[600px] mx-auto shadow-2xl border border-dark-700">
                <video 
                  src={previewUrl} 
                  className="w-full h-full object-cover"
                  controls
                  autoPlay
                  loop
                />
                <button 
                  onClick={clearSelection}
                  className="absolute top-4 right-4 bg-black/60 hover:bg-red-600 p-2 rounded-full text-white transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="text-center text-sm text-gray-500">
                Prévia do vídeo selecionado
              </div>
            </div>

            {/* Form Section */}
            <form onSubmit={handleSubmit} className="space-y-6 bg-dark-800/50 p-6 md:p-8 rounded-3xl border border-dark-700">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-300 uppercase tracking-wider">Título do Vídeo</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Dê um título atraente..."
                  className="w-full bg-dark-800 border border-dark-700 rounded-xl p-4 text-white focus:ring-2 focus:ring-brand-600 outline-none transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-300 uppercase tracking-wider">Descrição</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Sobre o que é esse vídeo?"
                  className="w-full h-32 bg-dark-800 border border-dark-700 rounded-xl p-4 text-white focus:ring-2 focus:ring-brand-600 outline-none transition-all resize-none"
                />
              </div>

              <div className="space-y-4 pt-4 border-t border-dark-700">
                <div className="flex items-center gap-2 text-brand-500 mb-2">
                    <LinkIcon size={18} />
                    <span className="font-bold">Monetização / Link de Afiliado</span>
                </div>
                <input
                    type="url"
                    value={linkUrl}
                    onChange={(e) => setLinkUrl(e.target.value)}
                    placeholder="URL do Produto (ex: https://shopee.com/...)"
                    className="w-full bg-dark-800 border border-dark-700 rounded-xl p-4 text-white focus:ring-2 focus:ring-brand-600 outline-none transition-all text-sm"
                />
                <input
                    type="text"
                    value={linkUrl}
                    onChange={(e) => setLinkLabel(e.target.value)}
                    placeholder="Texto do Botão (ex: Comprar Agora)"
                    className="w-full bg-dark-800 border border-dark-700 rounded-xl p-4 text-white focus:ring-2 focus:ring-brand-600 outline-none transition-all text-sm"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-300 uppercase tracking-wider">Formato de Exibição</label>
                <div className="grid grid-cols-2 gap-4">
                    <button
                        type="button"
                        onClick={() => setFormat(VideoFormat.Short)}
                        className={`p-4 rounded-xl border flex flex-col items-center gap-2 transition-all ${
                            format === VideoFormat.Short ? 'border-brand-500 bg-brand-500/10 text-white' : 'border-dark-700 text-gray-500'
                        }`}
                    >
                        <Film size={20} />
                        <span className="text-xs font-bold">SHORTS</span>
                    </button>
                    <button
                        type="button"
                        onClick={() => setFormat(VideoFormat.Landscape)}
                        className={`p-4 rounded-xl border flex flex-col items-center gap-2 transition-all ${
                            format === VideoFormat.Landscape ? 'border-brand-500 bg-brand-500/10 text-white' : 'border-dark-700 text-gray-500'
                        }`}
                    >
                        <MonitorPlay size={20} />
                        <span className="text-xs font-bold">VÍDEO LONGO</span>
                    </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isUploading}
                className={`w-full py-4 rounded-2xl font-bold text-white flex items-center justify-center gap-3 transition-all ${
                    isUploading ? 'bg-dark-700 cursor-not-allowed' : 'bg-brand-600 hover:bg-brand-700 shadow-xl shadow-brand-900/30 active:scale-95'
                }`}
              >
                {isUploading ? (
                  <>
                    <Loader2 className="animate-spin" />
                    Processando Vídeo...
                  </>
                ) : (
                  <>
                    <CheckCircle size={24} />
                    Publicar Vídeo
                  </>
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

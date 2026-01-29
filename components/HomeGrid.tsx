import React, { useState, useMemo } from 'react';
import { Video, VideoFormat } from '../types';
import { Play, MoreVertical, Search, Filter, Calendar, User, Film, MonitorPlay } from './Icons';

interface HomeGridProps {
  videos: Video[];
}

type DateFilter = 'all' | 'today' | 'week' | 'month';
type FormatFilter = 'all' | 'landscape' | 'short';

export const HomeGrid: React.FC<HomeGridProps> = ({ videos }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [authorFilter, setAuthorFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState<DateFilter>('all');
  const [formatFilter, setFormatFilter] = useState<FormatFilter>('all');

  // Get unique authors for the filter dropdown
  const authors = useMemo(() => {
    const uniqueAuthors = Array.from(new Set(videos.map(v => v.author)));
    return uniqueAuthors.sort();
  }, [videos]);

  // Filtering logic
  const filteredVideos = useMemo(() => {
    return videos.filter(video => {
      // Search query (matches prompt or author)
      const matchesSearch = 
        video.prompt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        video.author.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Author filter
      const matchesAuthor = authorFilter === 'all' || video.author === authorFilter;
      
      // Format filter
      const matchesFormat = 
        formatFilter === 'all' || 
        (formatFilter === 'landscape' && video.format === VideoFormat.Landscape) ||
        (formatFilter === 'short' && video.format === VideoFormat.Short);
      
      // Date filter
      const now = Date.now();
      const oneDay = 24 * 60 * 60 * 1000;
      let matchesDate = true;
      if (dateFilter === 'today') {
        matchesDate = video.createdAt > now - oneDay;
      } else if (dateFilter === 'week') {
        matchesDate = video.createdAt > now - (oneDay * 7);
      } else if (dateFilter === 'month') {
        matchesDate = video.createdAt > now - (oneDay * 30);
      }

      return matchesSearch && matchesAuthor && matchesFormat && matchesDate;
    });
  }, [videos, searchQuery, authorFilter, dateFilter, formatFilter]);

  return (
    <div className="p-4 md:p-8 pt-20 md:pt-8 md:ml-64 bg-dark-900 min-h-screen">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <h2 className="text-2xl font-bold">Explorar</h2>
        
        {/* Search Bar */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
          <input
            type="text"
            placeholder="Pesquisar vídeos ou autores..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-dark-800 border border-dark-700 rounded-full py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-brand-600 outline-none transition-all"
          />
        </div>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-wrap items-center gap-3 mb-8 pb-4 border-b border-dark-800">
        <div className="flex items-center gap-2 text-gray-400 text-sm mr-2">
          <Filter size={16} />
          <span>Filtros:</span>
        </div>

        {/* Author Dropdown */}
        <div className="relative group">
          <select
            value={authorFilter}
            onChange={(e) => setAuthorFilter(e.target.value)}
            className="appearance-none bg-dark-800 hover:bg-dark-700 border border-dark-700 rounded-lg px-4 py-1.5 pr-8 text-xs font-medium cursor-pointer transition-colors outline-none focus:border-brand-600"
          >
            <option value="all">Todos os Autores</option>
            {authors.map(author => (
              <option key={author} value={author}>{author}</option>
            ))}
          </select>
          <User className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size={14} />
        </div>

        {/* Date Dropdown */}
        <div className="relative group">
          <select
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value as DateFilter)}
            className="appearance-none bg-dark-800 hover:bg-dark-700 border border-dark-700 rounded-lg px-4 py-1.5 pr-8 text-xs font-medium cursor-pointer transition-colors outline-none focus:border-brand-600"
          >
            <option value="all">Qualquer data</option>
            <option value="today">Hoje</option>
            <option value="week">Esta semana</option>
            <option value="month">Este mês</option>
          </select>
          <Calendar className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size={14} />
        </div>

        {/* Format Dropdown */}
        <div className="relative group">
          <select
            value={formatFilter}
            onChange={(e) => setFormatFilter(e.target.value as FormatFilter)}
            className="appearance-none bg-dark-800 hover:bg-dark-700 border border-dark-700 rounded-lg px-4 py-1.5 pr-8 text-xs font-medium cursor-pointer transition-colors outline-none focus:border-brand-600"
          >
            <option value="all">Todos os formatos</option>
            <option value="landscape">Vídeo Longo (16:9)</option>
            <option value="short">Shorts (9:16)</option>
          </select>
          <MonitorPlay className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size={14} />
        </div>

        {/* Results count */}
        <div className="ml-auto text-xs text-gray-500 font-medium">
          {filteredVideos.length} resultados encontrados
        </div>
      </div>
      
      {filteredVideos.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-gray-500">
           <Search size={48} className="mb-4 opacity-20" />
           <p className="text-lg font-medium">Nenhum vídeo corresponde aos seus filtros.</p>
           <button 
            onClick={() => {
              setSearchQuery('');
              setAuthorFilter('all');
              setDateFilter('all');
              setFormatFilter('all');
            }}
            className="mt-4 text-brand-500 hover:underline text-sm font-bold"
           >
             Limpar todos os filtros
           </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredVideos.map((video) => (
            <div key={video.id} className="group cursor-pointer">
              {/* Thumbnail / Video Preview */}
              <div className="relative aspect-video bg-dark-800 rounded-xl overflow-hidden mb-3">
                <video 
                  src={video.url}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  muted
                  onMouseOver={e => e.currentTarget.play().catch(() => {})}
                  onMouseOut={e => {
                    e.currentTarget.pause();
                    e.currentTarget.currentTime = 0;
                  }}
                />
                <div className="absolute bottom-2 right-2 bg-black/80 text-xs px-1.5 py-0.5 rounded text-white font-medium">
                  {video.format === VideoFormat.Short ? 'SHORTS' : '00:06'}
                </div>
                {video.format === VideoFormat.Short && (
                  <div className="absolute top-2 left-2 bg-brand-600 text-[10px] px-1.5 py-0.5 rounded text-white font-bold flex items-center gap-1 shadow-lg">
                    <Film size={10} />
                    SHORT
                  </div>
                )}
              </div>
              
              {/* Meta Data */}
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-500 to-indigo-500 flex-shrink-0 flex items-center justify-center text-sm font-bold shadow-inner">
                  {video.author[0]}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-white line-clamp-2 leading-tight mb-1 group-hover:text-brand-500 transition-colors">
                    {video.prompt}
                  </h3>
                  <div className="text-sm text-gray-400">
                    <p className="hover:text-white transition-colors">{video.author}</p>
                    <p className="text-xs mt-0.5">
                      {video.views} visualizações • {new Date(video.createdAt).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                </div>
                <button className="text-gray-400 hover:text-white h-fit p-1 rounded-full hover:bg-dark-800 transition-colors">
                  <MoreVertical size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

import React from 'react';
import { GraduationCap, Clock, Play, CheckCircle, Search, Filter } from './Icons';

interface Course {
  id: string;
  title: string;
  instructor: string;
  duration: string;
  modules: number;
  thumbnail: string;
  progress: number;
}

const MOCK_COURSES: Course[] = [
  {
    id: 'c1',
    title: 'Dominando Edição de Vídeo com IA',
    instructor: 'Alex Silva',
    duration: '12h',
    modules: 24,
    thumbnail: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=2070&auto=format&fit=crop',
    progress: 45
  },
  {
    id: 'c2',
    title: 'Marketing de Conteúdo para Shorts',
    instructor: 'Julia Costa',
    duration: '8h',
    modules: 15,
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop',
    progress: 0
  },
  {
    id: 'c3',
    title: 'Design de Miniaturas Atraentes',
    instructor: 'Marco Polo',
    duration: '5h',
    modules: 10,
    thumbnail: 'https://images.unsplash.com/photo-1542744094-3a31f272c490?q=80&w=2070&auto=format&fit=crop',
    progress: 100
  }
];

export const CoursesView: React.FC = () => {
  return (
    <div className="p-4 md:p-8 pt-20 md:pt-8 md:ml-64 bg-dark-900 min-h-screen">
      <div className="mb-8">
        <h2 className="text-3xl font-bold flex items-center gap-3 mb-2">
          <GraduationCap className="text-brand-500" size={32} />
          Portal de Cursos
        </h2>
        <p className="text-gray-400">Aprenda a criar conteúdos profissionais para o VeoTube.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
          <input 
            type="text" 
            placeholder="O que você quer aprender hoje?" 
            className="w-full bg-dark-800 border border-dark-700 rounded-xl py-3 pl-10 pr-4 outline-none focus:ring-2 focus:ring-brand-600 transition-all"
          />
        </div>
        <button className="bg-dark-800 px-6 py-3 rounded-xl border border-dark-700 flex items-center gap-2 hover:bg-dark-700 transition-colors">
          <Filter size={18} />
          Categorias
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {MOCK_COURSES.map(course => (
          <div key={course.id} className="bg-dark-800 rounded-3xl overflow-hidden border border-dark-700 hover:border-brand-500 transition-all group flex flex-col">
            <div className="relative aspect-video">
              <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                 <div className="p-4 bg-brand-600 rounded-full text-white shadow-xl">
                   <Play size={24} fill="currentColor" />
                 </div>
              </div>
              {course.progress > 0 && (
                <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gray-900">
                  <div className="h-full bg-brand-500" style={{ width: `${course.progress}%` }} />
                </div>
              )}
            </div>

            <div className="p-6 flex-1 flex flex-col">
              <h3 className="text-xl font-bold mb-2 group-hover:text-brand-400 transition-colors leading-tight">
                {course.title}
              </h3>
              <p className="text-gray-400 text-sm mb-4">Instruído por {course.instructor}</p>
              
              <div className="flex items-center gap-4 text-xs text-gray-500 mb-6 font-bold uppercase tracking-wider">
                <span className="flex items-center gap-1">
                  <Clock size={14} /> {course.duration}
                </span>
                <span className="flex items-center gap-1">
                  <GraduationCap size={14} /> {course.modules} Módulos
                </span>
              </div>

              <div className="mt-auto flex items-center justify-between">
                {course.progress === 100 ? (
                  <div className="flex items-center gap-2 text-green-500 font-bold text-sm">
                    <CheckCircle size={18} />
                    Concluído
                  </div>
                ) : (
                  <span className="text-sm font-bold text-gray-400">{course.progress}% concluído</span>
                )}
                <button className="bg-brand-600 hover:bg-brand-700 text-white px-6 py-2 rounded-xl font-bold transition-all text-sm">
                  {course.progress > 0 ? 'Continuar' : 'Começar'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

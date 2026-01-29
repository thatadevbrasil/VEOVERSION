export enum VideoFormat {
  Short = '9:16',
  Landscape = '16:9'
}

export enum GenerationStatus {
  Idle = 'idle',
  Generating = 'generating',
  Completed = 'completed',
  Failed = 'failed'
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  banner: string;
  subscribers: string;
}

export interface AffiliateLink {
  url: string;
  label: string;
}

export interface Video {
  id: string;
  url: string;
  prompt: string;
  description?: string;
  affiliateLink?: AffiliateLink;
  format: VideoFormat;
  status: GenerationStatus;
  createdAt: number;
  likes: number;
  views: string;
  author: string;
  authorId?: string;
  authorAvatar?: string;
}

export type Tab = 'home' | 'shorts' | 'videos' | 'live' | 'tv' | 'library' | 'channel' | 'my_videos';
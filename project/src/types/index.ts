// Type definitions for ReWear platform

export interface User {
  id: string;
  email: string;
  name: string;
  points: number;
  isAdmin: boolean;
  avatar?: string;
  joinedDate: string;
}

export interface Item {
  id: string;
  title: string;
  description: string;
  category: string;
  type: string;
  size: string;
  condition: 'new' | 'like-new' | 'good' | 'fair';
  tags: string[];
  images: string[];
  uploaderId: string;
  uploaderName: string;
  pointValue: number;
  isAvailable: boolean;
  status: 'pending' | 'approved' | 'rejected';
  uploadDate: string;
}

export interface SwapRequest {
  id: string;
  requesterId: string;
  requesterName: string;
  itemId: string;
  itemTitle: string;
  offeredItemId?: string;
  offeredItemTitle?: string;
  type: 'swap' | 'points';
  status: 'pending' | 'accepted' | 'rejected' | 'completed';
  requestDate: string;
  message?: string;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
}
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Item, SwapRequest } from '../types';
import { mockItems, mockSwapRequests } from '../data/mockData';

interface AppContextType {
  items: Item[];
  swapRequests: SwapRequest[];
  addItem: (item: Omit<Item, 'id' | 'uploadDate'>) => void;
  updateItem: (id: string, updates: Partial<Item>) => void;
  addSwapRequest: (request: Omit<SwapRequest, 'id' | 'requestDate'>) => void;
  updateSwapRequest: (id: string, updates: Partial<SwapRequest>) => void;
  getItemsByUser: (userId: string) => Item[];
  getSwapRequestsByUser: (userId: string) => SwapRequest[];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [items, setItems] = useState<Item[]>([]);
  const [swapRequests, setSwapRequests] = useState<SwapRequest[]>([]);

  useEffect(() => {
    const savedItems = localStorage.getItem('rewear_items');
    const savedRequests = localStorage.getItem('rewear_swap_requests');
    
    if (savedItems) {
      setItems(JSON.parse(savedItems));
    } else {
      setItems(mockItems);
      localStorage.setItem('rewear_items', JSON.stringify(mockItems));
    }
    
    if (savedRequests) {
      setSwapRequests(JSON.parse(savedRequests));
    } else {
      setSwapRequests(mockSwapRequests);
      localStorage.setItem('rewear_swap_requests', JSON.stringify(mockSwapRequests));
    }
  }, []);

  const addItem = (itemData: Omit<Item, 'id' | 'uploadDate'>) => {
    const newItem: Item = {
      ...itemData,
      id: Date.now().toString(),
      uploadDate: new Date().toISOString(),
    };
    
    const updatedItems = [...items, newItem];
    setItems(updatedItems);
    localStorage.setItem('rewear_items', JSON.stringify(updatedItems));
  };

  const updateItem = (id: string, updates: Partial<Item>) => {
    const updatedItems = items.map(item => 
      item.id === id ? { ...item, ...updates } : item
    );
    setItems(updatedItems);
    localStorage.setItem('rewear_items', JSON.stringify(updatedItems));
  };

  const addSwapRequest = (requestData: Omit<SwapRequest, 'id' | 'requestDate'>) => {
    const newRequest: SwapRequest = {
      ...requestData,
      id: Date.now().toString(),
      requestDate: new Date().toISOString(),
    };
    
    const updatedRequests = [...swapRequests, newRequest];
    setSwapRequests(updatedRequests);
    localStorage.setItem('rewear_swap_requests', JSON.stringify(updatedRequests));
  };

  const updateSwapRequest = (id: string, updates: Partial<SwapRequest>) => {
    const updatedRequests = swapRequests.map(request => 
      request.id === id ? { ...request, ...updates } : request
    );
    setSwapRequests(updatedRequests);
    localStorage.setItem('rewear_swap_requests', JSON.stringify(updatedRequests));
  };

  const getItemsByUser = (userId: string) => {
    return items.filter(item => item.uploaderId === userId);
  };

  const getSwapRequestsByUser = (userId: string) => {
    return swapRequests.filter(request => 
      request.requesterId === userId || 
      items.find(item => item.id === request.itemId)?.uploaderId === userId
    );
  };

  return (
    <AppContext.Provider value={{
      items,
      swapRequests,
      addItem,
      updateItem,
      addSwapRequest,
      updateSwapRequest,
      getItemsByUser,
      getSwapRequestsByUser
    }}>
      {children}
    </AppContext.Provider>
  );
};
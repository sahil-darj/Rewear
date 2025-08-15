import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ToastContextProps {
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
}

const ToastContext = createContext<ToastContextProps | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast must be used within ToastProvider');
  return context;
};

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [toast, setToast] = useState<{ message: string; type: string } | null>(null);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && (
        <div
          className={`fixed bottom-6 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-lg shadow-lg text-white z-50 transition-all duration-300
            ${toast.type === 'success' ? 'bg-emerald-600' : toast.type === 'error' ? 'bg-red-600' : 'bg-gray-800'}`}
          role="status"
          aria-live="polite"
        >
          {toast.message}
        </div>
      )}
    </ToastContext.Provider>
  );
};

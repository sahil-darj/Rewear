import React from 'react';
import { cn } from '../../utils/cn';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, className, hover = false }) => {
  return (
    <div
      className={cn(
        'bg-white rounded-xl shadow-md overflow-hidden focus:outline-none focus:ring-2 focus:ring-emerald-300',
        hover && 'transition-all duration-300 hover:shadow-xl hover:-translate-y-1',
        className
      )}
      tabIndex={0}
      role="region"
      aria-label="Card"
    >
      {children}
    </div>
  );
};
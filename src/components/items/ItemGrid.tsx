import React from 'react';
import { Item } from '../../types';
import { ItemCard } from './ItemCard';

interface ItemGridProps {
  items: Item[];
  emptyMessage?: string;
}

export const ItemGrid: React.FC<ItemGridProps> = ({ 
  items, 
  emptyMessage = "No items found" 
}) => {
  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {items.map((item) => (
        <ItemCard key={item.id} item={item} />
      ))}
    </div>
  );
};
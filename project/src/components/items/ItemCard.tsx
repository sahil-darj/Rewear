import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Star } from 'lucide-react';
import { Item } from '../../types';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';

interface ItemCardProps {
  item: Item;
}

export const ItemCard: React.FC<ItemCardProps> = ({ item }) => {
  const getConditionColor = (condition: string) => {
    switch (condition) {
      case 'new': return 'success';
      case 'like-new': return 'success';
      case 'good': return 'warning';
      case 'fair': return 'default';
      default: return 'default';
    }
  };

  return (
    <Link to={`/item/${item.id}`}>
      <Card hover className="group">
        <div className="aspect-square overflow-hidden">
          <img
            src={item.images[0]}
            alt={item.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        
        <div className="p-4">
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-semibold text-gray-900 line-clamp-2 group-hover:text-emerald-600 transition-colors">
              {item.title}
            </h3>
            <div className="flex items-center space-x-1 text-emerald-600 font-medium ml-2">
              <Star className="h-4 w-4 fill-current" />
              <span className="text-sm">{item.pointValue}</span>
            </div>
          </div>
          
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {item.description}
          </p>
          
          <div className="flex items-center justify-between mb-3">
            <Badge variant={getConditionColor(item.condition)}>
              {item.condition}
            </Badge>
            <span className="text-sm text-gray-500">Size {item.size}</span>
          </div>
          
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center space-x-1">
              <MapPin className="h-3 w-3" />
              <span>{item.uploaderName}</span>
            </div>
            <span>{item.category}</span>
          </div>
        </div>
      </Card>
    </Link>
  );
};
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, Calendar, MapPin, Heart, MessageSquare } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Card } from '../components/ui/Card';

export const ItemDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { items, addSwapRequest } = useApp();
  const { user } = useAuth();
  const [selectedImage, setSelectedImage] = useState(0);
  const [showSwapModal, setShowSwapModal] = useState(false);
  const [swapType, setSwapType] = useState<'swap' | 'points'>('points');
  const [message, setMessage] = useState('');

  const item = items.find(item => item.id === id);

  if (!item) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Item Not Found</h2>
          <p className="text-gray-600 mb-4">The item you're looking for doesn't exist.</p>
          <Button onClick={() => navigate('/browse')}>Back to Browse</Button>
        </div>
      </div>
    );
  }

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case 'new': return 'success';
      case 'like-new': return 'success';
      case 'good': return 'warning';
      case 'fair': return 'default';
      default: return 'default';
    }
  };

  const handleSwapRequest = () => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (swapType === 'points' && user.points < item.pointValue) {
      alert('Insufficient points for this item');
      return;
    }

    addSwapRequest({
      requesterId: user.id,
      requesterName: user.name,
      itemId: item.id,
      itemTitle: item.title,
      type: swapType,
      status: 'pending',
      message: message || undefined,
    });

    alert('Swap request sent successfully!');
    setShowSwapModal(false);
    setMessage('');
  };

  const isOwner = user?.id === item.uploaderId;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate('/browse')}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Browse
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image Gallery */}
          <div className="space-y-4">
            <Card className="overflow-hidden">
              <img
                src={item.images[selectedImage]}
                alt={item.title}
                className="w-full aspect-square object-cover"
              />
            </Card>
            
            {item.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {item.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === index ? 'border-emerald-500' : 'border-gray-200'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${item.title} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Item Details */}
          <div className="space-y-6">
            <div>
              <div className="flex items-start justify-between mb-4">
                <h1 className="text-3xl font-bold text-gray-900">{item.title}</h1>
                <div className="flex items-center space-x-2 text-emerald-600">
                  <Star className="h-6 w-6 fill-current" />
                  <span className="text-xl font-bold">{item.pointValue}</span>
                  <span className="text-sm">points</span>
                </div>
              </div>

              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                {item.description}
              </p>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="text-sm font-medium text-gray-500">Category</label>
                  <p className="text-gray-900">{item.category}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Type</label>
                  <p className="text-gray-900">{item.type}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Size</label>
                  <p className="text-gray-900">{item.size}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Condition</label>
                  <Badge variant={getConditionColor(item.condition)}>
                    {item.condition}
                  </Badge>
                </div>
              </div>

              {/* Tags */}
              {item.tags.length > 0 && (
                <div className="mb-6">
                  <label className="text-sm font-medium text-gray-500 block mb-2">Tags</label>
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag, index) => (
                      <Badge key={index} variant="default">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Owner Info */}
            <Card className="p-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                  <span className="text-emerald-600 font-semibold">
                    {item.uploaderName.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">{item.uploaderName}</p>
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="h-4 w-4 mr-1" />
                    Listed {new Date(item.uploadDate).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </Card>

            {/* Action Buttons */}
            {!isOwner && item.isAvailable && user && (
              <div className="space-y-3">
                <Button
                  onClick={() => {
                    setSwapType('points');
                    setShowSwapModal(true);
                  }}
                  className="w-full"
                  disabled={user.points < item.pointValue}
                >
                  <Star className="h-5 w-5 mr-2" />
                  Redeem with Points ({item.pointValue} pts)
                </Button>
                
                <Button
                  variant="outline"
                  onClick={() => {
                    setSwapType('swap');
                    setShowSwapModal(true);
                  }}
                  className="w-full"
                >
                  <Heart className="h-5 w-5 mr-2" />
                  Request Swap
                </Button>

                {user.points < item.pointValue && (
                  <p className="text-sm text-gray-500 text-center">
                    You need {item.pointValue - user.points} more points to redeem this item
                  </p>
                )}
              </div>
            )}

            {!user && (
              <div className="text-center">
                <Button onClick={() => navigate('/login')} className="w-full">
                  Login to Request Swap
                </Button>
              </div>
            )}

            {isOwner && (
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-blue-800 text-center">This is your item</p>
              </div>
            )}

            {!item.isAvailable && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-600 text-center">This item is no longer available</p>
              </div>
            )}
          </div>
        </div>

        {/* Swap Request Modal */}
        {showSwapModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <Card className="max-w-md w-full p-6">
              <h3 className="text-xl font-bold mb-4">
                {swapType === 'points' ? 'Redeem with Points' : 'Request Swap'}
              </h3>
              
              <div className="mb-4">
                <p className="text-gray-600 mb-2">
                  {swapType === 'points' 
                    ? `You're about to redeem "${item.title}" for ${item.pointValue} points.`
                    : `You're about to request a swap for "${item.title}".`
                  }
                </p>
                
                {swapType === 'points' && (
                  <p className="text-sm text-gray-500">
                    Your balance: {user?.points} points
                  </p>
                )}
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message (optional)
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Add a message to the item owner..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  rows={3}
                />
              </div>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setShowSwapModal(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button onClick={handleSwapRequest} className="flex-1">
                  Send Request
                </Button>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};
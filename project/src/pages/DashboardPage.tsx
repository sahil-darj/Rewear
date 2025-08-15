import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Package, ArrowUpDown, Star, Clock, CheckCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useApp } from '../contexts/AppContext';
import { useToast } from '../components/ui/Toast';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { ItemGrid } from '../components/items/ItemGrid';

export const DashboardPage: React.FC = () => {
  const { user, updateUser } = useAuth();
  const { getItemsByUser, getSwapRequestsByUser, updateSwapRequest, updateItem, items } = useApp();
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState<'overview' | 'items' | 'swaps'>('overview');

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h2>
          <p className="text-gray-600 mb-4">Please log in to view your dashboard.</p>
          <Link to="/login">
            <Button>Login</Button>
          </Link>
        </div>
      </div>
    );
  }

  const userItems = getItemsByUser(user.id);
  const userSwaps = getSwapRequestsByUser(user.id);
  const pendingSwaps = userSwaps.filter(swap => swap.status === 'pending');
  const completedSwaps = userSwaps.filter(swap => swap.status === 'completed');

  const stats = [
    {
      label: 'Points Balance',
      value: user.points,
      icon: Star,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-100',
    },
    {
      label: 'Items Listed',
      value: userItems.length,
      icon: Package,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      label: 'Active Swaps',
      value: pendingSwaps.length,
      icon: Clock,
      color: 'text-amber-600',
      bgColor: 'bg-amber-100',
    },
    {
      label: 'Completed Swaps',
      value: completedSwaps.length,
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending': return <Badge variant="warning">Pending</Badge>;
      case 'accepted': return <Badge variant="success">Accepted</Badge>;
      case 'rejected': return <Badge variant="error">Rejected</Badge>;
      case 'completed': return <Badge variant="success">Completed</Badge>;
      default: return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome back, {user.name}!
            </h1>
            <p className="text-gray-600">Manage your items and track your sustainability impact</p>
          </div>
          <Link to="/add-item">
            <Button className="mt-4 md:mt-0">
              <Plus className="h-5 w-5 mr-2" />
              List New Item
            </Button>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="p-6">
              <div className="flex items-center">
                <div className={`${stat.bgColor} p-3 rounded-lg mr-4`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-gray-600 text-sm">{stat.label}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {[
                { id: 'overview', label: 'Overview', icon: Package },
                { id: 'items', label: 'My Items', icon: Package },
                { id: 'swaps', label: 'Swap Requests', icon: ArrowUpDown },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                    activeTab === tab.id
                      ? 'border-emerald-500 text-emerald-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <tab.icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Recent Activity */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
              {userSwaps.length > 0 ? (
                <div className="space-y-3">
                  {userSwaps.slice(0, 5).map((swap) => (
                    <div key={swap.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                      <div>
                        <p className="font-medium text-gray-900">{swap.itemTitle}</p>
                        <p className="text-sm text-gray-600">
                          {swap.type === 'points' ? 'Point redemption' : 'Swap request'} • {new Date(swap.requestDate).toLocaleDateString()}
                        </p>
                      </div>
                      {getStatusBadge(swap.status)}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No recent activity</p>
              )}
            </Card>

            {/* Recent Items */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Your Recent Items</h3>
                <Link to="#" onClick={() => setActiveTab('items')}>
                  <Button variant="ghost">View All</Button>
                </Link>
              </div>
              <ItemGrid 
                items={userItems.slice(0, 4)} 
                emptyMessage="You haven't listed any items yet. Start by adding your first item!"
              />
            </div>
          </div>
        )}

        {activeTab === 'items' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Your Items</h3>
              <Link to="/add-item">
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Item
                </Button>
              </Link>
            </div>
            <ItemGrid 
              items={userItems} 
              emptyMessage="You haven't listed any items yet. Click 'Add Item' to get started!"
            />
          </div>
        )}

        {activeTab === 'swaps' && (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Swap Requests</h3>
            {userSwaps.length > 0 ? (
              <div className="grid gap-4">
                {userSwaps.map((swap) => {
  const isOwner = user.id === (getItemsByUser(user.id).find(item => item.id === swap.itemId)?.uploaderId);
  return (
    <Card key={swap.id} className="p-6">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h4 className="font-semibold text-gray-900 mb-2">{swap.itemTitle}</h4>
          <div className="space-y-1 text-sm text-gray-600">
            <p>
              <span className="font-medium">Type:</span> {swap.type === 'points' ? 'Point Redemption' : 'Item Swap'}
            </p>
            <p>
              <span className="font-medium">Requester:</span> {swap.requesterName}
            </p>
            <p>
              <span className="font-medium">Date:</span> {new Date(swap.requestDate).toLocaleDateString()}
            </p>
            {swap.message && (
              <p>
                <span className="font-medium">Message:</span> {swap.message}
              </p>
            )}
          </div>
        </div>
        <div className="ml-4 flex flex-col items-end gap-2">
          {getStatusBadge(swap.status)}
          {swap.status === 'pending' && isOwner && (
            <div className="mt-2 w-full flex justify-end">
              <Button
                size="sm"
                variant="outline"
                aria-label="Accept Swap Request"
                onClick={() => {
  // Find the item for this swap
  const item = items.find(i => i.id === swap.itemId);
  if (swap.type === 'points' && item) {
    // Deduct points from requester
    const users = JSON.parse(localStorage.getItem('rewear_users') || '[]');
    const requesterIndex = users.findIndex((u: any) => u.id === swap.requesterId);
    if (requesterIndex !== -1) {
      users[requesterIndex].points = Math.max(0, (users[requesterIndex].points || 0) - (item.pointValue || 0));
    }
    // Add points to owner (current user)
    updateUser({ points: (user.points || 0) + (item.pointValue || 0) });
    localStorage.setItem('rewear_users', JSON.stringify(users));
    // If requester is current user, update their points in context too
    if (swap.requesterId === user.id) {
      updateUser({ points: Math.max(0, (user.points || 0) - (item.pointValue || 0)) });
    }
    showToast(`Swap accepted! Points updated.`, 'success');
  } else {
    showToast('Swap accepted and marked as completed!', 'success');
  }
  updateSwapRequest(swap.id, { status: 'completed' });
  // Mark item as unavailable
  if (item) {
    updateItem(item.id, { isAvailable: false });
  }
}}
              >
                Accept
              </Button>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
})}
              </div>
            ) : (
              <Card className="p-12 text-center">
                <ArrowUpDown className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No swap requests yet</p>
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
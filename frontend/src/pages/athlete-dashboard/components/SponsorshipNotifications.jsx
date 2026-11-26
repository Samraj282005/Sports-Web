import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const SponsorshipNotifications = ({ notifications = [] }) => {
  const [activeTab, setActiveTab] = useState('pending');

  const mockNotifications = [
    {
      id: 1,
      type: 'sponsorship_offer',
      sponsor: {
        name: "TechCorp Sports Division",
        avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&crop=face",
        verified: true
      },
      amount: 2500,
      message: "We\'re impressed by your dedication and would like to sponsor your Olympic training journey.",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      status: 'pending'
    },
    {
      id: 2,
      type: 'donation',
      sponsor: {
        name: "Sarah Mitchell",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
        verified: false
      },
      amount: 150,
      message: "Keep pushing forward! Your story is inspiring.",
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
      status: 'completed'
    },
    {
      id: 3,
      type: 'sponsorship_offer',
      sponsor: {
        name: "Elite Athletics Gear",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
        verified: true
      },
      amount: 1200,
      message: "We\'d love to provide equipment sponsorship for your upcoming competitions.",
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
      status: 'pending'
    }
  ];

  const currentNotifications = notifications.length > 0 ? notifications : mockNotifications;

  const filteredNotifications = currentNotifications.filter(notification => {
    if (activeTab === 'pending') return notification.status === 'pending';
    if (activeTab === 'completed') return notification.status === 'completed';
    return true;
  });

  const handleAccept = (notificationId) => {
    console.log('Accepting sponsorship:', notificationId);
    // Mock acceptance logic
  };

  const handleDecline = (notificationId) => {
    console.log('Declining sponsorship:', notificationId);
    // Mock decline logic
  };

  const getTimeAgo = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    return 'Just now';
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'sponsorship_offer':
        return 'Award';
      case 'donation':
        return 'Heart';
      default:
        return 'Bell';
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case 'sponsorship_offer':
        return 'text-primary';
      case 'donation':
        return 'text-success';
      default:
        return 'text-muted-foreground';
    }
  };

  const tabs = [
    { id: 'pending', label: 'Pending', count: currentNotifications.filter(n => n.status === 'pending').length },
    { id: 'completed', label: 'Completed', count: currentNotifications.filter(n => n.status === 'completed').length },
    { id: 'all', label: 'All', count: currentNotifications.length }
  ];

  return (
    <div className="bg-card rounded-lg border border-border shadow-elevation-1 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
            <Icon name="Bell" size={20} className="text-primary" />
          </div>
          <div>
            <h3 className="font-heading font-semibold text-foreground">Sponsorship Activity</h3>
            <p className="text-sm text-muted-foreground">Manage sponsor interest and donations</p>
          </div>
        </div>
        <div className="flex items-center space-x-1">
          {currentNotifications.filter(n => n.status === 'pending').length > 0 && (
            <div className="w-2 h-2 bg-error rounded-full animate-pulse" />
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center space-x-1 mb-6 bg-muted rounded-lg p-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 flex items-center justify-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
              activeTab === tab.id
                ? 'bg-card text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <span>{tab.label}</span>
            {tab.count > 0 && (
              <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                activeTab === tab.id ? 'bg-primary/10 text-primary' : 'bg-muted-foreground/10 text-muted-foreground'
              }`}>
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="space-y-4">
        {filteredNotifications.length === 0 ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-muted/50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="Bell" size={24} className="text-muted-foreground" />
            </div>
            <h4 className="font-medium text-foreground mb-2">No {activeTab} notifications</h4>
            <p className="text-sm text-muted-foreground">
              {activeTab === 'pending' ?'New sponsorship offers will appear here' :'Your notification history will appear here'
              }
            </p>
          </div>
        ) : (
          filteredNotifications.map((notification) => (
            <div key={notification.id} className="border border-border rounded-lg p-4 hover:bg-accent/50 transition-colors duration-200">
              <div className="flex items-start space-x-4">
                <div className="relative">
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-border">
                    <Image
                      src={notification.sponsor.avatar}
                      alt={notification.sponsor.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center ${
                    notification.type === 'sponsorship_offer' ? 'bg-primary' : 'bg-success'
                  }`}>
                    <Icon 
                      name={getNotificationIcon(notification.type)} 
                      size={12} 
                      color="white" 
                    />
                  </div>
                  {notification.sponsor.verified && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                      <Icon name="CheckCircle" size={10} color="white" />
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <h4 className="font-medium text-foreground">{notification.sponsor.name}</h4>
                      {notification.sponsor.verified && (
                        <Icon name="BadgeCheck" size={16} className="text-primary" />
                      )}
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <span className="font-medium text-success">
                        ${notification.amount.toLocaleString()}
                      </span>
                      <span>•</span>
                      <span>{getTimeAgo(notification.timestamp)}</span>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                    {notification.message}
                  </p>

                  {notification.status === 'pending' && notification.type === 'sponsorship_offer' && (
                    <div className="flex items-center space-x-3">
                      <Button
                        variant="default"
                        size="sm"
                        onClick={() => handleAccept(notification.id)}
                        iconName="Check"
                        iconPosition="left"
                      >
                        Accept
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDecline(notification.id)}
                        iconName="X"
                        iconPosition="left"
                      >
                        Decline
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        iconName="MessageCircle"
                        iconPosition="left"
                      >
                        Message
                      </Button>
                    </div>
                  )}

                  {notification.status === 'completed' && (
                    <div className="flex items-center space-x-2 text-sm">
                      <Icon name="CheckCircle" size={16} className="text-success" />
                      <span className="text-success font-medium">
                        {notification.type === 'sponsorship_offer' ? 'Sponsorship Accepted' : 'Donation Received'}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SponsorshipNotifications;
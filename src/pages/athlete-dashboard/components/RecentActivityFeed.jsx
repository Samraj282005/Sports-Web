import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const RecentActivityFeed = ({ activities = [] }) => {
  const mockActivities = [
    {
      id: 1,
      type: 'profile_view',
      actor: {
        name: "Elite Sports Management",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
      },
      action: "viewed your profile",
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      metadata: { views: 1 }
    },
    {
      id: 2,
      type: 'donation',
      actor: {
        name: "Michael Chen",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
      },
      action: "donated to your ACL Recovery Fund",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      metadata: { amount: 250 }
    },
    {
      id: 3,
      type: 'sponsor_interest',
      actor: {
        name: "Nike Sports Division",
        avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&crop=face"
      },
      action: "showed interest in sponsoring you",
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      metadata: { potential_amount: 5000 }
    },
    {
      id: 4,
      type: 'profile_view',
      actor: {
        name: "Sports Analytics Pro",
        avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&h=100&fit=crop&crop=face"
      },
      action: "viewed your profile",
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
      metadata: { views: 3 }
    },
    {
      id: 5,
      type: 'fund_contribution',
      actor: {
        name: "Sarah Williams",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face"
      },
      action: "contributed to your Olympic Training Fund",
      timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000),
      metadata: { amount: 100 }
    },
    {
      id: 6,
      type: 'profile_update',
      actor: {
        name: "You",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face"
      },
      action: "updated your profile achievements",
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
      metadata: {}
    }
  ];

  const currentActivities = activities.length > 0 ? activities : mockActivities;

  const getActivityIcon = (type) => {
    switch (type) {
      case 'profile_view':
        return 'Eye';
      case 'donation': case'fund_contribution':
        return 'Heart';
      case 'sponsor_interest':
        return 'Award';
      case 'profile_update':
        return 'Edit';
      default:
        return 'Activity';
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case 'profile_view':
        return 'text-primary bg-primary/10';
      case 'donation': case'fund_contribution':
        return 'text-success bg-success/10';
      case 'sponsor_interest':
        return 'text-warning bg-warning/10';
      case 'profile_update':
        return 'text-secondary bg-secondary/10';
      default:
        return 'text-muted-foreground bg-muted/10';
    }
  };

  const getTimeAgo = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return 'Just now';
  };

  const formatMetadata = (type, metadata) => {
    switch (type) {
      case 'donation':
      case 'fund_contribution':
        return metadata.amount ? `$${metadata.amount.toLocaleString()}` : '';
      case 'sponsor_interest':
        return metadata.potential_amount ? `Potential: $${metadata.potential_amount.toLocaleString()}` : '';
      case 'profile_view':
        return metadata.views > 1 ? `${metadata.views} views` : '';
      default:
        return '';
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-elevation-1 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center">
            <Icon name="Activity" size={20} className="text-secondary" />
          </div>
          <div>
            <h3 className="font-heading font-semibold text-foreground">Recent Activity</h3>
            <p className="text-sm text-muted-foreground">Latest interactions and updates</p>
          </div>
        </div>
        <button className="text-sm text-primary hover:text-primary/80 transition-colors duration-200">
          View All
        </button>
      </div>

      <div className="space-y-4">
        {currentActivities.slice(0, 6).map((activity, index) => (
          <div key={activity.id} className="flex items-start space-x-3 group">
            <div className="relative">
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-border">
                <Image
                  src={activity.actor.avatar}
                  alt={activity.actor.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center ${getActivityColor(activity.type)}`}>
                <Icon name={getActivityIcon(activity.type)} size={10} />
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <p className="text-sm text-foreground">
                  <span className="font-medium">{activity.actor.name}</span>
                  <span className="text-muted-foreground ml-1">{activity.action}</span>
                </p>
                <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                  {formatMetadata(activity.type, activity.metadata) && (
                    <>
                      <span className="font-medium text-success">
                        {formatMetadata(activity.type, activity.metadata)}
                      </span>
                      <span>•</span>
                    </>
                  )}
                  <span>{getTimeAgo(activity.timestamp)}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {currentActivities.length === 0 && (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-muted/50 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Activity" size={24} className="text-muted-foreground" />
          </div>
          <h4 className="font-medium text-foreground mb-2">No Recent Activity</h4>
          <p className="text-sm text-muted-foreground">
            Your profile interactions and updates will appear here
          </p>
        </div>
      )}

      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Activity updates in real-time</span>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
            <span>Live</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentActivityFeed;
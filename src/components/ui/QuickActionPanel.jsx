import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const QuickActionPanel = ({ user, className = '', onActionClick }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();

  const getQuickActions = () => {
    if (!user) {
      return [
        {
          id: 'browse-athletes',
          label: 'Browse Athletes',
          description: 'Discover athletes to support',
          icon: 'Search',
          path: '/athlete-profile-view',
          variant: 'default',
          featured: true
        },
        {
          id: 'join-platform',
          label: 'Join Platform',
          description: 'Create your account',
          icon: 'UserPlus',
          action: 'register',
          variant: 'outline',
          featured: false
        }
      ];
    }

    switch (user.role) {
      case 'athlete':
        return [
          {
            id: 'create-fund-request',
            label: 'Create Fund Request',
            description: 'Request funding for training or injury recovery',
            icon: 'Heart',
            path: '/injury-fund-request-form',
            variant: 'default',
            featured: true,
            urgent: false
          },
          {
            id: 'update-profile',
            label: 'Update Profile',
            description: 'Keep your athlete profile current',
            icon: 'User',
            path: '/athlete-profile-view',
            variant: 'outline',
            featured: false,
            urgent: false
          },
          {
            id: 'view-sponsorships',
            label: 'View Sponsorships',
            description: 'Check your current sponsorship status',
            icon: 'Award',
            path: '/sponsorships',
            variant: 'ghost',
            featured: false,
            urgent: false
          },
          {
            id: 'share-progress',
            label: 'Share Progress',
            description: 'Update supporters on your journey',
            icon: 'Share2',
            action: 'share-progress',
            variant: 'ghost',
            featured: false,
            urgent: false
          }
        ];

      case 'sponsor':
        return [
          {
            id: 'make-donation',
            label: 'Make Donation',
            description: 'Support an athlete or cause',
            icon: 'Heart',
            path: '/athlete-profile-view',
            variant: 'default',
            featured: true,
            urgent: false
          },
          {
            id: 'view-impact',
            label: 'View Impact',
            description: 'See how your support is making a difference',
            icon: 'TrendingUp',
            path: '/impact-reports',
            variant: 'outline',
            featured: false,
            urgent: false
          },
          {
            id: 'my-sponsorships',
            label: 'My Sponsorships',
            description: 'Manage your current sponsorships',
            icon: 'Users',
            path: '/my-sponsorships',
            variant: 'ghost',
            featured: false,
            urgent: false
          },
          {
            id: 'donation-history',
            label: 'Donation History',
            description: 'Review your contribution history',
            icon: 'History',
            path: '/donation-history',
            variant: 'ghost',
            featured: false,
            urgent: false
          }
        ];

      case 'admin':
        return [
          {
            id: 'approve-requests',
            label: 'Approve Requests',
            description: 'Review pending fund requests',
            icon: 'CheckCircle',
            path: '/fund-oversight',
            variant: 'default',
            featured: true,
            urgent: true,
            badge: 7
          },
          {
            id: 'user-verification',
            label: 'User Verification',
            description: 'Verify new athlete and sponsor accounts',
            icon: 'Shield',
            path: '/user-management',
            variant: 'warning',
            featured: true,
            urgent: true,
            badge: 3
          },
          {
            id: 'financial-reports',
            label: 'Financial Reports',
            description: 'Review platform financial metrics',
            icon: 'BarChart3',
            path: '/reports',
            variant: 'outline',
            featured: false,
            urgent: false
          },
          {
            id: 'system-health',
            label: 'System Health',
            description: 'Monitor platform performance',
            icon: 'Activity',
            action: 'system-health',
            variant: 'ghost',
            featured: false,
            urgent: false
          }
        ];

      default:
        return [];
    }
  };

  const quickActions = getQuickActions();
  const featuredActions = quickActions.filter(action => action.featured);
  const secondaryActions = quickActions.filter(action => !action.featured);

  const handleActionClick = (action) => {
    if (action.path) {
      navigate(action.path);
    } else if (action.action) {
      onActionClick?.(action.action, action);
    }
  };

  const getRoleTitle = () => {
    if (!user) return 'Quick Actions';
    
    switch (user.role) {
      case 'athlete':
        return 'Athlete Actions';
      case 'sponsor':
        return 'Sponsor Actions';
      case 'admin':
        return 'Admin Actions';
      default:
        return 'Quick Actions';
    }
  };

  const getRoleIcon = () => {
    if (!user) return 'Zap';
    
    switch (user.role) {
      case 'athlete':
        return 'Trophy';
      case 'sponsor':
        return 'Heart';
      case 'admin':
        return 'Settings';
      default:
        return 'Zap';
    }
  };

  return (
    <div className={`bg-card rounded-lg border border-border shadow-elevation-1 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-2">
          <Icon name={getRoleIcon()} size={20} className="text-primary" />
          <h3 className="font-heading font-semibold text-foreground">{getRoleTitle()}</h3>
        </div>
        
        {secondaryActions.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
            iconPosition="right"
          >
            {isExpanded ? 'Less' : 'More'}
          </Button>
        )}
      </div>

      {/* Featured Actions */}
      <div className="p-4 space-y-3">
        {featuredActions.map((action) => (
          <div key={action.id} className="relative">
            <Button
              variant={action.variant}
              size="lg"
              fullWidth
              onClick={() => handleActionClick(action)}
              iconName={action.icon}
              iconPosition="left"
              className={`justify-start text-left ${action.urgent ? 'ring-2 ring-warning/50' : ''}`}
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{action.label}</span>
                  {action.badge && action.badge > 0 && (
                    <span className="ml-2 inline-flex items-center justify-center w-5 h-5 text-xs font-data bg-error text-error-foreground rounded-full">
                      {action.badge > 9 ? '9+' : action.badge}
                    </span>
                  )}
                </div>
                <div className="text-sm text-muted-foreground mt-0.5 truncate">
                  {action.description}
                </div>
              </div>
            </Button>
            
            {action.urgent && (
              <div className="absolute -top-1 -right-1">
                <div className="w-3 h-3 bg-warning rounded-full animate-pulse" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Secondary Actions (Expandable) */}
      {isExpanded && secondaryActions.length > 0 && (
        <div className="px-4 pb-4 space-y-2 border-t border-border animate-fade-in">
          <div className="pt-3">
            <h4 className="text-sm font-medium text-muted-foreground mb-3">Additional Actions</h4>
            {secondaryActions.map((action) => (
              <Button
                key={action.id}
                variant={action.variant}
                size="sm"
                fullWidth
                onClick={() => handleActionClick(action)}
                iconName={action.icon}
                iconPosition="left"
                className="justify-start text-left mb-2"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span>{action.label}</span>
                    {action.badge && action.badge > 0 && (
                      <span className="ml-2 inline-flex items-center justify-center w-4 h-4 text-xs font-data bg-primary/10 text-primary rounded-full">
                        {action.badge > 9 ? '9+' : action.badge}
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-muted-foreground mt-0.5 truncate">
                    {action.description}
                  </div>
                </div>
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Role-specific Footer */}
      {user && (
        <div className="px-4 py-3 bg-muted/30 rounded-b-lg border-t border-border">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${
                user.role === 'athlete' ? 'bg-primary' :
                user.role === 'sponsor' ? 'bg-secondary' :
                user.role === 'admin' ? 'bg-warning' : 'bg-muted'
              }`} />
              <span>Logged in as {user.role}</span>
            </div>
            <span>Last updated: {new Date().toLocaleDateString()}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuickActionPanel;
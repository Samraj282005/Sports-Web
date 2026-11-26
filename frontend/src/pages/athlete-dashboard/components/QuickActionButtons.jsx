import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActionButtons = ({ className = '' }) => {
  const navigate = useNavigate();

  const quickActions = [
    {
      id: 'edit-profile',
      label: 'Edit Profile',
      description: 'Update your athlete information',
      icon: 'Edit',
      variant: 'outline',
      action: () => navigate('/athlete-profile-view')
    },
    {
      id: 'create-fund',
      label: 'Create Fund Request',
      description: 'Request funding for training or recovery',
      icon: 'Heart',
      variant: 'default',
      action: () => navigate('/injury-fund-request-form')
    },
    {
      id: 'share-profile',
      label: 'Share Profile',
      description: 'Share your profile with potential sponsors',
      icon: 'Share2',
      variant: 'ghost',
      action: () => {
        if (navigator.share) {
          navigator.share({
            title: 'Check out my athlete profile',
            text: 'Support my athletic journey on AthleteFund',
            url: window.location.origin + '/athlete-profile-view'
          });
        } else {
          navigator.clipboard.writeText(window.location.origin + '/athlete-profile-view');
          // You could add a toast notification here
          console.log('Profile link copied to clipboard');
        }
      }
    },
    {
      id: 'message-sponsors',
      label: 'Message Sponsors',
      description: 'Communicate with your supporters',
      icon: 'MessageCircle',
      variant: 'ghost',
      action: () => {
        // Mock messaging functionality
        console.log('Opening sponsor messaging');
      }
    }
  ];

  return (
    <div className={`bg-card rounded-lg border border-border shadow-elevation-1 p-6 ${className}`}>
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-warning/10 rounded-full flex items-center justify-center">
          <Icon name="Zap" size={20} className="text-warning" />
        </div>
        <div>
          <h3 className="font-heading font-semibold text-foreground">Quick Actions</h3>
          <p className="text-sm text-muted-foreground">Manage your athlete journey</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {quickActions.map((action) => (
          <Button
            key={action.id}
            variant={action.variant}
            size="lg"
            fullWidth
            onClick={action.action}
            iconName={action.icon}
            iconPosition="left"
            className="justify-start text-left h-auto py-4"
          >
            <div className="flex-1 min-w-0">
              <div className="font-medium">{action.label}</div>
              <div className="text-sm text-muted-foreground mt-0.5 truncate">
                {action.description}
              </div>
            </div>
          </Button>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Need help getting started?
          </div>
          <Button variant="ghost" size="sm" iconName="HelpCircle" iconPosition="left">
            Guide
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuickActionButtons;
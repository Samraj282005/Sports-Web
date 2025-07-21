import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActionsPanel = ({ onActionClick }) => {
  const quickActions = [
    {
      id: 'approve-athletes',
      title: 'Approve Athletes',
      description: 'Review and approve pending athlete applications',
      icon: 'UserCheck',
      color: 'text-success',
      bgColor: 'bg-success/10',
      urgent: true,
      count: 3
    },
    {
      id: 'review-funds',
      title: 'Review Fund Requests',
      description: 'Monitor active fundraising campaigns',
      icon: 'Eye',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      urgent: true,
      count: 7
    },
    {
      id: 'financial-reports',
      title: 'Generate Reports',
      description: 'Create financial and performance reports',
      icon: 'BarChart3',
      color: 'text-warning',
      bgColor: 'bg-warning/10',
      urgent: false,
      count: null
    },
    {
      id: 'user-management',
      title: 'Manage Users',
      description: 'Handle user accounts and permissions',
      icon: 'Users',
      color: 'text-secondary',
      bgColor: 'bg-secondary/10',
      urgent: false,
      count: null
    },
    {
      id: 'system-settings',
      title: 'System Settings',
      description: 'Configure platform settings and policies',
      icon: 'Settings',
      color: 'text-muted-foreground',
      bgColor: 'bg-muted/20',
      urgent: false,
      count: null
    },
    {
      id: 'communication',
      title: 'Send Notifications',
      description: 'Communicate with users and stakeholders',
      icon: 'MessageSquare',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      urgent: false,
      count: null
    }
  ];

  const urgentActions = quickActions.filter(action => action.urgent);
  const regularActions = quickActions.filter(action => !action.urgent);

  return (
    <div className="space-y-6">
      {/* Urgent Actions */}
      {urgentActions.length > 0 && (
        <div>
          <div className="flex items-center space-x-2 mb-4">
            <Icon name="AlertTriangle" size={20} className="text-error" />
            <h3 className="text-lg font-semibold text-foreground">Urgent Actions Required</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {urgentActions.map((action) => (
              <div
                key={action.id}
                className="relative bg-card rounded-lg border border-error/20 p-4 hover:shadow-elevation-2 transition-all duration-200 cursor-pointer"
                onClick={() => onActionClick?.(action.id)}
              >
                <div className="absolute -top-1 -right-1">
                  <div className="w-3 h-3 bg-error rounded-full animate-pulse" />
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className={`w-12 h-12 rounded-lg ${action.bgColor} flex items-center justify-center flex-shrink-0`}>
                    <Icon name={action.icon} size={24} className={action.color} />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-medium text-foreground">{action.title}</h4>
                      {action.count && (
                        <span className="inline-flex items-center justify-center w-6 h-6 text-xs font-data bg-error text-error-foreground rounded-full">
                          {action.count > 9 ? '9+' : action.count}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{action.description}</p>
                  </div>
                </div>
                
                <div className="mt-3 pt-3 border-t border-border">
                  <Button variant="outline" size="sm" fullWidth>
                    Take Action
                    <Icon name="ArrowRight" size={14} className="ml-2" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Regular Actions */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {regularActions.map((action) => (
            <div
              key={action.id}
              className="bg-card rounded-lg border border-border p-4 hover:shadow-elevation-1 transition-all duration-200 cursor-pointer"
              onClick={() => onActionClick?.(action.id)}
            >
              <div className="flex items-start space-x-3">
                <div className={`w-10 h-10 rounded-lg ${action.bgColor} flex items-center justify-center flex-shrink-0`}>
                  <Icon name={action.icon} size={20} className={action.color} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-foreground mb-1">{action.title}</h4>
                  <p className="text-sm text-muted-foreground">{action.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* System Status */}
      <div className="bg-card rounded-lg border border-border p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-foreground">System Status</h3>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-success rounded-full" />
            <span className="text-sm text-success">All Systems Operational</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-3 bg-muted/20 rounded-lg">
            <Icon name="Server" size={24} className="text-success mx-auto mb-2" />
            <div className="text-sm font-medium text-foreground">Server Health</div>
            <div className="text-xs text-success">Excellent</div>
          </div>
          
          <div className="text-center p-3 bg-muted/20 rounded-lg">
            <Icon name="Database" size={24} className="text-success mx-auto mb-2" />
            <div className="text-sm font-medium text-foreground">Database</div>
            <div className="text-xs text-success">Online</div>
          </div>
          
          <div className="text-center p-3 bg-muted/20 rounded-lg">
            <Icon name="Wifi" size={24} className="text-success mx-auto mb-2" />
            <div className="text-sm font-medium text-foreground">API Status</div>
            <div className="text-xs text-success">Responsive</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickActionsPanel;
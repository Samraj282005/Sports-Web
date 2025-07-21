import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AdminHeader = ({ user, onNotificationClick, onProfileClick }) => {
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const urgentNotifications = 7;
  const pendingApprovals = 3;

  return (
    <div className="bg-card border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Welcome Section */}
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-warning/10 rounded-full flex items-center justify-center">
              <Icon name="Shield" size={20} className="text-warning" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-foreground">
                Welcome back, {user?.name || 'Admin'}
              </h1>
              <p className="text-sm text-muted-foreground">{currentDate}</p>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="hidden md:flex items-center space-x-6">
            <div className="text-center">
              <div className="text-lg font-bold text-error">{urgentNotifications}</div>
              <div className="text-xs text-muted-foreground">Urgent</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-warning">{pendingApprovals}</div>
              <div className="text-xs text-muted-foreground">Pending</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-success">87.3%</div>
              <div className="text-xs text-muted-foreground">Success Rate</div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={onNotificationClick}
              className="relative"
            >
              <Icon name="Bell" size={20} />
              {urgentNotifications > 0 && (
                <span className="absolute -top-1 -right-1 bg-error text-error-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center font-data">
                  {urgentNotifications > 9 ? '9+' : urgentNotifications}
                </span>
              )}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={onProfileClick}
            >
              <Icon name="User" size={20} />
            </Button>

            <Button variant="outline" size="sm">
              <Icon name="Settings" size={16} />
              <span className="hidden sm:inline ml-2">Settings</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Quick Stats */}
      <div className="md:hidden px-4 pb-4">
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-3 bg-error/10 rounded-lg">
            <div className="text-lg font-bold text-error">{urgentNotifications}</div>
            <div className="text-xs text-muted-foreground">Urgent Items</div>
          </div>
          <div className="text-center p-3 bg-warning/10 rounded-lg">
            <div className="text-lg font-bold text-warning">{pendingApprovals}</div>
            <div className="text-xs text-muted-foreground">Pending</div>
          </div>
          <div className="text-center p-3 bg-success/10 rounded-lg">
            <div className="text-lg font-bold text-success">87.3%</div>
            <div className="text-xs text-muted-foreground">Success</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHeader;
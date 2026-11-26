import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import AdminHeader from './components/AdminHeader';
import QuickActionsPanel from './components/QuickActionsPanel';
import PendingApprovalsTab from './components/PendingApprovalsTab';
import ActiveFundsTab from './components/ActiveFundsTab';
import ReportsTab from './components/ReportsTab';

const AdminPanel = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [showNotifications, setShowNotifications] = useState(false);

  // Mock admin user data
  const adminUser = {
    id: 1,
    name: "Admin Johnson",
    email: "admin@athletefund.com",
    role: "admin",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    lastLogin: "2025-01-21T08:30:00Z"
  };

  const tabs = [
    {
      id: 'overview',
      label: 'Overview',
      icon: 'LayoutDashboard',
      description: 'Platform overview and quick actions'
    },
    {
      id: 'pending-approvals',
      label: 'Pending Approvals',
      icon: 'UserCheck',
      description: 'Review athlete applications',
      badge: 3
    },
    {
      id: 'active-funds',
      label: 'Active Funds',
      icon: 'Eye',
      description: 'Monitor fundraising campaigns',
      badge: 7
    },
    {
      id: 'reports',
      label: 'Reports',
      icon: 'BarChart3',
      description: 'Analytics and financial reports'
    }
  ];

  useEffect(() => {
    // Check if user is admin, redirect if not
    const userRole = localStorage.getItem('userRole');
    if (userRole !== 'admin') {
      navigate('/landing-page');
    }
  }, [navigate]);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };

  const handleQuickAction = (actionId) => {
    switch (actionId) {
      case 'approve-athletes':
        setActiveTab('pending-approvals');
        break;
      case 'review-funds': setActiveTab('active-funds');
        break;
      case 'financial-reports': setActiveTab('reports');
        break;
      case 'user-management': navigate('/user-management');
        break;
      case 'system-settings': navigate('/system-settings');
        break;
      case 'communication': console.log('Opening communication panel');
        break;
      default:
        console.log(`Action ${actionId} not implemented`);
    }
  };

  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications);
  };

  const handleProfileClick = () => {
    console.log('Opening profile settings');
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return <QuickActionsPanel onActionClick={handleQuickAction} />;
      case 'pending-approvals':
        return <PendingApprovalsTab />;
      case 'active-funds':
        return <ActiveFundsTab />;
      case 'reports':
        return <ReportsTab />;
      default:
        return <QuickActionsPanel onActionClick={handleQuickAction} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <AdminHeader
        user={adminUser}
        onNotificationClick={handleNotificationClick}
        onProfileClick={handleProfileClick}
      />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Admin Panel</h1>
          <p className="text-muted-foreground">
            Manage platform operations, user approvals, and system oversight
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="mb-8">
          {/* Desktop Tabs */}
          <div className="hidden md:block">
            <div className="border-b border-border">
              <nav className="-mb-px flex space-x-8">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => handleTabChange(tab.id)}
                    className={`group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                      activeTab === tab.id
                        ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
                    }`}
                  >
                    <Icon
                      name={tab.icon}
                      size={20}
                      className={`mr-2 ${
                        activeTab === tab.id ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground'
                      }`}
                    />
                    <span>{tab.label}</span>
                    {tab.badge && tab.badge > 0 && (
                      <span className="ml-2 inline-flex items-center justify-center w-5 h-5 text-xs font-data bg-error text-error-foreground rounded-full">
                        {tab.badge > 9 ? '9+' : tab.badge}
                      </span>
                    )}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Mobile Tab Selector */}
          <div className="md:hidden">
            <div className="bg-card rounded-lg border border-border p-1">
              <div className="grid grid-cols-2 gap-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => handleTabChange(tab.id)}
                    className={`relative flex items-center justify-center p-3 rounded-md text-sm font-medium transition-colors duration-200 ${
                      activeTab === tab.id
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                    }`}
                  >
                    <Icon name={tab.icon} size={16} className="mr-2" />
                    <span className="truncate">{tab.label}</span>
                    {tab.badge && tab.badge > 0 && (
                      <span className="absolute -top-1 -right-1 inline-flex items-center justify-center w-4 h-4 text-xs font-data bg-error text-error-foreground rounded-full">
                        {tab.badge > 9 ? '9+' : tab.badge}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Tab Content */}
        <div className="animate-fade-in">
          {renderTabContent()}
        </div>
      </div>

      {/* Notifications Panel */}
      {showNotifications && (
        <div className="fixed inset-0 z-50 flex items-start justify-end p-4 bg-black/20 backdrop-blur-sm">
          <div className="w-full max-w-sm bg-card rounded-lg shadow-elevation-3 border border-border mt-16 mr-4 animate-slide-in">
            <div className="p-4 border-b border-border">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-foreground">Notifications</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowNotifications(false)}
                >
                  <Icon name="X" size={20} />
                </Button>
              </div>
            </div>
            
            <div className="p-4 space-y-3 max-h-96 overflow-y-auto">
              <div className="flex items-start space-x-3 p-3 bg-error/10 rounded-lg">
                <Icon name="AlertTriangle" size={16} className="text-error mt-0.5" />
                <div className="flex-1">
                  <div className="text-sm font-medium text-foreground">Urgent: 3 Athletes Pending Approval</div>
                  <div className="text-xs text-muted-foreground">Applications submitted over 48 hours ago</div>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 p-3 bg-warning/10 rounded-lg">
                <Icon name="Eye" size={16} className="text-warning mt-0.5" />
                <div className="flex-1">
                  <div className="text-sm font-medium text-foreground">7 Fund Requests Need Review</div>
                  <div className="text-xs text-muted-foreground">Medical documents and disbursement approvals</div>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 p-3 bg-primary/10 rounded-lg">
                <Icon name="TrendingUp" size={16} className="text-primary mt-0.5" />
                <div className="flex-1">
                  <div className="text-sm font-medium text-foreground">Platform Growth Update</div>
                  <div className="text-xs text-muted-foreground">15% increase in user registrations this week</div>
                </div>
              </div>
            </div>
            
            <div className="p-4 border-t border-border">
              <Button variant="outline" size="sm" fullWidth>
                View All Notifications
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-card border-t border-border mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-6 h-6 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="Zap" size={16} color="white" />
              </div>
              <span className="font-heading font-bold text-primary">AthleteFund</span>
              <span className="text-muted-foreground">Admin Panel</span>
            </div>
            
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <span>System Status: Online</span>
              <span>•</span>
              <span>Last Updated: {new Date().toLocaleTimeString()}</span>
              <span>•</span>
              <span>&copy; {new Date().getFullYear()} AthleteFund</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AdminPanel;
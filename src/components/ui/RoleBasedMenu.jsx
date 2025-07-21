import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const RoleBasedMenu = ({ user, className = '' }) => {
  const location = useLocation();

  const getMenuItems = () => {
    if (!user) {
      return [
        { 
          label: 'Home', 
          path: '/landing-page', 
          icon: 'Home',
          description: 'Discover athletes and funding opportunities'
        },
        { 
          label: 'Browse Athletes', 
          path: '/athlete-profile-view', 
          icon: 'Users',
          description: 'Find athletes to support'
        },
        { 
          label: 'About', 
          path: '/about', 
          icon: 'Info',
          description: 'Learn about our mission'
        },
        { 
          label: 'Contact', 
          path: '/contact', 
          icon: 'Mail',
          description: 'Get in touch with us'
        }
      ];
    }

    switch (user.role) {
      case 'athlete':
        return [
          { 
            label: 'My Dashboard', 
            path: '/athlete-dashboard', 
            icon: 'LayoutDashboard',
            description: 'Overview of your funding progress',
            badge: null
          },
          { 
            label: 'My Profile', 
            path: '/athlete-profile-view', 
            icon: 'User',
            description: 'Manage your athlete profile',
            badge: null
          },
          { 
            label: 'Fund Requests', 
            path: '/injury-fund-request-form', 
            icon: 'Heart',
            description: 'Create and manage funding requests',
            badge: null
          },
          { 
            label: 'Sponsorships', 
            path: '/sponsorships', 
            icon: 'Award',
            description: 'View your current sponsorships',
            badge: null
          },
          { 
            label: 'Settings', 
            path: '/athlete-settings', 
            icon: 'Settings',
            description: 'Account and notification preferences',
            badge: null
          }
        ];

      case 'sponsor':
        return [
          { 
            label: 'Browse Athletes', 
            path: '/athlete-profile-view', 
            icon: 'Search',
            description: 'Discover athletes to support',
            badge: null
          },
          { 
            label: 'My Sponsorships', 
            path: '/my-sponsorships', 
            icon: 'Heart',
            description: 'Athletes you are supporting',
            badge: null
          },
          { 
            label: 'Donation History', 
            path: '/donation-history', 
            icon: 'History',
            description: 'Track your contribution history',
            badge: null
          },
          { 
            label: 'Impact Reports', 
            path: '/impact-reports', 
            icon: 'TrendingUp',
            description: 'See the impact of your support',
            badge: null
          },
          { 
            label: 'Settings', 
            path: '/sponsor-settings', 
            icon: 'Settings',
            description: 'Account and notification preferences',
            badge: null
          }
        ];

      case 'admin':
        return [
          { 
            label: 'Platform Overview', 
            path: '/admin-panel', 
            icon: 'LayoutDashboard',
            description: 'System metrics and key insights',
            badge: null
          },
          { 
            label: 'User Management', 
            path: '/user-management', 
            icon: 'Users',
            description: 'Manage athletes, sponsors, and admins',
            badge: 3
          },
          { 
            label: 'Fund Oversight', 
            path: '/fund-oversight', 
            icon: 'Eye',
            description: 'Review and approve funding requests',
            badge: 7
          },
          { 
            label: 'Financial Reports', 
            path: '/reports', 
            icon: 'BarChart3',
            description: 'Platform financial analytics',
            badge: null
          },
          { 
            label: 'System Settings', 
            path: '/system-settings', 
            icon: 'Settings',
            description: 'Platform configuration and policies',
            badge: null
          }
        ];

      default:
        return [];
    }
  };

  const menuItems = getMenuItems();

  const isActivePath = (path) => {
    return location.pathname === path;
  };

  const getRoleColor = () => {
    if (!user) return 'text-muted-foreground';
    
    switch (user.role) {
      case 'athlete':
        return 'text-primary';
      case 'sponsor':
        return 'text-secondary';
      case 'admin':
        return 'text-warning';
      default:
        return 'text-muted-foreground';
    }
  };

  return (
    <div className={`space-y-1 ${className}`}>
      {user && (
        <div className="px-3 py-2 mb-4">
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${
              user.role === 'athlete' ? 'bg-primary' :
              user.role === 'sponsor' ? 'bg-secondary' :
              user.role === 'admin' ? 'bg-warning' : 'bg-muted'
            }`} />
            <span className={`text-xs font-medium uppercase tracking-wide ${getRoleColor()}`}>
              {user.role} Menu
            </span>
          </div>
        </div>
      )}

      {menuItems.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className={`group flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-accent ${
            isActivePath(item.path)
              ? 'bg-primary/10 text-primary border-r-2 border-primary' :'text-muted-foreground hover:text-foreground'
          }`}
        >
          <div className="flex items-center space-x-3 min-w-0 flex-1">
            <Icon 
              name={item.icon} 
              size={18} 
              className={`flex-shrink-0 transition-colors duration-200 ${
                isActivePath(item.path) ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground'
              }`}
            />
            <div className="min-w-0 flex-1">
              <div className="font-medium truncate">{item.label}</div>
              {item.description && (
                <div className="text-xs text-muted-foreground truncate mt-0.5">
                  {item.description}
                </div>
              )}
            </div>
          </div>

          {item.badge && item.badge > 0 && (
            <div className="flex-shrink-0 ml-2">
              <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-data bg-error text-error-foreground rounded-full">
                {item.badge > 9 ? '9+' : item.badge}
              </span>
            </div>
          )}
        </Link>
      ))}

      {user && (
        <div className="pt-4 mt-4 border-t border-border">
          <div className="px-3 py-2">
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              <Icon name="Shield" size={14} />
              <span>Logged in as {user.name}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoleBasedMenu;
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const AdaptiveNavBar = ({ user, onAuthAction, notificationCount = 0 }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getNavigationItems = () => {
    if (!user) {
      return [
        { label: 'Home', path: '/landing-page', icon: 'Home' },
        { label: 'Athletes', path: '/athlete-profile-view', icon: 'Users' },
        { label: 'About', path: '/about', icon: 'Info' },
        { label: 'Contact', path: '/contact', icon: 'Mail' }
      ];
    }

    switch (user.role) {
      case 'athlete':
        return [
          { label: 'Dashboard', path: '/athlete-dashboard', icon: 'LayoutDashboard' },
          { label: 'My Profile', path: '/athlete-profile-view', icon: 'User' },
          { label: 'Fund Requests', path: '/injury-fund-request-form', icon: 'Heart' },
          { label: 'Sponsorships', path: '/sponsorships', icon: 'Award' }
        ];
      case 'sponsor':
        return [
          { label: 'Browse Athletes', path: '/athlete-profile-view', icon: 'Search' },
          { label: 'My Sponsorships', path: '/my-sponsorships', icon: 'Heart' },
          { label: 'Donation History', path: '/donation-history', icon: 'History' }
        ];
      case 'admin':
        return [
          { label: 'Dashboard', path: '/admin-panel', icon: 'LayoutDashboard' },
          { label: 'User Management', path: '/user-management', icon: 'Users' },
          { label: 'Fund Oversight', path: '/fund-oversight', icon: 'Eye' },
          { label: 'Reports', path: '/reports', icon: 'BarChart3' }
        ];
      default:
        return [];
    }
  };

  const navigationItems = getNavigationItems();

  const isActivePath = (path) => {
    return location.pathname === path;
  };

  const handleAuthClick = () => {
    if (user) {
      onAuthAction?.('logout');
    } else {
      onAuthAction?.('login');
    }
    closeMobileMenu();
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-[1000] bg-card border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link 
            to={user ? (user.role === 'athlete' ? '/athlete-dashboard' : user.role === 'admin' ? '/admin-panel' : '/athlete-profile-view') : '/landing-page'}
            className="flex items-center space-x-2 font-heading font-bold text-xl text-primary hover:text-primary/80 transition-colors duration-200"
            onClick={closeMobileMenu}
          >
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="Zap" size={20} color="white" />
            </div>
            <span>AthleteFund</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  isActivePath(item.path)
                    ? 'text-primary bg-primary/10' :'text-muted-foreground hover:text-foreground hover:bg-accent'
                }`}
              >
                <Icon name={item.icon} size={16} />
                <span>{item.label}</span>
              </Link>
            ))}
          </div>

          {/* Desktop Auth Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {user && notificationCount > 0 && (
              <div className="relative">
                <Icon name="Bell" size={20} className="text-muted-foreground" />
                <span className="absolute -top-1 -right-1 bg-error text-error-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center font-data">
                  {notificationCount > 9 ? '9+' : notificationCount}
                </span>
              </div>
            )}
            
            {user ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <Icon name="User" size={16} className="text-primary" />
                  </div>
                  <span className="text-sm font-medium text-foreground">{user.name}</span>
                </div>
                <Button variant="outline" size="sm" onClick={handleAuthClick}>
                  <Icon name="LogOut" size={16} />
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Button variant="ghost" size="sm" onClick={() => onAuthAction?.('login')}>
                  Login
                </Button>
                <Button variant="default" size="sm" onClick={() => onAuthAction?.('register')}>
                  Sign Up
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMobileMenu}
              className="relative"
            >
              <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={24} />
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-16 z-[1030] bg-card border-t border-border animate-slide-in">
          <div className="px-4 py-6 space-y-4">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={closeMobileMenu}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-base font-medium transition-colors duration-200 ${
                  isActivePath(item.path)
                    ? 'text-primary bg-primary/10' :'text-muted-foreground hover:text-foreground hover:bg-accent'
                }`}
              >
                <Icon name={item.icon} size={20} />
                <span>{item.label}</span>
              </Link>
            ))}

            <div className="pt-6 border-t border-border">
              {user ? (
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 px-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <Icon name="User" size={20} className="text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{user.name}</p>
                      <p className="text-sm text-muted-foreground capitalize">{user.role}</p>
                    </div>
                  </div>
                  
                  {notificationCount > 0 && (
                    <div className="flex items-center space-x-3 px-4 py-2 bg-warning/10 rounded-lg">
                      <Icon name="Bell" size={20} className="text-warning" />
                      <span className="text-sm text-warning">
                        {notificationCount} new notification{notificationCount > 1 ? 's' : ''}
                      </span>
                    </div>
                  )}
                  
                  <Button
                    variant="outline"
                    fullWidth
                    onClick={handleAuthClick}
                    iconName="LogOut"
                    iconPosition="left"
                  >
                    Logout
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  <Button
                    variant="ghost"
                    fullWidth
                    onClick={() => {
                      onAuthAction?.('login');
                      closeMobileMenu();
                    }}
                  >
                    Login
                  </Button>
                  <Button
                    variant="default"
                    fullWidth
                    onClick={() => {
                      onAuthAction?.('register');
                      closeMobileMenu();
                    }}
                  >
                    Sign Up
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default AdaptiveNavBar;
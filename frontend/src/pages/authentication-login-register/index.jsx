import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import AuthTabs from './components/AuthTabs';
import LoginForm from './components/LoginForm';
import RegistrationForm from './components/RegistrationForm';
import TrustIndicators from './components/TrustIndicators';

const AuthenticationPage = () => {
  const [activeTab, setActiveTab] = useState('login');
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Check if user is already logged in
  useEffect(() => {
    const savedUser = localStorage.getItem('athletefund_user');
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      setUser(userData);
      
      // Redirect based on role if already logged in
      const redirectPaths = {
        athlete: '/athlete-dashboard',
        sponsor: '/athlete-profile-view',
        admin: '/admin-panel'
      };
      
      navigate(redirectPaths[userData.role] || '/landing-page');
    }
  }, [navigate]);

  // Check for redirect parameter
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const mode = params.get('mode');
    if (mode === 'register') {
      setActiveTab('register');
    }
  }, [location]);

  const handleLogin = async (userData, rememberMe = false) => {
    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Save user data
      if (rememberMe) {
        localStorage.setItem('athletefund_user', JSON.stringify(userData));
      } else {
        sessionStorage.setItem('athletefund_user', JSON.stringify(userData));
      }
      
      setUser(userData);
      
      // Success notification could be added here
      console.log('Login successful:', userData);
      
    } catch (error) {
      throw new Error('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (userData) => {
    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Save user data
      localStorage.setItem('athletefund_user', JSON.stringify(userData));
      setUser(userData);
      
      // Success notification could be added here
      console.log('Registration successful:', userData);
      
    } catch (error) {
      throw new Error('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    // Update URL without navigation
    const params = new URLSearchParams(location.search);
    if (tab === 'register') {
      params.set('mode', 'register');
    } else {
      params.delete('mode');
    }
    const newUrl = `${location.pathname}${params.toString() ? `?${params.toString()}` : ''}`;
    window.history.replaceState({}, '', newUrl);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Header */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link 
              to="/landing-page"
              className="flex items-center space-x-2 font-heading font-bold text-xl text-primary hover:text-primary/80 transition-colors duration-200"
            >
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="Zap" size={20} color="white" />
              </div>
              <span>AthleteFund</span>
            </Link>

            {/* Back to Home */}
            <Link to="/landing-page">
              <Button variant="ghost" size="sm" iconName="ArrowLeft" iconPosition="left">
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-16 min-h-screen flex">
        {/* Left Side - Form */}
        <div className="flex-1 flex items-center justify-center p-4 lg:p-8">
          <div className="w-full max-w-md space-y-8">
            {/* Header */}
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Icon name="Users" size={32} className="text-primary" />
              </div>
              <h1 className="text-3xl font-heading font-bold text-foreground mb-2">
                {activeTab === 'login' ? 'Welcome Back' : 'Join AthleteFund'}
              </h1>
              <p className="text-muted-foreground">
                {activeTab === 'login' ?'Sign in to continue supporting athletes and funding dreams' :'Create your account and start making a difference in sports'
                }
              </p>
            </div>

            {/* Auth Tabs */}
            <AuthTabs 
              activeTab={activeTab} 
              onTabChange={handleTabChange}
            />

            {/* Forms */}
            <div className="bg-card rounded-lg border border-border p-6 shadow-elevation-1">
              {activeTab === 'login' ? (
                <LoginForm 
                  onLogin={handleLogin}
                  loading={loading}
                />
              ) : (
                <RegistrationForm 
                  onRegister={handleRegister}
                  loading={loading}
                />
              )}
            </div>

            {/* Footer Links */}
            <div className="text-center space-y-2">
              <div className="flex items-center justify-center space-x-4 text-sm text-muted-foreground">
                <Link to="/terms" className="hover:text-foreground transition-colors duration-200">
                  Terms of Service
                </Link>
                <span>•</span>
                <Link to="/privacy" className="hover:text-foreground transition-colors duration-200">
                  Privacy Policy
                </Link>
                <span>•</span>
                <Link to="/help" className="hover:text-foreground transition-colors duration-200">
                  Help Center
                </Link>
              </div>
              
              <div className="text-xs text-muted-foreground">
                © {new Date().getFullYear()} AthleteFund. All rights reserved.
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Trust Indicators & Info */}
        <div className="hidden lg:flex flex-1 bg-muted/20 items-center justify-center p-8">
          <div className="w-full max-w-lg space-y-8">
            {/* Hero Section */}
            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Icon name="Heart" size={40} color="white" />
              </div>
              <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
                Support Athletes.<br />Fund Dreams.
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Join thousands of athletes and sponsors creating opportunities, 
                funding recovery, and building the future of sports together.
              </p>
            </div>

            {/* Trust Indicators */}
            <TrustIndicators />

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="bg-card rounded-lg p-4 border border-border">
                <div className="text-2xl font-heading font-bold text-primary">$2.5M+</div>
                <div className="text-xs text-muted-foreground">Funds Raised</div>
              </div>
              <div className="bg-card rounded-lg p-4 border border-border">
                <div className="text-2xl font-heading font-bold text-secondary">1,200+</div>
                <div className="text-xs text-muted-foreground">Athletes Supported</div>
              </div>
              <div className="bg-card rounded-lg p-4 border border-border">
                <div className="text-2xl font-heading font-bold text-warning">500+</div>
                <div className="text-xs text-muted-foreground">Active Sponsors</div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-6 border border-primary/20">
              <div className="flex items-center space-x-3 mb-3">
                <Icon name="Sparkles" size={20} className="text-primary" />
                <span className="font-medium text-foreground">Ready to make an impact?</span>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Whether you're an athlete seeking support or a sponsor ready to invest in talent, 
                your journey starts here.
              </p>
              <div className="flex space-x-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setActiveTab('register')}
                  iconName="Trophy"
                  iconPosition="left"
                >
                  I'm an Athlete
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setActiveTab('register')}
                  iconName="Heart"
                  iconPosition="left"
                >
                  I'm a Sponsor
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthenticationPage;
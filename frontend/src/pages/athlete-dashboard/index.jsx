import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdaptiveNavBar from '../../components/ui/AdaptiveNavBar';
import AuthenticationGateway from '../../components/ui/AuthenticationGateway';
import ProfileCompletionCard from './components/ProfileCompletionCard';
import QuickStatsGrid from './components/QuickStatsGrid';
import ProfileManagementCard from './components/ProfileManagementCard';
import InjuryFundRequestCard from './components/InjuryFundRequestCard';
import SponsorshipNotifications from './components/SponsorshipNotifications';
import RecentActivityFeed from './components/RecentActivityFeed';
import QuickActionButtons from './components/QuickActionButtons';

const AthleteDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [showAuth, setShowAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  // Mock user data
  const mockUser = {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    role: "athlete",
    profileImage: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
    sport: "Basketball",
    location: "Los Angeles, CA",
    age: 22,
    bio: "Passionate basketball player with 8 years of competitive experience. Currently recovering from ACL injury and working towards Olympic trials qualification.",
    achievements: [
      "State Championship Winner 2023",
      "MVP Regional Tournament 2022", 
      "College Scholarship Recipient",
      "All-State Team Selection 2021",
      "Regional Scoring Leader 2022"
    ],
    profileCompletionPercentage: 85,
    missingFields: ["Medical Records", "Training Schedule"],
    stats: {
      totalSponsorship: 3750,
      activeFunds: 2,
      profileViews: 1847,
      newMessages: 7
    }
  };

  useEffect(() => {
    // Simulate loading and authentication check
    const timer = setTimeout(() => {
      const storedUser = localStorage.getItem('athleteFundUser');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      } else {
        setUser(mockUser);
        localStorage.setItem('athleteFundUser', JSON.stringify(mockUser));
      }
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleAuthAction = (action) => {
    if (action === 'logout') {
      setUser(null);
      localStorage.removeItem('athleteFundUser');
      navigate('/landing-page');
    } else {
      setShowAuth(true);
    }
  };

  const handleLogin = async (email, password) => {
    // Mock login logic
    if (email === "athlete@demo.com" && password === "athlete123") {
      setUser(mockUser);
      localStorage.setItem('athleteFundUser', JSON.stringify(mockUser));
      setShowAuth(false);
    } else {
      throw new Error("Invalid credentials. Use athlete@demo.com / athlete123");
    }
  };

  const handleRegister = async (formData) => {
    // Mock registration logic
    const newUser = {
      ...mockUser,
      name: formData.name,
      email: formData.email,
      role: formData.role
    };
    setUser(newUser);
    localStorage.setItem('athleteFundUser', JSON.stringify(newUser));
    setShowAuth(false);
  };

  // Redirect non-athletes
  useEffect(() => {
    if (user && user.role !== 'athlete') {
      if (user.role === 'admin') {
        navigate('/admin-panel');
      } else {
        navigate('/athlete-profile-view');
      }
    }
  }, [user, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <AdaptiveNavBar user={null} onAuthAction={handleAuthAction} />
        <div className="pt-16 flex items-center justify-center min-h-screen">
          <div className="text-center max-w-md mx-auto p-6">
            <h1 className="text-2xl font-heading font-bold text-foreground mb-4">
              Access Restricted
            </h1>
            <p className="text-muted-foreground mb-6">
              Please log in to access your athlete dashboard.
            </p>
            <button
              onClick={() => setShowAuth(true)}
              className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors duration-200"
            >
              Sign In
            </button>
          </div>
        </div>
        <AuthenticationGateway
          isOpen={showAuth}
          onClose={() => setShowAuth(false)}
          onLogin={handleLogin}
          onRegister={handleRegister}
          initialMode="login"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <AdaptiveNavBar 
        user={user} 
        onAuthAction={handleAuthAction}
        notificationCount={user.stats.newMessages}
      />
      
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-heading font-bold text-foreground">
                  Welcome back, {user.name}
                </h1>
                <p className="text-muted-foreground mt-1">
                  Manage your athletic journey and connect with sponsors
                </p>
              </div>
              <div className="hidden md:flex items-center space-x-2 text-sm text-muted-foreground">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
                <span>Dashboard updated {new Date().toLocaleDateString()}</span>
              </div>
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="lg:hidden space-y-6">
            <ProfileCompletionCard 
              completionPercentage={user.profileCompletionPercentage}
              missingFields={user.missingFields}
            />
            <QuickStatsGrid stats={user.stats} />
            <QuickActionButtons />
            <ProfileManagementCard athlete={user} />
            <InjuryFundRequestCard />
            <SponsorshipNotifications />
            <RecentActivityFeed />
          </div>

          {/* Desktop Layout */}
          <div className="hidden lg:block">
            <div className="grid grid-cols-12 gap-6">
              {/* Left Column */}
              <div className="col-span-8 space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <ProfileCompletionCard 
                    completionPercentage={user.profileCompletionPercentage}
                    missingFields={user.missingFields}
                  />
                  <QuickActionButtons />
                </div>
                
                <QuickStatsGrid stats={user.stats} />
                <ProfileManagementCard athlete={user} />
                <InjuryFundRequestCard />
              </div>

              {/* Right Column */}
              <div className="col-span-4 space-y-6">
                <SponsorshipNotifications />
                <RecentActivityFeed />
              </div>
            </div>
          </div>
        </div>
      </main>

      <AuthenticationGateway
        isOpen={showAuth}
        onClose={() => setShowAuth(false)}
        onLogin={handleLogin}
        onRegister={handleRegister}
        initialMode="login"
      />
    </div>
  );
};

export default AthleteDashboard;
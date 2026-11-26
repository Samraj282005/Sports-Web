import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdaptiveNavBar from '../../components/ui/AdaptiveNavBar';
import AuthenticationGateway from '../../components/ui/AuthenticationGateway';
import HeroSection from './components/HeroSection';
import BenefitsSection from './components/BenefitsSection';
import AthleteShowcase from './components/AthleteShowcase';
import TestimonialsSection from './components/TestimonialsSection';
import TrustIndicators from './components/TrustIndicators';
import CallToActionSection from './components/CallToActionSection';
import Footer from './components/Footer';

const LandingPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [isLoading, setIsLoading] = useState(true);

  // Mock user data for demonstration
  const mockUsers = [
    {
      id: 1,
      email: "athlete@demo.com",
      password: "athlete123",
      name: "Sarah Martinez",
      role: "athlete",
      sport: "Track & Field"
    },
    {
      id: 2,
      email: "sponsor@demo.com",
      password: "sponsor123",
      name: "Michael Johnson",
      role: "sponsor",
      company: "Johnson Sports Foundation"
    },
    {
      id: 3,
      email: "admin@demo.com",
      password: "admin123",
      name: "Admin User",
      role: "admin"
    }
  ];

  useEffect(() => {
    // Check for existing user session
    const savedUser = localStorage.getItem('athleteFundUser');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('athleteFundUser');
      }
    }
    setIsLoading(false);
  }, []);

  const handleAuthAction = (action, redirectPath = null) => {
    switch (action) {
      case 'login': setAuthMode('login');
        setShowAuthModal(true);
        break;
      case 'register': setAuthMode('register');
        setShowAuthModal(true);
        break;
      case 'logout':
        handleLogout();
        break;
      default:
        break;
    }
  };

  const handleLogin = async (email, password, redirectPath = null) => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const foundUser = mockUsers.find(u => u.email === email && u.password === password);
    
    if (foundUser) {
      const userSession = {
        id: foundUser.id,
        name: foundUser.name,
        email: foundUser.email,
        role: foundUser.role,
        sport: foundUser.sport,
        company: foundUser.company,
        loginTime: new Date().toISOString()
      };
      
      setUser(userSession);
      localStorage.setItem('athleteFundUser', JSON.stringify(userSession));
      setShowAuthModal(false);
      
      // Navigate based on role or redirect path
      if (redirectPath) {
        navigate(redirectPath);
      } else {
        switch (foundUser.role) {
          case 'athlete':
            navigate('/athlete-dashboard');
            break;
          case 'sponsor': navigate('/athlete-profile-view');
            break;
          case 'admin': navigate('/admin-panel');
            break;
          default:
            navigate('/landing-page');
        }
      }
    } else {
      throw new Error('Invalid email or password. Please try: athlete@demo.com/athlete123, sponsor@demo.com/sponsor123, or admin@demo.com/admin123');
    }
    
    setIsLoading(false);
  };

  const handleRegister = async (formData, redirectPath = null) => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Check if user already exists
    const existingUser = mockUsers.find(u => u.email === formData.email);
    if (existingUser) {
      throw new Error('An account with this email already exists. Please try logging in instead.');
    }
    
    // Create new user
    const newUser = {
      id: mockUsers.length + 1,
      name: formData.name,
      email: formData.email,
      role: formData.role,
      loginTime: new Date().toISOString()
    };
    
    setUser(newUser);
    localStorage.setItem('athleteFundUser', JSON.stringify(newUser));
    setShowAuthModal(false);
    
    // Navigate based on role or redirect path
    if (redirectPath) {
      navigate(redirectPath);
    } else {
      switch (formData.role) {
        case 'athlete':
          navigate('/athlete-dashboard');
          break;
        case 'sponsor': navigate('/athlete-profile-view');
          break;
        default:
          navigate('/landing-page');
      }
    }
    
    setIsLoading(false);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('athleteFundUser');
    navigate('/landing-page');
  };

  const handleCloseAuthModal = () => {
    setShowAuthModal(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading AthleteFund...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <AdaptiveNavBar 
        user={user}
        onAuthAction={handleAuthAction}
        notificationCount={user?.role === 'admin' ? 5 : user?.role === 'athlete' ? 2 : 0}
      />

      {/* Main Content */}
      <main className="pt-16">
        <HeroSection onAuthAction={handleAuthAction} />
        <BenefitsSection />
        <AthleteShowcase />
        <TestimonialsSection />
        <TrustIndicators />
        <CallToActionSection onAuthAction={handleAuthAction} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Authentication Modal */}
      <AuthenticationGateway
        isOpen={showAuthModal}
        onClose={handleCloseAuthModal}
        onLogin={handleLogin}
        onRegister={handleRegister}
        initialMode={authMode}
      />
    </div>
  );
};

export default LandingPage;
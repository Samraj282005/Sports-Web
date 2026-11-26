import React from 'react';
import { useNavigate } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const HeroSection = ({ onAuthAction }) => {
  const navigate = useNavigate();

  const handleSponsorClick = () => {
    navigate('/athlete-profile-view');
  };

  const handleInjuryFundClick = () => {
    navigate('/injury-fund-request-form');
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary/10 via-background to-secondary/10">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
          alt="Athletes training together"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-heading font-bold text-foreground mb-6 leading-tight">
            Support Athletes.
            <span className="block text-primary">Fund Dreams.</span>
          </h1>

          {/* Subtext */}
          <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            Connect with talented athletes seeking support for training, equipment, and injury recovery. 
            Your contribution can transform dreams into reality and help athletes reach their full potential.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button
              variant="default"
              size="xl"
              onClick={handleSponsorClick}
              iconName="Heart"
              iconPosition="left"
              className="w-full sm:w-auto min-w-[200px]"
            >
              Become a Sponsor
            </Button>
            <Button
              variant="outline"
              size="xl"
              onClick={handleInjuryFundClick}
              iconName="Shield"
              iconPosition="left"
              className="w-full sm:w-auto min-w-[200px]"
            >
              Support Injury Funds
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-heading font-bold text-primary mb-2">500+</div>
              <div className="text-sm sm:text-base text-muted-foreground">Athletes Supported</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-heading font-bold text-secondary mb-2">$2.5M</div>
              <div className="text-sm sm:text-base text-muted-foreground">Funds Raised</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-heading font-bold text-warning mb-2">1,200+</div>
              <div className="text-sm sm:text-base text-muted-foreground">Dreams Funded</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-muted-foreground rounded-full flex justify-center">
          <div className="w-1 h-3 bg-muted-foreground rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
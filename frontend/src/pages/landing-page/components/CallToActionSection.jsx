import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';


const CallToActionSection = ({ onAuthAction }) => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    onAuthAction?.('register');
  };

  const handleBrowseAthletes = () => {
    navigate('/athlete-profile-view');
  };

  const userTypes = [
    {
      id: 'athlete',
      title: 'I\'m an Athlete',
      description: 'Seeking funding for training, equipment, or injury recovery',
      icon: 'Trophy',
      benefits: [
        'Create compelling funding campaigns',
        'Connect with generous sponsors',
        'Track your progress transparently',
        'Build a supportive community'
      ],
      cta: 'Start Your Campaign',
      color: 'primary'
    },
    {
      id: 'sponsor',
      title: 'I\'m a Sponsor',
      description: 'Ready to support talented athletes and their dreams',
      icon: 'Heart',
      benefits: [
        'Discover inspiring athletes',
        'Make meaningful contributions',
        'Track your impact in real-time',
        'Join a community of supporters'
      ],
      cta: 'Find Athletes to Support',
      color: 'secondary'
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-primary/10 via-background to-secondary/10 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-primary/20 animate-pulse" />
        <div className="absolute bottom-10 right-10 w-24 h-24 rounded-full bg-secondary/20 animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/4 w-16 h-16 rounded-full bg-warning/20 animate-pulse delay-500" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-6">
            Ready to Make a Difference?
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Join thousands of athletes and sponsors who are already transforming dreams into reality. 
            Your journey starts with a single step.
          </p>
          
          {/* Quick Stats */}
          <div className="flex flex-wrap justify-center items-center gap-8 mb-8">
            <div className="flex items-center space-x-2">
              <Icon name="Users" size={20} className="text-primary" />
              <span className="text-sm font-medium text-foreground">500+ Athletes Funded</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="DollarSign" size={20} className="text-secondary" />
              <span className="text-sm font-medium text-foreground">$2.5M+ Raised</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Award" size={20} className="text-warning" />
              <span className="text-sm font-medium text-foreground">98% Success Rate</span>
            </div>
          </div>
        </div>

        {/* User Type Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {userTypes.map((type) => (
            <div key={type.id} className="bg-card rounded-2xl border border-border shadow-elevation-2 p-8 hover:shadow-elevation-3 transition-all duration-300 group">
              {/* Header */}
              <div className="text-center mb-6">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${
                  type.color === 'primary' ? 'bg-primary/10' : 'bg-secondary/10'
                } group-hover:scale-110 transition-transform duration-300`}>
                  <Icon 
                    name={type.icon} 
                    size={32} 
                    className={type.color === 'primary' ? 'text-primary' : 'text-secondary'} 
                  />
                </div>
                <h3 className="text-2xl font-heading font-semibold text-foreground mb-2">
                  {type.title}
                </h3>
                <p className="text-muted-foreground">
                  {type.description}
                </p>
              </div>

              {/* Benefits */}
              <div className="mb-8">
                <h4 className="font-medium text-foreground mb-4">What you get:</h4>
                <ul className="space-y-3">
                  {type.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <Icon 
                        name="CheckCircle" 
                        size={16} 
                        className={`${type.color === 'primary' ? 'text-primary' : 'text-secondary'} flex-shrink-0 mt-0.5`} 
                      />
                      <span className="text-sm text-muted-foreground">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA */}
              <Button
                variant={type.color === 'primary' ? 'default' : 'secondary'}
                size="lg"
                fullWidth
                onClick={handleGetStarted}
                iconName="ArrowRight"
                iconPosition="right"
                className="group-hover:scale-105 transition-transform duration-300"
              >
                {type.cta}
              </Button>
            </div>
          ))}
        </div>

        {/* Alternative Actions */}
        <div className="text-center mb-16">
          <div className="bg-card/50 rounded-xl border border-border/50 p-8 max-w-2xl mx-auto">
            <h3 className="text-xl font-heading font-semibold text-foreground mb-4">
              Not ready to commit yet?
            </h3>
            <p className="text-muted-foreground mb-6">
              Explore our platform and see the amazing athletes currently seeking support.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="outline"
                onClick={handleBrowseAthletes}
                iconName="Search"
                iconPosition="left"
              >
                Browse Athletes
              </Button>
              <Button
                variant="ghost"
                onClick={() => navigate('/about')}
                iconName="Info"
                iconPosition="left"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-8 text-white relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-4 right-4 w-24 h-24">
                <Icon name="Zap" size={96} />
              </div>
              <div className="absolute bottom-4 left-4 w-16 h-16">
                <Icon name="Star" size={64} />
              </div>
            </div>

            <div className="relative z-10">
              <h3 className="text-2xl sm:text-3xl font-heading font-bold mb-4">
                Join AthleteFund Today
              </h3>
              <p className="text-lg opacity-90 mb-6 max-w-2xl mx-auto">
                Be part of a community that believes in the power of sports to change lives. 
                Every dream deserves a chance to become reality.
              </p>
              <Button
                variant="secondary"
                size="xl"
                onClick={handleGetStarted}
                iconName="UserPlus"
                iconPosition="left"
                className="bg-white text-primary hover:bg-white/90"
              >
                Get Started Now - It's Free
              </Button>
            </div>
          </div>
        </div>

        {/* Trust Message */}
        <div className="mt-12 text-center">
          <div className="flex items-center justify-center space-x-6 text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <Icon name="Shield" size={16} />
              <span>Secure & Safe</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Clock" size={16} />
              <span>Quick Setup</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="CheckCircle" size={16} />
              <span>No Hidden Fees</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToActionSection;
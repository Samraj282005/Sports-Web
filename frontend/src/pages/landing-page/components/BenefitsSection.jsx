import React from 'react';
import Icon from '../../../components/AppIcon';

const BenefitsSection = () => {
  const benefits = [
    {
      id: 1,
      icon: "Users",
      title: "Connect Athletes & Sponsors",
      description: "Bridge the gap between talented athletes seeking support and generous sponsors ready to invest in sporting excellence."
    },
    {
      id: 2,
      icon: "Shield",
      title: "Secure & Transparent",
      description: "Every donation is tracked transparently with secure payment processing and detailed progress reports for complete peace of mind."
    },
    {
      id: 3,
      icon: "TrendingUp",
      title: "Track Real Impact",
      description: "See exactly how your support transforms lives with detailed updates, achievements, and success stories from funded athletes."
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-6">
            Why Choose AthleteFund?
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
            We've created the most trusted platform for sports funding, connecting dreams with the support they need to flourish.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {benefits.map((benefit) => (
            <div key={benefit.id} className="text-center group">
              {/* Icon Container */}
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6 group-hover:bg-primary/20 transition-colors duration-300">
                <Icon 
                  name={benefit.icon} 
                  size={32} 
                  className="text-primary group-hover:scale-110 transition-transform duration-300" 
                />
              </div>

              {/* Content */}
              <h3 className="text-xl sm:text-2xl font-heading font-semibold text-foreground mb-4">
                {benefit.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>

        {/* Additional Features */}
        <div className="mt-16 pt-16 border-t border-border">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <Icon name="Lock" size={24} className="text-primary mx-auto" />
              <div className="text-sm font-medium text-foreground">Secure Payments</div>
            </div>
            <div className="space-y-2">
              <Icon name="CheckCircle" size={24} className="text-secondary mx-auto" />
              <div className="text-sm font-medium text-foreground">Verified Athletes</div>
            </div>
            <div className="space-y-2">
              <Icon name="BarChart3" size={24} className="text-warning mx-auto" />
              <div className="text-sm font-medium text-foreground">Progress Tracking</div>
            </div>
            <div className="space-y-2">
              <Icon name="Headphones" size={24} className="text-error mx-auto" />
              <div className="text-sm font-medium text-foreground">24/7 Support</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
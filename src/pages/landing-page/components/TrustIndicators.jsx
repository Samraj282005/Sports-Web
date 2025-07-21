import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const TrustIndicators = () => {
  const securityFeatures = [
    {
      id: 1,
      icon: "Shield",
      title: "SSL Encrypted",
      description: "256-bit encryption"
    },
    {
      id: 2,
      icon: "Lock",
      title: "Secure Payments",
      description: "PCI DSS Compliant"
    },
    {
      id: 3,
      icon: "CheckCircle",
      title: "Verified Athletes",
      description: "Identity confirmed"
    },
    {
      id: 4,
      icon: "Eye",
      title: "Transparent Tracking",
      description: "Full fund visibility"
    }
  ];

  const partnerships = [
    {
      id: 1,
      name: "Sports Authority",
      logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
    },
    {
      id: 2,
      name: "Athletic Foundation",
      logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
    },
    {
      id: 3,
      name: "Olympic Committee",
      logo: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
    },
    {
      id: 4,
      name: "Sports Medicine",
      logo: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
    }
  ];

  const certifications = [
    {
      id: 1,
      name: "Better Business Bureau",
      rating: "A+",
      icon: "Award"
    },
    {
      id: 2,
      name: "TrustPilot",
      rating: "4.8/5",
      icon: "Star"
    },
    {
      id: 3,
      name: "GuideStar Seal",
      rating: "Gold",
      icon: "Medal"
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-muted/20 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-2xl sm:text-3xl font-heading font-semibold text-foreground mb-4">
            Trusted by Athletes & Sponsors Worldwide
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Your security and trust are our top priorities. We maintain the highest standards of safety and transparency.
          </p>
        </div>

        {/* Security Features */}
        <div className="mb-16">
          <h3 className="text-lg font-heading font-semibold text-center text-foreground mb-8">
            Security & Safety Features
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {securityFeatures.map((feature) => (
              <div key={feature.id} className="text-center group">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mb-3 group-hover:bg-primary/20 transition-colors duration-300">
                  <Icon 
                    name={feature.icon} 
                    size={24} 
                    className="text-primary group-hover:scale-110 transition-transform duration-300" 
                  />
                </div>
                <h4 className="font-medium text-foreground mb-1">{feature.title}</h4>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Partnerships */}
        <div className="mb-16">
          <h3 className="text-lg font-heading font-semibold text-center text-foreground mb-8">
            Trusted Partners
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
            {partnerships.map((partner) => (
              <div key={partner.id} className="text-center group">
                <div className="w-16 h-16 mx-auto rounded-lg overflow-hidden bg-card border border-border group-hover:shadow-elevation-1 transition-shadow duration-300">
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-2 group-hover:text-foreground transition-colors duration-300">
                  {partner.name}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div className="mb-16">
          <h3 className="text-lg font-heading font-semibold text-center text-foreground mb-8">
            Certifications & Ratings
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto">
            {certifications.map((cert) => (
              <div key={cert.id} className="bg-card rounded-lg border border-border p-4 text-center hover:shadow-elevation-1 transition-shadow duration-300">
                <Icon name={cert.icon} size={32} className="text-warning mx-auto mb-3" />
                <h4 className="font-medium text-foreground mb-1">{cert.name}</h4>
                <div className="text-lg font-bold text-primary">{cert.rating}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Trust Stats */}
        <div className="border-t border-border pt-12">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="flex items-center justify-center space-x-1">
                <Icon name="Users" size={20} className="text-primary" />
                <span className="text-2xl font-heading font-bold text-foreground">50K+</span>
              </div>
              <p className="text-sm text-muted-foreground">Registered Users</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-center space-x-1">
                <Icon name="DollarSign" size={20} className="text-secondary" />
                <span className="text-2xl font-heading font-bold text-foreground">$5M+</span>
              </div>
              <p className="text-sm text-muted-foreground">Funds Processed</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-center space-x-1">
                <Icon name="Shield" size={20} className="text-warning" />
                <span className="text-2xl font-heading font-bold text-foreground">99.9%</span>
              </div>
              <p className="text-sm text-muted-foreground">Uptime</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-center space-x-1">
                <Icon name="Clock" size={20} className="text-error" />
                <span className="text-2xl font-heading font-bold text-foreground">24/7</span>
              </div>
              <p className="text-sm text-muted-foreground">Support</p>
            </div>
          </div>
        </div>

        {/* Security Notice */}
        <div className="mt-12 bg-primary/5 border border-primary/20 rounded-lg p-6">
          <div className="flex items-start space-x-3">
            <Icon name="Info" size={20} className="text-primary flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-medium text-foreground mb-2">Your Security Matters</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                We use bank-level security measures to protect your personal information and financial data. 
                All transactions are encrypted and monitored 24/7 for suspicious activity. Your trust is our commitment.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustIndicators;
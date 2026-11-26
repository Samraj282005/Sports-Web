import React from 'react';
import Icon from '../../../components/AppIcon';

const TrustIndicators = ({ className = '' }) => {
  const indicators = [
    {
      icon: 'Shield',
      label: 'Secure',
      description: 'SSL encrypted'
    },
    {
      icon: 'Lock',
      label: 'Private',
      description: 'Data protected'
    },
    {
      icon: 'CheckCircle',
      label: 'Verified',
      description: 'Trusted platform'
    },
    {
      icon: 'Users',
      label: '10K+ Users',
      description: 'Growing community'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Professional Tennis Player',
      content: `AthleteFund helped me raise $15,000 for my injury recovery. The platform made it easy to connect with sponsors who believed in my journey.`,
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      verified: true
    },
    {
      name: 'Mike Chen',
      role: 'Corporate Sponsor',
      content: `I've sponsored 5 athletes through AthleteFund. The transparency and impact tracking make it rewarding to support upcoming talent.`,avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      verified: true
    }
  ];

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Trust Badges */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {indicators.map((indicator, index) => (
          <div key={index} className="text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-2">
              <Icon name={indicator.icon} size={20} className="text-primary" />
            </div>
            <div className="text-sm font-medium text-foreground">{indicator.label}</div>
            <div className="text-xs text-muted-foreground">{indicator.description}</div>
          </div>
        ))}
      </div>

      {/* Quick Testimonials */}
      <div className="space-y-4">
        <h4 className="text-sm font-medium text-foreground text-center">
          Trusted by Athletes & Sponsors
        </h4>
        
        <div className="space-y-3">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-muted/20 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-sm font-medium text-foreground">{testimonial.name}</span>
                    {testimonial.verified && (
                      <Icon name="CheckCircle" size={14} className="text-primary" />
                    )}
                  </div>
                  <div className="text-xs text-muted-foreground mb-2">{testimonial.role}</div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    "{testimonial.content}"
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Security Notice */}
      <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Icon name="Info" size={16} className="text-primary mt-0.5 flex-shrink-0" />
          <div className="text-sm">
            <div className="font-medium text-primary mb-1">Your Security Matters</div>
            <div className="text-muted-foreground text-xs leading-relaxed">
              We use industry-standard encryption to protect your personal information and financial data. 
              Your privacy is our priority.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustIndicators;
import React from 'react';
import Icon from '../../../components/AppIcon';

const RoleSelectionCard = ({ role, isSelected, onSelect, className = '' }) => {
  const roleConfig = {
    athlete: {
      title: 'Athlete',
      description: 'Seeking funding and sponsorship for training, equipment, or injury recovery',
      icon: 'Trophy',
      color: 'primary',
      features: ['Create funding requests', 'Share your story', 'Connect with sponsors', 'Track progress']
    },
    sponsor: {
      title: 'Sponsor',
      description: 'Supporting athletes and causes to make a difference in sports',
      icon: 'Heart',
      color: 'secondary',
      features: ['Browse athlete profiles', 'Make donations', 'Track impact', 'Build relationships']
    },
    admin: {
      title: 'Administrator',
      description: 'Managing platform operations and overseeing fund distribution',
      icon: 'Shield',
      color: 'warning',
      features: ['User verification', 'Fund oversight', 'Platform management', 'Generate reports']
    }
  };

  const config = roleConfig[role];
  if (!config) return null;

  return (
    <div
      onClick={() => onSelect(role)}
      className={`relative p-6 bg-card border-2 rounded-lg cursor-pointer transition-all duration-200 hover:shadow-elevation-2 ${
        isSelected 
          ? `border-${config.color} bg-${config.color}/5 shadow-elevation-1` 
          : 'border-border hover:border-muted-foreground'
      } ${className}`}
    >
      {/* Selection Indicator */}
      {isSelected && (
        <div className={`absolute top-3 right-3 w-6 h-6 bg-${config.color} rounded-full flex items-center justify-center`}>
          <Icon name="Check" size={16} color="white" />
        </div>
      )}

      {/* Role Icon */}
      <div className={`w-16 h-16 rounded-lg flex items-center justify-center mb-4 ${
        isSelected ? `bg-${config.color}` : 'bg-muted'
      }`}>
        <Icon 
          name={config.icon} 
          size={32} 
          color={isSelected ? 'white' : 'var(--color-muted-foreground)'} 
        />
      </div>

      {/* Role Info */}
      <div className="mb-4">
        <h3 className={`text-xl font-heading font-semibold mb-2 ${
          isSelected ? `text-${config.color}` : 'text-foreground'
        }`}>
          {config.title}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {config.description}
        </p>
      </div>

      {/* Features List */}
      <div className="space-y-2">
        {config.features.map((feature, index) => (
          <div key={index} className="flex items-center space-x-2">
            <Icon 
              name="CheckCircle" 
              size={14} 
              className={isSelected ? `text-${config.color}` : 'text-muted-foreground'} 
            />
            <span className="text-xs text-muted-foreground">{feature}</span>
          </div>
        ))}
      </div>

      {/* Hover Effect */}
      <div className={`absolute inset-0 rounded-lg transition-opacity duration-200 ${
        isSelected ? 'opacity-0' : 'opacity-0 hover:opacity-5 bg-foreground'
      }`} />
    </div>
  );
};

export default RoleSelectionCard;
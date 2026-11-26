import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const AthleteHeader = ({ athlete, onSponsorClick, onShareClick }) => {
  return (
    <div className="bg-card rounded-lg border border-border shadow-elevation-1 overflow-hidden">
      {/* Cover Photo */}
      <div className="relative h-48 md:h-64 bg-gradient-to-r from-primary/20 to-secondary/20 overflow-hidden">
        <Image
          src={athlete.coverPhoto}
          alt={`${athlete.name} cover photo`}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        
        {/* Share Button */}
        <div className="absolute top-4 right-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onShareClick}
            className="bg-white/20 backdrop-blur-sm hover:bg-white/30"
          >
            <Icon name="Share2" size={20} color="white" />
          </Button>
        </div>
      </div>

      {/* Profile Content */}
      <div className="p-6">
        <div className="flex flex-col md:flex-row md:items-start gap-6">
          {/* Profile Photo */}
          <div className="relative -mt-20 md:-mt-16 flex-shrink-0">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-card shadow-elevation-2 overflow-hidden bg-card">
              <Image
                src={athlete.profilePhoto}
                alt={`${athlete.name} profile photo`}
                className="w-full h-full object-cover"
              />
            </div>
            {athlete.isVerified && (
              <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-primary rounded-full flex items-center justify-center border-2 border-card">
                <Icon name="CheckCircle" size={16} color="white" />
              </div>
            )}
          </div>

          {/* Profile Info */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
              <div className="min-w-0 flex-1">
                <h1 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-2">
                  {athlete.name}
                </h1>
                
                <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-4">
                  <div className="flex items-center space-x-2">
                    <Icon name="Trophy" size={16} />
                    <span className="font-medium">{athlete.sport}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name="MapPin" size={16} />
                    <span>{athlete.location}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name="Calendar" size={16} />
                    <span>{athlete.age} years old</span>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="flex flex-wrap gap-4 mb-4">
                  <div className="bg-primary/10 px-3 py-1 rounded-full">
                    <span className="text-sm font-medium text-primary">
                      {athlete.experience} years experience
                    </span>
                  </div>
                  <div className="bg-secondary/10 px-3 py-1 rounded-full">
                    <span className="text-sm font-medium text-secondary">
                      {athlete.achievements.length} achievements
                    </span>
                  </div>
                  {athlete.currentRanking && (
                    <div className="bg-warning/10 px-3 py-1 rounded-full">
                      <span className="text-sm font-medium text-warning">
                        Ranked #{athlete.currentRanking}
                      </span>
                    </div>
                  )}
                </div>

                {/* Social Links */}
                {athlete.socialLinks && (
                  <div className="flex items-center space-x-3">
                    {athlete.socialLinks.instagram && (
                      <a
                        href={athlete.socialLinks.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-primary transition-colors duration-200"
                      >
                        <Icon name="Instagram" size={20} />
                      </a>
                    )}
                    {athlete.socialLinks.twitter && (
                      <a
                        href={athlete.socialLinks.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-primary transition-colors duration-200"
                      >
                        <Icon name="Twitter" size={20} />
                      </a>
                    )}
                    {athlete.socialLinks.youtube && (
                      <a
                        href={athlete.socialLinks.youtube}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-primary transition-colors duration-200"
                      >
                        <Icon name="Youtube" size={20} />
                      </a>
                    )}
                  </div>
                )}
              </div>

              {/* CTA Button */}
              <div className="flex-shrink-0">
                <Button
                  variant="default"
                  size="lg"
                  onClick={onSponsorClick}
                  iconName="Heart"
                  iconPosition="left"
                  className="w-full sm:w-auto"
                >
                  Sponsor This Athlete
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AthleteHeader;
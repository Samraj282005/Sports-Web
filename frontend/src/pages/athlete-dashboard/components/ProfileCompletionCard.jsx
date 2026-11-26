import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProfileCompletionCard = ({ completionPercentage = 75, missingFields = [] }) => {
  const getCompletionColor = () => {
    if (completionPercentage >= 90) return 'text-success';
    if (completionPercentage >= 70) return 'text-warning';
    return 'text-error';
  };

  const getProgressBarColor = () => {
    if (completionPercentage >= 90) return 'bg-success';
    if (completionPercentage >= 70) return 'bg-warning';
    return 'bg-error';
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-elevation-1 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
            <Icon name="User" size={20} className="text-primary" />
          </div>
          <div>
            <h3 className="font-heading font-semibold text-foreground">Profile Completion</h3>
            <p className="text-sm text-muted-foreground">Complete your profile to attract sponsors</p>
          </div>
        </div>
        <div className={`text-2xl font-bold ${getCompletionColor()}`}>
          {completionPercentage}%
        </div>
      </div>

      <div className="mb-4">
        <div className="w-full bg-muted rounded-full h-3">
          <div 
            className={`h-3 rounded-full transition-all duration-500 ${getProgressBarColor()}`}
            style={{ width: `${completionPercentage}%` }}
          />
        </div>
      </div>

      {missingFields.length > 0 && (
        <div className="mb-4">
          <p className="text-sm font-medium text-foreground mb-2">Missing Information:</p>
          <div className="space-y-1">
            {missingFields.map((field, index) => (
              <div key={index} className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Icon name="AlertCircle" size={14} className="text-warning" />
                <span>{field}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <Button 
        variant="outline" 
        size="sm" 
        fullWidth
        iconName="Edit"
        iconPosition="left"
      >
        Complete Profile
      </Button>
    </div>
  );
};

export default ProfileCompletionCard;
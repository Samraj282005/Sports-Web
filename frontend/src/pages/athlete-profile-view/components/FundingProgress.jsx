import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FundingProgress = ({ fundingGoals, onDonateClick }) => {
  const calculateProgress = (raised, goal) => {
    return Math.min((raised / goal) * 100, 100);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getDaysRemaining = (endDate) => {
    const today = new Date();
    const end = new Date(endDate);
    const diffTime = end - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(0, diffDays);
  };

  const getUrgencyColor = (daysRemaining, progress) => {
    if (progress >= 100) return 'text-success';
    if (daysRemaining <= 7) return 'text-error';
    if (daysRemaining <= 30) return 'text-warning';
    return 'text-muted-foreground';
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-elevation-1 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Icon name="Target" size={24} className="text-primary" />
          <h2 className="text-xl font-heading font-semibold text-foreground">Funding Goals</h2>
        </div>
        <div className="bg-primary/10 px-3 py-1 rounded-full">
          <span className="text-sm font-medium text-primary">
            {fundingGoals.filter(goal => goal.isActive).length} active
          </span>
        </div>
      </div>

      <div className="space-y-6">
        {fundingGoals.map((goal, index) => {
          const progress = calculateProgress(goal.raised, goal.target);
          const daysRemaining = getDaysRemaining(goal.endDate);
          const urgencyColor = getUrgencyColor(daysRemaining, progress);

          return (
            <div key={index} className="border border-border rounded-lg p-4">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="font-heading font-semibold text-foreground">
                      {goal.title}
                    </h3>
                    {goal.isUrgent && (
                      <div className="bg-error/10 px-2 py-1 rounded-full">
                        <span className="text-xs font-medium text-error">Urgent</span>
                      </div>
                    )}
                    {!goal.isActive && (
                      <div className="bg-muted px-2 py-1 rounded-full">
                        <span className="text-xs font-medium text-muted-foreground">Completed</span>
                      </div>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    {goal.description}
                  </p>
                  
                  {/* Category Tags */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    <div className="bg-secondary/10 px-2 py-1 rounded-full">
                      <span className="text-xs font-medium text-secondary">
                        {goal.category}
                      </span>
                    </div>
                    {goal.tags && goal.tags.map((tag, tagIndex) => (
                      <div key={tagIndex} className="bg-muted/50 px-2 py-1 rounded-full">
                        <span className="text-xs text-muted-foreground">{tag}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {goal.isActive && (
                  <Button
                    variant="default"
                    size="sm"
                    onClick={() => onDonateClick(goal)}
                    iconName="Heart"
                    iconPosition="left"
                    className="flex-shrink-0"
                  >
                    Donate Now
                  </Button>
                )}
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-foreground">
                    {formatCurrency(goal.raised)} raised
                  </span>
                  <span className="text-sm text-muted-foreground">
                    of {formatCurrency(goal.target)} goal
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      progress >= 100 ? 'bg-success' :
                      progress >= 75 ? 'bg-primary' :
                      progress >= 50 ? 'bg-warning' : 'bg-secondary'
                    }`}
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <div className="flex items-center justify-between mt-2 text-xs">
                  <span className="text-muted-foreground">
                    {Math.round(progress)}% funded
                  </span>
                  <span className={urgencyColor}>
                    {daysRemaining > 0 ? `${daysRemaining} days left` : 'Campaign ended'}
                  </span>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-1 mb-1">
                    <Icon name="Users" size={14} className="text-muted-foreground" />
                    <span className="text-sm font-medium text-foreground">
                      {goal.backers || 0}
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground">Supporters</span>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-1 mb-1">
                    <Icon name="TrendingUp" size={14} className="text-muted-foreground" />
                    <span className="text-sm font-medium text-foreground">
                      {formatCurrency(goal.averageDonation || 0)}
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground">Avg. Donation</span>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-1 mb-1">
                    <Icon name="Calendar" size={14} className="text-muted-foreground" />
                    <span className="text-sm font-medium text-foreground">
                      {new Date(goal.startDate).toLocaleDateString()}
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground">Started</span>
                </div>
              </div>

              {/* Recent Contributors */}
              {goal.recentContributors && goal.recentContributors.length > 0 && (
                <div className="mt-4 pt-4 border-t border-border">
                  <h4 className="text-sm font-medium text-foreground mb-2">Recent Supporters</h4>
                  <div className="flex items-center space-x-2">
                    {goal.recentContributors.slice(0, 5).map((contributor, contributorIndex) => (
                      <div
                        key={contributorIndex}
                        className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-xs font-medium text-primary"
                        title={contributor.name}
                      >
                        {contributor.name.charAt(0).toUpperCase()}
                      </div>
                    ))}
                    {goal.recentContributors.length > 5 && (
                      <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center text-xs text-muted-foreground">
                        +{goal.recentContributors.length - 5}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {fundingGoals.length === 0 && (
        <div className="text-center py-8">
          <Icon name="Target" size={48} className="text-muted-foreground/50 mx-auto mb-4" />
          <p className="text-muted-foreground">No funding goals set yet</p>
        </div>
      )}
    </div>
  );
};

export default FundingProgress;
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const InjuryFundRequestCard = ({ activeFunds = [] }) => {
  const navigate = useNavigate();

  const mockActiveFunds = [
    {
      id: 1,
      title: "ACL Surgery Recovery Fund",
      goalAmount: 15000,
      raisedAmount: 8750,
      status: "active",
      daysLeft: 45,
      donorCount: 23,
      createdDate: "2024-12-15"
    },
    {
      id: 2,
      title: "Olympic Training Equipment",
      goalAmount: 5000,
      raisedAmount: 3200,
      status: "active",
      daysLeft: 22,
      donorCount: 15,
      createdDate: "2024-12-20"
    }
  ];

  const currentFunds = activeFunds.length > 0 ? activeFunds : mockActiveFunds;

  const handleCreateRequest = () => {
    navigate('/injury-fund-request-form');
  };

  const getProgressPercentage = (raised, goal) => {
    return Math.min((raised / goal) * 100, 100);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'text-success';
      case 'pending':
        return 'text-warning';
      case 'completed':
        return 'text-primary';
      default:
        return 'text-muted-foreground';
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-elevation-1 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-error/10 rounded-full flex items-center justify-center">
            <Icon name="Heart" size={20} className="text-error" />
          </div>
          <div>
            <h3 className="font-heading font-semibold text-foreground">Injury Fund Requests</h3>
            <p className="text-sm text-muted-foreground">Manage your funding campaigns</p>
          </div>
        </div>
        <Button
          variant="default"
          size="sm"
          onClick={handleCreateRequest}
          iconName="Plus"
          iconPosition="left"
        >
          Create Request
        </Button>
      </div>

      {currentFunds.length === 0 ? (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-muted/50 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Heart" size={24} className="text-muted-foreground" />
          </div>
          <h4 className="font-medium text-foreground mb-2">No Active Fund Requests</h4>
          <p className="text-sm text-muted-foreground mb-4">
            Create your first injury fund request to get support from the community
          </p>
          <Button
            variant="outline"
            onClick={handleCreateRequest}
            iconName="Plus"
            iconPosition="left"
          >
            Create Your First Request
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {currentFunds.map((fund) => (
            <div key={fund.id} className="border border-border rounded-lg p-4 hover:bg-accent/50 transition-colors duration-200">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h4 className="font-medium text-foreground mb-1">{fund.title}</h4>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <span className={`capitalize ${getStatusColor(fund.status)}`}>
                      {fund.status}
                    </span>
                    <span>{fund.donorCount} donors</span>
                    <span>{fund.daysLeft} days left</span>
                  </div>
                </div>
                <Button variant="ghost" size="icon">
                  <Icon name="MoreVertical" size={16} />
                </Button>
              </div>

              <div className="mb-3">
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="font-medium text-foreground">
                    ${fund.raisedAmount.toLocaleString()} / ${fund.goalAmount.toLocaleString()}
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="bg-success h-2 rounded-full transition-all duration-500"
                    style={{ width: `${getProgressPercentage(fund.raisedAmount, fund.goalAmount)}%` }}
                  />
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  {getProgressPercentage(fund.raisedAmount, fund.goalAmount).toFixed(1)}% funded
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-xs text-muted-foreground">
                  Created: {new Date(fund.createdDate).toLocaleDateString()}
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm">
                    <Icon name="Eye" size={14} />
                    View
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Icon name="Share2" size={14} />
                    Share
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default InjuryFundRequestCard;
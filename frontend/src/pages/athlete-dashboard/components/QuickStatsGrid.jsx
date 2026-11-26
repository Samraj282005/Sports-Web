import React from 'react';
import Icon from '../../../components/AppIcon';

const QuickStatsGrid = ({ stats = {} }) => {
  const defaultStats = {
    totalSponsorship: 2450,
    activeFunds: 2,
    profileViews: 1247,
    newMessages: 5
  };

  const currentStats = { ...defaultStats, ...stats };

  const statItems = [
    {
      id: 'sponsorship',
      label: 'Total Sponsorship',
      value: `$${currentStats.totalSponsorship.toLocaleString()}`,
      icon: 'DollarSign',
      color: 'text-success',
      bgColor: 'bg-success/10',
      change: '+12%',
      changeType: 'positive'
    },
    {
      id: 'funds',
      label: 'Active Funds',
      value: currentStats.activeFunds,
      icon: 'Heart',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      change: '+1',
      changeType: 'positive'
    },
    {
      id: 'views',
      label: 'Profile Views',
      value: currentStats.profileViews.toLocaleString(),
      icon: 'Eye',
      color: 'text-warning',
      bgColor: 'bg-warning/10',
      change: '+23%',
      changeType: 'positive'
    },
    {
      id: 'messages',
      label: 'New Messages',
      value: currentStats.newMessages,
      icon: 'MessageCircle',
      color: 'text-secondary',
      bgColor: 'bg-secondary/10',
      change: '+3',
      changeType: 'positive'
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {statItems.map((stat) => (
        <div key={stat.id} className="bg-card rounded-lg border border-border shadow-elevation-1 p-4">
          <div className="flex items-center justify-between mb-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${stat.bgColor}`}>
              <Icon name={stat.icon} size={20} className={stat.color} />
            </div>
            {stat.change && (
              <div className={`text-xs font-medium ${
                stat.changeType === 'positive' ? 'text-success' : 'text-error'
              }`}>
                {stat.change}
              </div>
            )}
          </div>
          
          <div className="space-y-1">
            <div className="text-2xl font-bold text-foreground">{stat.value}</div>
            <div className="text-sm text-muted-foreground">{stat.label}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuickStatsGrid;
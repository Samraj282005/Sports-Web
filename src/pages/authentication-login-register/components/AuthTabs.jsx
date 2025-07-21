import React from 'react';
import Icon from '../../../components/AppIcon';

const AuthTabs = ({ activeTab, onTabChange, className = '' }) => {
  const tabs = [
    {
      id: 'login',
      label: 'Sign In',
      icon: 'LogIn',
      description: 'Access your account'
    },
    {
      id: 'register',
      label: 'Sign Up',
      icon: 'UserPlus',
      description: 'Create new account'
    }
  ];

  return (
    <div className={`flex bg-muted/30 rounded-lg p-1 ${className}`}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 rounded-md text-sm font-medium transition-all duration-200 ${
            activeTab === tab.id
              ? 'bg-card text-primary shadow-elevation-1'
              : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
          }`}
        >
          <Icon 
            name={tab.icon} 
            size={16} 
            className={activeTab === tab.id ? 'text-primary' : 'text-muted-foreground'} 
          />
          <div className="text-left">
            <div className="font-medium">{tab.label}</div>
            <div className="text-xs opacity-75 hidden sm:block">{tab.description}</div>
          </div>
        </button>
      ))}
    </div>
  );
};

export default AuthTabs;
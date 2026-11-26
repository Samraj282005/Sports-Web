import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const ActiveFundsTab = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [selectedFund, setSelectedFund] = useState(null);
  const [disbursementAmount, setDisbursementAmount] = useState('');

  const activeFunds = [
    {
      id: 1,
      athleteName: "Sarah Johnson",
      athletePhoto: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face",
      sport: "Track & Field",
      fundType: "Injury Recovery",
      goalAmount: 15000,
      raisedAmount: 8500,
      donorCount: 23,
      status: "active",
      urgency: "high",
      medicalDocuments: ["MRI Report", "Doctor\'s Note", "Treatment Plan"],
      lastUpdate: "2025-01-20",
      estimatedCompletion: "2025-03-15",
      description: "ACL reconstruction surgery and rehabilitation costs for upcoming championship season."
    },
    {
      id: 2,
      athleteName: "Marcus Rodriguez",
      athletePhoto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
      sport: "Basketball",
      fundType: "Training Equipment",
      goalAmount: 25000,
      raisedAmount: 18750,
      donorCount: 45,
      status: "active",
      urgency: "medium",
      medicalDocuments: [],
      lastUpdate: "2025-01-19",
      estimatedCompletion: "2025-02-28",
      description: "Professional training equipment and facility access for college preparation."
    },
    {
      id: 3,
      athleteName: "Emily Chen",
      athletePhoto: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
      sport: "Swimming",
      fundType: "Competition Travel",
      goalAmount: 12000,
      raisedAmount: 11200,
      donorCount: 31,
      status: "near_complete",
      urgency: "low",
      medicalDocuments: [],
      lastUpdate: "2025-01-18",
      estimatedCompletion: "2025-01-25",
      description: "Travel expenses for national championships and international competitions."
    },
    {
      id: 4,
      athleteName: "David Thompson",
      athletePhoto: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
      sport: "Soccer",
      fundType: "Injury Recovery",
      goalAmount: 18000,
      raisedAmount: 4200,
      donorCount: 12,
      status: "struggling",
      urgency: "high",
      medicalDocuments: ["X-Ray Results", "Physical Therapy Plan"],
      lastUpdate: "2025-01-17",
      estimatedCompletion: "2025-04-30",
      description: "Ankle surgery and extensive rehabilitation for professional career recovery."
    }
  ];

  const statusOptions = [
    { value: '', label: 'All Statuses' },
    { value: 'active', label: 'Active' },
    { value: 'near_complete', label: 'Near Complete' },
    { value: 'struggling', label: 'Struggling' },
    { value: 'completed', label: 'Completed' }
  ];

  const filteredFunds = activeFunds.filter(fund => {
    const matchesSearch = fund.athleteName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         fund.sport.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         fund.fundType.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !filterStatus || fund.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-primary bg-primary/10';
      case 'near_complete': return 'text-success bg-success/10';
      case 'struggling': return 'text-error bg-error/10';
      case 'completed': return 'text-muted-foreground bg-muted';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'high': return 'text-error';
      case 'medium': return 'text-warning';
      case 'low': return 'text-success';
      default: return 'text-muted-foreground';
    }
  };

  const getProgressPercentage = (raised, goal) => {
    return Math.min((raised / goal) * 100, 100);
  };

  const handleDisbursement = (fundId) => {
    setSelectedFund(fundId);
  };

  const confirmDisbursement = () => {
    console.log(`Disbursing $${disbursementAmount} to fund ${selectedFund}`);
    setSelectedFund(null);
    setDisbursementAmount('');
  };

  return (
    <div className="space-y-6">
      {/* Filters and Search */}
      <div className="bg-card rounded-lg border border-border p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            type="search"
            placeholder="Search funds..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          
          <Select
            placeholder="Filter by status"
            options={statusOptions}
            value={filterStatus}
            onChange={setFilterStatus}
          />
          
          <Button variant="outline" fullWidth>
            <Icon name="Download" size={16} />
            Export Report
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-card rounded-lg border border-border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Active Funds</p>
              <p className="text-2xl font-bold text-foreground">{activeFunds.length}</p>
            </div>
            <Icon name="TrendingUp" size={24} className="text-primary" />
          </div>
        </div>
        
        <div className="bg-card rounded-lg border border-border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Raised</p>
              <p className="text-2xl font-bold text-foreground">
                ${activeFunds.reduce((sum, fund) => sum + fund.raisedAmount, 0).toLocaleString()}
              </p>
            </div>
            <Icon name="DollarSign" size={24} className="text-success" />
          </div>
        </div>
        
        <div className="bg-card rounded-lg border border-border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">High Priority</p>
              <p className="text-2xl font-bold text-error">
                {activeFunds.filter(fund => fund.urgency === 'high').length}
              </p>
            </div>
            <Icon name="AlertTriangle" size={24} className="text-error" />
          </div>
        </div>
        
        <div className="bg-card rounded-lg border border-border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Near Complete</p>
              <p className="text-2xl font-bold text-success">
                {activeFunds.filter(fund => fund.status === 'near_complete').length}
              </p>
            </div>
            <Icon name="CheckCircle" size={24} className="text-success" />
          </div>
        </div>
      </div>

      {/* Funds List - Desktop */}
      <div className="hidden lg:block space-y-4">
        {filteredFunds.map((fund) => (
          <div key={fund.id} className="bg-card rounded-lg border border-border p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-4">
                <Image
                  src={fund.athletePhoto}
                  alt={fund.athleteName}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-lg font-semibold text-foreground">{fund.athleteName}</h3>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <span>{fund.sport}</span>
                    <span>•</span>
                    <span>{fund.fundType}</span>
                  </div>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium ${getStatusColor(fund.status)}`}>
                      {fund.status.replace('_', ' ')}
                    </span>
                    <Icon 
                      name="AlertCircle" 
                      size={14} 
                      className={`${getUrgencyColor(fund.urgency)}`} 
                    />
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-2xl font-bold text-foreground">
                  ${fund.raisedAmount.toLocaleString()}
                </div>
                <div className="text-sm text-muted-foreground">
                  of ${fund.goalAmount.toLocaleString()} goal
                </div>
                <div className="text-sm text-muted-foreground">
                  {fund.donorCount} donors
                </div>
              </div>
            </div>
            
            <div className="mb-4">
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-muted-foreground">Progress</span>
                <span className="font-medium text-foreground">
                  {getProgressPercentage(fund.raisedAmount, fund.goalAmount).toFixed(1)}%
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className="bg-primary rounded-full h-2 transition-all duration-300"
                  style={{ width: `${getProgressPercentage(fund.raisedAmount, fund.goalAmount)}%` }}
                />
              </div>
            </div>
            
            <p className="text-sm text-muted-foreground mb-4">{fund.description}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <div className="text-xs text-muted-foreground">Last Update</div>
                <div className="text-sm font-medium text-foreground">
                  {new Date(fund.lastUpdate).toLocaleDateString()}
                </div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Est. Completion</div>
                <div className="text-sm font-medium text-foreground">
                  {new Date(fund.estimatedCompletion).toLocaleDateString()}
                </div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Medical Docs</div>
                <div className="text-sm font-medium text-foreground">
                  {fund.medicalDocuments.length} files
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between pt-4 border-t border-border">
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <Icon name="Eye" size={16} />
                  View Details
                </Button>
                {fund.medicalDocuments.length > 0 && (
                  <Button variant="outline" size="sm">
                    <Icon name="FileText" size={16} />
                    Review Docs
                  </Button>
                )}
              </div>
              
              <div className="flex items-center space-x-2">
                <Button 
                  variant="success" 
                  size="sm"
                  onClick={() => handleDisbursement(fund.id)}
                >
                  <Icon name="Send" size={16} />
                  Disburse Funds
                </Button>
                <Button variant="outline" size="sm">
                  <Icon name="MessageSquare" size={16} />
                  Contact Athlete
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Funds Cards - Mobile */}
      <div className="lg:hidden space-y-4">
        {filteredFunds.map((fund) => (
          <div key={fund.id} className="bg-card rounded-lg border border-border p-4">
            <div className="flex items-center space-x-3 mb-3">
              <Image
                src={fund.athletePhoto}
                alt={fund.athleteName}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="flex-1">
                <div className="font-medium text-foreground">{fund.athleteName}</div>
                <div className="text-sm text-muted-foreground">{fund.sport} • {fund.fundType}</div>
              </div>
              <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium ${getStatusColor(fund.status)}`}>
                {fund.status.replace('_', ' ')}
              </span>
            </div>
            
            <div className="mb-3">
              <div className="flex items-center justify-between text-sm mb-1">
                <span className="font-medium text-foreground">
                  ${fund.raisedAmount.toLocaleString()} / ${fund.goalAmount.toLocaleString()}
                </span>
                <span className="text-muted-foreground">
                  {getProgressPercentage(fund.raisedAmount, fund.goalAmount).toFixed(1)}%
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className="bg-primary rounded-full h-2 transition-all duration-300"
                  style={{ width: `${getProgressPercentage(fund.raisedAmount, fund.goalAmount)}%` }}
                />
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                {fund.donorCount} donors
              </span>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <Icon name="Eye" size={14} />
                </Button>
                <Button 
                  variant="success" 
                  size="sm"
                  onClick={() => handleDisbursement(fund.id)}
                >
                  <Icon name="Send" size={14} />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Disbursement Modal */}
      {selectedFund && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="w-full max-w-md bg-card rounded-lg shadow-elevation-3">
            <div className="p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Icon name="Send" size={24} className="text-success" />
                <h3 className="text-lg font-semibold text-foreground">Disburse Funds</h3>
              </div>
              
              <p className="text-muted-foreground mb-4">
                Enter the amount to disburse to the athlete:
              </p>
              
              <Input
                type="number"
                placeholder="Enter amount..."
                value={disbursementAmount}
                onChange={(e) => setDisbursementAmount(e.target.value)}
                className="mb-4"
              />
              
              <div className="flex items-center space-x-3">
                <Button
                  variant="success"
                  onClick={confirmDisbursement}
                  disabled={!disbursementAmount || parseFloat(disbursementAmount) <= 0}
                >
                  Confirm Disbursement
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setSelectedFund(null)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActiveFundsTab;
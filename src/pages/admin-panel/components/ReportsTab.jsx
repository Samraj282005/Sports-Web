import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const ReportsTab = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedMetric, setSelectedMetric] = useState('funding');

  const periodOptions = [
    { value: 'week', label: 'Last 7 Days' },
    { value: 'month', label: 'Last 30 Days' },
    { value: 'quarter', label: 'Last 3 Months' },
    { value: 'year', label: 'Last 12 Months' }
  ];

  const metricOptions = [
    { value: 'funding', label: 'Funding Metrics' },
    { value: 'users', label: 'User Growth' },
    { value: 'engagement', label: 'Platform Engagement' },
    { value: 'financial', label: 'Financial Overview' }
  ];

  // Mock data for charts
  const fundingData = [
    { name: 'Jan', raised: 45000, goal: 60000, athletes: 12 },
    { name: 'Feb', raised: 52000, goal: 65000, athletes: 15 },
    { name: 'Mar', raised: 48000, goal: 70000, athletes: 18 },
    { name: 'Apr', raised: 61000, goal: 75000, athletes: 22 },
    { name: 'May', raised: 58000, goal: 80000, athletes: 25 },
    { name: 'Jun', raised: 67000, goal: 85000, athletes: 28 }
  ];

  const userGrowthData = [
    { name: 'Jan', athletes: 45, sponsors: 23, total: 68 },
    { name: 'Feb', athletes: 52, sponsors: 28, total: 80 },
    { name: 'Mar', athletes: 61, sponsors: 34, total: 95 },
    { name: 'Apr', athletes: 68, sponsors: 41, total: 109 },
    { name: 'May', athletes: 75, sponsors: 47, total: 122 },
    { name: 'Jun', athletes: 83, sponsors: 52, total: 135 }
  ];

  const sportDistribution = [
    { name: 'Basketball', value: 28, color: '#2563EB' },
    { name: 'Soccer', value: 24, color: '#059669' },
    { name: 'Track & Field', value: 18, color: '#DC2626' },
    { name: 'Swimming', value: 15, color: '#F59E0B' },
    { name: 'Tennis', value: 10, color: '#7C3AED' },
    { name: 'Other', value: 5, color: '#6B7280' }
  ];

  const platformMetrics = [
    {
      title: "Total Platform Revenue",
      value: "$342,500",
      change: "+12.5%",
      trend: "up",
      icon: "DollarSign",
      color: "text-success"
    },
    {
      title: "Active Fundraising Campaigns",
      value: "28",
      change: "+8.2%",
      trend: "up",
      icon: "TrendingUp",
      color: "text-primary"
    },
    {
      title: "Success Rate",
      value: "87.3%",
      change: "+3.1%",
      trend: "up",
      icon: "Target",
      color: "text-success"
    },
    {
      title: "Average Donation",
      value: "$156",
      change: "-2.4%",
      trend: "down",
      icon: "Heart",
      color: "text-warning"
    }
  ];

  const recentTransactions = [
    {
      id: 1,
      athlete: "Sarah Johnson",
      sponsor: "John Smith",
      amount: 500,
      type: "donation",
      date: "2025-01-21",
      status: "completed"
    },
    {
      id: 2,
      athlete: "Marcus Rodriguez",
      sponsor: "TechCorp Inc.",
      amount: 2500,
      type: "sponsorship",
      date: "2025-01-20",
      status: "completed"
    },
    {
      id: 3,
      athlete: "Emily Chen",
      sponsor: "Sports Foundation",
      amount: 1000,
      type: "grant",
      date: "2025-01-19",
      status: "pending"
    },
    {
      id: 4,
      athlete: "David Thompson",
      sponsor: "Anonymous",
      amount: 250,
      type: "donation",
      date: "2025-01-18",
      status: "completed"
    }
  ];

  const exportReport = (format) => {
    console.log(`Exporting report in ${format} format`);
  };

  return (
    <div className="space-y-6">
      {/* Report Controls */}
      <div className="bg-card rounded-lg border border-border p-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
            <Select
              placeholder="Select period"
              options={periodOptions}
              value={selectedPeriod}
              onChange={setSelectedPeriod}
            />
            
            <Select
              placeholder="Select metric"
              options={metricOptions}
              value={selectedMetric}
              onChange={setSelectedMetric}
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={() => exportReport('pdf')}>
              <Icon name="FileText" size={16} />
              Export PDF
            </Button>
            <Button variant="outline" size="sm" onClick={() => exportReport('excel')}>
              <Icon name="Download" size={16} />
              Export Excel
            </Button>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {platformMetrics.map((metric, index) => (
          <div key={index} className="bg-card rounded-lg border border-border p-4">
            <div className="flex items-center justify-between mb-2">
              <Icon name={metric.icon} size={24} className={metric.color} />
              <span className={`text-sm font-medium ${
                metric.trend === 'up' ? 'text-success' : 'text-error'
              }`}>
                {metric.change}
              </span>
            </div>
            <div className="text-2xl font-bold text-foreground mb-1">{metric.value}</div>
            <div className="text-sm text-muted-foreground">{metric.title}</div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Funding Progress Chart */}
        <div className="bg-card rounded-lg border border-border p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">Funding Progress</h3>
            <Icon name="BarChart3" size={20} className="text-muted-foreground" />
          </div>
          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={fundingData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="name" stroke="var(--color-muted-foreground)" />
                <YAxis stroke="var(--color-muted-foreground)" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'var(--color-card)', 
                    border: '1px solid var(--color-border)',
                    borderRadius: '8px'
                  }} 
                />
                <Bar dataKey="raised" fill="var(--color-primary)" name="Amount Raised" />
                <Bar dataKey="goal" fill="var(--color-muted)" name="Goal Amount" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* User Growth Chart */}
        <div className="bg-card rounded-lg border border-border p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">User Growth</h3>
            <Icon name="TrendingUp" size={20} className="text-muted-foreground" />
          </div>
          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={userGrowthData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="name" stroke="var(--color-muted-foreground)" />
                <YAxis stroke="var(--color-muted-foreground)" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'var(--color-card)', 
                    border: '1px solid var(--color-border)',
                    borderRadius: '8px'
                  }} 
                />
                <Line type="monotone" dataKey="athletes" stroke="var(--color-primary)" name="Athletes" strokeWidth={2} />
                <Line type="monotone" dataKey="sponsors" stroke="var(--color-secondary)" name="Sponsors" strokeWidth={2} />
                <Line type="monotone" dataKey="total" stroke="var(--color-warning)" name="Total Users" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Sport Distribution */}
        <div className="bg-card rounded-lg border border-border p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">Sport Distribution</h3>
            <Icon name="PieChart" size={20} className="text-muted-foreground" />
          </div>
          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={sportDistribution}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {sportDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="bg-card rounded-lg border border-border p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">Recent Transactions</h3>
            <Icon name="Activity" size={20} className="text-muted-foreground" />
          </div>
          <div className="space-y-3">
            {recentTransactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                <div className="flex-1">
                  <div className="font-medium text-foreground text-sm">{transaction.athlete}</div>
                  <div className="text-xs text-muted-foreground">
                    from {transaction.sponsor} • {new Date(transaction.date).toLocaleDateString()}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium text-foreground">${transaction.amount}</div>
                  <div className={`text-xs capitalize ${
                    transaction.status === 'completed' ? 'text-success' : 'text-warning'
                  }`}>
                    {transaction.status}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Button variant="ghost" size="sm" fullWidth className="mt-4">
            View All Transactions
          </Button>
        </div>
      </div>

      {/* Summary Report */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Platform Summary</h3>
          <Button variant="outline" size="sm">
            <Icon name="RefreshCw" size={16} />
            Refresh Data
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">135</div>
            <div className="text-sm text-muted-foreground">Total Active Users</div>
            <div className="text-xs text-success mt-1">+15% from last month</div>
          </div>
          
          <div className="text-center">
            <div className="text-3xl font-bold text-success mb-2">$342.5K</div>
            <div className="text-sm text-muted-foreground">Total Funds Raised</div>
            <div className="text-xs text-success mt-1">+23% from last month</div>
          </div>
          
          <div className="text-center">
            <div className="text-3xl font-bold text-warning mb-2">87.3%</div>
            <div className="text-sm text-muted-foreground">Success Rate</div>
            <div className="text-xs text-success mt-1">+3.1% from last month</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsTab;
import React from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const FinancialDetailsStep = ({ formData, onUpdate, errors }) => {
  const suggestedAmounts = [
    { value: '1000', label: '$1,000', description: 'Basic treatment and therapy' },
    { value: '2500', label: '$2,500', description: 'Moderate treatment plan' },
    { value: '5000', label: '$5,000', description: 'Comprehensive recovery' },
    { value: '10000', label: '$10,000', description: 'Major surgery and rehab' },
    { value: 'custom', label: 'Custom Amount', description: 'Enter your specific amount' }
  ];

  const expenseCategories = [
    { id: 'medical', label: 'Medical Treatment', description: 'Doctor visits, consultations' },
    { id: 'surgery', label: 'Surgery', description: 'Surgical procedures and hospital costs' },
    { id: 'therapy', label: 'Physical Therapy', description: 'Rehabilitation and therapy sessions' },
    { id: 'medication', label: 'Medication', description: 'Prescribed drugs and supplements' },
    { id: 'equipment', label: 'Medical Equipment', description: 'Braces, crutches, mobility aids' },
    { id: 'imaging', label: 'Imaging & Tests', description: 'MRI, X-rays, diagnostic tests' },
    { id: 'travel', label: 'Travel Expenses', description: 'Transportation to medical facilities' },
    { id: 'other', label: 'Other Expenses', description: 'Additional injury-related costs' }
  ];

  const timelineOptions = [
    { value: '1-month', label: '1 Month', description: 'Immediate treatment needed' },
    { value: '3-months', label: '3 Months', description: 'Short-term recovery plan' },
    { value: '6-months', label: '6 Months', description: 'Medium-term rehabilitation' },
    { value: '12-months', label: '12 Months', description: 'Long-term recovery process' },
    { value: '18-months', label: '18+ Months', description: 'Extended rehabilitation period' }
  ];

  const handleInputChange = (field, value) => {
    onUpdate({ [field]: value });
  };

  const handleExpenseChange = (categoryId, field, value) => {
    const expenses = formData.expenseBreakdown || {};
    const updatedExpenses = {
      ...expenses,
      [categoryId]: {
        ...expenses[categoryId],
        [field]: value
      }
    };
    onUpdate({ expenseBreakdown: updatedExpenses });
  };

  const handleCategoryToggle = (categoryId, enabled) => {
    const expenses = formData.expenseBreakdown || {};
    if (enabled) {
      const updatedExpenses = {
        ...expenses,
        [categoryId]: { enabled: true, amount: '', description: '' }
      };
      onUpdate({ expenseBreakdown: updatedExpenses });
    } else {
      const updatedExpenses = { ...expenses };
      delete updatedExpenses[categoryId];
      onUpdate({ expenseBreakdown: updatedExpenses });
    }
  };

  const calculateTotal = () => {
    const expenses = formData.expenseBreakdown || {};
    return Object.values(expenses).reduce((total, expense) => {
      const amount = parseFloat(expense.amount) || 0;
      return total + amount;
    }, 0);
  };

  const totalExpenses = calculateTotal();

  return (
    <div className="space-y-6">
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center space-x-2 mb-4">
          <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
            <span className="text-primary font-bold text-sm">2</span>
          </div>
          <h3 className="font-heading font-semibold text-foreground">Financial Details</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <Select
              label="Suggested Funding Amount"
              description="Choose a suggested amount or select custom"
              options={suggestedAmounts}
              value={formData.suggestedAmount || ''}
              onChange={(value) => handleInputChange('suggestedAmount', value)}
              error={errors.suggestedAmount}
            />
          </div>

          <Input
            label="Goal Amount (USD)"
            type="number"
            placeholder="5000"
            description="Total amount needed for your recovery"
            value={formData.goalAmount || ''}
            onChange={(e) => handleInputChange('goalAmount', e.target.value)}
            error={errors.goalAmount}
            required
            min="100"
            max="50000"
          />

          <Select
            label="Timeline for Fund Usage"
            description="When do you need these funds?"
            options={timelineOptions}
            value={formData.timeline || ''}
            onChange={(value) => handleInputChange('timeline', value)}
            error={errors.timeline}
            required
          />
        </div>

        <div className="mt-8">
          <h4 className="font-medium text-foreground mb-4 flex items-center space-x-2">
            <Icon name="Calculator" size={18} className="text-primary" />
            <span>Expense Breakdown</span>
          </h4>
          
          <div className="space-y-4">
            {expenseCategories.map((category) => {
              const isEnabled = formData.expenseBreakdown?.[category.id]?.enabled || false;
              const expense = formData.expenseBreakdown?.[category.id] || {};
              
              return (
                <div key={category.id} className="border border-border rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      checked={isEnabled}
                      onChange={(e) => handleCategoryToggle(category.id, e.target.checked)}
                    />
                    <div className="flex-1 space-y-3">
                      <div>
                        <div className="font-medium text-foreground">{category.label}</div>
                        <div className="text-sm text-muted-foreground">{category.description}</div>
                      </div>
                      
                      {isEnabled && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <Input
                            label="Amount (USD)"
                            type="number"
                            placeholder="0"
                            value={expense.amount || ''}
                            onChange={(e) => handleExpenseChange(category.id, 'amount', e.target.value)}
                            min="0"
                          />
                          <Input
                            label="Description"
                            type="text"
                            placeholder="Brief description of this expense..."
                            value={expense.description || ''}
                            onChange={(e) => handleExpenseChange(category.id, 'description', e.target.value)}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {totalExpenses > 0 && (
            <div className="mt-6 p-4 bg-primary/5 border border-primary/20 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="font-medium text-foreground">Total Estimated Expenses:</span>
                <span className="text-xl font-bold text-primary">${totalExpenses.toLocaleString()}</span>
              </div>
              {formData.goalAmount && totalExpenses !== parseFloat(formData.goalAmount) && (
                <div className="mt-2 text-sm text-muted-foreground">
                  {totalExpenses > parseFloat(formData.goalAmount) 
                    ? `Expenses exceed goal by $${(totalExpenses - parseFloat(formData.goalAmount)).toLocaleString()}`
                    : `Goal exceeds expenses by $${(parseFloat(formData.goalAmount) - totalExpenses).toLocaleString()}`
                  }
                </div>
              )}
            </div>
          )}
        </div>

        <div className="mt-6">
          <Input
            label="Additional Financial Information"
            type="text"
            placeholder="Any other financial details or circumstances..."
            description="Optional: Provide any additional context about your financial situation"
            value={formData.additionalFinancialInfo || ''}
            onChange={(e) => handleInputChange('additionalFinancialInfo', e.target.value)}
            maxLength={300}
          />
        </div>
      </div>
    </div>
  );
};

export default FinancialDetailsStep;
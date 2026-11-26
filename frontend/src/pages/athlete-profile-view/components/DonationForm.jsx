import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const DonationForm = ({ athlete, selectedGoal, onClose, onDonationComplete }) => {
  const [donationData, setDonationData] = useState({
    amount: '',
    customAmount: '',
    message: '',
    isAnonymous: false,
    recurringMonthly: false,
    email: '',
    name: ''
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const presetAmounts = [25, 50, 100, 250, 500, 1000];

  const handleAmountSelect = (amount) => {
    setDonationData(prev => ({
      ...prev,
      amount: amount.toString(),
      customAmount: ''
    }));
    if (errors.amount) {
      setErrors(prev => ({ ...prev, amount: '' }));
    }
  };

  const handleCustomAmountChange = (value) => {
    setDonationData(prev => ({
      ...prev,
      customAmount: value,
      amount: ''
    }));
    if (errors.amount) {
      setErrors(prev => ({ ...prev, amount: '' }));
    }
  };

  const handleInputChange = (field, value) => {
    setDonationData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    const finalAmount = donationData.customAmount || donationData.amount;
    if (!finalAmount) {
      newErrors.amount = 'Please select or enter a donation amount';
    } else if (parseFloat(finalAmount) < 5) {
      newErrors.amount = 'Minimum donation amount is $5';
    } else if (parseFloat(finalAmount) > 10000) {
      newErrors.amount = 'Maximum donation amount is $10,000';
    }

    if (!donationData.isAnonymous) {
      if (!donationData.name.trim()) {
        newErrors.name = 'Name is required for non-anonymous donations';
      }
      if (!donationData.email.trim()) {
        newErrors.email = 'Email is required for non-anonymous donations';
      } else if (!/\S+@\S+\.\S+/.test(donationData.email)) {
        newErrors.email = 'Please enter a valid email address';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    
    try {
      // Mock payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const finalAmount = parseFloat(donationData.customAmount || donationData.amount);
      
      onDonationComplete?.({
        amount: finalAmount,
        goal: selectedGoal,
        athlete: athlete,
        message: donationData.message,
        isAnonymous: donationData.isAnonymous,
        recurringMonthly: donationData.recurringMonthly,
        donor: donationData.isAnonymous ? null : {
          name: donationData.name,
          email: donationData.email
        }
      });
      
      onClose?.();
    } catch (error) {
      setErrors({ submit: 'Payment processing failed. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const finalAmount = parseFloat(donationData.customAmount || donationData.amount || 0);

  return (
    <div className="fixed inset-0 z-[1020] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-lg bg-card rounded-lg shadow-elevation-3 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-heading font-semibold text-foreground">
              Support {athlete.name}
            </h2>
            {selectedGoal && (
              <p className="text-sm text-muted-foreground mt-1">
                Contributing to: {selectedGoal.title}
              </p>
            )}
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Amount Selection */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-3">
              Donation Amount
            </label>
            
            {/* Preset Amounts */}
            <div className="grid grid-cols-3 gap-2 mb-4">
              {presetAmounts.map((amount) => (
                <Button
                  key={amount}
                  type="button"
                  variant={donationData.amount === amount.toString() ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleAmountSelect(amount)}
                  className="h-12"
                >
                  {formatCurrency(amount)}
                </Button>
              ))}
            </div>

            {/* Custom Amount */}
            <Input
              type="number"
              placeholder="Enter custom amount"
              value={donationData.customAmount}
              onChange={(e) => handleCustomAmountChange(e.target.value)}
              min="5"
              max="10000"
              step="1"
              error={errors.amount}
            />
          </div>

          {/* Donation Options */}
          <div className="space-y-3">
            <Checkbox
              label="Make this a monthly recurring donation"
              description="Help provide consistent support"
              checked={donationData.recurringMonthly}
              onChange={(e) => handleInputChange('recurringMonthly', e.target.checked)}
            />
            
            <Checkbox
              label="Donate anonymously"
              description="Your name won't be shown publicly"
              checked={donationData.isAnonymous}
              onChange={(e) => handleInputChange('isAnonymous', e.target.checked)}
            />
          </div>

          {/* Donor Information */}
          {!donationData.isAnonymous && (
            <div className="space-y-4">
              <Input
                label="Your Name"
                type="text"
                placeholder="Enter your full name"
                value={donationData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                error={errors.name}
                required
              />
              
              <Input
                label="Email Address"
                type="email"
                placeholder="Enter your email"
                value={donationData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                error={errors.email}
                required
              />
            </div>
          )}

          {/* Message */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Message of Support (Optional)
            </label>
            <textarea
              className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
              rows="3"
              placeholder="Share a message of encouragement..."
              value={donationData.message}
              onChange={(e) => handleInputChange('message', e.target.value)}
              maxLength="500"
            />
            <div className="text-xs text-muted-foreground mt-1">
              {donationData.message.length}/500 characters
            </div>
          </div>

          {/* Summary */}
          {finalAmount > 0 && (
            <div className="bg-muted/30 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Donation Amount:</span>
                <span className="font-medium text-foreground">{formatCurrency(finalAmount)}</span>
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Processing Fee:</span>
                <span className="font-medium text-foreground">{formatCurrency(finalAmount * 0.029)}</span>
              </div>
              <div className="border-t border-border pt-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-foreground">Total:</span>
                  <span className="font-semibold text-lg text-foreground">
                    {formatCurrency(finalAmount + (finalAmount * 0.029))}
                  </span>
                </div>
              </div>
              {donationData.recurringMonthly && (
                <div className="mt-2 text-xs text-muted-foreground">
                  This amount will be charged monthly until you cancel
                </div>
              )}
            </div>
          )}

          {/* Error Message */}
          {errors.submit && (
            <div className="p-3 bg-error/10 border border-error/20 rounded-md">
              <div className="flex items-center space-x-2">
                <Icon name="AlertCircle" size={16} className="text-error" />
                <span className="text-sm text-error">{errors.submit}</span>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            variant="default"
            size="lg"
            fullWidth
            loading={loading}
            iconName="Heart"
            iconPosition="left"
            disabled={finalAmount === 0}
          >
            {loading ? 'Processing...' : `Donate ${finalAmount > 0 ? formatCurrency(finalAmount) : ''}`}
          </Button>

          {/* Trust Indicators */}
          <div className="flex items-center justify-center space-x-4 text-xs text-muted-foreground pt-4 border-t border-border">
            <div className="flex items-center space-x-1">
              <Icon name="Shield" size={12} />
              <span>Secure Payment</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Lock" size={12} />
              <span>SSL Encrypted</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="CheckCircle" size={12} />
              <span>Tax Deductible</span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DonationForm;
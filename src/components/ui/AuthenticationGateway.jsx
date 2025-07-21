import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';
import Input from './Input';
import Select from './Select';

const AuthenticationGateway = ({ 
  isOpen, 
  onClose, 
  onLogin, 
  onRegister, 
  redirectPath = null,
  initialMode = 'login' 
}) => {
  const [mode, setMode] = useState(initialMode);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    role: 'athlete'
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const roleOptions = [
    { value: 'athlete', label: 'Athlete', description: 'Seeking funding and sponsorship' },
    { value: 'sponsor', label: 'Sponsor', description: 'Supporting athletes and causes' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (mode === 'register') {
      if (!formData.name) {
        newErrors.name = 'Name is required';
      }

      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password';
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }

      if (!formData.role) {
        newErrors.role = 'Please select your role';
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
      if (mode === 'login') {
        await onLogin?.(formData.email, formData.password, redirectPath);
      } else {
        await onRegister?.(formData, redirectPath);
      }
    } catch (error) {
      setErrors({ submit: error.message || 'An error occurred' });
    } finally {
      setLoading(false);
    }
  };

  const switchMode = () => {
    setMode(mode === 'login' ? 'register' : 'login');
    setErrors({});
    setFormData({
      email: '',
      password: '',
      confirmPassword: '',
      name: '',
      role: 'athlete'
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[1020] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-md bg-card rounded-lg shadow-elevation-3 animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <Link to="/landing-page" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="Zap" size={20} color="white" />
              </div>
              <span className="font-heading font-bold text-lg text-primary">AthleteFund</span>
            </Link>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-heading font-semibold text-foreground mb-2">
              {mode === 'login' ? 'Welcome Back' : 'Join AthleteFund'}
            </h2>
            <p className="text-muted-foreground">
              {mode === 'login' ?'Sign in to your account to continue' :'Create your account to start your journey'
              }
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'register' && (
              <>
                <Input
                  label="Full Name"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  error={errors.name}
                  required
                />

                <Select
                  label="I am a..."
                  description="Choose your role on the platform"
                  options={roleOptions}
                  value={formData.role}
                  onChange={(value) => handleInputChange('role', value)}
                  error={errors.role}
                  required
                />
              </>
            )}

            <Input
              label="Email Address"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              error={errors.email}
              required
            />

            <Input
              label="Password"
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              error={errors.password}
              required
            />

            {mode === 'register' && (
              <Input
                label="Confirm Password"
                type="password"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                error={errors.confirmPassword}
                required
              />
            )}

            {errors.submit && (
              <div className="p-3 bg-error/10 border border-error/20 rounded-md">
                <div className="flex items-center space-x-2">
                  <Icon name="AlertCircle" size={16} className="text-error" />
                  <span className="text-sm text-error">{errors.submit}</span>
                </div>
              </div>
            )}

            <Button
              type="submit"
              variant="default"
              size="lg"
              fullWidth
              loading={loading}
              iconName={mode === 'login' ? 'LogIn' : 'UserPlus'}
              iconPosition="left"
            >
              {mode === 'login' ? 'Sign In' : 'Create Account'}
            </Button>
          </form>

          {/* Social Login Options */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-card text-muted-foreground">Or continue with</span>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <Button variant="outline" size="sm" fullWidth>
                <Icon name="Mail" size={16} />
                Google
              </Button>
              <Button variant="outline" size="sm" fullWidth>
                <Icon name="Facebook" size={16} />
                Facebook
              </Button>
            </div>
          </div>

          {/* Mode Switch */}
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              {mode === 'login' ? "Don't have an account?" : "Already have an account?"}
              <button
                type="button"
                onClick={switchMode}
                className="ml-1 font-medium text-primary hover:text-primary/80 transition-colors duration-200"
              >
                {mode === 'login' ? 'Sign up' : 'Sign in'}
              </button>
            </p>
          </div>

          {/* Trust Indicators */}
          <div className="mt-6 pt-4 border-t border-border">
            <div className="flex items-center justify-center space-x-4 text-xs text-muted-foreground">
              <div className="flex items-center space-x-1">
                <Icon name="Shield" size={12} />
                <span>Secure</span>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="Lock" size={12} />
                <span>Encrypted</span>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="CheckCircle" size={12} />
                <span>Verified</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthenticationGateway;
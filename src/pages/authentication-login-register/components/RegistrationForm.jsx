import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import RoleSelectionCard from './RoleSelectionCard';

const RegistrationForm = ({ onRegister, loading = false, className = '' }) => {
  const [step, setStep] = useState(1); // 1: Role Selection, 2: Form
  const [selectedRole, setSelectedRole] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '',
    // Athlete specific
    sport: '',
    experienceLevel: '',
    bio: '',
    // Sponsor specific
    sponsorType: '',
    interests: [],
    // Admin specific
    accessCode: '',
    department: '',
    // Common
    agreeToTerms: false,
    agreeToPrivacy: false,
    subscribeNewsletter: true
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const sportOptions = [
    { value: 'football', label: 'Football' },
    { value: 'basketball', label: 'Basketball' },
    { value: 'tennis', label: 'Tennis' },
    { value: 'swimming', label: 'Swimming' },
    { value: 'track-field', label: 'Track & Field' },
    { value: 'soccer', label: 'Soccer' },
    { value: 'baseball', label: 'Baseball' },
    { value: 'volleyball', label: 'Volleyball' },
    { value: 'gymnastics', label: 'Gymnastics' },
    { value: 'other', label: 'Other' }
  ];

  const experienceLevelOptions = [
    { value: 'beginner', label: 'Beginner (0-2 years)' },
    { value: 'intermediate', label: 'Intermediate (3-5 years)' },
    { value: 'advanced', label: 'Advanced (6-10 years)' },
    { value: 'professional', label: 'Professional (10+ years)' }
  ];

  const sponsorTypeOptions = [
    { value: 'individual', label: 'Individual Sponsor' },
    { value: 'corporate', label: 'Corporate Sponsor' },
    { value: 'foundation', label: 'Foundation/Non-profit' }
  ];

  const departmentOptions = [
    { value: 'operations', label: 'Operations' },
    { value: 'finance', label: 'Finance' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'support', label: 'Customer Support' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleRoleSelection = (role) => {
    setSelectedRole(role);
    setFormData(prev => ({ ...prev, role }));
  };

  const proceedToForm = () => {
    if (!selectedRole) {
      setErrors({ role: 'Please select your role to continue' });
      return;
    }
    setErrors({});
    setStep(2);
  };

  const goBackToRoleSelection = () => {
    setStep(1);
    setErrors({});
  };

  const validateForm = () => {
    const newErrors = {};

    // Common validations
    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    // Role-specific validations
    if (selectedRole === 'athlete') {
      if (!formData.sport) {
        newErrors.sport = 'Please select your sport';
      }
      if (!formData.experienceLevel) {
        newErrors.experienceLevel = 'Please select your experience level';
      }
    }

    if (selectedRole === 'sponsor') {
      if (!formData.sponsorType) {
        newErrors.sponsorType = 'Please select sponsor type';
      }
    }

    if (selectedRole === 'admin') {
      if (!formData.accessCode) {
        newErrors.accessCode = 'Access code is required';
      } else if (formData.accessCode !== 'ADMIN2024') {
        newErrors.accessCode = 'Invalid access code';
      }
      if (!formData.department) {
        newErrors.department = 'Please select your department';
      }
    }

    // Terms and privacy
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms of service';
    }

    if (!formData.agreeToPrivacy) {
      newErrors.agreeToPrivacy = 'You must agree to the privacy policy';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    const mockUser = {
      id: `${selectedRole}_${Date.now()}`,
      name: formData.name,
      email: formData.email,
      role: selectedRole,
      avatar: `https://randomuser.me/api/portraits/${selectedRole === 'athlete' ? 'men' : 'women'}/${Math.floor(Math.random() * 50)}.jpg`,
      verified: false,
      joinedDate: new Date(),
      // Role-specific data
      ...(selectedRole === 'athlete' && {
        sport: formData.sport,
        experienceLevel: formData.experienceLevel,
        bio: formData.bio
      }),
      ...(selectedRole === 'sponsor' && {
        sponsorType: formData.sponsorType,
        interests: formData.interests
      }),
      ...(selectedRole === 'admin' && {
        department: formData.department
      })
    };

    try {
      await onRegister?.(mockUser);
      
      // Navigate based on role
      const redirectPaths = {
        athlete: '/athlete-dashboard',
        sponsor: '/athlete-profile-view',
        admin: '/admin-panel'
      };
      
      navigate(redirectPaths[selectedRole] || '/landing-page');
    } catch (error) {
      setErrors({ submit: error.message || 'Registration failed. Please try again.' });
    }
  };

  if (step === 1) {
    return (
      <div className={`space-y-6 ${className}`}>
        <div className="text-center mb-8">
          <h3 className="text-xl font-heading font-semibold text-foreground mb-2">
            Choose Your Role
          </h3>
          <p className="text-muted-foreground">
            Select how you'd like to participate in the AthleteFund community
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-3">
          <RoleSelectionCard
            role="athlete"
            isSelected={selectedRole === 'athlete'}
            onSelect={handleRoleSelection}
          />
          <RoleSelectionCard
            role="sponsor"
            isSelected={selectedRole === 'sponsor'}
            onSelect={handleRoleSelection}
          />
          <RoleSelectionCard
            role="admin"
            isSelected={selectedRole === 'admin'}
            onSelect={handleRoleSelection}
          />
        </div>

        {errors.role && (
          <div className="p-3 bg-error/10 border border-error/20 rounded-md">
            <div className="flex items-center space-x-2">
              <Icon name="AlertCircle" size={16} className="text-error" />
              <span className="text-sm text-error">{errors.role}</span>
            </div>
          </div>
        )}

        <Button
          variant="default"
          size="lg"
          fullWidth
          onClick={proceedToForm}
          iconName="ArrowRight"
          iconPosition="right"
        >
          Continue
        </Button>
      </div>
    );
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header with Back Button */}
      <div className="flex items-center space-x-3 mb-6">
        <Button
          variant="ghost"
          size="sm"
          onClick={goBackToRoleSelection}
          iconName="ArrowLeft"
          iconPosition="left"
        >
          Back
        </Button>
        <div>
          <h3 className="text-xl font-heading font-semibold text-foreground">
            Create {selectedRole === 'athlete' ? 'Athlete' : selectedRole === 'sponsor' ? 'Sponsor' : 'Admin'} Account
          </h3>
          <p className="text-sm text-muted-foreground">
            Fill in your details to get started
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Common Fields */}
        <Input
          label="Full Name"
          type="text"
          placeholder="Enter your full name"
          value={formData.name}
          onChange={(e) => handleInputChange('name', e.target.value)}
          error={errors.name}
          required
        />

        <Input
          label="Email Address"
          type="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          error={errors.email}
          required
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Input
              label="Password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Create a password"
              value={formData.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              error={errors.password}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-9 text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={18} />
            </button>
          </div>

          <div className="relative">
            <Input
              label="Confirm Password"
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
              error={errors.confirmPassword}
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-9 text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              <Icon name={showConfirmPassword ? 'EyeOff' : 'Eye'} size={18} />
            </button>
          </div>
        </div>

        {/* Role-specific Fields */}
        {selectedRole === 'athlete' && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select
                label="Sport"
                placeholder="Select your sport"
                options={sportOptions}
                value={formData.sport}
                onChange={(value) => handleInputChange('sport', value)}
                error={errors.sport}
                required
              />

              <Select
                label="Experience Level"
                placeholder="Select your level"
                options={experienceLevelOptions}
                value={formData.experienceLevel}
                onChange={(value) => handleInputChange('experienceLevel', value)}
                error={errors.experienceLevel}
                required
              />
            </div>

            <Input
              label="Bio (Optional)"
              type="text"
              placeholder="Tell us about your athletic journey..."
              value={formData.bio}
              onChange={(e) => handleInputChange('bio', e.target.value)}
              description="This will be displayed on your profile"
            />
          </>
        )}

        {selectedRole === 'sponsor' && (
          <Select
            label="Sponsor Type"
            placeholder="Select sponsor type"
            options={sponsorTypeOptions}
            value={formData.sponsorType}
            onChange={(value) => handleInputChange('sponsorType', value)}
            error={errors.sponsorType}
            required
          />
        )}

        {selectedRole === 'admin' && (
          <>
            <Input
              label="Access Code"
              type="password"
              placeholder="Enter admin access code"
              value={formData.accessCode}
              onChange={(e) => handleInputChange('accessCode', e.target.value)}
              error={errors.accessCode}
              description="Contact your system administrator for the access code"
              required
            />

            <Select
              label="Department"
              placeholder="Select your department"
              options={departmentOptions}
              value={formData.department}
              onChange={(value) => handleInputChange('department', value)}
              error={errors.department}
              required
            />
          </>
        )}

        {/* Terms and Conditions */}
        <div className="space-y-3 pt-4 border-t border-border">
          <Checkbox
            label="I agree to the Terms of Service"
            checked={formData.agreeToTerms}
            onChange={(e) => handleInputChange('agreeToTerms', e.target.checked)}
            error={errors.agreeToTerms}
            required
          />

          <Checkbox
            label="I agree to the Privacy Policy"
            checked={formData.agreeToPrivacy}
            onChange={(e) => handleInputChange('agreeToPrivacy', e.target.checked)}
            error={errors.agreeToPrivacy}
            required
          />

          <Checkbox
            label="Subscribe to newsletter and updates"
            checked={formData.subscribeNewsletter}
            onChange={(e) => handleInputChange('subscribeNewsletter', e.target.checked)}
            description="Get the latest news and funding opportunities"
          />
        </div>

        {errors.submit && (
          <div className="p-3 bg-error/10 border border-error/20 rounded-md">
            <div className="flex items-start space-x-2">
              <Icon name="AlertCircle" size={16} className="text-error mt-0.5 flex-shrink-0" />
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
          iconName="UserPlus"
          iconPosition="left"
        >
          Create Account
        </Button>
      </form>

      {/* Admin Access Code Helper */}
      {selectedRole === 'admin' && (
        <div className="mt-4 p-4 bg-warning/10 rounded-lg border border-warning/20">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Key" size={16} className="text-warning" />
            <span className="text-sm font-medium text-warning">Demo Access Code</span>
          </div>
          <div className="text-xs text-muted-foreground">
            Use: ADMIN2024
          </div>
        </div>
      )}
    </div>
  );
};

export default RegistrationForm;
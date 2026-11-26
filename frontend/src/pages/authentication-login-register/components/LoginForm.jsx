import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const LoginForm = ({ onLogin, loading = false, className = '' }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const mockCredentials = {
    athlete: { email: "athlete@athletefund.com", password: "athlete123" },
    sponsor: { email: "sponsor@athletefund.com", password: "sponsor123" },
    admin: { email: "admin@athletefund.com", password: "admin123" }
  };

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
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    // Check mock credentials
    const matchedRole = Object.entries(mockCredentials).find(
      ([role, creds]) => creds.email === formData.email && creds.password === formData.password
    );

    if (!matchedRole) {
      setErrors({ 
        submit: `Invalid credentials. Try: athlete@athletefund.com / athlete123, sponsor@athletefund.com / sponsor123, or admin@athletefund.com / admin123` 
      });
      return;
    }

    const [role] = matchedRole;
    const mockUser = {
      id: `${role}_001`,
      name: role === 'athlete' ? 'Alex Johnson' : role === 'sponsor' ? 'Sarah Wilson' : 'Mike Admin',
      email: formData.email,
      role: role,
      avatar: `https://randomuser.me/api/portraits/${role === 'athlete' ? 'men' : 'women'}/32.jpg`,
      verified: true,
      joinedDate: new Date('2024-01-15')
    };

    try {
      await onLogin?.(mockUser, formData.rememberMe);
      
      // Navigate based on role
      const redirectPaths = {
        athlete: '/athlete-dashboard',
        sponsor: '/athlete-profile-view',
        admin: '/admin-panel'
      };
      
      navigate(redirectPaths[role] || '/landing-page');
    } catch (error) {
      setErrors({ submit: error.message || 'Login failed. Please try again.' });
    }
  };

  const handleSocialLogin = (provider) => {
    // Mock social login
    const mockSocialUser = {
      id: 'social_001',
      name: 'John Social',
      email: `john@${provider}.com`,
      role: 'athlete',
      avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
      verified: true,
      joinedDate: new Date()
    };

    onLogin?.(mockSocialUser, false);
    navigate('/athlete-dashboard');
  };

  const handleForgotPassword = () => {
    alert('Password reset link would be sent to your email address.');
  };

  return (
    <div className={`space-y-6 ${className}`}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Email Address"
          type="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          error={errors.email}
          required
        />

        <div className="relative">
          <Input
            label="Password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter your password"
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

        <div className="flex items-center justify-between">
          <Checkbox
            label="Remember me"
            checked={formData.rememberMe}
            onChange={(e) => handleInputChange('rememberMe', e.target.checked)}
          />
          
          <button
            type="button"
            onClick={handleForgotPassword}
            className="text-sm text-primary hover:text-primary/80 transition-colors duration-200"
          >
            Forgot password?
          </button>
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
          iconName="LogIn"
          iconPosition="left"
        >
          Sign In
        </Button>
      </form>

      {/* Social Login */}
      <div className="space-y-4">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-background text-muted-foreground">Or continue with</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Button 
            variant="outline" 
            size="sm" 
            fullWidth
            onClick={() => handleSocialLogin('google')}
            iconName="Mail"
            iconPosition="left"
          >
            Google
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            fullWidth
            onClick={() => handleSocialLogin('facebook')}
            iconName="Facebook"
            iconPosition="left"
          >
            Facebook
          </Button>
        </div>
      </div>

      {/* Mock Credentials Helper */}
      <div className="mt-6 p-4 bg-muted/30 rounded-lg border border-border">
        <div className="flex items-center space-x-2 mb-2">
          <Icon name="Info" size={16} className="text-primary" />
          <span className="text-sm font-medium text-foreground">Demo Credentials</span>
        </div>
        <div className="space-y-1 text-xs text-muted-foreground">
          <div>Athlete: athlete@athletefund.com / athlete123</div>
          <div>Sponsor: sponsor@athletefund.com / sponsor123</div>
          <div>Admin: admin@athletefund.com / admin123</div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
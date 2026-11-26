import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdaptiveNavBar from '../../components/ui/AdaptiveNavBar';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import FormProgressIndicator from './components/FormProgressIndicator';
import BasicInformationStep from './components/BasicInformationStep';
import FinancialDetailsStep from './components/FinancialDetailsStep';
import MedicalDocumentationStep from './components/MedicalDocumentationStep';
import DetailedNarrativeStep from './components/DetailedNarrativeStep';
import ReviewSubmissionStep from './components/ReviewSubmissionStep';

const InjuryFundRequestForm = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDraftSaved, setIsDraftSaved] = useState(false);

  // Mock user data - in real app, this would come from authentication context
  const mockUser = {
    id: 1,
    name: "Alex Rodriguez",
    email: "alex.rodriguez@email.com",
    role: "athlete",
    sport: "Basketball",
    profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
  };

  const steps = [
    {
      id: 1,
      title: 'Basic Information',
      description: 'Injury details and basic info'
    },
    {
      id: 2,
      title: 'Financial Details',
      description: 'Funding goals and expenses'
    },
    {
      id: 3,
      title: 'Medical Documentation',
      description: 'Upload medical records'
    },
    {
      id: 4,
      title: 'Your Story',
      description: 'Share your journey'
    },
    {
      id: 5,
      title: 'Review & Submit',
      description: 'Final review and submission'
    }
  ];

  // Load draft from localStorage on component mount
  useEffect(() => {
    const savedDraft = localStorage.getItem('injury-fund-draft');
    if (savedDraft) {
      try {
        const parsedDraft = JSON.parse(savedDraft);
        setFormData(parsedDraft);
        setIsDraftSaved(true);
      } catch (error) {
        console.error('Error loading draft:', error);
      }
    }
  }, []);

  // Auto-save draft every 30 seconds
  useEffect(() => {
    const autoSaveInterval = setInterval(() => {
      if (Object.keys(formData).length > 0) {
        saveDraft();
      }
    }, 30000);

    return () => clearInterval(autoSaveInterval);
  }, [formData]);

  const handleFormUpdate = (updates) => {
    setFormData(prev => ({ ...prev, ...updates }));
    setErrors(prev => {
      const newErrors = { ...prev };
      Object.keys(updates).forEach(key => {
        if (newErrors[key]) delete newErrors[key];
      });
      return newErrors;
    });
  };

  const saveDraft = () => {
    try {
      localStorage.setItem('injury-fund-draft', JSON.stringify(formData));
      setIsDraftSaved(true);
      setTimeout(() => setIsDraftSaved(false), 2000);
    } catch (error) {
      console.error('Error saving draft:', error);
    }
  };

  const validateStep = (step) => {
    const newErrors = {};

    switch (step) {
      case 1:
        if (!formData.injuryTitle) newErrors.injuryTitle = 'Injury title is required';
        if (!formData.injuryType) newErrors.injuryType = 'Injury type is required';
        if (!formData.bodyPart) newErrors.bodyPart = 'Body part is required';
        if (!formData.injuryDate) newErrors.injuryDate = 'Injury date is required';
        if (!formData.severity) newErrors.severity = 'Severity level is required';
        if (!formData.sport) newErrors.sport = 'Sport/activity is required';
        break;

      case 2:
        if (!formData.goalAmount) {
          newErrors.goalAmount = 'Goal amount is required';
        } else if (parseFloat(formData.goalAmount) < 100) {
          newErrors.goalAmount = 'Minimum goal amount is $100';
        } else if (parseFloat(formData.goalAmount) > 50000) {
          newErrors.goalAmount = 'Maximum goal amount is $50,000';
        }
        if (!formData.timeline) newErrors.timeline = 'Timeline is required';
        break;

      case 3:
        if (!formData.medicalDocuments || formData.medicalDocuments.length === 0) {
          newErrors.medicalDocuments = 'At least one medical document is required';
        }
        break;

      case 4:
        if (!formData.injuryStory || formData.injuryStory.length < 100) {
          newErrors.injuryStory = 'Injury story must be at least 100 characters';
        }
        if (!formData.recoveryPlan || formData.recoveryPlan.length < 100) {
          newErrors.recoveryPlan = 'Recovery plan must be at least 100 characters';
        }
        if (!formData.careerImpact || formData.careerImpact.length < 100) {
          newErrors.careerImpact = 'Career impact must be at least 100 characters';
        }
        break;

      case 5:
        if (!formData.agreements || !Object.values(formData.agreements).every(Boolean)) {
          newErrors.agreements = 'All agreements must be accepted';
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, steps.length));
      saveDraft();
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleStepEdit = (step) => {
    setCurrentStep(step);
  };

  const handleSubmit = async () => {
    if (!validateStep(5)) return;

    setIsSubmitting(true);
    
    try {
      // Mock API submission
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Clear draft after successful submission
      localStorage.removeItem('injury-fund-draft');
      
      // Show success message and redirect
      alert('Your injury fund request has been submitted successfully! You will receive a confirmation email shortly.');
      navigate('/athlete-dashboard');
      
    } catch (error) {
      console.error('Submission error:', error);
      setErrors({ submit: 'Failed to submit request. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAuthAction = (action) => {
    if (action === 'logout') {
      navigate('/landing-page');
    } else {
      navigate('/authentication-login-register');
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <BasicInformationStep
            formData={formData}
            onUpdate={handleFormUpdate}
            errors={errors}
          />
        );
      case 2:
        return (
          <FinancialDetailsStep
            formData={formData}
            onUpdate={handleFormUpdate}
            errors={errors}
          />
        );
      case 3:
        return (
          <MedicalDocumentationStep
            formData={formData}
            onUpdate={handleFormUpdate}
            errors={errors}
          />
        );
      case 4:
        return (
          <DetailedNarrativeStep
            formData={formData}
            onUpdate={handleFormUpdate}
            errors={errors}
          />
        );
      case 5:
        return (
          <ReviewSubmissionStep
            formData={formData}
            onUpdate={handleFormUpdate}
            onEdit={handleStepEdit}
            errors={errors}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <AdaptiveNavBar 
        user={mockUser} 
        onAuthAction={handleAuthAction}
        notificationCount={2}
      />

      <div className="pt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-2">
              <button 
                onClick={() => navigate('/athlete-dashboard')}
                className="hover:text-primary transition-colors duration-200"
              >
                Dashboard
              </button>
              <Icon name="ChevronRight" size={14} />
              <span>Injury Fund Request</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-heading font-bold text-foreground">
                  Create Injury Fund Request
                </h1>
                <p className="text-muted-foreground mt-2">
                  Get the financial support you need for your injury recovery and return to sport
                </p>
              </div>
              
              <div className="flex items-center space-x-3">
                {isDraftSaved && (
                  <div className="flex items-center space-x-1 text-success text-sm">
                    <Icon name="Check" size={14} />
                    <span>Draft saved</span>
                  </div>
                )}
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={saveDraft}
                  iconName="Save"
                  iconPosition="left"
                >
                  Save Draft
                </Button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Progress Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <FormProgressIndicator
                  currentStep={currentStep}
                  totalSteps={steps.length}
                  steps={steps}
                />
                
                {/* Help Section */}
                <div className="mt-6 bg-card border border-border rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-3">
                    <Icon name="HelpCircle" size={18} className="text-primary" />
                    <h4 className="font-medium text-foreground">Need Help?</h4>
                  </div>
                  
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p>Our support team is here to help you through the process.</p>
                    <Button variant="outline" size="sm" fullWidth>
                      <Icon name="Mail" size={14} />
                      Contact Support
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              {renderStepContent()}

              {/* Navigation Buttons */}
              <div className="mt-8 flex items-center justify-between">
                <Button
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={currentStep === 1}
                  iconName="ChevronLeft"
                  iconPosition="left"
                >
                  Previous
                </Button>

                <div className="flex items-center space-x-3">
                  {currentStep < steps.length ? (
                    <Button
                      variant="default"
                      onClick={handleNext}
                      iconName="ChevronRight"
                      iconPosition="right"
                    >
                      Next Step
                    </Button>
                  ) : (
                    <Button
                      variant="default"
                      onClick={handleSubmit}
                      loading={isSubmitting}
                      iconName="Send"
                      iconPosition="left"
                    >
                      Submit Request
                    </Button>
                  )}
                </div>
              </div>

              {errors.submit && (
                <div className="mt-4 p-4 bg-error/10 border border-error/20 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Icon name="AlertCircle" size={18} className="text-error" />
                    <span className="text-error">{errors.submit}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InjuryFundRequestForm;
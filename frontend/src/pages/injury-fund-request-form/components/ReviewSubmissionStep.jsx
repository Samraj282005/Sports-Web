import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const ReviewSubmissionStep = ({ formData, onUpdate, onEdit, errors }) => {
  const [agreements, setAgreements] = useState({
    termsAccepted: false,
    informationAccurate: false,
    medicalVerification: false,
    fundUsage: false
  });

  const handleAgreementChange = (field, value) => {
    const updatedAgreements = { ...agreements, [field]: value };
    setAgreements(updatedAgreements);
    onUpdate({ agreements: updatedAgreements });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount || 0);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Not specified';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getExpenseBreakdownTotal = () => {
    const expenses = formData.expenseBreakdown || {};
    return Object.values(expenses).reduce((total, expense) => {
      return total + (parseFloat(expense.amount) || 0);
    }, 0);
  };

  const reviewSections = [
    {
      id: 'basic',
      title: 'Basic Information',
      icon: 'Info',
      editStep: 1,
      content: [
        { label: 'Injury Title', value: formData.injuryTitle },
        { label: 'Type of Injury', value: formData.injuryType },
        { label: 'Affected Body Part', value: formData.bodyPart },
        { label: 'Date of Injury', value: formatDate(formData.injuryDate) },
        { label: 'Severity Level', value: formData.severity },
        { label: 'Sport/Activity', value: formData.sport },
        { label: 'Brief Description', value: formData.briefDescription }
      ]
    },
    {
      id: 'financial',
      title: 'Financial Details',
      icon: 'DollarSign',
      editStep: 2,
      content: [
        { label: 'Goal Amount', value: formatCurrency(formData.goalAmount) },
        { label: 'Timeline', value: formData.timeline },
        { label: 'Estimated Expenses', value: formatCurrency(getExpenseBreakdownTotal()) }
      ]
    },
    {
      id: 'medical',
      title: 'Medical Documentation',
      icon: 'FileText',
      editStep: 3,
      content: [
        { label: 'Documents Uploaded', value: `${(formData.medicalDocuments || []).length} files` },
        { label: 'Medical Contact', value: formData.medicalContact || 'Not provided' },
        { label: 'Treatment Facility', value: formData.treatmentFacility || 'Not provided' }
      ]
    },
    {
      id: 'story',
      title: 'Your Story',
      icon: 'BookOpen',
      editStep: 4,
      content: [
        { label: 'Injury Story', value: formData.injuryStory ? `${formData.injuryStory.length} characters` : 'Not provided' },
        { label: 'Recovery Plan', value: formData.recoveryPlan ? `${formData.recoveryPlan.length} characters` : 'Not provided' },
        { label: 'Career Impact', value: formData.careerImpact ? `${formData.careerImpact.length} characters` : 'Not provided' },
        { label: 'Motivation', value: formData.motivation ? `${formData.motivation.length} characters` : 'Not provided' }
      ]
    }
  ];

  const allAgreementsChecked = Object.values(agreements).every(Boolean);

  return (
    <div className="space-y-6">
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center space-x-2 mb-6">
          <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
            <span className="text-primary font-bold text-sm">5</span>
          </div>
          <h3 className="font-heading font-semibold text-foreground">Review & Submit</h3>
        </div>

        {/* Summary Card */}
        <div className="mb-8 p-6 bg-primary/5 border border-primary/20 rounded-lg">
          <div className="flex items-start space-x-4">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <Icon name="Heart" size={24} className="text-primary" />
            </div>
            <div className="flex-1">
              <h4 className="text-xl font-heading font-semibold text-foreground mb-2">
                {formData.injuryTitle || 'Injury Fund Request'}
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Goal Amount:</span>
                  <div className="font-semibold text-primary text-lg">
                    {formatCurrency(formData.goalAmount)}
                  </div>
                </div>
                <div>
                  <span className="text-muted-foreground">Injury Type:</span>
                  <div className="font-medium text-foreground capitalize">
                    {formData.injuryType} - {formData.bodyPart}
                  </div>
                </div>
                <div>
                  <span className="text-muted-foreground">Timeline:</span>
                  <div className="font-medium text-foreground">
                    {formData.timeline}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Review Sections */}
        <div className="space-y-6">
          {reviewSections.map((section) => (
            <div key={section.id} className="border border-border rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Icon name={section.icon} size={18} className="text-primary" />
                  <h5 className="font-medium text-foreground">{section.title}</h5>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onEdit(section.editStep)}
                  iconName="Edit"
                  iconPosition="left"
                >
                  Edit
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {section.content.map((item, index) => (
                  <div key={index}>
                    <div className="text-sm text-muted-foreground">{item.label}</div>
                    <div className="font-medium text-foreground">
                      {item.value || 'Not provided'}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Expense Breakdown Preview */}
        {formData.expenseBreakdown && Object.keys(formData.expenseBreakdown).length > 0 && (
          <div className="mt-6 border border-border rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-4">
              <Icon name="Calculator" size={18} className="text-primary" />
              <h5 className="font-medium text-foreground">Expense Breakdown</h5>
            </div>
            
            <div className="space-y-2">
              {Object.entries(formData.expenseBreakdown).map(([category, expense]) => (
                <div key={category} className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground capitalize">{category.replace('-', ' ')}</span>
                  <span className="font-medium text-foreground">
                    {formatCurrency(expense.amount)}
                  </span>
                </div>
              ))}
              <div className="pt-2 border-t border-border flex justify-between items-center font-medium">
                <span className="text-foreground">Total Expenses</span>
                <span className="text-primary">{formatCurrency(getExpenseBreakdownTotal())}</span>
              </div>
            </div>
          </div>
        )}

        {/* Medical Documents Preview */}
        {formData.medicalDocuments && formData.medicalDocuments.length > 0 && (
          <div className="mt-6 border border-border rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-4">
              <Icon name="FileText" size={18} className="text-primary" />
              <h5 className="font-medium text-foreground">Uploaded Documents</h5>
            </div>
            
            <div className="space-y-2">
              {formData.medicalDocuments.map((doc, index) => (
                <div key={index} className="flex items-center space-x-2 text-sm">
                  <Icon name="File" size={14} className="text-muted-foreground" />
                  <span className="text-foreground">{doc.name}</span>
                  <span className="text-muted-foreground">
                    ({(doc.size / 1024 / 1024).toFixed(1)} MB)
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Terms and Agreements */}
        <div className="mt-8 p-6 bg-muted/30 rounded-lg">
          <h5 className="font-medium text-foreground mb-4">Terms and Agreements</h5>
          
          <div className="space-y-4">
            <Checkbox
              label="I confirm that all information provided is accurate and truthful"
              description="False information may result in request rejection and account suspension"
              checked={agreements.informationAccurate}
              onChange={(e) => handleAgreementChange('informationAccurate', e.target.checked)}
              required
            />

            <Checkbox
              label="I agree to medical verification of my injury and treatment"
              description="Medical professionals may contact your healthcare providers for verification"
              checked={agreements.medicalVerification}
              onChange={(e) => handleAgreementChange('medicalVerification', e.target.checked)}
              required
            />

            <Checkbox
              label="I commit to using funds solely for stated medical purposes"
              description="Funds must be used only for injury-related medical expenses as outlined"
              checked={agreements.fundUsage}
              onChange={(e) => handleAgreementChange('fundUsage', e.target.checked)}
              required
            />

            <Checkbox
              label="I accept the Terms of Service and Privacy Policy"
              description="By submitting, you agree to our platform terms and data handling practices"
              checked={agreements.termsAccepted}
              onChange={(e) => handleAgreementChange('termsAccepted', e.target.checked)}
              required
            />
          </div>

          {errors.agreements && (
            <div className="mt-4 p-3 bg-error/10 border border-error/20 rounded-md">
              <div className="flex items-center space-x-2">
                <Icon name="AlertCircle" size={16} className="text-error" />
                <span className="text-sm text-error">{errors.agreements}</span>
              </div>
            </div>
          )}
        </div>

        {/* Submission Status */}
        <div className="mt-6 p-4 bg-success/10 border border-success/20 rounded-lg">
          <div className="flex items-start space-x-2">
            <Icon name="CheckCircle" size={18} className="text-success mt-0.5" />
            <div>
              <div className="font-medium text-success mb-1">Ready to Submit</div>
              <div className="text-sm text-muted-foreground">
                Your injury fund request is complete and ready for submission. After submission, our medical team will review your request within 3-5 business days.
              </div>
            </div>
          </div>
        </div>

        {/* Final Validation */}
        {!allAgreementsChecked && (
          <div className="mt-4 p-3 bg-warning/10 border border-warning/20 rounded-md">
            <div className="flex items-center space-x-2">
              <Icon name="AlertTriangle" size={16} className="text-warning" />
              <span className="text-sm text-warning">
                Please accept all terms and agreements to proceed with submission
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewSubmissionStep;
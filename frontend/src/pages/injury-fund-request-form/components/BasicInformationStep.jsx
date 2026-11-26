import React from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const BasicInformationStep = ({ formData, onUpdate, errors }) => {
  const injuryTypes = [
    { value: 'acute', label: 'Acute Injury', description: 'Sudden injury from specific incident' },
    { value: 'chronic', label: 'Chronic Injury', description: 'Long-term or recurring injury' },
    { value: 'overuse', label: 'Overuse Injury', description: 'Injury from repetitive stress' },
    { value: 'traumatic', label: 'Traumatic Injury', description: 'Severe injury from accident' }
  ];

  const bodyParts = [
    { value: 'knee', label: 'Knee' },
    { value: 'ankle', label: 'Ankle' },
    { value: 'shoulder', label: 'Shoulder' },
    { value: 'back', label: 'Back/Spine' },
    { value: 'hip', label: 'Hip' },
    { value: 'wrist', label: 'Wrist' },
    { value: 'elbow', label: 'Elbow' },
    { value: 'hamstring', label: 'Hamstring' },
    { value: 'achilles', label: 'Achilles Tendon' },
    { value: 'concussion', label: 'Head/Concussion' },
    { value: 'other', label: 'Other' }
  ];

  const severityLevels = [
    { value: 'mild', label: 'Mild', description: 'Minor discomfort, can continue training' },
    { value: 'moderate', label: 'Moderate', description: 'Significant pain, limited training' },
    { value: 'severe', label: 'Severe', description: 'Unable to train, requires immediate care' },
    { value: 'career-threatening', label: 'Career Threatening', description: 'May end athletic career' }
  ];

  const handleInputChange = (field, value) => {
    onUpdate({ [field]: value });
  };

  return (
    <div className="space-y-6">
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center space-x-2 mb-4">
          <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
            <span className="text-primary font-bold text-sm">1</span>
          </div>
          <h3 className="font-heading font-semibold text-foreground">Basic Information</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Injury Title"
            type="text"
            placeholder="e.g., ACL Tear Recovery Fund"
            description="Give your injury fund request a clear, descriptive title"
            value={formData.injuryTitle || ''}
            onChange={(e) => handleInputChange('injuryTitle', e.target.value)}
            error={errors.injuryTitle}
            required
            maxLength={100}
          />

          <Select
            label="Type of Injury"
            description="Select the category that best describes your injury"
            options={injuryTypes}
            value={formData.injuryType || ''}
            onChange={(value) => handleInputChange('injuryType', value)}
            error={errors.injuryType}
            required
          />

          <Select
            label="Affected Body Part"
            description="Primary area of injury"
            options={bodyParts}
            value={formData.bodyPart || ''}
            onChange={(value) => handleInputChange('bodyPart', value)}
            error={errors.bodyPart}
            required
          />

          <Input
            label="Date of Injury"
            type="date"
            description="When did the injury occur?"
            value={formData.injuryDate || ''}
            onChange={(e) => handleInputChange('injuryDate', e.target.value)}
            error={errors.injuryDate}
            required
            max={new Date().toISOString().split('T')[0]}
          />

          <Select
            label="Severity Level"
            description="How severe is your injury?"
            options={severityLevels}
            value={formData.severity || ''}
            onChange={(value) => handleInputChange('severity', value)}
            error={errors.severity}
            required
          />

          <Input
            label="Sport/Activity"
            type="text"
            placeholder="e.g., Basketball, Track & Field"
            description="What sport were you participating in?"
            value={formData.sport || ''}
            onChange={(e) => handleInputChange('sport', e.target.value)}
            error={errors.sport}
            required
          />
        </div>

        <div className="mt-6">
          <Input
            label="Brief Description"
            type="text"
            placeholder="Provide a brief overview of how the injury occurred..."
            description="Describe how the injury happened (max 200 characters)"
            value={formData.briefDescription || ''}
            onChange={(e) => handleInputChange('briefDescription', e.target.value)}
            error={errors.briefDescription}
            maxLength={200}
          />
          <div className="text-xs text-muted-foreground mt-1 text-right">
            {(formData.briefDescription || '').length}/200 characters
          </div>
        </div>

        <div className="mt-6 space-y-4">
          <h4 className="font-medium text-foreground">Additional Information</h4>
          
          <Checkbox
            label="This is a recurring injury"
            description="Check if you've had this injury before"
            checked={formData.isRecurring || false}
            onChange={(e) => handleInputChange('isRecurring', e.target.checked)}
          />

          <Checkbox
            label="Currently receiving treatment"
            description="Check if you're already undergoing medical treatment"
            checked={formData.currentTreatment || false}
            onChange={(e) => handleInputChange('currentTreatment', e.target.checked)}
          />

          <Checkbox
            label="Injury affects competition ability"
            description="Check if this injury prevents you from competing"
            checked={formData.affectsCompetition || false}
            onChange={(e) => handleInputChange('affectsCompetition', e.target.checked)}
          />
        </div>
      </div>
    </div>
  );
};

export default BasicInformationStep;
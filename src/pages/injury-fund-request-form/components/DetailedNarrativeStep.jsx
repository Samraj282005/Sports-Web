import React, { useState } from 'react';

import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const DetailedNarrativeStep = ({ formData, onUpdate, errors }) => {
  const [activeSection, setActiveSection] = useState('story');

  const handleInputChange = (field, value) => {
    onUpdate({ [field]: value });
  };

  const sections = [
    {
      id: 'story',
      title: 'Injury Story',
      icon: 'BookOpen',
      description: 'Tell us how the injury happened',
      field: 'injuryStory',
      placeholder: `Describe in detail how your injury occurred. Include:\n\n• What were you doing when it happened?\n• What did you feel at the moment?\n• How has it affected your daily life and training?\n• What immediate steps did you take?`,
      maxLength: 1500,
      required: true
    },
    {
      id: 'recovery',
      title: 'Recovery Plan',
      icon: 'TrendingUp',
      description: 'Outline your path to recovery',
      field: 'recoveryPlan',
      placeholder: `Detail your recovery strategy:\n\n• What treatments are planned or recommended?\n• Timeline for different phases of recovery\n• Goals for each stage of rehabilitation\n• Expected return to sport timeline`,
      maxLength: 1200,
      required: true
    },
    {
      id: 'impact',
      title: 'Career Impact',
      icon: 'Target',
      description: 'How this affects your athletic goals',
      field: 'careerImpact',
      placeholder: `Explain the impact on your athletic career:\n\n• Competitions or events you'll miss\n• Training disruptions and modifications\n• Long-term career implications\n• How this funding will help you return stronger`,
      maxLength: 1000,
      required: true
    },
    {
      id: 'motivation',title: 'Motivation & Goals',icon: 'Heart',description: 'Why you\'re passionate about returning',
      field: 'motivation',
      placeholder: `Share your motivation and future goals:\n\n• What drives you to overcome this setback?\n• Your athletic dreams and aspirations\n• How you plan to inspire others\n• What this support means to you`,
      maxLength: 800,
      required: false
    }
  ];

  const currentSection = sections.find(s => s.id === activeSection);
  const currentText = formData[currentSection.field] || '';

  const getCharacterCountColor = (current, max) => {
    const percentage = (current / max) * 100;
    if (percentage >= 90) return 'text-error';
    if (percentage >= 75) return 'text-warning';
    return 'text-muted-foreground';
  };

  const getSectionCompletionStatus = (section) => {
    const text = formData[section.field] || '';
    if (section.required && text.length < 100) return 'incomplete';
    if (text.length >= 100) return 'complete';
    return 'optional';
  };

  return (
    <div className="space-y-6">
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center space-x-2 mb-4">
          <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
            <span className="text-primary font-bold text-sm">4</span>
          </div>
          <h3 className="font-heading font-semibold text-foreground">Your Story</h3>
        </div>

        <div className="mb-6 p-4 bg-primary/5 border border-primary/20 rounded-lg">
          <div className="flex items-start space-x-2">
            <Icon name="Lightbulb" size={18} className="text-primary mt-0.5" />
            <div>
              <div className="font-medium text-primary mb-1">Writing Tips</div>
              <div className="text-sm text-muted-foreground">
                Be authentic and specific. Share your personal journey, challenges, and hopes. Supporters connect with genuine stories that show your determination and character.
              </div>
            </div>
          </div>
        </div>

        {/* Section Navigation */}
        <div className="mb-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {sections.map((section) => {
              const status = getSectionCompletionStatus(section);
              const isActive = activeSection === section.id;
              
              return (
                <Button
                  key={section.id}
                  variant={isActive ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveSection(section.id)}
                  className="h-auto p-3 flex flex-col items-center space-y-1"
                >
                  <div className="flex items-center space-x-1">
                    <Icon name={section.icon} size={16} />
                    {status === 'complete' && (
                      <Icon name="CheckCircle" size={12} className="text-success" />
                    )}
                    {status === 'incomplete' && section.required && (
                      <Icon name="AlertCircle" size={12} className="text-warning" />
                    )}
                  </div>
                  <span className="text-xs font-medium text-center">{section.title}</span>
                </Button>
              );
            })}
          </div>
        </div>

        {/* Active Section Content */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Icon name={currentSection.icon} size={20} className="text-primary" />
            <div>
              <h4 className="font-medium text-foreground">{currentSection.title}</h4>
              <p className="text-sm text-muted-foreground">{currentSection.description}</p>
            </div>
            {currentSection.required && (
              <span className="text-xs bg-error/10 text-error px-2 py-1 rounded">Required</span>
            )}
          </div>

          <div className="relative">
            <textarea
              className="w-full min-h-[300px] p-4 border border-border rounded-lg resize-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors duration-200"
              placeholder={currentSection.placeholder}
              value={currentText}
              onChange={(e) => handleInputChange(currentSection.field, e.target.value)}
              maxLength={currentSection.maxLength}
            />
            
            <div className="absolute bottom-3 right-3 flex items-center space-x-2">
              <span className={`text-xs ${getCharacterCountColor(currentText.length, currentSection.maxLength)}`}>
                {currentText.length}/{currentSection.maxLength}
              </span>
            </div>
          </div>

          {errors[currentSection.field] && (
            <div className="text-sm text-error">{errors[currentSection.field]}</div>
          )}

          {/* Progress Indicator for Current Section */}
          <div className="flex items-center space-x-2 text-sm">
            {currentText.length >= 100 ? (
              <div className="flex items-center space-x-1 text-success">
                <Icon name="CheckCircle" size={14} />
                <span>Good length achieved</span>
              </div>
            ) : currentSection.required ? (
              <div className="flex items-center space-x-1 text-warning">
                <Icon name="AlertCircle" size={14} />
                <span>Minimum 100 characters recommended ({100 - currentText.length} more needed)</span>
              </div>
            ) : (
              <div className="flex items-center space-x-1 text-muted-foreground">
                <Icon name="Info" size={14} />
                <span>Optional section - add if relevant</span>
              </div>
            )}
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-6 pt-4 border-t border-border">
          <Button
            variant="outline"
            onClick={() => {
              const currentIndex = sections.findIndex(s => s.id === activeSection);
              if (currentIndex > 0) {
                setActiveSection(sections[currentIndex - 1].id);
              }
            }}
            disabled={sections.findIndex(s => s.id === activeSection) === 0}
            iconName="ChevronLeft"
            iconPosition="left"
          >
            Previous Section
          </Button>

          <Button
            variant="default"
            onClick={() => {
              const currentIndex = sections.findIndex(s => s.id === activeSection);
              if (currentIndex < sections.length - 1) {
                setActiveSection(sections[currentIndex + 1].id);
              }
            }}
            disabled={sections.findIndex(s => s.id === activeSection) === sections.length - 1}
            iconName="ChevronRight"
            iconPosition="right"
          >
            Next Section
          </Button>
        </div>

        {/* Overall Progress */}
        <div className="mt-6 p-4 bg-muted/30 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-foreground">Story Completion</span>
            <span className="text-sm text-muted-foreground">
              {sections.filter(s => getSectionCompletionStatus(s) === 'complete').length} of {sections.filter(s => s.required).length} required sections
            </span>
          </div>
          
          <div className="w-full bg-border rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ 
                width: `${(sections.filter(s => getSectionCompletionStatus(s) === 'complete').length / sections.filter(s => s.required).length) * 100}%` 
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailedNarrativeStep;
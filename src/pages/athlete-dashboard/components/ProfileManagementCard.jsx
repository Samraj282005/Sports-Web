import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ProfileManagementCard = ({ athlete = {} }) => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    bio: athlete.bio || "Passionate basketball player with 8 years of competitive experience. Currently recovering from ACL injury and working towards Olympic trials qualification.",
    sport: athlete.sport || "Basketball",
    achievements: athlete.achievements || ["State Championship Winner 2023", "MVP Regional Tournament 2022", "College Scholarship Recipient"]
  });

  const defaultAthlete = {
    name: "Sarah Johnson",
    profileImage: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
    sport: "Basketball",
    location: "Los Angeles, CA",
    age: 22,
    bio: "Passionate basketball player with 8 years of competitive experience. Currently recovering from ACL injury and working towards Olympic trials qualification.",
    achievements: ["State Championship Winner 2023", "MVP Regional Tournament 2022", "College Scholarship Recipient"],
    ...athlete
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    // Mock save functionality
    setIsEditing(false);
    console.log('Profile updated:', formData);
  };

  const handleViewFullProfile = () => {
    navigate('/athlete-profile-view');
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-elevation-1 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-heading font-semibold text-foreground text-lg">Profile Management</h3>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsEditing(!isEditing)}
            iconName={isEditing ? "X" : "Edit"}
            iconPosition="left"
          >
            {isEditing ? 'Cancel' : 'Edit'}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleViewFullProfile}
            iconName="ExternalLink"
            iconPosition="left"
          >
            View Profile
          </Button>
        </div>
      </div>

      <div className="space-y-6">
        {/* Profile Photo Section */}
        <div className="flex items-center space-x-4">
          <div className="relative">
            <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-border">
              <Image
                src={defaultAthlete.profileImage}
                alt={defaultAthlete.name}
                className="w-full h-full object-cover"
              />
            </div>
            {isEditing && (
              <button className="absolute -bottom-1 -right-1 w-6 h-6 bg-primary rounded-full flex items-center justify-center border-2 border-card">
                <Icon name="Camera" size={12} color="white" />
              </button>
            )}
          </div>
          
          <div className="flex-1">
            <h4 className="font-semibold text-foreground">{defaultAthlete.name}</h4>
            <p className="text-sm text-muted-foreground">{defaultAthlete.sport} • {defaultAthlete.location}</p>
            <p className="text-sm text-muted-foreground">Age: {defaultAthlete.age}</p>
          </div>
        </div>

        {/* Bio Section */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Bio</label>
          {isEditing ? (
            <div>
              <textarea
                value={formData.bio}
                onChange={(e) => handleInputChange('bio', e.target.value)}
                className="w-full p-3 border border-border rounded-md bg-input text-foreground resize-none focus:ring-2 focus:ring-primary focus:border-transparent"
                rows={4}
                maxLength={500}
                placeholder="Tell your story..."
              />
              <div className="flex justify-between items-center mt-1">
                <span className="text-xs text-muted-foreground">
                  {formData.bio.length}/500 characters
                </span>
              </div>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground leading-relaxed">{formData.bio}</p>
          )}
        </div>

        {/* Sport & Achievements */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Primary Sport</label>
            {isEditing ? (
              <Input
                type="text"
                value={formData.sport}
                onChange={(e) => handleInputChange('sport', e.target.value)}
                placeholder="Enter your sport"
              />
            ) : (
              <div className="flex items-center space-x-2">
                <Icon name="Trophy" size={16} className="text-primary" />
                <span className="text-sm text-foreground">{formData.sport}</span>
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Recent Achievements</label>
            <div className="space-y-1">
              {formData.achievements.slice(0, 2).map((achievement, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Icon name="Award" size={14} className="text-warning" />
                  <span className="text-sm text-muted-foreground">{achievement}</span>
                </div>
              ))}
              {formData.achievements.length > 2 && (
                <div className="text-xs text-primary cursor-pointer hover:underline">
                  +{formData.achievements.length - 2} more achievements
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        {isEditing && (
          <div className="flex items-center justify-end space-x-3 pt-4 border-t border-border">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </Button>
            <Button
              variant="default"
              size="sm"
              onClick={handleSave}
              iconName="Save"
              iconPosition="left"
            >
              Save Changes
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileManagementCard;
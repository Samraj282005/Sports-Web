import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const AthleteShowcase = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);

  const featuredAthletes = [
    {
      id: 1,
      name: "Sarah Martinez",
      sport: "Track & Field",
      image: "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      story: "Training for the 2024 Olympics in the 400m sprint. Need support for specialized coaching and equipment.",
      goalAmount: 15000,
      raisedAmount: 12500,
      supporters: 89,
      achievements: ["State Champion 2023", "Regional Record Holder"],
      urgency: "high"
    },
    {
      id: 2,
      name: "Marcus Johnson",
      sport: "Swimming",
      image: "https://images.unsplash.com/photo-1530549387789-4c1017266635?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      story: "Recovering from shoulder injury and working towards Paralympic qualification in freestyle swimming.",
      goalAmount: 8000,
      raisedAmount: 3200,
      supporters: 45,
      achievements: ["Paralympic Trials Qualifier", "National Youth Champion"],
      urgency: "medium"
    },
    {
      id: 3,
      name: "Elena Rodriguez",
      sport: "Gymnastics",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      story: "Aspiring to compete internationally in artistic gymnastics. Seeking funding for training camp expenses.",
      goalAmount: 12000,
      raisedAmount: 8900,
      supporters: 67,
      achievements: ["Junior National Champion", "International Competition Medalist"],
      urgency: "low"
    },
    {
      id: 4,
      name: "David Kim",
      sport: "Basketball",
      image: "https://images.unsplash.com/photo-1546525848-3ce03ca516f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      story: "College basketball player working towards professional career. Need support for training and nutrition.",
      goalAmount: 10000,
      raisedAmount: 6800,
      supporters: 78,
      achievements: ["College All-Star", "Conference MVP"],
      urgency: "medium"
    }
  ];

  const getProgressPercentage = (raised, goal) => {
    return Math.min((raised / goal) * 100, 100);
  };

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'high': return 'text-error';
      case 'medium': return 'text-warning';
      case 'low': return 'text-secondary';
      default: return 'text-muted-foreground';
    }
  };

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? featuredAthletes.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === featuredAthletes.length - 1 ? 0 : prev + 1));
  };

  const handleViewProfile = (athleteId) => {
    navigate('/athlete-profile-view', { state: { athleteId } });
  };

  const handleSponsorAthlete = (athleteId) => {
    navigate('/athlete-profile-view', { state: { athleteId, action: 'sponsor' } });
  };

  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-6">
            Featured Athletes
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Meet some of the incredible athletes currently seeking support for their sporting journeys.
          </p>
          <Button
            variant="outline"
            onClick={() => navigate('/athlete-profile-view')}
            iconName="ArrowRight"
            iconPosition="right"
          >
            View All Athletes
          </Button>
        </div>

        {/* Mobile Carousel */}
        <div className="md:hidden">
          <div className="relative">
            <div className="bg-card rounded-lg border border-border shadow-elevation-1 p-6">
              {featuredAthletes.map((athlete, index) => (
                <div
                  key={athlete.id}
                  className={`${index === currentIndex ? 'block' : 'hidden'}`}
                >
                  {/* Athlete Image */}
                  <div className="relative mb-6">
                    <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-4 border-primary/20">
                      <Image
                        src={athlete.image}
                        alt={athlete.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className={`absolute -top-1 -right-1 w-6 h-6 rounded-full ${
                      athlete.urgency === 'high' ? 'bg-error' :
                      athlete.urgency === 'medium' ? 'bg-warning' : 'bg-secondary'
                    } animate-pulse`} />
                  </div>

                  {/* Athlete Info */}
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-heading font-semibold text-foreground mb-2">
                      {athlete.name}
                    </h3>
                    <div className="flex items-center justify-center space-x-2 mb-3">
                      <Icon name="Trophy" size={16} className="text-primary" />
                      <span className="text-sm font-medium text-primary">{athlete.sport}</span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {athlete.story}
                    </p>
                  </div>

                  {/* Progress */}
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-foreground">
                        ${athlete.raisedAmount.toLocaleString()} raised
                      </span>
                      <span className="text-sm text-muted-foreground">
                        ${athlete.goalAmount.toLocaleString()} goal
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full transition-all duration-300"
                        style={{ width: `${getProgressPercentage(athlete.raisedAmount, athlete.goalAmount)}%` }}
                      />
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center space-x-1">
                        <Icon name="Users" size={14} className="text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">
                          {athlete.supporters} supporters
                        </span>
                      </div>
                      <span className={`text-xs font-medium ${getUrgencyColor(athlete.urgency)}`}>
                        {athlete.urgency === 'high' ? 'Urgent' : 
                         athlete.urgency === 'medium' ? 'Active' : 'Ongoing'}
                      </span>
                    </div>
                  </div>

                  {/* Achievements */}
                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-foreground mb-2">Recent Achievements</h4>
                    <div className="space-y-1">
                      {athlete.achievements.map((achievement, idx) => (
                        <div key={idx} className="flex items-center space-x-2">
                          <Icon name="Award" size={12} className="text-warning" />
                          <span className="text-xs text-muted-foreground">{achievement}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-3">
                    <Button
                      variant="default"
                      size="sm"
                      fullWidth
                      onClick={() => handleSponsorAthlete(athlete.id)}
                      iconName="Heart"
                      iconPosition="left"
                    >
                      Sponsor Now
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      fullWidth
                      onClick={() => handleViewProfile(athlete.id)}
                      iconName="Eye"
                      iconPosition="left"
                    >
                      View Profile
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center mt-6">
              <Button
                variant="ghost"
                size="icon"
                onClick={handlePrevious}
                className="w-10 h-10"
              >
                <Icon name="ChevronLeft" size={20} />
              </Button>
              
              <div className="flex space-x-2">
                {featuredAthletes.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                      index === currentIndex ? 'bg-primary' : 'bg-muted'
                    }`}
                  />
                ))}
              </div>

              <Button
                variant="ghost"
                size="icon"
                onClick={handleNext}
                className="w-10 h-10"
              >
                <Icon name="ChevronRight" size={20} />
              </Button>
            </div>
          </div>
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredAthletes.map((athlete) => (
            <div key={athlete.id} className="bg-card rounded-lg border border-border shadow-elevation-1 p-6 hover:shadow-elevation-2 transition-shadow duration-300">
              {/* Athlete Image */}
              <div className="relative mb-4">
                <div className="w-20 h-20 mx-auto rounded-full overflow-hidden border-4 border-primary/20">
                  <Image
                    src={athlete.image}
                    alt={athlete.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className={`absolute top-0 right-1/2 transform translate-x-1/2 -translate-y-1 w-4 h-4 rounded-full ${
                  athlete.urgency === 'high' ? 'bg-error' :
                  athlete.urgency === 'medium' ? 'bg-warning' : 'bg-secondary'
                } animate-pulse`} />
              </div>

              {/* Athlete Info */}
              <div className="text-center mb-4">
                <h3 className="text-lg font-heading font-semibold text-foreground mb-1">
                  {athlete.name}
                </h3>
                <div className="flex items-center justify-center space-x-1 mb-2">
                  <Icon name="Trophy" size={14} className="text-primary" />
                  <span className="text-sm font-medium text-primary">{athlete.sport}</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
                  {athlete.story}
                </p>
              </div>

              {/* Progress */}
              <div className="mb-4">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-medium text-foreground">
                    ${athlete.raisedAmount.toLocaleString()}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    ${athlete.goalAmount.toLocaleString()}
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-1.5">
                  <div
                    className="bg-primary h-1.5 rounded-full transition-all duration-300"
                    style={{ width: `${getProgressPercentage(athlete.raisedAmount, athlete.goalAmount)}%` }}
                  />
                </div>
                <div className="flex items-center justify-center mt-1">
                  <Icon name="Users" size={12} className="text-muted-foreground mr-1" />
                  <span className="text-xs text-muted-foreground">
                    {athlete.supporters} supporters
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-2">
                <Button
                  variant="default"
                  size="sm"
                  fullWidth
                  onClick={() => handleSponsorAthlete(athlete.id)}
                  iconName="Heart"
                  iconPosition="left"
                >
                  Sponsor
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  fullWidth
                  onClick={() => handleViewProfile(athlete.id)}
                  iconName="Eye"
                  iconPosition="left"
                >
                  View Profile
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AthleteShowcase;
import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SponsorTestimonials = ({ testimonials }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToTestimonial = (index) => {
    setCurrentIndex(index);
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (!testimonials || testimonials.length === 0) {
    return (
      <div className="bg-card rounded-lg border border-border shadow-elevation-1 p-6">
        <div className="flex items-center space-x-2 mb-6">
          <Icon name="MessageSquare" size={24} className="text-primary" />
          <h2 className="text-xl font-heading font-semibold text-foreground">Sponsor Testimonials</h2>
        </div>
        <div className="text-center py-8">
          <Icon name="MessageSquare" size={48} className="text-muted-foreground/50 mx-auto mb-4" />
          <p className="text-muted-foreground">No testimonials yet</p>
        </div>
      </div>
    );
  }

  const currentTestimonial = testimonials[currentIndex];

  return (
    <div className="bg-card rounded-lg border border-border shadow-elevation-1 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Icon name="MessageSquare" size={24} className="text-primary" />
          <h2 className="text-xl font-heading font-semibold text-foreground">Sponsor Testimonials</h2>
        </div>
        <div className="bg-primary/10 px-3 py-1 rounded-full">
          <span className="text-sm font-medium text-primary">
            {testimonials.length} testimonial{testimonials.length !== 1 ? 's' : ''}
          </span>
        </div>
      </div>

      {/* Testimonial Content */}
      <div className="relative">
        <div className="bg-muted/20 rounded-lg p-6 mb-6">
          {/* Quote Icon */}
          <div className="mb-4">
            <Icon name="Quote" size={32} className="text-primary/30" />
          </div>

          {/* Testimonial Text */}
          <blockquote className="text-foreground text-lg leading-relaxed mb-6 font-body">
            "{currentTestimonial.content}"
          </blockquote>

          {/* Rating */}
          {currentTestimonial.rating && (
            <div className="flex items-center space-x-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Icon
                  key={i}
                  name="Star"
                  size={16}
                  className={i < currentTestimonial.rating ? 'text-warning fill-current' : 'text-muted-foreground'}
                />
              ))}
              <span className="ml-2 text-sm text-muted-foreground">
                ({currentTestimonial.rating}/5)
              </span>
            </div>
          )}

          {/* Sponsor Info */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                {currentTestimonial.sponsor.avatar ? (
                  <img
                    src={currentTestimonial.sponsor.avatar}
                    alt={currentTestimonial.sponsor.name}
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <Icon name="User" size={20} className="text-primary" />
                )}
              </div>
              <div>
                <h4 className="font-medium text-foreground">
                  {currentTestimonial.sponsor.name}
                </h4>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  {currentTestimonial.sponsor.type && (
                    <>
                      <span>{currentTestimonial.sponsor.type}</span>
                      <span>•</span>
                    </>
                  )}
                  <span>Sponsored since {formatDate(currentTestimonial.sponsorSince)}</span>
                </div>
              </div>
            </div>

            {/* Sponsorship Amount */}
            {currentTestimonial.sponsorshipAmount && (
              <div className="text-right">
                <div className="text-sm font-medium text-foreground">
                  ${currentTestimonial.sponsorshipAmount.toLocaleString()}
                </div>
                <div className="text-xs text-muted-foreground">
                  Total Contributed
                </div>
              </div>
            )}
          </div>

          {/* Testimonial Date */}
          <div className="mt-4 pt-4 border-t border-border">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Testimonial from {formatDate(currentTestimonial.date)}</span>
              {currentTestimonial.isVerified && (
                <div className="flex items-center space-x-1">
                  <Icon name="CheckCircle" size={12} className="text-success" />
                  <span>Verified Sponsor</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Navigation Controls */}
        {testimonials.length > 1 && (
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              size="sm"
              onClick={prevTestimonial}
              iconName="ChevronLeft"
              iconPosition="left"
            >
              Previous
            </Button>

            {/* Dots Indicator */}
            <div className="flex items-center space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToTestimonial(index)}
                  className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                    index === currentIndex ? 'bg-primary' : 'bg-muted-foreground/30'
                  }`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={nextTestimonial}
              iconName="ChevronRight"
              iconPosition="right"
            >
              Next
            </Button>
          </div>
        )}
      </div>

      {/* Summary Stats */}
      <div className="mt-6 pt-6 border-t border-border">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-lg font-semibold text-foreground">
              {testimonials.length}
            </div>
            <div className="text-xs text-muted-foreground">Testimonials</div>
          </div>
          <div>
            <div className="text-lg font-semibold text-foreground">
              {testimonials.reduce((sum, t) => sum + (t.rating || 0), 0) / testimonials.length || 0}
            </div>
            <div className="text-xs text-muted-foreground">Avg Rating</div>
          </div>
          <div>
            <div className="text-lg font-semibold text-foreground">
              ${testimonials.reduce((sum, t) => sum + (t.sponsorshipAmount || 0), 0).toLocaleString()}
            </div>
            <div className="text-xs text-muted-foreground">Total Support</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SponsorTestimonials;
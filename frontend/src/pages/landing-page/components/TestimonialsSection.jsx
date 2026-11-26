import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TestimonialsSection = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "Jessica Chen",
      sport: "Tennis",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      quote: "AthleteFund changed my life completely. The support I received helped me recover from my injury and get back to competing at the highest level. I'm now ranked in the top 50 nationally!",
      achievement: "National Top 50 Ranking",
      amountRaised: 18500,
      timeframe: "6 months ago"
    },
    {
      id: 2,
      name: "Michael Torres",
      sport: "Boxing",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      quote: "The community support through AthleteFund was incredible. Not only did I receive the funding I needed for training, but I also gained a network of supporters who believed in my dream.",
      achievement: "Regional Champion 2024",
      amountRaised: 12000,
      timeframe: "8 months ago"
    },
    {
      id: 3,
      name: "Amanda Foster",
      sport: "Swimming",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      quote: "Thanks to the generous sponsors on AthleteFund, I was able to afford the specialized coaching that took my performance to the next level. I qualified for the national championships!",
      achievement: "National Championships Qualifier",
      amountRaised: 15200,
      timeframe: "4 months ago"
    }
  ];

  const handleNext = () => {
    setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrevious = () => {
    setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const currentTestimonial = testimonials[activeTestimonial];

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-6">
            Success Stories
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
            Real athletes, real dreams, real results. See how AthleteFund has transformed sporting careers.
          </p>
        </div>

        {/* Main Testimonial */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-card rounded-2xl border border-border shadow-elevation-2 p-8 lg:p-12 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute top-0 right-0 w-32 h-32 opacity-5">
              <Icon name="Quote" size={128} className="text-primary" />
            </div>

            <div className="relative z-10">
              {/* Athlete Info */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6 mb-8">
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-4 border-primary/20">
                    <Image
                      src={currentTestimonial.image}
                      alt={currentTestimonial.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                
                <div className="text-center sm:text-left flex-1">
                  <h3 className="text-xl sm:text-2xl font-heading font-semibold text-foreground mb-2">
                    {currentTestimonial.name}
                  </h3>
                  <div className="flex items-center justify-center sm:justify-start space-x-2 mb-2">
                    <Icon name="Trophy" size={16} className="text-primary" />
                    <span className="text-sm font-medium text-primary">{currentTestimonial.sport}</span>
                  </div>
                  <div className="flex items-center justify-center sm:justify-start space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Icon name="Award" size={14} className="text-warning" />
                      <span>{currentTestimonial.achievement}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="DollarSign" size={14} className="text-secondary" />
                      <span>${currentTestimonial.amountRaised.toLocaleString()} raised</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quote */}
              <blockquote className="text-lg sm:text-xl text-foreground leading-relaxed mb-6 italic">
                "{currentTestimonial.quote}"
              </blockquote>

              {/* Metadata */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Icon name="Clock" size={14} />
                  <span>Success achieved {currentTestimonial.timeframe}</span>
                </div>
                
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Icon key={i} name="Star" size={16} className="text-warning fill-current" />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center space-x-4 mt-8">
            <Button
              variant="ghost"
              size="icon"
              onClick={handlePrevious}
              className="w-12 h-12 rounded-full"
            >
              <Icon name="ChevronLeft" size={20} />
            </Button>

            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === activeTestimonial 
                      ? 'bg-primary scale-110' :'bg-muted hover:bg-muted-foreground/30'
                  }`}
                />
              ))}
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={handleNext}
              className="w-12 h-12 rounded-full"
            >
              <Icon name="ChevronRight" size={20} />
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto">
          <div className="text-center p-6 bg-card/50 rounded-lg border border-border/50">
            <div className="text-2xl sm:text-3xl font-heading font-bold text-primary mb-2">98%</div>
            <div className="text-sm text-muted-foreground">Success Rate</div>
          </div>
          <div className="text-center p-6 bg-card/50 rounded-lg border border-border/50">
            <div className="text-2xl sm:text-3xl font-heading font-bold text-secondary mb-2">4.9/5</div>
            <div className="text-sm text-muted-foreground">Average Rating</div>
          </div>
          <div className="text-center p-6 bg-card/50 rounded-lg border border-border/50">
            <div className="text-2xl sm:text-3xl font-heading font-bold text-warning mb-2">30 Days</div>
            <div className="text-sm text-muted-foreground">Avg. Fund Time</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
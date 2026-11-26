import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import AthleteHeader from './components/AthleteHeader';
import AthleteStory from './components/AthleteStory';
import AchievementsTimeline from './components/AchievementsTimeline';
import FundingProgress from './components/FundingProgress';
import DonationForm from './components/DonationForm';
import RecentUpdates from './components/RecentUpdates';
import SponsorTestimonials from './components/SponsorTestimonials';

const AthleteProfileView = () => {
  const { athleteId } = useParams();
  const navigate = useNavigate();
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [showDonationForm, setShowDonationForm] = useState(false);
  const [loading, setLoading] = useState(true);

  // Mock athlete data
  const athleteData = {
    id: "athlete-001",
    name: "Sarah Martinez",
    sport: "Track & Field - Marathon",
    location: "Denver, Colorado",
    age: 24,
    experience: 8,
    currentRanking: 15,
    isVerified: true,
    profilePhoto: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face",
    coverPhoto: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&h=400&fit=crop",
    biography: `I've been running since I was 16, starting with local 5K races in my hometown. What began as a way to stay fit quickly became my passion and life's purpose.\n\nOver the years, I've competed in over 50 marathons across the country, consistently improving my times and pushing my limits. My personal best of 2:28:15 qualified me for the Boston Marathon, where I finished in the top 20 women.\n\nCurrently, I'm training for the Olympic Trials while working part-time as a running coach for youth athletes. The financial challenges of elite training - from coaching fees to travel expenses - have been significant, but the support from this community has been incredible.\n\nMy goal is not just to compete at the highest level, but to inspire young athletes, especially girls, to pursue their dreams in sports. Every mile I run, every race I compete in, is for them and for everyone who believes in the power of perseverance.`,
    goals: "To qualify for the 2024 Olympics and establish a foundation that provides running shoes and training opportunities for underprivileged youth athletes.",
    socialLinks: {
      instagram: "https://instagram.com/sarahrunsfast",
      twitter: "https://twitter.com/sarahrunsfast",
      youtube: "https://youtube.com/sarahrunsfast"
    },
    journeyHighlights: [
      {
        title: "First Marathon Victory",
        description: "Won the Denver Marathon with a personal best time, qualifying for Boston.",
        date: "October 2023"
      },
      {
        title: "Youth Coaching Certification",
        description: "Completed advanced certification to coach young athletes professionally.",
        date: "August 2023"
      },
      {
        title: "Olympic Trials Qualification",
        description: "Achieved the qualifying time for the U.S. Olympic Marathon Trials.",
        date: "June 2023"
      }
    ],
    mediaGallery: [
      {
        url: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop",
        caption: "Training at altitude in Colorado mountains"
      },
      {
        url: "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=600&h=400&fit=crop",
        caption: "Crossing the finish line at Boston Marathon"
      },
      {
        url: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop",
        caption: "Coaching young athletes at summer camp"
      },
      {
        url: "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=600&h=400&fit=crop",
        caption: "Medal ceremony at regional championships"
      }
    ],
    achievements: [
      {
        title: "Denver Marathon Champion",
        event: "Denver Marathon 2023",
        location: "Denver, CO",
        date: "October 15, 2023",
        type: "gold",
        position: "1st Place",
        category: "Women\'s Open",
        recordTime: "2:28:15",
        description: "Personal best time and Boston Marathon qualifier",
        photo: "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=600&h=300&fit=crop"
      },
      {
        title: "Boston Marathon Top 20",
        event: "Boston Marathon 2023",
        location: "Boston, MA",
        date: "April 17, 2023",
        type: "bronze",
        position: "18th Place",
        category: "Women\'s Open",
        recordTime: "2:31:42",
        description: "First Boston Marathon completion in top 20",
        photo: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=300&fit=crop"
      },
      {
        title: "Regional Half Marathon Record",
        event: "Colorado Springs Half Marathon",
        location: "Colorado Springs, CO",
        date: "September 10, 2022",
        type: "record",
        position: "1st Place",
        category: "Women\'s Open",
        recordTime: "1:12:33",
        description: "Set new course record for women\'s division"
      }
    ],
    fundingGoals: [
      {
        id: "goal-001",
        title: "Olympic Trials Training Fund",
        description: "Support my intensive training program leading up to the Olympic Trials, including coaching fees, altitude training camps, and competition travel.",
        category: "Training",
        target: 15000,
        raised: 8750,
        startDate: "2024-01-01",
        endDate: "2024-06-30",
        isActive: true,
        isUrgent: true,
        backers: 127,
        averageDonation: 69,
        tags: ["Olympics", "Training", "Travel"],
        recentContributors: [
          { name: "Michael Johnson" },
          { name: "Lisa Chen" },
          { name: "David Rodriguez" },
          { name: "Emma Thompson" },
          { name: "James Wilson" },
          { name: "Maria Garcia" }
        ]
      },
      {
        id: "goal-002",
        title: "Youth Running Program",
        description: "Help me establish a running program for underprivileged youth, providing shoes, coaching, and race entry fees.",
        category: "Community",
        target: 5000,
        raised: 3200,
        startDate: "2024-02-01",
        endDate: "2024-08-31",
        isActive: true,
        isUrgent: false,
        backers: 89,
        averageDonation: 36,
        tags: ["Youth", "Community", "Education"],
        recentContributors: [
          { name: "Sarah Kim" },
          { name: "Robert Taylor" },
          { name: "Jennifer Lee" }
        ]
      },
      {
        id: "goal-003",
        title: "Recovery & Injury Prevention",
        description: "Funding for sports medicine, physical therapy, and recovery equipment to maintain peak performance and prevent injuries.",
        category: "Health",
        target: 3000,
        raised: 3000,
        startDate: "2023-11-01",
        endDate: "2024-01-31",
        isActive: false,
        isUrgent: false,
        backers: 45,
        averageDonation: 67,
        tags: ["Health", "Recovery", "Medical"]
      }
    ],
    recentUpdates: [
      {
        type: "training",
        title: "Altitude Training Camp Complete",
        content: "Just finished an incredible 3-week altitude training camp in Flagstaff, Arizona. The thin air was challenging, but I can already feel the improvements in my endurance and speed. Averaged 90 miles per week with some of the best runners in the country.",
        date: "2024-07-18T10:30:00Z",
        media: {
          type: "image",
          url: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=300&fit=crop",
          caption: "Morning run at 7,000 feet elevation"
        },
        tags: ["training", "altitude", "endurance"],
        likes: 234,
        comments: 18,
        shares: 12
      },
      {
        type: "competition",
        title: "Qualified for Olympic Trials!",
        content: "I'm thrilled to announce that I've officially qualified for the U.S. Olympic Marathon Trials! This has been a dream of mine for years, and I couldn't have done it without the incredible support from all of you. The trials are in February 2024 - let's make it count!",
        date: "2024-07-15T14:20:00Z",
        tags: ["olympics", "qualification", "milestone"],
        likes: 892,
        comments: 156,
        shares: 78
      },
      {
        type: "personal",
        title: "Coaching Young Athletes",
        content: "Spent the weekend coaching at a youth running camp. These kids have so much energy and potential! It\'s moments like these that remind me why I want to give back to the running community. Several of them are already talking about their own Olympic dreams.",
        date: "2024-07-12T16:45:00Z",
        media: {
          type: "image",
          url: "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=600&h=300&fit=crop",
          caption: "Teaching proper running form to young athletes"
        },
        tags: ["coaching", "youth", "community"],
        likes: 445,
        comments: 67,
        shares: 23
      },
      {
        type: "funding",
        title: "Training Fund Update",
        content: "We're now at 58% of our Olympic Trials training fund goal! Your support means everything to me. Every donation, no matter the size, helps me focus on training instead of worrying about expenses. Thank you for believing in this journey.",
        date: "2024-07-10T09:15:00Z",
        tags: ["funding", "gratitude", "progress"],
        likes: 156,
        comments: 34,
        shares: 19
      }
    ],
    sponsorTestimonials: [
      {
        sponsor: {
          name: "Michael Johnson",
          type: "Individual Sponsor",
          avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
        },
        content: "Supporting Sarah has been one of the most rewarding experiences. Her dedication to both her sport and giving back to the community is truly inspiring. I've watched her grow not just as an athlete, but as a leader and role model for young runners.",
        rating: 5,
        date: "2024-07-01T00:00:00Z",
        sponsorSince: "2023-03-15T00:00:00Z",
        sponsorshipAmount: 2500,
        isVerified: true
      },
      {
        sponsor: {
          name: "Denver Running Club",
          type: "Organization",
          avatar: null
        },
        content: "As a local running club, we've had the privilege of training alongside Sarah. Her work ethic is unmatched, and her commitment to developing young talent in our community makes her sponsorship an easy choice. She represents everything we value in our sport.",
        rating: 5,
        date: "2024-06-15T00:00:00Z",
        sponsorSince: "2023-01-10T00:00:00Z",
        sponsorshipAmount: 1800,
        isVerified: true
      },
      {
        sponsor: {
          name: "Lisa Chen",
          type: "Individual Sponsor",
          avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face"
        },
        content: "I started following Sarah's journey two years ago, and her transparency about both victories and challenges has been refreshing. She's not just chasing personal goals - she's building something bigger for the next generation of runners.",
        rating: 5,
        date: "2024-05-20T00:00:00Z",
        sponsorSince: "2023-08-22T00:00:00Z",
        sponsorshipAmount: 1200,
        isVerified: true
      }
    ]
  };

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [athleteId]);

  const handleSponsorClick = () => {
    setShowDonationForm(true);
  };

  const handleDonateClick = (goal) => {
    setSelectedGoal(goal);
    setShowDonationForm(true);
  };

  const handleShareClick = () => {
    if (navigator.share) {
      navigator.share({
        title: `Support ${athleteData.name}`,
        text: `Help ${athleteData.name} achieve their athletic dreams!`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      // You could show a toast notification here
    }
  };

  const handleDonationComplete = (donationData) => {
    // Handle successful donation
    console.log('Donation completed:', donationData);
    // You could show a success message or update the UI
  };

  const handleViewAllUpdates = () => {
    // Navigate to full updates page or expand view
    console.log('View all updates');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse space-y-8">
            <div className="bg-muted rounded-lg h-64"></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                <div className="bg-muted rounded-lg h-96"></div>
                <div className="bg-muted rounded-lg h-64"></div>
              </div>
              <div className="space-y-8">
                <div className="bg-muted rounded-lg h-80"></div>
                <div className="bg-muted rounded-lg h-64"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-8">
          <button
            onClick={() => navigate('/landing-page')}
            className="hover:text-foreground transition-colors duration-200"
          >
            Home
          </button>
          <Icon name="ChevronRight" size={16} />
          <button
            onClick={() => navigate('/athlete-profile-view')}
            className="hover:text-foreground transition-colors duration-200"
          >
            Athletes
          </button>
          <Icon name="ChevronRight" size={16} />
          <span className="text-foreground font-medium">{athleteData.name}</span>
        </nav>

        {/* Main Content */}
        <div className="space-y-8">
          {/* Athlete Header */}
          <AthleteHeader
            athlete={athleteData}
            onSponsorClick={handleSponsorClick}
            onShareClick={handleShareClick}
          />

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content Column */}
            <div className="lg:col-span-2 space-y-8">
              <AthleteStory athlete={athleteData} />
              <AchievementsTimeline achievements={athleteData.achievements} />
              <RecentUpdates 
                updates={athleteData.recentUpdates} 
                onViewAll={handleViewAllUpdates}
              />
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              <FundingProgress
                fundingGoals={athleteData.fundingGoals}
                onDonateClick={handleDonateClick}
              />
              <SponsorTestimonials testimonials={athleteData.sponsorTestimonials} />
              
              {/* Quick Actions */}
              <div className="bg-card rounded-lg border border-border shadow-elevation-1 p-6">
                <h3 className="font-heading font-semibold text-foreground mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <Button
                    variant="default"
                    fullWidth
                    onClick={handleSponsorClick}
                    iconName="Heart"
                    iconPosition="left"
                  >
                    Sponsor This Athlete
                  </Button>
                  <Button
                    variant="outline"
                    fullWidth
                    onClick={handleShareClick}
                    iconName="Share2"
                    iconPosition="left"
                  >
                    Share Profile
                  </Button>
                  <Button
                    variant="ghost"
                    fullWidth
                    onClick={() => navigate('/athlete-dashboard')}
                    iconName="MessageCircle"
                    iconPosition="left"
                  >
                    Send Message
                  </Button>
                </div>
              </div>

              {/* Trust Indicators */}
              <div className="bg-card rounded-lg border border-border shadow-elevation-1 p-6">
                <h3 className="font-heading font-semibold text-foreground mb-4">Trust & Safety</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 text-sm">
                    <Icon name="CheckCircle" size={16} className="text-success" />
                    <span className="text-muted-foreground">Verified Athlete</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Icon name="Shield" size={16} className="text-success" />
                    <span className="text-muted-foreground">Background Checked</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Icon name="Lock" size={16} className="text-success" />
                    <span className="text-muted-foreground">Secure Donations</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Icon name="FileText" size={16} className="text-success" />
                    <span className="text-muted-foreground">Tax Deductible</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Donation Form Modal */}
      {showDonationForm && (
        <DonationForm
          athlete={athleteData}
          selectedGoal={selectedGoal}
          onClose={() => {
            setShowDonationForm(false);
            setSelectedGoal(null);
          }}
          onDonationComplete={handleDonationComplete}
        />
      )}
    </div>
  );
};

export default AthleteProfileView;
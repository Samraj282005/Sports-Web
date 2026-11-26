import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const AchievementsTimeline = ({ achievements }) => {
  const getAchievementIcon = (type) => {
    switch (type) {
      case 'gold':
        return { icon: 'Trophy', color: 'text-yellow-500' };
      case 'silver':
        return { icon: 'Medal', color: 'text-gray-400' };
      case 'bronze':
        return { icon: 'Award', color: 'text-orange-600' };
      case 'record':
        return { icon: 'Target', color: 'text-primary' };
      case 'championship':
        return { icon: 'Crown', color: 'text-warning' };
      default:
        return { icon: 'Star', color: 'text-secondary' };
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-elevation-1 p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Icon name="Trophy" size={24} className="text-primary" />
        <h2 className="text-xl font-heading font-semibold text-foreground">Achievements</h2>
        <div className="bg-primary/10 px-2 py-1 rounded-full">
          <span className="text-xs font-medium text-primary">{achievements.length} total</span>
        </div>
      </div>

      <div className="space-y-6">
        {achievements.map((achievement, index) => {
          const { icon, color } = getAchievementIcon(achievement.type);
          
          return (
            <div key={index} className="relative">
              {/* Timeline Line */}
              {index < achievements.length - 1 && (
                <div className="absolute left-6 top-12 w-0.5 h-16 bg-border" />
              )}
              
              <div className="flex items-start space-x-4">
                {/* Achievement Icon */}
                <div className="w-12 h-12 bg-card border-2 border-border rounded-full flex items-center justify-center flex-shrink-0 relative z-10">
                  <Icon name={icon} size={20} className={color} />
                </div>

                {/* Achievement Content */}
                <div className="flex-1 min-w-0">
                  <div className="bg-muted/30 rounded-lg p-4">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                      <div>
                        <h3 className="font-heading font-semibold text-foreground mb-1">
                          {achievement.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {achievement.event} • {achievement.location}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <Icon name="Calendar" size={14} />
                        <span>{achievement.date}</span>
                      </div>
                    </div>

                    {achievement.description && (
                      <p className="text-sm text-muted-foreground mb-3">
                        {achievement.description}
                      </p>
                    )}

                    {/* Achievement Details */}
                    <div className="flex flex-wrap gap-2 mb-3">
                      {achievement.position && (
                        <div className="bg-primary/10 px-2 py-1 rounded-full">
                          <span className="text-xs font-medium text-primary">
                            {achievement.position}
                          </span>
                        </div>
                      )}
                      {achievement.category && (
                        <div className="bg-secondary/10 px-2 py-1 rounded-full">
                          <span className="text-xs font-medium text-secondary">
                            {achievement.category}
                          </span>
                        </div>
                      )}
                      {achievement.recordTime && (
                        <div className="bg-warning/10 px-2 py-1 rounded-full">
                          <span className="text-xs font-medium text-warning">
                            {achievement.recordTime}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Achievement Photo */}
                    {achievement.photo && (
                      <div className="rounded-lg overflow-hidden">
                        <Image
                          src={achievement.photo}
                          alt={`${achievement.title} photo`}
                          className="w-full h-48 object-cover"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {achievements.length === 0 && (
        <div className="text-center py-8">
          <Icon name="Trophy" size={48} className="text-muted-foreground/50 mx-auto mb-4" />
          <p className="text-muted-foreground">No achievements recorded yet</p>
        </div>
      )}
    </div>
  );
};

export default AchievementsTimeline;
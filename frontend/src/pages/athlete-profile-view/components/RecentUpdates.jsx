import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const RecentUpdates = ({ updates, onViewAll }) => {
  const getUpdateIcon = (type) => {
    switch (type) {
      case 'training':
        return { icon: 'Dumbbell', color: 'text-primary' };
      case 'competition':
        return { icon: 'Trophy', color: 'text-warning' };
      case 'injury':
        return { icon: 'Heart', color: 'text-error' };
      case 'achievement':
        return { icon: 'Star', color: 'text-success' };
      case 'funding':
        return { icon: 'Target', color: 'text-secondary' };
      case 'personal':
        return { icon: 'User', color: 'text-muted-foreground' };
      default:
        return { icon: 'MessageCircle', color: 'text-muted-foreground' };
    }
  };

  const formatTimeAgo = (date) => {
    const now = new Date();
    const updateDate = new Date(date);
    const diffInHours = Math.floor((now - updateDate) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    
    const diffInWeeks = Math.floor(diffInDays / 7);
    if (diffInWeeks < 4) return `${diffInWeeks}w ago`;
    
    return updateDate.toLocaleDateString();
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-elevation-1 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Icon name="Clock" size={24} className="text-primary" />
          <h2 className="text-xl font-heading font-semibold text-foreground">Recent Updates</h2>
        </div>
        {updates.length > 3 && (
          <Button variant="ghost" size="sm" onClick={onViewAll}>
            View All
          </Button>
        )}
      </div>

      <div className="space-y-4">
        {updates.slice(0, 5).map((update, index) => {
          const { icon, color } = getUpdateIcon(update.type);
          
          return (
            <div key={index} className="flex items-start space-x-4 p-4 bg-muted/20 rounded-lg hover:bg-muted/30 transition-colors duration-200">
              {/* Update Icon */}
              <div className="w-10 h-10 bg-card border border-border rounded-full flex items-center justify-center flex-shrink-0">
                <Icon name={icon} size={16} className={color} />
              </div>

              {/* Update Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-medium text-foreground line-clamp-2">
                    {update.title}
                  </h3>
                  <span className="text-xs text-muted-foreground flex-shrink-0">
                    {formatTimeAgo(update.date)}
                  </span>
                </div>

                <p className="text-sm text-muted-foreground mb-3 line-clamp-3">
                  {update.content}
                </p>

                {/* Update Media */}
                {update.media && (
                  <div className="mb-3">
                    {update.media.type === 'image' && (
                      <div className="rounded-lg overflow-hidden">
                        <Image
                          src={update.media.url}
                          alt={update.media.caption || 'Update image'}
                          className="w-full h-32 object-cover"
                        />
                      </div>
                    )}
                    {update.media.type === 'video' && (
                      <div className="relative rounded-lg overflow-hidden bg-muted">
                        <div className="aspect-video flex items-center justify-center">
                          <Icon name="Play" size={32} className="text-muted-foreground" />
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Button variant="ghost" size="icon" className="bg-black/50 hover:bg-black/70">
                            <Icon name="Play" size={20} color="white" />
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Update Tags */}
                {update.tags && update.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-3">
                    {update.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="inline-block bg-muted px-2 py-1 rounded-full text-xs text-muted-foreground"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Update Stats */}
                <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                  {update.likes && (
                    <div className="flex items-center space-x-1">
                      <Icon name="Heart" size={12} />
                      <span>{update.likes}</span>
                    </div>
                  )}
                  {update.comments && (
                    <div className="flex items-center space-x-1">
                      <Icon name="MessageCircle" size={12} />
                      <span>{update.comments}</span>
                    </div>
                  )}
                  {update.shares && (
                    <div className="flex items-center space-x-1">
                      <Icon name="Share2" size={12} />
                      <span>{update.shares}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {updates.length === 0 && (
        <div className="text-center py-8">
          <Icon name="Clock" size={48} className="text-muted-foreground/50 mx-auto mb-4" />
          <p className="text-muted-foreground">No recent updates</p>
        </div>
      )}

      {/* Load More */}
      {updates.length > 5 && (
        <div className="mt-6 text-center">
          <Button variant="outline" onClick={onViewAll}>
            Load More Updates
          </Button>
        </div>
      )}
    </div>
  );
};

export default RecentUpdates;
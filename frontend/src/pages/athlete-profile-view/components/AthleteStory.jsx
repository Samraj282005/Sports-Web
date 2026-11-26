import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const AthleteStory = ({ athlete }) => {
  const [selectedMedia, setSelectedMedia] = useState(null);

  const handleMediaClick = (media) => {
    setSelectedMedia(media);
  };

  const closeMediaModal = () => {
    setSelectedMedia(null);
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-elevation-1 p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Icon name="BookOpen" size={24} className="text-primary" />
        <h2 className="text-xl font-heading font-semibold text-foreground">My Story</h2>
      </div>

      {/* Biography */}
      <div className="prose prose-sm max-w-none mb-8">
        <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
          {athlete.biography}
        </p>
      </div>

      {/* Journey Highlights */}
      {athlete.journeyHighlights && athlete.journeyHighlights.length > 0 && (
        <div className="mb-8">
          <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
            Journey Highlights
          </h3>
          <div className="space-y-4">
            {athlete.journeyHighlights.map((highlight, index) => (
              <div key={index} className="flex items-start space-x-4 p-4 bg-muted/30 rounded-lg">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Icon name="Star" size={20} className="text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-foreground mb-1">{highlight.title}</h4>
                  <p className="text-sm text-muted-foreground mb-2">{highlight.description}</p>
                  <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                    <Icon name="Calendar" size={14} />
                    <span>{highlight.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Media Gallery */}
      {athlete.mediaGallery && athlete.mediaGallery.length > 0 && (
        <div className="mb-8">
          <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
            Photo Gallery
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {athlete.mediaGallery.map((media, index) => (
              <div
                key={index}
                className="relative aspect-square rounded-lg overflow-hidden cursor-pointer group"
                onClick={() => handleMediaClick(media)}
              >
                <Image
                  src={media.url}
                  alt={media.caption || `Gallery image ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-200 flex items-center justify-center">
                  <Icon
                    name="ZoomIn"
                    size={24}
                    color="white"
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  />
                </div>
                {media.caption && (
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2">
                    <p className="text-white text-xs truncate">{media.caption}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Goals & Aspirations */}
      {athlete.goals && (
        <div>
          <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
            Goals & Aspirations
          </h3>
          <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Icon name="Target" size={20} className="text-primary flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-foreground font-medium mb-2">My Vision</p>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {athlete.goals}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Media Modal */}
      {selectedMedia && (
        <div className="fixed inset-0 z-[1020] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative max-w-4xl max-h-full">
            <Button
              variant="ghost"
              size="icon"
              onClick={closeMediaModal}
              className="absolute -top-12 right-0 text-white hover:bg-white/20"
            >
              <Icon name="X" size={24} />
            </Button>
            <div className="bg-card rounded-lg overflow-hidden">
              <Image
                src={selectedMedia.url}
                alt={selectedMedia.caption || 'Gallery image'}
                className="max-w-full max-h-[80vh] object-contain"
              />
              {selectedMedia.caption && (
                <div className="p-4 border-t border-border">
                  <p className="text-foreground text-center">{selectedMedia.caption}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AthleteStory;
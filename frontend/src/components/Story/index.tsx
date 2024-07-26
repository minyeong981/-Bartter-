// StoryCard.tsx
import './index.scss';

import React from 'react';

export interface StoryCardProps {
  storyImage: string;
  profileImage: string;
  username: string;
}

const StoryCard: React.FC<StoryCardProps> = ({ storyImage, profileImage, username }) => {
  return (
    <div className="story-card">
      <img src={storyImage} alt={`${username}'s story`} className="story-image" />
      <div className="profile-container">
        <img src={profileImage} alt={`${username}'s profile`} className="profile-image" />
      </div>
    </div>
  );
};

export default StoryCard;

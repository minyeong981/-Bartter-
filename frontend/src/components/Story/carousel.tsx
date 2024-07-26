
import './carousel.scss';

import React, { useState, } from 'react';

import type { StoryCardProps } from './index';
import StoryCard from './index';

interface StoryCarouselProps {
  stories: StoryCardProps[];
}

const StoryCarousel: React.FC<StoryCarouselProps> = ({ stories }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const cardWidth = 200; // 카드 너비
  const visibleCards = 2.5; // 화면에 보일 카드 개수
  const maxIndex = Math.ceil(stories.length / visibleCards) - 1;

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === maxIndex ? 0 : prevIndex + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? maxIndex : prevIndex - 1));
  };

  return (
    <div className="story-carousel">
      <button onClick={prevSlide} className="carousel-button left">←</button>
      <div className="carousel-inner">
        <div
          className="carousel-track"
          style={{ transform: `translateX(-${currentIndex * (cardWidth * visibleCards)}px)` }}
        >
          {stories.map((story, index) => (
            <div className="card" key={index} style={{ width: `${cardWidth}px` }}>
              <StoryCard {...story} />
            </div>
          ))}
        </div>
      </div>
      <button onClick={nextSlide} className="carousel-button right">→</button>
    </div>
  );
};

export default StoryCarousel;

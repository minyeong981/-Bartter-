import './HomeBarter.scss';

import { useState } from 'react';
import { FaHeart } from 'react-icons/fa';

interface BarterCard {
  location: string;
  title: string;
  content: string;
  date: string;
  imageSrc: string;
  likeCount: number;
}

interface BarterCardProps {
  barterCards: BarterCard[];
}

export default function HomeBarter({ barterCards }: BarterCardProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const cardWidth = 180; // 카드 너비 설정
  const cardsToShow = 2; // 한 번에 보일 카드 수
  const cardSpacing = 10; // 카드 간격
//   const totalWidth = barterCards.length * (cardWidth + cardSpacing); // 전체 너비 계산

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - cardsToShow, 0));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      Math.min(prevIndex + cardsToShow, barterCards.length - cardsToShow)
    );
  };

  return (
    <div className="home-barter-component">
      <button className="carousel-button left" onClick={handlePrev}>
        &lt;
      </button>
      <div
        className="carousel-inner"
        style={{
          transform: `translateX(-${currentIndex * (cardWidth + cardSpacing)}px)`,
        }}
      >
        {barterCards.map((card, index) => (
          <div className="barter-card" key={index}>
            <img className="barter-image" src={card.imageSrc} alt={card.title} />
            <div className="barter-title">{card.title}</div>
            <div className="barter-time">{card.date}</div>
            <div className="barter-likes">
              <FaHeart className="heart-icon" />
              <span>{card.likeCount}</span>
            </div>
          </div>
        ))}
      </div>
      <button className="carousel-button right" onClick={handleNext}>
        &gt;
      </button>
    </div>
  );
}

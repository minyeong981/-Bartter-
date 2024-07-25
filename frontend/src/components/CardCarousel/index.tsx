
import './index.scss';

import { useState } from 'react';
import { FaHeart } from 'react-icons/fa'; // 하트 아이콘

export interface Card {
  imageSrc: string;
  title: string;
  date: string;
}

interface CardCarouselProps {
  cards: Card[];
}

const CardCarousel = ({ cards }: CardCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const cardWidth = 300; // 한 카드의 너비
  const visibleCards = 2; // 화면에 보일 카드 개수
  const maxIndex = Math.ceil(cards.length / visibleCards) - 1; // 이동할 수 있는 최대 인덱스

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === maxIndex ? 0 : prevIndex + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? maxIndex : prevIndex - 1));
  };

  return (
    <div className="card-carousel">
      <button onClick={prevSlide} className="carousel-button left">←</button>
      <div className="carousel-inner">
        <div
          className="carousel-track"
          style={{ transform: `translateX(-${currentIndex * (cardWidth * visibleCards)}px)` }}
        >
          {cards.map((card, index) => (
            <div className="card" key={index} style={{ width: `${cardWidth}px` }}>
              <img src={card.imageSrc} alt={card.title} className="card-image" />
              <h3 className="card-title">{card.title}</h3>
              <p className="card-date">{card.date}</p>
              <div className="card-footer">
                <FaHeart className="like-icon" />
                <span className="like-count">10</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <button onClick={nextSlide} className="carousel-button right">→</button>
    </div>
  );
};

export default CardCarousel;

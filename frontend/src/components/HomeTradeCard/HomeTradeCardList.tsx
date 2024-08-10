import classnames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';

import HomeTradeCard from './HomeTradeCard';
import styles from './HomeTradeCardList.module.scss';

interface BarterCardProps {
  trades: SimpleTradePostDetail[];
}

const cx = classnames.bind(styles);

export default function HomeTradeCardList({ trades }: BarterCardProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const cardWidth = 180;
  const cardsToShow = 2;
  const cardSpacing = 10;
  const carouselInnerRef = useRef<HTMLDivElement>(null);

  // 카드 두 배로 복사
  const doubledTrades = [...trades, ...trades];
  const totalCards = doubledTrades.length;
  const maxIndex = Math.max(0, totalCards / 2 - cardsToShow);

  const handlePrev = () => {
    setCurrentIndex(prevIndex => Math.max(prevIndex - cardsToShow, 0));
  };

  const handleNext = () => {
    setCurrentIndex(prevIndex => {
      const newIndex = prevIndex + cardsToShow;
      return newIndex >= maxIndex ? 0 : newIndex; // 무한 스크롤 효과
    });
  };

  useEffect(() => {
    const intervalId = setInterval(handleNext, 3000); 

    return () => clearInterval(intervalId);
  }, [currentIndex]);

  // Dragging
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX);
    if (carouselInnerRef.current) {
      setScrollLeft(carouselInnerRef.current.scrollLeft);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const x = e.pageX;
    const walk = (x - startX) * 2; 
    if (carouselInnerRef.current) {
      carouselInnerRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div className={cx('home-barter-component')}>
      <button className={cx('carousel-button', 'left')} onClick={handlePrev}>
        &lt;
      </button>
      <div
        className={cx('carousel-inner')}
        ref={carouselInnerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        style={{
          transform: `translateX(-${currentIndex * (cardWidth + cardSpacing)}px)`,
        }}
      >
        {doubledTrades.map((trade, tradeIndex) => (
          <HomeTradeCard key={tradeIndex} {...trade} />
        ))}
      </div>
      <button className={cx('carousel-button', 'right')} onClick={handleNext}>
        &gt;
      </button>
    </div>
  );
}

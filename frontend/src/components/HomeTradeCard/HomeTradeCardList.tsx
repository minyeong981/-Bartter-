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
  const [dragOffset, setDragOffset] = useState(0);
  const cardWidth = 180;
  const cardsToShow = 2;
  const cardSpacing = 10;
  const carouselInnerRef = useRef<HTMLDivElement>(null);

  const doubledTrades = [...trades, ...trades];
  const totalCards = trades.length;
  const maxIndex = Math.max(0, totalCards - cardsToShow);

  useEffect(() => {
    if (totalCards > cardsToShow) {
      const intervalId = setInterval(() => {
        setCurrentIndex((prevIndex) => {
          const newIndex = prevIndex + cardsToShow;
          return newIndex > maxIndex ? 0 : newIndex;
        });
      }, 3000);

      return () => clearInterval(intervalId);
    }
  }, [totalCards]);

  useEffect(() => {
    if (carouselInnerRef.current && !isDragging) {
      carouselInnerRef.current.style.transition = 'transform 0.5s ease-in-out';
      carouselInnerRef.current.style.transform = `translateX(-${currentIndex * (cardWidth + cardSpacing)}px)`;
    }
  }, [currentIndex, isDragging]);

  const handleDragStart = (pageX: number) => {
    setIsDragging(true);
    setStartX(pageX);
    setDragOffset(0);
  };

  const handleDragMove = (pageX: number) => {
    if (!isDragging) return;
    const walk = pageX - startX;
    setDragOffset(walk);
    if (carouselInnerRef.current) {
      carouselInnerRef.current.style.transition = 'none';
      carouselInnerRef.current.style.transform = `translateX(${dragOffset - currentIndex * (cardWidth + cardSpacing)}px)`;
    }
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    if (Math.abs(dragOffset) > cardWidth / 2) {
      const newIndex = currentIndex - Math.sign(dragOffset);
      setCurrentIndex(newIndex < 0 ? maxIndex : newIndex >= maxIndex ? 0 : newIndex);
    } else {
      if (carouselInnerRef.current) {
        carouselInnerRef.current.style.transition = 'transform 0.5s ease-in-out';
        carouselInnerRef.current.style.transform = `translateX(-${currentIndex * (cardWidth + cardSpacing)}px)`;
      }
    }
    setDragOffset(0);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    handleDragStart(e.pageX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    handleDragMove(e.pageX);
  };

  const handleMouseUp = () => {
    handleDragEnd();
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    handleDragStart(e.touches[0].pageX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    handleDragMove(e.touches[0].pageX);
  };

  const handleTouchEnd = () => {
    handleDragEnd();
  };

  return (
    <div className={cx('home-barter-component')}>
      <div
        className={cx('carousel-inner')}
        ref={carouselInnerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{
          transform: `translateX(-${currentIndex * (cardWidth + cardSpacing)}px)`,
        }}
      >
        {doubledTrades.map((trade, tradeIndex) => (
          <HomeTradeCard key={tradeIndex} {...trade} />
        ))}
      </div>
    </div>
  );
}

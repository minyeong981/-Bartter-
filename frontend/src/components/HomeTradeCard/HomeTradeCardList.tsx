import classnames from 'classnames/bind';
import {useState} from 'react';

import HomeTradeCard from './HomeTradeCard';
import styles from './HomeTradeCardList.module.scss';

interface BarterCardProps {
  barterCards: SimpleTradePostDetail[];
}

const cx = classnames.bind(styles);

export default function HomeTradeCardList({trades}: BarterCardProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const cardWidth = 180;
  const cardsToShow = 2;
  const cardSpacing = 10;
  //   const totalWidth = barterCards.length * (cardWidth + cardSpacing); // 전체 너비 계산

  const handlePrev = () => {
    setCurrentIndex(prevIndex => Math.max(prevIndex - cardsToShow, 0));
  };

  const handleNext = () => {
    setCurrentIndex(prevIndex =>
      Math.min(prevIndex + cardsToShow, trades.length - cardsToShow),
    );
  };

  return (
    <div className={cx('home-barter-component')}>
      <button className={cx('carousel-button', 'left')} onClick={handlePrev}>
        &lt;
      </button>
      <div
        className={cx('carousel-inner')}
        style={{
          transform: `translateX(-${currentIndex * (cardWidth + cardSpacing)}px)`,
        }}
      >
        {trades.map((trade, tradeIndex) => (
          <HomeTradeCard key={tradeIndex} {...trade}/>
        ))}
      </div>
      <button className={cx('carousel-button', 'right')} onClick={handleNext}>
        &gt;
      </button>
    </div>
  );
}
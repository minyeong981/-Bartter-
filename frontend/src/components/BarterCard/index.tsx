import classnames from 'classnames/bind';
import {useState} from 'react';
import {FaHeart} from 'react-icons/fa';

import styles from './barterCard.module.scss';

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

const cx = classnames.bind(styles);

export default function Barter({barterCards}: BarterCardProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const cardWidth = 180; // 카드 너비 설정
  const cardsToShow = 2; // 한 번에 보일 카드 수
  const cardSpacing = 10; // 카드 간격
  //   const totalWidth = barterCards.length * (cardWidth + cardSpacing); // 전체 너비 계산

  const handlePrev = () => {
    setCurrentIndex(prevIndex => Math.max(prevIndex - cardsToShow, 0));
  };

  const handleNext = () => {
    setCurrentIndex(prevIndex =>
      Math.min(prevIndex + cardsToShow, barterCards.length - cardsToShow),
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
        {barterCards.map((card, index) => (
          <div className={cx('barter-card')} key={index}>
            <img
              className={cx('barter-image')}
              src={card.imageSrc}
              alt={card.title}
            />
            <div className={cx('barter-title')}>{card.title}</div>
            <div className={cx('barter-time')}>{card.date}</div>
            <div className={cx('barter-likes')}>
              <FaHeart className={cx('heart-icon')} />
              <span>{card.likeCount}</span>
            </div>
          </div>
        ))}
      </div>
      <button className={cx('carousel-button', 'right')} onClick={handleNext}>
        &gt;
      </button>
    </div>
  );
}
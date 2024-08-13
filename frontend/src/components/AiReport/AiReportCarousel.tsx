import classnames from 'classnames/bind';
import { useState } from 'react';
import Lottie from 'react-lottie-player';

import GrowFarm from '@/assets/lottie/growFarm1.json'

import styles from './AiReportCarousel.module.scss';

const cx = classnames.bind(styles);

interface AiReportCarouselProps {
  content: string;
  nickname: string;
}

const AiReportCarousel: React.FC<AiReportCarouselProps> = ({ content, nickname }) => {
  const sections = content.split('###').map(section => section.trim()).filter(section => section !== '');
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < sections.length) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const renderSection = (section: string) => {
    const lines = section.split('\n').filter(line => line.trim() !== '');
    return (
      <div className={cx('section')}>
        <p className={cx('heading')}>📢 {lines[0]}</p>
        <div className={cx('content')}>
          {lines.slice(1).map((line, index) => (
            <p key={index} className={cx('bullet')}>{line}</p>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className={cx('carouselContainer')}>
      <div className={cx('carouselContent')}>
        {currentIndex < sections.length ? (
          renderSection(sections[currentIndex])
        ) : (
          <div className={cx('finalMessage')}>
            <p>🎉 {nickname} 재배의 성공을 기원합니다!</p>
            <Lottie loop animationData={GrowFarm} play className={cx('animation')}  />
          </div>
        )}
      </div>
      <div className={cx('controlButtons')}>
        <button
          onClick={handlePrevious}
          className={cx('controlButton', { disabled: currentIndex === 0 })}
          disabled={currentIndex === 0}
        >
          &lt; 이전
        </button>
        <button
          onClick={handleNext}
          className={cx('controlButton', { disabled: currentIndex >= sections.length })}
          disabled={currentIndex >= sections.length}
        >
          다음 &gt;
        </button>
      </div>
    </div>
  );
};

export default AiReportCarousel;

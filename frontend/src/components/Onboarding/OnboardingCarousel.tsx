import classnames from 'classnames/bind';
import React, { useEffect,useRef, useState } from 'react';

import styles from './OnboardingCarousel.module.scss';

interface CarouselProps {
  slides: { image: string; text: JSX.Element | string }[];
  onSlideChange?: (index: number) => void;  // 추가된 콜백 프로퍼티
}

const cx = classnames.bind(styles);

export default function Carousel({ slides = [], onSlideChange }: CarouselProps) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (onSlideChange) {
      onSlideChange(selectedIndex);
    }
  }, [selectedIndex, onSlideChange]);

  function handleScroll() {
    if (!carouselRef.current) return;

    const { scrollLeft, clientWidth } = carouselRef.current;
    const index = Math.round(scrollLeft / clientWidth);
    setSelectedIndex(index);
  }

  const scrollToSlide = (index: number) => {
    if (!carouselRef.current) return;
    const scrollPosition = index * carouselRef.current.clientWidth;
    carouselRef.current.scrollTo({ left: scrollPosition, behavior: 'smooth' });
    setSelectedIndex(index);
  };

  const handleNext = () => {
    if (selectedIndex < slides.length - 1) {
      scrollToSlide(selectedIndex + 1);
    }
  };

  const handlePrev = () => {
    if (selectedIndex > 0) {
      scrollToSlide(selectedIndex - 1);
    }
  };

  return (
    <div className={cx('carousel')}>
      <div
        className={cx('imageContainer')}
        ref={carouselRef}
        onScroll={handleScroll}
      >
        {slides.map((slide, index) => (
          <div key={`slide-${index}`} className={cx('slide')}>
            <p className={cx('text')}>{slide.text}</p>
            <img src={slide.image} alt={`슬라이드 ${index + 1}`} />
          </div>
        ))}
      </div>

      <button className={cx('prevButton')} onClick={handlePrev}>
        &lt;
      </button>
      <button className={cx('nextButton')} onClick={handleNext}>
        &gt;
      </button>
    </div>
  );
}

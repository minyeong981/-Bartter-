import classnames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import Lottie from 'react-lottie-player';

import Logo from '@/assets/image/logo.png'

import ProgressBar from '../ProgressBar';
import styles from './OnboardingCarousel.module.scss';

const cx = classnames.bind(styles);

interface Slide {
  image?: string;
  animationData?: any;
  text: JSX.Element | string;
  className?: string;
}

interface CarouselProps {
  slides: Slide[];
  onSlideChange?: (index: number) => void;
}

const Carousel: React.FC<CarouselProps> = ({ slides, onSlideChange } : CarouselProps) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const totalSlides = slides.length;
  const LAST_STEP_INDEX = totalSlides - 1;

  useEffect(() => {
    const handleScroll = () => {
      if (!carouselRef.current) return;
      const scrollLeft = carouselRef.current.scrollLeft || 0;
      const clientWidth = carouselRef.current.clientWidth || 1;
      const newIndex = Math.round(scrollLeft / clientWidth);
      if (newIndex !== selectedIndex) {
        setSelectedIndex(newIndex);
        onSlideChange?.(newIndex);
      }
    };

    carouselRef.current?.addEventListener('scroll', handleScroll);
    return () => carouselRef.current?.removeEventListener('scroll', handleScroll);
  }, [selectedIndex, onSlideChange]);

  const displayText = slides[selectedIndex]?.text

  return (
    <div className={cx('carousel')}>
      <div className={cx('imageContainer')} ref={carouselRef}>
        {slides.map((slide, index) => (
          <div key={`slide-${index}`} className={cx('slide')}>
            {slide.animationData ?
             <Lottie 
             loop 
             animationData={slide.animationData} 
             play
             speed={2}
             className={cx(`${slide.className}`)}
             />
              : <img src={Logo} alt="logo" />}
            <div className={cx('text')}>
              {displayText}
            </div>
          </div>
        ))}
        </div>
        <div className={cx('progressbar')}>
          {selectedIndex < LAST_STEP_INDEX && (
            <ProgressBar current={selectedIndex + 1} total={totalSlides} />
          )}          
        </div>

      
    </div>
    
  );
};

export default Carousel;

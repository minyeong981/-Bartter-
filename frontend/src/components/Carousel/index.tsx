import classnames from 'classnames/bind';
import {useRef, useState} from 'react';

import styles from './carousel.module.scss';

interface CarouselProps {
  images: string[];
}

const cx = classnames.bind(styles);

export default function Carousel({images = []}: CarouselProps) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const indicator = `${selectedIndex + 1} / ${images.length}`;

  function handleScroll() {
    if (!carouselRef.current) return;

    const {scrollLeft, clientWidth} = carouselRef.current;
    const index = Math.round(scrollLeft / clientWidth);
    setSelectedIndex(index);
  }

  return (
    <div className={cx('carousel')}>
      <div
        className={cx('imageContainer')}
        ref={carouselRef}
        onScroll={handleScroll}
      >
        {images.length &&
          images.map((imageUrl, index) => (
            <img key={`image-${index}`} src={imageUrl} alt="작물 이미지" />
          ))}
      </div>
      <div className={cx('indicator')}>{indicator}</div>
    </div>
  );
}
import classnames from 'classnames/bind';
import {useRef, useState} from 'react';

import styles from './PostImageCarousel.module.scss';

interface PostCarouselProps {
  imageList?: SimpleCommunityImage[];
}

const cx = classnames.bind(styles);

export default function PostImageCarousel({imageList = []}: PostCarouselProps) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const indicator = `${selectedIndex + 1} / ${imageList.length}`;

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
        {imageList.length &&
          imageList.map((image, index) => (
            <img key={`image-${index}`} src={image.imageUrl} alt="작물 이미지" />
          ))}
      </div>
      <div className={cx('indicator')}>{indicator}</div>
    </div>
  );
}
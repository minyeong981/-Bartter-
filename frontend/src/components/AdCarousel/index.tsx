import classnames from 'classnames/bind';
import {useState} from 'react';

import styles from './adCarousel.module.scss';

interface Ad {
  id: number;
  content: string;
  button: string;
}

const ads: Ad[] = [
  {id: 1, content: '광고 1', button: '바로가기'},
  {id: 2, content: '광고 2', button: '바로가기'},
  {id: 3, content: '광고 3', button: '바로가기'},
];

const cx = classnames.bind(styles);

export default function Index() {
  const [currentAdIndex, setCurrentAdIndex] = useState(0);

  const nextAd = () => {
    setCurrentAdIndex(prevIndex => (prevIndex + 1) % ads.length);
  };

  const prevAd = () => {
    setCurrentAdIndex(prevIndex => (prevIndex - 1 + ads.length) % ads.length);
  };

  return (
    <div className={cx('carousel')}>
      <button className={cx('carousel-control', 'prev')} onClick={prevAd}>
        이전
      </button>
      <div className={cx('carousel-inner')}>
        {ads.map((ad, index) => (
          <div
            key={ad.id}
            className={cx('carousel-item', {active: index === currentAdIndex})}
          >
            {ad.content}
          </div>
        ))}
      </div>
      <button className={cx('carousel-control', 'next')} onClick={nextAd}>
        다음
      </button>
    </div>
  );
}
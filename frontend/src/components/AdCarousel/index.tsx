import classnames from 'classnames/bind';
import { useEffect, useState } from 'react';

import Ad1 from '@/assets/image/ad1.png';
import Ad2 from '@/assets/image/ad2.png';
import Ad3 from '@/assets/image/ad3.png';

import AdCard from './AdCard.tsx';
import styles from './adCarousel.module.scss';

interface Ad {
  image: string;
  content: string;
  linkText: string;
  link: string;
}

const ads: Ad[] = [
  { image: Ad1, content: '내가 키운 작물들의 스토리를 만들어 보세요!', linkText: '농사 일지 보러가기 > ', link: '/diary' },
  { image: Ad2, content: '우리 동네에서 많이 교환된 작물은?', linkText: '물물 교환 보러가기 > ', link: '/trade' },
  { image: Ad3, content: '우리 동네 사람들의 농사 이야기는?', linkText: '동네 모임 보러가기 > ', link: '/community' },
]

const cx = classnames.bind(styles);

export default function Index() {
  const [currentAdIndex, setCurrentAdIndex] = useState(0);

  const nextAd = () => {
    setCurrentAdIndex(prevIndex => (prevIndex + 1) % ads.length);
  };

  const prevAd = () => {
    setCurrentAdIndex(prevIndex => (prevIndex - 1 + ads.length) % ads.length);
  };

  useEffect(() => {
    const interval = setInterval(nextAd, 3000);
    return () => clearInterval(interval); // 컴포넌트 언마운트 시 인터벌 제거
  }, []);

  return (
    <div className={cx('carousel')}>
      <button className={cx('carousel-control', 'prev')} onClick={prevAd}>
        이전
      </button>
      <div className={cx('carousel-inner')}>
        {ads.map((ad, index) => (
          <div
            key={index}
            className={cx('carousel-item', { active: index === currentAdIndex })}
          >
            <AdCard {...ad} />
          </div>
        ))}
      </div>
      <button className={cx('carousel-control', 'next')} onClick={nextAd}>
        다음
      </button>
    </div>
  );
}

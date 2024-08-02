import {useEffect, useRef} from 'react';

import UserImage from '@/assets/image/유저.png';

import NeighborCard from './NeighborCard';
import styles from './NeighborCarousel.module.scss';

const followings: SimpleUser[] = [
  {
    userId: String(1),
    nickname: 'admin1',
    profileImage: UserImage,
  },
  {
    userId: String(2),
    nickname: 'admin2',
    profileImage: UserImage,
  },
  {
    userId: String(3),
    nickname: 'admin3',
    profileImage: UserImage,
  },
  {
    userId: String(4),
    nickname: 'admin4',
    profileImage: UserImage,
  },
];

export default function NeighborCarousel() {
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = 0;
    }
  }, []);

  return (
    <div>
      <div className={styles.carouselContainer} ref={carouselRef}>
        {followings.map((following, followingIndex) => (
          <div key={followingIndex}>
            <NeighborCard {...following} isfollow={false} />
          </div>
        ))}
      </div>

    </div>
  );
}
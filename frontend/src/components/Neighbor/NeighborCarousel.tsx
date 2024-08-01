import {useEffect, useRef} from 'react';

import UserImage from '@/assets/image/유저.png';

import LinkButton from '../Buttons/LinkButton';
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
          <div key={followingIndex} className={styles.followingCard}>
            <img
              src={following.profileImage}
              alt={following.nickname}
              className={styles.profileImage}
            />
            <div className={styles.nickname}>{following.nickname}</div>
            <LinkButton buttonStyle={{style: 'primary', size: 'tiny'}}>
              팔로우
            </LinkButton>
          </div>
        ))}
      </div>

    </div>
  );
}
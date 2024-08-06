import {useEffect, useRef} from 'react';

import NeighborCard from './NeighborCard';
import styles from './NeighborCarousel.module.scss';


export default function NeighborCarousel({followings} : { followings : SimpleUser[]}) {
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
            <NeighborCard
              nickname={following.nickname}
              profileImage={following.profileImage}
              userId={Number(following.userId)}
              isfollow={true}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
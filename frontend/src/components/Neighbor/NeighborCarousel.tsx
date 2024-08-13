import {useEffect, useRef} from 'react';

import NeighborCard from './NeighborCard';
import styles from './NeighborCarousel.module.scss';

interface NeighborCarouselProps {
  followings : SimpleUserProfileByKeyword[];
  onClick: (userId : UserId, isFollow:IsFollowed) => void;
}

export default function NeighborCarousel({followings, onClick} : NeighborCarouselProps ) {
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
              isFollow={following.isFollow}
              onClick={onClick}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
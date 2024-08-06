import {useState} from 'react';

import FollowButton from '@/components//Buttons/FollowButton';

import styles from './NeighborCarousel.module.scss';

export default function NeighborCard({
  // userId,
  profileImage,
  nickname,
  isfollow,
}: {
  userId: number;
  profileImage: string;
  nickname: string;
  isfollow: boolean;
}) {
  const [isfollowed, setIsfollowed] = useState(isfollow);

  function handleClick() {
    setIsfollowed(!isfollowed);
  }

  return (
    <div className={styles.followingCard}>
      <img src={profileImage} alt={nickname} className={styles.profileImage} />
      <div className={styles.nickname}>{nickname}</div>
      <FollowButton isfollow={isfollowed} onClick={handleClick} />
    </div>
  );
}
import {useState} from 'react';

import FollowButton from '@/components//Buttons/FollowButton';

import ProfileImgComponent from '../User/ProfileImgComponent';
import styles from './NeighborCarousel.module.scss';

export default function NeighborCard({
  userId,
  profileImage,
  nickname,
  isfollow,
}: {
  userId: UserId;
  profileImage: Image;
  nickname: Name;
  isfollow: IsFollowed;
}) {
  const [isfollowed, setIsfollowed] = useState(isfollow);

  function handleClick() {
    setIsfollowed(!isfollowed);
  }

  return (
    <div className={styles.followingCard}>
      <ProfileImgComponent userId={userId} profileImage={profileImage} />
      <div className={styles.nickname}>{nickname}</div>
      <FollowButton isfollow={isfollowed} onClick={handleClick} />
    </div>
  );
}
import FollowButton from '@/components//Buttons/FollowButton';
import useRootStore from '@/store';

import ProfileImgComponent from '../User/ProfileImgComponent';
import styles from './NeighborCarousel.module.scss';

interface NeighborCardProps {
  userId : UserId;
  profileImage:ProfileImage;
  nickname:Name;
  isFollow:IsFollowed;
  onClick: (userId: UserId, isfollow:IsFollowed) => void;
}

export default function NeighborCard({
  userId,
  profileImage,
  nickname,
  isFollow,
  onClick,
}: NeighborCardProps) {

  const myId : UserId  = useRootStore((state) => state.userId);
 
  function handleClick() {
    onClick(userId, isFollow);
  }

  return (
    <div className={styles.followingCard}>
      <ProfileImgComponent userId={userId} profileImage={profileImage} />
      <div className={styles.nickname}>{nickname}</div>
     <FollowButton isfollow={isFollow} onClick={handleClick} isDisabled={myId===userId}/>
    </div>
  );
}
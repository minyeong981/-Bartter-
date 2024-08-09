import { FaUserGroup } from 'react-icons/fa6';

import FollowButton from '@/components/Buttons/FollowButton'

import Location from '../Header/Location';
import styles from './ProfileInfo.module.scss'

interface ProfileInfoProps {
    userId: UserId;
    location: SimpleLocation;
    profileImage: ProfileImage;
    nickname: Nickname;
    followerCount: FollowerCount;
    followeeCount: FolloweeCount;
    profileMessage: ProfileMessage;
    isFollowed: boolean;
    isMe: boolean;
    onClick? : React.MouseEventHandler<HTMLButtonElement>;
}

export default function ProfileInfo({ 
    userId, 
    location, 
    profileImage, 
    nickname, 
    followeeCount, 
    followerCount, 
    profileMessage,
    isFollowed,
    isMe,
    onClick } : ProfileInfoProps) {

        const locationName = location.name.split(' ').slice(1,2) + ' ' + location.name.split(' ').slice(2,3)


    return (
        <div className={styles.profileInfo}>
            <div className={styles.locationBox}>
            <Location location={locationName} />
            </div>
            <div className={styles.imgBox}>
                <img src={profileImage} alt={`${userId}`} />
            </div>
            <div className={styles.nickname}>
                {nickname}
            </div>
            <div className={styles.followButton}>
            { onClick && !isMe && <FollowButton isfollow={isFollowed} onClick={onClick}/> }
            </div>
            <div className={styles.followBox}>
                <div>
                    <FaUserGroup className={styles.followeeIcon} /> 
                    팔로워 
                    <div className={styles.follweeCount}>{followerCount} </div>
                </div>
                <div>
                    |
                </div>
                <div>
                    <FaUserGroup className={styles.followingIcon} /> 
                    팔로잉 
                    <div className={styles.follwingCount}>{followeeCount}</div>
                </div>
            </div>
            <div className={styles.message}>
                {profileMessage}
            </div>
        </div>
    )
}
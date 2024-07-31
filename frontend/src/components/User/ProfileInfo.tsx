import { FaMapMarkerAlt } from 'react-icons/fa';
import { FaUserGroup } from 'react-icons/fa6';

import styles from './ProfileInfo.module.scss'

export default function ProfileInfo({userId, location, profileImage, nickname, followeeCount, followingCount, profileMessage} : UserProfile) {
    return (
        <div className={styles.profileInfo}>
            <div className={styles.locationBox}>
            <FaMapMarkerAlt /> <div className={styles.locationBox}>{location.locationName}</div>
            </div>
            <div className={styles.imgBox}>
                <img src={profileImage} alt="" />
            </div>
            <div className={styles.nickname}>
                {nickname}
            </div>
            <div className={styles.followBox}>
                <div>
                    <FaUserGroup className={styles.followeeIcon} /> 
                    팔로워 
                    <div className={styles.follweeCount}>{followeeCount} </div>
                </div>
                <div>
                    |
                </div>
                <div>
                    <FaUserGroup className={styles.followingIcon} /> 
                    팔로잉 
                    <div className={styles.follwingCount}>{followingCount}</div>
                </div>
            </div>
            <div className={styles.message}>
                {profileMessage}
            </div>
        </div>
    )
}
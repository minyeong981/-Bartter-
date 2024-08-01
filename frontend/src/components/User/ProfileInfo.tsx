import { useState } from 'react'
import { FaMapMarkerAlt } from 'react-icons/fa';
import { FaUserGroup } from 'react-icons/fa6';

import GeneralButton from '../Buttons/GeneralButton';
import styles from './ProfileInfo.module.scss'

export default function ProfileInfo({userId, location, profileImage, nickname, followeeCount, followingCount, profileMessage} : UserProfile) {

    const [ isfollowed, setIsfollowed ] = useState(false)

    // 다른 유저 팔로우 하고 싶을때 이미 팔로우한 유저인지에 따라 버튼 색 변해야함!
    function handleClick() {
        console.log(isfollowed)
        setIsfollowed((prevIsfollowed) => !prevIsfollowed)
    }

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
            <div className={styles.followButton}>
            { userId !=='김싸피' ? undefined : <GeneralButton disabled={isfollowed} onClick= {handleClick} buttonStyle={{style:'primary', size: 'tiny'}}>팔로우</GeneralButton>}
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
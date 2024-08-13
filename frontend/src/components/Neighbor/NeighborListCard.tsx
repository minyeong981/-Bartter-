import ProfileImgComponent from "../User/ProfileImgComponent";
import styles from './NeighborListCard.module.scss'

export default function NeighborListCard({
    userId,
    nickname,
    profileImage
} : SimpleUserProfile) {
    return (
        <div className={styles.cardContainer}>
            <div className={styles.profile}>
            <ProfileImgComponent userId={userId} profileImage={profileImage}/>
            </div>
            <div className={styles.nickname}>
                {nickname}
            </div>
        </div>
    )
}
import ProfileImgComponent from "../User/ProfileImgComponent";
import styles from './NeighborListCard.module.scss'

export default function NeighborListCard({
    userId,
    nickname,
    profileImage
} : SimpleUserProfile) {
    return (
        <div className={styles.cardContainer}>
            <ProfileImgComponent userId={userId} profileImage={profileImage}/>
            <div className={styles.nickname}>
                {nickname}
            </div>
        </div>
    )
}
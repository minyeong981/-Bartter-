import { Link } from '@tanstack/react-router'

import styles from './ProfileImgComponent.module.scss'

export default function ProfileImgComponent({userId,profileImage} :
    {   userId : UserId,
        profileImage: ProfileImage
    }
) {
    
    return (
        <div>
            <Link to={`/profile/${userId}`}>
                <img className={styles.profileImage} src={profileImage} alt="" />
            </Link>
        </div>
    )
}
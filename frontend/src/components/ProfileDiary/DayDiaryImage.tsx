import { useNavigate } from '@tanstack/react-router'

import styles from './DayDiaryImage.module.scss'

export default function DayDiaryImage({
    image, 
    cropDiaryId,
    } : CropDiaryThumbnail) {
    const navigate = useNavigate({from:'/profile/$userId/diary'})

    function handleClick() {
        navigate({to:`/diary/detail/${cropDiaryId}`})
    }

    return (
        <div className={styles.diaryImage}>
            <img 
            onClick={handleClick}
            src={image} 
            alt={`${cropDiaryId}`} 
            />
        </div>
    )
}
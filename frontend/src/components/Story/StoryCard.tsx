import { Link , useNavigate } from '@tanstack/react-router'

import styles from './HomeStory.module.scss'

export default function StoryCard({
    author,
    cropDiaryId,
    image,
} : CropDiaryDetailWithUser ) {

  const navigate = useNavigate({from:'/'})

  function handleClick() {
    navigate({to:`/diary/detail/${cropDiaryId}`})
  }
    return (
        <div className={styles.storyCard}>
            <div onClick={handleClick}
                className={styles.diaryImage}
                style={{
                    backgroundImage: `linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.7)), url(${image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                }}
            />
            <Link to={`/profile/${author.userId}`}>
                <img
                    className={styles.profileImage}
                    src={author.profileImage}
                    alt={`${author.nickname}'s profile`}
                />
            </Link>
            <div className={styles.nickname}>{author.nickname}</div>
        </div>
    )
}
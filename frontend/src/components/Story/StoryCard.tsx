import { Link , useNavigate } from '@tanstack/react-router'
import classnames from 'classnames/bind'

import styles from './HomeStory.module.scss'

const cx = classnames.bind(styles)
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
        <div className={cx('story-card')}>
            <div onClick={handleClick}
                className={cx('diary-image')}
                style={{
                    backgroundImage: `linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.7)), url(${image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                }}
            />
            <Link to={`/profile/${author.userId}`}>
                <img
                    className={cx('profile-image')}
                    src={author.profileImage}
                    alt={`${author.nickname}'s profile`}
                />
            </Link>
            {/* <div className={styles.nickname}>{author.nickname}</div> */}
        </div>
    )
}
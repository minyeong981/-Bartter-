import {Link} from '@tanstack/react-router';
import {format} from 'date-fns';
import {ko} from 'date-fns/locale';

import LikeComment from '@/components/LikeComment';

import styles from './postCard.module.scss';

export default function PostCard({
    communityPostId,  
    title, 
    content, 
    createdAt,
    likeCount, 
    commentCount, 
    imageUrl, 
    hasImage,
    location,
    isLike,
    }: SimpleCommunityPostDetail) {

      const simpleLocationName = location.name.split(' ').slice(1,2) + ' ' + location.name.split(' ').slice(2,3)

         return (
        <div className={styles.communityCard}>
          <div className={styles.location}>{simpleLocationName}</div>
          <Link
            className={styles.cardContent}
            to="/community/detail/$postId"
            params={{
              postId: String(communityPostId),
            }}
          >
            <div className={styles.textBox}>
              <div className={styles.textTitle}>{title}</div>
              <div className={styles.text}>{content}</div>
              <div className={styles.time}>{format(createdAt, 'yyyy-MM-dd HH:mm', {locale: ko})}</div>
            </div>
            {hasImage && <img src={imageUrl} alt={title} />}
          </Link>
          <LikeComment likeCount={likeCount} commentCount={commentCount} isLike={isLike}/>
        </div>
  );
}

 
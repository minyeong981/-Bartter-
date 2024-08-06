import {Link} from '@tanstack/react-router';

import LikeComment from '@/components/LikeComment';

import styles from './postCard.module.scss';

export default function PostCard({
    communityPostId, 
    // user, 
    location,
    title, 
    content, 
    likeCount, 
    commentList, 
    imageList, 
    createdAt}: CommunityPost) {
         return (
        <div className={styles.communityCard}>
          <div className={styles.location}>{location.locationName}</div>
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
              <div className={styles.time}>{createdAt}</div>
            </div>
            {/* {post.image && <img src={post.image} alt={post.title} />} */}
            {imageList.map(
              (image, imgIndex) =>
                imgIndex === 0 && (
                  <img key={imgIndex} src={image.imageUrl} alt={title} />
                ),
            )}
          </Link>
          <LikeComment likeCount={likeCount} commentCount={commentList.length} isLike={true}/>
        </div>
  );
}

 
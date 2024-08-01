import CommentList from '@/components/Community/CommentLIst';
import LikeComment from '@/components/LikeComment';
import UserNameLocation from '@/components/User/UserNameLocation';

import styles from './postDetail.module.scss';

export default function PostDetail({
  post,
  comments,
}: {
  post: CommunityPost;
  comments: PostComment[];
}) {
  return (
    <div className={styles.postDetail}>
      <div className={styles.userNameContent}>
        <UserNameLocation post={post} />
      </div>
      <div className={styles.textBox}>
        <div className={styles.title}>{post.title}</div>
        <div className={styles.content}>{post.content}</div>
      </div>
      <div className={styles.imageContainer}>
        {post.imageList.map((image, imgIndex) => (
          <img
            key={imgIndex}
            className={styles.image}
            src={image.imageUrl}
            alt="Community Post"
          />
        ))}
      </div>
      <LikeComment likeCount={post.likeCount} commentCount={post.commentList.length} isLike={true}/>
      <CommentList Comments={comments} />
    </div>
  );
}
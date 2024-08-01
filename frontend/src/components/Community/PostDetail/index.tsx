import {FaComment, FaThumbsUp} from 'react-icons/fa';

import CommentList from '@/components/Community/CommentLIst';
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
      <div className={styles.pIconBox}>
        <div className={styles.pLikeCount}>
          <FaThumbsUp /> 좋아요 { post.likeCount===0 ? undefined : post.likeCount}
        </div>
        <div className={styles.pCommentCount}>
          <FaComment /> 댓글 { post.commentList.length===0 ? undefined : post.commentList.length}
        </div>
      </div>
      <CommentList Comments={comments} />
    </div>
  );
}
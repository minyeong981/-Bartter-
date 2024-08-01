import classNames from 'classnames';
import type {HTMLAttributes} from 'react';
import { FaComment,FaThumbsUp  } from 'react-icons/fa6';

// import like from '@/assets/image/like.png';
import styles from './LikeComment.module.scss';

interface PostLikeCommentProps extends HTMLAttributes<HTMLDivElement> {
  likeCount: LikeCount;
  isLike: IsLike;
  commentCount: number; // 상세 게시글에서는 commentCount 타입 있음. 전체 조회에서는 없음
  className?: string;

}

const cx = classNames;

export default function LikeComment({
  likeCount, 
  isLike, 
  commentCount,
  className,
  ...props
} : PostLikeCommentProps) {
  return (
    <div className={styles.iconBox}>
        <div {...props} className={cx(styles.likeCount, className)}>
          <div className={cx(styles.like, {[styles.liked]: isLike})}>
            <FaThumbsUp />좋아요 { !! likeCount && likeCount}
          </div>
        </div>

        <div {...props} className={cx(styles.commentCount, className)}> 
            <FaComment className={cx(styles.comment)} /> 댓글 { !! commentCount && commentCount }
        </div>
    </div>)

} 



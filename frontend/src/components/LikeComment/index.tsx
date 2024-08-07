import classNames from 'classnames';
import type {HTMLAttributes, MouseEventHandler } from 'react';

import LikeIcon from '@/assets/image/like.png';
import commentIcon from '@/assets/image/message.png'
import notLikeIcon from '@/assets/image/notLike.png';

import styles from './LikeComment.module.scss';

interface PostLikeCommentProps extends HTMLAttributes<HTMLDivElement> {
  likeCount: LikeCount;
  isLike: IsLike;
  commentCount: number; // 상세 게시글에서는 commentCount 타입 있음. 전체 조회에서는 없음
  className?: string;
  onClick: MouseEventHandler<HTMLDivElement>;

}

const cx = classNames;

export default function LikeComment({
  likeCount, 
  isLike, 
  commentCount,
  className,
  onClick,
  ...props
} : PostLikeCommentProps) {
  return (
    <div className={styles.iconBox}>
        <div {...props} className={cx(styles.likeCount, className)}>
          <div className={cx(styles.like)} onClick={onClick}>
            <div className={cx(styles.liked)}> 
              {isLike ? <img src={LikeIcon} alt="" /> : <img src={notLikeIcon} alt="" /> } </div>
            좋아요 { !! likeCount && likeCount}
          </div>
        </div>

        <div {...props} className={cx(styles.commentCount, className)}> 
            <img className={cx(styles.comment)} src={commentIcon} alt="" />
            댓글 { !! commentCount && commentCount }
        </div>
    </div>)

} 



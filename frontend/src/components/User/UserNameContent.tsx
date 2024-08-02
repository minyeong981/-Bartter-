import {useState} from 'react';

import Delete from '@/assets/image/delete.png';

import styles from './UserNameContent.module.scss';

interface UserNameContentProps {
  comment: PostComment;
  onClick: React.MouseEventHandler<HTMLImageElement>;
}

export default function UserNameContent({comment}: UserNameContentProps) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  function handleClick() {
    setShowDeleteConfirm(true);
  }

  function handleDelete(commentId: number) {
    console.log(`댓글 삭제 ${commentId}`);
    setShowDeleteConfirm(false);
  }

  function handleCancel() {
    setShowDeleteConfirm(false);
  }

  return (
    <div className={styles.userInfoContainer}>
      <img
        className={styles.profileImage}
        src={comment.user.profileImage}
        alt={`${comment.user.nickname}'s profile`}
      />
      <div className={styles.userInfo}>
        <div className={styles.userName}>{comment.user.nickname}</div>
        <div className={styles.Content}>{comment.content}</div>
        <div className={styles.createdDate}>{comment.created_at}</div>
      </div>
      <img
        className={styles.menuIcon}
        onClick={handleClick}
        src={Delete}
        alt=""
      />

      {showDeleteConfirm && ( 
        <div className={styles.deleteConfirm}>
          <div className={styles.confirmText}>댓글을 삭제하시겠습니까?</div>
          <div className={styles.buttonContainer}>
            <button onClick={() => handleDelete(comment.commentId)}>네</button>
            <button onClick={handleCancel}>아니요</button>
          </div>
        </div>
      )}
    </div>
  );
}
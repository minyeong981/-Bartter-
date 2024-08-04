import {useState} from 'react';

import Delete from '@/assets/image/delete.png';

import DeleteCommentModal from '../Modals/DeleteCommentModal/deleteCommentModal';
import styles from './UserNameContent.module.scss';

interface UserNameContentProps {
  postId : number;
  comment: PostComment;
}

export default function UserNameContent({
  postId,
  comment}: UserNameContentProps) {
  const [ isModalOpen, setIsModalOpen] = useState(false);

  function handleModalOpen() {
    setIsModalOpen(true);
  }

  function handleModalClose() {
    setIsModalOpen(false);
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
        onClick={handleModalOpen}
        src={Delete}
        alt=""
      />

      {isModalOpen && <DeleteCommentModal postId={postId} commentId={comment.commentId} onClickOutside={handleModalClose} />}
    </div>
  );
}
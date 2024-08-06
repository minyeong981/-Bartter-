import {useState} from 'react';

// import Delete from '@/assets/image/delete.png';
import { IconTrash } from '@/assets/svg';

import DeleteCommentModal from '../Modals/DeleteCommentModal/deleteCommentModal';
import styles from './UserNameContent.module.scss';

interface UserNameContentProps {
  comment: PostComment;
  onDelete: (commentId: number) => void;
}

export default function UserNameContent({
  comment,
  onDelete,

 }: UserNameContentProps) {
  const [ isModalOpen, setIsModalOpen] = useState(false);

  function handleModalOpen() {
    setIsModalOpen(true);
  }

  function handleModalClose() {
    setIsModalOpen(false);
  }

  function handleConfirmDelete() {
    onDelete(comment.commentId);
    handleModalClose()
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
      <button onClick={handleModalOpen}>
        <IconTrash className={styles.menuIcon} />
      </button>
      {isModalOpen && <DeleteCommentModal onConfirm={handleConfirmDelete} onClickOutside={handleModalClose} />}
    </div>
  );
}
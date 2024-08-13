import {format} from 'date-fns';
import {ko} from 'date-fns/locale';
import {useState} from 'react';

import { IconTrash } from '@/assets/svg';
import useRootStore from '@/store';

import DeleteCommentModal from '../Modals/DeleteCommentModal/deleteCommentModal';
import ProfileImgComponent from './ProfileImgComponent';
import styles from './UserNameContent.module.scss';

interface UserNameContentProps {
  comment: CommunityPostCommentDetail;
  onDelete: (commentId: number) => void;
}

export default function UserNameContent({
  comment,
  onDelete,

 }: UserNameContentProps) {

  const myId  = useRootStore((state) => state.userId)
  const userId  = comment.author.userId;
  const [ isModalOpen, setIsModalOpen] = useState(false);

  function handleModalOpen() {
    setIsModalOpen(true);
  }

  function handleModalClose() {
    setIsModalOpen(false);
  }

  function handleConfirmDelete() {
    onDelete(comment.communityPostCommentId);
    handleModalClose()
  }

  return (
    <div className={styles.userInfoContainer}>
      <ProfileImgComponent userId={comment.author.userId} profileImage={comment.author.profileImage}/>
      <div className={styles.userInfo}>
        <div className={styles.userName}>{comment.author.nickname}</div>
        <div className={styles.Content}>{comment.content}</div>
        <div className={styles.createdDate}>{format(comment.createdAt, 'yyyy-MM-dd HH:mm', {locale: ko})}</div>
      </div>
      { Number(myId) === Number(userId) && 
      <button onClick={handleModalOpen}>
        <IconTrash className={styles.menuIcon} />
      </button>
      }
      {isModalOpen && <DeleteCommentModal onConfirm={handleConfirmDelete} onClickOutside={handleModalClose} />}
    </div>
  );
}
import {useRouter} from '@tanstack/react-router';
import {format} from 'date-fns';
import {ko} from 'date-fns/locale';
import {useState} from 'react';

import {IconTrash} from '@/assets/svg';

import DeletePostModal from '../Modals/DeletePostModal/deletePostModal';
import styles from './UserNameContent.module.scss';

interface UserNameLocationProps {
  profileImage: ProfileImage;
  nickname: Nickname;
  locationName: LocationName;
  createdAt: CreatedAt;
  postId: CommunityPostId;
}

interface onDeleteProps {
  onDelete : (Id: number) => void;
}

export default function UserNameLocation({
  locationName,
  nickname,
  profileImage,
  postId,
  createdAt,
  onDelete
}: UserNameLocationProps & onDeleteProps) {
  const [ isModalOpen, setIsModalOpen ] = useState(false);
  const {history} = useRouter();

  function handleClickTrash() {
    // setShowDeleteConfirm(true);
    setIsModalOpen(true)
  }

  function handleModalClose() {
    setIsModalOpen(false)
  }

  function handleConfirmDelete() {
    onDelete(postId);
    history.back();
  }

  return (
    <div className={styles.userInfoContainer}>
      <img
        className={styles.profileImage}
        src={profileImage}
        alt={`${nickname}'s profile`}
      />
      <div className={styles.userInfo}>
        <div className={styles.userName}>{nickname}</div>
        <div className={styles.content}>{locationName}</div>
        <div className={styles.createdDate}>{format(createdAt, 'yyyy-MM-dd HH:mm', {locale: ko})}</div>
      </div>
      <button onClick={handleClickTrash}>
        <IconTrash className={styles.menuIcon} />
      </button>
      {isModalOpen && <DeletePostModal onConfirm={handleConfirmDelete} onClickOutside={handleModalClose} />}
    </div>
  );
}
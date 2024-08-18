import {useRouter} from '@tanstack/react-router';
import {format} from 'date-fns';
import {ko} from 'date-fns/locale';
import {useState} from 'react';

import {IconTrash} from '@/assets/svg';
import useRootStore from '@/store';

import DeletePostModal from '../Modals/DeletePostModal/deletePostModal';
import ProfileImgComponent from './ProfileImgComponent';
import styles from './UserNameContent.module.scss';

interface UserNameLocationProps {
  profileImage: ProfileImage;
  nickname: Nickname;
  locationName: Name;
  createdAt: CreatedAt;
  postId: CommunityPostId;
  userId: UserId;
}

interface onDeleteProps {
  onDelete : (Id: number) => void;
}

export default function UserNameLocation({
  locationName,
  nickname,
  profileImage,
  postId,
  userId,
  createdAt,
  onDelete
}: UserNameLocationProps & onDeleteProps) {

  const myId = useRootStore((state) => state.userId)
  const [ isModalOpen, setIsModalOpen ] = useState(false);
  const {history} = useRouter();
  const location = locationName.split(' ').slice(1,2) + ' ' + locationName.split(' ').slice(2,3)

  function handleClickTrash() {
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
      <ProfileImgComponent userId={userId} profileImage={profileImage}/>
      <div className={styles.userInfo}>
        <div className={styles.userName}>{nickname}</div>
        <div className={styles.content}>{location}</div>
        <div className={styles.createdDate}>{format(createdAt, 'yyyy-MM-dd HH:mm', {locale: ko})}</div>
      </div>
      { Number(myId) === Number(userId) &&
        <button onClick={handleClickTrash}>
        <IconTrash className={styles.menuIcon} />
      </button>
      }
      {isModalOpen && <DeletePostModal onConfirm={handleConfirmDelete} onClickOutside={handleModalClose} />}
    </div>
  );
}
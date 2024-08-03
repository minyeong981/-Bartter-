import {useRouter} from '@tanstack/react-router';
import {useState} from 'react';

import {IconTrash} from '@/assets/svg';
import ModalContainer from '@/components/ModalContainer';
import useRootStore from '@/store';

import styles from './UserNameContent.module.scss';

interface UserNameLocationProps {
  profileImage: ProfileImage;
  nickname: Nickname;
  locationName: LocationName;
  createdAt: CreatedAt;
  postId: CommunityPostId;
}

export default function UserNameLocation({
  locationName,
  nickname,
  profileImage,
  postId,
  createdAt,
}: UserNameLocationProps) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const {history} = useRouter();
  const deletePost = useRootStore(state => state.deletePost);

  function handleClickTrash() {
    setShowDeleteConfirm(true);
  }

  function handleDelete() {
    deletePost(postId);
    history.back;
  }

  function handleCancel() {
    setShowDeleteConfirm(false);
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
        <div className={styles.createdDate}>{createdAt}</div>
      </div>
      <button onClick={handleClickTrash}>
        <IconTrash className={styles.menuIcon} />
      </button>
      {showDeleteConfirm && (
        <ModalContainer onClickOutside={handleCancel}>
          <div className={styles.deleteConfirm}>
            <div className={styles.confirmText}>게시글을 삭제하시겠습니까?</div>
            <div className={styles.buttonContainer}>
              <button onClick={handleDelete}>네</button>
              <button onClick={handleCancel}>아니요</button>
            </div>
          </div>
        </ModalContainer>
      )}
    </div>
  );
}
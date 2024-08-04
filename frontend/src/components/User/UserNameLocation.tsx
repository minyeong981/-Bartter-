import {useState} from 'react';

import Delete from '@/assets/image/delete.png';

import DeletePostModal from '../Modals/DeletePostModal/deletePostModal';
import styles from './UserNameContent.module.scss';

export default function UserNameLocation({post}: {post: CommunityPost}) {

  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleModalOpen() {
    setIsModalOpen(true)
  }

  function handleModalClose() {
    setIsModalOpen(false)
  }

  return (
    <div className={styles.userInfoContainer}>
      <img
        className={styles.profileImage}
        src={post.user.profileImage}
        alt={`${post.user.nickname}'s profile`}
      />
      <div className={styles.userInfo}>
        <div className={styles.userName}>{post.user.nickname}</div>
        <div className={styles.Content}>{post.location.locationName}</div>
        <div className={styles.createdDate}>{post.createdAt}</div>
      </div>
      <img
        className={styles.menuIcon}
        onClick={handleModalOpen}
        src={Delete}
        alt="DeleteMenu"
      />
      { isModalOpen && <DeletePostModal postId={post.communityPostId} onClickOutside={handleModalClose}/>}
    </div>
  );
}
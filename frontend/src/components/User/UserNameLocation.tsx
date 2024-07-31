import {useState} from 'react';

import Delete from '@/assets/image/delete.png';

import styles from './UserNameContent.module.scss';

export default function UserNameLocation({post}: {post: CommunityPost}) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  function handleClick() {
    setShowDeleteConfirm(true);
  }

  function handleDelete(postId: number) {
    console.log(`게시글 삭제 ${postId}`);
    setShowDeleteConfirm(false);
  }

  function handleCancel() {
    setShowDeleteConfirm(false);
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
        onClick={() => handleClick()}
        src={Delete}
        alt="DeleteMenu"
      />

      {showDeleteConfirm && (
        <div className={styles.deleteConfirm}>
          <div className={styles.confirmText}>게시글을 삭제하시겠습니까?</div>
          <div className={styles.buttonContainer}>
            <button onClick={() => handleDelete(post.communityPostId)}>
              네
            </button>
            <button onClick={handleCancel}>아니요</button>
          </div>
        </div>
      )}
    </div>
  );
}
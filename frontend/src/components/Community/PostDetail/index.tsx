import {FaComment, FaThumbsUp} from 'react-icons/fa';

import CommentList from '@/components/Community/CommentLIst';
import UserNameContent from '@/components/User/UserNameContent';

import styles from './postDetail.module.scss';

interface SimpleUser {
  userId: number;
  nickname: string;
  profileImage: string;
}

interface SimpleLocation {
  locatonId: number;
  locationName: string;
}

// 게시글 이미지
interface SimpleImage {
  imageId: number;
  imageUrl: string;
  imageOrder: number;
}

// 댓글에 대한 정보 (댓글 작성자 닉네임, 댓글 내용, 댓글 작성 시간)
export interface Comment {
  user: SimpleUser;
  content: string;
  created_at: string;
}

// 게시글에 대한 정보
export interface CommunityPost {
  communityPostId: number;
  user: SimpleUser;
  location: SimpleLocation;
  title: string;
  content: string;
  likeCount: number;
  commentList: Comment[];
  imageList: SimpleImage[];
  created_at: string;
}

export default function PostDetail({
  post,
  comments,
}: {
  post: CommunityPost;
  comments: Comment[];
}) {
  return (
    <div className={styles.postDetail}>
      <div className={styles.userNameContent}>
        <UserNameContent
          profileImageSrc={post.user.profileImage}
          content={post.location.locationName}
          created_at={post.created_at}
          userName={post.user.nickname}
        />
      </div>
      <div className={styles.textBox}>
        <div className={styles.title}>{post.title}</div>
        <div className={styles.content}>{post.content}</div>
      </div>
      <div className={styles.imageContainer}>
        {post.imageList.map((image, imgIndex) => (
          <img
            key={imgIndex}
            className={styles.image}
            src={image.imageUrl}
            alt="Community Post"
          />
        ))}
      </div>
      <div className={styles.pIconBox}>
        <div className={styles.pLikeCount}>
          <FaThumbsUp /> 좋아요 {post.likeCount}
        </div>
        <div className={styles.pCommentCount}>
          <FaComment /> 댓글 {post.commentList.length}
        </div>
      </div>
      <CommentList Comments={comments} />
    </div>
  );
}
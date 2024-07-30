import { Link } from '@tanstack/react-router';
import {FaComment, FaThumbsUp} from 'react-icons/fa';

import type { CommunityPost } from '@/store/communityStore';

import styles from './postList.module.scss';

interface CommunityProps {
  posts : CommunityPost[]
}

export default function PostList({posts}: CommunityProps) {

  return (
    <div className={styles.community}>
      {posts.map((post, index) => (
        <div className={styles.communityCard} key={index}>
          <div className={styles.location}>{post.location.locationName}</div>
          <Link 
          className={styles.cardContent}
          to='/community/detail/$postId'
            params={{
              postId: post.communityPostId
            }}
          >
            <div className={styles.textBox}>
              <div className={styles.textTitle}>{post.title}</div>
              <div className={styles.text}>{post.content}</div>
              <div className={styles.time}>{post.created_at}</div>
            </div>
            {/* {post.image && <img src={post.image} alt={post.title} />} */}
            {post.imageList.map((image, imgIndex) => (
                            imgIndex===0 && <img key={imgIndex} src={image.imageUrl} alt={post.title} />
                        ))}
      
          </Link>
          <div className={styles.iconBox}>
            <div className={styles.likeCount}>
              <FaThumbsUp /> 좋아요 {post.likeCount}
            </div>
            <div className={styles.commentCount}>
              <FaComment /> 댓글 {post.commentList.length}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

import { FaComment, FaThumbsUp } from 'react-icons/fa';

import styles from './PostList.module.scss';

// 데이터 받아올 때 첫번째 사진만 줌.
interface CommunityPost {
    comunityPostId: number;  
    locationName: string;
    title: string;
    content: string;
    likeCount: number;
    commentCount: number;
    image: string | null; 
    createdAt: string;    
  }

interface PostCardProps {
    posts : CommunityPost[]
}

export default function PostList({ posts }: PostCardProps) {

    function handleClick() {
        return;
    }
    
    return (
        <div className={styles.community}>
            {posts.map((post, index) => (
                <div className={styles.communityCard} key={index}>
                    <div className={styles.location}>{post.locationName}</div>
                    <div className={styles.cardContent} onClick={handleClick}>
                        <div className={styles.textBox}>
                            <div className={styles.textTitle}>{post.title}</div>
                            <div className={styles.text}>{post.content}</div>
                            <div className={styles.time}>{post.createdAt}</div>
                        </div>
                         { post.image && <img src={post.image} alt={post.title} /> }
                        {/* {card.image.map((src, imgIndex) => (
                            imgIndex===0 && <img key={imgIndex} src={src} alt={card.title} />
                        ))} */}
                    </div>
                    <div className={styles.iconBox}>
                        <div className={styles.likeCount}><FaThumbsUp /> 좋아요 {post.likeCount}</div>
                        <div className={styles.commentCount}><FaComment /> 댓글 {post.commentCount}</div>
                    </div>
                </div>
            ))}
        </div>
    );
}

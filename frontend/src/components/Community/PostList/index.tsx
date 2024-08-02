
import PostCard from '../PostCard';
import styles from './PostList.module.scss';

interface CommunityProps {
  posts: CommunityPost[];
}

export default function PostList({posts}: CommunityProps) {
  return (
    <div className={styles.community}>
      { posts.map((post, postIndex) => 
        <PostCard key={postIndex} {...post} />
      ) }
    </div>
  );
}
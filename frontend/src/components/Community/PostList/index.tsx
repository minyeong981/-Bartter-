import PostCard from '../PostCard';
import styles from './postList.module.scss';

interface CommunityProps {
  posts: SimpleCommunityPostDetail[];
}

export default function PostList({posts}: CommunityProps) {
  return (
    <div className={styles.community}>
      {posts.map((post, postIndex) => (
        <PostCard key={postIndex} {...post} />
      ))}
    </div>
  );
}

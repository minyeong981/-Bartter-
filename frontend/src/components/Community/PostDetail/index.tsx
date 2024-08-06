import styles from './postDetail.module.scss';

export default function PostDetail({
  post,
}: {
  post: CommunityPost;
}) {
  return (
    <div className={styles.postDetail}>
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
    </div>
  );
}
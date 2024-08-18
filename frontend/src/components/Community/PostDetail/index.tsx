import styles from './postDetail.module.scss';
import PostImageCarousel from './PostImageCarousel';


export default function PostDetail({
  title,
  content,
  imageList
    }: CommunityPostDetail) {
  return (
    <div className={styles.postDetail}>
      <div className={styles.textBox}>
        <div className={styles.title}>{title}</div>
        <div className={styles.content}>{content}</div>
      </div>
      {imageList.length >0 && <PostImageCarousel imageList={imageList}/>}
    </div>
  );
}
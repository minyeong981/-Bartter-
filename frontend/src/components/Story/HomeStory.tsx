import styles from './HomeStory.module.scss';
import StoryCard from './StoryCard';

export default function HomeStory(stories: CropDiaryDetailWithUser[]) {
  return (
    <div className={styles.homeStory}>
      <div className={styles.carouselContainer}>
        {stories.map((story, index) => (
          <StoryCard key={index} {...story}/>
        ))}
      </div>
    </div>
  );
}
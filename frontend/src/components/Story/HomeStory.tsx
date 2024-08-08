import styles from './HomeStory.module.scss';
import StoryCard from './StoryCard';

interface HomeStoryProps{
  stories: CropDiaryDetailWithUser[]
}

export default function HomeStory({stories}: HomeStoryProps) {
  console.log(stories)
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
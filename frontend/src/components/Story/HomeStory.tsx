import styles from './HomeStory.module.scss';

interface Story {
  diaryImage: string;
  profileImage: string;
  nickname: string;
}

interface StoryProps {
  stories: Story[];
}

export default function HomeStory({stories}: StoryProps) {
  return (
    <div className={styles.homeStory}>
      <div className={styles.carouselContainer}>
        {stories.map((story, index) => (
          <div className={styles.storyCard} key={index}>
            <div
              className={styles.diaryImage}
              style={{
                backgroundImage: `linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.7)), url('${story.diaryImage}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
              }}
            />
            <img
              className={styles.profileImage}
              src={story.profileImage}
              alt={`${story.nickname}'s profile`}
            />
            <div className={styles.nickname}>{story.nickname}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
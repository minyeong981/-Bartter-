import classnames from 'classnames/bind'

import styles from './HomeStory.module.scss';
import StoryCard from './StoryCard';

interface HomeStoryProps{
  stories: CropDiaryDetailWithUser[]
}

const cx = classnames.bind(styles)
export default function HomeStory({stories}: HomeStoryProps) {
  return (
    <div className={cx('home-story')}>
      <div className={cx('carousel-container')}>
        {stories.map((story, index) => (
          <StoryCard key={index} {...story}/>
        ))}
      </div>
    </div>
  );
}
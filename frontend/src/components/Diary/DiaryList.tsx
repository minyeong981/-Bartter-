import { Route } from '@tanstack/react-router';
import classnames from 'classnames/bind';

import styles from './DiaryList.module.scss';

const cx = classnames.bind(styles);

interface DiaryEntry {
  selectedDate: string;
  diaryTitle: string;
  diaryContent: string;
  diaryImage: string[];
}

interface DiaryListProps {
  diaryEntries: DiaryEntry[];
}

function DiaryList({ diaryEntries }: DiaryListProps) {
  return (
    <div className={cx('diaryListContainer')}>
      <div className={cx('cardContainer')}>
        {diaryEntries.map((entry, index) => (
          <div className={cx('card')} key={index}>
            <span className={cx('detailButton')}>상세보기 &gt;</span>
            <div className={cx('cardContent')}>
              {entry.diaryImage && <img src={entry.diaryImage[0]} alt="Diary" className={cx('cardImage')} />}
              <div className={cx('textContent')}>
                <h3>{entry.diaryTitle}</h3>
                <p>{entry.diaryContent}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DiaryList;

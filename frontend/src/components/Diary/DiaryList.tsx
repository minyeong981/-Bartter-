import { useQuery } from '@tanstack/react-query';
import classnames from 'classnames/bind';

import barter from '@/services/barter';
import useRootStore from '@/store';

import styles from './DiaryList.module.scss';

const cx = classnames.bind(styles);

interface DiaryListProps {
  selectedDate: Date;
}

function DiaryList({ selectedDate }: DiaryListProps) {
  const userId = useRootStore(state => state.userId);
  const { data } = useQuery({
    queryKey: ['diaryList', userId],
    queryFn: () => barter.getCropDiary(userId)
  })

  const diaryEntries  = data?.data.data || [];

  if (diaryEntries.length === 0) {
    return;
  }

  return (
    <div className={cx('diaryListContainer')}>
      <div className={cx('cardContainer')}>
        {diaryEntries.map((diary) => (
          <div className={cx('card')} key={diary.id}>
            <span 
              className={cx('detailButton')} 
              onClick={() => handleDetailClick(diary)}
            >
              상세보기 &gt;
            </span>
            <div className={cx('cardContent')}>
              {diary.image && <img src={diary.image[0]} alt="Diary" className={cx('cardImage')} />}
              <div className={cx('textContent')}>
                <h3>{diary.title}</h3>
                <p>{diary.content}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DiaryList;

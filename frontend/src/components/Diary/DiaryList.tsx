import { useSuspenseQuery } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import classnames from 'classnames/bind';

import barter from '@/services/barter';
import querykeys from '@/util/querykeys';

import styles from './DiaryList.module.scss';

const cx = classnames.bind(styles);

interface DiaryListProps {
  userId: number;
  selectedDate: string;
}

export default function DiaryList({ userId, selectedDate }: DiaryListProps) {
  const navigate = useNavigate();
  const { data } = useSuspenseQuery({
    queryKey: [querykeys.DIARY_LIST, userId, selectedDate],
    queryFn: () => barter.getCropDiaryListByDate(userId, selectedDate)
  });

  const diaryEntries = data.data.data

  const handleDetailClick = (diaryId: number) => {
    navigate({ to: `/diary/detail/${diaryId}` });
  };

  return (
    <div className={cx('diaryListContainer')}>
      <div className={cx('cardContainer')}>
        {diaryEntries.length > 0 ? (
          diaryEntries.map((diary: any) => (
          <div className={cx('card')} key={diary.cropDiaryId}>
            <span 
              className={cx('detailButton')}
              onClick={() => handleDetailClick(diary.cropDiaryId)}
            >
              상세보기 &gt;
            </span>
            <div className={cx('cardContent')}>
              {diary.image && <img src={diary.image} alt="Diary" className={cx('cardImage')} />}
              <div className={cx('textContent')}>
                <h3>{diary.title}</h3>
                <p>{diary.content}</p>
              </div>
            </div>
          </div>
          ))
        ) : (
          <div className={cx('noDiary')}>아직 작성된 일지가 없습니다.</div>
        )}
      </div>
    </div>
  );
};

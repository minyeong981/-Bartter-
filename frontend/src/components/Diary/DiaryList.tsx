import { useQuery } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import classnames from 'classnames/bind';
import { useEffect, useState } from 'react';

import barter from '@/services/barter';
import useRootStore from '@/store';

import styles from './DiaryList.module.scss';

const cx = classnames.bind(styles);

interface DiaryListProps {
  selectedDate: Date;
}

export default function DiaryList({ selectedDate }: DiaryListProps) {
  const userId = useRootStore(state => state.userId);
  const navigate = useNavigate();
  const { data, isLoading, isError } = useQuery({
    queryKey: ['diaryList', userId],
    queryFn: () => barter.getCropDiary(userId)
  });

  const [filteredDiaries, setFilteredDiaries] = useState<any[]>([]);

  useEffect(() => {
    if (data) {
      const diaryEntries = data.data.data || [];
      const filteredEntries = diaryEntries.filter((diary: any) => {
        const diaryDate = new Date(diary.performDate);
        return (
          diaryDate.getFullYear() === selectedDate.getFullYear() &&
          diaryDate.getMonth() === selectedDate.getMonth() &&
          diaryDate.getDate() === selectedDate.getDate()
        );
      });
      setFilteredDiaries(filteredEntries);
    }
  }, [data, selectedDate]);

  const handleDetailClick = (diary: any) => {
    navigate({
      to: `/diary/detail/${diary.id}`
    });
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>오류가 발생했습니다.</div>;

  return (
    <div className={cx('diaryListContainer')}>
      <div className={cx('cardContainer')}>
        {filteredDiaries.map((diary) => (
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


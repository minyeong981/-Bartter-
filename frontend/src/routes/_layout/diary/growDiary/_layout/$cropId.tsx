import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import classnames from 'classnames/bind';
import { format } from 'date-fns';
import { useState } from 'react';

import GrowDiary from '@/assets/image/growdiary.png';
import Share from '@/assets/image/share.png';
import DiaryDetail from '@/components/Diary/DiaryDetail';
import MonthHeader from '@/components/ProfileDiary/MonthHeader';
import MonthHeaderButton from '@/components/ProfileDiary/MonthHeaderButton';
import barter from '@/services/barter';

import styles from '../growDiary.module.scss';

const cx = classnames.bind(styles);

export const Route = createFileRoute('/_layout/diary/growDiary/_layout/$cropId')({
  component: GrowDiaryPage,
});

function GrowDiaryPage() {
  const { cropId } = Route.useSearch<{ cropId: number }>();

  const [pivotDate, setPivotDate] = useState(new Date());

  const onDecreaseMonth = () => {
    setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() - 1));
  };

  const onIncreaseMonth = () => {
    setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() + 1));
  };

  const formatMonth = (month: number) => (month < 9 ? `0${month + 1}` : `${month + 1}`);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['diaryDetail', cropId],
    queryFn: () => barter.getCropDiaryListByCrop(cropId),
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>오류가 발생했습니다.</div>;

  const diary = data?.data.cropInfo || {};
  const diaryEntries = data?.data.thumbnailList || [];

  const diaryEntriesByMonth = diaryEntries.reduce((acc: Record<string, { cropDiaryId: number; image: string; performDate: string }[]>, entry) => {
    const month = format(new Date(entry.performDate), 'yyyy-MM');
    if (!acc[month]) {
      acc[month] = [];
    }
    acc[month].push(entry);
    return acc;
  }, {});

  return (
    <div className={cx('growDiaryContainer')}>
      <div className={cx('profileSection')}>
        <div className={cx('cropImage')}>
          <img src={'http://' + diary.cropInfo.cropProfileImage} alt={diary.cropInfo.cropNickname} />
        </div>
        <div className={cx('cropInfo')}>
          <h2>{diary.cropInfo.userNickname}님의 {diary.cropInfo.cropNickname}</h2>
          <div className={cx('infoImages')}>
            <div className={cx('info')}>
              <img src={GrowDiary} alt="growDiary" />
              <p><span>{diary.cropInfo.dayWithCrop}</span>일째</p>
            </div>
            <div className={cx('info')}>
              <img src={Share} alt="share" />
              <p><span>{diary.cropInfo.tradeCount}</span> 회</p>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div className={cx('diarySection')}>
        {Object.entries(diaryEntriesByMonth).map(([month, entries]) => (
          <div key={month} className={cx('monthSection')}>
            <MonthHeader
              title={`${pivotDate.getFullYear()}.${formatMonth(pivotDate.getMonth())}`}
              leftChild={<MonthHeaderButton text="<" onClick={onDecreaseMonth} />}
              rightChild={<MonthHeaderButton text=">" onClick={onIncreaseMonth} />}
            />
            <div className={cx('entries')}>
              {entries.map((entry) => (
                <div key={entry.cropDiaryId} className={cx('entry')}>
                  <DiaryDetail cropDiaryId={entry.cropDiaryId} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GrowDiaryPage;

import { createFileRoute } from '@tanstack/react-router';
import classnames from 'classnames/bind';
import { differenceInDays, format } from 'date-fns';
import { useState } from 'react';

import GrowDiary from '@/assets/image/growdiary.png';
import Share from '@/assets/image/share.png';
import Tomato from '@/assets/image/tomato.png'
import Story1 from '@/assets/image/스토리1.png'
import MonthHeader from '@/components/ProfileDiary/MonthHeader';
import MonthHeaderButton from '@/components/ProfileDiary/MonthHeaderButton';

import styles from '../growDiary.module.scss';

const cx = classnames.bind(styles);

interface Crop {
  id: number;
  nickname: string;
  image: string;
  date: string;
  owner: string;
}

interface DiaryEntry {
  diaryId: number;
  selectedDate: string;
  diaryTitle: string;
  diaryContent: string;
  diaryImage: string[];
  cropId: number;
}

const dummyCrops: Crop[] = [
  { id: 1, nickname: '멋쟁이토마토', image: 'https://via.placeholder.com/100', date: '2023-08-01', owner: '미녕' },
  { id: 2, nickname: '옥수수퍼노바', image: 'https://via.placeholder.com/100', date: '2023-06-01', owner: '져닝' },
];

const dummyDiaryEntries: DiaryEntry[] = [
  { diaryId: 1, selectedDate: '2023-07-10', diaryTitle: '일지 제목 1', diaryContent: '일지 내용 1', diaryImage: [Tomato] , cropId: 1 },
  { diaryId: 2, selectedDate: '2023-07-15', diaryTitle: '일지 제목 2', diaryContent: '일지 내용 2', diaryImage: ['https://via.placeholder.com/100'], cropId: 1 },
  { diaryId: 3, selectedDate: '2023-06-10', diaryTitle: '일지 제목 3', diaryContent: '일지 내용 3', diaryImage: ['https://via.placeholder.com/100'], cropId: 2 },
];

export const Route = createFileRoute('/_layout/diary/growDiary/_layout/$cropId')({
  component: GrowDiaryPage,
});

function GrowDiaryPage() {
  const { cropId }: { cropId: string } = Route.useParams();
  const crop = dummyCrops.find(crop => crop.id.toString() === cropId) || null;
  const diaryEntries = dummyDiaryEntries.filter(entry => entry.cropId.toString() === cropId);
  const [pivotDate, setPivotDate] = useState(new Date());

  const onDecreaseMonth = () => {
    setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() - 1));
  };

  const onIncreaseMonth = () => {
    setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() + 1));
  };

  const formatMonth = (month: number) => (month < 9 ? `0${month + 1}` : `${month + 1}`);

  if (!crop) {
    return <div>Loading...</div>;
  }

  const registrationDate = new Date(crop.date);
  const today = new Date();
  const daysSinceRegistration = differenceInDays(today, registrationDate);

  const diaryEntriesByMonth = diaryEntries.reduce((acc: Record<string, DiaryEntry[]>, entry) => {
    const month = format(new Date(entry.selectedDate), 'yyyy-MM');
    if (!acc[month]) {
      acc[month] = [];
    }
    acc[month].push(entry);
    return acc;
  }, {});

  return (
    <>
      <div className={cx('growDiaryContainer')}>
        <div className={cx('profileSection')}>
          <div className={cx('cropImage')}>
            <img src={Tomato} alt={crop.nickname}  />
          </div>
          
          <div className={cx('cropInfo')}>
            <h2>{crop.owner}님의 {crop.nickname}</h2>
            <div className={cx('infoImages')}>
              <div className={cx('info')}>
                <img src={GrowDiary} alt="growDiary" />
                <p><span>{daysSinceRegistration}</span>일째</p>
              </div>
              <div className={cx('info')}>
                <img src={Share} alt="share" />
                <p>0 회</p>
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
                {entries.map(entry => (
                  <div key={entry.diaryId} className={cx('entry')}>
                    <img src={Story1} alt={entry.diaryTitle} className={cx('entryImage')} />
                    {/* <img src={entry.diaryImage[0]} alt={entry.diaryTitle} className={cx('entryImage')} /> */}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default GrowDiaryPage;

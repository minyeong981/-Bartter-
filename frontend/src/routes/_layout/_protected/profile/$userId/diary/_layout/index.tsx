import { useQuery } from '@tanstack/react-query';
import {createFileRoute } from '@tanstack/react-router';
import {useEffect, useState} from 'react';

import EmptyPost from '@/components/Empty/EmptyPost';
import HeaderWithLabelAndBackButton from '@/components/Header/HeaderWithLabelAndBackButton';
import DayDiary from '@/components/ProfileDiary/DayDiary';
import MonthHeader from '@/components/ProfileDiary/MonthHeader';
import MonthHeaderButton from '@/components/ProfileDiary/MonthHeaderButton';
import barter from '@/services/barter';
import querykeys from '@/util/querykeys';

import styles from './../profileDiary.module.scss';

export const Route = createFileRoute('/_layout/_protected/profile/$userId/diary/_layout/')({
  component: ProfileCropDiary,
});

function groupByDate(diaries : CropDiaryThumbnail[]): CropDiaryThumbnail[][]{
  const groupedDiary : CropDiaryThumbnail[][]= Array.from({length: 32}, ()=> []);

  diaries.forEach(diary => {
    const date = new Date(diary.performDate);
    const day = date.getDate();
    groupedDiary[day].push(diary);
  });
  return groupedDiary
}

export default function ProfileCropDiary() {

  const { userId }: {userId: UserId} = Route.useParams();
  const [pivotDate, setPivotDate] = useState<Date>(new Date());
  const [year, setYear ] = useState<number>(pivotDate.getFullYear())
  const [month, setMonth ] = useState<number>(pivotDate.getMonth()+1)
  const page = 0;
  const limit = 100;

  const { data : cropDiary } = useQuery({
    queryKey: [querykeys.DIARY_LIST, userId, page, limit, year, month],
    queryFn: () => barter.getCropDiaryListByUser(userId, page, limit, year, month) // 달은 +1
  })


  const diaries = cropDiary?.data.data || [];
  const onDecreaseMonth = () => {
    const newDate = new Date(pivotDate.getFullYear(), pivotDate.getMonth() - 1);
    setPivotDate(newDate);
    setYear(newDate.getFullYear());
    setMonth(newDate.getMonth() + 1); // getMonth는 0부터 시작하기 때문에 +1
  };

  const onIncreaseMonth = () => {
    const newDate = new Date(pivotDate.getFullYear(), pivotDate.getMonth() + 1);
    setPivotDate(newDate);
    setYear(newDate.getFullYear());
    setMonth(newDate.getMonth() + 1); // getMonth는 0부터 시작하기 때문에 +1
  };

  useEffect(() => {
    // const groupedDiary = groupByDate(diaries);
  }, [pivotDate, cropDiary]);

  const groupedDiary = groupByDate(diaries);

  const formatMonth = (m : number) => (m < 9 ? `0${m + 1}` : `${m + 1}`);

  return (
    <div className={styles.Container}>
      <HeaderWithLabelAndBackButton label="농사 일지" />
      <MonthHeader
        title={`${pivotDate.getFullYear()}.${formatMonth(pivotDate.getMonth())}`}
        leftChild={<MonthHeaderButton text="<" onClick={onDecreaseMonth} />}
        rightChild={<MonthHeaderButton text=">" onClick={onIncreaseMonth} />}
      />
      {diaries.length === 0 ? (
        <div><EmptyPost text='해당 일자에 작성된 일지가 없습니다.'/></div>
      ) : (
        <div>
          {groupedDiary.map((diaryByDay, index) =>
            diaryByDay.length > 0 ? (
              <DayDiary key={index} diaries={diaryByDay}/>
            ) : null
          )}
        </div>
      )}
    </div>
   );
}
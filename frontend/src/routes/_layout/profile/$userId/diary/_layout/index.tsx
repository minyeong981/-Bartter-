import {createFileRoute} from '@tanstack/react-router';
import {format} from 'date-fns';
import {useState} from 'react';

import carrot from '@/assets/image/carrot.png';
import corn from '@/assets/image/corn.png';
import HeaderWithLabelAndBackButton from '@/components/Header/HeaderWithLabelAndBackButton';
import DayDiary from '@/components/ProfileDiary/DayDiary';
import MonthHeader from '@/components/ProfileDiary/MonthHeader';
import MonthHeaderButton from '@/components/ProfileDiary/MonthHeaderButton';

import styles from './../profileDiary.module.scss';

export const Route = createFileRoute('/_layout/profile/$userId/diary/_layout/')({
  component: ProfileCropDiary,
});


const getMonthlyData = (pivotDate: Date, data: CropDiaryProps[]) => {
  const beginTime = new Date(
    pivotDate.getFullYear(),
    pivotDate.getMonth(),
    1,
    0,
    0,
    0,
  ).getTime();

  const endTime = new Date(
    pivotDate.getFullYear(),
    pivotDate.getMonth() + 1,
    0,
    23,
    59,
    59,
  ).getTime();

  return data.filter(item => {
    const itemDate = new Date(item.createdAt).getTime();
    return beginTime <= itemDate && itemDate <= endTime;
  });
};

function groupByDate(data: CropDiaryProps[]) {
  return data.reduce((accumulator, item) => {
    const dateKey = format(new Date(item.createdAt), 'yyyy-MM-dd');

    if (!accumulator[dateKey]) {
      accumulator[dateKey] = []; // 해당 날짜에 대한 배열 생성
    }

    // 이미 배열 있었다면, 혹은 생성한 후
    accumulator[dateKey].push(item);
    return accumulator;
  }, []);
}

export default function ProfileCropDiary() {
  const {nickname}: {nickname: string} = Route.useParams();
  const [pivotDate, setPivotDate] = useState(new Date());

  const monthlyData = getMonthlyData(pivotDate, data);
  const groupedMonthlyData = groupByDate(monthlyData);

  const onDecreaseMonth = () => {
    setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() - 1));
  };

  const onIncreaseMonth = () => {
    setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() + 1));
  };

  const formatMonth = month => (month < 9 ? `0${month + 1}` : `${month + 1}`);

  return (
    <div className={styles.Container}>
      <HeaderWithLabelAndBackButton label="농사 일지" />
      <MonthHeader
        title={`${pivotDate.getFullYear()}.
            ${formatMonth(pivotDate.getMonth())}`}
        leftChild={<MonthHeaderButton text="<" onClick={onDecreaseMonth} />}
        rightChild={<MonthHeaderButton text=">" onClick={onIncreaseMonth} />}
      />
      <h1> params 확인 : {nickname} </h1>
      <div className={styles.overflow}>
        {Object.keys(groupedMonthlyData)
          .sort()
          .map(date => (
            <div key={date}>
              <DayDiary date={date} diaries={groupedMonthlyData[date]} />
            </div>
          ))}
      </div>
    </div>
  );
}
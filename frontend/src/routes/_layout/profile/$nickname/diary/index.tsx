import {createFileRoute} from '@tanstack/react-router';
import {format} from 'date-fns';
import {useState} from 'react';

import carrot from '@/assets/image/carrot.png';
import corn from '@/assets/image/corn.png';
import HeaderWithLabelAndBackButton from '@/components/Header/HeaderWithLabelAndBackButton';
import DayDiary from '@/components/ProfileDiary/DayDiary';
import MonthHeader from '@/components/ProfileDiary/MonthHeader';
import MonthHeaderButton from '@/components/ProfileDiary/MonthHeaderButton';

import styles from './index.module.scss';

export const Route = createFileRoute('/_layout/profile/$nickname/diary/')({
  component: ProfileCropDiary,
});

interface Crop {
  userId: number;
  cropId: number;
  nickname: string;
  image: string;
}

export interface CropDiaryProps {
  crop: Crop;
  title: string;
  content: string;
  image: string;
  createdAt: string;
}

const data: CropDiaryProps[] = [
  {
    crop: {
      userId: 0,
      cropId: 0,
      nickname: '당근',
      image: carrot,
    },
    title: '농사 일지 제목1',
    content: '농사 일지 내용',
    image: corn,
    createdAt: '2024-08-11T02:11:05.883Z',
  },
  {
    crop: {
      userId: 0,
      cropId: 0,
      nickname: '당근',
      image: carrot,
    },
    title: '농사 일지 제목2',
    content: '농사 일지 내용',
    image: corn,
    createdAt: '2024-08-11T02:11:05.883Z',
  },
  {
    crop: {
      userId: 0,
      cropId: 0,
      nickname: '당근',
      image: carrot,
    },
    title: '농사 일지 제목3',
    content: '농사 일지 내용',
    image: corn,
    createdAt: '2024-08-20T02:11:05.883Z',
  },
];

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
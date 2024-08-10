import 'react-datepicker/dist/react-datepicker.css';

import { createFileRoute } from '@tanstack/react-router';
import classnames from 'classnames/bind';
import { format } from 'date-fns';
import { useState } from 'react';

import LinkButton from '@/components/Buttons/LinkButton';
import Heading from '@/components/Heading';
import SemiCalendarInput from '@/components/Inputs/SemiCalendarInput';

import styles from '../registerCrop.module.scss';
import type { SearchParamNickName } from './1';

const cx = classnames.bind(styles);

export interface SearchParamDate extends SearchParamNickName{
  growDate: string;
}

export const Route = createFileRoute('/_layout/_protected/diary/registerCrop/_layout/2')({
  component: GetDatePage,
  validateSearch: ({crop, nickname}) : SearchParamNickName =>{
    return {
      crop: crop as CropCategoryDetail,
      nickname: nickname as string
    }
  }
});

function GetDatePage() {
  const {nickname} = Route.useSearch()
  const today = new Date();
  const formattedToday = format(today, 'yyyy-MM-dd');

  const [growDate, setGrowDate] = useState(formattedToday);
  const [selectedDate, setSelectedDate] = useState<Date | null>(today);

  function handleDateChange(date: Date | null) {
    setSelectedDate(date);
    if (date) {
      setGrowDate(format(date, 'yyyy-MM-dd')); // 날짜를 yyyy-MM-dd 형식으로 설정하고 저장
    } else {
      setGrowDate(formattedToday); // 선택된 날짜가 없으면 오늘 날짜로 설정
    }
  }

  return (
    <>
      <div className={cx('headingContainer')}>
        <Heading>
          {nickname}과/와
          <br />
          처음 만난 날짜를 입력해주세요.
        </Heading>
      </div>
      <div className={cx('inputContainer')}>
        <SemiCalendarInput
          label="처음 만난 날짜"
          selectedDate={selectedDate}
          onDateChange={handleDateChange}
        />
      </div>
      <div className={cx('buttonContainer')}>
        <LinkButton
          buttonStyle={{ style: 'primary', size: 'large' }}
          to="/diary/registerCrop/3"
          search={(prev) => ({ ...prev, growDate })}
        >
          다음
        </LinkButton>
      </div>
    </>
  );
}

export default GetDatePage;
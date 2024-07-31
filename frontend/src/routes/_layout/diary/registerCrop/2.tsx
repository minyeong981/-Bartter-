import 'react-datepicker/dist/react-datepicker.css';

import { createFileRoute } from '@tanstack/react-router';
import classnames from 'classnames/bind';
import { format } from 'date-fns';
import { useState } from 'react';

import LinkButton from '@/components/Buttons/LinkButton';
import Heading from '@/components/Heading';
import SemiCalendarInput from '@/components/Inputs/SemiCalendarInput';
import useRootStore from '@/store';

import styles from './registerCrop.module.scss';

const cx = classnames.bind(styles);

export const Route = createFileRoute('/_layout/diary/registerCrop/2')({
  component: GetDatePage,
});

function GetDatePage() {
  const { nickname, setDate } = useRootStore(state => ({
    nickname: state.nickname,
    setDate: state.setDate,
  }));
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  function handleDateChange(date: Date | null) {
    setSelectedDate(date);
    if (date) {
      setDate(format(date, 'yyyy-MM-dd')); // 날짜를 yyyy-MM-dd 형식으로 설정하고 저장
    }
  }

  return (
    <div className={cx('registerPage')}>
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
        >
          다음
        </LinkButton>
      </div>
    </div>
  );
}

export default GetDatePage;

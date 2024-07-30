import 'react-datepicker/dist/react-datepicker.css';

import { createFileRoute } from '@tanstack/react-router';
import classnames from 'classnames/bind';
import { format } from 'date-fns';
import { useState } from 'react';
import DatePicker from 'react-datepicker';

import LinkButton from '@/components/Buttons/LinkButton.tsx';
import Heading from '@/components/Heading';
import useRegisterCropStore from '@/store/registerCropStore';

import styles from './registerCrop.module.scss';

const cx = classnames.bind(styles);

export const Route = createFileRoute('/_layout/diary/registerCrop/2')({
  component: GetDatePage,
});

function GetDatePage() {
  const nickname = useRegisterCropStore(state => state.nickname);
  const setDate = useRegisterCropStore(state => state.setDate);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    if (date) {
      setDate(format(date, 'yyyy-MM-dd')); // 날짜를 yyyy-MM-dd 형식으로 설정하고 저장
    }
  };

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
        <label className={cx('inputLabel')}>처음 만난 날짜</label>
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          placeholderText={format(new Date(), 'yyyy-MM-dd')} // 오늘 날짜를 placeholder로 설정
          dateFormat="yyyy-MM-dd"
          className={cx('datePicker')}
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

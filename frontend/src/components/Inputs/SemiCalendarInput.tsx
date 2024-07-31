import classnames from 'classnames/bind';
import { format } from 'date-fns';
import React from 'react';
import DatePicker from 'react-datepicker';

import styles from './input.module.scss';

const cx = classnames.bind(styles);

interface SemiCalendarInputProps {
  label: string;
  selectedDate: Date | null;
  onDateChange: (date: Date | null) => void;
}

const SemiCalendarInput: React.FC<SemiCalendarInputProps> = ({ label, selectedDate, onDateChange }) => {
  return (
    <div className={cx('semiCalenderInput')}>
      <label className={cx('inputLabel')}>{label}</label>
      <DatePicker
        selected={selectedDate}
        onChange={onDateChange}
        placeholderText={format(new Date(), 'yyyy-MM-dd')} // 오늘 날짜를 placeholder로 설정
        dateFormat="yyyy-MM-dd"
        className={cx('datePicker')}
      />
    </div>
  );
};

export default SemiCalendarInput;

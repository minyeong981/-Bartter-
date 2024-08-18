import classnames from 'classnames/bind';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
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
  const placeholder = selectedDate ? format(selectedDate, 'yyyy/MM/dd') : '날짜를 선택하세요';

  return (
    <div className={cx('labeledInput')}>
      <label className={cx('inputLabel')}>{label}</label>
      <div className={cx('semiCalenderInput')}>
        <DatePicker
          selected={selectedDate}
          onChange={onDateChange}
          placeholderText={placeholder}
          dateFormat="yyyy/MM/dd"
          className={cx('datePicker')}
          locale={ko}
          maxDate={new Date()} // 오늘 이후 날짜 선택 불가
          renderCustomHeader={({
            date,
            decreaseMonth,
            increaseMonth,
            prevMonthButtonDisabled,
            nextMonthButtonDisabled,
          }) => (
            <div className={cx('customHeader')}>
              <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled} className={cx('navButton')}>
                {'<'}
              </button>
              <span className={cx('dateDisplay')}>{format(date, 'yyyy. MM', { locale: ko })}</span>
              <button onClick={increaseMonth} disabled={nextMonthButtonDisabled} className={cx('navButton')}>
                {'>'}
              </button>
            </div>
          )}
        />
      </div>
    </div>
  );
};

export default SemiCalendarInput;

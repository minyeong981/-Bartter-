import { useSuspenseQuery } from '@tanstack/react-query';
import classnames from 'classnames/bind';
import { useEffect, useState } from 'react';

import CustomCalendar from '@/components/Calendar/CustomCalendar';
import barter from '@/services/barter';
import querykeys from '@/util/querykeys';

import styles from './calendar.module.scss';

const cx = classnames.bind(styles);

interface CalendarPageProps {
  onDateChange: (date: Date) => void;
  initialDate?: string; // 'yyyy-MM-dd' 형식의 문자열로 받음
}

export default function CalendarPage({ onDateChange, initialDate }: CalendarPageProps) {
  const initialDateObject = initialDate ? new Date(initialDate) : new Date();
  const [year, setYear] = useState(initialDateObject.getFullYear());
  const [month, setMonth] = useState(initialDateObject.getMonth() + 1);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>(initialDateObject);
  const [highlightDates, setHighlightDates] = useState<Date[]>([]);

  const { data } = useSuspenseQuery({
    queryKey: [querykeys.HAS_DIARY, year, month],
    queryFn: () => barter.getHasDiary(year, month),
  });

  useEffect(() => {
    if (data) {
      const responseData = data.data.data;
      const newHighlightDates = responseData.map((isDiary) => new Date(isDiary));
      setHighlightDates(newHighlightDates);
    }
  }, [data, year, month]);

  const toggleCalendar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleMonthYearChange = (year: number, month: number) => {
    setYear(year);
    setMonth(month);
  };

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
    onDateChange(date);
  };

  return (
    <div className={cx('calendar-container')}>
      <div className={cx('calendar-wrapper', { collapsed: isCollapsed })}>
        <CustomCalendar
          isCollapsed={isCollapsed}
          onDateChange={handleDateChange}
          onMonthYearChange={handleMonthYearChange}
          highlightDates={highlightDates}
          selectedDate={selectedDate}
        />
      </div>
      <button className={cx('toggle-button')} onClick={toggleCalendar}>
        {isCollapsed ? '달력 펼치기' : '달력 접기'}
      </button>
      <hr className={cx('customHr')} />
    </div>
  );
}

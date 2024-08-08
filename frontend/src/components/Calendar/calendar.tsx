import { useQuery } from '@tanstack/react-query';
import classnames from 'classnames/bind';
import { useState } from 'react';

import CustomCalendar from '@/components/Calendar/CustomCalendar';
import barter from '@/services/barter';

import styles from './calendar.module.scss';

const cx = classnames.bind(styles);

interface CalendarPageProps {
  onDateChange: (date: Date) => void;
  // diaryEntries?: { selectedDate: string }[];
}

export default function CalendarPage({ onDateChange }: CalendarPageProps) {
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const { data } = useQuery({
    queryKey: ['hasDiary', year, month],
    queryFn: () => barter.getHasDiary(year, month),
  })

  const toggleCalendar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const highlightDates = data?.data.data.map(entry => new Date(entry.selectedDate)) || [];
  // const highlightDates = diaryEntries.map(entry => new Date(entry.selectedDate));

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

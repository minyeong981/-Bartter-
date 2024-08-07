// import { useQuery } from '@tanstack/react-query';
import classnames from 'classnames/bind';
import { useState } from 'react';

import CustomCalendar from '@/components/Calendar/CustomCalendar';

// import barter from '@/services/barter';
import styles from './calendar.module.scss';

const cx = classnames.bind(styles);

interface CalendarPageProps {
  onDateChange: (date: Date) => void;
  diaryEntries?: { selectedDate: string }[];
}

export default function CalendarPage({ onDateChange, diaryEntries = [] }: CalendarPageProps) {
  // const { data } = useQuery({
  //   queryKey: ['hasDiary'],
  //   queryFn: () => barter.
  // })

  // const hasDiary = data.data;
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCalendar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const highlightDates = diaryEntries.map(entry => new Date(entry.selectedDate));

  return (
    <div className={cx('calendar-container')}>
      <div className={cx('calendar-wrapper', { collapsed: isCollapsed })}>
        <CustomCalendar
          isCollapsed={isCollapsed}
          onDateChange={onDateChange}
          highlightDates={highlightDates}
        />
      </div>
      <button className={cx('toggle-button')} onClick={toggleCalendar}>
        {isCollapsed ? '달력 펼치기' : '달력 접기'}
      </button>
      <hr className={cx('customHr')} />
    </div>
  );
}

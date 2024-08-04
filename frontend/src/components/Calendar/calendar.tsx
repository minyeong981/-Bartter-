import classnames from 'classnames/bind';
import { useState } from 'react';

import CustomCalendar from '@/components/Calendar/CustomCalendar';

import styles from './calendar.module.scss';

const cx = classnames.bind(styles);

interface CalendarPageProps {
  onDateChange: (date: Date) => void;
  diaryEntries?: { selectedDate: Date }[];
}

export default function CalendarPage({ onDateChange, diaryEntries = [] }: CalendarPageProps) {
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
      <hr />
    </div>
  );
}

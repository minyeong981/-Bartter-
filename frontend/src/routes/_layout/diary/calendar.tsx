import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';

import CustomCalendar from '@/components/Calendar/Calendar';

import styles from './calendar.module.scss';

export default function CalendarPage() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCalendar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={styles['calendar-container']}>
      <div className={`${styles['calendar-wrapper']} ${isCollapsed ? styles.collapsed : ''}`}>
        <CustomCalendar isCollapsed={isCollapsed} />
      </div>
      <button className={styles['toggle-button']} onClick={toggleCalendar}>
        {isCollapsed ? '달력 펼치기' : '달력 접기'}
      </button>
    </div>
  );
}

export const Route = createFileRoute('/_layout/diary/calendar')({
  component: CalendarPage
});

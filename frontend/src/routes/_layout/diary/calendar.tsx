import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useState } from 'react';

import LinkButton from '@/components/Buttons/LinkButton';
import CustomCalendar from '@/components/Calendar/Calendar';
import TodayAlarm from '@/components/TodayAlarm/TodayAlarm';

import styles from './calendar.module.scss';

export default function CalendarPage() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [hasDiaryEntry, setHasDiaryEntry] = useState(false);

  const toggleCalendar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const checkDiaryEntry = () => {
    // 예시로 일지가 없는 상태로 설정
    setHasDiaryEntry(false);
  };

  useEffect(() => {
    checkDiaryEntry();
  }, []);

  return (
    <div className={styles['calendar-container']}>
      <div className={`${styles['calendar-wrapper']} ${isCollapsed ? styles.collapsed : ''}`}>
        <CustomCalendar isCollapsed={isCollapsed} />
      </div>
      <button className={styles['toggle-button']} onClick={toggleCalendar}>
        {isCollapsed ? '달력 펼치기' : '달력 접기'}
      </button>
      <hr />
      <TodayAlarm hasDiaryEntry={hasDiaryEntry} />
      <div className={styles['link-button-wrapper']}>
        <LinkButton 
          to='/diary/writeDiary/selectCrop' 
          buttonStyle={{ style: 'primary', size: 'large' }}
        >
          일지 쓰기
        </LinkButton>
      </div>
    </div>
  );
}

export const Route = createFileRoute('/_layout/diary/calendar')({
  component: CalendarPage
});

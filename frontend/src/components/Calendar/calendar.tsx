import {createFileRoute} from '@tanstack/react-router';
import classnames from 'classnames/bind';
import {useEffect, useState} from 'react';

import LinkButton from '@/components/Buttons/LinkButton';
import CustomCalendar from '@/components/Calendar/CustomCalendar';
import TodayAlarm from '@/components/TodayAlarm/todayAlarm';

import styles from './calendar.module.scss';

const cx = classnames.bind(styles);

export const Route = createFileRoute('/_layout/diary/calendar')({
  component: CalendarPage,
});

export default function CalendarPage() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [hasDiaryEntry, setHasDiaryEntry] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const toggleCalendar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const checkDiaryEntry = () => {
    // 예시로 일지가 없는 상태로 설정
    setHasDiaryEntry(false);
  };

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
  };

  useEffect(() => {
    checkDiaryEntry();
  }, []);

  const formatDate = (date: Date) => {
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${month}월 ${day}일`;
  };

  return (
    <div className={cx('calendar-container')}>
      <div className={cx('calendar-wrapper', {collapsed: isCollapsed})}>
        <CustomCalendar isCollapsed={isCollapsed} onDateChange={handleDateChange} />
      </div>
      <button className={cx('toggle-button')} onClick={toggleCalendar}>
        {isCollapsed ? '달력 펼치기' : '달력 접기'}
      </button>
      <hr />
      <div className={cx('show-date')}>
        {`${selectedDate ? formatDate(selectedDate) : formatDate(new Date())}`}
      </div>
      <TodayAlarm hasDiaryEntry={hasDiaryEntry} />
      <div className={cx('link-button-wrapper')}>
        <LinkButton
          to="/diary/write/1"
          buttonStyle={{style: 'primary', size: 'large'}}
        >
          일지 쓰기
        </LinkButton>
      </div>
    </div>
  );
}

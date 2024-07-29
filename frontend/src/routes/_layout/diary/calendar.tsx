import {createFileRoute} from '@tanstack/react-router';
import classnames from 'classnames/bind';
import {useEffect, useState} from 'react';

import LinkButton from '@/components/Buttons/LinkButton';
import CustomCalendar from '@/components/Calendar';
import Index from '@/components/TodayAlarm';

import styles from './calendar.module.scss';

const cx = classnames.bind(styles);

export const Route = createFileRoute('/_layout/diary/calendar')({
  component: CalendarPage,
});

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
    <div className={cx('calendar-container')}>
      <div className={cx('calendar-wrapper', {collapsed: isCollapsed})}>
        <CustomCalendar isCollapsed={isCollapsed} />
      </div>
      <button className={cx('toggle-button')} onClick={toggleCalendar}>
        {isCollapsed ? '달력 펼치기' : '달력 접기'}
      </button>
      <hr />
      <Index hasDiaryEntry={hasDiaryEntry} />
      <div className={cx('link-button-wrapper')}>
        <LinkButton
          to="/diary/writeDiary/selectCrop"
          buttonStyle={{style: 'primary', size: 'large'}}
        >
          일지 쓰기
        </LinkButton>
      </div>
    </div>
  );
}
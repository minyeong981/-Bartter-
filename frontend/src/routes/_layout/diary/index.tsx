import { createFileRoute } from '@tanstack/react-router';
import classnames from 'classnames/bind';
import type { ReactElement } from 'react';
import { useEffect, useState } from 'react';

import TodayAlarm from '@/components/Alarm/todayAlarm';
import LinkButton from '@/components/Buttons/LinkButton';
import CalendarPage from '@/components/Calendar/calendar';
import MainCrops from '@/components/Crop/mainCrops';
import DiaryList from '@/components/Diary/DiaryList';
import TwoButton from '@/components/TwoButton/TwoButton';
import useRootStore from '@/store/index';

import styles from './diary.module.scss';

const cx = classnames.bind(styles);

interface DiaryEntry {
  diaryId: number;
  selectedDate: string;
  diaryTitle: string;
  diaryContent: string;
  diaryImage: string[];
  cropNickname: string;
  cropImage: string;
}

export const Route = createFileRoute('/_layout/diary/')({
  component: DiaryPage,
});

function DiaryPage() {
  const { activeComponent, setActiveComponent } = useRootStore();
  const { selectedDate, diaryTitle, diaryContent, diaryImage, cropNickname, cropImage } = Route.useSearch<DiaryEntry>();

  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([]);
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [hasDiaryEntry, setHasDiaryEntry] = useState(false);

  useEffect(() => {
    const storedEntries = JSON.parse(localStorage.getItem('diaryEntries') || '[]') as DiaryEntry[];
    setDiaryEntries(storedEntries);
    checkDiaryEntry(new Date());
  }, []);

  useEffect(() => {
    if (selectedDate && diaryTitle && diaryContent && diaryImage) {
      const storedEntries = JSON.parse(localStorage.getItem('diaryEntries') || '[]') as DiaryEntry[];
      const entryExists = storedEntries.some(
        (entry) => entry.selectedDate === selectedDate && entry.diaryTitle === diaryTitle
      );

      if (!entryExists) {
        const newEntry: DiaryEntry = {
          diaryId: storedEntries.length + 1, // 새로운 diaryId 생성
          selectedDate,
          diaryTitle,
          diaryContent,
          diaryImage,
          cropNickname,
          cropImage,
        };

        const updatedEntries = [...storedEntries, newEntry];
        localStorage.setItem('diaryEntries', JSON.stringify(updatedEntries));
        setDiaryEntries(updatedEntries);
        checkDiaryEntry(new Date(selectedDate));
      }
    }
  }, [selectedDate, diaryTitle, diaryContent, diaryImage, cropNickname, cropImage]);

  function handleDateChange(date: Date) {
    setCurrentDate(date);
    checkDiaryEntry(date);
  }

  function checkDiaryEntry(date: Date) {
    const hasEntry = diaryEntries.some(entry => new Date(entry.selectedDate).toDateString() === date.toDateString());
    setHasDiaryEntry(hasEntry);
  }

  let renderedComponent: null | ReactElement = null;

  switch (activeComponent) {
    case '달력':
      renderedComponent = (
        <>
          <CalendarPage onDateChange={handleDateChange} />
          <div className={cx('content-wrapper')}>
            <div className={cx('show-date')}>
              {`${currentDate.getMonth() + 1}월 ${currentDate.getDate()}일`}
            </div>
            <TodayAlarm hasDiaryEntry={hasDiaryEntry} />
            {hasDiaryEntry && (
              <DiaryList
                diaryEntries={diaryEntries.filter(entry => new Date(entry.selectedDate).toDateString() === currentDate.toDateString())}
              />
            )}
            <div className={cx('link-button-wrapper')}>
              <LinkButton
                to="/diary/write/1"
                buttonStyle={{ style: 'primary', size: 'large' }}
              >
                일지 쓰기
              </LinkButton>
            </div>
          </div>
        </>
      );
      break;
    case '내 작물':
      renderedComponent = <MainCrops />;
      break;
    default:
      renderedComponent = null;
  }

  function handleButtonClick(button: string) {
    setActiveComponent(button);
  }

  return (
    <div className={cx('diaryContainer')}>
      <header className={cx('header')}>
        <TwoButton
          first="달력"
          second="내 작물"
          activeButton={activeComponent}
          onClick={handleButtonClick}
        />
      </header>
      <div className={cx('container')}>{renderedComponent}</div>
    </div>
  );
}

export default DiaryPage;

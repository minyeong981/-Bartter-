import { createFileRoute } from '@tanstack/react-router';
import classnames from 'classnames/bind';
import type { ReactElement } from 'react';
import { useEffect, useState } from 'react';

import TodayAlarm from '@/components/Alarm/todayAlarm';
import FloatingButton from '@/components/Buttons/FloatingButton';
import LinkButton from '@/components/Buttons/LinkButton';
import CalendarPage from '@/components/Calendar/calendar';
import CropModal from '@/components/Crop/CropModal';
import MainCrops from '@/components/Crop/mainCrops';
import DiaryList from '@/components/Diary/DiaryList';
import useRootStore from '@/store/index';

import styles from '../diary.module.scss';

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

export const Route = createFileRoute('/_layout/diary/_layout/')({
  component: DiaryPage,
});

function DiaryPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { activeComponent } = useRootStore();
  const { selectedDate, diaryTitle, diaryContent, diaryImage, cropNickname, cropImage } = Route.useSearch<DiaryEntry>();
  const { addCrop, crops, loadCrops, nickname, date, description, initialImage } = useRootStore(state => ({
    addCrop: state.addCrop,
    crops: state.crops,
    loadCrops: state.loadCrops,
    nickname: state.nickname,
    date: state.date,
    description: state.description,
    initialImage: state.initialImage,
  }));

  useEffect(() => {
    loadCrops();
  }, [loadCrops]);

  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([]);
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [hasDiaryEntry, setHasDiaryEntry] = useState(false);

  useEffect(() => {
    const storedEntries = JSON.parse(localStorage.getItem('diaryEntries') || '[]') as DiaryEntry[];
    setDiaryEntries(storedEntries);
    const today = new Date();
    checkDiaryEntry(today);
    setCurrentDate(today);
  }, []);

  useEffect(() => {
    if (selectedDate && diaryTitle && diaryContent && diaryImage) {
      const storedEntries = JSON.parse(localStorage.getItem('diaryEntries') || '[]') as DiaryEntry[];
      const entryExists = storedEntries.some(
        (entry) => entry.selectedDate === selectedDate && entry.diaryTitle === diaryTitle
      );

      if (!entryExists) {
        const newEntry: DiaryEntry = {
          diaryId: storedEntries.length + 1,
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

  useEffect(() => {
    checkDiaryEntry(currentDate);
  }, [diaryEntries]);

  function handleDateChange(date: Date) {
    setCurrentDate(date);
    checkDiaryEntry(date);
  }

  function checkDiaryEntry(date: Date) {
    const hasEntry = diaryEntries.some(entry => new Date(entry.selectedDate).toDateString() === date.toDateString());
    setHasDiaryEntry(hasEntry);
  }

  function handleModalOpen() {
    setIsModalOpen(true);
  }

  function handleModalClose() {
    setIsModalOpen(false);
  }

  function handleCropSelect(id: number) {
    const selectedCrop = crops.find(crop => crop.id === id);
    if (selectedCrop) {
      addCrop({
        id: selectedCrop.id,
        nickname: nickname || selectedCrop.name,
        image: initialImage || selectedCrop.image,
        date: date,
        description: description,
        name: selectedCrop.name,
      });
    }
  }

  let renderedComponent: null | ReactElement = null;

  switch (activeComponent) {
    case '달력':
      renderedComponent = (
        <>
          <CalendarPage onDateChange={handleDateChange} diaryEntries={diaryEntries} />
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
      renderedComponent = (
        <>
          <MainCrops />
          <FloatingButton onClick={handleModalOpen}>+ 등록하기</FloatingButton>
          {isModalOpen && (
            <CropModal
              show={isModalOpen}
              onClose={handleModalClose}
              onCropSelect={handleCropSelect}
              selectedCrop={null}
              showSearchBar={true}
            />
          )}
        </>
      );
      break;
    default:
      renderedComponent = null;
  }

  return (
    <div className={cx('diaryPage')}>
      <div className={cx('container')}>{renderedComponent}</div>
    </div>
  );
}

export default DiaryPage;

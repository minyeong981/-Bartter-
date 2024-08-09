import { createFileRoute, useNavigate } from '@tanstack/react-router';
import classnames from 'classnames/bind';
import type { ReactElement } from 'react';
import { useState } from 'react';

import TodayAlarm from '@/components/Alarm/todayAlarm';
import FloatingButton from '@/components/Buttons/FloatingButton';
import LinkButton from '@/components/Buttons/LinkButton';
import CalendarPage from '@/components/Calendar/calendar';
import CropModal from '@/components/Crop/CropModal';
import UserCrops from '@/components/Crop/UserCrops';
import DiaryList from '@/components/Diary/DiaryList';
import useRootStore from '@/store/index';

import styles from '../diary.module.scss';

const cx = classnames.bind(styles);

export const Route = createFileRoute('/_layout/_protected/diary/_layout/')({
  component: DiaryPage,
});

function DiaryPage() {
  const userId = useRootStore(state => state.userId);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { activeComponent } = useRootStore();

  const [currentDate, setCurrentDate] = useState<Date>(new Date());

  function handleDateChange(date: Date) {
    setCurrentDate(date);
  }

  function handleModalOpen() {
    setIsModalOpen(true);
  }

  function handleModalClose() {
    setIsModalOpen(false);
  }

  function handleSelectCrop(cropId: number) {
    navigate({ to: `/diary/growDiary/${cropId}`});
  }

  // Date 형식으로 포맷
  function formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
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
            <TodayAlarm />
            <DiaryList userId={userId} selectedDate={formatDate(currentDate)} />
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
          <UserCrops userId={userId} onSelectCrop={handleSelectCrop} />
          <FloatingButton onClick={handleModalOpen}>+ 등록하기</FloatingButton>
          {isModalOpen && (
            <CropModal
              show={isModalOpen}
              onClose={handleModalClose}
              onCropSelect={handleSelectCrop}
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

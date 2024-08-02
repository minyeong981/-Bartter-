import { createFileRoute } from '@tanstack/react-router';
import classnames from 'classnames/bind';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { useEffect, useState } from 'react';

import GeneralButton from '@/components/Buttons/GeneralButton';

import styles from './diaryDetail.module.scss';

const cx = classnames.bind(styles);

interface DiaryEntry {
  diaryId: number;
  selectedDate: string;
  diaryTitle: string;
  diaryContent: string;
  diaryImage: string[];
  cropImage: string;
  cropNickname: string;
}

function DiaryDetail() {
  const [diaryEntry, setDiaryEntry] = useState<DiaryEntry | null>(null);

  useEffect(() => {
    const state = window.history.state;
    if (state && state.entry) {
      setDiaryEntry(state.entry);
    } else {
      const urlParts = window.location.pathname.split('/');
      const diaryId = urlParts[urlParts.length - 1];

      fetch(`/api/diary/${diaryId}`)
        .then(response => response.json())
        .then(data => setDiaryEntry(data))
        .catch(error => console.error('Error fetching diary entry:', error));
    }
  }, []);

  if (!diaryEntry) {
    return <div>Loading...</div>;
  }

  const formattedDate = format(new Date(diaryEntry.selectedDate), 'yyyy-MM-dd HH:mm', { locale: ko });

  return (
    <div className={cx('diaryDetailContainer')}>
      <h1 className={cx('diaryTitle')}>{diaryEntry.diaryTitle}</h1>
      {diaryEntry.diaryImage && (
        <img src={diaryEntry.diaryImage[0]} alt="Diary" className={cx('diaryImage')} />
      )}
      <div className={cx('cropInfo')}>
        <img src={diaryEntry.cropImage} alt="Crop" className={cx('cropImage')} />
        <span className={cx('cropNickname')}>{diaryEntry.cropNickname}</span>
      </div>
      <p className={cx('diaryContent')}>{diaryEntry.diaryContent}</p>
      <p className={cx('diaryDate')}>{formattedDate}</p>
      <div className={cx('deleteButton')}>
        <GeneralButton
          onClick={() => handleDelete(diaryEntry.diaryId)}
          buttonStyle={{ style: 'outlined', size: 'large' }}
        >
          삭제하기
        </GeneralButton>
      </div>        
    </div>
  );
}

function handleDelete(diaryId: number) {
  // API 호출 로직 필요
  console.log('Delete diary entry with id:', diaryId);
}

export const Route = createFileRoute('/_layout/diary/detail/$diaryId')({
  component: DiaryDetail,
});

export default DiaryDetail;

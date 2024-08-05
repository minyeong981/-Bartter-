import { createFileRoute, useNavigate } from '@tanstack/react-router';
import classnames from 'classnames/bind';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { useEffect, useState } from 'react';

import GeneralButton from '@/components/Buttons/GeneralButton';
import HeaderWithLabelAndBackButton from '@/components/Header/HeaderWithLabelAndBackButton';

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
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const state = window.history.state;
    if (state && state.entry) {
      setDiaryEntry(state.entry);
    } else {
      // const urlParts = window.location.pathname.split('/');
      // const diaryId = urlParts[urlParts.length - 1];

      // fetch(`/api/diary/${diaryId}`)
      //   .then(response => response.json())
      //   .then(data => setDiaryEntry(data))
      //   .catch(error => console.error('error message:', error));
    }
  }, []);

  if (!diaryEntry) {
    return <div>Loading...</div>;
  }

  const formattedDate = format(new Date(diaryEntry.selectedDate), 'yyyy-MM-dd HH:mm', { locale: ko });

  function handleDeleteConfirm() {
    setShowDeleteConfirm(true);
  }

  function handleDeleteCancel() {
    setShowDeleteConfirm(false);
  }

  function handleDelete(diaryId: number) {
    fetch(`/api/diary/${diaryId}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (response.ok) {
          console.log('Diary entry deleted:', diaryId);
          navigate({
            to: '/diary',
            replace: true,
          });
        } else {
          console.error('Failed to delete diary entry:', diaryId);
        }
      })
      .catch(error => console.error('Error deleting diary entry:', error));
    setShowDeleteConfirm(false);
  }

  return (
    <div>
      <HeaderWithLabelAndBackButton label="농사 일지" />
      <div className={cx('diaryDetailContainer')}>
        <h1 className={cx('diaryTitle')}>{diaryEntry.diaryTitle}</h1>
        <div className={cx('diaryImage')} >
          {diaryEntry.diaryImage && (
          <img src={diaryEntry.diaryImage[0]} alt="Diary" />
        )}
        </div>
        <div className={cx('cropInfo')}>
          <img src={diaryEntry.cropImage} alt="Crop" className={cx('cropImage')} />
          <span className={cx('cropNickname')}>{diaryEntry.cropNickname}</span>
        </div>
        <p className={cx('diaryContent')}>{diaryEntry.diaryContent}</p>
        <p className={cx('diaryDate')}>{formattedDate}</p>
        <div className={cx('deleteButton')}>
          <GeneralButton
            onClick={handleDeleteConfirm}
            buttonStyle={{ style: 'outlined', size: 'large' }}
          >
            삭제하기
          </GeneralButton>
        </div>        
      </div>
      {showDeleteConfirm && ( 
        <div className={cx('deleteConfirm')}>
          <div className={cx('confirmText')}>일지를 삭제하시겠습니까?</div>
          <div className={cx('buttonContainer')}>
            <button onClick={() => handleDelete(diaryEntry.diaryId)}>네</button>
            <button onClick={handleDeleteCancel}>아니요</button>
          </div>
        </div>
      )}
    </div>
  );
}

export const Route = createFileRoute('/_layout/diary/detail/$diaryId')({
  component: DiaryDetail,
});

export default DiaryDetail;

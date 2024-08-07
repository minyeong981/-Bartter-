// import { useQuery } from '@tanstack/react-query';
// import { createFileRoute, useNavigate } from '@tanstack/react-router';
// import classnames from 'classnames/bind';
// import { format } from 'date-fns';
// import { ko } from 'date-fns/locale';
// import { useEffect, useState } from 'react';

// import GeneralButton from '@/components/Buttons/GeneralButton';
// import HeaderWithLabelAndBackButton from '@/components/Header/HeaderWithLabelAndBackButton';
// import barter from '@/services/barter';

// import styles from '../diaryDetail.module.scss';

// const cx = classnames.bind(styles);

// function DiaryDetail() {
//   const { data } = useQuery({
//     queryKey: ['diaryDetail', diaryId],
//     queryFn: () => barter.getCropDiary(diaryId)
//   })

//   const diary = data?.data.data || [];
//   // const [diaryEntry, setDiaryEntry] = useState<DiaryEntry | null>(null);
//   const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
//   const navigate = useNavigate();

//   // useEffect(() => {
//   //   const state = window.history.state;
//   //   if (state && state.entry) {
//   //     setDiaryEntry(state.entry);
//   //   } else {
//       // const urlParts = window.location.pathname.split('/');
//       // const diaryId = urlParts[urlParts.length - 1];

//       // fetch(`/api/diary/${diaryId}`)
//       //   .then(response => response.json())
//       //   .then(data => setDiaryEntry(data))
//       //   .catch(error => console.error('error message:', error));
//   //   }
//   // }, []);

//   // if (!diaryEntry) {
//   //   return <div>Loading...</div>;
//   // }

//   const formattedDate = format(new Date(diary.createdAt), 'yyyy-MM-dd HH:mm', { locale: ko });

//   function handleDeleteConfirm() {
//     setShowDeleteConfirm(true);
//   }

//   function handleDeleteCancel() {
//     setShowDeleteConfirm(false);
//   }

//   function handleDelete(diaryId: number) {
//     fetch(`/api/diary/${diaryId}`, {
//       method: 'DELETE',
//     })
//       .then(response => {
//         if (response.ok) {
//           console.log('Diary entry deleted:', diaryId);
//           navigate({
//             to: '/diary',
//             replace: true,
//           });
//         } else {
//           console.error('Failed to delete diary entry:', diaryId);
//         }
//       })
//       .catch(error => console.error('Error deleting diary entry:', error));
//     setShowDeleteConfirm(false);
//   }

//   return (
//     <div>
//       <HeaderWithLabelAndBackButton label="농사 일지" />
//       <div className={cx('diaryDetailContainer')}>
//         <h1 className={cx('diaryTitle')}>{diary.title}</h1>
//         <div className={cx('diaryImage')} >
//           {diary.image && (
//           <img src={diary.image[0]} alt="Diary" />
//         )}
//         </div>
//         <div className={cx('cropInfo')}>
//           <img src={diary.data.image} alt="Crop" className={cx('cropImage')} />
//           <span className={cx('cropNickname')}>{diary.data.nickname}</span>
//         </div>
//         <p className={cx('diaryContent')}>{diary.content}</p>
//         <p className={cx('diaryDate')}>{formattedDate}</p>
//         <div className={cx('deleteButton')}>
//           <GeneralButton
//             onClick={handleDeleteConfirm}
//             buttonStyle={{ style: 'outlined', size: 'large' }}
//           >
//             삭제하기
//           </GeneralButton>
//         </div>        
//       </div>
//       {showDeleteConfirm && ( 
//         <div className={cx('deleteConfirm')}>
//           <div className={cx('confirmText')}>일지를 삭제하시겠습니까?</div>
//           <div className={cx('buttonContainer')}>
//             <button onClick={() => handleDelete(diary.diaryId)}>네</button>
//             <button onClick={handleDeleteCancel}>아니요</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export const Route = createFileRoute('/_layout/diary/detail/_layout/$diaryId')({
//   component: DiaryDetail,
// });

// export default DiaryDetail;

// userId와 일지 쓴 작성자의 id가 같으면 삭제하기 버튼 보이기, 아니면 숨기기
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import classnames from 'classnames/bind';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { useState } from 'react';

import GeneralButton from '@/components/Buttons/GeneralButton';
import HeaderWithLabelAndBackButton from '@/components/Header/HeaderWithLabelAndBackButton';
import DeleteDiaryModal from '@/components/Modals/DeleteDiaryModal/deleteDiaryModal';
import barter from '@/services/barter';

import styles from '../diaryDetail.module.scss';

const cx = classnames.bind(styles);

export default function DiaryDetail() {
  const queryClient = useQueryClient();
  const diaryId = 3;
  // const {diaryId}: {diaryId: number} = Route.useParams();

  const navigate = useNavigate();
  const { data } = useQuery({
    queryKey: ['diaryDetail', diaryId],
    queryFn: () => barter.getCropDiary(diaryId)
  });

  const deleteDiary = useMutation({
    mutationFn: (diaryId: number) => {
      return barter.deleteCropDiary(diaryId);
    },
    onError: () => {
      console.log('작성자만 삭제할 수 있습니다.');
      window.alert('작성자만 삭제할 수 있습니다.');
    }, 
    onSuccess: () => {
      queryClient.invalidateQueries(['diaryDetail']);
      navigate({ to: '/diary' });
    }
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const diary = data?.data.data || {};

  const isValidDate = (date: any) => {
    return !isNaN(new Date(date).getTime());
  };

  const formattedDate = isValidDate(diary.createdAt)
    ? format(new Date(diary.createdAt), 'yyyy-MM-dd HH:mm', { locale: ko })
    : 'Invalid date';

  const handleDeleteDiary = (diaryId: number) => {
    deleteDiary.mutate(diaryId);
  };

  return (
    <div>
      <HeaderWithLabelAndBackButton label="농사 일지" />
      <div className={cx('diaryDetailContainer')}>
        <h1 className={cx('diaryTitle')}>{diary.title}</h1>
        <div className={cx('diaryImage')}>
          {diary.image && (
            <img src={'http://' + diary.image} alt="Diary" />
          )}
        </div>
        <div className={cx('cropInfo')}>
          <img src={'http://' + diary.data?.image} alt="Crop" className={cx('cropImage')} />
          <span className={cx('cropNickname')}>{diary.data?.nickname}</span>
        </div>
        <p className={cx('diaryContent')}>{diary.content}</p>
        <p className={cx('diaryDate')}>{formattedDate}</p>
        <div className={cx('deleteButton')}>
          <GeneralButton
            onClick={() => setIsModalOpen(true)}
            buttonStyle={{ style: 'outlined', size: 'large' }}
          >
            삭제하기
          </GeneralButton>
        </div>        
      </div>
      {isModalOpen && (
        <DeleteDiaryModal
          onClickOutside={() => setIsModalOpen(false)}
          onConfirm={() => {
            handleDeleteDiary(diaryId);
            setIsModalOpen(false);
          }}
        />
      )}
    </div>
  );
}
export const Route = createFileRoute('/_layout/diary/detail/_layout/$diaryId')({
  component: DiaryDetail,
});

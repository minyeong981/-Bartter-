// userId와 일지 쓴 작성자의 id가 같으면 삭제하기 버튼 보이기, 아니면 숨기기
import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import classnames from 'classnames/bind';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { useState } from 'react';

import GeneralButton from '@/components/Buttons/GeneralButton';
import HeaderWithLabelAndBackButton from '@/components/Header/HeaderWithLabelAndBackButton';
import DeleteDiaryModal from '@/components/Modals/DeleteDiaryModal/deleteDiaryModal';
import barter from '@/services/barter';
import querykeys from '@/util/querykeys';

import styles from '../diaryDetail.module.scss';

const cx = classnames.bind(styles);

export default function DiaryDetail() {
  const queryClient = useQueryClient();
  const {cropDiaryId} = Route.useParams();
  const navigate = useNavigate();
  
  const { data } = useSuspenseQuery({
    queryKey: [querykeys.DIARY_DETAIL, cropDiaryId],
    queryFn: () => barter.getCropDiary(Number(cropDiaryId))
  });

  const responseData = data.data.data
  


  const deleteDiary = useMutation({
    mutationFn: (cropDiaryId: number) => {
      return barter.deleteCropDiary(cropDiaryId);
    },
    onError: () => {
      console.log('작성자만 삭제할 수 있습니다.');
      window.alert('작성자만 삭제할 수 있습니다.');
    }, 
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey:[querykeys.DIARY_DETAIL]});
      navigate({ to: '/diary' });
    }
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const isValidDate = (date: any) => {
    return !isNaN(new Date(date).getTime());
  };

  const formattedDate = isValidDate(responseData.createdAt)
    ? format(responseData.createdAt, 'yyyy-MM-dd HH:mm', { locale: ko })
    : 'Invalid date';

  const handleDeleteDiary = (diaryId: number) => {
    deleteDiary.mutate(diaryId);
  };

//  console.log(responseData)
  return (
    <div>
      <HeaderWithLabelAndBackButton label="농사 일지" />
      <div className={cx('diaryDetailContainer')}>
        <h1 className={cx('diaryTitle')}>{responseData.title}</h1>
        <div className={cx('diaryImage')}>
          {responseData.image && (
            <img src={'http://' + responseData.image} alt="Diary" />
          )}
        </div>
        <div className={cx('cropInfo')}>
          {/* <img src={'http://' + responseData.crop.image} alt="Crop" className={cx('cropImage')} /> */}
          {/* <img src={`http://${responseData.crop.image}`} alt="Crop" className={cx('cropImage')} /> */}

          <span className={cx('cropNickname')}>{responseData.crop.nickname}</span>
        </div>
        <p className={cx('diaryContent')}>{responseData.content}</p>
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
            handleDeleteDiary(Number(cropDiaryId));
            setIsModalOpen(false);
          }}
        />
      )}
    </div>
  );
}
export const Route = createFileRoute('/_layout/_protected/diary/detail/_layout/$cropDiaryId')({
  component: DiaryDetail,
});

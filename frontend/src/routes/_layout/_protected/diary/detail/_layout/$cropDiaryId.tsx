import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query';
import {createFileRoute, useNavigate} from '@tanstack/react-router';
import classnames from 'classnames/bind';
import {format} from 'date-fns';
import {ko} from 'date-fns/locale';
import {useState} from 'react';

import GeneralButton from '@/components/Buttons/GeneralButton';
import HeaderWithLabelAndBackButton from '@/components/Header/HeaderWithLabelAndBackButton';
import DeleteDiaryModal from '@/components/Modals/DeleteDiaryModal/deleteDiaryModal';
import barter from '@/services/barter';
import useRootStore from '@/store';
import querykeys from '@/util/querykeys';

import styles from '../diaryDetail.module.scss';

const cx = classnames.bind(styles);

export default function DiaryDetail() {
  const queryClient = useQueryClient();
  const myId = useRootStore(state => state.userId);
  const {cropDiaryId} = Route.useParams();
  const navigate = useNavigate();

  const {data} = useSuspenseQuery({
    queryKey: [querykeys.DIARY_DETAIL, cropDiaryId],
    queryFn: () => barter.getCropDiary(Number(cropDiaryId)),
  });

  const responseData = data.data.data;
  const userId = responseData.crop.userId;

  const deleteDiary = useMutation({
    mutationFn: (cropDiaryId: number) => {
      return barter.deleteCropDiary(cropDiaryId);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [querykeys.DIARY_LIST],
        refetchType: 'all',
      });
      await navigate({to: '/diary'});
    },
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const isValidDate = (date: any) => {
    return !isNaN(new Date(date).getTime());
  };

  const formattedDate = isValidDate(responseData.createdAt)
    ? format(responseData.createdAt, 'yyyy-MM-dd HH:mm', {locale: ko})
    : 'Invalid date';

  const handleMoveGrowdiary = (cropId: number) => {
    navigate({to: `/diary/growDiary/${cropId}`});
  };

  const handleDeleteDiary = (diaryId: number) => {
    deleteDiary.mutate(diaryId);
  };

  return (
    <div>
      <HeaderWithLabelAndBackButton label="농사 일지" />
      <div className={cx('diaryDetailContainer')}>
        <div
          className={cx('cropInfo')}
          onClick={() => handleMoveGrowdiary(responseData.crop.cropId)}
          style={{cursor: 'pointer'}} // 클릭 가능하도록 포인터 커서 설정
        >
          <img
            src={responseData.crop.image}
            alt="Crop"
            className={cx('cropImage')}
          />
          <span className={cx('cropNickname')}>
            {responseData.crop.nickname}
          </span>
        </div>
        <div className={cx('diaryImage')}>
          {responseData.image && <img src={responseData.image} alt="Diary" />}
        </div>

        <h1 className={cx('diaryTitle')}>{responseData.title}</h1>

        <p className={cx('diaryContent')}>{responseData.content}</p>
        <p className={cx('diaryDate')}>{formattedDate}</p>

        {Number(myId) === Number(userId) ? (
          <div className={cx('deleteButton')}>
            <GeneralButton
              onClick={() => setIsModalOpen(true)}
              buttonStyle={{style: 'outlined', size: 'medium'}}
            >
              삭제하기
            </GeneralButton>
          </div>
        ) : (
          ''
        )}
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
export const Route = createFileRoute(
  '/_layout/_protected/diary/detail/_layout/$cropDiaryId',
)({
  component: DiaryDetail,
});
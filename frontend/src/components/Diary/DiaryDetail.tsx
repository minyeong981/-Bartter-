import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import classnames from 'classnames/bind';

import barter from '@/services/barter';
import querykeys from '@/util/querykeys';

import styles from './DiaryDetail.module.scss';

const cx = classnames.bind(styles);

export default function DiaryDetail({ cropDiaryId }: { cropDiaryId: number }) {
  const navigate = useNavigate();

  const { data, isLoading, isError } = useSuspenseQuery({
    queryKey: [querykeys.DIARY_DETAIL, cropDiaryId],
    queryFn: () => barter.getCropDiaryListByCrop(cropDiaryId)
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>오류가 발생했습니다.</div>;

  const thumbnailEntry = data.data.data.thumbnailList.find((entry: { cropDiaryId: number }) => entry.cropDiaryId === cropDiaryId);

  if (!thumbnailEntry) return <div>데이터가 없습니다.</div>;

  return (
    <div className={cx('diaryDetailContainer')}>
      <div className={cx('thumbnailList')}>
        <img
          src={'http://' + thumbnailEntry.image}
          alt={`Diary entry ${thumbnailEntry.cropDiaryId}`}
          onClick={() => navigate({ to: `/diary/detail/${thumbnailEntry.cropDiaryId}` })}
        />
      </div>
    </div>
  );
}

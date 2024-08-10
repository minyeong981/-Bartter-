import { useSuspenseQuery } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import classnames from 'classnames/bind';

import barter from '@/services/barter';
import querykeys from '@/util/querykeys';

import styles from './DiaryThumbnail.module.scss';

const cx = classnames.bind(styles);

export default function DiaryDetail({ cropDiaryId }: { cropDiaryId: number }) {
  const navigate = useNavigate();

  const { data } = useSuspenseQuery({
    queryKey: [querykeys.DIARY_DETAIL, cropDiaryId],
    queryFn: () => barter.getCropDiary(cropDiaryId)
  });

  const diaryThumbnail = data.data.data

  if (!diaryThumbnail.image) return;

  return (
    <img
      className={cx('thumbnail')}
      src={diaryThumbnail.image}
      alt={`Diary entry ${diaryThumbnail.cropDiaryId}`}
      onClick={() => navigate({ to: `/diary/detail/${diaryThumbnail.cropDiaryId}` })}
    />
  );
}

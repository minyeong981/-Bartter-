import { useSuspenseQuery } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import classnames from 'classnames/bind';

import barter from '@/services/barter';
import querykeys from '@/util/querykeys';

import styles from './DiaryDetail.module.scss';

const cx = classnames.bind(styles);

export default function DiaryDetail({ cropDiaryId }: { cropDiaryId: number }) {
  const navigate = useNavigate();

  const { data } = useSuspenseQuery({
    queryKey: [querykeys.DIARY_DETAIL, cropDiaryId],
    queryFn: () => barter.getCropDiary(cropDiaryId)
  });

  const diaryThumbnail = data.data.data

  if (!diaryThumbnail.image) return;

  // const images = diaryThumbnail.image.split(',');

  return (
    // ui 한 줄에 두개씩 -> 변경해야함
    <div className={cx('diaryDetailContainer')}>
      <div className={cx('thumbnailList')}>
        <img
          className={cx('thumbnail')}
          src={diaryThumbnail.image}
          alt={`Diary entry ${diaryThumbnail.cropDiaryId}`}
          onClick={() => navigate({ to: `/diary/detail/${diaryThumbnail.cropDiaryId}` })}
        />
      </div>
    </div>
  );
}

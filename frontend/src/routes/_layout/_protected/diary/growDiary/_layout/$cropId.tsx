import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import classnames from 'classnames/bind';
import { format } from 'date-fns';
import { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

import GrowDiary from '@/assets/image/growdiary.png';
import Share from '@/assets/image/share.png';
import DiaryThumbnail from '@/components/Diary/DiaryThumbnail';
import MonthHeader from '@/components/ProfileDiary/MonthHeader';
import MonthHeaderButton from '@/components/ProfileDiary/MonthHeaderButton';
import barter from '@/services/barter';
import querykeys from '@/util/querykeys';

import styles from '../growDiary.module.scss';

const cx = classnames.bind(styles);

export const Route = createFileRoute('/_layout/_protected/diary/growDiary/_layout/$cropId')({
  component: GrowDiaryPage,
});

function GrowDiaryPage() {
  const { cropId } = Route.useParams();

  const { data } = useSuspenseQuery({
    queryKey: [querykeys.DIARY_DETAIL, cropId],
    queryFn: () => barter.getCropDiaryListByCrop(Number(cropId)),
  });

  const cropDiary = data?.data?.data || [];
  const cropInfo = cropDiary.cropInfo;
  const descriptionLength = cropInfo.description?.length;
  const thumbnailList = cropDiary.thumbnailList;

  const [pivotDate, setPivotDate] = useState(new Date());
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);

  const onDecreaseMonth = () => {
    setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() - 1));
  };

  const onIncreaseMonth = () => {
    setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() + 1));
  };

  const formatMonth = (month: number) => (month < 9 ? `0${month + 1}` : `${month + 1}`);

  const currentMonth = format(pivotDate, 'yyyy-MM');
  const filteredEntries = thumbnailList.filter((entry) =>
    format(new Date(entry.performDate), 'yyyy-MM') === currentMonth
  );

  const toggleDescription = () => {
    setIsDescriptionOpen(!isDescriptionOpen);
  };

    return (
    <div className={cx('growDiaryContainer')}>
      {cropInfo && (
        <div className={cx('profileSection')}>
          <div className={cx('cropImage')}>
            <img src={cropInfo.cropProfileImage} alt={cropInfo.cropNickname} />
            <button className={cx('descriptionToggle')} onClick={toggleDescription}>
              {/* {isDescriptionOpen ? '작물 소개 🔺' : '작물 소개 🔻'} */}
              {isDescriptionOpen ? <FaChevronUp /> : <FaChevronDown />}
              {/* 작물 소개 {isDescriptionOpen ? "닫기" : "열기"} */}
              작물 소개
            </button>
          </div>
          <div className={cx('userCrop')}>
            <div className={cx('cropInfo')}>
              <p>{cropInfo.userNickname}님의 {cropInfo.cropNickname}</p>
            </div>
          {isDescriptionOpen && (
            <div className={cx('description')}>
              {descriptionLength 
                ? `"${cropInfo.description}"` 
                : "작물 소개글이 없습니다"}
            </div>
          )}


        
            <div className={cx('infoImages')}>
              <div className={cx('info')}>
                <img src={GrowDiary} alt="growDiary" />
                <p><span>{cropInfo.dayWithCrop}</span>일째</p>
              </div>
              <div className={cx('info')}>
                <img src={Share} alt="share" />
                <p><span>{cropInfo.tradeCount}</span> 회</p>
              </div>
            </div>
          </div>
        </div>
      )}
      <hr />
      <div className={cx('diarySection')}>
        <MonthHeader
          title={`${pivotDate.getFullYear()}. ${formatMonth(pivotDate.getMonth())}`}
          leftChild={<MonthHeaderButton text="<" onClick={onDecreaseMonth} />}
          rightChild={<MonthHeaderButton text=">" onClick={onIncreaseMonth} />}
        />
        <div className={cx('entries', 'grid')}>
          {filteredEntries.map((entry) => (
            <div key={entry.cropDiaryId} className={cx('entry')}>
              <DiaryThumbnail cropDiaryId={entry.cropDiaryId} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default GrowDiaryPage;

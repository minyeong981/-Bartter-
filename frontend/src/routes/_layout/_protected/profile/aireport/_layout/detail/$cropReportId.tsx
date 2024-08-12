import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import classnames from 'classnames/bind';
import { useEffect } from 'react';

import AiReportCarousel from '@/components/AiReport/AiReportCarousel';
import { useLabel } from '@/context/AiReportContext';
import barter from '@/services/barter';
import querykeys from '@/util/querykeys';

import styles from '../../aireport.module.scss';

const cx = classnames.bind(styles);

function ProfileAiReportDetail() {
  const { setLabel } = useLabel();
  const { cropReportId } = Route.useParams();
  const { data } = useSuspenseQuery({
    queryKey: [querykeys.AI_REPORT_DETAIL, cropReportId],
    queryFn: () => barter.getAiReportDetail(Number(cropReportId)),
  });

  const aiReport = data.data.data;

  useEffect(() => {
    const originalLabel = 'AI 요약 보고서';
    const newLabel = `${aiReport.month}월 ${aiReport.weekOfMonth}주차`;

    setLabel(newLabel);

    return () => {
      setLabel(originalLabel);
    };
  }, [aiReport.month, aiReport.weekOfMonth, setLabel]);

  return (
    <div className={cx('container')}>
      <div className={cx('cropInfo')}>
        <p>{`${aiReport.cropNickname}의 AI 요약 보고서`}</p>
        <img src={aiReport.cropProfileImage} alt={aiReport.cropNickname} className={cx('cropImage')} />
      </div>
      <div className={cx('reportContent')}>
        <AiReportCarousel content={aiReport.reportContent} nickname={aiReport.cropNickname} />
      </div>
    </div>
  );
}

export const Route = createFileRoute('/_layout/_protected/profile/aireport/_layout/detail/$cropReportId')({
  component: ProfileAiReportDetail,
});

export default ProfileAiReportDetail;

import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import classnames from 'classnames/bind';

import barter from '@/services/barter';
import querykeys from '@/util/querykeys';

import styles from './detail.module.scss';

const cx = classnames.bind(styles);


function ProfileAiReportDetail(cropReportId: ReportId) {
  const { data } = useSuspenseQuery({
    queryKey: [querykeys.AI_REPORT_DETAIL, cropReportId],
    queryFn: () => barter.getAiReportDetail(cropReportId)
  })
  // if (!state || !state.entry) {
  //   return <div>데이터를 불러오지 못했습니다.</div>;
  // }

  const aiReport = data.data.data

  return (
    <div className={cx('container')}>
      <h2>{aiReport.month}월 {aiReport.weekOfMonth}주차</h2>
      <h1>{aiReport.cropNickname}</h1>
      <img src={'http://' + aiReport.cropProfileImage} alt={aiReport.cropNickname} className={cx('cropImage')} />
      <p>{aiReport.reportContent}</p>
    </div>
  );
}



export const Route = createFileRoute('/_layout/_protected/profile/aireport/detail/$reportId')({
  component: ProfileAiReportDetail,
});

export default ProfileAiReportDetail;

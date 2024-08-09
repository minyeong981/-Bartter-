import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import classnames from 'classnames/bind';

import styles from '@/routes/_layout/_protected/profile/aireport/aireport.module.scss';
import barter from '@/services/barter';
import querykeys from '@/util/querykeys';

const cx = classnames.bind(styles);


function ProfileAiReportDetail() {
  const {cropReportId} = Route.useParams()
  console.log('test : ',cropReportId)
  const { data } = useSuspenseQuery({
    queryKey: [querykeys.AI_REPORT_DETAIL, cropReportId],
    queryFn: () => barter.getAiReportDetail(Number(cropReportId))
  })

  const aiReport = data.data.data

  // reportContent를 파싱하여 JSX 요소로 변환
  const renderReportContent = (content: string) => {
    return content.split('\n').map((line, index) => {
      if (line.startsWith('###')) {
        return (
          <p key={index} className={cx('reportHeading')}>
            <strong>{line.replace('###', '').trim()}</strong>
          </p>
        );
      } else if (line.startsWith('-')) {
        return (
          <p key={index} className={cx('reportBullet')}>
            {line}
          </p>
        );
      } else if (line.trim() === '') {
        return <br key={index} />;
      } else {
        return <p key={index}>{line}</p>;
      }
    });
  };

  return (
    <div className={cx('container')}>
      <h2>{aiReport.month}월 {aiReport.weekOfMonth}주차</h2>
      <h1>{aiReport.cropNickname}</h1>
      <img src={aiReport.cropProfileImage} alt={aiReport.cropNickname} className={cx('cropImage')} />
      <div className={cx('reportContent')}>
        {renderReportContent(aiReport.reportContent)}
      </div>
      <div className={cx('fightingMent')}>
        <p>{aiReport.cropNickname} 재배의 성공을 기원합니다!</p>        
      </div>
    </div>
  );
}

export const Route = createFileRoute('/_layout/_protected/profile/aireport/_layout/detail/$cropReportId')({
  component: ProfileAiReportDetail,
});

export default ProfileAiReportDetail;
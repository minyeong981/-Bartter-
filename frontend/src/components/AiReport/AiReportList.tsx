import { useSuspenseQuery } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import classnames from 'classnames/bind';

import barter from '@/services/barter';
import querykeys from '@/util/querykeys';

import styles from './AiReportList.module.scss';

const cx = classnames.bind(styles);

interface AiReportListProps {
  filterOptions: {
    startDate: string;
    endDate: string;
    desc: boolean; // 최신순은 true, 과거순은 false
  };
}

export default function AiReportList({ filterOptions }: AiReportListProps) {
  const { startDate, endDate, desc } = filterOptions;
  const navigate = useNavigate();

  const { data } = useSuspenseQuery({
    queryKey: [querykeys.AI_REPORT_LIST, startDate, endDate, desc],
    queryFn: () => barter.getAiReportList(startDate, endDate, desc),
  });

  const aiReportList = data.data.data;

  // 데이터가 없는 경우 처리
  if (!aiReportList || aiReportList.length === 0) {
    return (
      <div>
        AI 리포트가 없습니다. <br /> 농사 일지를 작성하면 일요일마다 AI 리포트를 제공합니다.
      </div>
    );
  }

  // desc에 따라 리포트를 정렬
  const sortedReports = [...aiReportList].sort((a, b) => {
    if (desc) {
      // 최신순 정렬
      return (
        b.month - a.month || b.weekOfMonth - a.weekOfMonth
      );
    } else {
      // 과거순 정렬
      return (
        a.month - b.month || a.weekOfMonth - b.weekOfMonth
      );
    }
  });

  // 달과 주차별로 리포트를 그룹화
  const groupedReports = new Map<string, { month: number; weekOfMonth: number; reports: typeof sortedReports[0][] }>();

  sortedReports.forEach(report => {
    const key = `${report.month}-${report.weekOfMonth}`; // 월과 주차를 결합한 키 생성
    if (!groupedReports.has(key)) {
      groupedReports.set(key, { month: report.month, weekOfMonth: report.weekOfMonth, reports: [] });
    }
    groupedReports.get(key)!.reports.push(report);
  });

  const handleDetailClick = (cropReportId: number) => {
    navigate({ to: `/profile/aireport/detail/${cropReportId}` });
  };

  return (
    <div className={cx('reportListContainer')}>
      {Array.from(groupedReports.entries()).map(([key, { month, weekOfMonth, reports }]) => (
        <div key={key} className={cx('reportGroup')}>
          <h3>{`${month}월 ${weekOfMonth}주차`}</h3> {/* month와 weekOfMonth를 직접 사용 */}
          <div className={cx('reportCards')}>
            {reports.map(report => (
              <div key={report.reportId} className={cx('reportItem')}>
                <img src={report.cropProfileImage} alt={report.reportTitle} className={cx('cropImage')} />
                <div className={cx('reportContent')}>
                  <p>{report.reportTitle}</p>
                  <button onClick={() => handleDetailClick(report.reportId)} className={cx('detailButton')}>
                    상세 보기 &gt;
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

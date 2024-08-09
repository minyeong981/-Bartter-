// // import { useSuspenseQuery } from '@tanstack/react-query';
// // import { useNavigate } from '@tanstack/react-router';
// // import classnames from 'classnames/bind';
// // import { format } from 'date-fns';

// // import barter from '@/services/barter';
// // import querykeys from '@/util/querykeys';

// // import styles from './AiReportList.module.scss';

// // const cx = classnames.bind(styles);

// // export default function AiReportList() {
// //   const { data } = useSuspenseQuery({
// //     queryKey: [querykeys.AI_REPORT_LIST, startDate, endDate, desc],
// //     queryFn: () => barter.getAiReportList(startDate, endDate, desc)
// //   })
// //   const navigate = useNavigate()
// //   const handleDetailClick = (reportId: ReportId) => {
// //     navigate({to: `/diary/detail/${reportId}`})
// //   }

// //   const aiReportList = data.data.data


// //   const groupedReports = new Map<string, { week: number; reports: Report[] }>();

// //   reports.forEach(report => {
// //     const monthYear = format(new Date(report.date), 'yyyy-MM');
// //     const key = `${monthYear}-${report.week}`;
// //     if (!groupedReports.has(key)) {
// //       groupedReports.set(key, { week: report.week, reports: [] });
// //     }
// //     groupedReports.get(key)!.reports.push(report);
// //   });

// //   return (
// //     <div className={cx('reportListContainer')}>
// //       {Array.from(groupedReports.entries()).map(([key, { week, reports }]) => (
// //         <div key={key}>
// //           <h3>{format(new Date(reports[0].date), 'M월')} {week}주차</h3>
// //           {reports.map(report => (
// //             <div key={report.id} className={cx('reportItem')}>
// //               <img src={report.cropImage} alt="Crop" className={cx('cropImage')} />
// //               <div className={cx('reportContent')}>
// //                 <p>{report.cropNickname}의 재배 보고서</p>
// //                 <button onClick={() => handleDetailClick(report)} className={cx('detailButton')}>
// //                   상세 보기 &gt;
// //                 </button>
// //               </div>
// //             </div>
// //           ))}
// //         </div>
// //       ))}
// //     </div>
// //   );
// // }


// import { useSuspenseQuery } from '@tanstack/react-query';
// import { useNavigate } from '@tanstack/react-router';
// import classnames from 'classnames/bind';
// import { format, getWeekOfMonth, parseISO } from 'date-fns';

// import barter from '@/services/barter';
// import querykeys from '@/util/querykeys';

// import styles from './AiReportList.module.scss';

// const cx = classnames.bind(styles);


// interface AiReportListProps {
//   startDate: Date;
//   endDate: Date;
//   desc: '최신순' | '과거순';
// }

// export default function AiReportList({ startDate, endDate, desc }: AiReportListProps) {
//   const navigate = useNavigate();

//   // startDate와 endDate를 쿼리 키로 사용하고, queryFn에 전달합니다.
//   const { data } = useSuspenseQuery({
//     queryKey: [querykeys.AI_REPORT_LIST, startDate, endDate, desc],
//     queryFn: () => barter.getAiReportList(startDate, endDate, desc),
//   });

//   const aiReportList = data.data.data;

//   // 주차별로 리포트를 그룹화합니다.
//   const groupedReports = new Map<string, { weekOfMonth: number; reports: typeof aiReportList[0][] }>();

//   aiReportList.forEach(report => {
//     const reportDate = parseISO(report.date);
//     const monthYear = format(reportDate, 'yyyy-MM'); // 해당 리포트의 월과 연도
//     const weekOfMonth = getWeekOfMonth(reportDate); // 해당 리포트의 월 내 주차 계산

//     const key = `${monthYear}-${weekOfMonth}`;
//     if (!groupedReports.has(key)) {
//       groupedReports.set(key, { weekOfMonth, reports: [] });
//     }
//     groupedReports.get(key)!.reports.push(report);
//   });

//   const handleDetailClick = (reportId: number) => {
//     navigate({ to: `/diary/detail/${reportId}` });
//   };

//   return (
//     <div className={cx('reportListContainer')}>
//       {Array.from(groupedReports.entries()).map(([key, { weekOfMonth, reports }]) => (
//         <div key={key} className={cx('reportGroup')}>
//           <h3>{format(parseISO(reports[0].date), 'M월')} {weekOfMonth}주차</h3>
//           <div className={cx('reportCards')}>
//             {reports.map(report => (
//               <div key={report.reportId} className={cx('reportItem')}>
//                 <img src={'http://' + report.cropProfileImage} alt={report.reportTitle} className={cx('cropImage')} />
//                 <div className={cx('reportContent')}>
//                   <p>{report.reportTitle}</p>
//                   <button onClick={() => handleDetailClick(report.reportId)} className={cx('detailButton')}>
//                     상세 보기 &gt;
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }

import { useSuspenseQuery } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import classnames from 'classnames/bind';
import { format } from 'date-fns';

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
        AI 리포트가 없습니다. 농사 일지를 작성하면 일요일마다 AI 리포트를 제공합니다.
      </div>
    );
  }

  // desc에 따라 리포트를 정렬
  const sortedReports = [...aiReportList].sort((a, b) => {
    if (desc) {
      // 최신순 정렬
      return (
        new Date(b.month).getTime() - new Date(a.month).getTime() ||
        b.weekOfMonth - a.weekOfMonth
      );
    } else {
      // 과거순 정렬
      return (
        new Date(a.month).getTime() - new Date(b.month).getTime() ||
        a.weekOfMonth - b.weekOfMonth
      );
    }
  });

  // 주차별로 리포트를 그룹화
  const groupedReports = new Map<string, { weekOfMonth: number; reports: typeof sortedReports[0][] }>();

  sortedReports.forEach(report => {
    const key = `${report.month}-${report.weekOfMonth}`;
    if (!groupedReports.has(key)) {
      groupedReports.set(key, { weekOfMonth: report.weekOfMonth, reports: [] });
    }
    groupedReports.get(key)!.reports.push(report);
  });

  const handleDetailClick = (cropReportId: number) => {
    navigate({ to: `/profile/aireport/detail/${cropReportId}` });
  };
  console.log()
  return (
    <div className={cx('reportListContainer')}>
      {Array.from(groupedReports.entries()).map(([key, { weekOfMonth, reports }]) => (
        <div key={key} className={cx('reportGroup')}>
          <h3>{`${format(new Date(reports[0].month), 'M월')} ${weekOfMonth}주차`}</h3>
          <div className={cx('reportCards')}>
            {reports.map(report => (
              <div key={report.reportId} className={cx('reportItem')}>
                <img src={report.cropProfileImage} alt={report.reportTitle} className={cx('cropImage')} />
                <div className={cx('reportContent')}>
                  <p>{report.reportTitle}</p>
                  <button onClick={() => handleDetailClick(report.reportId)} className={cx('detailButton')}>
                    {report.reportId}상세 보기 &gt;
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

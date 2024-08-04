import classnames from 'classnames/bind';
import { format } from 'date-fns';
import React from 'react';

import styles from './AiReportList.module.scss';

const cx = classnames.bind(styles);

interface Report {
  id: number;
  date: string;
  cropImage: string;
  cropNickname: string;
  week: number;
}

interface AiReportListProps {
  reports: Report[];
}

const AiReportList: React.FC<AiReportListProps> = ({ reports }) => {
  const handleDetailClick = (report: Report) => {
    const newUrl = `/profile/aireport/detail/${report.id}`;
    const state: Omit<Report, 'date'> = { 
      id: report.id, 
      cropImage: report.cropImage, 
      cropNickname: report.cropNickname, 
      week: report.week 
    };
    
    window.history.pushState(state, '', newUrl);
    window.location.href = newUrl;
  };

  const groupedReports = new Map<string, { week: number; reports: Report[] }>();

  reports.forEach(report => {
    const monthYear = format(new Date(report.date), 'yyyy-MM');
    const key = `${monthYear}-${report.week}`;
    if (!groupedReports.has(key)) {
      groupedReports.set(key, { week: report.week, reports: [] });
    }
    groupedReports.get(key)!.reports.push(report);
  });

  return (
    <div className={cx('reportListContainer')}>
      {Array.from(groupedReports.entries()).map(([key, { week, reports }]) => (
        <div key={key}>
          <h3>{format(new Date(reports[0].date), 'M월')} {week}주차</h3>
          {reports.map(report => (
            <div key={report.id} className={cx('reportItem')}>
              <img src={report.cropImage} alt="Crop" className={cx('cropImage')} />
              <div className={cx('reportContent')}>
                <p>{report.cropNickname}의 재배 보고서</p>
                <button onClick={() => handleDetailClick(report)} className={cx('detailButton')}>
                  상세 보기 &gt;
                </button>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default AiReportList;

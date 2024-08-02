import { createFileRoute } from '@tanstack/react-router';
import classnames from 'classnames/bind';
import { isWithinInterval, parseISO } from 'date-fns';
import React, { useEffect, useState } from 'react';

import BottomArrow from '@/assets/image/bottomarrow.png';
import AiReportList from '@/components/AiReport/AiReportList';
import Modal from '@/components/AiReport/Modal';
import HeaderWithLabelAndBackButton from '@/components/Header/HeaderWithLabelAndBackButton';

import styles from './index.module.scss';

const cx = classnames.bind(styles);

interface Report {
  id: number;
  date: string;
  week: number;
  cropImage: string;
  cropNickname: string;
}

const ProfileAiReport: React.FC = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [filteredReports, setFilteredReports] = useState<Report[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [period, setPeriod] = useState('1개월');
  const [sort, setSort] = useState('최신순');

  useEffect(() => {
    const fetchedReports: Report[] = [
      { id: 1, date: '2023-08-01', week: 1, cropImage: '/path/to/crop1.png', cropNickname: '작물1' },
      { id: 2, date: '2023-08-08', week: 2, cropImage: '/path/to/crop2.png', cropNickname: '작물2' },
      { id: 3, date: '2023-08-15', week: 1, cropImage: '/path/to/crop3.png', cropNickname: '작물3' }
    ];
    setReports(fetchedReports);
    filterReports({ reports: fetchedReports, period: '1개월', sort: '최신순' });
  }, []);

  const handleSortButtonClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const getPastDate = (months: number): Date => {
    const date = new Date();
    date.setMonth(date.getMonth() - months);
    return date;
  };

  const filterReports = ({
    reports,
    period,
    startDate,
    endDate,
    sort
  }: {
    reports: Report[];
    period: string;
    startDate?: Date;
    endDate?: Date;
    sort: string;
  }) => {
    const currentDate = new Date();
    let periodStartDate: Date;
    let periodEndDate: Date = currentDate;

    if (period === '1개월') {
      periodStartDate = getPastDate(1);
    } else if (period === '3개월') {
      periodStartDate = getPastDate(3);
    } else if (period === '6개월') {
      periodStartDate = getPastDate(6);
    } else if (period === '범위 설정') {
      periodStartDate = startDate ?? new Date();
      periodEndDate = endDate ?? currentDate;
    } else {
      periodStartDate = new Date();
    }

    const filtered = reports.filter(report => {
      const reportDate = parseISO(report.date);
      return isWithinInterval(reportDate, { start: periodStartDate, end: periodEndDate });
    });

    if (sort === '최신순') {
      filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    } else if (sort === '과거순') {
      filtered.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    }

    setFilteredReports(filtered);
  };

  const handleApplyFilters = ({
    period,
    startDate,
    endDate,
    sort
  }: {
    period: string;
    startDate?: Date;
    endDate?: Date;
    sort: string;
  }) => {
    setPeriod(period);
    setSort(sort);

    filterReports({ reports, period, startDate, endDate, sort });
  };

  return (
    <div className={cx('container')}>
      <HeaderWithLabelAndBackButton label="AI 재배 요약 보고서" />
      <button className={cx('sortButton')} onClick={handleSortButtonClick}>
        {`${period} / ${sort}`} <img src={BottomArrow} alt="bottomArrow" />
      </button>
      {filteredReports.length === 0 ? (
        <h3 className={cx('noReportsMessage')}>아직 AI 재배 요약 보고서가 없습니다.</h3>
      ) : (
        <AiReportList reports={filteredReports} />
      )}
      {isModalOpen && <Modal onClose={handleCloseModal} onApply={handleApplyFilters} />}
    </div>
  );
};

export const Route = createFileRoute('/_layout/profile/aireport/')({
  component: ProfileAiReport,
});
export default ProfileAiReport;
import { createFileRoute } from '@tanstack/react-router';
import classnames from 'classnames/bind';
import { format,startOfWeek, subMonths } from 'date-fns';
import React, { useState } from 'react';

import BottomArrow from '@/assets/image/bottomarrow.png';
import AiReportList from '@/components/AiReport/AiReportList';
import Modal from '@/components/AiReport/Modal';
import HeaderWithLabelAndBackButton from '@/components/Header/HeaderWithLabelAndBackButton';

import styles from './index.module.scss';

const cx = classnames.bind(styles);

const ProfileAiReport: React.FC = () => {
  const today = new Date();

  // 기본값: 이번 주의 시작일(일요일)과 오늘 날짜
  const defaultStartDate = startOfWeek(today, { weekStartsOn: 0 }); // 일요일을 기준으로 시작
  const defaultEndDate = today; // 오늘 날짜

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [filterOptions, setFilterOptions] = useState({
    period: '1개월',
    startDate: format(subMonths(today, 1), 'yyyy-MM-dd'), // 1개월 전
    endDate: format(defaultEndDate, 'yyyy-MM-dd'),
    desc: true, // 최신순이 기본값
  });

  const handleSortButtonClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleApplyFilters = ({
    period,
    startDate,
    endDate,
    sort,
  }: {
    period: string;
    startDate?: Date;
    endDate?: Date;
    sort: '최신순' | '과거순';
  }) => {
    const desc = sort === '최신순';

    // period에 따라 startDate 설정
    let newStartDate: string | undefined;
    let newEndDate: string = format(endDate || defaultEndDate, 'yyyy-MM-dd');

    if (period === '1개월') {
      newStartDate = format(subMonths(today, 1), 'yyyy-MM-dd');
    } else if (period === '3개월') {
      newStartDate = format(subMonths(today, 3), 'yyyy-MM-dd');
    } else if (period === '6개월') {
      newStartDate = format(subMonths(today, 6), 'yyyy-MM-dd');
    } else if (period === '기간 설정') {
      // 기간 설정의 경우 사용자가 직접 startDate와 endDate를 설정
      newStartDate = startDate ? format(startDate, 'yyyy-MM-dd') : undefined;
      newEndDate = format(endDate || defaultEndDate, 'yyyy-MM-dd');
    }

    setFilterOptions({
      period,
      startDate: newStartDate || format(defaultStartDate, 'yyyy-MM-dd'),
      endDate: newEndDate,
      desc,
    });

    setIsModalOpen(false);
  };

  return (
    <div className={cx('container')}>
      <HeaderWithLabelAndBackButton label="AI 요약 보고서" />
      <button className={cx('sortButton')} onClick={handleSortButtonClick}>
        {`${filterOptions.period} / ${filterOptions.desc ? '최신순' : '과거순'}`} <img src={BottomArrow} alt="bottomArrow" />
      </button>
      <AiReportList filterOptions={filterOptions} />
      {isModalOpen && <Modal onClose={handleCloseModal} onApply={handleApplyFilters} />}
    </div>
  );
};

export const Route = createFileRoute('/_layout/_protected/profile/aireport/')({
  component: ProfileAiReport,
});
export default ProfileAiReport;

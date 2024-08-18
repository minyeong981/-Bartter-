import classnames from 'classnames/bind';
import { subMonths } from 'date-fns';
import { ko } from 'date-fns/locale';
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { FaCalendarAlt } from 'react-icons/fa';

import GeneralButton from '../Buttons/GeneralButton';
import styles from './Modal.module.scss';

const cx = classnames.bind(styles);

interface ModalProps {
  onClose: () => void;
  onApply: (filters: { period: string; startDate: Date | undefined; endDate: Date | undefined; sort: '최신순' | '과거순' }) => void;
}

const Modal: React.FC<ModalProps> = ({ onClose, onApply }) => {
  const today = new Date();
  const [activePeriod, setActivePeriod] = useState<string>('1개월');
  const [activeSort, setActiveSort] = useState<'최신순' | '과거순'>('최신순');
  const [startDate, setStartDate] = useState<Date | undefined>(subMonths(today, 1));
  const [endDate, setEndDate] = useState<Date | undefined>(today);
  const [isRangePickerOpen, setIsRangePickerOpen] = useState<boolean>(false);

  const handlePeriodClick = (selectedPeriod: string) => {
    setActivePeriod(selectedPeriod);
    setEndDate(today); // 끝나는 날짜는 항상 오늘로 설정

    if (selectedPeriod === '1개월') {
      setStartDate(subMonths(today, 1));
      setIsRangePickerOpen(false);
    } else if (selectedPeriod === '3개월') {
      setStartDate(subMonths(today, 3));
      setIsRangePickerOpen(false);
    } else if (selectedPeriod === '6개월') {
      setStartDate(subMonths(today, 6));
      setIsRangePickerOpen(false);
    } else if (selectedPeriod === '기간 설정') {
      setIsRangePickerOpen(true);
    }
  };

  const handleSortClick = (selectedSort: '최신순' | '과거순') => {
    setActiveSort(selectedSort);
  };

  const handleApplyClick = () => {
    onApply({ period: activePeriod, startDate, endDate, sort: activeSort });
    onClose();
  };

  const renderCustomHeader = ({ date, decreaseMonth, increaseMonth }: any) => (
    <div className={cx('datepickerHeader')}>
      <button onClick={decreaseMonth}>&lt;</button>
      <span>{`${date.getFullYear()}. ${String(date.getMonth() + 1).padStart(2, '0')}`}</span>
      <button onClick={increaseMonth}>&gt;</button>
    </div>
  );

  return (
    <div className={cx('modalOverlay')} onClick={onClose}>
      <div className={cx('modalContent')} onClick={(e) => e.stopPropagation()}>
        <button className={cx('closeButton')} onClick={onClose}>×</button>
        <h2>조회 조건 설정</h2>
        <div className={cx('modalSection')}>
          <h3>조회 기간</h3>
          <div className={cx('buttonGroup')}>
            {['1개월', '3개월', '6개월', '기간 설정'].map(period => (
              <GeneralButton 
                key={period}
                buttonStyle={{style: 'outlined', size: 'medium'}}
                className={cx('filterButton', { active: activePeriod === period })}
                onClick={() => handlePeriodClick(period)}
              >
                {period}
              </GeneralButton>
            ))}
          </div>
          {isRangePickerOpen && (
            <div className={cx('rangePicker')}>
              <div className={cx('datePickerWrapper')}>
                <FaCalendarAlt />
                <DatePicker 
                  selected={startDate} 
                  onChange={(date) => setStartDate(date ?? undefined)} 
                  selectsStart 
                  startDate={startDate} 
                  endDate={endDate} 
                  placeholderText="시작하는 날짜" 
                  maxDate={today} 
                  locale={ko} 
                  dateFormat="yyyy.MM.dd"
                  renderCustomHeader={renderCustomHeader}
                />
              </div>
              <span> ~ </span>
              <div className={cx('datePickerWrapper')}>
                <FaCalendarAlt />
                <DatePicker 
                  selected={endDate} 
                  onChange={(date) => setEndDate(date ?? undefined)} 
                  selectsEnd 
                  startDate={startDate} 
                  endDate={endDate} 
                  minDate={startDate} 
                  maxDate={today} 
                  placeholderText="끝나는 날짜" 
                  locale={ko} 
                  dateFormat="yyyy.MM.dd"
                  renderCustomHeader={renderCustomHeader}
                />
              </div>
            </div>
          )}
        </div>
        <div className={cx('modalSection')}>
          <h3>정렬</h3>
          <div className={cx('buttonGroup')}>
            {['최신순', '과거순'].map(sort => (
              <GeneralButton 
                key={sort}
                buttonStyle={{style: 'outlined', size: 'medium'}}
                className={cx('filterButton', { active: activeSort === sort })}
                onClick={() => handleSortClick(sort as '최신순' | '과거순')}
              >
                {sort}
              </GeneralButton>
            ))}
          </div>
        </div>
        <GeneralButton 
          buttonStyle={{style:'primary', size:'medium'}} 
          className={cx('applyButton')} 
          onClick={handleApplyClick}
        >
          조회
        </GeneralButton>
      </div>
    </div>
  );
}

export default Modal;

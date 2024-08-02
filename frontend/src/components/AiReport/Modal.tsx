import 'react-datepicker/dist/react-datepicker.css';

import classnames from 'classnames/bind';
import { ko } from 'date-fns/locale';
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { FaCalendarAlt } from 'react-icons/fa';

import GeneralButton from '../Buttons/GeneralButton';
import styles from './Modal.module.scss';

const cx = classnames.bind(styles);

interface ModalProps {
  onClose: () => void;
  onApply: (filters: { period: string; startDate: Date | undefined; endDate: Date | undefined; sort: string }) => void;
}

const Modal: React.FC<ModalProps> = ({ onClose, onApply }) => {
  const [activePeriod, setActivePeriod] = useState<string>('1개월');
  const [activeSort, setActiveSort] = useState<string>('최신순');
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [isRangePickerOpen, setIsRangePickerOpen] = useState<boolean>(false);

  const handlePeriodClick = (selectedPeriod: string) => {
    setActivePeriod(selectedPeriod);
    if (selectedPeriod === '범위 설정') {
      setIsRangePickerOpen(true);
    } else {
      setIsRangePickerOpen(false);
      setStartDate(undefined);
      setEndDate(undefined);
    }
  };

  const handleSortClick = (selectedSort: string) => {
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
            {['1개월', '3개월', '6개월', '범위 설정'].map(period => (
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
                  placeholderText="시작 날짜" 
                  maxDate={new Date()} 
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
                  maxDate={new Date()} 
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
                onClick={() => handleSortClick(sort)}
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

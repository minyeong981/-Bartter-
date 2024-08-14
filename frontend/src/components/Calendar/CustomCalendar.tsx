import 'react-calendar/dist/Calendar.css';
import './CustomCalendar.scss';

import { useCallback, useEffect, useState } from 'react';
import { Calendar } from 'react-calendar';

interface CustomCalendarProps {
  isCollapsed: boolean;
  onDateChange: (date: Date) => void;
  onMonthYearChange: (year: number, month: number) => void;
  highlightDates: Date[]; // 강조할 날짜 목록
  selectedDate: Date; 
}

export default function CustomCalendar({ isCollapsed, onDateChange, onMonthYearChange, highlightDates, selectedDate }: CustomCalendarProps) {
  const [currentWeek, setCurrentWeek] = useState<Date[]>([]);
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [persistedDate, setPersistedDate] = useState<Date>(selectedDate); // 선택된 날짜를 저장하는 상태 추가

  // 날짜 비교를 위한 정규화 함수
  const normalizeDate = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  };

  // 시작하는 요일 -> 일요일부터 설정
  const getStartOfWeek = (date: Date): Date => {
    const day = date.getDay();
    const diff = date.getDate() - day;
    const startDate = new Date(date);
    startDate.setDate(diff);
    return new Date(startDate.setHours(0, 0, 0, 0));
  };

  const updateCurrentWeek = useCallback((date: Date) => {
    const startOfWeek = getStartOfWeek(date);
    const week = Array.from({ length: 7 }, (_, i) => new Date(startOfWeek.getTime() + i * 86400000));
    setCurrentWeek(week);
  }, []);

  // 선택한 날짜의 주 업데이트
  useEffect(() => {
    updateCurrentWeek(selectedDate);
    setPersistedDate(selectedDate); // 선택한 날짜를 저장
  }, [selectedDate, updateCurrentWeek]);

  // 달력 접었을 때 선택한 날짜의 주 업데이트
  useEffect(() => {
    if (isCollapsed) {
      updateCurrentWeek(persistedDate); // 저장된 날짜로 주간 업데이트
    }
  }, [isCollapsed, currentMonth, persistedDate, updateCurrentWeek]);

  // 달 변경
  const changeMonth = (increment: number) => {
    const newDate = new Date(currentMonth);
    newDate.setMonth(currentMonth.getMonth() + increment);
    setCurrentMonth(newDate);
    onMonthYearChange(newDate.getFullYear(), newDate.getMonth() + 1);

    // 달력이 접혀 있을 때 선택된 날짜의 월을 변경하되, 날짜는 유지
    if (isCollapsed) {
      const newSelectedDate = new Date(newDate.getFullYear(), newDate.getMonth(), persistedDate.getDate());
      onDateChange(newSelectedDate); // 부모 컴포넌트로 선택된 날짜 업데이트
      updateCurrentWeek(newSelectedDate); // 해당 날짜의 주간 업데이트
    }
  };

  // 달력 이동 시 현재 월 업데이트
  useEffect(() => {
    setCurrentMonth(selectedDate); 
  }, [selectedDate]);

  // 년, 월 커스텀 => 2021. 09 형식
  const formatMonthYear = (_: string | undefined, date: Date) => {
    if (!date) return '';
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    return `${year}. ${month}`;
  };

  const formatDay = (_: string | undefined, date: Date): string => {
    return date.getDate().toString();
  };

  // 요일 커스텀
  const renderWeekday = (_: string | undefined, date: Date): string => {
    const weekdays = ['일', '월', '화', '수', '목', '금', '토'];
    return weekdays[date.getDay()];
  };

  // 날짜 클릭하면 부모 컴포넌트에 선택된 날짜 전달
  const onClickDay = (date: Date) => {
    onDateChange(date);
    setPersistedDate(date); // 선택한 날짜를 저장
  };

  // 다이어리 있는 날짜에 점 찍기
  const tileContent = ({ date, view }: { date: Date, view: string }) => {
    if (view === 'month') {
      const isHighlighted = highlightDates.some(
        (highlightDate) => highlightDate.toDateString() === date.toDateString()
      );

      if (isHighlighted) {
        return <div className="highlight-dot" />;
      }
    }
    return null;
  };

  // 기본 달력 세팅
  const getTileClassName = (date: Date) => {
    const classes = [];
    if (date.getDay() === 6) {
      classes.push('saturday');
    }
    if (date.getDay() === 0) {
      classes.push('sunday');
    }
    if (date.getMonth() !== currentMonth.getMonth()) {
      classes.push('neighboringMonth');
    }
    if (normalizeDate(date).getTime() === normalizeDate(new Date()).getTime()) {
      classes.push('today');
    }
    if (normalizeDate(date).getTime() === normalizeDate(selectedDate).getTime()) {
      classes.push('selected');
    }
    if (currentWeek.some(weekDate => normalizeDate(weekDate).getTime() === normalizeDate(date).getTime())) {
      classes.push('current-week');
    }
    return classes.join(' ');
  };

  // 달력 접었을 때 세팅
  const renderCollapsedCalendar = () => {
    return (
      <div className="react-calendar collapsed-calendar">
        <div className="react-calendar__navigation">
          <button className="react-calendar__navigation__prev-button" onClick={() => changeMonth(-1)}>
            {'<'}
          </button>
          <span className="react-calendar__navigation__label">{formatMonthYear('', currentMonth)}</span>
          <button className="react-calendar__navigation__next-button" onClick={() => changeMonth(1)}>
            {'>'}
          </button>
        </div>

        <div className="react-calendar__month-view__weekdays">
          {currentWeek.map((date, index) => (
            <div key={index} className="react-calendar__month-view__weekdays__weekday">
              <abbr title={renderWeekday('ko-KR', date)}>{renderWeekday('ko-KR', date)}</abbr>
            </div>
          ))}
        </div>

        <div className="react-calendar__month-view__days">
          {currentWeek.map((date) => (
            <div
              key={date.toDateString()}
              className={`react-calendar__tile ${getTileClassName(date)}`}
              onClick={() => onClickDay(date)}
            >
              <abbr className="react-calendar__tile__abbr">{date.getDate()}</abbr>
              {highlightDates.some(highlightDate => highlightDate.toDateString() === date.toDateString()) && (
                <div className="highlight-dot" />
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  // 달력 펼쳤을 때 세팅
  const renderFullCalendar = () => {
    return (
      <Calendar
        activeStartDate={currentMonth}
        onActiveStartDateChange={({ activeStartDate }) => {
          const date = activeStartDate as Date;
          setCurrentMonth(date);
          onMonthYearChange(date.getFullYear(), date.getMonth() + 1);
        }}
        locale="en-US"
        formatMonthYear={(_, date) => formatMonthYear(_, date)}
        prevLabel="<"
        nextLabel=">"
        tileClassName={({ date, view }) => view === 'month' ? getTileClassName(date) : null}
        formatDay={formatDay}
        formatShortWeekday={renderWeekday}
        showNeighboringMonth={true} // 이번 달이 아닌 날짜도 표시
        onClickDay={onClickDay}
        tileContent={tileContent}
      />
    );
  };

  return (
    <div className={`custom-calendar-container ${isCollapsed ? 'collapsed' : ''}`}>
      {isCollapsed ? renderCollapsedCalendar() : renderFullCalendar()}
    </div>
  );
}

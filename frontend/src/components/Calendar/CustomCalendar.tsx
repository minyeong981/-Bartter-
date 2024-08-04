import 'react-calendar/dist/Calendar.css';
import './CustomCalendar.scss';

import {useCallback, useEffect, useState} from 'react';
import {Calendar} from 'react-calendar';

interface CustomCalendarProps {
  isCollapsed: boolean;
  onDateChange: (date: Date) => void;
  highlightDates: Date[]; // 강조할 날짜 목록 추가
}

export default function CustomCalendar({isCollapsed, onDateChange, highlightDates}: CustomCalendarProps) {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [currentWeek, setCurrentWeek] = useState<Date[]>([]);
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());

  const getStartOfWeek = (date: Date): Date => {
    const day = date.getDay();
    const diff = date.getDate() - day;
    const startDate = new Date(date);
    startDate.setDate(diff);
    return new Date(startDate.setHours(0, 0, 0, 0));
  };

  const updateCurrentWeek = useCallback((date: Date) => {
    const startOfWeek = getStartOfWeek(date);
    const week = Array.from({length: 7}, (_, i) => new Date(startOfWeek.getTime() + i * 86400000));
    setCurrentWeek(week);
  }, []);

  useEffect(() => {
    updateCurrentWeek(selectedDate);
  }, [selectedDate, updateCurrentWeek]);

  useEffect(() => {
    if (isCollapsed) {
      updateCurrentWeek(selectedDate);
    }
  }, [isCollapsed, currentMonth, selectedDate, updateCurrentWeek]);

  const changeMonth = (increment: number) => {
    const newDate = new Date(currentMonth);
    newDate.setMonth(currentMonth.getMonth() + increment);
    setCurrentMonth(newDate);
    setSelectedDate(new Date(newDate.setDate(selectedDate.getDate())));
  };

  const formatMonthYear = (date: Date): string => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    return `${year}. ${month}`;
  };

  const formatDay = (_: string | undefined, date: Date): string => {
    return date.getDate().toString();
  };

  const renderWeekday = (_: string | undefined, date: Date): string => {
    const weekdays = ['일', '월', '화', '수', '목', '금', '토'];
    return weekdays[date.getDay()];
  };

  const onClickDay = (date: Date) => {
    setSelectedDate(date);
    updateCurrentWeek(date);
    onDateChange(date); // 부모 컴포넌트에 선택된 날짜 전달
  };

  const tileContent = ({date, view}: { date: Date, view: string }) => {
    if (view === 'month' && highlightDates.some(highlightDate => highlightDate.toDateString() === date.toDateString())) {
      return <div className="highlight-dot"/>;
    }
    return null;
  };

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
    if (date.toDateString() === new Date().toDateString()) {
      classes.push('today');
    }
    if (date.toDateString() === selectedDate.toDateString()) {
      classes.push('selected');
    }
    if (currentWeek.some(weekDate => weekDate.toDateString() === date.toDateString())) {
      classes.push('current-week');
    }
    return classes.join(' ');
  };

  const renderCollapsedCalendar = () => {
    return (
      <div className="react-calendar collapsed-calendar">
        <div className="react-calendar__navigation">
          <button className="react-calendar__navigation__prev-button" onClick={() => changeMonth(-1)}>
            {'<'}
          </button>
          <span className="react-calendar__navigation__label">{formatMonthYear(currentMonth)}</span>
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
              {highlightDates.some(highlightDate => highlightDate.toDateString() === date.toDateString()) &&
                <div className="highlight-dot"/>}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderFullCalendar = () => {
    return (
      <Calendar
        activeStartDate={currentMonth}
        onActiveStartDateChange={({activeStartDate}) => setCurrentMonth(activeStartDate as Date)}
        locale="en-US"
        formatMonthYear={(_, date) => formatMonthYear(date)}
        prevLabel="<"
        nextLabel=">"
        tileClassName={({date, view}) => view === 'month' ? getTileClassName(date) : null}
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

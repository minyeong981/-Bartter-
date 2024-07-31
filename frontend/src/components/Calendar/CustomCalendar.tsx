import 'react-calendar/dist/Calendar.css';
import './CustomCalendar.scss';

import { useEffect, useState } from 'react';
import type { CalendarTileProperties } from 'react-calendar';
import Calendar from 'react-calendar';

interface CustomCalendarProps {
  isCollapsed: boolean;
  onDateChange: (date: Date) => void; // 날짜 변경 핸들러 추가
}

export default function CustomCalendar({ isCollapsed, onDateChange }: CustomCalendarProps) {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [currentWeek, setCurrentWeek] = useState<Date[]>([]);
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());

  useEffect(() => {
    updateCurrentWeek(selectedDate);
  }, [selectedDate]);

  useEffect(() => {
    if (isCollapsed) {
      updateCurrentWeek(selectedDate);
    }
  }, [isCollapsed, currentMonth]);

  const getStartOfWeek = (date: Date): Date => {
    const day = date.getDay();
    const diff = date.getDate() - day;
    const startDate = new Date(date);
    startDate.setDate(diff);
    return new Date(startDate.setHours(0, 0, 0, 0));
  };

  const updateCurrentWeek = (date: Date) => {
    const startOfWeek = getStartOfWeek(date);
    const week = Array.from({ length: 7 }, (_, i) => new Date(startOfWeek.getTime() + i * 86400000));
    setCurrentWeek(week);
  };

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

  const tileClassName = ({ date, view }: CalendarTileProperties): string | null => {
    if (view === 'month' && date.getDay() === 6) {
      return 'saturday';
    }
    if (view === 'month' && date.getDay() === 0) {
      return 'sunday';
    }
    if (view === 'month' && date.toDateString() === new Date().toDateString()) {
      return 'today';
    }
    if (view === 'month' && date.toDateString() === selectedDate.toDateString()) {
      return 'selected';
    }
    if (currentWeek.some(weekDate => weekDate.toDateString() === date.toDateString())) {
      return 'current-week';
    }
    return null;
  };

  const formatDay = (locale: string, date: Date): string => {
    return date.getDate().toString();
  };

  const renderWeekday = (locale: string, date: Date): string => {
    const weekdays = ['일', '월', '화', '수', '목', '금', '토'];
    return weekdays[date.getDay()];
  };

  const onClickDay = (date: Date) => {
    setSelectedDate(date);
    updateCurrentWeek(date);
    onDateChange(date); // 부모 컴포넌트에 선택된 날짜 전달
  };

  const tileContent = ({ date, view }: CalendarTileProperties) => {
    return null;
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
              className={`react-calendar__tile ${
                date.getDay() === 0 ? 'sunday' : date.getDay() === 6 ? 'saturday' : ''
              } ${
                date.toDateString() === new Date().toDateString() ? 'today' : ''
              } ${selectedDate && date.toDateString() === selectedDate.toDateString() ? 'selected' : ''} ${
                currentWeek.some(weekDate => weekDate.toDateString() === date.toDateString()) ? 'current-week' : ''
              }`}
              onClick={() => onClickDay(date)}
            >
              <abbr className="react-calendar__tile__abbr">{date.getDate()}</abbr>
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
        onActiveStartDateChange={({ activeStartDate }) => setCurrentMonth(activeStartDate as Date)}
        locale="en-US"
        formatMonthYear={(locale, date) => formatMonthYear(date)}
        prevLabel="<"
        nextLabel=">"
        tileClassName={tileClassName}
        formatDay={formatDay}
        formatShortWeekday={renderWeekday}
        showNeighboringMonth={false}
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
// import 'react-calendar/dist/Calendar.css';
// import './Calendar.scss';

// import { useState } from 'react';
// import type { CalendarProps } from 'react-calendar';
// import Calendar from 'react-calendar';

// export default function CustomCalendar() {
//   const [selectedDate, setSelectedDate] = useState<Date | null>(null);

//   const formatMonthYear: CalendarProps['formatMonthYear'] = (locale, date) => {
//     const year = date.getFullYear();
//     const month = (date.getMonth() + 1).toString().padStart(2, '0');
//     return `${year}. ${month}`;
//   };

//   const tileClassName: CalendarProps['tileClassName'] = ({ date, view }) => {
//     if (view === 'month' && date.getDay() === 6) {
//       return 'saturday';
//     }
//     if (view === 'month' && date.getDay() === 0) {
//       return 'sunday';
//     }
//     if (view === 'month' && date.toDateString() === new Date().toDateString()) {
//       return 'today';
//     }
//     if (selectedDate && date.toDateString() === selectedDate.toDateString()) {
//       return 'selected';
//     }
//     return null;
//   };

//   const formatDay: CalendarProps['formatDay'] = (locale, date) => {
//     return date.getDate().toString();
//   };

//   const renderWeekday: CalendarProps['formatShortWeekday'] = (locale, date) => {
//     const weekdays = ['일', '월', '화', '수', '목', '금', '토'];
//     return weekdays[date.getDay()];
//   };

//   const onClickDay = (date: Date) => {
//     setSelectedDate(date);
//   };

//   return (
//     <div className="custom-calendar-container">
//       <Calendar
//         locale="en-US" // Use 'en-US' to start the week on Sunday
//         formatMonthYear={formatMonthYear}
//         prevLabel="<"
//         nextLabel=">"
//         tileClassName={tileClassName}
//         formatDay={formatDay}
//         formatShortWeekday={renderWeekday}
//         showNeighboringMonth={false}
//         onClickDay={onClickDay}
//       />
//     </div>
//   );
// }

import 'react-calendar/dist/Calendar.css';
import './Calendar.scss';

import { useEffect, useState } from 'react';
import type { CalendarProps } from 'react-calendar';
import Calendar from 'react-calendar';

interface CustomCalendarProps {
  isCollapsed: boolean;
}

export default function CustomCalendar({ isCollapsed }: CustomCalendarProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [currentWeek, setCurrentWeek] = useState<Date[]>([]);

  useEffect(() => {
    const today = new Date();
    const startOfWeek = getStartOfWeek(today);
    const week = Array.from({ length: 7 }, (_, i) => new Date(startOfWeek.getTime() + i * 86400000));
    setCurrentWeek(week);
  }, []);

  const getStartOfWeek = (date: Date): Date => {
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1);
    const startDate = new Date(date.setDate(diff));
    return new Date(startDate.setHours(0, 0, 0, 0));
  };

  const formatMonthYear: CalendarProps['formatMonthYear'] = (locale, date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    return `${year}. ${month}`;
  };

  const tileClassName: CalendarProps['tileClassName'] = ({ date, view }) => {
    if (view === 'month' && date.getDay() === 6) {
      return 'saturday';
    }
    if (view === 'month' && date.getDay() === 0) {
      return 'sunday';
    }
    if (view === 'month' && date.toDateString() === new Date().toDateString()) {
      return 'today';
    }
    if (selectedDate && date.toDateString() === selectedDate.toDateString()) {
      return 'selected';
    }
    return null;
  };

  const formatDay: CalendarProps['formatDay'] = (locale, date) => {
    return date.getDate().toString();
  };

  const renderWeekday: CalendarProps['formatShortWeekday'] = (locale, date) => {
    const weekdays = ['일', '월', '화', '수', '목', '금', '토'];
    return weekdays[date.getDay()];
  };

  const onClickDay = (date: Date) => {
    setSelectedDate(date);
  };

  const tileContent: CalendarProps['tileContent'] = ({ date, view }) => {
    if (view === 'month' && isCollapsed) {
      const currentWeekDate = currentWeek.find(
        (weekDate) => weekDate.toDateString() === date.toDateString()
      );
      if (currentWeekDate) {
        return <div className="current-week-date">{currentWeekDate.getDate()}</div>;
      }
    }
    return null;
  };

  return (
    <div className={`custom-calendar-container ${isCollapsed ? 'collapsed' : ''}`}>
      <Calendar
        locale="en-US"
        formatMonthYear={formatMonthYear}
        prevLabel="<"
        nextLabel=">"
        tileClassName={tileClassName}
        formatDay={formatDay}
        formatShortWeekday={renderWeekday}
        showNeighboringMonth={false}
        onClickDay={onClickDay}
        tileContent={tileContent}
      />
    </div>
  );
}

import 'react-calendar/dist/Calendar.css';

import classnames from 'classnames/bind';
import {useEffect, useState} from 'react';
import Calendar from 'react-calendar';

import styles from './calendar.module.scss';

interface CustomCalendarProps {
  isCollapsed: boolean;
}

const cx = classnames.bind(styles);

export default function CustomCalendar({isCollapsed}: CustomCalendarProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [currentWeek, setCurrentWeek] = useState<Date[]>([]);
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());

  useEffect(() => {
    updateCurrentWeek(selectedDate || currentMonth);
  }, [currentMonth, selectedDate]);

  const getStartOfWeek = (date: Date): Date => {
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1);
    const startDate = new Date(date);
    startDate.setDate(diff);
    return new Date(startDate.setHours(0, 0, 0, 0));
  };

  const updateCurrentWeek = (date: Date) => {
    const startOfWeek = getStartOfWeek(date);
    const week = Array.from(
      {length: 7},
      (_, i) => new Date(startOfWeek.getTime() + i * 86400000),
    );
    setCurrentWeek(week);
  };

  const changeMonth = (increment: number) => {
    const newDate = new Date(currentMonth);
    newDate.setMonth(currentMonth.getMonth() + increment);
    setCurrentMonth(newDate);
    updateCurrentWeek(selectedDate || newDate);
  };

  const formatMonthYear = (locale: string, date: Date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    return `${year}. ${month}`;
  };

  const tileClassName = ({date, view}: {date: Date; view: string}) => {
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

  const formatDay = (locale: string, date: Date) => {
    return date.getDate().toString();
  };

  const renderWeekday = (locale: string, date: Date) => {
    const weekdays = ['일', '월', '화', '수', '목', '금', '토'];
    return weekdays[date.getDay()];
  };

  const onClickDay = (date: Date) => {
    setSelectedDate(date);
    updateCurrentWeek(date);
  };

  const tileContent = ({date, view}: {date: Date; view: string}) => {
    return null;
  };

  const renderFullCalendar = () => {
    return (
      <Calendar
        activeStartDate={currentMonth}
        onActiveStartDateChange={({activeStartDate}) =>
          setCurrentMonth(activeStartDate as Date)
        }
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
    );
  };

  return (
    <div className={cx('custom-calendar-container', {collapsed: isCollapsed})}>
      {renderFullCalendar()}
    </div>
  );
}

// import 'react-calendar/dist/Calendar.css';
// import './calendar.module.scss';

// import { useEffect, useState } from 'react';
// import Calendar from 'react-calendar';

// interface CustomCalendarProps {
//   isCollapsed: boolean;
// }

// export default function CustomCalendar({ isCollapsed }: CustomCalendarProps) {
//   const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
//   const [currentWeek, setCurrentWeek] = useState<Date[]>([]);
//   const [currentMonth, setCurrentMonth] = useState<Date>(new Date());

//   useEffect(() => {
//     updateCurrentWeek(selectedDate || currentMonth);
//   }, [currentMonth, selectedDate]);

//   const getStartOfWeek = (date: Date): Date => {
//     const day = date.getDay();
//     const diff = date.getDate() - day + (day === 0 ? -6 : 1);
//     const startDate = new Date(date);
//     startDate.setDate(diff);
//     return new Date(startDate.setHours(0, 0, 0, 0));
//   };

//   const updateCurrentWeek = (date: Date) => {
//     const startOfWeek = getStartOfWeek(date);
//     const week = Array.from({ length: 7 }, (_, i) => new Date(startOfWeek.getTime() + i * 86400000));
//     setCurrentWeek(week);
//   };

//   const changeMonth = (increment: number) => {
//     const newDate = new Date(currentMonth);
//     newDate.setMonth(currentMonth.getMonth() + increment);
//     setCurrentMonth(newDate);
//     updateCurrentWeek(selectedDate || newDate);
//   };

//   const formatMonthYear = (locale: string, date: Date) => {
//     const year = date.getFullYear();
//     const month = (date.getMonth() + 1).toString().padStart(2, '0');
//     return `${year}. ${month}`;
//   };

//   const tileClassName = ({ date, view }: { date: Date; view: string }) => {
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

//   const formatDay = (locale: string, date: Date) => {
//     return date.getDate().toString();
//   };

//   const renderWeekday = (locale: string, date: Date) => {
//     const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
//     return weekdays[date.getDay()];
//   };

//   const onClickDay = (date: Date) => {
//     setSelectedDate(date);
//     updateCurrentWeek(date);
//   };

//   const tileContent = ({ date, view }: { date: Date; view: string }) => {
//     return null;
//   };

//   const renderCollapsedCalendar = () => {
//     return (
//       <div className="collapsed-calendar">
//         <div className="react-calendar__navigation">
//           <button className="react-calendar__navigation__prev-button" onClick={() => changeMonth(-1)}>
//             {'<'}
//           </button>
//           <span className="react-calendar__navigation__label">{formatMonthYear('en-US', currentMonth)}</span>
//           <button className="react-calendar__navigation__next-button" onClick={() => changeMonth(1)}>
//             {'>'}
//           </button>
//         </div>
//         <div className="current-week">
//           {currentWeek.map((date) => (
//             <div
//               key={date.toDateString()}
//               className={`week-day ${date.toDateString() === new Date().toDateString() ? 'today' : ''} ${
//                 selectedDate && date.toDateString() === selectedDate.toDateString() ? 'selected' : ''
//               }`}
//               onClick={() => onClickDay(date)}
//             >
//               <span className="day-name">{renderWeekday('en-US', date)}</span>
//               <span className="day-date">{date.getDate()}</span>
//             </div>
//           ))}
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div className={`custom-calendar-container ${isCollapsed ? 'collapsed' : ''}`}>
//       {isCollapsed ? renderCollapsedCalendar() : (
//         <Calendar
//           activeStartDate={currentMonth}
//           onActiveStartDateChange={({ activeStartDate }) => setCurrentMonth(activeStartDate as Date)}
//           locale="en-US"
//           formatMonthYear={formatMonthYear}
//           prevLabel="<"
//           nextLabel=">"
//           tileClassName={tileClassName}
//           formatDay={formatDay}
//           formatShortWeekday={renderWeekday}
//           showNeighboringMonth={false}
//           onClickDay={onClickDay}
//           tileContent={tileContent}
//         />
//       )}
//     </div>
//   );
// }
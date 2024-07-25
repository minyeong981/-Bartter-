import { createFileRoute } from '@tanstack/react-router';
import React from 'react';

import CustomCalendar from '../../../components/Calendar/Calendar';

const Calendar: React.FC = () => {
  return (
    <div>
      <CustomCalendar />
    </div>
  );
};

export const Route = createFileRoute('/_layout/diary/calendar')({
  component: Calendar
});

export default Calendar;

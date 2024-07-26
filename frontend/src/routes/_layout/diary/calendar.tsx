import { createFileRoute } from '@tanstack/react-router';

import CustomCalendar from '../../../components/Calendar/Calendar';

export default function Calendar() {
  return (
    <div>
      <CustomCalendar />
    </div>
  );
};

export const Route = createFileRoute('/_layout/diary/calendar')({
  component: Calendar
});


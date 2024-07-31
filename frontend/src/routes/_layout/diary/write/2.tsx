import 'react-datepicker/dist/react-datepicker.css';

import { createFileRoute,} from '@tanstack/react-router';



export const Route = createFileRoute('/_layout/diary/write/2')({
  component: DiaryWritePage2,
});

function DiaryWritePage2() {

  return (
    <div />
  );
}

export default DiaryWritePage2;

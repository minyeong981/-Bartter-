import './diary.scss';

import { createFileRoute } from '@tanstack/react-router';

import Calendar from '@/components/Calendar/calendar';
import MyCrops from '@/components/Crop/myCrops';
import TwoButton from '@/components/TwoButton/TwoButton';
import useDiaryStore from '@/store/diaryStore';

export default function Diary() {
  const { activeComponent, setActiveComponent } = useDiaryStore();

  const renderComponent = () => {
    switch (activeComponent) {
      case '달력':
        return <Calendar />;
      case '내 작물':
        return <MyCrops />;
      default:
        return null;
    }
  };

  const handleButtonClick = (button: string) => {
    setActiveComponent(button);
  };

  return (
    <div>
      <header className="header">
        <TwoButton
          first="달력"
          second="내 작물"
          activeButton={activeComponent}
          onClick={handleButtonClick}
        />
      </header>
      <div>
        {renderComponent()}
      </div>
    </div>
  );
}

export const Route = createFileRoute('/_layout/diary/')({
  component: Diary,
});

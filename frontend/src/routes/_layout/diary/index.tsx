import './diary.scss';

import { createFileRoute } from '@tanstack/react-router';

import Calendar from '@/components/Calendar/calendar';
import MainCrops from '@/components/Crop/mainCrops';
import TwoButton from '@/components/TwoButton/TwoButton';
import useRootStore from '@/store/index';

export default function Diary() {
  const { activeComponent, setActiveComponent } = useRootStore();

  const renderComponent = () => {
    switch (activeComponent) {
      case '달력':
        return <Calendar />;
      case '내 작물':
        return <MainCrops />;
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

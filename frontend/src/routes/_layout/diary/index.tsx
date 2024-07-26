import './diary.scss';

import { createFileRoute } from '@tanstack/react-router';
import React, { useState } from 'react';

import TwoButton from '../../../components/TwoButton/TwoButton'
import Calendar from './calendar';
import MyCrops from './myCrops';

export default function Diary() {
  const [activeComponent, setActiveComponent] = useState<string>('달력');

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
  component: Diary
});


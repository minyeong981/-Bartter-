import './index.scss';

import { useState } from 'react';

const TwoButton = ({first, second} : {first:string, second:string}) => {
  const [activeButton, setActiveButton] = useState('calendar');

  return (
    <div className="main-page">
      <button
        className={`button ${activeButton === 'calendar' ? 'active' : ''}`}
        onClick={() => setActiveButton('calendar')}
      >
        {first}
      </button>
      <button
        className={`button ${activeButton === 'my-crop' ? 'active' : ''}`}
        onClick={() => setActiveButton('my-crop')}
      >
        {second}
      </button>
    </div>
  );
};

export default TwoButton;

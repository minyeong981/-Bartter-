// import './diary.scss';

// import { createFileRoute } from '@tanstack/react-router';
// import React, { useState } from 'react';

// import Calendar from './calendar';
// import MyCrops from './myCrops';

// const Diary: React.FC = () => {
//   const [activeComponent, setActiveComponent] = useState<string>('calendar');

//   const renderComponent = () => {
//     switch (activeComponent) {
//       case 'calendar':
//         return <Calendar />;
//       case 'mycrops':
//         return <MyCrops />;
//       default:
//         return null;
//     }
//   };

//   return (
//     <div>
//       <header className="header">
//         <button
//           className={`calendar ${activeComponent === 'calendar' ? 'active' : ''}`}
//           onClick={() => setActiveComponent('calendar')}
//         >
//             달력
//         </button>
//         <button
//           className={`myCrops ${activeComponent === 'mycrops' ? 'active' : ''}`}
//           onClick={() => setActiveComponent('mycrops')}
//         >
//           내 작물
//         </button>
//       </header>
//       <div>
//         {renderComponent()}
//       </div>
//     </div>
//   );
// };

// export const Route = createFileRoute('/_layout/diary/')({
//   component: Diary
// });

// export default Diary;

import './diary.scss';

import { createFileRoute } from '@tanstack/react-router';
import React, { useState } from 'react';

import Calendar from './calendar';
import MyCrops from './myCrops';

const Diary: React.FC = () => {
  const [activeComponent, setActiveComponent] = useState<string>('calendar');

  const renderComponent = () => {
    switch (activeComponent) {
      case 'calendar':
        return <Calendar />;
      case 'mycrops':
        return <MyCrops />;
      default:
        return null;
    }
  };

  return (
    <div>
      <header className="header">
        <button
          className={`calendar ${activeComponent === 'calendar' ? 'active' : ''}`}
          onClick={() => setActiveComponent('calendar')}
        >
          달력
        </button>
        <button
          className={`myCrops ${activeComponent === 'mycrops' ? 'active' : ''}`}
          onClick={() => setActiveComponent('mycrops')}
        >
          내 작물
        </button>
      </header>
      <div>
        {renderComponent()}
      </div>
    </div>
  );
};

export const Route = createFileRoute('/_layout/diary/')({
  component: Diary
});

export default Diary;

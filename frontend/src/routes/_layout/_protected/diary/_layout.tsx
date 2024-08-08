// import { createFileRoute, Outlet } from '@tanstack/react-router'
// import classnames from 'classnames/bind';

// import HeaderWithLabelAndButtons from '@/components/Header/HeaderWithLabelAndButtons.tsx';
// import Location from '@/components/Header/Location';
// import Navigation from '@/components/Navigation';
// import TwoButton from '@/components/TwoButton/TwoButton';
// import useRootStore from '@/store';

// import styles from './diary.module.scss';

// const cx = classnames.bind(styles);

// export const Route = createFileRoute('/_layout/_protected/diary/_layout')({
//   component: Diary
// })

// function Diary() {
//   const { activeComponent, setActiveComponent } = useRootStore();

//   function handleButtonClick(button: string) {
//     setActiveComponent(button);
//   }

//   return (
//     <div className={cx('diary')}>
//       <HeaderWithLabelAndButtons label={<Location location='내위치' />} />
//       <TwoButton
//           first="달력"
//           second="내 작물"
//           activeButton={activeComponent}
//           onClick={handleButtonClick}
//         />
//       <Outlet/>
//       <Navigation/> 
//     </div>
//   );
// }

import { createFileRoute, Outlet } from '@tanstack/react-router'
import classnames from 'classnames/bind';

import HeaderWithLabelAndButtons from '@/components/Header/HeaderWithLabelAndButtons.tsx';
import Location from '@/components/Header/Location';
import Navigation from '@/components/Navigation';
import TwoButton from '@/components/TwoButton/TwoButton';
import useRootStore from '@/store';

import styles from './diary.module.scss';

const cx = classnames.bind(styles);

export const Route = createFileRoute('/_layout/_protected/diary/_layout')({
  component: Diary
})

function Diary() {
  const { activeComponent, setActiveComponent } = useRootStore();

  function handleButtonClick(button: string) {
    setActiveComponent(button);
  }

  return (
    <div className={cx('diary')}>
      <HeaderWithLabelAndButtons label={<Location location='내위치' />} />
      <div className={cx('fixedButtons')}>
        <TwoButton
          first="달력"
          second="내 작물"
          activeButton={activeComponent}
          onClick={handleButtonClick}
        />
      </div>
      <Outlet/>
      <Navigation/> 
    </div>
  );
}

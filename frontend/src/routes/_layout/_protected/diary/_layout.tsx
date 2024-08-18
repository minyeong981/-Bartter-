import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute, Outlet } from '@tanstack/react-router'
import classnames from 'classnames/bind';

import HeaderWithLabelAndButtons from '@/components/Header/HeaderWithLabelAndButtons.tsx';
import Location from '@/components/Header/Location';
// import Navigation from '@/components/Navigation';
import MenuBar from '@/components/MenuBar/MenuBar';
import TwoButton from '@/components/TwoButton/TwoButton';
import barter from '@/services/barter';
import useRootStore from '@/store';
import querykeys from '@/util/querykeys';

import styles from './diary.module.scss';

const cx = classnames.bind(styles);

export const Route = createFileRoute('/_layout/_protected/diary/_layout')({
  component: Diary
})

function Diary() {
  const userId : UserId = useRootStore((state) => state.userId);
  const { activeComponent, setActiveComponent } = useRootStore();
  const {data} = useSuspenseQuery({
      queryKey: [querykeys.LOCATION, userId],
      queryFn: () => barter.getUserLocation(userId)
  })

  const location = data.data.data
  function handleButtonClick(button: string) {
    setActiveComponent(button);
  }

  return (
    <div className={cx('diary')}>
      <HeaderWithLabelAndButtons label={<Location location={location.name.split(' ').slice(2,3).toString()} />} />
      <div className={cx('fixedButtons')}>
        <TwoButton
          first="달력"
          second="내 작물"
          activeButton={activeComponent}
          onClick={handleButtonClick}
        />
      </div>
      <Outlet/>
      {/* <Navigation/>  */}
      <MenuBar />
    </div>
  );
}

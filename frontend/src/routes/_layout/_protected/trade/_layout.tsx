import {useSuspenseQuery} from '@tanstack/react-query';
import {createFileRoute, Outlet, useLocation} from '@tanstack/react-router';
import classnames from 'classnames/bind';
import {useState} from 'react';

import FloatingButton from '@/components/Buttons/FloatingButton';
import HeaderWithLabelAndButtons from '@/components/Header/HeaderWithLabelAndButtons.tsx';
import Location from '@/components/Header/Location.tsx';
import MenuBar from '@/components/MenuBar/MenuBar';
import CreateCropTradeModal from '@/components/Modals/CreateCropTradeModal';
import barter from '@/services/barter.ts';
import useRootStore from '@/store';
import querykeys from '@/util/querykeys.ts';

import styles from './trade.module.scss';

const cx = classnames.bind(styles);

export const Route = createFileRoute('/_layout/_protected/trade/_layout')({
  component: Trade,
});

function Trade() {
  const location = useLocation();
  const userId = useRootStore(state => state.userId);
  const {data} = useSuspenseQuery({
    queryFn: () => barter.getUserLocation(userId),
    queryKey: [querykeys.LOCATION, userId],
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const locationName = data.data.data.name.split(' ').slice(2, 3).join();

  function handleModalOpen() {
    setIsModalOpen(true);
  }

  function handleModalClose() {
    setIsModalOpen(false);
  }

  return (
    <div className={cx('trade')}>
      <HeaderWithLabelAndButtons label={<Location location={locationName} />} />
      <Outlet />
      {location.pathname === '/trade' && (
        <FloatingButton onClick={handleModalOpen}>+ 글 작성하기</FloatingButton>
      )}
      {isModalOpen && (
        <CreateCropTradeModal onClickOutside={handleModalClose} />
      )}
      <MenuBar />
    </div>
  );
}
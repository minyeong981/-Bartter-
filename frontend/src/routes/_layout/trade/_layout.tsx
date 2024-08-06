import {createFileRoute, Outlet} from '@tanstack/react-router';
import classnames from 'classnames/bind';
import {useState} from "react";

import FloatingButton from "@/components/Buttons/FloatingButton";
import HeaderWithLabelAndButtons from '@/components/Header/HeaderWithLabelAndButtons.tsx';
import CreateCropTradeModal from "@/components/Modals/CreateCropTradeModal";
import Navigation from '@/components/Navigation';

import styles from './trade.module.scss';

const cx = classnames.bind(styles);

export const Route = createFileRoute('/_layout/trade/_layout')({
  component: Trade,
});

function Trade() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  function handleModalOpen() {
    setIsModalOpen(true);
  }

  function handleModalClose() {
    setIsModalOpen(false);
  }

  return (
    <div className={cx('trade')}>
      <HeaderWithLabelAndButtons label="장덕동"/>
      <Outlet/>
      <FloatingButton onClick={handleModalOpen}>+ 글작성하기</FloatingButton>
      {isModalOpen && <CreateCropTradeModal onClickOutside={handleModalClose}/>}
      <Navigation/>
    </div>
  );
}
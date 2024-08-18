import { createFileRoute,Outlet } from '@tanstack/react-router'
import classnames from 'classnames/bind'

import HeaderWithLabelAndBackButton from '@/components/Header/HeaderWithLabelAndBackButton'

import styles from './cropStorage.module.scss'

const cx = classnames.bind(styles);
export const Route = createFileRoute('/_layout/_protected/profile/$userId/cropStorage/_layout')({
  component: CropStorageLayout
})


export default function CropStorageLayout() {
  return (
    <div className={cx('cropStorageLayout')}>
      <HeaderWithLabelAndBackButton label='농작물창고'/>
      <Outlet />
    </div>
  )
}
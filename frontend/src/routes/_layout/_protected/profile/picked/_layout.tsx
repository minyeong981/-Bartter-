import { createFileRoute,Outlet } from '@tanstack/react-router'
import classnames from 'classnames/bind'

import HeaderWithLabelAndBackButton from '@/components/Header/HeaderWithLabelAndBackButton'

import styles from './picked.module.scss'

const cx = classnames.bind(styles)
export const Route = createFileRoute('/_layout/_protected/profile/picked/_layout')({
  component: ProfilePickedLayout
})

export default function ProfilePickedLayout() {
  return (
    <div className={cx('picked-layout')}>
      <HeaderWithLabelAndBackButton label='찜 목록' />
      <Outlet />
    </div>
  )
}
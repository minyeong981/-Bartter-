import { createFileRoute , Outlet } from '@tanstack/react-router'
import classnames from 'classnames/bind'

import HeaderWithLabelAndBackButton from '@/components/Header/HeaderWithLabelAndBackButton'

import styles from './profile.module.scss'

const cx = classnames.bind(styles)
export const Route = createFileRoute('/_layout/_protected/profile/_layout')({
  component: MyProfileLayout
})

export default function MyProfileLayout() {
  return (
    <div className={cx('profile-layout')}>
    <HeaderWithLabelAndBackButton label="프로필" />
    <Outlet />
   </div>
  )
}
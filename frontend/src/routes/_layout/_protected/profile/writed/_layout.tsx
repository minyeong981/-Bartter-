import { createFileRoute,Outlet } from '@tanstack/react-router'
import classnames from 'classnames/bind'

import HeaderWithLabelAndBackButton from '@/components/Header/HeaderWithLabelAndBackButton'

import styles from './writed.module.scss'

const cx = classnames.bind(styles)
export const Route = createFileRoute('/_layout/_protected/profile/writed/_layout')({
  component: ProfileWritedLayout
})

export default function ProfileWritedLayout() {
  return (
    <div className={cx('writed-layout')}>
    <HeaderWithLabelAndBackButton label='내가 쓴 글'/>
    <Outlet />
    </div>
  )
}
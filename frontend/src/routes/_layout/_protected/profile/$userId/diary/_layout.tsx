import { createFileRoute,Outlet } from '@tanstack/react-router'
import classnames from 'classnames/bind'

import HeaderWithLabelAndBackButton from '@/components/Header/HeaderWithLabelAndBackButton'

import styles from './profileDiary.module.scss'

const cx = classnames.bind(styles)
export const Route = createFileRoute('/_layout/_protected/profile/$userId/diary/_layout')({
  component: ProfileDiaryLayout
})

export default function ProfileDiaryLayout() {
  return (
    <div className={cx('profile-diary-layout')}>
    <HeaderWithLabelAndBackButton label='농사 일지'/>
    <Outlet />
    </div>
  )
}
import { createFileRoute,Outlet } from '@tanstack/react-router'
import classnames from 'classnames/bind'

import HeaderWithBackButton from '@/components/Header/HeaderWithBackButton'

import styles from './detail.module.scss'

const cx = classnames.bind(styles)
export const Route = createFileRoute('/_layout/_protected/community/detail/_layout')({
  component: CommunityDetail
})

export default function CommunityDetail() {
  return (
    <div className={cx('community-detail-layout')} >
      <HeaderWithBackButton />
      <Outlet />
    </div>
  )
}
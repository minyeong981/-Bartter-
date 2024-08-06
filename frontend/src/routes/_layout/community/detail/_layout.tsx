import { createFileRoute,Outlet } from '@tanstack/react-router'

import HeaderWithBackButton from '@/components/Header/HeaderWithBackButton'

import styles from './detail.module.scss'

export const Route = createFileRoute('/_layout/community/detail/_layout')({
  component: CommunityDetail
})

export default function CommunityDetail() {
  return (
    <div className={styles.communityDetail} >
      <HeaderWithBackButton />
      <Outlet />
    </div>
  )
}
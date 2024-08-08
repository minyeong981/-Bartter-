import { createFileRoute,Outlet } from '@tanstack/react-router'

import HeaderWithLabelAndBackButton from '@/components/Header/HeaderWithLabelAndBackButton'

import styles from './chat.module.scss'

export const Route = createFileRoute('/_layout/_protected/profile/chat/_layout')({
  component: ProfileChatLayout
})

export default function ProfileChatLayout() {
  return (
    <div className={styles.chatLayout}>
      <HeaderWithLabelAndBackButton label='채팅목록' />
      <Outlet />
    </div>
  )
}
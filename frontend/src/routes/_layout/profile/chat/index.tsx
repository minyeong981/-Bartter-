import { createFileRoute } from '@tanstack/react-router'

import HeaderWithLabelAndBackButton from '@/components/Header/HeaderWithLabelAndBackButton'

export const Route = createFileRoute('/_layout/profile/chat/')({
  component: ProfileChat
})

export default function ProfileChat() {
  return (
    <div>
      <HeaderWithLabelAndBackButton label='채팅 목록' />
      chat
    </div>
  )
}
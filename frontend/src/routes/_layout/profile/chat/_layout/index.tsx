import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/profile/chat/_layout/')({
  component: ProfileChat
})

export default function ProfileChat() {
  return (
    <div>
      chat
    </div>
  )
}
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/_protected/profile/chat/_layout/')({
  component: ProfileChat
})

export default function ProfileChat() {
  return (
    <div>
      chat
    </div>
  )
}
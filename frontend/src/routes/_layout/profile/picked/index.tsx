import { createFileRoute } from '@tanstack/react-router'

import HeaderWithLabelAndBackButton from '@/components/Header/HeaderWithLabelAndBackButton'

export const Route = createFileRoute('/_layout/profile/picked/')({
  component: ProfilePicked
})

export default function ProfilePicked() {
  return (<div>
    <HeaderWithLabelAndBackButton label='찜목록' />
  myPicked
  </div>)
}
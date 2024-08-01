import { createFileRoute } from '@tanstack/react-router'

import HeaderWithLabelAndBackButton from '@/components/Header/HeaderWithLabelAndBackButton'

export const Route = createFileRoute('/_layout/profile/changelocation/')({
  component: ProfileChangeLocation
})

export default function ProfileChangeLocation() {
  return (
    <div>
      <HeaderWithLabelAndBackButton label='위치 수정'/>
    changeLocation
    </div>
  )
}
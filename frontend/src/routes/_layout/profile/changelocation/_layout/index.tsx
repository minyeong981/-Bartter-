import { createFileRoute } from '@tanstack/react-router'


export const Route = createFileRoute('/_layout/profile/changelocation/_layout/')({
  component: ProfileChangeLocation
})

export default function ProfileChangeLocation() {
  return (
    <div>
    changeLocation
    </div>
  )
}
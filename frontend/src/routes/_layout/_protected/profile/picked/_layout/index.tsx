import { createFileRoute } from '@tanstack/react-router'


export const Route = createFileRoute('/_layout/_protected/profile/picked/_layout/')({
  component: ProfilePicked
})

export default function ProfilePicked() {
  return (<div>
  myPicked
  </div>)
}
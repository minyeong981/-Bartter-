import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/profile/$nickname/cropStorage/')({
  component: ProfileCropStorage
})


export default function ProfileCropStorage() {

  const { nickname } : {nickname: string} = Route.useParams()

  return (
    <div>
      {nickname}
    </div>
  )
}
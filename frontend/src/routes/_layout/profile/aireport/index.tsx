import { createFileRoute } from '@tanstack/react-router'

import HeaderWithLabelAndBackButton from '@/components/Header/HeaderWithLabelAndBackButton'

export const Route = createFileRoute('/_layout/profile/aireport/')({
  component: ProfileAiReport
})

export default function ProfileAiReport() {
  return (
    <div> 
      <HeaderWithLabelAndBackButton label='AI 요약 보고서' />
      AiReport
    </div>
  )
}
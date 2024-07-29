import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/diary/writeDiary/detailCropDiary')({
  component: () => <div>Hello /_layout/diary/writeDiary/DiaryDetail!</div>
})
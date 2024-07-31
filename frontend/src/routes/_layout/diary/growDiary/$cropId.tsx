import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/diary/growDiary/$cropId')({
  component: () => <div>Hello /_layout/diary/growDiary/$cropId!</div>
})
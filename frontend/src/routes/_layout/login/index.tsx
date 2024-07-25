import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/login/')({
  component: () => <div>Hello /login/!</div>
})
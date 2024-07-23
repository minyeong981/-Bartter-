import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/signup/')({
  component: () => <div>Hello /signup/!</div>
})
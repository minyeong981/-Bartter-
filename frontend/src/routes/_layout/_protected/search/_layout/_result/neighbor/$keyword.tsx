import {createFileRoute} from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/_protected/search/_layout/_result/neighbor/$keyword')({
  component: () => <div>Hello /_layout/_protected/search/_layout/_result/neighbor/$keyword!</div>
})
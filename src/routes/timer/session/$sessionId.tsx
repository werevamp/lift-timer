import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/timer/session/$sessionId')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/timer/session/$sessionId"!</div>
}

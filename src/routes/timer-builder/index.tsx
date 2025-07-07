import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/timer-builder/')({
  component: TimerBuilderPage,
})

function TimerBuilderPage() {
  return <div>timer builder</div>
}

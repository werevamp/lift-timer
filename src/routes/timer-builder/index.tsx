import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/timer-builder/')({
  component: TimerBuilder,
})

function TimerBuilder() {
  return <div>timer builder</div>
}

import { createFileRoute } from '@tanstack/react-router'
import { TimerView } from '@/features/timer'

export const Route = createFileRoute('/timer/')({
  component: TimerPage,
})

function TimerPage() {
  return <TimerView />
}

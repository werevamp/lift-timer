import { createFileRoute } from '@tanstack/react-router'
import { TimerBuilderView } from '@/features/timer-builder'

export const Route = createFileRoute('/timer-builder/')({
  component: TimerBuilderPage,
})

function TimerBuilderPage() {
  return <TimerBuilderView />
}
